

//==========引入包=========   
const https = require('https');
const cheerio = require('cheerio');
const mysql = require('mysql');
const util = require('util');
const childProcess = require('child_process')

//=============连接mysql=================

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'mkk'
});

connection.connect();

//============== 封装mysql方法 ====================

const queryCallBack = (err, results) => {
    if (err) {
        console.error(err);
    }

    // console.log(JSON.stringify(results));
    Object.keys(results).forEach(function (key) {
        var count = results[key].count;
        var street = results[key].street;
        var order_time = results[key].order_time;
        // 遍历一行记录 key 为索引
        var content = '<td style="--size:calc( ' + count + ' / 1 );"><span class="data"> ' + count + '套 </span></td>';
        $("#table_tr").append(content);
        var li_content = '<li>' + street + '</li>';
        $("#explain_ul").append(li_content);
        // console.log(results[key])
    });

}

/**
 * 
 * SELECT
    street ,count(*),order_time
FROM
    second_hand_house_order_record 
WHERE
    district = "北仑区" and order_time >'2022-08-03 00:00:00' and company like "%%"
GROUP BY
    street,order_time

    SELECT street,count(*),order_time FROM second_hand_house_order_record WHERE district="北仑区" AND order_time> '2022-08-03 00:00:00' AND company LIKE "%%" GROUP BY street,order_time

 * 
 */


const queryByDistreeOrName = (distreeOrName) => {

    // distreeOrName = {
    //     type: 1,
    //     distree: "北仑区",
    //     time: '2022-08-03 00:00:00',
    //     company: '北仑区',
    // }

    // 1是区查询 2是名称查询
    if (distreeOrName.type == 1) {
        var distree = distreeOrName.distree;
        var time = distreeOrName.time;
        var company = distreeOrName.company;
        var querySql = "SELECT street,count(*) as count,order_time FROM second_hand_house_order_record WHERE district=? AND order_time> ? AND company LIKE ? GROUP BY street,order_time  order by count(*) desc limit 25";
        var parmaArray = [distree, time, "%" + company + "%"];
        if (distree == undefined || distree == null || distree.length < 1) {
            distree = "";
            querySql = "SELECT street,count(*) as count ,order_time FROM second_hand_house_order_record WHERE order_time> ? AND company LIKE ? GROUP BY street,order_time  order by count(*) desc limit 25";
            parmaArray = [time, '%' + company + '%']
        }
        console.log(querySql, parmaArray);
        connection.query(querySql, parmaArray, queryCallBack);
    } else if (distreeOrName.type == 2) {

    } else {
        console.error("没有此类型")
    }

}



$("#button-all button").each(function (index, element) {
    // element == this
    $(element).click(function (event) {

        var distree_temp = $(this).text();
        var company_temp = '';

        if ($(this).text() == "全区") {
            distree_temp = null;
        } else if ($(this).text() == "北仑区" | $(this).text() == "镇海区" | $(this).text() == "海曙区" |
            $(this).text() == "江北区" | $(this).text() == "高新区" | $(this).text() == "梅山" |
            $(this).text() == "杭州湾" | $(this).text() == "大榭") {
            distree_temp = $(this).text();
        } else if ($(this).text() == "搜索") {
            company_temp  = $("#search-input").val();
            distree_temp = null;
            console.log("搜素 " + company_temp);
        }

        const param = distreeOrName = {
            type: 1,
            distree: distree_temp,
            time: '2022-07-20 00:00:00',
            company: company_temp,
        };

        $("#table_tr").html("");
        $("#explain_ul").html("");
        queryByDistreeOrName(param)

    });


});



//执行主程序
const main = () => {

    // console.log($("#table_1").html());

    const param = distreeOrName = {
        type: 1,
        // distree: "",
        time: '2022-07-20 00:00:00',
        company: '',
    };

    queryByDistreeOrName(param)

}

main();

