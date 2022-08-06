
const https = require('https');
const cheerio = require('cheerio');
const mysql = require('mysql');
const util = require('util');

// CREATE TABLE `second_hand_house_order_record` (
//     `order_sn` varchar(50) NOT NULL COMMENT '合同编号',
//     `order_time` datetime DEFAULT NULL COMMENT '合同签订日期',
//     `district` varchar(50) DEFAULT NULL COMMENT '所在区',
//     `street` varchar(255) DEFAULT NULL COMMENT '街道（小区）',
//     `company` varchar(255) DEFAULT NULL COMMENT '经纪机构备案名称',
//     PRIMARY KEY (`order_sn`)
//   ) ENGINE=InnoDB;


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'mkk'
});

connection.connect();

//解析抓取的数据
const resolveHtmlIntoSqllite = ($) => {


    //获取每一行
    var trList = $("table tbody tr");
    trList.each((index, elementtr) => {

        var tds = $(elementtr).children('td');


        // 0 | 2022/8/2
        // app/src/test/ningbo_fangcan.js:89
        // 1 | ZJ22330212MM0043699
        // app/src/test/ningbo_fangcan.js:89
        // 2 | 鄞州区
        // app/src/test/ningbo_fangcan.js:89
        // 3 | 五乡镇(明湖湾雅苑)
        // app/src/test/ningbo_fangcan.js:89
        // 4 | 宁波市缔晟房地产营销策划有限公司

        var order_time = '';
        var order_sn = '';
        var district = '';
        var street = '';
        var company = '';

        tds.each((index, elementtd) => {

            if (index === 0) {
                order_time = $(elementtd).text().trim();
            } else if (index === 1) {
                order_sn = $(elementtd).text().trim();
            } else if (index === 2) {
                district = $(elementtd).text().trim();
            } else if (index === 3) {
                street = $(elementtd).text().trim();
            } else if (index === 4) {
                company = $(elementtd).text().trim();
            } else {
                console.error("Invalid type: " + index);
            }

        });

        var records;
        var querySql;
        if (company.length < 1) {
            querySql = "insert into  second_hand_house_order_record  (order_sn,order_time,district,street) values ?";
            records = [
                [order_sn, order_time, district, street]
            ];
        } else {
            querySql = "insert into  second_hand_house_order_record  (order_sn,order_time,district,street,company) values ?";
            records = [
                [order_sn, order_time, district, street, company]
            ];
        }

        console.log(querySql);
        connection.query(querySql, [records], sqlCallback);

    });
    // console.log($("tr").text());
    // console.log(JSON.parse(dataAll));

}


const sqlCallback = (error, results) => {
    if (error) throw error;

    Object.keys(results).forEach(function (key) {
        //遍历一行记录 key 为索引
        console.log(results[key]);
    });
}


var url_target = 'https://esf.cnnbfdc.com/Contract?kw=%E6%B9%96&page=3'

var pageAll = 0;

var pageNow = 1;

var options = {
    hostname: 'esf.cnnbfdc.com',
    port: 443,
    path: '/Contract?page=' + pageNow,
    method: 'GET'
}

var doWorlk = () => {

    https.request(options, (result) => {

        var dataAll = '';
        result.on('data', data => {
            dataAll = dataAll + data;
        });

        result.on('end', () => {
            var $ = cheerio.load(dataAll);
            console.log($(".PagedList-skipToLast a").attr("href"));
            var indexofNumber = $(".PagedList-skipToLast a").attr("href").indexOf("page");
            var startNumber = parseInt(indexofNumber) + 5;
            var allNumner = $(".PagedList-skipToLast a").attr("href");
            pageAll = parseInt(allNumner.substr(startNumber, 55))
            resolveHtmlIntoSqllite($);
            pageNow = pageNow + 1;
        });


    }).end();

    // request.on('error', (err) => {
    //     console.log(err)
    // });

    // request.end();

};

while (true) {

    if (pageAll != 0 && pageNow >= pageAll) {
        break;
    }
    doWorlk();

}


// doWorlk();



// connection.end();






