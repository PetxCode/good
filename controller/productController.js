const productModel = require("../model/productModel");
const cloudinary = require("../utils/cloudinary");

const getProducts = async (req, res) => {
  try {
    const product = await productModel.find().sort({ createdBy: -1 });
    res.status(200).json({ message: "All Product found", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json({ message: "Single Product found", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Product remove from DB", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      batteryLife,
      screen,
      finger,
      faceID,
      network,
      camera,
    } = req.body;

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        productType,
        batteryLife,
        screen,
        finger,
        faceID,
        network,
        camera,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "This Product has been updated", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productType,
      batteryLife,
      screen,
      finger,
      faceID,
      network,
      camera,
    } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);

    const product = await productModel.create({
      productName,
      productType,
      batteryLife,
      screen,
      finger,
      faceID,
      network,
      camera,
      image: image.secure_url,
      imageID: image.public_id,
    });
    res.status(200).json({ message: "Product created", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
