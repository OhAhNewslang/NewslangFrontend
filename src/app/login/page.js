'use client'
import { useRouter } from "next/navigation";
import { headers } from "../../../next.config";

//폼 버튼 레이아웃 수정필요!!

export default function RootLayout({ children }) {
	const router = useRouter(); 
	return (
		<form onSubmit={(e) => {
			e.preventDefault();
			//폼 name값 변수저장
			const loginID = e.target.loginID.value;
			const password = e.target.password.value;
			//fetch로 보낼 옵션들
			const options = {
				method: 'POST',
				headers: {
					//json타입으로 전송
					'Content-Type': 'application/json'
				},
				//전송할 데이터 json으로 변환해서 body에 넣어줌
				body: JSON.stringify({ loginID, password })
			}
			fetch('api/login/in', options) //경로 및 옵션들
				.then(res => res.json()) //res를 json으로 전송
				.then(result => {
					console.log("응답옴")
					console.log(result);
					//로그인성공하면 메인으로(임시)
					router.push('/')
				})
		}}>
			<div className="wrap">
				<div className="login1">
					<h1>
						<img src="images/logo.jpg" alt="milan information system" />
					</h1>
					<div className="loginBox">
						<input name="loginID" placeholder="아이디" />
						<input type="password" name="password" placeholder="비밀번호" />
						<div>
							<input type="checkbox" className="save" name="key" />
							<label for="saveId">아이디 저장</label>
							<input type="checkbox" className="save" name="pass" />
							<label for="savePw">비밀번호 저장</label>
						</div>
						<a href="/signin">회원가입</a>
						<button type="submit" className="btnLogin">버튼</button>
					</div>
				</div>
			</div>
		</form>
	)
}