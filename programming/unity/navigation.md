# Unity: navigace pomocí NavMesh

NavMesh popisuje schůdné plochy a propojení mezi nimi; NavMeshAgent podle něj plánuje a provádí pohyb.

Je užitečný pro postavu směřující k cíli, ale nenahrazuje herní rozhodování ani fyzikální simulaci.

## Před použitím

Pro Unity 6 použij kompatibilní balíček **AI Navigation** z Package Manageru.

NavMeshSurface pochází z tohoto balíčku, zatímco NavMeshAgent a jeho runtime API používají `UnityEngine.AI`.

Verzi balíčku a dostupné funkce ověř v [dokumentaci AI Navigation](https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/NavigationOverview.html).

## Nastavení scény

1. Vytvoř podlahu s geometrií a objekt s **NavMesh Surface**.
2. Na Surface nastav **Agent Type**, zahrnuté vrstvy a způsob sběru geometrie podle scény.
3. Proveď **Bake** a ověř, že je podlaha pokrytá navigační plochou.
4. Umísti postavu na tuto plochu a přidej **NavMesh Agent** stejného typu.
5. Vytvoř prázdný objekt cíle na dosažitelné části plochy.

Poloměr, výška a schod agenta při bake určují, kudy lze projít; musí odpovídat zamýšlené postavě.

## Pohyb postavy

Ulož `MoveToTarget.cs`, přidej jej na postavu a v Inspectoru přiřaď objekt cíle.

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
            Debug.LogError("Přiřaď cíl a umísti agenta na NavMesh.", this);
            enabled = false;
            return;
        }
        if (!agent.SetDestination(target.position))
            Debug.LogWarning("Požadavek na výpočet cesty nebyl přijat.", this);
    }

    private void Update()
    {
        // Výpočet je asynchronní: pathStatus čti až po dokončení požadavku.
        if (agent.pathPending) return;
        if (agent.pathStatus != NavMeshPathStatus.PathComplete)
        {
            Debug.LogWarning("Cíl nemá úplnou dosažitelnou cestu.", this);
            enabled = false; // Stejnou zprávu nevypisuj každý snímek.
        }
    }
}
```

`SetDestination` potvrzuje přijetí požadavku, nikoli okamžité nalezení kompletní cesty.

Agent hledá cestu podle průchodnosti a nákladů oblastí, proto nemusí jít o geometricky nejkratší spojnici.

## Co lze upravit a ověřit

V Inspectoru nastav `speed`, `acceleration`, `angularSpeed` a `stoppingDistance` podle pohybu postavy.

Pro pohyblivý cíl obnovuj požadavek při významné změně polohy nebo v rozumném intervalu; není nutné bezpodmínečně plánovat každým snímkem.

Spusť Play, ověř dosažení cíle a potom vyzkoušej nedosažitelný cíl i úzký průchod.

Pokud pozici ovládá také Rigidbody nebo root motion animace, sjednoť vlastníka pohybu, jinak se systémy mohou přetahovat.

## Dynamické překážky

NavMeshObstacle může přidat lokální vyhýbání nebo při vhodném nastavení **Carving** vyřezávat překážku do navigační plochy.

Přidání komponenty samo neznamená průběžné přepočítávání celé mapy; zvol chování podle četnosti pohybu překážky a ověř jej ve hře.
