const catchAsyncErrors = require("../middleware/catchAsyncError");
const Brand = require("../models/brandModel");
const ErrorHandler = require("../util/errorhandler");

exports.createBrand = catchAsyncErrors(async (req, res, next) => {
    const newBrand = await Brand.create(req.body);

    res.status(201).json({
        success: true,
        newBrand
    });

})

exports.updateBrand = async (req, res, next) => {

    let brand = await Brand.findById(req.params.id);

    if (!brand) {
        return next(new ErrorHandler("Brand not found", 404));
    }

    brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        brand
    });
}

exports.getBrand = catchAsyncErrors(async (req, res, next) => {

    let brand = await Brand.findById(req.params.id)

    if (!brand)
        return next(new ErrorHandler("Brand not found", 404));

    res.status(200).json({
        success: true,
        brand
    });
})

exports.deleteBrand = async (req, res, next) => {

    const brand = await Brand.findById(req.params.id);

    if (!brand) {
        return next(new ErrorHandler("Brand not found", 404));
    }

    await brand.deleteOne()

    res.status(200).json({
        success: true,
        message: "Brand deleted successfully!"
    })
}

exports.getAllBrands = catchAsyncErrors(async (req, res, next) => {

    const brands = await Brand.find()

    res.status(200).json({
        success: true,
        brands
    });
})