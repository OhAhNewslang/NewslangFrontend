'use client'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default async function RootLayout({ children }) {



  return (

    <div className="wrap">

      <div className="floatBox mb50">
        <div className="fr">
          <Link href="/resign"><button type="button" className="btnLight mr5">내프로필</button></Link>
          <Link href="/myinfo"><button type="button" className="btnLight mr5">구독관리</button></Link>
          <Link href="/like"><button type="button" className="btnLight mr5">찜한기사</button></Link>
          <Link href="/like"><button type="button" className="btnLight mr5">댓글관리</button></Link>
        </div>
      </div>


      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#언론사</h3>
        </div>

        <table className="tableTypeSort scrollTable center">
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '35%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>사진</th>
              <th>언론사</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td><img src="images/userImg.jpg" alt="사용자 기본 이미지" /></td>
              <td>중앙일보</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            
          </tbody>
        </table>
        <div className="centerBox mt20 mb20">
          <button type="button" className="btnGray">수정</button>
        </div>
      </div>


      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#주제</h3>
        </div>

        <table className="tableTypeSort scrollTable center">
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '55%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>주제</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                    <td>정치</td>
                    <td> <button type="button" className="btnRed">삭제</button></td>
                </tr> */}
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>정치</td>
              <td> <input type='checkbox'></input></td>
            </tr>
          </tbody>
        </table>
        <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div>
      </div>

      <div className="wrap3">
        <div className="contentTitleBox">
          <h3>#키워드</h3>
        </div>

        <table className="tableTypeSort scrollTable5 center">
          <colgroup>
            <col style={{ width: '45%' }} />
            <col style={{ width: '55%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>키워드</th>
              <th>구독</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                    <td>날씨</td>
                    <td> <button type="button" className="btnRed">삭제</button></td>
                </tr> */}
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
            <tr>
              <td>날씨</td>
              <td> <input type='checkbox'></input></td>
            </tr>
          </tbody>
        </table>

        <div className="centerBox mt20">
          <button type="button" className="btnGray">수정</button>
        </div>

        <div className="centerBox mt20">
          <div className='mb5 tl'>키워드 추가(한개씩 추가)</div>
          <textarea class="h10" id="" name=""></textarea>
          <div className='mb20 tr'><button type="button" className="btnRed">추가</button></div>
        </div>
      </div>


    </div>


  )
}