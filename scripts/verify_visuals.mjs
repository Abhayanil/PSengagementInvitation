import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('verification_screenshots');
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

async function run() {
  console.log('Starting preview server...');
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], {
    stdio: 'pipe',
    shell: true,
  });
  server.stdout.on('data', (d) => console.log(`[server] ${d}`));
  server.stderr.on('data', (d) => console.error(`[server err] ${d}`));

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // ---- 1: Closed ----
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-1-closed.png') });
  const closed = await page.evaluate(() => {
    const header = document.querySelector('header');
    const stage = document.querySelector('.envelope-stage');
    return {
      scrollWidth: document.documentElement.scrollWidth,
      headerTop: header?.getBoundingClientRect().top,
      stage: stage?.getBoundingClientRect().toJSON(),
      cardPresent: !!document.querySelector('article'),
    };
  });
  check('closed: no horizontal overflow', closed.scrollWidth <= 390, `scrollWidth=${closed.scrollWidth}`);
  check('closed: header fully visible', closed.headerTop >= 0, `top=${closed.headerTop}`);
  check('closed: card not mounted', closed.cardPresent === false);

  // ---- Open ----
  const t0 = Date.now();
  await page.locator('#wax-seal-trigger').click();

  // ---- 2: Mid-flap (~750ms) ----
  await page.waitForTimeout(Math.max(0, 750 - (Date.now() - t0)));
  const mid = await page.evaluate(() => {
    const flap = document.querySelector('.envelope-flap');
    const stage = document.querySelector('.envelope-stage');
    const card = document.querySelector('article');
    return {
      scrollWidth: document.documentElement.scrollWidth,
      flapTransform: flap ? getComputedStyle(flap).transform : null,
      flapOpacity: flap ? getComputedStyle(flap).opacity : null,
      stage: stage?.getBoundingClientRect().toJSON(),
      cardOpacity: card ? getComputedStyle(card.closest('.card-rise')).opacity : null,
    };
  });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-2-midflap.png') });
  check('mid: no horizontal overflow', mid.scrollWidth <= 390, `scrollWidth=${mid.scrollWidth}`);
  check('mid: flap is mid-rotation', mid.flapTransform && mid.flapTransform !== 'none', mid.flapTransform?.slice(0, 48));
  check('mid: flap not clipped by stage', mid.stage && mid.stage.top >= 0, `stageTop=${mid.stage?.top}`);

  // ---- 3: Card rising (~1350ms) ----
  await page.waitForTimeout(Math.max(0, 1350 - (Date.now() - t0)));
  const rising = await page.evaluate(() => {
    const img = document.querySelector('article img');
    const card = document.querySelector('article');
    const rise = card?.closest('.card-rise');
    return {
      scrollWidth: document.documentElement.scrollWidth,
      imgSrc: img?.getAttribute('src'),
      imgLoaded: !!img && img.complete && img.naturalWidth > 0,
      riseOpacity: rise ? Number(getComputedStyle(rise).opacity) : null,
      cardTop: card?.getBoundingClientRect().top,
    };
  });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-3-cardrising.png') });
  check('rising: no horizontal overflow', rising.scrollWidth <= 390, `scrollWidth=${rising.scrollWidth}`);
  check('rising: artwork loaded', rising.imgLoaded && rising.imgSrc === '/couple.png', rising.imgSrc);
  check('rising: card mid-emergence', rising.cardTop > 0 && rising.riseOpacity > 0.05, `top=${rising.cardTop}, opacity=${rising.riseOpacity}`);

  // ---- 4: Settled (~2400ms) ----
  await page.waitForTimeout(Math.max(0, 2400 - (Date.now() - t0)));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-4-settled.png') });
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-4-settled-full.png'), fullPage: true });

  const settled = await page.evaluate(() => {
    const card = document.querySelector('article');
    const reveals = [...document.querySelectorAll('.reveal-item')];
    const audioBtn = document.querySelector('#audio-toggle-btn');
    const replayBtn = document.querySelector('#replay-unfold-btn');
    const actions = [...document.querySelectorAll('#view-location-btn, #save-date-btn')];
    return {
      scrollWidth: document.documentElement.scrollWidth,
      cardTop: card?.getBoundingClientRect().top,
      revealCount: reveals.length,
      allRevealed: reveals.every((el) => Number(getComputedStyle(el).opacity) > 0.95),
      audioVisible: !!audioBtn && audioBtn.getBoundingClientRect().top >= 0,
      audioLabel: audioBtn?.getAttribute('aria-label'),
      audioPressed: audioBtn?.getAttribute('aria-pressed'),
      replayVisible: !!replayBtn,
      actionsVisible: actions.length === 2 && actions.every((b) => b.getBoundingClientRect().top < 844),
    };
  });
  check('settled: no horizontal overflow', settled.scrollWidth <= 390, `scrollWidth=${settled.scrollWidth}`);
  check('settled: all content revealed', settled.allRevealed && settled.revealCount === 7, `${settled.revealCount} reveals`);
  check('settled: audio toggle visible', settled.audioVisible, settled.audioLabel);
  check('settled: replay control visible', settled.replayVisible);

  // ---- Action buttons (below the fold on 390x844, scroll into view) ----
  const actions = page.locator('#view-location-btn, #save-date-btn');
  const actionCount = await actions.count();
  await actions.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'verify-slow-4-settled-actions.png') });
  const actionsVisible = await page.evaluate(() =>
    [...document.querySelectorAll('#view-location-btn, #save-date-btn')].every((b) => {
      const r = b.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= window.innerHeight && r.width > 0;
    })
  );
  check('settled: action buttons scroll into view', actionCount === 2 && actionsVisible, `${actionCount} buttons`);

  // ---- Audio toggle interaction ----
  await page.locator('#audio-toggle-btn').click();
  const muted = await page.locator('#audio-toggle-btn').getAttribute('aria-pressed');
  await page.locator('#audio-toggle-btn').click();
  const unmuted = await page.locator('#audio-toggle-btn').getAttribute('aria-pressed');
  check('audio: mute toggles on', muted === 'true', `aria-pressed=${muted}`);
  check('audio: mute toggles off', unmuted === 'false', `aria-pressed=${unmuted}`);

  // ---- Replay ----
  await page.locator('#replay-unfold-btn').click();
  await page.waitForTimeout(900);
  const replayed = await page.evaluate(() => ({
    headerTop: document.querySelector('header')?.getBoundingClientRect().top,
    cardPresent: !!document.querySelector('article'),
    scrollY: window.scrollY,
  }));
  check('replay: card unmounted', replayed.cardPresent === false);
  check('replay: header restored', replayed.headerTop >= 0, `top=${replayed.headerTop}`);
  check('replay: scrolled back to top', replayed.scrollY === 0);

  check('no runtime page errors', pageErrors.length === 0, pageErrors.join('; '));
  check('no console errors', consoleErrors.length === 0, consoleErrors.join('; '));

  await browser.close();
  server.kill();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  process.exit(failed.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
