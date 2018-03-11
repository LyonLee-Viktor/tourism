$(document).ready(function(){
	$("#queryFormId").on("click", ".btn-search",doQueryObjects);
	$("#queryFormId").on("click", ".btn-valid,.btn-invalid", doValidById);
	$('#queryFormId').on("click",".btn-add,.btn-update",doShowEditDialog);
	doGetObjects();
	
});

function doShowEditDialog(){
	var title;
	if($(this).hasClass("btn-add")){
		title="添加项目"
	}
	if($(this).hasClass("btn-update")){
		$("#modal-dialog").data("id",
		$(this).parent().parent().data("id"));
		title="修改项目,id为" +$("#modal-dialog").data("id");
	}
	var url="project/editUI.do";
	$("#modal-dialog .modal-body").load(url,function(){//异步加载完成回调此函数
		$(".modal-title").html(title);
		$("#modal-dialog").modal("show");
	});
}

function doValidById(){

 var valid;
 if($(this).hasClass("btn-valid")){
	 valid=1;
 }
 if($(this).hasClass("btn-invalid")){
	 valid=0;
 }
 var checkedIds=getCheckedIds();
 console.log("checkedIds="+checkedIds);
 if(checkedIds.length==0){
	 alert("请至少选择一项");
	 return;
 }
  var url="project/doValidById.do"
  var params={"checkedIds":checkedIds,
		      "valid":valid};
  console.log("params="+JSON.stringify(params));
  $.post(url,params,function(result){
	 if(result.state==1){
		 alert(result.message);
		 doGetObjects();
	 }else{
		 alert(result.message);
	 }
  });
 }
function getCheckedIds(){
  var checkedIds="";
  $('#tbodyId input[name="checkedItem"]').each(function(){
	  if($(this).prop("checked")){
		  if(checkedIds==""){
			  checkedIds+=$(this).val();
		  }else{
			 checkedIds+=","+$(this).val();
		 }
	 }
  });
  return checkedIds;
}


/*执行表单查询*/
function doQueryObjects(){
	console.log("doQueryObjects");
	$("#pageId").data("pageCurrent",1);
	doGetObjects();
}
/*获得查询表单中的数据*/
function getQueryFormData(){
	var params={
		name:$("#searchNameId").val(),
		valid:$("#searchValidId").val()
	};
    return params;
}
function doGetObjects(){
	var url="project/doFindObjects.do"
	var pageCurrent=$("#pageId").data("pageCurrent");
	if(!pageCurrent){
		pageCurrent=1;
	}
	var params=getQueryFormData();
	params.pageCurrent=pageCurrent;
	console.log(JSON.stringify(params))

    $.post(url,params,function(result){
    	if(result.state==1){//成功
    	setTableBodyRows(result.data.list);
    	console.log(JSON.stringify(result.data.pageObject))
    	setPagination(result.data.pageObject);
    	}else{
    	alert(result.message);
    	}
    });	

}

function setTableBodyRows(result){

	var tBody=$("#tbodyId");
	tBody.empty();
	for(var i in result){
	var tr=$("<tr></tr>");
	tr.data("id",result[i].id);
	var firstTd='<td><input type="checkbox" name="checkedItem" value="[id]"></td>';
	firstTd=firstTd.replace("[id]",result[i].id);
	tr.append(firstTd);	
	tr.append("<td>"+result[i].code+"</td>");
	tr.append("<td>"+result[i].name+"</td>");
	tr.append("<td>"+result[i].beginDate+"</td>");
	tr.append("<td>"+result[i].endDate+"</td>");
	tr.append("<td>"+(result[i].valid?"启用":"禁用")+"</td>");
	tr.append("<td><button type='button' class='btn btn-default btn-update'>修改</button></td>");
	tBody.append(tr);
	}
	
}

