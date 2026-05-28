import { parseExcelFile } from "./lib/parseExcel.ts";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const filePath = path.join(__dirname, "test-data.xlsx");
  const fileBuffer = await fs.readFile(filePath);
  
  const arrayBuffer = fileBuffer.buffer.slice(
    fileBuffer.byteOffset,
    fileBuffer.byteOffset + fileBuffer.byteLength
  );

  const result = parseExcelFile(arrayBuffer);
  
  console.log("Parsed Students:", result.students.length);
  console.log("Warnings:", result.warnings);

  if (result.students.length > 0) {
    console.log("First Student parsed:");
    console.log(JSON.stringify(result.students[0], null, 2));
    
    console.log("Second Student parsed (Juan Jose Bueno Bueno - checking empty grade):");
    const juan = result.students.find(s => s.fullName.includes("Juan Jose Bueno"));
    if (juan) {
      console.log(JSON.stringify(juan, null, 2));
    }

    // Write to public/data/students.json
    const outputPath = path.join(__dirname, "public", "data", "students.json");
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify({ students: result.students }, null, 2), "utf-8");
    console.log("Updated public/data/students.json with new attendance rules!");
  }
}

run().catch(console.error);
