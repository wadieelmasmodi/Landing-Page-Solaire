# 🚀 Instructions de Déploiement GitHub

## Étape 1 : Créer le Repository sur GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `Landing-Page-Solaire`
   - **Description** : `Landing page moderne pour collecte de leads solaires`
   - **Visibility** : Private (ou Public selon votre préférence)
   - ❌ **Ne cochez PAS** "Add a README file"
   - ❌ **Ne cochez PAS** "Add .gitignore"
   - ❌ **Ne cochez PAS** "Choose a license"
4. Cliquez sur **"Create repository"**

## Étape 2 : Pousser le Code vers GitHub

Une fois le repository créé, exécutez ces commandes dans votre terminal :

```bash
cd "c:\Users\wadie\GitHub Repo\Landing-Page-Solaire"

# Configurer le remote
git remote add origin https://github.com/wadieelmasmodi/Landing-Page-Solaire.git

# Renommer la branche en 'main' si nécessaire
git branch -M main

# Pousser le code
git push -u origin main
```

## Étape 3 : Vérifier

Rafraîchissez la page GitHub de votre repository. Vous devriez voir tous les fichiers !

## Ensuite : Déployer sur Coolify

Suivez les instructions dans **DEPLOY.md** pour déployer sur Coolify.

---

**Fait ! ✅** Le repository est maintenant sur GitHub et prêt pour Coolify.
