
//===================初始化html===================
var initHtml = () => {

  // $("#navbarul").click
  $("#page_content").load("./src/static/page_content_main.html");


  $("#navbarul li").click(function (ee) {
    // todo 给每一个导航栏添加监听，展示响应的数据
    if(ee.toElement.name == "main"){
      $("#page_content").load("./src/static/page_content_main.html");
    }else if(ee.toElement.name == "short-cut"){
      $("#page_content").load("./src/static/desktop_image.html");
    }else{
      $("#page_content").html("没有找到页面")
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


