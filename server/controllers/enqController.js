const catchAsyncErrors = require("../middleware/catchAsyncError");
const Enquiry = require("../models/enqModel");
const ErrorHandler = require("../util/errorhandler");

exports.createEnquiry = catchAsyncErrors(async (req, res, next) => {
    const newEnquiry = await Enquiry.create(req.body);

    res.status(201).json({
        success: true,
        newEnquiry
    });

})

exports.updateEnquiry = async (req, res, next) => {

    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
        return next(new ErrorHandler("Enquiry not found", 404));
    }

    enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        enquiry
    });
}

exports.getEnquiry = catchAsyncErrors(async (req, res, next) => {

    let enquiry = await Enquiry.findById(req.params.id)

    if (!enquiry)
        return next(new ErrorHandler("Enquiry not found", 404));

    res.status(200).json({
        success: true,
        enquiry
    });
})

exports.deleteEnquiry = async (req, res, next) => {

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
        return next(new ErrorHandler("Enquiry not found", 404));
    }

    await enquiry.deleteOne()

    res.status(200).json({
        success: true,
        message: "Enquiry deleted successfully!"
    })
}

exports.getAllEnquiries = catchAsyncErrors(async (req, res, next) => {

    const enquiries = await Enquiry.find()

    res.status(200).json({
        success: true,
        enquiries
    });
})