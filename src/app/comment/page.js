'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {

    //최신순 공감순 거르기
    let [Opinion, setOpinionData] = useState([])
    let [fetchurl, seturl] = useState(["recent"])

    function onClickLike() {
        seturl("like");
    }
    function onClickLive() {
        seturl("recent");
    }
    
    getData(1,10);
    //댓글가져오기
    async function getData(page,limit) {
        
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
        }
        fetch(`/api/opinions/news/${fetchurl}/pageNumber=${page}&pageSize=${limit}`, {
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': token
            }
        })
            .then(res => res.json())
            .then(data => {
                setOpinionData(data.content);
            });
    }
    // useEffect(() => {
    //     //로컬스토리지에 저장되어 있는 토큰 받아오기
    //     if (typeof window !== "undefined") {
    //         var token = window.localStorage.getItem('token');
    //     }
    //     //댓글 좋아요 순 조회 api호출
    //     fetch(`/api/opinions/news/like${fetchurl}`, {
    //         method: 'GET',
    //         headers: {
    //             'X-AUTH-TOKEN': token
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setOpinionData(data.content);
    //         });
    // }, [])


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

            <div className="contentTitleBox">
                <h4>댓글관리</h4>
            </div>

            <div className="tableWrap4">
                <div className="floatBox mt10 mb10">
                    <div className="left">
                        <button type="button" className="btnLight mr5" onClick={onClickLike}>공감순</button>
                        <button type="button" className="btnLight" onClick={onClickLive}>최신순</button>
                    </div>
                </div>

                <table className="tableTypeBoard">
                    <colgroup>
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '61%' }} />
                        <col style={{ width: '11%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '7%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>제목</th>
                            <th>공감수</th>
                            <th>작성일</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td className="tl">이날 시사회에는 귀신을 믿지 않는
                                가짜 퇴마사 천박사 역의 강동원, 영력을 사냥하는 악귀 범천 역의 허준호,
                                귀신을 보는 의뢰인 유경 역의 이솜, 천박사의 파트너로 퇴마 기술 파트를 담당한 인배 역의 이동휘,
                                천박사와 오랜 인연을 가진 골동품점 CEO 황사장 역의 김종수, 유경의 단 하나뿐인 가족이자 동생 유민 역의 박소이,
                                그리고 김성식 감독이 참석했다.</td>
                            <td>10개</td>
                            <td>2023-10-15</td>
                            <td><input type='checkbox'></input></td>
                        </tr>
                        {
                            Opinion.map((opinion, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className="tl">{opinion.opinionContent}</td>
                                        <td>{opinion.likeCount}</td>
                                        <td>{opinion.opinionCreateDate}</td>
                                        <td><input type='checkbox'></input></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="floatBox mt20 center">
                    <button type="button" className="btnBlue wid90">수정</button>
                </div>
            </div>

        </div>

    )
}