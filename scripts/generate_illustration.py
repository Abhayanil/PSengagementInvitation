import zlib
import struct
import math

def generate_illustration():
    width = 480
    height = 600
    
    # We will create an RGB buffer (width x height x 3)
    # Background: Cream/Ivory (#FAF6F0) with warm vintage vignette
    pixels = []

    # Centers
    cx = width / 2.0
    cy = height / 2.0

    def blend(bg, fg, alpha):
        return [
            int(bg[0] * (1 - alpha) + fg[0] * alpha),
            int(bg[1] * (1 - alpha) + fg[1] * alpha),
            int(bg[2] * (1 - alpha) + fg[2] * alpha)
        ]

    # Pre-render
    rows = []
    for y in range(height):
        row = bytearray()
        row.append(0) # PNG filter type None
        for x in range(width):
            # Base ivory background: 250, 246, 240
            # Radial distance from center-top
            dx = (x - cx) / (width * 0.5)
            dy = (y - (cy - 40)) / (height * 0.5)
            dist = math.sqrt(dx * dx + dy * dy)
            
            # Warm vignette & texture
            vignette = max(0.0, min(1.0, (dist - 0.4) * 0.8))
            r = 250 - int(vignette * 15)
            g = 246 - int(vignette * 18)
            b = 240 - int(vignette * 22)

            color = [r, g, b]

            # 1. Soft glowing halo behind couple
            halo_dist = math.sqrt((x - cx)**2 + (y - (cy - 30))**2)
            if halo_dist < 160:
                halo_alpha = (1.0 - halo_dist / 160.0) * 0.35
                color = blend(color, [255, 248, 230], halo_alpha)

            # 2. Arch border
            # Arch geometry: top is semicircle centered at (cx, 190) with radius 170
            # Straight sides down to y = 540
            arch_r = 170
            arch_cy = 200
            
            in_arch = False
            on_arch_line = False
            
            if y < arch_cy:
                d_arch = math.sqrt((x - cx)**2 + (y - arch_cy)**2)
                if abs(d_arch - arch_r) < 2.0:
                    on_arch_line = True
                elif d_arch < arch_r:
                    in_arch = True
            else:
                if y <= 540 and abs(abs(x - cx) - arch_r) < 2.0:
                    on_arch_line = True
                elif y <= 540 and abs(x - cx) < arch_r:
                    in_arch = True

            if on_arch_line:
                # Gold color: 197, 160, 89 (#C5A059)
                color = blend(color, [197, 160, 89], 0.75)

            # 3. Couple Silhouette / Romantic Line Art
            # Couple heads & bodies centered around cx, y: 190 to 450
            # Groom: head at (cx + 36, 220), radius 28
            # Bride: head at (cx - 24, 235), radius 26 (leaning against groom)
            
            # Groom head
            d_groom_head = math.sqrt((x - (cx + 34))**2 + (y - 215)**2)
            if d_groom_head < 28:
                # Charcoal / warm bronze tone: 70, 60, 52
                color = blend(color, [78, 68, 60], 0.95)

            # Bride head with soft bridal updo / veil
            d_bride_head = math.sqrt((x - (cx - 22))**2 + (y - 232)**2)
            if d_bride_head < 26:
                # Dusty onion / warm auburn hair tone: 130, 85, 92
                color = blend(color, [135, 88, 96], 0.95)

            # Bride floral hair piece (onion pink & white dots)
            d_hairpiece = math.sqrt((x - (cx - 36))**2 + (y - 226)**2)
            if d_hairpiece < 10:
                color = blend(color, [216, 161, 168], 0.9)
            elif d_hairpiece < 14 and (x + y) % 5 == 0:
                color = blend(color, [255, 255, 255], 0.85)

            # Groom neck & shoulder line (tuxedo/suit in deep charcoal)
            if 240 <= y <= 520:
                # Groom torso
                g_left = cx + 8 - (y - 240) * 0.2
                g_right = cx + 75 + (y - 240) * 0.35
                if g_left <= x <= g_right:
                    # Shading
                    color = blend(color, [68, 62, 58], 0.92)

            # Bride torso & flowing gown in warm ivory / dusty onion
            if 255 <= y <= 530:
                b_left = cx - 95 - (y - 255) * 0.38
                b_right = cx + 25 + (y - 255) * 0.1
                if b_left <= x <= b_right:
                    # Gown shading with soft dusty onion folds
                    gown_color = [216, 172, 178] if (x + y) % 18 < 6 else [238, 226, 222]
                    color = blend(color, gown_color, 0.9)

            # 4. Botanical Sage & Onion Floral Sprigs at Arch Base & Crown
            # Arch crown flowers around (cx, arch_cy - arch_r) = (cx, 30)
            d_crown = math.sqrt((x - cx)**2 + (y - 32)**2)
            if d_crown < 22:
                flower_angle = math.atan2(y - 32, x - cx)
                petal_dist = 14 + 5 * math.cos(5 * flower_angle)
                if d_crown < petal_dist:
                    color = blend(color, [216, 161, 168], 0.9) # Dusty onion blossom
                if d_crown < 5:
                    color = blend(color, [197, 160, 89], 1.0) # Gold core

            # Arch crown leaves (sage green: 163, 184, 166)
            d_leaf_left = math.sqrt((x - (cx - 28))**2 + (y - 30)**2)
            if d_leaf_left < 14:
                color = blend(color, [155, 178, 158], 0.85)
            d_leaf_right = math.sqrt((x - (cx + 28))**2 + (y - 30)**2)
            if d_leaf_right < 14:
                color = blend(color, [155, 178, 158], 0.85)

            # Arch bottom-left floral bunch around (cx - arch_r + 10, 500)
            d_bot_flower = math.sqrt((x - (cx - arch_r + 15))**2 + (y - 505)**2)
            if d_bot_flower < 20:
                color = blend(color, [245, 240, 235], 0.92) # White rose
            elif d_bot_flower < 32 and (x % 3 == 0):
                color = blend(color, [155, 178, 158], 0.75) # Sage leaf

            # Arch bottom-right floral bunch around (cx + arch_r - 15, 500)
            d_bot_flower2 = math.sqrt((x - (cx + arch_r - 15))**2 + (y - 505)**2)
            if d_bot_flower2 < 20:
                color = blend(color, [216, 161, 168], 0.92) # Onion pink
            elif d_bot_flower2 < 32 and (y % 3 == 0):
                color = blend(color, [155, 178, 158], 0.75) # Sage leaf

            # 5. Golden Starlight / Sparkles scattered subtly
            sparkle_points = [
                (cx - 110, 160), (cx + 115, 150),
                (cx - 130, 290), (cx + 125, 310),
                (cx - 70, 100), (cx + 80, 95)
            ]
            for sx, sy in sparkle_points:
                s_dist = math.sqrt((x - sx)**2 + (y - sy)**2)
                if s_dist < 4.0:
                    color = blend(color, [225, 190, 115], 0.95)
                elif s_dist < 8.0 and (x == sx or y == sy):
                    color = blend(color, [235, 205, 135], 0.8)

            row.extend(color)
        rows.append(bytes(row))

    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0) # RGB 8-bit
    raw_idat = b''.join(rows)
    png_data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', zlib.compress(raw_idat, 9)) + chunk(b'IEND', b'')

    with open('public/couple-illustration.png', 'wb') as f:
        f.write(png_data)
    print("Couple illustration PNG generated successfully!")

if __name__ == '__main__':
    generate_illustration()
