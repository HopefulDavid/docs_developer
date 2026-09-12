# OpenTofu – Infrastructure as Code

OpenTofu spravuje požadovaný stav zdrojů popsaný v konfiguračních souborech HCL.

## Co je OpenTofu?

OpenTofu je nástroj pro **Infrastructure as Code** – místo ručního klikání v cloudovém rozhraní popíšeš infrastrukturu v souborech a OpenTofu ji podle toho vytvoří nebo upraví.

OpenTofu se používá na:
- vytváření serverů a sítí,
- zakládání databází,
- správu cloudové infrastruktury,
- opakovatelné a předvídatelné nasazování.

OpenTofu vzniklo jako fork Terraformu; kompatibilitu konkrétní konfigurace a providerů ověř před migrací podle používaných verzí.

## Co OpenTofu není

OpenTofu komunikuje s cílovými systémy prostřednictvím providerů, takže může spravovat i aplikační prostředky nebo služby.

Samo nenahrazuje překladač, testy ani řízení celého release procesu. [Úloha providerů](https://opentofu.org/docs/language/providers/)

| Nástroj | Role |
|---------|------|
| **OpenTofu** | Postaví infrastrukturu (servery, sítě, databáze) |
| **Docker** | Zabalí aplikaci do kontejneru |
| **CI/CD** | Nasadí kód do prostředí |
| **Aplikace** | Samotný produkt (Next.js, .NET, Go…) |

## Instalace

1. Stáhni z [opentofu.org/docs/intro/install](https://opentofu.org/docs/intro/install/).
2. Rozbal archiv a přidej do `PATH`.
3. Ověř:

```bash
tofu version
```

## První test – bez cloudu

Příklad nevyžaduje cloudový účet, ale první `tofu init` potřebuje stáhnout provider ze sítě, pokud není dostupný místně. [Inicializace](https://opentofu.org/docs/cli/commands/init/)

**1. Vytvoř složku projektu:**

```text
C:\tofu-test
```

**2. Vytvoř soubor `main.tf`:**

```hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

provider "local" {}

resource "local_file" "example" {
  content  = "Ahoj, OpenTofu funguje."
  filename = "${path.module}/vystup.txt"
}
```

`required_providers` vybírá plugin, `~> 2.5` dovoluje kompatibilní verze od 2.5 do další hlavní řady a lockfile připne konkrétně vybranou verzi.

`resource` pojmenovává spravovaný soubor, `content` jeho obsah a `path.module` adresář aktuálního modulu; měnit můžeš obsah i název výstupu.

Použij novou výukovou složku bez existujícího `vystup.txt`, protože provider bude tento soubor spravovat a při destroy jej odstraní.

**3. Inicializuj projekt:**

```bash
tofu init
```

**4. Zkontroluj plán:**

```bash
tofu plan
```

**5. Použij změny:**

```bash
tofu apply   # potvrď 'yes'
```

Ve složce se vytvoří soubor `vystup.txt`.

**6. Úklid:**

```bash
tofu destroy   # potvrď 'yes'
```

## Přehled příkazů

| Příkaz | Popis |
|--------|-------|
| `tofu init` | Připraví projekt a stáhne pluginy |
| `tofu plan` | Zobrazí, co se změní |
| `tofu apply` | Provede změny v infrastruktuře |
| `tofu destroy` | Smaže vytvořené zdroje |
| `tofu fmt` | Naformátuje `.tf` soubory |
| `tofu validate` | Ověří syntaxi a vnitřní konzistenci inicializované konfigurace; nekontroluje dostupnost vzdálených služeb |
| `tofu output` | Zobrazí výstupní hodnoty |
| `tofu version` | Zobrazí nainstalovanou verzi |

## Doporučená struktura projektu

```text
projekt/
├── main.tf          # Hlavní konfigurace zdrojů
├── variables.tf     # Definice proměnných
├── outputs.tf       # Výstupní hodnoty po apply
├── terraform.tfvars # Konkrétní hodnoty proměnných
└── README.md        # Popis projektu
```

Soubor `.terraform.lock.hcl` verzuj, aby změny vybraných providerů byly dohledatelné. [Dependency lock](https://opentofu.org/docs/language/files/dependency-lock/)

Adresář `.terraform/`, místní stav `terraform.tfstate*`, uložené plány a soubory s tajemstvími nevkládej do veřejného repozitáře.

Stav může obsahovat citlivé hodnoty i tehdy, když je výstup označený jako `sensitive`; uchovávej jej v chráněném a zálohovaném úložišti. [Citlivá data ve stavu](https://opentofu.org/docs/language/state/sensitive-data/)

`tofu validate` nenahrazuje kontrolu konkrétního plánu před `apply`. [Rozsah validace](https://opentofu.org/docs/cli/commands/validate/)

## Základní syntaxe HCL

```hcl
# Definice proměnné
variable "prostedi" {
  type    = string
  default = "dev"
}

# Použití proměnné
resource "local_file" "konfig" {
  content  = "Prostředí: ${var.prostedi}"
  filename = "config.txt"
}

# Výstup po apply
output "cesta_souboru" {
  value = local_file.konfig.filename
}
```

> [!NOTE]
> HCL je deklarativní jazyk – popisuješ **co** chceš mít, ne **jak** to vytvořit.

## Užitečné odkazy

- [Dokumentace OpenTofu](https://opentofu.org/docs/)
- [Registry providerů](https://registry.opentofu.org/)
