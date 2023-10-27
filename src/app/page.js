"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { headers } from "../../next.config";
import { useEffect, useState } from "react";

export default function Home() {
  let [subThumbnailNewsList, setSubThumbnailNews] = useState([]);
  let [liveThumbnailNewsList, setLiveThumbnailNews] = useState([]);

  // //구독뉴스가져오기
  // getliveData(1, 10);
  // async function getliveData(page, limit) {
  //   if (typeof window !== "undefined") {
  //     var token = window.localStorage.getItem('token');
  //   }
  //   fetch(`/api/news/subscribe/live/${page}/${limit}`, {
  //     method: "GET",
  //     headers: {
  //       'X-AUTH-TOKEN': token
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setSubThumbnailNews(data.thumbnailNewsList);
  //     });
  // }

  useEffect(() => {
    getLiveData(1, 10);
  }, []);

  const getLiveData = async (page, limit) => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
    }
    fetch(`/api/news/guest/live?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiveThumbnailNews(data.thumbnailNewsList);
      });
  };

  return (
    <div className="wrapex">
      <div className="wrap2">
        <div className="contentTitleBox">
          <h3>#구독</h3>
        </div>

        <div className="tableWrap2">
          <table className="tableTypeBoard">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "65%" }} />
              <col style={{ width: "15%" }} />
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
                <td>
                  <img src="images/userImg.jpg" alt="사용자 기본 이미지" />
                </td>
                <td className="tl">
                  <a href="view">
                    [SC현장] "강동원이라는 피사체"…'천박사' 강동원표 판타지,
                    장르가 되다(종합)
                  </a>
                </td>
                <td>스포츠조선</td>
              </tr>

              {subThumbnailNewsList.map((news) => {
                return (
                  <tr>
                    <td>
                      <img src={news.imagePath} alt="사용자 기본 이미지" />
                    </td>
                    <td className="tl">
                      <button
                        href={"/view"}
                        onClick={() => {
                          localStorage.setItem(
                            "newsUrl",
                            JSON.stringify(news.url)
                          );
                        }}
                      >
                        {news.title}
                      </button>
                      {/* <a href={`/view?newUrl=${news.url}`}>{news.title}</a> */}
                      {/* localStorage에 저장,, */}
                      {/* <Link onClick={localStorage.setItem("newsUrl", JSON.stringify(news.url))}> href={{ pathname: JSON.stringify(news.url) }} */}
                    </td>
                    <td>{news.media}</td>
                  </tr>
                );
              })}
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
              <col style={{ width: "20%" }} />
              <col style={{ width: "65%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>사진</th>
                <th>제목</th>
                <th>언론사</th>
              </tr>
            </thead>
            <tbody>
              {liveThumbnailNewsList.map((news, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={news.imagePath} alt="사용자 기본 이미지" />
                    </td>
                    <td className="tl">
                      {/* <Link href={`/view?newsUrl=${news.url}`}>
                        <a onClick={() => { localStorage.setItem("newsUrl", JSON.stringify(news.url)) }}>
                          {news.title}
                        </a>
                      </Link> */}

                      <a
                        href={`/view?newsUrl=${news.url}`}
                        onClick={() =>
                          localStorage.setItem("newsUrl", news.url)
                        }
                      >
                        {news.title}
                      </a>
                      {/* localStorage에 저장,, */}
                      {/* <Link onClick={localStorage.setItem("newsUrl", JSON.stringify(news.url))}> href={{ pathname: JSON.stringify(news.url) }} */}
                    </td>
                    <td>{news.media}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
