p5-stacked-area-chart
=====================

Using the P5.js library for the Processing language, this lets you simply alter the data file to create the chart.

## How to use this

Simply alter the data.js file. There is an object variable in there, which is structured thusly:

```
var data = {
  "Name of first chart to display": {
    "Name of first category": {
      "Size of the left side": 10,
      "Size of the right side": 20
    },
    "Name of second category": {
      "Size of the left side": 10,
      "Size of the right side": 20
    },
  },
  // here's the second chart you can display, changeable with the pulldown menu
  "Name of first chart to display": {
    "Name of first category": {
      "Size of the left side": 10,
      "Size of the right side": 20
    },
    "Name of second category": {
      "Size of the left side": 10,
      "Size of the right side": 20
    },
  }
}
```
