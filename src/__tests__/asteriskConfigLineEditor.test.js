const asteriskConfigMockRepository = require('../fixtures/asteriskConfigMockRepository.js')
const {editAsteriskConfig} = require('../domain/asteriskConfigLineEditor.js')
const {DEFAULT_FILE_CONTENT, EDITED_FILE_CONTENT} = require('../fixtures/fileConfig.js')

describe('when an existing context, extension and priority is edited', () => {

    let initialFileContent = ''

    beforeEach(async () => {
        asteriskConfigMockRepository.saveConfiguration(DEFAULT_FILE_CONTENT)
        initialFileContent = await asteriskConfigMockRepository.getConfiguration()
    })

    it('should edit and save the config content as expected', async () => {
        const result = await editAsteriskConfig(asteriskConfigMockRepository, {
            context: 'numeronodisponible', 
            extension: '0', 
            priority: '2', 
            command: 'newCommand()'
        })
        const editedFileContent = await asteriskConfigMockRepository.getConfiguration()

        expect(initialFileContent).toBe(DEFAULT_FILE_CONTENT)
        expect(result).toBe(true)
        expect(editedFileContent).toBe(EDITED_FILE_CONTENT)
    })


    it('should make no modifications if no valid context, extension or priority is passed', async () => {
        const result = await editAsteriskConfig(asteriskConfigMockRepository, {
            context: 'nonExistingContext', 
            extension: '0', 
            priority: '2', 
            command: 'newCommand()'
        })
        const editedFileContent = await asteriskConfigMockRepository.getConfiguration()

        expect(initialFileContent).toBe(DEFAULT_FILE_CONTENT)
        expect(result).toBe(true)
        expect(editedFileContent).toBe(DEFAULT_FILE_CONTENT)
    })
})