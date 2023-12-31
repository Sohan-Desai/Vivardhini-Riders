const express = require("express");
const { getAllProducts, getAdminProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products")
    .get(getAllProducts);

router.route("/product/:id")
    .get(getProductDetails);

router.route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/review").put(isAuthenticatedUser, createProductReview);
router.route("/product/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router