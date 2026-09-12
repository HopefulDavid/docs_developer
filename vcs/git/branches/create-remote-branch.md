# Git – vytvoření vzdálené větve

Novou větev nejprve vytvoříš místně; prvním pushem ji zpřístupníš na serveru.

## Před použitím

V pracovním repozitáři ověř `git status --short --branch` a výchozí commit; nová větev začíná právě z aktuálního `HEAD`.

Příklad používá název `feature/nova-funkce`, který můžeš nahradit podle týmových pravidel.

## Praktický postup

```bash
git switch -c feature/nova-funkce
git remote -v
git push -u origin feature/nova-funkce
```

`switch -c` vytvoří a vybere větev, `remote -v` ukáže cílové adresy a `push -u` publikuje větev včetně nastavení upstreamu.

Upstream je sledovaná vzdálená větev používaná například ve výpisu stavu. [Git push](https://git-scm.com/docs/git-push)

Pokud `origin` chybí, nastav jej podle [návodu pro server](../server.md), než provedeš push.

## Ověření

```bash
git branch -vv
git ls-remote --heads origin feature/nova-funkce
```

První příkaz ukáže místní vazbu, druhý ověří existenci větve přímo na serveru.

Chyba „branch already exists“ znamená, že máš použít `git switch feature/nova-funkce` nebo zvolit nový název, nikoli přepsat existující větev.
