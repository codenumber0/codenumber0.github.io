/**
 * 검색조건을 초기화한다.
 * @param name
 */
initForm = function(name) {
    var tagInfo = "";
    $.each($('form[name=listForm]').find('input, select, radio'), function (key, obj) {

        tagInfo = nvl(obj.tagName, "");
        switch (tagInfo.toLowerCase()) {
            case "select" :
                $(tagInfo+"[name="+obj.name+"] option:eq(0)").prop('selected', true);
                break;
            case "input" :

                switch (nvl(obj.type, "").toLowerCase()) {
                    case "radio" :
                        $(tagInfo+"[name="+obj.name+"] option:eq(0)").prop('checked', true);
                        break;
                    case "text" :
                        // 2019-10-07 ~ 2019-10-07
                        if(obj.className.indexOf("_daterangepicker") == 0) {
                            $(obj).val(getDateYYMMDD('-')+' ~ '+getDateYYMMDD('-'));

                            // 2019-10-07
                        } else if(obj.className.indexOf("_datepicker")  == 0) {
                            $(obj).val(getDateYYMMDD('-'));
                        } else {
                            $(obj).val("");
                        }
                        break;
                    default :
                        break;
                }
                break;
        }
    });
}


/**
 * 링크 연결
 */
var mnLinkUrl;
var openNewWindow = null;
var mnMsg ;
var mnId ;

newmsg = function(url, msg) {
    mnLinkUrl = url;
    mnMsg = msg;
    //showConfirm(fnComplateFnc, msg +" 새 창을 띄우시겠습니까?");
    fnComplateFnc(true,url);
}

fnComplateFnc = function(booleanB, url){
    if(booleanB) {
        if(mnMsg == "O") {
            mnId = "outLinkPop";
        }else {
            mnId = "linkPop";
        }
        openNewWindow = window.open("about:blank",mnId);
        openNewWindow.location.href = mnLinkUrl;
    }

}

/**
 * 유효성 체크
 * 사용하고자 하는 타입 추가하셔서 사용하세요!
 * @param type
 * @param data
 * @returns {boolean}
 */
validationCheck = function(type, data) {
    var temp = "";
    var isPass = true;
    switch (type) {
        case "date" :
            temp = data.replace(/[-.]/gi, '');
            var dt = new Date(temp);
            if(data.getDate() == NaN) {
                isPass = false;
            }
            break;
    }
    return isPass;
}

/**
 * 한 인풋박스 안에 날짜가 두개 있을때 사용
 * @param tempId : 날짜 값이 들어 있는 태그ID
 * @param startId : 시작일자 태그ID
 * @param endId   : 종료일자 태그ID
 */
twinInputDate = function(tempId, startId, endId) {
    var dateTemp = "";

    if($('#'+tempId).val() == undefined) {
        return;
    }

    dateTemp = $('#'+tempId).val().replace(/ /gi, '').split('~');

    if (dateTemp.length > 1) {
        $('#' + startId).val(dateTemp[0]);
        $('#' + endId).val(dateTemp[1]);
    } else {
        $('#' + startId).val('');
        $('#' + endId).val('');
    }
}

var modalIntercept = false;

/**
 * 모달 팝업 정보 초기화
 */
initModal = function() {
    $('#modalPopup').attr('class', 'popup mask');
    $('#modalPopup > section').removeAttr('style');
    /*$('main.popup:last').removeAttr('style');*/
    $('#modalPopup').find('div.main.popup').removeAttr('style');
    $('header.popup:last > h2').html('');
    /*$('main.popup:last').html('');*/
    $('#modalPopup').find('div.main.popup').html('');
    $('footer.popup.function:last').html('');

    if ($('body').attr('class') != undefined && $('body').attr('class').indexOf('loadingOn') > -1) {
        $('body').removeClass('loadingOn');
    }
}

/**
 * 모달팝업 열고 닫기
 */
modalPopup = function(isClose) {
    if( isClose == true){
        //수치지도 관련 데이터가 있으면
        if(typeof(MEASURE_API) != "undefined" && MEASURE_API.downArray.length > 0){
            //수치지도 체크 해제&리스트제거
            if($('input[name="cb_suchi"]').is(":checked")){
                $('input[name="cb_suchi"]').prop('checked', false);
            }
            MEASURE_API.downArray = [];
            delete MEASURE_API.popupInfo;
        }
    }

    var bodyClassName = nvl($('body').attr('class'), '');

    if (isClose == undefined) {
        isClose = false;
    }

    if (modalIntercept) {
        return;
    }

    if (bodyClassName.indexOf('popupOn') > -1 || isClose) {
        $('body').removeClass('popupOn');
        $('body').addClass('on');
        $( "#modalPopup" ).css('opacity', 0);
        $( "#modalPopup" ).hide();
        /*setTimeout(function(){
            $( "#modalPopup" ).css('opacity', 0);
            $( "#modalPopup" ).hide();
        }, 1000);
        $( "#modalPopup" ).animate({
            opacity: 0,
        }, 500, function() {
            $( "#modalPopup" ).hide();
        });
        */
    } else {
        $('body').removeClass('on');
        $('body').addClass('popupOn');
        $( "#modalPopup" ).css('opacity', 1);
        $( "#modalPopup" ).show();
        /*setTimeout(function(){
            $( "#modalPopup" ).show();
        }, 3000);
        $( "#modalPopup" ).animate({
            opacity: 1,
        }, 500);
        */
        //$("#modalPopup").animate({opacity: "1"}, 500).show();
    }
}

/**
 * setModalPopup({
        "title":"국토지리정보원 업무지원서비스", > default : 국토정보지리원
        "body" : "컨텐츠 영역",
        "class":"viewRecord", > alert, login, viewRecord, mapView, recordView, noticeView
        "buttons" : {
                "버튼1" : {
                    "func" : function() {
                                console.log("확인");
                            },
                    "title" : "확인",
                    "addTag" : "Strong",
                    "class" : "fn"
                },
                "버튼2" : {
                    "func" : function() {
                                console.log("취소");
                            },
                    "title" : "취소",
                    "class" : ""
                }
        }
    });
 *  이런 형식으로 사용.
 * @param arg
 * @returns {string}
 */
setModalPopup = function(arg) {
    initModal();

    if (arg == undefined) {
        arg = {};
    }

    var buttons = "";
    var btnEvent= "";

    // 모달팝업 타이틀 적용 ( default : 국토정보지리원 )
    if (arg.title != undefined && arg.title != "") {
        $('header.popup:last > h2').html(arg.title);
    } else {
        $('header.popup:last > h2').html('국토정보지리원');
    }

    // 모달팝업 css 클래스 적용
    if (arg.class != undefined ) {
        $('#modalPopup').addClass(arg.class);
    }


    if($("header.popup:last").off){
        $("header.popup:last").off(); // 이벤트 제거
    }

    if (arg.isCloseBtn != undefined && arg.isCloseBtn == true) {
        $("header.popup:last").find('button').show();
        // step2. 항공사진 선택 및 데이터 초기화
        $("header.popup:last").on('click', function(){
            aerial.goStep2();
        });
    } else {
        $("header.popup:last").find('button').show();
    }

    try {
        // 모달팝업 컨텐츠
        if(arg.body != undefined) {
            /*$('main.popup:last').show();
            $('main.popup:last').html(arg.body);*/
            $('#modalPopup').find('div.main.popup').show();
            $('#modalPopup').find('div.main.popup').html(arg.body);
        } else {
            /*$('main.popup:last').hide();*/
            $('#modalPopup').find('div.main.popup').hide();
        }
    } catch (exception) {
        console.log(exception);
    }

    // 가로사이즈 지정
    if(arg.width != undefined) {
        $('#modalPopup > section').css('width', arg.width);
    }

    // 세로사이즈 지정
    if(arg.autoHeight) {
        $('#modalPopup section.popup').each(function() {
            /*$(this).height($(this).find('main.popup').outerHeight());*/
            $(this).height($(this).find('div.main.popup').outerHeight());
        });
    } else if(arg.height != undefined) {
        $('#modalPopup > section').css('height', parseInt(arg.height) + 50);
    }


    //$('footer.popup.function:last').remove();
    if (arg.hideButton == undefined || arg.hideButton == false) {
        if($('#modalPopup > section').find('footer').length == 0) {
            var footer = document.createElement('footer');
            footer.className = 'popup function';
            $(footer).hide();

            $('#modalPopup > section').append(footer);
        }
    }




    // 모달팝업 버튼 적용
    if( $('footer.popup.function:last').find('button').off){
        $('footer.popup.function:last').find('button').off();
    }
    if(arg.buttons != undefined) {
        $.each(arg.buttons, function(key, button){
            var createButton = document.createElement('button');
            var createParentButton = '';

            // 버튼 타이틀
            if(button.title != undefined) {
                createButton.textContent = button.title;
            } else {
                createButton.textContent = '확인';
            }

            // 버튼 클래스
            if(button.class != undefined) {
                createButton.className = button.class;
            }

            // 버튼 펑션
            if(button.func != undefined) {
                createButton.onclick = button.func;
                btnEvent = button.func;
            }

            // 버튼 앞 뒤로 태그 생성
            if(button.addTag != undefined) {
                createParentButton = document.createElement(button.addTag);
                createParentButton.appendChild(createButton);
                buttons = createParentButton;
            } else {
                buttons = createButton;
            }

            if (arg.label != undefined) {
                if($("header.popup:last").off){
                    $("header.popup:last").off(); // 이벤트 제거
                }
                $("header.popup:last").find('button').show();

                $("header.popup:last").on('click', function(){
                    btnEvent();
                });
            }

            $('footer.popup.function:last').append(buttons);
            $('footer.popup.function:last').show();
        });
    } else if(arg.hideButton != undefined && arg.hideButton) {
        $('footer.popup.function:last').hide();
        /*$('main.popup:last').css('height', '100%');*/
        $('#modalPopup').find('div.main.popup').css('height', '100%');

    } else if(arg.isLoading != undefined && arg.isLoading) {
        $('header.popup:last').find('button').hide();
    } else {
        $('footer.popup.function:last').append("<button type=\"button\" title=\"닫기\">닫기</button>");
        $('footer.popup.function:last').show();

        $('footer.popup.function:last').find('button').on('click', function(){
            modalIntercept = false;
            modalPopup();
        });
    }

    // 라벨이 있을 경우 처리
    if (arg.label != undefined) {
        var createLabel = document.createElement('label');

        $('footer.popup.function:last').append(createLabel);
        $('footer.popup.function:last').find('label').html(arg.label);

        $('footer.popup.function:last').find('label').on('click', function() {
            btnEvent();
        })
    }

    modalPopup();
}


/**
 * 모달생성시 모달팝업의 컨텐츠 부분의 첫 태그 생성
 * @param colLength
 * @param width
 * @returns {string}
 */
modalPopupBeforeTag = function(colLength, width){
    var tag = "";

    if (width == undefined) {
        width = 640;
    }
    if (colLength == undefined) {
        colLength = 3;
    }
    tag += "<div class=\"scrollH\">";
    tag += "  <table class=\"board center\" style=\"min-width: " + width + "px; \">";
    tag += "    <colgroup>";
    for (var i = 0; i < colLength; i++) {
        tag += "<col/>";
    }
    tag += "    </colgroup>";

    return tag;
}

/**
 * 모달생성시 모달팝업의 컨텐츠 부분의 종료 태그 생성
 * @returns {string}
 */
modalPopupAfterTag = function(){
    var tag = "";

    tag += "  </table>";
    tag += "</div>";

    return tag;
}

/**
 * 데이터 null 체크
 * @param value
 * @param chgValue
 * @returns {*}
 */
nvl = function(value, chgValue){
    if(value == "null" || value == null || value == undefined){
        return chgValue;
    }else{
        return value;

    }
}

/**
 * 로딩바 호출
 * display - default - 열기
 * display - true - 열기
 * display - false - 닫기
 * msg : 메시지 출력
 */
loading = function(display, msg) {
    /*setModalPopup({
        "title" : "국토지리정보원",
        "body"  : "<p class=\"caution\">로딩 중입니다. 잠시만 기다려주세요.</p>",
        "class" : "alert",
        "isLoading" : true
    });*/

    $('#loadingBarMsg').hide();

    // 입력 메시지 출력
    if (msg != undefined && msg != '') {
        $('#loadingBarMsg').show();
        $('#loadingBarMsg').text(msg);
    }

    if (display == undefined) {
        display = true;
    }
    if (display) {
        $('body').addClass('loadingOn');
    } else {
        $('body').removeClass('loadingOn');
    }
}

/**
 * 에러 발생시 모달팝업 닫음.
 */
$(document).ready(function() {
    $(document).ajaxError(function(){
        modalPopup(true);
    });
});

loadAjaxHtml = function(url, title, width, height, popClass, hideBtn, btns) {
    var toUrl = replaceAll(url, " ", "%20");

    if(hideBtn == undefined) {
        hideBtn = true;
    }

    if (popClass == undefined) {
        popClass = "viewRecord";
    }

    $.ajax({
        type : "POST",
        url :  toUrl,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType : 'html',
        success : function(data) {
            if (!data) {
                alert("데이터가 없습니다.");
            } else {
                setModalPopup({
                    "title": title,
                    "body" : data,
                    "class": popClass,
                    "width": width,
                    "height": height,
                    "hideButton": hideBtn,
                    "buttons": btns
                });
            }
        }
    });
}

/**
 * 메시지 호출
 * @param msg : 출력할 메시지
 */
alertMsg = function(msg) {
    setModalPopup({
        "title":"국토지리정보원",
        "body" : "<p class=\"caution\">" + msg + "</p>",
        "class":"alert",
        "buttons" : {
            "확인" : {
                "func" : function() {
                    modalIntercept = false;
                    modalPopup(true);
                },
                "title" : "확인"
            }
        }
    });
}

/**
 * 메시지 호출
 * @param msg : 출력할 메시지
 * @param fnc 콜백 함수
 */
alertMsgCb = function(msg, fnc){
    setModalPopup({
        "title":"국토지리정보원",
        "body" : "<p class=\"caution\">" + msg + "</p>",
        "class":"alert",
        "buttons" : {
            "확인" : {
                "func" : function() {
                    modalIntercept = false;
                    modalPopup(true);
                    fnc(msg);
                },
                "title" : "확인"
            }
        }
    });
}


/**
 * 지정한 항목의 정합성을 체크해 문제 여부를 리턴
 * @param validateObjs 정합성을 체크하기 위한 항목의 정보를 갖고 있는 객체로
 * id(정합성을 체크할 항목의 id), checkType(checkType 정합성을 체크할 항목의 타입), min(정합성을 체크할 값의 min 값), max(정합성을 체크할 값의 max 값)를 갖고 있음
 * @return : true(맞는 형식) | false(잘못된 형식)
 */
function isValidateChk(validateObjs){
    var name, value, checkType, min, max;

    for (var x = 0, objectSize=validateObjs.length; x < objectSize; x++) {
        selectObj = $('#'+validateObjs[x].getId());
        name = $('#'+validateObjs[x].getId()).attr("dc");
        value = $('#'+validateObjs[x].getId()).val();
        checkType = validateObjs[x].getCheckType();
        min = parseInt(validateObjs[x].getMin());
        max = parseInt(validateObjs[x].getMax());

        if(checkType == REQ_VAL_NOTNULL){ // 값이 꼭 존재 해야 함
            if(value == null || value == "" ){ // 값이 없으면 오류
                alertMsg(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }
        }else if(checkType == REQ_VAL_NUM){ // 숫자의 값 체크 오류
            if(!(value == null || value == "")){
                if(!value.num()){
                    alertMsg(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }
        }else{
            if(value == null || value == "" ){ // 값이 없으면 오류
                alertMsg(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }

            if(checkType == REQ_VAL_LENGTH){ // 값의 length를 체크
                if(!isSizeValidate(value.getLength(), min, max)){
                    alertMsg(getMessage("process.cm.validate.reqValLengthMsg", [Josa(name, '을'), min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_VALUE){ // 값의 크기를 체크
                if(!isSizeValidate(parseInt(value), min, max)){
                    alertMsg(getMessage("process.cm.validate.reqValValueMsg", [name, min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_NUM){ // 숫자의 값이 꼭 있어야 함
                if(!value.num()){
                    alertMsg(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_KOR){ // 한글의 값이 꼭 있어야 함
                if(!value.kor()){
                    alertMsg(getMessage("process.cm.validate.reqValNotnullKor", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_ENG){ // 영문자의 값이 꼭 있어야 함
                if(!value.eng()){
                    alertMsg(getMessage("process.cm.validate.reqValNotnullEng", [Josa(name, '은')]));
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * 지정한 항목의 정합성을 체크해 문제 여부를 리턴
 * @param validateObjs 정합성을 체크하기 위한 항목의 정보를 갖고 있는 객체로
 * id(정합성을 체크할 항목의 id), checkType(checkType 정합성을 체크할 항목의 타입), min(정합성을 체크할 값의 min 값), max(정합성을 체크할 값의 max 값)를 갖고 있음
 * @return : true(맞는 형식) | false(잘못된 형식)
 */
function isValidateChkMsg(validateObjs){
    var name, value, checkType, min, max;

    for (var x = 0, objectSize=validateObjs.length; x < objectSize; x++) {
        selectObj = $('#'+validateObjs[x].getId());
        name = $('#'+validateObjs[x].getId()).attr("dc");
        value = $('#'+validateObjs[x].getId()).val();
        checkType = validateObjs[x].getCheckType();
        min = parseInt(validateObjs[x].getMin());
        max = parseInt(validateObjs[x].getMax());

        if(checkType == REQ_VAL_NOTNULL){ // 값이 꼭 존재 해야 함
            if(value == null || value == "" ){ // 값이 없으면 오류
                alert(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }
        }else if(checkType == REQ_VAL_NUM){ // 숫자의 값 체크 오류
            if(!(value == null || value == "")){
                if(!value.num()){
                    alert(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }
        }else{
            if(value == null || value == "" ){ // 값이 없으면 오류
                alert(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }

            if(checkType == REQ_VAL_LENGTH){ // 값의 length를 체크
                if(!isSizeValidate(value.getLength(), min, max)){
                    alert(getMessage("process.cm.validate.reqValLengthMsg", [Josa(name, '을'), min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_VALUE){ // 값의 크기를 체크
                if(!isSizeValidate(parseInt(value), min, max)){
                    alert(getMessage("process.cm.validate.reqValValueMsg", [name, min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_NUM){ // 숫자의 값이 꼭 있어야 함
                if(!value.num()){
                    alert(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_KOR){ // 한글의 값이 꼭 있어야 함
                if(!value.kor()){
                    alert(getMessage("process.cm.validate.reqValNotnullKor", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_ENG){ // 영문자의 값이 꼭 있어야 함
                if(!value.eng()){
                    alert(getMessage("process.cm.validate.reqValNotnullEng", [Josa(name, '은')]));
                    return false;
                }
            }
        }
    }
    return true;
}


var mapMainClass = ""; // 해당 카테고리의 메인 메뉴 클래스
var thisMapId = "";    // 현재 카테고리의 div id
var initChk = false;
/**
 * 국토정보맵 탭별로 셋팅
 * @param param
 */
changeMapCategory = function(param) {
//    northObj.param.baseLayer = true;
    //통계지도 레이어 초기화
   locSearch.removelayer(map);
    var tabInfo = nvl(param, '');
    var mapSubClass = "";  // 해당 카테고리의 서브 메뉴 클래스
    $('.nlip_map_area').css('background','');
    $('body > header > nav').children().removeClass('on');
    $('aside.left > div').hide(); // aside 태그의 left 클래스 사용하는 자식 div를 다 숨김처리

    $('.nlip_hdmap_legend_title').css("display","none"); // 정밀도로지도 레이어 버튼
    $('#timeTableWrap').css('display', 'none');		//정밀도로지도 이력정보 하단 테이블 안보이게

    //$('.nlip_map_area').css('background','#ccc');
    //$('[id$=]').removeClass('on');
    //$('[id^=mapTab]').hide(); // id가 mapTab으로 시작하는 애들 hide


    if(thisMapId.toLowerCase().indexOf('source') > 0) {
        mapInitializer.deactivateAll();
        map.getLayersByName("tn_eais_buld_refine")[0].setVisibility(false);
        map.getLayersByName("tn_kais_buld_refine")[0].setVisibility(false);
        map.getLayersByName("tn_kras_buld_refine")[0].setVisibility(false);
        map.getLayersByName("tn_kais_road_refine")[0].setVisibility(false);

        if(infoControl != undefined){
            infoControl.deactivate();
        }
    }

    $('#nameAddress').show();
    northObj.clear();
    daedongObj.viewClear();		// 대동여지도 초기화
    if (mapMainClass == 'samil'){ //통합지도검색과의 분리를 위해 if문 추가
    	samilObj.viewClear();				// 삼일운동지도 초기화
    }
    ancientObj.init();					// 구지도 초기화

    $('.tools .grid').show();
    $('.tools .export').show();
    $('.tools .bookmark').show();

    // 검색도구 초기화
    searchTools.indexTool.deactivate();
    searchTools.areaTool.deactivate();
    searchTools.bufferTool.deactivate();

    // searchLayer& indexLayer의 feature 삭제
    searchTools.indexTool.initSearchLayer();
    searchTools.indexTool.initIndexLayer();

    // 간편지도 검색 > 통합검색 > 결과 리스트 초기화
    $('section.search.simple .simple ul.method').hide();
    // 간편지도 검색 > 통합검색 > 버튼 초기화
    $('section.search.simple .simple nav.method button').removeClass('on');
    // 간편지도 검색 > 통합검색 > 인덱스&영역&반경 버튼 초기화
    $('section.search.simple .simple ul.method li').removeClass('on');

    // 통합검색 영역 초기화
    $('#totalSearch').find('section.search').addClass('keyword').removeClass('simple');
    $('#totalSearch').find('section.search').find('.inputs .simple').removeClass('on');
    $('#totalSearch').find('section.search').find('.inputs .keyword').addClass('on');

    // 주소/POI/도엽 클릭 이벤트 비활성화
    integ.eventMarkStep1Multipoint(false);
    //poi marker 삭제
    map.removeLayer(intrstVectorLayer);
    
    switch (tabInfo) {
        case 'total' : // 국토정보맵
            $('.total').toggleClass('on');
            mapMainClass = "total";
            mapSubClass  = "";
            integ.init();
            break;

        case 'statsMap' : // 국토통계지도
            $('.statistics').toggleClass('on');
            mapMainClass = "statistics";
            mapSubClass  = "Population";
            statsLegend.selectMapTab();
            statsLegend.reset('00', mapMainClass+mapSubClass);
            statsLegend.mapCssInit();
            $('.mapSplitControl').hide();
            break;

        case 'name' : // 지명검색
            $('.total').toggleClass('on');
            mapMainClass = "total";
            mapSubClass  = "Placename";
            break;

        case 'land' : // 국토변화정보
            $('.change').toggleClass('on');
            mapMainClass = "change";
            mapSubClass  = "Notice";
            break;

        case 'nation' : // 국가관심지점
            $('.total').toggleClass('on');
            mapMainClass = "total";
            mapSubClass  = "Interest";
            break;

        case 'north' : // 북한지도
            $('.north').toggleClass('on');
            $('.nlip_map_area').css('background','#083959');
            $('div[id^=north]').find('.mapFunction>ul>li.eye').addClass('on');
            //$($('div[id^=north]').find('.mapFunction li.on ul.option li')[2]).addClass('on');
            $('#nameAddress').hide();
            mapMainClass = "north";
            mapSubClass  = "Measure";
            break;

        case 'hdmap' : // 정밀도로지도
            $('.hdmap').toggleClass('on');
            mapMainClass = "hdmap";
            mapSubClass  = "Sub01";
            integ.init();
            hdmapSearch_Sub01_init();	//좌측바 정밀도로지도 클릭시 초기 화면 호출
            break;

        case 'daedong' : // 대동여지도
            $('.daedong').toggleClass('on');
            $('#nameAddress').hide();
            $('.tools .grid').hide();
            $('.tools .export').hide();
            $('.tools .bookmark').hide();
            mapMainClass = "daedong";
            mapSubClass  = "";
            break;

        case 'samil' : // 31운동지도
            $('.samil').toggleClass('on');
            $('#nameAddress').hide();
            $('.tools .grid').hide();
            $('.tools .export').hide();
            $('.tools .bookmark').hide();
            mapMainClass = "samil";
            mapSubClass  = "";
            break;

        case 'ancient' : // 구지도
            $('.ancient').toggleClass('on');
            $('#nameAddress').hide();
            $('.tools .grid').hide();
            $('.tools .export').hide();
            $('.tools .bookmark').hide();
            mapMainClass = "ancient";
            mapSubClass  = "";
            break;

        default : // 국토정보맵 > 디폴트
            $('.total').toggleClass('on');
            mapMainClass = "total";
            mapSubClass  = "";
            break;
    }

    // 모바일일시 타이틀 수정
    mapTitleChange();


    if(initChk){
        $('[id^=statistics]').find('.property').removeClass('off');
        contextmenu.propertyViewReset();
        // map.events.unregister("click", map, propertyviewfn);
        map.un('singleclick', propertyviewfn);

        // mapInitializer.deactivateAll();
        initExpandMap();    //console.log("확장 맵 초기화 시키기");
        removeSiguLayer("search_markers");  //마커제거
        _clearPopup();  //팝업제거

        if (mapMainClass == 'statistics') {
            splitMapInit(map, 'statistics');
            splitMapInit(mMap1, 'statistics');
            // renewSplitMap('1', 'statistics');
            // $('#edu').click();
            mapContextMenuOn(false);
        } else if(mapMainClass == 'north') {
            renewSplitMap('1', 'north');
            // NorLayer('2010');
            fnBaseLayer('northLayer_2010', map);
            map.getView().setCenter([954620.61322572, 2178148.9983641]);
            map.getView().setZoom(5);
            mapContextMenuOn(true);
            // 역사지도 - 2020고도화
            // 대동여지도
        } else if(mapMainClass == 'daedong') {
            renewSplitMap('1', 'daedong');
            // $('#edu').click();
            fnBaseLayer('whitelayer');
            // 삼일운동지도
        } else if(mapMainClass == 'samil') {
            renewSplitMap('1', 'samil');
            // $('#base').click();
            fnBaseLayer('TMS Layer');
            // 구지도
        } else if(mapMainClass == 'ancient') {
            renewSplitMap('1', 'ancient');
            ANCIENT_API.createOldLayer(true);
        } else {
            if(mapMainClass == 'hdmap'){
                splitMapInit(map, 'hdmap');
            } else{
                splitMapInit(map, 'statistics');
            }
            renewSplitMap();
            // $('#base').click();
            fnBaseLayer('TMS Layer');
            mapContextMenuOn(true);
        }
    } else {
        if (mapMainClass == 'statistics') {
            // $('#edu').click();
            statsLegend.mapInit();
            mapContextMenuOn(false);
            splitMapInit(mMap1, 'statistics');
            splitMapInit(mMap2, 'statistics');
            splitMapInit(mMap3, 'statistics');
        } else if(mapMainClass == 'north') {
            mapContextMenuOn(true);
            // NorLayer('2010');
            fnBaseLayer('northLayer_2010', map);
            map.getView().setCenter([954620.61322572, 2178148.9983641]);
            map.getView().setZoom(5);
        } else if(mapMainClass == 'daedong') {
            // $('#edu').click();
            fnBaseLayer('whitelayer');
        } else if (mapMainClass == 'samil') {
            // $('#base').click();
            fnBaseLayer('TMS Layer');
        } else if(mapMainClass == 'ancient') {
            ANCIENT_API.createOldLayer(true);
        }  else {
            mapContextMenuOn(true);
            // $('#base').click();
            fnBaseLayer('TMS Layer');
        }
        initChk = true;
    }

    $('[name=northMapYear]').hide();
    $('.layerLegendBtn').hide();
    $('.layerSyncBtn').hide();

    $('[name=historyMap]').hide();
    daedongObj.viewLayer(false);
    samilObj.viewLayer(false);

    if (mapMainClass == 'north') {
        $('#nameAddress').hide();

        $('[name=northMapYear]').show();
        // 대동여지도 - 2020고도화
    } else if (mapMainClass == 'daedong' ) {
        mapContextMenuOn(false);
        $('main.map').addClass('type');
        $('#nameAddress').hide();
        $('[name=historyMap]').show();
        daedongObj.viewLayer(true);
        // 삼일운동지도, 구지도 - 2020고도화
    } else if (mapMainClass == 'samil' ) {
        mapContextMenuOn(false);
        $('#nameAddress').hide();
        samilObj.viewLayer(true);
        // 구지도 - 2020고도화
    } else if ( mapMainClass == 'ancient' ) {
        mapContextMenuOn(false);
        // map.zoomTo(0);
        map.getView().setZoom(1);
        $('#nameAddress').hide();
    } else {
        if (mapMainClass == 'statistics') {

            $('.layerLegendBtn').show();
            $('.layerSyncBtn').show();
        }
        $('#nameAddress').show();
    }

    mapInit();
    hdMapVisibledLayerClear(); // 정밀도로지도 레이어 초기화
    changeChildCategory(mapSubClass);
    intrstInit();
}

/**
 * 자식 태그 카테고리 표시
 * @param param : 표시하려는 태그의 서브 ID(Placename)
 * @addYn
 * 예 ) totalPlacename > total : 대메뉴, Placename : 표시하려는 메뉴(중메뉴)
 */
changeChildCategory = function(param, addYn) {
    var tabInfo = nvl(param, '');
    var className = "";

    if(addYn == undefined) {
        addYn = 'Y';
    }

    $('aside.left > div').hide(); // aside 태그의 left 클래스 사용하는 자식 div를 다 숨김처리

    $('body > main').attr('class', 'map');

    $('.nlip_hdmap_history_select').hide();		//정밀도로지도 이력정보 검색 창 안보이게 

    //정밀도로지도 검색어 초기화
    $("#searchRoadName").val('');
    $("#searchRoadName2").val('');

    if(mapMainClass == 'total' && tabInfo != ''){
        // 검색도구 초기화
        searchTools.indexTool.deactivate();
        searchTools.areaTool.deactivate();
        searchTools.bufferTool.deactivate();

        // searchLayer& indexLayer의 feature 삭제
        searchTools.indexTool.initSearchLayer();
        searchTools.indexTool.initIndexLayer();

        // 간편지도 검색 > 통합검색 > 결과 리스트 초기화
        $('section.search.simple .simple ul.method').hide();
        // 간편지도 검색 > 통합검색 > 버튼 초기화
        $('section.search.simple .simple nav.method button').removeClass('on');
        // 간편지도 검색 > 통합검색 > 인덱스&영역&반경 버튼 초기화
        $('section.search.simple .simple ul.method li').removeClass('on');

        // 통합검색 영역 초기화
        $('#totalSearch').find('section.search').addClass('keyword').removeClass('simple');
        $('#totalSearch').find('section.search').find('.inputs .simple').removeClass('on');
        $('#totalSearch').find('section.search').find('.inputs .keyword').addClass('on');

        // 주소/POI/도엽 클릭 이벤트 비활성화
        integ.eventMarkStep1Multipoint(false);
    } else if (mapMainClass == 'statistics') {
        renewSplitMap('1','statistics');
    } else if(mapMainClass == 'hdmap') { //정밀도로지도 서브탭
        hdMapVisibledLayerClear(); // 정밀도로지도 레이어 초기화

        $('#div_map .hdmap_legend').show();

        //레이어 on/off 상세 화면 켜져 있을때 영역 해제
        //구축현황
        if($('#div_map .hdmap_legend').hasClass("_layerOn")){
            $('#div_map .hdmap_legend').removeClass("_layerOn");
        }
        //이력정보
        if($('#div_map_4 .hdmap_legend').hasClass("_layerOn")){
            $('#div_map_4 .hdmap_legend').removeClass("_layerOn");
        }

        if(tabInfo == 'Sub03'){
            $('.nlip_hdmap_legend_title').show();
            $('.nlip_hdmap_history_select').show();
            getTimeSeriesRoadList()
            renewSplitMap('2h','hdmap');

            $('#timeTableWrap').css('display', 'block');	// 이력정보 하단 목록창 보이게 및 위치 설정
            $('#div_map .hdmap_legend').hide();				// 기본맵 레이어on/off 숨기기

        } else if(tabInfo == 'Sub02'){
            $('.nlip_hdmap_legend_title').hide();
            renewSplitMap('1','statistics');

            $('#timeTableWrap').css('display', 'none');	//이력정보 하단 테이블 태그 안보이게

        } else if(tabInfo == 'Sub01'){
            $('.nlip_hdmap_legend_title').show();
            $('.main_tab_wrap.wrap_roadmap_main').show();
            renewSplitMap('1','statistics');

            $('#timeTableWrap').css('display', 'none');	//이력정보 하단 테이블 태그 안보이게

            //고도화 - 데이터 결과값 안보이게 수정
            if($('#hdmapSub01').hasClass('_categoryOn')){
                $('#hdmapSub01').removeClass('_categoryOn');
            }
            if(!$('#hdmapSub01').hasClass('_categoryOff')){
                $('#hdmapSub01').addClass('_categoryOff');
            }

            //고도화 - 상세 항목 보이지 않게 수정
            if($('#hdmapSub01').hasClass('_mapListOn')){
                $('#hdmapSub01').removeClass('_mapListOn');
            }
            
            //211109 추가
            $("#backSwitch").trigger('click');
        }
    } else if (mapMainClass == 'daedong' ) {
        daedongObj.viewClear();
    } else if (mapMainClass == 'samil' ) {
        samilObj.viewClear();
        if ( tabInfo == "" || tabInfo == "Total") {
            samilObj.searchTotalList(true);
        }
    } else if (mapMainClass == 'ancient') {
        $('.area_section button')[1].click();	// class visible check 안됨. ㅡㅡ
        sliderRefresh(0, false);
        if ( tabInfo == 'Slide' ) {
            $('.area_section button')[0].click();
        } else {
    		//select value 초기화
    		$('#old_select1 option:eq(1)').prop("selected", true);
			$('#old_select1').change();
			$('#old_select2 option:eq(1)').prop("selected", true);
        }
    }

    if (addYn == 'Y') {
        className = mapMainClass +" "+ tabInfo.toLowerCase();
    } else {
        className = tabInfo.toLowerCase();
    }

    $('body > main').addClass(className);

    // 현재 맵 id 저장 (전역변수)
    thisMapId = mapMainClass + tabInfo;
    if (tabInfo == '') {
        $('aside.left > div[id^=' + mapMainClass + ']:first').show();
    } else {
        $('#' + thisMapId).show();
    }
    integ.searchType = null;
    integ.searchForm = null;
    integ.clear();
}

//202104 공시지가 임시중지
infoLandStop = function(){

    setModalPopup({
        "title":"토지 공시지가 서비스 점검 안내",
        "body" : "토지 공시지가 서비스는 데이터 점검 관계로<br>일시적으로 서비스가 중지되었습니다.<br>정상서비스가 되도록 최선을 다하겠습니다.<br>감사합니다.",
        "width" : 420,
        "height" : 130,
        "hideButton" : true,
        "class":"mapPreview"
    });
}

// 맵 초기화
mapInit = function() {
    var mapObj;

    for(var i=0; i < 4; i++) {

        switch (i) {
            case 0:
                mapObj = map;
                break;
            case 1:
                mapObj = mMap1;
                break;
            case 2:
                mapObj = mMap2;
                break;
            case 3:
                mapObj = mMap3;
                break;
            default:
                mapObj = map;
                break;
        }

        // var layers = mapObj.layers;
        // var layer = $.grep(layers, function (layer) {
        //     return layer.name.indexOf('vl') == 0;
        // });
        //
        // if (layer[0]) {
        //     mapObj.removeLayer(layer[0]);
        // }
        if(mapObj) {
            for (var j = mapObj.getLayers().getArray().length - 1; j > -1; j--) {
                if (mapObj.getLayers().getArray()[j].get('name') && mapObj.getLayers().getArray()[j].get('name').indexOf('vl') == 0) {
                    mapObj.removeLayer(mapObj.getLayers().getArray()[j]);
                }
            }
        }
    }

    integ.clear();
    try {
        northObj.clear();
    } catch (e) {
    }
    mapQuery.clear();
}

// 모바일일시 타이틀 수정
mapTitleChange = function(){
    var mapTitleClass = "";
    var mapTitle = "";

    switch (mapMainClass) {
        case 'total' :
        case 'statistics' :
        case 'change' :
        case 'north' :
        case 'hdmap' :	//정밀도로지도 	
        case 'daedong' :
        case 'samil' :
        case 'ancient' :
            mapTitleClass = mapMainClass;
            break;
        default :
            mapTitleClass = 'total';
            break;
    }

    mapTitle = $('body > header.menu > nav').find('button.' + mapTitleClass).text();
    $('#thisMapTitle').text(mapTitle);
}

// 콤마 찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function mapContextMenuOn(isView) {

    if (isView) { // 통계지도 제외한 3지도
        // map.div.oncontextmenu = function(event){ // 우클릭 시 에어커맨드 메뉴 활성화
        //
        //     var xy = map.events.getMousePosition(event);
        //
        //     airCommand.position.x = xy.x;
        //     airCommand.position.y = xy.y;
        //
        //     return airCommand.show(event, airCommand);
        // };
        // map.getViewport().addEventListener('contextmenu', function (evt) {
        //     evt.preventDefault();
        //     var xy = map.getEventCoordinate(evt);
        //     airCommand.position.x = xy[0];
        //     airCommand.position.y = xy[1];
        //
        //     return airCommand.show(event, airCommand);
        // });
        map.getViewport().addEventListener('contextmenu', clickAircommand);

    } else {
        // map.div.oncontextmenu = function(event){ // 우클릭 시 에어커맨드 메뉴 활성화
        //     return false;
        // };
        map.getViewport().removeEventListener('contextmenu', clickAircommand);
        map.getViewport().addEventListener('contextmenu', function (evt) {
            evt.preventDefault();
            return false;
        });
    }
}

/**
 * 지정한 항목의 정합성을 체크해 문제 여부를 리턴
 * @param validateObjs 정합성을 체크하기 위한 항목의 정보를 갖고 있는 객체로
 * id(정합성을 체크할 항목의 id), checkType(checkType 정합성을 체크할 항목의 타입), min(정합성을 체크할 값의 min 값), max(정합성을 체크할 값의 max 값)를 갖고 있음
 * @return : true(맞는 형식) | false(잘못된 형식)
 */
function isValidateChkMsgHdmap(validateObjs){
    var name, value, checkType, min, max;

    for (var x = 0, objectSize=validateObjs.length; x < objectSize; x++) {
        selectObj = $('#infoForm #'+validateObjs[x].getId());
        name = $('#infoForm #'+validateObjs[x].getId()).attr("dc");
        value = $('#infoForm #'+validateObjs[x].getId()).val();
        checkType = validateObjs[x].getCheckType();
        min = parseInt(validateObjs[x].getMin());
        max = parseInt(validateObjs[x].getMax());

        if(checkType == REQ_VAL_NOTNULL){ // 값이 꼭 존재 해야 함
            if(value == null || value == "" ){ // 값이 없으면 오류
                alert(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }
        }else if(checkType == REQ_VAL_NUM){ // 숫자의 값 체크 오류
            if(!(value == null || value == "")){
                if(!value.num()){
                    alert(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }
        }else{
            if(value == null || value == "" ){ // 값이 없으면 오류
                alert(getMessage("process.cm.validate.nullDataMsg", [name]));
                return false;
            }

            if(checkType == REQ_VAL_LENGTH){ // 값의 length를 체크
                if(!isSizeValidate(value.getLength(), min, max)){
                    alert(getMessage("process.cm.validate.reqValLengthMsg", [Josa(name, '을'), min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_VALUE){ // 값의 크기를 체크
                if(!isSizeValidate(parseInt(value), min, max)){
                    alert(getMessage("process.cm.validate.reqValValueMsg", [name, min, max]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_NUM){ // 숫자의 값이 꼭 있어야 함
                if(!value.num()){
                    alert(getMessage("process.cm.validate.reqValNotnullNum", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_KOR){ // 한글의 값이 꼭 있어야 함
                if(!value.kor()){
                    alert(getMessage("process.cm.validate.reqValNotnullKor", [Josa(name, '은')]));
                    return false;
                }
            }else if(checkType == REQ_VAL_NOTNULL_ENG){ // 영문자의 값이 꼭 있어야 함
                if(!value.eng()){
                    alert(getMessage("process.cm.validate.reqValNotnullEng", [Josa(name, '은')]));
                    return false;
                }
            }
        }
    }
    return true;
}