## Dešifrování HTTPS (SSL/TLS)

<ol>
<li> 
    
Nastavit v proměnném prostředí SSLKEYLOGFILE:

Nastavte systémovou proměnnou s názvem `SSLKEYLOGFILE` na cestu k souboru, kam bude prohlížeč ukládat klíče.
</li>
<li>  

Konfigurace Wiresharku pro dešifrování SSL/TLS:

`Edit > Preferences > Protocols > TLS`.
	
Nastavte `Pre-Master-Secret log filename` na stejnou cestu, kterou jste použili pro `SSLKEYLOGFILE`.
</li>
<li> 

Zachycení a analýza paketů:

Spusťte zachycení paketů ve Wiresharku.
	
Po ukončení zachycení paketů byste měli být schopni vidět dešifrovaný provoz.
</li>
</ol>