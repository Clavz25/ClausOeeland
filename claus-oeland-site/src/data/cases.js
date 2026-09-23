// Stage content. Each entry is one stage of the proposition (Validate →
// Accelerate → Scale) with the proof that stands behind it. `problem` is what
// marks a stage as expandable, so all three Cards open into a Case Study.
//
// Stage layer:  stage, role, promise, capabilities, outcome
// Proof layer:  title, client, year, markets, headline, problem, done, tags,
//               results, metrics, gallery, footer
//
// bg/fg/border drive the card colour; tile/tileFg colour the icon squares in
// the fold-out. `role` is an array because the line break is authored, not left
// to the browser — these headings are long and wrap badly on a phone.

// Assets live in public/, so they need the deploy base in front of them —
// root locally, /ClausOeeland/ on GitHub Pages. Vite rewrites bundled imports
// but not string literals, so the prefix is applied here by hand.
const asset = (file) => import.meta.env.BASE_URL + file

// Placeholder until the real work images land — same frame in every gallery slot.
const PLACEHOLDER = asset('pax_facebook%20ad17.jpg')
const placeholderGallery = (captions) =>
  captions.map((caption) => ({ src: PLACEHOLDER, alt: `${caption} — placeholder image`, caption }))

export const cases = [
  {
    id: 'paxinox',
    stage: 'Validate',
    role: ['Go-to-market', 'strategist'],
    promise: 'Find the opportunity. Build the foundation.',
    capabilities: [
      'MVP development',
      'GO-TO-MARKET dev',
      'Marketing analytics',
      'Branding dev/strategy',
      'Marketing Strategy',
      'Social Marketing',
      'SEO',
    ],
    outcome: 'A clear proposition and a market-ready foundation.',

    title: 'PAXINOX',
    client: 'NYX Medico · Paxinox',
    year: '2022 – 2024',
    markets: 'DK · SE · NO',
    bg: '#4E9E87',
    fg: '#F8F6F2',
    border: '#4E9E87',
    tile: '#F8F6F2',
    tileFg: '#4E9E87',
    image: asset('hugeicons_ai-idea.svg'),
    imageAlt: 'Idea mark',
    headline: 'Making new products grow',
    problem:
      'A new anti-snoring nasal spray with a proven formula but no brand, no positioning and no route to market. Placeholder — here should be the story of what the problem was.',
    done: 'Brand strategy, visual identity and style guide, packaging, product renders, webshop, launch campaign and analytics setup across the Nordic markets.',
    tags: ['MVP', 'Go-to-market', 'Branding', 'Analytics', 'Social', 'SEO'],
    results:
      'From first production run to webshop launch and first sales in under 12 months, across three Nordic markets.',
    metrics: [
      { value: '3', label: 'Nordic markets' },
      { value: '12 MO', label: 'Idea to launch' },
      { value: '[METRIC]', label: 'Launch KPI' },
    ],
    gallery: [
      { src: asset('paxCampaign.jpg'), alt: 'Paxinox campaign visual', caption: 'Campaign' },
      ...placeholderGallery(['Social ad', 'Packaging', 'Webshop', 'Style guide']),
    ],
    footer: 'Stage 01 · Validate · Paxinox',
  },
  {
    id: 'accelerate',
    stage: 'Accelerate',
    role: ['Growth &', 'marketing lead'],
    promise: 'Turn traction into a system.',
    capabilities: [
      'Growth strategy',
      'Campaigns',
      'Performance creative',
      'Content',
      'Funnel optimisation',
      'Conversion',
      'Analytics',
      'A/B testing',
      'CRM',
      'Customer journey',
    ],
    outcome: 'A measurable growth engine, and a learning loop that keeps running.',

    title: 'PAXINOX',
    client: 'NYX Medico · Paxinox',
    year: '2023 – 2024',
    markets: 'DK · SE · NO',
    bg: '#F8F6F2',
    fg: '#1E1E1E',
    border: '#1E1E1E',
    tile: '#1E1E1E',
    tileFg: '#F8F6F2',
    image: asset('boxicons_sapling.svg'),
    imageAlt: 'Sapling mark',
    headline: 'Turning a launch into a growth engine',
    problem:
      'The product was in market and selling, but growth came from activity rather than from a system: no repeatable acquisition loop, and no clear read on which channel was actually paying for itself. [BRACKETED PLACEHOLDER — the real story of the growth problem.]',
    done: 'Paid and organic campaigns across the Nordic markets, performance creative produced and tested in cycles, funnel and checkout work on the webshop, and an analytics setup that could tell the channels apart.',
    tags: ['Growth', 'Campaigns', 'Funnel', 'Analytics', 'A/B testing', 'CRM'],
    results:
      '[BRACKETED PLACEHOLDER — the measurable outcome of the growth phase. Real figures pending.]',
    metrics: [
      { value: '[METRIC]', label: 'Conversion rate' },
      { value: '[METRIC]', label: 'Customer acquisition cost' },
      { value: '[METRIC]', label: 'Revenue growth' },
    ],
    gallery: placeholderGallery(['Campaign set', 'Performance creative', 'Funnel', 'Reporting']),
    footer: 'Stage 02 · Accelerate · Paxinox growth',
  },
  {
    id: 'scale',
    stage: 'Scale',
    role: ['Business & commercial', 'development'],
    promise: 'Find the next level of growth.',
    capabilities: [
      'Market expansion',
      'B2B development',
      'Partnerships',
      'New channels',
      'New products',
      'Distribution',
      'Commercial strategy',
      'Customer segmentation',
    ],
    outcome: 'New routes to market, and new commercial opportunities.',

    title: 'KLIMAMESTER',
    client: '[BRACKETED PLACEHOLDER]',
    year: '[YEAR]',
    markets: '[MARKETS]',
    bg: '#DE3E2D',
    fg: '#F8F6F2',
    border: '#DE3E2D',
    tile: '#F8F6F2',
    tileFg: '#DE3E2D',
    image: asset('f7_money-euro.svg'),
    imageAlt: 'Euro mark',
    headline: 'Growth from somewhere other than spend',
    problem:
      '[BRACKETED PLACEHOLDER — what Klimamester was up against, and why more marketing spend was not the answer.]',
    done: '[BRACKETED PLACEHOLDER — product, digital and technology work, and the commercial moves that came with it.]',
    tags: ['Product', 'Digital', 'Technology', 'Development'],
    results: '[BRACKETED PLACEHOLDER — the commercial outcome.]',
    metrics: [
      { value: '[METRIC]', label: 'New segments' },
      { value: '[METRIC]', label: 'Partnerships' },
      { value: '[METRIC]', label: 'Revenue' },
    ],
    gallery: placeholderGallery(['Placeholder', 'Placeholder', 'Placeholder']),
    footer: 'Stage 03 · Scale · Klimamester',
  },
];
