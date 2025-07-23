import mongoose, { Schema, Types } from 'mongoose';

export interface IAgent {
  _id: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  version: string;
  author: string;
  authorId: string;
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  repositoryUrl?: string;
  documentationUrl?: string;
  imageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema = new Schema<IAgent>({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['chatbot', 'analyzer', 'generator', 'translator', 'classifier', 'other'],
  },
  version: {
    type: String,
    required: true,
    default: '1.0.0',
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
    index: true,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  repositoryUrl: String,
  documentationUrl: String,
  imageUrl: String,
  isPublic: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Add text search index
agentSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Agent = mongoose.models.Agent || mongoose.model<IAgent>('Agent', agentSchema);

export default Agent; 