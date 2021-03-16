const { default: got } = require('got/dist/source');
const fetch = require('node-fetch')
const moment = require('moment')
const axios = require("axios")
const translatte = require('translatte')
const striptags = require('striptags');
const path = require('path')
const fs = require('fs-extra')
const { getBase64 } = require("./fetcher")
const FormData = require('form-data') 
const { fetchBase64 } = require('./fetcher')
const { fromBuffer } = require('file-type')

function curlyRemover(chat) {
    if (chat !== undefined) {
        let sr = /{(.*?)}/g;
        let ket = chat.toString().replace(sr, '');
        return ket;
    }
    return chat;
}

const namaninja = async (nin) => {
    const response = await fetch('https://api.terhambar.com/ninja?nama='+nin)
    if (!response.ok) throw new Error(`unexpected response`);
    const json = await response.json()
    if (json.status) return `ini nama ninjamu\n*${json.result.ninja}*`
}

const liriklagu = async (lagu) => {
    const response = await fetch(`http://scrap.terhambar.com/lirik?word=${lagu}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status === true) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
    return `[ Error ] Lirik Lagu ${lagu} tidak di temukan!`
}

const anime = (judulanime) => new Promise(async (resolve, reject) => {
    const response =  await fetch('https://api.jikan.moe/v3/search/anime?q='+judulanime+'&limit=1')
    if (!response.ok) return reject('Anime tidak di temukan!');
    const json = await response.json()
    const {title,synopsis,episodes,url,rated,score} = json.results[0]
    return resolve(`
======{ _*Anime ditemukan!*_ }======
📌 Title : ${title}
📌 Episodes : ${episodes}
📌 Rating : ${rated}
📌 Score : ${score}
📌 Synopsis : 🔰🔰🔰
${synopsis}
📌 URL : ${url}

=={ _*Processing Sukses # ZJ-Bot*_ }==
    `)
})

const corona = async () => new Promise(async (resolve, reject) => {
    axios.all([
        axios.get('https://covid19.mathdro.id/api'),
        axios.get('https://covid19.mathdro.id/api/countries/id')
    ]).then((res) => {
        var hasil = res[0].data;
        var id = res[1].data;
        function intl(str) {
            var nf = Intl.NumberFormat();
            return nf.format(str);
        }
        var date = new Date(id.lastUpdate);
        date = moment(date).fromNow();
        translatte(date, {to: 'id'}).then(res => {
            date = res.text
            return resolve(`
===={ _*Kasus COVID19 di Dunia*_ }====
😷Positif : ${intl(hasil.confirmed.value)} kasus
😇Sembuh : ${intl(hasil.recovered.value)} kasus
😭 Meninggal : ${intl(hasil.deaths.value)} kasus
==============================
=={ _*Kasus COVID19 di Indonesia*_ }==
😷Positif : ${intl(id.confirmed.value)} kasus
😇Sembuh : ${intl(id.recovered.value)} kasus
😭 Meninggal : ${intl(id.deaths.value)} kasus
==============================
======{ _*Tips kesehatan*_ }=======
✅Mencuci tangan dengan benar
✅Menggunakan masker
✅Menjaga daya tahan tubuh
✅Menerapkan physical distancing
==============================
Update terakhir ${date}
======{ _*ZJ-Bot Information*_ }======
`)
        })
    }).catch((err) => {
        return reject(err)
    })
})


const Surah = async (surah, ayat) => new Promise(async (resolve,reject) => {
    if (!isNaN(surah) && surah <= 114) {
        if (ayat !== undefined) {
            axios.get(`https://api.banghasan.com/quran/format/json/surat/${surah}/ayat/${ayat}`).then((res) => {
                if (!(res.data.ayat.error)) {
                    let hasil = `_*Surah ${res.data.surat.nama} ayat ${ayat}*_\n==============================\n`;
                    let indexs = res.data.ayat.data.ar;
                    let a = res.data.ayat.data.idt;
                    let b = res.data.ayat.data.id;
                    Object.keys(indexs).forEach(function (i) {
                        hasil += `*[ ${indexs[i].ayat} ]*  ${indexs[i].teks}\n`;
                        hasil += `\n${striptags(a[i].teks)}\n`;
                        hasil += `\n_*Artinya*_ : ${curlyRemover(b[i].teks)}\n`;
                    })
                    resolve(hasil+'==============================\n=={ _*Processing Sukses # ZJ-Bot*_ }==')
                } else {
                    reject(`Error, ayat ${ayat} dari surah ${surah} tidak valid!`)
                }
            })
        } else {
            axios.get(`https://api.banghasan.com/quran/format/json/surat/${surah}`).then((res) => {
                const sr = /<(.*?)>/gi;
                const hs = res.data.hasil[0];
                const ket = `${hs.keterangan}`.replace(sr, '');
                resolve(`
========{ _*Surah ${hs.nama}*_ }========
 📌 Nomor : ${hs.nomor}
 📌 Asma : ${hs.asma}
 📌 Tipe : ${hs.type}
 📌 Urut : ${hs.urut}
 📌 Ruku : ${hs.rukuk}
 📌 Arti : ${hs.arti}
 📌 Jumlah Ayat : ${hs.ayat}
==============================
${ket}\n=={ _*Processing Sukses # ZJ-Bot*_ }==
    `)
            })
        }
    } else {
        reject(`Error, nomor surah ${surah} tidak valid\n*!list surah* 📌 menampilkan list surah`)
    }
})

const quotemaker = async (quotes, author = 'EmditorBerkelas', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}

const getStickerMaker = (link) => new Promise((resolve, reject) => {
    fetch('https://api.areltiyan.site/sticker_maker?text='+encodeURIComponent(link), {
        method: 'GET',
    })
    .then(async res => {
        const text = await res.json()

        resolve(text)
        
     })
    .catch(err => reject(err))
});

const fb = async (url) => {
    const response = await fetch(`http://scrap.terhambar.com/fb?link=${url}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    console.log(json)
    if (json.status === true) return {
        'capt': json.result.title, 'exts': '.mp4', 'url': json.result.linkVideo.sdQuality
    }
    return {
        'capt': '[ ERROR ] Not found!', 'exts': '.jpg', 'url': 'https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg'
    }
}
/**
 * create custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
async function customText(imageUrl, top, bottom) {
    return new Promise((resolve, reject) => {
        let fix = str => str.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
        fetchBase64(`https://api.memegen.link/images/custom/${fix(top)}/${fix(bottom)}.png?background=${imageUrl}`, 'image/png')
            .then(result => resolve(result))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

function uploadImages(buffData, type) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const {
            ext
        } = await fromBuffer(buffData)
        let temp = './temp'
        let name = new Date() * 1
        let filePath = path.join(temp, 'image', `${name}.${ext}`)
        const _buffData = type ? await resizeImage(buffData, false) : buffData
        fs.writeFile(filePath, _buffData, {
            encoding: 'base64'
        }, (err) => {
            if (err) return reject(err)
            console.log('Uploading image to telegra.ph server...')
            const fileData = fs.readFileSync(filePath)
            const form = new FormData()
            form.append('file', fileData, 'tmp.' + ext)
            fetch('https://telegra.ph/upload', {
                method: 'POST',
                body: form
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) return reject(res.error)
                    resolve('https://telegra.ph' + res[0].src)
                })
                .then(() => fs.unlinkSync(filePath))
                .catch(err => reject(err))
        })
    })
}

function resizeImage(buff, encode) {
    return new Promise(async (resolve, reject) => {
        console.log('Resizeing image...')
        const {
            mime
        } = await fromBuffer(buff)
        sharp(buff, {
            failOnError: false
        })
            .toFormat('png')
            .resize(512, 512, {
                fit: 'contain',
                background: {
                    r: 0,
                    g: 0,
                    b: 0,
                    alpha: 0
                }
            })
            .toBuffer()
            .then(resizedImageBuffer => {
                if (!encode) return resolve(resizedImageBuffer)
                console.log('Create base64 from resizedImageBuffer...')
                const resizedImageData = resizedImageBuffer.toString('base64')
                const resizedBase64 = `data:${mime};base64,${resizedImageData}`
                resolve(resizedBase64)
            })
            .catch(error => reject(error))
    })
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const jadwalTv = async (query) => {
    const res = await got.get(`https://api.haipbis.xyz/jadwaltv/${query}`).json()
    if (res.error) return res.error
    switch(query) {
        case 'antv':
            return `\t\t[ ANTV ]\n${res.join('\n')}`
            break
        case 'gtv':
            return `\t\t[ GTV ]\n${res.join('\n')}`
            break
        case 'indosiar':
            return `\t\t[ INDOSIAR ]\n${res.join('\n')}`
            break
        case 'inewstv':
            return `\t\t[ iNewsTV ]\n${res.join('\n')}`
            break
        case 'kompastv':
            return `\t\t[ KompasTV ]\n${res.join('\n')}`
            break
        case 'mnctv':
            return `\t\t[ MNCTV ]\n${res.join('\n')}`
            break
        case 'metrotv':
            return `\t\t[ MetroTV ]\n${res.join('\n')}`
            break
        case 'nettv':
            return `\t\t[ NetTV ]\n${res.join('\n')}`
            break
        case 'rcti':
            return `\t\t[ RCTI ]\n${res.join('\n')}`
            break
        case 'sctv':
            return `\t\t[ SCTV ]\n${res.join('\n')}`
            break
        case 'rtv':
            return `\t\t[ RTV ]\n${res.join('\n')}`
            break
        case 'trans7':
            return `\t\t[ Trans7 ]\n${res.join('\n')}`
            break
        case 'transtv':
            return `\t\t[ TransTV ]\n${res.join('\n')}`
            break
        default:
            return '[ ERROR ] Channel TV salah! silahkan cek list channel dengan mengetik perintah *!listChannel*'
            break
    }
}

const ss = async(query) => {
    request({
        url: "https://api.apiflash.com/v1/urltoimage",
        encoding: "binary",
        qs: {
            access_key: "2fc9726e595d40eebdf6792f0dd07380",
            url: query
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            fs.writeFile("./media/img/screenshot.jpeg", body, "binary", error => {
                console.log(error);
            })
        }
    })
}

exports.liriklagu = liriklagu;
exports.quotemaker = quotemaker;
exports.fb = fb
exports.sleep = sleep
exports.jadwalTv = jadwalTv
exports.Surah = Surah
exports.corona = corona
exports.anime = anime
exports.namaninja = namaninja
exports.ss = ss
exports.getStickerMaker = getStickerMaker
exports.customText = customText
exports.uploadImages = uploadImages
exports.resizeImage = resizeImage