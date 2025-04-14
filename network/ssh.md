## SSH

SSH je bezpečnější než používání uživatelského jména a hesla, protože využívá veřejný a soukromý klíč.

<details>
<summary><span style="color:#1E90FF;">Přípojení na GitHub</span></summary>

<details>
<summary><span style="color:#E95A84;">Generování SSH klíče</span></summary>

> [!NOTE]
> Pokud již máte SSH klíč, můžete tento krok přeskočit.

Pokud ještě nemáte SSH klíč, budete ho muset vytvořit. To provedete pomocí následujícího příkazu v terminálu:

```bash
ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"
```

Tento příkaz vygeneruje nový RSA klíč s 4096 bity, který bude spojen s vaším e-mailem.

Po zadání příkazu budete vyzváni k zadání umístění pro uložení klíče (obvykle se uloží do ~/.ssh/id_rsa).

Následně budete vyzváni k zadání hesla pro klíč. Pokud chcete klíč chránit heslem, zadejte ho. Pokud nechcete, klíč bude
uložen bez hesla.

</details>

<details>
<summary><span style="color:#E95A84;">Přidání SSH klíče do GitHubu</span></summary>

Po vytvoření klíče ho musíte přidat na GitHub.

1. Zkopírujte veřejný SSH klíč

   Obsah souboru:

    - Windows:

    ```bash 
   type %userprofile%\.ssh\id_rsa.pub
    ```

    - Linux/macOS:

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

2. Přihlaste se na GitHub a přejděte do Settings > SSH and GPG keys.

3. Klikněte na New SSH key, zadejte název klíče a vložte obsah veřejného klíče do textového pole.

   Poté klikněte na Add SSH key.

</details>

<details>
<summary><span style="color:#E95A84;">Testování SSH připojení</span></summary>

Po přidání SSH klíče na GitHub můžete ověřit, zda je vše správně nastaveno, pomocí následujícího příkazu:

```bash
ssh -T git@github.com
```

Pokud je vše v pořádku, uvidíte zprávu:

```bash
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

</details>

<details>
<summary><span style="color:#E95A84;">Klónování repozitáře pomocí SSH</span></summary>

Když máte SSH nastavené, můžete klonovat repozitáře bez zadávání hesla pomocí SSH URL.

Použijte tento příkaz:

```bash
git clone git@github.com:username/repository.git
```

Tímto způsobem zajistíte, že budete používat SSH místo HTTPS pro komunikaci s GitHubem.

</details>

<details>
<summary><span style="color:#E95A84;">Nastavit SSH URL pro existující repozitář</span></summary>

Pokud jste již klonovali repozitář pomocí HTTPS URL, můžete změnit URL na SSH.

Použijte tento příkaz:

```bash
git remote set-url origin git@github.com:username/repository.git
```

Tímto způsobem zajistíte, že budete používat SSH místo HTTPS pro komunikaci s GitHubem. (Tento příkaz nastaví adresu pro
fetch i push.)

> [!TIP]
> Pokud nastavíte špatně URL, můžete ji znovu nastavit pomocí tohoto příkazu.

> [!TIP]  
> Jak zjistit URL pro stahování (fetch) a nahrávání (push) v Git repozitáři:
>
> ```bash  
> git remote -v  
> ```
> Tento příkaz zobrazí aktuálně nastavené adresy pro fetch a push.

> [!TIP]
><details>
><summary><span style="color:#E95A84;">Způsob jak nastavit jednu URL pro fetch a jinou pro push</span></summary>
>
>1. Nastavit URL pro fetch:
>
>   ```bash
>   git remote set-url origin <fetch-url>
>   ```
>
>2. Nastavit URL pro push:
>
>   ```bash
>   git remote set-url origin https://github.com/username/repo.git
>   ```
>3. Zkontrolujte nastavení:
>
>   ```bash
>   git remote -v
>   ```

</details>

</details>

</details>