/**
 * 파일명 : main.js
 * 설명 : 지도 메인
 *
 * 수정일       수정자        수정내용
 *----------   -------  -----------guList---------------------------------------
 *2015-11-16  배윤성            최초 생성
 */
console.log("js/process/ms/map/main.js");
var popIncdOcrr;
var popRcap;
var mnStatLayerList = {};
var mnStatLayerWmsList = {};
//Geo server 개발서버
// var geoserverWmsUrl ="http://192.168.200.12:8083/geoserver/wms";
var geoserverWmsUrl = "http://210.117.198.92:8080/geoserver/wms";
//Geo server 운영서버
//var geoserverWmsUrl ="http://210.117.198.92:8080/geoserver/wms";
var airCommand = null; //에어 커맨드 컨트롤러
var siList, guList, dongList;

$(document).ready(function () {
        fnGetMainComboData();
        // 지도기능 초기화
        gfn_init_gis();
        // bookmarkObj.init();
        // storyObj.init();
        // roadFind.init();
        // nameObj.init();
        /* 아래 함수 재사용시 해당 js 파일을 다시 include 시켜야한다.
        storyObj.init();
        apphouseObj.init();
        appdiscObj.init();
        approadObj.init();
        apppopObj.init();
        appbulObj.init();
        */
        // statsLegend.init();
        // contextmenu.init();
        // // 상단메뉴 이벤트
        gfn_events_menu();

        //$('.nav05').trigger('click');
        //gfn_create_tree();

        // 위치 이동 초기화
        // locSearch.init();
        // fclt.init();
        /*hist.init(map);

        //범례
        /*layerLegend.init();*/

        // 지도 레이아웃 초기화
        //init();

        // 지도 메뉴 툴팁 생성
//	$('.map_tooltip_left').poshytip({
//		className: 'tip-twitter',
//		showTimeout: 1,
//		alignTo: 'target',
//		alignX: 'left',
//		alignY: 'center',
//		offsetX: 10,
//		allowTipHover: true,
//		fade: true,
//		slide: true
//	});
//	$('.map_tooltip_bottom').poshytip({
//		className: 'tip-twitter',
//		showTimeout: 1,
//		alignTo: 'target',
//		alignX: 'center',
//		alignY: 'bottom',
//		offsetX: 0,
//		offsetX: 10,
//		allowTipHover: true,
//		fade: true,
//		slide: true
//	});
//	map.events.register("updatesize", map, function(e){
//		console.log('1')
//		zoombarReload();
//	});
        //하단 지도 링크 기능.
        $(".btn02").click(function () //이용안내
        {
            window.open(rootUrl + "mi/oprGuide/portalOprGuide.do", '_blank');
            window.opener.location.href = rootUrl + "mi/oprGuide/portalOprGuide.do";
            //opener.focus();
            window.close();
        });
        $(".btn03").click(function ()/*지도오류신고*/ {
            //지도오류 신고 시 추가된 국토변화정보 신고등록 바로 클릭 되도록
            $("#icon02").click();

            //$("a[name='#nlip_left_panel51']").click();

            //기존 국토변화정보 신고 URL
            //window.open('http://www.ngii.go.kr/kor/logIn/logIn.do?rbsIdx=3&toUrl=http%3A%2F%2Fwww.ngii.go.kr%2Fkor%2Fmain%2Fredirect.do%3FrbsIdx=1%26path=http%253A%252F%252Fchange.ngii.go.kr%252Fngiweb%252Fredirect2.jsp', '_blank');

            /*window.open('http://change.ngii.go.kr/ngiweb/ngi/mng/NgiMngView.do?tabNum=1&method=input', '_blank');*/
            /*window.opener.location.href = rootUrl+"mi/oprGuide/mapPurchsGuide.do";
            //opener.focus();
            window.close();*/
        });
        $(".btn04").click(function () {
            window.opener.location.href = rootUrl + "ic/userspce/userspceList.do";
            //opener.focus();
            window.close();
        });

        $(".btn05").click(function () {
            fn_initCreateLayerPopup();
        });

        //

        $("#btn_pan img").trigger("click");
        /*$("#sel_fclt_type").combobox('setValue','ALL');*/
        $("#demmap").hide();
        $("#airmap").hide();

        //에어커멘더
        airCommand = createAircommand();
        /*
        map.div.oncontextmenu = function(event){

            var xy = map.events.getMousePosition(event);

            airCommand.position.x = xy.x;
            airCommand.position.y = xy.y;

            return airCommand.show(event, airCommand);
        };
        */

        // map.getViewport().addEventListener('contextmenu', function (evt) {
        //     evt.preventDefault();
        //     console.log(map.getEventCoordinate(evt));
        //     var xy = map.getEventCoordinate(evt);
        //     airCommand.position.x = xy[0];
        //     airCommand.position.y = xy[1];
        //
        //     return airCommand.show(event, airCommand);
        // });
        map.getViewport().addEventListener('contextmenu', clickAircommand);

        //미니맵 지도보기
        $("#mini_view").click(function () {
            if (map.getControl("mgnifyingMap") != null) {
                mgnifyingMap.destroy();
            }
            map.removeControl(mgnifyingMap);

        });

        //확대 지도보기
        $("#zoom_view").click(function () {

            if (map.getControl("mgnifyingMap") != null) {
                map.removeControl(mgnifyingMap);
                mgnifyingMap.destroy();
            }
            zoom_map();
        });
        //주소검색하기
        $("#btn_confrm").click(function () {
            var code = $("#fcltId").val();
            var param = {code: code};
            $.ajax({
                url: mapDir + 'selectAddress.do',
                type: "POST",
                enctype: "UTF-8",
                data: param,
                dataType: "json",
                success: function (data) {
                    $("#name").html(data.address[0].codeNm);
                },
                fail: function (data) {

                    if (data.readyState != 0 || data.status != 0) {

                        if (!(data.status == 0 && data.statusText == 'abort'))
                            showMsg('관리자에게 다음사항을 문의하세요.btn_confrm (fail): ' + data.status + " - " + data.statusText);
                    }
                },
                error: function (data) {

                    if (data.readyState != 0 || data.status != 0) {

                        if (!(data.status == 0 && data.statusText == 'abort'))
                            showMsg('관리자에게 다음사항을 문의하세요.btn_confrm (error): ' + data.status + " - " + data.statusText);
                    }
                }
            });
        });

        // 메뉴변경 - 브라우저마다 이벤트 순서 타이밍의 차이가 있어서 처리0
        var loadMenu = null;
        loadMenu = setInterval(function () {

            if (tabGb == 'airMap' || tabGb == 'ortMap') {
                $('#air').trigger('click');
            } else if (tabGb == 'statsMap') {
                $('#menu_app').trigger('click');
            } else if (tabGb == 'name') {
                $('#menu_name').trigger('click');
            } else if (tabGb == 'land') {
                $('#menu_land').trigger('click');
            } else if (tabGb == 'nation') {
                $('#menu_emap').trigger('click');
            } else if (tabGb == 'gukto') {
                $('#menu_app').trigger('click');
                setTimeout(function () {
                    $('#app_policy').trigger('click');
                }, 2000);
            } else {
                var cookiedata = document.cookie;
                if (cookiedata.indexOf("tutopop=done") < 0) {
                    $('#tutorial_wrap').css("display", "block");
                    //tutorial();
                } else {
                    //alert("hide");
                    $('#tutorial_wrap').hide();
                    // document.getElementById("tutorial_wrap").display="none";
                }
            }

//		menu_change(load_menu);
            clearInterval(loadMenu);
//		map.setLayerZIndex(map.getLayersByName('TMS Layer_2013')[0], 0);
//		if(load_menu == '9'){ // 항공영상으로 들어올 시
//			$('#air').trigger('click');
//		}
//
//		if(load_menu == '8'){ // 항공영상으로 들어올 시
//			$('#air').trigger('click');
//		}

        }, 500);

        $('.cart_view').click(function () {
            try {
                if (vIsLogin == "true") {
                    openPopUpShbt();
                    return;
                }
            } catch (e) {
            	console.log(e);
            }

			if($("#user-info").css("right") != "0px"){//로그인 열려있으면 안 닫힘.
				$('#user-info-link').trigger('click');
				$('.tab_menu.tab01').trigger('click');
			}
		});

		/*panzoombar 위치 조정을 위한 reload*/
		$(window).resize(function(){
			if(window.innerWidth > 1250){
				setTimeout(function(){zoombarReload();},100);}
		});

		// 로고 위치 변경.
		var tmpHtml = $("#div_map .olControlAttribution.olControlNoSelect").html();
		$("#div_map .olControlAttribution.olControlNoSelect").remove();
		$("div.olControlScaleLineTop").after(tmpHtml);
		$(".olControlScaleLineTop").css('float', "right").css('margin-left', "10px");
	}
);
var getMainComboData = (function () {
	var process = null, call = [];

	return function (func) {
		if (!process) {
			process = $.ajax({
				url: mapDir + 'selectMainComboData.do',
				dataType: "json",
				success: function (res) {
					var func;
					while ((func = call.pop())) {
						func(res);
					}
					process = null;
				}
			});
		}
		call.push(func);
	};
})();
// 메인화면 콤보박스 데이타 호출
function fnGetMainComboData() {
	getMainComboData(fnMakeMainCombo);
}
//메인화면 지도호출
function fnCallMap(data, code) {

	for (var index in data) {
		var compareCode = data[index].code;
		if(compareCode == code) {
			var geom = data[index].geom;
			if (mapMove) {
				mapMove(geom);
			}
			return false;
		}
	}
}

//맵이동 함수
function mapMove (bounds, mapObj) { // 인자값 (left, bottom, right, top)

	if(!mapObj) mapObj = map;

	bounds = bounds.split(',');
	//mapObj.zoomToExtent(new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3]));
	mapObj.getView().fit([Number(bounds[0]), Number(bounds[1]), Number(bounds[2]), Number(bounds[3])], mapObj.getSize());

}

//시군구 정보조회
function fnGuFilter(compare, c) {

	for (var index in guList) {

		var code = guList[index].code;
		var codeNm = guList[index].codeNm;
		if(code.substr(0, 2) == compare) {
			$('#gu').append("<li title='"+guList[index].codeNm+"' value=\""  + guList[index].code + "\"><button type='button'>" + codeNm + "</button></li>");
			//$("#gu").append("<li title='"+guList[index].codeNm+"' value=\"" + guList[index].code + "\">" + codeNm + "</li>");
		}
	}

	$('#gu').find('li').on('click', function() {
		// $('#gu').find('li').css('background-color','');
		// $('#gu').find('li').css('background-color','##f4f6f8');
		$('#dong *').remove();
		// $(this).css('background-color','#06a6e1');
		//map.zoomToScale($(this).val());
		var code =$(this).attr('value');
		var param ={code:code};

		$.ajax({
			url : mapDir+'selectGuData.do',
			type : "POST",
			enctype : "UTF-8",
			data : param,
			dataType : "json",
			success: function(data){
				mapMove(data.guList[0].geom);
			},
			fail : function (data){

				if(data.readyState != 0 || data.status != 0){

					if(!(data.status == 0 && data.statusText == 'abort'))
						showMsg('관리자에게 다음사항을 문의하세요.fnGuFilter (fail): ' + data.status + " - " + data.statusText);
				}
			},
			error : function(data){

				if(data.readyState != 0 || data.status != 0){

					if(!(data.status == 0 && data.statusText == 'abort'))
						showMsg('관리자에게 다음사항을 문의하세요.fnGuFilter (error): ' + data.status + " - " + data.statusText);
				}
			}
		});
		fnDongFilter(code, 1);

		return false ;
	});
}

//공간검색
function searchname (left, bottom, right, top, wkt ){
	$.post(mapDir+"nameselectListXY.do", {
		//	userId : "test",
		left:left,
		bottom:bottom,
		right:right,
		top:top,
		wkt:wkt

	}, function(res) {

		var resDataObj = [];
		var tagStr = "";

		for(var i in res.name) {
			resDataObj.push(res.name[i]);
			name = resDataObj;
			var v  = res.name[i].koreanMarkNm;
			var utmkX = res.name[i].utmkX;
			var utmkY = res.name[i].utmkY;

			res.name[i].id= i;
			var point = new OpenLayers.Geometry.Point(utmkX, utmkY);
			//새주소와 주소 정보를 얻어오기 위해 daum api검색
			point.transform(EPSG5179, EPSG4326);
			nameObj.searchxy_1(point.x, point.y, res.name[i], function(data, nm) {
				var oldaddr  = data.old.name;
				var newaddr = data["new"].roadName;
				if( nm.orgnCn == null){
					nm.orgnCn="";
				}

				$("#place-name-list").html("");
				tagStr+='	<li>                                                                   ';
				tagStr+='	<dl class="name">                                                      ';
				tagStr+='		<dt><span class="ico_abc" id ="ico_abc'+nm.id+'" value="'+nm.koreanMarkNm+'"></span><a href="#" onclick=nameObj.clickEvent("'+nm.id+'");>'+nm.koreanMarkNm+'</a></dt>          ';

				tagStr+='	    <dd><span class="type">지 번</span>'+oldaddr+'</dd>';
				tagStr+='		<dd><span class="type">도로명</span>'+newaddr+'</dd>';
				tagStr += '<input type="hidden" class="utmkX"  id ="utmkX'+nm.id+'" value="' + nm.utmkX + '" />';
				tagStr += '<input type="hidden" class="utmkY" id ="utmkY'+nm.id+'" value="' + nm.utmkY + '" />';
				tagStr += '<input type="hidden" class="orgnCn" id ="orgnCn'+nm.id+'" value="' + nm.orgnCn + '" />';
				tagStr+='	</dl>                                                                  ';
				tagStr+='</li>                                                                     ';
				$("#place-name-list").html(tagStr);
				place_name_layer($('.place-name-list li'), $('.place-name-layer'), $('.btn_close_lg'));
			});
		}
	}, "json")
    .error(function(){
        if(data.readyState != 0 || data.status != 0){

            if(!(data.status == 0 && data.statusText == 'abort'))
                showMsg('main searchname (error): ' + data.status + " - " + data.statusText);
        }
    })
    .fail(function(){
        if(data.readyState != 0 || data.status != 0){

            if(!(data.status == 0 && data.statusText == 'abort'))
                showMsg('main searchname (fail): ' + data.status + " - " + data.statusText);
        }
    });
}

//시군구 콤보 변경시
function fnDongFilter(compare, c) {

	for (var index in dongList) {

		var code = dongList[index].code;
		if(code.substr(0, 5) == compare) {
			//var option = new Option(dongList[index].codeNm, dongList[index].code)
			//$("#selDong").append(option);
			$('#dong').append("<li title='"+dongList[index].codeNm+"' value=\""  + dongList[index].code + "\"><button type='button'>" + dongList[index].codeNm + "</button></li>");
			// $("#dong").append("<li title='"+dongList[index].codeNm+"' value=\"" + dongList[index].code + "\">" + dongList[index].codeNm + "</li>");
		}
	}
	$('#dong').find('li').on('click', function() {
		// $('#dong').find('li').css('background-color','');
		// $('#dong').find('li').css('background-color','##f4f6f8');
		// $(this).css('background-color','#06a6e1');
		//map.zoomToScale($(this).val());
		var code =$(this).attr('value');
		var param ={code:code};

		$.ajax({
			url : mapDir+'selectDongData.do',
			type : "POST",
			enctype : "UTF-8",
			data : param,
			dataType : "json",
			success: function(data){
				mapMove(data.dongList[0].geom);
				$('#fcltId').val(data.dongList[0].code);

			},
			fail : function (data){

				if(data.readyState != 0 || data.status != 0){

					if(!(data.status == 0 && data.statusText == 'abort'))
						showMsg('관리자에게 다음사항을 문의하세요.dong (fail): ' + data.status + " - " + data.statusText);
				}
			},
			error : function(data){

				if(data.readyState != 0 || data.status != 0){

					if(!(data.status == 0 && data.statusText == 'abort'))
						showMsg('관리자에게 다음사항을 문의하세요.dong (error): ' + data.status + " - " + data.statusText);
				}
			}
		});
		return false ;
	});

}
//행정구역 초기데이터 셋팅.
function fnMakeMainCombo(data) {

	siList = data.siList;
	guList = data.guList;
	dongList = data.dongList;
	// movemap();

    for (var index in siList) {
        $('#si').append("<li title='" + siList[index].codeNm + "' value=\"" + siList[index].code + "\"><button type='button'>" + siList[index].codeNm + "</button></li>");
        //  $('#si').append("<li title='"+siList[index].codeNm+"' value=\"" + siList[index].code + "\">" + siList[index].codeNm + "</li>");

	}
	$('#si').find('li').on('click', function() {
		// $('#si').find('li').css('background-color','');
		// $('#si').find('li').css('background-color','##f4f6f8');

        $('#gu *').remove();
        $('#dong *').remove();
        // $(this).css('background-color','#06a6e1');
        //map.zoomToScale($(this).val());
        var code = $(this).attr('value');

        fnGuFilter(code, 1);
        fnCallMap(siList, code);
        return false;
    });
}

//범례 열고 닫고 이벤트.
function analysisResultToggle(e) {
    var analysisResult = $('#analysis_result'),
        btn = analysisResult.find('.btn_toggle');

    if (e == 'open') {
        btn.addClass('open');
        analysisResult.fadeIn(300).animate({bottom: 0 + 'px'}, 300);
    } else {
        btn.removeClass('open');
        analysisResult.animate({bottom: analysisResult.outerHeight() * -1 + 'px'}, 300, function () {
            if (e == 'exit') {
                $(this).hide();
            }
        });
    }
}


//색깔
function colorRule(color10String) {
    var color = '#';
    for (var i = 0; i < color10String.split(',').length; i++) {
        var temp = parseInt(color10String.split(',')[i]).toString(16);
        if (temp.length == 1) {
            temp = '0' + temp;
        }
        color += temp;
    }
    return color;
}


function gfnResizeLayout() {
    $("#div_layout").height(($(window).height() - $("#Header_Wrap").height()));
//	if(map) map.updateSize();			// 지도 화면 크기 변경
}

//베이스 레이어 변경시 이벤트.
function gfn_events_menu() {
//베이스레이어 변경.
    $("#color").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("02", "색각");
        colorLayer();
    });
    $("#white").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("05", "백지도");
        whiteLayer();
    });
    $("#china").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("06", "중문");
        chinaLayer();
    });
    $("#japan").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("07", "일문");
        japanLayer();
    });
    $("#edu").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("08", "교육용백지도");
        eduLayer();
    });
    $("#row").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("03", "큰글씨");
        rowLayer();
    });
    $("#eng").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("04", "영문");
        engLayer();
    });
    $("#gulayer").click(function () {
        northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        //insertMapStats("04","영문");
        GuLayer();
    });
    $("#base").click(function () {
        // northObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("01", "일반");
        layerSetVisibility('TMS Layer');
    });

    // 역사지도 - 2020고도화 - 대동여지도
    $("#daedong").click(function () {
        daedongObj.param.baseLayer = false;
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        insertMapStats("11", "대동여지도");
        layerSetVisibility('daedong_map');
    });

    //일문   insertMapStats("07","일문");

    //교육용백지도 추가해야됨 insertMapStats("08","교육용백지도");

    //수치지도
    $(":radio[name='mchk']").change(function () {
        var mapType = $(this).val();
        if (mapType == "mchk01") {
            baseLayer();
        }
    });
    //영상지도
    $("#air").click(function () {
        // $("input[name=mchk06]:checkbox").prop("checked", false);
        // $(":radio[name='mchk']").removeAttr("checked");
        // TmsLayer();
        //구지도 접경지역 clear
		OLDMAP_API.clearIdxLayer();
        layerSetVisibility('TMS Layer_2013');
    });
    // DEM
    $("#dem").click(function () {
        $("input[name=mchk06]:checkbox").prop("checked", false);
        $(":radio[name='mchk']").removeAttr("checked");
        DemLayer();
        //updateContourlineLayerVisibility();
    });
    /*
        $(":radio[name='mchk']").change(function() {
            var mapType = $(this).val();
            if(mapType == "mchk02") {
                TmsLayer();
            }
        });*/
    //수치지도+영상지도
    $(":radio[name='mchk']").change(function () {
        var mapType = $(this).val();
        if (mapType == "mchk03") {
            Tms_bdLayer();
        }
    });
    //dem
    /*	$(":radio[name='mchk']").change(function() {
            var mapType = $(this).val();
            if(mapType == "mchk04") {
                DemLayer();
                 var  layer_info = 	$("#label_mchk04").text();
                 $("#bttom_layer").text("");
                    $("#bttom_layer").text(layer_info);

            }
        });*/

    //영상+지번
    $(":radio[name='mchk']").change(function () {
        var mapType = $(this).val();
        if (mapType == "mchk05") {
            jibunLayer();
            //alterHighlight();//우측상단메뉴 선택 표시 위한 함수

        }
    });

    //영상+지번 체크박스
    $("input[name=mchk06]:checkbox").change(function () {
        if ($("input[name=mchk06]:checkbox:checked").length != 0) {
            jibunLayer();
            alterHighlight();
        } else {
            TmsLayer();
            alterHighlight();
        }
    });

}

//등고선 on /off
function updateContourlineLayerVisibility() {
    var check = $('input:checkbox[id="contourline_check"]').is(":checked");
    if (check) {
        if ($("#dem").attr("class") == "mapSwitcher dem_on") {
            showMsg("DEM지도에서는 등고선을 확인하실 수 없습니다. <br />");
            map.getLayersByName("contourLayer")[0].setVisibility(false);
            return false;
        }

        if (map.getZoom() < 11) {
            showMsg("등고선 영역으로 이동합니다. <br />");
            map.zoomTo(11);
        }
        map.getLayersByName("contourLayer")[0].setVisibility(true);

        /*		if(14 <= map.baseLayer.numZoomLevels){
                    if(map.getZoom() < map.baseLayer.numZoomLevels/2){
                        showMsg("등고선 영역으로 이동합니다. <br />");
                        map.zoomTo(map.baseLayer.numZoomLevels/2);
                        //$('input:checkbox[id="contourline_check"]').removeAttr("checked");
                        //map.getLayersByName("contourLayer")[0].setVisibility(true);
                    }
                }else{

                    if(map.getZoom() < map.baseLayer.numZoomLevels-1){
                        showMsg("등고선 영역으로 이동합니다. <br />");
                        map.zoomTo(map.baseLayer.numZoomLevels-1);
                    //	$('input:checkbox[id="contourline_check"]').removeAttr("checked");
                        //map.getLayersByName("contourLayer")[0].setVisibility(true);
                    }
                }*/
    } else {
        map.getLayersByName("contourLayer")[0].setVisibility(false);
    }
}

//산 on/off
function updateMountainLayerVisibility() {

    var check = $('input:checkbox[id="mountain_check"]').is(":checked");
    if (check) {
        if (14 <= map.baseLayer.numZoomLevels) {

            if (map.getZoom() < map.baseLayer.numZoomLevels / 2) {

                showMsg("산 영역으로 이동합니다. <br />");
                //map.zoomTo(map.baseLayer.numZoomLevels/2);
                map.zoomTo("8");
                map.getLayersByName("mountainLayer")[0].setVisibility(true);
            }
        } else {

            if (map.getZoom() < map.baseLayer.numZoomLevels - 1) {
                showMsg("산 영역으로 이동합니다. <br />");
                //map.zoomTo(map.baseLayer.numZoomLevels-1);
                map.zoomTo("8");
                map.getLayersByName("mountainLayer")[0].setVisibility(true);
            }
        }
        map.getLayersByName("mountainLayer")[0].setVisibility(true);
    } else {
        map.getLayersByName("mountainLayer")[0].setVisibility(false);
    }
}

//통계지도 레이어 변경시 이벤트.
function mnStatLayerListSwitcher(lyrId, proNm, type, clNm, sggscode, sldBody, codeChk, mapObj, itemMap, mapNumber, cyCle, arrColor, type, legendvalue) {
//	globalSearchMarker.clearMarkers(); // 마커 삭제

    keepClNm = clNm;

    // 초기화
    /*
    $('#selSi').val('');
    $('#selGu').html('<option value="">시군구명</option>');
    $("#selGu").attr('disabled', true);
    */

    /* 기존소스 ---
    for (var i in mnStatLayerList) {
        mnStatLayerList[i].destroy();
    }
    ----*/

    /*=========== 18.03.07 수정 시작 ==============*/
    if (!mapObj) mapObj = map;

	var layers = mapObj.getLayers().getArray();

	for (var i = layers.length - 1; i > -1; i--) {
		if ( layers[i].get('name') && layers[i].get('name').indexOf('vl') == 0) {
			mapObj.removeLayer(layers[i]);
		}
	}

	/*=========== 18.03.07 수정  끝 ==============*/
	//mnStatLayerList = {};
	//console.log(mnStatLayerList);
	if(GlbltblCd == "005"){

        var year = $('input[name=' + mapNumber + '_year]').val();
        if (year == "") {
            year = '%'
        }

        callPlcyStatsLayer(lyrId, sggscode, sldBody, itemMap.lrgeCd, itemMap.middlCd, itemMap.lyrNm, year, mapObj, cyCle, arrColor, type, legendvalue);
    } else {
        mnStatLayerListCreate(lyrId, sggscode, sldBody, codeChk, mapObj);
    }

    //console.log("===========");
    //console.log(mnStatLayerList);
    /*
    for (var i in mnStatLayerList) {
        mnStatLayerList[i].setVisibility(false);
    }
    if (!mnStatLayerList[lyrId+"_"+sggscode]) {
        mnStatLayerListCreate(lyrId, sggscode);
    }
    mnStatLayerList[lyrId+"_"+sggscode].setVisibility(true);
    */
    var searchAdrCd = "";

    //callChartData(lyrId, type, proNm, searchAdrCd, clNm, true);
}

function callPlcyStatsLayer(lyrId, sggscode, sldBody, lrgecd, middlcd, itemEng, year, mapObj, cyCle, arrColor, type, legendValue) {

    if (!mapObj) mapObj = map;

    var datatype = "";
    var param = "";
    var wmsOptions = "";

    datatype = "plcy";
    if (sggscode == "") {
        sggscode = '%'
    }
    var lyrCode = lyrId.substring(0, 3);

    //plcy IMG transparency logic add 20.01.17 siw
    var transpa = "";
    if ($('.transparencyOutput').hasClass('on')) {
        transpa = true;
    } else {
        transpa = false;
    }

    param = 'L:' + lrgecd + ';' + 's:' + lyrCode + ';' + 'y:' + year + ';' + 'sig:' + sggscode + ';' + 'c:' + itemEng;
    var ImgUrl = nlspAddr + 'mn/plcyImage.do?tableCode=' + lyrId + '&cyCle=' + cyCle + '&type=' + type + '&arrColor=' + arrColor + '&legendValue=' + legendValue + '&year=' + year + '&middlcd=' + middlcd + '&sigCd=' + sggscode + '&clear=' + transpa;

    if ($('#plcyView1').hasClass('on')) {

        $('#plcyView1').removeClass();

		// map.getLayersByName("plcy")[0].destroy();
		// for(var i=map.popups.length-1; i >= 0; i--) {
		// 	map.removePopup(map.popups[i]);
		// }
		for (var i = map.getLayers().getArray().length - 1; i > -1; i--) {
			if (map.getLayers().getArray()[i].get('name') == 'plcy') {
				map.removeLayer(map.getLayers().getArray()[i]);
			}
		}
		contextmenu.propertyViewReset();
	}

    mnStatLayerWmsList = {};

    mnStatLayerList = {};

	if(lyrCode=="002"){
		wmsOptions = {
			SERVICE: 'WMS',
			VERSION: '1.1.0',
			REQUEST: 'GetMap',
			LAYERS: 'nlsp:plcy_sgg',
			FORMAT: 'image/png',
			TRANSPARENT: 'true',
			EXCEPTIONS: 'BLANK',
			FORMAT_OPTIONS : 'antialias:text',
			INFO_FORMAT: 'application/json',
			VIEWPARAMS: param,
			CRS: "EPSG:5179",
			SLD_BODY : statsLegend.sldwmsBody
		};

		mnStatLayerWmsList[lyrId+"_"+sggscode] = new ol.layer.Image({
			source: new ol.source.ImageWMS({
				// url: geoserverWmsUrl
                url: '/ms/map/callLayer.do' + '?url=' + geoserverWmsUrl
				, params: wmsOptions
				, crossOrigin: 'anonymous'
                , imageLoadFunction: function (image, src) {
                    imagePostFunction(image, src);
                }
			}),
			visible: true,
			projection: "EPSG:5179",
			isBaseLayer: false,
			opacity : 0.9,
			zIndex : 110,
            params: wmsOptions,
			name: 'vl'
		});

        mapObj.addLayer(mnStatLayerWmsList[lyrId + "_" + sggscode]);
    } else {

		mnStatLayerList[lyrId+"_"+sggscode] = new ol.layer.Image({
			source: new ol.source.ImageWMS({
				// url: geoserverWmsUrl
                url: '/ms/map/callLayer.do' + '?url=' + geoserverWmsUrl
				, params: wmsOptions
				, crossOrigin: 'anonymous'
                , imageLoadFunction: function (image, src) {
                    imagePostFunction(image, src);
                }
			}),
			visible: true,
			projection: "EPSG:5179",
			isBaseLayer: false,
			opacity : 0.9,
			zIndex : 110,
            params: wmsOptions,
            name: 'vl_img'
		});

		// mnStatLayerList[lyrId+"_"+sggscode].div.style.imageRendering='pixelated';
		// mnStatLayerList[lyrId+"_"+sggscode].div.id='plcy';

		wmsOptions = {
			SERVICE: 'WMS',
			VERSION: '1.1.0',
			REQUEST: 'GetMap',
			LAYERS: 'nlsp:plcy_grid',
			FORMAT: 'image/png',
			TRANSPARENT: 'true',
			EXCEPTIONS: 'BLANK',
			FORMAT_OPTIONS : 'antialias:text',
			INFO_FORMAT: 'application/json',
			VIEWPARAMS: param,
			//SIGCD :sigCd,
			SRS: "EPSG:5179",
			SLD_BODY : //encodeURI(
			statsLegend.sldwmsBody,
			SLD_BODY_GRID : sldBody,
		};

		mnStatLayerWmsList[lyrId+"_"+sggscode] = new ol.layer.Image({
			source: new ol.source.ImageWMS({
				// url: geoserverWmsUrl
                url: '/ms/map/callLayer.do' + '?url=' + geoserverWmsUrl
				, params: wmsOptions
				, crossOrigin: 'anonymous'
                , imageLoadFunction: function (image, src) {
                    imagePostFunction(image, src);
                }
			}),
			visible: true,
			projection: "EPSG:5179",
			isBaseLayer: false,
			opacity : 0.9,
			zIndex : 110,
            params: wmsOptions,
			name: 'vl'
		});
		//IE (image-rendering = pixcelate 추가)
		mapObj.addLayer(mnStatLayerList[lyrId+"_"+sggscode]);
		mapObj.addLayer(mnStatLayerWmsList[lyrId+"_"+sggscode]);
		$("#plcy").find('img').css("-ms-interpolation-mode","nearest-neighbor");

		// map.events.register('zoomend', map, function() {
		// 	$("#plcy").find('img').css("-ms-interpolation-mode","nearest-neighbor");
		// });
	}
}

//통계지도 범례 정보 가져오기.
function gfn_draw_legend(lyrId, legend) {

    var tr = $("#" + legend);
    tr.html("");
    //$("#layerLegend").css("background","url('" + gfn_get_legendUrl(lyrId) + "') no-repeat center center"); // 심볼이미지 URL
    tr.append("<img style='width:auto;' src=" + gfn_get_legendUrl(lyrId) + ">");
    tr.mCustomScrollbar();
}

//var bounds = new OpenLayers.Bounds(
//        746370.878049764, 1458754.04368472,
//        1387956.78178152, 2068443.95411295
//    );
//활용지도 생성
function mnStatLayerListCreate(lyrId, sggscode, sldBody, codeChk, mapObj) {
    // debugger;

    if (!mapObj) mapObj = map;

    var lyrCode = Number(lyrId.substr(0, 3)), cqlFilter = '';
    if (lyrCode == 1) { // 시도 (001)
        cqlFilter = 'ctprvn_cd = \'' + sggscode.substring(0, 2) + '\'';
    } else if (lyrCode == 2) { // 시군구 (002)
        if (sggscode.length === 5 && sggscode.lastIndexOf('0') !== -1) { // 구제시 처리
            sggscode = sggscode.substring(0, 4) + '_';
        }
        cqlFilter = 'sig_cd LIKE \'' + sggscode + '\'';
    } else if ((lyrCode >= 3 && lyrCode <= 17) || (lyrCode >= 24 && lyrCode <= 28)) { // 시군구,읍면동,리,권역 (002 ~ 016) 용도지역 (024 ~ 028)
        if (sggscode.length === 5 && sggscode.lastIndexOf('0') !== -1) { // 구제시 처리
            sggscode = sggscode.substring(0, 4) + '_';
        }
        cqlFilter = 'match_sig_cd LIKE \'' + sggscode + '\'';
    } else if (lyrCode >= 18 && lyrCode <= 21) { // 격자 (018 ~ 021)
        if (sggscode.length === 5 && sggscode.lastIndexOf('0') !== -1) { // 구제시 처리
            sggscode = sggscode.substring(0, 4) + '_';
            cqlFilter = 'INTERSECTS(geom,querySingle(\'tl_scco_sig\',\'geom\',\'sig_cd LIKE' + sggscode + '\'))';
        } else {
            cqlFilter = 'INTERSECTS(geom,querySingle(\'tl_scco_sig\',\'geom\',\'sig_cd=' + sggscode + '\'))';
        }
    } else if (lyrCode == 30 || lyrCode == 31) { // 격자 (30,31)
        if (sggscode.length === 5 && sggscode.lastIndexOf('0') !== -1) { // 구제시 처리
            sggscode = sggscode.substring(0, 4) + '_';
            cqlFilter = 'INTERSECTS(geom,querySingle(\'tl_scco_sig\',\'geom\',\'sig_cd LIKE' + sggscode + '\'))';
        } else {
            cqlFilter = 'INTERSECTS(geom,querySingle(\'tl_scco_sig\',\'geom\',\'sig_cd=' + sggscode + '\'))';
        }
    }
    mnStatLayerList[lyrId + "_" + sggscode] = {};

    mnStatLayerWmsList[lyrId + "_" + sggscode] = {};
    // 18.03.08 수정 JOSW
    var dataType;
    // if(lyrCode == 18 || lyrCode == 19 || lyrCode == 20 || lyrCode == 21 || lyrCode == 30 || lyrCode == 31){
    dataType = 'vl_blk';
    // }else{
    // 	dataType = 'vl';
    // }

	var mapId = mapObj.values_.target.id;
	var year;
	switch(mapId){
		case 'div_map_1': // 2 번째 지도
			year = $('input[name=01_year]').val();
			break;
		case 'div_map_2': // 3 번째 지도
			year = $('input[name=02_year]').val();
			break;
		case 'div_map_3': // 4 번째 지도
			year = $('input[name=03_year]').val();
			break;
		default: // 1 번째 지도
			year = $('input[name=00_year]').val();
			break;
	}

	var wmsOptions = null;

	if(codeChk == 0) {
		wmsOptions = {
			SERVICE: 'WMS',
			VERSION: '1.1.0',
			REQUEST: 'GetMap',
			LAYERS		: dataType,
			FORMAT: 'image/png',
			TRANSPARENT: 'true',
			EXCEPTIONS: 'BLANK',
			FORMAT_OPTIONS: 'antialias:text',
			INFO_FORMAT: 'application/json',
			VIEWPARAMS	: 'lyr:'+lyrId+';'+'sig:'+((sggscode) ? sggscode: '%') + ';mnt:'+year,
			SIGCD: sggscode,
			STYLES: lyrId,
			SLD_BODY : sldBody,
			// CQL_FILTER: cqlFilter
		}
	} else {
		wmsOptions = {
			SERVICE		: 'WMS',
			VERSION		: '1.1.0',
			REQUEST		: 'GetMap',
			LAYERS		: dataType,
			FORMAT		: 'image/png',
			TRANSPARENT	: 'true',
			EXCEPTIONS	: 'BLANK',
			INFO_FORMAT	: 'application/json',
			VIEWPARAMS	: 'lyr:'+lyrId+';'+'sig:'+((sggscode) ? sggscode: '%') + ';mnt:'+year,
			SIGCD 		: sggscode,
			SLD_BODY 	: sldBody,
			// CQL_FILTER: cqlFilter
		}
	}
	// mnStatLayerList[lyrId+"_"+sggscode] = new OpenLayers.Layer.WMS(
	// 	'vl',
	// 	geoserverWmsUrl,
	// 	wmsOptions,
	// 	{
	// 		visibility	: true,
	// 		singleTile	: true,
	// 		buffer		: 0,
	// 		ratio		: 1,
	// 		isBaseLayer : false,
	// 		yx			: {'EPSG:5179':true},
	// 		tileOptions : {maxGetUrlLength: 2048}
	// 	}
	// );

    var mnStatLayerSource = new ol.source.ImageWMS({
        url: '/ms/map/callLayer.do' + '?url=' + geoserverWmsUrl
        , params: wmsOptions
        , crossOrigin: 'anonymous'
        , imageLoadFunction: function (image, src) {
            imagePostFunction(image, src);
        }
    });

	mnStatLayerList[lyrId+"_"+sggscode] = new ol.layer.Image({
		source: mnStatLayerSource,
		visible: true,
		projection: "EPSG:5179",
		isBaseLayer: false,
		opacity : 0.9,
		zIndex : 110,
        params: wmsOptions,
		name: 'vl'
	});

    // 18.03.08 수정 끝

    /*
    mnStatLayerList[lyrId+"_"+sggscode] = new OpenLayers.Layer.WMS(
        'nlsp:'+lyrId+"_"+sggscode,
        geoserverWmsUrl,
        {
          service: 'WMS',
          version: '1.1.0',
          request: 'GetMap',
          layers: 'nlsp:'+lyrId,
          format: 'image/png',
          transparent: 'true',
          exceptions: 'BLANK',
          info_format: 'application/json',
          crs: "EPSG:5179",
          CQL_FILTER: cqlFilter,
          SLD_BODY: sldBody
       },
       {
           maxExtent: bounds,

          visibility: true,
          singleTile: (lyrId.indexOf('_hm') != -1) ? true : false,
          buffer: 0,
          isBaseLayer: false,
         yx: {'EPSG:5179':true},
       units: 'm'

       }
    );
    */
    mapObj.addLayer(mnStatLayerList[lyrId + "_" + sggscode]);

}

//에어 커멘더 실행.
function createAircommand(e) {

    var menu1 = new AirCommand.MenuClass(
        {
            tooltip: "이전",
            callback: function () {
                if(historyIdx > 0){
                    histUsable = false; //이전버튼 눌러서 맵움직일때 또 히스토리 쌓이는거 방지
                    historyIdx -= 1;
                    map.getView().setCenter(lonLatHistory[historyIdx]);
                }
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_left.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_left.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });
    var menu2 = new AirCommand.MenuClass(
        {
            tooltip: "확대",
            callback: function (x, y) {
                var cmX = x;
                var cmY = y;

                zoombarReload(1);
                return false;
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_icon_zoomin.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_icon_zoomin.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });
    var menu3 = new AirCommand.MenuClass(
        {
            tooltip: "축소",
            callback: function (x, y) {
                var cmX = x;
                var cmY = y;

                zoombarReload(-1);
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_icon_zoomout.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_icon_zoomout.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });
    var menu4 = new AirCommand.MenuClass(
        {
            tooltip: "북마크 등록",
            callback: function () {
                //openLayerPopUp(mapDir +'Bookmark.do', '스크랩', '450', '75');
                $.ajax({
                    type: "POST",
                    url: mapDir + 'Bookmark.do',
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: 'html',
                    success: function (data) {
                        html = data;
                        /*$('.popup.mask.mapRecord').find('main.popup').html(html);
                        $('.popup.mask.mapRecord').show();
                        $('body').removeClass('on');
                        $('body').addClass('popupOn');
        */
                        setModalPopup
                        ({
                            "title": "북마크",
                            "body": html,
                            "class": "viewRecord",
                            "width": 450,
                            "height": 150,
                            "buttons":
                                {
                                    "취소": {
                                        "func": function () {
                                            fnCloseModal();
                                        },
                                        "title": "취소",
                                        "class": ""
                                    },
                                    "다운로드":
                                        {

                                            "func": function () {
                                                var text = $("#txtBookmark1").val();
                                                if (text == "") {
                                                    alert("북마크명을 입력하여 주십시오.");

                                                    return;
                                                }

                                                if ($("#hidBmkId1").val() == "") {
                                                    var lonlat = map.getView().getCenter();
                                                    $.ajax({
                                                        url: mapDir + "insertBookmark.do",
                                                        dataType: 'json',
                                                        data: {
                                                            bmkName: text,
                                                            bmkLon: lonlat[0],
                                                            bmkLat: lonlat[1],
                                                            bmkScale: map.getView().getZoom()
                                                        },
                                                        type: "post",
                                                        success: function (res) {
                                                            if (res.success == true) {
                                                                alert("추가에 성공하였습니다.");

                                                                fnCloseModal();
                                                            } else if (res.success == "-1") {
                                                                alert("로그인에 실패했습니다..");
                                                            } else
                                                                alert("추가에 실패하였습니다.");
                                                        }

                                                    });

                                                }

                                            }
                                        }
                                },
                        })
                    },
                    error: function (e) {
                        alertMsg('서버오류가 발생했습니다.');
                    }
                });


                return false;
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_icon_06.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_icon_06.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });
    var menu5 = new AirCommand.MenuClass(
        {
            tooltip: "다음",
            callback: function () {
                if(historyIdx < (lonLatHistory.length-1)){
                    histUsable = false; //다음버튼 눌러서 맵움직일때 또 히스토리 쌓이는거 방지
                    historyIdx += 1;
                    map.getView().setCenter(lonLatHistory[historyIdx]);
                }
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_right.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_right.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });
    var menu6 = new AirCommand.MenuClass(
        {
            tooltip: "공간검색",
            callback: function () {
                /*2017.10.16 수정*/
//				  if($('#menu_simple').hasClass('on')){

                // $('.nlip_left_nav').find('.nav').find('a').each(function(index,value){
                //
                // 		if(index == 0 || index == 1 || index == 2){
                // 			mark_step1_sp();
                //
                // 		}else if(index == 3){
                // 			//locSearch.name();
                // 			return false;
                // 		}
                //
                // });

                if ($('body > main').hasClass('total') === true) {
                    simpleToolArea(1);
                } else if ($('body > main').hasClass('controlpoint') === true) {
                    simpleToolArea(3);


                } else {
                    alert("공간검색은 통합검색에서만 가능합니다.");
                }

            },
            over: {
                imgUrl: mapImgDir + 'icon/air_icon_04.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_icon_04.png',

                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });

    // var menu7 = new AirCommand.MenuClass(
    //     {
    //         tooltip: "이미지저장",
    //         callback: function () {
    //             /*
    //             map.once('rendercomplete', function(event) {
    //                 var canvas = $('canvas')[0];
    //                 console.log('canvas : ' + JSON.stringify(canvas));
    //                 if (navigator.msSaveBlob) {
    //                     navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
    //                 } else {
    //                     canvas.toBlob(function(blob) {
    //                         saveAs(blob, 'map.png');
    //                     });
    //                 }
    //             });
    //             map.renderSync();
    //             */

    //             var canvasObj = document.querySelector(".ol-layer canvas");
    //             var width = '550';
    //             var height = '485';
    //             var image = new Image();
    //             image.id = 'copyMapImage';
    //             image.crossOrigin = 'Anonymous';
    //             image.src = canvasObj.toDataURL();

    //             image.width = Number(width);
    //             image.height = Number(height);

    //             document.getElementById('div_map').appendChild(image);

    //             if (navigator.msSaveBlob) {
    //                 var cnvs = document.querySelector(".ol-layer canvas");
    //                 var dataURL = cnvs.toDataURL('image/png');
    //                 dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    //                 dataURL = dataURL.replace(/^data:application\/octet-stream/,
    //                     'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=bies.png');

    //                 dataURItoBlob = function(dataURI) {
    //                     var binary = atob(dataURI.split(',')[1]);
    //                     var array = [];
    //                     for(var i = 0; i < binary.length; i++) {
    //                         array.push(binary.charCodeAt(i));
    //                     }
    //                     return new Blob([new Uint8Array(array)], {type: 'image/png'});
    //                 }

    //                 var blob = dataURItoBlob(dataURL);
    //                 window.navigator.msSaveOrOpenBlob(blob, "bies.png");
    //             } else {
    //                 var cnvs = document.querySelector(".ol-layer canvas");
    //                 var dataURL = cnvs.toDataURL('image/png');
    //                 dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    //                 dataURL = dataURL
    //                     .replace(
    //                         /^data:application\/octet-stream/,
    //                         'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=bies.png');

    //                 var aTag = document.createElement('a');
    //                 aTag.download = 'bies.png';
    //                 aTag.href = dataURL;
    //                 aTag.click();
    //             }
    //         },
    //         over: {
    //             imgUrl: mapImgDir + 'icon/air_icon_05.png',
    //             color: "#FE9A2E",
    //             borderColor: "#FE9A2E",
    //         },
    //         out: {
    //             imgUrl: mapImgDir + 'icon/air_icon_05.png',
    //             color: "#2E2E2E",
    //             borderColor: "#2E2E2E",
    //         }
    //     });
    var menu8 = new AirCommand.MenuClass(
        {
            tooltip: "인쇄",
            callback: function () {
                gfn_pop_win(mapDir + "print.do", "print_pop", {
                    width: '710px',
                    height: '750px',
                    left: '100px',
                    top: '100px;'
                });
            },
            over: {
                imgUrl: mapImgDir + 'icon/air_icon_01.png',
                color: "#FE9A2E",
                borderColor: "#FE9A2E",
            },
            out: {
                imgUrl: mapImgDir + 'icon/air_icon_01.png',
                color: "#2E2E2E",
                borderColor: "#2E2E2E",
            }
        });

    var ar = $().AirCommand({

        main: {
            imgUrl: mapImgDir + 'icon/air_logo.jpg',
            color: "#FFFFFF",
            borderColor: "#FE9A2E",
            tooltip: null,
            behavior: mapJsDir + 'lib/PIE.htc' // ie9이하를 지원하기 위해 필요
        },
        menu: [menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8]
    });

    return ar;
};


function clickAircommand(evt) {
    evt.preventDefault();
    var xy = map.getEventCoordinate(evt);
    airCommand.position.x = xy[0];
    airCommand.position.y = xy[1];

    return airCommand.show(event, airCommand);
};

function alterHighlight() {
    var arr = $('.link_topnav').find('.mapSwitcher');
    for (var i = 0; i < arr.length; i++) {
        var stats = $(arr[i]).attr('id');

        $(arr[i]).removeClass(stats + '_off');
        $(arr[i]).removeClass(stats + '_on');
        $(arr[i]).addClass(stats + '_off');
    }

    $('#air').removeClass("air_off");
    $('#air').addClass("air_on");

    /*var arr = $('.link_topnav').find('.mapSwitcher');
    for(var i = 0; i < arr.length; i ++){
    var stats = $(arr[i]).attr('id');

    //var type = stats.split('_')[0];
    //var flag = stats.split('_')[1];


    $(arr[i]).removeClass(stats+'_off');
    $(arr[i]).removeClass(stats+'_on');
    $(arr[i]).addClass(stats+'_off');
    //$(arr[i]).addClass(type+'_off');

    }

    var $this = $("#air").attr('id');

    $("#air").removeClass($this+'_off');
    $("#air").addClass($this+'_on');*/
};

//쿠키 클릭한 순간의 시간부터 24시간
function setCookie(id ,value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = id + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

/** 쿠키값 가져오기 */
function getCookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length;
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
    return "";
}