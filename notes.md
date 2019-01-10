## Node and Package Versioning

node is a runtime environment for js, like the console in browser. window -> global, document -> process.

### nvm

Node versions always change. Node Version Manager lets us use switch between multiple versions.

### npm versioning

When using `npm install`, npm will check `package.json` for any rules on what version to use. These versions can be prefixed to allow flexibility.

The carrot `^` symbol will take the latest update of that major version. This means a config stating `^4.13.3` may be result in the installation of version `4.xx.x`.

The tilda `~` is similar but only ignores the minor version. `^4.13.3` -> `^4.13.x`.

No prefix enforces that exact package version. 

You can install a specific version with `npm install package@4.13.3`

### npm config

Npm can be configured by adding a config file `.npmrc` to the $HOME$ directory.

`save-exact=true` will prevent any versioning prefixes as explained above

`save=true` will add --save to all package installations by default

### require

In node.js we import packages using `require()` rather than ES6's `import x from module y`.

## Express

Express provides functionality similar to @RequestMapping in Spring.

After requiring the package, we use `var app = express();`. Mappings and listeners are created via methods of this object.

Express automatically detects the content type of basic responses.

'middleware' can be used for authentication, amongst other things. When requests come in they are first evaluated on the middleware functions before they reach the end point.

### serving pages

Request mappings are handled with a callback, which takes two parameters `(req, res)`. We can send a page in response as follows:

`res.sendFile(__dirname + '/views/index.html')`

However this is error prone and not cross-platform, so we require and use the inbuilt `path` package.

`res.sendFile(path.join(__dirname, '/views/index.html')` or
`res.sendFile(path.join(__dirname, 'views', 'index.html')`

### Routing

Rather than defining all routes in one large controller, we can make modules by using the `Express.Router()`.

This router can then be imported and applied to the app.

```
const bookRoutes = require('./src/routes/bookRoutes');

app.use('/books', bookRoutes);
```

### Receiving POST data

`body-parser` package attaches a body property to the req object, containing nicely formatted JSON data.

## Debugging Utilities

### chalk

Chalk allows us to set colours on our console logs.

### debug

Logs produced via `debug()` are only printed to console if the application is being run in debug mode.

Windows: `set DEBUG=* & node app.js` (this cannot be done in VSCode's terminal)

Mac: `DEBUG=* node app.js`

Express itself also uses debug. To only listen to debugs from one app, use `DEBUG=app`

When importing debug we define which application the debugs are logged as coming from. `require('debug')('app);`

### inspect

`node inspect app.js` allows us to step through code. `list(10)` prints the ten lines above and below the current line of execution. `n` or `next` will step along line by line. `repl` lets us access and modify the state of the app, like the chrome console. `c` for continue to next breakpoint. use `debugger;` in the code to make breakpoints. can be used with `nodemon`.

### chrome dev tools

`node --inspect-brk app.js` to start, then go to `chrome://inspect` in chrome to see debug. Click `open DevTools for Node`. Same functionality but better UI. Can add breakpoints as you go.

### morgan

Morgan logs network request information.

In addition to requiring it, we must add it to our express app. `app.use(morgan('tiny'))`.

Morgan takes a parameter which determines the detail of the logs. E.g. 'tiny', 'combined', ..

### ESLint

Catches our mistakes.

Enforces code standards - fixes can sometimes be automated with `--fix`

Checks that you have the correct packages in your package.json file.

### Nodemon

Relaunches server on file change, and lets us set up environment variables

## Templating Engines

These packages are a lot like Thymeleaf, in that we insert variables for rendering. They do not provide the dynamicism of React or Angular.

```
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    // template properties
  });
});
```

### Pug

Almost overly simple - removes the need for closing in HTML, relying on indentation.

Probably only clean for less complex applications.

### EJS

Uses Javascript syntax to give control to the template

### Handlebars

`hbs` for express. Standard html but inject variables with {{title}}

## More npm packages

### yargs

allows us to more easily retrieve arguments from the command line, as well as provide help docs for each command and its required params. we chain the `command(cmd, descr, options)` method to configure commands, and follow with the `help()` method to enable the help flag.

## Static Files

### Public Directory

We can serve libraries from `/public` rather than fetching them from a CDN. This allows us to run our server offline.

We tell express to serve this folder with the following line:

`app.use(express.static(path.join(__dirname, '/public')));`

Then any files added to the template are relative to the public directory, for example:

`href="css/bootstrap.min.css"`

### Serving libraries from Node_Modules

Public directories can be a pain for libraries such as Bootstrap or jQuery, as they are fiddly to update.

Instead of serving static files *only* from the public directory, we can tell express to serve certain files within `node_modules`.

`app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));`

This directs the template towards more destinations if the file cannot be found in the public directory. In this case, this directory will only be searched when finding files prefixed with `/src`.

## Testing

### Mocha

is damn fine. `it('should be working')`.

`mocha **/*.test.js` or `nodemon --exec mocha **/*.test.js`.

Use `done()` to test async functions.

Use `decribe()` to group tests together.

### Expect

gives us nice assertions.

Also gives us spies, which for example let us check if functions are called with the correct arguments.

This lets us break down the testing of functions which call other functions, letting us narrow down which function is faulty.

### Rewire

Replaces the `require()` module importing process. This gives us control over the import methods so that we can swap out function calls with spies.

### Supertest

for express apps. lets us test endpoints

## MongoDB

NoSQL db - collections of documents, which contain fields.

Each document gets a uniquely generated id. 12 Bytes. Made up of a time stamp, the process id, a counter and a random number. We can retrieve this data from the key to inform us of when and by whom the document was stored by.

### Mongoose

Provides ORM - Object Relational Mapping. 'Classes' for our documents, validation and defaults.

We can add methods to a class schema. 'methods' are non-static, 'statics' are static.

We can add middleware to our database queries too. For example to salt passwords before saving them. 

## Other

### Heroku

push a subfolder to heroku with 

`git subtree push --prefix subfolder heroku master`

use `heroku logs --tail` to see logs as they come in

### Keyboard Shortcuts

Highlight text and hit Cmd+fn+F2 to select and simultaneously edit all identical strings within file.

Visual studio provides 'Format Document' on right click. So for example you can change indentation type, reformat and it is all sorted.

### Hashing

We need to hash our passwords so they're safe.

SHA256 obj from `crypto-js` is handy for making hashes. Or we can use `jsonwebtoken` to handle tokens and deal with verification for us.