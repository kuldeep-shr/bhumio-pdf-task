import { Response } from "express";
import { render } from "./d";

const onRender = (argu: render, res: Response): void => {
  const pageToBeRender = argu.pageName;
  const message = {
    successMessage: argu.successMessage,
    errorMessage: argu.errorMessage,
    firstFile: argu.firstFile ? argu.firstFile : "",
    secondFile: argu.secondFile ? argu.secondFile : "",
    data: argu.data,
  };
  return res.render(pageToBeRender, message);
};

export { onRender };
