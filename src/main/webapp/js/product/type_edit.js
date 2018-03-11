var zTree;
var setting = {
		data : {   
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : null
			}
		}
}
$(document).ready(function(){
	$("#editTypeForm")
	.on("click",".load-product-type",doLoadZTreeNodes)
    $("#btn-save").click(doSaveOrUpdate)
    
    //点击返回按钮执行doBack函数
    $("#btn-return").click(doBack);
    $("#typeLayer")
    .on("click",".btn-cancle",doHideZtree)
    .on("click",".btn-confirm",doSetSelectedNode);

	var id=$("#container").data("id");
	console.log("edit.id="+id);
	if(id)doFindObjectById(id);
});
/*点击回退或修改结束执行此方法*/
function doBack(){

    doClearData();
	var listUrl="type/listUI.do?t="+Math.random(1000);
	$("#container").load(listUrl);
}
/**根据id执行查询获得记录信息*/
function doFindObjectById(id){
	var url="type/doFindObjectById.do";
	var params={"id":id};
	$.post(url,params,function(result){
		console.log(JSON.stringify(result));
		if(result.state==1){
		doSetEditFormData(result.data);
		}else{
		alert(result.message);
		}
	});
}
/*修改时初始化表单数据*/
function doSetEditFormData(obj){
	$("#typeNameId").val(obj.name);
	$("#parentNameId").val(obj.parentName);
	$("#editTypeForm").data("parentId",
			obj.parentId);
	$("#typeSortId").val(obj.sort);
	$("#typeNoteId").html(obj.note);
}
function doSaveOrUpdate(){
	console.log("==doSaveOrUpdate==")
	var params=getEditFormData();
	var id=$("#container").data("id");
	if(id)params.id=id;
	var saveUrl="type/doSaveObject.do";
	var updateUrl="type/doUpdateObject.do";
	var url=id?updateUrl:saveUrl;
	console.log(JSON.stringify(params));
	$.post(url,params,function(result){
		if(result.state==1){
		doBack();
		}else{
		alert(result.message);
		}
	});
}
/*清空相关数据*/
function doClearData(){
   $(".dynamicClear").val('');
   $("#container").removeData("id");
   $("#editTypeForm").removeData("parentId");
}
function getEditFormData(){
	var params={
	  "name":$("#typeNameId").val(),
	  "parentId":$("#editTypeForm").data("parentId"),
	  "sort":$("#typeSortId").val(),
	  "note":$("#typeNoteId").val()
	};
	return params;
}
function doSetSelectedNode(){
	var selectedNodes= zTree.getSelectedNodes();
	var node=selectedNodes[0];
    $("#parentNameId").val(node.name);
    $("#editTypeForm").data("parentId",node.id);
    doHideZtree();
}
/**隐藏Ztree*/
function doHideZtree(){
 console.log("==doHideZtree==");
 $("#typeLayer").css("display","none");
}
/**显示Ztree以及树上的节点信息*/
function doLoadZTreeNodes(){

 $("#typeLayer").css("display","block");
 var url="type/doFindZtreeObjects.do"
 $.getJSON(url,function(result){
	 console.log("result="+JSON.stringify(result))
	 if(result.state==1){
		 zTree=$.fn.zTree.init(
				 $("#typeTree"),
				 setting,
				 result.data);
	 }else{
		alert(result.message);
	 }
 });
 
 
}