const brandModel = require("../model/brandModel");
const cloudinary = require("../utils/cloudinary");

const getBrands = async (req, res) => {
  try {
    const brand = await brandModel.find().sort({ createdBy: -1 });
    res.status(200).json({ message: "All brand found", data: brand });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await brandModel.findById(req.params.id);
    res.status(200).json({ message: "Single brand found", data: brand });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await brandModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "brand remove from DB", data: brand });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { brandName } = req.body;

    const brand = await brandModel.findByIdAndUpdate(
      req.params.id,
      {
        brandName,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "This brand has been updated", data: brand });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);

    const brand = await brandModel.create({
      brandName,
      logo: image.secure_url,
      logoID: image.public_id,
    });
    res.status(200).json({ message: "brand created", data: brand });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  deleteBrand,
  updateBrand,
};
