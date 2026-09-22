"""Builds Main.dc.html and Mobile.dc.html from template.html.

- Embeds Tabular (Bold/Regular) and Punc as @font-face data URIs.
- Renders the PAXINOX diverging stacked-bar chart as inline SVG.
"""
import base64, pathlib

HERE = pathlib.Path(__file__).parent
FONTS = pathlib.Path.home() / "Library/Fonts"

def face(family, file, weight):
    b64 = base64.b64encode((FONTS / file).read_bytes()).decode()
    return (f"@font-face{{font-family:\"{family}\";font-weight:{weight};font-style:normal;"
            f"src:url(data:font/otf;base64,{b64}) format(\"opentype\");font-display:swap;}}")

fonts_css = "\n".join([
    face("Tabular", "Tabular-Bold.otf", 700),
    face("Tabular", "Tabular-Regular.otf", 400),
    face("Punc", "punc-regular.otf", 400),
])

# Rows: label, [clearly neg, slightly neg, neutral, slightly pos, clearly pos] in % of answers
ROWS = [
    ("Self-reported snoring reduction", "n=21", [10, 14, 52, 19, 5]),
    ("Partner's / recording's assessment", "n=21", [24, 57, 0, 19, 0]),
    ("Side effects (none = positive)", "n=22", [18, 0, 0, 0, 82]),
    ("Discomfort during use", "n=22", [14, 32, 18, 32, 5]),
    ("Would continue using it", "n=22", [27, 9, 18, 27, 18]),
    ("Would recommend to others", "n=22", [23, 0, 36, 0, 41]),
]
COLORS = ["#a82a29", "#e9605d", "#d3d5de", "#6da7ec", "#1c5cab"]
NAMES = ["Clearly negative", "Slightly negative", "Neutral / no difference", "Slightly positive", "Clearly positive"]
TEXT_ON = ["#ffffff", "#ffffff", "#464b5e", "#ffffff", "#ffffff"]

W, LABEL_W, ROW_H, BAR_H, GAP = 1240, 300, 46, 26, 2
PLOT_W = W - LABEL_W - 40
SCALE = PLOT_W / 200.0  # -100..100
ZERO = LABEL_W + PLOT_W / 2
H = ROW_H * len(ROWS) + 40

def chart():
    out = [f'<svg viewBox="0 0 {W} {H}" width="100%" style="display:block; font-family: var(--mono);" role="img" aria-label="Diverging stacked bars of survey answers per question">']
    # gridlines
    for t in (-100, -50, 0, 50, 100):
        x = ZERO + t * SCALE
        col = "#111111" if t == 0 else "#e6e1dc"
        out.append(f'<line x1="{x:.1f}" y1="8" x2="{x:.1f}" y2="{H-28}" stroke="{col}" stroke-width="1"/>')
        out.append(f'<text x="{x:.1f}" y="{H-10}" font-size="11" fill="#8f8d8b" text-anchor="middle">{abs(t)}</text>')
    for i, (label, n, vals) in enumerate(ROWS):
        y = 14 + i * ROW_H
        out.append(f'<text x="{LABEL_W-14}" y="{y+BAR_H/2+1}" font-size="13" fill="#111111" text-anchor="end" dominant-baseline="middle" font-family="Tabular, sans-serif">{label}</text>')
        out.append(f'<text x="{LABEL_W-14}" y="{y+BAR_H/2+16}" font-size="10" fill="#8f8d8b" text-anchor="end" dominant-baseline="middle">{n}</text>')
        neg = vals[0] + vals[1] + vals[2] / 2
        x = ZERO - neg * SCALE
        for k, v in enumerate(vals):
            if v == 0:
                continue
            w = v * SCALE - GAP
            out.append(f'<g class="seg"><title>{label}: {NAMES[k]} {v}%</title>'
                       f'<rect x="{x+GAP/2:.1f}" y="{y}" width="{w:.1f}" height="{BAR_H}" fill="{COLORS[k]}"/>')
            if v >= 8:
                out.append(f'<text x="{x+v*SCALE/2:.1f}" y="{y+BAR_H/2+1}" font-size="12" fill="{TEXT_ON[k]}" text-anchor="middle" dominant-baseline="middle">{v}</text>')
            out.append('</g>')
            x += v * SCALE
    out.append(f'<text x="{ZERO:.1f}" y="{H-24}" font-size="10" fill="#8f8d8b" text-anchor="middle">← negative / unchanged · positive →</text>')
    out.append('</svg>')
    return "\n".join(out)

src = (HERE / "template.html").read_text()
src = src.replace("/*__FONTS__*/", fonts_css).replace("<!--__CHART__-->", chart())
(HERE / "Main.dc.html").write_text(src)
mobile = src.replace('"$preview":{"width":1440,"height":1500}', '"$preview":{"width":390,"height":2600}')
(HERE / "Mobile.dc.html").write_text(mobile)
print("built", len(src) // 1024, "KB")
