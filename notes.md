## Node and Package Versioning

### nvm

Node versions always change. Node Version Manager lets us use switch between multiple versions.

### npm versioning

When using `npm install`, npm will check `package.json` for any rules on what version to use. These versions can be prefixed to allow flexibility.

The carrot `^` symbol will take the latest update of that major version. This means a config stating `^4.13.3` may be result in the installation of version `4.xx.x`.

The tilda `~` is similar but only ignores the minor version. `^4.13.3` -> `^4.13.x`.

No prefix enforces that exact package version. 

You can install a specific version with `npm install package@4.13.3`

### npm config

Npm can be configured by adding a config file `.npmrc` to the %HOME% directory.

`save-exact=true` will prevent any versioning prefixes as explained above

`save=true` will add --save to all package installations by default

### require

In node.js we import packages using `require()` rather than ES6's `import x from module y`.

## Express

Express provides functionality similar to @RequestMapping in Spring.

After requiring the package, we use `var app = express();`. Mappings and listeners are created via methods of this object.

### serving pages

Request mappings are handled with a callback, which takes two parameters `(req, res)`. We can send a page in response as follows:

`res.sendFile(__dirname + '/views/index.html')`

However this is error prone and not cross-platform, so we require and use the inbuilt `path` package.

`res.sendFile(path.join(__dirname, '/views/index.html')` or
`res.sendFile(path.join(__dirname, 'views', 'index.html')`

## Debugging Utilities

### chalk

Chalk allows us to set colours on our console logs.

### debug

Logs produced via `debug()` are only printed to console if the application is being run in debug mode.

Windows: `set DEBUG=* & node app.js` (this cannot be done in VSCode's terminal)

Mac: `DEBUG=* node app.js`

Express itself also uses debug. To only listen to debugs from one app, use `DEBUG=app`

When importing debug we define which application the debugs are logged as coming from. `require('debug')('app);`

### morgan

Morgan logs network request information.

In addition to requiring it, we must add it to our express app. `app.use(morgan('tiny'))`.

Morgan takes a parameter which determines the detail of the logs. E.g. 'tiny', 'combined', ..

## Static Files

### Public Directories

We can serve libraries from `/public` rather than fetching them from a CDN. This allows us to run our server offline.

We tell express to serve this folder with the following line:

`app.use(express.static(path.join(__dirname, '/public')));`

Then any files added to the template are relative to the public directory, for example:

`href="css/bootstrap.min.css"`

### Using Node Modules

Public directories can be a pain for libraries such as Bootstrap or jQuery, as they are fiddly to update.

Instead of serving static files *only* from the public directory, we can tell express to serve certain files within `node_modules`.

`app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));`

This directs the template towards more destinations if the file cannot be found in the public directory. In this case, this directory will only be searched when finding files prefixed with `/src`.