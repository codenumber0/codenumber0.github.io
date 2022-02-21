package kr.childsafe.cs;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import kr.childsafe.domain.SzAccident;
import kr.childsafe.domain.TMember;
import kr.childsafe.domain.TPopulationDensity_wll;
import kr.childsafe.domain.TSchoolZone;
import kr.childsafe.service.ChildService;

@Controller
public class ChildController {
	
	@Autowired
	ChildService service;

	//main 
	@RequestMapping("/Zindex.do")
	public String main() {

	return "Zindex";
	}
	
	//회원테이블조회
	@RequestMapping("/main.do")
	public String memberList(Model model) {
		List<TMember> list = service.memberList();
		//객체바인딩
		model.addAttribute("list",list);
		return "main";//jsp 이름(jsp*jstl+el)
	}
	
	
	
	//회원가입창 클릭
	@RequestMapping(value = "/Zjoin.do",method = RequestMethod.GET)
	public void join() {
	}
	
	//회원가입 완료 버튼 클릭
	@RequestMapping(value = "/Zjoin.do",method = RequestMethod.POST)
	public String join(TMember vo) {
		service.join(vo);
		System.out.println("회원가입 됬나"+vo);
		return "main";
	}
	
	//로그인
	@RequestMapping(value = "/Zlogin.do",method = RequestMethod.GET)
	public void login() {
	}
	
	@RequestMapping(value ="/Zlogin.do",method = RequestMethod.POST)
	public String login(TMember vo,HttpServletRequest req, RedirectAttributes rttr) {
		HttpSession session = req.getSession();
		TMember login = service.login(vo);
		
		if(login==null) {
			session.setAttribute("member", null);
			rttr.addFlashAttribute("msg",false);
			System.out.println("로그인 성공못함");
		}else{
			session.setAttribute("member", login); //login 여기에 session vo값들을 저장
			System.out.println("로그인 성공");
		}
		return "redirect:/Zindex.do";
	}
	
	//로그아웃
	@RequestMapping(value = "/logout.do",method=RequestMethod.GET)
	public String lougout(HttpSession session) {
		session.invalidate();
		System.out.println("로그아웃 성공");
		return "redirect:/main.do";
	}
	
	//회원정보 보기
	@RequestMapping(value = "/mypage.do",method = RequestMethod.GET)
	public String memberUpdateView() {
		return "mypage";
	}
	//회원정보 수정
	@RequestMapping(value = "/mypage.do",method = RequestMethod.POST)
	public String memberUpdate(TMember vo,HttpSession session) {
		service.memberUpdate(vo);
		session.invalidate();
		return "redirect:/main.do";//회원수정을 하면 세션이 끊어져서 로그아웃된 메인화면으로 이동
		
	}
	
	// 게시판
	@RequestMapping(value = "/Ztable.do",method = RequestMethod.GET)
	public void table() {
	}
	
	@RequestMapping(value = "/Zwrite.do",method = RequestMethod.GET)
	public void write() {
	}
	
	
	@RequestMapping(value = "/Zpost.do",method = RequestMethod.GET)
	public void post() {
	}
	
	
	// 지도
	/**
	 * Zmap1.do: "스쿨존 현황" 관련
	 * 
	 * [이동] Zmap1.do
	 * */
	@RequestMapping(value = "/Zmap1.do",method = RequestMethod.GET)
	public void map1() {
	}
	
	/**
	 * Zmap1.do: "스쿨존 현황" 관련
	 * 
	 * [ajax]
	 * 스쿨존 DB에 접근하여, Gwangju데이터만 가져옴
	 * 
	 * @return Gwangju안에 있는 스쿨존 정보들을 list에 담아둠.
	 * */
	@RequestMapping("/schoolZoneGwangjuAjax.do")
	public @ResponseBody List<TSchoolZone> schoolZoneGwangjuAjax() {
		List<TSchoolZone> list = service.schoolZoneGwangjuAjax();	
		return list;// list->JSON변환		
	}
	
	/**
	 * Zmap2.do: "어린이 사고지점" 관련
	 * 
	 * [이동] Zmap2.do
	 * */	
	@RequestMapping(value = "/Zmap2.do",method = RequestMethod.GET)
	public void map2() {
	}
	
	/**
	 * Zmap3.do: "어린이 사고 다발지점" 관련
	 * 
	 * [이동] Zmap3.do
	 * */	
	@RequestMapping(value = "/Zmap3.do",method = RequestMethod.GET)
	public void map3() {
	}
	
	/**
	 * Zmap3.do: "어린이 사고 다발지점" 관련
	 * 
	 * [ajax]
	 * 어린이사고 다발지점 DB에 접근하여 모든 데이터 가져옴.
	 * 
	 * @return 어린이 사고 다발지점 정보들을 list에 담아둠.
	 * */	
	@RequestMapping("/szAccidentAjax.do")
	public @ResponseBody List<SzAccident> szAccidentAjax() {
		List<SzAccident> list = service.szAccidentAjax();	
		return list;// list->JSON변환		
	}
	
	/**
	 * Zmap3.do: "어린이 사고 다발지점" 관련
	 * 
	 * [ajax]
	 * 광주안에서 일어난 어린이사고 다발지점 DB에 접근하여 모든 데이터 가져옴.
	 * 
	 * @return 광주 어린이 사고 다발지점 정보들을 list에 담아둠.
	 * */	
	@RequestMapping("/szAccidentGwangjuAjax.do")
	public @ResponseBody List<SzAccident> szAccidentGwangjuAjax() {
		List<SzAccident> list = service.szAccidentGwangjuAjax();	
		return list;// list->JSON변환		
	}
		
	
	/**
	 * Zmap4.do: "어린이 인구 밀도" 관련
	 * 
	 * [이동] Zmap4.do
	 * */	
	@RequestMapping(value = "/Zmap4.do",method = RequestMethod.GET)
	public void map4() {
	}
	
	
	/**
	 * Zmap4.do: "어린이 인구 밀도" 관련
	 * 
	 * [ajax]
	 * 광주에있는 어린이 밀도의 정보들을 가져옴
	 * 
	 * @return 어린이 밀도에 관한 데이터(TPopulationDensity_wll)를 list에 담아 반환
	 * 
	 * */
	@SuppressWarnings("unchecked")
	@RequestMapping("/cDensityAjax.do")
	public @ResponseBody String cDensityAjax() {
		List<TPopulationDensity_wll> list = service.cDensityAjax();
		Gson gson  = new GsonBuilder().setPrettyPrinting().create();
				
		//json형태로 들어가야, 열지도가 출력되므로
		//map api의 양식에 맞게 만들어주기 위해, json배열과 객체 생성
		JSONArray jsonOriginal = new JSONArray();
		JSONObject jsonData = new JSONObject();	
		String result = "";
		
		//{"weight":2.7 "location": [127.93,35.92]} 
		//이러한 형태로 들어가야, 열지도가 작동이 되므로, 
		//DB가져온 데이터를 이러한 JSON 형식으로 만들어주는 작업을 해줌.
		for(int i=0; i < list.size(); i++) {		
			JSONObject jsonObject = new JSONObject();	

			//weight(key)에, 해당 DB데이터 넣어줌(value)
			int weight = list.get(i).getPopulation_density();
			jsonObject.put("weight", weight);	
			
			//다음은, location을 넣어주기 위해, 배열형식이므로
			//배열형식으로, 위도경도 데이터 객체 생성해줌.
			JsonArray jsonArray = new JsonArray();
			
			float longitude = list.get(i).getLongitude();
			float latitude = list.get(i).getLatitude();
			
			jsonArray.add(longitude);
			jsonArray.add(latitude);
			
			//{}로 묶어줌.
			jsonObject.put("location", jsonArray);	
			
			//jsonOriginal array에 넣어줌.
			jsonOriginal.add(jsonObject);	
			
		}	
		//coordinates로 묶어주고 있는 양식이라, 마지막에 묶어줌.
		jsonData.put("coordinates", jsonOriginal);	
		result = gson.toJson(jsonData);

		return result;		
	}
}
