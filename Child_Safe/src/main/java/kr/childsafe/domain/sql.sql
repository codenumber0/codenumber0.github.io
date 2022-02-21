CREATE TABLE t_member
(
    mem_id           VARCHAR2(30)     NOT NULL, 
    mem_pw           VARCHAR2(30)     NOT NULL, 
    mem_name         VARCHAR2(30)     NOT NULL, 
    mem_birthdate    DATE             DEFAULT SYSDATE NOT NULL, 
    mem_phone        VARCHAR2(30)     NOT NULL, 
    mem_email        VARCHAR2(60)     NOT NULL, 
    mem_addr         VARCHAR2(200)    NOT NULL, 
    mem_joindate     DATE             DEFAULT SYSDATE NOT NULL, 
    admin_yn         VARCHAR2(1)      DEFAULT 'N' NOT NULL, 
     PRIMARY KEY (mem_id)
);
select * from t_member where mem_id=1 and mempw=2
select mem_Id,mem_pw from t_member where mem_Id='1';
select * from t_member 
/
INSERT INTO t_member (mem_id, mem_pw, mem_name, mem_birthdate, mem_phone, mem_email, mem_addr, mem_joindate, admin_yn) VALUES ('1', '2', 'mem_name 1', sysdate, 'mem_phone 1', 'mem_email 1', 'mem_addr 1', sysdate, 'N');
INSERT INTO t_member (mem_id, mem_pw, mem_name, mem_birthdate, mem_phone, mem_email, mem_addr, mem_joindate, admin_yn) VALUES ('mem_id 2', 'mem_pw 2', 'mem_name 2', sysdate, 'mem_phone 2', 'mem_email 2', 'mem_addr 2', sysdate, 'N');
INSERT INTO t_member (mem_id, mem_pw, mem_name, mem_birthdate, mem_phone, mem_email, mem_addr, mem_joindate, admin_yn) VALUES ('mem_id 3', 'mem_pw 3', 'mem_name 3', sysdate, 'mem_phone 3', 'mem_email 3', 'mem_addr 3', sysdate, 'N');


COMMENT ON TABLE t_member IS '회원 정보 테이블';
/

COMMENT ON COLUMN t_member.mem_id IS '회원 아이디';
/

COMMENT ON COLUMN t_member.mem_pw IS '회원 비밀번호';
/

COMMENT ON COLUMN t_member.mem_name IS '회원 이름';
/

COMMENT ON COLUMN t_member.mem_birthdate IS '회원 생년월일';
/

COMMENT ON COLUMN t_member.mem_phone IS '회원 핸드폰';
/

COMMENT ON COLUMN t_member.mem_email IS '회원 이메일';
/

COMMENT ON COLUMN t_member.mem_addr IS '회원 주소';
/

COMMENT ON COLUMN t_member.mem_joindate IS '회원 가입일자';
/

COMMENT ON COLUMN t_member.admin_yn IS '관리자 여부';
/
drop table t_member