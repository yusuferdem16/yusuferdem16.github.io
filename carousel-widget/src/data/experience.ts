export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  /** Link to a full project write-up on this site, when the role's work is documented there. */
  projectHref?: string;
  projectLabel?: string;
}

// Reverse-chronological, matching the order given in the author's CV.
export const experienceItems: ExperienceItem[] = [
  {
    role: "AI Department Intern",
    company: "Martur Fompak International",
    period: "Aug – Sep 2026",
    location: "Bursa, Turkey",
    bullets: [
      "Designed and built a multi-agent AI system on Google's Agent Development Kit (ADK), with a Gemini-based orchestrator agent coordinating tools for knowledge-base search, parsing, and automated editing.",
      "Integrated Groq-hosted LLMs to delegate document-editing tasks, and connected an independently-built remote agent via the Agent-to-Agent (A2A) protocol — full bidirectional cross-machine agent communication.",
      "Designed a self-correcting multi-agent review loop (Orchestrator/Editor/Reviewer) using ADK's LoopAgent, applying a reflection-style QA pattern to automate knowledge-base maintenance.",
      "Applied RAG, MCP, tool/function calling, and multi-agent orchestration to real internal tooling.",
    ],
    tags: ["Google ADK", "Gemini", "Groq", "A2A Protocol", "RAG", "MCP"],
  },
  {
    role: "IT Intern — SAP Logistics",
    company: "Martur Fompak International",
    period: "Jul – Aug 2026",
    location: "Bursa, Turkey",
    bullets: [
      "Worked within a SAP-based Logistics IT team, resolving issues affecting day-to-day factory workflow and operations.",
      "Gained hands-on exposure to the SAP environment from a Logistics IT perspective, including shadowing ABAP screen development.",
      "Contributed to a Retrieval-Augmented Generation (RAG) chatbot for the Sales module, converting internal documentation into a structured knowledge base.",
    ],
    tags: ["SAP", "ABAP", "RAG"],
  },
  {
    role: "Data Science Intern",
    company: "Acun Medya Akademi",
    period: "Jan – Mar 2025",
    location: "Remote",
    bullets: [
      "Analyzed and interpreted large-scale datasets, gaining practical experience in real-world ML workflows.",
      "Extracted actionable insights using Python, SQL, and visualization libraries (pandas, Matplotlib, Seaborn).",
      "Applied data preprocessing, feature engineering, and statistical analysis to support business decisions.",
    ],
    tags: ["Python", "SQL", "pandas", "Matplotlib", "Seaborn"],
  },
  {
    role: "Software Developer (Post-Internship)",
    company: "Belsis",
    period: "Sep 2023 – Apr 2024",
    location: "Ankara, Turkey",
    bullets: [
      "Engineered custom Odoo ERP modules for inventory management, sales tracking, and business-intelligence reporting in Python.",
      "Deployed a production system supporting 50+ concurrent users, automating workflows to cut manual reporting time.",
      "Managed and optimized PostgreSQL databases with pgAdmin and DBeaver for data integrity and query performance.",
      "Streamlined team collaboration with Git, GitLab, and Jira for version control and project tracking.",
    ],
    tags: ["Odoo", "Python", "PostgreSQL", "GitLab", "Jira"],
  },
  {
    role: "Software Developer Intern",
    company: "Belsis",
    period: "Jun – Sep 2023",
    location: "Ankara, Turkey",
    bullets: [
      "Designed and developed a parcel-selection GIS application with OpenLayers, adopted by multiple Turkish municipalities.",
      "Built the backend with C#, ASP.NET Core, and SQL, enabling spatial database operations via PostgreSQL + PostGIS.",
      "Developed the frontend with Node.js, JavaScript, HTML, and CSS for a responsive mapping interface.",
    ],
    tags: ["OpenLayers", "C#", "ASP.NET Core", "PostGIS", "Node.js"],
    projectHref: "parcel_gis_project.html",
    projectLabel: "Read Full Project",
  },
];
