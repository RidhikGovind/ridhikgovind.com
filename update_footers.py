import os
import re

js_code = """
    const quips = [
      "Still not sure if that padding is right.",
      "The client wanted it blue. We compromised.",
      "Shipped it anyway.",
      "Somewhere between the brief and Figma, the truth lives.",
      "The design was perfect. Then the meeting happened.",
      "Built with too much tea and not enough sleep.",
      "The first version was worse. Trust me.",
      "Figma crashed twice making this.",
      "The font took longer to pick than the layout.",
      "Designed by someone who still zooms into pixels at 3am.",
      "The PM said two weeks. It took four. Worth it.",
      "Every screen you see went through at least five bad versions first.",
      "I almost went with a different shade of brown.",
      "Designed in Kerala, overthought everywhere.",
      "The spacing is intentional. Mostly."
    ];
    document.getElementById("footer-quip").textContent = quips[Math.floor(Math.random() * quips.length)];
"""

directory = r"c:\Users\Ridhik\Documents\codeworld\ridhikgovind-portfolio-simple"

for root, _, files in os.walk(directory):
    for filename in files:
        if filename.endswith(".html"):
            path = os.path.join(root, filename)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()

            if "footer-quip" in content:
                continue

            content = re.sub(
                r'<span>Designed.*Kerala, India</span>',
                r'<span id="footer-quip"></span>',
                content
            )

            year_line = "document.getElementById('year').textContent = new Date().getFullYear();\n"
            if year_line in content:
                content = content.replace(year_line, year_line + js_code)
            else:
                year_line2 = "document.getElementById('year').textContent = new Date().getFullYear();"
                if year_line2 in content:
                    content = content.replace(year_line2, year_line2 + "\n" + js_code)
                
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)

print("Done updating text.")
