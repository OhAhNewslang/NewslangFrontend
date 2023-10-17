'use client'
import { useEffect, useState } from "react";


export default function Home() {
  let [subnews, setsubData] = useState([])
  let [livenews, setliveData] = useState([])

  useEffect(() => {
    //로컬스토리지에 저장되어 있는 토큰 받아오기
    if (typeof window !== "undefined") {
      var token = JSON.parse(window.localStorage.getItem('token'));
    }
    //구독뉴스 api호출
    fetch('/api/news/subscribe', {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then(function (res) {
        // 요청에 대한 응답을 JSON형태로 파싱
        return res.json();
      })
      .then(function (json) {
        const subnews = json.body.json();
        setsubData(subnews)
      });

    //최신뉴스 api호출
    fetch('/api/news/live?page=~', {
      method: 'GET',
      headers: {
        Authorization: token
      }
    })
      .then(function (res) {
        // 요청에 대한 응답을 JSON형태로 파싱
        return res.json();
      })
      .then(function (json) {
        const livenews = json.body.json();
        setliveData(livenews)
      });
  }, [])

  return (
    <div className="wrapex">
      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#구독</h3>
        </div>

        <div className="tableWrap2">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '65%' }} />
              <col style={{ width: '15%' }} />

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
                <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
                <td className="tl"><a href="view">[SC현장] "강동원이라는 피사체"…'천박사' 강동원표 판타지, 장르가 되다(종합)</a></td>
                <td>스포츠조선</td>
              </tr>

              {
                subnews.map((news) => {
                  return (
                    <div>
                      <tr>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl"><a href={news.url}>{news.title}</a></td>
                        <td>{news.media}</td>
                      </tr>
                    </div>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>

      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#최신 뉴스</h3>
        </div>
        <div className="tableWrap">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '65%' }} />
              <col style={{ width: '15%' }} />

            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            <tbody>

              {
                livenews.map((news) => {
                  return (
                    <div>
                      <tr>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl"><a href={news.url}>{news.title}</a></td>
                        <td>{news.media}</td>
                      </tr>
                    </div>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}
