<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>ChildSafe</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/skydash/css/map2.css" type="text/css">
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/skydash/js/commonUtil.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/skydash/js/main.js"></script>
    
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/skydash/js/jquery-3.4.1.min.js"></script>
 
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
	<script>
		$(function() {
			$('ul.tap li').click(function() {
				var activeTab = $(this).attr('data-tab');
				$('ul.tap li').removeClass('current');
				$('.tabcontent').removeClass('current');
				$(this).addClass('current');
				$('#' + activeTab).addClass('current');
			})
		});
	</script>
    <style>body { font: 400 13px/18px 'Noto Sans KR', sans-serif; }</style>
</head>
<body>
    <header class="menu menu">
        <div class="title">
            <h1><a href="#" target="_self">GIS분석</a></h1>
            <button type="button" title="통합지도 검색" class="currentMap" onclick="$('header.menu').toggleClass('on');" id="thisMapTitle">어린이 사고 다발지점</button>
            <button type="button" title="지도보기" class="viewMap" onclick="$('main.map, header.menu').toggleClass('_viewMap');">지도보기<i></i></button>
            <button type="button" title="메뉴보기" class="menu" onclick="$('header.menu').toggleClass('on');">메뉴보기<i></i></button>
        </div>
        <nav>
            <button type="button" title="스쿨존 현황" class="total" onclick="location.href = 'Zmap1.do'">스쿨존 현황</button>
            <button type="button" title="사고지점" class="statistics" onclick="location.href = 'Zmap2.do'">어린이 사고지점</button>
            <button type="button" title="어린이 사고 다발지점" class="hdmap" onclick="location.href = 'Zmap3.do'">어린이 사고 다발지점</button>
            <button type="button" title="어린이 인구 밀도" class="north" onclick="location.href = 'Zmap4.do'">어린이 인구 밀도</button>
        </nav>
    </header>

    <main class="map total">
        <div id="map">
            <div id="map" style="width:500px;height:950px;"></div>

            <!-- 지도 넣기 START-->

            <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1d5b6c72b628c3999e5468afbfb6a4eb"></script>
            <script>
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                    mapOption = { 
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };
                
                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
                
                // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
                var mapTypeControl = new kakao.maps.MapTypeControl();
                
                // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
                // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
                map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                
                // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
                var zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                </script>

             <!-- 지도 넣기 END-->

        </div>
        <aside class="left">
            <!-- 사상자 TAB-->
            <div id="tab1" class="tabcontent current">
                <div id="SA_CASUALTIES" >
                    <section class="search" style="height: 190px;">
                        <ul class = "tap">
                        <nav class="tab">
                            <li class="current" data-tab="tab1"><button type="button" class="on">사상자</button></li>
                            <li data-tab="tab2"><button type="button">사망자</button></li>
                            <li data-tab="tab3"><button type="button">중상자</button></li>
                            <li data-tab="tab4"><button type="button">경상자</button></li>
                        </nav>
                        </ul>
                        <ul class="condition">
    
                            <li class="0_00_001">
                                <select name="year_text_area">
                                    <option value="">발생연도</option>
                                    <option value="">2013년</option>
                                    <option value="">2014년</option>
                                    <option value="">2015년</option>
                                    <option value="">2016년</option>
                                    <option value="">2017년</option>
                                    <option value="">2018년</option>
                                    <option value="">2019년</option>
                                    <option value="">2020년</option>
                                    <option value="">2021년</option>
                                </select>
                                <select name="sa_count">
                                    <option value="">발생건수</option>             
                                    <option value="">1건</option>
                                    <option value="">2건</option>
                                    <option value="">3건</option>
                                    <option value="">4건</option>
                                </select>
     
                            </li>
                            <li class="0_00_001">
                                <select name="sido_text_area">
                                    <option value="">시도 전체</option>
                                    <option>서울특별시</option>
                                    <option>부산광역시</option>
                                    <option>대구광역시</option>
                                    <option>인천광역시</option>
                                    <option>광주광역시</option>
                                    <option>대전광역시</option>
                                    <option>울산광역시</option>
                                    <option>경기도</option>
                                    <option>강원도</option>
                                    <option>충청도</option>
                                    <option>울산광역시</option>
                                    <option>전라남도</option>
                                    <option>전라북도</option>
                                    <option>경상남도</option>
                                    <option>경상북도</option>
                                    <option>제주시</option>
                                </select>
                            </li>
                        </ul>
                        <div class="action">
                            <strong><button type="button" class="searchBtn">검색</button></strong>
                        </div>
                    </section>
                </div>
            </div>

            <!-- 사망자 TAB-->
            <div id="tab2" class="tabcontent">
                <div id="SA_DEATHS">
                <section class="search" style="height: 190px;">
                    <ul class = "tap">
                    <nav class="tab">
                        <li class="current" data-tab="tab1"><button type="button" >사상자</button></li>
                        <li data-tab="tab2"><button type="button" class="on" >사망자</button></li>
                        <li data-tab="tab3"><button type="button">중상자</button></li>
                        <li data-tab="tab4"><button type="button" class="long">경상자</button></li>
                    </nav>
                    </ul>
                    <ul class="condition">
                        <li class="0_00_002">
                            <select name="year_text_area">
                                <option value="">발생연도</option>
                                <option value="">2013년</option>
                                <option value="">2014년</option>
                                <option value="">2015년</option>
                                <option value="">2016년</option>
                                <option value="">2017년</option>
                                <option value="">2018년</option>
                                <option value="">2019년</option>
                                <option value="">2020년</option>
                                <option value="">2021년</option>
                            </select>
                            <select name="sa_count">
                                <option value="">발생건수</option>             
                                <option value="">1건</option>
                                <option value="">2건</option>
                                <option value="">3건</option>
                                <option value="">4건</option>
                            </select>
 
                        </li>
                        <li class="0_00_002">
                            <select name="sido_text_area">
                                <option value="">시도 전체</option>
                                <option>서울특별시</option>
                                <option>부산광역시</option>
                                <option>대구광역시</option>
                                <option>인천광역시</option>
                                <option>광주광역시</option>
                                <option>대전광역시</option>
                                <option>울산광역시</option>
                                <option>경기도</option>
                                <option>강원도</option>
                                <option>충청도</option>
                                <option>울산광역시</option>
                                <option>전라남도</option>
                                <option>전라북도</option>
                                <option>경상남도</option>
                                <option>경상북도</option>
                                <option>제주시</option>
                            </select>
                        </li>
                    </ul>
                    <div class="action">
                        <strong><button type="button" class="searchBtn">검색</button></strong>
                    </div>
                </section>
            </div>
            </div>
            <!-- 중상자 TAB-->
            <div id="tab3" class="tabcontent">
                    <div id="SA_SERIOUS_INJURY">
                        <section class="search"  style="height: 190px;">
                            <ul class = "tap">
                            <nav class="tab">
                                <li class="current" data-tab="tab1"><button type="button">사상자</button></li>
                                <li data-tab="tab2"><button type="button" >사망자</button></li>
                                <li data-tab="tab3"><button type="button" class="on">중상자</button></li>
                                <li data-tab="tab4"><button type="button" class="long">경상자</button></li>
                            </nav>
                            </ul>
                            <ul class="condition">
                                <li class="0_00_003">
                                    <select name="year_text_area">
                                        <option value="">발생연도</option>
                                        <option value="">2013년</option>
                                        <option value="">2014년</option>
                                        <option value="">2015년</option>
                                        <option value="">2016년</option>
                                        <option value="">2017년</option>
                                        <option value="">2018년</option>
                                        <option value="">2019년</option>
                                        <option value="">2020년</option>
                                        <option value="">2021년</option>
                                    </select>
                                    <select name="sa_count">
                                        <option value="">발생건수</option>             
                                        <option value="">1건</option>
                                        <option value="">2건</option>
                                        <option value="">3건</option>
                                        <option value="">4건</option>
                                    </select>
         
                                </li>
                                <li class="0_00_003">
                                    <select name="sido_text_area">
                                        <option value="">시도 전체</option>
                                        <option>서울특별시</option>
                                        <option>부산광역시</option>
                                        <option>대구광역시</option>
                                        <option>인천광역시</option>
                                        <option>광주광역시</option>
                                        <option>대전광역시</option>
                                        <option>울산광역시</option>
                                        <option>경기도</option>
                                        <option>강원도</option>
                                        <option>충청도</option>
                                        <option>울산광역시</option>
                                        <option>전라남도</option>
                                        <option>전라북도</option>
                                        <option>경상남도</option>
                                        <option>경상북도</option>
                                        <option>제주시</option>
                                    </select>
                                </li>
                            </ul>
                            <div class="action">
                                <strong><button type="button" class="searchBtn">검색</button></strong>
                            </div>
                        </section>
                    </div>
            </div>
            <!-- 경상자 TAB-->
            <div id="tab4" class="tabcontent">
                <div id="SA_LIGHT_INJURY">
                    <section class="search"  style="height: 190px;">
                        <ul class = "tap">
                        <nav class="tab">
                            <li class="current" data-tab="tab1"><button type="button">사상자</button></li>
                            <li data-tab="tab2"><button type="button">사망자</button></li>
                            <li data-tab="tab3"><button type="button">중상자</button></li>
                            <li data-tab="tab4"><button type="button" class="long on">경상자</button></li>
                        </nav>
                        </ul>
                        <ul class="condition">
                            <li class="0_00_004">
                                <select name="year_text_area">
                                    <option value="">발생연도</option>
                                    <option value="">2013년</option>
                                    <option value="">2014년</option>
                                    <option value="">2015년</option>
                                    <option value="">2016년</option>
                                    <option value="">2017년</option>
                                    <option value="">2018년</option>
                                    <option value="">2019년</option>
                                    <option value="">2020년</option>
                                    <option value="">2021년</option>
                                </select>
                                <select name="sa_count">
                                    <option value="">발생건수</option>             
                                    <option value="">1건</option>
                                    <option value="">2건</option>
                                    <option value="">3건</option>
                                    <option value="">4건</option>
                                </select>
     
                            </li>
                            <li class="0_00_004">
                                <select name="sido_text_area">
                                    <option value="">시도 전체</option>
                                    <option>서울특별시</option>
                                    <option>부산광역시</option>
                                    <option>대구광역시</option>
                                    <option>인천광역시</option>
                                    <option>광주광역시</option>
                                    <option>대전광역시</option>
                                    <option>울산광역시</option>
                                    <option>경기도</option>
                                    <option>강원도</option>
                                    <option>충청도</option>
                                    <option>울산광역시</option>
                                    <option>전라남도</option>
                                    <option>전라북도</option>
                                    <option>경상남도</option>
                                    <option>경상북도</option>
                                    <option>제주시</option>
                                </select>
                            </li>
                        </ul>
                        <div class="action">
                            <strong><button type="button" class="searchBtn">검색</button></strong>
                        </div>
                    </section>
                </div>
            </div>
        </aside>
    </main>
</body>
</html>