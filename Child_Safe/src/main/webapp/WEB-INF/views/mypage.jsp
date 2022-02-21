<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="cpath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<script type="text/javascript">
		$(document).ready(function(){
			// 취소
			$(".cancel").on("click", function(){
				
				location.href = "${cpath}/mypage.do";
						    
			})
		
			$("#submit").on("click", function(){
				if($("#userPass").val()==""){
					alert("비밀번호를 입력해주세요.");
					$("#userPass").focus();
					return false;
				}
				if($("#userName").val()==""){
					alert("성명을 입력해주세요.");
					$("#userName").focus();
					return false;
				}
			});
			
				
			
		})
	</script>
	<body>
		<section id="container">
			<form action="${cpath}/mypage.do" method="post">
				<div>
					<label for="mem_id">아이디</label>
					<input type="text" id="mem_id" name="mem_id" value="${member.mem_id}" readonly="readonly"/>
				</div>
				<div>
					<label for="mem_pw">비밀번호</label>
					<input type="text" id="mem_pw" name="mem_pw" value="${member.mem_pw}"/>
				</div>
				<div>
					<label for="mem_name">이름</label>
					<input type="text" id="mem_name" name="userId" value="${member.mem_name}"/>
				</div>
				<div>
					<label for="mem_birthdate">생년월일</label>
					<input type="text" id="mem_birthdate" name="mem_birthdate" value="${member.mem_birthdate}"/>
				</div>
				<div>
					<label for="usermem_phoneId">핸드폰</label>
					<input type="text" id="mem_phone" name="mem_phone" value="${member.mem_phone}"/>
				</div>
				<div>
					<label for="mem_email">이메일</label>
					<input type="text" id="mem_email" name="mem_email" value="${member.mem_email}"/>
				</div>
				<div>
					<label for="mem_addr">주소</label>
					<input type="text" id="mem_addr" name="mem_addr" value="${member.mem_addr}"/>
				</div>
				<div>
					<label for="mem_joindate">가입날자</label>
					<input type="text" id="mem_joindate" name="mem_joindate" value="${member.mem_joindate}"/>
				</div>
				<div>
					<label for="admin_yn">관리자 여부</label>
					<input type="text" id="admin_yn" name="admin_yn" value="${member.admin_yn}"/>
				</div>

				<div>
					<button type="submit" id="submit">회원정보수정</button>
					<button type="button" id="cancel">취소</button>
				</div>
			</form>
		</section>
</body>
</html>