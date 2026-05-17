export type Stage2ProjectColor =
  | "gold"
  | "silver"
  | "sapphire"
  | "ruby"
  | "obsidian"
  | "emerald"
  | "purple";

export type Stage2ProjectCategory = "frontend" | "analytics";

export type Stage2PortfolioProject = {
  id: string;
  title: string;
  image: string;
  category: Stage2ProjectCategory;
  tags: string[];
  color: Stage2ProjectColor;
  ratingKey: string;
  rating: {
    totalVotes: number;
    average: number;
  };
  focus: string;
  story: string;
  challenge: string;
  decision: string;
  approach: string[];
  buildNotes: string[];
  outcomes: string[];
  closing: string;
  backCover: string;
  features: string[];
};

export const stage2PortfolioProjects: Stage2PortfolioProject[] = [
  {
    id: "jobpulse",
    title: "JobPulse",
    image: "/images/jobpulse-dashboard.png",
    category: "frontend",
    tags: ["Next.js", "Career Prophecy", "Flagship"],
    color: "gold",
    ratingKey: "jobpulse",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "career divination · market signals · product polish",
    story:
      "JobPulse gathers scattered hiring omens and turns them into one clear observatory. Instead of drowning the visitor in listings, it surfaces role demand, salary drift, skill momentum, and remote patterns as if the market finally decided to speak plainly.",
    challenge:
      "Job-market data usually arrives as noise, so the real challenge was separating useful signals from the daily clutter.",
    decision:
      "I treated the interface like a polished prediction room: strong hierarchy first, premium atmosphere second, and every module supporting faster career decisions.",
    approach: [
      "Lead with the signals a job seeker would check first: demand, salary movement, and skill momentum.",
      "Keep the dashboard elegant enough to feel trustworthy without slipping into decorative noise.",
      "Make every card help the visitor read the market story faster, not just admire the layout.",
    ],
    buildNotes: [
      "The first screen behaves like a forecasting desk instead of a traditional listings page.",
      "Signal cards and deeper panels share one visual rhythm so the experience feels authored, not stitched together.",
      "The product tone stays premium from summary metrics to the more detailed market views.",
    ],
    outcomes: [
      "The project reads like a real digital product rather than a portfolio-only concept.",
      "Visitors can understand the market story quickly before diving into detail.",
      "The final presentation feels sharp, confident, and flagship-ready.",
    ],
    closing:
      "JobPulse proves that market intelligence can feel enchanted without losing practical clarity.",
    backCover:
      "A flagship frontend dossier about reading hiring signals before the crowd does.",
    features: [
      "Role Demand Observatory",
      "Salary Drift Map",
      "Skill Momentum Compass",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare Waitlist",
    image: "/images/healthcare-operations-overview.png",
    category: "analytics",
    tags: ["Power BI", "Healer Ops", "Ward Ledger"],
    color: "emerald",
    ratingKey: "healthcare",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "healer operations · backlog visibility · calm triage",
    story:
      "This dashboard turns crowded waiting lists into a calmer operational ledger. Bed pressure, specialty backlog, and service bottlenecks stop feeling scattered and start reading like one coherent ward map for the people who actually need to act.",
    challenge:
      "The underlying data mattered, but it was too fragmented to guide quick decisions when pressure was highest.",
    decision:
      "I framed the report like a command desk for hospital operations: urgent signals first, deeper backlog context second, and executive readability throughout.",
    approach: [
      "Bring the pressure points forward so teams can spot risk before digging through detail.",
      "Group backlog views in a way that supports triage instead of forcing the reader to hunt.",
      "Keep the dashboard structured and calm even while the subject matter is high-pressure.",
    ],
    buildNotes: [
      "Waitlist pressure is summarized early so escalation points are visible immediately.",
      "Specialty bottlenecks are presented as action triggers, not hidden inside secondary charts.",
      "The reporting tone stays leadership-ready without becoming cold or unreadable.",
    ],
    outcomes: [
      "Teams can identify the highest-pressure areas faster.",
      "Operational review becomes clearer because the dashboard supports triage thinking.",
      "The final result feels practical, serious, and fit for real healthcare use.",
    ],
    closing:
      "The piece shows that analytics for healthcare can feel precise, humane, and action-ready at the same time.",
    backCover:
      "An analytics volume about turning waitlist pressure into a clearer ward-side decision map.",
    features: [
      "Waitlist Pressure Map",
      "Specialty Backlog Lens",
      "Throughput Watch",
    ],
  },
  {
    id: "kanban",
    title: "Kanban Board",
    image: "/images/kanban-board.png",
    category: "frontend",
    tags: ["React", "Workflow Charms", "Realtime"],
    color: "silver",
    ratingKey: "kanban",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "task flow · drag-and-drop spellwork · clean movement",
    story:
      "A team board designed so task movement feels almost spell-like: quick to read, satisfying to drag, and stable under real use. The goal was never just motion — it was making progress visible without turning the board into visual clutter.",
    challenge:
      "Many productivity tools lose their clarity once cards, lists, and actions all compete for the same attention.",
    decision:
      "I built the board around flow first: strong status separation, quieter chrome, and interactions that support movement instead of distracting from it.",
    approach: [
      "Keep the board readable at a glance before adding extra motion or decoration.",
      "Use spacing and contrast like guide rails so every column has a clear role.",
      "Treat drag states as part of the layout grammar, not as temporary visual noise.",
    ],
    buildNotes: [
      "Drag-and-drop remains the center of the experience rather than a side feature.",
      "Typography and spacing help the board stay organized even when the workload grows.",
      "Realtime task motion still feels controlled instead of chaotic.",
    ],
    outcomes: [
      "The board feels lightweight without becoming empty.",
      "Task progress is easier to follow with less visual friction.",
      "The final interface reads like a usable product, not a UI exercise.",
    ],
    closing:
      "This project shows how workflow software gets stronger when its magic is clarity, not clutter.",
    backCover:
      "A frontend chapter about making drag-and-drop work feel lighter, faster, and better behaved.",
    features: [
      "Drag-and-Drop Spellflow",
      "Column Clarity",
      "Progress Charms",
    ],
  },
  {
    id: "realestate",
    title: "Real Estate Finder",
    image: "/images/realestate-finder.png",
    category: "frontend",
    tags: ["Next.js", "Map Magic", "Search"],
    color: "purple",
    ratingKey: "realestate",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "search charms · listing comparison · calmer browsing",
    story:
      "A property search experience designed to feel more like guided exploration than exhausting scrolling. Filters, maps, and listing cards work together so the visitor can shortlist confidently without losing the emotional side of home hunting.",
    challenge:
      "Property discovery is both emotional and data-heavy, which means weak structure creates fatigue very quickly.",
    decision:
      "I shaped the experience around search clarity, visual breathing room, and comparison that feels immediate rather than buried.",
    approach: [
      "Keep filtering close to browsing so each choice feels connected to the result set.",
      "Give listings enough room to sell the property without overwhelming the eye.",
      "Balance maps, filters, and cards so none of them hijack the full experience.",
    ],
    buildNotes: [
      "Advanced filters are treated as a core part of the journey, not a hidden utility panel.",
      "Discovery supports quick scanning before the deeper review begins.",
      "The visual system keeps the experience aspirational while still grounded in usability.",
    ],
    outcomes: [
      "Shortlisting becomes faster because comparison feels cleaner.",
      "Users can browse rich property data without getting buried in layout noise.",
      "The finished UI feels polished, premium, and commercially believable.",
    ],
    closing:
      "The project shows how a search-heavy real-estate product can feel elegant without losing speed.",
    backCover:
      "A frontend tale about balancing dream-home browsing with sharp practical search tools.",
    features: [
      "Filter Spellbook",
      "Map-bound Search",
      "Saved Owl Alerts",
    ],
  },
  {
    id: "global-sales",
    title: "Global Sales Tracker",
    image: "/images/global-sales-dashboard.png",
    category: "analytics",
    tags: ["Power BI", "Merchant Ledger", "Revenue Atlas"],
    color: "sapphire",
    ratingKey: "global_sales",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "merchant routes · margin tracking · regional signals",
    story:
      "A commercial dashboard built like an executive atlas: regional revenue, margins, and order movement all arranged so leaders can move from overview to investigation without losing the plot. The numbers stay serious, but the reading experience stays calm.",
    challenge:
      "Sales performance was spread across regions and channels, so the reporting needed a clearer story before decisions could move faster.",
    decision:
      "I organized the experience like a merchant command map: headline figures first, region-by-region comparison second, and deeper context always within reach.",
    approach: [
      "Lead with the numbers most likely to change a strategic conversation.",
      "Separate regional views cleanly so comparison feels natural, not forced.",
      "Keep the charts purposeful so they support decisions instead of decorating them.",
    ],
    buildNotes: [
      "Revenue and margin signals anchor the first read.",
      "Regional breakdowns are arranged to encourage fast comparison and follow-up questions.",
      "The dashboard tone stays executive without flattening the underlying detail.",
    ],
    outcomes: [
      "Cross-market patterns become easier to spot at a glance.",
      "Commercial review feels faster because the report carries the reader cleanly from summary to detail.",
      "The final result reads like a serious business system, not a one-off dashboard.",
    ],
    closing:
      "This tracker turns global commerce data into a clearer chart room for strategic decisions.",
    backCover:
      "An analytics ledger about reading revenue routes, margins, and regional shifts with less friction.",
    features: [
      "Regional Revenue Atlas",
      "Margin Ledger",
      "Trade Comparison View",
    ],
  },
  {
    id: "churn-analytics",
    title: "Churn Prediction",
    image: "/images/churn-analytics.png",
    category: "analytics",
    tags: ["Python", "Retention Prophecy", "ML"],
    color: "ruby",
    ratingKey: "churn",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "risk divination · retention insight · readable modeling",
    story:
      "A machine-learning project focused on detecting churn omens early enough for a team to act. Instead of treating the model as the whole story, the work turns feature importance, cohort drift, and intervention timing into something a business team can actually read.",
    challenge:
      "Retention risk often hides inside broad behavior data, and by the time it is obvious the window to intervene is already closing.",
    decision:
      "I kept interpretability at the center so the project would feel like useful foresight, not a mysterious black box.",
    approach: [
      "Highlight which customer behaviors matter most to churn risk.",
      "Frame the output around business action rather than model complexity alone.",
      "Keep the final story legible for non-technical readers who still need to make decisions.",
    ],
    buildNotes: [
      "Predictive signals are tied back to recognizable customer behaviors.",
      "Importance views explain why the system believes risk is rising.",
      "Decision support stays visible next to the modeling layer rather than after it.",
    ],
    outcomes: [
      "The model supports earlier retention conversations.",
      "Risk becomes easier to explain because the signals are more transparent.",
      "The final result connects machine learning to a very practical next action.",
    ],
    closing:
      "The project shows that predictive work gets stronger when the explanation is as sharp as the score.",
    backCover:
      "A machine-learning prophecy about spotting churn risk early and turning it into clearer action.",
    features: [
      "Churn Risk Prophecy",
      "Feature Omen Reading",
      "Retention Shortlist",
    ],
  },
  {
    id: "ecommerce-admin",
    title: "E-Commerce Admin UI",
    image: "/images/ecommerce-admin.png",
    category: "frontend",
    tags: ["Next.js", "Operator Console", "Commerce"],
    color: "obsidian",
    ratingKey: "ecommerce",
    rating: {
      totalVotes: 0,
      average: 0,
    },
    focus: "operator spellwork · activity tracking · admin clarity",
    story:
      "A store-management interface designed to make back-office work feel calmer, sharper, and more intentional. Orders, inventory, and customer activity are treated with the same care normally reserved for customer-facing product surfaces.",
    challenge:
      "Admin software often becomes functional but tiring, especially when orders, stock, and activity all compete for the same space.",
    decision:
      "I built the experience like an operator console: high-signal modules up front, calmer hierarchy throughout, and enough visual polish to respect the people using it every day.",
    approach: [
      "Use a clean dashboard structure so priority data is easy to spot quickly.",
      "Balance charts, activity, and controls inside one consistent visual system.",
      "Give the admin side the same design care usually reserved for customer-facing UI.",
    ],
    buildNotes: [
      "Sales and order signals stay visible from the first screen.",
      "Responsive layout choices keep the console usable across sizes and roles.",
      "Charts, lists, and activity surfaces all share one product language.",
    ],
    outcomes: [
      "The dashboard feels more product-grade than typical back-office UI.",
      "Managers can review activity faster with less friction.",
      "The finished interface supports both polish and daily practicality.",
    ],
    closing:
      "This project treats commerce administration as a first-class product experience, not an afterthought.",
    backCover:
      "A frontend console about bringing stronger UX standards into the rooms where operators actually work.",
    features: [
      "Order Watchtower",
      "Inventory Ledger",
      "Activity Chronicle",
    ],
  },
];
