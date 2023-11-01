"use client";
import { useEffect, useState } from "react";
import CalculateLikeCount from "@/app/utils/likecount";

export default function NewsContents() {
  let [detailNews, setDetailNews] = useState({});
  let [scrapStatus, setScrapStatus] = useState(Boolean);
  let [newsRecommendState, setNewsRecommendState] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      RequestDetailNews();
    }
  }, []);

  const RequestDetailNews = () => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }
    fetch(`/api/news/detail?newsUrl=${newsUrl}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDetailNews(data.detailNews);
        setScrapStatus(data.detailNews.scrap);
        setNewsRecommendState(data.detailNews.recommend);
      });
  };

  const ImageLazyLoading = () => {
    useEffect(() => {
      const imgs = document.querySelectorAll("img");
      imgs.forEach((img) => {
        if (img.className == "_LAZY_LOADING") {
          img.src = img.dataset.src;
        }
      });
    });
  };

  const ScrapButton = (scrap) => {
    if (scrap) {
      return (
        <button className="btnRed wid90" onClick={() => ScrapClick(false)}>
          찜 취소하기
        </button>
      );
    } else {
      return (
        <button className="btnBlue wid90 mr10" onClick={() => ScrapClick(true)}>
          찜하기
        </button>
      );
    }
  };

  const ScrapClick = (scrap) => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }

    fetch("/api/scrap/news", {
      method: scrap ? "POST" : "DELETE",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      //전송할 데이터 json으로 변환해서 body에 넣어줌
      body: JSON.stringify({ newsUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        setScrapStatus(scrap);
      });
  };

  const MakeNewsRecommendButton = (recommend) => {
    var likeBtnClassName = "btnBlue wid90 mr10";
    var disLikeBtnClassName = "btnRed wid90 mr10";
    if (recommend == "LIKE") {
      disLikeBtnClassName = "btnUnselRed wid90 mr10";
    } else if (recommend == "DISLIKE") {
      likeBtnClassName = "btnUnselBlue wid90 mr10";
    } else if (recommend == "NONE") {
      disLikeBtnClassName = "btnUnselRed wid90 mr10";
      likeBtnClassName = "btnUnselBlue wid90 mr10";
    }

    return (
      <div className="fl">
        <button
          type="button"
          className={likeBtnClassName}
          onClick={() => NewsRecommendClick("LIKE")}
        >
          좋아요 {detailNews.likeCount}
        </button>
        <button
          type="button"
          className={disLikeBtnClassName}
          onClick={() => NewsRecommendClick("DISLIKE")}
        >
          싫어요
        </button>
      </div>
    );
  };

  const NewsRecommendClick = (recommend) => {
    if (newsRecommendState == recommend) recommend = "NONE";
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }

    var status = recommend;

    fetch("/api/recommends/news", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsUrl, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        var newCnt = CalculateLikeCount(
          detailNews.recommend,
          recommend,
          detailNews.likeCount
        );
        detailNews.likeCount = newCnt;
        detailNews.recommend = recommend;
        setDetailNews(detailNews);
        setNewsRecommendState(status);
      });
  };

  return (
    <table className="tableTypeBoard2">
      <colgroup>
        <col style={{ width: "13%" }} />
        <col style={{ width: "60%" }} />
        <col style={{ width: "10%" }} />
        <col style={{ width: "17%" }} />
      </colgroup>
      <tbody>
        <tr>
          <th>제목</th>
          <td className="bold">{detailNews.title}</td>
          <th>작성일</th>
          <td>{detailNews.postDateTime}</td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{detailNews.reporter}</td>
          <th>언론사</th>
          <td>{detailNews.media}</td>
        </tr>
        <tr>
          <th>기사링크</th>
          <td>
            <a href={detailNews.url}>{detailNews.url}</a>
          </td>
          <th>관심</th>
          <td>{ScrapButton(scrapStatus)}</td>
        </tr>
        <tr>
          <th>공감</th>
          <td colSpan="3">
            <div className="floatBox">
              {MakeNewsRecommendButton(newsRecommendState)}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="4" className="viewBox">
            <div
              onLoad={ImageLazyLoading()}
              dangerouslySetInnerHTML={{
                __html: `${detailNews.contents}`,
              }}
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
