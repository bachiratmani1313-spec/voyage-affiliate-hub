from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ── Models ──────────────────────────────────────────────────────────────────

class CommentCreate(BaseModel):
    author: str
    content: str

class Comment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    post_id: str
    author: str
    content: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ── Blog seed data ───────────────────────────────────────────────────────────

BLOG_POSTS = [
    {
        "id": "1", "slug": "maldives-paradis-ocean",
        "title": "Les Maldives : Paradis des Océans Indiens",
        "excerpt": "Des eaux turquoise cristallines, des villas sur pilotis et un soleil généreux toute l'année. Découvrez pourquoi les Maldives restent la destination de rêve absolue pour les amoureux du luxe et de la plage.",
        "image": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
        "country": "Maldives", "capital": "Malé",
        "tags": ["Plage", "Luxe", "Plongée", "Lune de miel"],
        "readTime": "5 min", "date": "2025-01-15",
        "bestSeason": "Novembre à Avril", "currency": "Rufiyaa (MVR)",
        "language": "Dhivehi", "timezone": "UTC+5",
        "temperature": "26–31°C", "flightTime": "~11h depuis Paris",
        "likes": 42,
        "content": "Les Maldives, archipel de 1 200 îles coralliennes au cœur de l'Océan Indien, représentent l'épitomé du paradis tropical. Chaque île est un écrin de sable blanc entouré d'eaux turquoise d'une transparence absolue, abritant une faune marine d'une richesse exceptionnelle.\n\nLe meilleur moment pour visiter les Maldives s'étend de novembre à avril, pendant la saison sèche. Les températures oscillent entre 26 et 31°C, avec un ensoleillement quasi permanent. La visibilité sous-marine dépasse souvent les 30 mètres, faisant de cette période la saison idéale pour la plongée et le snorkeling.\n\nLes villas sur pilotis (overwater bungalows) sont l'hébergement emblématique des Maldives. Suspendues au-dessus du lagon, elles offrent un accès direct à l'océan et des vues à couper le souffle sur l'horizon aquamarine. Des resorts comme Soneva Fushi, Six Senses Laamu ou Gili Lankanfushi proposent des expériences de luxe inoubliables.\n\nPour les plongeurs, les Maldives offrent des sites world-class : requins-baleines à Hanifaru Bay, raies mantas dans les atolls de Baa et Ari, bancs de poissons multicolores dans les jardins de corail. Même les non-plongeurs peuvent admirer ces merveilles grâce au snorkeling depuis leur villa.\n\nConseils pratiques : Réservez minimum 6 mois à l'avance pour les meilleures offres. Prévoyez un budget de 300 à 1000€ par nuit selon le resort. Les transferts en hydravion depuis l'aéroport international de Malé ajoutent une touche d'aventure à l'arrivée !"
    },
    {
        "id": "2", "slug": "bali-ile-des-dieux",
        "title": "Bali : L'Île Mystique des Dieux Indonésiens",
        "excerpt": "Entre rizières en terrasses, temples millénaires et plages paradisiaques, Bali séduit par sa spiritualité unique et sa beauté naturelle. Une destination qui mêle aventure, culture et douceur de vivre à l'indonésienne.",
        "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        "country": "Indonésie", "capital": "Denpasar",
        "tags": ["Culture", "Plage", "Yoga", "Gastronomie"],
        "readTime": "6 min", "date": "2025-01-28",
        "bestSeason": "Avril à Octobre", "currency": "Roupie indonésienne (IDR)",
        "language": "Balinais / Indonésien", "timezone": "UTC+8",
        "temperature": "24–32°C", "flightTime": "~16h depuis Paris",
        "likes": 38,
        "content": "Bali, 'l'Île des Dieux', est bien plus qu'une destination touristique : c'est une expérience spirituelle et sensorielle unique. La culture hindoue-balinaise imprègne chaque aspect de la vie sur l'île, des cérémonies quotidiennes aux temples sculptés dans la roche.\n\nUbud, le cœur culturel de Bali, est entouré de rizières en terrasses qui figurent au patrimoine UNESCO. Le Tegallalang Rice Terrace au lever du soleil est l'un des spectacles les plus photographiés d'Asie. C'est aussi le centre du yoga, de la méditation et de la gastronomie balinaise.\n\nLes plages de Bali sont diverses : Seminyak et Kuta pour les fêtards et les surfeurs, Nusa Dua pour le luxe et la tranquillité, Uluwatu pour les vagues légendaires. Le temple de Tanah Lot, perché sur un rocher au milieu de l'océan, est particulièrement magique au coucher du soleil.\n\nLa gastronomie balinaise est un voyage en soi. Le Babi Guling (cochon de lait rôti), le Bebek Betutu (canard fumé aux épices), et le Nasi Campur (riz aux accompagnements variés) raviront les plus gourmands. Les restaurants végétariens et végans ont également envahi Ubud.\n\nConseils pratiques : Évitez juillet-août (haute saison bondée). Louez un scooter (100 000 IDR/jour ≈ 6€) pour vous déplacer librement. Respectez les coutumes : couvrez-vous avant d'entrer dans un temple. Prévoyez 30 à 150€ par jour selon votre style de voyage."
    },
    {
        "id": "3", "slug": "tenerife-soleil-canaries",
        "title": "Tenerife : Le Soleil Éternel des Îles Canaries",
        "excerpt": "À seulement 4 heures de Paris, Tenerife jouit d'un printemps perpétuel avec plus de 300 jours de soleil par an. Entre le volcan Teide, les plages de sable noir et les stations balnéaires animées, cette île espagnole a tout pour séduire.",
        "image": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80",
        "country": "Espagne (Canaries)", "capital": "Santa Cruz de Tenerife",
        "tags": ["Soleil", "Famille", "Randonnée", "Plage"],
        "readTime": "5 min", "date": "2025-02-10",
        "bestSeason": "Toute l'année", "currency": "Euro (EUR)",
        "language": "Espagnol", "timezone": "UTC+0",
        "temperature": "20–28°C", "flightTime": "~4h depuis Paris",
        "likes": 56,
        "content": "Tenerife est la plus grande des Îles Canaries et l'une des destinations soleil les plus populaires d'Europe. Sa position géographique au large des côtes africaines lui confère un microclimat exceptionnel : plus de 300 jours de soleil par an et des températures qui ne descendent jamais en dessous de 18°C.\n\nLe Teide, volcan endormi culminant à 3 718 mètres, est le point culminant d'Espagne et un site classé UNESCO. La randonnée jusqu'au sommet, à travers un paysage lunaire de lave noire et de formations rocheuses spectaculaires, est une expérience inoubliable. Le parc national du Teide attire plus de 3 millions de visiteurs par an.\n\nLes plages de Tenerife sont variées : Playa de las Teresitas au nord, avec son sable d'or importé du Sahara, Playa del Inglés au sud pour l'animation et la vie nocturne, et les piscines naturelles de Garachico creusées dans la lave volcanique. Les amateurs de surf trouveront leur bonheur à La Santa et Punta Blanca.\n\nPour la gastronomie, ne manquez pas les Papas Arrugadas (pommes de terre ridées) avec la sauce Mojo rojo, les grillades de poisson frais dans les guachinches (restaurants locaux), et le Barraquito, le café traditionnel canariens à plusieurs couches.\n\nConseils pratiques : Tenerife est accessible toute l'année. Les vols depuis Paris partent de CDG et Orly, avec des prix très compétitifs (dès 50€ aller). L'île se divise en deux zones climatiques distinctes : le nord plus vert et nuageux, le sud plus aride et ensoleillé."
    },
    {
        "id": "4", "slug": "marrakech-perle-du-maroc",
        "title": "Marrakech : La Ville Rouge Envoûtante du Maroc",
        "excerpt": "Souks labyrinthiques, palais fastueux, jardins secrets et une gastronomie parmi les plus raffinées du monde. Marrakech, à seulement 3h30 de Paris, est une immersion totale dans l'art de vivre marocain.",
        "image": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
        "country": "Maroc", "capital": "Rabat (Marrakech est la 4e ville)",
        "tags": ["Culture", "Gastronomie", "Shopping", "Architecture"],
        "readTime": "5 min", "date": "2025-02-20",
        "bestSeason": "Mars à Mai / Sept à Nov", "currency": "Dirham (MAD)",
        "language": "Arabe / Français / Amazigh", "timezone": "UTC+1",
        "temperature": "18–38°C", "flightTime": "~3h30 depuis Paris",
        "likes": 71,
        "content": "Marrakech, surnommée 'la Ville Rouge' pour ses bâtiments en pisé ocre, est l'une des villes les plus envoûtantes du monde. La médina, classée UNESCO, est un labyrinthe vivant de ruelles où artisans, commerçants et vie quotidienne se mêlent dans une effervescence permanente.\n\nLa place Jemaa el-Fna est le cœur battant de Marrakech. Le matin, des vendeurs d'oranges pressées et des herboristes. L'après-midi, des musiciens gnawa et des conteurs. Le soir, une multitude de stands de restauration en plein air transforment la place en un festin à ciel ouvert. Ce spectacle quotidien est inscrit au patrimoine immatériel de l'UNESCO.\n\nLes palais et riads de Marrakech sont des havres de paix cachés derrière des façades austères. Le Palais de la Bahia, El Badi et les jardins Majorelle (créés par Yves Saint Laurent) sont incontournables. Les riads-hôtels offrent une immersion authentique dans l'architecture traditionnelle avec leurs patios ornés de zellige et leurs fontaines chuchotantes.\n\nLa gastronomie marrakchie est un enchantement : tagines parfumés au ras el hanout, couscous royal du vendredi, pastilla au pigeon croustillante, et les pâtisseries au miel et aux amandes. Les hammams traditionnels complètent cette expérience sensorielle totale.\n\nConseils pratiques : Les meilleures saisons sont le printemps (mars-mai) et l'automne (sept-nov). Évitez juillet-août (jusqu'à 45°C !). Négociez systématiquement dans les souks, c'est une tradition. Budget moyen : 80 à 200€/jour selon le standing."
    },
    {
        "id": "5", "slug": "phuket-paradis-tropical",
        "title": "Phuket : Le Joyau Tropical de la Thaïlande",
        "excerpt": "La plus grande île de Thaïlande conjugue plages de rêve, temples bouddhistes dorés, cuisine épicée et vie nocturne légendaire. Phuket est la quintessence de l'Asie du Sud-Est sous le soleil des tropiques.",
        "image": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
        "country": "Thaïlande", "capital": "Bangkok",
        "tags": ["Plage", "Culture", "Plongée", "Fête"],
        "readTime": "6 min", "date": "2025-03-05",
        "bestSeason": "Novembre à Avril", "currency": "Baht thaïlandais (THB)",
        "language": "Thaï", "timezone": "UTC+7",
        "temperature": "27–35°C", "flightTime": "~11h depuis Paris",
        "likes": 49,
        "content": "Phuket est la plus grande île de Thaïlande et l'une des destinations asiatiques les plus prisées. Sa situation géographique dans la mer d'Andaman lui confère des paysages spectaculaires : falaises calcaires karstiques qui plongent dans une mer émeraude, plages de sable blanc bordées de cocotiers, et villages de pêcheurs colorés.\n\nPatong Beach est le centre névralgique du tourisme à Phuket : hôtels en bord de mer, restaurants internationaux, et la célèbre Bangla Road qui s'anime chaque soir. Pour plus de tranquillité, Kata Beach et Kamala offrent une atmosphère plus relaxante, tandis que Surin est connue pour ses eaux claires et son atmosphère huppée.\n\nLes sites de plongée autour de Phuket sont parmi les plus réputés d'Asie. Les îles Similan, classées parmi les 10 meilleures destinations plongée au monde, et Ko Phi Phi, rendue célèbre par le film 'The Beach', sont accessibles en excursion depuis Phuket. Raies, requins de récif et tortues de mer accompagnent régulièrement les plongeurs.\n\nLa gastronomie thaïlandaise de Phuket est une explosion de saveurs : pad thaï authentique, curry vert au lait de coco, Tom Yum Goong (soupe épicée aux crevettes), et les fruits de mer grillés sur la plage au coucher du soleil. Un repas délicieux coûte moins de 5€ dans les marchés de nuit.\n\nConseils pratiques : La saison sèche (nov-avril) est idéale. Évitez mai-octobre (mousson). Louez un scooter (200 THB/jour ≈ 5€) pour explorer l'île. Prévoyez 50 à 150€/jour selon votre style de voyage."
    },
    {
        "id": "6", "slug": "cancun-caraibes-mexicaines",
        "title": "Cancún : Les Caraïbes Mexicaines en Toute Splendeur",
        "excerpt": "Eau turquoise, sable blanc immaculé, ruines mayas et une vie nocturne électrisante. Cancún est la porte d'entrée vers les merveilles de la péninsule du Yucatán et la Riviera Maya, accessible en vols directs depuis la France.",
        "image": "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=800&q=80",
        "country": "Mexique", "capital": "Mexico City",
        "tags": ["Plage", "Histoire", "Plongée", "All-inclusive"],
        "readTime": "6 min", "date": "2025-03-18",
        "bestSeason": "Décembre à Avril", "currency": "Peso mexicain (MXN)",
        "language": "Espagnol", "timezone": "UTC-5",
        "temperature": "25–34°C", "flightTime": "~11h depuis Paris",
        "likes": 35,
        "content": "Cancún, joyau des Caraïbes mexicaines, est une destination qui conjugue paradis balnéaire, richesse archéologique et diversité culturelle. Nichée sur la côte nord-est du Yucatán, la ville offre 25 km de plages de sable blanc baignées par la mer des Caraïbes d'un bleu turquoise incomparable.\n\nLa Zona Hotelera de Cancún est une île-barrière artificielle qui concentre les grands hôtels all-inclusive, les centres commerciaux et la vie nocturne avec des clubs comme Coco Bongo. Mais la vraie âme de Cancún se trouve dans El Centro, le centre-ville authentique, avec ses marchés locaux, restaurants de cuisine yucatèque et atmosphère mexicaine authentique.\n\nLa Riviera Maya, qui s'étend de Cancún à Tulum, est parsemée de trésors : les ruines mayas de Tulum perchées au-dessus de la mer, les cénotes (gouffres d'eau douce sacrés) de Cenote Dos Ojos et X'Caret, le parc naturel de Sian Ka'an inscrit à l'UNESCO. Playa del Carmen, à 45 minutes au sud, est une alternative plus bohème et authentique.\n\nLa plongée et le snorkeling dans la mer des Caraïbes offrent des expériences inoubliables : la réserve de biosphère de Sian Ka'an, le récif corallien de Mesoamerican Reef (2e plus grand au monde), et la Vallée des Cénotes avec ses galeries sous-marines habitées par des crocodiles et des raies.\n\nConseils pratiques : Air France opère des vols directs Paris-Cancún dès 400€ aller. La saison idéale est de décembre à avril. Les all-inclusive offrent le meilleur rapport qualité-prix (dès 80€/nuit tout compris). Évitez septembre-octobre (saison des ouragans)."
    },
    {
        "id": "7", "slug": "santorin-grece-couchers-soleil",
        "title": "Santorin : L'Île aux Couchers de Soleil Légendaires",
        "excerpt": "Maisons blanches aux dômes bleus, vins locaux réputés et plages de sable volcanique noir. Santorin est la carte postale vivante de la Méditerranée.",
        "image": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        "country": "Grèce", "capital": "Athènes",
        "tags": ["Romantique", "Luxe", "Gastronomie", "Architecture"],
        "readTime": "5 min", "date": "2025-04-05",
        "bestSeason": "Avril à Octobre", "currency": "Euro (EUR)",
        "language": "Grec", "timezone": "UTC+3",
        "temperature": "18–30°C", "flightTime": "~3h30 depuis Paris",
        "likes": 63,
        "content": "Santorin, née d'une éruption volcanique il y a 3 500 ans, offre une architecture en blanc et bleu accrochée aux falaises de la caldeira — l'une des images les plus iconiques du monde.\n\nOia est mondialement connue pour ses couchers de soleil. Chaque soir, des centaines de visiteurs se rassemblent sur la terrasse du château pour assister au spectacle de l'astre solaire plongeant dans la mer Égée dans une explosion d'oranges et de roses.\n\nLes plages sont uniques grâce au sable volcanique : la Plage Rouge (Kokkini Paralia), la Plage Noire (Perivolos) à l'obsidienne volcanique, et la Plage Blanche composent un triptyque chromatique exceptionnel.\n\nLa gastronomie santorinoise est exceptionnelle : vin Assyrtiko produit sur des vignes pluricentenaires, tomate cerise volcanique et fava de Santorin. Conseils : réservez 6 mois à l'avance. Vols Paris-Santorin dès 100€ AR en basse saison."
    },
    {
        "id": "8", "slug": "dubai-oasis-luxe-desert",
        "title": "Dubaï : L'Oasis de Luxe au Cœur du Désert Arabe",
        "excerpt": "Gratte-ciels records, plages du Golfe Persique, shopping de luxe et gastronomie internationale. Dubaï redéfinit les frontières du possible à chaque construction.",
        "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
        "country": "Émirats Arabes Unis", "capital": "Abou Dabi",
        "tags": ["Luxe", "Shopping", "Architecture", "Famille"],
        "readTime": "6 min", "date": "2025-04-20",
        "bestSeason": "Novembre à Mars", "currency": "Dirham (AED)",
        "language": "Arabe / Anglais", "timezone": "UTC+4",
        "temperature": "18–40°C", "flightTime": "~7h depuis Paris",
        "likes": 58,
        "content": "Dubaï, sortie du désert en moins de 50 ans, regroupe le plus haut gratte-ciel du monde (Burj Khalifa, 828m), les îles artificielles en forme de palmier, et un système de transport ultramoderne.\n\nLe Burj Khalifa offre une vue vertigineuse depuis l'observatoire At the Top au 124e étage. À ses pieds, la fontaine de Dubaï projette ses jets à 150 mètres de haut chaque soir en musique.\n\nLes plages du Golfe Persique (eau à 28-30°C) et le shopping Tax-Free au Dubai Mall (1 200 boutiques, le plus grand centre commercial au monde) en font une destination idéale. La piste de ski intérieure du Mall of the Emirates est une attraction unique en son genre.\n\nConseils pratiques : Vols Paris-Dubaï dès 250€ AR avec Emirates ou Air France. Meilleure saison : novembre à mars (20-28°C). Respectez les codes vestimentaires dans les lieux publics. Budget : 100 à 500€/jour selon standing."
    },
    {
        "id": "9", "slug": "la-reunion-ile-intense",
        "title": "La Réunion : L'Île Intense au Cœur de l'Océan Indien",
        "excerpt": "Volcans actifs, cirques majestueux, lagons turquoise et culture créole authentique. La Réunion conjugue aventure et soleil sans quitter le territoire français.",
        "image": "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?auto=format&fit=crop&w=800&q=80",
        "country": "France (DOM)", "capital": "Saint-Denis",
        "tags": ["Randonnée", "Nature", "Plage", "Famille"],
        "readTime": "6 min", "date": "2025-05-08",
        "bestSeason": "Avril à Novembre", "currency": "Euro (EUR)",
        "language": "Français / Créole", "timezone": "UTC+4",
        "temperature": "22–30°C", "flightTime": "~10h depuis Paris",
        "likes": 44,
        "content": "La Réunion, île volcanique de 2 512 km² dans l'Océan Indien, est l'une des destinations les plus spectaculaires de la planète — volcans actifs, cirques UNESCO et lagons turquoise dans la même journée.\n\nLe Piton de la Fournaise, l'un des volcans les plus actifs au monde, permet d'observer des coulées de lave en fusion lors des phases calmes — une expérience unique et inoubliable que peu de destinations au monde peuvent offrir.\n\nLes trois cirques (Cilaos, Salazie, Mafate) sont des caldeiras géantes habitées par des populations sans routes, véritables trésors de biodiversité. Le Grand Raid (165 km à travers l'île) est considéré parmi les courses de trail les plus difficiles au monde.\n\nConseils pratiques : Vols Paris-Saint-Denis dès 350€ avec Air Austral ou Corsair. Pas de visa nécessaire (DOM français). Louez une voiture sur place. Évitez janvier-mars (cyclones). La gastronomie créole (carry boucané, rougail saucisses) est un voyage en soi."
    }
]


# ── Startup seeding ──────────────────────────────────────────────────────────

@app.on_event("startup")
async def seed_database():
    # Upsert each post so new articles are added without wiping existing likes/comments
    for post in BLOG_POSTS:
        existing = await db.blog_posts.find_one({"id": post["id"]})
        if not existing:
            await db.blog_posts.insert_one(dict(post))
    logger.info("Blog posts upsert complete")


# ── Routes ───────────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Vrax Voyage API"}


@api_router.get("/blog/posts")
async def get_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(100)
    return posts


@api_router.get("/blog/posts/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Article introuvable")
    return post


@api_router.post("/blog/posts/{post_id}/like")
async def like_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Article introuvable")
    new_likes = post.get("likes", 0) + 1
    await db.blog_posts.update_one({"id": post_id}, {"$set": {"likes": new_likes}})
    return {"likes": new_likes}


@api_router.get("/blog/posts/{post_id}/comments")
async def get_comments(post_id: str):
    comments = await db.comments.find({"post_id": post_id}, {"_id": 0}).to_list(100)
    return comments


@api_router.post("/blog/posts/{post_id}/comments")
async def add_comment(post_id: str, comment_data: CommentCreate):
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Article introuvable")
    comment = Comment(post_id=post_id, **comment_data.model_dump())
    doc = comment.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.comments.insert_one(doc)
    doc.pop('_id', None)
    return {**doc, "created_at": doc['created_at']}


@api_router.post("/contact")
async def send_contact(contact_data: ContactCreate):
    msg = ContactMessage(**contact_data.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return {"message": "Votre message a bien été envoyé ! Nous vous répondrons dans les 24h."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
