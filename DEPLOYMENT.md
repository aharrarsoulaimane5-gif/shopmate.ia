# 🚀 Déploiement ShopMate.ia

## 📍 URL de Production

**URL publique Railway :** https://shopmateia-production.up.railway.app

## ✅ Configuration Production

### Variables d'environnement Railway
Assurez-vous que ces variables sont configurées dans Railway :

```
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=(automatiquement assigné par Railway)
```

### Déploiement automatique
- Le déploiement se fait automatiquement via GitHub
- Chaque push sur la branche principale déclenche un nouveau déploiement
- Railway détecte automatiquement Node.js et installe les dépendances

## 🔧 Commandes utiles

### Déployer manuellement
```bash
git add .
git commit -m "Update ShopMate.ia"
git push origin main
```

### Tester en local
```bash
npm start
# Serveur sur http://localhost:3001
```

## 📝 Checklist avant déploiement

- [x] Pas de références localhost dans le code
- [x] URLs relatives dans chat.js
- [x] HTTP-Referer dynamique dans server.js
- [x] Variables d'environnement configurées sur Railway
- [x] Branding ShopMate.ia complet
- [x] Design minimaliste et moderne

## 🎯 Fonctionnalités

- ✅ Chat IA avec Claude Sonnet 4.5 via OpenRouter
- ✅ Connaissance de 20 produits Nexvya Store
- ✅ Réponses en français
- ✅ Informations SAV et livraison
- ✅ Design responsive (mobile + desktop)
- ✅ Message d'accueil personnalisé ShopMate.ia

## 🔗 Intégration Shopify

Pour intégrer le widget sur votre boutique Shopify, ajoutez ce code dans votre thème avant `</body>` :

```html
<script src="https://shopmateia-production.up.railway.app/chat.js"></script>
<link rel="stylesheet" href="https://shopmateia-production.up.railway.app/styles.css">
```

---

**Dernière mise à jour :** 19/05/2026
**Version :** 1.0.0
**Status :** ✅ En production
