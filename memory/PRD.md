# PRD - Vrax Voyage | Comparateur de Vols Premium

**Dernière mise à jour :** Avril 2025
**Propriétaire :** Atmani Bachir
**Site :** vrax-voyage.com (reconstruit en React + FastAPI + MongoDB)

---

## 1. Problème Original
Transformer le site comparateur de billets vrax-voyage.com (ancienne version HTML/CSS) en un site premium avec meilleur design, en conservant les liens d'affiliation, et en ajoutant des protocoles légaux et le nom du propriétaire.

## 2. User Personas
- **Voyageur budget** : Cherche les meilleures offres de vols pas chers
- **Voyageur premium** : Cherche transferts VIP et hôtels de qualité
- **Lecteur du blog** : S'inspire des guides de destinations ensoleillées

## 3. Architecture Technique
- **Frontend :** React.js (CRA + CRACO + Tailwind CSS)
- **Backend :** FastAPI (Python) + MongoDB
- **Design System :** Cormorant Garamond (titres) + Outfit (corps) + Gold (#c9a84c) sur fond sombre (#0a0f1a)

## 4. Fonctionnalités Implémentées

### Pages
- [x] `/` - Page d'accueil (Hero + Vols + Carte + Services + Hôtels + Amazon + Blog)
- [x] `/blog` - Blog destinations ensoleillées (6 articles, filtres par tags)
- [x] `/blog/:slug` - Article de blog complet (likes + commentaires)
- [x] `/contact` - Formulaire de contact
- [x] `/mentions-legales` - Mentions légales (Atmani Bachir)
- [x] `/cgu` - CGU
- [x] `/confidentialite` - Politique de confidentialité (RGPD)
- [x] `/affiliation` - Disclosure affiliation

### Composants
- [x] Navbar fixe avec hamburger mobile
- [x] Hero section (photo luxe + stats)
- [x] FlightWidget (TravelPayouts cascoon #7879, marker=704469)
- [x] PriceMapWidget (TravelPayouts cascoon #4054, marker=704469)
- [x] ServicesSection (DiscoverCars + KiwiTaxi affiliés)
- [x] HotelSection (HotelLook, marker=704469)
- [x] AmazonShop (6 produits, tag=vrax-21)
- [x] BlogSection (préview 3 articles)
- [x] Footer (Atmani Bachir + liens légaux + partenaires)

### Backend APIs
- [x] `GET /api/blog/posts` - Liste des 6 articles
- [x] `GET /api/blog/posts/{slug}` - Article par slug
- [x] `POST /api/blog/posts/{id}/like` - Liker un article
- [x] `GET /api/blog/posts/{id}/comments` - Commentaires
- [x] `POST /api/blog/posts/{id}/comments` - Ajouter commentaire
- [x] `POST /api/contact` - Formulaire de contact

### Blog - Articles créés
1. Les Maldives : Paradis des Océans Indiens
2. Bali : L'Île Mystique des Dieux Indonésiens
3. Tenerife : Le Soleil Éternel des Îles Canaries
4. Marrakech : La Ville Rouge Envoûtante du Maroc
5. Phuket : Le Joyau Tropical de la Thaïlande
6. Cancún : Les Caraïbes Mexicaines en Toute Splendeur

### Liens d'Affiliation Préservés
- TravelPayouts : marker=704469 (vols, carte, hôtels)
- Amazon : tag=vrax-21 (6 produits voyage)
- KiwiTaxi : marker=704469 (transferts VIP)
- DiscoverCars : a_aid=704469 (location voitures)
- HotelLook : marker=704469 (hôtels)

## 5. SEO
- [x] Balises meta (title, description, keywords, author)
- [x] Open Graph tags
- [x] Twitter Card
- [x] Données structurées JSON-LD
- [x] Titres de pages dynamiques par useEffect

## 6. Backlog Prioritaire

### P0 (Bloquant)
- [ ] Vérifier que les widgets TravelPayouts se chargent sur le vrai domaine vrax-voyage.com

### P1 (Important)
- [ ] Système de partage social (boutons Twitter, Facebook, WhatsApp) sur articles
- [ ] Newsletter / liste d'emails pour les voyageurs
- [ ] Pages de résultats de recherche de vols intégrées

### P2 (Nice to have)
- [ ] Galeries photos pour les articles du blog
- [ ] Système de notation des destinations (étoiles)
- [ ] Section "Destinations Populaires" avec prix en direct
- [ ] Page 404 personnalisée
- [ ] Sitemap.xml généré automatiquement
- [ ] Optimisation images (lazy loading)

## 7. Prochaines actions suggérées
1. Déployer sur vrax-voyage.com pour activer les widgets TravelPayouts
2. Ajouter des articles de blog (minimum 3-4 par mois pour le SEO)
3. Intégrer Google Analytics pour suivre les conversions
4. Ajouter des boutons de partage social sur les articles
