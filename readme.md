# Skyblock item list and search

Built with React, TypeScript + SWC and Sass, using Vite

### Available Scripts

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