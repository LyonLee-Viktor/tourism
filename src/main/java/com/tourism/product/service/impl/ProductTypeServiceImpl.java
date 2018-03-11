package com.tourism.product.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.tourism.common.exception.ServiceException;
import com.tourism.product.dao.ProductTypeDao;
import com.tourism.product.entity.ProductType;
import com.tourism.product.service.ProductTypeService;

@Service
public class ProductTypeServiceImpl 
implements ProductTypeService {
	@Resource
	private ProductTypeDao productTypeDao;
	/**查询产品分类列表信息*/
	@Override
	public List<Map<String, Object>> 
	findGridTreeObjects() {
		return productTypeDao.findObjects();
	}
	/**查询分类节点信息,在client端以zTree形式展示*/
	@Override
	public List<Map<String, Object>>
	findZtreeNodes() {
		return productTypeDao.findZtreeNodes();
	}
	/**执行删除操作*/
	@Override
	public void deleteObject(Integer id) {
	   if(id==null||id<=0)
	   throw new ServiceException(
			   "id的值无效,id="+id);
	   int count=
	   productTypeDao.hasChilds(id);
	   if(count>0)
	   throw new ServiceException(
			   "此分类下有子元素,不能删除");
	   int rows=
	   productTypeDao.deleteObject(id);
	   if(rows==-1)
	   throw new ServiceException("删除失败");
	}
	/**实现产品类型信息的保存*/
	@Override
	public void saveObject(ProductType entity) {
		if(entity==null)
		throw new ServiceException("保存的对象不能为空");
		System.out.println("save.before.entity.id="+entity.getId());
		int rows=
		productTypeDao.insertObject(entity);
		System.out.println("save.after.entity.id="+entity.getId());
		if(rows==-1)
		throw new ServiceException("保存失败");
		System.out.println("数据保存ok,保存的记录的id为:"+entity.getId());
	}
	
	@Override
	public Map<String,Object> findMapById(
			Integer id) {
		if(id==null)
		throw new ServiceException("id 不能为空");
		Map<String,Object> type=
		productTypeDao.findMapById(id);
		if(type==null)
		throw new ServiceException("没找到对应的对象");
		return type;
	}
	@Override
	public void updateObject(ProductType entity) {
		if(entity==null)
		throw new ServiceException("修改对象不能为空");
		if(entity.getId()==null||entity.getId()<=0)
		throw new ServiceException("id的值无效,id="+entity.getId());
		int rows=productTypeDao.updateObject(entity);
		if(rows==-1)
		throw new ServiceException("更新失败");
	}
}
