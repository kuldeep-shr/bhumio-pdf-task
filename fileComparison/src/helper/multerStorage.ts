import * as fs from "fs";
import { Request } from "express";
import * as multer from "multer";

const storage = multer.diskStorage({
  //destination
  destination: function (req: Request, file: any, cb) {
    if (file.length < 1) {
      throw "please upload other file too";
    }
    if (!fs.existsSync(String(process.env.FILE_PATH))) {
      fs.mkdirSync(String(process.env.FILE_PATH));
    }
    cb(null, String(process.env.FILE_PATH));
  },

  //image fullName
  filename: function (req, file: any, cb) {
    cb(null, `${file.originalname}`);
  },
});

// max size of file will be 2MB
export const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000, files: 2 },
});
