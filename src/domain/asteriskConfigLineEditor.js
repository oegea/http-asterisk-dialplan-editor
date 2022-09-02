module.exports = {
    editAsteriskConfig: async (
        dependencies,
        {
            context, extension, priority, command
        }
    ) => {
        const {getConfiguration, saveConfiguration} = dependencies
        // Get the configuration file content
        const configContent = await getConfiguration()

        if (configContent === null)
        {
            throw {success: false}
        }

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
                resultBuffer += `exten => ${extension},${priority},${command}`
            } else {
                resultBuffer += `${line}`
            }

            resultBuffer += (i < contextContent.length-1) ? '\n' : ''
        }

        const result = await saveConfiguration(resultBuffer)
        return result
    }
}