# 🛍️ Intégration ShopMate.ia sur Shopify

Guide complet pour intégrer le widget de chat ShopMate.ia sur votre boutique Shopify Nexvya Store.

## 📋 Prérequis

- Accès administrateur à votre boutique Shopify
- URL de production Railway : `https://shopmateia-production.up.railway.app`
- Thème Shopify actif

## 🚀 Méthode 1 : Intégration via le thème (Recommandée)

### Étape 1 : Accéder à l'éditeur de thème

1. Connectez-vous à votre **Admin Shopify**
2. Allez dans **Boutique en ligne** → **Thèmes**
3. Cliquez sur **Actions** → **Modifier le code** sur votre thème actif

### Étape 2 : Modifier le fichier theme.liquid

1. Dans la barre latérale gauche, cherchez **Layout** → **theme.liquid**
2. Faites défiler jusqu'à trouver la balise `</body>` (vers la fin du fichier)
3. **Juste avant** `</body>`, ajoutez ce code :

```html
<!-- ShopMate.ia Chat Widget -->
<div id="chat-widget-container"></div>
<link rel="stylesheet" href="https://shopmateia-production.up.railway.app/styles.css">
<script src="https://shopmateia-production.up.railway.app/chat.js"></script>
<!-- Fin ShopMate.ia -->
```

4. Cliquez sur **Enregistrer** en haut à droite

### Étape 3 : Vérifier l'intégration

1. Visitez votre boutique Shopify
2. Vous devriez voir le bouton **"ShopMate.ia est à ton écoute 💬"** en bas à droite
3. Cliquez dessus pour tester le chat

## 🎨 Méthode 2 : Intégration via un snippet (Plus propre)

### Étape 1 : Créer un snippet

1. Dans l'éditeur de code, allez dans **Snippets**
2. Cliquez sur **Ajouter un nouveau snippet**
3. Nommez-le : `shopmate-widget`
4. Collez ce code :

```liquid
{% comment %}
  ShopMate.ia - Widget de chat IA
  URL: https://shopmateia-production.up.railway.app
{% endcomment %}

<div id="chat-widget-container"></div>
<link rel="stylesheet" href="https://shopmateia-production.up.railway.app/styles.css">
<script src="https://shopmateia-production.up.railway.app/chat.js"></script>

<style>
  /* Ajustements optionnels pour Shopify */
  #chat-widget {
    z-index: 9999 !important;
  }
</style>
```

5. Cliquez sur **Enregistrer**

### Étape 2 : Inclure le snippet dans theme.liquid

1. Ouvrez **Layout** → **theme.liquid**
2. Juste avant `</body>`, ajoutez :

```liquid
{% render 'shopmate-widget' %}
```

3. **Enregistrer**

## ⚙️ Configuration avancée

### Personnaliser l'apparence

Si vous voulez ajuster la position ou le style du widget, ajoutez ce CSS dans votre thème :

```css
/* Dans Assets → theme.css ou theme.scss.liquid */

/* Ajuster la position du bouton */
#chat-widget {
  bottom: 20px !important;
  right: 20px !important;
}

/* Cacher sur mobile si nécessaire */
@media (max-width: 768px) {
  #chat-widget {
    bottom: 10px !important;
    right: 10px !important;
  }
}
```

### Afficher uniquement sur certaines pages

Pour afficher le widget uniquement sur certaines pages, modifiez le snippet :

```liquid
{% comment %} Afficher uniquement sur la page d'accueil {% endcomment %}
{% if template == 'index' %}
  <div id="chat-widget-container"></div>
  <link rel="stylesheet" href="https://shopmateia-production.up.railway.app/styles.css">
  <script src="https://shopmateia-production.up.railway.app/chat.js"></script>
{% endif %}

{% comment %} Ou sur toutes les pages sauf le checkout {% endcomment %}
{% unless template contains 'checkout' %}
  <div id="chat-widget-container"></div>
  <link rel="stylesheet" href="https://shopmateia-production.up.railway.app/styles.css">
  <script src="https://shopmateia-production.up.railway.app/chat.js"></script>
{% endunless %}
```

## 🔧 Méthode 3 : Via l'éditeur de thème visuel (Sans code)

### Pour les thèmes compatibles (Dawn, etc.)

1. Allez dans **Boutique en ligne** → **Thèmes**
2. Cliquez sur **Personnaliser** sur votre thème actif
3. En bas à gauche, cliquez sur **Ajouter une section**
4. Choisissez **HTML personnalisé** ou **Liquid personnalisé**
5. Collez le code d'intégration
6. **Enregistrer**

## ✅ Vérification et tests

### Checklist de vérification :

- [ ] Le bouton de chat apparaît en bas à droite
- [ ] Le bouton affiche "ShopMate.ia est à ton écoute 💬"
- [ ] En cliquant, la fenêtre de chat s'ouvre
- [ ] Le message d'accueil s'affiche : "Bienvenue chez Nexvya Store ! 👋"
- [ ] Vous pouvez poser une question et recevoir une réponse
- [ ] Le widget est responsive (fonctionne sur mobile)

### Tests recommandés :

1. **Test sur desktop** : Vérifiez l'apparence et le fonctionnement
2. **Test sur mobile** : Assurez-vous que le widget s'adapte bien
3. **Test de conversation** : Posez des questions sur vos produits
4. **Test de performance** : Vérifiez que le site charge normalement

## 🐛 Dépannage

### Le widget n'apparaît pas

1. **Vérifiez le cache** : Videz le cache de votre navigateur (Ctrl+F5)
2. **Vérifiez l'URL** : Assurez-vous que `shopmateia-production.up.railway.app` est accessible
3. **Vérifiez la console** : Ouvrez les outils de développement (F12) et cherchez des erreurs

### Le widget apparaît mais ne répond pas

1. **Vérifiez Railway** : Assurez-vous que l'application est bien déployée
2. **Vérifiez la clé API** : La variable `OPENROUTER_API_KEY` doit être configurée sur Railway
3. **Vérifiez les logs** : Consultez les logs Railway pour voir les erreurs

### Conflit avec d'autres widgets

Si vous avez d'autres widgets de chat (Tidio, Crisp, etc.), vous pouvez :

1. **Ajuster le z-index** dans le CSS
2. **Désactiver les autres widgets** temporairement
3. **Positionner différemment** le widget ShopMate.ia

## 📊 Suivi et analytics

### Ajouter Google Analytics (optionnel)

Pour suivre les interactions avec le chat, vous pouvez ajouter des événements :

```javascript
<script>
  // Après le chargement du widget
  document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
      chatButton.addEventListener('click', function() {
        // Google Analytics 4
        gtag('event', 'chat_opened', {
          'event_category': 'ShopMate',
          'event_label': 'Chat Widget'
        });
      });
    }
  });
</script>
```

## 🔄 Mises à jour

Lorsque vous mettez à jour ShopMate.ia sur Railway :

1. Les changements sont **automatiques** (pas besoin de modifier Shopify)
2. Les utilisateurs verront la nouvelle version au prochain chargement de page
3. Pensez à vider le cache si nécessaire

## 📞 Support

Si vous rencontrez des problèmes :

1. Vérifiez ce guide
2. Consultez les logs Railway
3. Testez l'URL directement : https://shopmateia-production.up.railway.app

---

**Dernière mise à jour** : 21/05/2026  
**Version** : 1.0.0  
**Status** : ✅ Production Ready
