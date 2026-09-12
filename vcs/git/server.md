# Git server: připojení, migrace a LFS

Git server uchovává vzdálené repozitáře; platformy jako Forgejo, Gitea, GitHub nebo GitLab navíc spravují účty, oprávnění a návrhy změn.

Adresa Git remote, SSH port a endpoint velkých souborů LFS mohou používat odlišné protokoly.

## Před použitím

Zkopíruj clone URL přímo z konkrétního projektu na serveru a ověř své oprávnění pro čtení nebo zápis.

Pro SSH nastav [klíč](../../network/ssh/keys.md) a při prvním spojení ověř otisk hostitele důvěryhodným kanálem.

## Správa remote URL

```bash
# Výpis názvů remotes a URL pro fetch i push.
git remote -v
# Ukázkovou doménu, tým a projekt nahraď clone URL ze svého serveru.
git remote set-url origin ssh://git@git.example.com:2222/tym/projekt.git
# Ověří čtení referencí bez změny lokální pracovní kopie.
git ls-remote origin
```

`origin` je běžný název remote, nikoli pevná součást protokolu.

Port `2222` patří pouze ukázkovému SSH serveru; pro běžný port může clone URL vypadat jako `git@git.example.com:tym/projekt.git`.

Pokud používáš HTTPS, změň pouze URL a použij přihlašovací postup podporovaný serverem.

```bash
# Heslo nebo token nevkládej přímo do URL.
git remote set-url origin https://git.example.com/tym/projekt.git
```

Změna URL nepřenáší data sama o sobě ani nepřiděluje oprávnění.

## Přenos repozitáře pomocí mirroru

Mirror použij pro řízenou migraci do nového prázdného repozitáře, protože zrcadlí všechny Git reference a v cíli může reference také přepsat nebo smazat.

Nezahrnuje issues, přístupová práva, CI tajemství ani soubory LFS automaticky.

V Bashi spusť pro každý repozitář samostatně následující postup a obě URL nahraď ověřenými adresami.

```bash
# Vytvoří bare kopii zdroje se všemi jeho referencemi.
git clone --mirror https://git.example.com/tym/projekt.git projekt-mirror.git
cd projekt-mirror.git
# Samostatný remote zachová zdrojovou adresu pro kontrolu.
git remote add destination ssh://git@novy.example.com/tym/projekt.git
git ls-remote destination
# Náhled změn v cíli; nic neodešle.
git push --mirror --dry-run destination
```

Zkontroluj prázdný nebo výslovně určený migrační cíl a teprve potom proveď přenos.

```bash
git push --mirror destination
# Porovnej větve a tagy a ověř nový běžný clone v samostatné složce.
git ls-remote --heads --tags destination
```

Automatický cyklus přes všechny složky bez kontroly cíle může přepsat nesouvisející repozitáře, proto nejprve ověř jednotlivý přenos.

Přesné chování mirroru definuje [git push](https://git-scm.com/docs/git-push).

## Git LFS s vlastním serverem

Git LFS ukládá do Git historie malé ukazatele a obsah velkých souborů přenáší samostatně.

SSH URL repozitáře nemusí znamenat přenos LFS přes SSH: běžné servery používají HTTPS, ale existuje i čistý SSH transport a jeho dostupnost závisí na klientovi a serveru.

Princip vysvětluje [Git LFS](https://git-lfs.com/) a protokol [dokumentace SSH transportu](https://github.com/git-lfs/git-lfs/blob/main/docs/proposals/ssh_adapter.md).

```bash
# Verze klienta a skutečné endpointy; výstup před sdílením zkontroluj.
git lfs version
git lfs env
# Soubory spravované LFS v aktuálně vybrané revizi.
git lfs ls-files
```

Endpoint nepřepisuj naslepo, nejprve ověř clone URL, konfiguraci serveru a podporované přihlášení.

Pouze pokud správce skutečně poskytuje odlišný endpoint, lze nastavit lokální výjimku.

```bash
# Ukázkový endpoint nahraď přesnou adresou potvrzenou správcem.
git config --local lfs.url https://git.example.com/tym/projekt.git/info/lfs
# Návrat k automatickému určení, pokud výjimka už není potřebná.
git config --local --unset lfs.url
```

Při migraci repozitáře s LFS stáhni i historické objekty a odešli je do cíle před finálním ověřením.

```bash
# Spouští se v migrační kopii s remotes origin a destination z předchozího postupu.
git lfs fetch --all origin
git lfs push --all destination
```

Tyto příkazy mohou přenášet velké množství dat; zkontroluj kvótu a poté stáhni LFS soubory z nového serveru v čerstvé pracovní kopii.

## SSH přístup

```bash
# Test přihlášení k ukázkovému Git serveru, nikoli požadavek na interaktivní shell.
ssh -T -p 2222 git@git.example.com
```

Git server může úspěšné přihlášení potvrdit zprávou a zároveň odmítnout shell; vyhodnoť text služby, ne pouze očekávání běžného SSH terminálu.

Při `Permission denied (publickey)` postupuj podle [diagnostiky SSH pro Git](../../network/ssh/git.md).
