const fs = require('fs-extra')

module.exports = welcome = async (client, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pp = await client.getProfilePicFromServer(event.who)
            const sts = await client.getStatus(event.who)
            const namae = await pChat.formattedName
            const capt = `MEMBER BARU DI GROUP\n*${name}*\n============================\nUser : ${namae}\nStatus : ${sts.status}\n============================\nSelamat bergabung dan semoga betah`
            if (pp == '' || pp == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false', 'profile.jpg', capt)
                return;
            } else {
                await client.sendFileFromUrl(event.chat, pp, 'profile.jpg', capt)
                return;
            }
        }
    } catch (err) {
        console.log(err)
    }
}