export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  email: string;
  image: string;
  description: string;
  signature: string;
  category: 'founders' | 'advisory' | 'engineers' | 'software' | 'marketing';
  bulletsHeader?: string;
  bullets: Array<{ text: string; icon: string }>;
}

export const founders: TeamMember[] = [
  {
    id: "roman-gul",
    name: "Dr. Roman Gul",
    role: "Chief Executive Officer",
    tag: "CHIEF EXECUTIVE OFFICER",
    email: "ceo@romanbuilders.pk",
    image: "/dr. roman gul.original.jpeg",
    description:
      "Dr. Roman Gul, CEO of Roman Builders & Developers (Private) Limited, is a seasoned business professional with extensive expertise in real estate development, town planning, construction, regulatory approvals, and legal consultancy for housing projects. As a lead partner, he also brings exceptional strength in real estate sales and marketing. In addition to his business achievements, he has served for several years as a consultant in cervical spondylitis rehabilitation and alternative medicine, reflecting his diverse professional expertise.",
    signature: "Dr. Roman Gul",
    category: "founders",
    bulletsHeader: "Leadership & Strategic Vision",
    bullets: [
      { text: "Chief Executive Officer — Roman Builders & Developers (Pvt.) Ltd.", icon: "fa-building" },
      { text: "Strategic Leader — Real Estate Development & Town Planning", icon: "fa-city" },
      { text: "Regulatory & Legal Consultant — Housing Projects & NOC Approvals", icon: "fa-scale-balanced" },
      { text: "Lead Partner — Real Estate Sales & Commercial Strategy", icon: "fa-chart-line" },
    ],
  },
  {
    id: "liaqat-jadoon",
    name: "Liaqat Khan Jadoon",
    role: "Executive Director",
    tag: "PRESIDENT",
    email: "director@romanbuilders.pk",
    image: "/liaqat khan jadoon.jpeg",
    description:
      "Liaqat Khan Jadoon is a dynamic business leader and Executive Director of Roman Builders & Developers (Private) Limited, bringing strategic leadership and extensive expertise in real estate development, town planning, construction, regulatory approvals, and project commercialization. With a strong command of sales and marketing, he plays a pivotal role in driving business growth and advancing real estate ventures. A retired Navy SEAL commando with distinguished national and international achievements in skydiving, sailing, and allied disciplines, he embodies strategic vision, operational excellence, discipline, and decisive leadership.",
    signature: "Liaqat Khan Jadoon",
    category: "founders",
    bulletsHeader: "Leadership & Service",
    bullets: [
      { text: "Executive Director — Roman Builders & Developers (Pvt.) Ltd.", icon: "fa-building" },
      { text: "Business Leader — Real Estate Development", icon: "fa-briefcase" },
      { text: "Strategic Leader — Town Planning & Construction", icon: "fa-city" },
      { text: "Leader — Regulatory Approvals & Project Commercialization", icon: "fa-file-shield" },
      { text: "Leader — Sales & Marketing and Business Growth", icon: "fa-bullseye" },
    ],
  },
];

export const advisoryMember: TeamMember = {
  id: "raja-gulfam",
  name: "Raja Gulfam",
  role: "Advisory, Compliance and Financial Management",
  tag: "ADVISORY & COMPLIANCE",
  email: "info@romanbuilders.pk",
  image: "/raja gulfam.jpeg",
  description:
    "Raja Gulfam oversees advisory, compliance, and financial management at Roman Builders & Developers. With deep domain knowledge in financial planning, statutory compliances, and strategic oversight, he ensures every project meets rigorous institutional standards and regulatory integrity.",
  signature: "Raja Gulfam",
  category: "advisory",
  bulletsHeader: "Governance & Financial Strategy",
  bullets: [
    { text: "Head of Advisory, Statutory Compliance & Corporate Governance", icon: "fa-shield-halved" },
    { text: "Strategic Financial Management & Long-Term Fiscal Planning", icon: "fa-coins" },
    { text: "Regulatory Due Diligence & Institutional Integrity", icon: "fa-landmark" },
    { text: "Risk Evaluation & Corporate Compliance Auditing", icon: "fa-calculator" },
  ],
};

export const engineeringMember: TeamMember = {
  id: "waqar-ahmed",
  name: "Engr. Waqar Ahmed",
  role: "Lead Project Engineer & Development",
  tag: "ENGINEERS & DEVELOPMENT",
  email: "info@romanbuilders.com",
  image: "/engr. waqar ahmed.jpeg",
  description:
    "Engr. Waqar Ahmed leads engineering and project development at Roman Builders & Developers (Private) Limited. Bringing profound expertise in civil engineering, infrastructure planning, site management, and technical compliance, he is responsible for translating architectural master plans into solid, enduring ground realities. His disciplined oversight over site works—ranging from modern road networks and robust utility installations to structural quality assurance—ensures that every Roman Builders community is built to international standards of safety, resilience, and sustainability.",
  signature: "Engr. Waqar Ahmed",
  category: "engineers",
  bulletsHeader: "Engineering & Technical Oversight",
  bullets: [
    { text: "Lead Project Engineer — Infrastructure & Civil Works", icon: "fa-helmet-safety" },
    { text: "Site Execution, Structural Integrity & Quality Assurance Standards", icon: "fa-ruler-combined" },
    { text: "Underground Utilities, Modern Electrification & Road Networks", icon: "fa-road" },
    { text: "Translating Architectural Master Plans into Resilient Communities", icon: "fa-map-location-dot" },
  ],
};

export const softwareEngineers: TeamMember[] = [
  {
    id: "umer-liaqat",
    name: "Umer Liaqat",
    role: "Founder & CEO",
    tag: "FOUNDER & CEO",
    email: "info@romanbuilders.com",
    image: "/umer liaqat.jpeg",
    description:
      "As the visionary behind the platform, Umer directs the strategic growth and technical foundation of the company. Leveraging his deep expertise in software engineering and modern tech stacks, he architects scalable, innovative solutions that bring the core vision to life and drive the business forward.",
    signature: "Umer Liaqat",
    category: "software",
    bulletsHeader: "Strategic & Technical Architecture",
    bullets: [
      { text: "Founder & CEO — Platform Strategy & Core Growth", icon: "fa-crown" },
      { text: "Full-Stack Architecture & Enterprise Scalability", icon: "fa-layer-group" },
      { text: "Innovative Engineering Solutions & Modern Tech Stacks", icon: "fa-network-wired" },
      { text: "Directing Technical Roadmaps & Business Advancement", icon: "fa-compass" },
    ],
  },
  {
    id: "taifoor-farid",
    name: "Taifoor Farid",
    role: "Chief Product Officer & Requirement Engineer",
    tag: "CHIEF PRODUCT OFFICER",
    email: "info@romanbuilders.com",
    image: "/taifoor farid.jpeg",
    description:
      "Taifoor champions the product lifecycle from initial concept to final deployment. By meticulously translating complex technical requirements into intuitive, premium user experiences, he ensures the platform remains optimized, engaging, and perfectly aligned with user needs.",
    signature: "Taifoor Farid",
    category: "software",
    bulletsHeader: "Product Lifecycle & Requirement Engineering",
    bullets: [
      { text: "Chief Product Officer & Lead Requirement Engineer", icon: "fa-compass-drafting" },
      { text: "End-to-End Product Lifecycle & UX Orchestration", icon: "fa-diagram-project" },
      { text: "Translating Complex Technical Specs into Intuitive Flows", icon: "fa-sliders" },
      { text: "Platform Optimization, User Engagement & Strategic Delivery", icon: "fa-user-check" },
    ],
  },
  {
    id: "hassan-ali",
    name: "Hassan Ali",
    role: "Chief Technology Officer & Senior Software Developer",
    tag: "CHIEF TECHNOLOGY OFFICER",
    email: "info@romanbuilders.com",
    image: "/hassan ali.jpeg",
    description:
      "Hassan spearheads the technological roadmap and structural architecture of the platform. Combining executive leadership with hands-on engineering, he oversees the development of robust backend systems and advanced integrations, ensuring a secure, high-performance digital environment.",
    signature: "Hassan Ali",
    category: "software",
    bulletsHeader: "Technology & Systems Architecture",
    bullets: [
      { text: "Chief Technology Officer & Senior Software Developer", icon: "fa-code" },
      { text: "Technological Roadmap & Structural Architecture Design", icon: "fa-sitemap" },
      { text: "Robust Backend Systems & Complex Enterprise Integrations", icon: "fa-server" },
      { text: "Secure, Resilient & High-Performance Digital Infrastructure", icon: "fa-shield-halved" },
    ],
  },
  {
    id: "huzaifa-ahmed",
    name: "Huzaifa Ahmed",
    role: "Lead Software Engineer & AI Solutions Developer",
    tag: "LEAD SOFTWARE ENGINEER",
    email: "info@romanbuilders.com",
    image: "/huzaifa ahmed.jpeg",
    description:
      "Huzaifa drives the development and technical implementation of the platform, specializing in full-stack software engineering, scalable system architecture, and AI-powered solutions. With hands-on experience across modern technologies, backend development, and intelligent integrations, he focuses on building high-performance applications, optimizing system functionality, and transforming complex requirements into reliable digital solutions.",
    signature: "Huzaifa Ahmed",
    category: "software",
    bulletsHeader: "Software Engineering & AI Systems",
    bullets: [
      { text: "Lead Software Engineer & AI Solutions Developer", icon: "fa-brain" },
      { text: "Full-Stack Software Engineering & Scalable System Design", icon: "fa-laptop-code" },
      { text: "Intelligent AI Integrations & Backend Performance Optimization", icon: "fa-microchip" },
      { text: "Transforming Complex Logic into Reliable Digital Solutions", icon: "fa-bolt" },
    ],
  },
  {
    id: "aalyan-mughal",
    name: "Aalyan Mughal",
    role: "Chief Operating Officer & Chief Marketing Officer",
    tag: "CHIEF OPERATING OFFICER",
    email: "info@romanbuilders.com",
    image: "/aalyan mughal.jpeg",
    description:
      "Aalyan seamlessly bridges technical execution with overarching business goals. By overseeing both daily platform operations and strategic market outreach, he ensures that core features are delivered efficiently and resonate powerfully with the target audience.",
    signature: "Aalyan Mughal",
    category: "software",
    bulletsHeader: "Operations & Market Strategy",
    bullets: [
      { text: "Chief Operating Officer & Chief Marketing Officer", icon: "fa-briefcase" },
      { text: "Bridging Technical Execution with Strategic Business Goals", icon: "fa-network-wired" },
      { text: "Daily Platform Operations & Workflow Management", icon: "fa-people-roof" },
      { text: "Strategic Market Outreach & Target Audience Engagement", icon: "fa-bullhorn" },
    ],
  },
];

export const marketingMember: TeamMember = {
  id: "ahmed-ali-syed",
  name: "Ahmed Ali Syed",
  role: "Marketing and Sales Partner",
  tag: "MARKETING & SALES PARTNER",
  email: "info@romanbuilders.com",
  image: "/ahmed ali syed.jpeg",
  description:
    "Ahmed Ali Syed oversees strategic marketing campaigns and commercial sales partnerships at Roman Builders & Developers. With specialized expertise in real estate acquisition, client advisory, and market positioning, he drives business growth by connecting investors and prospective homeowners with landmark living spaces.",
  signature: "Ahmed Ali Syed",
  category: "marketing",
  bulletsHeader: "Sales & Strategic Marketing",
  bullets: [
    { text: "Strategic Real Estate Sales & Market Expansion", icon: "fa-bullseye" },
    { text: "Client Advisory & High-Value Investor Engagement", icon: "fa-handshake" },
    { text: "Brand Outreach, Digital Marketing & Campaign Management", icon: "fa-bullhorn" },
    { text: "Commercial Growth & Housing Project Commercialization", icon: "fa-chart-line" },
  ],
};

export const teamCategories = [
  { id: "founders", label: "Founders" },
  { id: "advisory", label: "Advisory & compliance" },
  { id: "engineers", label: "Engineers & development" },
  { id: "software", label: "Software Developers & Engineers" },
  { id: "marketing", label: "Marketing and Sales Partner" },
] as const;
