"use client";
"use strict";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login(request) {
  let [newscontents, setNewsData] = useState([]);
  let [Opinions, setOpinionData] = useState([]);

  useEffect(() => {
    getViewData();
    getOpinion();
  }, []);

  const getViewData = async () => {
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
        setNewsData(data);
      });
  };

  const getOpinion = async () => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }
    //더미데이터로 조회확인
    fetch(`/api/opinions/news/like?page=${1}&limit=${10}&newsUrl=http://dummyUrl2:8080`, {
    // fetch(`/api/opinions/news/like?page=${1}&limit=${10}&newsUrl=${newsUrl}`, {
      method: "GET",
      headers: {
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpinionData(data.opinions);
      });
  };

  function AddComment() {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }
    const ctrl = document.getElementById("opinion_contents");
    console.log(ctrl);
    const opinionContent = document.getElementById("opinion_contents").value;
    console.log(opinionContent);
    fetch(`/api/opinions`, {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      //전송할 데이터 json으로 변환해서 body에 넣어줌
      body: JSON.stringify({ newsUrl, opinionContent }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpinionData(data);
      });
  }

  function ImageLazyLoading() {
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      const imgs = document.querySelectorAll("img");
      //   console.log(imgs);
      imgs.forEach((img) => {
        if (img.className == "_LAZY_LOADING") {
          img.src = img.dataset.src;
        }
      });
    });
  }

  return (
    <div className="wrap">
      {/* <div class="contentTitleBox">
                    <h3>최신</h3>
                </div> */}
      <div className="tableWrap3">
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
              <td className="bold">{newscontents.title}</td>
              <th>작성일</th>
              <td>{newscontents.postDateTime}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{newscontents.reporter}</td>
              <th>언론사</th>
              <td>{newscontents.media}</td>
            </tr>
            <tr>
              <th>기사링크</th>
              <td>
                <a href={newscontents.url}>{newscontents.url}</a>
              </td>
              <th>관심</th>
              <td>
                <button type="button" className="btnRed">
                  찜하기
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="viewBox">
                <div
                  onLoad={ImageLazyLoading()}
                  dangerouslySetInnerHTML={{
                    __html: `${newscontents.contents}`,
                  }}
                ></div>
                {/* {newscontents.contents} */}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="floatBox mt10 mb10">
          <textarea className="h100" id="opinion_contents" name=""></textarea>

          <div className="fr">
            <button
              type="button"
              className="btnGray wid90"
              onClick={() => AddComment()}
            >
              등록
            </button>
          </div>
        </div>
        <div className="floatBox mt10 mb10">
          <div className="left">
            <button type="button" className="btnLight mr5">
              공감순
            </button>
            <button type="button" className="btnLight">
              최신순
            </button>
          </div>
        </div>
        <table className="tableTypeBoard">
          <colgroup>
            <col style={{ width: "7%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
						<tr>
							<th>No.</th>
              <th>작성자</th>
							<th>댓글</th>
							<th>작성일</th>
							<th>추천수</th>
						</tr>
					</thead>
          <tbody>
            {Opinions.map((opinion, index) => {
              return (
                <tr key={opinion.opinionId}>
                  <td>{index+1}</td>
                  <td>{opinion.memberName}</td>
                  <td>{opinion.opinionContent}</td>
                  <td>{opinion.opinionCreateDate}</td>
                  <td>{opinion.likeCount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="floatBox mt10">
          <button type="button" className="btnBlue wid90 mr10">
            추천
          </button>
          <button type="button" className="btnRed wid90">
            반대
          </button>
          <div className="fr">
            <Link href="/">
              <button type="button" className="btnLight wid90">
                목록
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
