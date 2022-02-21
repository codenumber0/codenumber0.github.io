package kr.childsafe.mapper;

import java.util.List;

import kr.childsafe.domain.SzAccident;
import kr.childsafe.domain.TMember;
import kr.childsafe.domain.TPopulationDensity_wll;
import kr.childsafe.domain.TSchoolZone;

public interface Childmapper {
	/**
	 * Member 관련
	 * @author 유태현
	 * @since 2022.02.11
	 * 
	 * */
	//회원조회
	public List<TMember> memberList();
	//회원가입
	public void join(TMember vo);
	//로그인
	public TMember login(TMember vo);
	//회원정보 수정
	public void memberUpdate(TMember vo);

	/**
	 * 유아/어린이 밀도 관련
	 * @author 박진택
	 * @since 2022.02.11
	 * 
	 * */
	public List<TPopulationDensity_wll> cDensityAjax();
	
	/**
	 *  스쿨존 사고 다발지점 관련
	 * @author 박진택
	 * @since 2022.02.11
	 * */
	public List<SzAccident> szAccidentAjax();
	public List<SzAccident> szAccidentGwangjuAjax();
	
	/**
	 * 스쿨존 현황 관련
	 * @author 박진택
	 * @since 2022.02.11
	 * */
	public List<TSchoolZone> schoolZoneAjax();
	public List<TSchoolZone> schoolZoneGwangjuAjax();
}
