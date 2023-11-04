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
  let [subKeword, setSubKeywordList] = useState([]);

  useEffect(() => {
    getMediaList();
    getCategoryList();
  }, []);

  useEffect(() => {
    // 사용자 구독 정보 요청
    const getMemberSubscribe = async () => {
      fetch("/api/subscribe/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
      }).then((res)=>{
        try{
          const data = res.json();
          res.status(200).json(data);
          setSubMediaList(data.mediaList);
          setSubCategoryList(data.categoryList);
          setSubKeywordList(data.keywordList);
        }catch(err){
          if(res.status == 500){
            swal({
              text: "다시 로그인이 필요합니다.",
            });
          router.push("/login");
          }
        }
      })
      //  .then((data) => {
      //     setSubMediaList(data.mediaList);
      //     setSubCategoryList(data.categoryList);
      //     setSubKeywordList(data.keywordList);
      //   });
        // .then((res) => res.json())
        // .then((data) => {
        //   setSubMediaList(data.mediaList);
        //   setSubCategoryList(data.categoryList);
        //   setSubKeywordList(data.keywordList);
        // });
    };
    getMemberSubscribe();
  }, [token]);

  // 전체 언론사, 카테고리 요청
  const getMediaList = () => {
    fetch("/api/subscribe/guest/media", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMediaList(data.mediaList);
      });
  };
  const getCategoryList = () => {
    fetch("/api/subscribe/guest/category", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data.nameList);
      });
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
      .then((res) => res.json())
      .then((data) => {});
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
      .then((res) => res.json())
      .then((data) => {});
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
        <div className="centerBox mt20 mb20">
          <button type="button" className="btnGray">수정</button>
        </div>
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
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {subKeword.map((keyword, index) => {
              return (
                <div key={index}>
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
        <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div>

        <div className="centerBox mt20">
          <div className='mb5 tl'>키워드 추가(한개씩 추가)</div>
          <textarea class="h10" id="" name=""></textarea>
          <div className='mb20 tr'><button type="button" className="btnRed">추가</button></div>
        </div>
        
      </div>
    </div>
  );
}