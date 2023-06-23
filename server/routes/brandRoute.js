const express = require("express");
const {
    createBrand,
    updateBrand,
    getBrand,
    deleteBrand,
    getAllBrands
} = require("../controllers/brandController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/brand")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createBrand)
    .get(getAllBrands);

router.route("/brand/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand)
    .get(getBrand);

module.exports = router
