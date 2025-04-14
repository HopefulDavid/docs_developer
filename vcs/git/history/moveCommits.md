### Nová Branch

```bash
git checkout master       # Přepne se do zdrojové branch
git branch newbranch      # Vytvoří branch a tím se uloží stejné commity z předchozí aktivní branch
git checkout master       # Přepne se do zdrojové branch
git reset --hard HEAD~3   # Odstraní 3 commity zpět.
git checkout newbranch    # Přepne se do cílové branch
```

Více info <a href="https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git">zde</a>.

### Existující Branch

```bash
git checkout existingbranch # Přepne se do cílové existující branch
git merge branchToMoveCommitFrom # Přesune commity ze zdrojové branch
git checkout branchToMoveCommitFrom # Přepne se do zdrojové branch
git reset --hard HEAD~3 # Odstraní 3 commity zpět
git checkout existingbranch # Přepne se do cílové existující branch
```

Více info <a href="https://stackoverflow.com/questions/1628563/move-the-most-recent-commits-to-a-new-branch-with-git">zde</a>.