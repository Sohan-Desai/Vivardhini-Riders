const express = require("express");
const { getAllItems, getAdminItems ,createItem, updateItem, deleteItem, getItemDetails, createItemReview, getItemReviews, deleteItemReview } = require("../controllers/itemController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/items")
    .get(getAllItems);

router.route("/item/:id")
    .get(getItemDetails);

router.route("/admin/items")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminItems);

router.route("/admin/item/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createItem);

router.route("/admin/item/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateItem)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteItem);

router.route("/item/review").put(isAuthenticatedUser, createItemReview);
router.route("/item/reviews")
    .get(getItemReviews)
    .delete(isAuthenticatedUser, deleteItemReview);

module.exports = router