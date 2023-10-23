import {NextResponse} from "next/server";

export async function GET() {
  const page = 1;
  const limit = 10;
  const res = fetch(`http://localhost:8080/api/news/guest/live?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  // const data = res.json();
  console.log(res);
  return res;
  // return NextResponse.json({ data });
}