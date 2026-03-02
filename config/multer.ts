import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const extension = path.extname(file.originalname);
    callback(null, name + "_" + Date.now() + extension);
  },
});

const filter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Format invalide "));
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
});

export default upload;
