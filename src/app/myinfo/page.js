import Link from "next/link";
import Image from 'next/image'
import 프로필 from '/public/images/profile.png'
import 언론사 from '/public/images/media.jpeg'



export default function Home() {
    let username = "USER"
    let mediacount = "12"
    let medianame = ["국민일보","상상일보","한겨레","뉴스랑"]
    let category =["정치","경제","사회","생활","IT","세계","과학","문화","오피니언","날씨"]
    let keyword = ["노트북","날씨","주식","경제","인플레"]
    let categorycount = 5
    let keywordcount = 5
    
    return (
      
      <div>
        <div className="floatBox mt10">
          <div className="fr">
            <button type="button" className="btnLight mr5">내프로필</button>
            <button type="button" className="btnLight mr5">구독관리</button>
            <button type="button" className="btnLight mr5">찜한기사</button>
            <button type="button" className="btnLight">의견관리</button>
          </div>
        </div>

        
        <div>
        <h4 className="center2">
          <Image src={프로필} className="profile" alt="프로필아이콘"/> 
          {username}님이 구독한 {mediacount}개 언론사예요.</h4>
        </div>
        
        <div>
        <button className="btn1">전체선택</button>
        </div>

        <div className='h-inline'>
          {
              medianame.map((a,i)=>{
                return(
                  <div> 
                    <Image src={언론사} className='media' alt='언론사 이미지'/>
                    <h5 className='media'>{medianame[i]}
                    <input type='checkbox'></input>
                    </h5>
                    
                  </div>
                )
              }
              )
          }
        </div>

        <div className='h-inline'>
        <button className="btn2">선택삭제</button>
        <button className="btn2">언론사 추가하기</button>
        </div>

        <hr />

        <div>
          <h4 className="center2">
          <Image src={프로필} className="profile" alt="프로필아이콘"/>  
          {username}님이 구독한 주제예요.</h4>
          <div className='h-inline'>
          {
            category.map((a,i)=>{
              return(
                <div>
                  <ul>
                  <li className="category">
                    <input type='checkbox'></input>
                    {category[i]}
                  </li>
                  </ul>
                </div>
              )
            }
            )
          }
          </div>
          <div className='h-inline'>
            <button className="btn2">선택삭제</button>
          </div>
        </div>

        <hr />
        

        <div>
        <h4 className="center2">
          <Image src={프로필} className="profile" alt="프로필아이콘"/>  
          {username}님이 구독한 {keywordcount}개의 키워드예요.</h4>
          <div className='h-inline'>
          {
            keyword.map((a,i)=>{
              return(
                <div>
                  <h5 className="category">
                  <input type='checkbox'></input>
                    #{keyword[i]}
                  </h5>
                </div>
              )
            }
            )
          }
          </div>
          <div className="center2">
          <input type="text" className="box1"/>
          <button className="btn2"> 키워드 추가</button>
          <button className="btn2"> 선택삭제</button>
          </div>
        </div>

        <div className="h-inline">
            <button className="btn2" >이전</button>
            <button className="btn2">저장하기</button>
          </div>

      </div>
    )
  }