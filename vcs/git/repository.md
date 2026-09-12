# Git – vytvoření a klonování úložiště

Git ukládá historii projektu do commitů; pracovní kopie navíc obsahuje soubory, které upravuješ v editoru.

## Jak úložiště funguje

Pracovní strom obsahuje rozpracované soubory, index připravuje obsah dalšího commitu a adresář `.git` uchovává historii a konfiguraci.

Serverové **bare úložiště** nemá pracovní strom a slouží například jako cíl pro push.

Přípona `.git` u názvu serverové složky je konvence, nikoli podmínka funkčnosti. [Reference git init](https://git-scm.com/docs/git-init)

## Před použitím

Nainstaluj Git a ověř `git --version`; před prvním commitem nastav [jméno a e-mail](configuration.md).

Následující příkazy fungují v PowerShellu i Bashi a používají nové složky, jejichž názvy můžeš změnit.

## Praktické použití

### Nový projekt

```bash
# Vytvoří pracovní kopii s počáteční větví main.
git init -b main moje-aplikace
cd moje-aplikace
git status
```

V editoru vytvoř `README.md` s popisem projektu, potom ulož právě tento soubor do historie:

```bash
git add README.md
git diff --cached
git commit -m "docs: přidává popis projektu"
```

`add` připraví obsah, `diff --cached` umožní jeho kontrolu a `commit` vytvoří místní záznam; na server se zatím nic neposílá.

### Existující projekt

Zkopíruj klonovací adresu ze svého hostingu a nahraď jí ukázkovou URL:

```bash
git clone https://git.example.com/tym/aplikace.git moje-kopie
cd moje-kopie
git remote -v
```

`clone` stáhne historii a vytvoří pracovní kopii; vzdálený zdroj standardně pojmenuje `origin`. [Reference git clone](https://git-scm.com/docs/git-clone)

### Lokální serverové úložiště

```bash
# Spusť ve složce pro testovací repozitáře, mimo předchozí projekt.
git init --bare centralni.git
git clone centralni.git pracovni-kopie
```

Varování o prázdném úložišti je v tomto případě očekávané.

Do `centralni.git` nevkládej zdrojové soubory ručně; pracuj v `pracovni-kopie` a změny přenášej přes Git.

## Související témata

- [Připojení Git serveru](server.md).
- [Vytvoření vzdálené větve](branches/create-remote-branch.md).
