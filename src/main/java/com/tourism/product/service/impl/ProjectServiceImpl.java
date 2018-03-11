package com.tourism.product.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tourism.common.exception.ServiceException;
import com.tourism.common.web.PageObject;
import com.tourism.product.dao.ProjectDao;
import com.tourism.product.entity.Project;
import com.tourism.product.service.ProjectService;
/**
 * @author adminitartor
 */
@Service
public class ProjectServiceImpl 
       implements ProjectService {
	@Resource
	private ProjectDao projectDao;
	/**查询,获取项目信息*/
	@Override
	public Map<String,Object> findObjects(
			String name,
			Integer valid,
			int pageCurrent) {
		int pageSize=2;
		int startIndex=(pageCurrent-1)*pageSize;
		List<Project> list=
		projectDao.findObjects(
		name,valid,startIndex,pageSize);
		int rowCount=
		projectDao.getRowCount(name,valid);
		int pageCount=rowCount/pageSize;
		if(rowCount%pageSize!=0){
			pageCount++;
		}
		PageObject pageObject=new PageObject();
		pageObject.setRowCount(rowCount);
		pageObject.setPageCount(pageCount);
		pageObject.setPageSize(pageSize);
		pageObject.setPageCurrent(pageCurrent);
		pageObject.setStartIndex(startIndex);
		Map<String,Object> map=
		new HashMap<String,Object>();
		map.put("list", list);
		map.put("pageObject", pageObject);
		return map;
	}
	/** 启用或禁用项目信息*/
	@Override
	public void validById(String idStr,Integer valid) {
		System.out.println("valid="+valid);
		if(idStr==null||idStr.trim().length()==0)
		throw new ServiceException("至少选择一项");
		if(valid!=0&&valid!=1)
		throw new ServiceException("valid值必须是0或者1");
		String[] ids=idStr.split(",");
		projectDao.validById(ids,valid);
	}
	/**执行写入操作
	 * @param entity 封装了用户页面上输入的数据
	 * */
	@Override
	public void saveObject(Project entity) {
		if(entity==null)
		throw new ServiceException("写入的数据不能为空");
		int rows=
		projectDao.insertObject(entity);
		if(rows==-1)
		throw new ServiceException("insert error");
	}
	/**根据id查找project对象*/
	@Override
	public Project findObjectById(
			Integer id) {
		if(id==null||id<=0)
		throw new ServiceException(
				"id值无效:id="+id);
		Project project= projectDao.findObjectById(id);
		if(project==null)
		throw new ServiceException(
		"没有找到对应的记录");
		return project;
	}
	/**执行修改操作*/
	@Override
	public void updateObject(Project entity) {
		if(entity==null)
		throw new ServiceException("被修改的记录不能空");
		int rows=projectDao.updateObject(entity);
		if(rows==-1)
		throw new ServiceException("修改失败");
	}
}








