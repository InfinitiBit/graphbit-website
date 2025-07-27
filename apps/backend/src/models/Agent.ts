import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAgentSettings {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  [key: string]: any;
}

export interface IAgentModels {
  primary: string;
  fallback: string[];
  supportedModels: string[];
}

export interface IAgentPricing {
  tier: 'free' | 'premium' | 'enterprise' | 'custom';
  costPerCall?: number;
  monthlyPrice?: number;
  currency: string;
}

export interface IAgentPerformance {
  avgResponseTime: number;
  uptime: number;
  successRate: number;
  totalCalls: number;
  lastUpdated: Date;
}

export interface IAgentReview {
  userId: string;
  rating: number;
  comment: string;
  helpful: number;
  createdAt: Date;
}

export interface IAgent extends Document {
  name: string;
  description: string;
  longDescription?: string;
  category: 'chatbot' | 'analyzer' | 'generator' | 'translator' | 'classifier' | 'code-assistant' | 'other';
  subcategory?: string;
  version: string;
  author: string;
  authorId: string;
  
  // Metadata
  tags: string[];
  repositoryUrl?: string;
  documentationUrl?: string;
  imageUrl?: string;
  demoUrl?: string;
  
  // Configuration
  settings: IAgentSettings;
  models: IAgentModels;
  
  // Marketplace
  isPublic: boolean;
  isFeatured: boolean;
  isPaid: boolean;
  pricing: IAgentPricing;
  
  // Statistics
  downloads: number;
  installs: number;
  rating: number;
  reviewCount: number;
  reviews: IAgentReview[];
  
  // Performance
  performance: IAgentPerformance;
  
  // Status
  status: 'active' | 'deprecated' | 'maintenance' | 'draft';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  
  // Virtual getters
  averageRating: number;
  isVerified: boolean;
  isAvailable: boolean;
}

const AgentSettingsSchema = new Schema<IAgentSettings>({
  temperature: {
    type: Number,
    min: 0,
    max: 2,
    default: 0.7
  },
  maxTokens: {
    type: Number,
    min: 1,
    max: 4096,
    default: 1000
  },
  systemPrompt: {
    type: String,
    maxlength: 2000
  },
  topP: {
    type: Number,
    min: 0,
    max: 1,
    default: 1
  },
  frequencyPenalty: {
    type: Number,
    min: -2,
    max: 2,
    default: 0
  },
  presencePenalty: {
    type: Number,
    min: -2,
    max: 2,
    default: 0
  }
}, { _id: false, strict: false });

const AgentModelsSchema = new Schema<IAgentModels>({
  primary: {
    type: String,
    required: true,
    default: 'gpt-3.5-turbo'
  },
  fallback: [{
    type: String
  }],
  supportedModels: [{
    type: String,
    required: true
  }]
}, { _id: false });

const AgentPricingSchema = new Schema<IAgentPricing>({
  tier: {
    type: String,
    enum: ['free', 'premium', 'enterprise', 'custom'],
    default: 'free'
  },
  costPerCall: {
    type: Number,
    min: 0
  },
  monthlyPrice: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  }
}, { _id: false });

const AgentPerformanceSchema = new Schema<IAgentPerformance>({
  avgResponseTime: {
    type: Number,
    default: 0,
    min: 0
  },
  uptime: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  successRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  totalCalls: {
    type: Number,
    default: 0,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const AgentReviewSchema = new Schema<IAgentReview>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  helpful: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const AgentSchema = new Schema<IAgent>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  longDescription: {
    type: String,
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
    enum: ['chatbot', 'analyzer', 'generator', 'translator', 'classifier', 'code-assistant', 'other'],
    index: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  version: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  author: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  authorId: {
    type: String,
    required: true,
    index: true
  },
  
  // Metadata
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  repositoryUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Repository URL must be a valid HTTP/HTTPS URL'
    }
  },
  documentationUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Documentation URL must be a valid HTTP/HTTPS URL'
    }
  },
  imageUrl: {
    type: String
  },
  demoUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Demo URL must be a valid HTTP/HTTPS URL'
    }
  },
  
  // Configuration
  settings: {
    type: AgentSettingsSchema,
    default: () => ({})
  },
  models: {
    type: AgentModelsSchema,
    default: () => ({
      primary: 'gpt-3.5-turbo',
      fallback: [],
      supportedModels: ['gpt-3.5-turbo']
    })
  },
  
  // Marketplace
  isPublic: {
    type: Boolean,
    default: false,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  isPaid: {
    type: Boolean,
    default: false,
    index: true
  },
  pricing: {
    type: AgentPricingSchema,
    default: () => ({})
  },
  
  // Statistics
  downloads: {
    type: Number,
    default: 0,
    min: 0,
    index: true
  },
  installs: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  reviews: [AgentReviewSchema],
  
  // Performance
  performance: {
    type: AgentPerformanceSchema,
    default: () => ({})
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'deprecated', 'maintenance', 'draft'],
    default: 'draft',
    index: true
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    index: true
  },
  
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
AgentSchema.index({ name: 'text', description: 'text', tags: 'text' });
AgentSchema.index({ category: 1, isPublic: 1, status: 1 });
AgentSchema.index({ authorId: 1, status: 1 });
AgentSchema.index({ isFeatured: 1, isPublic: 1, status: 1 });
AgentSchema.index({ downloads: -1 });
AgentSchema.index({ rating: -1 });
AgentSchema.index({ createdAt: -1 });
AgentSchema.index({ updatedAt: -1 });

// Virtual for average rating calculation
AgentSchema.virtual('averageRating').get(function(this: IAgent) {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / this.reviews.length) * 10) / 10;
});

// Virtual for verification status
AgentSchema.virtual('isVerified').get(function(this: IAgent) {
  return this.verificationStatus === 'verified';
});

// Virtual for availability
AgentSchema.virtual('isAvailable').get(function(this: IAgent) {
  return this.status === 'active' && this.isPublic;
});

// Pre-save middleware
AgentSchema.pre('save', function(next) {
  // Update rating when reviews change
  if (this.isModified('reviews')) {
    this.reviewCount = this.reviews.length;
    if (this.reviews.length > 0) {
      const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
      this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
    } else {
      this.rating = 0;
    }
  }
  
  // Set publishedAt when first published
  if (this.isModified('isPublic') && this.isPublic && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  // Update performance timestamp
  if (this.isModified('performance')) {
    this.performance.lastUpdated = new Date();
  }
  
  next();
});

// Instance methods
AgentSchema.methods.addReview = function(userId: string, rating: number, comment?: string) {
  // Remove existing review from same user
  this.reviews = this.reviews.filter(review => review.userId !== userId);
  
  // Add new review
  this.reviews.push({
    userId,
    rating,
    comment: comment || '',
    helpful: 0,
    createdAt: new Date()
  });
  
  return this.save();
};

AgentSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

AgentSchema.methods.incrementInstalls = function() {
  this.installs += 1;
  return this.save();
};

AgentSchema.methods.updatePerformance = function(metrics: Partial<IAgentPerformance>) {
  Object.assign(this.performance, metrics);
  this.performance.lastUpdated = new Date();
  return this.save();
};

// Static methods
AgentSchema.statics.findPublic = function() {
  return this.find({ isPublic: true, status: 'active' });
};

AgentSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, isPublic: true, status: 'active' });
};

AgentSchema.statics.findFeatured = function() {
  return this.find({ isFeatured: true, isPublic: true, status: 'active' });
};

AgentSchema.statics.findByAuthor = function(authorId: string) {
  return this.find({ authorId });
};

AgentSchema.statics.searchAgents = function(query: string, filters: any = {}) {
  const searchQuery: any = {
    $text: { $search: query },
    isPublic: true,
    status: 'active',
    ...filters
  };
  
  return this.find(searchQuery, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' }, downloads: -1 });
};

AgentSchema.statics.getPopular = function(limit: number = 10) {
  return this.find({ isPublic: true, status: 'active' })
    .sort({ downloads: -1, rating: -1 })
    .limit(limit);
};

AgentSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $match: { isPublic: true, status: 'active' }
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalDownloads: { $sum: '$downloads' },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
};

export const Agent: Model<IAgent> = mongoose.model<IAgent>('Agent', AgentSchema);
export default Agent;