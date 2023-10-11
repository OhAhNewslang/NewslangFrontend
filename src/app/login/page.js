'use client'
import { useRouter } from "next/navigation";
import { headers } from "../../../next.config";


export default function RootLayout({ children }) {
	const router = useRouter();
	return (
		<form onSubmit={(e) => {
			e.preventDefault();
			const loginID = e.target.loginID.value;
			const password = e.target.password.value;
			const options = {
				method: 'POST',
				headers: {
					//json타입으로 전송
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ loginID, password })
			}
			fetch('api/login/in', options)
				.then(res => res.json())
				.then(result => {
					console.log("응답옴")
					console.log(result);
					//로그인성공하면 메인으로
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
						<input name="password" placeholder="비밀번호" />
						<div>
							<input type="checkbox" className="save" name="key" />
							<label for="saveId">아이디 저장</label>
							<input type="checkbox" className="save" name="pass" />
							<label for="savePw">비밀번호 저장</label>
						</div>
						<a href="">회원가입</a>
						<button type="submit">버튼</button>
					</div>
				</div>
			</div>

		</form>
		// <form action="/api/login/in" method="POST">
		// 	<div className="wrap">
		// 		<div className="login1">
		// 			<h1>
		// 				<img src="images/logo.jpg" alt="milan information system" />
		// 			</h1>
		// 			<div className="loginBox">
		// 				<input name="loginID" placeholder="아이디" />
		// 				<input name="password" placeholder="비밀번호" />
		// 				<div>
		// 					<input type="checkbox" className="save" name="key" />
		// 					<label for="saveId">아이디 저장</label>
		// 					<input type="checkbox" className="save" name="pass" />
		// 					<label for="savePw">비밀번호 저장</label>
		// 				</div>
		// 				<a href="">회원가입</a>
		// 				<SubmitButton />
		// 			</div>
		// 		</div>
		// 	</div>
		// </form>
	)
}