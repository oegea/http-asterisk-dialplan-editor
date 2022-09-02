const express = require('express')
const app = express()
// Do not expose this over the internet
const networkInterface = '127.0.0.1'
const port = 3000

const ENV = 'pro'

app.get('/:context/:extension/:priority/:command', async (req, res) => {
    const {context, extension, priority, command} = req.params

    const asteriskConfigMockRepository = ENV === 'test' ? require('./fixtures/asteriskConfigMockRepository.js') : require('./infrastructure/asteriskConfigRepository.js')
    const {editAsteriskConfig} = require('./domain/asteriskConfigLineEditor.js')

    try {
      const result = await editAsteriskConfig(asteriskConfigMockRepository, {
        context, extension, priority, command
      })
      
  
      res.status(200).json({success: result})
    } catch (result) {
      res.status(500).json(result)
    }

})

app.listen(port, networkInterface, () => {
  console.log(`http-asterisk-dialplan-editor is running and listening on ${networkInterface}:${port}`)
})