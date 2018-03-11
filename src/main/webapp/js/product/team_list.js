$(document).ready(function(){
	$("#queryFormId")
	.on("click",".btn-search",doQueryObjects)
	.on("click",".btn-valid,.btn-invalid",doValidById)
	.on("click",".btn-add,.btn-update",doShowEditDialog)
	doGetProjectIdAndNames();
	doGetObjects();
});
function doShowEditDialog(){
	var title;
	if($(this).hasClass("btn-add")){
		title="添加团信息"
	}
	if($(this).hasClass("btn-update")){
		var trId=$(this).parent().parent().data("id");
		$("#modal-dialog").data("id",trId);
		title="修改团信息,id="+$("#modal-dialog").data("id");
	}
	var url="team/editUI.do"
	$("#modal-dialog .modal-body").load(url,function(){
		$(".modal-title").html(title);
		$("#modal-dialog").modal("show");
	});
}
/*实现团信息的禁用和启用操作*/
function doValidById(){
	var valid=getValid($(this));
	var checkedIds=getCheckedIds();
	if(checkedIds.length==0){
		alert("请至少选择一个");
		return;
	}
	var params={"valid":valid,
		"checkedIds":checkedIds}
    var url="team/doValidById.do"
	$.post(url,params,function(result){
    	if(result.state==1){//SUCCESS
    		doGetObjects();
    	}else{//ERROR
    		alert(result.message);
    	}
    });
}
/*获得禁用启用和禁用的状态信息*/
function getValid(obj){
	var valid;
	if(obj.hasClass("btn-valid")){
		valid=1;//启用
	}
	if(obj.hasClass("btn-invalid")){
		valid=0;//禁用
	}
	return valid;
}
/*获得用户选中的团记录的id*/
function getCheckedIds(){
	var checkedIds="";
	$('#tbodyId input[name="checkedItem"]')
	.each(function(){
		if($(this).prop("checked")){
			if(checkedIds==""){
			 checkedIds+=$(this).val();
			}else{
			 checkedIds+=","+$(this).val();
			}
		}
	});return checkedIds;
}
/*点击查询按钮时执行此方法*/
function doQueryObjects(){
	$("#pageId").data("pageCurrent",1);
	doGetObjects();
}


function doGetProjectIdAndNames(){
	var url="team/doFindPrjIdAndNames.do";
	$.getJSON(url,function(result){
		if(result.state==1){//SUCCESS
		doInitProjectSelect(result.data);
		}else{//ERROR
		alert(result.message);
		}
	});
}
/*初始化项目select(id与name)列表*/
function doInitProjectSelect(list){
	var select=$("#searchPrjId");
	select.append('<option value="">选择项目名</option>');
	var option="<option value=[id]>[name]</option>"
	for(var i in list){
	select.append(
		 option.replace("[id]",list[i].id)
		.replace("[name]",list[i].name));
	}
}

function doGetObjects(){
 var url="team/doFindObjects.do";
 var pageCurrent=
 $("#pageId").data("pageCurrent");
 if(!pageCurrent){pageCurrent=1;}
 var params=getQueryFormData();
 params.pageCurrent=pageCurrent;
 $.post(url,params,function(result){
	if(result.state==1){
	  setTableBodyRows(result.data.list);
	  setPagination(result.data.pageObject);
	}else{
	  alert(result.message);
	}
 });
}
/*获取查询表单中的数据*/
function getQueryFormData(){
	var params={
	  "projectId":$("#searchPrjId").val(),
	  "valid":$("#searchValidId").val()
	}
	return params;
}


function setTableBodyRows(list){
	var tBody=$("#tbodyId");
	tBody.empty();
	var firstTd='<td><input type="checkbox" name="checkedItem" value="[id]"></td>';
	for(var i in list){
	 var tr=$("<tr></tr>");
	 tr.data("id",list[i].id);//绑定数据,便于修改时使用
	 tr.append(firstTd.replace("[id]",list[i].id));
	 tr.append("<td>"+list[i].name+"</td>");
	 tr.append("<td>"+list[i].projectName+"</td>");
	 tr.append("<td>"+(list[i].valid?"启用":"禁用")+"</td>")
	 tr.append('<td><button type="button" class="btn btn-default btn-update">修改</td>');
	 tBody.append(tr);
	}
}







