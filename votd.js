const papa = require("papaparse");
const fs = require("fs");
const file = fs.createReadStream("almanac-2024.csv");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-indexed
const day = date.getDate();
const today = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

papa.parse(file, {
  complete: function (results) {
    for (let i = 0; i < results.data.length - 1; i++) {
      if (results.data[i][1] == today) {
        console.log(results.data[i][3]);
      }
    }
  },
});

// https://www.biblegateway.com/passage/?search=Luke%209.46-50&version=NRSVA
