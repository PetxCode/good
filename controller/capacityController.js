const mongoose = require("mongoose");
const capacityModel = require("../model/capacityModel");
const productModel = require("../model/productModel");

const createCapacity = async (req, res) => {
  try {
    const { price, size } = req.body;

    const product = await productModel.findById(req.params.id);
    const capacity = new capacityModel({
      size,
      price,
    });

    capacity.product = product;
    capacity.save();

    product.capacity.push(mongoose.Types.ObjectId(capacity._id));
    product.save();

    res.status(201).json({
      status: "capacity created successfully",
      data: capacity,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const allCapacity = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "capacity",
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

const showCapacity = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).populate({
      path: "capacity",
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

const deleteCapacity = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    const deleteData = await capacityModel.findByIdAndRemove(
      req.params.capacity
    );

    product.capacity.pull(deleteData);
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
  showCapacity,
  allCapacity,
  createCapacity,
  deleteCapacity,
};
