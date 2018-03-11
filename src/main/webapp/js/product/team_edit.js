$(document).ready(function(){
	doGetProjectIdAndNames();
	$("#modal-dialog").on("click",".ok",doSaveObject);
	$("#modal-dialog").on("hidden.bs.modal",function(){
		$(this).off("click",".ok");
		$(this).removeData("id");
	});

});
function doFindObjectById(){
	var url="team/doFindObjectById.do";
	var id=$("#modal-dialog").data("id");
	var params={"id":id};
	$.post(url,params,function(result){
		if(result.state==1){
		 doInitEditFormData(result.data);
		}else{
		 alert(result.message);
		}
	})
}
function doInitEditFormData(result){
	$("#nameId").val(result.name);
	$("#noteId").html(result.note);
	$('#editFormId input[name="valid"]')
	.each(function(){
		if($(this).val()==result.valid){
			$(this).prop("checked",true)
		}
	});
	$("#projectId").val(result.projectId);

}

function doSaveObject(){
	if(!$("#editFormId").valid())return;
	var params=getEditFormData();
	var id=$("#modal-dialog").data("id");
	if(id)params.id=id;//假如是修改要追加id
	var saveUrl="team/doSaveObject.do";
	var updateUrl="team/doUpdateObject.do";
	var url=id?updateUrl:saveUrl;
	$.post(url,params,function(result){
		if(result.state==1){
			$("#modal-dialog").modal("hide");
			doGetObjects();
		}else{alert(result.message);}
	});
	
}
/*获得表单数据*/
function getEditFormData(){
var params={
"name":$("#nameId").val(),
"projectId":$("#projectId").val(),
"valid":$('input[name="valid"]:checked').val(),
"note":$('#noteId').val()
};return params;
}
/*获得项目的id和名称*/
function doGetProjectIdAndNames(){
	var url="team/doFindPrjIdAndNames.do";
	$.getJSON(url,function(result){
		if(result.state==1){
			doInitProjectSelect(result.data);
			var id=$("#modal-dialog").data("id");
			if(id)doFindObjectById();
		}else{
			alert(result.message);
		}
	});
}
function doInitProjectSelect(list){
	var select=$("#projectId");
	select.append(
	"<option>==请选择==</option>")
	var option=
	"<option value=[id]>[name]</option>"
	for(var i in list){
		select.append(
		option.replace("[id]",list[i].id)
		      .replace("[name]",list[i].name));
	}
}



