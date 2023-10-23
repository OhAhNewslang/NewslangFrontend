import {NextResponse} from "next/server";

export async function GET() {
  const page = 1;
  const limit = 10;
  const res = await fetch(`/api/news/guest/live?page=${page}&limit=${limit}`,
  {
    method: 'GET'
  });
  return NextResponse.json(res.body);
}