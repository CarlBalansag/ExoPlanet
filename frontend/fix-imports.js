import fs from "fs";
import path from "path";

const directory = "src";

function fixImports(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      fixImports(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");

      // Remove @version patterns like @1.1.2 or @0.487.0
      const newContent = content.replace(/@(\d+\.){1,2}\d+/g, "");

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, "utf8");
        console.log(`✅ Cleaned: ${fullPath}`);
      }
    }
  }
}

fixImports(directory);
console.log("✨ All import paths cleaned!");
