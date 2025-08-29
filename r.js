import fs from "fs";
import path from "path";

const dir = "./"; // change this to the directory where your .mdx files are

fs.readdir(dir, (err, files) => {
    if (err) {
        console.error("Error reading directory:", err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === ".mdx") {
            const filePath = path.join(dir, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error(`Error deleting ${file}:`, err);
                } else {
                    console.log(`Deleted: ${file}`);
                }
            });
        }
    });
});
