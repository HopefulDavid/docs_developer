---
description: "Spouštění místních modelů, jejich stahování, odstranění a nastavení serveru."
---

# Ollama – lokální modely ve Windows

Ollama spouští jazykové modely a poskytuje lokální API pro další aplikace.

## Spuštění a ověření

Po instalaci Ollama pro Windows se příkazy spouštějí v nově otevřeném terminálu.

Aplikace po instalaci běží na pozadí a API standardně používá `http://localhost:11434`.

Samostatný CLI server lze spustit přes `ollama serve`.

Na portu, který už používá aplikace, se druhý server nespouští. [Ollama ve Windows](https://docs.ollama.com/windows)

```powershell
ollama --version
ollama list
ollama run llama3.2
```

`--version` vypíše verzi programu, `list` uložené modely a `run llama3.2` otevře konverzaci s ukázkovým modelem.

Při prvním `run` se chybějící model stáhne.

Stažení vyžaduje připojení k internetu a místo pro soubory modelu.

## Příkazy pro správu modelů

`<model>` zastupuje název modelu, který se doplňuje bez závorek.

Značení vysvětluje [syntaxe příkazů](../operating-system/command-line-syntax.md).

| Syntaxe | Co příkaz provede |
|---|---|
| `ollama list` | Modely uložené na disku |
| `ollama ps` | Modely právě načtené v paměti |
| `ollama pull <model>` | Stáhne nebo aktualizuje soubory zvoleného modelu |
| `ollama run <model> [<zadání>]` | Spustí model, případně mu rovnou předá zadání |
| `ollama stop <model>` | Uvolní model z paměti, ale ponechá jej na disku |
| `ollama rm <model>` | Smaže místní model z disku |

### Příklad: stažení jednoho modelu

```powershell
ollama pull llama3.2
ollama list
```

`llama3.2` je konkrétní název, který lze změnit podle dostupné paměti a účelu.

Druhý příkaz ověří, že je model uložený.

Jméno může obsahovat také tag, například `llama3.2:1b`.

Název s tagem použitý při stahování platí i pro spuštění a odstranění. [Reference CLI](https://docs.ollama.com/cli)

## Změna naslouchací adresy

1. Ollama se ukončí z ikony v oznamovací oblasti.
2. V nastavení Windows se vyhledá **Upravit proměnné prostředí pro váš účet**.
3. Proměnná `OLLAMA_HOST` dostane novou adresu, například `127.0.0.1:11435` pro jiný lokální port.
4. Po novém spuštění Ollama se stejná adresa nastaví i v klientské aplikaci.

Hodnota `0.0.0.0` zpřístupňuje server na všech rozhraních.

Hodí se jen pro zamýšlený síťový přístup s odpovídajícím omezením přístupu. [Konfigurace serveru](https://docs.ollama.com/faq)

Umístění modelů mění uživatelská proměnná `OLLAMA_MODELS`.

I ta se projeví po restartu serveru. [Umístění modelů](https://docs.ollama.com/windows)

## Vypnutí automatického spuštění

Automatické spuštění vypne volba **Zakázat** u položky Ollama ve **Správci úloh → Aplikace po spuštění**. [Automatické spuštění](https://docs.ollama.com/faq)
