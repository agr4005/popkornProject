package com.teamstatic.popkornback.common;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = false)
@Data
public class SearchCriteria extends Criteria {
	
	private String searchType = "all";
	private String keyword;
	private String[] check;
	
} // class
