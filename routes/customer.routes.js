const express = require("express");
const router = express.Router();
//create new customer
const {createCustomer,getById,distinctCity,createCutomerWithValidation,customerSerch} = require("../controllers/customer.controller");
const Customer = require("../model/Customer.model")

router.post('/customer',createCustomer);
router.post('/customer/validation',createCutomerWithValidation)

router.get('/customer/distinct',distinctCity)

router.get('/customer/search',customerSerch)

router.get('/customer/:id',getById);



module.exports = router; 