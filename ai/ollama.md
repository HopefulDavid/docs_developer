# Ollama – lokální modely ve Windows

Ollama spouští jazykové modely a poskytuje lokální API pro další aplikace.

## Spuštění a ověření

Nainstaluj Ollama pro Windows a otevři nový terminál.

Aplikace po instalaci běží na pozadí a API standardně používá `http://localhost:11434`.

Samostatný CLI server lze spustit přes `ollama serve`; nespouštěj druhý server na portu, který už používá aplikace. [Ollama ve Windows](https://docs.ollama.com/windows)

```powershell
ollama --version
ollama list
ollama run llama3.2
```

První spuštění stáhne chybějící model; počítej s připojením k internetu a místem pro jeho soubory.

## Příkazy pro správu modelů

| Příkaz | Význam |
|---|---|
| `ollama list` | Modely uložené na disku |
| `ollama ps` | Modely právě načtené v paměti |
| `ollama pull llama3.2` | Stažení nebo aktualizace modelu |
| `ollama run llama3.2` | Interaktivní spuštění modelu |
| `ollama stop llama3.2` | Uvolnění modelu z paměti |
| `ollama rm llama3.2` | Odstranění místní kopie modelu |

Název `llama3.2` je příklad; nahraď jej modelem odpovídajícím paměti a účelu počítače. [Reference CLI](https://docs.ollama.com/cli)

## Změna naslouchací adresy

1. Ukonči Ollama z ikony v oznamovací oblasti.
2. V nastavení Windows vyhledej **Upravit proměnné prostředí pro váš účet**.
3. Nastav `OLLAMA_HOST`, například `127.0.0.1:11435` pro jiný lokální port.
4. Znovu spusť Ollama a nastav stejnou adresu i v klientské aplikaci.

Hodnota `0.0.0.0` zpřístupňuje server na všech rozhraních; použij ji jen při zamýšleném síťovém přístupu s odpovídajícím omezením přístupu. [Konfigurace serveru](https://docs.ollama.com/faq)

Umístění modelů mění uživatelská proměnná `OLLAMA_MODELS`; i ta se projeví po restartu serveru. [Umístění modelů](https://docs.ollama.com/windows)

## Vypnutí automatického spuštění

Ve **Správci úloh → Aplikace po spuštění** vyhledej Ollama a zvol **Zakázat**. [Automatické spuštění](https://docs.ollama.com/faq)
