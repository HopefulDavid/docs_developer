## Uživatelská konfigurace

<details>
<summary><span style="color:#1E90FF;">Porovnání souborů přes aplikaci Meld</span></summary>

<details>
<summary><span style="color:#E95A84;">Windows</span></summary>

```bash
git config --global diff.tool meld
git config --global difftool.meld.path "C:\Program Files\Meld\Meld.exe"
git config --global difftool.prompt false

git config --global merge.tool meld
git config --global mergetool.meld.path "C:\Program Files\Meld\Meld.exe"
git config --global mergetool.prompt false
```

</details>

<details>

<summary><span style="color:#E95A84;">Linux</span></summary>

```bash
git config --global diff.tool meld
git config --global difftool.meld.path "/usr/bin/meld"
git config --global difftool.prompt false

git config --global merge.tool meld
git config --global mergetool.meld.path "/usr/bin/meld"
git config --global mergetool.prompt false
```

</details>

</details>