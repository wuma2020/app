const http = require("http")
http.request('http://www.baidu.com', (response) => {
    // console.log(response)
    console.log(response.headers)
}).end()