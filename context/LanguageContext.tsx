"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type SupportedLocale =
  | "ar"
  | "ar-EG"
  | "ar-SA"
  | "ar-AE"
  | "cop"
  | "en"
  | "en-US"
  | "en-GB"
  | "en-CA"
  | "en-AU"
  | "en-IN"
  | "fr"
  | "fr-FR"
  | "it"
  | "it-IT"
  | "de"
  | "de-DE"
  | "es"
  | "es-ES"
  | "am"
  | "am-ET"
  | "pt"
  | "pt-PT"
  | "nl"
  | "nl-NL"
  | "sv"
  | "sv-SE"
  | "el"
  | "el-GR"
  | "sw"
  | "sw-KE";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  locale: SupportedLocale;
  dir: Direction;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define translation dictionaries internally for now.
// For scale, these can be split into separate JSON files under a `/locales` directory
// and imported dynamically or statically.
const dictionaries = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      login: "Sign In",
      brandName: "Politia App",
      openMenu: "Open main menu"
    },
    hero: {
      badge: "Integrated Administrative Platform",
      title: "Modernizing Public Services & Interaction",
      subtitle: "Politia App digitalizes administrative workflows and facilitates citizen access to essential information, rapid reports, and secure services in a single modern portal.",
      cta_online: "Online Services",
      cta_more: "Learn More",
    },
    features: {
      reports_title: "Digital Reports",
      reports_desc: "Submit reports online in a simplified manner and track their resolution status in real-time.",
      docs_title: "Explanatory Documents",
      docs_desc: "Complete guides for obtaining permits, licenses, and other official documents issued by the institution.",
      alerts_title: "Public Interest Alerts",
      alerts_desc: "Stay up to date with important announcements, legislative changes, and traffic alerts in your area.",
    },
    footer: {
      follow: "Follow POLITIA",
      privacyChoices: "Your Privacy Choices",
      healthPrivacy: "Consumer Health Privacy",
      sitemap: "Sitemap",
      contact: "Contact POLITIA",
      privacy: "Privacy",
      terms: "Terms of use",
      trademarks: "Trademarks",
      safety: "Safety & eco",
      recycling: "Recycling",
      ask: "Ask POLITIA",
      whatsNew: {
        title: "What's new",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot for organizations",
        item6: "Copilot for personal use",
        item7: "Explore POLITIA products",
        item8: "Windows 11 apps"
      },
      store: {
        title: "POLITIA Store",
        item1: "Account profile",
        item2: "Download Center",
        item3: "Store support",
        item4: "Returns",
        item5: "Order tracking",
        item6: "Certified Refurbished",
        item7: "Store Promise",
        item8: "Flexible Payments"
      },
      education: {
        title: "Education",
        item1: "POLITIA in education",
        item2: "Devices for education",
        item3: "POLITIA Teams for Education",
        item4: "POLITIA 365 Education",
        item5: "How to buy for your school",
        item6: "Educator training and development",
        item7: "Deals for students and parents",
        item8: "AI for education"
      },
      business: {
        title: "Business",
        item1: "POLITIA AI",
        item2: "POLITIA Security",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Small Business"
      },
      devIt: {
        title: "Developer & IT",
        item1: "Azure",
        item2: "POLITIA Developer",
        item3: "POLITIA Learn",
        item4: "Support for AI marketplace apps",
        item5: "POLITIA Tech Community",
        item6: "POLITIA Marketplace",
        item7: "Software companies",
        item8: "Visual Studio"
      },
      company: {
        title: "Company",
        item1: "Careers",
        item2: "About POLITIA",
        item3: "Company news",
        item4: "Privacy at POLITIA",
        item5: "Investors",
        item6: "Diversity and inclusion",
        item7: "Accessibility",
        item8: "Sustainability"
      }
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      brandName: "تطبيق الشرطة",
      openMenu: "فتح القائمة الرئيسية"
    },
    hero: {
      badge: "منصة إدارية متكاملة",
      title: "تحديث الخدمات العامة والتفاعل",
      subtitle: "يقوم تطبيق الشرطة برقمنة سير العمل الإداري وتسهيل وصول المواطنين إلى المعلومات الأساسية والبلاغات السريعة والخدمات الآمنة في بوابة حديثة واحدة.",
      cta_online: "الخدمات الإلكترونية",
      cta_more: "تعرف على المزيد",
    },
    features: {
      reports_title: "البلاغات الرقمية",
      reports_desc: "قدم البلاغات عبر الإنترنت بطريقة مبسطة وتابع حالة معالجتها في الوقت الفعلي.",
      docs_title: "الوثائق التوضيحية",
      docs_desc: "أدلة كاملة للحصول على التصاريح والتراخيص والوثائق الرسمية الأخرى الصادرة عن المؤسسة.",
      alerts_title: "تنبيهات المصلحة العامة",
      alerts_desc: "ابق على اطلاع بالإعلانات الهامة والتعديلات التشريعية وتنبيهات المرور في منطقتك.",
    },
    footer: {
      follow: "تابع بوليتيا",
      privacyChoices: "خيارات الخصوصية الخاصة بك",
      healthPrivacy: "خصوصية صحة المستهلك",
      sitemap: "خريطة الموقع",
      contact: "اتصل ببوليتيا",
      privacy: "الخصوصية",
      terms: "شروط الاستخدام",
      trademarks: "العلامات التجارية",
      safety: "السلامة والبيئة",
      recycling: "إعادة التدوير",
      ask: "اسأل بوليتيا",
      whatsNew: {
        title: "ما هو الجديد",
        item1: "سيرفيس برو",
        item2: "سيرفيس لابتوب",
        item3: "سيرفيس لابتوب ألترا",
        item4: "صندوق مطوري سيرفيس RTX",
        item5: "كوبايلوت للمؤسسات",
        item6: "كوبايلوت للاستخدام الشخصي",
        item7: "استكشف منتجات بوليتيا",
        item8: "تطبيقات ويندوز 11"
      },
      store: {
        title: "متجر بوليتيا",
        item1: "ملف تعريف الحساب",
        item2: "مركز التنزيل",
        item3: "دعم المتجر",
        item4: "المرتجعات",
        item5: "تتبع الطلبات",
        item6: "الأجهزة المجددة المعتمدة",
        item7: "وعد المتجر",
        item8: "خيارات دفع مرنة"
      },
      education: {
        title: "التعليم",
        item1: "بوليتيا في التعليم",
        item2: "أجهزة للتعليم",
        item3: "فرق بوليتيا للتعليم",
        item4: "بوليتيا 365 للتعليم",
        item5: "كيفية الشراء لمدرستك",
        item6: "تدريب وتطوير المعلمين",
        item7: "عروض للطلاب وأولياء الأمور",
        item8: "الذكاء الاصطناعي للتعليم"
      },
      business: {
        title: "الأعمال",
        item1: "بوليتيا للذكاء الاصطناعي",
        item2: "أمن بوليتيا",
        item3: "داينامكس 365",
        item4: "بوليتيا 365",
        item5: "منصة قوة بوليتيا",
        item6: "فرق بوليتيا",
        item7: "كوبايلوت بوليتيا 365",
        item8: "الأعمال الصغيرة"
      },
      devIt: {
        title: "المطورون وتقنية المعلومات",
        item1: "أزور",
        item2: "مطور بوليتيا",
        item3: "تعلم بوليتيا",
        item4: "دعم تطبيقات متجر الذكاء الاصطناعي",
        item5: "مجتمع تقنية بوليتيا",
        item6: "سوق بوليتيا",
        item7: "شركات البرمجيات",
        item8: "فيجوال ستوديو"
      },
      company: {
        title: "الشركة",
        item1: "الوظائف",
        item2: "حول بوليتيا",
        item3: "أخبار الشركة",
        item4: "الخصوصية في بوليتيا",
        item5: "المستثمرون",
        item6: "التنوع والشمول",
        item8: "الاستدامة"
      }
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      contact: "Contact",
      login: "Se connecter",
      brandName: "Politia App",
      openMenu: "Ouvrir le menu principal"
    },
    hero: {
      badge: "Plateforme Administrative Intégrée",
      title: "Moderniser les Services Publics & l'Interaction",
      subtitle: "Politia App numérise les processus administratifs et facilite l'accès des citoyens aux informations essentielles, aux rapports rapides et aux services sécurisés sur un portail moderne unique.",
      cta_online: "Services en Ligne",
      cta_more: "En savoir plus",
    },
    features: {
      reports_title: "Rapports Numériques",
      reports_desc: "Soumettez des rapports en ligne de manière simplifiée et suivez leur état de résolution en temps réel.",
      docs_title: "Documents Explicatifs",
      docs_desc: "Guides complets pour obtenir des permis, des licences et d'autres documents officiels délivrés par l'institution.",
      alerts_title: "Alertes d'Intérêt Public",
      alerts_desc: "Restez informé des annonces importantes, des changements législatifs et des alertes de circulation dans votre région.",
    },
    footer: {
      follow: "Suivre POLITIA",
      privacyChoices: "Vos choix de confidentialité",
      healthPrivacy: "Confidentialité de la santé des consommateurs",
      sitemap: "Plan du site",
      contact: "Contacter POLITIA",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation",
      trademarks: "Marques déposées",
      safety: "Sécurité & éco",
      recycling: "Recyclage",
      ask: "Demander à POLITIA",
      whatsNew: {
        title: "Nouveautés",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Boîte de dév RTX Spark",
        item5: "Copilot pour les entreprises",
        item6: "Copilot pour usage personnel",
        item7: "Découvrir les produits POLITIA",
        item8: "Applications Windows 11"
      },
      store: {
        title: "Boutique POLITIA",
        item1: "Profil de compte",
        item2: "Centre de téléchargement",
        item3: "Support de la boutique",
        item4: "Retours",
        item5: "Suivi de commande",
        item6: "Reconditionné certifié",
        item7: "Promesse de la boutique",
        item8: "Paiements flexibles"
      },
      education: {
        title: "Éducation",
        item1: "POLITIA dans l'éducation",
        item2: "Appareils pour l'éducation",
        item3: "POLITIA Teams pour l'éducation",
        item4: "POLITIA 365 Éducation",
        item5: "Comment acheter pour votre école",
        item6: "Formation et développement des enseignants",
        item7: "Offres pour étudiants et parents",
        item8: "L'IA pour l'éducation"
      },
      business: {
        title: "Entreprises",
        item1: "POLITIA IA",
        item2: "Sécurité POLITIA",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Petites entreprises"
      },
      devIt: {
        title: "Développeurs & IT",
        item1: "Azure",
        item2: "Développeur POLITIA",
        item3: "Apprendre POLITIA",
        item4: "Support pour les apps du marché de l'IA",
        item5: "Communauté technique POLITIA",
        item6: "Marché POLITIA",
        item7: "Éditeurs de logiciels",
        item8: "Visual Studio"
      },
      company: {
        title: "Entreprise",
        item1: "Carrières",
        item2: "À propos de POLITIA",
        item3: "Actualités de l'entreprise",
        item4: "Confidentialité chez POLITIA",
        item5: "Investisseurs",
        item6: "Diversité et inclusion",
        item7: "Accessibilité",
        item8: "Durabilité"
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
      login: "Anmelden",
      brandName: "Politia App",
      openMenu: "Hauptmenü öffnen"
    },
    hero: {
      badge: "Integrierte Verwaltungsplattform",
      title: "Modernisierung öffentlicher Dienste & Interaktion",
      subtitle: "Politia App digitalisiert Verwaltungsabläufe und erleichtert Bürgern den Zugang zu wichtigen Informationen, schnellen Meldungen und sicheren Diensten in einem einzigen modernen Portal.",
      cta_online: "Online-Dienste",
      cta_more: "Mehr erfahren",
    },
    features: {
      reports_title: "Digitale Berichte",
      reports_desc: "Reichen Sie Berichte online in vereinfachter Form ein und verfolgen Sie deren Status in Echtzeit.",
      docs_title: "Erklärende Dokumente",
      docs_desc: "Vollständige Leitfäden zur Erlangung von Genehmigungen, Lizenzen und anderen offiziellen Dokumenten.",
      alerts_title: "Warnungen von öffentlichem Interesse",
      alerts_desc: "Bleiben Sie auf dem Laufenden über wichtige Ankündigungen, Gesetzesänderungen und Verkehrswarnungen.",
    },
    footer: {
      follow: "POLITIA folgen",
      privacyChoices: "Ihre Datenschutzeinstellungen",
      healthPrivacy: "Datenschutz für Verbrauchergesundheit",
      sitemap: "Sitemap",
      contact: "POLITIA kontaktieren",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      trademarks: "Marken",
      safety: "Sicherheit & Umwelt",
      recycling: "Recycling",
      ask: "POLITIA fragen",
      whatsNew: {
        title: "Was gibt's Neues",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot für Organisationen",
        item6: "Copilot für den privaten Gebrauch",
        item7: "POLITIA-Produkte erkunden",
        item8: "Windows 11-Apps"
      },
      store: {
        title: "POLITIA Store",
        item1: "Kontoprofil",
        item2: "Download-Center",
        item3: "Store-Support",
        item4: "Rückgaben",
        item5: "Bestellverfolgung",
        item6: "Zertifiziert generalüberholt",
        item7: "Store-Versprechen",
        item8: "Flexible Zahlungsoptionen"
      },
      education: {
        title: "Bildung",
        item1: "POLITIA im Bildungswesen",
        item2: "Geräte für den Bildungsbereich",
        item3: "POLITIA Teams für den Bildungsbereich",
        item4: "POLITIA 365 Bildung",
        item5: "Kaufoptionen für Ihre Schule",
        item6: "Lehrerfortbildung und -entwicklung",
        item7: "Angebote für Studenten und Eltern",
        item8: "KI für den Bildungsbereich"
      },
      business: {
        title: "Unternehmen",
        item1: "POLITIA KI",
        item2: "POLITIA Sicherheit",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Kleinunternehmen"
      },
      devIt: {
        title: "Entwickler & IT",
        item1: "Azure",
        item2: "POLITIA Entwickler",
        item3: "POLITIA Lernen",
        item4: "Support für KI-Marketplace-Apps",
        item5: "POLITIA Tech Community",
        item6: "POLITIA Marketplace",
        item7: "Softwareunternehmen",
        item8: "Visual Studio"
      },
      company: {
        title: "Unternehmen",
        item1: "Karriere",
        item2: "Über POLITIA",
        item3: "Unternehmensnachrichten",
        item4: "Datenschutz bei POLITIA",
        item5: "Investoren",
        item6: "Diversität und Inklusion",
        item7: "Barrierefreiheit",
        item8: "Nachhaltigkeit"
      }
    }
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Acerca de",
      services: "Servicios",
      contact: "Contacto",
      login: "Iniciar sesión",
      brandName: "Politia App",
      openMenu: "Abrir menú principal"
    },
    hero: {
      badge: "Plataforma Administrativa Integrada",
      title: "Modernización de los Servicios Públicos e Interacción",
      subtitle: "Politia App digitaliza los flujos de trabajo administrativos y facilita el acceso de los ciudadanos a información esencial, informes rápidos y servicios seguros en un único portal moderno.",
      cta_online: "Servicios en Línea",
      cta_more: "Más información",
    },
    features: {
      reports_title: "Informes Digitales",
      reports_desc: "Envíe informes en línea de manera simplificada y realice el seguimiento de su resolución en tiempo real.",
      docs_title: "Documentos Explicativos",
      docs_desc: "Guías completas para la obtención de permisos, licencias y otros documentos oficiales emitidos por la institución.",
      alerts_title: "Alertas de Interés Público",
      alerts_desc: "Manténgase al día con anuncios importantes, cambios legislativos y alertas de tráfico en su área.",
    },
    footer: {
      follow: "Seguir a POLITIA",
      privacyChoices: "Tus opciones de privacidad",
      healthPrivacy: "Privacidad de la salud del consumidor",
      sitemap: "Mapa del sitio",
      contact: "Ponte en contacto con POLITIA",
      privacy: "Privacidad",
      terms: "Condiciones de uso",
      trademarks: "Marcas comerciales",
      safety: "Seguridad y medio ambiente",
      recycling: "Reciclaje",
      ask: "Preguntar a POLITIA",
      whatsNew: {
        title: "Novedades",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Caja de desarrollo Surface RTX Spark",
        item5: "Copilot para organizaciones",
        item6: "Copilot para uso personal",
        item7: "Explorar productos POLITIA",
        item8: "Aplicaciones de Windows 11"
      },
      store: {
        title: "Tienda POLITIA",
        item1: "Perfil de cuenta",
        item2: "Centro de descargas",
        item3: "Soporte de tienda",
        item4: "Devoluciones",
        item5: "Seguimiento de pedidos",
        item6: "Reacondicionado certificado",
        item7: "Promesa de la tienda",
        item8: "Pagos flexibles"
      },
      education: {
        title: "Educación",
        item1: "POLITIA en la educación",
        item2: "Dispositivos para la educación",
        item3: "POLITIA Teams para la educación",
        item4: "POLITIA 365 Educación",
        item5: "Cómo comprar para su escuela",
        item6: "Formación y desarrollo de educadores",
        item7: "Ofertas para estudiantes y padres",
        item8: "IA para la educación"
      },
      business: {
        title: "Negocios",
        item1: "POLITIA IA",
        item2: "Seguridad de POLITIA",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Pequeña empresa"
      },
      devIt: {
        title: "Desarrollador y TI",
        item1: "Azure",
        item2: "Desarrollador de POLITIA",
        item3: "Aprender POLITIA",
        item4: "Soporte para aplicaciones del mercado de IA",
        item5: "Comunidad técnica de POLITIA",
        item6: "Mercado de POLITIA",
        item7: "Compañías de software",
        item8: "Visual Studio"
      },
      company: {
        title: "Compañía",
        item1: "Empleo",
        item2: "Acerca de POLITIA",
        item3: "Noticias de la empresa",
        item4: "Privacidad en POLITIA",
        item5: "Inversores",
        item6: "Diversidad e inclusión",
        item7: "Accesibilidad",
        item8: "Sostenibilidad"
      }
    }
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi siamo",
      services: "Servizi",
      contact: "Contatti",
      login: "Accedi",
      brandName: "Politia App",
      openMenu: "Apri menu principale"
    },
    hero: {
      badge: "Piattaforma Amministrativa Integrata",
      title: "Modernizzare i Servizi Pubblici e l'Interazione",
      subtitle: "Politia App digitalizza i flussi di lavoro amministrativi e facilita l'accesso dei cittadini alle informazioni essenziali, a report rapidi e a servizi sicuri in un unico portale moderno.",
      cta_online: "Servizi Online",
      cta_more: "Scopri di più",
    },
    features: {
      reports_title: "Segnalazioni Digitali",
      reports_desc: "Invia segnalazioni online in modo semplificato e monitora lo stato della risoluzione in tempo reale.",
      docs_title: "Documenti Informativi",
      docs_desc: "Guide complete per ottenere permessi, licenze e altri documenti ufficiali rilasciati dall'istituto.",
      alerts_title: "Avvisi di Pubblico Interesse",
      alerts_desc: "Rimani aggiornato su annunci importanti, modifiche legislative e avvisi di traffico nella tua zona.",
    },
    footer: {
      follow: "Segui POLITIA",
      privacyChoices: "Le tue scelte sulla privacy",
      healthPrivacy: "Privacy sulla salute dei consumatori",
      sitemap: "Mappa del sito",
      contact: "Contatta POLITIA",
      privacy: "Privacy",
      terms: "Condizioni d'uso",
      trademarks: "Marchi registrati",
      safety: "Sicurezza e ambiente",
      recycling: "Riciclaggio",
      ask: "Chiedi a POLITIA",
      whatsNew: {
        title: "Novità",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot per le organizzazioni",
        item6: "Copilot per uso personale",
        item7: "Esplora i prodotti POLITIA",
        item8: "Applicazioni per Windows 11"
      },
      store: {
        title: "POLITIA Store",
        item1: "Profilo dell'account",
        item2: "Centro download",
        item3: "Supporto del negozio",
        item4: "Resi",
        item5: "Tracciamento dell'ordine",
        item6: "Ricondizionato certificato",
        item7: "Promessa dello Store",
        item8: "Pagamenti flessibili"
      },
      education: {
        title: "Istruzione",
        item1: "POLITIA nell'istruzione",
        item2: "Dispositivi per l'istruzione",
        item3: "POLITIA Teams per l'istruzione",
        item4: "POLITIA 365 Education",
        item5: "Come acquistare per la tua scuola",
        item6: "Formazione e sviluppo dei docenti",
        item7: "Offerte per studenti e genitori",
        item8: "IA per l'istruzione"
      },
      business: {
        title: "Business",
        item1: "POLITIA AI",
        item2: "POLITIA Security",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Piccole imprese"
      },
      devIt: {
        title: "Sviluppatori & IT",
        item1: "Azure",
        item2: "POLITIA Developer",
        item3: "POLITIA Learn",
        item4: "Supporto per app del marketplace AI",
        item5: "POLITIA Tech Community",
        item6: "POLITIA Marketplace",
        item7: "Software house",
        item8: "Visual Studio"
      },
      company: {
        title: "Azienda",
        item1: "Opportunità di lavoro",
        item2: "Informazioni su POLITIA",
        item3: "Novità dell'azienda",
        item4: "Privacy in POLITIA",
        item5: "Investitori",
        item6: "Diversità e inclusione",
        item7: "Accessibilità",
        item8: "Sostenibilità"
      }
    }
  },
  cop: {
    nav: {
      home: "ⲡⲏⲓ",
      about: "ⲉⲑⲃⲏⲧ",
      services: "ⲇⲓⲁⲕⲟⲛⲓⲁ",
      contact: "ϫⲱϩ",
      login: "ϣⲉ ⲉϧⲟⲩⲛ",
      brandName: "ⲡⲟⲗⲓⲧⲓⲁ",
      openMenu: "ⲁⲟⲩⲱⲛ ⲡⲓⲕⲁⲧⲁⲗⲟⲣⲟⲥ"
    },
    hero: {
      badge: "ⲧⲃⲁⲥⲓⲗⲓⲕⲏ ⲛⲧⲉ ⲡⲓϫⲓⲛⲉⲣϩⲱⲃ",
      title: "ⲡⲓϫⲓⲛⲥⲉⲃϯ ⲛⲧⲉ ⲛⲓϩⲱⲃ ⲙⲙⲏϣ",
      subtitle: "ⲡⲟⲗⲓⲧⲓⲁ ⲉϥⲉⲣϩⲱⲃ ⲉⲑⲃⲉ ⲛⲓϩⲱⲃ ⲛⲧⲉ ϯⲡⲟⲗⲓⲥ ⲛⲉⲙ ⲡⲓϫⲓⲛⲧⲁϩⲟ ⲛⲧⲉ ⲛⲓⲣⲱⲙⲓ.",
      cta_online: "ⲛⲓϩⲱⲃ ⲛⲧⲉ ⲡⲓⲛⲉⲧ",
      cta_more: "ⲉⲙⲓ ⲉϩⲟⲩⲛ",
    },
    features: {
      reports_title: "ⲛⲓⲥϧⲁⲓ ⲛⲧⲉ ⲡⲓⲛⲉⲧ",
      reports_desc: "ⲥϧⲁⲓ ⲉⲑⲃⲉ ⲛⲓϩⲱⲃ ϧⲉⲛ ⲡⲓⲛⲉⲧ.",
      docs_title: "ⲛⲓϫⲱⲙ ⲛⲧⲉ ⲡⲓⲉⲙⲓ",
      docs_desc: "ⲛⲓⲙⲱⲓⲧ ⲉⲑⲃⲉ ⲛⲓⲉⲝⲟⲩⲥⲓⲁ.",
      alerts_title: "ⲛⲓⲫⲏⲱⲩⲓ ⲛⲧⲉ ⲡⲓⲗⲁⲟⲥ",
      alerts_desc: "ⲥⲱⲧⲉⲙ ⲉⲑⲃⲉ ⲛⲓϩⲱⲃ ⲛⲧⲉ ϯⲡⲟⲗⲓⲥ.",
    },
    footer: {
      follow: "ⲙⲟϣⲓ ⲥⲁϩⲏ ⲡⲟⲗⲓⲧⲓⲁ",
      privacyChoices: "ⲛⲓⲥⲱⲧⲡ ⲛⲧⲉ ⲡⲓϩⲱⲡ",
      healthPrivacy: "ⲡⲓϩⲱⲡ ⲛⲧⲉ ⲡⲓⲟⲩϫⲁⲓ",
      sitemap: "ⲡⲓⲙⲱⲓⲧ ⲛⲧⲉ ⲡⲓⲥⲁⲓⲧ",
      contact: "ϫⲱϩ ⲛⲉⲙ ⲡⲟⲗⲓⲧⲓⲁ",
      privacy: "ⲡⲓϩⲱⲡ",
      terms: "ⲛⲓⲛⲟⲙⲟⲥ ⲛⲧⲉ ⲡⲓⲱϧ",
      trademarks: "ⲛⲓⲥϧⲁⲓ ⲛⲧⲉ ⲡⲓⲧⲁϫⲣⲟ",
      safety: "ⲡⲓⲟⲩϫⲁⲓ",
      recycling: "ⲡⲓϫⲓⲛⲧⲁϩⲟ ⲟⲛ",
      ask: "ϣⲉⲛ ⲡⲟⲗⲓⲧⲓⲁ",
      whatsNew: {
        title: "ⲟⲩ ⲡⲉ ⲃⲉⲣⲓ",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot ⲛⲧⲉ ⲛⲓⲥⲩⲛⲟⲇⲟⲥ",
        item6: "Copilot ⲛⲧⲉ ⲡⲓⲣⲱⲙⲓ",
        item7: "ⲛⲓϩⲱⲃ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item8: "Windows 11 apps"
      },
      store: {
        title: "ⲡⲓϣⲱⲡ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item1: "ⲡⲓⲥϧⲁⲓ ⲛⲧⲉ ⲡⲓⲣⲱⲙⲓ",
        item2: "ⲡⲓⲙⲁ ⲛⲧⲉ ⲡⲓϫⲓⲛⲓⲧ",
        item3: "ϯⲃⲟⲏⲑⲓⲁ ⲛⲧⲉ ⲡⲓϣⲱⲡ",
        item4: "ⲡⲓϫⲓⲛⲧⲁⲥⲑⲟ",
        item5: "ⲡⲓϫⲓⲛⲙⲟϣⲓ ⲛⲧⲉ ⲡⲓⲧⲁⲉⲓⲟ",
        item6: "ⲛⲓⲃⲉⲣⲓ ⲉⲧⲁⲩⲧⲁϫⲣⲟ",
        item7: "ⲡⲓⲱϣ ⲛⲧⲉ ⲡⲓϣⲱⲡ",
        item8: "ⲡⲓϫⲓⲛⲧⲏⲓ ϧⲉⲛ ⲟⲩϩⲱⲃ"
      },
      education: {
        title: "ⲡⲓϫⲓⲛⲥⲁⲃⲉ",
        item1: "ⲡⲟⲗⲓⲧⲓⲁ ϧⲉⲛ ⲡⲓϫⲓⲛⲥⲁⲃⲉ",
        item2: "ⲛⲓⲥⲕⲉⲩⲟⲥ ⲛⲧⲉ ⲡⲓϫⲓⲛⲥⲁⲃⲉ",
        item3: "ⲡⲟⲗⲓⲧⲓⲁ Teams ⲛⲧⲉ ⲡⲓϫⲓⲛⲥⲁⲃⲉ",
        item4: "ⲡⲟⲗⲓⲧⲓⲁ 365 ⲡⲓϫⲓⲛⲥⲁⲃⲉ",
        item5: "ⲡⲓϫⲓⲛϣⲱⲡ ⲛⲧⲉ ⲡⲓⲁⲛⲥⲏⲃ",
        item6: "ⲡⲓϫⲓⲛⲥⲁⲃⲉ ⲛⲧⲉ ⲛⲓⲣⲉϥϯⲥⲃⲱ",
        item7: "ⲛⲓⲥⲱⲧⲡ ⲛⲧⲉ ⲛⲓⲁⲛⲥⲏⲃ",
        item8: "AI ⲛⲧⲉ ⲡⲓϫⲓⲛⲥⲁⲃⲉ"
      },
      business: {
        title: "ⲛⲓϩⲱⲃ ⲛⲧⲉ ⲡⲓϫⲓⲛⲉⲣϩⲱⲃ",
        item1: "ⲡⲟⲗⲓⲧⲓⲁ AI",
        item2: "ⲡⲓⲧⲁϫⲣⲟ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item3: "Dynamics 365",
        item4: "ⲡⲟⲗⲓⲧⲓⲁ 365",
        item5: "ⲡⲟⲗⲓⲧⲓⲁ Power Platform",
        item6: "ⲡⲟⲗⲓⲧⲓⲁ Teams",
        item7: "ⲡⲟⲗⲓⲧⲓⲁ 365 Copilot",
        item8: "ⲛⲓⲕⲟⲩϫⲓ ⲛϩⲱⲃ"
      },
      devIt: {
        title: "ⲛⲓⲣⲉϥⲥϧⲁⲓ ⲛⲉⲙ IT",
        item1: "Azure",
        item2: "ⲡⲓⲣⲉϥⲥϧⲁⲓ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item3: "ⲡⲓϫⲓⲛⲉⲙⲓ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item4: "ϯⲃⲟⲏⲑⲓⲁ ⲛⲧⲉ AI apps",
        item5: "ⲡⲓⲗⲁⲟⲥ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ Tech",
        item6: "ⲡⲓⲙⲁ ⲛⲧⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item7: "ⲛⲓⲥⲩⲛⲟⲇⲟⲥ ⲛⲧⲉ ⲡⲓⲥⲟϥⲧ",
        item8: "Visual Studio"
      },
      company: {
        title: "ϯⲥⲩⲛⲟⲇⲟⲥ",
        item1: "ⲛⲓϩⲱⲃ ⲛⲧⲉ ⲡⲓⲣⲱⲙⲓ",
        item2: "ⲉⲑⲃⲉ ⲡⲟⲗⲓⲧⲓⲁ",
        item3: "ⲛⲓⲫⲏⲱⲩⲓ ⲛⲧⲉ ϯⲥⲩⲛⲟⲇⲟⲥ",
        item4: "ⲡⲓϩⲱⲡ ϧⲉⲛ ⲡⲟⲗⲓⲧⲓⲁ",
        item5: "ⲛⲓⲣⲉϥⲧⲏⲓ ⲛⲧⲉ ⲡⲓϫⲓⲛⲉⲣϩⲱⲃ",
        item6: "ⲡⲓϫⲓⲛⲙⲟϣⲓ ⲛⲉⲙ ⲡⲓⲥⲱⲧⲡ",
        item7: "ⲡⲓϫⲓⲛⲉⲣⲟⲩⲱⲛ",
        item8: "ⲡⲓⲱϧ ⲛⲧⲉ ⲡⲓⲱⲛϧ"
      }
    }
  },
  am: {
    nav: {
      home: "መነሻ",
      about: "ስለ እኛ",
      services: "አገልግሎቶች",
      contact: "ግንኙነት",
      login: "ግባ",
      brandName: "ፖሊቲያ መተግበሪያ",
      openMenu: "ዋናውን ማውጫ ክፈት"
    },
    hero: {
      badge: "የተቀናጀ የአስተዳደር መድረክ",
      title: "የሕዝብ አገልግሎቶችን እና መስተጋብርን ማዘመን",
      subtitle: "የፖሊቲያ መተግበሪያ የአስተዳደር የስራ ፍሰቶችን ዲጂታል ያደርጋል እና ዜጎች በአንድ ዘመናዊ ፖርታል ውስጥ አስፈላጊ መረጃዎችን፣ ፈጣን ሪፖርቶችን እና አስተማማኝ አገልግሎቶችን እንዲያገኙ ያመቻቻል።",
      cta_online: "የመስመር ላይ አገልግሎቶች",
      cta_more: "የበለጠ ለመረዳት",
    },
    features: {
      reports_title: "ዲጂታል ሪፖርቶች",
      reports_desc: "ሪፖርቶችን በመስመር ላይ በቀላል መንገድ ያቅርቡ እና የውሳኔ ሁኔታቸውን በቅጽበት ይከታተሉ።",
      docs_title: "ገላጭ ሰነዶች",
      docs_desc: "በተቋሙ የተሰጡ ፈቃዶችን፣ ፈቃዶችን እና ሌሎች ኦፊሴላዊ ሰነዶችን ለማግኘት የተሟላ መመሪያዎች።",
      alerts_title: "የሕዝብ ጥቅም ማንቂያዎች",
      alerts_desc: "በአካባቢዎ ስላሉ አስፈላጊ ማስታወቂያዎች፣ የህግ ለውጦች እና የትራፊክ ማንቂያዎች ወቅታዊ መረጃ ያግኙ።",
    },
    footer: {
      follow: "ፖሊቲያን ይከተሉ",
      privacyChoices: "የእርስዎ የግላዊነት ምርጫዎች",
      healthPrivacy: "የሸማቾች ጤና ግላዊነት",
      sitemap: "የጣቢያ ካርታ",
      contact: "ፖሊቲያን ያነጋግሩ",
      privacy: "ግላዊነት",
      terms: "የአጠቃቀም መመሪያዎች",
      trademarks: "የንግድ ምልክቶች",
      safety: "ደህንነት እና አካባቢ",
      recycling: "መልሶ መጠቀም",
      ask: "ፖሊቲያን ይጠይቁ",
      whatsNew: {
        title: "ምን አዲስ ነገር አለ",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "ኮፓይለት ለድርጅቶች",
        item6: "ኮፓይለት ለግል ጥቅም",
        item7: "የፖሊቲያ ምርቶችን ያስሱ",
        item8: "የዊንዶውስ 11 መተግበሪያዎች"
      },
      store: {
        title: "ፖሊቲያ መደብር",
        item1: "የመለያ መገለጫ",
        item2: "የማውረጃ ማዕከል",
        item3: "የመደብር ድጋፍ",
        item4: "ተመላሾች",
        item5: "የትዕዛዝ ክትትል",
        item6: "የተረጋገጠ እድሳት",
        item7: "የመደብር ቃል ኪዳን",
        item8: "ተለዋዋጭ ክፍያዎች"
      },
      education: {
        title: "ትምህርት",
        item1: "ፖሊቲያ በትምህርት ውስጥ",
        item2: "ለትምህርት የሚሆኑ መሳሪያዎች",
        item3: "ፖሊቲያ ቲምስ ለትምህርት",
        item4: "ፖሊቲያ 365 ትምህርት",
        item5: "ለትምህርት ቤትዎ እንዴት እንደሚገዙ",
        item6: "የአስተማሪ ስልጠና እና ልማት",
        item7: "ለተማሪዎች እና ለወላጆች ቅናሾች",
        item8: "አርቴፊሻል ኢንተለጀንስ ለትምህርት"
      },
      business: {
        title: "ንግድ",
        item1: "ፖሊቲያ አርቴፊሻል ኢንተለጀንስ",
        item2: "የፖሊቲያ ደህንነት",
        item3: "Dynamics 365",
        item4: "ፖሊቲያ 365",
        item5: "ፖሊቲያ Power Platform",
        item6: "ፖሊቲያ ቲምስ",
        item7: "ፖሊቲያ 365 ኮፓይለት",
        item8: "አነስተኛ ንግድ"
      },
      devIt: {
        title: "አልሚ እና የአይቲ",
        item1: "Azure",
        item2: "ፖሊቲያ አልሚ",
        item3: "ፖሊቲያ ይማሩ",
        item4: "ለአርቴፊሻል ኢንተለጀንስ መተግበሪያዎች ድጋፍ",
        item5: "የፖሊቲያ የቴክኖሎጂ ማህበረሰብ",
        item6: "ፖሊቲያ የገበያ ቦታ",
        item7: "የሶፍትዌר ኩባንያዎች",
        item8: "Visual Studio"
      },
      company: {
        title: "ኩባንያ",
        item1: "ስራዎች",
        item2: "ስለ ፖሊቲያ",
        item3: "የኩባንያ ዜናዎች",
        item4: "ግላዊነት በፖሊቲያ",
        item5: "ባለሀብቶች",
        item6: "ብዝሃነት እና ማካተት",
        item7: "ተደራሽነት",
        item8: "ዘላቂነት"
      }
    }
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      contact: "Contato",
      login: "Entrar",
      brandName: "Politia App",
      openMenu: "Abrir menu principal"
    },
    hero: {
      badge: "Plataforma Administrativa Integrada",
      title: "Modernizando Serviços Públicos & Interação",
      subtitle: "O Politia App digitaliza fluxos administrativos e facilita o acesso dos cidadãos a informações essenciais, relatórios rápidos e serviços seguros em um único portal moderno.",
      cta_online: "Serviços Online",
      cta_more: "Saiba Mais",
    },
    features: {
      reports_title: "Relatórios Digitais",
      reports_desc: "Envie relatórios online de forma simplificada e acompanhe o status em tempo real.",
      docs_title: "Documentos Explicativos",
      docs_desc: "Guias completos para obtenção de licenças, alvarás e outros documentos oficiais emitidos pela instituição.",
      alerts_title: "Alertas de Interesse Público",
      alerts_desc: "Fique por dentro de comunicados importantes, mudanças legislativas e alertas de trânsito locais.",
    },
    footer: {
      follow: "Seguir a POLITIA",
      privacyChoices: "Suas escolhas de privacidade",
      healthPrivacy: "Privacidade de saúde do consumidor",
      sitemap: "Mapa do site",
      contact: "Contatar a POLITIA",
      privacy: "Privacidade",
      terms: "Termos de uso",
      trademarks: "Marcas registradas",
      safety: "Segurança e eco",
      recycling: "Reciclagem",
      ask: "Perguntar à POLITIA",
      whatsNew: {
        title: "Novidades",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot para organizações",
        item6: "Copilot para uso pessoal",
        item7: "Explorar produtos POLITIA",
        item8: "Aplicativos do Windows 11"
      },
      store: {
        title: "POLITIA Store",
        item1: "Perfil da conta",
        item2: "Centro de downloads",
        item3: "Suporte da loja",
        item4: "Devoluções",
        item5: "Rastreamento de pedidos",
        item6: "Recondicionados certificados",
        item7: "Promessa da loja",
        item8: "Pagamentos flexíveis"
      },
      education: {
        title: "Educação",
        item1: "POLITIA na educação",
        item2: "Dispositivos para educação",
        item3: "POLITIA Teams para educação",
        item4: "POLITIA 365 Educação",
        item5: "Como comprar para sua escola",
        item6: "Treinamento e desenvolvimento de educadores",
        item7: "Ofertas para estudantes e pais",
        item8: "IA para educação"
      },
      business: {
        title: "Negócios",
        item1: "POLITIA IA",
        item2: "Segurança POLITIA",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Pequenos Negócios"
      },
      devIt: {
        title: "Desenvolvedor e TI",
        item1: "Azure",
        item2: "Desenvolvedor POLITIA",
        item3: "Aprender POLITIA",
        item4: "Suporte para aplicativos do mercado de IA",
        item5: "Comunidade técnica POLITIA",
        item6: "POLITIA Marketplace",
        item7: "Empresas de software",
        item8: "Visual Studio"
      },
      company: {
        title: "Empresa",
        item1: "Carreiras",
        item2: "Sobre a POLITIA",
        item3: "Notícias da empresa",
        item4: "Privacidade na POLITIA",
        item5: "Investidores",
        item6: "Diversidade e inclusão",
        item7: "Acessibilidade",
        item8: "Sustentabilidade"
      }
    }
  },
  nl: {
    nav: {
      home: "Home",
      about: "Over ons",
      services: "Diensten",
      contact: "Contact",
      login: "Inloggen",
      brandName: "Politia App",
      openMenu: "Hoofdmenu openen"
    },
    hero: {
      badge: "Geïntegreerd Administratief Platform",
      title: "Modernisering van Overheidsdiensten & Interactie",
      subtitle: "De Politia App digitaliseert administratieve workflows en vergemakkelijkt de toegang van burgers tot essentiële informatie, snelle rapporten en veilige diensten in één portaal.",
      cta_online: "Online Diensten",
      cta_more: "Meer Informatie",
    },
    features: {
      reports_title: "Digitale Rapporten",
      reports_desc: "Verzend eenvoudig rapporten online en volg de status van de afhandeling in realtime.",
      docs_title: "Toelichtende Documenten",
      docs_desc: "Volledige gidsen voor het verkrijgen van vergunningen, licenties en andere officiële documenten van de instelling.",
      alerts_title: "Meldingen van Openbaar Belang",
      alerts_desc: "Blijf op de hoogte van belangrijke aankondigingen, wetswijzigingen en verkeerswaarschuwingen in uw regio.",
    },
    footer: {
      follow: "Volg POLITIA",
      privacyChoices: "Uw privacykeuzes",
      healthPrivacy: "Privacy van consumentengezondheid",
      sitemap: "Sitemap",
      contact: "Contact opnemen met POLITIA",
      privacy: "Privacy",
      terms: "Gebruiksvoorwaarden",
      trademarks: "Handelsmerken",
      safety: "Veiligheid & milieu",
      recycling: "Recycling",
      ask: "Vraag POLITIA",
      whatsNew: {
        title: "Wat is nieuw",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot voor organisaties",
        item6: "Copilot voor persoonlijk gebruik",
        item7: "Ontdek POLITIA-producten",
        item8: "Windows 11-apps"
      },
      store: {
        title: "POLITIA Store",
        item1: "Accountprofiel",
        item2: "Downloadcentrum",
        item3: "Store-ondersteuning",
        item4: "Retourzendingen",
        item5: "Bestellingen volgen",
        item6: "Gecertificeerd gereviseerd",
        item7: "Store Promise",
        item8: "Flexibele betalingen"
      },
      education: {
        title: "Onderwijs",
        item1: "POLITIA in het onderwijs",
        item2: "Apparaten voor onderwijs",
        item3: "POLITIA Teams voor Onderwijs",
        item4: "POLITIA 365 Onderwijs",
        item5: "Hoe te kopen voor uw school",
        item6: "Training en ontwikkeling van docenten",
        item7: "Aanbiedingen voor studenten en ouders",
        item8: "AI voor onderwijs"
      },
      business: {
        title: "Zakelijk",
        item1: "POLITIA AI",
        item2: "POLITIA Beveiliging",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Midden- en kleinbedrijf"
      },
      devIt: {
        title: "Ontwikkelaar & IT",
        item1: "Azure",
        item2: "POLITIA Ontwikkelaar",
        item3: "POLITIA Leren",
        item4: "Ondersteuning voor AI-marketplace-apps",
        item5: "POLITIA Tech Community",
        item6: "POLITIA Marketplace",
        item7: "Softwarebedrijven",
        item8: "Visual Studio"
      },
      company: {
        title: "Bedrijf",
        item1: "Vacatures",
        item2: "Over POLITIA",
        item3: "Bedrijfsnieuws",
        item4: "Privacy bij POLITIA",
        item5: "Investeerders",
        item6: "Diversiteit en inclusie",
        item7: "Toegankelijkheid",
        item8: "Duurzaamheid"
      }
    }
  },
  sv: {
    nav: {
      home: "Hem",
      about: "Om oss",
      services: "Tjänster",
      contact: "Kontakt",
      login: "Logga in",
      brandName: "Politia App",
      openMenu: "Öppna huvudmenyn"
    },
    hero: {
      badge: "Integrerad Administrativ Plattform",
      title: "Modernisering av Offentliga Tjänster & Interaktion",
      subtitle: "Politia App digitaliserar administrativa arbetsflöden och underlättar medborgarnas tillgång till viktig information, snabba rapporter och säkra tjänster i en enda portal.",
      cta_online: "Onlinetjänster",
      cta_more: "Läs Mer",
    },
    features: {
      reports_title: "Digitala Rapporter",
      reports_desc: "Skicka in rapporter enkelt online och följ statusen för deras lösning i realtid.",
      docs_title: "Förklarande Dokument",
      docs_desc: "Kompletta guider för att erhålla tillstånd, licenser och andra officiella dokument utfärdade av institutionen.",
      alerts_title: "Varningar av Allmänt Intresse",
      alerts_desc: "Håll dig uppdaterad med viktiga meddelanden, lagändringar och trafikvarningar i ditt område.",
    },
    footer: {
      follow: "Följ POLITIA",
      privacyChoices: "Dina integritetsval",
      healthPrivacy: "Konsumenthälsans integritet",
      sitemap: "Webbplatskarta",
      contact: "Kontakta POLITIA",
      privacy: "Integritet",
      terms: "Användarvillkor",
      trademarks: "Varumärken",
      safety: "Säkerhet & miljö",
      recycling: "Återvinning",
      ask: "Fråga POLITIA",
      whatsNew: {
        title: "Vad är nytt",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot för organisationer",
        item6: "Copilot för personlig användning",
        item7: "Utforska POLITIA-produkter",
        item8: "Windows 11-appar"
      },
      store: {
        title: "POLITIA Store",
        item1: "Kontoprofil",
        item2: "Download Center",
        item3: "Store-support",
        item4: "Returer",
        item5: "Beställningsspårning",
        item6: "Certifierad renoverad",
        item7: "Store Promise",
        item8: "Flexibla betalningar"
      },
      education: {
        title: "Utbildning",
        item1: "POLITIA i utbildningen",
        item2: "Enheter för utbildning",
        item3: "POLITIA Teams för utbildning",
        item4: "POLITIA 365 Utbildning",
        item5: "Hur man köper till din skola",
        item6: "Utbildning och utveckling av lärare",
        item7: "Erbjudanden för studenter och föräldrar",
        item8: "AI för utbildning"
      },
      business: {
        title: "Företag",
        item1: "POLITIA AI",
        item2: "POLITIA Säkerhet",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Småföretag"
      },
      devIt: {
        title: "Utvecklare & IT",
        item1: "Azure",
        item2: "POLITIA Utvecklare",
        item3: "POLITIA Lär dig",
        item4: "Support för AI-marketplace-appar",
        item5: "POLITIA Tech Community",
        item6: "POLITIA Marketplace",
        item7: "Programvaruföretag",
        item8: "Visual Studio"
      },
      company: {
        title: "Företag",
        item1: "Karriärer",
        item2: "Om POLITIA",
        item3: "Företagsnyheter",
        item4: "Integritet hos POLITIA",
        item5: "Investerare",
        item6: "Mångfald och inkludering",
        item7: "Tillgänglighet",
        item8: "Hållbarhet"
      }
    }
  },
  el: {
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      services: "Υπηρεσίες",
      contact: "Επικοινωνία",
      login: "Είσοδος",
      brandName: "Politia App",
      openMenu: "Άνοιγμα κύριου μενού"
    },
    hero: {
      badge: "Ενιαία Διοικητική Πλατφόρμα",
      title: "Εκσυγχρονισμός Δημόσιων Υπηρεσιών & Αλληλεπίδρασης",
      subtitle: "Το Politia App ψηφιοποιεί τις διοικητικές ροές εργασίας και διευκολύνει την πρόσβαση των πολιτών σε βασικές πληροφορίες, γρήγορες αναφορές και ασφαλείς υπηρεσίες σε μια ενιαία σύγχρονη πύλη.",
      cta_online: "Ηλεκτρονικές Υπηρεσίες",
      cta_more: "Μάθετε περισσότερα",
    },
    features: {
      reports_title: "Ψηφιακές Αναφορές",
      reports_desc: "Υποβάλετε αναφορές ηλεκτρονικά με απλοποιημένο τρόπο και παρακολουθήστε την κατάσταση επίλυσής τους σε πραγματικό χρόνο.",
      docs_title: "Επεξηγηματικά Έγγραφα",
      docs_desc: "Πλήρεις οδηγοί για την απόκτηση αδειών, εγκρίσεων και άλλων επίσημων εγγράφων που εκδίδονται από το ίδρυμα.",
      alerts_title: "Ειδοποιήσεις Δημόσιου Ενδιαφέροντος",
      alerts_desc: "Μείνετε ενημερωμένοι για σημαντικές ανακοινώσεις, νομοθετικές αλλαγές και ειδοποιήσεις κυκλοφορίας στην περιοχή σας.",
    },
    footer: {
      follow: "Ακολουθήστε την POLITIA",
      privacyChoices: "Οι επιλογές απορρήτου σας",
      healthPrivacy: "Απόρρητο υγείας καταναλωτή",
      sitemap: "Χάρτης ιστοτόπου",
      contact: "Επικοινωνήστε με την POLITIA",
      privacy: "Απόρρητο",
      terms: "Όροι χρήσης",
      trademarks: "Εμπορικά σήματα",
      safety: "Ασφάλεια & οικολογία",
      recycling: "Ανακύκλωση",
      ask: "Ρωτήστε την POLITIA",
      whatsNew: {
        title: "Τι νέο υπάρχει",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot για οργανισμούς",
        item6: "Copilot για προσωπική χρήση",
        item7: "Εξερευνήστε τα προϊόντα POLITIA",
        item8: "Εφαρμογές Windows 11"
      },
      store: {
        title: "Κατάστημα POLITIA",
        item1: "Προφίλ λογαριασμού",
        item2: "Κέντρο λήψεων",
        item3: "Υποστήριξη καταστήματος",
        item4: "Επιστροφές",
        item5: "Παρακολούθηση παραγγελίας",
        item6: "Πιστοποιημένα ανακατασκευασμένα",
        item7: "Υπόσχεση καταστήματος",
        item8: "Ευέλικτες πληρωμές"
      },
      education: {
        title: "Εκπαίδευση",
        item1: "Η POLITIA στην εκπαίδευση",
        item2: "Συσκευές για εκπαίδευση",
        item3: "POLITIA Teams για εκπαίδευση",
        item4: "POLITIA 365 Εκπαίδευση",
        item5: "Πώς να αγοράσετε για το σχολείο σας",
        item6: "Κατάρτιση και ανάπτυξη εκπαιδευτικών",
        item7: "Προσφορές για μαθητές και γονείς",
        item8: "AI για την εκπαίδευση"
      },
      business: {
        title: "Επιχειρήσεις",
        item1: "POLITIA AI",
        item2: "Ασφάλεια POLITIA",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Μικρές επιχειρήσεις"
      },
      devIt: {
        title: "Προγραμματιστές & IT",
        item1: "Azure",
        item2: "Προγραμματιστής POLITIA",
        item3: "Μάθηση POLITIA",
        item4: "Υποστήριξη για εφαρμογές marketplace AI",
        item5: "Τεχνική κοινότητα POLITIA",
        item6: "POLITIA Marketplace",
        item7: "Εταιρείες λογισμικού",
        item8: "Visual Studio"
      },
      company: {
        title: "Εταιρεία",
        item1: "Καριέρα",
        item2: "Σχετικά με την POLITIA",
        item3: "Νέα της εταιρείας",
        item4: "Απόρρητο στην POLITIA",
        item5: "Επενδυτές",
        item6: "Διαφορετικότητα & συμπερίληψη",
        item7: "Προσβασιμότητα",
        item8: "Βιωσιμότητα"
      }
    }
  },
  sw: {
    nav: {
      home: "Nyumbani",
      about: "Kuhusu",
      services: "Huduma",
      contact: "Wasiliana",
      login: "Ingia",
      brandName: "Politia App",
      openMenu: "Fungua menyu kuu"
    },
    hero: {
      badge: "Jukwaa la Utawala Lililounganishwa",
      title: "Kuboresha Huduma za Jamii & Mwingiliano",
      subtitle: "Politia App inafanya kazi za utawala kuwa za kidijitali na inarahisisha raia kupata habari muhimu, ripoti za haraka na huduma salama kwenye tovuti moja ya kisasa.",
      cta_online: "Huduma za Mtandaoni",
      cta_more: "Jifunze Zaidi",
    },
    features: {
      reports_title: "Ripoti za Kidijitali",
      reports_desc: "Tuma ripoti mtandaoni kwa njia rahisi na ufuatilie hali yao ya utatuzi kwa wakati halisi.",
      docs_title: "Nyaraka za Maelezo",
      docs_desc: "Mwongozo kamili wa kupata vibali, leseni na nyaraka zingine rasmi zinazotolewa na taasisi.",
      alerts_title: "Tahadhari za Maslahi ya Umma",
      alerts_desc: "Pata habari mpya kuhusu matangazo muhimu, mabadiliko ya sheria na tahadhari za trafiki katika eneo lako.",
    },
    footer: {
      follow: "Fuata POLITIA",
      privacyChoices: "Chaguzi zako za faragha",
      healthPrivacy: "Faragha ya afya ya mlaji",
      sitemap: "Ramani ya tovuti",
      contact: "Wasiliana na POLITIA",
      privacy: "Faragha",
      terms: "Masharti ya matumizi",
      trademarks: "Alama za biashara",
      safety: "Usalama na mazingira",
      recycling: "Urejelezaji",
      ask: "Uliza POLITIA",
      whatsNew: {
        title: "Nini mpya",
        item1: "Surface Pro",
        item2: "Surface Laptop",
        item3: "Surface Laptop Ultra",
        item4: "Surface RTX Spark Dev Box",
        item5: "Copilot kwa mashirika",
        item6: "Copilot kwa matumizi binafsi",
        item7: "Gundua bidhaa za POLITIA",
        item8: "Programu za Windows 11"
      },
      store: {
        title: "Duka la POLITIA",
        item1: "Wasifu wa akaunti",
        item2: "Kituo cha kupakua",
        item3: "Msaada wa duka",
        item4: "Marejesho",
        item5: "Kufuatilia agizo",
        item6: "Imerekebishwa iliyoidhinishwa",
        item7: "Ahadi ya Duka",
        item8: "Malipo rahisi"
      },
      education: {
        title: "Elimu",
        item1: "POLITIA katika elimu",
        item2: "Vifaa vya elimu",
        item3: "POLITIA Teams kwa Elimu",
        item4: "POLITIA 365 Elimu",
        item5: "Jinsi ya kununulia shule yako",
        item6: "Mafunzo na maendeleo ya mwalimu",
        item7: "Ofa za wanafunzi na wazazi",
        item8: "AI kwa elimu"
      },
      business: {
        title: "Biashara",
        item1: "POLITIA AI",
        item2: "Usalama wa POLITIA",
        item3: "Dynamics 365",
        item4: "POLITIA 365",
        item5: "POLITIA Power Platform",
        item6: "POLITIA Teams",
        item7: "POLITIA 365 Copilot",
        item8: "Biashara Ndogo"
      },
      devIt: {
        title: "Msanidi Programu & IT",
        item1: "Azure",
        item2: "Msanidi Programu wa POLITIA",
        item3: "Jifunze POLITIA",
        item4: "Msaada kwa programu za soko la AI",
        item5: "Jumuiya ya Teknolojia ya POLITIA",
        item6: "Soko la POLITIA",
        item7: "Kampuni za programu",
        item8: "Visual Studio"
      },
      company: {
        title: "Kampuni",
        item1: "Kazi",
        item2: "Kuhusu POLITIA",
        item3: "Habari za kampuni",
        item4: "Faragha kwenye POLITIA",
        item5: "Wawekezaji",
        item6: "Anuwai na ujumuishaji",
        item7: "Upatikanaji",
        item8: "Uendelevu"
      }
    }
  }
};

type Dictionary = typeof dictionaries.en;

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
  const [dir, setDir] = useState<Direction>(initialLocale.startsWith("ar") ? "rtl" : "ltr");

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    const newDir: Direction = newLocale.startsWith("ar") ? "rtl" : "ltr";
    setDir(newDir);

    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      localStorage.setItem("preferredLanguage", newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newDir;
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    const validLocales: SupportedLocale[] = [
      "ar", "ar-EG", "ar-SA", "ar-AE",
      "cop",
      "en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN",
      "fr", "fr-FR",
      "it", "it-IT",
      "de", "de-DE",
      "es", "es-ES",
      "am", "am-ET",
      "pt", "pt-PT",
      "nl", "nl-NL",
      "sv", "sv-SE",
      "el", "el-GR",
      "sw", "sw-KE"
    ];
    if (storedLang && validLocales.includes(storedLang as SupportedLocale)) {
      if (storedLang !== locale) {
        setLocale(storedLang as SupportedLocale);
        return;
      }
    }
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const getDictionaryForLocale = (loc: SupportedLocale) => {
    const base = loc.split("-")[0];
    if (base === "ar") return dictionaries.ar;
    if (base === "fr") return dictionaries.fr;
    if (base === "de") return dictionaries.de;
    if (base === "es") return dictionaries.es;
    if (base === "it") return dictionaries.it;
    if (base === "cop") return dictionaries.cop;
    if (base === "am") return dictionaries.am;
    if (base === "pt") return dictionaries.pt;
    if (base === "nl") return dictionaries.nl;
    if (base === "sv") return dictionaries.sv;
    if (base === "el") return dictionaries.el;
    if (base === "sw") return dictionaries.sw;
    return dictionaries.en;
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = getDictionaryForLocale(locale);

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        let fallback: any = dictionaries.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof current === "string" ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
