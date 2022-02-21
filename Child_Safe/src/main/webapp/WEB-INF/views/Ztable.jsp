<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>ChildSafe</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/feather/feather.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/ti-icons/css/themify-icons.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/css/vendor.bundle.base.css">
<script src="https://kit.fontawesome.com/a81368914c.js"></script>

<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/style.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/table.css">

</head>

<body>
	<div class="container-scroller">
		<!-- partial:partials/_navbar.html -->
		<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
			<div
				class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
				<a class="navbar-brand brand-logo mr-5" href="Zindex.html"><b>ChildSafe</b></a>
			</div>
			<div
				class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
				<button class="navbar-toggler navbar-toggler align-self-center"
					type="button" data-toggle="minimize">
					<span class="icon-menu"></span>
				</button>
				<ul class="navbar-nav mr-lg-2">

				</ul>

				<button
					class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
					type="button" data-toggle="offcanvas">
					<span class="icon-menu"></span>
				</button>
			</div>
		</nav>

		<!-- partial -->
		<div class="container-fluid page-body-wrapper">
			<nav class="sidebar sidebar-offcanvas" id="sidebar">
				<ul class="nav">
					<li class="nav-item"><a class="nav-link" href="Zindex.html">
							<i class="icon-grid menu-icon"></i> <span class="menu-title">메인페이지</span>
					</a></li>

					<li class="nav-item"><a class="nav-link"
						data-toggle="collapse" href="#ui-basic" aria-expanded="false"
						aria-controls="ui-basic"> <i class="icon-layout menu-icon"></i>
							<span class="menu-title">한눈에 보는 통계</span> <i class="menu-arrow"></i>
					</a>
						<div class="collapse" id="ui-basic">
							<ul class="nav flex-column sub-menu">
								<li class="nav-item"><a class="nav-link"
									href="pages/ui-features/buttons.html">Buttons</a></li>
								<li class="nav-item"><a class="nav-link"
									href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
								<li class="nav-item"><a class="nav-link"
									href="pages/ui-features/typography.html">Typography</a></li>
							</ul>
						</div></li>

					<li class="nav-item"><a class="nav-link"
						data-toggle="collapse" href="#form-elements" aria-expanded="false"
						aria-controls="form-elements"> <i
							class="icon-columns menu-icon"></i> <span class="menu-title">스쿨존
								현황</span> <i class="menu-arrow"></i>
					</a>
						<div class="collapse" id="form-elements">
							<ul class="nav flex-column sub-menu">
								<li class="nav-item"><a class="nav-link"
									href="pages/forms/basic_elements.html">Basic Elements</a></li>
							</ul>
						</div></li>

					<li class="nav-item"><a class="nav-link"
						data-toggle="collapse" href="#charts" aria-expanded="false"
						aria-controls="charts"> <i class="icon-bar-graph menu-icon"></i>
							<span class="menu-title">어린이 사고</span> <i class="menu-arrow"></i>
					</a>
						<div class="collapse" id="charts">
							<ul class="nav flex-column sub-menu">
								<li class="nav-item"><a class="nav-link"
									href="pages/charts/chartjs.html">ChartJs</a></li>
							</ul>
						</div></li>

					<li class="nav-item"><a class="nav-link"
						data-toggle="collapse" href="#tables" aria-expanded="false"
						aria-controls="tables"> <i class="icon-grid-2 menu-icon"></i>
							<span class="menu-title">커뮤니티</span> <i class="menu-arrow"></i>
					</a>
						<div class="collapse" id="tables">
							<ul class="nav flex-column sub-menu">
								<li class="nav-item"><a class="nav-link" href="Ztable.do">게시판</a></li>
								<li class="nav-item"><a class="nav-link" href="Zwrite.do">글쓰기</a></li>
							</ul>
						</div></li>

					<li class="nav-item"><a class="nav-link"
						data-toggle="collapse" href="#auth" aria-expanded="false"
						aria-controls="auth"> <i class="icon-head menu-icon"></i> <span
							class="menu-title">고객지원</span> <i class="menu-arrow"></i>
					</a>
						<div class="collapse" id="auth">
							<ul class="nav flex-column sub-menu">
								<li class="nav-item"><a class="nav-link" href="Zlogin.do">로그인 </a></li>
								<li class="nav-item"><a class="nav-link" href="Zjoin.do">회원가입 </a></li>
							</ul>
						</div></li>

				</ul>
			</nav>

			<!-- partial -->
			<div class="main-panel">
				<div class="content-wrapper">
					<div class="row">
						<div class="common_style">
							<div class="limiter">
								<div class="container-table100">
									<div class="wrap-table100">
										<div class="table100">
											<h2>게시판</h2>
											<hr
												style="height: 5px; border: none; color: #e8bf12; background-color: #e8bf12;" />
											<table>
												<thead>
													<tr class="table100-head">
														<th class="column1">날짜</th>
														<th class="column2">글번호</th>
														<th class="column3">제목</th>
														<th class="column5">조회수</th>
														<th class="column6">글쓴이</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class="column1">2017-09-29 01:22</td>
														<td class="column2">200398</td>
														<td class="column3"><a href="Zpost.do"
															style="color: #808080;">2차 프로젝트 첫글</a></td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-28 05:57</td>
														<td class="column2">200397</td>
														<td class="column3">2차 프로젝트 글7</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-26 05:57</td>
														<td class="column2">200396</td>
														<td class="column3">2차 프로젝트 글8</td>
														<td class="column5">2</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-25 23:06</td>
														<td class="column2">200392</td>
														<td class="column3">2차 프로젝트 글9</td>
														<td class="column5">3</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-24 05:57</td>
														<td class="column2">200391</td>
														<td class="column3">2차 프로젝트 글10</td>
														<td class="column5">6</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-23 05:57</td>
														<td class="column2">200390</td>
														<td class="column3">2차 프로젝트 글11</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-22 05:57</td>
														<td class="column2">200389</td>
														<td class="column3">2차 프로젝트 글12</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-21 05:57</td>
														<td class="column2">200388</td>
														<td class="column3">2차 프로젝트 글13</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-19 05:57</td>
														<td class="column2">200387</td>
														<td class="column3">2차 프로젝트 글14</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-18 05:57</td>
														<td class="column2">200386</td>
														<td class="column3">2차 프로젝트 글1</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-22 05:57</td>
														<td class="column2">200389</td>
														<td class="column3">2차 프로젝트 글2</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-21 05:57</td>
														<td class="column2">200388</td>
														<td class="column3">2차 프로젝트 글3</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-19 05:57</td>
														<td class="column2">200387</td>
														<td class="column3">2차 프로젝트 글4</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
													<tr>
														<td class="column1">2017-09-18 05:57</td>
														<td class="column2">200386</td>
														<td class="column3">2차 프로젝트 글5</td>
														<td class="column5">1</td>
														<td class="column6">진기혀니</td>
													</tr>
												</tbody>
											</table>
											<div>
												<ul>
													<br>
													<li style="text-align: right;"><a href="Zwrite.html"
														style="color: #808080;"><i class="far fa-edit"></i>글쓰기</a></li>
												</ul>
											</div>
											<div class="paginate"
												style="text-align: center; letter-spacing: 10px;">
												<span class="num"> <br> <strong class="s-active"
													title="현재위치">1</strong> <a href="#" style="color: #e8bf12;">2</a>
													<a href="#" style="color: #e8bf12;">3</a> <a href="#"
													style="color: #e8bf12;">4</a> <a href="#"
													style="color: #e8bf12;">5</a> <a href="#"
													style="color: #e8bf12;">></a>

												</span>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
	</div>
	</div>
	</div>
	</div>
	<!-- content-wrapper ends -->
	<!-- partial:../../partials/_footer.html -->
	<footer class="footer">
		<div class="d-sm-flex justify-content-center justify-content-sm-between">
			<span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2022. <a href="https://www.smhrd.or.kr/" target="_blank">Computer Science</a></span>
		</div>

	</footer>
	<!-- partial -->
	</div>
	<!-- main-panel ends -->
	</div>
	<!-- page-body-wrapper ends -->
	</div>


	<script src="${pageContext.request.contextPath}/resources/skydash/vendors/js/vendor.bundle.base.js"></script>
	<script src="${pageContext.request.contextPath}/resources/skydash/js/off-canvas.js"></script>
	<script src="${pageContext.request.contextPath}/resources/skydash/js/hoverable-collapse.js"></script>
	<script src="${pageContext.request.contextPath}/resources/skydash/js/template.js"></script>
	<script src="${pageContext.request.contextPath}/resources/skydash/js/settings.js"></script>

</body>

</html>
