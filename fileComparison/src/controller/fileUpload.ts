import { Request, Response } from "express";
import { onRender } from "../helper/utils";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { compareText } from "../services/text";
import { deleteFolder } from "../helper/deleteFolder";

export const showHomePage = (req: Request, res: Response) => {
  const dataToRender = {
    pageName: "index",
    successMessage: false,
    errorMessage: false,
    data: [],
  };
  onRender(dataToRender, res);
};

export const pdfPages = async (req: Request, res: Response) => {
  try {
    const uploadFile: any = req.files;
    const findNotPDFType = uploadFile.every(
      (item: any) => item.mimetype == "application/pdf"
    );
    if (!findNotPDFType) {
      const dataToRender = {
        pageName: "index",
        successMessage: false,
        errorMessage: "only pdf files are allowed for now",
        data: [],
      };
      onRender(dataToRender, res);
      return;
    }
    let fetchResult: any = await compareText(uploadFile);
    if (fetchResult.isIdentical === false) {
      const dataToRender = {
        pageName: "compare",
        successMessage: false,
        errorMessage: false,
        data: fetchResult.data,
        firstFile: fetchResult.firstFile,
        secondFile: fetchResult.secondFile,
      };
      onRender(dataToRender, res);
      deleteFolder(`${String(process.env.FILE_PATH)}`);
      return;
    } else {
      const dataToRender = {
        pageName: "compare",
        successMessage: true,
        errorMessage: false,
        data: [],
      };
      onRender(dataToRender, res);
      deleteFolder(`${String(process.env.FILE_PATH)}`);
      return;
    }
  } catch (err: any) {
    //if by chance fill will get uploaded and it's showing something wrong then delete the folder
    deleteFolder(`${String(process.env.FILE_PATH)}`);
    if (err.err["message"]) {
      const dataToRender = {
        pageName: "index",
        successMessage: false,
        errorMessage:
          "something wrong with pdf file, please try another one/check it",
        data: [],
      };
      onRender(dataToRender, res);
    } else {
      const dataToRender = {
        pageName: "error",
        successMessage: false,
        errorMessage: false,
        data: [],
      };
      onRender(dataToRender, res);
    }
  }
};
