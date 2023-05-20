const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const userSchema = require('../model/user.js')
const User = mongoose.model('AssigR2')


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.post("/data_send", async (req, res) => {
  console.log(req.body);
  const { a1, a2, a3, a4, a5, a6, b1, b2, b3, b4, b5, b6, c1, c2, c3, d1, d2, d3, e1, e2, e3, e4, f1, f11, f2, f22, f3, f33, f4, f5, g1, g2, h1, h2 } = req.body;
  //hi backend
  const user = User({
    Address: a1,
    Unit_No: a2,
    City: a3,
    Zip_Code: a4,
    State: a5,
    property_Description: a6,
    Builder_Type: b1,
    Age_of_Builder: b2,
    Builder_Type: b3,
    Square_Footage: b4,
    Parking_Type: b5,
    Title: b6,
    Date: c1,
    Status: c2,
    status: c3,
    Bedroom: d1,
    Bedrooms: d2,
    AddedFields:d3,
    Appliance_Include: e1,
    Utilies: e2,
    Parking: e3,
    ExttraAppliance_Include:e4,
    School: f1,
    SchoolDistance:f11,
    Market: f2,
    MarketDistance:f22,
    Community: f3,
    CommunityDistance:f33,
    Pets_alloed: f4,
    Rentals: f5,
    Latitude: g1,
    Longitude: g2,
    Image_url:h1,
    Message:h2
  });

  try {
    await user.save();
    console.log("data saved");
    res.status(201).send({ message: "Data save" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}); 

router.get('/getData', async (req, res)=>{
  try {
    const data = await User.find();
    res.status(200).send(data);
    console.log(data)
  } catch (error) {
    console.error(error);  
    res.status(500).send("Server error");
  }
})

router.post('/editData', async (req, res) => {
  const { id, key, value } = req.body;

  if (!id || !key || !value) {
    return res.status(400).send('All parameters are required');
  }

  try {
    let user = await User.findById(id);
 
    if (!user) {
      return res.status(404).send('User not found');
    }

    const schemaKeys = Object.keys(user.schema.paths);

    if (!schemaKeys.includes(key)) {
      return res.status(400).send(`Key ${key} does not exist in schema`);
    }

    if (user[key] === value) {
      return res.status(200).send('No change in key value');
    }

    user[key] = value;
    user = await user.save();

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

module.exports = router; 