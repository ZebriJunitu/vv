const fs = require('fs-extra')

module.exports = left = async (client, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && isLeft) {
            const lChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = lChat
            const ppi = await client.getProfilePicFromServer(event.who)
            const sts = await client.getStatus(event.who)
             const namae = await pChat.formattedName
            const capti = `MEMBER YANG OUT/REMOVED DARI GROUP *${name}*\n============================\nUser : ${namae}\nStatus : ${sts.status}\n============================\nSEMOGA TENANG. LATOM 🙏🙏🙏`
            if (ppi == '' || ppi == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', 'profile.jpg', capti)
                return;
            } else {
                await client.sendFileFromUrl(event.chat, ppi, 'profile.jpg', capti)
                return;
            }

        }
    } catch (err) {
        console.log(err)
    }
}

