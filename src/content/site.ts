/**
 * CENTRALISED SITE CONTENT
 * ------------------------------------------------------------------
 * All editable business copy lives here, keyed by locale, so an Italian
 * translation ("it") and an EN/IT switch can be added later without
 * touching any layout component.
 *
 * To add Italian later:
 *   1. Duplicate the `en` object below as `it` and translate the strings.
 *   2. Add a locale context/switch and pass the chosen locale to `getContent`.
 *
 * NOTE: All service descriptions, practice areas and the firm history are
 * PROVISIONAL and require partner approval before publication.
 */

export type Locale = "en";

export const content = {
  en: {
    firm: {
      name: "Studio Legale Caso",
      shortName: "Studio Legale Caso",
      foundedPlaceholder: "XXXX",
      location: "Altamura, Puglia, Italy",
      valueStatement: "[[FIRM_VALUE_STATEMENT]]",
      disclaimer:
        "Academic demonstration project. This is not the official website of Studio Legale Caso and is not intended for requesting or providing legal assistance.",
    },

    nav: {
      items: [
        { label: "Home", to: "/" as const },
        { label: "About Us", to: "/about" as const },
        { label: "Services", to: "/services" as const },
        { label: "Contact", to: "/contact" as const },
      ],
      cta: { label: "Contact the firm", to: "/contact" as const },
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    home: {
      meta: {
        title: "Studio Legale Caso — Independent Law Firm in Altamura, Italy",
        description:
          "Studio Legale Caso is an independent law firm in Altamura, Puglia, advising individuals, businesses, insurers and financial institutions.",
      },
      hero: {
        eyebrow: "Independent law firm · Altamura, Italy",
        headline: "Legal expertise. Clear direction.",
        paragraph:
          "Studio Legale Caso advises individuals, businesses, insurers and financial institutions through a direct, rigorous and solution-oriented approach.",
        primaryCta: { label: "Explore our services", to: "/services" as const },
        secondaryCta: { label: "Discover the firm", to: "/about" as const },
      },
      intro: {
        eyebrow: "The firm",
        heading: "A legal partner for complex decisions.",
        body: "Based in Altamura, Studio Legale Caso brings together focused legal expertise and an understanding of the practical challenges faced by individuals and organisations. The firm works closely with each client to provide clear guidance and carefully considered solutions.",
        foundedLabel: "Year of foundation",
        foundedNote: "To be confirmed",
      },
      clients: {
        eyebrow: "Who we work with",
        heading: "Four groups of clients, one standard of attention.",
        items: [
          {
            title: "Private individuals",
            note: "Personal matters approached with discretion and clarity.",
          },
          {
            title: "Businesses",
            note: "Support for organisations across their ordinary and extraordinary activity.",
          },
          {
            title: "Insurance companies",
            note: "Assistance on matters arising in the insurance sector.",
          },
          {
            title: "Banks and financial institutions",
            note: "Advice on questions connected with banking and finance.",
          },
        ],
      },
      servicesPreview: {
        eyebrow: "Practice areas",
        heading: "Provisional areas of practice.",
        link: { label: "View all services", to: "/services" as const },
      },
      approach: {
        eyebrow: "Approach",
        heading: "How the firm works.",
        // Replace [[FIRM_VALUE_STATEMENT]] with the partners' statement.
        principles: [
          { title: "Clarity", note: "Plain explanations of options and consequences." },
          { title: "Rigour", note: "Careful preparation and attention to detail." },
          {
            title: "Direct engagement",
            note: "Clients speak directly with the professionals handling their matter.",
          },
        ],
      },
      team: {
        eyebrow: "Professionals",
        heading: "A multidisciplinary group led by two partners.",
        body: "Studio Legale Caso brings together approximately ten legal professionals and collaborators, working as a single team across the firm's areas of practice.",
        cta: { label: "Meet the professionals", to: "/about" as const },
      },
      finalCta: {
        heading: "Let's start a conversation.",
        body: "Contact Studio Legale Caso to learn more about the firm and its areas of practice.",
        cta: { label: "Contact the firm", to: "/contact" as const },
      },
    },

    about: {
      meta: {
        title: "About Us — Studio Legale Caso",
        description:
          "An independent law firm in Altamura, Puglia: the firm's approach, its two partners and a team of approximately ten legal professionals.",
      },
      hero: {
        eyebrow: "About us",
        headline: "An independent firm, built around its clients.",
        paragraph:
          "Studio Legale Caso is an independent law firm based in Altamura, Puglia, working with individuals, businesses, insurers and financial institutions.",
      },
      history: {
        eyebrow: "History",
        heading: "A firm shaped by its practice.",
        body: "The firm's history is currently being reconstructed together with the partners and will be published once confirmed. The year of foundation is indicated below as a placeholder and should not be read as a confirmed date.",
        foundedLabel: "Year of foundation",
        foundedNote: "To be confirmed",
      },
      approach: {
        eyebrow: "Approach",
        heading: "Considered advice, clearly delivered.",
        body: "Each matter is examined on its own terms. The firm sets out the available options, the reasoning behind them and the practical consequences of each, so that clients can decide with confidence.",
      },
      team: {
        eyebrow: "The team",
        heading: "Two partners and a wider team.",
        body: "Studio Legale Caso is led by two partners and includes approximately ten legal professionals and collaborators. Details of the wider team will be published once confirmed.",
        collaboratorsLabel: "Legal professionals and collaborators",
        collaboratorsValue: "≈ 10",
      },
    },

    services: {
      meta: {
        title: "Services — Studio Legale Caso",
        description:
          "Provisional practice areas of Studio Legale Caso: civil law, agricultural law, insurance law and banking law.",
      },
      hero: {
        eyebrow: "Services",
        headline: "Areas of practice.",
        paragraph:
          "The firm's areas of practice are set out below. Each description is intentionally concise and will be developed further with the partners.",
      },
      // Visible but discreet note.
      provisionalNote:
        "All service descriptions on this page are provisional and require partner approval.",
      longDescriptionPlaceholder: "[EXTENDED DESCRIPTION TO BE CONFIRMED]",
      cta: { label: "Discuss a matter", to: "/contact" as const },
    },

    // Shared across home preview and services page.
    // `detail` and `image` are used by the full-screen slides on the Services page.
    // Leave `image` as "" to show the styled placeholder; set it to a file in
    // public/ (e.g. "/services/civil.jpg") to use a real photo.
    practiceAreas: [
      {
        id: "civil",
        number: "01",
        title: "Civil Law",
        summary:
          "Advice and representation on civil matters, including obligations, contracts, property and liability.",
        detail:
          "From drafting and negotiating agreements to disputes over property, obligations and non-contractual liability, the firm supports clients through advisory work, pre-litigation and proceedings before the courts.",
        image: "",
      },
      {
        id: "agricultural",
        number: "02",
        title: "Agricultural Law",
        summary:
          "Legal questions connected with agricultural activity, land and rural undertakings.",
        detail:
          "Support for farms and rural businesses on land use, agricultural leases, supply and cooperative arrangements, and the rules specific to the agri-food sector.",
        image: "",
      },
      {
        id: "insurance",
        number: "03",
        title: "Insurance Law",
        summary:
          "Matters arising from insurance relationships, policies and related disputes.",
        detail:
          "Assistance to policyholders and insurers on the interpretation of policies, the handling of claims and the resolution of disputes arising from insurance relationships.",
        image: "",
      },
      {
        id: "banking",
        number: "04",
        title: "Banking Law",
        summary:
          "Questions concerning banking relationships, credit and financial services.",
        detail:
          "Advice on banking and credit relationships, financing arrangements and financial services, including the review of contractual terms and related disputes.",
        image: "",
      },
    ],

    // `bio` is the short line always shown; `profile` is the longer text that
    // reveals as it scrolls into view on the About page. Both are PLACEHOLDER
    // text to be replaced. Set `image` to a file in public/ (e.g.
    // "/partners/girolamo.jpg") to swap the portrait placeholder for a photo.
    partners: [
      {
        id: "girolamo-giancaspro",
        name: "Girolamo Giancaspro",
        role: "Partner",
        initials: "GG",
        image: "",
        bio: "Questa descrizione è per la programmazione del sito, va cambiata.",
        profile: [
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
        ],
      },
      {
        id: "giovanni-riviello",
        name: "Giovanni Riviello",
        role: "Partner",
        initials: "GR",
        image: "",
        bio: "Questa descrizione è per la programmazione del sito, va cambiata.",
        profile: [
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
          "Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata. Questa descrizione è per la programmazione del sito, va cambiata.",
        ],
      },
    ],

    contact: {
      meta: {
        title: "Contact — Studio Legale Caso",
        description:
          "Contact details for Studio Legale Caso in Altamura, Puglia, and a demonstration contact form for this academic prototype.",
      },
      hero: {
        eyebrow: "Contact",
        headline: "Get in touch.",
        paragraph:
          "Studio Legale Caso is based in Altamura, Puglia. Contact details are being confirmed and are shown below as placeholders.",
      },
      details: {
        heading: "Firm details",
        location: { label: "Location", value: "Altamura, Puglia, Italy" },
        address: { label: "Address", value: "[FULL ADDRESS TO BE CONFIRMED]" },
        phone: { label: "Telephone", value: "[PHONE NUMBER TO BE CONFIRMED]" },
        email: { label: "Email", value: "[EMAIL ADDRESS TO BE CONFIRMED]" },
        hours: { label: "Office hours", value: "[OFFICE HOURS TO BE CONFIRMED]" },
      },
      map: {
        label: "Map placeholder",
        note: "Altamura, Puglia — a map will be added once the address is confirmed.",
      },
      links: {
        heading: "Continue reading",
        items: [
          { label: "Read about the firm", to: "/about" as const },
          { label: "See the areas of practice", to: "/services" as const },
        ],
      },
      form: {
        heading: "Send a message",
        notice:
          "This academic prototype does not transmit or store submitted information.",
        name: { label: "Name", placeholder: "Your full name" },
        email: { label: "Email", placeholder: "you@example.com" },
        phone: { label: "Telephone (optional)", placeholder: "+39 000 000 0000" },
        subject: { label: "Subject", placeholder: "What is this about?" },
        message: { label: "Message", placeholder: "How can the firm help?" },
        privacy:
          "I understand this is a demonstration form and that no information is transmitted or stored.",
        submit: "Send message",
        successTitle: "Demonstration form",
        successBody:
          "No message has been transmitted. This form is part of an academic prototype and is not connected to any email service, database or backend.",
        errors: {
          name: "Please enter your name.",
          email: "Please enter a valid email address.",
          subject: "Please enter a subject.",
          message: "Please enter a message of at least 10 characters.",
          privacy: "Please acknowledge the notice above.",
        },
      },
    },

    footer: {
      tagline: "Independent law firm · Altamura, Puglia, Italy",
      navHeading: "Pages",
      contactHeading: "Contact",
      rights: "All rights reserved.",
    },
  },
} as const;

export const defaultLocale: Locale = "en";
export const getContent = (locale: Locale = defaultLocale) => content[locale];
export const c = getContent();
