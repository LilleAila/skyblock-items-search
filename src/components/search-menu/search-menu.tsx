import styles from './search-menu.module.scss';
import { SearchItem } from '../search-item/search-item';
import SearchItemStyles from '../search-item/search-item.module.scss';
import { useState, useEffect } from 'react';

export interface SearchMenuProps {
    className?: string;
    maxDisplayedItems?: number;
}

// interface SkyblockItem {
//     [key: string]: any;
//     material?: string;
//     skin?: string;
//     name: string;
//     tier?: string;
//     // npc_sell_price?: number;
//     id: string;
// }

interface SkyblockItem {
    [key: string]: any;
    name: string;
    id: string;
    item_id: number;
    tier?: string;
    glowing?: boolean;
}

export const SearchMenu = ({ className, maxDisplayedItems }: SearchMenuProps) => {
    // const [fullData, setFullData] = useState<SkyblockItem[]>([]);
    const [data, setData] = useState<SkyblockItem[]>([]);
    const [itemIds, setItemIds] = useState<any>({});
    useEffect(() => {
        async function fetchData() {
            const itemsResponse: any = await fetch('https://api.slothpixel.me/api/skyblock/items');
            const itemsData: any = await itemsResponse.json();
            // setFullData(itemsData);
            setData(Object.values(itemsData)
                .map((item: any) => {
                    const modifiedName = item.name.replace(/§./gi, "").replace(/%%.+%%/gi, "");
                    return { ...item, name: modifiedName }
                })
                .sort((a: any, b: any) => a.id.localeCompare(b.id))
            )

            // const idsResponse: any = await fetch("/src/assets/itemIds.json");
            const idsResponse: any = await fetch("itemIds.json");
            const idsData: any = await idsResponse.json();
            setItemIds(idsData);
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log(itemIds)
    // }, [itemIds])

    const [items, setItems] = useState<SkyblockItem[]>(data)

    const [val, setVal] = useState<string>("")
    function filterItems(e: any) {
        const value = e.target["value"];
        setVal(value.toLowerCase());
    }

    useEffect(() => {
        setItems(data.filter((item: SkyblockItem) => {
            return item["name"].toLowerCase().includes(val)
        }))
    }, [val, data])

    // Spawn egg ids: (search "spawn" or "383")
    // https://minecraft-ids.grahamedgecombe.com/
    // Eggs are manually added to itemids.json with "383:[EGG_ID]"
    const edge: any = {
        enchanted_cocoa: 3,
        dungeon_decoy: 56, // Dungeon decoy = decoy
        training_dummy: 102,
        super_egg: 56, // Super egg = super enchanted egg
        island_npc: 102,
        assistant: 120, // Move jerry = assistant
        inflatable_jerry: 120,
        omega_egg: 5, // Omega egg = omega enchanted egg
        amalgamated_crimsonite_new: 52,
        amalgamated_crimsonite: 52,
        null_ovoid: 58,
        red_claw_egg: 96,
        sam_assistant: 101, // Sam assistant = move sam
    }

    return (
        <div className={styles.root + " " + className}>
            <div>
                <input
                    placeholder="Search for an item..."
                    className={styles.searchInput}
                    onChange={filterItems}
                />
                <ul className={styles.searchList}>{
                    val.length > 0 && items.map((item: SkyblockItem, i: number) => {
                        let image = "";
                        let icon = "";

                        if (item.texture) {
                            image =
                                'https://mc-heads.net/head/' + item.texture;
                        }
                        else if(item.id) {
                            let itemId: string = item["item_id"]
                                .toString();

                            if(/ENCHANTED_.+_LOG/.test(item.id)) {
                                const idSuffixes: any = {
                                    oak: ':0',
                                    spruce: ':1',
                                    birch: ':2',
                                    acacia: ':0',
                                    dark: ':1',
                                    jungle: ':3'
                                  };
                                  
                                  itemId += idSuffixes[item["id"].split("_")[1].toLowerCase()];
                            }
                            else if(item.id.includes(":")) itemId += ":" + item.id.split(":")[1];
                            else if(Object.keys(edge).includes(item["id"].toLowerCase())) {
                                itemId += ":" + edge[item["id"].toLowerCase()].toString();
                                console.log(itemId);
                            }
                            else itemId += ":0";

                            let itemTextId = (itemIds[itemId] ?? "");

                            if(itemTextId.includes("spawn_egg")) itemTextId = "spawn-egg-" + itemTextId.replace("_spawn_egg", "")

                            icon = itemTextId
                                .replaceAll("_", "-")
                                .replace("minecraft:", "")
                        }

                        return (
                            <SearchItem
                                itemName={item.name}
                                itemId={item.id}
                                image={image}
                                key={'item_' + i}
                                icon={icon}
                                glowing={item.glowing ? "true": "false"}
                                className={SearchItemStyles[(item.tier ?? 'COMMON').toLowerCase()]}
                            />
                        );
                    }).slice(0, Math.min((maxDisplayedItems ? maxDisplayedItems : 25), items.length))
                }
                </ul>
            </div>
        </div>
    )
}