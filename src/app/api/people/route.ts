import { NextResponse } from "next/server";

export const BASE = "https://swapi.py4e.com/api/people/";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") ?? "1";
    const search = searchParams.get("search") ?? "";

    const url = new URL(BASE);
    if (page) url.searchParams.set("page", page);
    if (search) url.searchParams.set("search", search);

    const res = await fetch(url.toString(), {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return NextResponse.json({ message: "SWAPI error" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
