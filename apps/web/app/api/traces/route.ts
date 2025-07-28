import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';
import Trace from '@/lib/models/trace';

// Force static generation for static export compatibility
export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    const sessionId = searchParams.get('sessionId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { userId };

    if (agentId) {
      query.agentId = agentId;
    }

    if (sessionId) {
      query.sessionId = sessionId;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    // Use any type to bypass TypeScript issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traces = await (Trace as any)
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const total = await (Trace as any).countDocuments(query);

    // Calculate statistics
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = await (Trace as any).aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalCalls: { $sum: 1 },
          successCount: {
            $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] },
          },
          totalTokens: { $sum: '$totalTokens' },
          totalCost: { $sum: '$cost' },
          avgLatency: { $avg: '$latency' },
        },
      },
    ]);

    const statsData = stats[0] || {
      totalCalls: 0,
      successCount: 0,
      totalTokens: 0,
      totalCost: 0,
      avgLatency: 0,
    };

    const successRate =
      statsData.totalCalls > 0 ? (statsData.successCount / statsData.totalCalls) * 100 : 0;

    return NextResponse.json({
      traces,
      stats: {
        ...statsData,
        successRate,
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching traces:', error);
    return NextResponse.json({ error: 'Failed to fetch traces' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const traceData = {
      ...body,
      userId,
      totalTokens: body.promptTokens + body.completionTokens,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const trace = new (Trace as any)(traceData);
    await trace.save();

    return NextResponse.json(trace, { status: 201 });
  } catch (error) {
    console.error('Error creating trace:', error);
    return NextResponse.json({ error: 'Failed to create trace' }, { status: 500 });
  }
}
