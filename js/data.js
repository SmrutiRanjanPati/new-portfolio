// ============ SITE DATA (single source of truth) ============
// Edit this file to add skills or case studies. Every page reads from here.
//
// Case studies: published:true shows a study on Home, Work, the footer and search.
//   href    -> a hand-built page (e.g. customer-care-portal.html) OR the shared template:
//              "case-study.html?id=<id>"  (renders from the fields below).
//   status  -> "soon" shows a "Details coming soon" badge; remove it when the content is in.
//   Template fields (all optional): role, client, timeline, tools, highlights[], sections[]
//   sections: [{ title, body, points: [] }]  — leave out and placeholders are shown.
//
// Skills: `level` is optional (e.g. "Expert", "Advanced", "Working"). Leave it
// empty and no badge is shown.
window.SITE_DATA = {
  studies: [
    {
      id: "customer-care-portal",
      title: "Customer Care Portal (CCP)",
      category: "Enterprise UX",
      tag: "Enterprise UX · Manufacturing",
      summary:
        "A centralized B2B portal turning email-and-spreadsheet complaint handling into a traceable, role-based 8D resolution workflow.",
      visual: "flow",
      href: "customer-care-portal.html",
      published: true,
      // shown in the quick view that opens when a work card is clicked (all optional)
      role: "UX/UI Designer",
      client: "Concept project · B2B manufacturing",
      timeline: "Concept / proposed product",
      tools: "Figma",
      highlights: [
        "Five roles working from one shared complaint record instead of email threads",
        "Structured 8D investigation with Fishbone, 5 Why and RCA tools",
        "Role-based dashboards that show the next action, not just a count",
        "Dedicated action tracking with owners, due dates and evidence",
        "QC review with section-level feedback before the customer sees a report",
      ],
    },
    {
      id: "design-system",
      title: "Enterprise Design System",
      category: "Design Systems",
      tag: "Design Systems",
      summary:
        "Reusable component library and token set that standardised UI across teams and cut handoff time by 30%.",
      visual: "components",
      href: "case-study.html?id=design-system",
      published: true,
      status: "soon", // template page for now; add role / client / sections when the details are ready
    },
    {
      id: "discrepancy-reporting",
      title: "Discrepancy Reporting Suite",
      category: "Data Visualization",
      tag: "Data Visualization",
      summary:
        "Treemap and bar-chart views built to surface reporting discrepancies at a glance for operations teams.",
      visual: "map",
      href: "case-study.html?id=discrepancy-reporting",
      published: true,
      status: "soon",
    },
    {
      id: "metrics-monitor",
      title: "Metrics Refresh Monitor",
      category: "Dashboards",
      tag: "Dashboard Design",
      summary:
        "Status dashboard for pipeline health, designed around a strict information hierarchy for on-call teams.",
      visual: "flow",
      href: "case-study.html?id=metrics-monitor",
      published: true,
      status: "soon",
    },
  ],

  // ---- About page: certifications + education ----
  // Add a certificate by copying one block. The About page sorts newest first,
  // builds the issuer filters, and adds a "Show all" button once there are more than 6.
  //   date: "YYYY-MM" (used for sorting and shown as "Mar 2026")
  //   logo: optional image path; without it a small initials tile is shown
  //   url:  optional link to the credential; adds a "View credential" link
  certifications: [
    { title: "Figma UI UX Design Essentials", issuer: "Udemy", date: "2026-11", logo: "./assets/udemy-logo.webp", url: "" },
    { title: "Liferay Application Developer", issuer: "Liferay", date: "2026-08", logo: "./assets/liferay-logo.webp", url: "" },
    { title: "Building Enterprise Websites with Liferay", issuer: "Liferay", date: "2026-03", logo: "./assets/liferay-logo.webp", url: "" },
  ],

  education: [
    { short: "SRM", degree: "Master of Computer Applications (MCA)", school: "SRM University · Delhi, India", years: "2021 - 2023" },
    { short: "GA", degree: "Bachelor of Computer Application (BCA)", school: "Govt. Autonomous College · Bhawanipatna, India", years: "2018 - 2021" },
  ],

  groups: [
    { key: "design", label: "Design" },
    { key: "tools", label: "Tools" },
    { key: "frontend", label: "Front-end" },
    { key: "process", label: "Process" },
  ],

  skills: [
    // ---- Design ----
    { name: "UX Research", group: "design", icon: "fa-solid fa-magnifying-glass", desc: "User research that shaped dashboards and enterprise workflows." },
    { name: "Usability Testing", group: "design", icon: "fa-solid fa-flask", desc: "Testing that lifted task completion speed by 25% at Digitus." },
    { name: "Information Architecture", group: "design", icon: "fa-solid fa-sitemap", desc: "Structuring complex products around tasks, not departments." },
    { name: "Wireframing", group: "design", icon: "fa-solid fa-object-group", desc: "From technical requirements to clear wireframes and user journeys." },
    { name: "Prototyping", group: "design", icon: "fa-solid fa-bezier-curve", desc: "Low to high-fidelity interactive prototypes for stakeholder buy-in." },
    { name: "UI Design", group: "design", icon: "fa-solid fa-pen-ruler", desc: "Clean, readable interfaces for data-heavy enterprise tools." },
    { name: "Design Systems", group: "design", icon: "fa-solid fa-palette", desc: "Component library that cut front-end build time by 30%." },
    { name: "Accessibility (WCAG)", group: "design", icon: "fa-solid fa-universal-access", desc: "Mentored teams on WCAG as the design subject matter expert." },

    // ---- Tools ----
    { name: "Figma", group: "tools", level: "Advanced", icon: "fa-brands fa-figma", desc: "Advanced prototyping, dashboards and component libraries." },
    { name: "Adobe XD", group: "tools", icon: "fa-solid fa-pen-nib", desc: "Interactive data visualizations and complex dashboards." },
    { name: "Photoshop", group: "tools", icon: "fa-solid fa-image", desc: "Visual assets and imagery for responsive web apps." },
    { name: "Illustrator", group: "tools", icon: "fa-solid fa-vector-square", desc: "Iconography and vector assets." },
    { name: "Framer", group: "tools", icon: "fa-solid fa-wand-magic-sparkles", desc: "Interactive prototypes with real motion." },
    { name: "Sketch", group: "tools", icon: "fa-brands fa-sketch", desc: "UI design and handoff." },
    { name: "Miro", group: "tools", icon: "fa-solid fa-diagram-project", desc: "Collaborative mapping, workshops and journeys." },

    // ---- Front-end ----
    { name: "HTML5", group: "frontend", icon: "fa-brands fa-html5", desc: "Semantic, accessible markup. This portfolio is hand-coded." },
    { name: "CSS3 / Tailwind", group: "frontend", icon: "fa-brands fa-css3-alt", desc: "Responsive layouts and design-token driven styling." },
    { name: "JavaScript (ES6+)", group: "frontend", icon: "fa-brands fa-js", desc: "Interactive UI and prototypes that stay honest about what's buildable." },
    { name: "React.js", group: "frontend", icon: "fa-brands fa-react", desc: "Design-to-code workflow with engineering teams." },
    { name: "Git", group: "frontend", icon: "fa-brands fa-git-alt", desc: "Version control alongside engineers." },

    // ---- Process ----
    { name: "Data Visualization", group: "process", icon: "fa-solid fa-chart-column", desc: "Making proportion and severity readable at a glance." },
    { name: "Dashboard Design", group: "process", icon: "fa-solid fa-gauge-high", desc: "AI-driven and operational dashboards with strict hierarchy." },
    { name: "Stakeholder Workshops", group: "process", icon: "fa-solid fa-people-group", desc: "Aligning business goals with user needs for enterprise clients." },
    { name: "Agile Sprints", group: "process", icon: "fa-solid fa-rotate", desc: "Design critiques and rapid prototyping on tight deadlines." },
    { name: "Design-to-Code Handoff", group: "process", icon: "fa-solid fa-code-compare", desc: "Pixel-accurate implementation with engineers." },
    { name: "A/B Testing", group: "process", icon: "fa-solid fa-clone", desc: "A/B tests and heat-map analysis to fix conversion issues." },
    { name: "Jira", group: "process", icon: "fa-solid fa-list-check", desc: "Tracking design work inside engineering workflows." },
  ],
};

// ---- shared helpers (used by work.js and the case-study pages) ----
// Tiny CSS-drawn previews used as the visual on every work card.
window.SITE_DATA.mock = function (type) {
  switch (type) {
    case "bars":
      return '<div class="mock-bars"><span style="--h:40%"></span><span style="--h:70%"></span><span style="--h:55%"></span><span style="--h:90%"></span><span style="--h:60%"></span><span style="--h:35%"></span></div>';
    case "components":
      return '<div class="mock-components"><span></span><span></span><span></span><span></span></div>';
    case "map":
      return (
        '<div class="mock-map">' +
        [0.9, 0.4, 0.6, 0.3, 0.8, 0.5, 0.7, 0.2, 0.6].map((o) => '<span class="cell" style="--o:' + o + '"></span>').join("") +
        "</div>"
      );
    default:
      return '<div class="mock-flow"><span class="node"></span><span class="line"></span><span class="node"></span><span class="line"></span><span class="node"></span></div>';
  }
};
window.SITE_DATA.vclass = function (type) {
  return "work-visual--" + ({ bars: 1, components: 2, map: 3, flow: 4 }[type] || 1);
};