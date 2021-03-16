//Database kemungkinan jawaban, author(fixed, hanya untuk pass fcc), audio sesuai jawaban
var ans = [
    { quote:'"Tidak~"',
      audio:"https://docs.google.com/uc?export=download&id=1B3G24nZjGDSUjrhgtZO08GAeJ5_cjM9n",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Sepertinya iya"',
      audio:"https://docs.google.com/uc?export=download&id=1CHqfNnBokF0LIuhVNfTWYonS4sZ9zS5Y",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Tidak Mungkin"',
      audio:"https://docs.google.com/uc?export=download&id=1cru5MeK8ZC33EP_BozgpAacT5nBkQ8AL",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Mungkin ya"',
      audio:"https://docs.google.com/uc?export=download&id=1cE8ujRU8q5zwtenuI86qSF7mWEh1Ke4w",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Selama kamu berusaha"',
      audio:"https://docs.google.com/uc?export=download&id=1l55Ir-vakc_feaNsNZ_ODoZobo0iSNjL",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Coba tanya lagi"',
      audio:"https://docs.google.com/uc?export=download&id=1FyOijWa15Y2ZSUzqEvjnsioCUzN2JFwB",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Ya"',
      audio:"https://docs.google.com/uc?export=download&id=1WeDrIDXiiaff7Undh9JKxyPrcfBmqN_s",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Tidak"',
      audio:"https://docs.google.com/uc?export=download&id=10Lm51T6yDnxtQTTw979Pl7Pp4unpGbgD",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Kurasa tidak"',
      audio:"https://docs.google.com/uc?export=download&id=1dJQ3IruZ2aWGy4NFKj5J98UUFMV3ykC9",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Mungkin suatu hari"',
      audio:"https://docs.google.com/uc?export=download&id=1TmWP2I3nVSPzw8Gb5WV2ivtEbzJ7RzaH",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Tidak keduanya"',
      audio:"https://docs.google.com/uc?export=download&id=1wdFpdnljQPBmSpbQrT7UM5Ba5HQilvCx",
      author:"-Kulit Kerang Ajaib"
    },
    { quote:'"Tidak ada"',
      audio:"https://docs.google.com/uc?export=download&id=1NrW5SOdLwMgAJa8Jl5nTU9cRhaLxXc-j",
      author:"-Kulit Kerang Ajaib"
    }
   ]
   
  //Database default question, sourced from original spongebob episode
  var defaultQuestion = [
    { question:"aku akan segera menikah?",
      answer:ans[9].quote,
      author:"-Kulit Kerang Ajaib"
    },
    { question:"Bisakah kau mengatakan sesuatu selain tidak?",
      answer:ans[5].quote,
      author:"-Kulit Kerang Ajaib"
    },
    { question:"Apakah yang harus kita lakukan untuk keluar dari hutan kelp ini?",
      answer:ans[11].quote,
      author:"-Kulit Kerang Ajaib"
    }
   ];

   module.exports = {
       defaultQuestion,
       ans,
   }