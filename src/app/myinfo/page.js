"use client";
import { SUBRESOURCE_INTEGRITY_MANIFEST } from "next/dist/shared/lib/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

export default function RootLayout({ children }) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    var token = window.localStorage.getItem("token");
  }
  var [mediaList, setMediaList] = useState([]);
  let [categoryList, setCategoryList] = useState([]);
  let [subMedia, setSubMediaList] = useState([]);
  let [subCategory, setSubCategoryList] = useState([]);
  let [subKeyword, setSubKeywordList] = useState([]);
  let [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    getMediaList();
    getCategoryList();
  }, []);

  useEffect(() => {
    getMemberSubscribe();
  }, [token]);

  // 사용자 구독 정보 요청
  function getMemberSubscribe(){
    fetch("/api/subscribe/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
    .then((res) => {
      if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
    })
     .then((data) => {
        setSubMediaList(data.mediaList);
        setSubCategoryList(data.categoryList);
        setSubKeywordList(data.keywordList);
      })
      .catch(err=>console.log(err))
  };

  // 전체 언론사, 카테고리 요청
  const getMediaList = () => {
    fetch("/api/subscribe/guest/media", {
      method: "GET",
    })
      .then((res) => {
        if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
      })
      .then((data) => {
        setMediaList(data.mediaList);
      })
      .catch(err=>console.log(err))
  };
  const getCategoryList = () => {
    fetch("/api/subscribe/guest/category", {
      method: "GET",
    })
      .then((res) => {
        if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
      })
      .then((data) => {
        setCategoryList(data.nameList);
      })
      .catch(err=>console.log(err));
  };

  // 언론사 체크 박스 클릭
  const onClickMediaCheckbox = (e) => {
    let copy = [...subMedia];
    if (e.checked) {
      copy.push(e.value);
    } else {
      copy = copy.filter((item) => item !== e.value);
    }
    setSubMediaList(copy);

    fetch("/api/subscribe/media", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameList: copy,
      }),
    })
      .then((res) => {
        if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
      })
      .then((data) => {})
      .catch(err=>console.log(err));
  };

  // 카테고리 체크 박스 클릭
  const onClickCategoryCheckbox = (e) => {
    let copy = [...subCategory];
    if (e.checked) {
      copy.push(e.value);
    } else {
      copy = copy.filter((item) => item !== e.value);
    }
    setSubCategoryList(copy);

    fetch("/api/subscribe/category", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameList: copy,
      }),
    })
      .then((res) => {
        if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
      })
      .then((data) => {})
      .catch(err=>console.log(err));
  };

    // 키워드 추가
    const onClickAddKeyword = () => {
      const opinionContent = document.getElementById("keyword_contents").value;
      let copy = [...subKeyword];
      if (!copy.includes(opinionContent)){
        copy.push(opinionContent);
        setSubKeywordList(copy);
        fetch("/api/subscribe/keyword", {
          method: "POST",
          headers: {
            "X-AUTH-TOKEN": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameList: copy,
          }),
        })
          .then((res) => {
            if (res.status == 200)
            return res.json();
          else if (res.status == 500) {
            swal({
              text: "로그인이 필요합니다.",
            });
            router.replace("/login");
          }
          })
          .then((data) => {
            setNewKeyword("");
          })
          .catch(err=>console.log(err));
        }else{
          swal({
            text: "이미 등록된 키워드입니다.",
          });
        }
    };
    
  const makeRemoveKeywordButton = (keyword) => {
    return (
      <button
        className="btnUnselRed"
        type="button"
        onClick={() => removeKeyword(keyword)}
      >
        삭제
      </button>
    );
  };
  
  //댓글 삭제
  const removeKeyword = (keyword) => {
    let copy = [...subKeyword];
    copy = copy.filter((item) => item !== keyword);
    setSubKeywordList(copy);
    fetch("/api/subscribe/keyword", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameList: copy,
      }),
    })
      .then((res) => {
        if (res.status == 200)
        return res.json();
      else if (res.status == 500) {
        swal({
          text: "로그인이 필요합니다.",
        });
        router.replace("/login");
      }
      })
      .then((data) => {
      })
      .catch(err=>console.log(err));
  };

  return (
    <div className="wrap">
      <div className="floatBox mb50">
        <div className="fr">
          <Link href="/resign">
            <button type="button" className="btnLight mr5">
              내프로필
            </button>
          </Link>
          <Link href="/myinfo">
            <button type="button" className="btnLight mr5">
              구독관리
            </button>
          </Link>
          <Link href="/like">
            <button type="button" className="btnLight mr5">
              찜한기사
            </button>
          </Link>
          <Link href="/comment">
            <button type="button" className="btnLight mr5">
              댓글관리
            </button>
          </Link>
        </div>
      </div>

      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#언론사</h3>
        </div>

        <table className="tableTypeSort scrollTable center">
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '35%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>사진</th>
              <th>언론사</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {mediaList.map((media) => {
              return (
                <tr key={media.mediaName}>
                  <td>
                    <img src={media.imagePath} />
                  </td>
                  <td>{media.mediaName}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={media.mediaName}
                      checked={subMedia.includes(media.mediaName)}
                      onChange={(e) => onClickMediaCheckbox(e.target)}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#주제</h3>
        </div>

        <table className="tableTypeSort scrollTable center">
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '55%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>주제</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) => {
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={category}
                      checked={subCategory.includes(category)}
                      onChange={(e) => onClickCategoryCheckbox(e.target)}
                    ></input>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#키워드</h3>
        </div>

        <table className="tableTypeSort scrollTable5 center">
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '55%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>키워드</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subKeyword.map((keyword, index) => {
              return (
                <tr key={index}>
                  <td>{keyword}</td>
                  <td>
                    {makeRemoveKeywordButton(keyword)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="centerBox mt20">
          <div className='mb5 tl'>키워드 추가(한개씩 추가)</div>
          <textarea 
            className="h10"
            id="keyword_contents"
            name="" 
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}></textarea>
          <div className='mb20 tr'><button type="button" className="btnRed" onClick={() => onClickAddKeyword()}>추가</button></div>
        </div>
        
      </div>
    </div>
  );
}