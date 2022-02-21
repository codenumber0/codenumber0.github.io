<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<c:set var="cpath" value = "${pageContext.request.contextPath}"/> <!-- context path -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("#logoutBtn").on("click", function(){
			location.href="${cpath}/logout.do";
		})
		$("#joinBtn").on("click", function(){
			location.href="${cpath}/join.do";
		})
		$("#memberUpdateBtn").on("click",function(){
			location.href="${cpath}/mypage.do"
		})
	})
</script>
</head>
<body>
<h1>프로젝트 시작</h1>
    <table>
		<tr>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>12</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
		</tr>
		<c:forEach var="vo" items="${list}">
			<tr>
				<td>${vo.mem_id}</td>
				<td>${vo.mem_pw}</td>
				<td>${vo.mem_name}</td>
				<td>${vo.mem_birthdate}</td>
				<td>${vo.mem_phone}</td>
				<td>${vo.mem_email}</td>
				<td>${vo.mem_addr}</td>
				<td>${vo.mem_joindate}</td>
				<td>${vo.admin_yn}</td>
			</tr>
		</c:forEach>

	</table>
	<form action="${cpath}/login.do" method="post">
		<c:if test="${member == null}">
			<div>
				<label for="mem_id"></label>
				<input type="text" id="mem_id" name="mem_id">
			</div>
			<div>
				<label for="mem_pw"></label>
				<input type="password" id="mem_pw" name="mem_pw">
			</div>
			<div>
				<button type="submit">로그인</button>
				<button type="button" id="joinBtn">회원가입</button>
			</div>
		</c:if>
		<c:if test="${member != null }">
			<div>
				<p>${member.mem_id}님 환영 합니다.</p>
				<button id="logoutBtn" type="button">로그아웃</button>
				<button id="memberUpdateBtn" type="button">회원정보수정</button>
			</div>
		</c:if>
		<c:if test="${msg == false}">
			<p style="color: red;">로그인 실패! 아이디와 비밀번호 확인해주세요.</p>
		</c:if>
	</form>
</body>
</html>