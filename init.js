var city = [];
var selectedCity = Object.keys(data)[0]
var cats = []
var w = 0;
var h = 0;
var postfix = "";
var colors = [
    [141, 211, 199],
    [255, 255, 179],
    [190, 186, 218],
    [251, 128, 114],
    [128, 177, 211],
    [253, 180, 98],
    [179, 222, 105],
    [252, 205, 229],
    [217, 217, 217],
    [188, 128, 189]
];
var objects = [];
var types = []
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var dataLength = Object.size(data);
var totalAmount = [];
var theg1 = [];
var theg2 = [];
var theg = {};
jQuery(function($) {
    cats = Object.keys(data[Object.keys(data)[0]][Object.keys(data[Object.keys(data)[0]])[0]]);
    types = Object.keys(data[Object.keys(data)[0]]);
    objects = Object.keys(data);
    $(".labelWord1").html(cats[0]);
    $(".labelWord2").html(cats[1]);
    w = $(".chartContainer").width();
    h = $(".chartContainer").height();
    theg[types[0]] = [];
    theg[types[1]] = [];
    for (i = 0; i < Object.size(types); i++) {
        theg1.push(0);
        theg2.push(0);
        theg[types[0]].push(0);
        theg[types[1]].push(0);
    }
    jQuery("#selector").change(function() {
        selectedCity = $(this).val();
    });
    setInterval(function() {
        w = jQuery(".chartContainer").width();
        h = jQuery(".chartContainer").height();
    }, 20);
});



function setup() {
    createCanvas(900, 600);
    smooth();
    for (var i = 0; i < dataLength; i++) {
        jQuery("#selector").append("<option>" + Object.keys(data)[i] + "</option>");
        city[i] = new City(data[Object.keys(data)[i]], i);
        var amount = 0;
        for (j in types) {
            amount += data[objects[i]][types[j]][cats[0]];
        }
        totalAmount.push(amount);
    }
    totalAmount.sort().reverse();
    console.log(totalAmount);
}

function draw() {
    background([255, 255, 255]);
    noStroke();
    for (var i = 0; i < dataLength; i++) {
        if (objects[i] == selectedCity) {
            city[i].run();
        }
    }
}



function City(d, num) {
    this.name = d.name;
    this.leftSide = [];
    this.rightSide = [];
    for (i = 0; i < Object.size(types); i++) {
        this.leftSide.push(d[types[i]][cats[0]]);
        this.rightSide.push(d[types[i]][cats[1]]);
    }
}


City.prototype.run = function() {
    this.displayConnects(this.rightSide, this.leftSide);
    this.displayRects(this.rightSide, w / 50, types[0]);
    this.displayRects(this.leftSide, w - (w / 50 + w / 4), types[1]);
}


City.prototype.displayRects = function(group, lefter, g) {
    var counter = 0;
    for (i = 0; i < Object.size(types); i++) {
        theg[g][i] = lerp(theg[g][i], mult(group[i]), 0.1);
        fill(colors[i]);
        rect(lefter, counter + 10, w / 4, theg[g][i] - 10);
        fill(70);
        textSize(16);
        textFont("Source Sans Pro");
        textStyle(BOLD);
        textAlign(CENTER);
        text(group[i] + postfix + " " + types[i], lefter + (w / 8), counter + theg[g][i] / 3, w / 4, 50);
        counter += theg[g][i];
    }
}

City.prototype.displayConnects = function(p, c) {
    var counter = 0;
    var counter2 = 0;
    for (i = 0; i < Object.size(types); i++) {
        theg1[i] = lerp(theg1[i], mult(p[i]), 0.1);
        theg2[i] = lerp(theg2[i], mult(c[i]), 0.1);
        fill(colors[i]);
        quad(w / 4 + w / 50, counter + 10, w / 4 + w / 50, counter + theg1[i], w - (w / 4 + w / 50), counter2 + theg2[i], w - (w / 4 + w / 50), counter2 + 10);
        counter += theg1[i];
        counter2 += theg2[i];
    }

}

function sum(arr) {
    var total = 0;
    for (i in arr) {
        total += i;
    }
    return total
}

function mult(num) {
    return (num / totalAmount[0] * 550);
}
