package com.tourism.product.service;

import java.util.List;
import java.util.Map;

import com.tourism.product.entity.Team;

public interface TeamService {
     /**根据条件查询当前页数据*/
	 Map<String,Object>findObjects(
             Integer valid,
             Integer projectId,
             Integer pageCurrent);
	 /**查询项目id和名称信息*/
	 List<Map<String,Object>>
	           findPrjIdAndNames();
	 
	 /**禁用和启用团信息*/
	 void validById(String ids, Integer valid);
	 /**保存团信息*/
	 void saveObject(Team entity);
	 /**修改项目信息*/
	 void updateObject(Team entity);
	 /**根据id查找团信息*/
	 Team findObjectById(Integer id);
}





