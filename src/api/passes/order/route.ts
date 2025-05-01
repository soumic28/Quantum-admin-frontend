import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { passId } = await req.json();
    // need to change the pai responses
    const response = await axios.post("https://your-backend.com/api/passes/booking-summary", { passId });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}
