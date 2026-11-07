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
      href: "case-study.html?id=customer-care-portal",
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
      // full write-up, shown as numbered sections on case-study.html?id=customer-care-portal
      sections: [
        {
          title: "Overview",
          body: [
            "Manufacturing customers expect timely responses, transparent communication, and documented proof that quality issues have been resolved. The existing complaint process relied heavily on emails, spreadsheets, and manual follow-ups. This made it difficult to understand complaint status, assign ownership, monitor corrective actions, and verify effectiveness.",
            "The Customer Care Portal was proposed as a centralized B2B platform that connects customers, complaint teams, investigation owners, and action owners through one structured workflow.",
            "The product vision was to transform complaint management from a fragmented communication process into a transparent, accountable, and traceable resolution journey.",
          ],
        },
        {
          title: "Project goals",
          points: [
            "Centralize all customer complaints and supporting evidence.",
            "Provide real-time visibility into complaint status and ownership.",
            "Standardize the 8D investigation and root-cause analysis process.",
            "Track corrective, preventive, and containment actions.",
            "Reduce manual coordination and email dependency.",
            "Improve customer confidence through timely updates and final reports.",
          ],
        },
        {
          title: "My contribution",
          points: [
            "Mapped the end-to-end complaint-resolution workflow.",
            "Defined role-based experiences and information architecture.",
            "Designed dashboard, complaint list, complaint detail, 8D, action, and QC review experiences.",
            "Created interaction patterns for evidence upload, status tracking, assignment, and approvals.",
            "Translated complex quality-management activities into a clear enterprise UX.",
          ],
        },
        {
          title: "The problem",
          body: [
            "The previous process began when a customer raised a complaint through email or phone. The complaint creator collected additional details, the coordinator assigned an owner, and the resolution team exchanged documents and updates until the 8D report was completed.",
            "Because each stage was handled through separate messages and files, stakeholders lacked a shared view of the complaint lifecycle. Customers had limited visibility, while internal teams spent significant time searching for information and following up with owners.",
          ],
          points: [
            "Complaints managed through multiple emails - information became scattered and difficult to retrieve.",
            "No centralized dashboard - management could not quickly understand complaint volume or bottlenecks.",
            "Manual assignment and follow-ups - investigation and corrective actions could be delayed.",
            "Evidence stored across attachments - reviewing proof and previous decisions became time-consuming.",
            "Unclear action ownership - corrective actions could remain pending without visibility.",
            "No structured closure verification - teams could not easily confirm whether the solution remained effective.",
          ],
        },
        {
          title: "Users and roles",
          body: [
            "The key UX challenge was to support five roles with different responsibilities while keeping every user connected to the same complaint record.",
          ],
          points: [
            "Customer - raises and tracks complaints; reviews resolution. Needs visibility and confidence.",
            "Complaint Creator - adds detailed problem information and evidence. Needs accurate records.",
            "Complaint Coordinator - assigns owners, monitors progress, and performs QC review. Needs control and accountability.",
            "Resolution Owner - leads investigation and completes the 8D report. Needs a structured investigation.",
            "Action Owner - completes assigned corrective or preventive actions. Needs clear tasks and deadlines.",
          ],
        },
        {
          title: "End-to-end workflow",
          body: [
            "The solution used role-based dashboards and permissions, but maintained a shared source of truth for complaint details, actions, evidence, approvals, and activity history.",
            "The information architecture was organized around the complaint lifecycle rather than individual departments, so users knew where to go based on the task at hand.",
          ],
          points: [
            "Complaint raised - basic complaint is submitted and receives a unique ID (Customer).",
            "Complaint documented - detailed problem information and evidence are added (Complaint Creator).",
            "Coordination - resolution owner is assigned and priorities are confirmed (Complaint Coordinator).",
            "Investigation - team investigates the problem and identifies root cause (Resolution Owner).",
            "Action management - corrective and preventive actions are assigned and completed (Resolution Owner / Action Owner).",
            "RCA and 8D completion - Fishbone, 5 Why, RCA, and 8D documentation are completed (Resolution Owner).",
            "QC review - report is approved or returned with actionable feedback (Complaint Coordinator).",
            "Customer review and closure - customer receives the final report and confirms resolution (Complaint Creator / Customer).",
            "Effectiveness verification - corrective action is verified after closure (Complaint Creator).",
          ],
        },
        {
          title: "Information architecture",
          points: [
            "Dashboard: overview, metrics, pending work, recent complaints, alerts.",
            "Complaints: all complaints, my complaints, assigned complaints, closed complaints.",
            "8D Reports: reports in progress, pending review, completed reports.",
            "Action Management: my actions, team actions, overdue actions.",
            "Reports and Analytics: complaint trends, resolution time, recurring issues.",
          ],
        },
        {
          title: "Dashboard",
          body: [
            "The dashboard was designed as the central visibility layer for the portal. It does more than display complaint counts; it helps users identify what requires attention immediately.",
            "The most important design principle was to make the next action visible, not just the current number.",
          ],
          points: [
            "Total complaints",
            "Open complaints",
            "Complaints under investigation",
            "Pending QC reviews",
            "Overdue actions",
            "Closed complaints",
            "Average resolution time",
            "Effectiveness verification pending",
          ],
        },
        {
          title: "Progressive complaint creation",
          body: [
            "The complaint submission process was divided into two levels. Customers provide basic information first, while the complaint creator completes the technical and operational details required for investigation.",
            "The complaint detail screen acts as the single source of truth. It combines complaint information, 8D progress, actions, evidence, and the activity timeline in one place, eliminating the need to search across email threads.",
          ],
          points: [
            "Basic complaint information (customer): customer and contact details, product or part number, complaint title and description, date of occurrence, priority and category, initial attachments.",
            "Detailed complaint information (complaint creator): problem statement, quantity affected, batch or lot number, how the issue was detected, customer impact, immediate containment, supporting evidence and documents.",
          ],
        },
        {
          title: "8D report and root-cause analysis",
          body: [
            "The 8D report was treated as a living investigation record rather than a static document completed at the end. Each section can be updated as the investigation progresses.",
          ],
          points: [
            "D0 - Prepare and plan the response.",
            "D1 - Establish the investigation team.",
            "D2 - Describe the problem using measurable information.",
            "D3 - Implement immediate containment actions.",
            "D4 - Identify and validate the root cause.",
            "D5 - Select permanent corrective actions.",
            "D6 - Implement and validate corrective actions.",
            "D7 - Prevent recurrence through systemic improvements.",
            "D8 - Recognize the team and close the process.",
          ],
        },
        {
          title: "Analysis tools",
          points: [
            "Fishbone analysis for exploring possible causes across Man, Machine, Method, Material, Measurement, and Environment.",
            "5 Why analysis for moving from the observed symptom to the underlying cause.",
            "RCA document for summarizing findings, evidence, root cause, and selected actions.",
          ],
        },
        {
          title: "Action management",
          body: [
            "Corrective and preventive actions are central to successful complaint resolution. The portal provides a dedicated action-management experience so that each action has a clear owner, due date, expected outcome, and evidence requirement.",
            "Each action moves through: Created, Assigned, In Progress, Evidence Submitted, Resolution Owner Review, Approved / Rework Requested, Completed.",
          ],
          points: [
            "Action ID - unique reference connected to the complaint.",
            "Action description - defines what must be completed.",
            "Action type - corrective, preventive, or containment.",
            "Action owner - identifies the responsible person or team.",
            "Due date - supports deadline and overdue tracking.",
            "Evidence - stores proof of completion.",
            "Review status - shows whether the action is approved or needs rework.",
          ],
        },
        {
          title: "QC review and customer closure",
          body: [
            "The QC stage ensures that the 8D report is complete, accurate, and ready to be shared with the customer. Reviewers can verify complaint details, root cause, action evidence, RCA documentation, and effectiveness planning.",
            "Complaint closure and effectiveness verification were intentionally separated. A complaint may be closed after customer confirmation, while effectiveness verification can happen later to confirm that the corrective action remains successful.",
          ],
          points: [
            "Approved reports move forward to customer review.",
            "Incomplete reports are returned with section-level feedback.",
            "Feedback identifies what must be corrected, who must update it, and what happens next.",
            "The customer can review the final report, provide feedback, and confirm resolution.",
          ],
        },
        {
          title: "Key UX decisions",
          points: [
            "Role-based dashboards - prevents information overload and surfaces the work relevant to each user.",
            "Progressive disclosure - customers can raise complaints without completing a complex technical form.",
            "Single complaint record - creates one reliable place for details, evidence, actions, and history.",
            "Structured 8D workflow - makes a complex quality methodology easier to complete consistently.",
            "Dedicated action management - improves accountability by connecting owners, due dates, and evidence.",
            "Activity timeline - provides traceability for every important update and handoff.",
            "Actionable QC feedback - reduces rework and avoids unclear approval comments.",
          ],
        },
        {
          title: "Expected impact",
          body: [
            "The following outcomes are proposed targets for the product concept. They should be replaced with validated metrics if the portal is implemented and measured.",
          ],
          points: [
            "Customer experience - customers can track complaints without repeated follow-up emails.",
            "Operational visibility - management can monitor complaint volume, status, ownership, and bottlenecks.",
            "Resolution process - a standardized 8D workflow improves consistency and traceability.",
            "Action completion - owners and due dates make corrective actions easier to monitor.",
            "Quality assurance - QC review provides a controlled approval stage before customer communication.",
            "Knowledge management - centralized evidence and RCA records support future problem prevention.",
          ],
        },
        {
          title: "Conclusion",
          body: [
            "The Customer Care Portal is more than a complaint-tracking system. It is a customer-centric quality ecosystem that connects complaint intake, investigation, corrective actions, quality review, customer communication, and effectiveness verification.",
            "By replacing fragmented email-based coordination with a shared, role-based workflow, the product creates visibility at every stage and accountability for every action.",
            "Every complaint should have a clear status, every action should have an owner, and every resolution should have traceable evidence.",
          ],
        },
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