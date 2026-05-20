# 🤖 Nexvya Store - Widget de Chat IA

Widget de chat intelligent pour la boutique Shopify "Nexvya Store" utilisant Claude via OpenRouter. Le bot connaît tous les produits de la boutique et peut répondre aux questions sur les produits, le SAV et la livraison en français.

## 🎯 Fonctionnalités

- **Assistant IA intelligent** : Utilise Claude Sonnet 4.5 (anthropic/claude-sonnet-4-5) via OpenRouter pour des réponses naturelles
- **Connaissance produits** : Connaît les 20 produits de la boutique Nexvya Store avec prix et descriptions
- **Support client complet** : Répond aux questions sur :
  - Recommandations de produits
  - Caractéristiques et prix
  - Service Après-Vente (garantie 2 ans, retour 30 jours)
  - Livraison (gratuite >50€, délais 3-5 jours)
  - Paiement (CB, PayPal, 3x sans frais)
- **Interface moderne** : Widget en bas à droite, design responsive
- **Conversation fluide** : Historique de conversation maintenu

## 📦 Produits du Catalogue

| Produit | Prix |
|---------|------|
| Autoradio CarPlay | 409€ |
| Bandeau Audio Bluetooth | 49€ |
| Bracelet Smart LED | 49€ |
| Câble Chargeur RGB 66W | 29€ |
| Caméra PTZ 4K | 89€ |
| Chargeur Sans Fil Multifonction | 129€ |
| COLMI R09 montre | 279€ |
| Écouteurs UYUXIO | 139€ |
| Haut-parleur Bluetooth | 169€ |
| Humidificateur Mini USB | 29€ |
| Kayrox Pro montre | 119€ |
| Lumière LED détection | 109€ |
| Lunettes AI 4K Lenovo | 209€ |
| Microphone Gaming FIFINE | 539€ |
| PHONEPACE Haut-parleur LED | 59€ |
| Projecteur Mini Portable | 99€ |
| QCY H3S écouteurs | 409€ |
| Ruban LED RGB | 49€ |
| Serrure Intelligente MOES | 999€ |
| Station de Charge 3-en-1 | 99€ |

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Clé API OpenRouter

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet :
   ```bash
   cp .env.example .env
   ```
   
   Éditez le fichier `.env` et ajoutez votre clé API OpenRouter :
   ```env
   OPENROUTER_API_KEY=votre_clé_api_openrouter
   PORT=3000
   ```

3. **Obtenir une clé API OpenRouter**
   - Rendez-vous sur [openrouter.ai](https://openrouter.ai/)
   - Créez un compte ou connectez-vous
   - Allez dans "Keys" pour générer une nouvelle clé API
   - Copiez la clé dans votre fichier `.env`
   - OpenRouter vous permet d'utiliser Claude et d'autres modèles avec une seule API

4. **Démarrer le serveur**
   ```bash
   npm start
   ```

5. **Ouvrir dans le navigateur**
   ```
   https://shopmateia-production.up.railway.app
   ```

## 📁 Structure du Projet

```
Shopassist/
├── server.js              # Serveur Express + API Anthropic
├── package.json           # Dépendances du projet
├── .env.example          # Template des variables d'environnement
├── .env                  # Variables d'environnement (à créer)
├── .gitignore           # Fichiers à ignorer par Git
├── README.md            # Documentation
└── public/              # Fichiers statiques
    ├── index.html       # Page HTML du widget
    ├── styles.css       # Styles CSS
    └── chat.js          # Logique JavaScript du chat
```

## 🔧 Configuration

### Personnalisation du Bot

Pour modifier le comportement du bot, éditez le `systemPrompt` dans `server.js`.

### Ajouter/Modifier des Produits

Modifiez le tableau `products` dans `server.js`.

## 🎨 Intégration Shopify

Pour intégrer ce widget sur votre boutique Shopify, ajoutez dans votre thème avant `</body>` :

```html
<div id="chat-widget-container"></div>
<link rel="stylesheet" href="https://votre-serveur.com/styles.css">
<script src="https://votre-serveur.com/chat.js"></script>
```

## 🛠️ API Endpoints

### POST `/api/chat`
Envoie un message au bot et reçoit une réponse.

### GET `/api/health`
Vérifie l'état du serveur.

## 🎯 Exemples d'Utilisation

- "Je cherche des écouteurs sans fil"
- "Quel est le prix de la serrure intelligente ?"
- "Quels sont les délais de livraison ?"
- "Comment fonctionne le SAV ?"
- "Recommande-moi un cadeau pour un gamer"

## 🔒 Sécurité

- ⚠️ **Ne commitez JAMAIS votre fichier `.env`** avec votre clé API
- Configurez CORS correctement en production
- Ajoutez un rate limiting pour éviter les abus

## 💡 Pourquoi OpenRouter ?

OpenRouter offre plusieurs avantages :
- **Accès unifié** : Une seule API pour accéder à Claude et d'autres modèles IA
- **Tarification flexible** : Payez uniquement ce que vous utilisez
- **Pas de SDK requis** : Utilise l'API REST standard compatible OpenAI
- **Facilité de changement** : Changez de modèle facilement en modifiant une variable

---

Créé avec ❤️ pour Nexvya Store


