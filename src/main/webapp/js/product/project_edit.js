//$(function(){})
$(document).ready(function(){
	$("#modal-dialog").on("click",".ok",doSaveOrUpdate);

	$("#modal-dialog").on("hidden.bs.modal",function(){
		$(this).off("click",".ok")
		       .removeData("id");
	});
	var id=$("#modal-dialog").data("id");
	if(id)doFindObjectById(id);
});
/*根据id执行查找操作*/
function doFindObjectById(id){
	var url="project/doFindObjectById.do"
	var params={"id":id};
	$.post(url,params,function(result){
		if(result.state==1){
		 doInitEditFormData(result.data);	
		}else{
		 alert(result.message);
		}
	});
}
function doInitEditFormData(obj){
	$("#nameId").val(obj.name);
	$("#codeId").val(obj.code);
	$("#beginDateId").val(obj.beginDate);
	$("#endDateId").val(obj.endDate);
	$("#noteId").html(obj.note);
	$("#editFormId input[name='valid']")//radio
	//迭代input标签中name为valid的dom对象
	.each(function(){
		//假如这个对象的值等于obj.valid的值
		//则让其选中.
		if($(this).val()==obj.valid){
		   //设置radio对象的checked属性为true
		   $(this).prop("checked",true)
		}
	});
}


/* 点击模态框上的save按钮时执行此函数,
 * 通过此函数发送异步请求将页面上的数据
 * 发送到服务端.
 */
function doSaveOrUpdate(){
	if(!$("#editFormId").valid())return;
	var params=getEditFormData();
	var id=$("#modal-dialog").data("id");
	if(id)params.id=id;//动态添加属性(修改时需要id的值)
	var updateUrl="project/doUpdateObject.do";
	var insertUrl="project/doSaveObject.do";
	var url=id?updateUrl:insertUrl;
	$.post(url,params,function(result){
		console.log(JSON.stringify(result));
		if(result.state==1){
		 $("#modal-dialog").modal("hide");
		 doGetObjects();
		}else{
		 alert(result.message);
		}
	});
}
function getEditFormData(){
  var params={
	  "name":$("#nameId").val(),
	  "code":$("#codeId").val(),
	  "beginDate":$("#beginDateId").val(),
	  "endDate":$("#endDateId").val(),
	  "valid":$('input[name="valid"]:checked').val(),
	  "note":$("#noteId").val()
  }
  console.log(JSON.stringify(params));
  return params;
}




