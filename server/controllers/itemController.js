const catchAsyncErrors = require("../middleware/catchAsyncError");
const Item = require("../models/itemModel");
const ErrorHandler = require("../util/errorhandler");
const ApiFeatures = require("../util/apifeatures");
const cloudinary = require("cloudinary");

// Get all items
exports.getAllItems = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = 8;
    const itemCount = await Item.countDocuments();

    const apifeature = new ApiFeatures(Item.find(), req.query)
        .search()
        .filter()
    let items = await apifeature.query;
    let filteredItemsCount = items.length;

    apifeature.pagination(resultPerPage);

    items = await apifeature.query;

    res.status(200).json({
        success: true,
        items,
        itemCount,
        resultPerPage,
        filteredItemsCount
    });
})

// Get all items (admin-dashboard)
exports.getAdminItems = catchAsyncErrors(async (req, res, next) => {

    const items = await Item.find()

    res.status(200).json({
        success: true,
        items
    });
})

// Get item details
exports.getItemDetails = catchAsyncErrors( async (req, res, next) => {

    const item = await Item.findById(req.params.id)

    if (!item)
        return next(new ErrorHandler("Item not found", 404));

    res.status(200).json({
        success: true,
        item
    });
})

// Ceate product        -- admin
exports.createItem = catchAsyncErrors(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "items"
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLink
    req.body.creator = req.user.id

    const item = await Item.create(req.body);

    res.status(201).json({
        success: true,
        item
    });
})

// Update item       -- admin

exports.updateItem = async (req, res, next) => {

    let item = await Item.findById(req.params.id);

    if (!item) {
        return next(new ErrorHandler("Item not found", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        for (let i = 0; i < item.images.length; i++) {
            await cloudinary.v2.uploader.destroy(
                item.images[i].public_id
            );
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "items"
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imagesLink
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        item
    })
}

// Delete item       -- admin

exports.deleteItem = async (req, res, next) => {

    const item = await Item.findById(req.params.id);

    if (!item) {
        return next(new ErrorHandler("Item not found", 404));
    }

    //deleting images from cloudinary
    for (let i = 0; i < item.images.length; i++) {
        await cloudinary.v2.uploader.destroy(
            item.images[i].public_id
        );
    }

    await item.deleteOne()

    res.status(200).json({
        success: true,
        message: "Item deleted successfully!"
    })
}

// Create new review or update existing one

exports.createItemReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, itemId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const item = await Item.findById(itemId);

    const isReviewed = item.reviews.find(
        rev => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        item.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        item.reviews.push(review);
        item.numOfReviews = item.reviews.length
    }

    let avgRating = 0;
    item.reviews.forEach(rev => {
        avgRating += rev.rating
    });
    item.ratings = avgRating / item.reviews.length;

    await item.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    });
})

// Get all reviews of a single product

exports.getItemReviews = catchAsyncErrors(async (req, res, next) => {

    const item = await Item.findById(req.query.id);
    console.log("Request recieved")

    if (!item) {
        return next(new ErrorHandler("Item not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: item.reviews
    });
})

// Delete a review

exports.deleteItemReview = catchAsyncErrors(async (req, res, next) => {

    const item = await Item.findById(req.query.itemId);

    if (!item) {
        return next(new ErrorHandler("Item not found", 404));
    }

    const reviews = item.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avgRating = 0;
    reviews.forEach((rev) => {
        avgRating += rev.rating
    });

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avgRating / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Item.findByIdAndUpdate(
        req.query.itemId,
        { reviews, ratings, numOfReviews },
        { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
        success: true,
    });
})