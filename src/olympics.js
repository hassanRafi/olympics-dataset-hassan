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

    return Object.keys(hostedPerYear).reduce((acc, cur) => {
        acc[cur] = Object.keys(hostedPerYear[cur]).length;
        return acc;
    }, {});
}

//console.log(eventsHostedPerYear(athleteEvents));

function topTenCountriesWithMostMedals(athleteEvents, nocRegions) {
    let allCountriesWithMedalsWon = filterResult(athleteEvents, 2000).reduce((acc, cur) => {
        if (! acc.hasOwnProperty(cur.NOC)) {
            acc[cur.NOC] = {};
            acc[cur.NOC][cur.Medal] = 1;
        } else {
            if (! acc[cur.NOC].hasOwnProperty(cur.Medal)) {
                acc[cur.NOC][cur.Medal] = 1;
            } else {
                acc[cur.NOC][cur.Medal] += 1;
            }
        }
        return acc;
    }, {});
    
    let countriesWithMedalsSum = Object.keys(allCountriesWithMedalsWon)
    .reduce((acc, item) => {
        acc[item] = Object.values(allCountriesWithMedalsWon[item])
            .reduce((acc, cur) => acc + cur);
        return acc;
    }, {});

    let topTenCountriesWithMedals = Object.keys(countriesWithMedalsSum)
        .sort((a, b) => {
            return countriesWithMedalsSum[b] - countriesWithMedalsSum[a];
        })
        .slice(0, 10)
        .reduce((acc, cur) => {
            acc[cur] = allCountriesWithMedalsWon[cur];
            return acc;
        }, {});
    
    // Changing the abbrevation (NOC) to full form 
    
    let newKeys = nocRegions.reduce((acc, cur) => {
        acc[cur.NOC] = cur.region;
        return acc;
    }, {});

    return Object.keys(topTenCountriesWithMedals)
        .reduce((acc, cur) => {
            acc[newKeys[cur]] = topTenCountriesWithMedals[cur];
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
    let x = athleteEvents.reduce((acc, cur) => {
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
    
    let y = Object.keys(x)
        .reduce((acc, cur) => {
            acc[cur] = {};
            acc[cur]["M"] = x[cur].hasOwnProperty("M") ? x[cur]["M"] : 0;
            acc[cur]["F"] = x[cur].hasOwnProperty("F") ? x[cur]["F"] : 0;
            return acc;
        }, {});

    let z = Object.keys(y)
        .reduce((acc, cur) => {
            var decade = `${cur.substring(0, 3)}0-${cur.substring(0, 3)}9`;
            if (! acc.hasOwnProperty(decade)) {
                acc[decade] = {};
                acc[decade]["M"] = y[cur]["M"];
                acc[decade]["F"] = y[cur]["F"];
            } else {
                acc[decade]["M"] += y[cur]["M"];
                acc[decade]["F"] += y[cur]["F"];
            }
            return acc;
        }, {});

    return Object.keys(z)
        .sort((a, b) => {
            return parseInt(a.substring(0, 4)) - parseInt(b.substring(0, 4));
        })
        .reduce((acc, cur) => {
            acc[cur] = z[cur];
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

    return Object.keys(athleteAges)
        .reduce((acc, cur) => {
            acc[cur] = athleteAges[cur]["sumOfAges"] / athleteAges[cur]["numOfPlayers"];
            return acc;
        }, {});
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