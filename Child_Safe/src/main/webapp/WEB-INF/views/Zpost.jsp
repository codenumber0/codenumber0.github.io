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
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/style.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/table.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/vertical-layout-light/post.css">
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
            <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i class="icon-layout menu-icon"></i>
              <span class="menu-title">한눈에 보는 통계</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
              <i class="icon-columns menu-icon"></i>
              <span class="menu-title">스쿨존 현황</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="form-elements">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"><a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
              </ul>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
              <i class="icon-bar-graph menu-icon"></i>
              <span class="menu-title">어린이 사고</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="charts">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
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
                <li class="nav-item"> <a class="nav-link" href="Ztable.html">게시판</a></li>
                <li class="nav-item"> <a class="nav-link" href="Ztable.html">글쓰기</a></li>
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
                <li class="nav-item"> <a class="nav-link" href="Zlogin.html"> 로그인 </a></li>
                <li class="nav-item"> <a class="nav-link" href="Zjoin.html"> 회원가입 </a></li>
              </ul>
            </div>
          </li>

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
                      <h2>게시글</h2>
                      <hr style="height:5px;border:none;color:#e8bf12;background-color:#e8bf12;" />
                      <main class="cd-main-content">
                          <header>
                            <h2 id="bo_v_title">
                              <br>
                              <span class="bo_v_tit">2차 프로젝트 첫글</span>
                            </h2>
                          </header>
                        
                        
                          <section id="bo_v_info">
                            <div class="profile_info">
                        
                              <div class="profile_info_ct">
                                <span class="sound_only">작성자</span> <strong><span class="sv_member">관리자</span></strong><br><br>
                                  <span class="sound_only">댓글</span><strong><i class="fas fa-pencil-alt" aria-hidden="true"></i> 0건</strong>
                                <span class="sound_only">조회</span><strong><i class="far fa-eye" aria-hidden="true"></i> 27회</strong>
                                <strong class="if_date"><span class="sound_only">작성일</span><i class="fa fa-clock-o" aria-hidden="true"></i>　2017-09-29 01:22</strong>
                              </div>
                            </div>
                        
                          </section>
                        
                          <section id="bo_v_atc">
                            <h2 id="bo_v_atc_title">본문</h2>
                         
                            <div id="bo_v_con">
                              <p>계절이 지나가는 하늘에는
                                가을로 가득 차 있습니다.
                                <br><br><br>
                                나는 아무 걱정도 없이
                                가을 속의 별들을 다 헤일 듯합니다.
                                <br><br><br>
                                가슴 속에 하나 둘 새겨지는 별을
                                이제 다 못 헤는 것은
                                쉬이 아침이 오는 까닭이요,
                                내일 밤이 남은 까닭이요,
                                아직 나의 청춘이 다하지 않은 까닭입니다.
                                <br><br><br>
                                별 하나에 추억과
                                별 하나에 사랑과
                                별 하나에 쓸쓸함과
                                별 하나에 동경과
                                별 하나에 시와
                                별 하나에 어머니, 어머니,
                                <br><br><br>
                                어머님, 나는 별 하나에 아름다운 말 한마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과, 패, 경, 옥, 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, '프랑시스 잠[1]', '라이너 마리아 릴케[2]' 이런 시인의 이름을 불러 봅니다.
                                <br><br><br>
                                이네들은 너무나 멀리 있습니다.
                                별이 아스라이 멀듯이.
                                <br><br><br>
                                어머님,
                                그리고 당신은 멀리 북간도에 계십니다.
                                <br><br><br>
                                나는 무엇인지 그리워
                                이 많은 별빛이 내린 언덕 위에
                                내 이름자를 써 보고
                                흙으로 덮어 버리었습니다.
                                <br><br><br>
                                딴은 밤을 새워 우는 벌레는
                                부끄러운 이름을 슬퍼하는 까닭입니다.
                                <br><br><br>
                                그러나 겨울이 지나고 나의 별에도 봄이 오면
                                무덤 위에 파란 잔디가 피어나듯이
                                내 이름자 묻힌 언덕 위에도
                                자랑처럼 풀이 무성할 거외다.</p>
                            </div>
                        
                        
                            </section>
                        
                          
                          
                          
                            
                            
                            <button type="button" class="cmt_btn"><span class="total"><b>댓글</b> 0</span><span class="cmt_more"></span></button>
                            <!-- 댓글 시작 -->
                              <section id="bo_vc">
                                <h2>댓글목록</h2>
                                <p id="bo_vc_empty">등록된 댓글이 없습니다.</p>
                              </section>
                              <!--  댓글 끝 -->
                              
                              <!-- 댓글 쓰기 시작  -->
                                <aside id="bo_vc_w" class="bo_vc_w">
                                  <h2>댓글쓰기</h2>
                                  <textarea id="wr_content" name="wr_content" maxlength="10000" required="" class="required" title="내용" placeholder="댓글내용을 입력해주세요"></textarea>
                                  <div class="container-login100-form-btn">
                                    <a id="alertStart" class="login100-form-btn">
                                      <b style="color: #fff;">등록</b>
                                    </a>
                                    </div>
                              <!-- 댓글 쓰기 끝 -->
                                
                                <ul class="bo_v_nb">
                                  <li class="prev">
                                    <span class="txt">이전글</span>
                                    
                                    
                                    <a class="tit" href="#"></a>
                                    <span class="date"></span>
                                    
                                    </li>
                                    <li class="next">
                                    <span class="txt">다음글</span>
                                    
                                    
                                    <a class="tit" href="#"></a>
                                    <span class="date"></span>
                                    
                                    </li></ul>
                          </form></aside>
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
  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="${pageContext.request.contextPath}/resources/skydash/js/off-canvas.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/hoverable-collapse.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/template.js"></script>
  <script src="${pageContext.request.contextPath}/resources/skydash/js/settings.js"></script>
  <script  src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
  <script>
  $().ready(function () {
    $("#alertStart").click(function () {
        Swal.fire({
            icon: 'success',
            confirmButtonColor: '#fdd31d',
            title: '댓글등록이 완료되었습니다',

            closeOnClickOutside : false

            
        });
        });
});</script>

  <!-- endinject -->
  <!-- Custom js for this page-->
  <!-- End custom js for this page-->
</body>

</html>