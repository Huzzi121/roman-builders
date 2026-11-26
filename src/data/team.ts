export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  email: string;
  image: string;
  description: string;
  signature: string;
  category: string;
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
];

export const directors: TeamMember[] = [
  {
    id: "liaqat-jadoon",
    name: "Liaqat Khan Jadoon",
    role: "Executive Director",
    tag: "PRESIDENT",
    email: "director@romanbuilders.pk",
    image: "/liaqat khan jadoon.jpeg",
    description:
      "Liaqat Khan Jadoon is a dynamic business leader and Executive Director of Roman Builders & Developers (Private) Limited, with extensive expertise in real estate development, town planning, construction, regulatory approvals, and project commercialization. Skilled in sales and marketing, he drives business growth through strategic leadership. A retired Navy SEAL commando with distinguished national and international achievements in skydiving, sailing, and allied disciplines, he brings discipline, operational excellence, and decisive leadership to every venture.",
    signature: "Liaqat Khan Jadoon",
    category: "directors",
    bulletsHeader: "Leadership & Service",
    bullets: [
      { text: "Executive Director — Roman Builders & Developers (Pvt.) Ltd.", icon: "fa-building" },
      { text: "Business Leader — Real Estate Development", icon: "fa-briefcase" },
      { text: "Strategic Leader — Town Planning & Construction", icon: "fa-city" },
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
    "Roman Builders and Developers (Pvt.) Ltd.",
  signature: "Engr. Waqar Ahmed",
  category: "engineers",
  bulletsHeader: "Engineering & Technical Oversight",
  bullets: [
    { text: "Civil Engineer", icon: "fa-helmet-safety" },
  ],
};

export const salmanMember: TeamMember = {
  id: "salman-qamar-sandhu",
  name: "Engr. Salman Qamar Sandhu",
  role: "Civil Engineer",
  tag: "CIVIL ENGINEER",
  email: "info@primeview.pk",
  image: "/engr salman qamar sandhu.jpeg",
  description:
    "Roman Builders and Developers (Pvt.) Ltd.",
  signature: "Engr. Salman Qamar Sandhu",
  category: "engineers",
  bulletsHeader: "Leadership & Services",
  bullets: [
    { text: "Land Survey", icon: "fa-map-location-dot" },
    { text: "Topographic Survey", icon: "fa-layer-group" },
    { text: "Town Planning & Designing", icon: "fa-city" },
    { text: "2D & 3D House Plan", icon: "fa-cube" },
  ],
};

export const engineeringMembers: TeamMember[] = [
  engineeringMember,
  salmanMember,
];

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
    "Marketing Director, Roman Builders and Developers (Pvt.) Ltd",
  signature: "Ahmed Ali Syed",
  category: "marketing",
  bulletsHeader: "Sales & Strategic Marketing",
  bullets: [
    { text: "Marketing Director", icon: "fa-handshake" },
  ],
};

export const shakeelMember: TeamMember = {
  id: "dr-shakeel-ahmed",
  name: "Dr. Shakeel Ahmed",
  role: "Marketing & Sales Partner",
  tag: "MARKETING & SALES PARTNER",
  email: "info@primeview.pk",
  image: "/dr shakeel ahmed.jpeg",
  description:
    "Roman Builders and Developers (Pvt.) Ltd.",
  signature: "Dr. Shakeel Ahmed",
  category: "marketing",
  bulletsHeader: "Leadership & Services",
  bullets: [
    { text: "Marketing & Sales Partner", icon: "fa-chart-line" },
  ],
};

export const marketingMembers: TeamMember[] = [
  marketingMember,
  shakeelMember,
];

export const teamCategories = [
  { id: "founders", label: "Founders" },
  { id: "directors", label: "Directors" },
  { id: "advisory", label: "Advisory & compliance" },
  { id: "engineers", label: "Engineers & development" },
  { id: "marketing", label: "Marketing and Sales Partner" },
  { id: "software", label: "Software Developers & Engineers" },
] as const;
