## 🗂️ Klíče a certifikáty

> 🚀 Kompletní přehled pro generování bezpečnostních klíčů, práce s TLS certifikáty, správou SSH přístupu a Git URL.

---

## Generování klíčů & bezpečných hodnot

> Základní nástroje pro bezpečné šifrování, tokeny, secrets a root keys.

### OpenSSL – (Pro generování náhodných hodnot)

<details>
<summary><span style="color:#1E90FF;">🔐 Base64 secret (např. JWT, API keys)</span></summary>

```bash
openssl rand -base64 32
```

</details>

<details>
<summary><span style="color:#1E90FF;">🔐 HEX secret (konfigurační klíče apod.)</span></summary>

```bash
openssl rand -hex 64
```

</details>

---

## Certifikáty & TLS

> Moderní způsoby generování certifikátů pro vývoj i servery.

---

### 🛡️ mkcert – Lokální důvěryhodné certifikáty

#### 1. Instalace mkcert

1. Stáhnout `mkcert.exe` z [https://github.com/FiloSottile/mkcert/releases](https://github.com/FiloSottile/mkcert/releases).
2. Ulož například do `C:\mkcert`.
3. (Volitelné) Přidej tuto složku do systémové proměnné `PATH` pro snadné spouštění z libovolného místa.

---

#### 2. Instalace lokální certifikační autority (CA)

```
mkcert -install
```

**Výsledek:**

* CA je nainstalována ve Windows + v prohlížečích (Chrome, Edge…)
* Firefox se musí nastavit ručně (viz níže)

##### Firefox – ruční přidání CA

1. Otevři Firefox
2. `about:preferences#privacy`
3. **Certificates → View Certificates**
4. Tab **Authorities → Import**
5. Importuj:

```
C:\Users\<User>\AppData\Local\mkcert\rootCA.pem
```

6. Zaškrtni *Trust this CA to identify websites*

---

#### 3. Vytvoření certifikátu pro doménu

```
mkcert localhost
```

Výstup:

* `localhost.pem`
* `localhost-key.pem`

Více domén:

```
mkcert localhost 127.0.0.1 myapp.local
```

---

#### 4. Použití certifikátů

##### Obvykle použitelné přímo (`.pem`)

* Go
* Node.js
* Nginx
* Caddy
* Docker containers

---

#### 5. Převod na PFX (.NET / Windows)

```
openssl pkcs12 -export -out server.pfx -inkey localhost-key.pem -in localhost.pem
```

---

#### 6. Převod na CRT/KEY (Apache, Nginx)

Pouhé přejmenování:

```
localhost.pem → server.crt
localhost-key.pem → server.key
```

---

### 📘 Příklad použití v Go

```go
e.StartTLS(":8080", "server.crt", "server.key")
```

---

## SSH – Bezpečné připojení pro GitHub

### 🗝️ Co je SSH?

Protokol využívající veřejný a soukromý klíč, bezpečnější než heslo.

---

### 📋 Kompletní postup nastavení SSH pro GitHub

<details>
<summary><span style="color:#1E90FF;">1️⃣ Generování SSH klíče</span></summary>

```bash
ssh-keygen -t rsa -b 4096 -C "<your_email@example.com>"
```

</details>

<details>
<summary><span style="color:#1E90FF;">2️⃣ Zobrazení veřejného klíče</span></summary>

**Windows**

```bash
type %userprofile%\.ssh\id_rsa.pub
```

**Linux/macOS**

```bash
cat ~/.ssh/id_rsa.pub
```

</details>

<details>
<summary><span style="color:#1E90FF;">3️⃣ Přidání klíče na GitHub</span></summary>

GitHub → **Settings → SSH and GPG keys → New SSH key**

</details>

<details>
<summary><span style="color:#1E90FF;">4️⃣ Test připojení</span></summary>

```bash
ssh -T git@github.com
```

</details>

<details>
<summary><span style="color:#1E90FF;">5️⃣ Klonování pomocí SSH</span></summary>

```bash
git clone git@github.com:username/repository.git
```

</details>

<details>
<summary><span style="color:#1E90FF;">6️⃣ Změna remote URL na SSH</span></summary>

```bash
git remote set-url origin git@github.com:username/repository.git
```

</details>

<details>
<summary><span style="color:#1E90FF;">7️⃣ Zobrazení URL</span></summary>

```bash
git remote -v
```

</details>

<details>
<summary><span style="color:#1E90FF;">8️⃣ Oddělené URL pro fetch/push</span></summary>

**Fetch**

```bash
git remote set-url origin <fetch-url>
```

**Push**

```bash
git remote set-url --push origin <push-url>
```

**Kontrola:**

```bash
git remote -v
```

</details>

---