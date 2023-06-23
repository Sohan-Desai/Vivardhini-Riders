const express = require("express");
const {
    createCategory,
    updateCategory,
    getCategory,
    deleteCategory,
    getAllCategories
} = require("../controllers/prodcategoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/category")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
    .get(getAllCategories);

router.route("/category/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory)
    .get(getCategory);

module.exports = router
