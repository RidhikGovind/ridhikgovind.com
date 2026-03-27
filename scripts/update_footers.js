const fs = require('fs');
const path = require('path');

const jsCode = `
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
`;

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('.git') && !dirFile.includes('node_modules')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.endsWith('.html')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const directory = "c:/Users/Ridhik/Documents/codeworld/ridhikgovind-portfolio-simple";
const files = walkSync(directory);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('footer-quip')) {
    continue;
  }

  // Replace second span in footer
  content = content.replace(/<span>Designed.*Kerala, India<\/span>/, '<span id="footer-quip"></span>');

  // Insert JS after setting year
  const yearLine = "document.getElementById('year').textContent = new Date().getFullYear();\n";
  if (content.includes(yearLine)) {
    content = content.replace(yearLine, yearLine + jsCode);
  } else {
    const yearLine2 = "document.getElementById('year').textContent = new Date().getFullYear();";
    if (content.includes(yearLine2)) {
      content = content.replace(yearLine2, yearLine2 + "\n" + jsCode);
    }
  }

  fs.writeFileSync(file, content, 'utf8');
}
console.log("Updated footers successfully.");
