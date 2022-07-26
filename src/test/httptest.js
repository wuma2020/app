const http = require("http")
const cheerio = require('cheerio');

http.request('http://www.baidu.com', (response) => {
    // console.log(response)

    let data = '';
    let i = 0;
    response.on('data' , (chuck ) => {
        data = data + chuck;
        i++;
        console.log(i)
    })

    response.on('close',() =>{
        console.log('get all data')
        const $ = cheerio.load(data);
        console.log($('#su').attr('type'))
        console.log($('#su').next().html())
        // console.log(data)
    })
}).end()