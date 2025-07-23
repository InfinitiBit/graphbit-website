import mongoose, { Schema, Types } from 'mongoose';

export interface ITrace {
  _id: Types.ObjectId;
  userId: string;
  agentId: string;
  agentName: string;
  sessionId: string;
  input: string;
  output: string;
  modelName: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  latency: number;
  cost: number;
  status: 'success' | 'error' | 'pending';
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const traceSchema = new Schema<ITrace>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    agentId: {
      type: String,
      required: true,
      index: true,
    },
    agentName: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    promptTokens: {
      type: Number,
      default: 0,
    },
    completionTokens: {
      type: Number,
      default: 0,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
    latency: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['success', 'error', 'pending'],
      default: 'pending',
    },
    error: String,
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add compound indexes for efficient querying
traceSchema.index({ userId: 1, createdAt: -1 });
traceSchema.index({ agentId: 1, createdAt: -1 });
traceSchema.index({ sessionId: 1, createdAt: -1 });

const Trace = mongoose.models.Trace || mongoose.model<ITrace>('Trace', traceSchema);

export default Trace;
