const express = require('express');
const router = express.Router();
require('mongoose');
const axios = require("axios");

// get list of rooms
router.post('/places', (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+req.body["parameters"]+'&inputtype=textquery&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M&fields=formatted_address,name,geometry')
        .then(response => res.json({
            "name": response.data["candidates"][0]["name"],
            "address": response.data["candidates"][0]["formatted_address"],
        }))
        .catch(err => res.json(err));
});


module.exports = router;