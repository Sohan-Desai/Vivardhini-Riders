const express = require("express");
const {
    createEnquiry,
    updateEnquiry,
    getEnquiry,
    deleteEnquiry,
    getAllEnquiries
} = require("../controllers/enqController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/enquiry")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createEnquiry)
    .get(getAllEnquiries);

router.route("/enquiry/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateEnquiry)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEnquiry)
    .get(getEnquiry);

module.exports = router
