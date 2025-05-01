import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // need to change the api response
    const response = await axios.get("https://your-backend.com/api/passes");
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch passes" }, { status: 500 });
  }
}
