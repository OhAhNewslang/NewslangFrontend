import { NextResponse } from "next/server";

export async function POST(req) {
  // if (req.method == 'POST') {
    try {
      console.log("post요청옴")
      console.log(await req.json())
      
      //fetch("백 url").then("로그인응답내용")
      
      //임시로 데이터요청오면 메인으로 감
      res.redirect(302, "/")
    } catch (error) {
      //에러시 실행할코드~~
    }
    return NextResponse.json({ message: "Hello from Next.js" }, { status: 200 });
  // }
}