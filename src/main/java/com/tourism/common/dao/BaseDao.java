package com.tourism.common.dao;
/***
 * 通过此接口实现对子类共性的提取
 * @author adminitartor
 * @param <T>
 */
public interface BaseDao<T> {
	int insertObject(T entity);
	int updateObject(T entity);
	T findObjectById(Integer id);
	//.....
}




