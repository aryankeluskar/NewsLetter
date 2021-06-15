const express = require('express')
const bp = require('body-parser')
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
const https = require('https')
var keys = require("./keys");
app.use(express.static("public"))
app.use(bp.urlencoded({ extended: true }));

client.setConfig({
    apiKey: keys.api_key,
    server: "us6",
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {
    var n = req.body.name;
    var e = req.body.email;
    console.log(n, e);

    const run = async() => {
        const response = await client.lists.batchListMembers(keys.lid, {
            members: [{
                email_address: e,
                status: "subscribed",
                merge_fields: {
                    FNAME: n
                }
            }],
        });
        // console.log(response);
    };

    run();
    res.sendFile(__dirname + "/success.html")
})

app.listen(process.env.PORT || 3000, function() { console.log("server started at http://localhost:3000"); })