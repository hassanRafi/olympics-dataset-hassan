function eventsHostedPerYear(athleteEvents) {
    let hostedPerYear  = athleteEvents.reduce((acc, event) => {
        let yearSeason = event.Year + event.Season;
        if (! acc.hasOwnProperty(event.City)) {
            acc[event.City] = {};
            acc[event.City][yearSeason] = 1;
        } else {
            if (! acc[event.City].hasOwnProperty(yearSeason)) {
                acc[event.City][yearSeason] = 1;
            }
        }
        return acc;
    }, {});
    
    return Object.entries(hostedPerYear).reduce((acc, numTimesHosted) =>  {
        acc[numTimesHosted[0]] = Object.keys(numTimesHosted[1]).length;
        return acc;
    }, {});

}

//console.log(eventsHostedPerYear(athleteEvents));

function topTenCountriesWithMostMedals(athleteEvents, nocRegions) {
    // Changing the abbrevation (NOC) to full form 

    let mappingOfNocToRegion = nocRegions.reduce((acc, regNoc) => {
        acc[regNoc.NOC] = regNoc.region;
        return acc;
    }, {});

    let allCountriesWithMedalsWon = filterResult(athleteEvents, 2000).reduce((acc, country) => {
        let fullFormOfNOC = mappingOfNocToRegion[country.NOC];
        if (! acc.hasOwnProperty(fullFormOfNOC)) {
            acc[fullFormOfNOC] = {};
            acc[fullFormOfNOC][country.Medal] = 1;
            acc[fullFormOfNOC]["Total"] = 1;
        } else {
            if (! acc[fullFormOfNOC].hasOwnProperty(country.Medal)) {
                acc[fullFormOfNOC][country.Medal] = 1;
                acc[fullFormOfNOC]["Total"] += 1;
            } else {
                acc[fullFormOfNOC][country.Medal] += 1;
                acc[fullFormOfNOC]["Total"] += 1;
            }
        }
        return acc;
    }, {});
    
    let topTenCountriesWithMostMedalsSum = Object.entries(allCountriesWithMedalsWon).sort((country1, country2) => {
        return country2[1]["Total"] - country1[1]["Total"];
    }).slice(0, 10)
    .reduce((acc, countryWithMedals) => {
        acc[countryWithMedals[0]] = countryWithMedals[1];
        return acc;
    }, {});
    
    return Object.entries(topTenCountriesWithMostMedalsSum).reduce((acc, entry) => {
        acc[entry[0]] = {};
        acc[entry[0]]['Gold'] = entry[1]['Gold'];
        acc[entry[0]]['Silver'] = entry[1]['Silver'];
        acc[entry[0]]['Bronze'] = entry[1]['Bronze'];
        return acc;
    }, {});
}

function filterResult(athleteEvents, year) {
    return athleteEvents.filter((item) => {
        return item.Year > year && item.Medal !== "NA";
    });
}

//console.log(topTenCountriesWithMostMedals(athleteEvents, nocRegions));

function malesAndFemalesPerDecade(athleteEvents) {
    let decadeWiseParticipants =  athleteEvents.reduce((acc, cur) => {
        let decade = `${cur.Games.substring(0, 3)}0-${cur.Games.substring(0, 3)}9`;
        if (! acc.hasOwnProperty(decade)) {
            acc[decade] = {};
            acc[decade]["M"] = 0;
            acc[decade]["F"] = 0;
            acc[decade][cur.Sex] = 1;
            acc[decade]["Seasons"] = {};
            acc[decade]["Seasons"][cur.Games] = {};
            acc[decade]["Seasons"][cur.Games][cur.ID] = 1; // dummy value
        } else {
            if (! acc[decade]["Seasons"].hasOwnProperty(cur.Games)) {
                acc[decade]["Seasons"][cur.Games] = {};
                acc[decade]["Seasons"][cur.Games][cur.ID] = 1; // dummy value
                acc[decade][cur.Sex] += 1;
            } else {
                if (! acc[decade]["Seasons"][cur.Games].hasOwnProperty(cur.ID)) {
                    acc[decade]["Seasons"][cur.Games][cur.ID] = 1; // dummy value
                    acc[decade][cur.Sex] += 1;
                }
            }
        }
        return acc;
    }, {});
    
    return Object.entries(decadeWiseParticipants).sort((decade1, decade2) => {
        return parseInt(decade1[0].substring(0, 4)) - parseInt(decade2[0].substring(0, 4));
    }).reduce((acc, decade) => {
        acc[decade[0]] = {};
        acc[decade[0]]['M'] = decade[1]['M'];
        acc[decade[0]]['F'] = decade[1]['F'];
        return acc;
    }, {});
}

//console.log(malesAndFemalesPerDecade(athleteEvents));

function averageAgePerYear(athleteEvents, event) {
    var athleteAges = athleteEvents.reduce((acc, entries) => {
        if (entries.Event === event && ! isNaN(entries.Age)) {
            if (! acc.hasOwnProperty(entries.Year)) {
                acc[entries.Year] = {};
                acc[entries.Year]["sumOfAges"] = parseInt(entries.Age);
                acc[entries.Year]["numOfPlayers"] = 1;
            } else {
                acc[entries.Year]["sumOfAges"] += parseInt(entries.Age);
                acc[entries.Year]["numOfPlayers"] += 1;
            }
        }
        return acc;
    }, {});

    return Object.entries(athleteAges).reduce((acc, entry) => {
        acc[entry[0]] = entry[1]["sumOfAges"] / entry[1]["numOfPlayers"];
        return acc;
    }, {});
}

//console.log(averageAgePerYear(athleteEvents));

function medalWinnersFromCountry(athleteEvents, country) {
    let winnersPerSeason =  athleteEvents.reduce((acc, entry) => {
        if (entry.NOC === country && entry.Medal !== "NA") {
            if (! acc.hasOwnProperty(entry.Games)) {
                acc[entry.Games] = {};
                acc[entry.Games]["winners"] = [];
                if (acc[entry.Games]["winners"].indexOf(entry.Name) === -1) {
                    acc[entry.Games]["winners"].push(entry.Name);
                }
            } else {
                if (acc[entry.Games]["winners"].indexOf(entry.Name) === -1) {
                    acc[entry.Games]["winners"].push(entry.Name);
                }
            }
        }
        return acc;
    }, {});

    return Object.entries(winnersPerSeason)
        .sort((season1, season2) => {
            return parseInt(season1[0].substring(0, 4)) - parseInt(season2[0].substring(0, 4));
        })
        .reduce((acc, season) => {
            acc[season[0]] = season[1];
            return acc;
        }, {});     
}

//console.log(medalWinnersFromCountry(athleteEvents));

module.exports = {
    "eventsHostedPerYear": eventsHostedPerYear, 
    "topTenCountriesWithMostMedals": topTenCountriesWithMostMedals, 
    "malesAndFemalesPerDecade": malesAndFemalesPerDecade,
    "averageAgePerYear": averageAgePerYear,
    "medalWinnersFromCountry": medalWinnersFromCountry
}