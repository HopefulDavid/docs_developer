---
description: "První program, moduly, spuštění, testy a sestavení aplikace."
---

# Go – první program a příkazy

Go překládá zdrojové soubory do programu.

Modul v `go.mod` určuje jeho identitu a závislosti.

## Před použitím

Po instalaci Go se ověří `go version`.

Příkazy níže fungují v PowerShellu i Bashi.

## Praktický příklad

V nové složce projektu:

```bash
mkdir pozdrav
cd pozdrav
go mod init example.com/pozdrav
```

`example.com/pozdrav` je učební identifikátor modulu.

Publikovaný modul používá odpovídající skutečnou cestu repozitáře.

Soubor `main.go`:

```go
package main

import "fmt"

func main() {
    // fmt vypíše text na standardní výstup a přidá nový řádek.
    fmt.Println("Ahoj z Go")
}
```

Balíček `main` a funkce `main` tvoří vstupní bod spustitelného programu.

`fmt` je součást standardní knihovny.

```bash
go run .
go build .
```

První příkaz program **přeloží a spustí**, druhý uloží binární výstup do aktuální složky.

Očekávaný text je `Ahoj z Go`. [První program v Go](https://go.dev/doc/tutorial/getting-started)

## Přehled příkazů

| Syntaxe | Význam |
|---|---|
| `go fmt ./...` | Naformátuje balíčky v aktuálním modulu |
| `go test ./...` | Spustí jejich testy |
| `go test -v ./...` | Přidá podrobný testovací výpis |
| `go mod tidy` | Sjednotí závislosti s použitými importy. Může změnit `go.mod` a `go.sum` |
| `go mod vendor` | Připraví kopie závislostí ve složce `vendor` |
| `go env GOBIN GOPATH` | Ukáže cesty používané pro instalované nástroje |
| `go doc <balíček>.<symbol>` | Zobrazí dokumentaci vybraného symbolu |
| `go help <příkaz>` | Zobrazí nápovědu konkrétního příkazu |

Například `go doc fmt.Println` vysvětlí funkci `Println` z balíčku `fmt` a `go help build` volby sestavení.

`./...` v příkazech výše je skutečný vzor Go pro aktuální adresář a jeho podadresáře, ne zástupná výpustka z dokumentační syntaxe.

Tečka znamená aktuální balíček, `./...` zahrne i podbalíčky. [Reference příkazu go](https://pkg.go.dev/cmd/go)

## Co lze upravit

Po změně textu ve `fmt.Println` se program znovu spustí a ověří se výstup.

Nové knihovny se přidávají přes `go get` s cestou a vybranou verzí.

Samostatný nástroj se instaluje přes `go install cesta@verze` a zkontroluje se kompatibilita s projektem.
