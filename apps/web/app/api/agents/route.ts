import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';
import Agent from '@/lib/models/agent';

// Sample data for demonstration - replace with actual database calls
const sampleAgents = [
  {
    id: 'agent-1',
    name: 'CodeReview Assistant',
    description: 'AI agent that reviews code, suggests improvements, and identifies potential bugs.',
    longDescription: 'An advanced AI assistant specialized in code review and quality assurance. This agent analyzes your codebase, identifies potential issues, suggests optimizations, and ensures adherence to best practices across multiple programming languages.',
    category: 'analyzer',
    version: '2.1.0',
    author: 'TechCorp',
    authorId: 'techcorp-123',
    downloads: 15420,
    rating: 4.8,
    reviews: 245,
    tags: ['code-review', 'bug-detection', 'optimization', 'quality-assurance'],
    isPublic: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    instructions: 'Provide the code you want reviewed. The agent will analyze it for bugs, performance issues, security vulnerabilities, and style improvements. Include the programming language for better analysis.',
    settings: {
      temperature: 0.2,
      maxTokens: 2000,
      topP: 0.9,
      systemPrompt: 'You are an expert code reviewer. Analyze code for bugs, performance, security, and best practices.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Software Engineering', 'Security', 'Performance Optimization'],
      dataSources: ['OWASP Guidelines', 'Clean Code Principles', 'Language Documentation'],
      lastUpdated: new Date('2024-01-20'),
      expertise: ['JavaScript', 'Python', 'Java', 'TypeScript', 'React', 'Node.js'],
    },
    capabilities: ['Static code analysis', 'Security vulnerability detection', 'Performance optimization suggestions', 'Code style enforcement'],
    limitations: ['Cannot execute code', 'Limited to text-based analysis', 'May miss runtime-specific issues'],
    useCases: ['Pre-commit code review', 'Legacy code refactoring', 'Security audits', 'Code quality improvement'],
    pricing: { tier: 'free', costPerCall: 0.05 },
    performance: { avgResponseTime: 2.3, uptime: 99.8, successRate: 97.5 }
  },
  {
    id: 'agent-2',
    name: 'Customer Support Bot',
    description: 'Intelligent chatbot for handling customer inquiries and support tickets.',
    longDescription: 'A sophisticated customer support agent that can handle complex customer inquiries, resolve common issues, escalate when necessary, and maintain conversation context across multiple interactions.',
    category: 'chatbot',
    version: '3.0.2',
    author: 'ServiceAI',
    authorId: 'serviceai-456',
    downloads: 28750,
    rating: 4.6,
    reviews: 892,
    tags: ['customer-support', 'helpdesk', 'ticket-management', 'multilingual'],
    isPublic: true,
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-01-22'),
    instructions: 'Describe your customer support scenario and the types of inquiries you receive. The agent will provide appropriate responses and can escalate complex issues.',
    settings: {
      temperature: 0.7,
      maxTokens: 1500,
      topP: 0.8,
      systemPrompt: 'You are a helpful customer support representative. Be empathetic, solution-focused, and professional.',
    },
    models: {
      primary: 'gpt-3.5-turbo',
      fallback: ['gpt-4'],
      supportedModels: ['gpt-3.5-turbo', 'gpt-4', 'claude-3-sonnet'],
    },
    knowledge: {
      domains: ['Customer Service', 'Product Knowledge', 'Troubleshooting'],
      dataSources: ['FAQ Database', 'Product Documentation', 'Support Tickets History'],
      lastUpdated: new Date('2024-01-22'),
      expertise: ['Issue Resolution', 'Product Information', 'Billing Support', 'Technical Troubleshooting'],
    },
    capabilities: ['Multi-language support', 'Sentiment analysis', 'Ticket categorization', 'Escalation management'],
    limitations: ['Cannot access real-time systems', 'Limited to provided knowledge base', 'Cannot process refunds directly'],
    useCases: ['24/7 customer support', 'First-level support filtering', 'FAQ automation', 'Multilingual support'],
    pricing: { tier: 'premium', monthlyPrice: 99, costPerCall: 0.02 },
    performance: { avgResponseTime: 1.2, uptime: 99.9, successRate: 94.2 }
  },
  {
    id: 'agent-3',
    name: 'Content Generator Pro',
    description: 'AI-powered content creation agent for blogs, marketing, and social media.',
    longDescription: 'A versatile content creation assistant that generates high-quality written content for various purposes including blog posts, marketing copy, social media content, and technical documentation.',
    category: 'generator',
    version: '1.8.5',
    author: 'ContentLab',
    authorId: 'contentlab-789',
    downloads: 22100,
    rating: 4.7,
    reviews: 567,
    tags: ['content-creation', 'copywriting', 'blog-posts', 'marketing'],
    isPublic: true,
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2024-01-25'),
    instructions: 'Specify the type of content you need, target audience, tone, and key points to include. The agent will generate compelling and engaging content tailored to your requirements.',
    settings: {
      temperature: 0.8,
      maxTokens: 3000,
      topP: 0.9,
      systemPrompt: 'You are a creative content writer. Generate engaging, original, and high-quality content.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Content Marketing', 'SEO', 'Creative Writing', 'Digital Marketing'],
      dataSources: ['Marketing Best Practices', 'SEO Guidelines', 'Content Templates'],
      lastUpdated: new Date('2024-01-25'),
      expertise: ['Blog Writing', 'Social Media Content', 'Email Marketing', 'Product Descriptions'],
    },
    capabilities: ['SEO optimization', 'Tone adaptation', 'Multi-format content', 'Audience targeting'],
    limitations: ['Requires human fact-checking', 'Cannot access real-time trends', 'Limited to text content only'],
    useCases: ['Blog content creation', 'Social media campaigns', 'Email marketing', 'Product descriptions'],
    pricing: { tier: 'premium', monthlyPrice: 149, costPerCall: 0.08 },
    performance: { avgResponseTime: 3.1, uptime: 99.5, successRate: 96.8 }
  },
  {
    id: 'agent-4',
    name: 'Language Translator',
    description: 'Advanced multilingual translation agent with context awareness.',
    longDescription: 'A sophisticated translation agent that provides accurate, context-aware translations across 50+ languages while preserving meaning, tone, and cultural nuances.',
    category: 'translator',
    version: '2.3.1',
    author: 'LinguaAI',
    authorId: 'linguaai-101',
    downloads: 18900,
    rating: 4.9,
    reviews: 423,
    tags: ['translation', 'multilingual', 'localization', 'context-aware'],
    isPublic: true,
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2024-01-18'),
    instructions: 'Provide the text to translate and specify source and target languages. Include context or domain for better accuracy.',
    settings: {
      temperature: 0.3,
      maxTokens: 2500,
      topP: 0.8,
      systemPrompt: 'You are an expert translator. Provide accurate, contextual translations while preserving meaning and tone.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Linguistics', 'Cultural Context', 'Technical Translation'],
      dataSources: ['Language Dictionaries', 'Cultural Guidelines', 'Domain-Specific Glossaries'],
      lastUpdated: new Date('2024-01-18'),
      expertise: ['50+ Languages', 'Technical Translation', 'Cultural Localization', 'Context Preservation'],
    },
    capabilities: ['Context-aware translation', 'Cultural adaptation', 'Technical terminology', 'Batch processing'],
    limitations: ['Cannot translate audio/video', 'May struggle with idioms', 'Limited real-time context'],
    useCases: ['Document translation', 'Website localization', 'Technical documentation', 'Business communication'],
    pricing: { tier: 'free', costPerCall: 0.03 },
    performance: { avgResponseTime: 1.8, uptime: 99.7, successRate: 98.1 }
  },
  {
    id: 'agent-5',
    name: 'Data Analysis Expert',
    description: 'Intelligent data analyst that interprets datasets and generates insights.',
    longDescription: 'An advanced data analysis agent that can process complex datasets, perform statistical analysis, identify patterns, and generate actionable business insights with detailed visualizations and recommendations.',
    category: 'analyzer',
    version: '1.9.3',
    author: 'DataPro',
    authorId: 'datapro-202',
    downloads: 12800,
    rating: 4.5,
    reviews: 298,
    tags: ['data-analysis', 'statistics', 'insights', 'visualization'],
    isPublic: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-26'),
    instructions: 'Upload your dataset or describe your data analysis needs. Specify the type of analysis required and key questions you want answered.',
    settings: {
      temperature: 0.4,
      maxTokens: 2000,
      topP: 0.85,
      systemPrompt: 'You are a data analysis expert. Provide clear insights, statistical analysis, and actionable recommendations.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Statistics', 'Business Intelligence', 'Data Science', 'Machine Learning'],
      dataSources: ['Statistical Methods', 'Business Metrics', 'Industry Benchmarks'],
      lastUpdated: new Date('2024-01-26'),
      expertise: ['Descriptive Statistics', 'Predictive Analytics', 'Data Visualization', 'Trend Analysis'],
    },
    capabilities: ['Statistical analysis', 'Pattern recognition', 'Trend forecasting', 'Report generation'],
    limitations: ['Cannot execute code directly', 'Limited to provided datasets', 'No real-time data access'],
    useCases: ['Business intelligence', 'Market research', 'Performance analysis', 'Predictive modeling'],
    pricing: { tier: 'premium', monthlyPrice: 199, costPerCall: 0.12 },
    performance: { avgResponseTime: 4.2, uptime: 99.3, successRate: 95.7 }
  },
  {
    id: 'agent-6',
    name: 'Email Classifier',
    description: 'Smart email classification and routing agent for inbox management.',
    longDescription: 'An intelligent email processing agent that automatically categorizes, prioritizes, and routes emails based on content, sender, and urgency. Perfect for managing high-volume inboxes efficiently.',
    category: 'classifier',
    version: '2.0.7',
    author: 'InboxAI',
    authorId: 'inboxai-303',
    downloads: 9750,
    rating: 4.4,
    reviews: 186,
    tags: ['email-management', 'classification', 'automation', 'productivity'],
    isPublic: true,
    createdAt: new Date('2023-11-28'),
    updatedAt: new Date('2024-01-21'),
    instructions: 'Provide email content or headers for classification. Define your categories and routing rules for optimal organization.',
    settings: {
      temperature: 0.2,
      maxTokens: 1000,
      topP: 0.7,
      systemPrompt: 'You are an email classification expert. Categorize emails accurately based on content and priority.',
    },
    models: {
      primary: 'gpt-3.5-turbo',
      fallback: ['gpt-4'],
      supportedModels: ['gpt-3.5-turbo', 'gpt-4', 'claude-3-sonnet'],
    },
    knowledge: {
      domains: ['Email Management', 'Text Classification', 'Business Communication'],
      dataSources: ['Email Patterns', 'Communication Templates', 'Priority Indicators'],
      lastUpdated: new Date('2024-01-21'),
      expertise: ['Content Analysis', 'Spam Detection', 'Priority Assessment', 'Sender Reputation'],
    },
    capabilities: ['Multi-category classification', 'Priority scoring', 'Spam detection', 'Sentiment analysis'],
    limitations: ['Cannot access email servers directly', 'Limited to text content', 'No attachment processing'],
    useCases: ['Inbox organization', 'Customer service routing', 'Spam filtering', 'Priority management'],
    pricing: { tier: 'free', costPerCall: 0.01 },
    performance: { avgResponseTime: 0.8, uptime: 99.6, successRate: 96.3 }
  },
  {
    id: 'agent-7',
    name: 'Meeting Assistant',
    description: 'AI agent for meeting summaries, action items, and follow-up generation.',
    longDescription: 'A comprehensive meeting assistant that processes meeting transcripts, generates concise summaries, identifies action items, tracks decisions, and creates follow-up communications.',
    category: 'analyzer',
    version: '1.7.2',
    author: 'MeetingPro',
    authorId: 'meetingpro-404',
    downloads: 14300,
    rating: 4.6,
    reviews: 341,
    tags: ['meeting-notes', 'summaries', 'action-items', 'productivity'],
    isPublic: true,
    createdAt: new Date('2023-12-12'),
    updatedAt: new Date('2024-01-23'),
    instructions: 'Provide meeting transcript or notes. The agent will generate summaries, extract action items, and identify key decisions and next steps.',
    settings: {
      temperature: 0.5,
      maxTokens: 2500,
      topP: 0.8,
      systemPrompt: 'You are a meeting assistant. Extract key information, summarize discussions, and identify actionable items.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Meeting Management', 'Project Management', 'Communication'],
      dataSources: ['Meeting Templates', 'Action Item Frameworks', 'Follow-up Patterns'],
      lastUpdated: new Date('2024-01-23'),
      expertise: ['Summary Generation', 'Action Item Extraction', 'Decision Tracking', 'Follow-up Planning'],
    },
    capabilities: ['Transcript processing', 'Key point extraction', 'Participant tracking', 'Timeline generation'],
    limitations: ['Cannot join live meetings', 'Requires text input only', 'No calendar integration'],
    useCases: ['Meeting documentation', 'Action item tracking', 'Team communication', 'Project management'],
    pricing: { tier: 'premium', monthlyPrice: 79, costPerCall: 0.06 },
    performance: { avgResponseTime: 2.7, uptime: 99.4, successRate: 97.2 }
  },
  {
    id: 'agent-8',
    name: 'Research Assistant',
    description: 'AI-powered research agent for comprehensive information gathering and analysis.',
    longDescription: 'An advanced research assistant that can conduct thorough investigations on any topic, synthesize information from multiple sources, and present findings in structured, actionable formats.',
    category: 'analyzer',
    version: '2.2.4',
    author: 'ResearchLab',
    authorId: 'researchlab-505',
    downloads: 19600,
    rating: 4.8,
    reviews: 478,
    tags: ['research', 'analysis', 'information-gathering', 'synthesis'],
    isPublic: true,
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2024-01-24'),
    instructions: 'Provide your research topic and specific questions you need answered. Include any constraints, preferred sources, or output format requirements.',
    settings: {
      temperature: 0.6,
      maxTokens: 3500,
      topP: 0.9,
      systemPrompt: 'You are a thorough research assistant. Provide comprehensive, well-sourced, and structured information.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['gpt-3.5-turbo'],
      supportedModels: ['gpt-4', 'gpt-3.5-turbo', 'claude-3-opus'],
    },
    knowledge: {
      domains: ['Academic Research', 'Market Analysis', 'Technology Trends', 'Business Intelligence'],
      dataSources: ['Academic Papers', 'Industry Reports', 'News Sources', 'Statistical Databases'],
      lastUpdated: new Date('2024-01-24'),
      expertise: ['Literature Review', 'Market Research', 'Competitive Analysis', 'Trend Identification'],
    },
    capabilities: ['Multi-source synthesis', 'Citation tracking', 'Trend analysis', 'Report generation'],
    limitations: ['Cannot access real-time databases', 'Limited to training data cutoff', 'No primary data collection'],
    useCases: ['Academic research', 'Market analysis', 'Competitive intelligence', 'Literature reviews'],
    pricing: { tier: 'premium', monthlyPrice: 129, costPerCall: 0.10 },
    performance: { avgResponseTime: 5.1, uptime: 99.2, successRate: 96.9 }
  },
  {
    id: 'agent-9',
    name: 'Social Media Manager',
    description: 'AI agent for social media content creation and engagement strategy.',
    longDescription: 'A specialized social media management agent that creates engaging content, suggests posting schedules, analyzes audience engagement, and develops comprehensive social media strategies.',
    category: 'generator',
    version: '1.6.8',
    author: 'SocialAI',
    authorId: 'socialai-606',
    downloads: 16750,
    rating: 4.5,
    reviews: 392,
    tags: ['social-media', 'content-strategy', 'engagement', 'marketing'],
    isPublic: true,
    createdAt: new Date('2023-11-03'),
    updatedAt: new Date('2024-01-19'),
    instructions: 'Describe your brand, target audience, and social media goals. The agent will create content and strategies tailored to your specific platforms and objectives.',
    settings: {
      temperature: 0.8,
      maxTokens: 2000,
      topP: 0.9,
      systemPrompt: 'You are a social media expert. Create engaging content and strategic recommendations for maximum audience engagement.',
    },
    models: {
      primary: 'gpt-3.5-turbo',
      fallback: ['gpt-4'],
      supportedModels: ['gpt-3.5-turbo', 'gpt-4', 'claude-3-sonnet'],
    },
    knowledge: {
      domains: ['Social Media Marketing', 'Content Strategy', 'Brand Management', 'Engagement Analytics'],
      dataSources: ['Platform Best Practices', 'Trending Topics', 'Engagement Metrics', 'Content Templates'],
      lastUpdated: new Date('2024-01-19'),
      expertise: ['Content Creation', 'Hashtag Strategy', 'Audience Analysis', 'Campaign Planning'],
    },
    capabilities: ['Multi-platform content', 'Hashtag optimization', 'Engagement analysis', 'Trend identification'],
    limitations: ['Cannot post directly to platforms', 'No real-time analytics access', 'Limited to text content'],
    useCases: ['Content planning', 'Brand management', 'Engagement improvement', 'Campaign development'],
    pricing: { tier: 'free', costPerCall: 0.04 },
    performance: { avgResponseTime: 2.1, uptime: 99.1, successRate: 94.8 }
  },
  {
    id: 'agent-10',
    name: 'Legal Document Analyzer',
    description: 'AI agent specialized in legal document review and contract analysis.',
    longDescription: 'A sophisticated legal assistant that analyzes contracts, identifies key clauses, highlights potential risks, and provides summaries of legal documents in plain language.',
    category: 'analyzer',
    version: '2.4.1',
    author: 'LegalTech',
    authorId: 'legaltech-707',
    downloads: 8920,
    rating: 4.7,
    reviews: 167,
    tags: ['legal', 'contracts', 'document-review', 'compliance'],
    isPublic: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-27'),
    instructions: 'Upload legal documents or contract text for analysis. Specify areas of concern or particular clauses you want the agent to focus on.',
    settings: {
      temperature: 0.1,
      maxTokens: 4000,
      topP: 0.7,
      systemPrompt: 'You are a legal document expert. Analyze contracts and legal texts with precision and clarity.',
    },
    models: {
      primary: 'gpt-4',
      fallback: ['claude-3-opus'],
      supportedModels: ['gpt-4', 'claude-3-opus', 'gpt-3.5-turbo'],
    },
    knowledge: {
      domains: ['Contract Law', 'Compliance', 'Risk Assessment', 'Legal Writing'],
      dataSources: ['Legal Precedents', 'Contract Templates', 'Regulatory Guidelines', 'Case Law'],
      lastUpdated: new Date('2024-01-27'),
      expertise: ['Contract Analysis', 'Risk Identification', 'Clause Interpretation', 'Compliance Checking'],
    },
    capabilities: ['Clause extraction', 'Risk assessment', 'Plain language summaries', 'Compliance checking'],
    limitations: ['Not a substitute for legal counsel', 'Cannot provide legal advice', 'Limited to document analysis'],
    useCases: ['Contract review', 'Due diligence', 'Compliance checking', 'Legal research'],
    pricing: { tier: 'enterprise', monthlyPrice: 299, costPerCall: 0.15 },
    performance: { avgResponseTime: 3.8, uptime: 99.9, successRate: 98.3 }
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredAgents = [...sampleAgents];

    // Filter by category
    if (category && category !== 'all') {
      filteredAgents = filteredAgents.filter(agent => agent.category === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredAgents = filteredAgents.filter(agent =>
        agent.name.toLowerCase().includes(searchLower) ||
        agent.description.toLowerCase().includes(searchLower) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const skip = (page - 1) * limit;
    const paginatedAgents = filteredAgents.slice(skip, skip + limit);

    return NextResponse.json({
      agents: paginatedAgents,
      pagination: {
        page,
        limit,
        total: filteredAgents.length,
        pages: Math.ceil(filteredAgents.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
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
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
