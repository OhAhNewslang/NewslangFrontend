'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {
    let [newscontents, setNewsData] = useState([])
    useEffect(() => {
        //로컬스토리지에 저장되어 있는 토큰 및 Url 받아오기
        if (typeof window !== "undefined") {
            var token = window.localStorage.getItem('token');
            var newsUrl = JSON.parse(window.localStorage.getItem('newUrl'));
        }
        //api호출
        fetch('/api/news/detail?url', {
            method: 'GET',
            headers: {
                'X-AUTH-TOKEN': token,
                'newsUrl' : newsUrl
            }
        })
            .then(res => res.json())
            .then(data => {
                setNewsData(data)
            });
    }, [])

    const [likes, setLikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
            <div class="wrap">
                {/* <div class="contentTitleBox">
                    <h3>최신</h3>
                </div> */}
                <div class="tableWrap3">
                    <table class="tableTypeBoard2">
                        <colgroup>
                         <col style={{width:'13%'}}/>
                         <col style={{width:'60%'}}/>
                         <col style={{width:'10%'}}/>
                         <col style={{width:'17%'}}/>
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
                                <td>{newscontents.reporter}</td>
                                <th>언론사</th>
                                <td>{newscontents.media}</td>
                            </tr>
                            <tr>
                                <th>기사링크</th>
                                <td><a href="">{newscontents.url}</a></td>
                                <th>관심</th>
                                <td><button type="button" className="btnRed">추천</button></td>
                            </tr>

                            <tr>
                                <td colspan="6" class="viewBox">
                                    {newscontents.contents}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className="floatBox mt10 mb10">
                        <textarea class="h100" id="" name=""></textarea>

                        <div className="fr">
                        <button type="button" className="btnGray wid90" >등록</button>
                        </div>
                    </div>
                    <div className="floatBox mt10 mb10">
                        <div className="left">
                        <button type="button" className="btnLight mr5">공감순</button>
                        <button type="button" className="btnLight">최신순</button>
                        </div>
                    </div>
                    <table class="tableTypeBoard2">
                    

                        <colgroup>
                         <col style={{width:'13%'}}/>
                         <col style={{width:'60%'}}/>
                         <col style={{width:'20%'}}/>
                         <col style={{width:'7%'}}/>
                        </colgroup>
                        <tbody>
                        <tr>
                            <th>강명진</th>
                            <td>이날 시사회에는 귀신을 믿지 않는 
                                가짜 퇴마사 천박사 역의 강동원, 영력을 사냥하는 악귀 범천 역의 허준호, 
                                귀신을 보는 의뢰인 유경 역의 이솜, 천박사의 파트너로 퇴마 기술 파트를 담당한 인배 역의 이동휘, 
                                천박사와 오랜 인연을 가진 골동품점 CEO 황사장 역의 김종수, 유경의 단 하나뿐인 가족이자 동생 유민 역의 박소이, 
                                그리고 김성식 감독이 참석했다.</td>
                            <th>2023-10-21</th>
                            {/* <td><button type="button" className="btnLight">좋아요</button></td> */}
                            <td><button type="button" className="btnLight" onClick={handleLike}>{likes}</button> </td>
                        </tr>
                        
                        </tbody>
                    </table>

                    <div className="floatBox mt20">
                        <div className="center">
                        <Link href="/"><button type="button" className="btnBlue wid90" onclick="back()">목록</button></Link>
                        </div>
                    </div>
                </div>

                
            </div>

        
        )
    }