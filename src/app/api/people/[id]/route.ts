import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const res = await fetch(`https://swapi.py4e.com/api/people/${id}/`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        return NextResponse.json({ message: "SWAPI error" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
