const fs = require('fs');
const athleteEvents = require("../events.json");
const nocRegions = require("../regions.json")
const funcs = require("../src/olympics.js");

let eventsHostedPerYear = funcs.eventsHostedPerYear(athleteEvents);
let topTenCountriesWithMostMedals = funcs.topTenCountriesWithMostMedals(athleteEvents, nocRegions);
let malesAndFemalesPerDecade = funcs.malesAndFemalesPerDecade(athleteEvents);
let averageAgePerYear = funcs.averageAgePerYear(athleteEvents);
let medalWinnersFromIndia = funcs.medalWinnersFromIndia(athleteEvents);


let jsonString1 = JSON.stringify(eventsHostedPerYear, null, 4);
let jsonString2 = JSON.stringify(topTenCountriesWithMostMedals, null, 4);
let jsonString3 = JSON.stringify(malesAndFemalesPerDecade, null, 4);
let jsonString4 = JSON.stringify(averageAgePerYear, null, 4);
let jsonString5 = JSON.stringify(medalWinnersFromIndia, null, 4);

fs.writeFile("../output/getEventsHostedPerYear.json", jsonString1, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file is saved");
});

fs.writeFile("../output/getTopTenCountriesWithMostMedals.json", jsonString2, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file is saved");
});

fs.writeFile("../output/getMalesAndFemalesPerDecade.json", jsonString3, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file is saved");
});

fs.writeFile("../output/getAverageAgePerYear.json", jsonString4, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file is saved");
});

fs.writeFile("../output/getMedalWinnersFromIndia.json", jsonString5, (err) => {
    if (err) {
        throw err;
    }
    console.log("The file is saved");
});