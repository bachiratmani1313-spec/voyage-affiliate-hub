# PRD - Vrax Voyage | Comparateur de Vols Premium

**Dernière mise à jour :** Avril 2025
**Propriétaire :** Atmani Bachir
**Site :** vrax-voyage.com
**URL Preview :** https://voyage-affiliate-hub.preview.emergentagent.com

---

## 1. Stack Technique
- **Frontend :** React.js (CRA + Tailwind CSS)
- **Backend :** FastAPI (Python) + MongoDB
- **Design :** Cormorant Garamond (titres) + Outfit (corps) + Or (#c9a84c) sur fond sombre (#0a0f1a)

---

## 2. Liens d'Affiliation Intégrés
| Partenaire | Paramètre | Utilisation |
|---|---|---|
| TravelPayouts / Aviasales | marker=704469 | Recherche vols, carte prix |
| Amazon.fr | tag=vrax-21 | 6 produits boutique voyage |
| KiwiTaxi | marker=704469 | Transferts VIP aéroport |
| DiscoverCars | a_aid=704469 | Location de voitures |
| HotelLook | marker=704469 | Réservation hôtels |
| **Emergent (parrainage)** | **ref=bach300594** | **Footer — "Créer mon site sur Emergent"** |

---

## 3. Pages du Site
| Route | Description |
|---|---|
| `/` | Accueil : Hero + Recherche vols + Prix + Services + Hôtels + Amazon + Blog |
| `/blog` | 12 articles, filtres tags, likes |
| `/blog/:slug` | Article complet + likes + commentaires + partage social |
| `/contact` | Formulaire contact (MongoDB) |
| `/mentions-legales` | Mentions légales — Atmani Bachir |
| `/cgu` | Conditions Générales d'Utilisation |
| `/confidentialite` | Politique de confidentialité RGPD |
| `/affiliation` | Disclosure affiliation |

---

## 4. Composants Principaux
- `Navbar.js` — Navigation fixe, menu mobile hamburger
- `Hero.js` — Photo luxe, stats, CTA
- `FlightWidget.js` — **Formulaire recherche vols custom** → Aviasales marker=704469
- `PriceMapWidget.js` — **Grille 8 destinations avec prix** → Aviasales marker=704469
- `ServicesSection.js` — DiscoverCars + KiwiTaxi
- `HotelSection.js` — HotelLook marker=704469
- `AmazonShop.js` — 6 produits tag=vrax-21
- `BlogSection.js` — Préview 3 articles
- `Footer.js` — Atmani Bachir + liens légaux + lien Emergent ref=bach300594

---

## 5. Blog — 12 Articles (en base MongoDB)
1. Maldives | 2. Bali | 3. Tenerife | 4. Marrakech | 5. Phuket | 6. Cancún
7. Santorin | 8. Dubaï | 9. La Réunion | 10. Bora Bora | 11. Séville | 12. Sri Lanka

**Fonctionnalités blog :**
- Likes (MongoDB + localStorage anti-doublon)
- Commentaires (MongoDB)
- Partage social : X, Facebook, WhatsApp, LinkedIn, Copier lien
- Filtres par tags
- Fiches pratiques : saison, température, durée vol, monnaie

---

## 6. APIs Backend (/api/...)
| Méthode | Route | Description |
|---|---|---|
| GET | /blog/posts | Liste des 12 articles |
| GET | /blog/posts/{slug} | Article par slug |
| POST | /blog/posts/{id}/like | Incrémenter like |
| GET | /blog/posts/{id}/comments | Commentaires |
| POST | /blog/posts/{id}/comments | Ajouter commentaire |
| POST | /contact | Formulaire contact |

---

## 7. Google Analytics
- **ID :** G-0DKDZQKTE3
- **Property :** 518776106
- Tracking pages vues, clics affiliés (window.trackAffiliate), partages sociaux
- Intégré dans `public/index.html`

---

## 8. SEO
- Balises meta, Open Graph, Twitter Card, JSON-LD
- Titres dynamiques par page (document.title dans useEffect)
- 12 articles de blog avec contenu riche pour le référencement naturel

---

## 9. Déploiement sur vrax-voyage.com
1. Cliquer **Deploy** dans Emergent → "Deploy Now"
2. Une fois déployé → **"Link domain"** → entrer `vrax-voyage.com` → cliquer "Entri"
3. Après déploiement : les widgets TravelPayouts s'activeront sur le vrai domaine

---

## 10. Backlog
- [ ] Alertes vols par email (newsletter)
- [ ] Objectifs de conversion GA4 sur affiliate_click
- [ ] Nouveaux articles blog : Jamaïque, Açores, Maldives budget, Maroc Essaouira
- [ ] Sitemap.xml automatique
- [ ] Page 404 personnalisée
- [ ] Galeries photos dans les articles
