'use client'
import React, { useState, useEffect } from 'react';

const ScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoreData = () => {
    // API를 호출하여 데이터를 가져오는 로직 구현 , subnews 데이터 
    const newItem = `Item ${items.length + 1}`;

    setTimeout(() => {
      setItems([...items, newItem]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    // 스크롤이 페이지 하단에 도달하면 추가 데이터를 가져옴
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setIsLoading(true);
      fetchMoreData();
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []); // 페이지가 로드될 때 초기 데이터를 가져옴

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {isLoading && <h4>Loading...</h4>}
    </div>
  );
};

export default function Home() {

  let newsimage = "images/userImg.jpg"
  let newsname = ["테스트1", "테스트2","테스트3","테스트4","테스트5","테스트1", "테스트2","테스트3","테스트1"]
  let newscom = ["한국경제","동아일보","중앙일보","중앙일보","언론사"]
  return (
    <div className="wrapex">

      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#구독</h3>
        </div>

        <div className="tableWrap2">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{width:'20%'}}/>
              <col style={{width:'65%'}}/>
              <col style={{width:'15%'}}/>

            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            
            {
              newsname.map( (a,i) => {
                return(
                <tbody>  
                <tr>
                  <td><img src={newsimage} alt="사용자 기본 이미지" /></td>
                  <td className="tl">
                      <a href="view">{newsname[i]}</a>
                  </td>
                  <td>{newscom[i]}</td>
                </tr>
                
                </tbody>
                )
              }) 
              
            }
           
        
          </table>
        </div>

        <ScrollComponent />
     </div>
     

     <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#최신 뉴스</h3>
        </div>

        <div className="tableWrap">
        <table className="tableTypeBoard">
            <colgroup>
              <col style={{width:'20%'}}/>
              <col style={{width:'65%'}}/>
              <col style={{width:'15%'}}/>

            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">[속보] 상봉역서 승객 찌르고 도주한 '흉기 난동' 20대 남성 체포</a></td>
                <td>강원일보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">러, 윤 대통령 유엔총회 연설에 "양국 관계 심각한 손상"</a></td>
                <td>부산일보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">“왜 어깨 부딪혀” 상봉역서 70대 찌른 20대 체포</a></td>
                <td>서울신문</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">2023 국감일정 확정…10월10일 방통위·방심위, 17일 KBS</a></td>
                <td>기자협회보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">신문협회 "네이버·카카오, 생성형 AI 뉴스 이용기준 즉답 회피"</a></td>
                <td>기자협회보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">두산로보틱스, 청약 증거금 33조원…올해 IPO 최대치 경신</a></td>
                <td>머니투데이</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">충북대교통대 통합 '물살'…학생 설득은 과제</a></td>
                <td>충천일보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">실종 美스텔스기, 혼자 100㎞ 날았다...탈출 조종사도 …</a></td>
                <td>조선일보</td>
              </tr>
              <tr>
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지"/></td>
                <td className="tl"><a href="">사라진 조민 유튜브 영상…"정부 법적 신고로 금지"</a></td>
                <td>노컷뉴스</td>
              </tr>
              
              
            </tbody>

            
          </table>
        </div>
     </div>
  
    </div> //wrap


  )
}