'use client'
import { useRouter } from "next/navigation";
import { headers } from "../../../next.config";


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
				body: JSON.stringify({ loginID, password }),
				//ssr 옵션 추가
				cache: 'no-store'
			}
			fetch('api/login/in', options) //경로 및 옵션들 보냄
				.then(function (res) {
					// 요청에 대한 응답을 JSON형태로 파싱
					return res.json();
				})
				.then(function (json) {
					const loginresult = json.body;
					const code = loginresult.resultCode;
					const loginmsg = loginresult.resultMessage;
					switch (code) {
						case '200'://로그인성공
							alert(loginmsg);
							//토큰 localStorage에 저장
							localStorage.setItem('token', json.stringify(res.token));
							router.push("/");
							//화면 새로고침
							router.refresh();
						case '202'://비밀번호틀림
							alert(loginmsg);
							router.refresh();
						default://로그인정보없음
							alert(loginmsg);
							router.refresh();
					}
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