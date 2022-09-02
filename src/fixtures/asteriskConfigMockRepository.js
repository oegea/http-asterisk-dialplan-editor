let fileContent = require('./fileConfig.js').DEFAULT_FILE_CONTENT

module.exports = {
    getConfiguration:  () => Promise.resolve(fileContent),

    saveConfiguration: (newContent) => {
        fileContent = newContent
        return Promise.resolve(true)
    }
}