# Unity – Navigační systém (NavMesh)

> Nastavení navigace, pohyb postav a využití NavMesh v Unity.

---

## Co je NavMesh?

NavMesh (Navigation Mesh) je speciální mapa herního světa, která definuje, kde se postavy mohou pohybovat. Unity ji používá pro automatické hledání cesty k cíli, obcházení překážek a optimalizaci pohybu.

---

## Nastavení NavMesh

1. Označ objekty, po kterých se má chodit (nastav jako **Walkable**).
2. Přidej komponentu **NavMesh Surface** na scénu nebo herní objekt.
3. Klikni na **Bake** pro vygenerování navigační mapy.

> [!TIP]
> Pro dynamické překážky (pohybující se objekty) přidej komponentu **NavMesh Obstacle**.

---

## Pohyb postavy

Přidej komponentu **NavMesh Agent** na postavu a nastav parametry (rychlost, akcelerace, radius). Pohyb pak zajistí jednoduchý skript:

```csharp
using UnityEngine;
using UnityEngine.AI;

public class MoveToTarget : MonoBehaviour
{
    public Transform target;
    private NavMeshAgent agent;

    void Start()
    {
        agent = GetComponent<NavMeshAgent>();
    }

    void Update()
    {
        agent.SetDestination(target.position);
    }
}
```

Agent automaticky najde nejkratší cestu k `target` a obejde překážky.

---

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/sOIQCHNJbCs?si=Hd4186amhBQiQ_tX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
