let serverUrl = "http://127.0.0.1:8888/";
fetch(serverUrl + "getEventsHostedPerYear.json")
.then(response => response.json())
.then(data => {
    chartForEventsHostedPerYear(data);
});

fetch(serverUrl + "getTopTenCountriesWithMostMedals.json")
.then(response => response.json())
.then(data => {
    chartForTopTenCountriesWithMostMedals(data);
});

fetch(serverUrl + "getMalesAndFemalesPerDecade.json")
.then(response => response.json())
.then(data => {
    chartForMalesAndFemalesPerDecade(data);
});

fetch(serverUrl + "getAverageAgePerYear.json")
.then(response => response.json())
.then(data => {
    chartForAverageAgePerYear(data);
});

fetch(serverUrl + "getMedalWinnersFromIndia.json")
.then(response => response.json())
.then(data => {
    tableForMedalWinnersFromIndia(data);
});

function chartForEventsHostedPerYear(eventsHostedPerYear) {
    let numEventsHosted = Object.keys(eventsHostedPerYear).reduce((acc, cur) => {
        if (! acc.hasOwnProperty('numTimesHosted')) {
            acc["numTimesHosted"] = [];
        } else {
            acc["numTimesHosted"].push(eventsHostedPerYear[cur]);
        }
        return acc;
    }, {});


    let seriess = Object.keys(numEventsHosted).reduce((acc, cur) => {
        acc.push({
            name: cur,
            data: numEventsHosted[cur]
        });
        return acc;
    }, []);

    Highcharts.chart('eventsHostedPerYear', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Olympics Events Hosted Per City'
        },
        xAxis: {
            categories: Object.keys(eventsHostedPerYear),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No Of Times Hosted'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriess
    });
}

function chartForTopTenCountriesWithMostMedals(topTenCountriesWithMostMedals) {
    let x = Object.keys(topTenCountriesWithMostMedals).reduce((acc, cur) => {
        if (! acc.hasOwnProperty("Gold")) {
            acc["Gold"] = [];
        }
        if (! acc.hasOwnProperty("Silver")) {
            acc["Silver"] = [];
        }
        if (! acc.hasOwnProperty("Bronze")) {
            acc["Bronze"] = [];
        }
        acc["Gold"].push(topTenCountriesWithMostMedals[cur]["Gold"]);
        acc["Silver"].push(topTenCountriesWithMostMedals[cur]["Silver"]);
        acc["Bronze"].push(topTenCountriesWithMostMedals[cur]["Bronze"]);
        return acc;
    }, {});

    let seriess = Object.keys(x).reduce((acc, cur) => {
        acc.push({
            name: cur,
            data: x[cur]
        });
        return acc;
    }, []);

    Highcharts.chart('topTenCountriesWithMostMedals', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top Ten Countries With Most Medals'
        },
        xAxis: {
            categories: Object.keys(topTenCountriesWithMostMedals)
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Medals Won'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: seriess
    });
}

function chartForMalesAndFemalesPerDecade(malesAndFemalesPerDecade) {
    let objectArray = Object.keys(malesAndFemalesPerDecade).reduce((acc, cur) => {
        if (! acc.hasOwnProperty("M") && ! acc.hasOwnProperty("F")) {
            acc["M"] = [];
            acc["F"] = [];
        }
        acc["M"].push(malesAndFemalesPerDecade[cur]["M"]);
        acc["F"].push(malesAndFemalesPerDecade[cur]["F"]);
        return acc;
    }, {});

    let seriess = Object.keys(objectArray).reduce((acc, cur) => {
        acc.push({
            name: cur,
            data: objectArray[cur]
        });
        return acc;
    }, []);

    Highcharts.chart('malesAndFemalesPerDecade', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Gender Participation in Olympics Per Decade'
        },
        xAxis: {
            categories: Object.keys(malesAndFemalesPerDecade),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Males and Females'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: seriess
    });
}

function chartForAverageAgePerYear(averageAgePerYear) {
    let objectArray = Object.keys(averageAgePerYear).reduce((acc, cur) => {
        if (! acc.hasOwnProperty('Average Age')) {
            acc['Average Age'] = [];
        }
        acc['Average Age'].push(averageAgePerYear[cur]);
        return acc;
    }, {});

    let seriess = Object.keys(objectArray).reduce((acc, cur) => {
        acc.push({
            name: cur,
            data: objectArray[cur]
        });
        return acc;
    }, []);

    Highcharts.chart('averageAgePerYear', {
        title: {
            text: 'Average Age Per Year in Olympics'
        },
        xAxis: {
            title: {
                text: 'Years',
            },
            categories: Object.keys(averageAgePerYear)
        },
        yAxis: {
            title: {
                text: 'Average Age'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
    
        series: seriess,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

function tableForMedalWinnersFromIndia(medalWinnersFromIndia) {
    let html = "";
    for (let key in medalWinnersFromIndia) {
        html += `<div class=${key}>\n<ul>\n`;
        html += `<h3>${key}</h3>`;
        for (let k of medalWinnersFromIndia[key]["winners"]) {
            html += `<li>\n${k}\n</li>`;
        }
        html += "</ul>\n</div>\n";
    }
    document.getElementById('medalWinnersFromIndia').innerHTML = html;
}