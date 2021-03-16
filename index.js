const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const left = require('./lib/left')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = (client = new Client()) => {
    console.log('[SERVER] Server Started!')
    // Force it to keep the current session
    client.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT') client.forceRefocus()
    })
        // listening on message
        client.onMessage( async (message) => {
            client.getAmountOfLoadedMessages()
                .then((msg) => {
                    if (msg >= 3000) {
                        console.log('[CLIENT]', `Loaded Message Reach ${msg}, cuting message cache...`)
                        client.cutMsgCache()
                    }
                })
            await msgHandler(client, message)
        })

        client.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(client, heuh)
            await left(client, heuh)
            }))
        
        // client.onAddedToGroup(async (chat) => {
        //     if(chat.id != "6283174042679@c.us"){
        //     await client.sendText(chat.id, "Maaf bot tidak bisa diculik. Hanya owner bot(Zebri Junitu) yang bisa menculik sesuka hati")
        //    await client.leaveGroup(chat.id)
        //     client.deleteChat(chat.id)
        //     }
        //     }
        // )

        client.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) client.sendSeen(to)
        }))

        // listening on Incoming Call
        client.onIncomingCall(( async (call) => {
            await client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
            .then(() => client.contactBlock(call.peerJid))
        }))
        
        client.darkMode(true)

    }
create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))