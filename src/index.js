const express = require('express')
const app = express()
// Do not expose this over the internet
const interface = '127.0.0.1'
const port = 3000

const ENV = 'test'

app.get('/:context/:extension/:priority/:command', async (req, res) => {
    const {context, extension, priority, command} = req.params

    const interface = ENV === 'test' ? require('./asteriskMockInterface.js') : require('./asteriskInterface.js')

    // Get the configuration file content
    const configContent = await interface.getAsteriskConfiguration()

    // Split by lines
    const contextContent = configContent.split(`\n`)

    // Iterate
    let inContext = false
    let resultBuffer = ''
    for (let i = 0; i < contextContent.length; i++) {
      const line = contextContent[i]
      // If we are in the desired context
      if (line.includes(`[${context}]`)){
        inContext = true
      }

      if (inContext && line.includes(`exten => ${extension},${priority}`)) {
        inContext = false
        resultBuffer += `exten => ${extension},${priority},${command}\n`
      } else {
        resultBuffer += `${line}\n`
      }
    }

    res.send(`${resultBuffer}`)
})

app.listen(port, interface, () => {
  console.log(`Example app listening on port ${port}`)
})