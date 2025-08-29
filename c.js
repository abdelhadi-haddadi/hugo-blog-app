const fs = require("fs");
const path = require("path");

const directory = path.join(__dirname, "content"); // adjust if your .md files are elsewhere

function fixDescriptionsInFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // Regex: match description = " ... possibly multiline ... "
    const fixed = content.replace(
        /description\s*=\s*"([\s\S]*?)"/gm,
        (match, p1) => {
            // Remove newlines and extra spaces inside description
            const cleaned = p1.replace(/\s*\n\s*/g, " ").trim();
            return `description = "${cleaned}"`;
        }
    );

    if (fixed !== content) {
        fs.writeFileSync(filePath, fixed, "utf8");
        console.log(`Fixed: ${filePath}`);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith(".md")) {
            fixDescriptionsInFile(fullPath);
        }
    });
}

walkDir(directory);
