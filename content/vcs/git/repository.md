---
description: "Založení projektu, klonování existující historie a první ověřený commit."
---

# Git – založení a klonování repozitáře

Nový repozitář vytvoří `init`.

Existující projekt s historií získá `clone`.

Tyto možnosti jsou alternativy: naklonovaný projekt už znovu `init` nepotřebuje.

## Před použitím

Předpokladem je nainstalovaný [Git](https://git-scm.com/downloads), ověřený přes `git --version`, a nastavené [jméno a e-mail autora](configuration.md).

Příklady fungují v PowerShellu i Bashi a používají nové složky.

Do cizího existujícího repozitáře se další vnořený `.git` nevkládá.

## Výchozí stav projektu

<a id="nový-projekt"></a>
<a id="už-mám-soubory-bez-gitu"></a>
<a id="existující-projekt-na-serveru"></a>

## [Nový místní repozitář](#tab/repository-new)

V rodičovské složce projektů:

```bash
git init -b main moje-aplikace
cd moje-aplikace
git status
```

`init` založí složku `moje-aplikace` a historii uvnitř `.git`.

`-b main` zvolí název počáteční větve.

V editoru vznikne `README.md` s názvem a účelem projektu a vhodný [`.gitignore`](history/update-gitignore.md) ještě před prvním hromadným přidáváním souborů.

```bash
git add -- README.md .gitignore
git diff --cached
git commit -m "docs: zakládá projekt"
git log --oneline -1
```

První příkaz předpokládá oba vytvořené soubory.

Bez souboru `.gitignore` se jeho název vynechá.

Zkontrolovaný obsah indexu se uloží jako první místní commit a poslední příkaz zobrazí jeho ID.

**Existující soubory bez Gitu**

V kořeni této složky se použije `git init -b main` bez názvu dalšího adresáře.

Pak se nejprve projde `git status --short` a přidávají se jen požadované soubory.

Konfigurace s hesly, velké exporty a výstup buildů obvykle do historie nepatří.

## [Existující projekt ze serveru](#tab/repository-clone)

Obecná syntaxe:

```text
git clone <URL-nebo-místní-cesta> [<cílová-složka>]
```

Adresa je u tlačítka Clone nebo Code na hostingu.

HTTPS nebo SSH se volí podle [způsobu přihlášení](server.md).

Tento veřejný příklad lze vyzkoušet bez účtu:

```bash
git clone https://github.com/octocat/Hello-World.git git-ukazka
cd git-ukazka
git status
git remote -v
```

`git-ukazka` je volitelný místní název složky.

`clone` stáhne historii a vytvoří remote `origin` podle zdrojové adresy.

Výchozí větev přebírá ze serveru, proto nemusí jít o `main`.

Tento ukázkový repozitář používá `master`.

Stažený ZIP obsahuje soubory, ale nezachovává repozitářovou historii jako `clone`.

***

## Ověření a další krok

```bash
git rev-parse --show-toplevel
git branch --show-current
git status --short --branch
```

Výpis ukáže kořen správného projektu, aktuální větev a stav změn.

Nový lokální projekt se pak připojí k [serveru](server.md).

Naklonovaný projekt je připravený pro [každodenní práci](in-practice.md).

### Časté problémy

| Hlášení | Co ověřit |
|---|---|
| `not a git repository` | Terminál není uvnitř pracovní kopie. Řešením je přechod do její složky |
| Cílová složka není prázdná | Clone potřebuje novou složku a existující obsah se nejprve zkontroluje |
| `Author identity unknown` | Identita se nastaví před commitem |
| `repository not found` | Kontrola přesné URL a přístupu účtu k privátnímu projektu |

Podrobnosti: [git init](https://git-scm.com/docs/git-init), [git clone](https://git-scm.com/docs/git-clone).
