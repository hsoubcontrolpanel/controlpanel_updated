const fs = require("fs");
// we need this to execute the code command line
const exec = require('child_process').exec;
// we get the componenet name from the command line, the first value is "node", the second is the
// file path, the rest of the values are the arguments
const component = process.argv[2];
// first we read the template file content
fs.readFile( "./src/components/template.html", "utf8", (err, source) => {
    if ( err ) return console.error(err);
    const content = source.replace(/COMPONENT_NAME/g, component);
    // if we have another compoenets with the same name we throw an error, we don't want to override
    if (fs.existsSync(`./src/components/${component}.html`)) {
        return console.error(`${component}.html already exist, use another name`);
    }
    // we create the file and write the content to it
    fs.writeFile( `./src/components/${component}.html`, content, (err) => {
        if ( err ) return console.error(`there is a problem in creating ${component}.html`);
        else {
            fs.writeFile( `./src/assets/sass/components/${component}.scss`, content, (err) => {
                if ( err )  return console.error(`there is a problem in creating ${component}.sass`);
            })
            console.log(`${component} was created!`);
            // this step will work if you have visual studio code editor and the cli package
            // you can install the pacakge from View->Command Palette->Shell command: install "code" command in path
            // we open our new file, -r is so it opens in the same window
            exec(`code -r ./src/components/${component}.html`, (err) => {
                if (err) return console.error(err)
            })
            exec(`code -r ./src/assets/components/${component}.scss`, (err) => {
                if (err) return console.error(err)
            })
        }
    })
})

