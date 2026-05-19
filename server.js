const dotenv = require('dotenv');
const path = require('path');

// Load .env file with explicit path
const envPath = path.join(__dirname, '.env');
console.log('📂 Loading .env from:', envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
}

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// OpenRouter configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'anthropic/claude-sonnet-4-5';

// Debug: Show what was loaded
console.log('🔍 DEBUG - Environment variables:');
console.log('   PORT:', process.env.PORT);
console.log('   OPENROUTER_API_KEY:', OPENROUTER_API_KEY ? `${OPENROUTER_API_KEY.substring(0, 10)}...` : 'NOT SET');
console.log('   Full key value:', OPENROUTER_API_KEY);

// Verify API key is loaded
if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
  console.error('❌ ERROR: OPENROUTER_API_KEY is not set in .env file');
  console.error('Please add your OpenRouter API key to the .env file');
  console.error('Get your key at: https://openrouter.ai/keys');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Product catalog for Nexvya Store
const products = [
  { name: "Autoradio CarPlay", price: 409, category: "Auto", description: "Autoradio avec Apple CarPlay intégré" },
  { name: "Bandeau Audio Bluetooth", price: 49, category: "Audio", description: "Bandeau audio confortable avec Bluetooth" },
  { name: "Bracelet Smart LED", price: 49, category: "Wearable", description: "Bracelet intelligent avec LED" },
  { name: "Câble Chargeur RGB 66W", price: 29, category: "Accessoires", description: "Câble de charge rapide 66W avec éclairage RGB" },
  { name: "Caméra PTZ 4K", price: 89, category: "Sécurité", description: "Caméra de surveillance 4K avec rotation PTZ" },
  { name: "Chargeur Sans Fil Multifonction", price: 129, category: "Accessoires", description: "Station de charge sans fil multifonction" },
  { name: "COLMI R09 montre", price: 279, category: "Wearable", description: "Montre connectée COLMI R09" },
  { name: "Écouteurs UYUXIO", price: 139, category: "Audio", description: "Écouteurs sans fil UYUXIO haute qualité" },
  { name: "Haut-parleur Bluetooth", price: 169, category: "Audio", description: "Haut-parleur Bluetooth puissant" },
  { name: "Humidificateur Mini USB", price: 29, category: "Maison", description: "Humidificateur d'air compact USB" },
  { name: "Kayrox Pro montre", price: 119, category: "Wearable", description: "Montre connectée Kayrox Pro" },
  { name: "Lumière LED détection", price: 109, category: "Maison", description: "Lumière LED avec détection de mouvement" },
  { name: "Lunettes AI 4K Lenovo", price: 209, category: "Wearable", description: "Lunettes intelligentes AI 4K de Lenovo" },
  { name: "Microphone Gaming FIFINE", price: 539, category: "Gaming", description: "Microphone professionnel pour gaming FIFINE" },
  { name: "PHONEPACE Haut-parleur LED", price: 59, category: "Audio", description: "Haut-parleur avec éclairage LED PHONEPACE" },
  { name: "Projecteur Mini Portable", price: 99, category: "Multimédia", description: "Mini projecteur portable" },
  { name: "QCY H3S écouteurs", price: 409, category: "Audio", description: "Écouteurs premium QCY H3S" },
  { name: "Ruban LED RGB", price: 49, category: "Maison", description: "Ruban LED RGB personnalisable" },
  { name: "Serrure Intelligente MOES", price: 999, category: "Sécurité", description: "Serrure connectée intelligente MOES" },
  { name: "Station de Charge 3-en-1", price: 99, category: "Accessoires", description: "Station de charge 3-en-1 pour tous vos appareils" }
];

// System prompt for the AI assistant
const systemPrompt = `Tu es ShopMate, l'assistant virtuel de Nexvya Store. Tu es expert en produits high-tech et tu aides les clients de manière amicale et professionnelle.

CATALOGUE DE PRODUITS:
${products.map(p => `- ${p.name}: ${p.price}€ (${p.description})`).join('\n')}

TES RESPONSABILITÉS:
1. Recommander des produits adaptés aux besoins des clients
2. Répondre aux questions sur les produits (caractéristiques, prix, disponibilité)
3. Fournir des informations sur le SAV (Service Après-Vente)
4. Informer sur les délais et conditions de livraison

INFORMATIONS IMPORTANTES:
- Livraison: Livraison gratuite pour les commandes de plus de 50€. Délai standard: 3-5 jours ouvrés en France métropolitaine.
- Livraison express disponible (24-48h) pour 9,90€ supplémentaires.
- SAV: Garantie de 2 ans sur tous les produits. Retour gratuit sous 30 jours.
- Paiement: Carte bancaire, PayPal, paiement en 3x sans frais à partir de 100€.

STYLE DE COMMUNICATION:
- Réponds toujours en français
- Sois amical, professionnel et concis
- Utilise des emojis occasionnellement pour rendre la conversation plus chaleureuse
- Pose des questions pour mieux comprendre les besoins du client
- Si un produit n'est pas dans le catalogue, propose des alternatives similaires

Si le client demande quelque chose qui n'est pas lié aux produits ou services de la boutique, réponds poliment que tu es ShopMate, spécialisé dans l'assistance pour Nexvya Store.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Format messages for OpenRouter (OpenAI-compatible format)
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Call OpenRouter API
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.get('origin') || req.get('referer') || 'https://shopassist.app',
        'X-Title': 'Nexvya Store - ShopMate'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    // Extract the assistant's response
    const assistantMessage = data.choices[0].message.content;

    res.json({
      message: assistantMessage,
      usage: data.usage
    });

  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    res.status(500).json({ 
      error: 'Une erreur est survenue. Veuillez réessayer.',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve the widget
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Nexvya Store - ShopMate server running on port ${PORT}`);
  console.log(`📝 Make sure to set your OPENROUTER_API_KEY in the .env file`);
  console.log(`🤖 Using model: ${MODEL}`);
});
