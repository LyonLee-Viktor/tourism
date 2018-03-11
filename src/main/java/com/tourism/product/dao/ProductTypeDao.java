package com.tourism.product.dao;

import java.util.List;
import java.util.Map;

import com.tourism.common.dao.BaseDao;
import com.tourism.product.entity.ProductType;
/**产品分类的持久层对象*/
public interface ProductTypeDao 
   extends BaseDao<ProductType>{
	/**查询分类信息*/
	List<Map<String,Object>>
	findObjects();
	/**添加删除的方法*/
	int deleteObject(Integer id);
	/**判定分类下是否还有子分类*/
	int hasChilds(Integer id);

	List<Map<String,Object>>
	findZtreeNodes();	
	
	Map<String,Object> findMapById(Integer id);
	
}

