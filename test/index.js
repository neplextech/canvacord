const Canvacord = require("../index");
const canva = new Canvacord();

async function create() {
    let img = await canva.trigger("./image.png");
    canva.write(img, "triggered.gif");

    let color = await canva.color("#4E5D94");
    canva.write(color, "color.png");
}

create();