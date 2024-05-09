package com.teamstatic.popkornback.common;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.Getter;
import lombok.ToString;

//** PageMaker : View 에 필요한 값을 완성
//=> 전체Row 갯수 (전체 Page수 계산위해 필요)
//=> 1Page당 표시할 pageNo갯수
//=> view 에 표시할 첫 PageNo
//=> view 에 표시할 끝 PageNo
//=> 출력 가능한 마지막 PageNo (totalRowsCount, rowsPerPage 로 계산)
//=> 이전 PageBlock 으로
//=> 다음 PageBlock 으로

//=> Criteria 를 이용해서..

@Getter
@ToString
public class PageMaker {
	
	private int totalRowsCount; // 출력대상 전체 row 갯수 : from DB
	private int displayPageNo = 3; // 1Page 당 표시할 Page 갯수 
	private int spageNo; // View 에 표시할 첫 PageNo : 개산 필요
	private int epageNo; // View 에 표시할 마지막 PageNo : 계산 필요
	// sPageNo 가 안되는 이유는 2번째 알파벳이 대문자인 경우 setter/getter 되는 경우 오류가 발생할 수 있음
	// ex) setSPageNo or setsPageNo 
	//   Lombok.. 등등 과 규칙이다르므로 사용시 불편 
	//   -> 그러므로 대.소문자 섞어사용시 주의. 
	private int lastPageNo; // 출력 가능한 전체 마지막 PageNo : 게산 필요
	private boolean prev; // 이전 PageBlock 으로
	private boolean next; // 다음 Pageblock 으로
	private String mappingName; // => bCheckList 또는 bPageList 등 요청방법에 해당하는 url 을 만들수 있도록 하기 위한 필드
	
	
	// ** 필요한 값 set & 계산
	// 1) Criteria
	// => ver01 : Criteria
	// Criteria cri;
	// => ver02 : SearchCriteria
	SearchCriteria cri;
	
	public void setCri (SearchCriteria cri) {
		this.cri = cri;
	}
	
	public void setMapptinName(String mappingName) {
		this.mappingName = mappingName;
	}
	
	// 2) totalRowsCount
	// => 전체 Rows의 갯수 : Read from DB
	// => 이 값을 이용한 나머지 필요한 값 계산 : 
	public void setTotalRowsCount(int totalRowsCount) {
		this.totalRowsCount = totalRowsCount;
		calcData();
	}
	
	// 3) CalculateData : 나머지 필요한 값 계산
	public void calcData() {
		// 3.1) spageNo , epageNo
		// => currPage 속한 pageBlock 의 spageNo 와 epageNo 값 계산

		// => n 개 씩 출력할 경우 epageNo 는 항상 n의 배수
		//  ex) n = 3 이면 첫번째 페이지 블럭 1,2,3 두번째 페이지 4,5,6 ...
	    // 3.1) spageNo, epageNo
	    // => currPage가 속한 PageBlock 의 spageNo, epageNo 를 계산 
	    
	    // => pageNo를 n개씩 출력한다고 가정하면 epageNo 는 항상 n의 배수
	    //     displayPageNo=3 이면 3, 6, 9, 12,......
	    // => ex) 17 page 요청 , displayPageNo=3, 일때 17이 몇번째 그룹 인지 계산하려면,
	    //        17/3 -> 5 나머지 2 결론은 정수 나누기 후 나머지가 있으면 +1 이 필요함
	    //    -> Math.ceil(17/3) -> Math.ceil(5.73..) -> 6.0 -> 6번쨰 그룹 16,17,18
	    // 즉, 17이 몇번째 그룹 인지 계산하고, 여기에 * displayPageNo 를 하면 됨.   
	    
	    // ** Math.ceil(c) : 매개변수 c 보다 크면서 같은 가장 작은 정수를 double 형태로 반환 
	    //                   ceil -> 천장, 예) 11/3=3.666..  -> 4
	    // => Math.ceil(12.345) => 13.0      
		this.epageNo = (int)Math.ceil(cri.getCurrPage()/(double)displayPageNo)*displayPageNo;
		this.spageNo = (this.epageNo - displayPageNo) + 1;
		// => 요청받은 currPageNo 11 인 경우 epageNo -> (int)Math.ceil( 11 / 3 ) * 3 = 12
		// 								 spageNo -> 12 - 3 + 1 = 10 -> 결론은 11은 10, 11, 12 블럭에 속함
		
		// 3.2) lastPageNo 계산 & ePageNo의 적합성 
		this.lastPageNo = (int)Math.ceil(this.totalRowsCount/(double)cri.getRowsPerPage());
		if(this.epageNo > this.lastPageNo) this.epageNo = this.lastPageNo;
		
		// 3.3) prev, next
		prev = this.spageNo == 1 ? false : true;
		next = this.epageNo == this.lastPageNo ? false : true; 
		
	} // calcData
	
	
	// 4) QueryString 자동 만들기
	// ** 패키지 org.springframework.web.util
	// => 웹개발에 필요한 많은 유틸리티 클래스 제공
	// => UriComponents , UriComponentsBuilder
	//     Uri를 동적으로 생성해주는 클래스,
	//     파라미터가 조합된 uri를 손쉽게 만들어줌
	// => ?currPage=7&rowsPerPage=10 이것을 만들어줌
	//     ? 부터 만들어지므로 jsp Code에서 ? 포함하지 않도록 주의    
	
	
	// => mappingName을 앞쪽에 추가함
	
	// ** ver01
	// => QueryString 자동생성 
	//    bPageList?currPage=4&rowsPerPage=3
	//    또는 bcheckList?currPage=4&rowsPerPage=3
	public String makeQuery(int currPage) {
	UriComponents uriComponents = UriComponentsBuilder.newInstance()
			.queryParam("currPage", currPage)
			.queryParam("rowsPerPage", cri.getRowsPerPage())
			.build();
		
		return this.mappingName + uriComponents.toString();
	} // makeQuery
	
	// ** ver02
	// => makeQuery + search 조건 추가 (Paging 시에도 조건이 유지되도록 해줘야함)
	// => ?curPage=1&rowsPerPage=5&searchType=title&keyword=Java
	
	// ** 배열Type check 처리 : Map 으로처리
	// => ?curPage=1&rowsPerPage=5&searchType=t&keyword=Java&check=admin&check=banana
	//    위의 쿼리스트링에서 check 부분은 몇개일지 모름
	// => UriComponents 에서 Multi Value 처리 :  queryParams(MultiValueMap<String, String> params) 
	   
    // ** MultiValueMap
    // => 키의 중복이 허용됨 즉, 하나의 키에 여러 값을 받을 수 있음
    // => new LinkedMultiValueMap() 으로 생성, add("key","value")
    
    // ** Map (키중복 허용안됨) 과 비교 
    // => HashMap : 순서보장 안됨 
    // => TreeMap : key값 순서로 자동정렬
    // => LinkedHashMap : 입력순서보장
	public String searchQuery(int currPage) {
	      // ** check 처리 
	      // => 배열 -> MultiValueMap 으로 -> UriComponents 의 queryParams에 적용
	      // => MultiValueMap 생성
		MultiValueMap<String, String> checkMap = new LinkedMultiValueMap<String, String>();
		
		// => check에 선택값이 있는경우에만
		//    배열 check의 원소들을 checkMap 으로
		if( cri.getCheck() != null &&  cri.getCheck().length > 0 ) {
			for( String c : cri.getCheck()) {
				checkMap.add("check", c);
			}
		} else checkMap = null;
		
		UriComponents uriComponents = 
				UriComponentsBuilder.newInstance()
				.queryParam("currPage", currPage)
				.queryParam("rowsPerPage", cri.getRowsPerPage())
				.queryParam("searchType", cri.getSearchType())
				.queryParam("keyword", cri.getKeyword())
				.queryParams(checkMap)
				.build();
		
		return this.mappingName + uriComponents.toString();
	} // searchQuery
	
	
	
} // class
