import styles from './App.module.scss';
import { SearchMenu } from './components/search-menu/search-menu';

function App() {
    return (
        <div className={styles.App}>
            <h1>Skyblock Item Search</h1>
            <SearchMenu maxDisplayedItems={25} />
        </div>
    );
}

export default App;