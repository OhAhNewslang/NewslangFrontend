"use client";
import { SUBRESOURCE_INTEGRITY_MANIFEST } from "next/dist/shared/lib/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RootLayout({ children }) {
  if (typeof window !== "undefined") {
    var token = window.localStorage.getItem("token");
  }
  var [Media, setMediaList] = useState([]);
  let [Category, setCategoryList] = useState([]);

  // 데이터 관리 + 리랜더링
  // useState 는 비동기 처리때문에 데이터 즉시 변경 안됨
  // useState 없으면 checkbox 갱신이 안됨
  // useRef 혼합 사용
  // 더 좋은 방법은 to do...
  let [subMedia, setSubMediaList] = useState([]);
  let [subCategory, setSubCategoryList] = useState([]);
  let [subKeword, setSubKeywordList] = useState([]);

  let currentSubsMedia = useRef([]);
  let currentSubsCategory = useRef([]);

  useEffect(() => {
    getSubscribeList();
    getMemberSubscribe();
  }, []);

  // useEffect(()=>
  // {
  //   postSubscribeMedia();
  // },[subMedia])

  // useEffect(()=>
  // {
  //   postSubscribeCategory();
  // },[subCategory])

  // 전체 언론사, 카테고리 요청
  const getSubscribeList = () => {
    fetch("/api/subscribe/guest/media", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMediaList(data.mediaList);
      });
    fetch("/api/subscribe/guest/category", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data.nameList);
      });
  }

  // 사용자 구독 정보 요청
  const getMemberSubscribe = () => {
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem("token");
    }
    fetch("/api/subscribe/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        currentSubsMedia.current = data.mediaList;
        currentSubsCategory.current = data.categoryList;
        setSubMediaList(data.mediaList);
        setSubCategoryList(data.categoryList);
        setSubKeywordList(data.keywordList);
      });
  }

  // 언론사 체크 박스 클릭
  const onClickMediaCheckbox = (e) => {
    if (e.checked) {
        currentSubsMedia.current.push(e.value);
        setSubMediaList([...subMedia, e.value]);
    } else {
        currentSubsMedia.current = currentSubsMedia.current.filter((item) => item !== e.value);
        setSubMediaList(subMedia.filter((item) => item !== e.value));
    }
    fetch("/api/subscribe/media", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameList: currentSubsMedia.current,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  // 카테고리 체크 박스 클릭
  const onClickCategoryCheckbox = (e) => {
    if (e.checked) {
      currentSubsCategory.current.push(e.value);
      setSubCategoryList([...subCategory, e.value]);
    } else {
      currentSubsCategory.current = currentSubsCategory.current.filter((item) => item !== e.value);
      setSubCategoryList(subCategory.filter((item) => item !== e.value));
    }
    fetch("/api/subscribe/category", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameList: currentSubsCategory.current,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  }

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

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "35%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>사진</th>
              <th>언론사</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {Media.map((media) => {
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
                      checked={currentSubsMedia.current.includes(media.mediaName)}
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

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: "70%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>주제</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {Category.map((category) => {
              return (
                <tr key={category}>
                  <td>{category}</td>
                  <td>
                    <input
                        type="checkbox"
                        value={category}
                        checked={currentSubsCategory.current.includes(category)}
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

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: "70%" }} />
            <col style={{ width: "30%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>키워드</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {subKeword.map((keyword) => {
              return (
                <div>
                  <tr>
                    <td>{keyword}</td>
                    <td>
                      <input type="checkbox"></input>
                    </td>
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
