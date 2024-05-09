package com.teamstatic.popkornback.common;

import lombok.Getter;
import lombok.ToString;

//** Criteria : (판단이나 결정을 위한) 기준
//=> 출력할 Row 를 select 하기 위한 클래스
//=> 이것을 위한 기준 값들을 관리

//** PageMaker : UI에 필요한 정보 완성

//** Paging 을 하려면 ... **
//=> 1Page에 출력할 Row 갯수 :  5개
//=> 현재 출력(요청) Page
//=> 출력할 List (Rows) 
// -> start Row 순서번호 : 계산필요
//=> Criteria Class 에 정의 

//=> 1Page 출력 PageNo 갯수 : 10개
// -> PageBlock 의 First Page No 
// -> PageBlock 의 Last Page No
// -> 전진, 후진 표시여부
// -> go 전체의 First Page 표시여부
// -> go 전체의 Last Page 표시여부
//=> PageMaker Class 로 처리 


@Getter
@ToString
public class Criteria {
	
	private int rowsPerPage; // 페이지당 출력할 row의 수
	private int currPage; // 요청받은 출력할 page 번호
	private int sno; // Start no. 페이지에 해당하는 첫번째 row의 번호 (계산 필요)
	private int eno; // End no. 페이지에 해당하는 마지막 row의 번호 (계산 필요 => Oracle 만 필요함, mysql은 limit이 있기 때문에 필요없음)
	
	
	// 1) 기본 생성자 : 필드값 초기화
	public Criteria() {
		this.rowsPerPage = 5;
		this.currPage = 1;
	}
	
	// 2) 요청시 값 갱신
	// 2.1) currentPage
	public void setCurrPage(int currPage) {
		if(currPage>1) this.currPage = currPage;
		else this.currPage = 1;
	}
	
	// 2.2) rowsPerPage
	// => 1페이지당 보여줄 Row(Record,튜플) 갯수 확인
	// => 제한조건 점검 ( 50개 까지만 허용)
	// => 당장은 사용하지 않지만 사용가능하도록 작성
	public void setRowsPerPage(int rowsPerPage) {
		if(rowsPerPage>5 && rowsPerPage <= 50) {
			this.rowsPerPage = rowsPerPage;
		} else this.rowsPerPage = 5;
	}
	
	// 2.3) setSnoEno : sno, eno 계산
	public void setSnoEno() {
		if(this.sno < 1) this.sno = 1;
		this.sno = (this.currPage-1)*this.rowsPerPage; // mysql의 limit 사용시 limit에 지정한 숫자값 다음까지라서 +1을 안함
		// => MySql : limit 5,5 (6번째_5개를 건너뛰고 부터 5개)
		// => Oracle : BETWEEN 6 AND 10
		//			   this.sno = (this.currPage-1)*this.rowsPerPage + 1;
		//			   this.eno = this.sno + this.rowsPerPage - 1;
	}
	
	
} // class
