# TP Git/GitHub/CI - Gestion de tâches

**Auteur :** [Ton Nom Prénom]

![CI Status](https://github.com/TON_USERNAME/gitcidevA/actions/workflows/ci.yml/badge.svg)

## Description

Application simple de gestion de tâches en JavaScript avec tests automatisés via Jest et intégration continue via GitHub Actions.

## Installation

```bash
npm install
```

## Exécution des tests

```bash
npm test
```

## Fonctionnalités implémentées

- `addTask(name)` : Ajoute une nouvelle tâche avec validation du nom
- `toggleTask(id)` : Bascule le statut done d'une tâche
- `countDone()` : Retourne le nombre de tâches terminées

---

## Toutes les commandes Git utilisées dans ce TP

### Commandes de base

- `git status` : Voir l'état actuel du dépôt (fichiers modifiés, branche actuelle)
- `git branch` : Lister toutes les branches locales
- `git add .` : Ajouter tous les fichiers modifiés à la zone de staging
- `git commit -m "message"` : Créer un commit avec un message décrivant les changements

### Gestion des branches

- `git checkout main` : Se déplacer sur la branche main
- `git checkout -b feature/nom` : Créer une nouvelle branche ET se déplacer dessus
- `git checkout HEAD~1` : Revenir au commit précédent (utilisé pour créer le conflit)

### Synchronisation avec GitHub

- `git push origin main` : Envoyer les commits de la branche main vers GitHub
- `git push origin feature/nom` : Envoyer une branche de fonctionnalité vers GitHub
- `git pull origin main` : Récupérer et fusionner les derniers changements de main depuis GitHub

### Résolution de conflit

- `git pull origin main` : Déclenche la détection du conflit en essayant de fusionner
- `git add lib\tasks.js` : Marquer le fichier comme résolu après avoir édité manuellement
- `git commit -m "fix: résolution conflit"` : Finaliser la résolution du conflit

---

## Workflow Git appliqué dans ce projet

### 1. Créer une branche pour une nouvelle fonctionnalité

```bash
git checkout -b feature/ma-fonctionnalite
```

**Pourquoi :** Pour travailler sur une fonctionnalité sans toucher à main.

### 2. Développer et tester

```bash
npm test
```

**Pourquoi :** S'assurer que le code fonctionne avant de commiter.

### 3. Commiter les changements

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
```

**Pourquoi :** Sauvegarder une version du code avec un message clair.

### 4. Pousser la branche sur GitHub

```bash
git push origin feature/ma-fonctionnalite
```

**Pourquoi :** Envoyer la branche sur GitHub pour créer une Pull Request.

### 5. Créer une Pull Request sur GitHub

- Aller sur GitHub
- Cliquer sur "Compare & pull request"
- Cliquer sur "Create pull request"

**Pourquoi :** Demander la fusion de la branche dans main après revue.

### 6. Merger la Pull Request

- Attendre que la CI passe
- Cliquer sur "Merge pull request"
- Cliquer sur "Confirm merge"
- Cliquer sur "Delete branch"

**Pourquoi :** Intégrer les changements dans main et nettoyer la branche.

### 7. Mettre à jour main en local

```bash
git checkout main
git pull origin main
```

**Pourquoi :** Récupérer les changements mergés depuis GitHub.

---

## Comment on a créé le conflit

### Étape 1 : Merger la première version de countDone

On a créé feature/count-done-v1 avec une implémentation utilisant filter(), puis on l'a mergée dans main.

### Étape 2 : Créer une branche à partir d'un ancien commit

```bash
git checkout HEAD~1
git checkout -b feature/count-done-v2
```

**Pourquoi :** Pour repartir d'un état AVANT le merge, créant ainsi un conflit.

### Étape 3 : Implémenter différemment

On a écrit countDone() avec une boucle for au lieu de filter().

### Étape 4 : Pousser et créer une PR

```bash
git push origin feature/count-done-v2
```

**Résultat :** GitHub détecte un conflit car les deux branches modifient la même fonction différemment.

### Étape 5 : Résoudre le conflit

```bash
git pull origin main
# Éditer lib\tasks.js manuellement pour supprimer les marqueurs de conflit
git add lib\tasks.js
git commit -m "fix: résolution du conflit sur countDone"
git push origin feature/count-done-v2
```

---

## Différences entre commandes Git

### switch vs checkout

- `git switch ma-branche` : Commande moderne pour changer de branche uniquement
- `git checkout ma-branche` : Commande ancienne qui peut aussi restaurer des fichiers

**Dans ce projet :** On a utilisé checkout car c'est plus polyvalent.

### pull vs fetch

- `git fetch` : Télécharge les commits depuis GitHub SANS les fusionner
- `git pull` : Télécharge ET fusionne automatiquement (fetch + merge)

**Dans ce projet :** On a utilisé pull pour gagner du temps.

### rebase vs revert

- `git rebase` : Réécrit l'historique en déplaçant des commits sur une nouvelle base
- `git revert` : Crée un nouveau commit qui annule un ancien commit

**Dans ce projet :** On n'a utilisé ni l'un ni l'autre.

---

## Commandes Git utiles non utilisées dans ce projet

### tag

Crée un marqueur permanent pour une version du projet.

```bash
git tag v1.0.0
git push origin v1.0.0
```

**Utilité :** Marquer les versions stables (releases).

### stash

Sauvegarde temporairement les modifications non commitées.

```bash
git stash           # Sauvegarder
git stash pop       # Restaurer
```

**Utilité :** Changer de branche sans perdre son travail en cours.

### release

Sur GitHub, une release est une version packagée du projet.

**Comment créer une release :**

1. Aller dans l'onglet "Releases" sur GitHub
2. Cliquer sur "Create a new release"
3. Choisir un tag (exemple : v1.0.0)
4. Rédiger les notes de version
5. Publier

**Utilité :** Fournir une version téléchargeable du projet avec documentation.

---

## Structure du projet

```
gitcidevA/
├── .github/
│   └── workflows/
│       └── ci.yml          # Configuration GitHub Actions
├── lib/
│   └── tasks.js            # Code source
├── test/
│   └── tasks.test.js       # Tests Jest
├── package.json            # Dépendances et scripts
├── README.md               # Ce fichier
└── EVALUATION.md           # Rapport d'évaluation
```

---

## Règles appliquées

1. Aucun push direct sur main
2. Une fonctionnalité = une branche = une Pull Request
3. CI obligatoire (processus respecté)
4. Résolution de conflit démontrée sur la PR countDone

---

## Liens des Pull Requests

- **PR addTask :** [Ajouter le lien]
- **PR toggleTask :** [Ajouter le lien]
- **PR countDone v1 :** [Ajouter le lien]
- **PR countDone v2 avec conflit :** [Ajouter le lien]