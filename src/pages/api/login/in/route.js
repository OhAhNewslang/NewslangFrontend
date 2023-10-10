export default function handler(req, res) {

  if (req.method == 'GET') {
    응답.status(200).json({ name: '안녕' })
  }
  if (req.method == 'POST') {
    if (req.body.logingID == '') {
      return 응답.status(500).json('아이디를 입력해주세요')
    }
    if (req.body.password == '') {
      return res.status(500).json('비밀번호를 입력해주세요')
    }
    try {
      console.log("POST요청옴")
      const loginID = req.body.loginID
      const password = req.body.password
      console.log(loginID, password)
      res.redirect(302, "/")
    } catch (error) {
      //에러시 실행할코드~~
    }
  }
}