<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="cpath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<script type="text/javascript">
	$(document).ready(function() {
		// 취소
		$("#cancel").on("click", function() {
			location.href = "${cpath}/main.do";
		})

		$("#submit").on("click", function() {
			if ($("#mem_id").val() == "") {
				alert("아이디를 입력해주세요.");
				$("#mem_id").focus();
				return false;
			}
			if ($("#mem_pw").val() == "") {
				alert("비밀번호를 입력해주세요.");
				$("#mem_pw").focus();
				return false;
			}
			if ($("#mem_name").val() == "") {
				alert("성명을 입력해주세요.");
				$("#mem_name").focus();
				return false;
			}
			if ($("#mem_birthdate").val() == "") {
				alert("생일을 입력해주세요.");
				$("#mem_birthdate").focus();
				return false;
			}
			if ($("#mem_phone").val() == "") {
				alert("핸드폰 번호를 입력해주세요.");
				$("#mem_phone").focus();
				return false;
			}
			if ($("#mem_email").val() == "") {
				alert("이메일을 입력해주세요.");
				$("#mem_email").focus();
				return false;
			}
			if ($("#mem_addr").val() == "") {
				alert("주소를 입력해주세요.");
				$("#mem_addr").focus();
				return false;
			}
		});

	})
</script>
<body>
	<form action="${cpath}/join.do" method="post">
		<div>
			<label>아이디</label> 
			<input type="text" id="mem_id" name="mem_id" />
		</div>
		<div>
			<label>패스워드</label> 
			<input type="password" id="mem_pw" name="mem_pw" />
		</div>
		<div>
			<label>이름</label> 
			<input type="text" id="mem_name" name="mem_name" />
		</div>
		<div>
			<label>생년월일</label> 
			<input type="date" id="mem_birthdate" name="mem_birthdate" />
		</div>
		<div>
			<label>핸드폰</label> 
			<input type="text" id="mem_phone" name="mem_phone" />
		</div>
		<div>
			<label>이메일</label> 
			<input type="text" id="mem_email" name="mem_email" />
		</div>
		<div>
			<label>주소</label> 
			<input type="text" id="mem_addr" name="mem_addr" />
		</div>
		<div>
			<button type="submit" id="submit">회원가입</button>
			<button type="button" id="cancel">취소</button>
		</div>
	</form>
</body>
</html>