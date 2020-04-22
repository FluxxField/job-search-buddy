# Job Search Buddy

* React
* Redux
* TypeScript
* Webpack
* Babel
* SASS
* Node / Express
* ESLint - Airbnb Style guide

## File Structure

There are 3 different package.json files in the repo. There is the:
* Root package.json - This is the top-most package.json. If a dependency will be used on the client side and server side, install it here
* Client package.json - This package.json file is in the client folder. Install dependencies here that are only used for the client side
* Server package.json - This package.json file is in the server folder. Install dependencies here that are only used for the server side

## Starting the repo

From the Root of project folder run:

`npm start`

This will run the script:

`npm i & cd client & npm i & cd ../server & npm i && cd ..`

The script will run `npm install` in every folder, installing all of the dependincies.

Next:

`cd client`

`npm run build`

This will run webpack and create a bundle.js in the client/public folder.
Then, open up a new terminal and navigate to the server folder and run

`npm start`

This will start the server. At this point you should have two terminals open. One running the webpack compiler and one running the server.

Open up your browser of choice and go to the url: `localhost:3000`

You should see 'React App!' on the page! if so, then you did everything correctly!

## Packages
### Path
* path // Used in the webpack.config.js and the server.js files

### ESLint
* eslint // Plugins to allow for TypeScript to be used with ESLint
* eslint-config-airbnb
* eslint-plugin-import
* eslint-plugin-jsx-a11y
* eslint-plugin-react
* eslint-plugin-react-hooks
* @typescript-eslint/eslint-plugin
* @typescript-eslint/parser
