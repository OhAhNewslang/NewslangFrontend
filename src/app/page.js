'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { headers } from "../../next.config";
import { useEffect, useState } from "react";


export default function Home() {
  let [subThumbnailNewsList, setSubThumbnailNews] = useState([])
  let [liveThumbnailNewsList, setLiveThumbnailNews] = useState([])

  useEffect(() => {
    //로컬스토리지에 저장되어 있는 토큰 받아오기
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem('token');
    }

    // //구독뉴스 api호출
    // fetch('/api/news/subscribe', {
    //   method: 'GET',
    //   headers: {
    //     'X-AUTH-TOKEN': token,
    //     'page': 1,
    //     'limit': 10
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setSubThumbnailNews(data.thumbnailNewsList);
    //     // setPageSource(data.pageSource);
    //     // setResult(data.result);
    //   });

    //최신뉴스 api호출
  const page = 1;
  const limit = 10;
  // fetch(`/api/news/guest/live?page=${page}&limit=${limit}`, {method: 'GET'})
  fetch('/api/news/live', {method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setLiveThumbnailNews(data.thumbnailNewsList);
        // setPageSource(data.pageSource);
        // setResult(data.result);
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
                subThumbnailNewsList.map((news) => {
                  return (
                    <div>
                      <tr>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl">
                          {/* localStorage에 저장,, */}
                          <Link onClick={localStorage.setItem("newsUrl", JSON.stringify(news.url))}> href={{ pathname: JSON.stringify(news.url) }}
                            {news.title}</Link></td>
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
                liveThumbnailNewsList.map((news, index) => {
                  return (
                      <tr>
                        <td><img src={news.imagePath} alt="사용자 기본 이미지" /></td>
                        <td className="tl">{news.title}</td>
                        <td>{news.media}</td>
                      </tr>
                  );
                })
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}