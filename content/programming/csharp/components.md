---
description: "Komponenty a běh pracovních postupů Windows Workflow."
---

# Windows Workflow Foundation (WF)

Windows Workflow Foundation je technologie .NET Framework pro modelování a spouštění pracovních postupů z aktivit.

<a id="kdy-se-s-wf-setkáte"></a>

## Kde se WF objevuje

Ve stávající aplikaci může WF řídit sekvenci činností, větvení nebo dlouho běžící proces s uložením stavu.

Návrh a provoz závisí na použité verzi .NET Framework a hostiteli workflow. [Microsoft: Windows Workflow Foundation](https://learn.microsoft.com/en-us/dotnet/framework/windows-workflow-foundation/).

## Kompatibilita s moderním .NET

WF není součástí moderního .NET, tedy ani .NET 10.

Při migraci se inventarizují vlastní aktivity, persistence store, návrhář a hostování.

Běžná změna cílového frameworku jejich kompatibilitu nezaručuje.

Microsoft uvádí CoreWF jako alternativu, jejíž kompatibilitu je nutné posoudit vůči konkrétní aplikaci. [Microsoft: technologie nepřenesené do .NET](https://learn.microsoft.com/en-us/dotnet/core/porting/framework-overview#unavailable-technologies).
