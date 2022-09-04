const mongoose = require("mongoose");
const imageModel = require("../model/imageModel");
const productModel = require("../model/productModel");
const cloudinary = require("../utils/cloudinary");

const createImage = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);

    const product = await productModel.findById(req.params.id);
    const phone = new imageModel({
      image: image.secure_url,
      imageID: image.public_id,
    });

    phone.user = product;
    phone.save();

    product.phoneImage.push(mongoose.Types.ObjectId(phone._id));
    product.save();

    res.status(201).json({
      status: "image created successfully",
      data: phone,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const allImage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "phoneImage",
      options: {
        sort: { createdAt: -1 },
      },
    });

    res.status(200).json({
      status: "successful",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showImage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "phoneImage",
      options: {
        limit: 3,
        sort: { createdAt: -1 },
      },
    });

    res.status(200).json({
      status: "successful",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    const deleteData = await imageModel.findByIdAndRemove(req.params.image);

    product.phoneImage.pull(deleteData);
    product.save();

    res.status(200).json({
      status: "deleted",
      data: product,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

module.exports = {
  showImage,
  allImage,
  createImage,
  deleteImage,
};
