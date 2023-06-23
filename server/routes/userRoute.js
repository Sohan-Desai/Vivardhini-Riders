const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUserProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
    blockUser,
    unBlockUser,
    getUserWishlist
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/wishlist").get(isAuthenticatedUser, getUserWishlist);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
router.route("/admin/user/block/:id").put(isAuthenticatedUser, authorizeRoles("admin"), blockUser);
router.route("/admin/user/unblock/:id").put(isAuthenticatedUser, authorizeRoles("admin"), unBlockUser);

module.exports = router;