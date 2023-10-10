export default function RootLayout({ children }) {

	return (
		<form action="/pages/api/login/in/route" method='POST'>
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
						{/* <button type="submit" onClick={() => { fetch('/api/login', { method: 'POST', body: JSON.stringify(userdata)}),router.push('/') }} className="btnLogin" >로그인</button> */}
						<button type='submit'>버튼</button>

					</div>
				</div>
			</div>
		</form>

	)
}