const catchAsyncErrors = require("../middleware/catchAsyncError");
const Blog = require("../models/blogModel");
const ErrorHandler = require("../util/errorhandler");
const cloudinary = require("cloudinary");

exports.createBlog = catchAsyncErrors(async (req, res, next) => {
    const newBlog = await Blog.create(req.body);

    res.status(201).json({
        success: true,
        newBlog
    });

})

exports.updateBlog = async (req, res, next) => {

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        blog
    });
}

exports.getBlogDetails = catchAsyncErrors(async (req, res, next) => {

    let blog = await Blog.findById(req.params.id)
    .populate('likes')
    .populate('dislikes');

    if (!blog)
        return next(new ErrorHandler("Blog not found", 404));

    await Blog.findByIdAndUpdate(req.params.id, {
        $inc:{ numViews: 1}
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        blog
    });
})

exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {

    const blogs = await Blog.find()

    res.status(200).json({
        success: true,
        blogs
    });
})

exports.deleteBlog = async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog not found", 404));
    }

    //deleting images from cloudinary
    // for (let i = 0; i < blog.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(
    //         blog.images[i].public_id
    //     );
    // }

    await blog.deleteOne()

    res.status(200).json({
        success: true,
        message: "Blog deleted successfully!"
    })
}

exports.likeBlog = catchAsyncErrors(async (req, res, next) => {

    let blog = await Blog.findById(req.body.blogId)

    if (!blog)
        return next(new ErrorHandler("Blog not found", 404));
    
    const loggedInUserId = req.user?.id;

    const isLiked = blog.isLiked;

    const alreadyDisliked = blog.dislikes.find(
        ((userId) => userId.toString() === loggedInUserId.toString())
    );

    if(alreadyDisliked){
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $pull:{dislikes: loggedInUserId},
            isDisliked: false
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    if(isLiked){
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $pull:{likes: loggedInUserId},
            isLiked: false
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } else{
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $push:{likes: loggedInUserId},
            isLiked: true
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    res.status(200).json({
        success: true,
        blog
    });
})

exports.dislikeBlog = catchAsyncErrors(async (req, res, next) => {

    let blog = await Blog.findById(req.body.blogId)

    if (!blog)
        return next(new ErrorHandler("Blog not found", 404));
    
    const loggedInUserId = req.user?.id;

    const isDisliked = blog.isDisliked;

    const alreadyLiked = blog.likes.find(
        ((userId) => userId.toString() === loggedInUserId.toString())
    );

    if(alreadyLiked){
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $pull:{likes: loggedInUserId},
            isLiked: false
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    if(isDisliked){
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $pull:{dislikes: loggedInUserId},
            isDisliked: false
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    } else{
        blog = await Blog.findByIdAndUpdate(req.body.blogId,{
            $push:{dislikes: loggedInUserId},
            isDisliked: true
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    }

    res.status(200).json({
        success: true,
        blog
    });
})