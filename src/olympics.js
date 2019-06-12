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

    // Removed the dependency here --------------------------------------
    
    return Object.entries(hostedPerYear).reduce((acc, numTimesHosted) =>  {
        acc[numTimesHosted[0]] = Object.keys(numTimesHosted[1]).length;
        return acc;
    }, {});

    // -------------------------------------------------------------------
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

    // Removed the dependency ------------------------------------------------------
    
    let topTenCountriesWithMostMedalsSum = Object.entries(allCountriesWithMedalsWon).sort((country1, country2) => {
        return country2[1]["Total"] - country1[1]["Total"];
    }).slice(0, 10)
    .reduce((acc, countryWithMedals) => {
        acc[countryWithMedals[0]] = countryWithMedals[1];
        return acc;
    }, {});
    
    // --------------------------------------------------------------------------
    
    // Had to contruct a new object without Total Property
    return Object.keys(topTenCountriesWithMostMedalsSum).reduce((acc, country) => {
        acc[country] = {};
        acc[country]["Gold"] = topTenCountriesWithMostMedalsSum[country]["Gold"];
        acc[country]["Silver"] = topTenCountriesWithMostMedalsSum[country]["Silver"];
        acc[country]["Bronze"] = topTenCountriesWithMostMedalsSum[country]["Bronze"];
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
    let malesAndFemalesWithAddedPropId = athleteEvents.reduce((acc, athlete) => {
        if (! acc.hasOwnProperty(athlete.Games)) {
            acc[athlete.Games] = {};
            acc[athlete.Games]["ids"] = {};
            acc[athlete.Games]["ids"][athlete.ID] = 1; // dummy value
            acc[athlete.Games]["F"] = 0;
            acc[athlete.Games]["M"] = 0;
            acc[athlete.Games][athlete.Sex] = 1;
        } else {
            if (! acc[athlete.Games]["ids"].hasOwnProperty(athlete.ID)) {
                acc[athlete.Games]["ids"][athlete.ID] = 1; // dummy value
                if (acc[athlete.Games].hasOwnProperty(athlete.Sex)) {
                    acc[athlete.Games][athlete.Sex] += 1;
                } else {
                    acc[athlete.Games][athlete.Sex] = 1;
                }
            }
        }
        return acc;
    }, {});
    
    // Contructed a new object without the property id
    let malesAndFemalesWithNoIdProp = Object.keys(malesAndFemalesWithAddedPropId)
        .reduce((acc, year) => {
            acc[year] = {};
            acc[year]["M"] = malesAndFemalesWithAddedPropId[year]["M"];
            acc[year]["F"] = malesAndFemalesWithAddedPropId[year]["F"];
            return acc;
        }, {});

    let objectWithDecade = Object.keys(malesAndFemalesWithNoIdProp)
        .reduce((acc, year) => {
            var decade = `${year.substring(0, 3)}0-${year.substring(0, 3)}9`;
            if (! acc.hasOwnProperty(decade)) {
                acc[decade] = {};
                acc[decade]["M"] = malesAndFemalesWithNoIdProp[year]["M"];
                acc[decade]["F"] = malesAndFemalesWithNoIdProp[year]["F"];
            } else {
                acc[decade]["M"] += malesAndFemalesWithNoIdProp[year]["M"];
                acc[decade]["F"] += malesAndFemalesWithNoIdProp[year]["F"];
            }
            return acc;
        }, {});

    // Removed the dependency here ---------------------------------------------------    
    
    return Object.entries(objectWithDecade).sort((obj1, obj2) => {
            return parseInt(obj1[0].substring(0, 4)) - parseInt(obj2[0].substring(0, 4));
        }).reduce((acc, maleFemaleCount) => {
            acc[maleFemaleCount[0]] = maleFemaleCount[1];
            return acc;
        }, {});
    
    //---------------------------------------------------------------------------------
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

    return Object.keys(athleteAges)
        .reduce((acc, year) => {
            acc[year] = athleteAges[year]["sumOfAges"] / athleteAges[year]["numOfPlayers"];
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

    // Removed the dependency here ------------------------------------------------------
    
    return Object.entries(winnersPerSeason)
        .sort((season1, season2) => {
            return parseInt(season1[0].substring(0, 4)) - parseInt(season2[0].substring(0, 4));
        })
        .reduce((acc, season) => {
            acc[season[0]] = season[1];
            return acc;
        }, {}); 
    
    // --------------------------------------------------------------------------
}

//console.log(medalWinnersFromCountry(athleteEvents));

module.exports = {
    "eventsHostedPerYear": eventsHostedPerYear, 
    "topTenCountriesWithMostMedals": topTenCountriesWithMostMedals, 
    "malesAndFemalesPerDecade": malesAndFemalesPerDecade,
    "averageAgePerYear": averageAgePerYear,
    "medalWinnersFromCountry": medalWinnersFromCountry
}