package kr.childsafe.domain;

import com.fasterxml.jackson.annotation.JsonProperty;


public class TPopulationDensity_wll {
	/**
	 * 어린이 인구밀도 모델
	 * 
	 * wll은, weight(해당 구역의 어린이 수), lat(위도), lng(경도)
	 * DB에있는 테이블 컬럼명들을, 사용하고있는 map API에 맞춰주기위해, lombok을 사용하지않고,
	 * 각각의 get 메소드 위에 이름을 달아줌.
	 * @author 박진택
	 * @since 2022.02.11
	 * */
	private int population_density;
	private float latitude;		
	private float longitude;

	@JsonProperty("weight")
	public int getPopulation_density() {
		return population_density;
	}
	public void setPopulation_density(int population_density) {
		this.population_density = population_density;
	}
	@JsonProperty("lat")
	public float getLatitude() {
		return latitude;
	}
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}
	@JsonProperty("lng")
	public float getLongitude() {
		return longitude;
	}
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
}
