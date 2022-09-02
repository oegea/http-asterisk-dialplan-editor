const DEFAULT_FILE_CONTENT = `[public]
exten => norris,1,Goto(marcanorris,100,1)

[numeronodisponible]
exten => 0,1,Festival('Su llamada no ha podido ser atendida.')
exten => 0,2,Festival('Pruebe a intentarlo mas tarde.')
exten => 0,3,Hangup()

[conferencias]
exten => 10,1,Festival('Bienvenido al servicio de conferencias')
exten => 10,2,Festival('Este servicio permite a mas de dos personas unirse a una sala de conferencias y mantener una conversacion de forma simultanea')
exten => 10,3,Festival('Existen tres salas de conferencias. Marque un numero del uno al tres para elegir su sala.', '1,2,3')
exten => 10,4,WaitExten(10,'1,2,3')
exten => 10,5,Festival('No se ha detectado ninguna marcacion. Por favor vuelva a intentarlo mas tarde')
exten => 10,6,Hangup()

exten => 1,1,ConfBridge(1)
exten => 2,1,ConfBridge(2)
exten => 3,1,ConfBridge(3)`

const EDITED_FILE_CONTENT = `[public]
exten => norris,1,Goto(marcanorris,100,1)

[numeronodisponible]
exten => 0,1,Festival('Su llamada no ha podido ser atendida.')
exten => 0,2,newCommand()
exten => 0,3,Hangup()

[conferencias]
exten => 10,1,Festival('Bienvenido al servicio de conferencias')
exten => 10,2,Festival('Este servicio permite a mas de dos personas unirse a una sala de conferencias y mantener una conversacion de forma simultanea')
exten => 10,3,Festival('Existen tres salas de conferencias. Marque un numero del uno al tres para elegir su sala.', '1,2,3')
exten => 10,4,WaitExten(10,'1,2,3')
exten => 10,5,Festival('No se ha detectado ninguna marcacion. Por favor vuelva a intentarlo mas tarde')
exten => 10,6,Hangup()

exten => 1,1,ConfBridge(1)
exten => 2,1,ConfBridge(2)
exten => 3,1,ConfBridge(3)`

module.exports = {
    DEFAULT_FILE_CONTENT,
    EDITED_FILE_CONTENT
}