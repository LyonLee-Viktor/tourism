package com.tourism.product.controller;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tourism.common.web.JsonResult;
import com.tourism.product.entity.Project;
import com.tourism.product.service.ProjectService;
@RequestMapping("/project/")
@Controller
public class ProjectController {
	@Resource
    private ProjectService projectService;
	
	@RequestMapping("listUI")
	public String listUI(){
		return "product/project_list";
	}
	@RequestMapping("editUI")
	public String editUI(){
		return "product/project_edit";
	}
	@RequestMapping("doFindObjects")
	@ResponseBody
	public JsonResult doFindObjects(
			String name,
			Integer valid,
			int pageCurrent){
		System.out.println("doFindObjects().pageCurrent="+pageCurrent);
		Map<String,Object> map=
		projectService.findObjects(
				name,valid,pageCurrent);

		return new JsonResult(map);
	}

	@RequestMapping("doValidById")
	@ResponseBody
	public JsonResult doValidById(
			String checkedIds,
			Integer valid){
		System.out.println(
				"checkedIds="+checkedIds);
		projectService.validById(
				checkedIds,
				  valid);
		return new JsonResult();

	}

	@RequestMapping("doSaveObject")
	@ResponseBody
	public JsonResult doSaveObject(
			Project entity){
		projectService.saveObject(entity);
		return new JsonResult();
	}
	@RequestMapping("doFindObjectById")
	@ResponseBody
	public JsonResult doFindObjectById(
			Integer id){
		Project project=
		projectService.findObjectById(id);
		return new JsonResult(project);
	}
	@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(
			Project entity,
			HttpServletRequest request){

		projectService.updateObject(entity);
		return new JsonResult();
	}
	
}
