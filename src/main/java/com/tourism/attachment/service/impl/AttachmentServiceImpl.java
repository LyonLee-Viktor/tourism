package com.tourism.attachment.service.impl;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import com.tourism.attachment.dao.AttachmentDao;
import com.tourism.attachment.entity.Attachment;
import com.tourism.attachment.service.AttachmentService;
import com.tourism.common.exception.ServiceException;
@Service
public class AttachmentServiceImpl implements AttachmentService {
	@Resource
	private AttachmentDao attachementDao;
    @Override
    public Attachment findObjectById(Integer id) {

    	if(id==null)
    	throw new ServiceException("id的值不能为空");

    	Attachment a=attachementDao.findObjectById(id);

    	if(a==null)
    	throw new ServiceException("没找到对应记录");
    	return a;
    }
    /**获得所有附件信息*/
    @Override
    public List<Attachment> findObjects() {
    	return attachementDao.findObjects();
    }
    
	@Override
	public void uploadObject(String title,
			MultipartFile mFile) {
		System.out.println("title.isEmpty()="+title.isEmpty());
		//实现文件上传
		if(title==null||title.trim().length()==0)
		throw new ServiceException("上传标题不能为空");
		if(mFile==null)
		throw new ServiceException("需要选择上传文件");
		if(mFile.isEmpty())
		throw new ServiceException("上传文件不能为空");
		 String fileDisgest=null;
		 byte buf[]=null;
		 try{
		 buf=mFile.getBytes();
		 fileDisgest=
		 DigestUtils.md5DigestAsHex(buf);
		 System.out.println("fileDisgest="+fileDisgest);
		 }catch(Exception e){
		 e.printStackTrace();
		 throw new ServiceException("文件摘要创建失败");
		 }

		 int count=
		 attachementDao.getRowCountByDigest(
				 fileDisgest);
		 if(count>0)
		 throw new ServiceException("文件已上传,不能再次上传");

		SimpleDateFormat sdf=
		new SimpleDateFormat("yyyy/MM/dd");
		String dateDir=sdf.format(new Date());
		String baseDir="d:/uploads/";
		File uploadDir=new File(baseDir+dateDir);
		if(!uploadDir.exists()){
			uploadDir.mkdirs();
		}
		//构建新的文件名(相同目录下不允许出现重复的名字)
		String srcFileName=
		mFile.getOriginalFilename();
		String destfileName=
		UUID.randomUUID().toString()+"."
		+FilenameUtils.getExtension(srcFileName);
		File dest=new File(uploadDir, destfileName);
	    try{
		mFile.transferTo(dest);
	    }catch(IOException e){
	    e.printStackTrace();
	    throw new ServiceException("文件上传失败");
	    }
		//将文件相关信息写入数据库
	    Attachment a=new Attachment();
	    a.setTitle(title);
	    a.setFileName(mFile.getOriginalFilename());
	    a.setContentType(mFile.getContentType());
	    a.setFilePath(dest.getAbsolutePath());
	    a.setFileDisgest(fileDisgest);
	    a.setAthType(1);//暂且没用到
	    a.setBelongId(1);//暂且没用到	    
	    int rows=attachementDao.insertObject(a);
	    if(rows==-1)
	    throw new ServiceException("insert error");
	}
}
