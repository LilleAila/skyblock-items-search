import styles from './search-menu.module.scss';
import { SearchItem } from '../search-item/search-item';
import SearchItemStyles from '../search-item/search-item.module.scss';
import { useState, useEffect } from 'react';

export interface SearchMenuProps {
    className?: string;
    maxDisplayedItems?: number;
}

interface SkyblockItem {
    [key: string]: any;
    material?: string;
    skin?: string;
    name: string;
    tier?: string;
    // npc_sell_price?: number;
    id: string;
}

const textDecoder = new TextDecoder("utf-8")

export const SearchMenu = ({ className, maxDisplayedItems }: SearchMenuProps) => {
    const [data, setData] = useState<SkyblockItem[]>([]);
    const [bukkit, setBukkit] = useState<any>({});
    useEffect(() => {
        async function fetchData() {
            const itemsResponse: any = await fetch('https://api.hypixel.net/resources/skyblock/items');
            const itemsData: any = await itemsResponse.json();
            setData(itemsData["items"]
                .map((item: SkyblockItem) => {
                    const modifiedName = item.name.replace(/§./gi, "").replace(/%%.+%%/gi, "");
                    return { ...item, name: modifiedName }
                })
                .sort((a: SkyblockItem, b: SkyblockItem) => a.id.localeCompare(b.id)));

            const bukkitResponse: any = await fetch('/src/assets/BukkitToVanilla.json');
            const bukkitData: any = await bukkitResponse.json();
            setBukkit(bukkitData);
        }
        fetchData();
    }, []);

    const [items, setItems] = useState<SkyblockItem[]>(data)
    // useEffect(() => {
    //     setItems(data);
    // }, [data])

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

    return (
        <div className={styles.root + " " + className}>
            <div>
                <input
                    placeholder="Search for an item..."
                    className={styles.searchInput}
                    onChange={filterItems}
                />
                <ul className={styles.searchList}>{
                    items.map((item: SkyblockItem, i: number) => {
                        let image = undefined;
                        // if(item.material == "SKULL_ITEM") {
                        //     console.log(JSON.parse(atob(item.skin ?? "")))
                        // }

                        // console.log(item.matierial == "SKULL_ITEM")
                        // console.log(item.material == "SKULL_ITEM")

                        if (item.skin) {
                            // const decoded = Buffer.from((item.skin ?? ""), 'base64'); // Only works in node.js
                            const decoded = window.atob(item.skin ?? ""); // Only works in web browser
                            image =
                                'https://mc-heads.net/head/' +
                                JSON.parse(decoded).textures.SKIN['url'].split('texture/')[1];
                        }
                        else {
                            image =
                                'https://assets.mcasset.cloud/1.8.9/assets/minecraft/textures/items/' +
                                (item['material'] ?? '').toLowerCase() +
                                '.png';
                        }

                        return (
                            <SearchItem
                                itemName={item.name}
                                image={image}
                                key={'item_' + i}
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