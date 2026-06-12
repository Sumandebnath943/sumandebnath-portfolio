const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Regex to extract all PDF paths from the data.js file
const pdfRegex = /pdf:\s*"(assets\/certificates\/[^"]+\.pdf)"/g;

let match;
let total = 0;
let missing = 0;

console.log("==========================================");
console.log(" STRICT PDF AUDIT REPORT");
console.log("==========================================\n");

while ((match = pdfRegex.exec(dataContent)) !== null) {
    total++;
    const relativePath = match[1];
    const absolutePath = path.join(__dirname, '..', relativePath);
    
    if (!fs.existsSync(absolutePath)) {
        console.log(`[FAIL] File missing: ${relativePath}`);
        missing++;
    } else {
        console.log(`[OK]   ${relativePath}`);
    }
}

console.log("\n==========================================");
console.log(` TOTAL CHECKED: ${total}`);
console.log(` MISSING:       ${missing}`);
console.log("==========================================");
