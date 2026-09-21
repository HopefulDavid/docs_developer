---
canonical_for: architecture-decision-index
status: accepted
last_verified: 2026-08-28
owner: architecture
---

# Architektonická rozhodnutí

Tento adresář obsahuje významná rozhodnutí, která ovlivňují architekturu, veřejné rozhraní, data, bezpečnost, provoz nebo dlouhodobou udržitelnost.

Proces rozhodování je kanonicky popsaný v [`../../governance/decisions.md`](../../governance/decisions.md).

Výzkumné nároky jsou v [`../../governance/research.md`](../../governance/research.md).

Nový záznam vzniká ze šablony [`../../templates/adr.md`](../../templates/adr.md).

## Pravidla ADR

- Jeden ADR zachycuje právě jedno rozhodnutí.
- Přijatý ADR se obsahově nepřepisuje.
- Nové poznání nebo změna směru vytvoří nový ADR, který původní záznam výslovně nahrazuje.
- Stav, odkaz na nahrazující ADR a oprava nefunkčního odkazu se mohou doplnit bez změny historického významu.
- Rutinní vratná implementační volba ADR nepotřebuje.
- ADR odkazuje na kanonické požadavky a architekturu místo jejich kopírování.
- Zdrojové podklady obsahují datum ověření a přesnou vazbu na rozhodovací kritérium.

## Index

| ADR | Název | Stav | Nahrazeno |
|---|---|---|---|
| [`ADR-0001-kanonicky-system-dokumentace.md`](ADR-0001-kanonicky-system-dokumentace.md) | Kanonický systém dokumentace pro lidi a AI agenty | Přijato | — |
| [`ADR-0002-verejny-docfx-build.md`](ADR-0002-verejny-docfx-build.md) | Bezpečný a reprodukovatelný veřejný DocFX build | Přijato, SDK a správce balíčků nahrazeny | `ADR-0004` pro SDK, `ADR-0005` pro správce balíčků |
| [`ADR-0003-generovani-changelogu-pomoci-git-cliff.md`](ADR-0003-generovani-changelogu-pomoci-git-cliff.md) | Generování changelogu pomocí git-cliff | Přijato, správce balíčků nahrazen | `ADR-0005` pouze pro instalaci a spouštění balíčků |
| [`ADR-0004-vyber-dotnet-sdk.md`](ADR-0004-vyber-dotnet-sdk.md) | Výběr .NET SDK bez projektového global.json | Přijato | — |
| [`ADR-0005-pnpm-pro-projektovy-build.md`](ADR-0005-pnpm-pro-projektovy-build.md) | pnpm pro projektový build | Přijato | — |
