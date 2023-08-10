(function(){
  //入口函数
    function init (dom, arg,fn) {
      //判断传入的页码是否符合标准
      if(arg.current <= arg.pageCount){
          fillhtml(dom,arg);
          bindEvent(dom, arg, fn);
      }else{
          alert('请输入正确的页码')
      }
  }
  //动态构建网页内容
  function fillhtml(dom,arg){
      //清空页面布局
      dom.empty();
      //大体分三部分：上一页，中间页码，下一页
      //上一页
      //上一页又分为可点击与不可点击两种
      if(arg.current > 1){
          dom.append('<a class="prePage" href="#">上一页</a>');
      }else {
          dom.remove('.prePage');
          dom.append('<span class="noPre">上一页</span>');
      }
      //中间页码
      //中间页码又分为中间可显示的5个页码与...与两端的页码
      //第一页
      if(arg.current != 1 && arg.current > 3){
          dom.append('<a class="tcdNum" href="#">1</a>');
      }
      //判断当前页面是否距离第一页大于3，是则需要...
      if(arg.current-3 > 1){
          dom.append('<span>...</span>');
      }
      //判断中间需要显示的页码
      var start = arg.current-2;
      var end = arg.current+2;
      for(;start <= end;start++){
          //判断开始页面是否大于1且是否小于最大页码
          if(start >= 1 && start <= arg.pageCount){
              //判断是否是选中页面
              if(start == arg.current){
                  dom.append('<span class="current">'+start+'</span>');
              } else {
                  dom.append('<a class="tcdNum" href="#">'+start+'</a>');
              }
          }
      }
      //后置的...
      if(arg.current+3 < arg.pageCount){
          dom.append('<span>...</span>');
      }
      //最后一页
      if(arg.current != arg.pageCount && arg.current < arg.pageCount-2){
          dom.append('<a class="tcdNum" href="#">'+arg.pageCount+'</a>');
      }
      //下一页
      //下一页与上一页类似
      if(arg.current < arg.pageCount){
          dom.append('<a class="nextPage" href="#">下一页</a>');
      }else {
          dom.remove('.prePage');
          dom.append('<span class="noPre">下一页</span>')
      }
  }
  //处理点击事件
  function bindEvent(dom,arg,fn){
      //分为点击上一页，点击页码与点击下一页
      //点击上一页
      //获得当前页面，-1 然后调用fillhtml重绘页面
      dom.on('click','.prePage',function(){
          var cur=parseInt(dom.children('.current').text());
          fillhtml(dom,{'current':cur-1,'pageCount':arg.pageCount});
          if(typeof arg.backFn=='function'){
              arg.backFn(cur-1,fn);
          }
      })
      //点击页码
      //获得点击页码，调用fillhtml重绘页面
      dom.on('click','.tcdNum',function(){
          var cur=parseInt($(this).text());
          fillhtml(dom,{'current':cur,'pageCount':arg.pageCount});
          if(typeof arg.backFn=='function'){
              arg.backFn(cur,fn);
          }
      })
      //点击下一页
      //获得当前页面，+1 然后调用fillhtml重绘页面
      dom.on('click','.nextPage',function(){
          var cur=parseInt(dom.children('.current').text());
          fillhtml(dom,{'current':cur+1,'pageCount':arg.pageCount});
          if(typeof arg.backFn=='function'){
              arg.backFn(cur+1,fn);
          }
      })
  }
  //扩展jquery封装函数
  $.fn.create=function(option,fn){
//
//      extend函数：当调用create时，如果传了参数option
//      则使用传入的参数，否则使用预定义的参数
//
      var arg=$.extend({
          pageCount:10,
          current:1,
          backFn: function (pageCount, current) {
              console.log(pageCount,current)
          }
      },option)
      init(this,arg,fn);

  }
})(jQuery);