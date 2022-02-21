<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta charset="UTF-8">
 <title>ChildSafe</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/feather/feather.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/css/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- Plugin css for this page -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/datatables.net-bs4/dataTables.bootstrap4.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/skydash/js/select.dataTables.min.css">
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/style.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/sub.css">
  <!-- endinject -->

</head>
<body>
  <div class="container-scroller">
    <!-- partial:partials/_navbar.html -->
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a class="navbar-brand brand-logo mr-5" href="Zindex.html"><b>ChildSafe</b></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
        <ul class="navbar-nav mr-lg-2">

        </ul>

        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>

    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="Zindex.html">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">메인페이지</span>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link"  href="#차트페이지" aria-expanded="false" aria-controls="ui-basic">
              <i class="icon-layout menu-icon"></i>
              <span class="menu-title">한눈에 보는 통계</span>
              <i class="menu-arrow"></i>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
              <i class="icon-columns menu-icon"></i>
              <span class="menu-title">GIS 분석</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="form-elements">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"><a class="nav-link" href="Zmap1.do">스쿨존 현황</a></li>
                <li class="nav-item"><a class="nav-link" href="Zmap2.do">어린이 사고 지점</a></li>
                <li class="nav-item"><a class="nav-link" href="Zmap3.do">어린이 사고 다발지점</a></li>
                <li class="nav-item"><a class="nav-link" href="Zmap4.do">어린이 인구 밀도</a></li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
              <i class="icon-grid-2 menu-icon"></i>
              <span class="menu-title">커뮤니티</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="tables">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="Ztable.do">게시판</a></li>
                <li class="nav-item"> <a class="nav-link" href="Zwrite.do">글쓰기</a></li>
              </ul>
            </div>
          </li>
 
          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="icon-head menu-icon"></i>
              <span class="menu-title">고객지원</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="Zlogin.do"> 로그인 </a></li>
                <li class="nav-item"> <a class="nav-link" href="Zjoin.do"> 회원가입 </a></li>
              </ul>
            </div>
          </li>

        </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="row">
                <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h2 class="font-weight-bold" style="font-family: 'NanumSquareRound';"><p>&nbsp;</p>교통사고 데이터 분석을 활용한<br>스쿨존 지정 예측 서비스</h2>
                </div>

              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card tale-bg">
                <div class="card-people mt-auto">
                  <img src="${pageContext.request.contextPath}/resources/skydash/images/main2.png" alt="people">

                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin transparent">
              <div class="row">
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-tale">
                    <div class="card-body">
                      <div class="innerbox">
                        <h3>스쿨존 현황</h3>
                        <hr>
                        <p style="font-size: 12px;">교통사고의 위험으로부터 어린이를 보호하기 위하여 주변도로 가운데 일정구간을 어린이 보호구역으로 지정,관리 현황</p>
                      </div>
                      <a href="javascript:openPopupPage(&#39;WEB&#39;,&#39;http://localhost:8081/cs/Zmap1.do&#39;)" class="more" style="position:absolute;right:15px;top:24px;width:22px;height:22px;background: url(${pageContext.request.contextPath}/resources/skydash//images/5800493.png) no-repeat;text-indent:-9999px;">더보기</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-dark-blue">
                    <div class="card-body">
                      <div class="innerbox">
                        <h3>어린이 사고 지점</h3>
                        <hr>
                        <p style="font-size: 12px;">시군별 스쿨존 내 어린이 사고다발지에 대한 관할경찰서, 사고 위치정보, 발생건수 등의 현황</p>
                      </div>
                      <a href="javascript:openPopupPage(&#39;WEB&#39;,&#39;http://localhost:8081/cs/Zmap2.do&#39;)" class="more" style="position:absolute;right:15px;top:24px;width:22px;height:22px;background: url(${pageContext.request.contextPath}/resources/skydash/images/5800493.png) no-repeat;text-indent:-9999px;">더보기</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div class="card card-light-blue">
                    <div class="card-body">
                      <div class="innerbox">
                        <h3>어린이 사고 다발지점</h3>
                        <hr>
                        <p style="font-size: 12px;">반경 200m에서 12세 이하 보행어린이사고가 3건 이상 또는 사망사고 2건 이상 지점 현황</p>
                      </div>
                      <a href="javascript:openPopupPage(&#39;WEB&#39;,&#39;http://localhost:8081/cs/Zmap3.do&#39;)" class="more" style="position:absolute;right:15px;top:24px;width:22px;height:22px;background: url(${pageContext.request.contextPath}/resources/skydash/images/5800493.png) no-repeat;text-indent:-9999px;">더보기</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 stretch-card transparent">
                  <div class="card card-light-danger">
                    <div class="card-body">
                      <div class="innerbox">
                        <h3>어린이 인구 밀도</h3>
                        <hr>
                        <p style="font-size: 12px;">아동복지법 제3조 제1호에서 규정하고 있는 18세 미만인 사람의 인구 밀도 현황</p>
                      </div>
                      <a href="javascript:openPopupPage(&#39;WEB&#39;,&#39;http://localhost:8081/cs/Zmap4.do&#39;)" class="more" style="position:absolute;right:15px;top:24px;width:22px;height:22px;background: url(${pageContext.request.contextPath}/resources/skydash/images/5800493.png) no-repeat;text-indent:-9999px;">더보기</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card" id="sseung">
              <div class="card position-relative">
                <div class="card-body">
                  <div id="detailedReports" class="carousel slide detailed-report-carousel position-static pt-2" data-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                          <div class="row">
                            <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                              <div class="ml-xl-4 mt-3">
                                <img src="${pageContext.request.contextPath}/resources/skydash/images/po1.png" alt="" style="width: 900px;">
                              </div>  
                              </div>
                            <div class="col-md-12 col-xl-9">
                              <div class="row">
                                <div class="col-md-6 border-right">
                                  <div class="table-responsive mb-3 mb-md-0 mt-3">
                                   
                                  </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                  <img src="${pageContext.request.contextPath}/resources/skydash/images/그래프1.png" alt="">
                                  <div id="south-america-legend"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      
                      <div class="carousel-item">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                            <div class="ml-xl-4 mt-3">
                              <img src="${pageContext.request.contextPath}/resources/skydash/images/po2.png" alt="" style="width: 900px;">
                            </div>  
                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                                <img src="${pageContext.request.contextPath}/resources/skydash/images/그래프2.png" alt="">
                                <div id="south-america-legend"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="carousel-item">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                            <div class="ml-xl-4 mt-3">
                              <img src="${pageContext.request.contextPath}/resources/skydash/images/po3.png" alt="" style="width: 900px;">
                            </div>  
                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                 
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                                <img src="${pageContext.request.contextPath}/resources/skydash/images/그래프3.png" alt="">
                                <div id="south-america-legend"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="carousel-item">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                            <div class="ml-xl-4 mt-3">
                              <img src="${pageContext.request.contextPath}/resources/skydash/images/po4.png" alt="" style="width: 900px;">
                            </div>  
                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                 
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                                <img src="${pageContext.request.contextPath}/resources/skydash/images/그래프4.png" alt="">
                                <div id="south-america-legend"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="carousel-item">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                            <div class="ml-xl-4 mt-3">
                              <img src="${pageContext.request.contextPath}/resources/skydash/images/po5.png" alt="" style="width: 900px;">
                            </div>  
                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                 
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                                <img src="${pageContext.request.contextPath}/resources/skydash/images/그래프5.png" alt="">
                                <div id="south-america-legend"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      

                    </div>
                    <a class="carousel-control-prev" href="#detailedReports" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#detailedReports" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>


  
   

        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2022.  <a href="https://www.smhrd.or.kr/" target="_blank">Computer Science</a></span>
          </div>

        </footer> 
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>   
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->

  <!-- plugins:js -->
  <script src="${pageContext.request.contextPath}/resources/skydash/vendors/js/vendor.bundle.base.js"></script>
  <!-- endinject -->
  <!-- Plugin js for this page -->
  <script src="${pageContext.request.contextPath}/resources/skydash/vendors/chart.js/Chart.min.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/vendors/datatables.net/jquery.dataTables.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/dataTables.select.min.js"></script>

  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="${pageContext.request.contextPath}/resources/skydash/js/off-canvas.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/hoverable-collapse.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/template.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/settings.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="${pageContext.request.contextPath}/resources/skydash/js/dashboard.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/Chart.roundedBarCharts.js"></script>
  <!-- End custom js for this page-->
  <script type="text/javascript">
    function openPopupPage(title,url){
      var width = screen.availWidth-17;
      var height = screen.availHeight-45;
      window.open(url,title,"width="+width+"px,height="+height+"px,left=0,top=0,scrollbars=yes,resizable=yes");
      //window.open(url,"","width="+width+"px,height="+height+"px,fullscreen=yes,scrollbars=yes,resizable=yes");
      //window.open(url, "typical", "width=1200px, height=768px, toolbar=0, scrollbars=yes, directories=0, status=no, resizable=no, menubar=0");
    }
      </script>
</body>

</html>