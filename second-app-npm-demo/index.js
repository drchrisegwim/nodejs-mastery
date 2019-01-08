//NPM is a command line tool and a third party registery we can add to our apps.

// before you add any node packages to your app, you need to create a file called package.json. This file is basically a json file that includes info about your app such as its name, version, etc.

// To create the package.json file then run "npm init".

// Every node module has package.json

// Now to use the intalled underscore we do the following:

var _ = require('underscore'); // Here node will first check for the "underscore" in the Core module, File or Folder and finally node_module in that other.

var result = _.contains([2, 1, 3], 2);
console.log(result);