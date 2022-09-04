const mongoose = require("mongoose");
const colorModel = require("../model/colorModel");
const productModel = require("../model/productModel");

const createColor = async (req, res) => {
  try {
    const { color } = req.body;

    const product = await productModel.findById(req.params.id);
    const colorData = new colorModel({
      color,
    });

    colorData.product = product;
    colorData.save();

    product.color.push(mongoose.Types.ObjectId(colorData._id));
    product.save();

    res.status(201).json({
      status: "colorData created successfully",
      data: colorData,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const allColor = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "color",
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

const showColor = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "color",
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

const deleteColor = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    const deleteData = await colorModel.findByIdAndRemove(req.params.capacity);

    product.color.pull(deleteData);
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
  showColor,
  allColor,
  createColor,
  deleteColor,
};
