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

const upload = multer({
  storage: storage,
});
export default upload;
