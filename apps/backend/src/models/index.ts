export { User, IUser, IUserPreferences, IUserUsage, IUserSubscription } from './User';
export { Agent, IAgent, IAgentSettings, IAgentModels, IAgentPricing, IAgentPerformance, IAgentReview } from './Agent';
export { Trace, ITrace, ITraceMetadata, ITraceTokenUsage, ITraceTimingMetrics, ITraceQualityMetrics } from './Trace';

// Re-export mongoose for convenience
export { mongoose } from 'mongoose';