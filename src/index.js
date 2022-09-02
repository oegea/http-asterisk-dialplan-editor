const express = require('express')
const app = express()
// Do not expose this over the internet
const interface = '127.0.0.1'
const port = 3000

const ENV = 'pro'

app.get('/:context/:extension/:priority/:command', async (req, res) => {
    const {context, extension, priority, command} = req.params

    const interface = ENV === 'test' ? require('./infrastructure/asteriskConfigMockRepository.js') : require('./infrastructure/asteriskConfigRepository.js')
    const {editAsteriskConfig} = require('./domain/asteriskConfigLineEditor.js')

    try {
      const result = await editAsteriskConfig(interface, {
        context, extension, priority, command
      })
      
  
      res.status(200).json({success: result})
    } catch (result) {
      res.status(500).json(result)
    }

})

app.listen(port, interface, () => {
  console.log(`Example app listening on port ${port}`)
})