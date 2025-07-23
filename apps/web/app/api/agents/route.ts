import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Agent from "@/lib/models/agent";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { isPublic: true };
    
    if (category && category !== "all") {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    // Use any type to bypass TypeScript issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agents = await (Agent as any)
      .find(query)
      .sort({ downloads: -1, rating: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = await (Agent as any).countDocuments(query);
    
    return NextResponse.json({
      agents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    const body = await request.json();
    const agentData = {
      ...body,
      authorId: userId,
      downloads: 0,
      rating: 0,
      reviews: 0,
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agent = new (Agent as any)(agentData);
    await agent.save();
    
    return NextResponse.json(agent, { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return NextResponse.json(
      { error: "Failed to create agent" },
      { status: 500 }
    );
  }
} 