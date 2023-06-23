const express = require("express");
const {
    createCategory,
    updateCategory,
    getCategory,
    deleteCategory,
    getAllCategories
} = require("../controllers/blogcategoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/blogcategory")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
    .get(getAllCategories);

router.route("/blogcategory/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)
    .get(getCategory);

module.exports = router
