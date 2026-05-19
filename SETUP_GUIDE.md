# 🚀 Guide de Configuration Rapide

## Étape 1 : Obtenir votre clé API OpenRouter

1. **Allez sur** : https://openrouter.ai/
2. **Cliquez sur** "Sign In" ou "Get Started"
3. **Créez un compte** (gratuit) avec votre email
4. **Une fois connecté**, cliquez sur votre profil en haut à droite
5. **Allez dans** "Keys" ou "API Keys"
6. **Cliquez sur** "Create Key" ou "New Key"
7. **Copiez la clé** qui commence par `sk-or-v1-...`

## Étape 2 : Configurer le fichier .env

1. **Ouvrez le fichier** `.env` dans le dossier Shopassist
2. **Remplacez** la ligne :
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   **Par** (avec votre vraie clé) :
   ```
   OPENROUTER_API_KEY=sk-or-v1-abc123def456...
   ```

3. **Sauvegardez** le fichier

## Étape 3 : Démarrer le serveur

Dans le terminal, dans le dossier Shopassist :

```bash
npm start
```

## ✅ Vérification

Si tout fonctionne, vous verrez :
```
📂 Loading .env from: C:\Users\Souli\Desktop\Shopassist\.env
✅ .env file loaded successfully
🔍 DEBUG - Environment variables:
   PORT: 3000
   OPENROUTER_API_KEY: sk-or-v1-...
🚀 High Tech Chat Widget server running on http://localhost:3000
🤖 Using model: anthropic/claude-sonnet-4-5
```

Puis ouvrez http://localhost:3000 dans votre navigateur !

## ❌ Si vous voyez une erreur

**Erreur : "OPENROUTER_API_KEY is not set"**
- Vérifiez que vous avez bien sauvegardé le fichier .env
- Vérifiez qu'il n'y a pas d'espaces avant ou après le =
- Redémarrez le serveur après avoir modifié .env

**Erreur : "address already in use"**
- Le port 3000 est déjà utilisé
- Changez PORT=3000 en PORT=3001 dans le .env
- Ou arrêtez l'autre application qui utilise le port 3000

## 💰 Crédits OpenRouter

OpenRouter offre des crédits gratuits pour tester. Vous pouvez :
- Ajouter des crédits sur https://openrouter.ai/credits
- Voir votre utilisation sur le dashboard
