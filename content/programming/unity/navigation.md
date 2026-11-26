---
description: "Příprava NavMesh a pohyb postavy k cíli."
---

# Unity: navigace pomocí NavMesh

NavMesh popisuje schůdné plochy a propojení mezi nimi.

NavMeshAgent podle něj plánuje a provádí pohyb.

Je užitečný pro postavu směřující k cíli, ale nenahrazuje herní rozhodování ani fyzikální simulaci.

## Před použitím

Unity 6 používá kompatibilní balíček **AI Navigation** z Package Manageru.

NavMeshSurface pochází z tohoto balíčku, zatímco NavMeshAgent a jeho runtime API používají `UnityEngine.AI`.

Verzi balíčku a dostupné funkce popisuje [dokumentaci AI Navigation](https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/NavigationOverview.html).

## Nastavení scény

1. Vznikne podlaha s geometrií a objekt s **NavMesh Surface**.
2. Na Surface se nastaví **Agent Type**, zahrnuté vrstvy a způsob sběru geometrie podle scény.
3. Po **Bake** se ověří, že je podlaha pokrytá navigační plochou.
4. Postava se umístí na tuto plochu a dostane **NavMesh Agent** stejného typu.
5. Na dosažitelné části plochy vznikne prázdný objekt cíle.

Poloměr, výška a schod agenta při bake určují, kudy lze projít.

Musí odpovídat zamýšlené postavě.

## Pohyb postavy

Skript `MoveToTarget.cs` se přidá na postavu a v Inspectoru se přiřadí objekt cíle.

Ukázka zadává cestu jednou při startu, protože cíl je nehybný.

```csharp
using UnityEngine;
using UnityEngine.AI;

/// <summary>Zadá agentovi cestu ke statickému cíli a hlásí nedosažitelnou cestu.</summary>
[RequireComponent(typeof(NavMeshAgent))]
public class MoveToTarget : MonoBehaviour
{
    [SerializeField] private Transform target;
    private NavMeshAgent agent;

    private void Start()
    {
        agent = GetComponent<NavMeshAgent>();
        if (target == null || !agent.isOnNavMesh)
        {
            Debug.LogError("Chybí přiřazený cíl nebo agent není na NavMesh.", this);
            enabled = false;
            return;
        }
        if (!agent.SetDestination(target.position))
            Debug.LogWarning("Požadavek na výpočet cesty nebyl přijat.", this);
    }

    private void Update()
    {
        // Výpočet je asynchronní: pathStatus se čte až po dokončení požadavku.
        if (agent.pathPending) return;
        if (agent.pathStatus != NavMeshPathStatus.PathComplete)
        {
            Debug.LogWarning("Cíl nemá úplnou dosažitelnou cestu.", this);
            enabled = false; // Stejná zpráva se nevypisuje každý snímek.
        }
    }
}
```

`SetDestination` potvrzuje přijetí požadavku, nikoli okamžité nalezení kompletní cesty.

Agent hledá cestu podle průchodnosti a nákladů oblastí, proto nemusí jít o geometricky nejkratší spojnici.

## Co lze upravit a ověřit

V Inspectoru se nastaví `speed`, `acceleration`, `angularSpeed` a `stoppingDistance` podle pohybu postavy.

Pro pohyblivý cíl se požadavek obnovuje při významné změně polohy nebo v rozumném intervalu.

Není nutné bezpodmínečně plánovat každým snímkem.

Po spuštění Play se ověří dosažení cíle a potom se vyzkouší nedosažitelný cíl i úzký průchod.

Pokud pozici ovládá také Rigidbody nebo root motion animace, musí mít pohyb jednoho vlastníka, jinak se systémy mohou přetahovat.

## Dynamické překážky

NavMeshObstacle může přidat lokální vyhýbání nebo při vhodném nastavení **Carving** vyřezávat překážku do navigační plochy.

Přidání komponenty samo neznamená průběžné přepočítávání celé mapy.

Chování se volí podle četnosti pohybu překážky a ověří se ve hře.
