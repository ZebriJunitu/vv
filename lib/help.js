function menu() {
    return `
========={ *_ZJ-Bot Menu_* }=========
*!menu1* = menampilkan menu group dan adminban
*!menu2* = menampilkan menu sticker
*!menu3* = menampilkan menu sosmed
*!menu4* = menampilkan menu edukasi
*!menu5* = menampilkan menu corona
*!menu6* = menampilkan menu tobat
*!menu7* = menampilkan menu nsfw
*!menu8* = menampilkan menu tools
==============================
%state
==============================
*!info* = melihat info bot
*!limit* = melihat limit harian private chat anda
*!snk* = syarat & ketentuan bot
==============================
_Update Info & fitur ada di :_

_*First Official Group*_
https://chat.whatsapp.com/BVeNEi5EIZAI6eE56D6hk4
_*Second Official Group*_
https://chat.whatsapp.com/J3bQb1Ms2gx3bcKtRuGuNw
_*Third Official Group*_
https://chat.whatsapp.com/Im4ocOc2pya1WMKKH7fMgY
==============================
Ingin melihat seputar anime dari kami? cek
https://akiranime.net
==============================
Jika menemukan bug dimohon report bug tersebut ke Owner BOT.
wa.me/6285246827575 - Dito
wa.me/6283174042679 - Zebri
==============================
ingin donasi? silahkan gunakan !donasi jika mau membantu kami
==============================
    `
}
exports.menu = menu()
function menu1() {
    return `
=========={ *_Menu Group_* }=========
*!afk [keterangan afk]*
==============================
=========> *_Group owner_* <=========
*!kickAll*
=========> *_Group admin_* <=========
*!add 62858xxxxx*
*!delete [replyChatBot]*
*!demote @tagadmin*
*!enable [nsfw/welcome]*
*!disable [nsfw/welcome]*
*!kick @tagmember*
*!leave*
*!mentionAll*
*!promote @tagmember*
=======> *_Group Participant_* <=======
*!adminList*
*!groupinfo*
*!listblock*
*!ownergroup*
*!profile*
======> *_Special Admin Ban_* <======
*!ban [@tagorangnya]*
*!unban [@tagorangnya]*
*!mute*
*!unmute*
==============================
    `
}
exports.menu1 = menu1()
function menu2() {
    return `
========{ *_Menu Sticker_* }========
*!sticker* (auto ratio)
*#sticker* (auto scale ratio 1:1)
*!sgif* 
Note : video/gif to sticker
*!ttp [teks]*
Note : text to sticker
==============================
`}
exports.menu2 = menu2()
function menu3() {
    return `
========{ *_Menu Sosmed_* }========

========{ _*Downloader*_ }========
*!fb [linkFb]*
*!ig [linkIg]* 
*!like [linkLike]*
*!twitter [linkTwitter]*
*!ytmp3 [linkYt]*
*!ytmp4 [linkYt]*
========={ _*Informasi*_ }=========
*!cuaca [daerah]*
*!igstalk [@username]*
*!infofilm [Judul Film]*
*!infogempa*
*!jadwaltv [channel]* 
ketik *!listchannel* untuk melihat list channel
*!jadwaltvnow*
*!news*
*!trendingtwitter*
*!twitterinfo [username]*
*!wiki [query]*
==============================
Note : jangan pakai [ ]
contoh : *!ytmp3* https://youtu.be/_JM0Up30rSY
==============================

==============================
`}
exports.menu3 = menu3()
function menu4() {
    return `
========={ *_Menu Edukasi_* }=========
*!brainly [pertanyaan]* (sedang diperbaiki)
*!cerpen*
*!cerpen2*
*!fakta*
*!katabijak*
*!pantun*
*!puisi1*
*!puisi2*
*!puisi3*
==============================
`}
exports.menu4 = menu4()
function menu5() {
    return `
========={ *_Menu Corona_* }=========
*!ceklokasi [ReplyChatLokasinya]*
*!corona*
*!corona prov [nama provinsi]*
contoh : *!corona prov sumatera selatan*
==============================
`}
exports.menu5 = menu5()
function menu6() {
    return `
========={ *_Menu Tobat_* }=========
*!jadwalshalat [daerah]*
*!listsurah*
*!ngaji [nama surah] [ayat]
*!quran*
*!surah [surah ke]*
contoh: *!surah 2*
*!surah [surah ke] ayat [ayat ke]*
*!tafsir [nama surah] [ayat]*
==============================
Note : Jangan pake [ ]
contoh penggunaan surah :
*!surah 2 ayat 1* = menampilkan surah ke 2 ayat 1\n*!surah 2 ayat 1-3* = menampilkan surah ke 2 ayat 1-3\n *!surah 2 ayat 1,3,5* = menampilkan surah ke 2 ayat 1,3 dan 5
==============================
`}
exports.menu6 = menu6()
function menu7() {
    return `
========={ *_Menu NSFW_* }=========
*!enable nsfw* untuk mengaktifkan fitur nsfw di dalam grup (hanya berlaku untuk admin grup)
*!disable nsfw* untuk menonaktifkan fitur nsfw di dalam grup (hanya berlaku untuk admin grup)
==============================
*!fetish [genre]*
*!lewd*
*!nhinfo [code nuklir]*
*!nhder [code nuklir]* (untuk mendownload hentai via link)
*!randomhentai*
*!randomnsfwneko*
*!cersex*
*!cersex2*
==============================
Note : Jangan pake [ ]
==============================
`}
exports.menu7 = menu7()
function menu8() {
    return `
========={ *_Menu Tools_* }=========
*!anime [judul anime]* (kusonime)
*!anime1 [judul anime]* (jikanmoe)
*!ansearch [judul anime]* (dewabatch)
*!anjing*
*!artinama [namamu]*
*!kucing*
*!ask [pertanyaan]*
*!bacot*
*!bacotadd*
Note : sama seperti !say add
*!cekjodoh [&nama1&nama2]*
Note : Hanya untuk Happy fun :)
*!fml*
*!gay [nama]* 
Note : Hanya untuk happy fun :)
*!googleimage [result]*
*!gombal*
*!husbu*
*!lirik [judul lagu]*
*!loli*
*!meme*
*!mirip [nama]*
Note : Hanya untuk happy fun :)
*!mojok*
*!namaninja [teks]*
*!nulis [teks]*
*!nulis2 [teks]*
*!pasangan [namamu & nama pasanganmu]
*!pokemon*
*!ptl [cewek/cowok]*
*!quotes*
*!quotesnime*
*!quotemaker [|teks|author|theme]*
*!randomanime*
*!randomanime2*
*!randomnekonime*
*!randomtrapnime*
*!say*
*!say add [teks yg mau dimasukkan kedalam database]*
*!tts [kode bhs] [teks]*
*!wait*
kirim foto dengan caption *!wait*
*!waifu*
*!waifu2*
*!zodiak [nama&tgl/bulan/tahun]*
==============================
Note : Jangan pakai [ ]
==============================
`}
exports.menu8 = menu8()
function listsurah() {
    return `*Daftar Nomor Surah*
    1. Al-Fatihah الفاتحة
    2. Al-Baqarah البقرة
    3. Ali-Imran آل عمران
    4. An-Nisa’ النّساء
    5. Al-Ma’idah المآئدة
    6. Al-An’am الانعام
    7. Al-A’raf الأعراف
    8. Al-Anfal الأنفال
    9. At-Taubah التوبة‎‎
    10. Yunus ينوس
    11. Hud هود
    12. Yusuf يسوف
    13. Ar-Ra’d الرّعد
    14. Ibrahim إبراهيم
    15. Al-Hijr الحجر
    16. An-Nahl النّحل
    17. Al-Isra’ بني إسرائيل
    18. Al-Kahf الكهف
    19. Maryam مريم
    20. Ta Ha طه
    21. Al-Anbiya الأنبياء
    22. Al-Hajj الحجّ
    23. Al-Mu’minun المؤمنون
    24. An-Nur النّور
    25. Al-Furqan الفرقان
    26. Asy-Syu’ara’ الشّعراء
    27. An-Naml النّمل
    28. Al-Qasas القصص
    29. Al-‘Ankabut العنكبوت
    30. Ar-Rum الرّوم
    31. Luqman لقمان
    32. As-Sajdah السّجدة
    33. Al-Ahzab الْأحزاب
    34. Saba’ سبا
    35. Fatir فاطر
    36. Ya Sin يس
    37. As-Saffat الصّافات
    38. Sad ص
    39. Az-Zumar الزّمر
    40. Al-Mu’min المؤمن
    41. Fussilat فصّلت
    42. Asy-Syura الشّورى
    43. Az-Zukhruf الزّخرف
    44. Ad-Dukhan الدّخان
    45. Al-Jasiyah الجاثية
    46. Al-Ahqaf الَأحقاف
    47. Muhammad محمّد
    48. Al-Fath الفتح
    49. Al-Hujurat الحجرات
    50. Qaf ق
    51. Az-Zariyat الذّاريات
    52. At-Tur الطّور
    53. An-Najm النّجْم
    54. Al-Qamar القمر
    55. Ar-Rahman الرّحْمن
    56. Al-Waqi’ah الواقعه
    57. Al-Hadid الحديد
    58. Al-Mujadilah المجادلة
    59. Al-Hasyr الحشْر
    61. As-Saff الصّفّ
    62. Al-Jumu’ah الجمعة
    63. Al-Munafiqun المنافقون
    64. At-Tagabun التّغابن
    65. At-Talaq الطّلاق
    66. At-Tahrim التّحريم
    67. Al-Mulk الملك
    68. Al-Qalam القلم
    69. Al-Haqqah الحآقّة
    70. Al-Ma’arij المعارج
    71. Nuh نوح
    72. Al-Jinn الجنّ
    73. Al-Muzzammil المزمّل
    74. Al-Muddassir المدشّر
    75. Al-Qiyamah القيمة
    76. Al-Insan الْاٍنسان
    77. Al-Mursalat المرسلات
    78. An-Naba’ النّبا
    79. An-Nazi’at النّازعات
    80. ‘Abasa عبس
    81. At-Takwir التّكوير
    82. Al-Infitar الانفطار
    83. Al-Tatfif المطفّفين
    84. Al-Insyiqaq الانشقاق
    85. Al-Buruj البروج
    86. At-Tariq الطّارق
    87. Al-A’la الْأعلى
    88. Al-Gasyiyah الغاشية
    89. Al-Fajr الفجر
    90. Al-Balad البلد
    91. Asy-Syams الشّمس
    92. Al-Lail الّيل
    93. Ad-Duha الضحى‎‎
    94. Al-Insyirah الانشراح‎‎
    95. At-Tin التِّينِ
    96. Al-‘Alaq العَلَق
    97. Al-Qadr الْقَدْرِ
    98. Al-Bayyinah الْبَيِّنَةُ
    99. Az-Zalzalah الزلزلة‎‎
    100. Al-‘Adiyat العاديات‎‎
    101. Al-Qari’ah القارعة‎‎
    102. At-Takasur التكاثر‎‎
    103. Al-‘Asr العصر
    104. Al-Humazah الهُمَزة‎‎
    105. Al-Fil الْفِيلِ
    106.Quraisy قُرَيْشٍ
    107. Al-Ma’un الْمَاعُونَ
    108. Al-Kausar الكوثر
    109. Al-Kafirun الْكَافِرُونَ
    110. An-Nasr النصر‎‎
    111. Al-Lahab المسد‎‎
    112. Al-Ikhlas الإخلاص‎‎
    113. Al-Falaq الْفَلَقِ
    114. An-Nas النَّاسِ`

}
exports.listsurah = listsurah()
function snk() {
    return `Syarat dan Ketentuan Bot *Zj-Bot*
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!

Thanks !`
}
exports.snk = snk()
function premium1(){
    return `Fitur yang didapatkan jika anda menjadi user premium ialah:

1. Unlimited LimitPrivate Chat 
2. !simsimi start/stop (private chat)
3. !si (simsimi khusus didalamm grup)
4. !play [pencarian]
5. !musikyt [pencarian]

ketik *!donasi* jika ingin mengupgrade nomor kalian menjadi premium`
}
exports.premium1 = premium1()
function donate() {
    return `
Bot ingin masuk grup? caranya donasi.\n5k => 1 minggu\n15k => 1 bulan\n50k => 1 tahun (promo bulan ini), dan
Donasi 10k untuk upgrade premium nomor mu.
Terima kasih telah menggunakan layanan kami
jika kalian ingin mendapatkan fitur !premium
bisa donasi ke nomor dibawah ini
==============================
Kami Menerima Payment :

-GOPAY      : 083174042679   A/N Zebri Junitu
-OVO        : 083174042679   A/N Zebri Junitu
-DANA       : 083174042679   A/N Zebri Junitu
-AXIS       : 083174042679   A/N Zebri Junitu
-TELKOMSEL  : 085246827575   A/N Dito Akbar
-Indomaret : Top Up I.Saku
-Alfamart : Top Up Dana  , Top Up Gopay

Jika belum terdaftar e-ktp di aplikasi bisa langsung memakai saweria

https://saweria.co/zebrijunitu

Note : SELAIN NOMOR DIATAS PENIPUAN !! KAMI TIDAK BERTANGGUNG JAWAB ATAS PENIPUAN
==============================
Contact Us
👇👇👇
        `
}
exports.donate = donate()
function listChannel() {
    return `Daftar channel: 
1. ANTV
2. GTV
3. Indosiar
4. iNewsTV
5. KompasTV
6. MNCTV
7. METROTV
8. NETTV
9. RCTI
10. SCTV
11. RTV
12. Trans7
13. TransTV`
}
exports.listChannel = listChannel()

function bahasa() {
    return `*List kode Bahasa*\n
	*Code       Bahasa*
    sq        Albanian
    ar        Arabic
    hy        Armenian
    ca        Catalan
    zh        Chinese
    zh-cn     Chinese (China)
    zh-tw     Chinese (Taiwan)
    zh-yue    Chinese (Cantonese)
    hr        Croatian
    cs        Czech
    da        Danish
    nl        Dutch
    en        English
    en-au     English (Australia)
    en-uk     English (United Kingdom)
    en-us     English (United States)
    eo        Esperanto
    fi        Finnish
    fr        French
    de        German
    el        Greek
    ht        Haitian Creole
    hi        Hindi
    hu        Hungarian
    is        Icelandic
    id        Indonesian
    it        Italian
    ja        Japanese
    ko        Korean
    la        Latin
    lv        Latvian
    mk        Macedonian
    no        Norwegian
    pl        Polish
    pt        Portuguese
    pt-br     Portuguese (Brazil)
    ro        Romanian
    ru        Russian
    sr        Serbian
    sk        Slovak
    es        Spanish
    es-es     Spanish (Spain)
    es-us     Spanish (United States)
    sw        Swahili
    sv        Swedish
    ta        Tamil
    th        Thai
    tr        Turkish
    vi        Vietnamese
    cy        Welsh
      `;
}
exports.bahasa = bahasa();

function bahasatranslate(){
    return `
    af: Afrikaans,
    sq: Albanian,
    am: Amharic,
    ar: Arabic,
    hy: Armenian,
    az: Azerbaijani,
    eu: Basque,
    be: Belarusian,
    bn: Bengali,
    bs: Bosnian,
    bg: Bulgarian,
    ca: Catalan,
    ceb: Cebuano,
    ny: Chichewa,
    zh: Chinese (Simplified),
    zh-cn: Chinese (Simplified),
    zh-tw: Chinese (Traditional),
    co: Corsican,
    hr: Croatian,
    cs: Czech,
    da: Danish,
    nl: Dutch,
    en: English,
    eo: Esperanto,
    et: Estonian,
    tl: Filipino,
    fi: Finnish,
    fr: French,
    fy: Frisian,
    gl: Galician,
    ka: Georgian,
    de: German,
    el: Greek,
    gu: Gujarati,
    ht: Haitian Creole,
    ha: Hausa,
    haw: Hawaiian,
    he: Hebrew,
    iw: Hebrew,
    hi: Hindi,
    hmn: Hmong,
    hu: Hungarian,
    is: Icelandic,
    ig: Igbo,
    id: Indonesian,
    ga: Irish,
    it: Italian,
    ja: Japanese,
    jw: Javanese,
    kn: Kannada,
    kk: Kazakh,
    km: Khmer,
    ko: Korean,
    ku: Kurdish (Kurmanji),
    ky: Kyrgyz,
    lo: Lao,
    la: Latin,
    lv: Latvian,
    lt: Lithuanian,
    lb: Luxembourgish,
    mk: Macedonian,
    mg: Malagasy,
    ms: Malay,
    ml: Malayalam,
    mt: Maltese,
    mi: Maori,
    mr: Marathi,
    mn: Mongolian,
    my: Myanmar (Burmese),
    ne: Nepali,
    no: Norwegian,
    ps: Pashto,
    fa: Persian,
    pl: Polish,
    pt: Portuguese,
    pa: Punjabi,
    ro: Romanian,
    ru: Russian,
    sm: Samoan,
    gd: Scots Gaelic,
    sr: Serbian,
    st: Sesotho,
    sn: Shona,
    sd: Sindhi,
    si: Sinhala,
    sk: Slovak,
    sl: Slovenian,
    so: Somali,
    es: Spanish,
    su: Sundanese,
    sw: Swahili,
    sv: Swedish,
    tg: Tajik,
    ta: Tamil,
    te: Telugu,
    th: Thai,
    tr: Turkish,
    uk: Ukrainian,
    ur: Urdu,
    uz: Uzbek,
    vi: Vietnamese,
    cy: Welsh,
    xh: Xhosa,
    yi: Yiddish,
    yo: Yoruba,
    zu: Zulu
`}
exports.bahasatranslate = bahasatranslate();