/**
 * CENTRALISED SITE CONTENT
 * ------------------------------------------------------------------
 * All editable business copy lives here, keyed by locale. The site ships with
 * Italian ("it", the default) and English ("en"). The chosen locale is provided
 * at runtime through the LocaleProvider (see src/i18n/locale.tsx); components
 * read it with the `useContent()` hook. Route `head()` metadata uses the
 * default locale for the server render and is synchronized to the selected
 * locale on the client.
 *
 * Editorial rules baked into this file:
 *   - Home is a concise overview; About expands on history/approach/people;
 *     Services carries the full practice-area descriptions; Contact carries
 *     locations and contact methods. No complete paragraph is repeated.
 *   - No placeholders or invented facts. The team is described generally, and
 *     the published contact details are kept exactly as supplied.
 *
 * Both locale objects MUST keep the same shape and the same route `to` values.
 */

export type Locale = "it" | "en";

export const content = {
  it: {
    firm: {
      name: "Studio Legale Caso",
      shortName: "Studio Legale Caso",
      email: "info@studiolegalecaso.com",
      disclaimer:
        "Progetto dimostrativo realizzato per finalità accademiche. Questo non è il sito ufficiale dello Studio Legale Caso e non è destinato alla richiesta o alla prestazione di assistenza legale.",
    },

    siteMeta: {
      title: "Studio Legale Caso",
      description:
        "Prototipo accademico realizzato per lo Studio Legale Caso. Non è il sito ufficiale dello studio e non deve essere utilizzato per richiedere assistenza legale.",
      robots: "noindex, nofollow",
    },

    nav: {
      items: [
        { label: "Home", to: "/" as const },
        { label: "Lo studio", to: "/about" as const },
        { label: "Competenze", to: "/services" as const },
        { label: "Contatti", to: "/contact" as const },
      ],
      openMenu: "Apri il menu",
      closeMenu: "Chiudi il menu",
    },

    // Interface strings outside the page copy: accessibility labels and the
    // not-found / error screens.
    ui: {
      skipToContent: "Vai al contenuto",
      primaryNav: "Navigazione principale",
      mobileNav: "Navigazione mobile",
      footerNav: "Navigazione a piè di pagina",
      relatedPages: "Pagine correlate",
      homeLink: "Vai alla home",
      changeLanguage: "Cambia lingua",
      languageMenu: "Lingua",
      confidentialWarning: "Non inserire informazioni riservate.",
      portraitPlaceholder: "Segnaposto per il ritratto di",
      notFound: {
        heading: "Pagina non trovata",
        body: "La pagina che stai cercando non esiste o è stata spostata.",
        cta: "Torna alla home",
      },
      error: {
        heading: "Questa pagina non si è caricata",
        body: "Si è verificato un problema. Puoi riprovare o tornare alla home.",
        retry: "Riprova",
        home: "Torna alla home",
      },
    },

    home: {
      meta: {
        title: "Studio Legale Caso — Studio legale dal 1990, Altamura",
      },
      hero: {
        eyebrow: "Studio legale · Dal 1990 · Italia",
        headlineLead: "Competenza legale.",
        headlineAccent: "Direzione chiara.",
        paragraph:
          "Dal 1990, lo Studio Legale Caso assiste su tutto il territorio nazionale privati, imprese, compagnie assicurative, banche e istituzioni finanziarie ed enti pubblici. Lo studio opera nella consulenza, nella negoziazione e nel contenzioso in materia civile, societaria, bancaria, assicurativa, tributaria e amministrativa.",
        primaryCta: { label: "Scopri le competenze", to: "/services" as const },
        secondaryCta: { label: "Conosci lo studio", to: "/about" as const },
      },
      intro: {
        eyebrow: "Lo studio",
        heading: "Esperienza e professionalità al servizio dei clienti.",
        body: "Fondato ad Altamura e oggi presente in tre sedi in Puglia, lo Studio Legale Caso unisce un'esperienza consolidata a un metodo diretto e rigoroso. I suoi avvocati operano insieme a un team di professionisti e collaboratori, offrendo indicazioni chiare durante ogni fase dell'incarico.",
        facts: [
          { label: "Fondazione", value: "1990" },
          { label: "Sedi", value: "Altamura · Gravina in Puglia · Santeramo in Colle" },
          { label: "Operatività", value: "Nazionale" },
        ],
      },
      clients: {
        heading: "Assistenza legale per clienti privati e pubblici.",
        items: [
          {
            title: "Privati",
            note: "Consulenza e rappresentanza nelle diverse aree di attività dello studio.",
          },
          {
            title: "Imprese",
            note: "Assistenza in materia contrattuale, societaria, bancaria e tributaria.",
          },
          {
            title: "Compagnie assicurative",
            note: "Assistenza dedicata nei rapporti assicurativi e nel relativo contenzioso.",
          },
          {
            title: "Banche e istituzioni finanziarie",
            note: "Consulenza e rappresentanza in materia bancaria e creditizia.",
          },
          {
            title: "Enti pubblici",
            note: "Assistenza in materia amministrativa, urbanistica, espropriativa e tributaria.",
          },
        ],
      },
      servicesPreview: {
        heading: "Competenze legali integrate.",
        link: { label: "Scopri le principali aree di attività", to: "/services" as const },
        carousel: {
          label: "Aree di attività",
          previous: "Area precedente",
          next: "Area successiva",
          slide: "Area",
          of: "di",
        },
      },
      approach: {
        eyebrow: "Il nostro metodo",
        heading: "Chiarezza, rigore e rapporto diretto.",
        body: "I clienti dialogano direttamente con i professionisti incaricati. Ogni questione viene affrontata attraverso un'analisi accurata, una comunicazione chiara e un'attenta valutazione delle conseguenze pratiche.",
        link: { label: "Scopri come lavoriamo", to: "/about" as const },
      },
      team: {
        eyebrow: "Professionisti",
        heading: "Avvocati di esperienza, affiancati da un team di professionisti e collaboratori.",
        body: "Lo Studio Legale Caso riunisce avvocati di esperienza e un team di professionisti e collaboratori. Lo studio opera come un gruppo coordinato nelle diverse aree di attività.",
        cta: { label: "Conosci i professionisti", to: "/about" as const },
      },
      finalCta: {
        heading: "Iniziamo un confronto.",
        body: "Per appuntamenti e informazioni, contatta lo studio.",
        ctaLabel: "Contatta lo studio",
      },
    },

    about: {
      meta: {
        title: "Lo studio — Studio Legale Caso",
      },
      hero: {
        eyebrow: "Lo studio",
        headline: "Una storia costruita sull'esperienza e sulla continuità.",
        paragraph:
          "Fondato nel 1990, lo Studio Legale Caso è cresciuto attraverso la collaborazione di professionisti accomunati da un metodo rigoroso, diretto e orientato alle esigenze del cliente.",
      },
      history: {
        heading: "Dalla fondazione a oggi.",
        body: [
          "Lo Studio Legale Caso nasce ad Altamura nel 1990 per iniziativa di Raffaele Caso insieme al figlio Pasquale Caso. Nel 1995 entrano nello studio Giovanni Battista Riviello e Girolamo Giancaspro. Nel 2016 lo studio assume l'attuale struttura associativa.",
          "Oggi lo studio opera attraverso le sedi di Altamura, Gravina in Puglia e Santeramo in Colle, assistendo clienti privati e pubblici su tutto il territorio nazionale.",
        ],
        timeline: [
          {
            year: "1990",
            text: "Raffaele e Pasquale Caso fondano lo Studio Legale Caso ad Altamura.",
          },
          {
            year: "1995",
            text: "Giovanni Battista Riviello e Girolamo Giancaspro entrano nello studio.",
          },
          { year: "2016", text: "Lo studio assume l'attuale struttura associativa." },
          {
            year: "Oggi",
            text: "Lo studio opera attraverso tre sedi e assiste clienti in tutta Italia.",
          },
        ],
      },
      approach: {
        heading: "Indicazioni chiare, preparazione rigorosa.",
        body: "Ogni questione viene esaminata nel proprio contesto giuridico e pratico. Lo studio individua le opzioni disponibili, ne illustra le implicazioni e affianca il cliente nella consulenza, nella negoziazione e nel contenzioso. Il rapporto diretto con i professionisti incaricati assicura continuità, chiarezza e attenzione durante l'intero incarico.",
      },
      team: {
        heading: "Un gruppo coordinato di professionisti e collaboratori.",
        scrollHint: "Scorri per conoscere i professionisti",
      },
    },

    services: {
      meta: {
        title: "Competenze — Studio Legale Caso",
      },
      hero: {
        eyebrow: "Competenze",
        headline: "Assistenza legale integrata.",
        paragraph:
          "Lo Studio Legale Caso opera nella consulenza, nella negoziazione e nel contenzioso in ambiti che spesso si intersecano tra loro. Lo studio assiste su tutto il territorio nazionale privati, imprese, compagnie assicurative, banche e istituzioni finanziarie ed enti pubblici.",
      },
      listHint: "Clicca su un’area per leggere la descrizione completa.",
      finalCta: {
        heading: "Parlaci delle tue esigenze legali.",
        body: "Per appuntamenti e informazioni, contatta lo studio.",
        ctaLabel: "Contatta lo studio",
      },
    },

    practiceAreas: [
      {
        id: "banking",
        number: "01",
        title: "Diritto bancario",
        summary: "Consulenza e rappresentanza nei rapporti bancari, creditizi e finanziari.",
        detail:
          "Lo studio assiste banche e istituzioni finanziarie, oltre a privati e imprese, nelle questioni relative ai rapporti bancari e creditizi. L'attività comprende consulenza, negoziazione, assistenza precontenziosa e rappresentanza nei relativi procedimenti giudiziari.",
        image: "",
      },
      {
        id: "corporate",
        number: "02",
        title: "Diritto societario",
        summary: "Assistenza alle imprese nelle questioni societarie e nel relativo contenzioso.",
        detail:
          "Lo Studio Legale Caso affianca le imprese nelle questioni riguardanti i rapporti societari, le operazioni aziendali e i contratti collegati alla loro attività. L'assistenza si estende dalla consulenza e negoziazione alla gestione del contenzioso.",
        image: "",
      },
      {
        id: "insurance",
        number: "03",
        title: "Diritto assicurativo",
        summary: "Assistenza dedicata alle compagnie nei rapporti assicurativi e nel contenzioso.",
        detail:
          "Lo studio assiste e rappresenta le compagnie assicurative nelle questioni riguardanti l'interpretazione delle polizze, la gestione dei sinistri, la responsabilità e le controversie derivanti dai rapporti assicurativi. L'attività comprende consulenza, negoziazione, fase precontenziosa e giudizio.",
        image: "",
      },
      {
        id: "expropriation",
        number: "04",
        title: "Espropriazioni per pubblica utilità",
        summary: "Assistenza nei procedimenti espropriativi e nelle controversie che ne derivano.",
        detail:
          "Lo Studio Legale Caso assiste enti pubblici e soggetti privati nelle questioni relative alle espropriazioni per pubblica utilità. Lo studio offre supporto nelle diverse fasi del procedimento e nelle negoziazioni o controversie a esso collegate.",
        image: "",
      },
      {
        id: "urban-planning",
        number: "05",
        title: "Urbanistica e tutela del territorio",
        summary:
          "Consulenza in materia urbanistica, uso del suolo e tutela giuridica del territorio.",
        detail:
          "Lo studio assiste privati, imprese ed enti pubblici nelle questioni urbanistiche e territoriali, nei procedimenti amministrativi e nel relativo contenzioso. Ogni questione viene valutata considerando sia il quadro normativo sia le sue conseguenze pratiche.",
        image: "",
      },
      {
        id: "tax",
        number: "06",
        title: "Diritto tributario",
        summary: "Consulenza e rappresentanza nelle questioni e controversie tributarie.",
        detail:
          "Lo Studio Legale Caso assiste clienti privati e pubblici nell'interpretazione e nella gestione delle questioni tributarie, nei rapporti con le autorità competenti e nel contenzioso. L'attività comprende consulenza, negoziazione e rappresentanza nei procedimenti.",
        image: "",
      },
      {
        id: "contract",
        number: "07",
        title: "Contrattualistica",
        summary: "Redazione, revisione e gestione di contratti civili e commerciali.",
        detail:
          "Lo studio assiste i clienti nella redazione, revisione, negoziazione ed esecuzione dei contratti civili e commerciali, oltre che nelle controversie derivanti dai rapporti contrattuali. L'attività comprende anche la contrattualistica agraria, inclusi i regimi di proroga, i patti in deroga e la relativa documentazione.",
        image: "",
      },
    ],

    partners: [
      {
        id: "pasquale-caso",
        name: "Pasquale Caso",
        role: "Partner",
        initials: "PC",
        image: "/partners/pasquale-caso.webp",
        profile: [
          "Pasquale Caso esercita la professione forense dal 1978. Laureato in Giurisprudenza presso l'Università di Bari, è iscritto all'Ordine degli Avvocati di Bari ed è abilitato al patrocinio dinanzi alle giurisdizioni superiori. Si occupa di diritto civile, tributario e amministrativo, assistendo privati, imprese, istituzioni finanziarie, compagnie assicurative ed enti pubblici.",
        ],
      },
      {
        id: "girolamo-giancaspro",
        name: "Girolamo Giancaspro",
        role: "Partner",
        initials: "GG",
        image: "/partners/girolamo-giancaspro.webp",
        profile: [
          "Girolamo Giancaspro esercita la professione forense dal 1996. Laureato in Giurisprudenza presso l'Università di Bari, è iscritto all'Ordine degli Avvocati di Bari ed è abilitato al patrocinio dinanzi alle giurisdizioni superiori. Si occupa di diritto civile, tributario e amministrativo per clienti privati e pubblici.",
          "Accanto all'attività professionale, è stato componente del Consiglio dell'Ordine degli Avvocati di Bari nel quadriennio 2019–2022, coordinando il gruppo dedicato alla pratica forense. È inoltre indicato tra i componenti del Consiglio Distrettuale di Disciplina di Bari per il quadriennio 2023–2026.",
        ],
      },
      {
        id: "giovanni-battista-riviello",
        name: "Giovanni Battista Riviello",
        role: "Partner",
        initials: "GR",
        image: "/partners/giovanni-battista-riviello.webp",
        profile: [
          "Giovanni Battista Riviello esercita la professione forense dal 1996. Laureato in Giurisprudenza presso l'Università di Bari, è iscritto all'Ordine degli Avvocati di Bari ed è abilitato al patrocinio dinanzi alle giurisdizioni superiori. Si occupa di diritto civile, tributario e amministrativo, affiancando clienti privati e pubblici nella consulenza, nella negoziazione e nel contenzioso.",
        ],
      },
    ],

    contact: {
      meta: {
        title: "Contatti — Studio Legale Caso",
      },
      hero: {
        eyebrow: "Contatti",
        headline: "Contatti lo studio.",
        paragraph:
          "È possibile fissare un appuntamento presso le sedi di Altamura, Gravina in Puglia e Santeramo in Colle. Scriva allo studio tramite email per concordare un incontro o richiedere informazioni.",
      },
      details: {
        heading: "Sedi e recapiti",
        locationsLabel: "Sedi",
        directionsLabel: "Indicazioni stradali",
        locations: [
          {
            name: "Altamura",
            lines: ["Via Giuseppe Giusti 16", "70022 Altamura (BA)"],
            mapQuery: "Via Giuseppe Giusti 16, 70022 Altamura BA, Italia",
          },
          {
            name: "Gravina in Puglia",
            lines: ["Corso Aldo Moro 138", "Gravina in Puglia (BA)"],
            mapQuery: "Corso Aldo Moro 138, Gravina in Puglia BA, Italia",
          },
          {
            name: "Santeramo in Colle",
            lines: ["Via Avellino 3", "Santeramo in Colle (BA)"],
            mapQuery: "Via Avellino 3, Santeramo in Colle BA, Italia",
          },
        ],
        phone: { label: "Tel. / Fax", numbers: ["080 3141746", "080 3145525"] },
        email: { label: "Email" },
        appointments: { label: "Ricevimento", value: "Esclusivamente su appuntamento" },
        infoLinkLabel: "Scorra per sedi e recapiti",
        ctaLabel: "Ci scriva via email",
      },
      map: {
        label: "Sede di Altamura",
        linkLabel: "Apri in Google Maps",
      },
      links: {
        heading: "Continui a leggere",
        items: [
          { label: "Scopra lo studio", to: "/about" as const },
          { label: "Veda le competenze", to: "/services" as const },
        ],
      },
      form: {
        heading: "Invia un messaggio",
        notice:
          "Trattandosi di un progetto accademico, i messaggi arrivano alla casella del responsabile del progetto, non allo Studio Legale Caso — non inserisca informazioni riservate.",
        requiredNote: "I campi contrassegnati con * sono obbligatori.",
        name: { label: "Nome", placeholder: "Il suo nome e cognome" },
        email: { label: "La sua email", placeholder: "nome@esempio.com" },
        phone: { label: "Telefono (facoltativo)", placeholder: "+39 000 000 0000" },
        subject: { label: "Oggetto", placeholder: "Oggetto della richiesta" },
        message: { label: "Messaggio", placeholder: "Come possiamo assisterla?" },
        privacy:
          "Ho letto l’avviso sopra e acconsento all’invio del messaggio alla casella del progetto per poter essere ricontattato in merito alla mia richiesta.",
        submit: "Invia messaggio",
        sending: "Invio in corso…",
        successTitle: "Messaggio inviato",
        successBody:
          "Grazie: il messaggio è stato ricevuto. La risposta arriverà all'indirizzo email che ha indicato.",
        errorTitle: "Invio non riuscito",
        errorBody:
          "Non è stato possibile inviare il messaggio. Riprovi tra qualche minuto oppure ci scriva direttamente via email.",
        errorMailLabel: "Ci scriva via email",
        errors: {
          name: "Inserisca il suo nome.",
          email: "Inserisca un indirizzo email valido.",
          phone: "Inserisca un numero di telefono valido, oppure lasci il campo vuoto.",
          subject: "Inserisca un oggetto.",
          message: "Inserisca un messaggio.",
          privacy: "Confermi il consenso per inviare il messaggio.",
        },
        emailLabels: {
          name: "Nome",
          email: "Email",
          phone: "Telefono",
          subject: "Oggetto",
          siteLanguage: "Lingua del sito",
        },
        emailSubjectPrefix: "Sito",
      },
    },

    footer: {
      tagline: "Dal 1990 · Assistenza legale su tutto il territorio nazionale",
      navHeading: "Pagine",
      contactHeading: "Sedi e contatti",
      rights: "Tutti i diritti riservati.",
    },
  },

  en: {
    firm: {
      name: "Studio Legale Caso",
      shortName: "Studio Legale Caso",
      email: "info@studiolegalecaso.com",
      disclaimer:
        "Academic demonstration project. This is not the official website of Studio Legale Caso and is not intended for requesting or providing legal assistance.",
    },

    siteMeta: {
      title: "Studio Legale Caso",
      description:
        "Academic website prototype created for Studio Legale Caso. This is not the firm’s official website and must not be used to request legal assistance.",
      robots: "noindex, nofollow",
    },

    nav: {
      items: [
        { label: "Home", to: "/" as const },
        { label: "About Us", to: "/about" as const },
        { label: "Services", to: "/services" as const },
        { label: "Contact", to: "/contact" as const },
      ],
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },

    // Interface strings outside the page copy: accessibility labels and the
    // not-found / error screens.
    ui: {
      skipToContent: "Skip to content",
      primaryNav: "Primary navigation",
      mobileNav: "Mobile navigation",
      footerNav: "Footer navigation",
      relatedPages: "Related pages",
      homeLink: "Go to home",
      changeLanguage: "Change language",
      languageMenu: "Language",
      confidentialWarning: "Do not include confidential information.",
      portraitPlaceholder: "Portrait placeholder for",
      notFound: {
        heading: "Page not found",
        body: "The page you are looking for does not exist or has been moved.",
        cta: "Go home",
      },
      error: {
        heading: "This page didn't load",
        body: "Something went wrong. You can try again or head back home.",
        retry: "Try again",
        home: "Go home",
      },
    },

    home: {
      meta: {
        title: "Studio Legale Caso — Law Firm since 1990, Altamura",
      },
      hero: {
        eyebrow: "Law firm · Established 1990 · Italy",
        headlineLead: "Legal expertise.",
        headlineAccent: "Clear direction.",
        paragraph:
          "Since 1990, Studio Legale Caso has advised private individuals, businesses, insurance companies, banks and financial institutions, and public bodies throughout Italy. The firm provides advisory, negotiation and litigation support across civil, corporate, banking, insurance, tax and administrative matters.",
        primaryCta: { label: "Explore our services", to: "/services" as const },
        secondaryCta: { label: "Discover the firm", to: "/about" as const },
      },
      intro: {
        eyebrow: "The firm",
        heading: "Experience and professionalism in the service of our clients.",
        body: "Founded in Altamura and now present in three locations in Puglia, Studio Legale Caso combines established experience with a direct and rigorous approach. Its lawyers work with a team of professionals and collaborators, providing clear guidance throughout each matter.",
        facts: [
          { label: "Established", value: "1990" },
          { label: "Locations", value: "Altamura · Gravina in Puglia · Santeramo in Colle" },
          { label: "Scope", value: "Nationwide" },
        ],
      },
      clients: {
        heading: "Legal assistance for private and public clients.",
        items: [
          {
            title: "Private individuals",
            note: "Advice and representation across the firm's areas of practice.",
          },
          {
            title: "Businesses",
            note: "Support in contractual, corporate, banking and tax matters.",
          },
          {
            title: "Insurance companies",
            note: "Dedicated assistance in insurance relationships and disputes.",
          },
          {
            title: "Banks and financial institutions",
            note: "Advice and representation in banking and credit matters.",
          },
          {
            title: "Public bodies",
            note: "Support in administrative, urban-planning, expropriation and tax matters.",
          },
        ],
      },
      servicesPreview: {
        heading: "An integrated legal practice.",
        link: { label: "Explore the main areas of practice", to: "/services" as const },
        carousel: {
          label: "Practice areas",
          previous: "Previous area",
          next: "Next area",
          slide: "Area",
          of: "of",
        },
      },
      approach: {
        eyebrow: "Our approach",
        heading: "Clarity, rigour and direct engagement.",
        body: "Clients work directly with the professionals handling their matter. Each assignment is approached through careful analysis, clear communication and close attention to its practical implications.",
        link: { label: "Learn how we work", to: "/about" as const },
      },
      team: {
        eyebrow: "Professionals",
        heading: "Experienced lawyers, supported by a team of professionals and collaborators.",
        body: "Studio Legale Caso brings together experienced lawyers and a team of professionals and collaborators. The firm works as a coordinated group across its different areas of practice.",
        cta: { label: "Meet the professionals", to: "/about" as const },
      },
      finalCta: {
        heading: "Start a conversation.",
        body: "For appointments and information, contact the firm.",
        ctaLabel: "Contact the firm",
      },
    },

    about: {
      meta: {
        title: "About Us — Studio Legale Caso",
      },
      hero: {
        eyebrow: "About Us",
        headline: "A practice shaped by experience and continuity.",
        paragraph:
          "Founded in 1990, Studio Legale Caso has developed through the collaboration of professionals who share a rigorous, direct and client-focused approach.",
      },
      history: {
        heading: "From its foundation to today.",
        body: [
          "Studio Legale Caso was founded in Altamura in 1990 by Raffaele Caso together with his son Pasquale Caso. Giovanni Battista Riviello and Girolamo Giancaspro joined the firm in 1995. In 2016, the firm adopted its current partnership structure.",
          "Today, the firm operates through locations in Altamura, Gravina in Puglia and Santeramo in Colle, assisting private and public clients throughout Italy.",
        ],
        timeline: [
          {
            year: "1990",
            text: "Studio Legale Caso is founded in Altamura by Raffaele and Pasquale Caso.",
          },
          {
            year: "1995",
            text: "Giovanni Battista Riviello and Girolamo Giancaspro join the firm.",
          },
          { year: "2016", text: "In 2016, the firm adopted its current partnership structure." },
          {
            year: "Today",
            text: "The firm operates through three locations and assists clients throughout Italy.",
          },
        ],
      },
      approach: {
        heading: "Clear advice, rigorous preparation.",
        body: "Each matter is examined in its legal and practical context. The firm identifies the available options, explains their implications and supports the client through advisory work, negotiation and litigation. A direct relationship with the professionals handling the matter ensures continuity, clarity and close attention throughout the assignment.",
      },
      team: {
        heading: "A coordinated team of professionals and collaborators.",
        scrollHint: "Scroll to meet the professionals",
      },
    },

    services: {
      meta: {
        title: "Services — Studio Legale Caso",
      },
      hero: {
        eyebrow: "Services",
        headline: "Integrated legal assistance.",
        paragraph:
          "Studio Legale Caso provides advisory, negotiation and litigation support across areas that frequently intersect. The firm assists private individuals, businesses, insurance companies, banks and financial institutions, and public bodies throughout Italy.",
      },
      listHint: "Click an area to read its full description.",
      finalCta: {
        heading: "Discuss your legal needs with us.",
        body: "For appointments and information, contact the firm.",
        ctaLabel: "Contact the firm",
      },
    },

    practiceAreas: [
      {
        id: "banking",
        number: "01",
        title: "Banking Law",
        summary: "Advice and representation in banking, credit and financial matters.",
        detail:
          "The firm assists banks and financial institutions as well as private individuals and businesses in matters involving banking and credit relationships. Its work includes advice, negotiation, pre-litigation assistance and representation in related court proceedings.",
        image: "",
      },
      {
        id: "corporate",
        number: "02",
        title: "Corporate Law",
        summary: "Legal assistance for businesses in corporate matters and related disputes.",
        detail:
          "Studio Legale Caso supports businesses in matters concerning company relationships, corporate operations and the contracts connected with their activities. Assistance extends from advisory and negotiation to the management of disputes.",
        image: "",
      },
      {
        id: "insurance",
        number: "03",
        title: "Insurance Law",
        summary:
          "Dedicated assistance for insurance companies in insurance relationships and disputes.",
        detail:
          "The firm advises and represents insurance companies in matters involving policy interpretation, claims, liability and disputes arising from insurance relationships. Its work includes advisory, negotiation, pre-litigation and court proceedings.",
        image: "",
      },
      {
        id: "expropriation",
        number: "04",
        title: "Expropriation for Public Utility",
        summary: "Assistance in expropriation procedures and the disputes arising from them.",
        detail:
          "Studio Legale Caso assists public bodies and private parties in matters concerning expropriation for public utility. The firm provides support throughout the relevant procedures and in negotiations or disputes connected with them.",
        image: "",
      },
      {
        id: "urban-planning",
        number: "05",
        title: "Urban Planning and Land Protection",
        summary: "Advice on urban planning, land use and the legal protection of the territory.",
        detail:
          "The firm assists private clients, businesses and public bodies in urban-planning and land-use matters, administrative procedures and related disputes. Each matter is considered in light of both its regulatory framework and its practical impact.",
        image: "",
      },
      {
        id: "tax",
        number: "06",
        title: "Tax Law",
        summary: "Advice and representation in tax matters and related disputes.",
        detail:
          "Studio Legale Caso assists private and public clients in interpreting and managing tax matters, in their relations with the relevant authorities and in tax litigation. Its work includes advisory, negotiation and representation in proceedings.",
        image: "",
      },
      {
        id: "contract",
        number: "07",
        title: "Contract Law",
        summary: "Drafting, review and management of civil and commercial agreements.",
        detail:
          "The firm assists clients in drafting, reviewing, negotiating and performing civil and commercial contracts, as well as in disputes arising from contractual relationships. Its work also includes agricultural contractual matters, such as extension regimes, agreements in derogation and related documentation.",
        image: "",
      },
    ],

    partners: [
      {
        id: "pasquale-caso",
        name: "Pasquale Caso",
        role: "Partner",
        initials: "PC",
        image: "/partners/pasquale-caso.webp",
        profile: [
          "Pasquale Caso has practised law since 1978. He graduated in Law from the University of Bari, is registered with the Bari Bar Association and is admitted to practise before Italy’s higher courts. His practice covers civil, tax and administrative law, assisting private clients, businesses, financial institutions, insurance companies and public bodies.",
        ],
      },
      {
        id: "girolamo-giancaspro",
        name: "Girolamo Giancaspro",
        role: "Partner",
        initials: "GG",
        image: "/partners/girolamo-giancaspro.webp",
        profile: [
          "Girolamo Giancaspro has practised law since 1996. He graduated in Law from the University of Bari, is registered with the Bari Bar Association and is admitted to practise before Italy’s higher courts. His practice covers civil, tax and administrative law for private and public clients.",
          "Alongside his professional work, he served on the Council of the Bari Bar Association for the 2019–2022 term, coordinating the group dedicated to legal traineeship. He is also listed among the members of the Bari District Disciplinary Council for the 2023–2026 term.",
        ],
      },
      {
        id: "giovanni-battista-riviello",
        name: "Giovanni Battista Riviello",
        role: "Partner",
        initials: "GR",
        image: "/partners/giovanni-battista-riviello.webp",
        profile: [
          "Giovanni Battista Riviello has practised law since 1996. He graduated in Law from the University of Bari, is registered with the Bari Bar Association and is admitted to practise before Italy’s higher courts. His practice covers civil, tax and administrative law, combining advisory work, negotiation and representation in litigation for private and public clients.",
        ],
      },
    ],

    contact: {
      meta: {
        title: "Contact — Studio Legale Caso",
      },
      hero: {
        eyebrow: "Contact",
        headline: "Get in touch.",
        paragraph:
          "Appointments are available at the firm's locations in Altamura, Gravina in Puglia and Santeramo in Colle. Contact the firm by email to arrange a meeting or request information.",
      },
      details: {
        heading: "Locations and contact",
        locationsLabel: "Locations",
        directionsLabel: "Directions",
        locations: [
          {
            name: "Altamura",
            lines: ["Via Giuseppe Giusti 16", "70022 Altamura (BA)"],
            mapQuery: "Via Giuseppe Giusti 16, 70022 Altamura BA, Italy",
          },
          {
            name: "Gravina in Puglia",
            lines: ["Corso Aldo Moro 138", "Gravina in Puglia (BA)"],
            mapQuery: "Corso Aldo Moro 138, Gravina in Puglia BA, Italy",
          },
          {
            name: "Santeramo in Colle",
            lines: ["Via Avellino 3", "Santeramo in Colle (BA)"],
            mapQuery: "Via Avellino 3, Santeramo in Colle BA, Italy",
          },
        ],
        phone: { label: "Telephone / Fax", numbers: ["080 3141746", "080 3145525"] },
        email: { label: "Email" },
        appointments: { label: "Appointments", value: "By appointment only" },
        infoLinkLabel: "Scroll for locations and contact details",
        ctaLabel: "Send us an email",
      },
      map: {
        label: "Altamura location",
        linkLabel: "Open in Google Maps",
      },
      links: {
        heading: "Continue reading",
        items: [
          { label: "Read about the firm", to: "/about" as const },
          { label: "See the practice areas", to: "/services" as const },
        ],
      },
      form: {
        heading: "Send a message",
        notice:
          "As this is an academic project, messages reach the mailbox of the person running the project, not Studio Legale Caso — please do not include confidential information.",
        requiredNote: "Fields marked with * are required.",
        name: { label: "Name", placeholder: "Your full name" },
        email: { label: "Your email", placeholder: "you@example.com" },
        phone: { label: "Telephone (optional)", placeholder: "+39 000 000 0000" },
        subject: { label: "Subject", placeholder: "What is this about?" },
        message: { label: "Message", placeholder: "How can the firm help?" },
        privacy:
          "I have read the notice above and consent to my message being sent to the project mailbox so that I can be contacted about my enquiry.",
        submit: "Send message",
        sending: "Sending…",
        successTitle: "Message sent",
        successBody:
          "Thank you — your message has been received. The reply will go to the email address you provided.",
        errorTitle: "Message not sent",
        errorBody:
          "The message could not be sent. Please try again in a few minutes, or write by email instead.",
        errorMailLabel: "Write by email",
        errors: {
          name: "Please enter your name.",
          email: "Please enter a valid email address.",
          phone: "Please enter a valid telephone number, or leave the field empty.",
          subject: "Please enter a subject.",
          message: "Please enter a message.",
          privacy: "Please confirm your consent so the message can be sent.",
        },
        emailLabels: {
          name: "Name",
          email: "Email",
          phone: "Telephone",
          subject: "Subject",
          siteLanguage: "Site language",
        },
        emailSubjectPrefix: "Website",
      },
    },

    footer: {
      tagline: "Established in 1990 · Legal assistance throughout Italy",
      navHeading: "Pages",
      contactHeading: "Locations and contact",
      rights: "All rights reserved.",
    },
  },
} as const;

export const defaultLocale: Locale = "it";
export const getContent = (locale: Locale = defaultLocale) => content[locale];
export const c = getContent();
