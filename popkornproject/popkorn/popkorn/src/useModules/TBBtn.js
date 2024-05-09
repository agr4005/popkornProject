import React, { useState, useEffect } from 'react';

const TBBtn = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      // 스크롤 위치에 따라 isVisible 상태 변경
      setIsVisible(!(scrollY === 0 || scrollY >= documentHeight - windowHeight));
    };

    window.addEventListener('scroll', handleScroll);

    // 초기 렌더링 시 bottomBtn이 보이도록 설정
    setIsVisible(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 처음 한 번만 실행

  const handleTopClick = () => {
    // scrollY 0으로 이동
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // topBtn 클릭 시 bottomBtn이 보이도록 상태 업데이트
    setIsVisible(true);
  };

  const handleBottomClick = () => {
    // 문서의 최 하단으로 이동
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });

    // bottomBtn 클릭 시 topBtn이 보이도록 상태 업데이트
    setIsVisible(true);
  };

  return (
    <div className={`TBBtn_wrap ${isVisible ? 'visible' : ''}`}>
      <div className={`topBtn ${isVisible ? '' : 'hidden'}`} onClick={handleTopClick}>
        <i className='xi-angle-up-min'></i>
      </div>
      <div className={`bottomBtn ${isVisible ? '' : 'hidden'}`} onClick={handleBottomClick}>
        <i className='xi-angle-down-min'></i>
      </div>
    </div>
  );
};

export default TBBtn;