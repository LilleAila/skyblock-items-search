import styles from './search-item.module.scss';
// import mcStyles from "./icons-minecraft.module.scss";
import mcStyles2 from "./icons-minecraft2.module.scss"

export interface SearchItemProps {
    className?: string;
    itemName: string;
    image?: string;
    icon?: string;
    glowing: string;
    itemId: string;
}

export const SearchItem = ({ className, itemName, image, icon }: SearchItemProps) => {
    return (
        <div className={((styles.root + " ") ?? "") + className}>
            <li className={styles.itemListItem}>
                {itemName}
                {(image != "" && icon == "") && (<img
                    src={image}
                    className={styles.itemImage}
                />)}
                {(icon) && (<i className={mcStyles2["icon-minecraft"] + " " + mcStyles2["icon-minecraft-" + icon]}></i>)}
                {/* {icon && (<div className={mcStyles["icon-32"] + " " + mcStyles["icon-size-64"] + " " + mcStyles[icon]}></div>)} */}
            </li>
        </div>
    );
};