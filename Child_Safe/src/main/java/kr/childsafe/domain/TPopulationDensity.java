package kr.childsafe.domain;

import lombok.Data;

@Data
public class TPopulationDensity {
	/**
	 * 어린이 인구밀도 모델
	 *  
	 * @author 박진택
	 * @since 2022.02.11
	 * */	
	private int density_seq;
	private String sigungu;
	private int population_density;
	private float latitude;
	private float longitude;
	private String youth_type;
	private String reg_date;
	private String mem_id;
}
