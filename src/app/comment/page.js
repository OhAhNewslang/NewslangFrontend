'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {

    //최신순 공감순 거르기
    let [Comments, setCommentsData] = useState([])
    let [fetchurl, seturl] = useState(["recent"])

    function onClickLike() {
        seturl("like");
    }
    function onClickLive() {
        seturl("recent");
    }
    
    //댓글가져오기
	const page = 1,limit = 10;
	useEffect(() => {
		getCommentsData(page,limit);
	}, []);
    
    async function getCommentsData(page,limit) {
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
        }
        fetch(`/api/opinions/members/${fetchurl}?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCommentsData(data.opinions);
            });
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
                        {
                            Comments.map((comments, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td className="tl">{comments.opinionContent}</td>
                                        <td>{comments.likeCount}</td>
                                        <td>{comments.opinionCreateDate}</td>
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