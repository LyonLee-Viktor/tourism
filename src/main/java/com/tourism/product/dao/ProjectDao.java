package com.tourism.product.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tourism.common.dao.BaseDao;
import com.tourism.product.entity.Project;
public interface ProjectDao 
        extends BaseDao<Project>{
	
	List<Project> findObjects(
            @Param("name") String name,
            @Param("valid") Integer valid,
            @Param("startIndex") int startIndex,
            @Param("pageSize") int pageSize);
	int getRowCount(
            @Param("name") String name,
            @Param("valid") Integer valid);

	int validById(
            @Param("ids") String[] ids,
            @Param("valid") int valid);

	List<Map<String,Object>>
	findPrjIdAndNames();
	
	
	
	
}
