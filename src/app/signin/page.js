import Link from 'next/link';
import React from 'react';

export default async function RootLayout({ children }) {

    return (

        <div className="wrap wid560">
            <div className="contentTitleBox">
                <h4>회원가입</h4>
            </div>

                <table className="tableTypeSort">
                    <colgroup>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                        <col style={{width:'20%'}}/>
                        <col style={{width:'30%'}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td colspan="3">
                                <input type="text" className="wid200" id="name" name=""/>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td colspan="3">
                                <input type="text" className="wid200" id="loginId" name=""/>
                                <p className="mt3">* 5자리 이상의 영문 및 숫자, 영문숫자 혼용만 가능합니다.</p>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td colspan="3">
                                <input type="password" className="wid200" id="password" name="" />
                                <p className="mt3">
                                    * 비밀번호는 암호화되어 빈 란으로 보입니다. 
                                </p>
                                <p className="mt3">* 5자리 이상의 영문숫자 혼용만 가능합니다.</p>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td colspan="3">
                                <input type="password" className="wid200" id="" name=""/>
                                <p>
                                    * 확인을 위해 위에 입력하신 비밀번호를 한번 더 입력해 주세요.
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td colspan="3">
                                <input type="text" className="wid200" id="email" name=""/>
                                <p>
                                    * 아이디/비밀번호 찾기 시 사용될 정보입니다. 정확하게 입력해 주세요.
                                </p>
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
                <div className="centerBox mt20">
                    <Link href="/login"><button type="button" className="btnBlue wid90">확인</button></Link>
                </div>
            
	    </div>
 
        )
    }