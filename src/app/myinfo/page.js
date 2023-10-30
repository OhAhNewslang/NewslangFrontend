'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  
  if (typeof window !== "undefined") {
    var token = window.localStorage.getItem('token');
  }

  let [Media, setMediaList] = useState([])
  let [subMedia, setSubMediaList] = useState([])
  let [Category, setCategoryList] = useState([])
  let [subCategory, setSubCategoryList] = useState([])
  let [subKeword, setSubKeywordList] = useState([])
  let [checked,setcheck] = useState() 
  useEffect(() => {
    //로컬스토리지에 저장되어 있는 토큰 받아오기
    if (typeof window !== "undefined") {
      var token = window.localStorage.getItem('token');
    }
    setMediaCategory();
    getSubscribe(token);
    mediaSubCheck();
  }, [])

  function setMediaCategory() {
    //전체 언론사 출력
    fetch("/api/subscribe/guest/media", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setMediaList(data.mediaList);
      });
    //전체 카테고리 출력
    fetch("/api/subscribe/guest/category", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setCategoryList(data.nameList);
      });
  }
  //구독정보 가져오기
  function getSubscribe(token) {
    fetch("/api/subscribe/all", {
      method: "GET",
      headers: {
        'X-AUTH-TOKEN': token,
      }
    })
      .then(res => res.json())
      .then(data => {
        setSubMediaList(data.mediaList);
        setSubCategoryList(data.categoryList);
        setSubKeywordList(data.keywordList);
      });
  }

  //언론사 및 카테고리 구독여부 체크
  function mediaSubCheck() {
    for (i in subMedia)
      if (Media.contains(i))
        document.getElementById(i).checked = true;
      else
        document.getElementById(i).checked = false;

    for (i in subCategory)
      if (Media.contains(i))
        document.getElementById(i).checked = true;
      else
        document.getElementById(i).checked = false;
  }
  
  //언론사 및 카테고리 구독하기
  function Subscribe(e) {
    // console.log(e.checked);
    var nameList = [];
    subMedia.map((i)=>{nameList.push(i)});
    // console.log(nameList);
    if (e.checked) {
      nameList.push(e.value);
      // var jsnameList = JSON.stringify(nameList);
      console.log(nameList);
      fetch('/api/subscribe/media', {
        method: "POST",
        headers: {
          'X-AUTH-TOKEN': token,
          "Content-Type": "application/json"
        },
        body: {
          'nameList': nameList
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
    }
  }
  
  function is_checked(){
    const checkbox = document.getElementById('my_checkbox');
	  // 2. checked 속성을 체크합니다.
	  const is_checked = checkbox.checked;
    if(is_checked){
      nameList.push()
    }

  }


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
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {
              Media.map((media) => {
                return (
                  <tr key={media.mediaName}>
                    <td><img src={media.imagePath} /></td>
                    <td>{media.mediaName}</td>
                    <td><input type="checkbox" value={media.mediaName} id={media.mediaName} checked={checked} onClick={(e)=>Subscribe(e.target)}></input></td>
                  </tr>
                )
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
            <col style={{ width: '70%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>주제</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {
              Category.map((category) => {
                return (
                  <tr key={category}>
                    <td>{category}</td>
                    <td><input type="checkbox" ></input></td>
                  </tr>
                )
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
            <col style={{ width: '70%' }} />
            <col style={{ width: '30%' }} />
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
                    <td><input type="checkbox" ></input></td>
                  </tr>
                </div>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}