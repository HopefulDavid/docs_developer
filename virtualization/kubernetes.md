# Kubernetes: první Deployment a Service

Kubernetes řídí kontejnery podle požadovaného stavu, například „udržuj dvě instance této aplikace“.

Je užitečný pro provoz více aplikací a serverů, ale pro jednoduchou lokální sestavu může stačit [Docker Compose](docker/index.md).

## Jak funguje

| Pojem | Úloha |
|---|---|
| Cluster | Řídicí vrstva a pracovní uzly se společným API |
| Node | Stroj, na kterém běží pracovní zátěž |
| Pod | Nejmenší plánovaná jednotka s jedním nebo více kontejnery |
| Deployment | Udržuje požadovaný počet Podů a řídí aktualizace |
| Service | Poskytuje stabilní adresu pro vybranou skupinu Podů |
| Namespace | Odděluje názvy prostředků a umožňuje uplatnit pravidla správy |

Namespace sám nezaručuje síťovou ani bezpečnostní izolaci.

Automatické škálování podle zátěže vyžaduje další konfiguraci a metriky; dvě repliky ani rolling update samy nezaručují nulový výpadek.

## Před použitím

Potřebuješ `kubectl`, běžící výukový cluster a oprávnění vytvářet namespace, Deployment a Service.

Návod předpokládá linuxové uzly a znalost obrazu, portu a kontejneru.

```bash
# Ověř, kam se kubectl připojuje; další kroky mění právě tento cluster.
kubectl config current-context
kubectl cluster-info
kubectl get nodes
```

Pokračuj pouze v zamýšleném výukovém clusteru, kde není namespace `docs-demo` používaný někým jiným.

## Praktické použití

Nejprve vytvoř vlastní namespace, aby v něm server mohl ověřit následující prostředky.

```bash
# Nový prostor pouze pro tuto ukázku; AlreadyExists znamená, že je název obsazený.
kubectl create namespace docs-demo
```

Ulož následující soubor jako `web.yaml`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: docs-demo
spec:
  replicas: 2 # Dvě požadované instance, nikoli automatické škálování.
  selector:
    matchLabels:
      app: docs-web
  template:
    metadata:
      labels:
        app: docs-web # Musí odpovídat selectoru Deploymentu i Service.
    spec:
      containers:
        - name: nginx
          image: nginx:stable-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 100m # Desetina CPU pro plánování kapacity.
              memory: 32Mi
            limits:
              memory: 128Mi # Překročení může způsobit ukončení kontejneru.
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 2
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: docs-demo
spec:
  selector:
    app: docs-web
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP # Služba je dostupná uvnitř clusteru.
```

`---` odděluje dva prostředky; popisky propojují Service s Pody a readiness kontrola rozhoduje, zda je Pod připraven přijímat provoz.

Tag `stable-alpine` je pohyblivý; pro reprodukovatelné nasazení použij ověřený digest konkrétního obrazu.

```bash
# Server nejprve ověří manifest bez uložení změn.
kubectl apply --dry-run=server -f web.yaml
```

Po úspěšném ověření nasaď prostředky a zkontroluj skutečný stav.

```bash
kubectl apply -f web.yaml
kubectl rollout status deployment/web -n docs-demo --timeout=120s
kubectl get pods,services -n docs-demo
# Lokální tunel na Service; terminál musí zůstat spuštěný.
kubectl port-forward -n docs-demo service/web 8080:80
```

Otevři `http://localhost:8080`; očekávaným výsledkem je uvítací stránka nginx a dvě připravené instance v předchozím výpisu.

`Ctrl+C` ukončí tunel, nikoli Deployment.

## Co lze upravit

Změň `replicas`, obraz a měřené nároky aplikace podle potřeby, ale label a oba selectory musí zůstat ve shodě.

Port aplikace musí odpovídat `targetPort` a readiness kontrole; `containerPort` sám proces na portu nespustí.

Ukázka nemá persistentní data, autentizaci, TLS ani pravidla pro veřejný provoz.

## Časté problémy a úklid

```bash
# Události vysvětlí Pending, chybu stažení obrazu nebo neúspěšnou sondu.
kubectl get events -n docs-demo --sort-by=.metadata.creationTimestamp
kubectl describe deployment web -n docs-demo
kubectl logs -n docs-demo deployment/web
```

`Pending` často znamená nedostupné prostředky, `ImagePullBackOff` problém s obrazem nebo přístupem a `CrashLoopBackOff` opakované ukončování procesu.

Po dokončení smaž výhradně vlastní výukové prostředky.

```bash
# Odstraní celý docs-demo včetně prostředků, které do něj byly dodatečně přidány.
kubectl delete namespace docs-demo
```

Chování Deploymentu popisuje [oficiální návod Kubernetes](https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/).
