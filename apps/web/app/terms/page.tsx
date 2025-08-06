import { Card } from '@/components/ui/card';
import { Shield, AlertCircle, CheckCircle, Globe } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using GraphBit's AI platform services.
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
          {/* Agreement to Terms */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                By accessing or using GraphBit's services, you agree to be bound by these Terms of Service ("Terms"). 
                If you disagree with any part of these terms, you may not access or use our services.
              </p>
              <p>
                These Terms apply to all users of GraphBit, including developers, organizations, and businesses 
                using our AI platform for agent deployment, monitoring, and management.
              </p>
            </div>
          </Card>

          {/* Service Description */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold">Service Description</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                GraphBit provides a cloud-based AI platform that enables users to:
              </p>
              <ul className="space-y-2 pl-6">
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Deploy and manage AI agents and LLM applications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Monitor agent performance and trace execution flows</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Access APIs and development tools for AI integration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Utilize marketplace features for agent discovery and sharing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                  <span>Access analytics and insights for AI application optimization</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* User Accounts and Registration */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold">User Accounts and Registration</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Account Creation</h3>
                <p>
                  To use our services, you must create an account with accurate and complete information. 
                  You are responsible for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Account Responsibilities</h3>
                <ul className="space-y-2 pl-4">
                  <li>• Provide accurate and up-to-date registration information</li>
                  <li>• Maintain the security of your account and password</li>
                  <li>• Notify us immediately of any unauthorized account access</li>
                  <li>• Be responsible for all activities under your account</li>
                  <li>• Use the service only for lawful purposes</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Account Termination</h3>
                <p>
                  You may terminate your account at any time. We reserve the right to suspend or terminate 
                  accounts for violations of these Terms or for any other reason at our sole discretion.
                </p>
              </div>
            </div>
          </Card>

          {/* Acceptable Use Policy */}
          <Card className="p-6 border-orange-200 dark:border-orange-800">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold">Acceptable Use Policy</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-medium text-foreground">You agree NOT to use GraphBit for:</p>
              <ul className="space-y-2 pl-4">
                <li>• Illegal activities or content that violates applicable laws</li>
                <li>• Generating harmful, offensive, or discriminatory content</li>
                <li>• Creating deepfakes or misleading AI-generated content without disclosure</li>
                <li>• Attempting to circumvent security measures or access controls</li>
                <li>• Reverse engineering, decompiling, or attempting to extract source code</li>
                <li>• Overwhelming our systems with excessive requests or load testing without permission</li>
                <li>• Sharing account credentials or allowing unauthorized access</li>
                <li>• Using the service to compete directly with GraphBit</li>
                <li>• Collecting user data from our platform without consent</li>
                <li>• Uploading malicious code, viruses, or harmful software</li>
              </ul>
              <div className="mt-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 p-4">
                <p className="text-sm">
                  <strong>AI-Specific Restrictions:</strong> Users must ensure their AI agents comply with ethical AI principles, 
                  respect user privacy, and do not engage in automated harassment, spam, or manipulation of individuals or systems.
                </p>
              </div>
            </div>
          </Card>

          {/* Service Availability and Performance */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Globe className="h-5 w-5 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Service Availability and Performance</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Service Level</h3>
                <p>
                  We strive to maintain high availability and performance but do not guarantee uninterrupted service. 
                  Planned maintenance will be announced in advance when possible.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Usage Limits</h3>
                <ul className="space-y-2 pl-4">
                  <li>• API rate limits as defined in your service plan</li>
                  <li>• Storage limits for agent configurations and trace data</li>
                  <li>• Compute resource limitations based on subscription tier</li>
                  <li>• Fair use policies to ensure service quality for all users</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Beta Features</h3>
                <p>
                  Beta or experimental features are provided "as-is" without warranties and may be discontinued 
                  or modified at any time.
                </p>
              </div>
            </div>
          </Card>

          {/* Billing and Payments */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">Billing and Payments</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Subscription Plans</h3>
                <p>
                  GraphBit offers various subscription plans with different features and usage limits. 
                  Pricing is available on our pricing page and may be updated with notice.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Payment Terms</h3>
                <ul className="space-y-2 pl-4">
                  <li>• Payments are due in advance for subscription periods</li>
                  <li>• Usage-based billing is calculated monthly</li>
                  <li>• Late payments may result in service suspension</li>
                  <li>• Refunds are provided according to our refund policy</li>
                  <li>• You're responsible for applicable taxes</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Free Tier</h3>
                <p>
                  Our free tier is subject to usage limits and may include restrictions. We reserve the right 
                  to modify free tier offerings with reasonable notice.
                </p>
              </div>
            </div>
          </Card>

          {/* Intellectual Property */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                <Shield className="h-5 w-5 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Our Intellectual Property</h3>
                <p>
                  GraphBit and its platform, including all software, designs, text, graphics, and other content, 
                  are owned by GraphBit Inc. and protected by intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Your Content</h3>
                <p>
                  You retain ownership of your AI agents, configurations, and data. By using our service, 
                  you grant us a limited license to host, store, and process your content to provide the service.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">License to Use</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to use GraphBit according 
                  to these Terms and your subscription plan.
                </p>
              </div>
            </div>
          </Card>

          {/* Data and Privacy */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Data and Privacy</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your privacy is important to us. Our data handling practices are governed by our Privacy Policy, 
                which is incorporated into these Terms by reference.
              </p>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Data Processing</h3>
                <ul className="space-y-2 pl-4">
                  <li>• We process your data only as necessary to provide our services</li>
                  <li>• Your AI agent data remains private to your account</li>
                  <li>• We implement industry-standard security measures</li>
                  <li>• Data retention periods are outlined in our Privacy Policy</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Data Portability</h3>
                <p>
                  You can export your data at any time through our platform tools or by contacting support.
                </p>
              </div>
            </div>
          </Card>

          {/* Disclaimers and Limitations */}
          <Card className="p-6 border-red-200 dark:border-red-800">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold">Disclaimers and Limitations</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Service Disclaimer</h3>
                <p>
                  GraphBit is provided "AS IS" without warranties of any kind. We do not guarantee that our 
                  service will meet your requirements or be error-free, secure, or continuously available.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">AI-Specific Disclaimers</h3>
                <ul className="space-y-2 pl-4">
                  <li>• AI outputs may be unpredictable and require human oversight</li>
                  <li>• We are not responsible for decisions made based on AI agent outputs</li>
                  <li>• Users are responsible for validating AI-generated content</li>
                  <li>• AI models may have biases or limitations</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Limitation of Liability</h3>
                <p>
                  Our liability is limited to the amount you paid for the service in the 12 months preceding 
                  the claim. We are not liable for indirect, incidental, or consequential damages.
                </p>
              </div>
            </div>
          </Card>

          {/* Indemnification */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <Shield className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-semibold">Indemnification</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                You agree to indemnify and hold GraphBit harmless from any claims, damages, or expenses 
                arising from:
              </p>
              <ul className="space-y-2 pl-4">
                <li>• Your use of our services in violation of these Terms</li>
                <li>• Your AI agents or content that infringes on third-party rights</li>
                <li>• Your violation of applicable laws or regulations</li>
                <li>• Any unauthorized access to your account due to your negligence</li>
              </ul>
            </div>
          </Card>

          {/* Termination */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500/10">
                <CheckCircle className="h-5 w-5 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold">Termination</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Termination by You</h3>
                <p>
                  You may terminate your account at any time by contacting support or using account deletion 
                  features in your dashboard.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Termination by Us</h3>
                <p>
                  We may terminate or suspend your account immediately for violations of these Terms, 
                  illegal activity, or other reasons at our discretion.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Effect of Termination</h3>
                <p>
                  Upon termination, your access to the service will cease, and we may delete your data 
                  according to our data retention policy. Some provisions of these Terms will survive termination.
                </p>
              </div>
            </div>
          </Card>

          {/* Governing Law and Disputes */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600/10">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold">Governing Law and Disputes</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Governing Law</h3>
                <p>
                  These Terms are governed by the laws of [Jurisdiction to be specified], without regard 
                  to conflict of law principles.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Dispute Resolution</h3>
                <p>
                  Most disputes can be resolved through our support team. For formal disputes, we prefer 
                  arbitration or mediation before litigation.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-foreground">Class Action Waiver</h3>
                <p>
                  You agree to resolve disputes on an individual basis and waive the right to participate 
                  in class actions or similar proceedings.
                </p>
              </div>
            </div>
          </Card>

          {/* Changes to Terms */}
          <Card className="p-6">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10">
                <CheckCircle className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update these Terms periodically to reflect changes in our services, legal requirements, 
                or business practices. We will notify users of significant changes via:
              </p>
              <ul className="space-y-2 pl-4">
                <li>• Email notification to your registered email address</li>
                <li>• Platform notifications in your dashboard</li>
                <li>• Updates posted on our website</li>
              </ul>
              <p>
                Continued use of our services after such changes constitutes acceptance of the updated Terms.
              </p>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
              <p className="mb-4 text-muted-foreground">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>Email: <a href="mailto:legal@graphbit.ai" className="text-primary hover:underline">legal@graphbit.ai</a></p>
                <p>Support: <a href="mailto:support@graphbit.ai" className="text-primary hover:underline">support@graphbit.ai</a></p>
                <p>Address: GraphBit Inc., Legal Department, [Address to be updated]</p>
              </div>
            </div>
          </Card>

          {/* Effective Date */}
          <Card className="p-6 border-2 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                These Terms of Service are effective as of {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} and supersede all previous versions.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}