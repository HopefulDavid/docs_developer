# OpenTofu – Infrastructure as Code

> Průvodce nástrojem OpenTofu pro popis a správu infrastruktury jako kódu (IaC).

---

<img src="./images/a188d4ef-a7b4-4028-9107-0bd99f101e30.png" alt="" style="width: 100%; display: block; border-radius: 8px;">

## Co je OpenTofu?

OpenTofu je nástroj pro **Infrastructure as Code** – místo ručního klikání v cloudovém rozhraní popíšeš infrastrukturu v souborech a OpenTofu ji podle toho vytvoří nebo upraví.

OpenTofu se používá na:
- vytváření serverů a sítí,
- zakládání databází,
- správu cloudové infrastruktury,
- opakovatelné a předvídatelné nasazování.

> [!NOTE]
> OpenTofu je open-source fork Terraformu. Syntaxe a příkazy jsou prakticky identické.

---

## Co OpenTofu není

OpenTofu **nevytváří** ani **nespravuje**:
- samotnou aplikaci (to řeší Docker, CI/CD),
- prostředí pro běh kódu – jen infrastrukturu pro něj.

| Nástroj | Role |
|---------|------|
| **OpenTofu** | Postaví infrastrukturu (servery, sítě, databáze) |
| **Docker** | Zabalí aplikaci do kontejneru |
| **CI/CD** | Nasadí kód do prostředí |
| **Aplikace** | Samotný produkt (Next.js, .NET, Go…) |

---

## Instalace

1. Stáhni z [opentofu.org/docs/intro/install](https://opentofu.org/docs/intro/install/).
2. Rozbal archiv a přidej do `PATH`.
3. Ověř:

```bash
tofu version
```

---

## První test – bez cloudu

Nejjednodušší ověření funkčnosti bez cloudového účtu.

**1. Vytvoř složku projektu:**

```
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

---

## Přehled příkazů

| Příkaz | Popis |
|--------|-------|
| `tofu init` | Připraví projekt a stáhne pluginy |
| `tofu plan` | Zobrazí, co se změní |
| `tofu apply` | Provede změny v infrastruktuře |
| `tofu destroy` | Smaže vytvořené zdroje |
| `tofu fmt` | Naformátuje `.tf` soubory |
| `tofu validate` | Ověří syntaxi konfigurace |
| `tofu output` | Zobrazí výstupní hodnoty |
| `tofu version` | Zobrazí nainstalovanou verzi |

---

## Doporučená struktura projektu

```
projekt/
├── main.tf          # Hlavní konfigurace zdrojů
├── variables.tf     # Definice proměnných
├── outputs.tf       # Výstupní hodnoty po apply
├── terraform.tfvars # Konkrétní hodnoty proměnných
└── README.md        # Popis projektu
```

> [!TIP]
> Soubor `terraform.tfvars` přidej do `.gitignore`, pokud obsahuje hesla nebo tokeny.

---

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

---

## Užitečné odkazy

- [Dokumentace OpenTofu](https://opentofu.org/docs/)
- [Registry providerů](https://registry.opentofu.org/)
