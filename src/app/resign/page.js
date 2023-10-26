'use client'
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL } from 'next/dist/shared/lib/constants';



export default function RootLayout({ children }) {

    //회원정보 확인 api호출
    let [memberinfo, setMemberData] = useState([])
    useEffect(() => {
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
        }
        fetch("/api/members", {
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setMemberData(data)
            });
    }, [])

    //비밀번호 일치 
    let [pwdcheckmsg, setpwdmsgData] = useState([])
    const [buttonshow, setShow] = useState(false);
    function pwdcheck() {
        const pwd = document.getElementById("pwd").value
        const pwdcheck = document.getElementById("pwdcheck").value

        if (pwd == pwdcheck) {
            setpwdmsgData("* 비밀번호가 일치합니다.");
            setShow(true);
        } else {
            setpwdmsgData("! 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            setShow(false);
        }
    }

    //탈퇴
    const [fetchpwd, setPwd] = useState("");
    const onChange = (e) => {
        setPwd(e.target.value);
    };
    const router = useRouter();
    function handleClick(password) {
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
        }
        fetch(`/api/members`, {
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password }),
        }).then(res => res.json())
            .then(data => {
                const code = data.resultCode;
                const resultmsg = data.resultMessage;
                switch (code) {
                    case '200'://탈퇴성공
                        alert(resultmsg);
                        localStorage.setItem('token', '');
                        router.push("/");
                    case '202'://비밀번호불일치로 탈퇴실패
                        alert(resultmsg);
                        router.refresh();
                        break;
                }
            });
    }



    return (
        <div className="wrap wid560">
            <div className="floatBox mt10">
                <div className="fr">
                    <Link href="/resign"><button type="button" className="btnLight mr5">내프로필</button></Link>
                    <Link href="/myinfo"><button type="button" className="btnLight mr5">구독관리</button></Link>
                    <Link href="/like"><button type="button" className="btnLight mr5">찜한기사</button></Link>
                    <Link href="/comment"><button type="button" className="btnLight mr5">댓글관리</button></Link>
                </div>
            </div>

            <div className="contentTitleBox">
                <h4>내프로필</h4>
            </div>

            <form>
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
                                <input type="text" className="wid200" id="name" defaultValue={memberinfo.name} />
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td colSpan="3">
                                {memberinfo.loginId}
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td colSpan="3">
                                <input type="password" className="wid200" name="pwd" value={fetchpwd} onChange={onChange} />
                                <p className="mt3">
                                    * 비밀번호는 암호화되어 빈 란으로 보입니다.
                                </p>
                                <p className="mt3">* 5자리 이상의 영문숫자 혼용만 가능합니다.</p>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td colSpan="3">
                                <input type="password" className="wid200" id="pwdcheck" name="pwdcheck" onChange={pwdcheck} />
                                <p>
                                    * 확인을 위해 위에 입력하신 비밀번호를 한번 더 입력해 주세요.
                                </p>
                                <p>
                                    {pwdcheckmsg}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colSpan="3">
                                <input type="text" className="wid200" id="email" name="email" defaultValue={memberinfo.email} />
                                <p>
                                    * 아이디/비밀번호 찾기 시 사용될 정보입니다. 정확하게 입력해 주세요.
                                </p>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="tr mt15">
                    <button type="button" className="btnRed mr5" onClick={() => handleClick(fetchpwd)}>회원탈퇴</button></div>
                <div className="centerBox mt20">
                    {buttonshow && <Link href="/"><button type="button" className="btnBlue wid90">수정</button></Link>}
                </div>
            </form>
        </div>

    )
}
