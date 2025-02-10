const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const colors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
const directories = [
  'public/images/properties',
  'public/images/projects',
  'public/images/about',
  'public/images/partners'
];

// Create directories if they don't exist
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function generatePlaceholder(width, height, text, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Generate property images
for (let i = 1; i <= 3; i++) {
  generatePlaceholder(800, 600, `Property ${i}`, `public/images/properties/property${i}.jpg`);
}

// Generate project images
['tech-hub', 'green-park'].forEach(name => {
  generatePlaceholder(800, 600, name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), `public/images/projects/${name}.jpg`);
});

// Generate about image
generatePlaceholder(800, 600, 'Our Team', 'public/images/about/team.jpg');

// Generate partner logos
[
  'maharashtra-gov',
  'midc',
  'bank-of-maharashtra',
  'sidbi',
  'msme',
  'make-in-india'
].forEach(name => {
  generatePlaceholder(400, 200, name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), `public/images/partners/${name}.png`);
});
