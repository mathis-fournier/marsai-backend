import multer from "multer";
import path from "path";

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

const fileFilter = (req: any, file: any, callback: any) => {
  const allowedTypes = ["image/jpeg", " image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Type de fichier non autorisé"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
export default upload;
