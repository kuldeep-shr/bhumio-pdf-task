import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import { serviceRoute } from "./routes/routes";
import { MulterError } from "multer";
import { onRender } from "./helper/utils";
import * as path from "path";
const app = express();
const port = process.env.PORT || 8003;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../view"));
app.use(express.static(__dirname + "../../../view"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", serviceRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MulterError) {
    if (err.code === "LIMIT_FILE_COUNT") {
      const dataToRender = {
        pageName: "index",
        successMessage: false,
        errorMessage: "too many files uploaded, only two files are allowed",
        data: [],
      };
      onRender(dataToRender, res);
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      const dataToRender = {
        pageName: "index",
        successMessage: false,
        errorMessage: "file size is too large, only max 2mb allowed",
        data: [],
      };
      onRender(dataToRender, res);
    }
  } else {
    const dataToRender = {
      pageName: "index",
      successMessage: false,
      errorMessage: err.message ? err.message : "something went wrong",
      data: [],
    };
    onRender(dataToRender, res);
  }
});

app.listen(port, () => {
  console.log(`File Comparison Backend is running on port ==> ${port}`);
});
