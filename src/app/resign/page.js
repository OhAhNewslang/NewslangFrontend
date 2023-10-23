'use client'
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function RootLayout({ children }) {

    const router = useRouter();
    //회원정보 확인 api호출
    let [memberinfo, setMemberData] = useState([])
    useEffect(() => {
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
        }
        fetch('/api/member', {
            method: 'PATCH',
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
        const pwd = document.getElementById("password").value
        const pwdcheck = document.getElementById("passwordcheck").value

        if (pwd == pwdcheck) {
            setpwdmsgData("* 비밀번호가 일치합니다.");
            setShow(true);
        } else {
            setpwdmsgData("! 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            setShow(false);
        }
    }

    const [isShowing, setIsShowing] = useState(false);
    //탈퇴완료 모달창 3초 띄우기
    useEffect(() => {
        if (isShowing) {
            const notiTimer = setTimeout(() => {
                setIsShowing(false);
            }, 3000);
            return () => clearTimeout(notiTimer);
        }
    }, [isShowing]);
    //회원탈퇴 api호출
    function deletemember() {
        const password = document.getElementById("password").value
        fetch('/api/member?{password}', {
            method: 'DELETE',
            headers: {
                'X-AUTH-TOKEN': token,
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.resultCode = '200') {
                    setIsShowing(true);
                    { isShowing && <Modal message={data.reslutMessage} /> }
                    router.push("/");
                    localStorage.setItem('token', '');
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
                        <td colspan="3">
                            <input type="text" className="wid200" id="name" value={memberinfo.name} />
                        </td>
                    </tr>
                    <tr>
                        <th>아이디</th>
                        <td colspan="3">
                            {memberinfo.email}
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td colspan="3">
                            <input type="password" className="wid200" id="password" name="password" />
                            <p className="mt3">
                                * 비밀번호는 암호화되어 빈 란으로 보입니다.
                            </p>
                            <p className="mt3">* 5자리 이상의 영문숫자 혼용만 가능합니다.</p>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호 확인</th>
                        <td colspan="3">
                            <input type="password" className="wid200" id="passwordcheck" name="passwordcheck" onChange={pwdcheck} />
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
                        <td colspan="3">
                            <input type="text" className="wid200" id="email" name="" />
                            <p>
                                * 아이디/비밀번호 찾기 시 사용될 정보입니다. 정확하게 입력해 주세요.
                            </p>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div className="tr mt15"><Link href="/" onClick={deletemember}>회원탈퇴</Link></div>
            <div className="centerBox mt20">
                {buttonshow && <Link href="/"><button type="button" className="btnBlue wid90">수정</button></Link>}
            </div>


        </div>

    )
}