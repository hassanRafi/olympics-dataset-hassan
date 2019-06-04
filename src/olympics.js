const csvToJson = require("convert-csv-to-json");
const athleteEvents = require("../events.json");
const nocRegions = csvToJson.fieldDelimiter(',').getJsonFromCsv("../data/noc_regions.csv");


function eventsHostedPerYear(athleteEvents) {
    let hostedPerYear  = athleteEvents.reduce((acc, cur) => {
        let yearSeason = cur.Year + cur.Season;
        if (! acc.hasOwnProperty(cur.City)) {
            acc[cur.City] = {};
            acc[cur.City][yearSeason] = 1;
        } else {
            if (! acc[cur.City].hasOwnProperty(yearSeason)) {
                acc[cur.City][yearSeason] = 1;
            }
        }
        return acc;
    }, {});

    for (let prop in hostedPerYear) {
        hostedPerYear[prop] = Object.keys(hostedPerYear[prop]).length;
    }

    return hostedPerYear;
}

//console.log(eventsHostedPerYear(athleteEvents));

function topTenCountriesWithMostMedals(athleteEvents, nocRegions) {
    let allCountriesWithMedalsWon = athleteEvents.reduce((acc, cur) => {
        if (parseInt(cur.Year) > 2000 && cur.Medal !== "NA") {
            if (! acc.hasOwnProperty(cur.NOC)) {
                acc[cur.NOC] = {};
                acc[cur.NOC][cur.Medal] = 1;
                acc[cur.NOC]["winnings"] = 1;
            } else {
                if (! acc[cur.NOC].hasOwnProperty(cur.Medal)) {
                    acc[cur.NOC][cur.Medal] = 1;
                    acc[cur.NOC]["winnings"] += 1;
                } else {
                    acc[cur.NOC][cur.Medal] += 1;
                    acc[cur.NOC]["winnings"] += 1;
                }
            }
        }
        return acc;
    }, {});

    let topTenCountriesWithMedals =  Object.keys(allCountriesWithMedalsWon)
        .sort((a, b) => allCountriesWithMedalsWon[b]['winnings'] - allCountriesWithMedalsWon[a]['winnings'])
        .slice(0, 10)
        .reduce((acc, cur) => {
            acc[cur] = allCountriesWithMedalsWon[cur];
            return acc;
        }, {});
    
    for (let prop in topTenCountriesWithMedals) {
        delete topTenCountriesWithMedals[prop].winnings;
    }

    // Changing the abbrevation (NOC) to full form 
    
    let newKeys = nocRegions.reduce((acc, cur) => {
        acc[cur.NOC] = cur.region;
        return acc;
    }, {});

    for (let prop in topTenCountriesWithMedals) {
        let x = topTenCountriesWithMedals[prop];
        delete topTenCountriesWithMedals[prop];
        topTenCountriesWithMedals[newKeys[prop]] = x;
    }

    return topTenCountriesWithMedals;
}

//console.log(topTenCountriesWithMostMedals(athleteEvents, nocRegions));

function malesAndFemalesPerDecade(athleteEvents) {
    let malesFemalesPerDecade = athleteEvents.reduce((acc, cur) => {
        var decade = `${cur.Year.slice(0, 3)}0-${cur.Year.slice(0, 3)}9`;
        if (! acc.hasOwnProperty(decade)) {
            acc[decade] = {};
            acc[decade]["M"] = 0;
            acc[decade]["F"] = 0;
            if (cur.Sex === "M") {
                acc[decade]["M"] += 1;
            } else {
                acc[decade]["F"] += 1
            }
        } else {
            if (cur.Sex === "M") {
                acc[decade]["M"] += 1;
            } else {
                acc[decade]["F"] += 1;
            }
        }
        return acc;
    }, {});

    return Object.keys(malesFemalesPerDecade)
        .sort((a, b) => {
            return parseInt(a.substring(0, 4)) - parseInt(b.substring(0, 4));
        })
        .reduce((acc, cur) => {
            acc[cur] = malesFemalesPerDecade[cur];
            return acc;
        }, {});
}

//console.log(malesAndFemalesPerDecade(athleteEvents));

function averageAgePerSeason(athleteEvents) {
    var athleteAges = athleteEvents.reduce((acc, cur) => {
        if (cur.Event === "Boxing Men's Heavyweight") {
            let age = isNaN(cur.Age) ? 0 : parseInt(cur.Age);
            if (! acc.hasOwnProperty(cur.Season)) {
                acc[cur.Season] = {};
                acc[cur.Season]["sumOfAges"] = age;
                acc[cur.Season]["numOfPlayers"] = 1;
            } else {
                acc[cur.Season]["sumOfAges"] += age;
                acc[cur.Season]["numOfPlayers"] += 1;
            }
        }
        return acc;
    }, {});

    let athleteAverageAges = {};
    athleteAverageAges.Summer = athleteAges.Summer.sumOfAges / athleteAges.Summer.numOfPlayers;
    athleteAverageAges.Winter = 0;
    
    return athleteAverageAges;
}

//console.log(averageAgePerSeason(athleteEvents));

function medalWinnersFromIndia(athleteEvents) {
    return athleteEvents.reduce((acc, cur) => {
        if (cur.Team === "India" && cur.Medal !== "NA") {
            if (! acc.hasOwnProperty(cur.Season)) {
                acc[cur.Season] = {};
                acc[cur.Season]["winners"] = [];
                if (acc[cur.Season]["winners"].indexOf(cur.Name) === -1) {
                    acc[cur.Season]["winners"].push(cur.Name);
                }
            } else {
                if (acc[cur.Season]["winners"].indexOf(cur.Name) === -1) {
                    acc[cur.Season]["winners"].push(cur.Name);
                }
            }
        }
        return acc;
    }, {});
}

//console.log(medalWinnersFromIndia(athleteEvents));

module.exports = {
    "eventsHostedPerYear": eventsHostedPerYear, 
    "topTenCountriesWithMostMedals": topTenCountriesWithMostMedals, 
    "malesAndFemalesPerDecade": malesAndFemalesPerDecade,
    "averageAgePerSeason": averageAgePerSeason,
    "medalWinnersFromIndia": medalWinnersFromIndia
}