export interface AnimeEntry {
  slug: string;
  title: string;
  japaneseTitle?: string;
  synopsis: string;
  episodes: string;
  genres: string[];
  related: string[];
}

export const animeList: AnimeEntry[] = [
  {
    slug: "attack-on-titan",
    title: "Attack on Titan",
    japaneseTitle: "Shingeki no Kyojin",
    synopsis:
      "Humanity fights for survival against giant humanoid Titans that have pushed civilization to the brink of extinction. Eren Yeager and the Survey Corps uncover the truth behind the Titans and the walls that protect them.",
    episodes: "87 episodes across 4 seasons",
    genres: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    related: ["demon-slayer", "jujutsu-kaisen", "vinland-saga"],
  },
  {
    slug: "one-piece",
    title: "One Piece",
    japaneseTitle: "Wan Pīsu",
    synopsis:
      "Monkey D. Luffy and the Straw Hat Pirates sail the Grand Line in search of the legendary treasure One Piece. A sprawling adventure of friendship, freedom, and epic battles across the seas.",
    episodes: "1100+ episodes and counting",
    genres: ["Adventure", "Action", "Comedy"],
    related: ["naruto", "dragon-ball-super", "fairy-tail"],
  },
  {
    slug: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    japaneseTitle: "Kimetsu no Yaiba",
    synopsis:
      "Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister Nezuko who was turned into a demon. Stunning animation and intense sword combat define this modern classic.",
    episodes: "55+ episodes across multiple seasons",
    genres: ["Action", "Supernatural", "Historical"],
    related: ["attack-on-titan", "jujutsu-kaisen", "chainsaw-man"],
  },
  {
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    japaneseTitle: "Jujutsu Kaisen",
    synopsis:
      "Yuji Itadori joins Tokyo Jujutsu High to fight cursed spirits after swallowing a powerful cursed object. Dark sorcery, brutal fights, and complex characters define this modern shonen hit.",
    episodes: "47+ episodes across 2 seasons",
    genres: ["Action", "Supernatural", "Dark Fantasy"],
    related: ["chainsaw-man", "demon-slayer", "attack-on-titan"],
  },
  {
    slug: "chainsaw-man",
    title: "Chainsaw Man",
    japaneseTitle: "Chensō Man",
    synopsis:
      "Denji, a poverty-stricken devil hunter, merges with his chainsaw devil pet to become Chainsaw Man. A wild, bloody ride through a world of devils and devil hunters.",
    episodes: "12+ episodes (Season 1)",
    genres: ["Action", "Dark Fantasy", "Horror"],
    related: ["jujutsu-kaisen", "mob-psycho-100", "dorohedoro"],
  },
  {
    slug: "solo-leveling",
    title: "Solo Leveling",
    japaneseTitle: "Ore dake Level Up na Ken",
    synopsis:
      "Sung Jinwoo, the weakest hunter in a world of dungeon portals, gains a mysterious system that lets him level up without limit. From zero to the strongest shadow monarch.",
    episodes: "12+ episodes (Season 1)",
    genres: ["Action", "Fantasy", "Adventure"],
    related: ["the-beginning-after-the-end", "tower-of-god", "one-punch-man"],
  },
  {
    slug: "frieren-beyond-journeys-end",
    title: "Frieren: Beyond Journey's End",
    japaneseTitle: "Sōsō no Frieren",
    synopsis:
      "After the demon king is defeated, the elven mage Frieren realizes she barely knew her human companions. A poignant story about time, memory, and what it means to understand others.",
    episodes: "28 episodes (Season 1)",
    genres: ["Adventure", "Fantasy", "Drama"],
    related: ["mushoku-tensei", "violet-evergarden", "made-in-abyss"],
  },
  {
    slug: "dandadan",
    title: "Dan Da Dan",
    japaneseTitle: "Dandadan",
    synopsis:
      "A girl who believes in ghosts and a boy who believes in aliens team up when both turn out to be real. Hilarious, action-packed, and surprisingly heartfelt.",
    episodes: "12+ episodes (Season 1)",
    genres: ["Action", "Comedy", "Supernatural"],
    related: ["mob-psycho-100", "chainsaw-man", "undead-unluck"],
  },
  {
    slug: "my-hero-academia",
    title: "My Hero Academia",
    japaneseTitle: "Boku no Hero Academia",
    synopsis:
      "In a world where most people have superpowers called Quirks, Izuku Midoriya is born without one but dreams of becoming the greatest hero. His journey at U.A. High School begins.",
    episodes: "138+ episodes across multiple seasons",
    genres: ["Action", "Superhero", "School"],
    related: ["naruto", "black-clover", "one-punch-man"],
  },
  {
    slug: "naruto",
    title: "Naruto / Naruto Shippuden",
    japaneseTitle: "Naruto",
    synopsis:
      "Naruto Uzumaki, a young ninja shunned by his village, works tirelessly to become Hokage and earn everyone's respect. An epic saga of friendship, rivalry, and ninja warfare.",
    episodes: "720 episodes (Naruto + Shippuden)",
    genres: ["Action", "Adventure", "Martial Arts"],
    related: ["one-piece", "dragon-ball-super", "bleach"],
  },
  {
    slug: "spy-x-family",
    title: "Spy x Family",
    japaneseTitle: "Supai Famirī",
    synopsis:
      "A spy, an assassin, and a telepathic child form a fake family — each hiding their true identity. Heartwarming comedy meets espionage action.",
    episodes: "37+ episodes across 2 seasons",
    genres: ["Comedy", "Action", "Slice of Life"],
    related: ["kaguya-sama", "the-apothecary-diaries", "odd-taxi"],
  },
  {
    slug: "the-apothecary-diaries",
    title: "The Apothecary Diaries",
    japaneseTitle: "Kusuriya no Hitorigoto",
    synopsis:
      "Maomao, a pharmacist's daughter sold into servitude at the imperial court, uses her medical knowledge to solve mysteries and uncover palace intrigues.",
    episodes: "24+ episodes",
    genres: ["Mystery", "Historical", "Drama"],
    related: ["spy-x-family", "frieren-beyond-journeys-end", "violet-evergarden"],
  },
  {
    slug: "bleach",
    title: "Bleach / Bleach: Thousand-Year Blood War",
    japaneseTitle: "Burīchi",
    synopsis:
      "Ichigo Kurosaki gains Soul Reaper powers and protects the living world from evil spirits. The Thousand-Year Blood War arc brings the epic final battle.",
    episodes: "366+ episodes (original + TYBW)",
    genres: ["Action", "Supernatural", "Adventure"],
    related: ["naruto", "dragon-ball-super", "one-piece"],
  },
  {
    slug: "dragon-ball-super",
    title: "Dragon Ball Super",
    japaneseTitle: "Doragon Bōru Sūpā",
    synopsis:
      "Goku and friends face new universal threats, unlocking god-level power in tournaments that shake the multiverse. The legendary franchise continues.",
    episodes: "131 episodes + movies",
    genres: ["Action", "Martial Arts", "Comedy"],
    related: ["one-piece", "naruto", "my-hero-academia"],
  },
  {
    slug: "one-punch-man",
    title: "One Punch Man",
    japaneseTitle: "Wanpanman",
    synopsis:
      "Saitama can defeat any enemy with a single punch, but he's bored. A satirical take on superhero and shonen tropes with incredible animation.",
    episodes: "24+ episodes across 2 seasons",
    genres: ["Action", "Comedy", "Superhero"],
    related: ["mob-psycho-100", "my-hero-academia", "solo-leveling"],
  },
  {
    slug: "mob-psycho-100",
    title: "Mob Psycho 100",
    japaneseTitle: "Mobu Saiko Hyaku",
    synopsis:
      "Shigeo 'Mob' Kageyama is an incredibly powerful psychic who just wants to live a normal life. But his powers keep dragging him into supernatural battles.",
    episodes: "37 episodes across 3 seasons",
    genres: ["Action", "Comedy", "Supernatural"],
    related: ["one-punch-man", "dandadan", "saiki-k"],
  },
  {
    slug: "fullmetal-alchemist-brotherhood",
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "Hagane no Renkinjutsushi",
    synopsis:
      "Brothers Edward and Alphonse Elric use alchemy to search for the Philosopher's Stone after a failed attempt to resurrect their mother. A masterpiece of storytelling.",
    episodes: "64 episodes",
    genres: ["Action", "Adventure", "Drama"],
    related: ["hunter-x-hunter", "steins-gate", "code-geass"],
  },
  {
    slug: "hunter-x-hunter",
    title: "Hunter x Hunter",
    japaneseTitle: "Hantā Hantā",
    synopsis:
      "Gon Freecss becomes a Hunter to find his absent father, navigating a world of complex power systems, moral ambiguity, and unforgettable arcs.",
    episodes: "148 episodes (2011 version)",
    genres: ["Action", "Adventure", "Fantasy"],
    related: ["fullmetal-alchemist-brotherhood", "yu-yu-hakusho", "jujutsu-kaisen"],
  },
  {
    slug: "death-note",
    title: "Death Note",
    japaneseTitle: "Desu Nōto",
    synopsis:
      "A brilliant student finds a supernatural notebook that kills anyone whose name is written in it. A cat-and-mouse thriller between Light Yagami and detective L.",
    episodes: "37 episodes",
    genres: ["Thriller", "Supernatural", "Psychological"],
    related: ["code-geass", "steins-gate", "monster"],
  },
  {
    slug: "steins-gate",
    title: "Steins;Gate",
    japaneseTitle: "Shutainzu Gēto",
    synopsis:
      "Self-proclaimed mad scientist Okabe Rintaro discovers time travel via a modified microwave. What starts as fun experiments becomes a desperate fight to save those he loves.",
    episodes: "24 + 24 episodes (including Steins;Gate 0)",
    genres: ["Sci-Fi", "Thriller", "Drama"],
    related: ["death-note", "erased", "re-zero"],
  },
  {
    slug: "vinland-saga",
    title: "Vinland Saga",
    japaneseTitle: "Vinrando Saga",
    synopsis:
      "Young Viking Thorfinn seeks revenge against the man who killed his father, but the journey leads to a deeper quest for peace in a world of war.",
    episodes: "48 episodes across 2 seasons",
    genres: ["Action", "Historical", "Drama"],
    related: ["attack-on-titan", "berserk", "kingdom"],
  },
  {
    slug: "mushoku-tensei",
    title: "Mushoku Tensei: Jobless Reincarnation",
    japaneseTitle: "Mushoku Tensei",
    synopsis:
      "A man gets a second chance at life when he's reincarnated in a fantasy world. Determined not to waste it, Rudeus Greyrat grows into a powerful mage.",
    episodes: "34+ episodes across 2 seasons",
    genres: ["Fantasy", "Adventure", "Isekai"],
    related: ["re-zero", "frieren-beyond-journeys-end", "konosuba"],
  },
  {
    slug: "re-zero",
    title: "Re:Zero − Starting Life in Another World",
    japaneseTitle: "Re:Zero kara Hajimeru Isekai Seikatsu",
    synopsis:
      "Subaru Natsuki is transported to a fantasy world where he discovers he can return from death. Each loop brings new horrors and the chance to save those he cares about.",
    episodes: "50+ episodes across 2 seasons",
    genres: ["Fantasy", "Thriller", "Isekai"],
    related: ["mushoku-tensei", "steins-gate", "konosuba"],
  },
  {
    slug: "violet-evergarden",
    title: "Violet Evergarden",
    japaneseTitle: "Vaioretto Evāgāden",
    synopsis:
      "A former child soldier learns to write letters for others and discovers the meaning of love. Breathtaking visuals and deeply emotional storytelling.",
    episodes: "13 episodes + 2 movies",
    genres: ["Drama", "Fantasy", "Slice of Life"],
    related: ["frieren-beyond-journeys-end", "the-apothecary-diaries", "a-silent-voice"],
  },
  {
    slug: "made-in-abyss",
    title: "Made in Abyss",
    japaneseTitle: "Meido in Abisu",
    synopsis:
      "Riko descends into a massive, mysterious chasm with her robot companion Reg to find her mother. Beautiful yet brutal, the Abyss hides wonders and horrors in equal measure.",
    episodes: "25+ episodes across 2 seasons",
    genres: ["Adventure", "Fantasy", "Sci-Fi"],
    related: ["frieren-beyond-journeys-end", "hunter-x-hunter", "the-promised-neverland"],
  },
  {
    slug: "code-geass",
    title: "Code Geass: Lelouch of the Rebellion",
    japaneseTitle: "Kōdo Giasu",
    synopsis:
      "Exiled prince Lelouch gains the power of absolute obedience and leads a rebellion against the Holy Britannian Empire. Strategy, mecha, and a legendary ending.",
    episodes: "50 episodes across 2 seasons",
    genres: ["Mecha", "Thriller", "Action"],
    related: ["death-note", "steins-gate", "neon-genesis-evangelion"],
  },
  {
    slug: "neon-genesis-evangelion",
    title: "Neon Genesis Evangelion",
    japaneseTitle: "Shin Seiki Evangerion",
    synopsis:
      "Teenagers pilot giant bio-mechs to fight mysterious Angels threatening humanity. Beneath the mecha action lies a profound exploration of depression, identity, and human connection.",
    episodes: "26 episodes + movies",
    genres: ["Mecha", "Psychological", "Sci-Fi"],
    related: ["code-geass", "serial-experiments-lain", "steins-gate"],
  },
  {
    slug: "cowboy-bebop",
    title: "Cowboy Bebop",
    japaneseTitle: "Kaubōi Bibappu",
    synopsis:
      "Bounty hunters Spike, Jet, Faye, and Ed roam the solar system in their ship Bebop. Jazz, noir, and unforgettable style make this a timeless classic.",
    episodes: "26 episodes + movie",
    genres: ["Action", "Sci-Fi", "Neo-Noir"],
    related: ["samurai-champloo", "trigun", "space-dandy"],
  },
  {
    slug: "tokyo-revengers",
    title: "Tokyo Revengers",
    japaneseTitle: "Tōkyō Ribenjāzu",
    synopsis:
      "Takemichi Hanagaki can leap back in time to his middle school days. He uses this power to save his ex-girlfriend by changing the fate of a dangerous gang.",
    episodes: "37+ episodes across 2 seasons",
    genres: ["Action", "Thriller", "Time Travel"],
    related: ["erased", "steins-gate", "tokyo-ghoul"],
  },
  {
    slug: "black-clover",
    title: "Black Clover",
    japaneseTitle: "Burakku Kurōbā",
    synopsis:
      "In a world of magic, Asta is born without any. But his anti-magic abilities and relentless determination drive him to become the Wizard King.",
    episodes: "170 episodes + movie",
    genres: ["Action", "Fantasy", "Shonen"],
    related: ["my-hero-academia", "naruto", "fairy-tail"],
  },
  {
    slug: "tower-of-god",
    title: "Tower of God",
    japaneseTitle: "Kami no Tō",
    synopsis:
      "Bam enters the mysterious Tower to find his best friend Rachel. Each floor presents deadly tests, alliances, and betrayals as climbers compete for ultimate power.",
    episodes: "13+ episodes",
    genres: ["Action", "Fantasy", "Mystery"],
    related: ["solo-leveling", "hunter-x-hunter", "made-in-abyss"],
  },
  {
    slug: "kaguya-sama",
    title: "Kaguya-sama: Love Is War",
    japaneseTitle: "Kaguya-sama wa Kokurasetai",
    synopsis:
      "Two brilliant student council members are in love but too proud to confess. Every day becomes a psychological battle to make the other one crack first.",
    episodes: "37 episodes across 3 seasons",
    genres: ["Comedy", "Romance", "School"],
    related: ["spy-x-family", "quintessential-quintuplets", "horimiya"],
  },
  {
    slug: "bocchi-the-rock",
    title: "Bocchi the Rock!",
    japaneseTitle: "Bocchi Za Rokku!",
    synopsis:
      "Hitori 'Bocchi' Gotoh is an extremely shy guitar prodigy who dreams of being in a band. When she finally joins one, hilarity and heartfelt moments ensue.",
    episodes: "12 episodes",
    genres: ["Comedy", "Music", "Slice of Life"],
    related: ["kaguya-sama", "k-on", "keep-your-hands-off-eizouken"],
  },
  {
    slug: "oshi-no-ko",
    title: "Oshi no Ko",
    japaneseTitle: "Oshi no Ko",
    synopsis:
      "A doctor reincarnates as the son of his favorite idol and uncovers the dark side of the entertainment industry while seeking the truth behind his mother's death.",
    episodes: "23+ episodes across 2 seasons",
    genres: ["Drama", "Supernatural", "Mystery"],
    related: ["spy-x-family", "the-apothecary-diaries", "kaguya-sama"],
  },
  {
    slug: "sword-art-online",
    title: "Sword Art Online",
    japaneseTitle: "Sōdo Āto Onrain",
    synopsis:
      "Players are trapped in a virtual reality MMORPG where dying in-game means dying in real life. Kirito fights to clear the game and free everyone.",
    episodes: "96+ episodes across multiple seasons",
    genres: ["Action", "Sci-Fi", "Isekai"],
    related: ["re-zero", "mushoku-tensei", "tower-of-god"],
  },
  {
    slug: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    japaneseTitle: "Tōkyō Gūru",
    synopsis:
      "Ken Kaneki becomes a half-ghoul after a near-fatal encounter and must navigate life between the human and ghoul worlds in a dark, violent Tokyo.",
    episodes: "48 episodes across 4 seasons",
    genres: ["Action", "Horror", "Psychological"],
    related: ["parasyte", "attack-on-titan", "death-note"],
  },
  {
    slug: "konosuba",
    title: "KonoSuba: God's Blessing on This Wonderful World!",
    japaneseTitle: "Kono Subarashii Sekai ni Shukufuku wo!",
    synopsis:
      "After dying, Kazuma is reincarnated in a fantasy world with a useless goddess. Together with their dysfunctional party, they stumble through quests in hilarious fashion.",
    episodes: "20+ episodes across 3 seasons",
    genres: ["Comedy", "Fantasy", "Isekai"],
    related: ["mushoku-tensei", "re-zero", "overlord"],
  },
  {
    slug: "haikyuu",
    title: "Haikyuu!!",
    japaneseTitle: "Haikyū!!",
    synopsis:
      "Short but determined Shoyo Hinata joins Karasuno High's volleyball team and partners with genius setter Tobio Kageyama. An electrifying sports anime about teamwork and growth.",
    episodes: "85 episodes across 4 seasons + movies",
    genres: ["Sports", "Drama", "Comedy"],
    related: ["kuroko-no-basket", "blue-lock", "slam-dunk"],
  },
  {
    slug: "blue-lock",
    title: "Blue Lock",
    japaneseTitle: "Burū Rokku",
    synopsis:
      "300 young strikers are locked in a ruthless facility to produce Japan's ultimate goal-scorer. Ego, rivalry, and raw talent collide in this intense soccer anime.",
    episodes: "24+ episodes",
    genres: ["Sports", "Drama", "Psychological"],
    related: ["haikyuu", "kuroko-no-basket", "megalo-box"],
  },
  {
    slug: "undead-unluck",
    title: "Undead Unluck",
    japaneseTitle: "Andeddo Anrakku",
    synopsis:
      "A girl cursed with catastrophic unluck teams up with an undying man. Together they battle against the rules of their universe in a wild, creative action series.",
    episodes: "24 episodes",
    genres: ["Action", "Supernatural", "Comedy"],
    related: ["dandadan", "chainsaw-man", "jujutsu-kaisen"],
  },
  {
    slug: "that-time-i-got-reincarnated-as-a-slime",
    title: "That Time I Got Reincarnated as a Slime",
    japaneseTitle: "Tensei Shitara Slime Datta Ken",
    synopsis:
      "A businessman reincarnates as a slime in a fantasy world and builds a nation of monsters. Surprisingly wholesome world-building meets overpowered protagonist fun.",
    episodes: "48+ episodes across 2 seasons",
    genres: ["Fantasy", "Adventure", "Isekai"],
    related: ["mushoku-tensei", "overlord", "konosuba"],
  },
  {
    slug: "dr-stone",
    title: "Dr. Stone",
    japaneseTitle: "Dokutā Sutōn",
    synopsis:
      "After all of humanity is petrified for thousands of years, genius scientist Senku revives and sets out to rebuild civilization from scratch using science.",
    episodes: "47+ episodes across 3 seasons",
    genres: ["Adventure", "Sci-Fi", "Comedy"],
    related: ["fullmetal-alchemist-brotherhood", "my-hero-academia", "fire-force"],
  },
  {
    slug: "dororo",
    title: "Dororo",
    japaneseTitle: "Dororo",
    synopsis:
      "A ronin born without limbs, skin, or organs fights demons to reclaim his stolen body parts. A dark, atmospheric retelling of Osamu Tezuka's classic.",
    episodes: "24 episodes",
    genres: ["Action", "Historical", "Supernatural"],
    related: ["vinland-saga", "berserk", "demon-slayer"],
  },
  {
    slug: "dorohedoro",
    title: "Dorohedoro",
    japaneseTitle: "Dorohedoro",
    synopsis:
      "In a grimy world divided between sorcerers and their victims, a reptile-headed man searches for the sorcerer who cursed him. Violent, weird, and utterly unique.",
    episodes: "12 episodes",
    genres: ["Action", "Dark Fantasy", "Comedy"],
    related: ["chainsaw-man", "mob-psycho-100", "jujutsu-kaisen"],
  },
  {
    slug: "fire-force",
    title: "Fire Force",
    japaneseTitle: "Enen no Shōbōtai",
    synopsis:
      "Shinra Kusakabe joins Special Fire Force Company 8 to fight Infernals — people who spontaneously combust — and uncover the truth behind the phenomenon.",
    episodes: "48 episodes across 2 seasons",
    genres: ["Action", "Supernatural", "Shonen"],
    related: ["my-hero-academia", "dr-stone", "soul-eater"],
  },
  {
    slug: "overlord",
    title: "Overlord",
    japaneseTitle: "Ōbārōdo",
    synopsis:
      "When his favorite MMORPG shuts down, Momonga stays logged in and becomes his max-level undead character in a real new world. A dark isekai of world domination.",
    episodes: "52 episodes across 4 seasons",
    genres: ["Action", "Fantasy", "Isekai"],
    related: ["that-time-i-got-reincarnated-as-a-slime", "konosuba", "re-zero"],
  },
  {
    slug: "berserk",
    title: "Berserk",
    japaneseTitle: "Beruseruku",
    synopsis:
      "The Black Swordsman Guts wields an enormous sword and battles demons in a dark medieval world. A tale of ambition, betrayal, and relentless survival.",
    episodes: "25 episodes (1997) + 24 (2016-17)",
    genres: ["Action", "Dark Fantasy", "Horror"],
    related: ["vinland-saga", "dororo", "claymore"],
  },
  {
    slug: "parasyte",
    title: "Parasyte: The Maxim",
    japaneseTitle: "Kiseijū: Sei no Kakuritsu",
    synopsis:
      "Alien parasites invade Earth and take over human brains. High schooler Shinichi's right hand is taken over by one, and the two must coexist to survive.",
    episodes: "24 episodes",
    genres: ["Action", "Horror", "Sci-Fi"],
    related: ["tokyo-ghoul", "death-note", "attack-on-titan"],
  },
  {
    slug: "erased",
    title: "Erased (Boku dake ga Inai Machi)",
    japaneseTitle: "Boku dake ga Inai Machi",
    synopsis:
      "A man with the ability to travel back in time must prevent a kidnapping and murder from his childhood. A gripping mystery-thriller with emotional depth.",
    episodes: "12 episodes",
    genres: ["Mystery", "Thriller", "Drama"],
    related: ["steins-gate", "death-note", "tokyo-revengers"],
  },
];
