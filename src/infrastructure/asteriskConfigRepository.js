const fs = require('fs');
const { exec } = require("child_process");

module.exports = {
    getConfiguration: () => {
        return new Promise((resolve) => {
            fs.readFile(process.env.ASTERISK_CONFIG_PATH, 'utf8', (err, data) => {
  
                if (err){
                    console.dir(err)
                    resolve(null)
                }
                      
                resolve(data)
            })
        });
    },

    saveConfiguration: async (newContent) => {
        return new Promise((resolve) => {
            fs.writeFile(process.env.ASTERISK_CONFIG_PATH, newContent, () => {
                exec(process.env.ASTERISK_RESTART_COMMAND)
                resolve(true)
            })
        });
    }
}