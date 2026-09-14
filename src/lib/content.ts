export type SyllableWord = {
  id: string;
  word: string;
  syllables: string[];
  hint: string;
};

export type StoryWord = {
  display: string;
  syllables: string[];
};

export type Story = {
  id: string;
  title: string;
  kicker: string;
  sentences: StoryWord[][];
  question: {
    prompt: string;
    options: string[];
    answer: number;
  };
};

export type ChoiceQuiz = {
  id: string;
  kind: "choice";
  prompt: string;
  options: string[];
  answer: number;
};

export type MissingQuiz = {
  id: string;
  kind: "missing";
  word: string;
  blank: number;
  options: string[];
  answer: number;
};

export type SameQuiz = {
  id: string;
  kind: "same";
  a: string;
  b: string;
  same: boolean;
};

export type ListenQuiz = {
  id: string;
  kind: "listen";
  word: string;
  options: string[];
  answer: number;
};

export type QuizItem = ChoiceQuiz | MissingQuiz | SameQuiz | ListenQuiz;

export const SYLLABLE_WORDS: SyllableWord[] = [
  { id: "maja", word: "maja", syllables: ["ma", "ja"], hint: "koht, kus elatakse" },
  { id: "sober", word: "sõber", syllables: ["sõ", "ber"], hint: "keegi, kellega mängida" },
  { id: "raamat", word: "raamat", syllables: ["raa", "mat"], hint: "seda loetakse" },
  { id: "hommik", word: "hommik", syllables: ["hom", "mik"], hint: "päeva algus" },
  { id: "opetaja", word: "õpetaja", syllables: ["õ", "pe", "ta", "ja"], hint: "inimene koolis" },
  { id: "liblikas", word: "liblikas", syllables: ["lib", "li", "kas"], hint: "lendab lille juurde" },
  { id: "paike", word: "päike", syllables: ["päi", "ke"], hint: "paistab taevas" },
  { id: "vihik", word: "vihik", syllables: ["vi", "hik"], hint: "sinna kirjutatakse" },
  { id: "pliiats", word: "pliiats", syllables: ["plii", "ats"], hint: "sellega kirjutatakse" },
  { id: "koolimaja", word: "koolimaja", syllables: ["koo", "li", "ma", "ja"], hint: "siin õpitakse" },
  { id: "manguvalljak", word: "mänguväljak", syllables: ["mäng", "u", "väl", "jak"], hint: "kiik ja liivakast" },
  { id: "sunnipaev", word: "sünnipäev", syllables: ["sün", "ni", "päev"], hint: "koogi ja küünalde päev" },
  { id: "rattasoit", word: "rattasõit", syllables: ["rat", "ta", "sõit"], hint: "sõit kahe rattaga" },
  { id: "jaatis", word: "jäätis", syllables: ["jää", "tis"], hint: "külm ja magus" },
  { id: "ounapuu", word: "õunapuu", syllables: ["õu", "na", "puu"], hint: "puu, millel kasvavad õunad" },
  { id: "vihmavari", word: "vihmavari", syllables: ["vih", "ma", "va", "ri"], hint: "hoiab vihma eest" },
  { id: "koolikott", word: "koolikott", syllables: ["koo", "li", "kott"], hint: "selles on vihikud" },
  { id: "mesilane", word: "mesilane", syllables: ["me", "si", "la", "ne"], hint: "teeb mett" },
  { id: "lumememm", word: "lumememm", syllables: ["lu", "me", "memm"], hint: "tehakse lumest" },
  { id: "ohtusoog", word: "õhtusöök", syllables: ["õh", "tu", "söök"], hint: "süüakse õhtul" },
  { id: "linnuke", word: "linnuke", syllables: ["lin", "nu", "ke"], hint: "väike lind" },
  { id: "janes", word: "jänes", syllables: ["jä", "nes"], hint: "pikkade kõrvadega" },
  { id: "orav", word: "orav", syllables: ["o", "rav"], hint: "elab puu otsas" },
  { id: "kasi", word: "käsi", syllables: ["kä", "si"], hint: "sellega kirjutatakse" },
  { id: "suda", word: "süda", syllables: ["sü", "da"], hint: "tuksub rinnas" },
  { id: "kyla", word: "küla", syllables: ["kü", "la"], hint: "väike asula" },
  { id: "ode", word: "õde", syllables: ["õ", "de"], hint: "tüdruk peres" },
  { id: "too", word: "töö", syllables: ["töö"], hint: "seda tehakse koolis ja kodus" },
  { id: "oun", word: "õun", syllables: ["õun"], hint: "punane või roheline vili" },
  { id: "pere", word: "pere", syllables: ["pe", "re"], hint: "ema, isa ja lapsed" },
  { id: "kell", word: "kell", syllables: ["kell"], hint: "näitab aega" },
  { id: "tool", word: "tool", syllables: ["tool"], hint: "sellel istutakse" },
  { id: "aken", word: "aken", syllables: ["a", "ken"], hint: "sealt paistab valgus" },
  { id: "lill", word: "lill", syllables: ["lill"], hint: "kasvab peenras" },
  { id: "vesi", word: "vesi", syllables: ["ve", "si"], hint: "seda juuakse" },
  { id: "leib", word: "leib", syllables: ["leib"], hint: "süüakse võiga" },
  { id: "pilv", word: "pilv", syllables: ["pilv"], hint: "hõljub taevas" },
  { id: "tuba", word: "tuba", syllables: ["tu", "ba"], hint: "osa majast" },
  { id: "kiik", word: "kiik", syllables: ["kiik"], hint: "mänguväljakul" },
  { id: "auto", word: "auto", syllables: ["au", "to"], hint: "sõidab teel" },
  { id: "jalgratas", word: "jalgratas", syllables: ["jal", "gra", "tas"], hint: "sõidetakse jalgadega" },
  { id: "suvi", word: "suvi", syllables: ["su", "vi"], hint: "soe aastaaeg" },
  { id: "kass", word: "kass", syllables: ["kass"], hint: "nurruv loom kodus" },
  { id: "koer", word: "koer", syllables: ["koer"], hint: "haugub ja valvab" },
  { id: "pall", word: "pall", syllables: ["pall"], hint: "sellega mängitakse" },
  { id: "raamatukogu", word: "raamatukogu", syllables: ["raa", "ma", "tu", "ko", "gu"], hint: "koht, kus laenutatakse raamatuid" },
  { id: "koolilaud", word: "koolilaud", syllables: ["koo", "li", "laud"], hint: "selle taga istutakse tunnis" },
  { id: "joonistus", word: "joonistus", syllables: ["joo", "nis", "tus"], hint: "pilt paberil" },
  { id: "porgand", word: "porgand", syllables: ["por", "gand"], hint: "oranž juurvili" },
  { id: "kartul", word: "kartul", syllables: ["kar", "tul"], hint: "kasvab mullas" },
  { id: "tomat", word: "tomat", syllables: ["to", "mat"], hint: "punane vili peenras" },
  { id: "kivike", word: "kivike", syllables: ["ki", "vi", "ke"], hint: "väike kivi" },
  { id: "meri", word: "meri", syllables: ["me", "ri"], hint: "suur soolane vesi" },
  { id: "rand", word: "rand", syllables: ["rand"], hint: "mere äär" },
  { id: "tuul", word: "tuul", syllables: ["tuul"], hint: "liigutab lehti" },
  { id: "mets", word: "mets", syllables: ["mets"], hint: "palju puid koos" },
  { id: "sammal", word: "sammal", syllables: ["sam", "mal"], hint: "pehme roheline kate" },
  { id: "kabi", word: "käbi", syllables: ["kä", "bi"], hint: "kuuselt või männi otsast" },
  { id: "linnulaul", word: "linnulaul", syllables: ["lin", "nu", "laul"], hint: "lindude hääl" },
  { id: "hommikupuder", word: "hommikupuder", syllables: ["hom", "mi", "ku", "pu", "der"], hint: "soe toit hommikul" },
  { id: "piim", word: "piim", syllables: ["piim"], hint: "valge jook" },
  { id: "supp", word: "supp", syllables: ["supp"], hint: "soe toit kausis" },
  { id: "sai", word: "sai", syllables: ["sai"], hint: "pehme küpsetis" },
  { id: "kook", word: "kook", syllables: ["kook"], hint: "magus maius" },
  { id: "kuu", word: "kuu", syllables: ["kuu"], hint: "paistab öösel" },
  { id: "taht", word: "täht", syllables: ["täht"], hint: "sädeleb taevas" },
  { id: "lamp", word: "lamp", syllables: ["lamp"], hint: "annab toas valgust" },
  { id: "kapp", word: "kapp", syllables: ["kapp"], hint: "sinna pannakse asju" },
  { id: "uks", word: "uks", syllables: ["uks"], hint: "sellest minnakse sisse" },
  { id: "trepp", word: "trepp", syllables: ["trepp"], hint: "mööda seda minnakse üles" },
  { id: "varav", word: "värav", syllables: ["vä", "rav"], hint: "aiast sissepääs" },
  { id: "kiiver", word: "kiiver", syllables: ["kii", "ver"], hint: "kaitseb pead" },
  { id: "rattarada", word: "rattarada", syllables: ["rat", "ta", "ra", "da"], hint: "tee jalgratastele" },
  { id: "nukk", word: "nukk", syllables: ["nukk"], hint: "mänguasi" },

];

function w(display: string, ...syllables: string[]): StoryWord {
  return { display, syllables };
}

export const STORIES: Story[] = [
  {
    id: "kessu",
    title: "Koer Kessu",
    kicker: "Lühike lugu koerast",
    sentences: [
      [w("Kessu", "Kes", "su"), w("on", "on"), w("väike", "väi", "ke"), w("koer.", "koer")],
      [w("Tal", "Tal"), w("on", "on"), w("punane", "pu", "na", "ne"), w("pall.", "pall")],
      [w("Kessu", "Kes", "su"), w("jookseb", "jook", "seb"), w("aias.", "ai", "as")],
      [w("Pall", "Pall"), w("veereb", "vee", "reb"), w("puu", "puu"), w("taha.", "ta", "ha")],
      [w("Kessu", "Kes", "su"), w("leiab", "lei", "ab"), w("palli", "pal", "li"), w("üles.", "ü", "les")],
      [w("Nüüd", "Nüüd"), w("on", "on"), w("Kessu", "Kes", "su"), w("rõõmus.", "rõõ", "mus")],
    ],
    question: { prompt: "Mis värvi on Kessu pall?", options: ["Punane", "Sinine", "Kollane"], answer: 0 },
  },
  {
    id: "hommik",
    title: "Hommik koolis",
    kicker: "Päev algab rahulikult",
    sentences: [
      [w("Hommikul", "Hom", "mi", "kul"), w("tõuseb", "tõu", "seb"), w("päike.", "päi", "ke")],
      [w("Marta", "Mar", "ta"), w("paneb", "pa", "neb"), w("koolikoti", "koo", "li", "ko", "ti"), w("valmis.", "val", "mis")],
      [w("Ema", "E", "ma"), w("teeb", "teeb"), w("sooja", "soo", "ja"), w("putru.", "put", "ru")],
      [w("Marta", "Mar", "ta"), w("sööb", "sööb"), w("ja", "ja"), w("joob", "joob"), w("piima.", "pii", "ma")],
      [w("Siis", "Siis"), w("läheb", "lä", "heb"), w("ta", "ta"), w("kooli.", "koo", "li")],
      [w("Tee", "Tee"), w("peal", "peal"), w("näeb", "näeb"), w("ta", "ta"), w("sõpra.", "sõp", "ra")],
    ],
    question: { prompt: "Mida Marta hommikul sööb?", options: ["Putru", "Kooki", "Suppi"], answer: 0 },
  },
  {
    id: "mets",
    title: "Metsas",
    kicker: "Vaikne jalutuskäik",
    sentences: [
      [w("Isa", "I", "sa"), w("ja", "ja"), w("Joonas", "Joo", "nas"), w("lähevad", "lä", "he", "vad"), w("metsa.", "met", "sa")],
      [w("Tee", "Tee"), w("on", "on"), w("pehme", "peh", "me"), w("ja", "ja"), w("sammal", "sam", "mal"), w("on", "on"), w("roheline.", "ro", "he", "li", "ne")],
      [w("Joonas", "Joo", "nas"), w("kuuleb", "kuu", "leb"), w("linnulaulu.", "lin", "nu", "lau", "lu")],
      [w("Puu", "Puu"), w("otsas", "ot", "sas"), w("hüppab", "hüp", "pab"), w("orav.", "o", "rav")],
      [w("Nad", "Nad"), w("leiavad", "lei", "a", "vad"), w("väikese", "väi", "ke", "se"), w("käbi.", "kä", "bi")],
      [w("Koju", "Ko", "ju"), w("minnes", "min", "nes"), w("on", "on"), w("mõlemad", "mõ", "le", "mad"), w("vaiksed", "vaik", "sed"), w("ja", "ja"), w("rõõmsad.", "rõõm", "sad")],
    ],
    question: { prompt: "Kes hüppab puu otsas?", options: ["Orav", "Jänes", "Koer"], answer: 0 },
  },
  {
    id: "vihm",
    title: "Vihm ja päike",
    kicker: "Ilm võib muutuda",
    sentences: [
      [w("Täna", "Tä", "na"), w("sajab", "sa", "jab"), w("vihma.", "vih", "ma")],
      [w("Liisa", "Lii", "sa"), w("võtab", "võ", "tab"), w("kollase", "kol", "la", "se"), w("vihmavarju.", "vih", "ma", "var", "ju")],
      [w("Tilgad", "Til", "gad"), w("koputavad", "ko", "pu", "ta", "vad"), w("varjule.", "var", "ju", "le")],
      [w("Varsti", "Vars", "ti"), w("tuleb", "tu", "leb"), w("päike", "päi", "ke"), w("välja.", "väl", "ja")],
      [w("Taevas", "Tae", "vas"), w("on", "on"), w("väike", "väi", "ke"), w("vikerkaar.", "vi", "ker", "kaar")],
      [w("Liisa", "Lii", "sa"), w("naeratab", "nae", "ra", "tab"), w("ja", "ja"), w("läheb", "lä", "heb"), w("edasi.", "e", "da", "si")],
    ],
    question: { prompt: "Mis on taevas pärast vihma?", options: ["Vikerkaar", "Lumi", "Kuu"], answer: 0 },
  },
  {
    id: "miisu",
    title: "Kass Miisu",
    kicker: "Soe koht aknal",
    sentences: [
      [w("Miisu", "Mii", "su"), w("on", "on"), w("hall", "hall"), w("kass.", "kass")],
      [w("Ta", "Ta"), w("magab", "ma", "gab"), w("akna", "ak", "na"), w("all.", "all")],
      [w("Päike", "Päi", "ke"), w("soojendab", "soo", "jen", "dab"), w("ta", "ta"), w("karva.", "kar", "va")],
      [w("Miisu", "Mii", "su"), w("venitab", "ve", "ni", "tab"), w("käppi", "käp", "pi"), w("ja", "ja"), w("nurrub.", "nur", "rub")],
      [w("Siis", "Siis"), w("hüppab", "hüp", "pab"), w("ta", "ta"), w("lauale.", "lau", "a", "le")],
      [w("Seal", "Seal"), w("on", "on"), w("tass", "tass"), w("piima.", "pii", "ma")],
    ],
    question: { prompt: "Mis värvi on Miisu?", options: ["Hall", "Must", "Valge"], answer: 0 },
  },
  {
    id: "ratas",
    title: "Rattasõit",
    kicker: "Üks ring ümber maja",
    sentences: [
      [w("Karl", "Karl"), w("võtab", "võ", "tab"), w("oma", "o", "ma"), w("sinise", "si", "ni", "se"), w("ratta.", "rat", "ta")],
      [w("Ta", "Ta"), w("paneb", "pa", "neb"), w("kiivri", "kiiv", "ri"), w("pähe.", "pä", "he")],
      [w("Tee", "Tee"), w("on", "on"), w("sile", "si", "le"), w("ja", "ja"), w("tuul", "tuul"), w("on", "on"), w("pehme.", "peh", "me")],
      [w("Karl", "Karl"), w("sõidab", "sõi", "dab"), w("maja", "ma", "ja"), w("ümber.", "üm", "ber")],
      [w("Koer", "Koer"), w("jookseb", "jook", "seb"), w("väravas", "vä", "ra", "vas"), w("vastu.", "vas", "tu")],
      [w("Karl", "Karl"), w("naerab", "nae", "rab"), w("ja", "ja"), w("sõidab", "sõi", "dab"), w("aeglaselt", "ae", "gla", "selt"), w("koju.", "ko", "ju")],
    ],
    question: { prompt: "Mis värvi on Karli ratas?", options: ["Sinine", "Punane", "Must"], answer: 0 },
  },
  {
    id: "vanaema",
    title: "Vanaema juures",
    kicker: "Soe köök ja sai",
    sentences: [
      [w("Laupäeval", "Lau", "päe", "val"), w("sõidab", "sõi", "dab"), w("Nora", "No", "ra"), w("vanaema", "va", "nae", "ma"), w("juurde.", "juur", "de")],
      [w("Köögis", "Köö", "gis"), w("lõhnab", "lõh", "nab"), w("värske", "värs", "ke"), w("sai.", "sai")],
      [w("Vanaema", "Va", "nae", "ma"), w("annab", "an", "nab"), w("Norale", "No", "ra", "le"), w("sooja", "soo", "ja"), w("tüki.", "tü", "ki")],
      [w("Nad", "Nad"), w("istuvad", "is", "tu", "vad"), w("laua", "lau", "a"), w("ääres.", "ää", "res")],
      [w("Nora", "No", "ra"), w("räägib", "rää", "gib"), w("koolist.", "koo", "list")],
      [w("Vanaema", "Va", "nae", "ma"), w("kuulab", "kuu", "lab"), w("vaikselt", "vaik", "selt"), w("ja", "ja"), w("naeratab.", "nae", "ra", "tab")],
    ],
    question: { prompt: "Mida vanaema küpsetas?", options: ["Sai", "Suppi", "Pudru"], answer: 0 },
  },
  {
    id: "lumi",
    title: "Lumememm",
    kicker: "Valge õu",
    sentences: [
      [w("Öösel", "Öö", "sel"), w("sadas", "sa", "das"), w("lund.", "lund")],
      [w("Õu", "Õu"), w("on", "on"), w("valge", "val", "ge"), w("ja", "ja"), w("vaikne.", "vaik", "ne")],
      [w("Lapsed", "Lap", "sed"), w("veeretavad", "vee", "re", "ta", "vad"), w("suuri", "suu", "ri"), w("palle.", "pal", "le")],
      [w("Nad", "Nad"), w("teevad", "tee", "vad"), w("lumememme.", "lu", "me", "mem", "me")],
      [w("Ninaks", "Ni", "naks"), w("pannakse", "pan", "nak", "se"), w("porgand.", "por", "gand")],
      [w("Lumememm", "Lu", "me", "memm"), w("seisab", "sei", "sab"), w("aias", "ai", "as"), w("ja", "ja"), w("naeratab.", "nae", "ra", "tab")],
    ],
    question: { prompt: "Mis pannakse lumememme ninaks?", options: ["Porgand", "Õun", "Pulk"], answer: 0 },
  },
  {
    id: "sunnipaev",
    title: "Sünnipäev",
    kicker: "Küünlad tordil",
    sentences: [
      [w("Täna", "Tä", "na"), w("on", "on"), w("Eliise", "E", "lii", "se"), w("sünnipäev.", "sün", "ni", "päev")],
      [w("Laual", "Lau", "al"), w("on", "on"), w("tore", "to", "re"), w("tort.", "tort")],
      [w("Tordil", "Tor", "dil"), w("on", "on"), w("üheksa", "ü", "hek", "sa"), w("küünalt.", "küü", "nalt")],
      [w("Sõbrad", "Sõb", "rad"), w("laulavad", "lau", "la", "vad"), w("talle.", "tal", "le")],
      [w("Eliise", "E", "lii", "se"), w("puhub", "pu", "hub"), w("küünlad", "küün", "lad"), w("kustu.", "kus", "tu")],
      [w("Kõik", "Kõik"), w("plaksutavad", "plak", "su", "ta", "vad"), w("ja", "ja"), w("naeravad.", "nae", "ra", "vad")],
    ],
    question: { prompt: "Mitu küünalt on tordil?", options: ["Üheksa", "Seitse", "Kümme"], answer: 0 },
  },
  {
    id: "ohtu",
    title: "Õhtune lugu",
    kicker: "Päev saab otsa",
    sentences: [
      [w("Õhtul", "Õh", "tul"), w("läheb", "lä", "heb"), w("taevas", "tae", "vas"), w("tumedaks.", "tu", "me", "daks")],
      [w("Toas", "To", "as"), w("põleb", "põ", "leb"), w("soe", "soe"), w("lamp.", "lamp")],
      [w("Ema", "E", "ma"), w("loeb", "loeb"), w("raamatut.", "raa", "ma", "tut")],
      [w("Laps", "Laps"), w("kuulab", "kuu", "lab"), w("vaikselt.", "vaik", "selt")],
      [w("Sõnad", "Sõ", "nad"), w("tulevad", "tu", "le", "vad"), w("aeglaselt", "ae", "gla", "selt"), w("ja", "ja"), w("selgelt.", "sel", "gelt")],
      [w("Varsti", "Vars", "ti"), w("on", "on"), w("aeg", "aeg"), w("magama", "ma", "ga", "ma"), w("minna.", "min", "na")],
    ],
    question: { prompt: "Mida ema õhtul teeb?", options: ["Loeb raamatut", "Küpsetab kooki", "Sõidab rattaga"], answer: 0 },
  },
  {
    id: "buss",
    title: "Koolibuss",
    kicker: "Hommikune sõit",
    sentences: [
      [w("Hommikul", "Hom", "mi", "kul"), w("tuleb", "tu", "leb"), w("kollane", "kol", "la", "ne"), w("buss.", "buss")],
      [w("Lapsed", "Lap", "sed"), w("istuvad", "is", "tu", "vad"), w("vaikselt.", "vaik", "selt")],
      [w("Oskar", "Os", "kar"), w("vaatab", "vaa", "tab"), w("aknast", "ak", "nast"), w("välja.", "väl", "ja")],
      [w("Põllud", "Põl", "lud"), w("on", "on"), w("märjad", "mär", "jad"), w("kaste", "kas", "te"), w("läbi.", "lä", "bi")],
      [w("Buss", "Buss"), w("peatub", "pea", "tub"), w("koolimaja", "koo", "li", "ma", "ja"), w("ees.", "ees")],
      [w("Oskar", "Os", "kar"), w("võtab", "võ", "tab"), w("koti", "ko", "ti"), w("ja", "ja"), w("läheb", "lä", "heb"), w("sisse.", "sis", "se")],
    ],
    question: { prompt: "Mis värvi on buss?", options: ["Kollane", "Punane", "Sinine"], answer: 0 },
  },
  {
    id: "meri",
    title: "Mere ääres",
    kicker: "Tuul ja kivid",
    sentences: [
      [w("Perekond", "Pe", "re", "kond"), w("läheb", "lä", "heb"), w("mere", "me", "re"), w("äärde.", "äär", "de")],
      [w("Tuul", "Tuul"), w("on", "on"), w("pehme", "peh", "me"), w("ja", "ja"), w("soolane.", "soo", "la", "ne")],
      [w("Lapsed", "Lap", "sed"), w("korjavad", "kor", "ja", "vad"), w("siledaid", "si", "le", "daid"), w("kive.", "ki", "ve")],
      [w("Üks", "Üks"), w("kivi", "ki", "vi"), w("on", "on"), w("valge", "val", "ge"), w("nagu", "na", "gu"), w("muna.", "mu", "na")],
      [w("Isa", "I", "sa"), w("viskab", "vis", "kab"), w("kivi", "ki", "vi"), w("vette.", "vet", "te")],
      [w("Vesi", "Ve", "si"), w("teeb", "teeb"), w("väikese", "väi", "ke", "se"), w("ringi.", "rin", "gi")],
    ],
    question: { prompt: "Kuhu isa kivi viskab?", options: ["Vette", "Liiva", "Kotti"], answer: 0 },
  },
  {
    id: "raamatukogu",
    title: "Raamatukogu",
    kicker: "Vaikne tuba",
    sentences: [
      [w("Triin", "Triin"), w("läheb", "lä", "heb"), w("raamatukokku.", "raa", "ma", "tu", "kok", "ku")],
      [w("Toas", "To", "as"), w("on", "on"), w("vaikne.", "vaik", "ne")],
      [w("Riiulil", "Riiu", "lil"), w("on", "on"), w("palju", "pal", "ju"), w("raamatuid.", "raa", "ma", "tuid")],
      [w("Triin", "Triin"), w("võtab", "võ", "tab"), w("ühe", "ü", "he"), w("väikese", "väi", "ke", "se"), w("loo.", "loo")],
      [w("Ta", "Ta"), w("loeb", "loeb"), w("aeglaselt,", "ae", "gla", "selt"), w("sõna", "sõ", "na"), w("sõna", "sõ", "na"), w("haaval.", "haa", "val")],
      [w("Lõpuks", "Lõ", "puks"), w("naeratab", "nae", "ra", "tab"), w("ta", "ta"), w("ise.", "i", "se")],
    ],
    question: { prompt: "Kuhu Triin läheb?", options: ["Raamatukokku", "Poodi", "Metsa"], answer: 0 },
  },
  {
    id: "aed",
    title: "Aias",
    kicker: "Roheline peenar",
    sentences: [
      [w("Ema", "E", "ma"), w("ja", "ja"), w("Anna", "An", "na"), w("lähevad", "lä", "he", "vad"), w("aeda.", "ae", "da")],
      [w("Peenras", "Pee", "nras"), w("kasvavad", "kas", "va", "vad"), w("punased", "pu", "na", "sed"), w("tomatid.", "to", "ma", "tid")],
      [w("Anna", "An", "na"), w("kastab", "kas", "tab"), w("taimi", "tai", "mi"), w("veega.", "vee", "ga")],
      [w("Mesilane", "Me", "si", "la", "ne"), w("lendab", "len", "dab"), w("lille", "lil", "le"), w("juurde.", "juur", "de")],
      [w("Nad", "Nad"), w("korjavad", "kor", "ja", "vad"), w("kolm", "kolm"), w("tomatit.", "to", "ma", "tit")],
      [w("Köögis", "Köö", "gis"), w("lõhnab", "lõh", "nab"), w("värske", "värs", "ke"), w("toit.", "toit")],
    ],
    question: { prompt: "Mida Anna taimedega teeb?", options: ["Kastab neid", "Lõikab neid", "Peidab neid"], answer: 0 },
  },
  {
    id: "park",
    title: "Pargis",
    kicker: "Kiik ja liiv",
    sentences: [
      [w("Pärast", "Pä", "rast"), w("kooli", "koo", "li"), w("läheb", "lä", "heb"), w("Marko", "Mar", "ko"), w("parki.", "par", "ki")],
      [w("Seal", "Seal"), w("on", "on"), w("suur", "suur"), w("kiik.", "kiik")],
      [w("Marko", "Mar", "ko"), w("kiigub", "kii", "gub"), w("kõrgele.", "kõr", "ge", "le")],
      [w("Siis", "Siis"), w("mängib", "män", "gib"), w("ta", "ta"), w("liivakastis.", "lii", "va", "kas", "tis")],
      [w("Ta", "Ta"), w("teeb", "teeb"), w("väikese", "väi", "ke", "se"), w("lossi.", "los", "si")],
      [w("Koju", "Ko", "ju"), w("minnes", "min", "nes"), w("on", "on"), w("käed", "käed"), w("liivased.", "lii", "va", "sed")],
    ],
    question: { prompt: "Kus Marko lossi teeb?", options: ["Liivakastis", "Koolis", "Bussis"], answer: 0 },
  },
  {
    id: "supp",
    title: "Soe supp",
    kicker: "Lõuna laual",
    sentences: [
      [w("Lõunaks", "Lõu", "naks"), w("on", "on"), w("lauas", "lau", "as"), w("soe", "soe"), w("supp.", "supp")],
      [w("Supis", "Su", "pis"), w("on", "on"), w("porgand", "por", "gand"), w("ja", "ja"), w("kartul.", "kar", "tul")],
      [w("Isa", "I", "sa"), w("paneb", "pa", "neb"), w("laua", "lau", "a"), w("ääres", "ää", "res"), w("leiba.", "lei", "ba")],
      [w("Lapsed", "Lap", "sed"), w("söövad", "söö", "vad"), w("vaikselt.", "vaik", "selt")],
      [w("Pärast", "Pä", "rast"), w("saavad", "saa", "vad"), w("nad", "nad"), w("õuna.", "õu", "na")],
      [w("Kõht", "Kõht"), w("on", "on"), w("täis", "täis"), w("ja", "ja"), w("kõik", "kõik"), w("on", "on"), w("rahul.", "ra", "hul")],
    ],
    question: { prompt: "Mis on lõunaks lauas?", options: ["Supp", "Jäätis", "Kook"], answer: 0 },
  },
  {
    id: "lind",
    title: "Linnupesa",
    kicker: "Okstel peidus",
    sentences: [
      [w("Õues", "Õu", "es"), w("on", "on"), w("vana", "va", "na"), w("õunapuu.", "õu", "na", "puu")],
      [w("Puu", "Puu"), w("okstel", "oks", "tel"), w("on", "on"), w("väike", "väi", "ke"), w("pesa.", "pe", "sa")],
      [w("Seal", "Seal"), w("elab", "e", "lab"), w("hall", "hall"), w("lind.", "lind")],
      [w("Lind", "Lind"), w("toob", "toob"), w("pojale", "po", "ja", "le"), w("ussi.", "us", "si")],
      [w("Lapsed", "Lap", "sed"), w("vaatavad", "vaa", "ta", "vad"), w("eemale", "ee", "ma", "le"), w("ja", "ja"), w("vaikselt.", "vaik", "selt")],
      [w("Nad", "Nad"), w("ei", "ei"), w("taha", "ta", "ha"), w("pesa", "pe", "sa"), w("hirmutada.", "hir", "mu", "ta", "da")],
    ],
    question: { prompt: "Kus on linnupesa?", options: ["Õunapuu okstel", "Majas", "Bussis"], answer: 0 },
  },
  {
    id: "poed",
    title: "Poes",
    kicker: "Väike ost",
    sentences: [
      [w("Ema", "E", "ma"), w("ja", "ja"), w("Tom", "Tom"), w("lähevad", "lä", "he", "vad"), w("poodi.", "poo", "di")],
      [w("Tom", "Tom"), w("hoiab", "hoi", "ab"), w("ostukorvi.", "os", "tu", "kor", "vi")],
      [w("Nad", "Nad"), w("võtavad", "võ", "ta", "vad"), w("piima", "pii", "ma"), w("ja", "ja"), w("leiba.", "lei", "ba")],
      [w("Kassas", "Kas", "sas"), w("ütleb", "üt", "leb"), w("Tom", "Tom"), w("aitäh.", "ai", "täh")],
      [w("Tee", "Tee"), w("peal", "peal"), w("kannab", "kan", "nab"), w("ta", "ta"), w("kotti.", "kot", "ti")],
      [w("Kodus", "Ko", "dus"), w("paneb", "pa", "neb"), w("ema", "e", "ma"), w("asjad", "as", "jad"), w("kappi.", "kap", "pi")],
    ],
    question: { prompt: "Mida Tom poes hoiab?", options: ["Ostukorvi", "Raamatut", "Palli"], answer: 0 },
  },
  {
    id: "talv",
    title: "Talvehommik",
    kicker: "Külm ja hele",
    sentences: [
      [w("Hommikul", "Hom", "mi", "kul"), w("on", "on"), w("aken", "a", "ken"), w("jäine.", "jäi", "ne")],
      [w("Õues", "Õu", "es"), w("sädeleb", "sä", "de", "leb"), w("lumi.", "lu", "mi")],
      [w("Laura", "Lau", "ra"), w("paneb", "pa", "neb"), w("sooja", "soo", "ja"), w("mütsi.", "mü", "tsi")],
      [w("Ta", "Ta"), w("astub", "as", "tub"), w("ettevaatlikult", "et", "te", "vaa", "tli", "kult"), w("õue.", "õu", "e")],
      [w("Jalad", "Ja", "lad"), w("krõbisevad", "krõ", "bi", "se", "vad"), w("lumes.", "lu", "mes")],
      [w("Laura", "Lau", "ra"), w("naeratab", "nae", "ra", "tab"), w("ja", "ja"), w("hingab", "hin", "gab"), w("auru.", "au", "ru")],
    ],
    question: { prompt: "Mis on õues?", options: ["Lumi", "Vihm", "Liiv"], answer: 0 },
  },
  {
    id: "joonistus",
    title: "Joonistus",
    kicker: "Värvid laual",
    sentences: [
      [w("Tundides", "Tun", "di", "des"), w("võtab", "võ", "tab"), w("Saara", "Saa", "ra"), w("pliiatsid.", "plii", "at", "sid")],
      [w("Ta", "Ta"), w("joonistab", "joo", "nis", "tab"), w("suure", "suu", "re"), w("päikese.", "päi", "ke", "se")],
      [w("Siis", "Siis"), w("lisab", "li", "sab"), w("ta", "ta"), w("sinise", "si", "ni", "se"), w("maja.", "ma", "ja")],
      [w("Õpetaja", "Õ", "pe", "ta", "ja"), w("vaatab", "vaa", "tab"), w("ja", "ja"), w("noogutab.", "noo", "gu", "tab")],
      [w("Saara", "Saa", "ra"), w("värvib", "vär", "vib"), w("taeva", "tae", "va"), w("heledaks.", "he", "le", "daks")],
      [w("Pildi", "Pil", "di"), w("alla", "al", "la"), w("kirjutab", "kir", "ju", "tab"), w("ta", "ta"), w("oma", "o", "ma"), w("nime.", "ni", "me")],
    ],
    question: { prompt: "Mida Saara kõigepealt joonistab?", options: ["Päikese", "Auto", "Koera"], answer: 0 },
  },
  {
    id: "kassipoeg",
    title: "Kassipoeg",
    kicker: "Pehme pall toas",
    sentences: [
      [w("Toas", "To", "as"), w("elab", "e", "lab"), w("väike", "väi", "ke"), w("kassipoeg.", "kas", "si", "poeg")],
      [w("Tal", "Tal"), w("on", "on"), w("pehmed", "peh", "med"), w("käpad.", "kä", "pad")],
      [w("Kassipoeg", "Kas", "si", "poeg"), w("mängib", "män", "gib"), w("sinise", "si", "ni", "se"), w("nööriga.", "nöö", "ri", "ga")],
      [w("Siis", "Siis"), w("hüppab", "hüp", "pab"), w("ta", "ta"), w("toolile.", "too", "li", "le")],
      [w("Ema", "E", "ma"), w("naeratab", "nae", "ra", "tab"), w("ja", "ja"), w("silitab", "si", "li", "tab"), w("teda.", "te", "da")],
      [w("Õhtul", "Õh", "tul"), w("magab", "ma", "gab"), w("kassipoeg", "kas", "si", "poeg"), w("padjal.", "pad", "jal")],
    ],
    question: { prompt: "Millega kassipoeg mängib?", options: ["Sinise nööriga", "Punase palliga", "Rohelise lehega"], answer: 0 },
  },
  {
    id: "sild",
    title: "Väike sild",
    kicker: "Üle oja",
    sentences: [
      [w("Metsas", "Met", "sas"), w("on", "on"), w("väike", "väi", "ke"), w("oja.", "o", "ja")],
      [w("Oja", "O", "ja"), w("peal", "peal"), w("on", "on"), w("puust", "puust"), w("sild.", "sild")],
      [w("Mikk", "Mikk"), w("astub", "as", "tub"), w("sillale", "sil", "la", "le"), w("ettevaatlikult.", "et", "te", "vaa", "tli", "kult")],
      [w("Vesi", "Ve", "si"), w("voolab", "voo", "lab"), w("vaikselt", "vaik", "selt"), w("all.", "all")],
      [w("Teisel", "Tei", "sel"), w("kaldal", "kal", "dal"), w("kasvab", "kas", "vab"), w("kollane", "kol", "la", "ne"), w("lill.", "lill")],
      [w("Mikk", "Mikk"), w("võtab", "võ", "tab"), w("foto", "fo", "to"), w("ja", "ja"), w("läheb", "lä", "heb"), w("edasi.", "e", "da", "si")],
    ],
    question: { prompt: "Mis on oja peal?", options: ["Puust sild", "Suur kivi", "Vana auto"], answer: 0 },
  },
  {
    id: "tahtede",
    title: "Tähed taevas",
    kicker: "Selge õhtu",
    sentences: [
      [w("Õhtul", "Õh", "tul"), w("on", "on"), w("taevas", "tae", "vas"), w("selge.", "sel", "ge")],
      [w("Eva", "E", "va"), w("ja", "ja"), w("isa", "i", "sa"), w("vaatavad", "vaa", "ta", "vad"), w("õue.", "õu", "e")],
      [w("Kuu", "Kuu"), w("on", "on"), w("hele", "he", "le"), w("ja", "ja"), w("ümmargune.", "üm", "mar", "gu", "ne")],
      [w("Ümber", "Üm", "ber"), w("kuu", "kuu"), w("sädelevad", "sä", "de", "le", "vad"), w("väikesed", "väi", "ke", "sed"), w("tähed.", "tä", "hed")],
      [w("Eva", "E", "va"), w("loeb", "loeb"), w("neid", "neid"), w("vaikselt.", "vaik", "selt")],
      [w("Isa", "I", "sa"), w("ütleb,", "üt", "leb"), w("et", "et"), w("varsti", "vars", "ti"), w("on", "on"), w("aeg", "aeg"), w("magama.", "ma", "ga", "ma")],
    ],
    question: { prompt: "Mis sädeleb kuu ümber?", options: ["Tähed", "Pilved", "Linnud"], answer: 0 },
  },
  {
    id: "koogivili",
    title: "Köögiviljasupp",
    kicker: "Lõhnav pott",
    sentences: [
      [w("Isa", "I", "sa"), w("keedab", "kee", "dab"), w("köögis", "köö", "gis"), w("suppi.", "sup", "pi")],
      [w("Potti", "Pot", "ti"), w("läheb", "lä", "heb"), w("porgand", "por", "gand"), w("ja", "ja"), w("kartul.", "kar", "tul")],
      [w("Siis", "Siis"), w("lisab", "li", "sab"), w("ta", "ta"), w("väikese", "väi", "ke", "se"), w("soola.", "soo", "la")],
      [w("Lapsed", "Lap", "sed"), w("aitavad", "ai", "ta", "vad"), w("laua", "lau", "a"), w("katta.", "kat", "ta")],
      [w("Supp", "Supp"), w("on", "on"), w("soe", "soe"), w("ja", "ja"), w("maitsev.", "mai", "tsev")],
      [w("Pärast", "Pä", "rast"), w("sööki", "söö", "ki"), w("peseb", "pe", "seb"), w("igaüks", "i", "ga", "üks"), w("nõud.", "nõud")],
    ],
    question: { prompt: "Kes keedab suppi?", options: ["Isa", "Ema", "Naaber"], answer: 0 },
  },
  {
    id: "kiigel",
    title: "Kiigel",
    kicker: "Kõrgele ja tagasi",
    sentences: [
      [w("Pargis", "Par", "gis"), w("on", "on"), w("pikk", "pikk"), w("kiik.", "kiik")],
      [w("Helen", "He", "len"), w("istub", "is", "tub"), w("kiigele.", "kii", "ge", "le")],
      [w("Isa", "I", "sa"), w("lükkab", "lük", "kab"), w("teda", "te", "da"), w("ettevaatlikult.", "et", "te", "vaa", "tli", "kult")],
      [w("Helen", "He", "len"), w("lendab", "len", "dab"), w("kõrgele", "kõr", "ge", "le"), w("ja", "ja"), w("naerab.", "nae", "rab")],
      [w("Tuul", "Tuul"), w("puhub", "pu", "hub"), w("näkku.", "näk", "ku")],
      [w("Siis", "Siis"), w("lähevad", "lä", "he", "vad"), w("nad", "nad"), w("koos", "koos"), w("koju.", "ko", "ju")],
    ],
    question: { prompt: "Kes lükkab Heleni kiigel?", options: ["Isa", "Õde", "Sõber"], answer: 0 },
  },

];

export const CHOICE_QUIZ: ChoiceQuiz[] = [
  { id: "c1", kind: "choice", prompt: "Kumb on õige sõna puuvilja kohta?", options: ["õun", "oun", "äun"], answer: 0 },
  { id: "c2", kind: "choice", prompt: "Kumb on õige sõna kooli kohta?", options: ["kool", "gol", "kuul"], answer: 0 },
  { id: "c3", kind: "choice", prompt: "Kumb on õige sõna looma kohta?", options: ["koer", "goer", "koër"], answer: 0 },
  { id: "c4", kind: "choice", prompt: "Kumb on õige sõna käe kohta?", options: ["käsi", "kasi", "käzi"], answer: 0 },
  { id: "c5", kind: "choice", prompt: "Kumb on õige sõna töö kohta?", options: ["töö", "too", "töo"], answer: 0 },
  { id: "c6", kind: "choice", prompt: "Kumb on õige sõna küla kohta?", options: ["küla", "kula", "külla"], answer: 0 },
  { id: "c7", kind: "choice", prompt: "Kumb on õige sõna õe kohta?", options: ["õde", "ode", "öde"], answer: 0 },
  { id: "c8", kind: "choice", prompt: "Kumb on õige sõna päikese kohta?", options: ["päike", "paike", "päikee"], answer: 0 },
  { id: "c9", kind: "choice", prompt: "Kumb on õige sõna raamatu kohta?", options: ["raamat", "ramat", "raamatt"], answer: 0 },
  { id: "c10", kind: "choice", prompt: "Kumb on õige sõna sõbra kohta?", options: ["sõber", "sober", "söber"], answer: 0 },
  { id: "c11", kind: "choice", prompt: "Kumb on õige sõna südame kohta?", options: ["süda", "suda", "süta"], answer: 0 },
  { id: "c12", kind: "choice", prompt: "Kumb on õige sõna öö kohta?", options: ["öö", "oo", "õõ"], answer: 0 },
  { id: "c13", kind: "choice", prompt: "Kumb on õige sõna bussi kohta?", options: ["buss", "duss", "puss"], answer: 0 },
  { id: "c14", kind: "choice", prompt: "Kumb on õige sõna palli kohta?", options: ["pall", "ball", "dall"], answer: 0 },
  { id: "c15", kind: "choice", prompt: "Kumb on õige sõna vee kohta?", options: ["vesi", "vezi", "wäsi"], answer: 0 },
  { id: "c16", kind: "choice", prompt: "Kumb on õige sõna leiva kohta?", options: ["leib", "leip", "leiv"], answer: 0 },
  { id: "c17", kind: "choice", prompt: "Kumb on õige sõna akna kohta?", options: ["aken", "agen", "akenk"], answer: 0 },
  { id: "c18", kind: "choice", prompt: "Kumb on õige sõna lille kohta?", options: ["lill", "lil", "liil"], answer: 0 },
  { id: "c19", kind: "choice", prompt: "Kumb on õige sõna kella kohta?", options: ["kell", "gel", "kelll"], answer: 0 },
  { id: "c20", kind: "choice", prompt: "Kumb on õige sõna pilve kohta?", options: ["pilv", "bilv", "pilf"], answer: 0 },
  { id: "c21", kind: "choice", prompt: "Kumb on õige sõna suve kohta?", options: ["suvi", "suwi", "sufi"], answer: 0 },
  { id: "c22", kind: "choice", prompt: "Kumb on õige sõna mere kohta?", options: ["meri", "merri", "märi"], answer: 0 },
  { id: "c23", kind: "choice", prompt: "Kumb on õige sõna tuule kohta?", options: ["tuul", "tuulll", "tuyl"], answer: 0 },
  { id: "c24", kind: "choice", prompt: "Kumb on õige sõna metsa kohta?", options: ["mets", "meds", "metss"], answer: 0 },
  { id: "c25", kind: "choice", prompt: "Kumb on õige sõna käbi kohta?", options: ["käbi", "kabi", "käpi"], answer: 0 },
  { id: "c26", kind: "choice", prompt: "Kumb on õige sõna tähe kohta?", options: ["täht", "taht", "tähtt"], answer: 0 },
  { id: "c27", kind: "choice", prompt: "Kumb on õige sõna värava kohta?", options: ["värav", "varav", "värraf"], answer: 0 },
  { id: "c28", kind: "choice", prompt: "Kumb on õige sõna porgandi kohta?", options: ["porgand", "porcant", "porgant"], answer: 0 },
  { id: "c29", kind: "choice", prompt: "Kumb on õige sõna kartuli kohta?", options: ["kartul", "kartull", "gardul"], answer: 0 },
  { id: "c30", kind: "choice", prompt: "Kumb on õige sõna kiivri kohta?", options: ["kiiver", "kiiverr", "giiver"], answer: 0 },

];

export const MISSING_QUIZ: MissingQuiz[] = [
  { id: "m1", kind: "missing", word: "kass", blank: 1, options: ["a", "o", "e", "u"], answer: 0 },
  { id: "m2", kind: "missing", word: "koer", blank: 2, options: ["e", "a", "i", "o"], answer: 0 },
  { id: "m3", kind: "missing", word: "maja", blank: 1, options: ["a", "e", "o", "ä"], answer: 0 },
  { id: "m4", kind: "missing", word: "käsi", blank: 1, options: ["ä", "a", "e", "ö"], answer: 0 },
  { id: "m5", kind: "missing", word: "õun", blank: 0, options: ["õ", "ö", "o", "ä"], answer: 0 },
  { id: "m6", kind: "missing", word: "töö", blank: 1, options: ["ö", "o", "õ", "ä"], answer: 0 },
  { id: "m7", kind: "missing", word: "küla", blank: 1, options: ["ü", "u", "i", "ö"], answer: 0 },
  { id: "m8", kind: "missing", word: "päike", blank: 1, options: ["ä", "a", "e", "ö"], answer: 0 },
  { id: "m9", kind: "missing", word: "sõber", blank: 1, options: ["õ", "ö", "o", "ä"], answer: 0 },
  { id: "m10", kind: "missing", word: "raamat", blank: 2, options: ["a", "e", "ä", "o"], answer: 0 },
  { id: "m11", kind: "missing", word: "hommik", blank: 4, options: ["i", "e", "a", "u"], answer: 0 },
  { id: "m12", kind: "missing", word: "süda", blank: 1, options: ["ü", "u", "i", "ö"], answer: 0 },
  { id: "m13", kind: "missing", word: "buss", blank: 0, options: ["b", "d", "p", "g"], answer: 0 },
  { id: "m14", kind: "missing", word: "pall", blank: 0, options: ["p", "b", "d", "t"], answer: 0 },
  { id: "m15", kind: "missing", word: "vesi", blank: 1, options: ["e", "ä", "a", "i"], answer: 0 },
  { id: "m16", kind: "missing", word: "leib", blank: 2, options: ["i", "e", "a", "ä"], answer: 0 },
  { id: "m17", kind: "missing", word: "aken", blank: 0, options: ["a", "ä", "e", "o"], answer: 0 },
  { id: "m18", kind: "missing", word: "lill", blank: 1, options: ["i", "e", "ü", "ä"], answer: 0 },
  { id: "m19", kind: "missing", word: "kell", blank: 1, options: ["e", "ä", "a", "ö"], answer: 0 },
  { id: "m20", kind: "missing", word: "pilv", blank: 1, options: ["i", "e", "ä", "u"], answer: 0 },
  { id: "m21", kind: "missing", word: "tuba", blank: 1, options: ["u", "ü", "o", "ö"], answer: 0 },
  { id: "m22", kind: "missing", word: "meri", blank: 1, options: ["e", "ä", "a", "ö"], answer: 0 },
  { id: "m23", kind: "missing", word: "tuul", blank: 1, options: ["u", "ü", "o", "ö"], answer: 0 },
  { id: "m24", kind: "missing", word: "käbi", blank: 1, options: ["ä", "a", "e", "ö"], answer: 0 },
  { id: "m25", kind: "missing", word: "täht", blank: 1, options: ["ä", "a", "e", "ö"], answer: 0 },
  { id: "m26", kind: "missing", word: "värav", blank: 1, options: ["ä", "a", "e", "ö"], answer: 0 },
  { id: "m27", kind: "missing", word: "porgand", blank: 1, options: ["o", "ö", "a", "u"], answer: 0 },
  { id: "m28", kind: "missing", word: "kartul", blank: 1, options: ["a", "ä", "e", "o"], answer: 0 },
  { id: "m29", kind: "missing", word: "kiiver", blank: 2, options: ["i", "e", "ä", "ü"], answer: 0 },
  { id: "m30", kind: "missing", word: "sammal", blank: 1, options: ["a", "ä", "e", "o"], answer: 0 },

];

export const SAME_QUIZ: SameQuiz[] = [
  { id: "s1", kind: "same", a: "koer", b: "koer", same: true },
  { id: "s2", kind: "same", a: "kass", b: "kaas", same: false },
  { id: "s3", kind: "same", a: "maja", b: "naja", same: false },
  { id: "s4", kind: "same", a: "päike", b: "päike", same: true },
  { id: "s5", kind: "same", a: "käsi", b: "kasi", same: false },
  { id: "s6", kind: "same", a: "õun", b: "öun", same: false },
  { id: "s7", kind: "same", a: "sõber", b: "sõber", same: true },
  { id: "s8", kind: "same", a: "küla", b: "kula", same: false },
  { id: "s9", kind: "same", a: "töö", b: "too", same: false },
  { id: "s10", kind: "same", a: "raamat", b: "raamat", same: true },
  { id: "s11", kind: "same", a: "buss", b: "duss", same: false },
  { id: "s12", kind: "same", a: "pall", b: "ball", same: false },
  { id: "s13", kind: "same", a: "buss", b: "duss", same: false },
  { id: "s14", kind: "same", a: "tuba", b: "tuba", same: true },
  { id: "s15", kind: "same", a: "vesi", b: "vesi", same: true },
  { id: "s16", kind: "same", a: "leib", b: "leip", same: false },
  { id: "s17", kind: "same", a: "aken", b: "agen", same: false },
  { id: "s18", kind: "same", a: "lill", b: "lill", same: true },
  { id: "s19", kind: "same", a: "kell", b: "gel", same: false },
  { id: "s20", kind: "same", a: "pilv", b: "pilv", same: true },
  { id: "s21", kind: "same", a: "suvi", b: "sufi", same: false },
  { id: "s22", kind: "same", a: "meri", b: "meri", same: true },
  { id: "s23", kind: "same", a: "tuul", b: "tuul", same: true },
  { id: "s24", kind: "same", a: "mets", b: "meds", same: false },
  { id: "s25", kind: "same", a: "käbi", b: "kabi", same: false },
  { id: "s26", kind: "same", a: "täht", b: "taht", same: false },
  { id: "s27", kind: "same", a: "värav", b: "värav", same: true },
  { id: "s28", kind: "same", a: "porgand", b: "porcant", same: false },
  { id: "s29", kind: "same", a: "kartul", b: "kartul", same: true },
  { id: "s30", kind: "same", a: "kiiver", b: "giiver", same: false },

];

export const LISTEN_QUIZ: ListenQuiz[] = [
  { id: "l1", kind: "listen", word: "õun", options: ["õun", "oun", "öun"], answer: 0 },
  { id: "l2", kind: "listen", word: "koer", options: ["koer", "kaer", "kuur"], answer: 0 },
  { id: "l3", kind: "listen", word: "päike", options: ["päike", "paike", "peike"], answer: 0 },
  { id: "l4", kind: "listen", word: "käsi", options: ["käsi", "kasi", "kesa"], answer: 0 },
  { id: "l5", kind: "listen", word: "sõber", options: ["sõber", "sober", "söber"], answer: 0 },
  { id: "l6", kind: "listen", word: "küla", options: ["küla", "kula", "kõla"], answer: 0 },
  { id: "l7", kind: "listen", word: "töö", options: ["töö", "too", "tõõ"], answer: 0 },
  { id: "l8", kind: "listen", word: "hommik", options: ["hommik", "homik", "hammik"], answer: 0 },
  { id: "l9", kind: "listen", word: "buss", options: ["buss", "duss", "puss"], answer: 0 },
  { id: "l10", kind: "listen", word: "vesi", options: ["vesi", "vesa", "väsi"], answer: 0 },
  { id: "l11", kind: "listen", word: "leib", options: ["leib", "leip", "leiv"], answer: 0 },
  { id: "l12", kind: "listen", word: "aken", options: ["aken", "agen", "akon"], answer: 0 },
  { id: "l13", kind: "listen", word: "lill", options: ["lill", "lil", "liil"], answer: 0 },
  { id: "l14", kind: "listen", word: "kell", options: ["kell", "gel", "käll"], answer: 0 },
  { id: "l15", kind: "listen", word: "pilv", options: ["pilv", "bilv", "pälv"], answer: 0 },
  { id: "l16", kind: "listen", word: "suvi", options: ["suvi", "sufi", "süvi"], answer: 0 },
  { id: "l17", kind: "listen", word: "meri", options: ["meri", "märi", "mõri"], answer: 0 },
  { id: "l18", kind: "listen", word: "tuul", options: ["tuul", "tuyl", "tül"], answer: 0 },
  { id: "l19", kind: "listen", word: "käbi", options: ["käbi", "kabi", "kebi"], answer: 0 },
  { id: "l20", kind: "listen", word: "täht", options: ["täht", "taht", "teht"], answer: 0 },
  { id: "l21", kind: "listen", word: "värav", options: ["värav", "varav", "verav"], answer: 0 },
  { id: "l22", kind: "listen", word: "porgand", options: ["porgand", "porcant", "pergand"], answer: 0 },
  { id: "l23", kind: "listen", word: "kartul", options: ["kartul", "kartull", "kertul"], answer: 0 },
  { id: "l24", kind: "listen", word: "kiiver", options: ["kiiver", "giiver", "keiver"], answer: 0 },

];

export const ENCOURAGE_OK = ["Tubli.", "Väga hea.", "Just nii.", "Hästi loetud.", "Täpselt."];

export const ENCOURAGE_RETRY = [
  "Proovi veel kord. Sa saad hakkama.",
  "Vaata rahulikult uuesti.",
  "Peaaegu. Proovi veel.",
];

export const PARENT_TIPS = [
  "Kümme minutit iga päev aitab rohkem kui pikk harjutus kord nädalas.",
  "Kiida pingutust, mitte ainult õiget vastust.",
  "Ära kiirusta. Paus on ka harjutus.",
  "Õhtul võib veel koos paberraamatut lugeda — sina loed, laps kuulab.",
  "Ära lisa avaekraanile musta tühja lehte. Ikoon tuleb püsivast lingist, kui rakendus avaneb kreemja lehena.",
  "Koos harjutamiseks kasutage ühte telefoni. Lingi võid saata ka naisele.",
];
