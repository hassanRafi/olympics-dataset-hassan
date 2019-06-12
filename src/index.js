const fs = require('fs');
const athleteEvents = require("../events.json");
const nocRegions = require("../regions.json")
const funcs = require("../src/olympics.js");

let eventsHostedPerYear = funcs.eventsHostedPerYear(athleteEvents);
let topTenCountriesWithMostMedals = funcs.topTenCountriesWithMostMedals(athleteEvents, nocRegions);
let malesAndFemalesPerDecade = funcs.malesAndFemalesPerDecade(athleteEvents);
let averageAgePerYear = funcs.averageAgePerYear(athleteEvents, "Boxing Men's Heavyweight");
let medalWinnersFromCountry = funcs.medalWinnersFromCountry(athleteEvents, "IND");


let eventsHostedPerYearObject = JSON.stringify(eventsHostedPerYear, null, 4);
let topTenCountriesWithMostMedalsObject = JSON.stringify(topTenCountriesWithMostMedals, null, 4);
let malesAndFemalesPerDecadeObject = JSON.stringify(malesAndFemalesPerDecade, null, 4);
let averageAgePerYearObject = JSON.stringify(averageAgePerYear, null, 4);
let medalWinnersFromCountryObject = JSON.stringify(medalWinnersFromCountry, null, 4);

function writeFile(path, name) {
    fs.writeFile(path, name, (err) => {
        if (err) {
            throw err;
        }
        console.log("The file is saved");
    });
}

writeFile("../output/getEventsHostedPerYear.json", eventsHostedPerYearObject);
writeFile("../output/getTopTenCountriesWithMostMedals.json", topTenCountriesWithMostMedalsObject);
writeFile("../output/getMalesAndFemalesPerDecade.json", malesAndFemalesPerDecadeObject);
writeFile("../output/getAverageAgePerYear.json", averageAgePerYearObject);
writeFile("../output/getMedalWinnersFromCountry.json", medalWinnersFromCountryObject);