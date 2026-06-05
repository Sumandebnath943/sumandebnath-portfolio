// Ported from learningportfolio/js/data.js

export interface Credential {
  title: string;
  issuer: string;
  pdf: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  count: number;
}

export interface Experience {
  id: string;
  title: string;
  domain: string;
  description: string;
  whyItMatters: string;
  learningOutcome: string;
  skills: string[];
  recognizedBy: string[];
  credentialCount: number;
  featured: boolean;
  credentials: Credential[];
}

export const domains: Domain[] = [
  {
    id: "ai-foundations",
    name: "AI Foundations",
    description:
      "Mastered the core principles, neural mechanics, and foundational vocabulary of Artificial Intelligence. This knowledge is essential for evaluating vendor capabilities, understanding technical limitations, and communicating effectively with engineering teams.",
    count: 3,
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    description:
      "Developed advanced techniques for designing precise, context-rich inputs to guide generative AI models. This matters because it dramatically improves the fidelity of AI outputs, reducing hallucinations and accelerating complex analytical workflows.",
    count: 2,
  },
  {
    id: "responsible-ai",
    name: "Responsible AI",
    description:
      "Explored robust frameworks for ethics, bias mitigation, and the safe governance of AI systems. This is critical for protecting organizational reputation, ensuring compliance, and building trust when deploying automated solutions.",
    count: 1,
  },
  {
    id: "ai-strategy",
    name: "AI Strategy",
    description:
      "Learned to systematically align emerging AI capabilities with core organizational goals. This expertise is vital for driving business transformation, securing competitive advantage, and avoiding investments in dead-end technologies.",
    count: 2,
  },
  {
    id: "ai-leadership",
    name: "AI Leadership",
    description:
      "Acquired strategies for guiding cross-functional teams through the cultural and operational shifts required by intelligent automation. This ensures teams remain adaptable and innovative without disrupting existing operations.",
    count: 2,
  },
  {
    id: "claude-ecosystem",
    name: "Claude Ecosystem",
    description:
      "Deep dived into Anthropic's Claude models, including agentic coding and Cowork environments. This allows for the rapid automation of software engineering tasks and multi-agent workflows, serving as a powerful force multiplier for productivity.",
    count: 4,
  },
];

export const competencies: string[] = [
  "Artificial Intelligence",
  "Prompt Engineering",
  "Responsible AI",
  "AI Strategy",
  "Business Transformation",
  "Technology Leadership",
  "Generative AI",
  "Innovation Management",
];

export const experiences: Experience[] = [
  {
    id: "leading-responsible-ai",
    title: "Leading Responsible AI in Organizations",
    domain: "responsible-ai",
    description:
      "Explored governance frameworks, bias mitigation strategies, and the ethical integration of AI technologies within enterprise environments to ensure safety and compliance.",
    whyItMatters:
      "As AI deployment scales, organizations face unprecedented ethical and compliance risks. Proactive governance is essential to prevent algorithmic bias, protect brand reputation, and ensure regulatory alignment.",
    learningOutcome:
      "Developed an understanding of governance frameworks, ethical implementation strategies, bias mitigation approaches, and responsible AI leadership practices.",
    skills: ["Responsible AI", "AI Governance", "Technical Leadership"],
    recognizedBy: ["LinkedIn Learning", "HRCI", "PMI", "NASBA", "SHRM"],
    credentialCount: 5,
    featured: true,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/Leading Responsible AI in Organizations - LinkedIn Learning.pdf",
      },
      {
        title: "HRCI",
        issuer: "HRCI",
        pdf: "/learningportfolio/assets/certificates/Leading Responsible AI in Organizations - HRCI.pdf",
      },
      {
        title: "Project Management Institute",
        issuer: "PMI",
        pdf: "/learningportfolio/assets/certificates/Leading Responsible AI in Organizations - Project Management Institute.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/Leading Responsible AI in Organizations - NASBA.pdf",
      },
      {
        title: "SHRM",
        issuer: "SHRM",
        pdf: "/learningportfolio/assets/certificates/Leading Responsible AI in Organizations - SHRM.pdf",
      },
    ],
  },
  {
    id: "integrating-gen-ai-strategy",
    title: "Integrating Generative AI into Business Strategy",
    domain: "ai-strategy",
    description:
      "Developed capabilities to align Generative AI initiatives with core business objectives, driving transformation, operational efficiency, and competitive advantage.",
    whyItMatters:
      "Generative AI is shifting from an experimental tool to a core strategic asset. Organizations that fail to align AI capabilities with business goals risk falling behind competitors who successfully leverage automation for efficiency.",
    learningOutcome:
      "Gained the ability to evaluate Generative AI use cases, map them to strategic objectives, and oversee cross-functional deployment to maximize ROI and business transformation.",
    skills: ["AI Strategy", "Business Transformation", "Strategic Planning"],
    recognizedBy: ["LinkedIn Learning", "HRCI", "PMI", "NASBA", "SHRM"],
    credentialCount: 5,
    featured: true,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/Integrating Generative AI into Business Strategy - LinkedIn Learning.pdf",
      },
      {
        title: "HRCI",
        issuer: "HRCI",
        pdf: "/learningportfolio/assets/certificates/Integrating Generative AI into Business Strategy - HRCI.pdf",
      },
      {
        title: "Project Management Institute",
        issuer: "PMI",
        pdf: "/learningportfolio/assets/certificates/Integrating Generative AI into Business Strategy - Project Management Institute.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/Integrating Generative AI into Business Strategy - NASBA.pdf",
      },
      {
        title: "SHRM",
        issuer: "SHRM",
        pdf: "/learningportfolio/assets/certificates/Integrating Generative AI into Business Strategy - SHRM.pdf",
      },
    ],
  },
  {
    id: "ai-literacy-business-leaders",
    title: "AI Literacy for Business Leaders",
    domain: "ai-foundations",
    description:
      "Mastered the essential vocabulary, mechanics, and capabilities of AI systems, enabling informed executive decision-making and clear technical communication.",
    whyItMatters:
      "Effective leadership requires fluency in the technologies reshaping the market. Without foundational AI literacy, executives cannot accurately assess vendor claims, estimate project risks, or communicate technical vision.",
    learningOutcome:
      "Acquired a comprehensive understanding of machine learning principles, enabling confident decision-making and seamless collaboration with technical data teams.",
    skills: ["AI Literacy", "Business Leadership"],
    recognizedBy: ["LinkedIn Learning", "NASBA"],
    credentialCount: 2,
    featured: false,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/AI Literacy for Business Leaders - LinkedIn Learning.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/AI Literacy for Business Leaders - NASBA.pdf",
      },
    ],
  },
  {
    id: "ai-challenges-leadership",
    title: "AI Challenges and Opportunities for Leadership",
    domain: "ai-leadership",
    description:
      "Examined the complex risks, leadership hurdles, and massive strategic opportunities presented by the rapid adoption of AI in the modern workplace.",
    whyItMatters:
      "The rapid integration of AI introduces complex challenges, from workforce displacement concerns to data privacy vulnerabilities. Leaders must navigate these hurdles to unlock AI's massive strategic opportunities.",
    learningOutcome:
      "Learned to identify and manage the strategic risks associated with AI adoption while championing organizational resilience and fostering a culture of continuous adaptation.",
    skills: ["Leadership", "Risk Management"],
    recognizedBy: ["LinkedIn Learning", "PMI", "NASBA"],
    credentialCount: 3,
    featured: false,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/AI Challenges and Opportunities for Leadership - LinkedIn Learning.pdf",
      },
      {
        title: "Project Management Institute",
        issuer: "PMI",
        pdf: "/learningportfolio/assets/certificates/AI Challenges and Opportunities for Leadership - Project Management Institute.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/AI Challenges and Opportunities for Leadership - NASBA.pdf",
      },
    ],
  },
  {
    id: "gen-ai-business-leaders",
    title: "Generative AI for Business Leaders",
    domain: "ai-leadership",
    description:
      "Learned how to evaluate GenAI tools, assess their impact on workflows, and lead teams through the organizational shift required by intelligent automation.",
    whyItMatters:
      "Generative AI disrupts traditional workflows across every department. Leaders must understand how to pragmatically evaluate and integrate these tools to enhance productivity without compromising quality.",
    learningOutcome:
      "Mastered frameworks for assessing GenAI toolsets, guiding workforce transitions, and managing the operational shifts required for successful enterprise-wide intelligent automation.",
    skills: ["Generative AI", "Executive Strategy"],
    recognizedBy: ["LinkedIn Learning", "NASBA"],
    credentialCount: 2,
    featured: true,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/Generative AI for Business Leaders - LinkedIn Learning.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/Generative AI for Business Leaders - NASBA.pdf",
      },
    ],
  },
  {
    id: "intro-ai",
    title: "Introduction to Artificial Intelligence",
    domain: "ai-foundations",
    description:
      "Built a solid technical foundation in machine learning concepts, neural networks, and the core algorithms that power modern artificial intelligence.",
    whyItMatters:
      "A robust technical grasp of how AI works under the hood is critical. It bridges the gap between abstract concepts and practical execution, ensuring realistic expectations for AI projects.",
    learningOutcome:
      "Built foundational knowledge of neural mechanics, deep learning algorithms, and data training processes that power modern artificial intelligence systems.",
    skills: ["AI Basics", "Machine Learning Concepts"],
    recognizedBy: ["LinkedIn Learning", "NASBA"],
    credentialCount: 2,
    featured: false,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/Introduction to Artificial Intelligence - LinkedIn Learning.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/Introduction to Artificial Intelligence - NASBA.pdf",
      },
    ],
  },
  {
    id: "ai-org-leaders",
    title: "AI for Organizational Leaders",
    domain: "ai-strategy",
    description:
      "A comprehensive Microsoft-partnered program focused on deploying AI at scale, managing systemic change, and fostering a culture of innovation.",
    whyItMatters:
      "Scaling AI across an enterprise is fundamentally a change management challenge. Successful deployment relies on aligning technological capabilities with human workflows and organizational culture.",
    learningOutcome:
      "Developed strategies to manage systemic change, foster an innovation-first culture, and orchestrate large-scale AI deployments in partnership with Microsoft technologies.",
    skills: ["Organizational Strategy", "Change Management"],
    recognizedBy: ["Microsoft", "LinkedIn Learning"],
    credentialCount: 1,
    featured: true,
    credentials: [
      {
        title: "Microsoft and LinkedIn Learning",
        issuer: "Microsoft",
        pdf: "/learningportfolio/assets/certificates/AI for Organizational Leaders by Microsoft and LinkedIn Learning.pdf",
      },
    ],
  },
  {
    id: "keep-team-bleeding-edge",
    title: "How to Keep Your Team on the Bleeding Edge of AI Innovation",
    domain: "ai-leadership",
    description:
      "Acquired strategies to build adaptable, forward-thinking teams capable of rapidly integrating bleeding-edge AI tools without disrupting core operations.",
    whyItMatters:
      "The AI landscape evolves daily. Teams that cannot rapidly adapt to new tools will lose efficiency. Cultivating a forward-thinking culture is critical for maintaining an operational edge.",
    learningOutcome:
      "Acquired tactical approaches to continuous upskilling, agile tool integration, and maintaining high team performance amidst rapid technological disruption.",
    skills: ["Innovation Management", "Team Leadership"],
    recognizedBy: ["LinkedIn Learning", "NASBA"],
    credentialCount: 2,
    featured: false,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/How to Keep Your Team on the Bleeding Edge of AI Innovation - LinkedIn Learning.pdf",
      },
      {
        title: "NASBA",
        issuer: "NASBA",
        pdf: "/learningportfolio/assets/certificates/How to Keep Your Team on the Bleeding Edge of AI Innovation - NASBA.pdf",
      },
    ],
  },
  {
    id: "intro-prompt-engineering",
    title: "Introduction to Prompt Engineering for Generative AI",
    domain: "prompt-engineering",
    description:
      "Mastered the art of precise prompt design, learning how to structure inputs, define context, and iterate to achieve high-fidelity outputs from LLMs.",
    whyItMatters:
      "The quality of an AI model's output is directly proportional to the precision of its input. Poor prompting leads to hallucinations and inefficiency, while precise prompting unlocks immense value.",
    learningOutcome:
      "Mastered advanced techniques for structuring prompts, defining constraints, and iterating context to consistently generate high-fidelity, highly relevant outputs from LLMs.",
    skills: ["Prompt Design", "LLM Interaction"],
    recognizedBy: ["LinkedIn Learning"],
    credentialCount: 1,
    featured: true,
    credentials: [
      {
        title: "LinkedIn Learning",
        issuer: "LinkedIn Learning",
        pdf: "/learningportfolio/assets/certificates/Introduction to Prompt Engineering for Generative AI - LinkedIn Learning.pdf",
      },
    ],
  },
  {
    id: "claude-101",
    title: "Claude 101",
    domain: "claude-ecosystem",
    description:
      "Explored the unique capabilities of Anthropic's Claude models, understanding their constitutional AI foundation, context window, and distinct use cases.",
    whyItMatters:
      "Anthropic's Claude models offer unique advantages in safety, context processing, and reasoning. Understanding these distinctions is vital for selecting the right model for complex tasks.",
    learningOutcome:
      "Explored Constitutional AI mechanics, mastered large context window utilization, and identified specific use cases where Claude outperforms alternative models.",
    skills: ["Claude API", "Anthropic Tooling"],
    recognizedBy: ["Anthropic"],
    credentialCount: 1,
    featured: false,
    credentials: [
      {
        title: "Anthropic",
        issuer: "Anthropic",
        pdf: "/learningportfolio/assets/certificates/Claude 101 - Anthropic.pdf",
      },
    ],
  },
  {
    id: "intro-claude-cowork",
    title: "Introduction to Claude Cowork",
    domain: "claude-ecosystem",
    description:
      "Learned to leverage Claude's collaborative environments to enhance team productivity, share context, and streamline multi-agent workflows.",
    whyItMatters:
      "As AI transitions from a solitary tool to a collaborative partner, shared intelligent environments become essential for scaling team productivity and maintaining organizational context.",
    learningOutcome:
      "Learned to orchestrate multi-agent workflows, share AI contexts across teams, and leverage Claude Cowork to dramatically streamline collaborative problem-solving.",
    skills: ["Claude Cowork", "Team Collaboration"],
    recognizedBy: ["Anthropic"],
    credentialCount: 1,
    featured: false,
    credentials: [
      {
        title: "Anthropic",
        issuer: "Anthropic",
        pdf: "/learningportfolio/assets/certificates/Introduction to Claude Cowork - Anthropic.pdf",
      },
    ],
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    domain: "claude-ecosystem",
    description:
      "Dived into agentic coding, learning how to guide Claude in writing, debugging, and refactoring software architectures with high autonomy.",
    whyItMatters:
      "Agentic coding represents the next evolution of software development. Developers who can guide autonomous AI agents will achieve unprecedented velocity in building and refactoring codebases.",
    learningOutcome:
      "Acquired foundational skills in autonomous code generation, learning to effectively prompt, debug, and review software architectures built by Claude Code.",
    skills: ["Agentic Coding", "Claude Code"],
    recognizedBy: ["Anthropic"],
    credentialCount: 1,
    featured: false,
    credentials: [
      {
        title: "Anthropic",
        issuer: "Anthropic",
        pdf: "/learningportfolio/assets/certificates/Claude Code 101 - Anthropic.pdf",
      },
    ],
  },
  {
    id: "claude-code-in-action",
    title: "Claude Code in Action",
    domain: "claude-ecosystem",
    description:
      "Applied advanced agentic coding techniques to real-world software engineering challenges, fully utilizing Claude's codebase understanding and execution capabilities.",
    whyItMatters:
      "Theoretical knowledge of AI coding must be translated into practical execution. Applying agentic workflows to real-world challenges proves the tangible value of AI as a force multiplier.",
    learningOutcome:
      "Successfully applied advanced agentic techniques to complex engineering tasks, demonstrating high autonomy in executing structural refactors and rapid feature development.",
    skills: ["Advanced Agentic Coding", "Workflow Automation"],
    recognizedBy: ["Anthropic"],
    credentialCount: 1,
    featured: true,
    credentials: [
      {
        title: "Anthropic",
        issuer: "Anthropic",
        pdf: "/learningportfolio/assets/certificates/Claude Code in Action - Anthropic.pdf",
      },
    ],
  },
  {
    id: "ai-fluency-framework",
    title: "AI Fluency: Framework & Foundations",
    domain: "ai-foundations",
    description:
      "Adopted Anthropic's proprietary framework for assessing and improving AI fluency across different levels of an organization.",
    whyItMatters:
      "Without a standardized way to measure and improve AI knowledge, organizations struggle to upskill effectively. A structured framework ensures consistent baseline competency across all teams.",
    learningOutcome:
      "Mastered Anthropic's proprietary fluency assessment framework, enabling the systematic measurement and elevation of AI capabilities throughout an organization.",
    skills: ["AI Terminology", "Framework Design"],
    recognizedBy: ["Anthropic"],
    credentialCount: 1,
    featured: false,
    credentials: [
      {
        title: "Anthropic",
        issuer: "Anthropic",
        pdf: "/learningportfolio/assets/certificates/ai-fluency-framework-and-foundations-anthropic.pdf",
      },
    ],
  },
  {
    id: "gen-ai-bootcamp-nsdc",
    title: "Generative AI Bootcamp",
    domain: "prompt-engineering",
    description:
      "Completed an intensive, hands-on bootcamp focusing on the practical application of generative models to solve complex business and creative problems.",
    whyItMatters:
      "Intensive, hands-on application is the most effective way to internalize Generative AI capabilities. Moving beyond theory into practical problem-solving accelerates real-world impact.",
    learningOutcome:
      "Completed rigorous, practical exercises applying generative models to complex business scenarios, resulting in immediately deployable skills and workflows.",
    skills: ["Generative AI", "Prompt Engineering"],
    recognizedBy: ["NSDC"],
    credentialCount: 1,
    featured: false,
    credentials: [
      {
        title: "NSDC",
        issuer: "NSDC",
        pdf: "/learningportfolio/assets/certificates/Generative AI Bootcamp - NSDC.pdf",
      },
    ],
  },
];
