$(document).ready(function(){
	$("#pageId").on('click',
	'.pre,.next,.first,.last',jumpToPage);
	
});
//设置分页
function setPagination(pageObject){
 $(".pageCount").html("总页数("
		 +pageObject.pageCount+")");
 $(".pageCurrent").html("当前页("
		 +pageObject.pageCurrent+")");

 $("#pageId").data("pageCount",pageObject.pageCount);
 $("#pageId").data("pageCurrent",pageObject.pageCurrent);
}
//定义一个函数,通过此函数实现页面的跳转
function jumpToPage(){
	var clazz=$(this).attr("class");
	var pageCurrent=$('#pageId').data("pageCurrent");
	var pageCount=$('#pageId').data("pageCount")
	if(clazz=='pre'&&pageCurrent>1){
		pageCurrent--;
	}
	if(clazz=="next"&&pageCurrent<pageCount){
		pageCurrent++;
	}
	if(clazz=="first"){
		pageCurrent=1;
	}
	if(clazz=="last"){
		pageCurrent=pageCount;
	}
	$('#pageId').data("pageCurrent",pageCurrent);
	doGetObjects();
}









