# Retrato de la desigualdad

## Getting started

### Requirements
[Node v4+](http://nodejs.org/)  
[NPM 2+](http://npmjs.org/)  

[GruntJS](http://gruntjs.com/getting-started) is required to compile client scripts (ONLY for DEV since are already compiled).  
If you have not installed the client yet run:  
```bash
npm install -g grunt-cli
grunt --version
```

### Install project dependencies (DEV):
Now install dependecies of this repo:
```bash
npm install
```

### Install project dependencies (PROD):
```bash
npm install --production
```
For a complete guide of Production installation follow [this wiki]()

### Configuration  
* Copy `config.json.sample` to `config.json` and edit your configs (follow the  instructions in the json file).
* Copy `data.json.sample` to `data.json` and edit your data related configurations (follow the  instructions in the json file).

### Start Server
```bash
npm start
```

### Compile client (DEV)
```bash
grunt
```

Watching files for changes:
```bash
grunt w
```

## Project overview
Client is compiled with Grunt using Browserify and Babel 2015. Client source is built with React and Flux, making requests to Server using Superagent.  

Server exposes an API to access seccions and articles from a  Newscoop instance (caching them to Filesystem as JSON files).  

**API endpoints (only GET):**
* `http://your_host/sections` Retrieve all sections cached or from Newscoop API if is first fetch.
* `http://your_host/sections/:section/articles` Retrieve all articles for a section (by number) cached or from Newscoop API if is first fetch.

**Cache clean:**
* `http://your_host/cache` Using the password at your `config.json`

**Metadata builder:**
* `http://your_host/metadata` Used to create more data in an article understood by the app but not shown as a body article.

### Directories
* `/grunt`: grunt tasks configuration
* `/public`: public directory for client compilations, from where they are serve as static files
* `/client`: Source files for the client application
* `/lib`: directory of server code, like Express webserver, routes, cache, etc.
* `/views`: directory for server views (made with Handlebars).
* `/cache`: JSON files used to cache the data retrieved from Newscoop instance

### Tecnologies and libraries used  
* WebServer with [ExpressJS](http://expressjs.com/)
* Server views with [Handlebars](http://handlebarsjs.com/)
* ECMAScript 2015 with [BabelJS](https://babeljs.io/)
* [React](https://facebook.github.io/react/) with [flux](https://facebook.github.io/flux/docs/overview.html) architecture
* CSS Styles with [SASS](http://sass-lang.com/) and [Susy](http://susy.oddbird.net/)
* All of these compiled with [GruntJS](http://gruntjs.com/)
