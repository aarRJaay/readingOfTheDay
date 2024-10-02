const papa = require("papaparse");
const fs = require("fs");
const file = fs.createReadStream("almanac-2024.csv");

const biblegateway = require("biblegateway-scrape");

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-indexed
const day = date.getDate();
const today = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;

papa.parse(file, {
  complete: function (results) {
    for (let i = 0; i < results.data.length - 1; i++) {
      if (results.data[i][1] == today) {
        const readings = results.data[i][3];
        const individualReadings = readings.split(/\n\n/);
        console.log(individualReadings[1], "\n");
        console.log(individualReadings[2]);
        const individualReadings2 = individualReadings[1].split(/\n/);
        const blah = individualReadings2[1].replace(/\s+/g, "");
        console.log(
          `https://www.biblegateway.com/passage/?search=${blah}&version=NRSVA`,
        );
        getVerse(blah);
      }
    }
  },
});

function getVerse(verse) {
  let x = async () => {
    let result = await biblegateway.verse(
      verse,
      biblegateway.version.ENG_NEW_REVISED_STANDARD_VERSION_ANGLICISED,
    );
    console.log(result);
  };

  x();
}
