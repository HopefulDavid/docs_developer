# Klíče a certifikáty

> Generování bezpečnostních klíčů, práce s TLS certifikáty a nastavení SSH přístupu.

---

<img src="./images/a36b0a0f-361c-4d7d-994e-eeef74bebaec.png" alt="" style="width: 20%; display: block; border-radius: 8px;">

## Generování klíčů

### OpenSSL

```bash
# Base64 secret (JWT, API keys)
openssl rand -base64 32

# HEX secret (konfigurační klíče)
openssl rand -hex 64
```

---

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

---

## SSH – nastavení pro GitHub

SSH využívá pár klíčů (veřejný + soukromý) místo hesla. Je bezpečnější a pohodlnější pro každodenní práci s Gitem.

### Nastavení krok za krokem

**1. Generování SSH klíče**

```bash
ssh-keygen -t rsa -b 4096 -C "tvuj@email.com"
```

**2. Zobrazení veřejného klíče**

```bash
# Windows
type %userprofile%\.ssh\id_rsa.pub

# Linux / macOS
cat ~/.ssh/id_rsa.pub
```

**3. Přidání klíče na GitHub**

GitHub → **Settings → SSH and GPG keys → New SSH key**

**4. Test připojení**

```bash
ssh -T git@github.com
```

**5. Klonování přes SSH**

```bash
git clone git@github.com:username/repository.git
```

**6. Změna remote URL na SSH**

```bash
git remote set-url origin git@github.com:username/repository.git
```

**7. Zobrazení remote URL**

```bash
git remote -v
```

**8. Oddělené URL pro fetch a push**

```bash
git remote set-url origin <fetch-url>
git remote set-url --push origin <push-url>
git remote -v
```
