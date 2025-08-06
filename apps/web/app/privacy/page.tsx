import { Card } from '@/components/ui/card';
import { Shield, AlertCircle, CheckCircle, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-medium">Account Information</h3>
                <p className="text-muted-foreground">
                  When you create an account, we collect your name, email address, and authentication credentials. 
                  This information is necessary to provide you with access to GraphBit's services.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Usage Data</h3>
                <p className="text-muted-foreground">
                  We collect information about how you use our platform, including agent deployments, trace data, 
                  API usage, and performance metrics. This helps us improve our services and provide better insights.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">AI Agent Data</h3>
                <p className="text-muted-foreground">
                  When you deploy AI agents through our platform, we may collect metadata about agent configurations, 
                  execution logs, and performance data to ensure optimal operation and debugging capabilities.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium">Technical Information</h3>
                <p className="text-muted-foreground">
                  We automatically collect technical information such as IP addresses, browser types, device information, 
                  and usage patterns to maintain security and improve platform performance.
                </p>
              </div>
            </div>
          </Card>

          {/* How We Use Information */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Provide and maintain our AI platform services</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Process your AI agent deployments and monitor their performance</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Provide customer support and respond to your inquiries</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Improve our platform through analytics and usage insights</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Ensure platform security and prevent fraud or abuse</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>Send important updates about our services (with your consent for marketing)</span>
              </li>
            </ul>
          </Card>

          {/* Data Security */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold">Data Security</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>End-to-end encryption for data transmission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Secure data storage with encryption at rest</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Regular security audits and monitoring</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Access controls and authentication mechanisms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span>Compliance with SOC 2 and ISO 27001 standards</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Data Sharing */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Shield className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Data Sharing and Disclosure</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We do not sell your personal information. We may share your data only in the following circumstances:
              </p>
              <ul className="space-y-3 pl-4">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party providers who help us operate our platform, 
                  subject to strict confidentiality agreements.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, regulation, or valid legal process.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, 
                  with notice to affected users.
                </li>
                <li>
                  <strong>Consent:</strong> With your explicit consent for specific purposes.
                </li>
              </ul>
            </div>
          </Card>

          {/* AI-Specific Privacy */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Globe className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">AI and Machine Learning Privacy</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As an AI platform, we have specific commitments regarding AI-related data:
              </p>
              <ul className="space-y-3 pl-4">
                <li>
                  <strong>Model Training:</strong> We do not use your private data to train our AI models without explicit consent.
                </li>
                <li>
                  <strong>Agent Privacy:</strong> Your AI agent configurations and custom logic remain private to your account.
                </li>
                <li>
                  <strong>Trace Data:</strong> Execution traces are used solely for monitoring and debugging your agents.
                </li>
                <li>
                  <strong>Data Retention:</strong> We retain data only as long as necessary for service provision and legal requirements.
                </li>
                <li>
                  <strong>Cross-Border Transfers:</strong> We ensure appropriate safeguards for international data transfers.
                </li>
              </ul>
            </div>
          </Card>

          {/* Your Rights */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <CheckCircle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold">Your Privacy Rights</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="space-y-3 pl-4">
                <li>
                  <strong>Access:</strong> Request access to the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data, subject to legal requirements.
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format.
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing in certain circumstances.
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing based on legitimate interests.
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@graphbit.ai" className="text-primary hover:underline">
                  privacy@graphbit.ai
                </a>
              </p>
            </div>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-semibold">Cookies and Tracking</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="space-y-3 pl-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic platform functionality and security.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how you use our platform to improve performance.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences.
                </li>
                <li>
                  <strong>Analytics:</strong> We use analytics tools to understand usage patterns and improve our services.
                </li>
              </ul>
              <p className="mt-4">
                You can manage cookie preferences through your browser settings or our cookie management tools.
              </p>
            </div>
          </Card>

          {/* Contact and Updates */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <CheckCircle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold">Contact Us & Policy Updates</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Contact Information</h3>
                <p>
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="mt-2 space-y-1 pl-4">
                  <li>Email: <a href="mailto:privacy@graphbit.ai" className="text-primary hover:underline">privacy@graphbit.ai</a></li>
                  <li>Email: <a href="mailto:support@graphbit.ai" className="text-primary hover:underline">support@graphbit.ai</a></li>
                  <li>Address: GraphBit Inc., Privacy Officer, [Address to be updated]</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Policy Updates</h3>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                  We will notify you of significant changes via email or platform notifications. Your continued use of our 
                  services after such updates constitutes acceptance of the revised policy.
                </p>
              </div>
            </div>
          </Card>

          {/* Compliance */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold">Privacy Compliance</h3>
              <p className="text-muted-foreground">
                GraphBit is committed to compliance with major privacy regulations including GDPR, CCPA, and other 
                applicable data protection laws. We regularly review and update our practices to maintain the highest 
                standards of data protection.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}