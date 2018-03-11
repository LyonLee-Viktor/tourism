var columns = [
{
field : 'selectItem',
radio : true
},
{
title : '分类id',
field : 'id',
visible : false,
align : 'center',
valign : 'middle',
width : '80px'
},
{
title : '分类名称',
field : 'name',
align : 'center',
valign : 'middle',
sortable : true,
width : '180px'
},
{
title : '上级分类',
field : 'parentName',
align : 'center',
valign : 'middle',
sortable : true,
width : '180px'
},
{
title : '排序号',
field : 'sort',
align : 'center',
valign : 'middle',
sortable : true,
width : '100px'
}];
$(document).ready(function(){
	$("#formHead")
	.on("click",".btn-delete",doDeleteObject)
	.on("click",".btn-add,.btn-update",
			doLoadEditPage);
	doGetObjects();
});
/**加载编辑页面到制定位置*/
function doLoadEditPage(){
	var title;
	if($(this).hasClass("btn-add")){
		title="添加分类信息";
	}
	if($(this).hasClass("btn-update")){
		title="修改分类信息"
	    var id=getSelectedId();
		if(id==-1){
		  alert("请先选择");return;
		}
		$("#container").data("id",id);
		console.log("id="+id);
	}
	var url="type/editUI.do"
	$("#container").load(url,function(){
		$(".panel-heading").html(title)
	})
}
/**获得选中的id值*/
function getSelectedId(){
	var selections=$("#typeTable").bootstrapTreeTable("getSelections");
	if(selections.length==0){
	 return -1;
	}
	return selections[0].id;
}
/**执行删除操作*/
function doDeleteObject(){
	var typeId=getSelectedId();
	if(typeId==-1){
		alert("请先选择");
		return;
	}
	var url="type/doDeleteObject.do";
	var params={"id":typeId};
	$.post(url,params,function(result){
		if(result.state==1){
			doGetObjects();
			alert("删除ok");
		}else{
			alert(result.message);
		}
	});
}
function doGetObjects(){
 var tableId="typeTable";
 var url="type/doFindGridTreeObjects.do";
 var table=new TreeTable(tableId,url,columns);
 table.setIdField("id");
 table.setCodeField("id");
 table.setParentCodeField("parentId");
 table.setExpandColumn(2);
 table.setExpandAll(false);
 table.init();
}