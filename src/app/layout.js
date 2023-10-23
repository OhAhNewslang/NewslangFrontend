'use client'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './globals.css'

export default function RootLayout({ children }) {
  const router = useRouter();
  let [loginbtnText,setBtnText]=useState(["Login"])

  //로그인 유무 확인을 위한 토큰 가져오기
  if (typeof window !== "undefined") {
    var token = window.localStorage.getItem('token');
  }

  //로그인되어있으면 버튼Logout으로 변경
  useEffect(()=>{
    if(token){
      setBtnText("Logout");
    }
  });


  //로그인 로그아웃 버튼 구현
  function LoginhandleClick() {
    if(!token){ //로그인이 안되어 있으면
      //로그인 페이지로 라우팅
      router.push("/login")
    }else{ //로그인이 되어 있으면
      localStorage.setItem('token', '');
      router.refresh();
    }
  }
  
  return (
    <html>
      <head>
        <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	      <script type="text/javascript" src="js/common.js"></script>
      </head>
      <body>

        <div className="wrap">

         <div className="logoBox">
            <a href=""><img src="images/logo.jpg" alt="logo"/></a>
            <div className="floatBox mb15">
            <div className="fr">
              {/* <Link href="/myinfo"><button type="button" className="btnBlue mr5">My Page</button></Link> */}
              <button type="button" className="btnBlue mr5">My Page</button>
              {/* <Link href="/login"><button type="button" className="btnGray" >{btnText}</button></Link> */}
              <button type="button" className="btnGray" onClick={LoginhandleClick}>{loginbtnText}</button>
              
            </div>
          </div>
          </div>
          
          
         {children}
         

         </div>
      </body>
    </html>
  )
}
