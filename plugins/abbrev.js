module.exports = num => {
    if (!num || isNaN(num)) return "0";
    if (typeof num === "string") num = parseInt(num);
    let decPlaces = Math.pow(10, 1);
    var abbrev = ["K", "M", "B", "T"];
    for (var i = abbrev.length - 1; i >= 0; i--) {
        var size = Math.pow(10, (i + 1) * 3);
        if (size <= num) {
            num = Math.round((num * decPlaces) / size) / decPlaces;
            if (num == 1000 && i < abbrev.length - 1) {
                num = 1;
                i++;
            }
            num += abbrev[i];
            break;
        }
    }
    return `${num}`;
};