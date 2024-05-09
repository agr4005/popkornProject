package com.teamstatic.popkornback.service;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public interface MailServiceInter {

  	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;
		
  	public MimeMessage SendMessage(String to, String content) throws MessagingException, UnsupportedEncodingException;

	public String createKey();

	public String sendSimpleMessage(String to) throws Exception;

	public void sendEmail(String to, String subject, String content) throws Exception;

} 
  
