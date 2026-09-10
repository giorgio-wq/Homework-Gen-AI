/**
 * CENTRALISED SITE CONTENT
 * ------------------------------------------------------------------
 * All editable business copy lives here, keyed by locale. The site ships with
 * Italian ("it", the default) and English ("en"). The chosen locale is provided
 * at runtime through the LocaleProvider (see src/i18n/locale.tsx); components
 * read it with the `useContent()` hook, while route `head()` meta uses the
 * default-locale `c` export.
 *
 * NOTE: All copy (both languages) is PROVISIONAL and will be reviewed before
 * publication. Placeholders like "XXXX" and "[[FIRM_VALUE_STATEMENT]]" are kept
 * identical across languages on purpose.
 *
 * Both locale objects MUST keep the same shape and the same route `to` values.
 */

export type Locale = "it" | "en";

export const content = {
  it: {
    firm: {
      name: "Studio Legale Caso",
      shortName: "Studio Legale Caso",
      foundedPlaceholder: "XXXX",
      location: "Altamura, Puglia, Italia",
      valueStatement: "[[FIRM_VALUE_STATEMENT]]",
      disclaimer:
        "Progetto dimostrativo a scopo accademico. Questo non è il sito ufficiale dello Studio Legale Caso e non è destinato alla richiesta o all'erogazione di assistenza legale.",
    },

    nav: {
      items: [
        { label: "Home", to: "/" as const },
        { label: "Chi siamo", to: "/about" as const },
        { label: "Servizi", to: "/services" as const },
        { label: "Contatti", to: "/contact" as const },
      ],
      cta: { label: "Contatta lo studio", to: "/contact" as const },
      openMenu: "Apri il menu",
      closeMenu: "Chiudi il menu",
    },

    home: {
      meta: {
        title: "Studio Legale Caso — Studio legale indipendente ad Altamura, Italia",
        description:
          "Studio Legale Caso è uno studio legale indipendente ad Altamura, in Puglia, che assiste privati, imprese, compagnie assicurative e istituti finanziari.",
      },
      hero: {
        eyebrow: "Studio legale indipendente · Altamura, Italia",
        headline: "Competenza legale. Direzione chiara.",
        headlineLead: "Competenza legale.",
        headlineAccent: "Direzione chiara.",
        paragraph:
          "Studio Legale Caso assiste privati, imprese, compagnie assicurative e istituti finanziari con un approccio diretto, rigoroso e orientato alle soluzioni.",
        primaryCta: { label: "Esplora i servizi", to: "/services" as const },
        secondaryCta: { label: "Scopri lo studio", to: "/about" as const },
      },
      intro: {
        eyebrow: "Lo studio",
        heading: "Un partner legale per le decisioni complesse.",
        body: "Con sede ad Altamura, Studio Legale Caso unisce una competenza legale mirata alla comprensione delle sfide pratiche affrontate da privati e organizzazioni. Lo studio lavora a stretto contatto con ogni cliente per offrire indicazioni chiare e soluzioni ponderate.",
        foundedLabel: "Anno di fondazione",
        foundedNote: "Da confermare",
      },
      clients: {
        eyebrow: "Con chi lavoriamo",
        heading: "Quattro categorie di clienti, un unico standard di attenzione.",
        items: [
          {
            title: "Privati",
            note: "Questioni personali affrontate con discrezione e chiarezza.",
          },
          {
            title: "Imprese",
            note: "Supporto alle organizzazioni nell'attività ordinaria e straordinaria.",
          },
          {
            title: "Compagnie assicurative",
            note: "Assistenza sulle questioni proprie del settore assicurativo.",
          },
          {
            title: "Banche e istituti finanziari",
            note: "Consulenza sulle questioni connesse a banche e finanza.",
          },
        ],
      },
      servicesPreview: {
        eyebrow: "Aree di attività",
        heading: "Aree di attività provvisorie.",
        link: { label: "Vedi tutti i servizi", to: "/services" as const },
      },
      approach: {
        eyebrow: "Approccio",
        heading: "Come lavora lo studio.",
        principles: [
          { title: "Chiarezza", note: "Spiegazioni semplici di opzioni e conseguenze." },
          { title: "Rigore", note: "Preparazione accurata e attenzione ai dettagli." },
          {
            title: "Rapporto diretto",
            note: "Il cliente parla direttamente con i professionisti che seguono la sua pratica.",
          },
        ],
      },
      team: {
        eyebrow: "Professionisti",
        heading: "Un gruppo multidisciplinare guidato da due soci.",
        body: "Studio Legale Caso riunisce circa dieci professionisti legali e collaboratori, che lavorano come un unico team nelle aree di attività dello studio.",
        cta: { label: "Conosci i professionisti", to: "/about" as const },
      },
      finalCta: {
        heading: "Iniziamo a parlarne.",
        body: "Contatta lo Studio Legale Caso per saperne di più sullo studio e sulle sue aree di attività.",
        cta: { label: "Contatta lo studio", to: "/contact" as const },
      },
    },

    about: {
      meta: {
        title: "Chi siamo — Studio Legale Caso",
        description:
          "Uno studio legale indipendente ad Altamura, in Puglia: l'approccio dello studio, i due soci e un team di circa dieci professionisti legali.",
      },
      hero: {
        eyebrow: "Chi siamo",
        headline: "Uno studio indipendente, costruito attorno ai clienti.",
        paragraph:
          "Studio Legale Caso è uno studio legale indipendente con sede ad Altamura, in Puglia, che lavora con privati, imprese, compagnie assicurative e istituti finanziari.",
      },
      history: {
        eyebrow: "Storia",
        heading: "Uno studio plasmato dalla propria attività.",
        body: "La storia dello studio è in fase di ricostruzione insieme ai soci e sarà pubblicata una volta confermata. L'anno di fondazione indicato di seguito è un segnaposto e non va inteso come data confermata.",
        foundedLabel: "Anno di fondazione",
        foundedNote: "Da confermare",
      },
      approach: {
        eyebrow: "Approccio",
        heading: "Consulenza ponderata, esposta con chiarezza.",
        body: "Ogni questione è esaminata nei suoi termini specifici. Lo studio illustra le opzioni disponibili, le relative motivazioni e le conseguenze pratiche di ciascuna, così che il cliente possa decidere con consapevolezza.",
      },
      team: {
        eyebrow: "Il team",
        heading: "Due soci e un team più ampio.",
        body: "Studio Legale Caso è guidato da due soci e comprende circa dieci professionisti legali e collaboratori. I dettagli del team saranno pubblicati una volta confermati.",
        collaboratorsLabel: "Professionisti legali e collaboratori",
        collaboratorsValue: "≈ 10",
      },
    },

    services: {
      meta: {
        title: "Servizi — Studio Legale Caso",
        description:
          "Aree di attività provvisorie dello Studio Legale Caso: diritto civile, diritto agrario, diritto delle assicurazioni e diritto bancario.",
      },
      hero: {
        eyebrow: "Servizi",
        headline: "Aree di attività.",
        paragraph:
          "Di seguito sono indicate le aree di attività dello studio. Ogni descrizione è volutamente sintetica e sarà sviluppata insieme ai soci.",
      },
      provisionalNote:
        "Tutte le descrizioni dei servizi in questa pagina sono provvisorie e richiedono l'approvazione dei soci.",
      longDescriptionPlaceholder: "[DESCRIZIONE ESTESA DA CONFERMARE]",
      cta: { label: "Parla di una questione", to: "/contact" as const },
    },

    practiceAreas: [
      {
        id: "civil",
        number: "01",
        title: "Diritto Civile",
        summary:
          "Consulenza e rappresentanza in materia civile: obbligazioni, contratti, proprietà e responsabilità.",
        detail:
          "Dalla redazione e negoziazione dei contratti alle controversie su proprietà, obbligazioni e responsabilità extracontrattuale, lo studio assiste i clienti nella consulenza, nella fase stragiudiziale e nei procedimenti davanti all'autorità giudiziaria.",
        image: "",
      },
      {
        id: "agricultural",
        number: "02",
        title: "Diritto Agrario",
        summary:
          "Questioni giuridiche connesse all'attività agricola, ai terreni e alle imprese rurali.",
        detail:
          "Assistenza ad aziende agricole e imprese rurali su uso dei terreni, contratti agrari, forniture e forme cooperative, e sulla normativa specifica del settore agroalimentare.",
        image: "",
      },
      {
        id: "insurance",
        number: "03",
        title: "Diritto delle Assicurazioni",
        summary: "Questioni derivanti da rapporti assicurativi, polizze e relative controversie.",
        detail:
          "Assistenza ad assicurati e compagnie sull'interpretazione delle polizze, sulla gestione dei sinistri e sulla risoluzione delle controversie derivanti dai rapporti assicurativi.",
        image: "",
      },
      {
        id: "banking",
        number: "04",
        title: "Diritto Bancario",
        summary: "Questioni relative ai rapporti bancari, al credito e ai servizi finanziari.",
        detail:
          "Consulenza su rapporti bancari e creditizi, operazioni di finanziamento e servizi finanziari, inclusi la revisione delle condizioni contrattuali e le relative controversie.",
        image: "",
      },
    ],

    partners: [
      {
        id: "girolamo-giancaspro",
        name: "Girolamo Giancaspro",
        role: "Socio",
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
        role: "Socio",
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
        title: "Contatti — Studio Legale Caso",
        description:
          "Recapiti dello Studio Legale Caso ad Altamura, in Puglia, e un modulo di contatto dimostrativo per questo prototipo accademico.",
      },
      hero: {
        eyebrow: "Contatti",
        headline: "Mettiti in contatto.",
        paragraph:
          "Studio Legale Caso ha sede ad Altamura, in Puglia. I recapiti sono in fase di conferma e sono mostrati di seguito come segnaposto.",
      },
      details: {
        heading: "Dati dello studio",
        location: { label: "Sede", value: "Altamura (BA), Puglia, Italia" },
        address: { label: "Indirizzo", value: "Via Giuseppe Giusti, 16 — 70022 Altamura (BA)" },
        phone: { label: "Telefono", value: "[NUMERO DI TELEFONO DA CONFERMARE]" },
        email: { label: "Email", value: "[INDIRIZZO EMAIL DA CONFERMARE]" },
        hours: { label: "Orari", value: "[ORARI DA CONFERMARE]" },
      },
      map: {
        label: "Mappa dello studio",
        query: "Via Giuseppe Giusti 16, 70022 Altamura BA, Italia",
        linkLabel: "Apri in Google Maps",
      },
      links: {
        heading: "Continua a leggere",
        items: [
          { label: "Scopri lo studio", to: "/about" as const },
          { label: "Vedi le aree di attività", to: "/services" as const },
        ],
      },
      form: {
        heading: "Invia un messaggio",
        notice: "Questo prototipo accademico non trasmette né memorizza le informazioni inviate.",
        name: { label: "Nome", placeholder: "Il tuo nome completo" },
        email: { label: "Email", placeholder: "tu@esempio.com" },
        phone: { label: "Telefono (facoltativo)", placeholder: "+39 000 000 0000" },
        subject: { label: "Oggetto", placeholder: "Di cosa si tratta?" },
        message: { label: "Messaggio", placeholder: "Come può aiutarti lo studio?" },
        privacy:
          "Ho compreso che questo è un modulo dimostrativo e che nessuna informazione viene trasmessa o memorizzata.",
        submit: "Invia messaggio",
        successTitle: "Modulo dimostrativo",
        successBody:
          "Nessun messaggio è stato trasmesso. Questo modulo fa parte di un prototipo accademico e non è collegato ad alcun servizio email, database o backend.",
        errors: {
          name: "Inserisci il tuo nome.",
          email: "Inserisci un indirizzo email valido.",
          subject: "Inserisci un oggetto.",
          message: "Inserisci un messaggio di almeno 10 caratteri.",
          privacy: "Conferma la nota qui sopra.",
        },
      },
    },

    footer: {
      tagline: "Studio legale indipendente · Altamura, Puglia, Italia",
      navHeading: "Pagine",
      contactHeading: "Contatti",
      rights: "Tutti i diritti riservati.",
    },
  },

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
        headlineLead: "Legal expertise.",
        headlineAccent: "Clear direction.",
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
      provisionalNote:
        "All service descriptions on this page are provisional and require partner approval.",
      longDescriptionPlaceholder: "[EXTENDED DESCRIPTION TO BE CONFIRMED]",
      cta: { label: "Discuss a matter", to: "/contact" as const },
    },

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
        summary: "Matters arising from insurance relationships, policies and related disputes.",
        detail:
          "Assistance to policyholders and insurers on the interpretation of policies, the handling of claims and the resolution of disputes arising from insurance relationships.",
        image: "",
      },
      {
        id: "banking",
        number: "04",
        title: "Banking Law",
        summary: "Questions concerning banking relationships, credit and financial services.",
        detail:
          "Advice on banking and credit relationships, financing arrangements and financial services, including the review of contractual terms and related disputes.",
        image: "",
      },
    ],

    partners: [
      {
        id: "girolamo-giancaspro",
        name: "Girolamo Giancaspro",
        role: "Partner",
        initials: "GG",
        image: "",
        bio: "This is placeholder text for the site build and will be replaced.",
        profile: [
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
        ],
      },
      {
        id: "giovanni-riviello",
        name: "Giovanni Riviello",
        role: "Partner",
        initials: "GR",
        image: "",
        bio: "This is placeholder text for the site build and will be replaced.",
        profile: [
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
          "This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced. This is placeholder text for the site build and will be replaced.",
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
        location: { label: "Location", value: "Altamura (BA), Puglia, Italy" },
        address: { label: "Address", value: "Via Giuseppe Giusti, 16 — 70022 Altamura (BA)" },
        phone: { label: "Telephone", value: "[PHONE NUMBER TO BE CONFIRMED]" },
        email: { label: "Email", value: "[EMAIL ADDRESS TO BE CONFIRMED]" },
        hours: { label: "Office hours", value: "[OFFICE HOURS TO BE CONFIRMED]" },
      },
      map: {
        label: "Firm location",
        query: "Via Giuseppe Giusti 16, 70022 Altamura BA, Italy",
        linkLabel: "Open in Google Maps",
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
        notice: "This academic prototype does not transmit or store submitted information.",
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

export const defaultLocale: Locale = "it";
export const getContent = (locale: Locale = defaultLocale) => content[locale];
export const c = getContent();
