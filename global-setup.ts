import fs from 'fs';
import path from 'path';

export default async () => {
  const artifactsPath = path.resolve(process.cwd(), '.artifacts');

  // Delete existing artifacts folder if it exists
  if (fs.existsSync(artifactsPath)) {
    fs.rmSync(artifactsPath, { recursive: true, force: true });
    console.log('.artifacts folder deleted.');
  }

  // Create a fresh artifacts folder
  fs.mkdirSync(artifactsPath, { recursive: true });
  console.log('.artifacts folder created.');
};
