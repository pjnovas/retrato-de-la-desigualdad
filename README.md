# Un retrato de la desigualdad

[Spanish]  
El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015. El resultado, que confirma que la expresión popular “del Salvador del Mundo para abajo” acierta al aludir a dos mundos determinados por el nivel de ingresos, da luz sobre el acceso al ocio y la cultura de los jóvenes salvadoreños, probablemente también condicionado por la inseguridad.

[English]  
For some people, El Salvador could be a big prison. The results shown in this interactive maps are the results of an experiment with 24 young people of the metropolitan area of San Salvador. They agreed to be followed, via an app, 24 hours a day during October 2015. “From El Salvador del Mundo to downtown” is a very popular expression to refer to the people who never go to the fancy part of the capital. The results of this experiment validate this saying and shows that this city has two different worlds: the ones who have access to culture and leisure and the ones who don’t; all this is determined, in big part, to the security crisis that El Salvador is suffering.

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
For a complete guide of Production installation follow [this wiki](../../wiki/Installation-for-Production-enviroment)

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

### Compile client (PROD)
This command will minify the JS and CSS files
```bash
grunt min
```

## Project overview
Client is compiled with Grunt using Browserify and Babel 2015. Client source is built with React and Flux, making requests to Server using Superagent.  

Server exposes an API to access seccions and articles from a  Newscoop instance (caching them to Filesystem as JSON files).  

**API endpoints (only GET):**
* `http://your_host/articles/methodology` Retrieve Methodology section articles
* `http://your_host/articles/publishers` Retrieve Publishers section articles
* `http://your_host/articles/testimonials` Retrieve Testimonials section articles
* `http://your_host/articles/places` Retrieve Places section articles

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
