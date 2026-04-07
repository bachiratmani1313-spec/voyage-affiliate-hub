import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const LEGAL_CONTENT = {
  "mentions-legales": {
    title: "Mentions Légales",
    icon: "fa-balance-scale",
    sections: [
      {
        heading: "1. Identification de l'éditeur",
        content: `Le présent site internet accessible à l'adresse vrax-voyage.com est édité par :

**Atmani Bachir**
Propriétaire et éditeur responsable du site Vrax Voyage
Contact : contact@vrax-voyage.com
Site : https://vrax-voyage.com

Hébergement : Ce site est hébergé par des services cloud sécurisés.`
      },
      {
        heading: "2. Directeur de la publication",
        content: `Le directeur de la publication du site vrax-voyage.com est **Atmani Bachir**, qui peut être contacté à l'adresse email suivante : contact@vrax-voyage.com`
      },
      {
        heading: "3. Objet du site",
        content: `Vrax Voyage est un site comparateur de voyages qui propose des services de comparaison de vols, de location de voitures, de transferts aéroportuaires et de produits de voyage. Le site utilise des liens d'affiliation avec des partenaires commerciaux (TravelPayouts, Amazon, KiwiTaxi, DiscoverCars, HotelLook).`
      },
      {
        heading: "4. Propriété intellectuelle",
        content: `L'ensemble du contenu présent sur le site vrax-voyage.com (textes, images, logos, articles de blog) est protégé par le droit d'auteur. Toute reproduction, représentation ou diffusion, en tout ou en partie, est interdite sans autorisation expresse de l'éditeur.`
      },
      {
        heading: "5. Limitation de responsabilité",
        content: `Vrax Voyage agit en qualité d'intermédiaire et de comparateur. Les prix, disponibilités et conditions de voyage affichés sont fournis par des partenaires tiers. Vrax Voyage ne peut être tenu responsable des inexactitudes ou des modifications de prix effectuées par les partenaires.`
      },
      {
        heading: "6. Droit applicable",
        content: `Le présent site et les conditions d'utilisation sont régis par le droit français. Tout litige sera soumis à la juridiction des tribunaux français compétents.`
      }
    ]
  },
  "cgu": {
    title: "Conditions Générales d'Utilisation",
    icon: "fa-file-contract",
    sections: [
      {
        heading: "1. Objet",
        content: `Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions dans lesquelles Vrax Voyage (ci-après "le Site") met à disposition ses services aux utilisateurs.`
      },
      {
        heading: "2. Acceptation des CGU",
        content: `L'utilisation du Site implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site.`
      },
      {
        heading: "3. Accès au service",
        content: `Le service proposé par Vrax Voyage est un service de comparaison de vols, hôtels, location de voitures et accessoires de voyage. L'accès au site est gratuit pour les utilisateurs. Le site peut être inaccessible temporairement pour des raisons de maintenance technique.`
      },
      {
        heading: "4. Utilisation du service",
        content: `L'utilisateur s'engage à :
- Ne pas utiliser le Site à des fins illicites
- Ne pas tenter de nuire au bon fonctionnement du Site
- Respecter les droits de propriété intellectuelle
- Fournir des informations exactes lors des contacts

Tout comportement frauduleux ou abusif entraînera le blocage de l'accès au Site.`
      },
      {
        heading: "5. Liens externes et affiliation",
        content: `Le Site contient des liens vers des sites partenaires (TravelPayouts, Amazon, KiwiTaxi, DiscoverCars, HotelLook). Ces liens peuvent être des liens d'affiliation générant une commission. Vrax Voyage n'est pas responsable du contenu des sites tiers ni des transactions effectuées sur ces plateformes.`
      },
      {
        heading: "6. Blog et commentaires",
        content: `Les commentaires publiés sur le blog engagent leur auteur. Vrax Voyage se réserve le droit de supprimer tout commentaire inapproprié, diffamatoire ou contraire aux bonnes mœurs. Les avis d'utilisateurs sont publiés sous leur propre responsabilité.`
      },
      {
        heading: "7. Modification des CGU",
        content: `Vrax Voyage se réserve le droit de modifier les présentes CGU à tout moment. L'utilisation du Site après notification des modifications vaut acceptation des nouvelles conditions.`
      }
    ]
  },
  "confidentialite": {
    title: "Politique de Confidentialité",
    icon: "fa-shield-alt",
    sections: [
      {
        heading: "1. Responsable du traitement",
        content: `Le responsable du traitement des données à caractère personnel est **Atmani Bachir**, éditeur du site vrax-voyage.com, joignable à contact@vrax-voyage.com.`
      },
      {
        heading: "2. Données collectées",
        content: `Dans le cadre de l'utilisation du Site, les données suivantes peuvent être collectées :
- **Formulaire de contact** : Nom, adresse email, sujet et message
- **Commentaires blog** : Nom de l'auteur et texte du commentaire
- **Données de navigation** : Cookies de session, données analytiques anonymisées`
      },
      {
        heading: "3. Finalités du traitement",
        content: `Les données collectées sont utilisées pour :
- Répondre aux demandes via le formulaire de contact
- Publier les commentaires sur le blog
- Améliorer l'expérience utilisateur
- Analyser le trafic du site (statistiques anonymisées)`
      },
      {
        heading: "4. Base légale",
        content: `Le traitement des données est fondé sur :
- Le consentement de l'utilisateur (commentaires, formulaire de contact)
- L'intérêt légitime de l'éditeur (statistiques, amélioration du service)`
      },
      {
        heading: "5. Conservation des données",
        content: `Les données sont conservées pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées. Les messages de contact sont conservés pendant 3 ans. Les commentaires de blog sont conservés tant que l'article est en ligne.`
      },
      {
        heading: "6. Cookies",
        content: `Le Site utilise des cookies pour :
- Assurer le bon fonctionnement des widgets de partenaires (TravelPayouts, Amazon)
- Mémoriser vos préférences de navigation
- Analyser le trafic (statistiques anonymisées)

Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.`
      },
      {
        heading: "7. Vos droits",
        content: `Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit à l'effacement ("droit à l'oubli")
- Droit d'opposition au traitement

Pour exercer ces droits, contactez-nous à : contact@vrax-voyage.com`
      },
      {
        heading: "8. Partage des données",
        content: `Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos partenaires techniques (hébergeur) dans la limite strictement nécessaire au fonctionnement du service.`
      }
    ]
  },
  "affiliation": {
    title: "Disclosure Affiliation",
    icon: "fa-handshake",
    sections: [
      {
        heading: "Déclaration d'affiliation",
        content: `Conformément aux directives de la Federal Trade Commission (FTC) et aux réglementations européennes sur la transparence commerciale, Vrax Voyage déclare clairement sa participation à des programmes d'affiliation.

**Atmani Bachir**, propriétaire de Vrax Voyage, est rémunéré par des commissions lorsque les visiteurs cliquent sur certains liens présents sur ce site et effectuent un achat ou une réservation.`
      },
      {
        heading: "Nos partenaires affiliés",
        content: `Vrax Voyage participe aux programmes d'affiliation suivants :

**1. TravelPayouts (marker : 704469)**
- Programme : Aviasales, HotelLook, KiwiTaxi, DiscoverCars
- Type : Commission sur réservation (vols, hôtels, voitures, transferts)
- Marqueur d'identification : #704469

**2. Amazon Partenaires (tag : vrax-21)**
- Programme : Amazon Associates France
- Type : Commission sur ventes de produits (accessoires voyage)
- Identifiant : vrax-21

**3. KiwiTaxi via TravelPayouts**
- Type : Commission sur réservation de transferts aéroportuaires

**4. DiscoverCars via TravelPayouts**
- Type : Commission sur location de véhicules

**5. HotelLook via TravelPayouts**
- Type : Commission sur réservation d'hôtels`
      },
      {
        heading: "Transparence et objectivité",
        content: `Vrax Voyage s'engage à :
- Toujours signaler les liens sponsorisés (attribut rel="sponsored")
- Maintenir l'objectivité des recommandations malgré les partenariats
- Ne jamais modifier une recommandation uniquement pour générer une commission
- Proposer uniquement des services que nous utilisons et recommandons sincèrement`
      },
      {
        heading: "Impact sur les prix",
        content: `Les liens d'affiliation ne modifient **pas** le prix que vous payez. Que vous passiez par notre site ou directement par le partenaire, le tarif final est identique. La commission est prise en charge par le partenaire, pas par le client.`
      },
      {
        heading: "Questions et contact",
        content: `Pour toute question concernant notre politique d'affiliation ou pour signaler un problème avec un lien partenaire, contactez-nous à : contact@vrax-voyage.com`
      }
    ]
  }
};

export default function LegalPage() {
  const location = useLocation();
  const type = location.pathname.replace("/", "");
  const page = LEGAL_CONTENT[type];

  useEffect(() => {
    if (page) document.title = `${page.title} | Vrax Voyage`;
  }, [type, page]);

  if (!page) {
    return (
      <div style={{ background: "#0a0f1a", minHeight: "100vh" }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl text-gray-700 mb-4">404</div>
          <p className="text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>Page introuvable</p>
          <Link to="/" className="text-[#c9a84c] hover:underline mt-4 block" style={{ fontFamily: "'Outfit', sans-serif" }}>Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-28 pb-12 px-6 text-center" style={{ background: "linear-gradient(to bottom, #0d1930, #0a0f1a)" }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: "rgba(201,168,76,0.15)" }}>
          <i className={`fas ${page.icon} text-[#c9a84c] text-xl`} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {page.title}
        </h1>
        <p className="text-gray-400 text-sm mt-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Propriétaire : <span className="text-[#c9a84c]">Atmani Bachir</span> · vrax-voyage.com
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <Link to="/" className="hover:text-[#c9a84c] transition-colors">Accueil</Link>
          <i className="fas fa-chevron-right text-xs" />
          <span className="text-gray-400">{page.title}</span>
        </div>

        <div className="space-y-8">
          {page.sections.map((section, i) => (
            <div
              key={i}
              className="p-6 rounded-xl"
              style={{ background: "rgba(18,24,38,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="text-[#c9a84c]">§</span>
                {section.heading}
              </h2>
              <div className="text-sm text-gray-300 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {section.content.split('\n').map((line, li) => {
                  if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
                    return <p key={li} className="font-semibold text-white mb-2">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <div key={li} className="flex items-start gap-2 mb-1.5">
                        <i className="fas fa-chevron-right text-[#c9a84c] text-xs mt-1 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                      </div>
                    );
                  }
                  if (line === '') return <div key={li} className="mb-2" />;
                  return (
                    <p key={li} className="mb-1.5" dangerouslySetInnerHTML={{
                      __html: line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:white">$1</strong>')
                    }} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation between legal pages */}
        <div className="mt-12 p-6 rounded-xl" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <h3 className="text-sm font-semibold text-gray-300 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Autres documents légaux
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Mentions légales", to: "/mentions-legales" },
              { label: "CGU", to: "/cgu" },
              { label: "Confidentialité", to: "/confidentialite" },
              { label: "Affiliation", to: "/affiliation" },
            ].filter((l) => !l.to.includes(type)).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#c9a84c] transition-all duration-200 hover:scale-105"
                style={{ border: "1px solid rgba(201,168,76,0.3)", background: "rgba(201,168,76,0.05)", fontFamily: "'Outfit', sans-serif" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/" data-testid="back-home" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#c9a84c] mt-8 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-arrow-left" /> Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
