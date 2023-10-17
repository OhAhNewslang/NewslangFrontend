'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function Login() {
    let [newscontents, setNewsData] = useState([])
    useEffect(() => {
        //로컬스토리지에 저장되어 있는 토큰 받아오기
        if (typeof window !== "undefined") {
            var token = JSON.parse(window.localStorage.getItem('token'));
        }
        //구독뉴스 api호출
        fetch('/api/news/detail?url=~', {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })
            .then(function (res) {
                // 요청에 대한 응답을 JSON형태로 파싱
                return res.json();
            })
            .then(function (json) {
                const newscontents = json.body.json();
                setNewsData(newscontents)
            });
    }, [])
    return (
        <div class="wrap">
            {/* <div class="contentTitleBox">
                    <h3>최신</h3>
                </div> */}
            <div class="tableWrap3">
                <table class="tableTypeBoard2">
                    <colgroup>
                        <col style={{ width: '13%' }} />
                        <col style={{ width: '60%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '17%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td class="bold">{newscontents.title}</td>
                            <th>작성일</th>
                            <td>{newscontents.postDateTime}</td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>조지영 기자</td>
                            <th>언론사</th>
                            <td>{newscontents.media}</td>
                        </tr>
                        <tr>
                            <th>기사링크</th>
                            <td colspan="5"><a href="">{newscontents.url}</a></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="viewBox">
                            {newscontents.contents}

                                {/* <img src="images/view.jpg" alt="기본 이미지" /><br /><br />

                                [스포츠조선 조지영 기자] 어느덧 장르가 된 강동원표 오컬트가 추석 극장 큰 판을 벌였다.<br /><br />

                                귀신을 믿지 않지만 귀신 같은 통찰력을 지닌 가짜 퇴마사가 지금껏 경험해본 적 없는
                                강력한 사건을 의뢰받으며 시작되는 이야기를 그린 오컬트 판타지 영화 <br /><br />

                                '천박사 퇴마 연구소: 설경의 비밀'
                                (이하 '천박사 퇴마 연구소', 김성식 감독, 외유내강 제작).
                                19일 오후 서울 용산구 이촌동 CGV 용산아이파크몰에서 열린 '천박사 퇴마 연구소'
                                언론·배급 시사회를 통해 첫 공개됐다. <br /><br />

                                이날 시사회에는 귀신을 믿지 않는
                                가짜 퇴마사 천박사 역의 강동원, 영력을 사냥하는 악귀 범천 역의 허준호,
                                귀신을 보는 의뢰인 유경 역의 이솜, 천박사의 파트너로 퇴마 기술 파트를 담당한 인배 역의 이동휘,
                                천박사와 오랜 인연을 가진 골동품점 CEO 황사장 역의 김종수, 유경의 단 하나뿐인 가족이자 동생 유민 역의 박소이,
                                그리고 김성식 감독이 참석했다. */}

                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="floatBox mt10">
                    <button type="button" className="btnBlue wid90 mr10">추천</button>
                    <button type="button" className="btnRed wid90">반대</button>
                    <div className="fr">
                        <Link href="/"><button type="button" className="btnLight wid90" onclick="back()">목록</button></Link>
                    </div>
                </div>
            </div>
        </div>


    )
}