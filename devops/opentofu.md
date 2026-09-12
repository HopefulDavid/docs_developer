---
description: "Popis infrastruktury v souborech, kontrola změn a ochrana stavového souboru."
---

# OpenTofu – infrastruktura jako kód

OpenTofu vytváří a upravuje prostředky podle konfigurace, například server, síť, databázi nebo soubor.

Místo opakovaného ručního nastavování uchováváš požadovaný stav v souborech, které lze porovnávat a verzovat.

## Jak součásti spolupracují

| Součást | Úloha |
|---|---|
| Konfigurace HCL v `.tf` | Popis požadovaných prostředků a hodnot |
| Provider | Plugin pro komunikaci s konkrétní službou nebo systémem |
| State | Vazba mezi konfigurací a skutečně spravovanými objekty |
| Plan | Návrh vytvoření, změn a odstranění |
| Apply | Provedení odsouhlaseného plánu |

Provider cloudu například zakládá server přes jeho API; provider `local` v následující ukázce spravuje místní soubor.

OpenTofu může spravovat i aplikační prostředky podporované providerem; sestavení aplikace, její testy a řízení CI jsou samostatné kroky.

## Před použitím

Nainstaluj OpenTofu podle [oficiálního postupu](https://opentofu.org/docs/intro/install/) a ověř `tofu version`.

První inicializace potřebuje internet pro provider, pokud už není připravený místní mirror.

Ukázku spouštěj v **nové prázdné složce**, protože vytvořený soubor bude nástroj později měnit i mazat.

## 1. Popiš požadovaný soubor

Ulož `main.tf`:

```hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

variable "zprava" {
  type    = string
  default = "Ahoj z OpenTofu."
}

resource "local_file" "pozdrav" {
  content  = var.zprava
  filename = "${path.module}/vystup.txt"
}

output "vytvoreny_soubor" {
  value = local_file.pozdrav.filename
}
```

| Zápis | Význam |
|---|---|
| `terraform` | Konfigurační blok tohoto formátu, jehož název používá i OpenTofu |
| `hashicorp/local` | Zdroj provideru pro místní prostředky |
| `~> 2.5` | Verze od 2.5.0 do, ale ne včetně 3.0.0 |
| `variable "zprava"` | Textový vstup s výchozí hodnotou |
| `local_file.pozdrav` | Adresa prostředku: typ a vlastní jméno |
| `path.module` | Složka aktuálního modulu |
| `output` | Hodnota zpřístupněná po aplikaci změny |

Konkrétní vybranou verzi provideru zaznamená `.terraform.lock.hcl`.

## 2. Inicializuj a prohlédni plán

V této složce v PowerShellu nebo Bashi:

```bash
tofu init
tofu fmt
tofu validate
tofu plan -out=prvni.tfplan
```

`init` připraví provider a stavové úložiště, `fmt` upraví formát a `validate` ověří vnitřní konzistenci konfigurace.

Plán má v této prázdné ukázce navrhovat **jeden soubor k vytvoření**; při jiném nebo nečekaném cíli nepokračuj.

Uložený plán určuje přesnou sadu změn a může obsahovat citlivé hodnoty.

## 3. Proveď a ověř změnu

```bash
tofu apply prvni.tfplan
tofu output vytvoreny_soubor
tofu plan
```

Apply s uloženým plánem provádí jeho změny bez nového potvrzovacího dotazu, proto ho prohlédni **před tímto krokem**.

Otevři `vystup.txt` a ověř zprávu; další plan má oznámit, že nejsou potřeba změny.

Alternativní `tofu apply` bez souboru nejprve vytvoří nový plán a požádá o potvrzení.

## 4. Změň hodnotu

Do `terraform.tfvars` ulož:

```hcl
# Konkrétní hodnota vstupu pro tuto pracovní složku.
zprava = "Upravený obsah souboru."
```

Spusť nový `tofu plan`, prohlédni rozdíl, potom `tofu apply` a ověř nový obsah.

Text i jméno souboru můžeš měnit, ale některé změny prostředku vyžadují jeho nahrazení; rozhoduje plán.

## 5. Ukliď výukový prostředek

```bash
tofu plan -destroy
tofu destroy
```

První příkaz jen ukáže návrh odstranění a druhý po potvrzení odstraní spravovaný `vystup.txt`.

Konfigurace zůstane; v reálném prostředí může destroy odstranit databázi i její data.

## Co verzovat a zálohovat

| Obsah | Zacházení |
|---|---|
| `.tf` a nesoukromé vstupy | Verzovat |
| `.terraform.lock.hcl` | Verzovat výběr providerů |
| `.terraform/` | Obnovitelná pracovní data, běžně ignorovat |
| `terraform.tfstate` a zálohy | Chránit a zálohovat mimo veřejný Git |
| `.tfvars` s tajemstvími a uložené plány | Uchovávat jako citlivé soubory |

I solo práce z více počítačů musí používat správný společný stav a zabránit neřízeným souběžným změnám.

Pro dlouhodobou infrastrukturu vyber backend s odpovídajícím přístupem, zálohou a zamykáním, které konkrétní backend podporuje.

Označení `sensitive` skrývá některé výpisy, ale samo neodstraňuje citlivé hodnoty ze stavu.

Zdroje: [workflow](https://opentofu.org/docs/intro/core-workflow/), [providers](https://opentofu.org/docs/language/providers/), [plan](https://opentofu.org/docs/cli/commands/plan/), [citlivý stav](https://opentofu.org/docs/language/state/sensitive-data/).
