package com.teamstatic.popkornback.service.impls;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.teamstatic.popkornback.service.MailServiceInter;

@Service
public class RegisterMail implements MailServiceInter {

	@Autowired
	JavaMailSender emailsender;

	private String ePw;

	@Override
	public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {

		MimeMessage message = emailsender.createMimeMessage();

		message.addRecipients(RecipientType.TO, to);
		message.setSubject("POPKORN 이메일 인증");

		String msgg = "";
		msgg += "<div style='margin:100px;'>";
		msgg += "<h1> 안녕하세요</h1>";
		msgg += "<h1> 인증 확인 메일 입니다</h1>";
		msgg += "<br>";
		msgg += "<p>아래 코드를 브라우저로 돌아가 입력해주세요<p>";
		msgg += "<br>";
		msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
		msgg += "<h3 style='color:blue;'> POPKORN 인증 코드입니다.</h3>";
		msgg += "<div style='font-size:130%'>";
		msgg += "CODE : <strong>";
		msgg += ePw + "</strong><div><br/> "; // 메일에 인증번호 넣기
		msgg += "</div>";
		message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
		// 보내는 사람의 이메일 주소, 보내는 사람 이름
		message.setFrom(new InternetAddress("apr4005@naver.com", "POPKORN"));// 보내는 사람

		return message;
	}

	@Override
	public MimeMessage SendMessage(String to, String content) throws MessagingException, UnsupportedEncodingException {

		MimeMessage message = emailsender.createMimeMessage();

		message.addRecipients(RecipientType.TO, to);
		message.setSubject(to);

		String msgg = "";
		msgg += content;
		message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype

		message.setFrom(new InternetAddress("apr4005@naver.com", "POPKORN"));// 보내는 사람

		return message;
	}

	@Override
	public String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

			switch (index) {
				case 0:
					key.append((char) ((int) (rnd.nextInt(26)) + 97));
					// a~z (ex. 1+97=98 => (char)98 = 'b')
					break;
				case 1:
					key.append((char) ((int) (rnd.nextInt(26)) + 65));
					// A~Z
					break;
				case 2:
					key.append((rnd.nextInt(10)));
					// 0~9
					break;
			}
		}

		return key.toString();
	}

	// 메일 발송
	// sendSimpleMessage 의 매개변수로 들어온 to 는 곧 이메일 주소가 되고,
	// MimeMessage 객체 안에 내가 전송할 메일의 내용을 담는다.
	// 그리고 bean 으로 등록해둔 javaMail 객체를 사용해서 이메일 send!!
	@Override
	public String sendSimpleMessage(String to) throws Exception {

		ePw = createKey(); // 랜덤 인증번호 생성

		MimeMessage message = createMessage(to); // 메일 발송
		try {// 예외처리
			emailsender.send(message);
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}

		return ePw; // 메일로 보냈던 인증 코드를 서버로 반환
	}

	@Override
	public void sendEmail(String to, String subject, String content) throws Exception {
		MimeMessage message = emailsender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setTo(to);
		helper.setSubject(subject);
		message.setText(content, "utf-8", "html");
		helper.setFrom("apr4005@naver.com");

		emailsender.send(message);
	}

}
