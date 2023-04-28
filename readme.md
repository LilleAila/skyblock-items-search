# Skyblock item list and search

Built with React, TypeScript + SWC and Sass, using Vite

## Contributing

Clone this repository with `git clone https://github.com/LilleAila/skyblock-items-search.git`, and run `npm install` to install required development packages.\
Change what you want in `src` and `src/components`, and open a pull request on GitHub.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Build the application in production mode into a folder named `dist`. This folder can be served using any HTTP server.

### `npm run dev`

Start dev server.\
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in the browser.

### `npm run preview`

Boots up a local static web server that serves the files from dist at [`http://localhost:4173`](http://localhost:4173) . It's an easy way to check if the production build looks OK in your local environment.

### `npm run deploy`

Build the application in production mode into the `dist` folder, and pushes it to a branch called `gh-pages`. Github pages will need to be set up with that branch for this to work, and the `homepage` field in `package.json` and the `base` field in vite.config.ts had to be updated.

## Background

This project was built using Vite, React, SCSS and CSS Modules.\
The commands used to create this project are below:
### To create an app with vite, run the following command:

```bash
npm init vite@latest my-react-app --template react-ts
```
Choose `React`, and then choose `TypeScript` or `TypeScript - SWC`.\
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