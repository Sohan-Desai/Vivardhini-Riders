const express = require("express");
const {
    createBlog,
    updateBlog,
    getBlogDetails,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    dislikeBlog
} = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/blog/like").put(isAuthenticatedUser, likeBlog);
router.route("/blog/dislike").put(isAuthenticatedUser, dislikeBlog);
router.route("/blog").get(getAllBlogs);
router.route("/blog/new").post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);
router.route("/blog/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog)
    .get(getBlogDetails)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

module.exports = router