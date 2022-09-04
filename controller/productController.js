const productModel = require("../model/productModel");
const brandModel = require("../model/brandModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const product = await brandModel.findById(req.params.id).populate({
      path: "product",
      options: {
        sort: { createdAt: -1 },
      },
    });
    res.status(200).json({ message: "All Product found", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await brandModel.findById(req.params.id).populate({
      path: "product",
      options: {
        limit: 3,
        sort: { createdAt: -1 },
      },
    });
    res.status(200).json({ message: "Single Product found", data: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const brand = await brandModel.findById(req.params.id);
    const deleteData = await productModel.findByIdAndRemove(req.params.product);

    brand.product.pull(deleteData);
    brand.save();

    res.status(200).json({
      status: "deleted",
      data: brand,
    });
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
    const { model, batteryLife, screen, finger, faceID, network, camera } =
      req.body;

    const product = await brandModel.findById(req.params.id);
    const newProduct = new productModel({
      model,
      batteryLife,
      screen,
      finger,
      faceID,
      network,
      camera,
    });

    newProduct.product = product;
    newProduct.save();

    product.product.push(mongoose.Types.ObjectId(newProduct._id));
    product.save();

    res.status(201).json({
      status: "product created successfully",
      data: newProduct,
    });
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
