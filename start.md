Received message. You can create a React app with Vite, TypeScript, SCSS and CSS modules by running the following command:

```bash
npm init vite@latest my-react-app --template react-ts
```

This will create a new React app with TypeScript support and you can add SCSS and CSS modules support by installing the following dependencies:

```bash
npm install --save-dev sass
npm install --save-dev sass-loader
npm install --save-dev css-modules-typescript-loader
```

After installing these dependencies, you can import your SCSS files in your React components like this:

```javascript
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World!</h1>
    </div>
  );
}

export default App
```