---
description: "Spouštění místních modelů, jejich stahování, odstranění a nastavení serveru."
---

# Ollama – lokální modely ve Windows

Ollama spouští jazykové modely a poskytuje lokální API pro další aplikace.

## Spuštění a ověření

Nainstaluj Ollama pro Windows a otevři nový terminál.

Aplikace po instalaci běží na pozadí a API standardně používá `http://localhost:11434`.

Samostatný CLI server lze spustit přes `ollama serve`.

Nespouštěj druhý server na portu, který už používá aplikace. [Ollama ve Windows](https://docs.ollama.com/windows)

```powershell
ollama --version
ollama list
ollama run llama3.2
```

`--version` vypíše verzi programu, `list` uložené modely a `run llama3.2` otevře konverzaci s ukázkovým modelem.

Při prvním `run` se chybějící model stáhne.

Počítej s připojením k internetu a místem pro jeho soubory.

## Příkazy pro správu modelů

`<model>` je název modelu, který doplníš bez závorek.

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

`llama3.2` je konkrétní název, který můžeš změnit podle dostupné paměti a účelu.

Druhý příkaz ověří, že je model uložený.

Jméno může obsahovat také tag, například `llama3.2:1b`.

Pokud jej použiješ při stahování, používej stejný název i při spuštění nebo odstranění. [Reference CLI](https://docs.ollama.com/cli)

## Změna naslouchací adresy

1. Ukonči Ollama z ikony v oznamovací oblasti.
2. V nastavení Windows vyhledej **Upravit proměnné prostředí pro váš účet**.
3. Nastav `OLLAMA_HOST`, například `127.0.0.1:11435` pro jiný lokální port.
4. Znovu spusť Ollama a nastav stejnou adresu i v klientské aplikaci.

Hodnota `0.0.0.0` zpřístupňuje server na všech rozhraních.

Použij ji jen při zamýšleném síťovém přístupu s odpovídajícím omezením přístupu. [Konfigurace serveru](https://docs.ollama.com/faq)

Umístění modelů mění uživatelská proměnná `OLLAMA_MODELS`.

I ta se projeví po restartu serveru. [Umístění modelů](https://docs.ollama.com/windows)

## Vypnutí automatického spuštění

Ve **Správci úloh → Aplikace po spuštění** vyhledej Ollama a zvol **Zakázat**. [Automatické spuštění](https://docs.ollama.com/faq)
