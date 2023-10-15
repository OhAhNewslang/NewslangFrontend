import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Newslang',
  description: 'Generated by myeongjin',
  charset: 'euc-kr',
  httpEquiv: 'X-UA-Compatible',
  content: 'IE=edge',
  name: 'viewport',
  content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  name: 'format-detection',
  content: 'telephone=no'
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	      <script type="text/javascript" src="js/common.js"></script>
      </head>
      <body>

        <div className="wrap">

         <div className="logoBox">
            <a href=""><img src="images/logo.jpg" alt="logo"/></a>
            <div className="floatBox mb15">
            <div className="fr">
              <Link href="/"><button type="button" className="btnBlue mr5">Home</button></Link>
              <Link href="/myinfo"><button type="button" className="btnBlue mr5">My Page</button></Link>
              <Link href="/login"><button type="button" className="btnGray">Logout</button></Link>
            </div>
          </div>
          </div>
          
          
         {children}
         

         </div>
      </body>
    </html>
  )
}
