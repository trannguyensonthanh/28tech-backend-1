// const storageMulter = require("../../helpers/storageMulter")
// const upload = multer({ storage: storageMulter() })
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const validate = require("../../validate/admin/product-category.validate");
const controller = require("../../controllers/admin/product-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
uploadCloud.upload,
  validate.createPost,
  controller.createPost
);
module.exports = router;
