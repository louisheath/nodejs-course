### nvm

Node versions always change. Node Version Manager lets us use switch between multiple versions.

### npm versioning

The carrot `^` symbol will take the latest version as long as it is of the same major version. This means a project saved as `^4.13.3` may be created with any version `4.xx.x` if installed in a new environment.

The tilda `~` is similar but only ignores the minor version. `^4.13.3` -> `^4.13.x`.

No prefix enforces that exact package version. 

### npm config

Npm can be configured by adding a config file `.npmrc` to the %HOME% directory.

`save-exact=true` will prevent any versioning prefixes as explained above

`save=true` will add --save to all package installations by default