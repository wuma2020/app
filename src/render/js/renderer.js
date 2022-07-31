
//===================初始化html===================
var initHtml = () => {

  console.log('测试')
  // $("#navbarul").click
  $("#page_content").load("./src/static/page_content_main.html");


  $("#navbarul li").click(function (ee) {
    // todo 给每一个导航栏添加监听，展示响应的数据
    console.log(ee.toElement)
    if(ee.toElement.name == "main"){
      $("#page_content").load("./src/static/page_content_main.html");
    }else{
      $("#page_content").html("aaaaaaaa")
    }
    

  })

  // 切换主题
  $("#change_theme li").click(function (a) { 
    $("html").attr("data-theme", a.toElement.text);
  });


}

$(initHtml())




// screenshot.addEventListener('click', async () => {
//   var filePath = await window.electrona.mykk()
//   // screenshotMsg.innerHTML = filePath;
//   // console.log(filePath)
// })


