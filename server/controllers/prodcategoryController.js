const catchAsyncErrors = require("../middleware/catchAsyncError");
const Category = require("../models/prodcategoryModel");
const ErrorHandler = require("../util/errorhandler");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        success: true,
        newCategory
    });

})

exports.updateCategory = async (req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        category
    });
}

exports.getCategory = catchAsyncErrors(async (req, res, next) => {

    let category = await Category.findById(req.params.id)

    if (!category)
        return next(new ErrorHandler("Category not found", 404));

    res.status(200).json({
        success: true,
        category
    });
})

exports.deleteCategory = async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler("Category not found", 404));
    }

    await category.deleteOne()

    res.status(200).json({
        success: true,
        message: "Category deleted successfully!"
    })
}

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {

    const categories = await Category.find()

    res.status(200).json({
        success: true,
        categories
    });
})