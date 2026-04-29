## Pokrytí kódu (Code Coverage)

### Bez nahlédnutí do zdrojového kódu

1. Nainstalujte balíček:
   ```bash
   npm install -g @lcov-viewer/cli
   ```
2. Vytvořte `package.json`:
   ```bash
   npm init -y
   ```
3. Přidejte skript:
   ```json
   {
     "name": "xxx_app",
     "version": "1.0.0",
     "description": "A new Flutter project.",
     "main": "index.js",
     "directories": {
       "lib": "lib",
       "test": "test"
     },
     "scripts": {
       "test-report": "flutter test --coverage && lcov-viewer lcov -o ./coverage/report ./coverage/lcov.info"
     },
     "keywords": [],
     "author": "",
     "license": "ISC"
   }
   ```
4. Spusťte:
   ```bash
   npm run test-report
   ```

### S nahlédnutím do zdrojového kódu

1. Stáhněte [`genhtml`](https://github.com/linux-test-project/lcov/releases).
2. Umístěte soubor do kořenové složky projektu.
3. Ujistěte se, že máte nainstalovaný `Git Bash` (obsahuje perl).
    - Ověřte instalaci perl:
      ```bash
      where perl
      ```
4. Spusťte v Git Bash:
   ```bash
   perl genhtml coverage/lcov.info -o coverage/html
   ```