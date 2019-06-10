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

    return Object.keys(hostedPerYear).reduce((acc, hostedPerYearKeys) => {
        acc[hostedPerYearKeys] = Object.keys(hostedPerYear[hostedPerYearKeys]).length;
        return acc;
    }, {});
}

//console.log(eventsHostedPerYear(athleteEvents));

function topTenCountriesWithMostMedals(athleteEvents, nocRegions) {
    // Changing the abbrevation (NOC) to full form 

    let newKeys = nocRegions.reduce((acc, regions) => {
        acc[regions.NOC] = regions.region;
        return acc;
    }, {});

    console.log(newKeys);

    let allCountriesWithMedalsWon = filterResult(athleteEvents, 2000).reduce((acc, country) => {
        let fullFormOfNOC = newKeys[country.NOC];
        if (! acc.hasOwnProperty(fullFormOfNOC)) {
            acc[fullFormOfNOC] = {};
            acc[fullFormOfNOC][country.Medal] = 1;
        } else {
            if (! acc[fullFormOfNOC].hasOwnProperty(country.Medal)) {
                acc[fullFormOfNOC][country.Medal] = 1;
            } else {
                acc[fullFormOfNOC][country.Medal] += 1;
            }
        }
        return acc;
    }, {});

    console.log(allCountriesWithMedalsWon);
    
    let countriesWithMedalsSum = Object.keys(allCountriesWithMedalsWon)
        .reduce((acc, item) => {
            acc[item] = Object.values(allCountriesWithMedalsWon[item])
                .reduce((acc, medalValues) => acc + medalValues);
            return acc;
        }, {});

    console.log(countriesWithMedalsSum);

    return Object.keys(countriesWithMedalsSum)
        .sort((country1, country2) => {
            return countriesWithMedalsSum[country2] - countriesWithMedalsSum[country1];
        })
        .slice(0, 10)
        .reduce((acc, topCountryNames) => {
            acc[topCountryNames] = allCountriesWithMedalsWon[topCountryNames];
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
    let malesAndFemalesWithAddedPropId = athleteEvents.reduce((acc, cur) => {
        if (! acc.hasOwnProperty(cur.Games)) {
            acc[cur.Games] = {};
            acc[cur.Games]["ids"] = {};
            acc[cur.Games]["ids"][cur.ID] = 1; // dummy value
            acc[cur.Games][cur.Sex] = 1;
        } else {
            if (! acc[cur.Games]["ids"].hasOwnProperty(cur.ID)) {
                acc[cur.Games]["ids"][cur.ID] = 1; // dummy value
                if (acc[cur.Games].hasOwnProperty(cur.Sex)) {
                    acc[cur.Games][cur.Sex] += 1;
                } else {
                    acc[cur.Games][cur.Sex] = 1;
                }
            }
        }
        return acc;
    }, {});
    
    let malesAndFemalesWithNoIdProp = Object.keys(malesAndFemalesWithAddedPropId)
        .reduce((acc, year) => {
            acc[year] = {};
            acc[year]["M"] = malesAndFemalesWithAddedPropId[year].hasOwnProperty("M") ? malesAndFemalesWithAddedPropId[year]["M"] : 0;
            acc[year]["F"] = malesAndFemalesWithAddedPropId[year].hasOwnProperty("F") ? malesAndFemalesWithAddedPropId[year]["F"] : 0;
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

    return Object.keys(objectWithDecade)
        .sort((decade1, decade2) => {
            return parseInt(decade1.substring(0, 4)) - parseInt(decade2.substring(0, 4));
        })
        .reduce((acc, sortedDecade) => {
            acc[sortedDecade] = objectWithDecade[sortedDecade];
            return acc;
        }, {});
}

//console.log(malesAndFemalesPerDecade(athleteEvents));

function averageAgePerYear(athleteEvents) {
    var athleteAges = athleteEvents.reduce((acc, entries) => {
        if (entries.Event === "Boxing Men's Heavyweight" && ! isNaN(entries.Age)) {
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

function medalWinnersFromIndia(athleteEvents) {
    let winnersPerSeason =  athleteEvents.reduce((acc, entry) => {
        if (entry.Team === "India" && entry.Medal !== "NA") {
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

    return Object.keys(winnersPerSeason)
        .sort()
        .reduce((acc, year) => {
            acc[year] = winnersPerSeason[year];
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