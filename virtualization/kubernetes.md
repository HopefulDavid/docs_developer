---
description: "První lokální cluster, vztah Deployment–Pod–Service a diagnostika nasazení."
---

# Kubernetes – první aplikace krok za krokem

Kubernetes udržuje kontejnery podle požadovaného stavu, například „spouštěj dvě připravené instance tohoto webu“.

Když instance zanikne, řídicí mechanismus se pokusí vytvořit náhradu, takže aplikaci neřídíš jen jednorázovým spuštěním procesu.

## Kdy ho použít

Hodí se pro více služeb, řízené aktualizace a provoz přes více uzlů.

Pro jednoduchou místní sestavu může stačit Docker Compose.

Nejprve porozuměj [image, kontejneru a portům](docker/index.md).

## Jak součásti spolupracují

```text
kubectl → API clusteru → Deployment → ReplicaSet → Pody → kontejnery
                                                    ↑
                              Service vybírá Pody podle labelů
```

| Pojem | Praktický význam |
|---|---|
| Cluster | Celek s řídicí vrstvou a pracovními uzly |
| Node / uzel | Stroj nebo virtuální prostředí pro běh Podů |
| Pod | Nejmenší plánovaná jednotka, obvykle s hlavním kontejnerem aplikace |
| Deployment | Předpis počtu instancí a aktualizace bezstavové aplikace |
| ReplicaSet | Hlídá počet Podů, u Deploymentu jej spravuje Kubernetes |
| Service | Stabilní síťový vstup pro vybranou skupinu Podů |
| Namespace | Prostor názvů a správy uvnitř clusteru |
| Manifest | YAML soubor požadovaných prostředků |
| Context | Volba clusteru, účtu a případného výchozího namespace pro kubectl |

Pod může být nahrazen jiným jménem a IP, proto aplikaci obvykle zpřístupníš přes Service.

Namespace sám není úplná síťová ani bezpečnostní izolace.

## 1. Připrav výukový cluster

| Možnost | Kdy ji zvolit |
|---|---|
| Minikube | Pojmenovaný lokální cluster s jednoduchým start/stop |
| Kubernetes v Docker Desktopu | Využití podporované integrace své instalace |
| kind | Krátkodobé testovací clustery jako kontejnery |

Příklad používá Minikube s Docker driverem, běžící linuxový engine Dockeru a instalované [minikube](https://minikube.sigs.k8s.io/docs/start/) a [kubectl](https://kubernetes.io/docs/tasks/tools/).

První start potřebuje internet a volné prostředky podle požadavků Minikube.

```bash
docker version
minikube start --driver=docker --profile docs-demo
kubectl config current-context
kubectl get nodes
```

`docs-demo` je vlastní profil clusteru.

Očekávej jeho context a uzel ve stavu `Ready`.

Existující lokální cluster lze použít místo Minikube, ale vždy ověř context, aby příkazy nezasáhly jiné prostředí.

## 2. Vytvoř prostor pro ukázku

```bash
kubectl create namespace docs-demo
```

Jde o namespace uvnitř clusteru, který má zde stejné jméno jako profil Minikube, ale je jiným objektem.

Pokud již existuje, ověř jeho obsah a vlastníka, než budeš pokračovat.

## 3. Popiš web a přístup k němu

Do nové složky ulož `web.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: docs-demo
spec:
  replicas: 2 # Dvě instance, nikoli automatické škálování.
  selector:
    matchLabels:
      app: docs-web
  template:
    metadata:
      labels:
        app: docs-web # Stejnou značku vybírá Service.
    spec:
      containers:
        - name: nginx
          image: nginx:stable-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 100m
              memory: 32Mi
            limits:
              memory: 128Mi
          readinessProbe:
            httpGet:
              path: /
              port: 80
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: docs-demo
spec:
  type: ClusterIP
  selector:
    app: docs-web
  ports:
    - port: 80
      targetPort: 80
```

`---` odděluje dva YAML dokumenty.

Deployment vytvoří Pody a Service je vybere podle stejné značky `app: docs-web`.

| Hodnota | Úloha |
|---|---|
| `replicas: 2` | Dvě instance stejného webu |
| `containerPort: 80` | Popis portu nginxu, sám naslouchání nespouští |
| `requests.cpu: 100m` | Pro plánování žádá desetinu CPU na kontejner |
| `requests.memory: 32Mi` | Malá výchozí paměťová žádost pro ukázku |
| `limits.memory: 128Mi` | Limit, jehož překročení může ukončit kontejner |
| `readinessProbe` | Kontrola připravenosti přijímat provoz |
| `ClusterIP` | Dostupnost Service uvnitř clusteru |
| `port / targetPort` | Port Service a skutečný port aplikace |

Zdroje jsou výukové nastavení nginxu, nikoli univerzální hodnoty pro jinou aplikaci.

Tag `stable-alpine` je pohyblivý.

Pro reprodukovatelné nasazení použij ověřený digest image.

## 4. Ověř a aplikuj

V PowerShellu nebo Bashi ve složce manifestu:

```bash
kubectl apply --dry-run=server -f web.yaml
kubectl apply -f web.yaml
kubectl rollout status deployment/web -n docs-demo --timeout=120s
kubectl get pods,services -n docs-demo
```

První příkaz provede serverovou kontrolu bez uložení, druhý prostředky skutečně vytvoří nebo aktualizuje.

Kontrola rollout počká nejvýše 120 sekund.

Při timeoutu pokračuj diagnostikou, ne automatickým smazáním clusteru.

Očekávej dva Pody `Running` s `READY 1/1` a Service `web`.

## 5. Otevři web

```bash
kubectl port-forward -n docs-demo service/web 8080:80
```

Dočasný tunel propojí místní port `8080` s portem `80` služby.

Otevři `http://localhost:8080` a očekávej stránku nginx.

`Ctrl+C` ukončí pouze tunel, nikoli aplikaci.

Port-forward je místní zkouška, není trvalé veřejné publikování a při zániku vybraného Podu se může ukončit.

## 6. Změň požadovaný stav

Změň v YAML `replicas` ze `2` na `3` a znovu spusť `kubectl apply -f web.yaml`.

`kubectl get pods -n docs-demo` má po chvíli ukázat tři připravené Pody.

Při změně image vzniká nová revize a Deployment postupně nahrazuje Pody podle strategie.

`kubectl rollout history deployment/web -n docs-demo` vypíše dostupné revize a `kubectl rollout undo deployment/web -n docs-demo` může vrátit předchozí šablonu Podů.

Undo nevrací databázové změny, externí data ani všechnu konfiguraci.

Po návratu oprav také zdrojový manifest, jinak další apply znovu požádá o vadný stav.

## Když aplikace neběží

Najdi konkrétní Pod ve výpisu a použij:

```text
kubectl describe pod <pod> -n <namespace>
kubectl logs <pod> -n <namespace> [--previous]
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp
```

`describe` ukáže plánování a události, `logs` výstup aplikace a `--previous` log předchozí ukončené instance.

| Stav | Co ověřit |
|---|---|
| `Pending` | Kapacitu uzlů, plánovací podmínky a volume |
| `ImagePullBackOff` | Image, jeho verzi a přístup k registru |
| `CrashLoopBackOff` | Log aplikace, spuštění, konfiguraci a paměť |
| `Running`, ale `READY 0/1` | Port a výsledek readiness kontroly |
| Nefunkční Service | Shodu labelů, selectoru a `targetPort` |

## Konfigurace, data a veřejný provoz

| Potřeba | Navazující prostředek |
|---|---|
| Běžné nastavení | ConfigMap |
| Přístupové údaje | Secret a odpovídající správa přístupu a šifrování |
| Trvalá data | PersistentVolumeClaim a úložiště clusteru |
| Stabilní identita stavové aplikace | Podle návrhu StatefulSet |
| Jednorázová nebo pravidelná úloha | Job nebo CronJob |
| Veřejný HTTP vstup | Gateway API nebo Ingress s příslušnou implementací řadiče |

Base64 v Secretu není šifrování.

Dvě repliky na jednom místním uzlu nechrání před jeho výpadkem a Deployment nenahrazuje zálohu dat.

## Úklid

Pro odstranění jen prostředků tohoto souboru:

```bash
kubectl delete -f web.yaml
```

`kubectl delete namespace docs-demo` odstraní celý výukový prostor včetně dalších prostředků, které v něm mezitím vznikly.

`minikube stop --profile docs-demo` cluster zastaví a `minikube delete --profile docs-demo` ho včetně dat odstraní.

Zdroje: [Minikube](https://minikube.sigs.k8s.io/docs/start/), [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Service](https://kubernetes.io/docs/concepts/services-networking/service/), [port-forward](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/), [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/).
