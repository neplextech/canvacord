const canvacord = require("../index");

canvacord.changemymind("YouTube ads are annoying")
    .then(data => {
        canvacord.write(data, "./images/changemymind.png");
    });