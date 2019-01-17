//NPM is a command line tool and a third party registery we can add to our apps.

// before you add any node packages to your app, you need to create a file called package.json. This file is basically a json file that includes info about your app such as its name, version, etc.

// To create the package.json file then run "npm init".

// Every node module has package.json

// Now to use the intalled underscore we do the following:

var _ = require('underscore'); // Here node will first check for the "underscore" in the Core module, File or Folder and finally node_module in that other.

var result = _.contains([2, 1, 3], 2);
console.log(result);

// It not good to include your node_module to svc because of it size usually. So ignore it in your commit and use the command "npm i" to reinstall it each time //#endregion
// There is what is called semantic versioning (SemVer) on our package.json file that indicates that the first digit the left is Major.Minor.Patch
// Patch no indicate bug releases
// Minor no indicate new feature that doesnt break the exiting API.
// major indicate a new feature that can break an exiting application that depends upon exiting version. 
// This "^" know as Caret character tells npm that we are interested in any version as long as the Major version is as indicated in the Major. Aslo same as eg 4.x.
// Also we can see "~" called Tilde which implies as long as is major and minor versions are as indicated. also same as ge. 1.8.x  

const add = require('emeksense-lib');
var result = add.add(2, 4);
console.log(result);