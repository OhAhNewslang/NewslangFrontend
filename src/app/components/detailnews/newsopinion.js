"use client";
import { useEffect, useState } from "react";
import CalculateLikeCount from "@/app/utils/likecount";

export default function NewsOpinion() {
  let [opinions, setOpinionData] = useState([]);
  let [newComment, setNewComment] = useState("");
  let [opinionRecommendState, setOpinionRecommendState] = useState({});
  let [opinionOrderbyState, setOpinionOrderbyState] = useState("like");

  useEffect(() => {
    RequestOpinions(opinionOrderbyState);
  }, []);

  const RequestOpinions = (orderbyState) => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }

    fetch(
      `/api/opinions/news/${orderbyState}?page=${1}&limit=${10}&newsUrl=${newsUrl}`,
      {
        method: "GET",
        headers: {
          "X-AUTH-TOKEN": token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // setOpinionOrderbyState(orderby);
        setOpinionOrderbyState(orderbyState);
        setOpinionData(data.opinions);
        data.opinions.map((opinion) => {
          setOpinionRecommendState((prevState) => {
            return {
              ...prevState,
              [opinion.opinionId]: opinion.recommend,
            };
          });
        });
      });
  };

  const AddComment = () => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
      var newsUrl = window.localStorage.getItem("newsUrl");
    }
    const opinionContent = document.getElementById("opinion_contents").value;

    fetch(`/api/opinions`, {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newsUrl, opinionContent }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpinionData([...opinions, data.opinion]);
        setOpinionRecommendState((prevState) => {
          return {
            ...prevState,
            [data.opinion.opinionId]: data.opinion.recommend,
          };
        });
        setNewComment("");
      });
  };

  const updateOpinion = (opinionId, newRecommend) => {
    const updatedOpinions = opinions.map((opinion) => {
      if (opinion.opinionId === opinionId) {
        var updatedOpinion = opinion;
        var newCnt = CalculateLikeCount(
          opinion.recommend,
          newRecommend,
          updatedOpinion.likeCount
        );
        updatedOpinion.likeCount = newCnt;
        updatedOpinion.recommend = newRecommend;
        return { ...opinion, ...updatedOpinion };
      }
      return opinion;
    });

    setOpinionData(updatedOpinions);
    setOpinionRecommendState((prevState) => {
      return {
        ...prevState,
        [opinionId]: newRecommend,
      };
    });
  };

  const LikeOpinionClick = (opinionId) => {
    var status = "LIKE";
    if (opinionRecommendState[opinionId] == status) status = "NONE";
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
    }

    fetch("/api/recommends/opinions", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opinionId, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateOpinion(opinionId, status);
      });
  };

  const DislikeOpinionClick = (opinionId) => {
    var status = "DISLIKE";
    if (opinionRecommendState[opinionId] == status) status = "NONE";
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
    }

    fetch("/api/recommends/opinions", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opinionId, status }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateOpinion(opinionId, status);
      });
  };

  const RemoveOpinionClick = (opinionId) => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
    }

    fetch(`/api/opinions`, {
      method: "DELETE",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      //전송할 데이터 json으로 변환해서 body에 넣어줌
      body: JSON.stringify({ opinionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpinionData(opinions.filter((item) => item.opinionId !== opinionId));
      });
  };

  const MakeOpinionRecommendButton = (opinion) => {
    if (opinion.modifiable) {
      return (
        <table className="tableTypeBtn">
          <colgroup>
            <col style={{ width: "50%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <button className="btnUnselBlue wid90">
                  좋아요 {opinion.likeCount}
                </button>
              </td>
              <td>
                <button
                  className="btnRed wid90"
                  onClick={() => RemoveOpinionClick(opinion.opinionId)}
                >
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      var likeBtnClassName = "btnBlue wid90";
      var disLikeBtnClassName = "btnRed wid90";
      if (opinion.recommend == "LIKE") {
        disLikeBtnClassName = "btnUnselRed wid90";
      } else if (opinion.recommend == "DISLIKE") {
        likeBtnClassName = "btnUnselBlue wid90";
      } else if (opinion.recommend == "NONE") {
        disLikeBtnClassName = "btnUnselRed wid90";
        likeBtnClassName = "btnUnselBlue wid90";
      }

      return (
        <table className="tableTypeBtn">
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <button
                  className={likeBtnClassName}
                  onClick={() => LikeOpinionClick(opinion.opinionId)}
                >
                  좋아요 {opinion.likeCount}
                </button>
              </td>
              <td>
                <button
                  className={disLikeBtnClassName}
                  onClick={() => DislikeOpinionClick(opinion.opinionId)}
                >
                  싫어요
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  const MakeOpinionOrderbyButton = () => {
    var likeClassName = "btnLight mr5";
    var recentClassName = "btnLight";

    if (opinionOrderbyState === "like") {
      likeClassName = "btnSelLight mr5";
      recentClassName = "btnLight";
    } else if (opinionOrderbyState === "recent") {
      likeClassName = "btnLight mr5";
      recentClassName = "btnSelLight";
    }

    return (
      <div className="left">
        <button
          type="button"
          className={likeClassName}
          onClick={() => {
            RequestOpinions("like");
          }}
        >
          공감순
        </button>
        <button
          type="button"
          className={recentClassName}
          onClick={() => {
            RequestOpinions("recent");
          }}
        >
          최신순
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="floatBox mt10 mb10">
        <textarea
          className="h100"
          id="opinion_contents"
          name=""
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="fr">
          <button
            type="button"
            className="btnGray wid90"
            onClick={() => AddComment()}
          >
            의견 등록
          </button>
        </div>
      </div>

      <div className="floatBox mt10 mb10">{MakeOpinionOrderbyButton()}</div>

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
            <th>의견 내용</th>
            <th>작성일</th>
            <th>공감</th>
          </tr>
        </thead>
        <tbody>
          {opinions.map((opinion, index) => {
            return (
              <tr key={opinion.opinionId}>
                <td>{index + 1}</td>
                <td>{opinion.memberName}</td>
                <td>{opinion.opinionContent}</td>
                <td>{opinion.opinionCreateDate}</td>
                <td>{MakeOpinionRecommendButton(opinion)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}