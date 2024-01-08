import * as fs from "fs";
import * as Diff from "diff";
import * as pdfParser from "pdf-parse";
import * as crypto from "crypto";

export const compareText = async (data: any) => {
  try {
    let collectAllText: any = [];

    // checking files are identical or not
    const content1: Buffer = fs.readFileSync(
      `${String(process.env.FILE_PATH)}${data[0].originalname}`
    );
    const content2: Buffer = fs.readFileSync(
      `${String(process.env.FILE_PATH)}${data[1].originalname}`
    );
    const generatingHashForFirstFile: string = crypto
      .createHash("sha256")
      .update(content1)
      .digest("hex");
    const generatingHashForSecondFile: string = crypto
      .createHash("sha256")
      .update(content2)
      .digest("hex");
    if (generatingHashForFirstFile === generatingHashForSecondFile) {
      return {
        isIdentical: true,
        data: [],
      };
    } else {
      for (let i = 0; i < data.length; i++) {
        const filePath = `${String(process.env.FILE_PATH)}${
          data[i].originalname
        }`;
        const fileBuffer: Buffer = fs.readFileSync(filePath);
        const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
          const data = await pdfParser(buffer);
          return data.text;
        };
        const extractText = await extractTextFromPDF(fileBuffer);
        collectAllText.push(extractText);
      }
      const diff = Diff.diffWords(collectAllText[0], collectAllText[1]);
      return {
        isIdentical: false,
        data: diff,
        firstFile: data[0].originalname,
        secondFile: data[1].originalname,
      };
    }
  } catch (err) {
    throw {
      err: err,
      firstFile: data[0].originalname,
      secondFile: data[1].originalname,
    };
  }
};
