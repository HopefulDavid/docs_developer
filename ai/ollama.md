## Ollama

Ve výchozím nastavení naslouchá na adrese: [http://127.0.0.1:11434/](http://127.0.0.1:11434/)

> [!IMPORTANT]
> Pro naslouchání aplikace je důležité mít spuštění ollama soubor. (`ollama app.exe`)

### Změna v naslouchání adresy

- Proměnné prostředí ve Windows 

    V `System variables`, nastavte **`OLLAMA_HOST`** s hodnotou adresy, kde má ollama  naslouchat.

- Následně restartujte aplikaci `ollama app.exe`.

### Vypnout automatické spuštění

> [!NOTE]
> Aplikace ollama je ve výchozím stavu zapnuta při spuštění počítače.

Vypnout lze provést tímto způsobem:

- `Windows` + `R`, následně napsat: `shell:startup` -> odkliknout `OK`
- Odstranit zástupce na Ollama.

### Příkazy

<details>
<summary><span style="color:#1E90FF;">Nainstalované moduly</span></summary>

```bash
ollama list
```

</details>


<details>
<summary><span style="color:#1E90FF;">Stažení modelu</span></summary>

```bash
ollama run [model]
```

</details>


<details>
<summary><span style="color:#1E90FF;">Odstranění modelu</span></summary>

```bash
ollama rm [model]
```

</details>