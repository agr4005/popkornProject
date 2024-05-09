package com.teamstatic.popkornback.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.teamstatic.popkornback.domain.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="user")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
public class User {
    
    @Id
    private String id;

    private String password;
    private String nickname;
    private int reword;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreationTimestamp
    private LocalDateTime createdate;
    
    public void setCreatedate(LocalDateTime createdate) {
        this.createdate = createdate;
    }

    private String status;
    
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<UserRole> roleList = new ArrayList<>();
	// => JPA는 member_role_list 라는 이름의 Child Table 을 찾음
	//	- JPA 의 DB 표기법 : Entity명_카멜표기의 대문자는_로  
	//	- 없으면 최초실행시 자동 생성시켜줌 (단, application.properties 설정에서 허용시)
	//	- 부모 엔티티인 member 와 Foreign 관계 설정됨. 
	//	- DemoJpaApplicationTests.java Test 코드 참고
	public void addRole(UserRole userRole){
		roleList.add(userRole);
	}

	public void clearRole(){
		roleList.clear();
	}
	
	// => JWT token 발행시 사용됨
	public Map<String, Object> claimList() {
	    Map<String, Object> dataMap = new HashMap<>();
	    dataMap.put("userId", this.id);
	    //dataMap.put("pw",this.password);
	    dataMap.put("roleList", this.roleList);

	    return dataMap;
	}

}

