# Unity: Universal Render Pipeline

Universal Render Pipeline neboli URP určuje, jak Unity připraví a vykreslí snímek.

Umožňuje volit renderery, kvalitu a efekty podle projektu i cílového zařízení; výkon je potřeba ověřovat měřením konkrétní scény.

## Jak spolu konfigurace souvisejí

Následující rozdělení odpovídá Unity 6 a URP 17; umístění položek se může v jiných verzích lišit.

| Část | Co vlastní | Kde ji hledat |
|---|---|---|
| URP Asset | Nastavení pipeline, seznam rendererů, stíny a další volby kvality | Graphics a případně přepsání pro konkrétní úroveň Quality |
| Renderer Data | Nastavení zvoleného způsobu vykreslování a jeho Renderer Features | Asset přiřazený v seznamu rendererů URP Assetu |
| Kamera | Výběr rendereru a použití post-processingu pro konkrétní pohled | Inspector kamery |
| Volume a Volume Profile | Přepsání efektů pro scénu nebo oblast, například Bloom | Komponenta Volume a její Profile |
| Graphics nastavení URP | Sdílené prostředky a další nastavení pipeline | Project Settings → Graphics |

Barevný prostor projektu není totéž co Volume Profile a volba rendereru automaticky nerozdělí objekty mezi různé pipeline.

## Před použitím

Začni projektem vytvořeným z URP šablony kompatibilní s editorem.

Před převodem existujícího projektu vytvoř checkpoint ve verzovacím systému a ověř kompatibilitu shaderů, materiálů i balíčků.

Růžové materiály často znamenají nepodporovaný nebo chybový shader, ne nedostatek světla.

## Praktické použití: ověření Volume efektu

1. Na aktivní kameře zapni **Post Processing**.
2. Přidej do scény **Global Volume** a vytvoř nový **Profile**.
3. Přidej override **Color Adjustments**, aktivuj přepsání **Saturation** a dočasně nastav `-100`.
4. Ověř černobílý obraz v Game view a potom hodnotu vrať na zamýšlený vzhled.

Hodnota `-100` je diagnostická úplná desaturace, aby byl účinek jednoznačně vidět.

Pokud se nic nezmění, ověř váhu Volume, aktivitu override, Volume Mask kamery a skutečně přiřazený URP Asset pro aktuální Quality.

Postup vychází z [oficiálního nastavení post-processingu URP](https://docs.unity3d.com/6000.0/Documentation/Manual/urp/integration-with-post-processing.html).

## Co lze upravit

Kvalitu stínů, render scale a efekty měň podle měření na cílovém zařízení a porovnávej stejnou scénu před změnou i po ní.

Sdílený Profile ovlivní všechna místa, která jej používají; pro nezávislé scény vytvoř samostatný asset.

Pokročilé Renderer Features přidávej až pro konkrétní efekt, který základní konfigurace neposkytuje.
