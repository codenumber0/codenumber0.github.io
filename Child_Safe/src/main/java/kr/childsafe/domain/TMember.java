package kr.childsafe.domain;

import java.util.Date;

import lombok.Data;

@Data
public class TMember {
	 // 회원 아이디 회원 아이디
    private String mem_id;

    // 회원 비밀번호 회원 비밀번호
    private String mem_pw;

    // 회원 이름 회원 이름
    private String mem_name;

    // 회원 생년월일 회원 생년월일
    private Date mem_birthdate;

    // 회원 핸드폰 회원 핸드폰
    private String mem_phone;

    // 회원 이메일 회원 이메일
    private String mem_email;

    // 회원 주소 회원 주소
    private String mem_addr;

    // 회원 가입일자 회원 가입일자
    private Date mem_joindate;

    // 관리자 여부 관리자 여부
    private String admin_yn;
}
