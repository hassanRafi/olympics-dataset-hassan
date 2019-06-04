const csvToJson = require("convert-csv-to-json");

const athleteEvents = require("../events.json");
const nocRegions = csvToJson.fieldDelimiter(',').getJsonFromCsv("../data/noc_regions.csv");

function eventsHostedPerYear(athleteEvents) {
    return athleteEvents.reduce((acc, cur) => {
        if (! acc.hasOwnProperty(cur.NOC)) {
            acc[cur.NOC] = {};
            acc[cur.NOC]["hosted"] = 1;
        } else {
            acc[cur.NOC]["hosted"] += 1;
        }
        return acc;
    }, {});
}

//console.log(eventsHostedPerYear(athleteEvents));

function topTenCountriesWithMostMedals(athleteEvents) {
    let allCountriesWithMedalsWon = athleteEvents.reduce((acc, cur) => {
        if (parseInt(cur.Year) > 2000) {
            if (! acc.hasOwnProperty(cur.Team)) {
                acc[cur.Team] = {};
                acc[cur.Team]['Gold'] = 0;
                acc[cur.Team]['Silver'] = 0;
                acc[cur.Team]['Bronze'] = 0;
                if (cur.Medal === "Gold" ) {
                    acc[cur.Team]['Gold'] = 1;
                } else if (cur.Medal === "Silver") {
                    acc[cur.Team]['Silver'] = 1;
                } else if (cur.Medal === "Bronze") {
                    acc[cur.Team]['Bronze'] = 1;
                }
            } else {
                if (cur.Medal === "Gold" ) {
                    acc[cur.Team]['Gold'] += 1;
                } else if (cur.Medal === "Silver") {
                    acc[cur.Team]['Silver'] += 1;
                } else if (cur.Medal === "Bronze") {
                    acc[cur.Team]['Bronze'] += 1;
                }
            }
        }
        return acc;
    }, {});

    for(let prop in allCountriesWithMedalsWon) {
        allCountriesWithMedalsWon[prop]['winnings'] = allCountriesWithMedalsWon[prop]['Gold']    
            + allCountriesWithMedalsWon[prop]['Silver'] + allCountriesWithMedalsWon[prop]['Bronze'];                
    }

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

    return topTenCountriesWithMedals;
}

//console.log(topTenCountriesWithMostMedals(athleteEvents));

function malesAndFemalesPerDecade(athleteEvents) {
    return athleteEvents.reduce((acc, cur) => {
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
}

//console.log(malesAndFemalesPerDecade(athleteEvents));

//Boxing Men's Heavyweight