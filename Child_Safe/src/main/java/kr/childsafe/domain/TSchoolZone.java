package kr.childsafe.domain;

import lombok.Data;

@Data
public class TSchoolZone {
	/**
	 * 스쿨존 현황 모델
	 * 
	 * @author 박진택
	 * @since 2022.02.11
	 * */
	private int sz_seq;
	private String sz_facility;
	private String sz_name;
	private String sz_addr;
	private float latitude;
	private float longitude;
	private String sz_road_width;
	private String sz_date;
	private String sz_police_station;
	private String sz_cctv;
	private int sz_cctv_cnt;
	private String mem_id; 
}
