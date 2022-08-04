
const https = require('https');
const cheerio = require('cheerio');


var url_target = 'https://esf.cnnbfdc.com/Contract?kw=%E6%B9%96&page=3'

var options = {
    hostname: 'esf.cnnbfdc.com',
    port: 443,
    path: '/Contract?kw=%E6%B9%96&page=3',
    method: 'GET'
}
var request = https.request(options, (result)=>{
    console.log(result.data) 

    var dataAll = '';
    result.on('data' , data => {
       dataAll = dataAll + data;
    });


    result.on('end', () => {    

        var $ = cheerio.load(dataAll);
        $("tr").each( (index,elementtr) =>{
            
            $(elementtr).children('td').each((index,elementtd) => {
                console.log($(elementtd));
                console.log($(elementtd).text());
            });
        })
        // console.log($("tr").text());
        // console.log(JSON.parse(dataAll));
    });


});

request.on('error', (err) => {
    console.log(err)
});

request.end();





