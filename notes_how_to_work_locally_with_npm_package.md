# How to locally use a npm package

- `cd` in to the local npm package
- `npm link`
- this installs the package globally from that directory
- `npm list -g --depth=0` will show it. 
- add option `--link=true` to only show packages added by `npm link`
- if you to remove this package just uninstall it `npm uninstall -g your-package-name`
- it got the package name from your packages `package.json`
- now `cd` to where you want to use this package
- and install it by doing `npm link your-pacakge-name`
- this will install the package as if you had done `npm i your-package-name`. but we did `npm link` instead so it just linked to where it was globally
- we can now do `npm list` and see that the package was installed and that it was installed from local path