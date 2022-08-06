
const https = require('https');
const cheerio = require('cheerio');
const mysql = require('mysql');
const util = require('util');
const childProcess = require('child_process')


 function main (){

    console.log(global.pageNow, global.pageAll)
    childProcess.exec('./ningbo_fangcan.js');
    console.log(global.pageNow,global.pageAll)
};

main();
// connection.end();






