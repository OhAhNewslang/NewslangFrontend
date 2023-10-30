'use client'
import Link from 'next/link';
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { headers } from '../../../next.config';
// import { data } from 'autoprefixer';
import swal from 'sweetalert';

export default function RootLayout({ children }) {

    if (typeof window !== "undefined") {
        var token = window.localStorage.getItem('token');
    }
    //최신순 공감순 거르기
    let [Comments, setCommentsData] = useState([])
    let [fetchurl, seturl] = useState(["recent"])
    
    
    function onClickLike() {
        seturl("like");
        const page = 1, limit = 10;
        getCommentsData(page, limit);
    }
    function onClickLive() {
        seturl("recent");
        const page = 1, limit = 10;
        getCommentsData(page, limit);
    }

    //댓글가져오기
    const page = 1, limit = 10;
    useEffect(() => {
        getCommentsData(page, limit);
    }, []);

    function getCommentsData(page, limit) {
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

    //의견삭제
    function deleteOpinion(opinionId){
        fetch('',{
            method:'DELETE',
            headers:{'X-AUTH-TOKEN': token},
            body:{'opinionId':opinionId}}
            .then(res=>res.json())
            .then(data=>{
                swal(
                    {
                        text:"",
                        icon:"check",
                        timer:3000
                    }
                )
            }))
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
                                    <tr key={comments.opinionId}>
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