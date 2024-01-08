import * as fs from "fs";
import * as path from "path";

const deleteFolder = (folderPath: string): void => {
  // Read the contents of the folder
  const folderContents: string[] = fs.readdirSync(folderPath);

  // // Check if the folder is not empty
  if (folderContents.length > 0) {
    folderContents.forEach((file) => {
      const filePath: string = path.join(folderPath, file);
      fs.unlinkSync(filePath);
    });
    fs.rmdirSync(folderPath);
    console.log(`Folder '${folderPath}' and its contents have been deleted.`);
  } else {
    console.log(`Folder '${folderPath}' is empty. No deletion needed.`);
  }
};

export { deleteFolder };
