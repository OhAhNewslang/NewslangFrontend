'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {

  
  let [subMedia, setMediaList] = useState([])
  let [subCategory, setCategoryList] = useState([])
  let [subKeword, setKewordList] = useState([])
  useEffect(() => {
    //로컬스토리지에 저장되어 있는 토큰 받아오기
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem('token');
    }
    //구독정보조회 api호출
    fetch("/api/subscribe/all", {
      method: "GET",
      headers: {
        'X-AUTH-TOKEN': token
      }
    })
      .then(res => res.json())
      .then(data => {
        setMediaList(data.mediaList);
        setCategoryList(data.categoryList);
        setKewordList(data.keywordList);
      });
  }, [])

  return (

    <div className="wrap">

      <div className="floatBox mb50">
        <div className="fr">
          <Link href="/resign"><button type="button" className="btnLight mr5">내프로필</button></Link>
          <Link href="/myinfo"><button type="button" className="btnLight mr5">구독관리</button></Link>
          <Link href="/like"><button type="button" className="btnLight mr5">찜한기사</button></Link>
          <Link href="/comment"><button type="button" className="btnLight mr5">댓글관리</button></Link>
        </div>
      </div>


      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#언론사</h3>
        </div>

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '35%' }} />
            <col style={{ width: '35%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>사진</th>
              <th>언론사</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <button type="button" className="btnRed">삭제</button></td>
            </tr>
            {
            subMedia.map((news) => {
              return (
                  <tr>
                    <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
                    <td>{news}</td>
                    <td><button type="button" className="btnRed">삭제</button></td>
                  </tr>
              )
            })}
          </tbody>
        </table>
        {/* <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div> */}
      </div>


      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#주제</h3>
        </div>

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: '70%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>주제</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>정치</td>
              <td> <button type="button" className="btnRed">삭제</button></td>
            </tr>
            {subCategory.map((category) => {
              return (
                <div>
                  <tr>
                    <td>{category}</td>
                    <td> <button type="button" className="btnRed">삭제</button></td>
                  </tr>
                </div>
              )
            })}
          </tbody>
        </table>
        {/* <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div> */}
      </div>

      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#키워드</h3>
        </div>

        <table className="tableTypeSort center">
          <colgroup>
            <col style={{ width: '70%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>키워드</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>날씨</td>
              <td><button type="button" className="btnRed">삭제</button></td>
            </tr>
            {subKeword.map((keyword) => {
              return (
                <div>
                  <tr>
                    <td>{keyword}</td>
                    <td><button type="button" className="btnRed">삭제</button></td>
                  </tr>
                </div>
              )
            })}
          </tbody>
        </table>

        {/* <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div> */}
      </div>


    </div>


  )
}