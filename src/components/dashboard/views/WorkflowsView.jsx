import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Settings,
  ChevronUp,
  ChevronDown,
  Play,
  Zap,
  List,
  Send,
  X,
  Plus,
  GitBranch,
  Layers,
  FileText,
  Video,
  Mic,
  ArrowLeft,
  Check,
  Info,
  LayoutGrid,
  XCircle,
  ArrowDownWideNarrow
} from 'lucide-react';
import './WorkflowsView.css';

export const WorkflowsView = ({ showToast = () => {} }) => {
  const [activeTab, setActiveTab] = useState('workflows'); // 'workflows' | 'templates'
  const [isTopTemplatesExpanded, setIsTopTemplatesExpanded] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [templatesSearch, setTemplatesSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCopilotModal, setShowCopilotModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [copilotPrompt, setCopilotPrompt] = useState('');

  // Workflow Builder View States (Matching screenshot 1:1)
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [builderTab, setBuilderTab] = useState('workflow'); // 'workflow' | 'settings' | 'enrollment'
  const [workflowTitle, setWorkflowTitle] = useState('New workflow - Sep 08, 2026, 18:01');
  const [aiAutomatePrompt, setAiAutomatePrompt] = useState('');
  const [builderMode, setBuilderMode] = useState('assistant'); // 'assistant' | 'canvas'
  const [canvasNodes, setCanvasNodes] = useState([]);

  // Settings Tab Specific States (Matching screenshot 1:1)
  const [showSettingsDetails, setShowSettingsDetails] = useState(false);
  const [enrollmentApproval, setEnrollmentApproval] = useState('automatic'); // 'automatic' | 'manual'
  const [limitMaxPeople, setLimitMaxPeople] = useState(false);
  const [maxPeopleVal, setMaxPeopleVal] = useState('');
  const [limitMaxPeopleCompany, setLimitMaxPeopleCompany] = useState(false);
  const [maxPeopleCompanyVal, setMaxPeopleCompanyVal] = useState('10');
  const [limitMaxCredits, setLimitMaxCredits] = useState(false);
  const [maxCreditsVal, setMaxCreditsVal] = useState('');
  const [sortEnrollment, setSortEnrollment] = useState('Relevance');
  const [sortOrder, setSortOrder] = useState('Descending');
  const [notifyOnEnrollment, setNotifyOnEnrollment] = useState(false);
  const [workflowDescription, setWorkflowDescription] = useState('');

  // Top collapsible mini templates (for Workflows tab)
  const topTemplates = [
    {
      id: 'top-1',
      title: 'Convert ideal customers with AI sequences',
      desc: 'When a contact aligns with your ICP, enroll them in a list and send an...',
      badges: [
        { label: 'Linear', type: 'linear', icon: <Layers size={11} /> },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ]
    },
    {
      id: 'top-2',
      title: 'Target Website Visitors',
      desc: 'This template will automatically identify companies that are actively...',
      badges: [
        { label: 'Multi-branch', type: 'multibranch', icon: <GitBranch size={11} /> }
      ]
    },
    {
      id: 'top-3',
      title: 'Engage companies researching your category with AI outreach',
      desc: 'Add interested companies to a list, then trigger an AI-drafted sequenc...',
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ]
    },
    {
      id: 'top-4',
      title: 'Target new hires with AI-drafted outreach in first 90 days',
      desc: 'When a contact enters a new role, add them to a list, then enroll them...',
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ]
    }
  ];

  // Complete 34 Templates Catalog (Matching authentic Apollo catalog)
  const allTemplatesData = [
    {
      id: 'tmpl-1',
      title: 'Auto-enrich and save new website visitors',
      desc: 'Automatically enriches and saves the website visitor contact identified.',
      author: 'by Apollo.io',
      categories: ['visitor'],
      badges: [{ label: 'Website Visitor', type: 'visitor' }],
      icons: [],
      steps: [
        { title: 'Trigger: Website Visitor Identified', desc: 'Apollo pixel matches visitor IP to verified company and contact record.' },
        { title: 'Action: Auto-enrich phone & corporate email', desc: 'Fetches verified 95%+ accuracy contact details.' },
        { title: 'Action: Save to Target Account List', desc: 'Adds enriched contact directly into CRM and active outreach lists.' }
      ]
    },
    {
      id: 'tmpl-2',
      title: 'Auto-enrich form submissions',
      desc: 'When a form is submitted, enrich the record to ensure high-quality leads enter your CRM.',
      author: 'by Apollo.io',
      categories: ['enrichment'],
      badges: [{ label: 'Data enrichment', type: 'enrichment' }],
      icons: [],
      steps: [
        { title: 'Trigger: Demo or Contact Form Submitted', desc: 'Captures webhook from website landing page form.' },
        { title: 'Action: Enrich with 65+ Firmographic fields', desc: 'Appends employee count, funding stage, annual revenue, and tech stack.' },
        { title: 'Action: Sync to Salesforce / HubSpot', desc: 'Pushes complete enriched profile to CRM without duplicate creation.' }
      ]
    },
    {
      id: 'tmpl-3',
      title: 'Company Website Visitor - Add to list',
      desc: 'Automatically adds companies who visit your website to a list',
      author: 'by Apollo.io',
      categories: ['visitor'],
      badges: [{ label: 'Website Visitor', type: 'visitor' }],
      icons: [],
      steps: [
        { title: 'Trigger: Anonymous Company Visits Pricing/Product Page', desc: 'Monitors intent-rich page visits from target accounts.' },
        { title: 'Condition: Company headcount > 50', desc: 'Filters out freelancers and sub-scale accounts.' },
        { title: 'Action: Add Account to "High Intent Inbound" List', desc: 'Tags company for automated SDR discovery.' }
      ]
    },
    {
      id: 'tmpl-4',
      title: 'Contact-level Website Visitor - Add to list',
      desc: 'Adds any identified website visitor to a list',
      author: 'by Apollo.io',
      categories: ['visitor'],
      badges: [{ label: 'Website Visitor', type: 'visitor' }],
      icons: [],
      steps: [
        { title: 'Trigger: Identified Contact Visits Website', desc: 'Recognizes past email clickers and cookie-matched prospects.' },
        { title: 'Action: Score intent & update engagement grade', desc: 'Increases lead intent score by +25 points.' },
        { title: 'Action: Add to Retargeting Cadence', desc: 'Enrolls contact into relevant product feature sequence.' }
      ]
    },
    {
      id: 'tmpl-5',
      title: 'Convert customers using competitor products with AI-drafted sequences',
      desc: 'Add customers using competitor products to a list, then reach out using an AI-written sequence tailored to them.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: Competitor Tech Stack Detected', desc: 'Identifies accounts using rival software via Apollo Technographics.' },
        { title: 'Action: AI Generates Competitive Battlecard Pitch', desc: 'Drafts comparison emails highlighting distinct value props.' },
        { title: 'Action: Deliver 3-touch Multichannel Sequence', desc: 'Sequences email, LinkedIn interaction, and follow-up phone task.' }
      ]
    },
    {
      id: 'tmpl-6',
      title: 'Convert ideal customers with AI sequences',
      desc: 'When a contact aligns with your ICP, enroll them in a list and send an AI-drafted sequence customized to them.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [{ label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: ICP Match score >= 90%', desc: 'Matches target title, industry, tech stack, and location.' },
        { title: 'Action: Apollo AI Copy Generation', desc: 'Generates bespoke email body tailored to recipient persona.' },
        { title: 'Action: Deliver with Automated Throttling', desc: 'Sends via warmed email accounts to ensure 99%+ deliverability.' }
      ]
    },
    {
      id: 'tmpl-7',
      title: 'Email Open Alert',
      desc: 'Notify your sales team when a contact opens an email so they can follow up quickly.',
      author: 'by Apollo.io',
      categories: ['recommended'],
      badges: [{ label: 'AI Recommended', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Contact opens email', desc: 'Fires when a recipient opens an email sent from Apollo sequence.' },
        { title: 'Condition: Open count >= 2', desc: 'Ensures high purchase intent before alerting sales reps.' },
        { title: 'Action: Slack / Email notification', desc: 'Instantly dispatches instant notification to contact owner with LinkedIn link.' }
      ]
    },
    {
      id: 'tmpl-8',
      title: 'Email Reply Tracker',
      desc: 'Add contacts to a list and assign a task when they reply to an email.',
      author: 'by Apollo.io',
      categories: ['recommended'],
      badges: [{ label: 'AI Recommended', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Prospect replies to email', desc: 'Monitors incoming mailbox replies for positive / interested signals.' },
        { title: 'Action: Mark stage as "Meeting Requested"', desc: 'Updates CRM deal / contact stage in HubSpot & Salesforce.' },
        { title: 'Action: Create Task for Account Executive', desc: 'Generates urgent call task with 1-hour SLA.' }
      ]
    },
    {
      id: 'tmpl-9',
      title: 'New Contact Engager',
      desc: 'Enrich and add your contacts to a sequence when they are newly created or saved.',
      author: 'by Apollo.io',
      categories: ['recommended'],
      badges: [{ label: 'AI Recommended', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Contact created or saved in Apollo', desc: 'Activates when a new prospect is added via Chrome extension or search.' },
        { title: 'Action: Auto-enrich with verified phone & email', desc: 'Fills in verified direct dial and verified corporate email address.' },
        { title: 'Action: Add to Inbound Sequence', desc: 'Enrolls contact in 4-step personalized email & call sequence.' }
      ]
    },
    {
      id: 'tmpl-10',
      title: 'Engage fast-growing companies with AI sequences',
      desc: 'Add companies with 50%+ employee growth in the last year to a list, then engage via AI-crafted sequences.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: Headcount growth signal (> 50% YoY)', desc: 'Detects hyper-growth companies in your target ICP industries.' },
        { title: 'Action: Find VP & Director decision makers', desc: 'Apollo AI automatically fetches verified emails for top executives.' },
        { title: 'Action: AI Personalized Sequence', desc: 'Crafts custom cold pitch referencing recent company expansion.' }
      ]
    },
    {
      id: 'tmpl-11',
      title: 'Engage companies researching your category with AI outreach',
      desc: "Add interested companies to a list, then trigger an AI-drafted sequence aligned to the topics they've been researching.",
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: High Bombora Intent score on keywords', desc: 'Captures accounts researching your software category right now.' },
        { title: 'Action: Filter by ICP (Revenue > $5M)', desc: 'Qualifies accounts matching ideal customer company size.' },
        { title: 'Action: Trigger Topic-Specific AI Campaign', desc: 'Emails prospects with tailored case studies matching search intent.' }
      ]
    },
    {
      id: 'tmpl-12',
      title: 'Target new hires with AI-drafted outreach in first 90 days',
      desc: 'When a contact enters a new role, add them to a list, then enroll them in a targeted executive outreach sequence.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Job Change Detected in past 90 days', desc: 'Identifies newly appointed VP/Directors evaluating new vendor stacks.' },
        { title: 'Action: Generate "First 90 Days" Congratulatory Pitch', desc: 'Tailors messaging to onboarding priorities and quick wins.' },
        { title: 'Action: Enroll in High-Touch Executive Cadence', desc: 'Triggers multi-channel outreach across email and LinkedIn.' }
      ]
    },
    {
      id: 'tmpl-13',
      title: 'Re-engage closed lost opportunities after 6 months',
      desc: 'Automatically reactivate lost deals when contract renew dates or trigger events arise.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [{ label: 'Generate pipeline', type: 'generate' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Deal Closed-Lost Date > 180 Days Ago', desc: 'Selects previous prospects whose existing contracts may be up for renewal.' },
        { title: 'Action: Verify contact still employed at company', desc: 'Refreshes employment status and job title.' },
        { title: 'Action: Enroll in "What has changed" Re-engagement Sequence', desc: 'Shares new product launches and case studies.' }
      ]
    },
    {
      id: 'tmpl-14',
      title: 'Target funding round announcements with AI pitch',
      desc: 'Detect recently funded Series A-C startups and trigger hyper-relevant value proposition sequences.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: New Funding Round Announced (Crunchbase / Apollo)', desc: 'Detects capital raise >= $5M in past 14 days.' },
        { title: 'Action: Identify Head of Growth & Sales Leadership', desc: 'Pulls verified decision-maker contact records.' },
        { title: 'Action: Send Funding-Triggered Sequence', desc: 'Pitch tailored around scaling team productivity with new capital.' }
      ]
    },
    {
      id: 'tmpl-15',
      title: 'Outreach to job switchers who were past champions',
      desc: 'Track when past product users transition to new companies and reach out within 30 days.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: Past Champion Changes Employer', desc: 'Cross-references historic enthusiastic users with updated LinkedIn jobs.' },
        { title: 'Action: Craft Familiarity & Welcome Gift Email', desc: 'Reminds them of successful metrics achieved at previous company.' },
        { title: 'Action: Create VIP AE Call Task', desc: 'Sets reminder for account executive to reach out directly.' }
      ]
    },
    {
      id: 'tmpl-16',
      title: 'Engage inbound webinar attendees with AI follow-up',
      desc: 'Segment webinar participants by attendance duration and trigger contextual AI sequences.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [{ label: 'Generate pipeline', type: 'generate' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Zoom / Livestorm Webinar Completed', desc: 'Ingests attendee list with minutes watched and poll answers.' },
        { title: 'Condition: Attendance >= 30 mins', desc: 'Identifies deeply engaged participants.' },
        { title: 'Action: Send Recording + Custom AI Follow-Up Cadence', desc: 'Delivers slide deck and offers 1-on-1 strategy deep dive.' }
      ]
    },
    {
      id: 'tmpl-17',
      title: 'High Intent Tech Stack Adoption Outreach',
      desc: 'Trigger outbound when prospective accounts install compatible or complementary software.',
      author: 'by Apollo.io',
      categories: ['pipeline'],
      badges: [
        { label: 'Generate pipeline', type: 'generate' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Target Tech Stack Installed (e.g. Salesforce / Stripe)', desc: 'Detects new software integration on account domain.' },
        { title: 'Action: Match Integrations Decision Maker', desc: 'Finds Head of Revenue Operations or Engineering.' },
        { title: 'Action: Send Integration-Specific Value Proposition', desc: 'Highlights native plug-and-play workflow benefits.' }
      ]
    },
    {
      id: 'tmpl-18',
      title: 'CRM Data Auto-Cleaning & Enrichment',
      desc: 'Scan CRM records quarterly to fill missing phone numbers, verified emails, and updated job titles.',
      author: 'by Apollo.io',
      categories: ['enrichment'],
      badges: [{ label: 'Data enrichment', type: 'enrichment' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Scheduled Quarterly CRM Scan', desc: 'Audits stale records without activity in last 90 days.' },
        { title: 'Action: Refresh Email Deliverability & Direct Dial', desc: 'Validates SMTP deliverability and updates invalid entries.' },
        { title: 'Action: Flag Bounced / Left Company Contacts', desc: 'Marks stale records as departed to prevent wasted outreach.' }
      ]
    },
    {
      id: 'tmpl-19',
      title: 'HubSpot & Salesforce Bi-directional Sync Automation',
      desc: 'Keep lead status, stages, and activity history perfectly synchronized across your tech stack.',
      author: 'by Apollo.io',
      categories: ['integrations'],
      badges: [{ label: 'Integrations', type: 'integrations' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Lead Status Updated in Apollo', desc: 'Triggers on sequence completion, reply, or meeting booked.' },
        { title: 'Action: Field Mapping & Bi-directional Sync', desc: 'Updates CRM Lead/Contact record and deal stage in real-time.' },
        { title: 'Action: Log Call Notes & Email Transcripts', desc: 'Appends complete conversation history to CRM timeline.' }
      ]
    },
    {
      id: 'tmpl-20',
      title: 'Multi-tier ICP Lead Routing by Deal Size',
      desc: 'Route enterprise leads to Strategic AEs and mid-market accounts to standard automated cadences.',
      author: 'by Apollo.io',
      categories: ['multibranch'],
      badges: [{ label: 'Multi-branch', type: 'multibranch' }],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: New Inbound Prospect Captured', desc: 'Evaluates company employee count and estimated ARR.' },
        { title: 'Branch 1: Headcount > 500 (Enterprise)', desc: 'Assigns dedicated Strategic AE + custom bespoke account plan.' },
        { title: 'Branch 2: Headcount <= 500 (Growth/SMB)', desc: 'Routes to automated self-service scheduling cadence.' }
      ]
    },
    {
      id: 'tmpl-21',
      title: 'Dynamic Intent Threshold Branching Flow',
      desc: 'Branch high intent visitors to immediate phone calls and low intent to educational email nurture.',
      author: 'by Apollo.io',
      categories: ['multibranch'],
      badges: [{ label: 'Multi-branch', type: 'multibranch' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Web & Intent Signal Activity', desc: 'Calculates aggregated 30-day intent score.' },
        { title: 'Branch 1: Intent Score > 75', desc: 'Dispatches instant SDR dialer task within 5 minutes.' },
        { title: 'Branch 2: Intent Score <= 75', desc: 'Enrolls contact in educational weekly industry newsletter nurture.' }
      ]
    },
    {
      id: 'tmpl-22',
      title: 'Geographic & Territory Auto-Assignment Flow',
      desc: 'Sort inbound prospects by country, state, and timezone into designated regional sales reps.',
      author: 'by Apollo.io',
      categories: ['multibranch'],
      badges: [{ label: 'Multi-branch', type: 'multibranch' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: New Lead Created', desc: 'Reads verified location metadata (Country, Region, Timezone).' },
        { title: 'Branch 1: North America (US/CA)', desc: 'Round-robins to US West / East SDR pod.' },
        { title: 'Branch 2: EMEA & APAC', desc: 'Assigns to international sales specialist team.' }
      ]
    },
    {
      id: 'tmpl-23',
      title: 'Product Usage Tier Lead Escalation Matrix',
      desc: 'Branch free tier users crossing 80% usage threshold straight to sales demo scheduling.',
      author: 'by Apollo.io',
      categories: ['multibranch'],
      badges: [{ label: 'Multi-branch', type: 'multibranch' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Product Telemetry Limit Alert', desc: 'Captures product event when workspace reaches 80% quota.' },
        { title: 'Branch 1: Domain is Business ICP', desc: 'Triggers AE outreach for team volume discount.' },
        { title: 'Branch 2: Generic / Personal Domain', desc: 'Shows in-app automated self-serve upgrade modal.' }
      ]
    },
    {
      id: 'tmpl-24',
      title: 'Cross-channel Multi-touch Re-engagement Tree',
      desc: 'Branch prospects based on email click vs LinkedIn connection acceptance for optimal follow-up.',
      author: 'by Apollo.io',
      categories: ['multibranch'],
      badges: [{ label: 'Multi-branch', type: 'multibranch' }],
      icons: ['zap', 'list', 'send'],
      steps: [
        { title: 'Trigger: Step 1 Multichannel Touchpoint Sent', desc: 'Monitors response across email and LinkedIn.' },
        { title: 'Branch 1: LinkedIn Accepted', desc: 'Sends direct personalized LinkedIn voice note / message.' },
        { title: 'Branch 2: No LinkedIn Response', desc: 'Sends follow-up email bump with customer quote.' }
      ]
    },
    {
      id: 'tmpl-25',
      title: 'Winner: Cold-to-Gold Outbound Framework',
      desc: 'Award-winning workflow: Combines news trigger, intent signals, and 3-step dynamic personalization.',
      author: 'by Apollo.io',
      categories: ['winners'],
      badges: [
        { label: 'Templates Competition Winners', type: 'winner' },
        { label: 'AI', type: 'ai', icon: <Sparkles size={11} /> }
      ],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Combined Company News + Intent Spike', desc: 'Filters for simultaneous hiring spree and high category intent.' },
        { title: 'Action: AI Hyper-personalization Engine', desc: 'Extracts exact quote from CEO interview into subject line.' },
        { title: 'Action: Sequence with 42% average reply rate', desc: 'Deploys battle-tested 4-step cadence.' }
      ]
    },
    {
      id: 'tmpl-26',
      title: 'Winner: Automated Inbound Speed-to-Lead Orchestrator',
      desc: 'Award-winning community template: Sub-2 minute lead qualification, enrichment, and SDR dispatch.',
      author: 'by Apollo.io',
      categories: ['winners'],
      badges: [{ label: 'Templates Competition Winners', type: 'winner' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: High-value Demo Request Submitted', desc: 'Ingests inbound prospect with zero delay.' },
        { title: 'Action: Instant Enrichment & AI Scoring', desc: 'Validates buyer seniority, company revenue, and budget.' },
        { title: 'Action: Auto-book Calendar Slot & Send Confirmation SMS', desc: 'Provides immediate booking link to prospect.' }
      ]
    },
    {
      id: 'tmpl-27',
      title: 'Executive Job Change Monitor & Pitch',
      desc: 'Monitor C-suite movements in Fortune 500 accounts and trigger custom congratulatory outreach.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Generate pipeline', type: 'generate' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: C-Suite Executive Promoted or Hired', desc: 'Filters for CEO, CTO, CRO, CMO job announcements.' },
        { title: 'Action: Fetch Verified Executive Direct Dial', desc: 'Provides verified corporate mobile.' },
        { title: 'Action: Trigger Strategic Outreach Sequence', desc: 'Delivers executive summary deck directly to inbox.' }
      ]
    },
    {
      id: 'tmpl-28',
      title: 'Quarterly Account Review Auto-Scheduler',
      desc: 'Automatically trigger meeting invites and health checks 45 days prior to renewal dates.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Customer Success', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Contract End Date in 45 Days', desc: 'Identifies accounts up for renewal in next quarter.' },
        { title: 'Action: Prepare ROI & Usage Summary Report', desc: 'Compiles seat adoption and metric gains.' },
        { title: 'Action: Send CSM Review Invitation', desc: 'Automates scheduling link with renewal proposals.' }
      ]
    },
    {
      id: 'tmpl-29',
      title: 'Unresponsive Lead Re-qualification Cadence',
      desc: 'Send 90-day break-up sequence and update CRM stage to dormant if no interaction detected.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Nurture', type: 'recommended' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: 5 touches completed with 0 opens/replies', desc: 'Isolates cold unengaged contacts.' },
        { title: 'Action: Send Friendly "Permission to Close File" Email', desc: 'Final low-friction break-up email.' },
        { title: 'Action: Re-assign to Long-term Marketing Nurture', desc: 'Puts lead on monthly product roundup list.' }
      ]
    },
    {
      id: 'tmpl-30',
      title: 'G2 & Capterra Reviewer Outreach Automation',
      desc: 'Reach out to verified buyers who recently evaluated your competitors on software review platforms.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Intent Signal', type: 'generate' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: G2 Buyer Intent Signal Received', desc: 'Captures accounts researching alternatives in your category.' },
        { title: 'Action: Find Active Decision Makers', desc: 'Pulls Director of IT and VP of Operations.' },
        { title: 'Action: Send G2 Badges & Customer Testimonials Sequence', desc: 'Demonstrates proven superiority with social proof.' }
      ]
    },
    {
      id: 'tmpl-31',
      title: 'Event & Conference Lead Scanner Sync',
      desc: 'Instantly parse conference badge scans, enrich company data, and assign next-day follow-up tasks.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Field Sales', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: CSV or Mobile Badge Scan Ingested', desc: 'Imports conference booth attendees.' },
        { title: 'Action: Apollo Data Waterfall Enrichment', desc: 'Appends phone, LinkedIn URL, and company ARR.' },
        { title: 'Action: Dispatch Post-Event Follow-Up Cadence', desc: 'Sends "Great meeting you at the booth!" within 24 hours.' }
      ]
    },
    {
      id: 'tmpl-32',
      title: 'Product Sign-up Onboarding Health Monitor',
      desc: 'Trigger helpful how-to guides when self-serve users stall at step 2 of setup.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Product Led', type: 'visitor' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: User created workspace > 48h ago & no invites sent', desc: 'Identifies stalled onboarding flow.' },
        { title: 'Action: Send 60-second Loom Tutorial Video', desc: 'Offers step-by-step guidance on inviting teammates.' },
        { title: 'Action: Ping CS team if company size > 100', desc: 'Alerts account manager for concierge onboarding.' }
      ]
    },
    {
      id: 'tmpl-33',
      title: 'Executive Referral & Introduction Sequencer',
      desc: 'Coordinate peer-to-peer executive introductions with pre-filled ghostwriting drafts.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Executive', type: 'generate' }],
      icons: ['zap', 'send'],
      steps: [
        { title: 'Trigger: Mutual 1st Degree LinkedIn Connection Found', desc: 'Matches target prospect with current investor or board member.' },
        { title: 'Action: Generate Forwardable Introduction Email', desc: 'Pre-writes draft email for introducer with 1-click send.' },
        { title: 'Action: Track Introduction Status', desc: 'Notifies AE when warm introduction has been initiated.' }
      ]
    },
    {
      id: 'tmpl-34',
      title: 'Contract Expiration Risk Warning System',
      desc: 'Alert account managers when customer usage dips 30% during the final 60 days of annual contract.',
      author: 'by Apollo.io',
      categories: ['general'],
      badges: [{ label: 'Customer Success', type: 'recommended' }],
      icons: ['zap', 'list'],
      steps: [
        { title: 'Trigger: Daily Active Users drops >= 30% in last 30 days', desc: 'Early churn risk indicator.' },
        { title: 'Action: Create High-Priority Churn Risk Alert in Slack', desc: 'Tags VP of Customer Success and Account Lead.' },
        { title: 'Action: Trigger Proactive Executive Outreach Plan', desc: 'Schedules emergency alignment call with account sponsor.' }
      ]
    }
  ];

  // Category counts matching exact screenshot numbers:
  // All templates (34), AI Recommended (3), Generate pipeline (10), Data enrichment (2), Integrations (1), Website Visitor (3), Multi-branch (5), Templates Competition Winners (2)
  const categoryMenu = [
    { key: 'all', label: 'All templates', count: 34 },
    { key: 'recommended', label: 'AI Recommended', count: 3 },
    { key: 'pipeline', label: 'Generate pipeline', count: 10 },
    { key: 'enrichment', label: 'Data enrichment', count: 2 },
    { key: 'integrations', label: 'Integrations', count: 1 },
    { key: 'visitor', label: 'Website Visitor', count: 3 },
    { key: 'multibranch', label: 'Multi-branch', count: 5 },
    { key: 'winners', label: 'Templates Competition Winners', count: 2 }
  ];

  // Filter templates on the Templates tab
  const getFilteredTemplates = () => {
    let list = allTemplatesData;

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter(item => item.categories.includes(selectedCategory));
    }

    // Filter by search
    if (templatesSearch.trim()) {
      const q = templatesSearch.toLowerCase();
      list = list.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.badges.some(b => b.label.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const filteredCatalog = getFilteredTemplates();

  // Filter for Workflows tab (6 main cards)
  const workflowsTabCards = allTemplatesData.slice(0, 6).filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
  });

  const handleUseTemplate = (template) => {
    setPreviewTemplate(null);
    showToast(`Workflow created from "${template.title}" template!`);
  };

  const handleGenerateCopilot = (e) => {
    e.preventDefault();
    if (!copilotPrompt.trim()) return;
    setShowCopilotModal(false);
    showToast(`AI Outbound Copilot generated workflow for "${copilotPrompt}"`);
    setCopilotPrompt('');
  };

  // Workflow Builder Handlers (Matching screenshot 1:1)
  const handleSelectPreset = (title, desc) => {
    setWorkflowTitle(title);
    setCanvasNodes([
      { type: 'trigger', title: `Trigger: ${title}`, desc: desc },
      { type: 'action', title: 'Action: Notify sales team via Slack & Email', desc: 'Alerts assigned SDR immediately.' },
      { type: 'action', title: 'Action: Create high-priority phone call task', desc: 'Sets task due within 15 minutes.' }
    ]);
    setBuilderMode('canvas');
    showToast(`Loaded ${title} automation into canvas`);
  };

  const handleStartScratch = () => {
    setCanvasNodes([
      { type: 'trigger', title: 'Add Trigger', desc: 'Select an event, contact action, or CRM change to begin automation' }
    ]);
    setBuilderMode('canvas');
    showToast('Started blank workflow canvas');
  };

  const handleAiGenerateWorkflow = (promptText) => {
    if (!promptText.trim()) return;
    setWorkflowTitle(promptText.length > 35 ? promptText.slice(0, 35) + '...' : promptText);
    setCanvasNodes([
      { type: 'trigger', title: `Trigger: When signal occurs`, desc: promptText },
      { type: 'action', title: 'Action: Execute automated outreach step', desc: 'Matches intent signal and schedules sequence.' }
    ]);
    setBuilderMode('canvas');
    showToast('AI generated workflow from prompt!');
  };

  // Find category display title
  const activeCategoryObj = categoryMenu.find(c => c.key === selectedCategory) || categoryMenu[0];

  // ─── FULL PAGE WORKFLOW BUILDER (MATCHING SCREENSHOT 1:1) ───
  if (isCreatingWorkflow) {
    return (
      <div className="wf-view-container wf-builder-page-root">
        {/* Top Header Bar */}
        <div className="wf-builder-topbar">
          {/* Breadcrumbs: Workflows > New workflow - Sep 08, 2026, 18:01 */}
          <div className="wf-builder-breadcrumb">
            <button
              type="button"
              className="wf-builder-crumb-link"
              onClick={() => {
                setIsCreatingWorkflow(false);
                setBuilderMode('assistant');
              }}
            >
              Workflows
            </button>
            <span className="wf-builder-crumb-sep">›</span>
            <span className="wf-builder-crumb-current">{workflowTitle}</span>
          </div>

          {/* Title Row & Actions */}
          <div className="wf-builder-title-row">
            <div className="wf-builder-title-group">
              <input
                type="text"
                className="wf-builder-title-input"
                value={workflowTitle}
                onChange={(e) => setWorkflowTitle(e.target.value)}
                title="Click to rename workflow"
              />
              <span className="wf-builder-draft-badge">
                <span className="wf-draft-dot">●</span> Draft
              </span>
            </div>

            <div className="wf-builder-actions-group">
              <button
                type="button"
                className="wf-builder-btn-save"
                onClick={() => showToast('Workflow draft saved successfully')}
              >
                Save
              </button>
              <div className="wf-builder-launch-group">
                <button
                  type="button"
                  className="wf-builder-btn-launch"
                  onClick={() => showToast('Workflow is currently in Draft. Add steps to activate.')}
                >
                  Launch workflow
                </button>
                <button
                  type="button"
                  className="wf-builder-btn-launch-caret"
                  onClick={() => showToast('Options: Activate immediately, Schedule, or Export')}
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Step Tabs: ① Workflow | ② Settings | ③ Enrollment */}
          <div className="wf-builder-tabs-bar">
            <button
              type="button"
              className={`wf-builder-tab-btn ${builderTab === 'workflow' ? 'active' : ''}`}
              onClick={() => setBuilderTab('workflow')}
            >
              <span className="wf-builder-tab-num">①</span>
              <span>Workflow</span>
            </button>
            <button
              type="button"
              className={`wf-builder-tab-btn ${builderTab === 'settings' ? 'active' : ''}`}
              onClick={() => setBuilderTab('settings')}
            >
              <span className="wf-builder-tab-num">②</span>
              <span>Settings</span>
            </button>
            <button
              type="button"
              className={`wf-builder-tab-btn ${builderTab === 'enrollment' ? 'active' : ''}`}
              onClick={() => setBuilderTab('enrollment')}
            >
              <span className="wf-builder-tab-num">③</span>
              <span>Enrollment</span>
            </button>
          </div>
        </div>

        {/* ─── Builder Canvas Area ─── */}
        {builderTab === 'workflow' && (
          <div className="wf-builder-canvas">
            {builderMode === 'assistant' ? (
              <div className="wf-builder-center-wrapper">
                {/* Central Floating Card */}
                <div className="wf-builder-card">
                  <h2 className="wf-builder-card-title">What can I help automate?</h2>

                  {/* AI Prompt Input */}
                  <div className="wf-builder-prompt-box">
                    <span className="wf-builder-prompt-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line>
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="wf-builder-prompt-input"
                      placeholder="Ex: When a contact opens an email, create a follow-up phone call task"
                      value={aiAutomatePrompt}
                      onChange={(e) => setAiAutomatePrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && aiAutomatePrompt.trim()) {
                          handleAiGenerateWorkflow(aiAutomatePrompt);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="wf-builder-mic-btn"
                      title="Voice dictate automation"
                      onClick={() => {
                        showToast('Listening... Speak your automation goal');
                        setAiAutomatePrompt('When a contact opens an email, create a follow-up phone call task');
                      }}
                    >
                      <Mic size={18} />
                    </button>
                  </div>

                  <p className="wf-builder-disclaimer">
                    Apollo Assistant can make mistakes. Double check responses for accuracy.
                  </p>

                  {/* 3 AI Recommended Cards */}
                  <div className="wf-builder-rec-grid">
                    {/* Card 1 */}
                    <div
                      className="wf-builder-rec-card"
                      onClick={() => handleSelectPreset('Email Open Alert', 'Notify your sales team when a contact opens an email so they can follow up immediately.')}
                    >
                      <span className="wf-builder-ai-badge">✦ AI Recommended</span>
                      <h4 className="wf-builder-rec-title">Email Open Alert</h4>
                      <p className="wf-builder-rec-desc">
                        Notify your sales team when a contact opens an email so they can follo...
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div
                      className="wf-builder-rec-card"
                      onClick={() => handleSelectPreset('New Contact Engager', 'Enrich and add your contacts to a sequence when they are newly added.')}
                    >
                      <span className="wf-builder-ai-badge">✦ AI Recommended</span>
                      <h4 className="wf-builder-rec-title">New Contact Engager</h4>
                      <p className="wf-builder-rec-desc">
                        Enrich and add your contacts to a sequence when they are newly...
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div
                      className="wf-builder-rec-card"
                      onClick={() => handleSelectPreset('Email Reply Tracker', 'Add contacts to a list and assign a task when they reply to an email.')}
                    >
                      <span className="wf-builder-ai-badge">✦ AI Recommended</span>
                      <h4 className="wf-builder-rec-title">Email Reply Tracker</h4>
                      <p className="wf-builder-rec-desc">
                        Add contacts to a list and assign a task when they reply to an email.
                      </p>
                    </div>
                  </div>

                  {/* Explore all templates link */}
                  <div className="wf-builder-explore-wrap">
                    <button
                      type="button"
                      className="wf-builder-explore-link"
                      onClick={() => {
                        setIsCreatingWorkflow(false);
                        setActiveTab('templates');
                      }}
                    >
                      Explore all templates
                    </button>
                  </div>
                </div>

                {/* OR Divider */}
                <div className="wf-builder-or-divider">
                  <span className="wf-builder-or-label">OR</span>
                </div>

                {/* Start from scratch */}
                <button
                  type="button"
                  className="wf-builder-scratch-btn"
                  onClick={handleStartScratch}
                >
                  Start from scratch
                </button>
              </div>
            ) : (
              /* Canvas Flow Mode (Visual Nodes) */
              <div className="wf-builder-nodes-canvas">
                <div className="wf-canvas-toolbar">
                  <button
                    type="button"
                    className="wf-canvas-back-btn"
                    onClick={() => setBuilderMode('assistant')}
                  >
                    <ArrowLeft size={14} /> Back to assistant
                  </button>
                  <span className="wf-canvas-hint">
                    Visual Automation Flow: <strong>{workflowTitle}</strong>
                  </span>
                </div>

                <div className="wf-flow-nodes-wrapper">
                  {canvasNodes.map((node, nIdx) => (
                    <React.Fragment key={nIdx}>
                      <div className={`wf-canvas-node ${node.type}`}>
                        <div className="wf-node-pill">
                          {node.type === 'trigger' ? <Zap size={13} /> : <Check size={13} />}
                          <span>{node.type === 'trigger' ? 'Trigger' : `Action ${nIdx}`}</span>
                        </div>
                        <h4 className="wf-canvas-node-title">{node.title}</h4>
                        <p className="wf-canvas-node-desc">{node.desc}</p>
                      </div>

                      {nIdx < canvasNodes.length - 1 && (
                        <div className="wf-canvas-connector">
                          <span className="wf-connector-line"></span>
                          <span className="wf-connector-dot"></span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  <div className="wf-canvas-connector">
                    <span className="wf-connector-line"></span>
                    <span className="wf-connector-dot"></span>
                  </div>

                  <button
                    type="button"
                    className="wf-canvas-add-step"
                    onClick={() => {
                      setCanvasNodes(prev => [
                        ...prev,
                        { type: 'action', title: `Action ${prev.length}: Send notification`, desc: 'Notify account owner and update CRM record' }
                      ]);
                      showToast('Added new workflow step');
                    }}
                  >
                    <Plus size={16} /> Add next step
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Right Floating Help Button */}
            <button
              type="button"
              className="wf-builder-fab-help"
              title="Help & documentation"
              onClick={() => setShowVideoModal(true)}
            >
              ?
            </button>
          </div>
        )}

        {/* ─── Settings Tab (Matching Screenshot 1:1) ─── */}
        {builderTab === 'settings' && (
          <div className="wf-builder-settings-root">
            <div className="wf-settings-container">
              {/* Card 1: Basic Info */}
              <div className="wf-settings-card">
                <h3 className="wf-settings-card-title">Basic Info</h3>

                <div className="wf-settings-group">
                  <label className="wf-settings-label">
                    Name <span className="wf-req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="wf-settings-text-input"
                    value={workflowTitle}
                    onChange={(e) => setWorkflowTitle(e.target.value)}
                  />
                </div>

                <div className="wf-settings-details-toggle-wrap">
                  <button
                    type="button"
                    className="wf-settings-details-toggle-btn"
                    onClick={() => setShowSettingsDetails(!showSettingsDetails)}
                  >
                    <span>{showSettingsDetails ? 'Hide details' : 'Show details'}</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transform: showSettingsDetails ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>

                  {showSettingsDetails && (
                    <div className="wf-settings-details-expanded">
                      <div className="wf-settings-group" style={{ marginTop: '14px' }}>
                        <label className="wf-settings-label">Description</label>
                        <textarea
                          rows={3}
                          className="wf-settings-textarea"
                          placeholder="Add a description for this workflow..."
                          value={workflowDescription}
                          onChange={(e) => setWorkflowDescription(e.target.value)}
                        />
                      </div>
                      <div className="wf-settings-meta-row">
                        <span className="wf-meta-item">Created: Sep 08, 2026, 18:01</span>
                        <span className="wf-meta-item">Owner: Shivam Ahirwar</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Customization */}
              <div className="wf-settings-card">
                <h3 className="wf-settings-card-title">Customization</h3>

                {/* Section 1: Enrollment approval */}
                <div className="wf-custom-section">
                  <div className="wf-custom-header-row">
                    <span className="wf-custom-sec-title">Enrollment approval</span>
                    <span className="wf-badge-new">New</span>
                  </div>

                  <div className="wf-approval-options">
                    {/* Option 1: Automatic approval */}
                    <label
                      className={`wf-approval-radio-item ${enrollmentApproval === 'automatic' ? 'selected' : ''}`}
                      onClick={() => setEnrollmentApproval('automatic')}
                    >
                      <input
                        type="radio"
                        name="enrollmentApproval"
                        checked={enrollmentApproval === 'automatic'}
                        onChange={() => setEnrollmentApproval('automatic')}
                        className="wf-radio-input"
                      />
                      <div className="wf-approval-text-wrap">
                        <strong className="wf-approval-title">Automatic approval</strong>
                        <p className="wf-approval-desc">
                          Approve people who meet the enrollment criteria and take actions automatically
                        </p>
                      </div>
                    </label>

                    {/* Option 2: Manual approval */}
                    <label
                      className={`wf-approval-radio-item ${enrollmentApproval === 'manual' ? 'selected' : ''}`}
                      onClick={() => setEnrollmentApproval('manual')}
                    >
                      <input
                        type="radio"
                        name="enrollmentApproval"
                        checked={enrollmentApproval === 'manual'}
                        onChange={() => setEnrollmentApproval('manual')}
                        className="wf-radio-input"
                      />
                      <div className="wf-approval-text-wrap">
                        <strong className="wf-approval-title">Manual approval</strong>
                        <p className="wf-approval-desc">
                          Tasks are created for manual review and approval of people before actions can be taken.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Section 2: Limit records processed */}
                <div className="wf-custom-section">
                  <div className="wf-custom-header-row" style={{ gap: '6px' }}>
                    <span className="wf-custom-sec-title">Limit records processed</span>
                    <span
                      className="wf-info-icon-btn"
                      title="Active workflows process up to 10K people in each run"
                    >
                      <Info size={14} />
                    </span>
                  </div>
                  <p className="wf-section-note">
                    Note: Active workflows process up to 10K people in each run.
                  </p>

                  <div className="wf-per-workflow-wrap">
                    <span className="wf-sub-label">Per workflow</span>

                    {/* Row 1: Max people per workflow */}
                    <div className="wf-limit-row">
                      <label className="wf-limit-label-side">
                        <input
                          type="checkbox"
                          checked={limitMaxPeople}
                          onChange={(e) => setLimitMaxPeople(e.target.checked)}
                          className="wf-checkbox-input"
                        />
                        <span>Max people per workflow</span>
                      </label>
                      <input
                        type="text"
                        disabled={!limitMaxPeople}
                        value={maxPeopleVal}
                        onChange={(e) => setMaxPeopleVal(e.target.value)}
                        placeholder=""
                        className={`wf-limit-number-input ${!limitMaxPeople ? 'disabled-gray' : ''}`}
                      />
                    </div>

                    {/* Row 2: Max people per company */}
                    <div className="wf-limit-row">
                      <label className="wf-limit-label-side">
                        <input
                          type="checkbox"
                          checked={limitMaxPeopleCompany}
                          onChange={(e) => setLimitMaxPeopleCompany(e.target.checked)}
                          className="wf-checkbox-input"
                        />
                        <span>Max people per company (per workflow)</span>
                      </label>
                      <input
                        type="text"
                        disabled={!limitMaxPeopleCompany}
                        value={maxPeopleCompanyVal}
                        onChange={(e) => setMaxPeopleCompanyVal(e.target.value)}
                        className="wf-limit-number-input active-input"
                      />
                    </div>

                    {/* Row 3: Max credits per workflow */}
                    <div className="wf-limit-row">
                      <label className="wf-limit-label-side">
                        <input
                          type="checkbox"
                          checked={limitMaxCredits}
                          onChange={(e) => setLimitMaxCredits(e.target.checked)}
                          className="wf-checkbox-input"
                        />
                        <span>Max credits per workflow</span>
                      </label>
                      <input
                        type="text"
                        disabled={!limitMaxCredits}
                        value={maxCreditsVal}
                        onChange={(e) => setMaxCreditsVal(e.target.value)}
                        placeholder=""
                        className={`wf-limit-number-input ${!limitMaxCredits ? 'light-gray' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Custom table layout */}
                <div className="wf-custom-section">
                  <span className="wf-custom-sec-title">Custom table layout</span>
                  <div className="wf-table-layout-wrap">
                    <button
                      type="button"
                      className="wf-table-layout-btn"
                      onClick={() => showToast('Switched to Default view layout')}
                    >
                      <LayoutGrid size={15} />
                      <span>Default view</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>

                {/* Section 4: Sort enrollment & Sort order (2 columns side by side) */}
                <div className="wf-sort-row-grid">
                  {/* Col 1: Sort enrollment */}
                  <div className="wf-sort-col">
                    <label className="wf-settings-label">Sort enrollment</label>
                    <div className="wf-sort-select-box">
                      <List size={15} className="wf-sort-left-icon" />
                      <span className="wf-sort-value-text">{sortEnrollment}</span>
                      <div className="wf-sort-right-icons">
                        <button
                          type="button"
                          className="wf-sort-clear-btn"
                          onClick={() => {
                            setSortEnrollment('Relevance');
                            showToast('Reset enrollment sorting to Relevance');
                          }}
                          title="Clear"
                        >
                          <XCircle size={14} />
                        </button>
                        <ChevronDown size={14} className="wf-sort-caret-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Sort order */}
                  <div className="wf-sort-col">
                    <label className="wf-settings-label">Sort order</label>
                    <div className="wf-sort-select-box">
                      <ArrowDownWideNarrow size={15} className="wf-sort-left-icon" />
                      <span className="wf-sort-value-text">{sortOrder}</span>
                      <ChevronDown size={14} className="wf-sort-caret-icon" />
                    </div>
                  </div>
                </div>

                {/* Section 5: Enrollment notifications */}
                <div className="wf-custom-section" style={{ marginTop: '24px', borderBottom: 'none' }}>
                  <span className="wf-custom-sec-title">Enrollment notifications</span>
                  <div className="wf-notif-row" style={{ marginTop: '8px' }}>
                    <label className="wf-notif-label">
                      <input
                        type="checkbox"
                        checked={notifyOnEnrollment}
                        onChange={(e) => setNotifyOnEnrollment(e.target.checked)}
                        className="wf-checkbox-input"
                      />
                      <span>Notify when people meet the enrollment criteria.</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right Floating Help Button */}
            <button
              type="button"
              className="wf-builder-fab-help"
              title="Help & documentation"
              onClick={() => setShowVideoModal(true)}
            >
              ?
            </button>
          </div>
        )}

        {/* ─── Enrollment Tab ─── */}
        {builderTab === 'enrollment' && (
          <div className="wf-builder-tab-panel">
            <div className="wf-panel-inner-card">
              <h3 className="wf-panel-title">Enrollment Criteria & Exclusions</h3>
              <p className="wf-panel-sub">Manage which contacts and accounts qualify for enrollment.</p>

              <div className="wf-panel-options">
                <label className="wf-panel-checkbox-row">
                  <input type="checkbox" defaultChecked />
                  <div>
                    <strong>Allow re-enrollment</strong>
                    <p>Records can trigger this workflow again after 30 days.</p>
                  </div>
                </label>

                <label className="wf-panel-checkbox-row">
                  <input type="checkbox" defaultChecked />
                  <div>
                    <strong>Exclude opted-out and unsubscribed contacts</strong>
                    <p>Respect global opt-outs and do not send automated tasks.</p>
                  </div>
                </label>

                <label className="wf-panel-checkbox-row">
                  <input type="checkbox" defaultChecked />
                  <div>
                    <strong>Match company domain with target account list</strong>
                    <p>Only trigger actions if the contact belongs to a tier-1 company.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="wf-view-container">
      {/* ─── 1. Header Row ─── */}
      <div className="wf-header">
        <div className="wf-header-left">
          <h1 className="wf-title">Workflows</h1>
          <div className="wf-tabs">
            <button
              className={`wf-tab-btn ${activeTab === 'workflows' ? 'active' : ''}`}
              onClick={() => setActiveTab('workflows')}
            >
              Workflows
            </button>
            <button
              className={`wf-tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </button>
          </div>
        </div>

        <div className="wf-header-right">
          <button className="wf-btn-copilot" onClick={() => setShowCopilotModal(true)}>
            <Sparkles size={14} />
            Outbound Copilot
          </button>
          <button className="wf-btn-create" onClick={() => { setIsCreatingWorkflow(true); setBuilderMode('assistant'); }}>
            Create workflow
          </button>
        </div>
      </div>

      {/* ─── 2. TAB 1: WORKFLOWS TAB ─── */}
      {activeTab === 'workflows' && (
        <div className="wf-body">
          {/* Top Collapsible: Start with workflow templates */}
          <div className="wf-top-templates-card">
            <div className="wf-top-templates-header">
              <h3 className="wf-top-templates-title">Start with workflow templates</h3>
              <button
                className="wf-top-templates-toggle"
                onClick={() => setIsTopTemplatesExpanded(!isTopTemplatesExpanded)}
              >
                <FileText size={13} />
                <span>View all templates</span>
                {isTopTemplatesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>

            {isTopTemplatesExpanded && (
              <div className="wf-top-cards-grid">
                {topTemplates.map(tmpl => (
                  <div
                    key={tmpl.id}
                    className="wf-mini-card"
                    onClick={() => {
                      const match = allTemplatesData.find(t => t.title === tmpl.title) || {
                        ...tmpl,
                        author: 'by Apollo.io',
                        steps: [
                          { title: 'Trigger: Account Signal Detected', desc: 'Identifies high intent activity or firmographic match.' },
                          { title: 'Condition: Filter Target Contacts', desc: 'Selects primary decision makers in sales & marketing.' },
                          { title: 'Action: Automated Outreach', desc: 'Enrolls in high-touch multichannel cadence.' }
                        ]
                      };
                      setPreviewTemplate(match);
                    }}
                  >
                    <div className="wf-mini-card-badges">
                      {tmpl.badges.map((b, idx) => (
                        <span key={idx} className={`wf-badge ${b.type}`}>
                          {b.icon} {b.label}
                        </span>
                      ))}
                    </div>
                    <h4 className="wf-mini-card-title">{tmpl.title}</h4>
                    <p className="wf-mini-card-desc">{tmpl.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Filter & Search Controls ─── */}
          <div className="wf-controls-bar">
            <div className="wf-controls-left">
              <button
                className={`wf-btn-filter ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={14} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <div className="wf-search-wrapper">
                <Search className="wf-search-icon" size={15} />
                <input
                  type="text"
                  className="wf-search-input"
                  placeholder="Search workflows"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="wf-controls-right" style={{ position: 'relative' }}>
              <button
                className="wf-btn-sort"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown size={13} />
                Sort
              </button>
              {showSortDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '40px',
                    marginTop: '6px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    width: '180px',
                    padding: '6px'
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: sortBy === 'popular' ? '700' : '500',
                      background: sortBy === 'popular' ? '#f1f5f9' : 'transparent'
                    }}
                    onClick={() => { setSortBy('popular'); setShowSortDropdown(false); showToast('Sorted by: Most popular'); }}
                  >
                    Most popular
                  </div>
                  <div
                    style={{
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: sortBy === 'newest' ? '700' : '500',
                      background: sortBy === 'newest' ? '#f1f5f9' : 'transparent'
                    }}
                    onClick={() => { setSortBy('newest'); setShowSortDropdown(false); showToast('Sorted by: Recently created'); }}
                  >
                    Recently created
                  </div>
                  <div
                    style={{
                      padding: '8px 12px',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                      fontWeight: sortBy === 'alpha' ? '700' : '500',
                      background: sortBy === 'alpha' ? '#f1f5f9' : 'transparent'
                    }}
                    onClick={() => { setSortBy('alpha'); setShowSortDropdown(false); showToast('Sorted by: Name A-Z'); }}
                  >
                    Alphabetical (A-Z)
                  </div>
                </div>
              )}

              <button className="wf-btn-gear" onClick={() => showToast('Workflow settings')}>
                <Settings size={14} />
              </button>
            </div>
          </div>

          {/* Optional Filters Drawer */}
          {showFilters && (
            <div className="wf-filter-drawer">
              <div className="wf-filter-group">
                <span className="wf-filter-label">Category:</span>
                <select
                  className="wf-filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="pipeline">Generate Pipeline</option>
                  <option value="enrichment">Data Enrichment</option>
                  <option value="visitor">Website Visitor</option>
                  <option value="recommended">AI Recommended</option>
                  <option value="multibranch">Multi-branch</option>
                </select>
              </div>
              <div className="wf-filter-group">
                <span className="wf-filter-label">Status:</span>
                <select className="wf-filter-select" defaultValue="all">
                  <option value="all">All Statuses</option>
                  <option value="active">Active only</option>
                  <option value="draft">Drafts only</option>
                </select>
              </div>
              <div className="wf-filter-group">
                <span className="wf-filter-label">Created by:</span>
                <select className="wf-filter-select" defaultValue="all">
                  <option value="all">Anyone</option>
                  <option value="me">Created by me</option>
                  <option value="apollo">Apollo Pre-built</option>
                </select>
              </div>
            </div>
          )}

          {/* ─── Meet Workflows Hero Banner ─── */}
          <div className="wf-hero-banner">
            {/* Left Text */}
            <div className="wf-hero-left">
              <h2 className="wf-hero-title">
                Meet workflows: the easy way to get more done—with less manual effort
              </h2>
              <p className="wf-hero-desc">
                From reaching out to newly funded companies to getting ahead of renewals,
                workflows can automate key revenue-driving activities.
              </p>
              <div className="wf-hero-link-wrap">
                Learn workflows with the{' '}
                <a
                  className="wf-hero-link"
                  href="#academy"
                  onClick={(e) => { e.preventDefault(); showToast('Opening Apollo Academy Course...'); }}
                >
                  Apollo Academy course
                </a>
                .
              </div>
              <button
                className="wf-hero-cta-btn"
                onClick={() => {
                  setActiveTab('templates');
                  showToast('Displaying all 34 workflow templates');
                }}
              >
                See all workflow templates
              </button>
            </div>

            {/* Right Blue Visual Diagram */}
            <div className="wf-hero-right" onClick={() => setShowVideoModal(true)}>
              <div className="wf-hero-bg-blob wf-blob-1" />
              <div className="wf-hero-bg-blob wf-blob-2" />
              <div className="wf-hero-bg-blob wf-blob-3" />

              <div className="wf-hero-video-info">
                <h3 className="wf-hero-video-title">
                  Learn how to harness the power of Workflows
                </h3>
                <div className="wf-play-btn-circle">
                  <Play size={22} fill="#1d4ed8" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Floating Diagram Tree Nodes */}
              <div className="wf-diagram-tree" onClick={(e) => e.stopPropagation()}>
                <div className="wf-node">
                  <div className="wf-node-icon">⚙</div>
                  <span>When this happens</span>
                </div>
                <div className="wf-line-vertical" />
                <div className="wf-node">
                  <div className="wf-node-icon">⚙</div>
                  <span>Do this</span>
                </div>
                <div className="wf-line-vertical" />
                <div className="wf-branches-container">
                  <div className="wf-branch">
                    <span className="wf-branch-pill true">True</span>
                    <div className="wf-node" style={{ background: '#ffffff' }}>
                      <Send size={12} color="#2563eb" />
                      <span>Add to sequence</span>
                    </div>
                  </div>
                  <div className="wf-branch">
                    <span className="wf-branch-pill false">False</span>
                    <div className="wf-node" style={{ background: '#ffffff' }}>
                      <X size={12} color="#dc2626" />
                      <span>Exit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Section: Get started ASAP with workflow templates ─── */}
          <div className="wf-section-templates">
            <div className="wf-section-header">
              <h3 className="wf-section-title">Get started ASAP with workflow templates</h3>
              <span
                className="wf-section-link"
                onClick={() => {
                  setActiveTab('templates');
                  showToast('Viewing full 34 template catalog');
                }}
              >
                View all
              </span>
            </div>

            <div className="wf-cards-grid">
              {workflowsTabCards.map(item => (
                <div key={item.id} className="wf-card">
                  <div className="wf-card-top">
                    {item.icons.length > 0 && (
                      <div className="wf-card-icons-row">
                        {item.icons.includes('zap') && (
                          <div className="wf-icon-circle">
                            <Zap size={13} />
                          </div>
                        )}
                        {item.icons.includes('list') && (
                          <div className="wf-icon-circle">
                            <List size={13} />
                          </div>
                        )}
                        {item.icons.includes('send') && (
                          <div className="wf-icon-circle">
                            <Send size={13} />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="wf-card-badges-row">
                      {item.badges.map((b, idx) => (
                        <span key={idx} className={`wf-badge ${b.type}`}>
                          {b.icon} {b.label}
                        </span>
                      ))}
                    </div>

                    <h4 className="wf-card-title">{item.title}</h4>
                    <p className="wf-card-desc">{item.desc}</p>
                  </div>

                  <div className="wf-card-bottom">
                    <span className="wf-card-author">{item.author}</span>
                    <button
                      className="wf-btn-preview"
                      onClick={() => setPreviewTemplate(item)}
                    >
                      Preview template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── 3. TAB 2: TEMPLATES TAB (Screenshot 1:1 with 34 templates + left category filter) ─── */}
      {activeTab === 'templates' && (
        <div className="wf-templates-layout">
          {/* Left Sidebar Category Filters */}
          <div className="wf-templates-sidebar">
            <div className="wf-tmpl-search-wrapper">
              <Search className="wf-tmpl-search-icon" size={15} />
              <input
                type="text"
                className="wf-tmpl-search-input"
                placeholder="Search templates"
                value={templatesSearch}
                onChange={(e) => setTemplatesSearch(e.target.value)}
              />
            </div>

            <div className="wf-tmpl-categories-list">
              {categoryMenu.map(cat => (
                <button
                  key={cat.key}
                  className={`wf-tmpl-cat-item ${selectedCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  <span>{cat.label}</span>
                  <span className="wf-tmpl-cat-count">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="wf-templates-main">
            <div className="wf-templates-title-area">
              <h2 className="wf-templates-main-title">{activeCategoryObj.label}</h2>
              <p className="wf-templates-main-subtitle">
                Automate your end-to-end campaigns for a more efficient, scaleable, and accelerated GTM motion.
              </p>
            </div>

            {filteredCatalog.length === 0 ? (
              <div className="wf-tmpl-empty-state">
                <FileText size={32} color="#94a3b8" />
                <h4 style={{ margin: 0, color: '#0f172a' }}>No templates found</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  No templates match your search "{templatesSearch}". Try clearing filters.
                </p>
                <button
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                  onClick={() => { setTemplatesSearch(''); setSelectedCategory('all'); }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="wf-templates-grid4">
                {filteredCatalog.map(item => (
                  <div key={item.id} className="wf-tmpl-card">
                    <div className="wf-tmpl-card-top">
                      {/* Icons Row */}
                      {item.icons && item.icons.length > 0 && (
                        <div className="wf-card-icons-row" style={{ marginBottom: '4px' }}>
                          {item.icons.includes('zap') && (
                            <div className="wf-icon-circle">
                              <Zap size={13} />
                            </div>
                          )}
                          {item.icons.includes('list') && (
                            <div className="wf-icon-circle">
                              <List size={13} />
                            </div>
                          )}
                          {item.icons.includes('send') && (
                            <div className="wf-icon-circle">
                              <Send size={13} />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Badges */}
                      <div className="wf-card-badges-row">
                        {item.badges.map((b, idx) => (
                          <span key={idx} className={`wf-badge ${b.type}`}>
                            {b.icon} {b.label}
                          </span>
                        ))}
                      </div>

                      <h4 className="wf-tmpl-card-title">{item.title}</h4>
                      <p className="wf-tmpl-card-desc">{item.desc}</p>
                    </div>

                    <div className="wf-tmpl-card-bottom">
                      <span className="wf-card-author">{item.author}</span>
                      <button
                        className="wf-btn-preview"
                        onClick={() => setPreviewTemplate(item)}
                      >
                        Preview template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Floating Question Mark Help Icon ─── */}
      <button
        className="wf-floating-help"
        onClick={() => showToast('Apollo Workflows Help & Support Center')}
        title="Get help with Workflows"
      >
        ?
      </button>

      {/* ─── Modal 1: Preview Template Modal ─── */}
      {previewTemplate && (
        <div className="wf-modal-overlay" onClick={() => setPreviewTemplate(null)}>
          <div className="wf-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <div>
                <h3 className="wf-modal-title">{previewTemplate.title}</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>by Apollo.io • Pre-configured Automation</span>
              </div>
              <button className="wf-modal-close" onClick={() => setPreviewTemplate(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="wf-modal-body">
              <p style={{ fontSize: '13.5px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                {previewTemplate.desc}
              </p>

              <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: '8px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Workflow Steps
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {previewTemplate.steps?.map((step, idx) => (
                  <div key={idx} className="wf-flow-step">
                    <div className="wf-step-marker">{idx + 1}</div>
                    {idx < previewTemplate.steps.length - 1 && <div className="wf-step-connector" />}
                    <div className="wf-step-content">
                      <h5 className="wf-step-title">{step.title}</h5>
                      <p className="wf-step-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wf-modal-footer">
              <button
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setPreviewTemplate(null)}
              >
                Cancel
              </button>
              <button
                style={{
                  background: '#efff04',
                  border: '1px solid #d9e600',
                  borderRadius: '6px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
                onClick={() => handleUseTemplate(previewTemplate)}
              >
                Use this template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal 2: Outbound Copilot Modal ─── */}
      {showCopilotModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCopilotModal(false)}>
          <div className="wf-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#7e22ce" />
                <h3 className="wf-modal-title">Outbound Copilot</h3>
              </div>
              <button className="wf-modal-close" onClick={() => setShowCopilotModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleGenerateCopilot} className="wf-modal-body">
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                Describe in plain English what you want to automate, and Apollo Outbound Copilot will generate the triggers, filters, and sequence actions for you.
              </p>

              <textarea
                rows={4}
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                placeholder="e.g. When a VP of Engineering in Series A startups visits our pricing page, add them to our High Intent sequence and notify me on Slack."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
                autoFocus
              />

              <div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Suggested prompts:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                  {[
                    'Enrich new signups with company size and assign to SDR',
                    'Alert sales when closed-lost deal contact changes company',
                    'Enroll fast-growing AI companies into personalized cold email'
                  ].map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCopilotPrompt(sug)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '5px 10px',
                        fontSize: '11.5px',
                        color: '#334155',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>

              <div className="wf-modal-footer" style={{ margin: '10px -24px -24px -24px' }}>
                <button
                  type="button"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '7px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowCopilotModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#7e22ce',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '7px 18px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} />
                  Generate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Modal 3: Create Workflow (Choose Scratch vs Template) ─── */}
      {showCreateModal && (
        <div className="wf-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="wf-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <h3 className="wf-modal-title">Create a new workflow</h3>
              <button className="wf-modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="wf-modal-body">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => {
                    setShowCreateModal(false);
                    showToast('Opening Blank Workflow Canvas editor...');
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={18} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Start from scratch</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                    Build custom triggers, conditional branches, and automated actions.
                  </p>
                </div>

                <div
                  style={{
                    border: '1px solid #e9d5ff',
                    background: '#faf5ff',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowCopilotModal(true);
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3e8ff', color: '#7e22ce', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={18} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#6b21a8' }}>Use Outbound Copilot</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#7e22ce', lineHeight: 1.4 }}>
                    Type your objective and let Apollo AI build the complete workflow.
                  </p>
                </div>

                <div
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onClick={() => {
                    setShowCreateModal(false);
                    setActiveTab('templates');
                    showToast('Browse 34 verified templates below');
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={18} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Explore Templates</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>
                    Choose from 34 proven sales automation templates tested by top teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Modal 4: Video Explainer Modal ─── */}
      {showVideoModal && (
        <div className="wf-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="wf-modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="wf-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Video size={18} color="#2563eb" />
                <h3 className="wf-modal-title">Learn how to harness the power of Workflows</h3>
              </div>
              <button className="wf-modal-close" onClick={() => setShowVideoModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="wf-modal-body" style={{ padding: 0 }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  height: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#1d4ed8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => showToast('Playing Apollo Academy Workflows Masterclass (3:45 mins)')}
                >
                  <Play size={28} fill="#1d4ed8" style={{ marginLeft: '4px' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#cbd5e1' }}>
                  Apollo Academy: Automating Sales with Triggers & AI Sequences
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Duration: 3 minutes 45 seconds</span>
              </div>
            </div>

            <div className="wf-modal-footer">
              <button
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setShowVideoModal(false)}
              >
                Close
              </button>
              <button
                style={{
                  background: '#efff04',
                  border: '1px solid #d9e600',
                  borderRadius: '6px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0f172a',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowVideoModal(false);
                  showToast('Redirecting to Apollo Academy...');
                }}
              >
                Open Full Academy Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
