import Link from 'next/link';

export default async function RootLayout({ children }) {

    return (

        <div className="wrap">

        <div className="floatBox mb50">
          <div className="fr">
            <Link href="/resign"><button type="button" className="btnLight mr5">내프로필</button></Link>
            <Link href="/myinfo"><button type="button" className="btnLight mr5">구독관리</button></Link>
            <Link href="/like"><button type="button" className="btnLight mr5">찜한기사</button></Link>
          </div>
        </div>

		<div className="tableWrap4">
			<table className="tableTypeBoard">
				<colgroup>
                    <col style={{width:'8%'}}/>
                    <col style={{width:'55%'}}/>
                    <col style={{width:'9%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'11%'}}/>
                    <col style={{width:'7%'}}/>
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
					<tr>
						<td>1</td>
						<td className="tl"><a href="">[SC현장] "강동원이라는 피사체"…'천박사' 강동원표 판타지, 장르가 되다(종합)</a></td>
						<td>한국일보</td>
						<td>조지영 기자</td>
						<td>2023-10-15</td>
						<td><input type='checkbox'></input></td>
					</tr>
                    <tr>
						<td>2</td>
						<td className="tl"><a href="">[SC현장] "강동원이라는 피사체"…'천박사' 강동원표 판타지, 장르가 되다(종합)</a></td>
						<td>한국일보</td>
						<td>조지영 기자</td>
						<td>2023-10-15</td>
						<td><input type='checkbox'></input></td>
					</tr>
                    <tr>
						<td>3</td>
						<td className="tl"><a href="">[SC현장] "강동원이라는 피사체"…'천박사' 강동원표 판타지, 장르가 되다(종합)</a></td>
						<td>한국일보</td>
						<td>조지영 기자</td>
						<td>2023-10-15</td>
						<td><input type='checkbox'></input></td>
					</tr>
				</tbody>
			</table>

			<div className="floatBox mt10 center">				
					<button type="button" className="btnBlue wid90">수정</button>
			</div>
		</div>
		
	</div>
    
 )
}