const papa = require("papaparse");
const fs = require("fs");
const file = fs.createReadStream("almanac-2024.csv");

var today = new Date(Date.now() - 86400000);
// var today = new Date();
var dd = today.getDate() + 1;
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}

today = dd + "/" + mm + "/" + yyyy;

console.log(today);

papa.parse(file, {
  complete: function (results) {
    for (let i = 0; i < results.data.length; i++) {
      if (results.data[i][1] == today) {
        console.log(results.data[i][3]);
      }
    }
  },
});
