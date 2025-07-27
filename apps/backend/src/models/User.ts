import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  newsletter: boolean;
  language: string;
  timezone: string;
}

export interface IUserUsage {
  agentsCreated: number;
  tracesGenerated: number;
  apiCallsThisMonth: number;
  lastApiCall?: Date;
  totalTokensUsed: number;
  monthlyTokenLimit: number;
}

export interface IUserSubscription {
  tier: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  subscription: IUserSubscription;
  preferences: IUserPreferences;
  usage: IUserUsage;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Virtual getters
  fullName: string;
  isSubscribed: boolean;
  canCreateAgent: boolean;
  canMakeApiCall: boolean;
}

const UserPreferencesSchema = new Schema<IUserPreferences>({
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system'
  },
  notifications: {
    type: Boolean,
    default: true
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'en'
  },
  timezone: {
    type: String,
    default: 'UTC'
  }
}, { _id: false });

const UserUsageSchema = new Schema<IUserUsage>({
  agentsCreated: {
    type: Number,
    default: 0,
    min: 0
  },
  tracesGenerated: {
    type: Number,
    default: 0,
    min: 0
  },
  apiCallsThisMonth: {
    type: Number,
    default: 0,
    min: 0
  },
  lastApiCall: {
    type: Date
  },
  totalTokensUsed: {
    type: Number,
    default: 0,
    min: 0
  },
  monthlyTokenLimit: {
    type: Number,
    default: 100000 // 100k tokens for free tier
  }
}, { _id: false });

const UserSubscriptionSchema = new Schema<IUserSubscription>({
  tier: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'past_due'],
    default: 'active'
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String
}, { _id: false });

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  subscription: {
    type: UserSubscriptionSchema,
    default: () => ({})
  },
  preferences: {
    type: UserPreferencesSchema,
    default: () => ({})
  },
  usage: {
    type: UserUsageSchema,
    default: () => ({})
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
UserSchema.index({ clerkId: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'subscription.tier': 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ createdAt: -1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function(this: IUser) {
  if (this.firstName && this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  return this.firstName || this.lastName || this.email;
});

// Virtual for subscription status
UserSchema.virtual('isSubscribed').get(function(this: IUser) {
  return this.subscription.tier !== 'free' && this.subscription.status === 'active';
});

// Virtual for agent creation limit
UserSchema.virtual('canCreateAgent').get(function(this: IUser) {
  const limits = {
    free: 5,
    premium: 50,
    enterprise: Infinity
  };
  return this.usage.agentsCreated < limits[this.subscription.tier];
});

// Virtual for API call limit
UserSchema.virtual('canMakeApiCall').get(function(this: IUser) {
  return this.usage.apiCallsThisMonth < this.usage.monthlyTokenLimit;
});

// Pre-save middleware
UserSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Instance methods
UserSchema.methods.incrementUsage = function(type: 'agents' | 'traces' | 'apiCalls', amount: number = 1) {
  switch (type) {
    case 'agents':
      this.usage.agentsCreated += amount;
      break;
    case 'traces':
      this.usage.tracesGenerated += amount;
      break;
    case 'apiCalls':
      this.usage.apiCallsThisMonth += amount;
      this.usage.lastApiCall = new Date();
      break;
  }
  return this.save();
};

UserSchema.methods.resetMonthlyUsage = function() {
  this.usage.apiCallsThisMonth = 0;
  this.usage.totalTokensUsed = 0;
  return this.save();
};

// Static methods
UserSchema.statics.findByClerkId = function(clerkId: string) {
  return this.findOne({ clerkId });
};

UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

UserSchema.statics.getActiveUsers = function() {
  return this.find({ isActive: true });
};

UserSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$subscription.tier',
        count: { $sum: 1 },
        totalAgents: { $sum: '$usage.agentsCreated' },
        totalTraces: { $sum: '$usage.tracesGenerated' }
      }
    }
  ]);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;