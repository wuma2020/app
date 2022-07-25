const fs =  require('fs')
var readDir = fs.readdirSync("../");
console.log(readDir);

readDir.forEach((value) => {
    require(value)
    console.log(value)
})