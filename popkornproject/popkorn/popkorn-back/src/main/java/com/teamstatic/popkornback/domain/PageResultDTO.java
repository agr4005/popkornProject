package com.teamstatic.popkornback.domain;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import lombok.Data;

//** PageList 결과 처리 DTO
//=> JPA를 사용하는 Repository에서는 Page 처리결과를 
//   Page<Entity> Type으로 return하기 때문에 서비스계층에서 
//   이를 처리할 수 있도록 하는 DTO클래스가 필요함.
//=> 주요기능
// - Page<Entity> 객체들을 DTO 객체로 변환해서 List에 담아줌
// - 화면출력을 위한 페이지 정보들 구성

//** Function <T, R> 
//=> T type 입력받아 R type return
//=> FunctionalInterface ( Java01, j17_Lamda 참고 )

//** Collection 계층도
//=> Collection (i) -> List (i) -> ArrayList (c)  
//=> Collections
// - Collection 들의 WrapperClass
// - Collection 과 관련된 편리한 메서드를 제공 -> Collections.sort(List<T> list)

//** interface Collector
//=> 스트림의 collect() 메서드에서 사용될 메서드를 정의해놓은 인터페이스
//=> 이를 구현한 클래스가 Collectors 임.
//=> https://blog.naver.com/writer0713/221806454412

//** IntStream
//=> Java 8에서 추가된 Stream Interface의 한 종류
//=> int 형식의 요소들을 처리하기 위한 메소드들을 제공하며, 
//  int 배열의 요소를 합산하거나, 필터링하거나, 매핑하는 기능을 지원한다.
//=> 기본자료형 int 형식의 연산에 최적화 되어있어 성능적으로 이점을 가진다.

@Data
public class PageResultDTO<DTO, EN> {
	// => 제네릭에서 명시적으로 DTO, Entity 타입을 지정해줌
	
	// DTO List
	private List<DTO> dtoList;
	
	// 총 PageNo
	private int totalPage;
	
	// 현재 요청받은 출력 페이지와 그 row 수
	private int page;
	private int size;
	
	// 첫페이지, 마지막페이지, 앞 페이지로가기, 뒷 페이지로가기
	private int start, end;
	private boolean prev,next;

	// 출력해야할 PageNo 의 목록
	private List<Integer> pageList;

    private long dashboard1;
    private long dashboard2;
    private long dashboard3;
    private long dashboard4;

	
	//** 생성자
    //=> Page<EN> type 을 이용해 최종 List<DTO> 생성 
    //=> Function<EN, DTO> : Entity 객체들을 DTO로 변환
    public PageResultDTO(Page<EN> result, Function<EN,DTO> fn){
       

        dtoList = result.stream().map(fn).collect(Collectors.toList());
        //=> stream()
        //   - 배열, 컬렉션등을 대상으로하여 스트림을 생성해줌
        //   - 스트림은 forEach(), filter(), sum(), map() 등 다양한 연산을 할수있는 메서드 제공   
        //=> map(fn)
        //   - 스트림 요소 중에서 원하는 필드만 뽑아내거나, 특정 형태로 변환해야 할 때 사용
        //   - fn : Function 은 제네릭 타입으로 들어온 인자들로 변환한다라는 개념 
        //   - Entity 객체들을 DTO로 변환
        //=> collect()
        //   - 스트림의 요소들을 수집하는 최종연산 (최종함수 : 최종적인 결과물을 반환하고 더 이상 체이닝이 안됨)
        //   - Collectors 클래스의 toList(): 스트림의 모든 요소를 List 로 수집 

        totalPage = result.getTotalPages();

        makePageList(result.getPageable());
    } // Generator 


    private void makePageList(Pageable pageable){

        this.page = pageable.getPageNumber() + 1; // 0부터 시작하므로 1을 추가
        this.size = pageable.getPageSize();

        //temp end page
        int tempEnd = (int)(Math.ceil(page/5.0)) * 5;

        start = tempEnd - 4;

        prev = start > 1;

        end = totalPage > tempEnd ? tempEnd: totalPage;

        next = totalPage > tempEnd;

        pageList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
        //=> IntStream : 기본자료형 int 형식의 연산에 최적화되어 있는 스트림 인터페이스
        //=> rangeClosed() : start ~ end 까지 즉, 종료값 포함 return 
        //=> boxed() : 숫자(int) 스트림을 일반스트림(객체형) 으로 변환
    } // makePageList
    
}
