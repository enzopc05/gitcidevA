# Guide des commandes Git

## Différences entre commandes Git

### switch vs checkout

#### git switch
- **Commande moderne** introduite dans Git 2.23 (2019)
- **Usage unique :** Changer de branche uniquement
- Plus simple et moins risquée
- Syntaxe claire et intuitive

**Exemples :**
```bash
git switch main                    # Aller sur main
git switch -c feature/nouvelle     # Créer et aller sur une nouvelle branche
```

#### git checkout
- **Commande historique** qui existe depuis le début de Git
- **Usage multiple :** Changer de branche ET restaurer des fichiers
- Plus puissante mais plus complexe
- Peut être source de confusion

**Exemples :**
```bash
git checkout main                  # Aller sur main
git checkout -b feature/nouvelle   # Créer et aller sur une nouvelle branche
git checkout fichier.txt           # Restaurer un fichier
git checkout HEAD~1                # Revenir à un commit précédent
```

**Résumé :** Utilise `switch` pour les branches, `checkout` pour les cas avancés.

---

### pull vs fetch

#### git fetch
- **Télécharge** les commits du dépôt distant
- **Ne fusionne PAS** automatiquement avec ta branche locale
- Tu peux examiner les changements avant de les intégrer
- Plus sûr car tu gardes le contrôle

**Workflow avec fetch :**
```bash
git fetch origin main              # Télécharge les changements
git log origin/main                # Examine les changements
git merge origin/main              # Fusionne manuellement si OK
```

#### git pull
- **Télécharge ET fusionne** automatiquement
- Équivaut à `git fetch` + `git merge`
- Plus rapide mais moins de contrôle
- Peut créer des conflits inattendus

**Workflow avec pull :**
```bash
git pull origin main               # Fait tout en une commande
```

**Résumé :** `fetch` = télécharger, `pull` = télécharger + fusionner.

---

### rebase vs revert

#### git rebase
- **Réécrit l'historique** en déplaçant des commits
- Crée un historique linéaire et propre
- **DANGEREUX** si utilisé sur des commits déjà partagés
- Modifie les identifiants (hash) des commits

**Exemple :**
```bash
git checkout feature/ma-branche
git rebase main                    # Déplace les commits de ma-branche sur main
```

**Avant rebase :**
```
main:     A---B---C
               \
feature:        D---E
```

**Après rebase :**
```
main:     A---B---C
                   \
feature:            D'---E'
```

**⚠️ Règle d'or :** Ne jamais rebaser des commits qui ont été pushés sur un dépôt partagé.

#### git revert
- **Crée un nouveau commit** qui annule un commit précédent
- **Préserve l'historique** complet
- Sûr pour les commits publics
- Ne modifie pas les commits existants

**Exemple :**
```bash
git revert abc123                  # Crée un commit qui annule abc123
```

**Avant revert :**
```
A---B---C---D
```

**Après revert de C :**
```
A---B---C---D---C'
```
Où C' annule les modifications de C.

**Résumé :** `rebase` = réécrire l'histoire, `revert` = créer une annulation.

---

## Commandes Git utiles

### tag

**Définition :** Un tag est un marqueur permanent sur un commit spécifique, généralement utilisé pour marquer des versions (releases).

**Pourquoi utiliser des tags :**
- Marquer les versions stables du projet (v1.0.0, v2.1.3, etc.)
- Faciliter le retour à une version précise
- Créer des points de repère dans l'historique

**Types de tags :**

#### Tag léger
Juste un pointeur vers un commit.
```bash
git tag v1.0.0
```

#### Tag annoté (recommandé)
Contient un message, l'auteur, la date.
```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Première version stable"
```

**Commandes utiles :**
```bash
git tag                            # Lister tous les tags
git tag -l "v1.*"                  # Lister les tags v1.x
git show v1.0.0                    # Voir les détails d'un tag
git push origin v1.0.0             # Pousser un tag sur GitHub
git push origin --tags             # Pousser tous les tags
git tag -d v1.0.0                  # Supprimer un tag local
git push origin --delete v1.0.0    # Supprimer un tag distant
```

**Exemple d'utilisation :**
```bash
# Après avoir terminé une version
git tag -a v1.0.0 -m "Première release stable"
git push origin v1.0.0

# Revenir à cette version plus tard
git checkout v1.0.0
```

---

### stash

**Définition :** `git stash` sauvegarde temporairement tes modifications non commitées pour que tu puisses travailler sur autre chose.

**Cas d'usage typiques :**
- Tu travailles sur une fonctionnalité mais tu dois changer de branche en urgence
- Tu veux tester quelque chose sans perdre ton travail en cours
- Tu as fait des modifications par erreur sur la mauvaise branche

**Commandes principales :**

```bash
git stash                          # Sauvegarder les modifications
git stash save "message"           # Sauvegarder avec un message
git stash list                     # Lister tous les stashs
git stash pop                      # Restaurer et supprimer le dernier stash
git stash apply                    # Restaurer sans supprimer
git stash apply stash@{2}          # Restaurer un stash spécifique
git stash drop                     # Supprimer le dernier stash
git stash drop stash@{1}           # Supprimer un stash spécifique
git stash clear                    # Supprimer tous les stashs
git stash show                     # Voir le contenu du dernier stash
```

**Exemple concret :**
```bash
# Tu es sur feature/paiement et tu codes
git status
# modified: payment.js

# Urgence : il faut corriger un bug sur main
git stash save "WIP: système de paiement"
git checkout main
git checkout -b hotfix/bug-critique
# ... corriger le bug ...
git add .
git commit -m "fix: bug critique"
git push origin hotfix/bug-critique

# Retour au travail en cours
git checkout feature/paiement
git stash pop
# Tes modifications sur payment.js sont de retour !
```

**Options avancées :**
```bash
git stash -u                       # Inclure les fichiers non suivis
git stash --include-untracked      # Même chose (version longue)
git stash -k                       # Garder les changements dans l'index
```

---

### release

**Définition :** Une release (version) sur GitHub est une version packagée de ton projet avec documentation, notes de version, et fichiers téléchargeables.

**Différence entre tag et release :**
- **Tag :** Marqueur Git simple dans le code
- **Release :** Interface GitHub riche avec documentation, fichiers, notes de version

**Pourquoi créer des releases :**
- Fournir des versions téléchargeables aux utilisateurs
- Documenter les changements entre versions
- Joindre des fichiers compilés (binaires, executables, etc.)
- Créer un historique visible des versions

**Comment créer une release sur GitHub :**

#### Méthode 1 : Via l'interface GitHub

1. Aller sur ton dépôt GitHub
2. Cliquer sur l'onglet **"Releases"** (à droite)
3. Cliquer sur **"Create a new release"**
4. Remplir le formulaire :
   - **Tag :** v1.0.0 (créé automatiquement si inexistant)
   - **Target :** main (ou la branche à utiliser)
   - **Title :** Version 1.0.0 - Première version stable
   - **Description :** Notes de version (changelog)
   - **Attach binaries :** Joindre des fichiers si nécessaire
5. Cocher **"Set as the latest release"** si applicable
6. Cliquer sur **"Publish release"**

#### Méthode 2 : Via GitHub CLI

```bash
gh release create v1.0.0 --title "Version 1.0.0" --notes "Première version stable"
```

**Exemple de notes de version (changelog) :**

```markdown
## Version 1.0.0 - 2025-10-01

### Nouvelles fonctionnalités
- Ajout de la fonction addTask
- Ajout de la fonction toggleTask
- Ajout de la fonction countDone

### Corrections de bugs
- Résolution du conflit sur countDone

### Améliorations
- Ajout des tests unitaires
- Configuration de la CI/CD
```

**Commandes Git CLI pour les releases :**
```bash
gh release create v1.0.0                    # Créer une release
gh release list                             # Lister les releases
gh release view v1.0.0                      # Voir une release
gh release delete v1.0.0                    # Supprimer une release
gh release upload v1.0.0 fichier.zip        # Ajouter un fichier
```

**Bonnes pratiques :**
- Utiliser le versionnage sémantique (SemVer) : MAJOR.MINOR.PATCH
  - MAJOR : changements incompatibles (2.0.0)
  - MINOR : nouvelles fonctionnalités compatibles (1.1.0)
  - PATCH : corrections de bugs (1.0.1)
- Toujours écrire un changelog clair
- Tester avant de publier
- Marquer les pre-releases (alpha, beta) si nécessaire

---

## Résumé rapide

| Commande | Usage principal |
|----------|----------------|
| `git switch` | Changer de branche (moderne) |
| `git checkout` | Changer de branche ou restaurer fichiers (ancien) |
| `git fetch` | Télécharger sans fusionner |
| `git pull` | Télécharger et fusionner |
| `git rebase` | Réécrire l'historique (dangereux) |
| `git revert` | Annuler un commit (sûr) |
| `git tag` | Marquer une version |
| `git stash` | Sauvegarder temporairement |
| `gh release` | Publier une version sur GitHub |