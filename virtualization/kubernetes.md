# 🗂️ Kubernetes – Praktický průvodce & tipy

> 🚀 Moderní přehled základních pojmů, principů a doporučení pro práci s Kubernetes.

---

## 📖 Co je Kubernetes?

- **Orchestrátor kontejnerů** pro automatizované zavádění, správu, škálování a aktualizaci aplikací v kontejnerech.
- Umožňuje efektivně využívat kapacitu serverů, dynamicky spouštět nové verze služeb a vypínat staré.
- Klíčový nástroj pro správu microservices architektury.

> [!IMPORTANT]  
> Pro práci s Kubernetes je zapotřebí znalost Dockeru.

---

## 🧩 Základní pojmy

<details>
<summary><span style="color:#1E90FF;">📦 Kontejner</span></summary>
Izolovaná jednotka aplikace s vlastními závislostmi.
</details>

<details>
<summary><span style="color:#1E90FF;">🗃️ Pod</span></summary>
Nejmenší nasaditelná jednotka v Kubernetes, může obsahovat jeden nebo více kontejnerů.
</details>

<details>
<summary><span style="color:#1E90FF;">🔗 Service</span></summary>
Abstrakce pro přístup ke skupině podů, zajišťuje síťovou komunikaci.
</details>

<details>
<summary><span style="color:#1E90FF;">🛠️ Deployment</span></summary>
Definuje, jak a kolik podů má běžet, umožňuje automatické aktualizace.
</details>

<details>
<summary><span style="color:#1E90FF;">🌐 Cluster</span></summary>
Skupina serverů (node), na kterých běží Kubernetes a spravuje kontejnery.
</details>

---

## 🛠️ Orchestrátory

<details>
<summary><span style="color:#1E90FF;">🔹 Co dělá orchestrátor?</span></summary>

Software nad kontejnerovou sítí, automaticky se stará o zavádění, údržbu a škálování kontejnerizovaných aplikací.

- Efektivně využívá kapacitu serverů
- Reaguje na podněty (např. selhání služby)
- Dynamicky spouští nové verze, vypíná staré

> [!NOTE]  
> Manuální správa stovek kontejnerů je nad lidské síly, proto se využívají orchestrátory jako Kubernetes.
</details>

<details>
<summary><span style="color:#E95A84;">🖼️ Ukázka orchestrátoru</span></summary>

<img src="../images/lkjf3DXNjN.png" alt="Kubernetes_kontejnery"/>

> [!NOTE]  
> Orchestrátory usnadnily práci především vývojářům microservices.
>
> - **Microservices**: Architektura, kde aplikace je rozdělena na menší, nezávislé služby komunikující přes API.
</details>