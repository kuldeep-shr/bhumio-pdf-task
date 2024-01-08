import * as express from "express";
const router = express.Router();
import { showHomePage, pdfPages } from "../controller/fileUpload";
import { upload } from "../helper/multerStorage";

router.get("/", showHomePage);

router.post("/compare", upload.array("files"), pdfPages);

export const serviceRoute = router;
