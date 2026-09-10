# Klíče a certifikáty

> Generování bezpečnostních klíčů, práce s TLS certifikáty a nastavení SSH přístupu.

![Certifikáty](../images/a36b0a0f-361c-4d7d-994e-eeef74bebaec.png)

## Generování klíčů

### OpenSSL

```bash
# Base64 secret (JWT, API keys)
openssl rand -base64 32

# HEX secret (konfigurační klíče)
openssl rand -hex 64
```

## TLS certifikáty – mkcert

`mkcert` vytváří lokálně důvěryhodné certifikáty pro vývoj bez nutnosti akceptovat bezpečnostní varování prohlížeče.

### Instalace

1. Stáhni `mkcert.exe` z [github.com/FiloSottile/mkcert/releases](https://github.com/FiloSottile/mkcert/releases).
2. Ulož například do `C:\mkcert`.
3. Volitelně přidej složku do systémové proměnné `PATH`.

### Instalace lokální CA

```bash
mkcert -install
```

CA se nainstaluje do Windows a do Chrome/Edge. Firefox vyžaduje ruční přidání:

1. Otevři `about:preferences#privacy`
2. **Certificates → View Certificates → Authorities → Import**
3. Importuj soubor: `C:\Users\<User>\AppData\Local\mkcert\rootCA.pem`
4. Zaškrtni *Trust this CA to identify websites*

### Vytvoření certifikátu

```bash
# Jeden host
mkcert localhost

# Více hostů
mkcert localhost 127.0.0.1 myapp.local
```

Výstup: `localhost.pem` a `localhost-key.pem`

### Použití certifikátů

Soubory `.pem` lze použít přímo v:
Go, Node.js, Nginx, Caddy, Docker kontejnerech.

**Převod na PFX (.NET / Windows):**

```bash
openssl pkcs12 -export -out server.pfx -inkey localhost-key.pem -in localhost.pem
```

**Převod na CRT/KEY (Apache, Nginx):**

```
localhost.pem     →  server.crt
localhost-key.pem →  server.key
```

**Použití v Go:**

```go
e.StartTLS(":8080", "server.crt", "server.key")
```

## SSH klíč s heslovou frází

SSH přihlášení pomocí klíče používá veřejný klíč uložený na serveru a soukromý klíč na tvém počítači.

**Heslová fráze (passphrase)** šifruje soubor soukromého klíče a zadáváš ji při jeho odemykání; jde o samostatné heslo, které neposíláš GitHubu ani jinému Git serveru.

**Popisek (komentář)** slouží pouze k rozpoznání klíče a nijak jej nezabezpečuje.

### Vytvoření klíče

Nejprve ověř [dostupnost a výběr klienta OpenSSH](ssh.md#které-ssh-se-skutečně-spouští), případně dokonči [instalaci ve Windows](ssh.md#instalace-windows-openssh).

Následující příkaz je stejný ve Windows (PowerShell nebo CMD), Linuxu i macOS (Bash nebo Zsh):

```text
ssh-keygen -t ed25519 -C "Osobní notebook"
```

- `-t ed25519` vybírá algoritmus doporučený pro nové klíče v [návodu GitHubu](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
- `-C "Osobní notebook"` nastavuje vlastní popisek, například označení zařízení nebo e-mail; uvozovky zachovají mezery v popisku.
- Vlastní popisek je volitelný: můžeš vynechat celý argument `-C "Osobní notebook"` a OpenSSH použije výchozí komentář ve tvaru `uzivatel@pocitac`.

Popisek může obsahovat diakritiku; po vytvoření si jeho podobu zkontroluj ve veřejném souboru `.pub`.

Komentář je součástí veřejného klíče, proto do něj nepiš heslo ani jiné tajemství.

Pokud cílový systém Ed25519 nepodporuje, použij místo předchozího příkazu RSA:

```text
ssh-keygen -t rsa -b 4096 -C "Osobní notebook"
```

Průvodce pokračuje třemi kroky:

1. U výzvy `Enter file in which to save the key` zvol umístění soukromého klíče; Enter přijme nabídnutou cestu ve složce `.ssh` v tvém uživatelském profilu.
2. U výzvy `Enter passphrase (empty for no passphrase)` zadej dlouhou, jedinečnou heslovou frázi; pokud chceš klíč chránit, nenechávej ji prázdnou.
3. U výzvy `Enter same passphrase again` zadej stejnou frázi znovu; při psaní se znaky ani hvězdičky nezobrazují.

Ve Windows je výchozí cesta obvykle `C:\Users\TvojeJmeno\.ssh\id_ed25519`, na Linuxu `/home/tvoje-jmeno/.ssh/id_ed25519` a na macOS `/Users/tvoje-jmeno/.ssh/id_ed25519`.

Řiď se cestou nabídnutou průvodcem; Git Bash ji může zobrazit v unixovém zápisu, například `/c/Users/TvojeJmeno/.ssh/id_ed25519`.

Pokud se objeví dotaz `Overwrite (y/n)?`, existující klíč nepřepisuj: odpověz `n`, spusť příkaz znovu a zadej jinou úplnou cestu, například se jménem `id_ed25519_github`.

Heslovou frázi zadávej interaktivně, aby nezůstala v historii příkazů.

Ulož si ji do správce hesel; zapomenutou frázi nelze obnovit.

### Soukromý a veřejný soubor

Při výchozím uložení vzniknou ve složce `.ssh` tyto soubory:

| Soubor | Význam | Jak s ním zacházet |
|---|---|---|
| `id_ed25519` | Soukromý klíč chráněný zadanou heslovou frází | Ponech jej v bezpečí na svém počítači; nevkládej jej do repozitáře ani na Git server |
| `id_ed25519.pub` | Veřejný klíč | Jeho obsah přidej do účtu na Git serveru |

Další příklady předpokládají výchozí název `id_ed25519`; pro RSA použij `id_rsa` a při vlastním názvu nahraď cestu ve všech navazujících příkazech.

Veřejný klíč zobraz příkazem pro svůj terminál:

**Windows – PowerShell:**

```text
Get-Content -Encoding utf8 "$env:USERPROFILE\.ssh\id_ed25519.pub"
```

**Windows – CMD:**

```text
chcp 65001 >nul
type "%USERPROFILE%\.ssh\id_ed25519.pub"
```

V CMD příkaz `chcp 65001` přepne aktuální konzoli na UTF-8, aby se správně zobrazil i popisek s diakritikou.

**Linux / macOS / Git Bash:**

```text
cat ~/.ssh/id_ed25519.pub
```

Kopíruj celý řádek začínající `ssh-ed25519` (nebo `ssh-rsa`), včetně samotného klíče a případného komentáře.

### Dodatečné nastavení nebo změna heslové fráze

Pro existující klíč spusť:

```text
ssh-keygen -p
```

Na výzvu k umístění zadej skutečnou cestu k **soukromému** souboru bez přípony `.pub`; nabízená výchozí cesta nemusí odpovídat tvému klíči.

Pokud je klíč chráněný, program si vyžádá původní frázi; u dosud nechráněného klíče přejde rovnou k nové frázi.

Novou neprázdnou frázi zadej dvakrát.

Veřejný klíč se tím nemění, takže jej na Git serveru nemusíš přidávat znovu.

Vlastní komentář lze později upravit příkazem `ssh-keygen -c`, který se také zeptá na cestu ke klíči a případnou heslovou frázi.

Příkazy `ssh-keygen -p` a `ssh-keygen -c` jsou stejné pro všechny uvedené systémy.

Význam přepínačů a chování komentáře popisuje [manuál OpenSSH pro ssh-keygen](https://man.openbsd.org/ssh-keygen).

### Volitelné odemykání přes ssh-agent

Spuštění agenta a přidání klíče popisuje společný návod pro [Windows OpenSSH](ssh.md#4-načti-klíč-do-windows-agenta) a pro [Git Bash, Linux a macOS](ssh.md#agent-v-git-bash-linuxu-a-macos).

Při souběhu více klientů použij [sjednocení Windows OpenSSH a Gitu](ssh.md#sjednocení-na-windows-openssh).

## SSH – nastavení pro GitHub

Nejprve dokonči [vytvoření klíče s heslovou frází](#ssh-klíč-s-heslovou-frází) a zkopíruj veřejný klíč.

### Přidání klíče do účtu

1. Otevři GitHub → **Settings → SSH and GPG keys → New SSH key**.
2. Do **Title** napiš rozpoznatelný název zařízení; tento název v GitHubu je nezávislý na komentáři `-C`.
3. Pro přístup k repozitářům vyber **Key type → Authentication Key**.
4. Do **Key** vlož obsah souboru `.pub` a potvrď **Add SSH key**.

Podrobnosti uvádí [návod GitHubu pro přidání SSH klíče](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

### Test připojení

```text
ssh -T git@github.com
```

Při prvním připojení porovnej nabídnutý otisk serveru s [oficiálními SSH otisky GitHubu](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) a potvrď `yes` pouze při shodě.

Pokud se klient zeptá na passphrase, zadej frázi soukromého klíče.

Úspěch poznáš podle zprávy `Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.` s tvým uživatelským jménem.

Návratový kód `1` je u tohoto testu očekávaný, protože GitHub neposkytuje interaktivní shell; podrobnosti a řešení `Permission denied (publickey)` uvádí [návod k testování připojení](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection).

### Použití v Git repozitáři

V následujících příkazech nahraď `username/repository` vlastníkem a názvem svého repozitáře.

**Klonování přes SSH:**

```text
git clone git@github.com:username/repository.git
```

**Změna existujícího remote na SSH:**

```text
git remote set-url origin git@github.com:username/repository.git
```

**Zobrazení remote URL:**

```text
git remote -v
```

**Oddělené URL pro fetch a push:**

```text
git remote set-url origin <fetch-url>
git remote set-url --push origin <push-url>
git remote -v
```
