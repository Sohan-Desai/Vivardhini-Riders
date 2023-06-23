const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../util/errorhandler");
const ApiFeatures = require("../util/apifeatures");
const sendToken = require("../util/jwtToken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

/*########################################################################################################################################## */
// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload_large(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    });

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    sendToken(user, 201, res);

});
/*########################################################################################################################################## */

// User login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    //checking if user has given both eail and password
    if (!email || !password) {
        return next(new ErrorHandler("Please enter both email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect email or password", 401));
    }

    sendToken(user, 200, res);

})
/*########################################################################################################################################## */

// Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully!"
    });
})
/*########################################################################################################################################## */

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //need to change reset port
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Hello ${user.name}!\nYour password reset token is, \n\n ${resetPasswordUrl} \n\nIn case you have not requested for a reset, please ignore it.\nKindly note that the link expires within 5 minutes since generation`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Vivardhini Riders Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})
/*########################################################################################################################################## */

// Resetting password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match!", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})
/*########################################################################################################################################## */

// Get self user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });

})
/*########################################################################################################################################## */

// Update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Existing password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

})
/*########################################################################################################################################## */

// Update profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload_large(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    });
})
/*########################################################################################################################################## */

// Get all users        --admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
})
/*########################################################################################################################################## */

// Get user details     --admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`), 400);
    }

    res.status(200).json({
        success: true,
        user
    });
})
/*########################################################################################################################################## */

// Get wishlist
exports.getUserWishlist = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).populate('wishlist');

    res.status(200).json({
        success: true,
        user
    });

})
/*########################################################################################################################################## */

// Update user role     --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
})
/*########################################################################################################################################## */

// Delete user      --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`), 400);
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully!"
    });
})

/*########################################################################################################################################## */

// Block user      --admin
exports.blockUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`), 400);
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        isBlocked: true
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "User blocked"
    });
})

/*########################################################################################################################################## */

// Unblock user      --admin
exports.unBlockUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`), 400);
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        isBlocked: false
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });


    res.status(200).json({
        success: true,
        message: "User unblocked"
    });
})
