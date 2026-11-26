---
description: "Příprava URP, materiály a rozdíl mezi světly a postprocessingem."
---

# Unity: Universal Render Pipeline

Universal Render Pipeline neboli URP určuje, jak Unity připraví a vykreslí snímek.

Umožňuje volit renderery, kvalitu a efekty podle projektu i cílového zařízení.

Výkon je potřeba ověřovat měřením konkrétní scény.

## Jak spolu konfigurace souvisejí

Následující rozdělení odpovídá Unity 6 a URP 17.

Umístění položek se může v jiných verzích lišit.

| Část | Co vlastní | Kde ji hledat |
|---|---|---|
| URP Asset | Nastavení pipeline, seznam rendererů, stíny a další volby kvality | Graphics a případně přepsání pro konkrétní úroveň Quality |
| Renderer Data | Nastavení zvoleného způsobu vykreslování a jeho Renderer Features | Asset přiřazený v seznamu rendererů URP Assetu |
| Kamera | Výběr rendereru a použití post-processingu pro konkrétní pohled | Inspector kamery |
| Volume a Volume Profile | Přepsání efektů pro scénu nebo oblast, například Bloom | Komponenta Volume a její Profile |
| Graphics nastavení URP | Sdílené prostředky a další nastavení pipeline | Project Settings → Graphics |

Barevný prostor projektu není totéž co Volume Profile a volba rendereru automaticky nerozdělí objekty mezi různé pipeline.

## Před použitím

Výchozím bodem je projekt vytvořený z URP šablony kompatibilní s editorem.

Před převodem existujícího projektu vznikne checkpoint ve verzovacím systému a ověří se kompatibilita shaderů, materiálů i balíčků.

Růžové materiály často znamenají nepodporovaný nebo chybový shader, ne nedostatek světla.

## Praktické použití: ověření Volume efektu

1. Na aktivní kameře se zapne **Post Processing**.
2. Do scény se přidá **Global Volume** s novým **Profile**.
3. Přidá se override **Color Adjustments**, aktivuje se přepsání **Saturation** a dočasně se nastaví `-100`.
4. Game view má ukázat černobílý obraz a potom se hodnota vrátí na zamýšlený vzhled.

Hodnota `-100` je diagnostická úplná desaturace, aby byl účinek jednoznačně vidět.

Pokud se nic nezmění, ověří se váha Volume, aktivitu override, Volume Mask kamery a skutečně přiřazený URP Asset pro aktuální Quality.

Postup vychází z [oficiálního nastavení post-processingu URP](https://docs.unity3d.com/6000.0/Documentation/Manual/urp/integration-with-post-processing.html).

## Co lze upravit

Kvalita stínů, render scale a efekty se mění podle měření na cílovém zařízení a porovnává se stejná scéna před změnou i po ní.

Sdílený Profile ovlivní všechna místa, která jej používají.

Nezávislé scény mají samostatný asset.

Pokročilé Renderer Features se přidávají až pro konkrétní efekt, který základní konfigurace neposkytuje.
