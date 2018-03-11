package com.tourism.common.web;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
public class JsonDateTypeConvert 
     extends JsonSerializer<Date>{
	/**
	 * @param value 是要转换的日期
	 * @param gen 为一个json对象生成器
	 * */
	@Override
	public void serialize(Date value,
			JsonGenerator gen, 
			SerializerProvider serializers)
			throws IOException, 
			JsonProcessingException {

		SimpleDateFormat sdf= new SimpleDateFormat("yyyy/MM/dd");
		String dateStr=sdf.format(value);

		gen.writeString(dateStr);
	}
}
