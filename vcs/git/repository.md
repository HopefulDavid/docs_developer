---
description: "Založení projektu, klonování existující historie a první ověřený commit."
---

# Git – založení a klonování repozitáře

Nový repozitář vytvoříš pomocí `init`.

Existující projekt s historií získáš přes `clone`.

Tyto možnosti jsou alternativy: do naklonovaného projektu už znovu `init` nepotřebuješ.

## Před použitím

Nainstaluj [Git](https://git-scm.com/downloads), ověř `git --version` a nastav [jméno a e-mail autora](configuration.md).

Příklady fungují v PowerShellu i Bashi a používají nové složky.

Do cizího existujícího repozitáře nevkládej další vnořený `.git`.

## Vyber výchozí stav projektu

<a id="nový-projekt"></a>
<a id="už-mám-soubory-bez-gitu"></a>
<a id="existující-projekt-na-serveru"></a>

## [Nový místní repozitář](#tab/repository-new)

V rodičovské složce projektů spusť:

```bash
git init -b main moje-aplikace
cd moje-aplikace
git status
```

`init` založí složku `moje-aplikace` a historii uvnitř `.git`.

`-b main` zvolí název počáteční větve.

V editoru vytvoř `README.md` s názvem a účelem projektu a přidej vhodný [`.gitignore`](history/update-gitignore.md) ještě před prvním hromadným přidáváním souborů.

```bash
git add -- README.md .gitignore
git diff --cached
git commit -m "docs: zakládá projekt"
git log --oneline -1
```

První příkaz předpokládá oba vytvořené soubory.

Pokud `.gitignore` nepotřebuješ a nevytvořil jsi ho, vynech jeho název.

Zkontrolovaný obsah indexu se uloží jako první místní commit a poslední příkaz zobrazí jeho ID.

**Už mám soubory bez Gitu**

V kořeni této složky použij `git init -b main` bez názvu dalšího adresáře.

Pak nejprve projdi `git status --short` a přidávej jen požadované soubory.

Konfigurace s hesly, velké exporty a výstup buildů obvykle do historie nepatří.

## [Existující projekt ze serveru](#tab/repository-clone)

Obecná syntaxe:

```text
git clone <URL-nebo-místní-cesta> [<cílová-složka>]
```

Adresu zkopíruj z tlačítka Clone nebo Code na svém hostingu.

Vyber HTTPS nebo SSH podle [způsobu přihlášení](server.md).

Tento veřejný příklad lze vyzkoušet bez účtu:

```bash
git clone https://github.com/octocat/Hello-World.git git-ukazka
cd git-ukazka
git status
git remote -v
```

`git-ukazka` je volitelný místní název složky.

`clone` stáhne historii a vytvoří remote `origin` podle zdrojové adresy.

Výchozí větev přebírá ze serveru, proto nepředpokládej automaticky `main`.

Tento ukázkový repozitář používá `master`.

Stažený ZIP obsahuje soubory, ale nezachovává repozitářovou historii jako `clone`.

***

## Ověření a další krok

```bash
git rev-parse --show-toplevel
git branch --show-current
git status --short --branch
```

Uvidíš kořen správného projektu, aktuální větev a stav změn.

Nový lokální projekt připoj k [serveru](server.md).

Naklonovaný projekt je připravený pro [každodenní práci](in-practice.md).

### Časté problémy

| Hlášení | Co ověřit |
|---|---|
| `not a git repository` | Terminál není uvnitř pracovní kopie. Přejdi do její složky |
| Cílová složka není prázdná | Pro clone zvol novou složku a existující obsah nejprve prohlédni |
| `Author identity unknown` | Nastav identitu před commitem |
| `repository not found` | Zkontroluj přesnou URL a přístup svého účtu k privátnímu projektu |

Podrobnosti: [git init](https://git-scm.com/docs/git-init), [git clone](https://git-scm.com/docs/git-clone).
