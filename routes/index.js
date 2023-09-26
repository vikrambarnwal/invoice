var express = require('express');
var router = express.Router();
const { verifyBody } = require("../services/utils");
const { getInvoice } = require("../services/Invoice");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).render('file.ejs')
});

router.post("/getInvoice", (req, res) => {
  let data = {
    logo: "https://imgtr.ee/images/2023/09/26/f0ff0b4232455bfb2bf8b29491e57ef6.jpeg",
    name: "P2S FINANCIAL SOLUTIONS",
    address1: "D-147, POCKET -3, TYPE-A, DDA FLATS, BINDAPUR",
    address2: "UTTAM NAGAR, NEW DELHI - 110059",
    orderId: "INV-001",
    customerName: "DEWASHISH DWIVEDI (BUNPD2671N)",
    date: "Sep 26, 2023",
    paymentTerms: "Delivery Items Receipt",
    items: [
      {
        name: "INCOME TAX CONSULTANCY FEE INCLUDING FILING FEE",
        qty: 1,
        rate: "6 %",
        amount: "13178.00"
      }
    ],
    total: "13178.00",
    balanceDue: "7678.00",
    notes: "Thanks for being an awesome customer!",
    terms: "This invoice is auto generated at the time of delivery. If there is any issue, Contact provider"
  };

  const result = verifyBody(data)
  if (result.success) {
    data.customerName=req.body.name;
    getInvoice(data).then(pdf => {
      res.status(200)
      res.contentType("application/pdf");
      res.send(pdf);
    }).catch(err => {
      console.error(err)
      res.status(500).send({ success: false, error: "something went wrong" })
    })
  } else {
    res.status(400).send(result)
  }
})

module.exports = router;