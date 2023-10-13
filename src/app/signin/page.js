'use client'
import React from 'react';
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
    const router = useRouter();
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            //폼 name값 변수저장
            const name = e.target.name.value;
            const loginID = e.target.loginID.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const passwordcheck = e.target.passwordcheck.value;

            console.log(name);
            //fetch로 보낼 옵션들
            const options = {
                method: 'POST',
                headers: {
                    //json타입으로 전송
                    'Content-Type': 'application/json'
                },
                //전송할 데이터 json으로 변환해서 body에 넣어줌
                body: JSON.stringify({name,loginID,email,password})
            }
            fetch('api/member/new', options) //경로 및 옵션들
            .then(function (res){
                // 요청에 대한 응답을 JSON형태로 파싱
                return res.json();
            })
            .then(function(json){
                alert(json.resultMessage)
            })
        }}>

            <div className="wrap wid560">
                <div className="contentTitleBox">
                    <h4>회원가입</h4>
                </div>
                <table className="tableTypeSort">
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '30%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td colSpan="3">
                                <input type="text" className="wid200" id="name" name="name" />
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td colSpan="3">
                                <input type="text" className="wid200" id="loginId" name="loginID" />
                                <p className="mt3">* 5자리 이상의 영문 및 숫자, 영문숫자 혼용만 가능합니다.</p>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td colSpan="3">
                                <input type="password" className="wid200" id="password" name="password" />
                                <p className="mt3">
                                    * 비밀번호는 암호화되어 빈 란으로 보입니다.
                                </p>
                                <p className="mt3">* 5자리 이상의 영문숫자 혼용만 가능합니다.</p>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td colSpan="3">
                                <input type="password" className="wid200" id="passwordcheck" name="passwordcheck" />
                                <p>
                                    * 확인을 위해 위에 입력하신 비밀번호를 한번 더 입력해 주세요.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan="3">
                                <input type="text" className="wid200" id="email" name="email" />
                                <p>
                                    * 아이디/비밀번호 찾기 시 사용될 정보입니다. 정확하게 입력해 주세요.
                                </p>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="centerBox mt20">
                    <button type="submit" className="btnBlue wid90">확인</button>
                </div>
            </div>
        </form>
    )
}