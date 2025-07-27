import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITraceMetadata {
  userAgent?: string;
  ip?: string;
  location?: string;
  requestId?: string;
  sessionId?: string;
  clientVersion?: string;
  [key: string]: any;
}

export interface ITraceTokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

export interface ITraceTimingMetrics {
  queueTime: number;
  processingTime: number;
  totalTime: number;
  firstTokenTime?: number;
  tokensPerSecond?: number;
}

export interface ITraceQualityMetrics {
  relevanceScore?: number;
  coherenceScore?: number;
  factualityScore?: number;
  toxicityScore?: number;
  biasScore?: number;
}

export interface ITrace extends Document {
  // Identifiers
  userId: string;
  agentId: mongoose.Types.ObjectId;
  agentName: string;
  sessionId: string;
  parentTraceId?: mongoose.Types.ObjectId;
  conversationId?: string;
  
  // Request/Response Data
  input: string;
  output: string;
  modelName: string;
  modelVersion?: string;
  
  // Token Usage
  tokenUsage: ITraceTokenUsage;
  
  // Timing Metrics
  timing: ITraceTimingMetrics;
  
  // Quality Metrics
  quality?: ITraceQualityMetrics;
  
  // Status and Error Handling
  status: 'pending' | 'processing' | 'success' | 'error' | 'timeout' | 'cancelled';
  error?: {
    code: string;
    message: string;
    details?: any;
    retryable: boolean;
  };
  
  // Metadata
  metadata: ITraceMetadata;
  tags: string[];
  
  // Feedback
  userFeedback?: {
    rating: number;
    comment?: string;
    helpful: boolean;
    timestamp: Date;
  };
  
  // Privacy and Compliance
  isAnonymized: boolean;
  retentionPeriod: number; // days
  
  // Timestamps
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Virtual getters
  duration: number;
  isSuccessful: boolean;
  costInUSD: number;
}

const TraceTokenUsageSchema = new Schema<ITraceTokenUsage>({
  promptTokens: {
    type: Number,
    required: true,
    min: 0
  },
  completionTokens: {
    type: Number,
    required: true,
    min: 0
  },
  totalTokens: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedCost: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const TraceTimingMetricsSchema = new Schema<ITraceTimingMetrics>({
  queueTime: {
    type: Number,
    required: true,
    min: 0
  },
  processingTime: {
    type: Number,
    required: true,
    min: 0
  },
  totalTime: {
    type: Number,
    required: true,
    min: 0
  },
  firstTokenTime: {
    type: Number,
    min: 0
  },
  tokensPerSecond: {
    type: Number,
    min: 0
  }
}, { _id: false });

const TraceQualityMetricsSchema = new Schema<ITraceQualityMetrics>({
  relevanceScore: {
    type: Number,
    min: 0,
    max: 1
  },
  coherenceScore: {
    type: Number,
    min: 0,
    max: 1
  },
  factualityScore: {
    type: Number,
    min: 0,
    max: 1
  },
  toxicityScore: {
    type: Number,
    min: 0,
    max: 1
  },
  biasScore: {
    type: Number,
    min: 0,
    max: 1
  }
}, { _id: false });

const TraceMetadataSchema = new Schema<ITraceMetadata>({
  userAgent: String,
  ip: String,
  location: String,
  requestId: String,
  sessionId: String,
  clientVersion: String
}, { _id: false, strict: false });

const TraceSchema = new Schema<ITrace>({
  // Identifiers
  userId: {
    type: String,
    required: true,
    index: true
  },
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
    index: true
  },
  agentName: {
    type: String,
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  parentTraceId: {
    type: Schema.Types.ObjectId,
    ref: 'Trace',
    index: true
  },
  conversationId: {
    type: String,
    index: true
  },
  
  // Request/Response Data
  input: {
    type: String,
    required: true,
    maxlength: 50000
  },
  output: {
    type: String,
    required: true,
    maxlength: 50000
  },
  modelName: {
    type: String,
    required: true,
    index: true
  },
  modelVersion: {
    type: String
  },
  
  // Token Usage
  tokenUsage: {
    type: TraceTokenUsageSchema,
    required: true
  },
  
  // Timing Metrics
  timing: {
    type: TraceTimingMetricsSchema,
    required: true
  },
  
  // Quality Metrics
  quality: {
    type: TraceQualityMetricsSchema
  },
  
  // Status and Error Handling
  status: {
    type: String,
    enum: ['pending', 'processing', 'success', 'error', 'timeout', 'cancelled'],
    default: 'pending',
    index: true
  },
  error: {
    code: {
      type: String,
      required: function(this: any) { return this.parent().status === 'error'; }
    },
    message: {
      type: String,
      required: function(this: any) { return this.parent().status === 'error'; }
    },
    details: Schema.Types.Mixed,
    retryable: {
      type: Boolean,
      default: false
    }
  },
  
  // Metadata
  metadata: {
    type: TraceMetadataSchema,
    default: () => ({})
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Feedback
  userFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 1000
    },
    helpful: {
      type: Boolean
    },
    timestamp: {
      type: Date
    }
  },
  
  // Privacy and Compliance
  isAnonymized: {
    type: Boolean,
    default: false,
    index: true
  },
  retentionPeriod: {
    type: Number,
    default: 90 // 90 days default retention
  },
  
  // Timestamps
  startedAt: {
    type: Date,
    required: true,
    index: true
  },
  completedAt: {
    type: Date,
    index: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
TraceSchema.index({ userId: 1, createdAt: -1 });
TraceSchema.index({ agentId: 1, createdAt: -1 });
TraceSchema.index({ sessionId: 1, createdAt: -1 });
TraceSchema.index({ status: 1, createdAt: -1 });
TraceSchema.index({ modelName: 1, createdAt: -1 });
TraceSchema.index({ conversationId: 1, createdAt: -1 });
TraceSchema.index({ 'tokenUsage.totalTokens': -1 });
TraceSchema.index({ 'timing.totalTime': -1 });
TraceSchema.index({ createdAt: -1 }); // TTL could be applied here for auto-deletion
TraceSchema.index({ tags: 1 });

// Compound indexes for common queries
TraceSchema.index({ userId: 1, agentId: 1, createdAt: -1 });
TraceSchema.index({ userId: 1, status: 1, createdAt: -1 });
TraceSchema.index({ agentId: 1, status: 1, createdAt: -1 });

// Virtual for duration calculation
TraceSchema.virtual('duration').get(function(this: ITrace) {
  if (this.completedAt && this.startedAt) {
    return this.completedAt.getTime() - this.startedAt.getTime();
  }
  return this.timing.totalTime;
});

// Virtual for success check
TraceSchema.virtual('isSuccessful').get(function(this: ITrace) {
  return this.status === 'success';
});

// Virtual for cost in USD
TraceSchema.virtual('costInUSD').get(function(this: ITrace) {
  return this.tokenUsage.estimatedCost;
});

// Pre-save middleware
TraceSchema.pre('save', function(next) {
  // Calculate total tokens if not provided
  if (this.isModified('tokenUsage')) {
    if (!this.tokenUsage.totalTokens) {
      this.tokenUsage.totalTokens = this.tokenUsage.promptTokens + this.tokenUsage.completionTokens;
    }
  }
  
  // Calculate total time if not provided
  if (this.isModified('timing')) {
    if (!this.timing.totalTime) {
      this.timing.totalTime = this.timing.queueTime + this.timing.processingTime;
    }
  }
  
  // Set completion time when status changes to terminal state
  if (this.isModified('status') && ['success', 'error', 'timeout', 'cancelled'].includes(this.status)) {
    if (!this.completedAt) {
      this.completedAt = new Date();
    }
  }
  
  // Calculate tokens per second
  if (this.timing.processingTime > 0 && this.tokenUsage.completionTokens > 0) {
    this.timing.tokensPerSecond = this.tokenUsage.completionTokens / (this.timing.processingTime / 1000);
  }
  
  next();
});

// Instance methods
TraceSchema.methods.addFeedback = function(rating: number, comment?: string, helpful?: boolean) {
  this.userFeedback = {
    rating,
    comment,
    helpful: helpful || false,
    timestamp: new Date()
  };
  return this.save();
};

TraceSchema.methods.markAsCompleted = function(output: string, tokenUsage: ITraceTokenUsage, timing: ITraceTimingMetrics) {
  this.output = output;
  this.tokenUsage = tokenUsage;
  this.timing = timing;
  this.status = 'success';
  this.completedAt = new Date();
  return this.save();
};

TraceSchema.methods.markAsError = function(error: { code: string; message: string; details?: any; retryable?: boolean }) {
  this.status = 'error';
  this.error = {
    code: error.code,
    message: error.message,
    details: error.details,
    retryable: error.retryable || false
  };
  this.completedAt = new Date();
  return this.save();
};

TraceSchema.methods.anonymize = function() {
  // Remove or hash sensitive data
  this.input = '[ANONYMIZED]';
  this.output = '[ANONYMIZED]';
  this.metadata.ip = undefined;
  this.metadata.userAgent = undefined;
  this.metadata.location = undefined;
  this.isAnonymized = true;
  return this.save();
};

// Static methods
TraceSchema.statics.findByUser = function(userId: string, limit?: number) {
  const query = this.find({ userId }).sort({ createdAt: -1 });
  return limit ? query.limit(limit) : query;
};

TraceSchema.statics.findByAgent = function(agentId: string, limit?: number) {
  const query = this.find({ agentId }).sort({ createdAt: -1 });
  return limit ? query.limit(limit) : query;
};

TraceSchema.statics.findBySession = function(sessionId: string) {
  return this.find({ sessionId }).sort({ createdAt: 1 });
};

TraceSchema.statics.findSuccessful = function(userId?: string) {
  const query: any = { status: 'success' };
  if (userId) query.userId = userId;
  return this.find(query).sort({ createdAt: -1 });
};

TraceSchema.statics.findErrors = function(userId?: string) {
  const query: any = { status: 'error' };
  if (userId) query.userId = userId;
  return this.find(query).sort({ createdAt: -1 });
};

TraceSchema.statics.getAnalytics = function(filters: any = {}) {
  const matchQuery = { ...filters };
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          status: '$status'
        },
        count: { $sum: 1 },
        totalTokens: { $sum: '$tokenUsage.totalTokens' },
        totalCost: { $sum: '$tokenUsage.estimatedCost' },
        avgProcessingTime: { $avg: '$timing.processingTime' }
      }
    },
    { $sort: { '_id.date': -1 } }
  ]);
};

TraceSchema.statics.getUserStats = function(userId: string, timeRange?: { start: Date; end: Date }) {
  const matchQuery: any = { userId };
  
  if (timeRange) {
    matchQuery.createdAt = {
      $gte: timeRange.start,
      $lte: timeRange.end
    };
  }
  
  return this.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: null,
        totalTraces: { $sum: 1 },
        successfulTraces: {
          $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] }
        },
        totalTokensUsed: { $sum: '$tokenUsage.totalTokens' },
        totalCostSpent: { $sum: '$tokenUsage.estimatedCost' },
        avgProcessingTime: { $avg: '$timing.processingTime' },
        uniqueAgents: { $addToSet: '$agentId' },
        uniqueSessions: { $addToSet: '$sessionId' }
      }
    },
    {
      $project: {
        _id: 0,
        totalTraces: 1,
        successfulTraces: 1,
        successRate: {
          $multiply: [
            { $divide: ['$successfulTraces', '$totalTraces'] },
            100
          ]
        },
        totalTokensUsed: 1,
        totalCostSpent: 1,
        avgProcessingTime: 1,
        uniqueAgentsCount: { $size: '$uniqueAgents' },
        uniqueSessionsCount: { $size: '$uniqueSessions' }
      }
    }
  ]);
};

// TTL index for automatic cleanup based on retention period
TraceSchema.index(
  { createdAt: 1 },
  { 
    expireAfterSeconds: 0,
    partialFilterExpression: {
      createdAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } // 90 days default
    }
  }
);

export const Trace: Model<ITrace> = mongoose.model<ITrace>('Trace', TraceSchema);
export default Trace;