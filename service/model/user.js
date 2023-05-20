const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
        Address: String,
        Unit_No: String,
        City: String,
        Zip_Code: String,
        State: String,
        property_Description: String,
        Builder_Type: {type:String, default:"Detached"},
        Age_of_Builder: Number,
        Builder_Type: {type:String, default:"Multifamily home"},
        Square_Footage: String,
        Parking_Type: String,
        Title: {type:String, default:"Condos"},
        Date: Date,
        Status: {type:String, default:"Sold"},
        status: {type:String, default:"Occupied"},
        Bedroom: String,
        Bedrooms: Number,
        AddedFields:[String],
        Appliance_Include: [String],
        ExttraAppliance_Include:[String],
        Utilies: [String],
        Parking: String,
        School: String,
        SchoolDistance:String,
        Market: String,
        MarketDistance:String,
        Community: String,
        CommunityDistance:String,
        Pets_alloed: String,
        Rentals: String,
        Latitude:Number,
        Longitude:Number,
        Image_url:[Object],
        Message:String

},{timestamps: true})

module.exports = mongoose.model('Assign1', userSchema);