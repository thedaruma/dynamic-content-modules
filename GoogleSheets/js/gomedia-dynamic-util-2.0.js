/*
gomedia-dynamic-util.js
-bayon forte 7-28-2016
-Ryan Giordano 12-7-2016
This file will be 'ACTIVELY LIVE' getting pulled into and used by thousands of pieces of dynamic content.
Primarily new Digital Signage (v3) or html+ content.
DO NOT DELETE OR WORK ON IT DIRECTLY.
I. Functions
	1. QueryStringToJSON()
	2. filterContent(string)
	3. addOnFunctions()
	4. hideLinks()
	5. capitalizeFirstLetter(string)
	6. abbrState(input, to)
	7. checkParameters()
	8. getParameterByName(name)
	9. goMediaDynamicSceneRefresh
	10. loadScript(url, callback)
	11. removeDynamicScripts()
	12. edgeIsReady()

DEVELOPER NOTES:
1) main.js needs to container the function: gomediaDynamicInit(), because the
portal uses this function like a callback when a scene is refreshed.
2) Any content file that writes  a script to the head of the html document with the global loadScripts() function,
for example JSONP requests to a proxy,
needs to call this function, removeDynamicScripts(), once it has received the data it needs.
Otherwise, scripts will continue to get added to the html because of the way that the portal software works.
It takes a 'snapshot' of the html that was edited and saves it.
3) Gomedia_Dynamic is inherited by dynamic modules like Twitter_Module and State_News_Module
*/

class Gomedia_Dynamic {
    constructor() {
        this.arrayOfDynamicScriptIds = [];
        this.filter = ["a55","a55hole","aeolus","ahole",
            "anal",
            "analprobe",
            "anilingus",
            "anus",
            "areola",
            "areole",
            "arian",
            "aryan",
            "ass",
            "assbang",
            "assbanged",
            "assbangs",
            "asses",
            "assfuck",
            "assfucker",
            "assh0le",
            "asshat",
            "assho1e",
            "ass hole",
            "assholes",
            "assmaster",
            "assmunch",
            "asswipe",
            "asswipes",
            "azazel",
            "azz",
            "b1tch",
            "babe",
            "babes",
            "ballsack",
            "bang",
            "banger",
            "barf",
            "bastard",
            "bastards",
            "bawdy",
            "beaner",
            "beardedclam",
            "beastiality",
            "beatch",
            "beater",
            "beaver",
            "beer",
            "beeyotch",
            "beotch",
            "biatch",
            "bigtits",
            "big tits",
            "bimbo",
            "bitch",
            "bitched",
            "bitches",
            "bitchy",
            "blow job",
            "blow",
            "blowjob",
            "blowjobs",
            "bod",
            "bodily",
            "boink",
            "bollock",
            "bollocks",
            "bollok",
            "bone",
            "boned",
            "boner",
            "boners",
            "bong",
            "boob",
            "boobies",
            "boobs",
            "booby",
            "booger",
            "bookie",
            "bootee",
            "bootie",
            "booty",
            "booze",
            "boozer",
            "boozy",
            "bosom",
            "bosomy",
            "bowel",
            "bowels",
            "bra",
            "brassiere",
            "breast",
            "breasts",
            "bugger",
            "bukkake",
            "bullshit",
            "bull shit",
            "bullshits",
            "bullshitted",
            "bullturds",
            "bung",
            "busty",
            "butt",
            "butt fuck",
            "buttfuck",
            "buttfucker",
            "buttfucker",
            "buttplug",
            "c.0.c.k",
            "c.o.c.k.",
            "c.u.n.t",
            "c0ck",
            "c-0-c-k",
            "caca",
            "cahone",
            "cameltoe",
            "carpetmuncher",
            "cawk",
            "cervix",
            "chinc",
            "chincs",
            "chink",
            "chink",
            "chode",
            "chodes",
            "cl1t",
            "climax",
            "clit",
            "clitoris",
            "clitorus",
            "clits",
            "clitty",
            "cocain",
            "cocaine",
            "cock",
            "c-o-c-k",
            "cockblock",
            "cockholster",
            "cockknocker",
            "cocks",
            "cocksmoker",
            "cocksucker",
            "cock sucker",
            "coital",
            "commie",
            "condom",
            "coon",
            "coons",
            "corksucker",
            "crabs",
            "crack",
            "cracker",
            "crackwhore",
            "crap",
            "crappy",
            "cum",
            "cummin",
            "cumming",
            "cumshot",
            "cumshots",
            "cumslut",
            "cumstain",
            "cunilingus",
            "cunnilingus",
            "cunny",
            "cunt",
            "cunt",
            "c-u-n-t",
            "cuntface",
            "cunthunter",
            "cuntlick",
            "cuntlicker",
            "cunts",
            "d0ng",
            "d0uch3",
            "d0uche",
            "d1ck",
            "d1ld0",
            "d1ldo",
            "dago",
            "dagos",
            "dammit",
            "damn",
            "damned",
            "damnit",
            "dawgie-style",
            "dick",
            "dickbag",
            "dickdipper",
            "dickface",
            "dickflipper",
            "dickhead",
            "dickheads",
            "dickish",
            "dick-ish",
            "dickripper",
            "dicksipper",
            "dickweed",
            "dickwhipper",
            "dickzipper",
            "diddle",
            "dike",
            "dildo",
            "dildos",
            "diligaf",
            "dillweed",
            "dimwit",
            "dingle",
            "dipship",
            "doggie-style",
            "doggy-style",
            "dong",
            "doofus",
            "doosh",
            "dopey",
            "douch3",
            "douche",
            "douchebag",
            "douchebags",
            "douchey",
            "drunk",
            "dumass",
            "dumbass",
            "dumbasses",
            "dummy",
            "dyke",
            "dykes",
            "ejaculate",
            "enlargement",
            "erect",
            "erection",
            "erotic",
            "essohbee",
            "extacy",
            "extasy",
            "f.u.c.k",
            "fack",
            "fag",
            "fagg",
            "fagged",
            "faggit",
            "faggot",
            "fagot",
            "fags",
            "faig",
            "faigt",
            "fannybandit",
            "fart",
            "fartknocker",
            "fat",
            "felch",
            "felcher",
            "felching",
            "fellate",
            "fellatio",
            "feltch",
            "feltcher",
            "fisted",
            "fisting",
            "fisty",
            "floozy",
            "foad",
            "fondle",
            "foobar",
            "foreskin",
            "freex",
            "frigg",
            "frigga",
            "fubar",
            "fuck",
            "f-u-c-k",
            "fuckass",
            "fucked",
            "fucked",
            "fucker",
            "fuckface",
            "fuckin",
            "fucking",
            "fucknugget",
            "fucknut",
            "fuckoff",
            "fucks",
            "fucktard",
            "fuck-tard",
            "fuckup",
            "fuckwad",
            "fuckwit",
            "fudgepacker",
            "fuk",
            "fvck",
            "fxck",
            "gangbang",
            "gae",
            "gai",
            "ganja",
            "gay",
            "gays",
            "gey",
            "gfy",
            "ghay",
            "ghey",
            "gigolo",
            "glans",
            "goatse",
            "godamn",
            "godamnit",
            "goddam",
            "goddammit",
            "goddamn",
            "goldenshower",
            "gonad",
            "gonads",
            "gook",
            "gooks",
            "gringo",
            "gspot",
            "g-spot",
            "gtfo",
            "guido",
            "h0m0",
            "h0mo",
            "handjob",
            "hard on",
            "he11",
            "hebe",
            "heeb",
            "hell",
            "hemp",
            "heroin",
            "herp",
            "herpes",
            "herpy",
            "hitler",
            "hiv",
            "hobag",
            "hom0",
            "homey",
            "homo",
            "homoey",
            "honky",
            "hooch",
            "hookah",
            "hooker",
            "hoor",
            "hootch",
            "hooter",
            "hooters",
            "horny",
            "hump",
            "humped",
            "humping",
            "hussy",
            "hymen",
            "inbred",
            "incest",
            "injun",
            "j3rk0ff",
            "jackass",
            "jackhole",
            "jackoff",
            "jap",
            "japs",
            "jerk",
            "jerk0ff",
            "jerked",
            "jerkoff",
            "jism",
            "jiz",
            "jizm",
            "jizz",
            "jizzed",
            "junkie",
            "junky",
            "kike",
            "kikes",
            "kill",
            "kinky",
            "kkk",
            "klan",
            "knobend",
            "kooch",
            "kooches",
            "kootch",
            "kraut",
            "kyke",
            "labia",
            "lech",
            "leper",
            "lesbians",
            "lesbo",
            "lesbos",
            "lez",
            "lezbian",
            "lezbians",
            "lezbo",
            "lezbos",
            "lezzie",
            "lezzies",
            "lezzy",
            "lmao",
            "lmfao",
            "loin",
            "loins",
            "lube",
            "lusty",
            "mams",
            "massa",
            "masterbate",
            "masterbating",
            "masterbation",
            "masturbate",
            "masturbating",
            "masturbation",
            "maxi",
            "menses",
            "menstruate",
            "menstruation",
            "meth",
            "m-fucking",
            "mofo",
            "molest",
            "moolie",
            "moron",
            "motherfucka",
            "motherfucker",
            "motherfucking",
            "mtherfucker",
            "mthrfucker",
            "mthrfucking",
            "muff",
            "muffdiver",
            "murder",
            "muthafuckaz",
            "muthafucker",
            "mutherfucker",
            "mutherfucking",
            "muthrfucking",
            "nad",
            "nads",
            "naked",
            "napalm",
            "nappy",
            "nazi",
            "nazism",
            "negro",
            "nigga",
            "niggah",
            "niggas",
            "niggaz",
            "nigger",
            "nigger",
            "niggers",
            "niggle",
            "niglet",
            "nimrod",
            "ninny",
            "nipple",
            "nooky",
            "nympho",
            "opiate",
            "opium",
            "oral",
            "orally",
            "organ",
            "orgasm",
            "orgasmic",
            "orgies",
            "orgy",
            "ovary",
            "ovum",
            "ovums",
            "p.u.s.s.y.",
            "paddy",
            "paki",
            "pantie",
            "panties",
            "panty",
            "pastie",
            "pasty",
            "pcp",
            "pecker",
            "pedo",
            "pedophile",
            "pedophilia",
            "pedophiliac",
            "pee",
            "peepee",
            "penetrate",
            "penetration",
            "penial",
            "penile",
            "penis",
            "perversion",
            "peyote",
            "phalli",
            "phallic",
            "phuck",
            "pillowbiter",
            "pimp",
            "pinko",
            "piss",
            "pissed",
            "pissoff",
            "piss-off",
            "pms",
            "polack",
            "pollock",
            "poon",
            "poontang",
            "porn",
            "porno",
            "pornography",
            "pot",
            "potty",
            "prick",
            "prig",
            "prostitute",
            "prude",
            "pube",
            "pubic",
            "pubis",
            "punkass",
            "punky",
            "puss",
            "pussies",
            "pussy",
            "pussypounder",
            "puto",
            "queaf",
            "queef",
            "queef",
            "queer",
            "queero",
            "queers",
            "quicky",
            "quim",
            "racy",
            "rape",
            "raped",
            "raper",
            "rapist",
            "raunch",
            "rectal",
            "rectum",
            "rectus",
            "reefer",
            "reetard",
            "reich",
            "retard",
            "retarded",
            "revue",
            "rimjob",
            "ritard",
            "rtard",
            "r-tard",
            "rum",
            "rump",
            "rumprammer",
            "ruski",
            "s.h.i.t.",
            "s.o.b.",
            "s0b",
            "sadism",
            "sadist",
            "scag",
            "scantily",
            "schizo",
            "schlong",
            "screw",
            "screwed",
            "scrog",
            "scrot",
            "scrote",
            "scrotum",
            "scrud",
            "scum",
            "seaman",
            "seamen",
            "seduce",
            "semen",
            "sex",
            "sexual",
            "sh1t",
            "s-h-1-t",
            "shamedame",
            "shit",
            "s-h-i-t",
            "shite",
            "shiteater",
            "shitface",
            "shithead",
            "shithole",
            "shithouse",
            "shits",
            "shitt",
            "shitted",
            "shitter",
            "shitty",
            "shiz",
            "sissy",
            "skag",
            "skank",
            "slave",
            "sleaze",
            "sleazy",
            "slut",
            "slutdumper",
            "slutkiss",
            "sluts",
            "smegma",
            "smut",
            "smutty",
            "snatch",
            "sniper",
            "snuff",
            "s-o-b",
            "sodom",
            "souse",
            "soused",
            "sperm",
            "spic",
            "spick",
            "spik",
            "spiks",
            "spooge",
            "spunk",
            "steamy",
            "stfu",
            "stiffy",
            "stoned",
            "strip",
            "stroke",
            "stupid",
            "suck",
            "sucked",
            "sucking",
            "sumofabiatch",
            "t1t",
            "tampon",
            "tard",
            "tawdry",
            "teabagging",
            "teat",
            "terd",
            "teste",
            "testee",
            "testes",
            "testicle",
            "testis",
            "thrust",
            "thug",
            "tinkle",
            "tit",
            "titfuck",
            "titi",
            "tits",
            "tittiefucker",
            "titties",
            "titty",
            "tittyfuck",
            "tittyfucker",
            "toke",
            "toots",
            "tramp",
            "transsexual",
            "trashy",
            "tubgirl",
            "turd",
            "tush",
            "twat",
            "twats",
            "ugly",
            "undies",
            "unwed",
            "urinal",
            "urine",
            "uterus",
            "uzi",
            "vag",
            "vagina",
            "valium",
            "viagra",
            "virgin",
            "vixen",
            "vodka",
            "vomit",
            "voyeur",
            "vulgar",
            "vulva",
            "wad",
            "wang",
            "wank",
            "wanker",
            "wazoo",
            "wedgie",
            "weed",
            "weenie",
            "weewee",
            "weiner",
            "weirdo",
            "wench",
            "wetback",
            "wh0re",
            "wh0reface",
            "whitey",
            "whiz",
            "whoralicious",
            "whore",
            "whorealicious",
            "whored",
            "whoreface",
            "whorehopper",
            "whorehouse",
            "whores",
            "whoring",
            "wigger",
            "womb",
            "woody",
            "wop",
            "wtf",
            "x-rated",
            "xxx",
            "yeasty",
            "yobbo",
            "zoophile"
        ];
    }
    QueryStringToJSON() {
        var pairs = location.search.slice(1).split('&');
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return JSON.parse(JSON.stringify(result));
    }
    filterContent(string) {
        let filter = this.filter;
        let res;
        if (typeof string != "undefined") {
            res = string.split(/\s*\b\s*/);
        } else {
            return false;
        }
        let result = res.filter(item => {
            if (filter.indexOf(item.toLowerCase()) > -1) {
                return true;
            }
        });
        if (result.length >= 1) {
            return true;
        }
        return false;
    }
    addOnFunctions() {
        this.removeAnchorTags();
    }
    removeAnchorTags() {
        let anchors = document.querySelectorAll('a');
        anchors.forEach(content => {
            let newContent = content.innerHTML;
            content.replaceWith(newContent)
        })
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    abbrState(input, to) {
        //credit: Caleb Grove: https://gist.github.com/CalebGrove/c285a9510948b633aa47
        var a_states = [
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        if (to == 'abbr') {
            input = input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
            for (let i = 0; i < a_states.length; i++) {
                if (a_states[i][0] == input) {
                    localStorage.setItem("returnAbbr", a_states[i][1]);
                    return (a_states[i][1]);
                }
            }
        } else if (to == 'name') {
            input = input.toUpperCase();
            for (let i = 0; i < a_states.length; i++) {
                if (a_states[i][1] == input) {
                    return (a_states[i][0]);
                }
            }
        }
    }
    checkParameters() {
        $("#Stage_checkParameters").html('<br>location.href: ' + location.href + "<hr>");
        $("#Stage_checkParameters").append('<br>Parameters Received: ' + location.search + '<hr>');
        var otherResult = null;
        if (location.search == "") {
            $("#Stage_checkParameters").append('<br>EMPTY<hr>');
            otherResult = 'empty';
        } else if (location.search == "undefined") {
            $("#Stage_checkParameters").append('<br>UNDEFINED<hr>');
            otherResult = 'undefined';
        } else {
            var rez = typeof location.search;
            $("#Stage_checkParameters").append('<br>DEFINED OR SOMETHING ELSE TYPEOF:' + rez + "<hr>");
        }

    }
    getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        // console.log(decodeURIComponent(results[1].replace(/\+/g, " ")));
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    goMediaDynamicSceneRefresh() {
        gomediaDynamicInit();
    }
    loadScript(url, callback) {
        // LOAD SCRIPT OR ARRAY OF SCRIPTS
        //in: string or array
        //out: append script to head
        //out: callback function
        const self = this;

        function getScript(url) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            //////////////////////////////////////////////////////////////
            script.id = url;
            script.classList = "dynamicScript";
            // script.crossOrigin="anonymous";
            self.arrayOfDynamicScriptIds.push(url);
            //////////////////////////////////////////////////////////////////////
            script.onreadystatechange = callback;
            script.onload = callback;
            head.appendChild(script);
        }
        if (Object.prototype.toString.call(url) === '[object Array]') {
            for (var i = 0, max = url.length; i < max; i++) {
                getScript(url[i]);
            }
        } else {
            getScript(url);
        }
    }
    removeDynamicScripts() {
        this.arrayOfDynamicScriptIds = [];
        $('.dynamicScript').remove();
    }
    numberToMonth(date) {
        let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthArray[date];
    }
    ajax_datastring_URL_callback(dataString, URL, callback) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            };
        };
        xmlhttp.open("POST", URL, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(dataString);
    }
    sceneChecker(j, domEls){
          for(let key in domEls){
            if($(`#scene${j}`).find(domEls[key]["el"]).length<=0){
              return false;
            }
          }
          return true;

        }
}
