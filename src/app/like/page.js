'use client'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import swal from 'sweetalert';



export default function RootLayout({ children }) {
	const router = useRouter();
	let [Scrapmedia, setScrapData] = useState([])

	//스크랩 목록가져오기
	const page = 1, limit = 10;
	useEffect(() => {
		getScrapData(page, limit);
	}, []);
	function getScrapData(page, limit) {
		if (typeof window !== "undefined") {
			var token = window.localStorage.getItem('token');
		}
		fetch(`/api/scrap/news?page=${page}&limit=${limit}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				'X-AUTH-TOKEN': token,
			}
		})
			.then(res => res.json())
			.then(data => {
				const code = data.result.resultCode;
				const msg = data.result.resultMessage;
				switch (code) {
					case '200':
						console.log(data.scrapNewsList);
						setScrapData(data.scrapNewsList);
						//화면 새로고침
						router.refresh();
					case '404'://스크랩 뉴스없음
						swal({
							title: "",
							text: msg,
							icon: "info",
							button: "확인",
						  });
						router.refresh();
						break;
					default://로그인정보없음
						router.refresh();
						router.refresh();
						break;
				}
			}
			);
	}

	//댓글 삭제
	function deleteHandler(newsUrl) {
		//로컬스토리지에 저장되어 있는 토큰 받아오기
		if (typeof window !== "undefined") {
			var token = window.localStorage.getItem('token');
		}
		fetch(`/api/scrap/news/${newsUrl}`, {
			method: "DELETE",
			headers: {
				'X-AUTH-TOKEN': token,
			}
		})
			.then(res => res.json())
			.then(data => {
				//삭제완료 모달창 수정예정
				alert(data);
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

			<div className="tableWrap4">
				<table className="tableTypeBoard">
					<colgroup>
						<col style={{ width: '8%' }} />
						<col style={{ width: '55%' }} />
						<col style={{ width: '9%' }} />
						<col style={{ width: '10%' }} />
						<col style={{ width: '11%' }} />
						<col style={{ width: '7%' }} />
					</colgroup>
					<thead>
						<tr>
							<th>No.</th>
							<th>제목</th>
							<th>언론사</th>
							<th>작성자</th>
							<th>작성일</th>
							<th>삭제</th>
						</tr>
					</thead>
					<tbody>
						{Scrapmedia.map((news, index) => {
							return (
								<div key={news.url}>
									<tr>
										<td>{index}+1</td>
										<td className="tl"><a href={news.newsUrl}>{news.title}</a></td>
										<td>{news.mediaName}</td>
										<td>{news.reporter}</td>
										<td>{news.postDateTime}</td>
										<td><button type="button" onClick={deleteHandler(news.newsUrl)}>삭제</button></td>
									</tr>
								</div>
							)
						})}
					</tbody>
				</table>
				<div className="floatBox mt10 center">
					<button type="button" className="btnBlue wid90">수정</button>
				</div>
			</div>

		</div>
	)
}
