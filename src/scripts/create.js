const fs = require("fs");
// we need this to execute the code command line
const exec = require('child_process').exec;
// we get the componenet name from the command line, the first value is "node", the second is the
// file path, the rest of the values are the arguments
let component = process.argv[2];
// first we read the template file content
fs.readFile( "./src/components/template.html", 'utf8', function( err, source ) {
    if ( err ) return console.error(err);
    const content = source.replace(/COMPONENT_NAME/g, component);
    // if we have another compoenets with the same name we throw an error, we don't want to override
    if (fs.existsSync(`./src/components/${component}.html`)) {
        return console.error(`${component}.html already exist, use another name`);
    }
    // we create the file and write the content to it
    fs.writeFile( `./src/components/${component}.html`, content, function( err ) {
        if ( err ) {
            return console.error(`there is a problem in creating ${component} compoenet, error is:\n ${err}`);
        } else {
            fs.writeFile( `./src/assets/sass/components/${component}.scss`, content, function( err ) {
                if ( err ) {
                    return console.error(err);
                } 
            })
            console.log(`${component} was created!`);
            // this step will work if you have visual studio code editor and the cli package
            // you can install the pacakge from View->Command Palette->Shell command: install "code" command in path
            // we open our new file, -r is so it opens in the same window, -g and :14:13 is for it to go to line 14 column 13
             exec(`code -r ./src/assets/components/${component}.scss`, function(err) {
                if (err) return console.error(err)
            })
            exec(`code -r -g ./src/components/${component}.html:14:13`, function(err) {
                if (err) return console.error(err)
            })
        }
    })
})

