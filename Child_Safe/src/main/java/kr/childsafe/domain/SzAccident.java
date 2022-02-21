package kr.childsafe.domain;

import lombok.Data;

@Data
public class SzAccident {
	/**
	 * 스쿨존 다발지점 모델
	 * 
	 * @author 박진택
	 * @since 2022.02.11
	 * */
	private int sa_seq;
	private int sa_year;
	private String sa_spot;
	private int sa_count;
	private int sa_casualties;
	private int sa_deaths;
	private int sa_serious_injury;
	private int sa_light_injury;
	private int sa_hurt_report;
	private float latitude;
	private float longitude;
	private String polygon_xy;
	private String mem_id;
}
