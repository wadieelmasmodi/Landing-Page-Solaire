# 🌞 Landing Page Solaire

**Landing page moderne pour la collecte de leads solaires**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## 📋 Aperçu

Cette landing page permet de collecter les informations des clients intéressés par une installation solaire :
- Informations personnelles (nom, prénom, email, téléphone)
- Facture mensuelle d'électricité
- Coordonnées GPS de la toiture via carte interactive

Les données sont envoyées automatiquement via webhook à n8n pour traitement.

## 🚀 Démarrage Rapide

### Option 1 : Déploiement sur Coolify (Recommandé)

1. **Créer le repository GitHub** → Voir `GITHUB_SETUP.md`
2. **Déployer sur Coolify** → Voir `DEPLOY.md`

### Option 2 : Développement Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez http://localhost:3000

## 📚 Documentation

- **[GITHUB_SETUP.md](GITHUB_SETUP.md)** - Comment créer le repository sur GitHub
- **[DEPLOY.md](DEPLOY.md)** - Guide de déploiement Coolify complet
- **[SUMMARY.md](SUMMARY.md)** - Résumé détaillé du projet
- **[MIGRATION.md](MIGRATION.md)** - Historique de migration du projet

## 🎨 Fonctionnalités

- ✅ Interface moderne et responsive
- ✅ Formulaire avec validation
- ✅ Carte interactive Leaflet pour sélection GPS
- ✅ Intégration webhook n8n
- ✅ Design shadcn/ui
- ✅ Optimisé pour production (Docker)

## 🛠️ Technologies

- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Carte** : React Leaflet
- **Déploiement** : Docker + Coolify

## 📦 Structure

```
Landing-Page-Solaire/
├── app/              # Pages Next.js
├── components/       # Composants React
├── lib/              # Utilitaires
├── Dockerfile        # Configuration Docker
└── *.md              # Documentation
```

## 🔗 Webhook n8n

URL : `https://n8n.energum.earth/webhook/dfb660da-1480-40a5-bbdc-7579e6772fe1`

Format JSON envoyé :
```json
{
  "nom": "string",
  "prenom": "string",
  "email": "string",
  "telephone": "string",
  "facture_mensuelle_electricite": "string",
  "coordonnees_gps": {
    "latitude": number,
    "longitude": number
  },
  "date_soumission": "ISO 8601 timestamp"
}
```

## 📄 Licence

Projet privé - Tous droits réservés

---

**Prêt à déployer ! 🚀** Suivez `GITHUB_SETUP.md` puis `DEPLOY.md`
