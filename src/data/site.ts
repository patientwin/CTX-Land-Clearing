export const migrationInputs = {
  oldSiteUrl: 'https://ctxlandclearing.com',
  newSiteDomain: 'https://staging.ctxlandclearing.local',
  businessName: 'CTX Land Clearing and Forestry Mulching',
  primaryLocation: 'Austin, Texas',
  primaryPhone: '(512) 361-4887',
  primaryPhoneHref: '+15123614887',
  primaryConversion: 'Form submissions and phone calls',
  primaryKeywordTheme: ['land clearing austin', 'forestry mulching austin']
};

export const company = {
  name: migrationInputs.businessName,
  shortName: 'CTX Land Clearing',
  phone: migrationInputs.primaryPhone,
  phoneHref: migrationInputs.primaryPhoneHref,
  email: 'ctxlandclearing@gmail.com',
  address: {
    locality: 'Austin',
    region: 'Texas',
    country: 'US'
  },
  serviceAreas: ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Dripping Springs', 'Lakeway', 'Buda', 'Kyle']
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about-us/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/service-areas/', label: 'Service Areas' },
  { href: '/contact-us/', label: 'Contact' }
];

export const serviceCards = [
  {
    title: 'Land Clearing Austin, TX',
    excerpt: 'Clearing overgrown land for residential, ranch, and development use with efficient site prep workflows.',
    href: '/land-clearing-services-central-texas/',
    image: '/images/project-2.svg',
    imageAlt: 'Cleared residential homesite in Austin prepared for next construction phase'
  },
  {
    title: 'Forestry Mulching Austin, TX',
    excerpt: 'Selective brush removal with low-disturbance mulching methods that protect soil and improve access.',
    href: '/forestry-mulching-central-texas/',
    image: '/images/project-1.svg',
    imageAlt: 'Forestry mulching pass reducing brush and cedar across Central Texas acreage'
  },
  {
    title: 'Land Grading Central Texas',
    excerpt: 'Grade correction and prep support to improve drainage and project readiness across Central Texas lots.',
    href: '/land-grading-central-texas/',
    image: '/images/project-3.svg',
    imageAlt: 'Graded lot with smoother elevation transitions for better drainage'
  }
];

export const faqs = {
  landClearing: [
    {
      q: 'What does lot clearing include?',
      a: 'Lot clearing typically includes brush removal, tree and cedar clearing, debris management, and access prep for future work.'
    },
    {
      q: 'Can you selectively clear and keep mature trees?',
      a: 'Yes. We mark keeper trees and focus on removing overgrowth so the property stays functional and visually balanced.'
    }
  ],
  forestry: [
    {
      q: 'Why choose forestry mulching over hauling everything out?',
      a: 'Forestry mulching is often faster and cost-efficient because brush is processed on site, reducing hauling trips and site disruption.'
    },
    {
      q: 'Does mulching help with erosion?',
      a: 'A mulch layer can protect soil and reduce runoff compared with full bare-ground clearing, depending on slope and rainfall conditions.'
    }
  ]
};
