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
    let x = athleteEvents.reduce((acc, cur) => {
        if (! acc.hasOwnProperty(cur.Games)) {
            acc[cur.Games] = {};
            acc[cur.Games]["names"] = {};
            acc[cur.Games]["names"][cur.Name] = 1; // dummy value
            acc[cur.Games][cur.Sex] = 1;
        } else {
            if (! acc[cur.Games]["names"].hasOwnProperty(cur.Name)) {
                acc[cur.Games]["names"][cur.Name] = 1; // dummy value
                if (acc[cur.Games].hasOwnProperty(cur.Sex)) {
                    acc[cur.Games][cur.Sex] += 1;
                } else {
                    acc[cur.Games][cur.Sex] = 1;
                }
            }
        }
        return acc;
    }, {});

    for (let prop in x) {
        delete x[prop].names;
    }

    let newObj = {};
    
    for (let prop in x) {
        var decade = `${prop.substring(0, 3)}0-${prop.substring(0, 3)}9`;
        if (! newObj.hasOwnProperty(decade)) {
            newObj[decade] = x[prop];
        } else {
            newObj[decade]["M"] += x[prop].hasOwnProperty("M") ? x[prop]["M"] : 0;
            newObj[decade]["F"] += x[prop].hasOwnProperty("F") ? x[prop]["F"] : 0;
        }
    }

    return Object.keys(newObj)
        .sort((a, b) => {
            return parseInt(a.substring(0, 4)) - parseInt(b.substring(0, 4));
        })
        .reduce((acc, cur) => {
            acc[cur] = newObj[cur];
            return acc;
        }, {});
}

//console.log(malesAndFemalesPerDecade(athleteEvents));

function averageAgePerYear(athleteEvents) {
    var athleteAges = athleteEvents.reduce((acc, cur) => {
        if (cur.Event === "Boxing Men's Heavyweight" && ! isNaN(cur.Age)) {
            if (! acc.hasOwnProperty(cur.Year)) {
                acc[cur.Year] = {};
                acc[cur.Year]["sumOfAges"] = parseInt(cur.Age);
                acc[cur.Year]["numOfPlayers"] = 1;
            } else {
                acc[cur.Year]["sumOfAges"] += parseInt(cur.Age);
                acc[cur.Year]["numOfPlayers"] += 1;
            }
        }
        return acc;
    }, {});

    for (let prop in athleteAges) {
        athleteAges[prop] = parseFloat(athleteAges[prop].sumOfAges / athleteAges[prop].numOfPlayers).toFixed(2);
    }
    
    return athleteAges;
}

//console.log(averageAgePerYear(athleteEvents));

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
    "averageAgePerYear": averageAgePerYear,
    "medalWinnersFromIndia": medalWinnersFromIndia
}