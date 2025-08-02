'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight as Play, 
  X as Pause, 
  RefreshCw as RotateCcw, 
  Code as Copy, 
  CheckCircle as Check, 
  ArrowRight as ChevronRight,
  Star as Terminal,
  Zap,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface CodeStep {
  id: number;
  title: string;
  description: string;
  code: string;
  output?: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration: number;
  language: 'typescript' | 'javascript' | 'json' | 'bash';
}

interface LiveCodeDemoProps {
  className?: string;
}

export function LiveCodeDemo({ className = "" }: LiveCodeDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const codeSteps: CodeStep[] = useMemo(() => [
    {
      id: 1,
      title: "Install GraphBit SDK",
      description: "Start by installing the GraphBit SDK in your project",
      code: `npm install @graphbit/sdk
# or
yarn add @graphbit/sdk`,
      output: `added 1 package, and audited 1 package in 0.5s
found 0 vulnerabilities`,
      status: 'pending',
      duration: 2000,
      language: 'bash'
    },
    {
      id: 2,
      title: "Initialize GraphBit Client",
      description: "Set up the GraphBit client with your API key",
      code: `import { GraphBit } from '@graphbit/sdk';

const graphbit = new GraphBit({
  apiKey: process.env.GRAPHBIT_API_KEY,
  environment: 'production'
});`,
      output: `✓ GraphBit client initialized
✓ Connected to production environment
✓ API key validated`,
      status: 'pending',
      duration: 1500,
      language: 'typescript'
    },
    {
      id: 3,
      title: "Create AI Agent",
      description: "Define your AI agent with capabilities and personality",
      code: `const customerSupportAgent = await graphbit.createAgent({
  name: 'Customer Support Agent',
  description: 'Helpful customer support assistant',
  capabilities: ['ticket_resolution', 'product_knowledge'],
  personality: {
    tone: 'friendly',
    expertise: 'customer_service',
    language: 'english'
  }
});`,
      output: `✓ Agent created successfully
Agent ID: agent_abc123def456
Status: Active
Capabilities: 2 loaded`,
      status: 'pending',
      duration: 2500,
      language: 'typescript'
    },
    {
      id: 4,
      title: "Configure Knowledge Base",
      description: "Upload and index your documentation for the agent",
      code: `await customerSupportAgent.uploadKnowledge({
  documents: [
    './docs/product-manual.pdf',
    './docs/faq.md',
    './docs/troubleshooting.md'
  ],
  indexType: 'semantic'
});

console.log('Knowledge base configured');`,
      output: `✓ Documents uploaded (3 files)
✓ Semantic indexing completed
✓ Knowledge base ready
Processing time: 2.3s`,
      status: 'pending',
      duration: 3000,
      language: 'typescript'
    },
    {
      id: 5,
      title: "Deploy Agent",
      description: "Deploy your agent to production with auto-scaling",
      code: `const deployment = await customerSupportAgent.deploy({
  environment: 'production',
  scaling: {
    minInstances: 2,
    maxInstances: 10,
    autoScale: true
  },
  monitoring: {
    enableLogs: true,
    enableMetrics: true,
    alerting: true
  }
});`,
      output: `🚀 Deployment started...
✓ Agent deployed to production
✓ Auto-scaling enabled (2-10 instances)
✓ Monitoring configured
✓ Health checks passed
Agent URL: https://agent.graphbit.com/abc123`,
      status: 'pending',
      duration: 4000,
      language: 'typescript'
    },
    {
      id: 6,
      title: "Test Agent Interaction",
      description: "Send a test message to verify everything works",
      code: `const response = await customerSupportAgent.chat({
  message: "How do I reset my password?",
  userId: "user_123",
  context: {
    product: "GraphBit Platform",
    userType: "customer"
  }
});

console.log('Agent Response:', response.message);
console.log('Confidence:', response.confidence);
console.log('Response Time:', response.responseTime + 'ms');`,
      output: `Agent Response: To reset your password, please visit the login page and click "Forgot Password". You'll receive an email with reset instructions.

Confidence: 0.94
Response Time: 1.2s
Sources: [product-manual.pdf, faq.md]`,
      status: 'pending',
      duration: 2000,
      language: 'typescript'
    },
    {
      id: 7,
      title: "Monitor Performance",
      description: "Check real-time metrics and performance data",
      code: `const metrics = await customerSupportAgent.getMetrics({
  timeframe: 'last_24h',
  include: ['requests', 'response_time', 'accuracy', 'errors']
});

console.log('Performance Metrics:', JSON.stringify(metrics, null, 2));`,
      output: `Performance Metrics: {
  "requests": {
    "total": 1247,
    "successful": 1238,
    "failed": 9
  },
  "response_time": {
    "average": 1.2,
    "p95": 2.1,
    "p99": 3.5
  },
  "accuracy": 0.94,
  "errors": {
    "rate": 0.007,
    "types": ["timeout", "rate_limit"]
  }
}`,
      status: 'pending',
      duration: 1800,
      language: 'typescript'
    }
  ], []);

  const startExecution = useCallback(() => {
    if (currentStep >= codeSteps.length) return;
    
    setIsPlaying(true);
    setShowOutput(true);
    
    // Update current step status
    const updatedSteps = [...codeSteps];
    if (updatedSteps[currentStep]) {
      updatedSteps[currentStep].status = 'running';
    }
    
    // Simulate execution time
    intervalRef.current = setTimeout(() => {
      if (updatedSteps[currentStep]) {
        updatedSteps[currentStep].status = 'completed';
      }
      
      if (currentStep < codeSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, codeSteps[currentStep]?.duration || 1000);
  }, [currentStep, codeSteps]);

  const pauseExecution = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetExecution = useCallback(() => {
    pauseExecution();
    setCurrentStep(0);
    setShowOutput(false);
    // Reset all step statuses
    codeSteps.forEach(step => step.status = 'pending');
  }, [pauseExecution, codeSteps]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const getCurrentCode = () => {
    return codeSteps[currentStep]?.code || '';
  };

  const getCurrentOutput = () => {
    return codeSteps[currentStep]?.output || '';
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep && isPlaying) return 'running';
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      case 'running':
        return <Clock className="h-4 w-4 text-warning animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-warning/30" />;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'typescript':
        return 'text-warning';
      case 'javascript':
        return 'text-accent';
      case 'json':
        return 'text-destructive';
      case 'bash':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPlaying && currentStep < codeSteps.length) {
      const timer = setTimeout(() => {
        if (autoPlay) startExecution();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, isPlaying, currentStep, codeSteps.length, startExecution]);

  // Scroll output to bottom
  const currentOutput = getCurrentOutput();
  useEffect(() => {
    if (outputRef.current && showOutput) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [showOutput, currentOutput]);

  return (
    <div className={`relative bg-gradient-to-r from-background/95 to-warning/5 border border-warning/20 hover:border-warning/40 transition-colors duration-300 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-warning/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/20 rounded-lg">
              <Terminal className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-warning via-destructive to-accent bg-clip-text text-transparent mb-1">Live Code Demo</h3>
              <p className="text-muted-foreground text-sm">Step-by-step GraphBit implementation</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={isPlaying ? pauseExecution : startExecution}
              disabled={currentStep >= codeSteps.length}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isPlaying 
                  ? 'bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30' 
                  : 'bg-gradient-to-r from-warning to-destructive text-white border border-warning/30 hover:shadow-lg'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            
            <button
              onClick={resetExecution}
              className="flex items-center gap-2 px-4 py-2 bg-background/50 text-foreground border border-warning/30 rounded-lg hover:bg-warning/10 hover:border-warning/40 transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                autoPlay 
                  ? 'bg-warning/20 text-warning border border-warning/30' 
                  : 'bg-background/50 text-foreground border border-warning/20'
              }`}
            >
              Auto-play
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Steps Navigation */}
        <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-background/80 to-warning/5 border border-warning/20 rounded-xl p-4">
          <h4 className="text-lg font-semibold bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent mb-4">Implementation Steps</h4>
            <div className="space-y-3">
              {codeSteps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <motion.div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      index === currentStep 
                        ? 'bg-warning/20 border border-warning/30' 
                        : 'bg-background/30 border border-warning/20 hover:bg-warning/10 hover:border-warning/30'
                    }`}
                    onClick={() => setCurrentStep(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {getStatusIcon(status)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {step.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {step.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-warning" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Code Section */}
                  <div className="bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-300/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(codeSteps[currentStep]?.language || 'typescript')}`} />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {codeSteps[currentStep]?.title || 'Code Editor'}
                </span>
                <span className="text-xs text-gray-500 uppercase">
                  {codeSteps[currentStep]?.language || 'typescript'}
                </span>
              </div>
              
              <button
                onClick={() => copyToClipboard(getCurrentCode())}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-400/50 dark:border-gray-600/50 rounded-lg hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-200"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            
            <div className="p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed overflow-x-auto">
                <code>{getCurrentCode()}</code>
              </pre>
            </div>
          </div>

          {/* Output Section */}
          <AnimatePresence>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 rounded-xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-300/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Output</span>
                    {isPlaying && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">Executing...</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  ref={outputRef}
                  className="p-4 max-h-48 overflow-y-auto"
                >
                  <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                    <code>{getCurrentOutput()}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="bg-gray-200/50 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-sm text-gray-400">
                {currentStep + 1} of {codeSteps.length} steps
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / codeSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-warning/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-destructive/10 to-warning/10 rounded-full blur-2xl" />
    </div>
  );
} 