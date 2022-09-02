const fs = require('fs');
const { exec } = require("child_process");

module.exports = {
    getConfiguration: () => {
        return new Promise((resolve, reject) => {
            fs.readFile('/etc/asterisk/extensions.conf ', 'utf8', (err, data) => {
  
                if (err){
                    console.dir(err)
                    resolve(null)
                }
                      
                resolve(data)
            })
        });
    },

    saveConfiguration: async (newContent) => {
        return new Promise((resolve, reject) => {
            fs.writeFile('/etc/asterisk/extensions.conf', newContent, () => {
                exec("service asterisk reload")
                resolve(true)
            })
        });
    }
}