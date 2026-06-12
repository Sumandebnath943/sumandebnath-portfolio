const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, 'js', 'data.js');
const artifactsDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\2e63eaf6-334a-41bf-9238-c9dce0576552';

const dataJsContent = fs.readFileSync(dataJsPath, 'utf-8');

// Extract all pdf paths
const pdfPaths = [];
const regex = /pdf:\s*['"]([^'"]+)['"]/g;
let match;
while ((match = regex.exec(dataJsContent)) !== null) {
    pdfPaths.push(match[1]);
}

let report = '# PDF Audit Report\n\n';
let brokenCount = 0;

if (pdfPaths.length === 0) {
    report += 'No PDF references found in js/data.js.\n';
} else {
    report += `Found ${pdfPaths.length} PDF references.\n\n`;
    
    for (const pdfPath of pdfPaths) {
        const fullPath = path.join(__dirname, pdfPath.replace(/\//g, path.sep));
        if (fs.existsSync(fullPath)) {
            report += `- [x] \`${pdfPath}\` exists.\n`;
        } else {
            report += `- [ ] **BROKEN REFERENCE**: \`${pdfPath}\` does not exist.\n`;
            brokenCount++;
        }
    }
}

report += `\n**Summary:** ${pdfPaths.length - brokenCount} valid, ${brokenCount} broken references.\n`;

fs.writeFileSync(path.join(artifactsDir, 'pdf_audit_report.md'), report);
console.log(`Audit complete. Found ${pdfPaths.length} references, ${brokenCount} broken. Report saved.`);
