var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(request, response) {
    console.log(`request ${request.url}`);

    var filePath = '.' + request.url;
    switch (filePath) {
        case './':
            filePath = 'client/index.html';
            break;
        case './client.css':
            filePath = './client/client.css';
            break;
        case './charts.js':
            filePath = './client/charts.js';
            break;
        case './getEventsHostedPerYear.json':
            filePath = './output/getEventsHostedPerYear.json';
            break;
        case './getTopTenCountriesWithMostMedals.json':
            filePath = './output/getTopTenCountriesWithMostMedals.json';
            break;
        case './getMalesAndFemalesPerDecade.json':
            filePath = './output/getMalesAndFemalesPerDecade.json';
            break;
        case './getAverageAgePerYear.json':
            filePath = './output/getAverageAgePerYear.json';
            break;
        case './getMedalWinnersFromCountry.json':
            filePath = './output/getMedalWinnersFromCountry.json';
            break;
        default:
            filePath = './client/index.html';
            break;
    }

    var extname = String(path.extname(filePath)).toLowerCase();

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, {'Content-Type': contentType});
        response.end(content, 'utf-8'); 
    });
}).listen(8888);
console.log("Server running at http://127.0.0.1:8888");