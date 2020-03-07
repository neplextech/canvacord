const Canvacord = require("../index");
const canva = new Canvacord.Canvas();
const fs = require("fs");

function create() {
    fs.readFile("./image.png", async (err, data) => {
        let img = await canva.trigger(data);
        return fs.writeFile("./triggered.gif", img, (err) => {
            if (err) console.error(err);
        });
    });
}

create();