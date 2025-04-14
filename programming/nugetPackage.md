## Nuget Packages

<details>
<summary><span style="color:#1E90FF;">Správa balíčků</span></summary>

- Způsoby správy balíčků:

  <details>
  <summary><span style="color:#E95A84;">packages.config</span></summary>

  Ukládá seznam všech balíčků používaných projektem, **včetně jejich závislostí**.

  Každý balíček je nainstalován do specifické složky projektu (typicky `packages` složka uvnitř řešení).

  > [!NOTE]
  > Zde jsou balíčky uloženy v projektu a zkopírovány z globální složky, což může zpomalovat buildy a zvětšuje velikost
  > repozitářů.
  >
  > Používané před rokem 2017. V každém projektu je samostatná složka s balíčky a soubor `.csproj` obsahuje pouze cesty
  > k těmto balíčkům.

  </details>

  <details>
  <summary><span style="color:#E95A84;">PackageReference</span></summary>

  > [!NOTE]
  > Balíčky jsou při použití **PackageReference** vždy načítány přímo ze složky **global-packages** (není nutné je
  > kopírovat do projektu, jak to je u packages.config).
  
    - Balíčky se nestahují do složky projektu, ale do **globální složky balíčků**.
  
    - Závislosti se spravují automaticky a nejsou explicitně uvedeny v souboru `.csproj`.

      > [!NOTE]
      > Používá balíčky přímo z globální složky `global-packages`, což zrychluje build a snižuje nároky na prostor v
      projektu.
      >
      > Od roku 2017 je výchozí formát ve Visual Studiu. Všechny balíčky jsou spravovány na jednom centrálním místě a
      projekt
      > využívá jejich globální umístění, což vede k lepší přehlednosti a výkonu.

  </details>

</details>

<details>
<summary><span style="color:#1E90FF;">Globální složka balíčků</span></summary>

- Umístění složky:

  Windows: `%userprofile%\.nuget\packages`

  Mac/Linux: `~/.nuget/packages`

  > [!NOTE]
  > Výchozí umístění lze upravit přes proměnné prostředí `NUGET_PACKAGES`

</details>