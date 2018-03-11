package com.tourism.product.service;

import java.util.Map;

import com.tourism.product.entity.Project;

/**
 * 项目管理模块的业务层对象:
 * 负责具体项目信息的业务处理
 */
public interface ProjectService {
	 /**获得当前页项目信息以及分页信息*/
     Map<String,Object> findObjects(
             String name,
             Integer valid,
             int pageCurrent);
     /**启用禁用项目信息*/
     void validById(
             String idStr,
             Integer valid);
     /**向表中写入数据*/
     void saveObject(Project entity);
     /**修改表中数据*/
     void updateObject(Project entity);
     /**根据id查找具体对象*/
     Project findObjectById(Integer id);
}






