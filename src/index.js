require('dotenv').config()
const express = require('express')
const app = express()

const asteriskRepository = (
  process.env.ENVIRONMENT !== 'production'
) ? require('./fixtures/asteriskConfigMockRepository.js')
: require('./infrastructure/asteriskConfigRepository.js')


app.get('/:context/:extension/:priority/:command', async (req, res) => {
    const {context, extension, priority, command} = req.params
    const {editAsteriskConfig} = require('./domain/asteriskConfigLineEditor.js')

    try {
      const result = await editAsteriskConfig(asteriskRepository, {
        context, extension, priority, command
      })
  
      console.log(`[${new Date().toISOString()}] -> HTTP GET /${context}/${extension}/${priority}/${command} -> ${result} `)
      res.status(200).json({success: result})
    } catch (result) {
      console.log(`[${new Date().toISOString()}] -> HTTP GET /${context}/${extension}/${priority}/${command} -> ${result} `)
      res.status(500).json(result)
    }

})

app.listen(process.env.PORT, process.env.NETWORK_INTERFACE, () => {
  console.log(`[${process.env.ENVIRONMENT}] http-asterisk-dialplan-editor is running and listening on ${process.env.NETWORK_INTERFACE}:${process.env.PORT}`)
})