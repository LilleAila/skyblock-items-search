import styles from './search-item.module.scss';

export interface SearchItemProps {
    className?: string;
    itemName: string;
    image?: string;
}

export const SearchItem = ({ className, itemName, image }: SearchItemProps) => {
    return (
        <div className={styles.root + " " + className}>
            <li className={styles.itemListItem}>
                {itemName}
                {image != "" && (<img
                    src={image}
                    className={styles.itemImage}
                />)}
            </li>
        </div>
    );
};