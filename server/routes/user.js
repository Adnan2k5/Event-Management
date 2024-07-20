const express = require("express");
const router = express.Router();
const auth = require('../middlewares/tokenauth');
const { getUser, updateUser } = require("../controllers/userController");




router.get('/profile',auth,getUser);

router.put('/profile', auth, updateUser);




module.exports = router;

