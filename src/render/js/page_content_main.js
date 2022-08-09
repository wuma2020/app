

//==========引入包=========   
const https = require('https');
const cheerio = require('cheerio');
const mysql = require('mysql');
const util = require('util');
const childProcess = require('child_process')

//=============连接mysql=================

var connection = mysql.createConnection({
    host: '49.232.22.162',
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
        var content = '<td style="--size:calc( ' + count + ' / 10 );"><span class="data"> ' + count + '套 </span></td>';
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
    //     street: '新碶街道',
    // }

    // 1是区查询 2是名称查询
    if (distreeOrName.type == 1) {
        var distree = distreeOrName.distree;
        var time = distreeOrName.time;
        var street = distreeOrName.street;

        var querySql = "SELECT street,count(*) as count,order_time FROM second_hand_house_order_record WHERE district=? AND order_time> ? AND street LIKE ? GROUP BY street,order_time  order by count(*) desc limit 25";
        var parmaArray = [distree, time, "%" + street + "%"];
        if (distree == undefined || distree == null || distree.length < 1) {
            distree = "";
            querySql = "SELECT street,count(*) as count ,order_time FROM second_hand_house_order_record WHERE order_time> ? AND street LIKE ? GROUP BY street,order_time  order by count(*) desc limit 25";
            parmaArray = [time, '%' + street + '%']
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

        var distree_temp = '';
        var time_before = '2022-07-20 00:00:00';
        var street_temp = '';
        if ($(this).text() == "全区") {
            distree_temp = null;
        } else if ($(this).text() == "北仑区" | $(this).text() == "镇海区" | $(this).text() == "海曙区" |
            $(this).text() == "江北区" | $(this).text() == "高新区" | $(this).text() == "梅山" |
            $(this).text() == "杭州湾" | $(this).text() == "大榭") {
            distree_temp = $(this).text();
        } else if ($(this).text() == "搜索") {
            street_temp = $("#search-input").val();
            distree_temp = null;
            console.log("搜素 " + street_temp);
        } else if ($(this).attr("name") == "time_7") {
            var now = new Date();
            time_before = new Date();
            time_before.setDate(now.getDate() - 7);
        } else if ($(this).attr("name") == "time_30") {
            var now = new Date();
            time_before = new Date();
            time_before.setDate(now.getDate() - 30);
        } else if ($(this).attr("name") == "time_all") {
            var now = new Date();
            time_before = new Date();
            time_before.setDate(now.getDate() - 120);
        }

        const param = distreeOrName = {
            type: 1,
            distree: distree_temp,
            time: time_before,
            street: street_temp,
        };

        $("#table_tr").html('<th id="table_name" scope="row">'+$(this).text()+'</th>');
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
        street: '',
    };

    queryByDistreeOrName(param)

}

main();

