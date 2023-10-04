"use client"
import Link from 'next/link';
import React from 'react';

import { useRef } from 'react';


export default async function RootLayout({ children }) {
	const usernameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
  
	  const formData = {
		username: usernameRef.current.value,
		//email: emailRef.current.value,
		password: passwordRef.current.value
	  };
  
	  try {
		const response = await fetch('http://localhost:8080//api/member', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(formData)
		});
  
		if (response.ok) {
		  const data = await response.json();
		  console.log('Registration successful:', data);
		} else {
		  console.error('Registration failed:', response.statusText);
		}
	  } catch (error) {
		console.error('An error occurred during registration:', error);
	  }
	};

    return (
      <form onSubmit={handleSubmit}>
        <div className="wrap">
         <div className="login1">

            <h1>
               <img src="images/logo.jpg" alt="milan information system"/>
            </h1>
            <div className="loginBox">
               <input type="text" ref={usernameRef} placeholder="userid"/>
               <input type="password" ref={passwordRef} placeholder="password"/>
               <div>
                  <input type="checkbox" className="save" name="key" /> 
                  <label for="saveId">아이디 저장</label> 

                  <input type="checkbox" className="save" name="pass" />
                  <label for="savePw">비밀번호 저장</label>
               </div>
               <a href="">회원가입</a>
               <Link href="/"><button type="submit" className="btnLogin">로그인</button></Link>
            </div>
         </div>
      </div>
      </form>
        )
    }