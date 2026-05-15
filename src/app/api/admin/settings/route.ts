import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: "global",
          codEnabled: true,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { codEnabled } = await req.json();

    const settings = await prisma.settings.upsert({
      where: { id: "global" },
      update: { codEnabled },
      create: {
        id: "global",
        codEnabled,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
