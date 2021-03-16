//module eksternal
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
const fetch = require('node-fetch')
const get = require('got')
const sharp = require('sharp')
const ffmpeg = require('fluent-ffmpeg')
const moment = require('moment-timezone')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
moment.tz.setDefault('Asia/Jakarta').locale('id')
//module fitur
const { liriklagu, quotemaker, fb, sleep, jadwalTv, anime, Surah, corona, namaninja, getStickerMaker, ss, uploadImages, customText } = require('./lib/functions')
const { removeBackgroundFromImageUrl, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')
const { snk, donate, premium1, menu, menu1, menu2, menu3, menu4, menu5, menu6, menu7, menu8, listChannel, listsurah, bahasa, bahasatranslate } = require('./lib/help')
const gTTs = require('gtts')
const wav = require('node-wav')
const yts = require('yt-search')
const lewd = require('./lib/lewd')
const google = require('google-it')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const fetish = require('./lib/fetish')
const translatte = require('translatte')
const { gombal } = require('./lib/gombal');
const { yta, ytv } = require('./lib/y2mate')
const urlShortener = require('./lib/shortener')
const getLocationData = require('./lib/location')
const Utils = require('web-audio-api/build/utils')
const {tiktok, likee, twitter} = require('./lib/dl-video')
let info = fs.readFileSync('./settings/info.txt', {encoding: 'utf-8'});
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
//database
var mysql = require('mysql');
const say = JSON.parse(fs.readFileSync('./lib/say.json'))
let wel = JSON.parse(fs.readFileSync('./lib/welcome.json')) 
let simi = JSON.parse(fs.readFileSync('./lib/simsimi.json')) 
let nsfwgrp = JSON.parse(fs.readFileSync('./lib/nsfw.json')) 
let limit = JSON.parse(fs.readFileSync('./settings/limit.json'));
let muted = JSON.parse(fs.readFileSync('./settings/muted.json'));
const premium = JSON.parse(fs.readFileSync('./lib/premium.json'))
let banned = JSON.parse(fs.readFileSync('./settings/banned.json'));
const adminban = JSON.parse(fs.readFileSync('./lib/adminban.json'));
let setting = JSON.parse(fs.readFileSync('./settings/setting.json'));
let msgLimit = JSON.parse(fs.readFileSync('./settings/msgLimit.json'));
const msgLimit1 = JSON.parse(fs.readFileSync('./settings/msgLimit.json'));
let {banChats, mtc: mtcState, whitelist, ownerNumber, limitCount} = setting
var CreateMYSQL = mysql.createConnection(
    {host: "127.0.0.1", user: "root", password: "", database: "test", charset: 'utf8mb4'}
);

const responses = [
    'Adalah yoi',
    'True mint',
    'Mana gw tau, emang gw bapaknya?',
    'Se7',
    'o',
    'oh',
    'diem lu',
    'bacot',
    'iya lah',
    'kok gitu?',
    'Alhamdulillah',
    'Astaghfirullah',
    'kamu berdosa banget',
    'Jangan tanya gw lah',
    'Gak',
    'Ya',
    'Adalah false',
    'Adalah true',
    'Puguh',
    'Sugan mabar yekan?',
    'G u bau',
    'Cari tau sendiri',
    'Keknya sih iya',
    'Keknya sih nggak',
    'Lah serius?',
    'Anjir',
    'lop u too,aw malu bgt',
    'mau dijawab?donasi dlu ajg',
    'lah ngatur',
    'siapalu?sok asik banget nanya"',
    'diem lu',
    'bodoamat gw gadenger',
    'nulis apaansi?gangerti gua',
    'wkwkwk',
    'yain aja',
    'bodo',
    'tapi gw ganteng yekan?',
    'Gak tau',
    'Pukimak',
    'Meureun, gw juga gak tau sih',
    'Kagak',
    'Setelah gw pikir sih gak mungkin',
    'Setelah gw pikir sih mungkin aja',
    'Y',
    'G',
    'Terserah',
    'Terserah lu',
    'Tul',
    'Hah?',
    'Ngetik apaan? Burem',
    'Mana saya tau,sayakan bot',
    'mana bisa gitu ajg',
    'Lah kalo lu nanya gw,gw nanya siapa?',
    'Apa?gw ganteng?makasih xixixixi',
    'iya gw bot anying,nanya terosss',
    'bisa ga si ga nanya?bawel amat',
    'mau tau jawabannya?bayar ceban',
    'apa maksud lu nanya begitu?',
    'Oh gatau deh',
    'masaa?',
    'hoax ga nich?',
    'ada badaknya gak?',
    'kalau gw jawab,dapet skin ga nich?',
    'anak kecil gaperlu tau',
    'True kh?',
    'Ah yang bener',
    'Nanya sm yg lain aja sana ajg',
    'Jangan nanya sama gw terus napa',
    'tanya sono sama rumput yang bergoyang',
    'males jawab gw asli',
    'gasuka pc aja',
    'gausa gw jawab ya, gapenting mwheheheh',
    'donasi dlu :v'
]
//function
let state = {
    status: () => {
        if(banChats){
            return '\t\t\t\t*" STATUS BOT: ISTIRAHAT "*'
        }else if(mtcState){
            return '\t\t\t\t*" STATUS BOT: MAINTANCE "*'
        }else if(!mtcState){
            return '\t\t\t\t\t\t*" STATUS BOT: AKTIF "*'
        }else{
            return '\t\t\t\t\t\t*" STATUS BOT: AKTIF "*'
        }
    }
}
const config = {
    msg: {
        waitConvert: (a, b, desc) => `Tunggu Sebentar. Bot sedang memproses konversi *${a}* → *${b}*${desc ? `\n\n_${desc}_` : ''}`,
        yt: (title, filesize) => `*Judul:* ${title}\n*Filesize:* ${filesize}`,
        sizeExceed: size => `*Filesize:* ${size}\n*Limit:* 40 MB`,
        error: e => `⚠ *ERROR* ⚠\n\n${e}`,
    },
    stickerGIF: {
        fps: 30, // Lumayan
        quality: 1, // Buriq?
        target: '1M',
        duration: 20 // Detik (Durasi Maksimal)
    },
}

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const { name, formattedTitle } = chat
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (!command.startsWith('!')) return 'Message'
            if (message.length >= 10){
                return `${message.substr(0, 15)}`
            }else{
                return `${message}`
            }
        }
        const isMuted = (chatId) => {
            if(muted.includes(chatId)){
                return false
            }else{
                return true
            }
        }

        const isWhite = (chatId) => whitelist.includes(chatId) ? true : false
        const isWhiteList = (chatId) => {
            if(whitelist.includes(chatId)){
                if(muted.includes(chatId)) return false
                return true
            }else{
                return false
            }
}

        function banChat () {
            if(banChats == true) {
                return false
            }else{
                return true
            }
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(min, value), max)
        }

        function processSticker(input) {
            return new Promise((resolve, reject) => {
                sharp(input)
                    .toFormat('webp')
                    .resize(512, 512, {
                        fit: 'contain',
                        background: { r: 0, g: 0, b: 0, alpha: 0 }
                    })
                    .toBuffer()
                    .then(data => resolve(data))
                    .catch((err) => reject(err))
            })
        }

        function _err(e) {
            console.log(console.log(color('[ERR]', 'red'), e))
        }
        
        const mess = {
            wait: '*[WAIT]* Sedang di proses...!',
            error: {
                St: '[ ERROR ] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Qm: '[ ERROR ] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[ ERROR ] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[ ERROR ] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[ ERROR ] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[ ERROR ] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[ ERROR ] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[ ERROR ] Link yang anda kirim tidak valid!'
            }
        }
        const isnsfw = nsfwgrp.includes(from)
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const isGrupid = (groupId) => wel.includes(groupId) ? true : false
        const isNsfwBund = (groupId) => nsfwgrp.includes(groupId) ? true : false
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'
        const serial = sender.id
        const isOwner = ownerNumber.includes(serial)
        const isBanned = banned.includes(serial)
        let premi = JSON.parse(fs.readFileSync('./lib/premium.json')) 
        const isPremium = premi.includes(serial)
        let adminb = JSON.parse(fs.readFileSync('./lib/adminban.json')) 
        const isAdminBan = adminb.includes(serial)
        let simsimi = JSON.parse(fs.readFileSync('./lib/simsimi.json')) 
        const isSimi = simsimi.includes(chatId)
        const isBlocked = blockNumber.includes(sender.id) === true
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)        
        const reply = async (message) => client.reply(chatId, message, id, true)
        function isMsgLimit(id){
            // if (isOwner) {return false;}
            if (isGroupMsg) {return;}
            let found = false;
            if(id.includes(`${id}`)){
            for (let i of msgLimit){
                if(i.id === id){
                    if (i.msg == 11) {
                        found === true 
                        reply('*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!')
                        client.contactBlock(id)
                        return true;
                    }else if(i.msg == 10){
                        found === true
                        reply('*[ANTI-SPAM]*\nAnda terdeteksi spam!\nMohon tidak spam 1 pesan lagi atau nomor anda AUTO DIBLOK!\n\n*[COOLDOWN]* 10 Detik ngab')
                        return false
                    }else if(i.msg == 9){
                        found === true
                        reply('*[ANTI-SPAM]*\nAnda terdeteksi spam!\nMohon tidak spam 2 pesan lagi atau nomor anda AUTO DIBLOK!\n\n*[COOLDOWN]* 10 Detik ngab')
                        return false
                    }else if(i.msg == 8){
                        found === true
                        reply('*[ANTI-SPAM]*\nAnda terdeteksi spam!\nMohon tidak spam 3 pesan lagi atau nomor anda AUTO DIBLOK!\n\n*[COOLDOWN]* 10 Detik ngab')
                        return false
                    }else if(i.msg == 6){
                        found === true
                        reply('*[ANTI-SPAM]*\nAnda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO DIBLOK!\n\n*[COOLDOWN]* 10 Detik ngab')
                        setTimeout(() => {
                            let pesenlimit = msgLimit.indexOf(i.id == id)
                            msgLimit.splice(pesenlimit, 2)
                            fs.writeFileSync('./settings/msgLimit.json', JSON.stringify(msgLimit))
                        }, 10000)
                        return false
                    }else if(i.msg == 4){
                        found === true
                        reply('*[ANTI-SPAM]*\nAnda terdeteksi spam!\nMohon tidak spam 7 pesan lagi atau nomor anda AUTO DIBLOK!\n\n*[COOLDOWN]* 10 Detik ngab')
                        return false
                    }else if(i.msg == 2){
                        found === true
                        setTimeout(() => {
                            let pesenlimit1 = msgLimit.indexOf(i.id == id)
                            msgLimit.splice(pesenlimit1, 1)
                            fs.writeFileSync('./settings/msgLimit.json', JSON.stringify(msgLimit))
                        }, 15000)
                        return false
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
        }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                msgLimit.push(obj);
                fs.writeFileSync('./settings/msgLimit.json',JSON.stringify(msgLimit));
                return false;
            }  
        }
        function addMsgLimit(id){
            // if (isOwner) {return;}
            if (isGroupMsg) {return;}
            var found = false
            Object.keys(msgLimit).forEach((i) => {
                if(msgLimit[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                msgLimit[found].msg += 1;
                fs.writeFileSync('./settings/msgLimit.json',JSON.stringify(msgLimit));
            }
        }
        
        function isLimit(id){
            if (isPremium) {return false;}
            if (isOwner) {return false;}
            if (isGroupMsg) {return;}
            let found = false;
            for (let i of limit){
                if(i.id === id){
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        reply('Limit private chat anda hari ini telah habis. Jika ingin menggunakan bot sepuasnya masuk grup atau upgrade nomormu agar bisa memakai bot sepuasnya di private chat tanpa limit.\n*!premium* jika ingin mengupgrade nomormu menjadi premium')
                        return true;
                    }if (limits == 21) {
                        found === true;
                        reply('*[WARN]* Limit private chat anda tersisa : 3')
                        return false;
                    }if (limits == 19) {
                        found === true;
                        reply('*[WARN]* Limit private chat anda tersisa : 5')
                        return false;
                    }if (limits == 14) {
                        found === true;
                        reply('*[WARN]* Limit private chat anda tersisa : 10')
                        return false;
                    }else{
                        limit
                        found === true;
                        return false;
                    }
                }
            }
            if (found === false){
                let obj = {id: `${id}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./settings/limit.json',JSON.stringify(limit));
                return false;
            }  
        }
        function limitAdd (id) {
            if (isPremium) {return false;}
            if (isOwner) {return;}
            if (isGroupMsg) {return;}
            var found = false;
            Object.keys(limit).forEach((i) => {
                if(limit[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                limit[found].limit += 1;
                fs.writeFileSync('./settings/limit.json',JSON.stringify(limit));
            }
        }

        if (!isGroupMsg) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mMSG\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        if (isBlocked) return
        // if(isMsgLimit(serial)){
        //     return
        // }else{
        //     addMsgLimit(serial)
        // }

        if(isGroupMsg)
        {
            CreateMYSQL.query("SELECT * FROM `afk`", async function (err, result) 
            {
                if(err) console.log(err)
                if(result.length !== 0)
                {
                    try
                    {
                        result.map(async x => {
                            const tanda = '```' 
                            if(x.nomer == message.author.split('@')[0] && x.groupid == message.from.split('-')[1].split('@')[0])
                            { 
                                if(message.body && message.body.toLowerCase().startsWith('!afk'))
                                {

                                } else {
                                    CreateMYSQL.query(
                                        'DELETE FROM `afk` WHERE `nomer` = ? AND `groupid` = ?', [x.nomer,x.groupid],
                                        async function (err, result) {
                                            if(err) console.log(err)
                                            await client.sendTextWithMentions(message.from, `@${message.author.split('@')[0]} Sekarang tidak AFK!`, id)
                                        })
                                    
                                }
                                
                            }else
                            
                            if(x.reason == 'null')
                            {
                                
                                if(message.type == 'chat')
                                {
                                    if(message.body.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()       
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.`, id)
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang offline, teman anda mengirimkan pesan.\n\nGRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.body.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }
                                }else 
                                if(message.type == 'image'){
                                    if(typeof message.caption !== 'undefined' && message.caption.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()   
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.`, id)
                                        //const generatedUa = await client.getGeneratedUserAgent();
                                        const mediaData = await decryptMedia(message);
                                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                                        'base64'
                                        )}`;
                                        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang offline, teman anda mengirimkan pesan.`)
                                        await client.sendImage(x.nomer+'@c.us', imageBase64, filename, `GRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.caption.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }   
                                } else 
                                if(message.type == 'video'){
                                    if(typeof message.caption !== 'undefined' && message.caption.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()   
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.`, id)
                                        //const generatedUa = await client.getGeneratedUserAgent();
                                        const mediaData = await decryptMedia(message);
                                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                                        'base64'
                                        )}`;
                                        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang offline, teman anda mengirimkan pesan.`)
                                        await client.sendImage(x.nomer+'@c.us', imageBase64, filename, `GRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.caption.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }   
                                }
                            }else if(x.reason !== 'null'){

                                if(message.type == 'chat')
                                {
                                    if( message.body.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()   
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.\nReason : *${x.reason}*`, id)
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang *${x.reason}*, teman anda mengirimkan pesan.\n\nGRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.body.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }
                                }else 
                                if(message.type == 'image'){
                                    if(typeof message.caption !== 'undefined' && message.caption.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()   
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.\nReason : *${x.reason}*`, id)
                                        //const generatedUa = await client.getGeneratedUserAgent();
                                        const mediaData = await decryptMedia(message);
                                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                                        'base64'
                                        )}`;
                                        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang *${x.reason}*, teman anda mengirimkan pesan.`)
                                        await client.sendImage(x.nomer+'@c.us', imageBase64, filename, `GRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.caption.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }   
                                }  else 
                                if(message.type == 'video'){
                                    if(typeof message.caption !== 'undefined' && message.caption.includes(x.nomer) && message.from.split('-')[1].split('@')[0].includes(x.groupid))
                                    {
                                        var duration = moment.duration(moment(x.time).diff(moment()))
                                        const hours = duration.hours()
                                        const minute = duration.minutes()
                                        const second = duration.seconds()
                                        const day = duration.days()   
                                        await client.sendTextWithMentions(message.from, `@${x.nomer} sedang AFK!\nSejak ${tanda}${day}d: ${hours}h: ${minute}m: ${second}s:${tanda} yang lalu.\nReason : *${x.reason}*`, id)
                                        //const generatedUa = await client.getGeneratedUserAgent();
                                        const mediaData = await decryptMedia(message);
                                        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
                                        'base64'
                                        )}`;
                                        const filename = `${message.t}.${mime.extension(message.mimetype)}`;
                                        await client.sendText(x.nomer+'@c.us', `Karena anda sedang *${x.reason}*, teman anda mengirimkan pesan.`)
                                        await client.sendImage(x.nomer+'@c.us', imageBase64, filename, `GRUP = ${x.nama}\nNOMER = ${message.author.split('@')[0]}\nPESAN = ${message.caption.replace(`@${x.nomer}`, `@TAG`)}`)
                                    }   
                                }  
                            } 
                        }) 
                    }catch(err){console.log(err)}
                }
            })      
        }

        if(!isGroupMsg && isPremium){
            if(isSimi){
                if(message.body){
         var teks = message.body;
         const gan = require("urlencode");
         const regex = gan(teks);
         var url = "https://simsumi.herokuapp.com/api?text="+ regex +"&lang=ina";
         axios.get(url)
           .then((result) => {
            var b = JSON.parse(JSON.stringify(result.data));
         if (b.success == ""){
             client.reply(from, "Maaf kak , simi ga ngerti \n coba ketik *!menu* untuk nikmatin fitur lain", id);
         }else{
         client.reply(from, b.success, id);
         }
         })
           .catch((err) => {
         console.log(err);
           })}}}

        if(body == '!info'){
            let hasilx = info.replace('%state', state.status)
            reply(hasilx)
        }else if(body == '!menu' || body == '!help'){
            let hasilxx = menu.replace('%state', state.status)
            reply(hasilxx)
        }   
        if(body === '!mute' && isMuted(chatId) == true){
            if(isGroupMsg) {
                if (!isAdminBan) return client.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin ban!', id)
                muted.push(chatId)
                fs.writeFileSync('./settings/muted.json', JSON.stringify(muted, null, 2))
                client.reply(from, `Bot telah di mute pada chat ini!\n!unmute untuk unmute!`, id)
            }else{
                muted.push(chatId)
                fs.writeFileSync('./settings/muted.json', JSON.stringify(muted, null, 2))
                client.reply(from, `Bot telah di mute pada chat ini!\n!unmute untuk unmute!`, id)
            }
        }
        if(body === '!unmute' && isMuted(chatId) == false){
            if(isGroupMsg) {
                if (!isAdminBan) return client.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin ban', id)
                let index = muted.indexOf(chatId);
                muted.splice(index,1)
                fs.writeFileSync('./settings/muted.json', JSON.stringify(muted, null, 2))
                client.reply(from, `Bot telah di unmute!`, id)         
            }else{
                let index = muted.indexOf(chatId);
                muted.splice(index,1)
                fs.writeFileSync('./settings/muted.json', JSON.stringify(muted, null, 2))
               client.reply(from, `Bot telah di unmute!`, id)                   
            }
        }
        if(args.includes('@6283174042679')){
            reply('Kenapa elu tag boss. Kalo gk penting jangan di tag akwkwk')
        }
           
    if (isMuted(chatId) && banChat() && !isBanned || isGroupMsg && isMuted(chatId) || isOwner ){
        switch(command) {
            case '!si': 
                if (!isPremium) return await client.reply(from, 'Khusus user premium gan', id)
                if (isPremium){
                if (isGroupMsg) {
                        let tek = body.slice(3);
                        const gan = require("urlencode");
                        const regex = gan(tek);
                    //     var url1 = `https://simsumi.herokuapp.com/api?text=${regex}&lang=ina`
                    //     axios.get(url1)
                    //     .then((result) => {
                    //      var b = JSON.parse(JSON.stringify(result.data));
                    //   if (b.success == ""){
                    //       client.reply(from, "Maaf kak , simi ga ngerti \n coba ketik *!menu* untuk nikmatin fitur lain", id)
                    //   }else{
                    //   client.reply(from, b.success, id)
                    //   }
                    //   })
                    //     .catch((err) => {
                    //   console.log(err);
                    //     })
                    axios.get(`https://api.be-line.me/simisimi?lang=id&text=${regex}`)
                    .then((result) => {
                    var c = JSON.parse(JSON.stringify(result.data));
                    if(c.result == ""){
                    client.reply(from, "Maaf kak , simi ga ngerti \n coba ketik *!menu* untuk nikmatin fitur lain", id);
                    }else{client.reply(from, c.result, id)}
                }
                    )}
                }
            break
            case '!sticker':
            case '!stiker':
                if(isLimit(serial)) return
                if (isMedia || isQuotedImage || isQuotedFile) {
                    const encryptMedia = isQuotedImage || isQuotedFile ? quotedMsg : message
                    const _mimetype = encryptMedia.mimetype
                    const mediaData = await decryptMedia(encryptMedia)
                    if (_mimetype === 'image/webp'){
                        client.sendRawWebpAsSticker(from, mediaData.toString('base64'), false)
                        limitAdd(serial)
                    }
                    const stiker = await processSticker(mediaData, 'contain')
                    await client.sendRawWebpAsSticker(from, stiker.toString('base64'), false)
                    limitAdd(serial)
                }
                break
            case '!stikernobg':
            case '!stickernobg':
                if (!isPremium) return client.reply(from, 'Khusus premium gan', id)
                if (isPremium){
                    if (isMedia && type == 'image') {
                    try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        const base64img = imageBase64
                        const outFile = './media/noBg.png'
                        const result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'u76S5Uaoti5zZbzLKWWBXyPG', size: 'auto', type: 'auto', outFile })
                            await fs.writeFile(outFile, result.base64img)
                            await client.reply(from, 'Sedang Menghapus Background...', id)
                            await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                            client.reply(from, 'Sukses Anjay!', id)
                        } catch(err) {
                            console.log(err)
                        }
                    }
                    else {
                            await client.reply(from, mess.error.St, id)
                    }}
                    break;
            case '#sticker':
            case '#stiker':
                if(isLimit(serial)) return
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const filename = `./media/inputst.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/outputst.jpg --fps=60 --scale=700:700`, async function (error, stdout, stderr) {
                        const st = await fs.readFileSync('./media/outputst.jpg', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${st.toString('base64')}`, id)
                        limitAdd(serial)
                    })
                } if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const filename = `./media/inputst.${quotedMsg.mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/outputst.jpg --fps=60 --scale=700:700`, async function (error, stdout, stderr) {
                        const st = await fs.readFileSync('./media/outputst.jpg', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${st.toString('base64')}`, id)
                        limitAdd(serial)
                    })
                } if (args.length === 2) {
                    const url = args[1]
                    if (url.match(isUrl)) {
                        await client.sendStickerfromUrl(from, url, { method: 'get' }, id)
                        limitAdd(serial)
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        await client.reply(from, mess.error.Iv, id)
                    }
                } 
                break;
            case '!toimg': {
                if(isLimit(serial)) return
                if(quotedMsg && quotedMsg.type == 'sticker'){
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendFile(from, imageBase64, 'imagesticker.jpg', '*Sticker to Image*', id)
                    limitAdd(serial)
                } else if (!quotedMsg) return client.reply(from, 'tidak ada sticker yang di balas!', id)}
                break
            case '!togif': {
                if(isLimit(serial)) return
                if(quotedMsg && quotedMsg.type == 'sticker'){
                    const mediaData1 = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase641 = `data:${quotedMsg.mimetype};base64,${mediaData1.toString('base64')}`
                    await client.sendFile(from, imageBase641, 'imagesticker.mp4', '*Sticker to Image*', id)
                    limitAdd(serial)
                } else if (!quotedMsg) return client.reply(from, 'tidak ada sticker yang di balas!', id)}
                break
            case '!stickergif':
            case '!stikergif':
            case '!sgif': 
            if(isLimit(serial)) return
            if (isMedia|| isQuotedVideo || isQuotedFile) {
                const encryptMedia = isQuotedVideo || isQuotedFile ? quotedMsg : message
                const _mimetype = isQuotedVideo || isQuotedFile ? quotedMsg.mimetype : mimetype
                client.reply(from, config.msg.waitConvert(_mimetype.replace(/.+\//, ''), 'webp', 'Proses membutuhkan waktu beberapa saat'), id)
                if (/image/.test(_mimetype)) client.reply(from, '', id)
                console.log(color('[WAPI]'), 'Downloading and decrypting media...')
                const mediaData = await decryptMedia(encryptMedia)
                if (_mimetype === 'image/webp') client.sendRawWebpAsSticker(from, mediaData.toString('base64'), true)
                let temp = './temp'
                let name = new Date() * 1
                let fileInputPath = path.join(temp, /(.+)\//.exec(_mimetype)[1], `${name}.${_mimetype.replace(/.+\//, '')}`)
                let fileOutputPath = path.join(temp, 'webp', `${name}.webp`)
                console.log(color('[fs'), `Writing media file into '${fileInputPath}'`)
                fs.writeFile(fileInputPath, mediaData, err => {
                    if (err) return client.reply(from, '*[EROR]* saat memproses konversi', id) && console.log(color('[ERROR]', 'red'), err)
                    // ffmpeg -y -t 5 -i <input_file> -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -qscale 100 <output_file>.webp
                    ffmpeg(fileInputPath)
                        .inputOptions([
                            '-y',
                            '-t', config.stickerGIF.duration
                        ])
                        .complexFilter([
                            (config.stickerGIF.fps >= 1 ? 'fps=' + config.stickerGIF.fps + ',' : '') + 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
                        ])
                        .outputOptions([
                            '-qscale', config.stickerGIF.quality,
                            '-fs', config.stickerGIF.target || '1M',
                            '-vcodec', 'libwebp',
                            // '-lossless', '1',
                            '-preset', 'default',
                            '-loop', '0',
                            '-an',
                            '-vsync', '0'
                        ])
                        .format('webp')
                        .on('start', function (commandLine) {
                            console.log(color('[FFmpeg]'), commandLine)
                        })
                        .on('progress', function (progress) {
                            // console.log(color('[FFmpeg]'), progress, '')
                        })
                        .on('end', function () {
                            console.log(color('[FFmpeg]'), 'Processing finished!')
                            fs.readFile(fileOutputPath, { encoding: 'base64' }, async (err, base64) => {
                                if (err) return client.reply(from, '[*EROR]* saat process membaca file .webp', id) && console.log(color('[ERROR]', 'red'), err)
                                try {
                                    await client.sendRawWebpAsSticker(from, base64, true)
                                    limitAdd(serial)
                                } catch (e) {
                                    console.log(color('[ERROR]', 'red'), e)
                                    client.reply(from, '*[EROR]* Saat memproses mengirim file*', id)
                                }
                                setTimeout(() => {
                                    try {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    } catch (e) {
                                        console.log(color('[ERROR]', 'red'), e)
                                    }
                                }, 5000)
                            })
                        })
                        .save(fileOutputPath)
                })
            }
            break
            case '!memestiker':
            case '!memesticker':
                if (isMedia || isQuotedImage) {
                    let top = ''
                    let bottom = args.join(' ')
                    if (/\|/.test(args.join(' '))) {
                        [top, bottom] = args.join(' ').split('|')
                    }
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia)
                    const getUrl = await uploadImages(mediaData, false)
                    const ImageBase64 = await customText(getUrl, top, bottom)
                    const stiker = await processSticker(ImageBase64, 'contains') //.replace(/data:.+;base64,/, '')
                await client.sendRawWebpAsSticker(from, Buffer.from(stiker.replace(/data:.+;base64,/, ''), 'base64'), false)
                } else {
                    await client.reply(from, 'Tidak ada media yang dimuat', id)
                }
                break;
            case '!ttp':    
                if(isLimit(serial)) return
                try
                {
                    const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await client.sendImageAsSticker(from, gasMake.base64)
                                    limitAdd(serial)
                                }catch(err) {
                                    await client.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await client.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await client.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await client.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await client.reply(from, gasMake.reason, id)
                                limitAdd(serial)
                            }
                        }
                       
                    }else{
                        await client.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }
            break;
        case '!mememaker':
            if (isMedia || isQuotedImage) {
                let top = ''
                let bottom = args.join(' ')
                if (/\|/.test(args.join(' '))) {
                    [top, bottom] = body.slice(11).split('|')
                }
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await customText(getUrl, top, bottom)
                client.sendFile(from, ImageBase64, 'image.png', '', id)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized}`))
            } else await client.reply(from, 'Tidak ada media yang dimuat', id)
            break;
        case '!musicyt':
        case '!musikyt':{
            const yts = require(`yt-search`)
		    if(!isPremium) return client.reply(from, 'khusus premium gan :v', id)
            let konts = body.split(" ")
            client.reply(from, mess.wait, id)
            if (konts.length == 1) {
                client.reply(from, "Mohon masukan query !!", id)
            } else {
                konts = konts.splice(1).join(" ")
                const kontl = await yts(konts)   
                const video = kontl.all.find((value) => value.seconds <= 600)
                    console.log(`${video}`)
                    if (!video) {
                        client.reply(from, "Musik tidak ditemukan :(", id)

                    } else {
                        const myt3 = await yta(video.url)
                        const {thumb, title, filesize, filesizeF, dl_link} = myt3
                        const shortmyt3 = await urlShortener(dl_link)
                        if (filesize > '40' * 1000) return client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:* ' + shortmyt3 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + config.msg.sizeExceed(filesizeF), id)
                        client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:*\n' + shortmyt3 + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_', id).catch(_err)
                        client.sendFileFromUrl(from, dl_link, `media.${myt3.ext}`, config.msg.yt(title, filesizeF), id).catch(_err)
                    }
            }}
            break;
        case '!yts':{
            let tek = body.split(" ")
                tek = tek.splice(1).join(" ")
                const r = await yts(tek)
                const videos = r.videos.slice(0, 10)
                i = 0
                pesan = `===={ _*ZJ-Bot Youtube Search*_ }====\n\n`
                for (const isi of videos) {
                    i++
                    pesan = pesan + `*(${i})*\n`+'👉 *Judul* : _' + isi.title + '_' + '\n👉 *Durasi* : _' + isi.timestamp + '_' + '\n👉 *Link* : _' + isi.url + '_'+'\n\n'
                    if (i<=videos) {
                    pesen = pesan + '\n\n'
                    } else if(i > videos){
                    break;
                    }
                }
                await client.reply(from, pesan, id)
                }
                break;
            case '!play':
                if(!isPremium) return await client.reply(from, 'Khusus premium gan :v', id) 
                let tek1 = body.split(" ")
                tek12 = tek1.splice(1).join(" ")
                const r1 = await yts(tek12)
                const videos1 = r1.videos.slice(0, 10)
                i = 0
                pesan1 = `_*Reply tag pesan ini dengan cara*_\n_*!mp3/!mp4 [nomor]*_\n_*contoh: !mp3 1*_\n\n`
                for (const isii of videos1) {
                    i++
                    pesan1 = pesan1 + `*(${i})*\n`+'👉 *Judul* : _' + isii.title + '_' + '\n👉 *Views*: _' + isii.views + '_' + '\n👉 *Durasi* : _' + isii.timestamp + '_' + '\n👉 *Link* : _' + `>${isii.url}` + '_'+'\n\n'
                    if (i<=videos1) {
                    pesen1 = pesan1 + '\n\n'
                    } else if(i > videos1){
                    break;
                    }
                }
                await client.sendFileFromUrl(from, r1.videos[0].thumbnail, 'play.jpg', pesan1, id)
                await client.sendSeen(from)
                break;
            case '!mp3':
                if (!isPremium) return client.reply(from, 'khusus premium gan :v', id)
                try {
                    if (quotedMsg && quotedMsg.type == 'image') {
                        if (args.length === 1) return client.reply(from, '*Forat*: !mp3 [nomor]\nContoh:\n!mp3 1')
                        const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        const pilur = dataDownmp3.split('>')
                        const yt3 = await yta(pilur[args[1]])
                        const {thumb, title, filesize, filesizeF, dl_link} = yt3
                        const shortyt3 = await urlShortener(dl_link)
                        if (filesize > '40' * 1000) return client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt3 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + config.msg.sizeExceed(filesizeF), id)
                        client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:*\n' + shortyt3 + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_', id).catch(_err)
                        client.sendFileFromUrl(from, dl_link, `media.${yt3.ext}`, config.msg.yt(title, filesizeF), id).catch(_err)
                    }
                } catch (err) {
                    client.reply(from, `Ada kesalahan mungkin disebabkan oleh sistem`, id)
                    console.log(err)
                }
                await client.sendSeen(from)
                break
            case '!mp4':
                if (!isPremium) return client.reply(from, 'khusus premium gan :v', id)
                try {
                    if (quotedMsg && quotedMsg.type == 'image') {
                        if (args.length === 1) return client.reply(from, '*Forat*: !mp4 [nomor]\nContoh:\n!mp4 1')
                        const dataDownmp3 = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        const pilur = dataDownmp3.split('>')
                        const yt4 = await ytv(pilur[args[1]])
                        const {thumb, title, filesize, filesizeF, dl_link} = yt4
                        const shortyt4 = await urlShortener(dl_link)
                        if (filesize > '40' * 1000) return client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt4 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + config.msg.sizeExceed(filesizeF), id)
                        client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download :*\n' + shortyt4 + '\n\n_*Tunggu sebentar bot sedang mengirim video tersebut*_', id).catch(_err)
                        client.sendFileFromUrl(from, dl_link, `media.${yt4.ext}`, config.msg.yt(title, filesizeF), id).catch(_err)
                    }
                } catch (err) {
                    client.reply(from, `Ada kesalahan mungkin disebabkan oleh sistem`, id)
                    console.log(err)
                }
                await client.sendSeen(from)
                break
            case '!bacotadd':
                if(isLimit(serial)) return
                const ngautis = body.slice(10)
                if (!ngautis) {
                    await client.reply(from, "Maaf, tidak boleh kosong.")
                } else {
                    CreateMYSQL.query( `SELECT 1 FROM bacot WHERE autis = '${ngautis}' ORDER BY autis LIMIT 1`, async function (err, result) 
                    {
                        if (err) return console.log(`add bacot => ${err}`);
                        if (result.length > 0) {
                            await client.reply(from, "Maaf, gagal menambah db [double]", id)
                        } else {
                            CreateMYSQL.query(`INSERT INTO bacot (autis) VALUES ('${ngautis}')`, async function (err, result) {
                                if (err)  return console.log(`autis add sukses => ${err}`);
                                    await client.reply(from, `Sukses menambahkan ${ngautis} kedalam database ZJ-BOT.`, id)
                                    limitAdd(serial)
                            });
                        }
                    });
                }
                break;
            case '!bacot':
            if(isLimit(serial)) return
            try{ 
                CreateMYSQL.query(`SELECT g.autis FROM bacot AS g ORDER BY RAND() LIMIT 1;`, function (err, result) 
                {
                    if (err) return console.log(`autis => ${err}`);
                    result.forEach(async bacot => await client.reply(from, bacot.autis, id));
                    if(isLimit(serial)) return
                });
            }
            catch(err)
            {
                console.log(err)
            }
                break;
            case '!afk':
                if(isGroupMsg)
                {
                    CreateMYSQL.query(
                        "SELECT 1 FROM `afk` WHERE `nomer` = ? AND `groupid` = ?",[author.split('@')[0], from.split('-')[1].split('@')[0]],
                        async function (err, result) {
                            if(err) console.log(err)
                            if(result.length == 0)
                            {
                                const mmk = body.slice(5)
                                if(body.toLowerCase() == '!afk')
                                {
                                    CreateMYSQL.query(
                                        'INSERT INTO `afk` SET ?', {nomer: author.split('@')[0],groupid: from.split('-')[1].split('@')[0], nama: message.chat.contact.name, reason: 'null', time: moment().format('YYYY-MM-DD HH:mm:ss')},
                                        async function (err, result) {
                                            if(err) console.log(err)
                                            await client.sendTextWithMentions(from, `@${author.split('@')[0]} Sekarang AFK!`, id)
                                        })
                                }else{
                                    CreateMYSQL.query(
                                        'INSERT INTO `afk` SET ?', {nomer: author.split('@')[0],groupid: from.split('-')[1].split('@')[0], nama: message.chat.contact.name, reason: mmk, time: moment().format('YYYY-MM-DD HH:mm:ss')},
                                        async function (err, result) {
                                            if(err) console.log(err)
                                            await client.sendTextWithMentions(from, `@${author.split('@')[0]} Sekarang AFK!`, id)
                                        })
                                }
                                
                            }else{
                                const mmk = body.slice(5)
                                if(body.toLowerCase() == '!afk')
                                {
                                    CreateMYSQL.query(
                                        'UPDATE `afk` SET ? WHERE `nomer` = ? AND `groupid` = ?', [{reason: 'null',time: moment().format('YYYY-MM-DD HH:mm:ss')}, author.split('@')[0],from.split('-')[1].split('@')[0]],
                                        async function (err, result) {
                                            if(err) console.log(err)
                                            await client.sendTextWithMentions(from, `@${author.split('@')[0]} Sekarang AFK!!`, id)
                                        })
                                }else{
                                    CreateMYSQL.query(
                                        'UPDATE `afk` SET ? WHERE `nomer` = ? AND `groupid` = ?', [{reason: mmk, time: moment().format('YYYY-MM-DD HH:mm:ss')}, author.split('@')[0],from.split('-')[1].split('@')[0]],
                                        async function (err, result) {
                                            if(err) console.log(err)
                                            await client.sendTextWithMentions(from, `@${message.author.split('@')[0]} Elu Udah AFK Su!`, id)
                                        })
                                }  
                            }
                        })
                }else{
                    await client.reply(from, `Hanya bisa digunakan digrup!.`, id)
                } 
            break;
        case '!tts': {
            try {
                if(isLimit(serial)) return
                let lang = args[1];
                let langText = body.slice(6+lang.length);
                if(!lang || !langText) return
                if(langText.length >= 250) return client.reply(from,'Teks Kepanjangan :(',id)
                var gtts = new gTTs(langText, lang);
                gtts.save('./tts/lang.mp3', function () {
                    client.sendPtt(from, './tts/lang.mp3', id)
                    limitAdd(serial)
                })                           
            } catch (error) {
                client.reply(from,`*[ERROR]* Teks tidak ada, atau kode bahasa ${args[1]} tidak support\n*Format* : !tts [bahasa] [teks]\n*Contoh* : !tts id hai sayang\n📌 *!bahasa* untuk melihat list kode bahasa`,id);
            }}
            break;
        case '!nulis':
        case '!nulis1':
            if(isLimit(serial)) return
            if (args.length === 1) return client.reply(from, 'Fromat: *!nulis [teks]*\ncontoh: *!nulis Anjay*', id)
            let text = body.slice(7)
            if (text.length >= 1000) return reply('Text terlalu panjang gan :v. Maksimal 1000 huruf.')
            client.reply(from, mess.wait, id)
            const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
            axios({
                method: 'post',
                url: 'https://salism3.pythonanywhere.com/write',
                data: {
                text: splitText,
                }
            }).then(response => {
                // console.log(response);
                response.data.images.forEach(image => client.sendFileFromUrl(message.from, image, null, "Nih gan"))
                limitAdd(serial)
            })
            break;
        case '!nulis2':
            if(isLimit(serial)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*\ncontoh\n*!nulis zebri junitu*', id)
            const nulis = encodeURIComponent(body.slice(8))
            client.reply(from, mess.wait, id)
            let urlnulis = `https://mhankbarbar.herokuapp.com/nulis?text=${nulis}&apiKey=zebrijunitu`
            await fetch(urlnulis, {method: "GET"})
            .then(res => res.json())
            .then(async (json) => {
                await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Nih gan silahkan kumpul tugasnya!', id)
                limitAdd(serial)
            }).catch(e => client.reply(from, 'Terjadi kesalan dikarenakan sistem :v', id));
            break;
            case '!ig': {
                if (args.length === 1) return await client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh !ig https://www.instagram.com/p/CGg-Jwzn3kA/?igshid=1278gg5gchdnt')
                if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return await client.reply(from, mess.error.Iv, id)
            try {
                await client.reply(from, mess.wait, id)
                const resp = await get.get('https://mhankbarbar.herokuapp.com/api/ig?url='+ args[1]+'&apiKey=zebrijunitu').json()
                if (resp.error) return await client.reply(from, mess.error.Ig, id)
                if (resp.type == 'photo') {
                    var ext = '.png'
                }else{
                    var ext = '.mp4'
                }
                await client.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
            } catch {
                await client.reply(from, mess.error.Ig, id)}
            }
                break
        case '!ytmp3':{
            if(args.length === 1) return await reply('Format: !ytmp3 [LinkYt]\nContoh\n!ytmp3 https://youtube.com/watch?v=FlTylDo0DJk')
            reply('*[WAIT]* Sedang diprosess...!')
            const yt3 = await yta(args[1])
            const {thumb, title, filesize, filesizeF, dl_link} = yt3
            const shortyt3 = await urlShortener(dl_link)
            if (filesize > '40' * 1000) return client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt3 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + config.msg.sizeExceed(filesizeF), id)
            client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:*\n' + shortyt3 + '\n\n_*Tunggu sebentar bot sedang mengirim audio tersebut*_', id).catch(_err)
            client.sendFileFromUrl(from, dl_link, `media.${yt3.ext}`, config.msg.yt(title, filesizeF), id).catch(_err)
            }
            break;
        case '!ytmp4': {
            if(args.length === 1) return await reply('Format: !ytmp4 [LinkYt]\nContoh\n!ytmp4 https://youtube.com/watch?v=FlTylDo0DJk')
            reply('*[WAIT]* Sedang diprosess...!')
            const yt4 = await ytv(args[1])
            const {thumb, title, filesize, filesizeF, dl_link} = yt4
            const shortyt4 = await urlShortener(dl_link)
            if (filesize > '40' * 1000) return client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download:* ' + shortyt4 + '\n\n_*Gunakan link diatas dikarenakan ukuran file melebihi batas limit yang ditentukan*_\n\n' + config.msg.sizeExceed(filesizeF), id)
            client.sendImage(from, thumb, 'thumbs.jpg', config.msg.yt(title, filesizeF) + '\n*Link Download :*\n' + shortyt4 + '\n\n_*Tunggu sebentar bot sedang mengirim video tersebut*_', id).catch(_err)
            client.sendFileFromUrl(from, dl_link, `media.${yt4.ext}`, config.msg.yt(title, filesizeF), id).catch(_err)
            }
            break
        case '!googleimage': {
            try {
                if(isLimit(serial)) return
                var gis = require('g-i-s');
                let goo = body.slice(13)
                gis(goo, logResults);
            function logResults(error, results) {
                if (error) {
                    console.log(error);
                }
                else {
                    let url = []
                    for (let i = 0; i < results.length; i++){
                        url.push(decodeURIComponent(results[i].url))
                    }
                    const gambar = url.slice(0, 2)
                    gambar.forEach(function(g){
                    client.sendFileFromUrl(from, g, `google.${g.ext}`, '', id)
                        })
                    }
                }
            } catch (error) {
                console.log(error)
                }
            }
            break
        case '!artinama': {
            if(isLimit(serial)) return
            let arna = body.slice(10)
            if (args.length == 1) return await client.reply(from, 'Fromat: !artinama [nama]\ncontoh\n!artinama kaori miyazono')
                client.reply(from, '⏳ Tunggu yaa, sedang proses . . . ⏳', id)
                const arnama = await get.get(`https://api.i-tech.id/tools/arti?key=3sraBK-E4lyHi-vwf2pP-VT2Hiz-Mnbc4y&nama=${arna}`).json()
                const {code, status, arti} = arnama
                if(code != "200") return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
                client.reply(from, arti, id)
                limitAdd(serial)}
            break;
        case '!pasangan': {
            if(isLimit(serial)) return
            var req = body.split('!pasangan ')[1]
            var namamu = req.split("&")[0];
            var pasangan = req.split("&")[1]; 
            if (args.length == 1) return await client.reply(from, 'Fromat: !pasangan [nama1 & nama2]\ncontoh\n!pasangan zebri junitu & kaori miyazono')
                client.reply(from, '⏳ Tunggu yaa, sedang proses . . . ⏳', id)
                const pas = await get.get(`https://api.i-tech.id/tools/jodoh?key=3sraBK-E4lyHi-vwf2pP-VT2Hiz-Mnbc4y&p1=${namamu}&p2=${pasangan}`).json()
                const {code, status, p1, p2, sisi, level, gambar} = pas
                const { positif, negatif } = sisi
                if(code != "200") return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
                client.sendFileFromUrl(from, gambar, 'pasangan.png', `*Cek Kecocokan Jodoh Berdasarkan Nama*
Nama kamu = ${p1}
Nama Pasangan = ${p2}
Level kecocokan = ${level}

Sisi Positif = ${positif}

Sisi Negatif = ${negatif}
                `, id)
                limitAdd(serial)
        }
            break;
        case '!zodiak': {
            if(isLimit(serial)) return
            if (args.length == 1) return await client.reply(from, 'Fromat: !zodiak [nama&tgl lahir]\ncontoh\n!zodiak zebri&18/06/2002')
                var req1 = body.split('!zodiak ')[1]
                var nama1 = req1.split("&")[0];
                var tgl1 = req1.split("&")[1]; 
                client.reply(from, '⏳ Tunggu yaa, sedang proses . . . ⏳', id)
                const pas = await get.get(`https://api.i-tech.id/tools/zodiak?key=3sraBK-E4lyHi-vwf2pP-VT2Hiz-Mnbc4y&nama=${nama1}&tgl=${tgl1}`).json()
                const {code, status, nama, lahir, usia, ultah, zodiak} = pas
            if(code != "200") return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
                client.reply(from, `*Cek Zodiak*
Nama = ${nama}
Lahir = ${lahir}
Usia = ${usia}
Ultah = ${ultah}
Zodiak = ${zodiak}
                `, id)
                limitAdd(serial)
        }
            break;
        case '!twt':
        case '!twitter': {
            if(isLimit(serial)) return
            if (args.length == 2) {
                const url = args[1]
                if (!url.match(isUrl) && !url.includes('twitter.com') || url.includes('t.co')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid', id)
                await client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                twitter(url)
                .then(async (videoMeta) => {
                    try {
                        const title = videoMeta.response.title
                        const thumbnail = videoMeta.response.thumbnail
                        const links = videoMeta.response.links
                        const shorts = []
                        for (var i = 0; i < links.length; i++) {
                            const shortener = await urlShortener(links[i].url)
                            links[i]['short'] = shortener
                            shorts.push(links[i])
                        }
                        const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                        const caption = `Text: ${title} \n\nLink Download: \n${link.join('\n')} \n\n=={ _*Processing Sukses # ZJ-Bot*_ }==!`
                        client.sendFileFromUrl(from,thumbnail, 'videos.jpg', caption )
                        limitAdd(serial)
                        .catch(err => console.log('[ERROR] send image'))
                    } catch (err) {
                        client.sendText(from, `Error, ` + err)
                    }
                })
                    .catch((err) => {
                        client.sendText(from, `Error, url tidak valid atau tidak memuat video \n\n${err}`)
                    })
                }}
            break;
        case '!likee' :
        case '!like' : {
            if(isLimit(serial)) return
            if (args.length == 2) {
                const url = args[1]
                if (!url.match(isUrl) && !url.includes('likee.com')) return client.sendText(from, 'Maaf, url yang kamu kirim tidak valid')
                await client.simulateTyping(from, true)
                client.sendText(from, '⏳ Tunggu yaa, sedang proses . . . ⏳')
                likee(url)
                .then(async (videoMeta) => {
                    try {
                        const title = videoMeta.response.title
                        const thumbnail = videoMeta.response.thumbnail
                        const links = videoMeta.response.links
                        const shorts = []
                        for (var i = 0; i < links.length; i++) {
                            const shortener = await urlShortener(links[i].url)
                            links[i]['short'] = shortener
                            shorts.push(links[i])
                        }
                        const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                        const caption = `📌Tittle: ${title} \n📌Link Download: \n${link.join('\n')} \n={ _*Processing Sukses # ZJ-Bot*_ }=
                            `
                        client.sendFileFromUrl(from,thumbnail, 'videos.jpg', caption )
                        limitAdd(serial)
                        .catch(err => console.log('[ERROR] send image'))
                    } catch (err) {
                        client.sendText(from, `Error, ` + err)
                    }
                })
                .catch((err) => {
                    client.sendText(from, `Error, url tidak valid atau tidak memuat video \n\n${err}`)
                })
            }}
            break;
        case '!wiki': {
            if(isLimit(serial)) return
            if (args.length === 1) return await client.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
            const query_ = body.slice(6)
            const wiki = await get.get('https://zebri-api.herokuapp.com/api/wiki?q='+ query_+'&lang=id').json()
            if (wiki.error) {
                await client.reply(from, wiki.error, id)
            } else {
                await client.reply(from, `👉 *Query* : ${query_}\n\n👉 *Result* : ${wiki.result}`, id)
                limitAdd(serial)
            }}
            break;
        case '!cuaca': {
            if(isLimit(serial)) return
            if (args.length === 1) return await client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await get.get('https://zebri-api.herokuapp.com/api/cuaca?q='+ tempat+'').json()
            if (weather.error) {
                await client.reply(from, weather.error, id)
            } else {
                await client.reply(from, `👉 Tempat : ${weather.result.tempat}\n\n👉 Angin : ${weather.result.angin}\n👉 Cuaca : ${weather.result.cuaca}\n👉 Deskripsi : ${weather.result.desk}\n👉 Kelembapan : ${weather.result.kelembapan}\n👉 Suhu : ${weather.result.suhu}\n👉 Udara : ${weather.result.udara}`, id)
                limitAdd(serial)
            }}
            break;
        case '!fb': {
            if(isLimit(serial)) return
            if (args.length === 1) return await client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('facebook.com')) return await client.reply(from, mess.error.Iv, id)
            if(!isGroupMsg){
            try {
                await client.reply(from, mess.wait, id)
                const epbe = await get.get(' https://zebri-api.herokuapp.com/api/epbe?url='+ args[1]+'').json()
                if (epbe.error) return await client.reply(from, 'Terjadi kesalahan', id)
                if (epbe.type == 'photo') {
                    var ext = '.png'
                }else{
                    var ext = '.mp4'
                }
                if (Number(epbe.filesize.split(' MB')[0]) > 40.00) return await client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                await client.sendFileFromUrl(from, epbe.result, `epbe${ext}`, `${epbe.title}`, id)
                limitAdd(serial)
            } catch {
                await client.sendFileFromUrl(from, errorurl, 'erepbe.jpg', mess.error.Yt4, id)}
                }else{
            try {
                await client.reply(from, mess.wait, id)
                const epbe = await get.get(' https://zebri-api.herokuapp.com/api/epbe?url='+ args[1]+'').json()
                if (epbe.error) return await client.reply(from, 'Terjadi kesalahan', id)
                if (epbe.type == 'photo') {
                    var ext = '.png'
                }else{
                    var ext = '.mp4'
                }
                if (Number(epbe.filesize.split(' MB')[0]) > 40.00) return await client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                await client.sendFileFromUrl(from, epbe.result, `epbe${ext}`, `${epbe.title}`, id)
            } catch {
                await client.sendFileFromUrl(from, errorurl, 'erepbe.jpg', mess.error.Yt4, id)}
                }
            }
            break;  
        case '!fml':
        case '!fuckmylife': {
            if(isLimit(serial)) return
            const fucek = await get.get(`https://api.haipbis.xyz/fml`).json()
            const { fml } = fucek
            client.reply(from, fml, id)
            limitAdd(serial)}
            break 
        case '!igstalk': {
            if(isLimit(serial)) return
            if (args.length === 1)  return await client.reply(from, 'Kirim perintah *!igStalk @username*\nConntoh *!igStalk @duar_amjay*', id)
            const stalk = await get.get('https://zebri-api.herokuapp.com/api/stalk?username='+ args[1]+'').json()
            if (stalk.error) return await client.reply(from, stalk.error, id)
            const { Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Username, Profile_pic } = stalk
            const caps = `👉 *Nama* : ${Name}\n👉 *Username* : ${Username}\n👉 *Jumlah Followers* : ${Jumlah_Followers}\n👉 *Jumlah Following* : ${Jumlah_Following}\n👉 *Jumlah Postingan* : ${Jumlah_Post}\n👉 *Biodata* : ${Biodata}`
            await client.sendFileFromUrl(from, Profile_pic, 'Profile.jpg', caps, id)
            limitAdd(serial)}
            break
        case '!infogempa': {
            if(isLimit(serial)) return
            const bmkg = await get.get('https://zebri-api.herokuapp.com/api/infogempa?apiKey=zebrijunitu').json()
            const { koordinat, lokasi, magnitude, map, potensi, waktu } = bmkg
            const hasil = `INFORMASI GEMPA *BMKG*\n\n👉 *Waktu* : ${waktu}\n👉 *Koordinat* : ${koordinat}\n👉 *Lokasi* : ${lokasi}\n👉 *Magnitude* : ${magnitude}\n👉 *Potensi* : ${potensi}`
            client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            limitAdd(serial)}
            break;
        case '!spamcall': {
            if(!isPremium) return await reply('Khusus premium user ya gan.')
            if(args.length === 1) return await reply('Kirim perintah !spamcall [no target]\nContoh\n!spamcall 821xxxxxxxxxx\nNote : awalan nomor harus 8 tanpa pake 62 maupun 0')
            const spcall = await get.get(`https://zebri-api.herokuapp.com/api/spamcall?no=${args[1]}`).json()
            reply(`${spcall.logs}`)
            }
            break;
        case '!spamsms': {
            if(!isPremium) return await reply('Khusus premium user ya gan.')
            if(args.length === 1) return await reply('Kirim perintah !spamcall [no target] [jumlah]\nContoh\n!spamsms 0821xxxxxxxxxx 20\nNote : awalan nomor harus 08')
            const spsms = await get.get(`https://zebri-api.herokuapp.com/api/spamsms?no=${args[1]}&jum=${args[2]}`).json()
            reply(`${spsms.logs}`)
            }
            break;
        case '!translate':
            if(isLimit(serial)) return
            if(quotedMsgObj != null && quotedMsgObj.type == 'chat'){
                var codelang = args[1]
                var text1 = quotedMsgObj.body
                translatte(text1, {to: codelang}).then(res => {
                    client.reply(from, res.text, id);
                    limitAdd(serial)
                }).catch(err => {
                    client.reply(from,`*[ERROR]* kode bahasa ${codelang} tidak support\n~> *!bahasatranslate* untuk melihat list kode bahasa`, id);
                }); 
            }else{
                if(args[1] == undefined || args[2] == undefined) return await reply('*Format:* !translate [bahasa] [teks]\n*Contoh:* !translate id i love you\natau bisa juga reply tag pesan dengan *Format:* !translate [bahasa]')
                var codelang1 = args[1]
                var text12 = body.slice(11+codelang1.length);
                translatte(text12, {to: codelang1}).then(res => {
                    client.reply(from, res.text, id);
                    limitAdd(serial)
                }).catch(err => {
                    client.reply(from,`*[ERROR]* Teks tidak ada, atau kode bahasa *${codelang1}* tidak support\n~> *!bahasatranslate* untuk melihat list kode bahasa`, id);
                });
            }
        break
    case '!google':
        if(isLimit(serial)) return
        client.reply(from, mess.wait, id)
        const googleQuery = body.slice(8)
        if(googleQuery == undefined || googleQuery == ' ') return client.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
        google({ 'query': googleQuery }).then(results => {
        let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
        for(let i = 0; i < results.length; i++) {
            vars +=  `\n==============================\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
        }
            client.reply(from, vars, id);
            limitAdd(serial)
        }).catch(e => {
            client.sendText(ownerNumber, 'Google Error : ' + e);
        })
        break            
    case '!bassboosted':
        if(!isQuotedAudio) return await reply('Kirim file musik mu lalu reply tag file tersebut dengan caption \n!bassboosted [frekuensi]\nNote : default frekuensi minimum adalah 20hz dan maximum 500hz')
        if (isQuotedAudio) {
            let dB = 20
            let freq = 60
            if (args[0]) dB = clamp(parseInt(args[0]) || 20, 0, 50)
            if (args[1]) freq = clamp(parseInt(args[1]) || 20, 20, 500)
            let mediaData = await decryptMedia(quotedMsg)
            let temp = './temp'
            let name = new Date() * 1
            let fileInputPath = path.join(temp, 'audio', `${name}.mp3`)
            let fileOutputPath = path.join(temp, 'audio', `${name}_2.mp3`)
            console.log(color('[fs]', 'green'), `Writing media into '${fileInputPath}'`)
            client.reply(from, config.msg.waitConvert('mp3', 'mp3', `Bass ${freq}hz: +${dB}dB`), id)
            fs.writeFile(fileInputPath, mediaData, err => {
                if (err) return client.sendText(from, config.msg.error('Ada yang error saat menulis file\n\n' + err)) && console.log(color('[ERROR]', 'red'), err)
                ffmpeg(fileInputPath)
                    .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                    .format('mp3')
                    .on('start', function (commandLine) {
                        console.log(color('[FFmpeg]', 'green'), commandLine)
                    })
                    .on('progress', function (progress) {
                        // console.log(color('[FFmpeg]', 'green'), progress)
                    })
                    .on('end', function () {
                        console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                        // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                        // if (err) return client.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                        client.sendFile(from, fileOutputPath, 'distorted.mp3', '', id)
                        // })
                        setTimeout(() => {
                            try {
                                fs.unlinkSync(fileInputPath)
                                fs.unlinkSync(fileOutputPath)
                            } catch (e) {
                                console.log(color('[ERROR]', 'red'), e)
                            }
                        }, 30000)
                    })
                    .save(fileOutputPath)
                })
            }
            break;
        case '!tomp3':
            if ((isMedia || isQuotedVideo || isQuotedFile)) {
                client.reply(from, config.msg.waitConvert('mp4', 'mp3', 'Meng-ekstrak audio dari video'), id)
                const encryptMedia = isQuotedVideo || isQuotedFile ? quotedMsg : message
                const _mimetype = isQuotedVideo || isQuotedFile ? quotedMsg.mimetype : mimetype
                console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                const mediaData = await decryptMedia(encryptMedia)
                let temp = './temp'
                let name = new Date() * 1
                let fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                let fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                console.log(color('[fs]', 'green'), `Downloading media into '${fileInputPath}'`)
                fs.writeFile(fileInputPath, mediaData, err => {
                    if (err) return client.reply(from, '*[EROR]* saat memproses konversi', id) && console.log(color('[ERROR]', 'red'), err)
                    // ffmpeg -y -t 5 -i <input_file> -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -qscale 100 <output_file>.webp
                    ffmpeg(fileInputPath)
                        .format('mp3')
                        .on('start', function (commandLine) {
                            console.log(color('[FFmpeg]', 'green'), commandLine)
                        })
                        .on('progress', function (progress) {
                            // console.log(color('[FFmpeg]', 'green'), progress)
                        })
                        .on('end', function () {
                            console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                            // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                            // if (err) return client.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                            client.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                            // })
                            setTimeout(() => {
                                try {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                } catch (e) {
                                    console.log(color('[ERROR]', 'red'), e)
                                }
                            }, 30000)
                        })
                        .save(fileOutputPath)
                })
            }
            break
        case '!nhinfo': {
            if(isLimit(serial)) return
            if ((isGroupMsg) && (!isnsfw)) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*', id)
            if (!isGroupMsg) {
                if (args.length === 2) {
                    const nuklir = body.split(' ')[1]
                    const { exec } = require ('child_process')
                    await client.reply(from, mess.wait, id)
                    const cek = await nhentai.exists(nuklir)
                    if (cek === true)  {
                        try {
                            const api = new API()
                            const pic = await api.getBook(nuklir).then(book => {
                                return api.getImageURL(book.cover)
                            })
                            const dojin = await nhentai.getDoujin(nuklir)
                            const { title, details, link } = dojin
                            const { parodies, tags, artists, groups, languages, categories } = await details
                            var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                            exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                                client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then()
                                limitAdd(serial)
                                })
                        } catch (err) {
                            await client.reply(from, '[ ERROR ] Terjadi kesalahan, mungkin kode nuklir salah', id)
                        }
                    } else {
                        await client.reply(from, '[ ERROR ] Kode nuClear Salah!', id)
                    }
                }
            }
            if ((isGroupMsg) && (isnsfw)) {
                if (args.length === 2) {
                    const nuklir = body.split(' ')[1]
                    const { exec } = require ('child_process')
                    await client.reply(from, mess.wait, id)
                    const cek = await nhentai.exists(nuklir)
                    if (cek === true)  {
                        try {
                            const api = new API()
                            const pic = await api.getBook(nuklir).then(book => {
                                return api.getImageURL(book.cover)
                            })
                            const dojin = await nhentai.getDoujin(nuklir)
                            const { title, details, link } = dojin
                            const { parodies, tags, artists, groups, languages, categories } = await details
                            var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                            exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                                client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then()
                                })
                        } catch (err) {
                            await client.reply(from, '[ ERROR ] Terjadi kesalahan, mungkin kode nuklir salah', id)
                        }
                    } else {
                        await client.reply(from, '[ ERROR ] Kode nuClear Salah!', id)
                    }
                }
            }}
            break;
        case '!nhder': {
            if(isLimit(serial)) return
            if ((isGroupMsg) && (!isnsfw)) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*', id)
            if (!isGroupMsg) {
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `==={ *_ZJ-Bot NHentai Donwload_* }===\n\nLink: ${shortener}\n\n=={ _*Processing Sukses # ZJ-Bot*_ }==!`
                client.reply(from, caption, id)
                limitAdd(serial)
            } else {
                client.reply(from, 'Maaf tolong masukan code nuclear', id)
                }
            }
            if ((isGroupMsg) && (isnsfw)) {
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `=={ *_ZJ-Bot NHentai Donwload*_ }==\n=======> Status : SUKSES <=======\n\nLink: ${shortener}\n\n=={ _*Processing Sukses # ZJ-Bot*_ }==!`
                client.sendText(from, caption)
            } else {
                client.sendText(from, 'Maaf tolong masukan code nuclear')
                }
                }}
            break;
        case '!brainly': 
            {
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('-')[1]) || 3
                if (jum > 10) return client.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                client.reply(from, `👉 *Pertanyaan* : ${tanya.split('.')[0]}\n\n👉 *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            client.reply(from, `👉 *Pertanyaan* : ${x.pertanyaan}\n\n👉 *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            client.reply(from, `👉 *Pertanyaan* : ${x.pertanyaan}\n\n👉 *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n👉 *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                client.reply(from, 'Usage :\n!brainly [pertanyaan] [-jumlah]\n\nEx : \n!brainly NKRI -2', id)
            }}
            break;
        case '!wait': {
            if(isLimit(serial)) return
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
            if (isMedia) {
                var mediaData = await decryptMedia(message, uaOverride)
            } else {
                var mediaData = await decryptMedia(quotedMsg, uaOverride)
            }
            const fetch = require('node-fetch')
            const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await client.reply(from, 'Sedang mencari....', id)
            fetch('https://trace.moe/api/search', {
                method: 'POST',
                body: JSON.stringify({ image: imgBS4 }),
                headers: { "Content-Type": "application/json" }
            })
            .then(respon => respon.json())
            .then(resolt => {
                if (resolt.docs && resolt.docs.length <= 0) {
                    client.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                }
                const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                teks = ''
                if (similarity < 0.92) {

                    teks = '*Saya memiliki keyakinan rendah dalam hal ini* \n\n'
                }
                teks += '====={ *_ZJ-Bot WhatAnime_* }=====\n'
                teks += `👉 *Title Japanese* : ${title}\n👉 Title chinese : ${title_chinese}\n👉 Title Romaji : ${title_romaji}\n👉 Title English : ${title_english}\n`
                teks += `👉 *Ecchi* : ${is_adult}\n`
                teks += `👉 *Eps* : ${episode.toString()}\n`
                teks += `👉 *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                teks += '============================'
                var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id)
                .catch(() => {
                limitAdd(serial)
                    client.reply(from, teks, id)
                    limitAdd(serial)
                })
            })
                .catch(() => {
                    client.reply(from, 'Eror! mungkin karna gambar bukan asli dari scene anime. pastikan gambar tersebut hasil screenshot dari scene anime', id)
                })
            } else {
                client.reply(from, 'Tidak ada gambar yang dimuat. Kirim gambar lalu beri caption *!wait*. atau bisa juga dengan cara replyChat gambar tersebut dengan caption *!wait*', id)
            }}
            break;
        case '!ngaji':
            if(isLimit(serial)) return
            ayat = "ayat"
            bhs = ""
            if (body.length > 6) {
            const response = await axios.get('https://api.quran.sutanlab.id/surah')
            const surah = response.data
            var idx = surah.data.findIndex(function(post, index) {
            if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                return true;
            });
            nmr = surah.data[idx].number
            if(!isNaN(nmr)) {
            if(args.length > 3) {
                ayat = args[2]
            }
            if (args.length == 3) {
                var last = function last(array, n) {
                if (array == null) return void 0;
                if (n == null) return array[array.length - 1];
                return array.slice(Math.max(array.length - n, 0));
                };
                ayat = last(args)
            } 
            pesan = ""
            if(isNaN(ayat)) {
                const responsi2 = await axios.get('https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/'+nmr+'.json')
                const {name, name_translations, number_of_ayah, number_of_surah,  recitations} = responsi2.data
                pesan = pesan + "Audio Quran Surah ke-"+number_of_surah+" "+name+" ("+name_translations.ar+") "+ "dengan jumlah "+ number_of_ayah+" ayat\n"
                pesan = pesan + "Dilantunkan oleh "+recitations[0].name+" : "+recitations[0].audio_url+"\n"
                pesan = pesan + "Dilantunkan oleh "+recitations[1].name+" : "+recitations[1].audio_url+"\n"
                pesan = pesan + "Dilantunkan oleh "+recitations[2].name+" : "+recitations[2].audio_url+"\n"
                client.sendText(from, pesan)
            } else {
                const responsi2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+ayat)
                const {data} = responsi2.data
                var last = function last(array, n) {
                if (array == null) return void 0;
                if (n == null) return array[array.length - 1];
                return array.slice(Math.max(array.length - n, 0));
                };
                bhs = last(args)
                pesan = ""
                pesan = pesan + data.text.arab + "\n\n"
                if(bhs == "en") {
                pesan = pesan + data.translation.en
                } else {
                pesan = pesan + data.translation.id
                }
                pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[2]+")"
                await client.sendFileFromUrl(from, data.audio.secondary[0], id)
                await client.reply(from, pesan, id)
                    }
                }
            }
            break;
        case '!tafsir':
            if(isLimit(serial)) return
            if (body.length > 7) {
                const respons = await axios.get('https://api.quran.sutanlab.id/surah')
                const {data} = respons.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                const responsi = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                const {data} = responsi.data
                pesan = ""
                pesan = pesan + "Tafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                pesan = pesan + data.text.arab + "\n\n"
                pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                client.reply(from, pesan, id)
                limitAdd(serial)}
                }
            break;
        case '!surah': {
            if(isLimit(serial)) return
            if(!args.lenght >= 3) return
            const dictzk = body.split(' ')[1];
            const ayat = body.split(' ')[3];
            Surah(dictzk, ayat).then(hasil => {
                client.reply(from, hasil, id)
            }).catch(err => {
                client.reply(from, err)
                limitAdd(serial)
            })}
            break;
        case '!quran': {
            if(isLimit(serial)) return
            axios.get('https://api.banghasan.com/quran/format/json/acak').then((res) => {
                const sr = /{(.*?)}/gi;
                const hs = res.data.acak.id.ayat;
                const ket = `${hs}`.replace(sr, '');
                let hasil = `========{ _*Random Ayat*_ }========\n*[ ${ket} ]*   ${res.data.acak.ar.teks}\n\n${res.data.acak.id.teks}(QS.${res.data.surat.nama}, Ayat ${ket})\n\n=={ _*Processing Sukses # ZJ-Bot*_ }==`;
                client.reply(from, hasil, id);
                limitAdd(serial)
            })}
            break;
        case '!ceklokasi': {
            if(isLimit(serial)) return
            if (!quotedMsg) return client.reply(from, 'Kirim lokasi kamu lalu reply tag lokasimu dengan caption *!ceklokasi*', id)
            if (quotedMsg.type !== 'location') return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
            const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
            if (zoneStatus.kode !== 200) client.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
            let data = ''
            for (let i = 0; i < zoneStatus.data.length; i++) {
                const { zone, region } = zoneStatus.data[i]
                const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                data += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
            }
            const textx = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${data}`
            client.reply(from, textx, id)
            limitAdd(serial)}
            break;
            case '!corona': {
                if(isLimit(serial)) return
                    function intl(str) {
                    var nf = Intl.NumberFormat();
                    return nf.format(str);
                    }
                    if(args[1]){
                        if(args[1] === 'prov'){
                            const province = body.slice(13).toLowerCase()
                            axios.get('https://indonesia-covid-19.mathdro.id/api/provinsi/').then(({data}) => {
                            var founded = false
                            data.data.find(i => {
                        if(i.provinsi.toLowerCase() == province){
                            founded = true
                            client.reply(from, `_*Kasus COVID19 di ${i.provinsi}*_
😷 Positif : ${intl(i.kasusPosi)} kasus   
😇 Sembuh : ${intl(i.kasusSemb)} kasus
😭 Meninggal : ${intl(i.kasusMeni)} kasus
==============================
======{ _*Tips kesehatan*_ }=======
✅Mencuci tangan dengan benar
✅Menggunakan masker
✅Menjaga daya tahan tubuh
✅Menerapkan physical distancing
======{ _*ZJ-Bot Information*_ }======
`, id)
limitAdd(serial)
                                }
                            })
                            if(founded == false) return client.reply(from, `Provinsi ${province} tidak valid, gunakan format formal seperti : DKI Jakarta`, id)
                        })
                    }
                }else{
                    corona().then(hasilCorona => {
                        client.reply(from, hasilCorona, id)
                        limitAdd(serial)
                    }).catch(err => {
                        console.log(err)
                    })
                }}
            break;
        case '!news': {
            if(isLimit(serial)) return
            const respons = await axios.get('http://newsapi.org/v2/top-headlines?country=id&apiKey=3c406ed8dbe4437ebfc9205f2a1a90cc')
            const { totalResults, articles } = respons.data
            res = totalResults
            if (args[1] >= totalResults) {
                res = totalResults
            } else {
                res = args[1]
            }
            i = 0
            pesan = '===={ _*Berita Terbaru Hari Ini*_ }====\n\n'
            for (const isi of articles) {
                i++
                pesan = pesan + `*(${i})* ` + '_' + isi.title + '_' + '\n' + isi.publishedAt + '\n' + isi.description + '\n' + isi.url + '\n\n'
                if (i<res) {
                pesen = pesan + '\n\n'
                } else if(i > res){
                break
                }
            }
            await client.reply(from, pesan, id)
            limitAdd(serial)}
            break;
        case '!trendingtwitter': {
            if(isLimit(serial)) return
            const respons = await axios.get('https://api.haipbis.xyz/trendingtwitter/id')
            const { result, datetime } = respons.data
            res = 38
            if (args[0] >= 38) {
                res = 38
            } else {
                res = args[0]
            }
            i = 0
            pesan = `={ _*Trending Twitter Terbaru Hari Ini*_ }=\n\n${datetime}\n`
            for (const isi of result) {
                i++
                pesan = pesan + `\n` + `*(${i})*\n` + '👉 *Judul* : _' + isi.title + '_' + '\n*👉 Link* : ' + isi.link + '\n👉 *Total Penyelusuran* : ' + isi.count + '\n\n'
                if (i<res) {
                pesen = pesan + '\n\n'
                } else if(i > res){
                break;
                }
            }
            await client.reply(from, pesan, id)
            limitAdd(serial)}
            break;
        case '!waktu':
        case '!jam':
            await client.reply(from, `Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`, id)
            break;
        case '!profile':
        case '!profil':
            var role = 'none'
            if(!isGroupAdmins){role = 'none'}
            if(!isOwner){role = 'none'}
            if(!isPremium){role = 'none'}
            if(serial !== '62887437237167@c.us'){role = 'none'}
            if(isPremium){role = 'User'}
            if(isGroupAdmins){role = 'Tangan Kanan Hokage'}
            if(serial === '62887437237167@c.us'){role = 'Anak Hokage'}
            if(isOwner){role = 'Hokage'}
            if (isGroupMsg) {
                if (!quotedMsg) {
                var Premiumm = premium.includes(author)
                var Adminban = adminban.includes(author)
                var block = banned.includes(author)
                var pic = await client.getProfilePicFromServer(author)
                var namae = pushname
                var groupname = name
                var sts = await client.getStatus(author)
                var adm = isGroupAdmins
                const { status } = sts
            if (pic == undefined) {
            var pfp = errorurl 
            } else {
            var pfp = pic
            } 
            await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n 🔖️ *Username: ${namae}*\n\n💌️ *Status: ${status}*\n\n*💔️ Ban: ${block}*\n\n✨️ *Premium: ${Premiumm}*\n\n✨️ *Admin Ban: ${Adminban}*\n\n✎ *Role : ${role}*\n\n🏛️ *Guild : ${groupname}*\n\n 👑️ *Admin: ${adm}*`, id)
            } if (quotedMsg) {
                var role1 = 'none'
                var qsender = quotedMsgObj.sender.id
            if(isGroupAdmins == qsender){role1 = 'none'}
            if(isOwner == qsender){role1 = 'none'}
            if(isPremium == qsender){role1 = 'none'}
            if(isPremium == qsender){role1 = 'User'}
            if(isGroupAdmins == qsender){role1 = 'Tangan Kanan Hokage'}
            if('62887437237167@c.us' == qsender){role1 = 'Anak Hokage'}
            if(isOwner == qsender){role1 = 'Hokage'}
                var qmid = quotedMsgObj.sender.id
                var Premiumm = premium.includes(qmid)
                var Adminban = adminban.includes(qmid)
                var block = banned.includes(qmid)
                var groupname = name
                var pic = await client.getProfilePicFromServer(qmid)
                var namae = quotedMsgObj.sender.name
                var sts = await client.getStatus(qmid)
                var adm = isGroupAdmins
                const { status } = sts
            if (pic == undefined) {
            var pfp = errorurl 
            } else {
            var pfp = pic
            } 
            await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n 🔖️ *Username: ${namae}*\n\n💌️ *Status: ${status}*\n\n*💔️ Ban: ${block}*\n\n✨️ *Premium: ${Premiumm}*\n\n✨️ *Admin Ban: ${Adminban}*\n\n✎ *Role : ${role1}*\n\n🏛️ *Guild : ${groupname}*\n\n 👑️ *Admin: ${adm}*`, id)  }
                }
            break;
        case '!groupinfo' : {
            if (!isGroupMsg) return client.reply(from, 'Khusus grup su!!!', id) 
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = wel.includes(chat.id)
            var ngrp = nsfwgrp.includes(chat.id)
            var grouppic = await client.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                    var pfp = errorurl
            } else {
                    var pfp = grouppic 
            }
            await client.sendFileFromUrl(from, pfp, 'group.png', `*${groupname}* 

🌐️ *Members: ${totalMem}*
                    
 💌️ *Welcome: ${welgrp}*
                    
⚜️ *NSFW: ${ngrp}*
                    
📃️ *Group Description* 
                    
${desc}`)}
            break;
        case '!say': {
            if(isLimit(serial)) return
             arg = body.trim().split(' ')
             if (arg[1] == 'add') {
                let sayy = body.slice(9)
                say.push(sayy)
                fs.writeFileSync('./lib/say.json', JSON.stringify(say))
                client.reply(from, `berhasil menambahkan *${sayy}* kedalam database`, id)
                limitAdd(serial)
             } else {
                const Say = fs.readFileSync('./lib/say.json')
                const Sayy = JSON.parse(Say)
                const randsay = Math.floor(Math.random() * Sayy.length)
                const rindisay = Sayy[randsay]
                await client.reply(from, `${rindisay}`, id)
                limitAdd(serial)
                 }}
             break;
        case '!simsimi': {
             arg1 = body.trim().split(' ')
             if (!isPremium) return await client.reply(from, 'Khusus premium gan :v', id)
             if (isGroupMsg) return await client.reply(from, 'Untuk dichat aja ya kak. kalo grup pake *!si [teks]*', id)
             if (!isGroupMsg){
             if (arg1[1] == 'start') {
                simi.push(chatId)
                fs.writeFileSync('./lib/simsimi.json', JSON.stringify(simi))
                await client.reply(from, `Mode SimSimi telah diaktifkan!`, id)
             } else if (arg1[1] == 'stop') {
                let inx = simi.indexOf(from)
                simi.splice(inx, 1)
                fs.writeFileSync('./lib/simsimi.json', JSON.stringify(simi))
                await client.reply(from, `Mode SimSimi telah dimatikan!`, id)
             }
            }else if (arg1[1] == 'help') {
                fs.readFileSync('./lib/simsimi.json', JSON.stringify(simi))
                await client.reply(from, `Mode SimSimi telah dimatikan!`, id)
             }
            }
             break;
        case '!enable': {
             arg1 = body.trim().split(' ')
             if (!isGroupMsg) return client.reply(from, 'Khusus grup', id)
             if (!isGroupAdmins) return client.reply(from, 'Hanya admin yang bisa menggunakan perintah ini', id)
             if (arg1[1] == 'welcome') {
                if(isGrupid(groupId)) return reply('Sudah ada di didatabase')
                wel.push(groupId)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
                client.reply(from, `Welcome sekarang telah didaftarkan di group *${name}*`, id)
             } else if (arg1[1] == 'nsfw') {
                const isNsfwBund = (groupId) => nsfwgrp.includes(groupId) ? true : false
                nsfwgrp.push(chat.id)
                fs.writeFileSync('./lib/nsfw.json', JSON.stringify(nsfwgrp))
                client.reply(from, `NSFW sekarang telah didaftarkan digroup *${name}*`, id)
             }}
             break
        case '!disable': {
             arg2 = body.trim().split(' ')
             if (!isGroupMsg) return client.reply(from, '', id)
             if (!isGroupAdmins) return client.reply(from, 'Hanya admin yang bisa menggunakan perintah ini', id)
             if (arg2[1] == 'welcome') {
                let inx = wel.indexOf(from)
                wel.splice(inx, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(wel))
                client.reply(from, `Welcome sekarang telah dibatalkan di group *${name}*`, id)
             } else if (arg2[1] == 'nsfw') {
                let inx = nsfwgrp.indexOf(from)
                nsfwgrp.splice(inx, 1)
                fs.writeFileSync('./lib/nsfw.json', JSON.stringify(nsfwgrp))
                client.reply(from, `NSFW sekarang telah dibatalkan di group *${name}*`, id)
             }}
            break
        case '!anime':
            if(isLimit(serial)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime darling in the franxx*', id)
            const animekk = await get.get(`https://zebri-api.herokuapp.com/api/kuso?q=${body.slice(7)}`).json()
            if (animekk.error) return client.reply(from, animekk.error, id)
            const res_animekkk = `Title: *${animekk.title}*\n\n${animekk.info}\n\nSinopsis: ${animekk.sinopsis}\n\nLink Download:\n${animekk.link_dl}`
            client.sendFileFromUrl(from, animekk.thumb, 'kusonime.jpg', res_animekkk, id)
            limitAdd(serial)
            break
        case '!anime1': {
            if(isLimit(serial)) return
            const animename = body.slice(7)
            if(!animename) return await reply(from, 'Maaf tolong masukan nama anime yang anda cari', id)
            anime(animename).then(hasil => {
                client.reply(from, hasil, id)
                limitAdd(serial)
            }).catch(err => {
                client.reply(from, err, id)
            })}
            break
        case '!ansearch':
            if(isLimit(serial)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime naruto*', id)
            const animek = await get.get('https://zebri-api.herokuapp.com/api/dewabatch?q=' + body.slice(10)+'').json()
            if (animek.error) return client.reply(from, animek.error, id)
            const res_animek = `${animek.result}\n\n${animek.sinopsis}`
            client.sendFileFromUrl(from, animek.thumb, 'dewabatch.jpg', res_animek, id)
            limitAdd(serial)
            break
        case '!quotemaker': {
            if(isLimit(serial)) return
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                await client.reply(from, mess.wait, id)
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    client.sendFile(from, amsu, 'quotesmaker.jpg','NIH CUY !!!').then(cih => console.log(cih)).catch(err => {
                       client.reply(from, mess.error.Qm, id)
                    })
                    limitAdd(serial)
                })
            } else {
                await client.reply(from, 'Usage: \n!quotemaker |teks|author|tema\n\nEx :\n!quotemaker |contoh gan|bacot|random', id)
            }}
            break
        case '!twitterinfo': {
            if(isLimit(serial)) return
            if (args.length === 1)  return await client.reply(from, 'Kirim perintah *!twitterinfo [username]*\nConntoh *!twitterinfo arianagrande*', id)
            const twtinfo = await get.get(`https://rest.farzain.com/api/twitter.php?id=${args[1]}&apikey=4mpk6473CGeRzJbWi5Tz3pMWF`).json()
            if (twtinfo.result.profilepicture == '') return await client.reply(from, twtinfo.result.name, id)
            const { result } = twtinfo
            const { name, screen_name, description, profilebanner, profilepicture, followers, following, likes, tweet, joined} = result
            const profil = profilepicture.replace(/\\/g,'')
            const caps1 = `👉 *Nama* : ${name}\n👉 *Username* : ${screen_name}\n👉 *Jumlah Followers* : ${followers}\n👉 *Jumlah Following* : ${following}\n👉 *Jumlah like* : ${likes}\n👉 *Jumlah tweet* : ${tweet}\n👉 *Deskripsi* : ${description}\n\n👉 *Bergabung pada* : ${joined}\n`
            client.sendFileFromUrl(from, profil, 'Profiletwt.jpg', caps1, id)
            limitAdd(serial)}
            break
        case '!ptl': 
        if(isLimit(serial)) return
        if(args.length === 1) return await client.reply(from, 'Usage => *!ptl [cewek/cowok]*\ncontoh = *!ptl cewek*', id)
        if(args[1] === 'cewek'){
            const items = ["cewe cantik", "hijab cantik", "korean girl", "chinese girl", "japan girl"]
            const cewe = items[Math.floor(Math.random() * items.length)]
            if (args.length === 1)  return await client.reply(from, 'Kirim perintah *!ptl [query]*\nConntoh *!ptl korean style*', id)
            const ptl = await get.get(`http://api.fdci.se/rep.php?gambar=${cewe}`).json()
            if(ptl == null || ptl == undefined || ptl == '') return await client.reply(from, 'Query nya salah bambang!', id)
            let ptl2 = ptl[Math.floor(Math.random() * ptl.length)]
            const ptl3 = ptl2.replace(/\\/g,'')
            const cap1 = 'nih cewek cakep'
            client.sendFileFromUrl(from, ptl3, 'ptl.jpg', cap1, id)
            limitAdd(serial)}
        if(args[1] === 'cowok'){
            const items = ["cowo ganteng", "cogan", "korean boy", "chinese boy", "japan boy"]
            const cewe = items[Math.floor(Math.random() * items.length)]
            if (args.length === 1)  return await client.reply(from, 'Kirim perintah *!ptl [query]*\nConntoh *!ptl korean style*', id)
            const pt4 = await get.get(`http://api.fdci.se/rep.php?gambar=${cewe}`).json()
            if(pt4 == null || pt4 == undefined || pt4 == '') return await client.reply(from, 'Query nya salah bambang!', id)
            let pt5 = pt4[Math.floor(Math.random() * pt4.length)]
            const pt6 = pt5.replace(/\\/g,'')
            const capt = 'nih cogan'
            client.sendFileFromUrl(from, pt6, 'ptl.jpg', capt, id)
            limitAdd(serial)}
            break
        case '!infofilm': {
            if(isLimit(serial)) return
            let ind = body.slice(10)
            if (args.length === 1)  return await client.reply(from, 'Kirim perintah *!infofilm [Judul Film]*\nConntoh *!infofilm deadpool*', id)
            const ind1 = await get.get(`https://rest.farzain.com/api/film.php?id=${ind}&apikey=4mpk6473CGeRzJbWi5Tz3pMWF`).json()
            if (ind1.status == 400) return await client.reply(from, '*[EROR]* mungkin judulnya salah atau servernya yang lagi disable', id)
            const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Language, Country, Awards, Poster, Plot, Metascore, imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website } = ind1
            const gambar = await Poster.replace(/\\/g,'')
            const cap = `👉 *Judul* : ${Title}\n👉 *Tahun* : ${Year}\n👉 *Country* : ${Country}\n👉 *Bahasa* : ${Language}\n👉 *Rated* : ${Rated}\n👉 *imdbVote/Rating* : ${imdbVotes}/${imdbRating}\n👉 *Awards* : ${Awards}\n👉 *Dirilis pada* : ${Released}\n👉 *Durasi video* : ${Runtime}\n👉 *Genre* : ${Genre}\n👉 *Director* : ${Director}\n👉 *Penulis* : ${Writer}\n👉 *Pemeran* : ${Actors}\n👉 *Sinopsis* : ${Plot}`
            await client.sendFileFromUrl(from, gambar, 'infofilm.jpg', cap, id)
            limitAdd(serial)
        if (gambar == '' || gambar == undefined) {await client.reply(from, cap, id)
            limitAdd(serial)}
                }  
            break;  
        case '!actpremi': {
            if(!isOwner) return await client.reply(from, 'Hanya owner yang bisa menggunakan perintah ini !', id)
            let opremi = body.slice(10).replace(/ /g,'')
            let opremi1 = opremi.replace(/\+|\-/g,'')
            let opremi2 = opremi1.replace(/\@/g,'')
            premium.push(opremi2+'@c.us')
            fs.writeFileSync('./lib/premium.json', JSON.stringify(premium))
                client.reply(from, 'Succes promosi premium target!', message.id)}
            break;
        case '!deactpremi': {
            if(!isOwner) return await client.reply(from, 'Hanya owner yang bisa menggunakan perintah ini !', id)
            let dpremi = body.slice(12).replace(/ /g,'')
            let dpremi1 = dpremi.replace(/\+|\-/g,'')
            let dpremi2 = dpremi1.replace(/\@/g,'')
            let deact1 = premium.indexOf(dpremi2+'@c.us')
            let inx = premium.indexOf(deact1)
            premi.splice(inx, 1)
            fs.writeFileSync('./lib/premium.json', JSON.stringify(premi))
            client.reply(from, 'Succes membatalkan premium target!', message.id)}
            break;
        case '!actadminban': {
            if(!isOwner) return client.reply(from, 'Hanya owner yang bisa menggunakan perintah ini !', id)
            adminban.push(args[1]+'@c.us')
            fs.writeFileSync('./lib/adminban.json', JSON.stringify(adminban))
                client.reply(from, 'Succes promosi nomor target menjadi admin ban!', message.id)}
            break;
        case '!deactadminban': {
            if(!isOwner) return client.reply(from, 'Hanya owner yang bisa menggunakan perintah ini !', message.id)
            const deact3 = args[1].replace(/\@/g,'')
            let deact2 = adminban.indexOf(deact3+'@c.us')
            adminban.splice(deact2,1)
            fs.writeFileSync('./lib/adminban.json', JSON.stringify(adminban))
                client.reply(from, 'Succes membatalkan admin ban target!', message.id)}
            break;
        case '!bc':{
            if (!isOwner) return await client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly){ await client.sendText(ids, `====={ ZJ-BOT Broadcast }=====\n\n${msg}\n\n==============================`)
            }
        }
            await client.reply(from, 'Broadcast Success!', id)}
            break;
        case '!adminlist':
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `👉 @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await client.sendTextWithMentions(from, mimin)
            break;
        case '!ownergroup':
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break;
        case '!mentionall':
            let ahay = body.slice(12)
            if(ahay === 0){ahay = ''}
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = `========={ *_Mention All_* }=========\n\n${ahay}\n\n==============================\n`
            for (let i = 0; i < groupMem.length; i++) {
                hehe += ''
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '=========={ *_ZJ-Bot_* }=========='
            await sleep(2000)
            await client.sendTextWithMentions(from, hehe)
            break;
        case '!kickall':
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            await client.reply(from, 'Succes kick all member', id)
            break;
            case '!clearall': {
                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                const allChatz = await client.getAllChats()
                for (let dchat of allChatz) {
                    await client.deleteChat(dchat.id)
                }
                client.reply(from, 'Succes clear all chat!', id)}
                break;
        case '!add': {
            let orang = body.slice(5).replace(/ /g,'')
            let orang1 = orang.replace(/\+|\-/g,'')
            if (!isGroupMsg) return await client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return await client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await client.addParticipant(from,`${orang}@c.us`)
            } catch {
                await client.reply(from, mess.error.Ad, id)
            }}
            break;
        case '!kick': {
            if (!isGroupMsg) return await client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }}
            break;
        case '!leave':
            if (!isGroupMsg) return await client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return await client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break;
        case '!promote':
            if (!isGroupMsg) return await client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return await client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break;
        case '!demote':
            if (!isGroupMsg) return await client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return await client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break;
        case '!join':
            const argsss = body.trim().split(' ')
            const log = await client.inviteInfo(argsss[1])
            if(log == "401") return client.sendText(from, 'Link group tidak valid atau BOT terlalu sering keluar!')
            if(isOwner){
                await client.joinGroupViaLink(argsss[1]).then(async () => {
                    await client.reply(from, 'Berhasil join ke group via link!', id)
                    await client.sendText(log.id, 'Halo semuanya, saya adalah ZJ-Bot. gunakan *!menu* untuk menggunakan saya :D')
                })
            }else{ await client.reply(from, 'Bot ingin masuk grup? caranya donasi.\n5k => 1 minggu\n15k => 1 bulan\n50k => 1 tahun (promo bulan ini)\n\nlalu kirim bukti pembayaran tersebut ke contact dibawah ini.', id)
            client.sendContact(chatId, '6283174042679@c.us')
            }
            break;
        case '!delete': {
            if (!isGroupMsg) return await client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!quotedMsg) return await client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return await client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)}
            break;
        case '!getses':
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png', 'NIH CUY !!!', id)
            break;
        case '!status': {
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            client.reply(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`, id)}
            break;
        case '!lirik': {
            if(isLimit(serial)) return
            if (args.length == 1) return await client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            console.log(lagu)
            const lirik = await liriklagu(lagu)
            await client.reply(from, lirik, id)
            limitAdd(serial)}
            break;
        case '!namaninja': {
            if(isLimit(serial)) return
            if (args.length == 1) return await client.reply(from, 'Kirim perintah *!namaninja [teks]*, contoh *!namaninja riko*', id)
            const nin = body.slice(11)
            console.log(nin)
            const nama = await namaninja(nin)
            await client.reply(from, nama, id)
            limitAdd(serial)}
            break;
        case '!gombal':
            if(isLimit(serial)) return
            const gom = await gombal()
            client.reply(from, `${gom}`, id)
            limitAdd(serial)
            break;
        case '!listblock': {
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `👉 ${i.replace(/@c.us/g,'')}\n`
            }
            await client.reply(from, hih, id) }
            break;
        case '!jadwalshalat': {
            if(isLimit(serial)) return
            if (args.length === 1) return await client.reply(from, '[ ERROR ] Kirim perintah *!jadwalShalat [daerah]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*')
            const daerah = body.slice(14)
            const jadwalShalat = await get.get(`https://zebri-api.herokuapp.com/api/jadwalshalat?daerah=${daerah}`).json()
            if (jadwalShalat.error) return await client.reply(from, jadwalShalat.error, id)
            const { Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya } = await jadwalShalat
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
            await client.reply(from, resultJadwal, id)
            limitAdd(serial)}
            break;
        case '!listchannel': {
            await client.reply(from, listChannel, id)}
            break;
        case '!jadwaltv': {
            if(isLimit(serial)) return
            if (args.length === 1) return await client.reply(from, 'Kirim perintah *!jadwaltv [channel]*\nContoh: *!jadwaltv antv', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            await client.reply(from, jadwal, id)
            limitAdd(serial)}
            break;
        case '!mirip': {
            if(isLimit(serial)) return
            let name = body.trim().split(' ').slice(1).toString().replace(/,/g, ' ')
            let mirip = ["mang oleh", "monyet", "biawak", "buaya", "ngeteh asw", "mang garox", "yang lek", "babi", "anjing", "rozie jelek", "agung konsol", "upil gajah", "lee min ho", "afghan"]
            const random1 = mirip[Math.floor(Math.random() * (mirip.length))]
            client.reply(from, `*${name}* mirip dengan *${random1}*`, id)
            limitAdd(serial)}
            break;
        case '!gay': {
            if(isLimit(serial)) return
            let name = body.trim().split(' ').slice(1).toString().replace(/,/g, ' ')
            const random = await Math.floor(Math.random() * (100 - 1) + 1)
            if(random < 15) return await client.reply(from, `Tingkat Gay *${name}* adalah *${random}%*.\n==============================\nNote : *Slow elu aman bro*\n==============================`, id)
            if(random < 50) return await client.reply(from, `Tingkat Gay *${name}* adalah *${random}%*.\n==============================\nNote : *Anda masih bisa terselamatkan walau saya agak jijik*\n==============================`, id)
            if(random < 75) return await client.reply(from, `Tingkat Gay *${name}* adalah *${random}%*.\n==============================\nNote : *Waspada uy elu udah mau masuk tahap bahaya!!!*\n==============================`, id)
            if(random <= 100) return await client.reply(from, `Tingkat Gay *${name}* adalah *${random}%*.\n==============================\nNote : *JANGAN DEKET-DEKET W SU!!!*\n==============================`, id)
            limitAdd(serial)}
            break;
        case '!pantun': {
            if(isLimit(serial)) return
            fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-pantun-pakboy.txt')
                .then(res => res.text())
                .then(body => {
                let tod = body.split("\n");
                let pjr = tod[Math.floor(Math.random() * tod.length)];
                let peb = pjr.replace(/pjrx-line/g,"\n");
              client.reply(from, `${peb}`, id)
              limitAdd(serial)
                })}
            break;
        case '!katabijak': {
            if(isLimit(serial)) return
            fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-kata-bijak.txt')
                .then(res => res.text())
                .then(body => {
                let tod = body.split("\n");
                let pjr = tod[Math.floor(Math.random() * tod.length)];
               client.reply(from, `${pjr}`, id)
               limitAdd(serial)
                })}
            break;
        case '!randomanime2': {
            if(isLimit(serial)) return
            fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-gambar-anime.txt')
                .then(res => res.text())
                .then(body => {
                let tod = body.split("\n");
                let pjr = tod[Math.floor(Math.random() * tod.length)];
               client.sendFileFromUrl(from, `${pjr}`, 'randanime2.jpg', 'random anime!', id)
               limitAdd(serial)
                })}
            break;
        case '!cariindohot': {
            if(!isPremium) return client.reply(from, 'khusus premium gan :v', id)
            if(isGroupMsg) return client.reply(from, 'Di private chat bot aja ya gan', id)
            let cari = body.slice(13)
            const indohot = await get.get(`https://masgi.herokuapp.com/api/indohot2?q=${cari}`).json()
            const {status, message, data} = indohot
            const {judul, genre, country, durasi, url} = data
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `Judul: ${judul}\nGenre: ${genre}\nNegara: ${country}\nDurasi: ${durasi}\nUrl: ${url}`, id)}
            break;
        case '!indohot': {
            if(!isPremium) return client.reply(from, 'khusus premium gan :v', id)
            if(isGroupMsg) return client.reply(from, 'Di private chat bot aja ya gan', id)
            const indohot1 = await get.get('https://masgi.herokuapp.com/api/indohot').json()
            const {status, message, data} = indohot1
            const {judul, genre, country, durasi, url} = data
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `Judul: ${judul}\nGenre: ${genre}\nNegara: ${country}\nDurasi: ${durasi}\nUrl: ${url}`, id)}
            break;
         case '!cersex':
         case '!cersex1': {
            if(isLimit(serial)) return
            if(isGroupMsg) return client.reply(from, 'Khusus private chat gan', id)
            const cersex1 = await get.get('https://masgi.herokuapp.com/api/cersex1').json()
            const {status, message, data} = cersex1
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `Judul: ${data.judul}\nArticle:\n${data.article}`, id)
            limitAdd(serial)}
            break;
        case '!cersex2': {
            if(isLimit(serial)) return
            if(isGroupMsg) return client.reply(from, 'Khusus private chat gan', id)
            const cersex2 = await get.get('https://masgi.herokuapp.com/api/cersex2').json()
            const {status, message, data} = cersex2
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `Judul: ${data.judul}\nArticle:\n${data.article}`, id)
            limitAdd(serial)}
            break;
        case '!puisi':
        case '!puisi1': {
            if(isLimit(serial)) return
            const puisi1 = await get.get('https://masgi.herokuapp.com/api/puisi1').json()
            const {status, message, data} = puisi1
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `${data}`, id)
            limitAdd(serial)}
            break;
        case '!puisi2': {
            if(isLimit(serial)) return
            const puisi2 = await get.get('https://masgi.herokuapp.com/api/puisi2').json()
            const {status, message, data} = puisi2
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `${data}`, id)
            limitAdd(serial)}
            break;
        case '!puisi3': {
            if(isLimit(serial)) return
            const puisi3 = await get.get('https://masgi.herokuapp.com/api/puisi3').json()
            const {status, message, data} = puisi3
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `${data}`, id)
            limitAdd(serial)}
            break;
        case '!cerpen': {
            if(isLimit(serial)) return
            const cerp = await get.get('https://masgi.herokuapp.com/api/cerpen').json()
            const {status, message, data} = cerp
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `${data}`, id)
            limitAdd(serial)}
            break;
        case '!mojok': {
            if(isLimit(serial)) return
            const mojo = await get.get('https://masgi.herokuapp.com/api/mojok').json()
            const {data, message, status} = mojo
            const {url, judul, date, category, article} = data
            if(status != true) return client.reply(from, 'Mungkin servernya sedang disable gan :v', id)
            await client.reply(from, `
👉 Judul: ${judul}
👉 Tanggal: ${date}
👉 Kategori: ${category}
👉 Url: ${url}
👉 Artikel: 👇👇👇

${article}
`, id)}
            limitAdd(serial)
            break;
        case '!cekjodoh': {
            if(isLimit(serial)) return
            if(args = 1) return await client.reply(from, 'Format: !cekjodoh [Nama1|Nama2]')
            var body1 = body.split('!cekjodoh ')[1]
            var nama1 = body1.split("&")[0];
            var nama2 = body1.split('&')[1];
            const cek = await get.get(`https://api.i-tech.id/tools/cekjodoh?key=X5sNpM-IdW6le-ETXOVe-uA5bFn-Zhty7n&query=${nama1}-${nama2}`).json()
            await client.reply(from, cek.result, id)
            limitAdd(serial)}
            break;
        case '!fakta': {
            if(isLimit(serial)) return
            fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-fakta-unik.txt')
            .then(res => res.text())
            .then(body => {
	        let tod = body.split("\n")
	        let pjr = tod[Math.floor(Math.random() * tod.length)]
            client.reply(from, pjr, id)
            limitAdd(serial)
	        })}
            break;
        case '!jadwaltvnow': {
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            await client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            limitAdd(serial)}
            break;
        case '!waifu': {
            if(isLimit(serial)) return
            const waifu = await get.get('https://zebri-api.herokuapp.com/api/waifu?apiKey=zebrijunitu').json()
            client.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `👉 Name : ${waifu.name}\n👉 Description : ${waifu.desc}\n\n👉 Source : ${waifu.source}`, id)
            limitAdd(serial)}
            break;
        case '!waifu2': {
            if(isLimit(serial)) return
            const waifu2 = await get.get('https://api.haipbis.xyz/waifu').json()
            client.sendFileFromUrl(from, waifu2.image, 'Waifu.jpg', `${waifu2.waifu}`, id)
            limitAdd(serial)}
            break;
        case '!husbu':
            if(isLimit(serial)) return
            const diti = fs.readFileSync('./lib/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            limitAdd(serial)
            break; 
        case '!fetish': {
            if (isGroupMsg){
            let request = body.trim().split(/ +/).slice(1).join(' ')
            if (!isnsfw) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*' ,id)
            if(isnsfw) {
            if (!request) {
                client.reply(from, 'Silakan masukkan genre yang tersedia *[ahegao, armpits, belly, boobs, booty, feets, necks, sideboobs, thighs]*', id)}
                client.reply(from, '_*Sedang mencari...*_', id)
            if (request === 'armpits') {
                fetish.armpits()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'feets') {
                fetish.feets()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'thighs') {
                fetish.thighs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'booty') {
                fetish.booty()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'boobs') {
                fetish.boobs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'necks') {
                fetish.necks()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'belly') {
                fetish.belly()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'sideboobs') {
                fetish.sideboobs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else if (request === 'ahegao') {
                fetish.ahegao()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                })
                .catch((err) => console.error(err))
            } else {
                client.reply(from, 'Maaf genre yang tersedia hanya *[ahegao, armpits, belly, boobs, booty, feets, necks, sideboobs, thighs]*', id)
                }}
            }
            } 
            if (!isGroupMsg) {
                let request = body.trim().split(/ +/).slice(1).join(' ')
            if (!request) {
                client.reply(from, 'Silakan masukkan genre yang tersedia *[ahegao, armpits, belly, boobs, booty, feets, necks, sideboobs, thighs]*', id)
            }
            client.reply(from, '_*Sedang mencari...*_', id)
            if (request === 'armpits') {
                if(isLimit(serial)) return
                fetish.armpits()
                .then(({subreddit, title, url, author}) => {
                    client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                    limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'feets') {
                if(isLimit(serial)) return
                fetish.feets()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'thighs') {
                if(isLimit(serial)) return
                fetish.thighs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'booty') {
                if(isLimit(serial)) return
                fetish.booty()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'boobs') {
                if(isLimit(serial)) return
                fetish.boobs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'necks') {
                if(isLimit(serial)) return
                fetish.necks()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'belly') {
                if(isLimit(serial)) return
                fetish.belly()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'sideboobs') {
                if(isLimit(serial)) return
                fetish.sideboobs()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else if (request === 'ahegao') {
                if(isLimit(serial)) return
                fetish.ahegao()
                .then(({subreddit, title, url, author}) => {
                client.sendFileFromUrl(from, `${url}`, 'fetish.jpg', `${title}\nTag: r/${subreddit}\nAuthor: u/${author}`, id)
                limitAdd(serial)
                })
                .catch((err) => console.error(err))
            } else {
                client.reply(from, 'Maaf genre yang tersedia hanya *[ahegao, armpits, belly, boobs, booty, feets, necks, sideboobs, thighs]*', id)
            }}
            break
        case '!randomhentai':
         if ((isGroupMsg) && (!isnsfw)) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*', id)
         if (!isGroupMsg) {
            if(isLimit(serial)) return
            const hen = await get.get('https://api.computerfreaker.cf/v1/hentai').json()
            let rhen = hen.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, rhen, `hentaineko.jpg`, 'Nih hentai gan!', id)
            limitAdd(serial)
        }
        if ((isGroupMsg) && (isnsfw)) {
            const hen = await get.get('https://api.computerfreaker.cf/v1/hentai').json()
            let rhen = hen.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, rhen, `hentaineko.jpg`, 'Nih hentai gan!', id)
        }
            break;
        case '!randomnsfwneko': 
        if ((isGroupMsg && !isnsfw)) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*', id)
        if (!isGroupMsg) {
            if(isLimit(serial)) return
            const nekoh = await get.get('https://api.computerfreaker.cf/v1/nsfwneko').json()
            let nekonimeh = nekoh.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, nekonimeh, `hentaineko.jpg`, 'Nih hentai neko gan!', id)
            limitAdd(serial)
        }
        if ((isGroupMsg) && (isnsfw)) {
            const nekoh = await get.get('https://api.computerfreaker.cf/v1/nsfwneko').json()
            let nekonimeh = nekoh.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, nekonimeh, `hentaineko.jpg`, 'Nih hentai neko gan!', id)
            }
        break;
        case '!lewd': {
            if (!isGroupMsg) {
                if(isLimit(serial)) return
                lewd.random()
                .then(({ subreddit, title, url, author }) => {
                    client.sendFileFromUrl(from, `${url}`, 'lewd.jpg', `${title}\nTag: *${subreddit}*\nAuthor: *${author}*`, id)
                    limitAdd(serial)
                })
                .catch((err) => console.error(err))}}
                if (isGroupMsg)  {
                    if (!isnsfw) return await client.reply(from, 'NSFW group ini belum terdaftar!\nSuruh admin group mengaktifkan fitur ini dengan cara ketik *!enable nsfw*' ,id)
                    if (isnsfw) {
                        lewd.random()
                        .then(({ subreddit, title, url, author }) => {
                            client.sendFileFromUrl(from, `${url}`, 'lewd.jpg', `${title}\nTag: *${subreddit}*\nAuthor: *${author}*`, id)
                        })
                        .catch((err) => console.error(err))  
                    }
                }
            break;
        case '!randomnekonime':
            if(isLimit(serial)) return
            const neko = await get.get('https://api.computerfreaker.cf/v1/neko').json()
            let nekonime = neko.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, nekonime, `neko.jpg`, 'Nyaaa >///<\n\AnimeNeko!', id)
            limitAdd(serial)
            break;
        case '!randomtrapnime':
            if(isLimit(serial)) return
            const tasu = await get.get('https://api.computerfreaker.cf/v1/trap').json()
            let trapsu = tasu.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, trapsu, `trap.jpg`, 'Trap!', id)
            limitAdd(serial)
            break;
        case '!randomanime': {
            if(isLimit(serial)) return
            const nimek = await get.get('https://api.computerfreaker.cf/v1/anime').json()
            let tolol = nimek.url.replace(/\\/g,'')
            client.sendFileFromUrl(from, tolol, `Anime.jpg`, 'Nih anime gan!', id)
            limitAdd(serial)}
            break;
         case '!chord': {
            if(isLimit(serial)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await get.get('https://zebri-api.herokuapp.com/api/chord?q='+ query__+'').json()
            if (chord.error) return client.reply(from, chord.error, id)
            client.reply(from, chord.result, id)
            limitAdd(serial)}
            break;
        case '!loli': {
            if(isLimit(serial)) return
            var lol = ["https://cdn130.picsart.com/267837475007201.jpg", "https://i.redd.it/kqlvndw9jv411.png", "https://i.pinimg.com/736x/f1/b0/f4/f1b0f445584592117dd7dc29e9f79920.jpg", "https://media.makeameme.org/created/fbi-open-up-5c7420.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiyC5waQMqExXZxoXHnnZFE1iyoFuCNwFXiQ&usqp=CAU", "https://i.pinimg.com/originals/20/9c/61/209c617a668e7052d51457378cd136d6.jpg", "https://pics.me.me/moshimoshi-fbi-desu-moshi-moshi-67057578.png"]
            const ranlol = lol[Math.floor(Math.random() * (lol.length))]
            const loli = await get.get('https://zebri-api.herokuapp.com/api/randomloli?apiKey=zebrijunitu').json()
            await client.sendFileFromUrl(from, loli.result, 'loli.jpeg', 'Lolinya om', id);
            client.sendStickerfromUrl(from, ranlol, { method : 'get'} )
            limitAdd(serial)}
            break;
        case '!anjing':
            if(isLimit(serial)) return
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'ANJING', id)
            limitAdd(serial)
            break;
        case '!kucing':
            if(isLimit(serial)) return
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Nih Kucing', id)
            limitAdd(serial)
            break;
        case '!pokemon':
            if(isLimit(serial)) return
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png', id)
            limitAdd(serial)
            break;
        case '!wanime':
            if(isLimit(serial)) return
            const walnime = ['https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            client.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            limitAdd(serial)
            break;
        case '!quote':
        case '!quotes': {
            if(isLimit(serial)) return
            const quotes = await get.get('https://zebri-api.herokuapp.com/api/randomquotes').json()
            await client.reply(from, `👉 *Quotes* : ${quotes.quotes}\n👉 *Author* : ${quotes.author}`, id)
            limitAdd(serial)
        }
            break;
        case '!qnime':
            if(isLimit(serial)) return
            if(args[1]){
                if(args[1] === 'anime'){
                    const anime = body.slice(13)
                    axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                        let quote = data.data[0].quote 
                        let char = data.data[0].character
                        let anime = data.data[0].anime
                        reply(`"${quote}"\n\n${char} from ${anime}`)
                        limitAdd(serial)
                    }).catch(err => {
                        reply('Quote Char/Anime tidak ditemukan!')
                    })
                }else{
                    const char = body.slice(12)
                    axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                        let quote = data.data[0].quote 
                        let char = data.data[0].character
                        let anime = data.data[0].anime
                        reply(`"${quote}"\n\n${char} from ${anime}`)
                        limitAdd(serial)
                    }).catch(err => {
                        reply('Quote Char/Anime tidak ditemukan!')
                        })
                    }
                }else{
                axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                    let quote = data.data[0].quote 
                    let char = data.data[0].character
                    let anime = data.data[0].anime
                    reply(`"${quote}"\n\n${char} from ${anime}`)
                    limitAdd(serial)
                }).catch(err => {
                    console.log(err)
                })
            }
            break;
        case '!meme':
            if(isLimit(serial)) return
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            console.log(nsfw)
            await client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            limitAdd(serial)
            break;
        case '!listsurah' :
            client.reply(from, listsurah, id)
            break
        case '!bugreport':
            const bug = body.slice(11)
            if(isGroupMsg){
                client.sendText(ownerNumber, `*[BUG REPORT]*\nNO PENGIRIM : wa.me/${serial.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                client.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }else{
                client.sendText(ownerNumber, `*[BUG REPORT]*\nNO PENGIRIM : wa.me/${serial.match(/\d+/g)}\n\n${bug}`)
            client.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break;
        case '!ask': {
            const question = body.slice(5)
            const answer = responses[Math.floor(Math.random() * (responses.length))]
            if (!question) return await client.reply(from, 'Format salah kirim *!ask [pertanyaan]*\ncontoh : *!ask apakah aku ganteng*', id)
            await client.reply(from, `Pertanyaan: *${question}* \n\nJawaban: *${answer}*`, id)}
            break;
        case '!apakah':
        case '!bisakah':{
            let bkr = body.slice(8)
            yoy = Math.floor(Math.random() * 2) + 1
            if(args.includes('selain')){
            client.sendPtt(from, `./lib/fitur/3.mp3`, id)
            }else{
            client.sendPtt(from, `./lib/fitur/${yoy}.mp3`, id)
                }
            }
            break
        case '!whitelistadd':
            if(isWhite(chatId)) return reply('Sudah ada di whitelist')
            if(!isOwner) return
            setting.whitelist.push(chatId)
            fs.writeFileSync('./settings/setting.json', JSON.stringify(setting, null, 2))
            reply('Success!')
            break;
        case '!block':
            if(!isOwner) return
            const ntah2 = args[1].replace(/\@/g,'')
            if(args.length >= 2){
                let block = `${ntah2}@c.us`
                await reply(`Sukses blok ${args[1]}!`)
            .then(() => client.contactBlock(block))
            }
            break;
        case '!unblock':
            if(!isOwner) return
            const ntah1 = args[1].replace(/\@/g,'')
            if(args.length >= 2){
                let unblock = `${ntah1}@c.us`
                await client.contactUnblock(unblock).then(()=>{
                    reply(`Sukses unblok ${args[1]}!`)
                })
            }
            break;
        case '!resetlimit':
            if(isOwner){
                const obj = []
                limit = obj
                msgLimit = obj
                fs.writeFileSync('./settings/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./settings/msgLimit.json', JSON.stringify(obj));
                reply('*Sukses mereset limit!*')
            }
            break;
        case '!ban':
            if(args.length === 1) return await reply('*Format*: !ban @tagtarget')
            const apasih = args[1].replace(/\@/g,'')
            if(!isAdminBan) return await reply('Hanya bisa digunakan oleh admin ban!')
            if(apasih == isPremium){
                client.reply(from, 'Premium kebal dari ban gan. Dia pakek ilmu hitam', id)
                return true;
            } else {
                banned.push(apasih+'@c.us')
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                client.reply(from, 'Succes ban target!', id)
            }
            break;
        case '!unban':
            if(args.length === 1) return await reply('*Format*: !unban @tagtarget')
            if(!isAdminBan) return await reply('Hanya bisa digunakan oleh admin ban!')
            const apasih1 = args[1].replace(/\@/g,'')
            let inx = banned.indexOf(apasih1+'@c.us')
            banned.splice(inx,1)
            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
            reply('Succes unban target!')
            break;
        case '!on':
            if(args[1] = 'banchat'){
                if(setting.banChats === true) return
                if(!isOwner) return
                setting.banChats = true
                banChats = true
                fs.writeFileSync('./settings/setting.json', JSON.stringify(setting, null, 2))
                reply('Global chat telah dimatikan!')
            }
            break;
        case '!off':
            if(args[1] = 'banchat'){
                if(setting.banChats === false) return
                if(!isOwner) return
                setting.banChats = false
                banChats = false
                fs.writeFileSync('./settings/setting.json', JSON.stringify(setting, null, 2))
                reply('Global chat telah diaktifkan!')
            }
            break;
        case '!limit':
            var found = false
            for(let lmt of limit){
                if(lmt.id === serial){
                    if(isPremium) return await reply(`Limit media Private Chat anda tersisa : *∞*\nLimit media Grup anda : *∞*`)
                    if(isOwner) return await reply(`Limit media Private Chat anda tersisa : *∞*\nLimit media Grup anda : *∞*`)
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return reply(`Limit private chat anda hari ini telah habis. Jika ingin menggunakan bot sepuasnya masuk grup atau upgrade nomormu agar bisa memakai bot sepuasnya di private chat tanpa limit.\n*!premium* jika ingin mengupgrade nomormu menjadi premium`)
                    reply(`Limit media Private Chat anda tersisa : *${limitCounts}*\nLimit media Grup anda : *∞*`)
                    found = true
                }
            }
            if (found === false){
                if(isPremium) return await reply(`Limit media Private Chat anda tersisa : *∞*\nLimit media Grup anda : *∞*`)
                if(isOwner) return await reply(`Limit media Private Chat anda tersisa : *∞*\nLimit media Grup anda : *∞*`)
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./settings/limit.json',JSON.stringify(limit, 2));
                reply(`Limit media Private Chat anda tersisa : *${limitCount}*\nLimit media Grup anda : *∞*`)
            }
            break;
        case '!bahasa':
            client.reply(from, bahasa, id)
            break;
        case '!bahasatranslate':
            client.reply(from, bahasatranslate, id)
            break;
        case '!premium':
            client.reply(from, premium1, id)
            break
        case '!donasi':
        case '!donate':
            await client.reply(from, donate, id)
            client.sendContact(chatId, '6283174042679@c.us')
            client.sendContact(chatId, '6285246827575@c.us')
            break;
        case 'Bot' :
        case 'bot' :
        case '!bot' : 
        case 'p' :  
        case 'P' : { 
            var rr = ["Kenapa beb?", "KENAPA SU!!!", "iya sayang ada apa?", "KENAPA SAT!!!", "iya darling?", "PANGGIL AJA TERUSSS!!!!"]  
            const ran = rr[Math.floor(Math.random() * (rr.length))]  
        client.reply(from, `${ran}\nKetik *!menu* jika ingin melihat menu`, id)  }  
            break;
        case '!menu1':
            client.reply(from, menu1, id)
            break;
        case '!menu2':
            client.reply(from, menu2, id)
            break;
        case '!menu3':
            client.reply(from, menu3, id)
            break;
        case '!menu4':
            client.reply(from, menu4, id)
            break;
        case '!menu5':
            client.reply(from, menu5, id)
            break;
        case '!menu6':
            client.reply(from, menu6, id)
            break;
        case '!menu7':
            client.reply(from, menu7, id)
            break;
        case '!menu8':
            client.reply(from, menu8, id)
            break;
        case '!ss':
            const _query = body.slice(4)
            if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ss [web]*\nContoh *!ss https://google.com*', id)
            await ss(_query).then(() => client.sendFile(from, './media/img/screenshot.jpeg', 'ss.jpeg', '', id))
            .catch(() => client.reply(from, `Error tidak dapat mengambil screenshot website ${_query}`, id))
            break;
        case '!snk':
            await client.reply(from, snk, id)
            break


        }        
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
