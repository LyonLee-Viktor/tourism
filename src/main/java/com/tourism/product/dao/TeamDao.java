package com.tourism.product.dao;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tourism.common.dao.BaseDao;
import com.tourism.product.entity.Team;
public interface TeamDao extends BaseDao<Team>{

	 List<Map<String,Object>> findObjects(
             @Param("valid") Integer valid,
             @Param("projectId") Integer projectId,
             @Param("startIndex") int startIndex,
             @Param("pageSize") int pageSize);


	 int getRowCount(
             @Param("valid") Integer valid,
             @Param("projectId") Integer projectId);
	 /**
	  * 此方法用于实现记录的禁用和启用
	  * @param ids
	  * @param valid
	  * */
	 int validById(
             @Param("ids") String[] ids,
             @Param("valid") Integer valid);
	 
}
