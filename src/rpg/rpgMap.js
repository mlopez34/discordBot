module.exports = {
    rpgZones: {
        prarie: {
            zoneAvatar: "https://i.imgur.com/wEmcFoo.png",
            zoneString : "The prarie was only the beginning, the dark woods, and mysterious underground tunnels contain uncharted life",
            startingArea: "meadows",
            name: "Prarie",
            intendedLevelString: "1-15",
            zoneDifficulty: 1,
            enemyStatBuffs: {
                hpPlusPercentage: 0.9,
                adPlusPercentage: 0.8,
                mdPlusPercentage: 0.8,
                armorPlusPercentage: 0.8,
                spiritPlusPercentage: 0.8,
                frenzyAdIncreasePercentage: 0.8,
                echoIncreasePercentage: 0.8
            },
            enemies: {
                easy: [
                    "rabbidwolf", "rabbidwolf", "rabbidwolf", "rabbidwolf",
                    "hungryboar", "hungryboar", "hungryboar", "hungryboar", 
                    "hyena", 
                ],
                medium: [
                    "tacobandit", "tacobandit", "tacobandit", "tacobandit",
                    "bear", "bear", "bear", "bear", 
                    "fruitscounter"
                ],
                hard: [
                    "sniper",
                    "footballplayer"
                ],
                boss: [
                    "desperado", "desperado", "desperado", "desperado",
                    "sicario"
                ]
            },
            areas: {
                // 3
                acheronriver: {
                    areaString : "Hots are healing over time effects that take effect at the start of every turn after damage over time effects",
                    name: "Acheron River",
                    enemiesToDefeat: 30,
                    onCompleteAreasUnlocked: [
                        "charlesbridge",
                        "tauronplains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                // 3
                anorariver: {
                    areaString : "Enemies will always cast before a player does",
                    name: "Anora River",
                    enemiesToDefeat: 34,
                    onCompleteAreasUnlocked: [
                        "greenchestnut",
                        "tauronplains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 3
                aokigahara: {
                    areaString : "Items with haste allow you to cast before the enemy does",
                    name: "Aokigahara Forest",
                    enemiesToDefeat: 37,
                    onCompleteAreasUnlocked: [
                        "nishinomaru",
                        "greenchestnut"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 3
                bagan: {
                    areaString : "Hard level enemies will grow stronger over time",
                    name: "Bagan",
                    enemiesToDefeat: 29,
                    onCompleteAreasUnlocked: [
                        "carerralake",
                        "greenchestnut"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 2
                bluegrotto: {
                    areaString : "Dots are damage over time effects that take effect at the start of every turn",
                    name: "Blue Grotto",
                    enemiesToDefeat: 21,
                    onCompleteAreasUnlocked: [
                        "acheronriver",
                        "bagan"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                carerralake: {
                    areaString : "This area seems to be rich in marine life",
                    name: "Carerra Lake",
                    enemiesToDefeat: 44,
                    onCompleteAreasUnlocked: [
                        "nishinomaru"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                charlesbridge: {
                    areaString : "Boss level enemies will focus on the person with the highest HP in your group",
                    name: "Charles Bridge",
                    enemiesToDefeat: 28,
                    onCompleteAreasUnlocked: [
                        "nishinomaru"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                tauronplains: {
                    areaString : "Armor and Spirit gains are very effective early on but their effects diminish as you gain more of them",
                    name: "Tauron Plains",
                    enemiesToDefeat: 27,
                    onCompleteAreasUnlocked: [
                        "nishinomaru"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                greenchestnut: {
                    areaString : "items can be combined to create an improved version of the item using the -combine command",
                    name: "Green Chestnut",
                    enemiesToDefeat: 32,
                    onCompleteAreasUnlocked: [
                        "igualdafalls"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                igualdafalls: {
                    areaString : "Dead end",
                    name: "Igualda Falls",
                    enemiesToDefeat: 49,
                    enemies: [
                        {
                            enemyId: "rabbidwolf",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "hyena",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "tacobandit",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "bear",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 3
                molonoth: {
                    areaString : "Bandaid ability effects removes statuses",
                    name: "Molonoth Fields",
                    enemiesToDefeat: 31,
                    onCompleteAreasUnlocked: [
                        "carerralake",
                        "tauronplains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                nishinomaru: {
                    areaString : "Ancient items have much higher stats than rare items",
                    name: "Nishinomaru Garden",
                    enemiesToDefeat: 32,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                tallgrass: {
                    areaString : "Limit shield and sword display when you have limit offensive or defensive abilities (10 turn cooldown) ",
                    name: "Tallgrass",
                    enemiesToDefeat: 24,
                    onCompleteAreasUnlocked: [
                        "molonoth",
                        "anorariver",
                        "aokigahara"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                // 1
                meadows: {
                    areaString : "Seek help while you still can",
                    name: "Meadows",
                    enemiesToDefeat: 8,
                    onCompleteAreasUnlocked: [
                        "tallgrass",
                        "bluegrotto"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                }
            },
            onCompleteZonesUnlocked: [
                "woods",
                "undergroundtunnels"
            ]
        },
        woods: {
            // Archenland, Beartooth River, Black Forest, Bryce Canyon, Dark Hedges, Darkwater Cove, Denali Park, 
            // Forest of Stone, Inca Trail, Lake Vostok, Meero Ruins
            zoneAvatar: "https://i.imgur.com/iLoWi9d.png",
            zoneString : "Enemies are drawn to blood ....",
            startingArea: "archenland",
            intendedLevelString: "15-25",
            name: "Woods",
            zoneDifficulty: 1.5,
            enemyStatBuffs: {
                hpPlusPercentage: 1.3,
                adPlusPercentage: 1.4,
                mdPlusPercentage: 1.4,
                armorPlusPercentage: 1.2,
                spiritPlusPercentage: 1.2,
                frenzyAdIncreasePercentage: 1.2,
                echoIncreasePercentage: 1.2
            },
            enemies: {
                easy: [
                    "hyena", "hyena","hyena","hyena",
                    "bull", "bull", "bull", "bull",
                    "tacosmuggler"
                ],
                medium: [
                    "tacothief", "tacothief", "tacothief", "tacothief",
                    "troglodyte", "troglodyte", "troglodyte",
                    "nigerianprince"
                ],
                hard: [
                    "warewolf", "warewolf", "warewolf", "warewolf",
                    "sniper"
                ],
                boss: [
                    "escapedrobot", "escapedrobot", "escapedrobot", "escapedrobot",
                    "viking"
                ]
            },
            areas: {
                archenland: {
                    areaString : "Critical strike chance base percent is 3%",
                    name: "Archenland",
                    enemiesToDefeat: 29,
                    onCompleteAreasUnlocked: [
                        "beartoothriver",
                        "meeroruins"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                // 2
                beartoothriver: {
                    areaString : "Critical strikes deal 50% more damage",
                    name: "Beartooth River",
                    enemiesToDefeat: 31,
                    onCompleteAreasUnlocked: [
                        "brycecanyon",
                        "incatrail"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                blackforest: {
                    areaString : "Some enemies have on death effects",
                    name: "Black Forest",
                    enemiesToDefeat: 21,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 3
                brycecanyon: {
                    areaString : "Empower gives exhaust and you cannot gain empower while you have exhaust",
                    name: "Bryce Canyon",
                    enemiesToDefeat: 39,
                    onCompleteAreasUnlocked: [
                        "lakevostok",
                        "darkwatercove"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                darkhedges: {
                    areaString : "Some enemies have abilities that only happen at the end of each turn",
                    name: "Dark Hedges",
                    enemiesToDefeat: 49,
                    onCompleteAreasUnlocked: [
                        "blackforest",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                darkwatercove: {
                    areaString : "Artifact items are the rarest items you can find",
                    name: "Darkwater Cove",
                    enemiesToDefeat: 42,
                    onCompleteAreasUnlocked: [
                        "blackforest"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 5
                denalipark: {
                    areaString : "Artifact items can only be worn on slot 4",
                    name: "Denali Park",
                    enemiesToDefeat: 41,
                    onCompleteAreasUnlocked: [
                        "blackforest",
                        "darkwatercove"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 5
                forestofstone: {
                    areaString : "Challenges are available and tuned for level 20 or higher",
                    name: "Forest of Stone",
                    enemiesToDefeat: 53,
                    onCompleteAreasUnlocked: [
                        "denalipark",
                        "blackforest"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 3
                incatrail: {
                    areaString : "Artifact items can be combined but only if you have the full set of items required",
                    name: "Inca Trail",
                    enemiesToDefeat: 27,
                    onCompleteAreasUnlocked: [
                        "denalipark",
                        "forestofstone"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 4
                lakevostok: {
                    areaString : "The black forest does not take kindly to strangers",
                    name: "Lake Vostok",
                    enemiesToDefeat: 31,
                    onCompleteAreasUnlocked: [
                        "blackforest"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                // 2
                meeroruins: {
                    areaString : "Ruins usually have something hidden within them",
                    name: "Meero Ruins",
                    enemiesToDefeat: 49,
                    onCompleteAreasUnlocked: [
                        "darkhedges",
                        "brycecanyon"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                }
            },
            onCompleteZonesUnlocked: [
                "grandcanyon",
                "crystalpeak",
                "matamoros"
            ]
        },
        undergroundtunnels: {
            zoneAvatar: "https://i.imgur.com/BRxnfgf.png",
            zoneString : "The underground tunnels have led you into an uncovered secret",
            startingArea: "klencory",
            zoneDifficulty: 1.5,
            name: "Underground Tunnels",
            intendedLevelString: "15-25",
            enemyStatBuffs: {
                hpPlusPercentage: 1.3,
                adPlusPercentage: 1.4,
                mdPlusPercentage: 1.4,
                armorPlusPercentage: 1.2,
                spiritPlusPercentage: 1.2,
                frenzyAdIncreasePercentage: 1.2,
                echoIncreasePercentage: 1.2
            },
            enemies: {
                easy: [
                    "rabbidwolf", "rabbidwolf","rabbidwolf", "rabbidwolf",
                    "hungryboar", "hungryboar", "hungryboar", "hungryboar",
                    "bull", "bull",
                    "cheetah",
                    "coyote", "coyote", "coyote", "coyote"
                ],
                medium: [
                    "tacobandit", "tacobandit", "tacobandit", "tacobandit",
                    "bear", "bear", "bear", "bear", "bear", "bear", "bear",
                    "troglodyte", "troglodyte", "troglodyte", 
                    "disassembler"
                ],
                hard: [
                    "sniper", "sniper", "sniper", "sniper",
                    "warewolf", "warewolf", "warewolf", "warewolf", "warewolf", "warewolf",
                    "silverback"
                ],
                boss: [
                    "desperado", "desperado", "desperado", "desperado", "desperado",
                    "vampire",
                ]
            },
            areas: {
                angkorwat: {
                    areaString : "Some items only drop from certain enemies",
                    name: "Angkor Wat",
                    enemiesToDefeat: 31,
                    onCompleteAreasUnlocked: [
                        "glowwormcave"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                bigsur: {
                    areaString : "Some items are only sold in certain areas",
                    name: "Big Sur",
                    enemiesToDefeat: 34,
                    onCompleteAreasUnlocked: [
                        "angkorwat"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                bramstomb: {
                    areaString : "Some items can only be found in certain areas",
                    name: "Bram's tomb",
                    enemiesToDefeat: 39,
                    onCompleteAreasUnlocked: [
                        "angkorwat"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                greyheath: {
                    areaString : " ",
                    name: "Grey Heath",
                    enemiesToDefeat: 49,
                    onCompleteAreasUnlocked: [
                        "angkorwat"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                klencory: {
                    areaString : " ",
                    name: "Klencory",
                    enemiesToDefeat: 22,
                    onCompleteAreasUnlocked: [
                        "ladakh",
                        "meenakshitemple"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                ladakh: {
                    areaString : " ",
                    name: "Ladakh",
                    enemiesToDefeat: 27,
                    onCompleteAreasUnlocked: [
                        "greyheath",
                        "bramstomb",
                        "bigsur"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                meenakshitemple: {
                    areaString : " ",
                    name: "Meenakshi Temple",
                    enemiesToDefeat: 28,
                    onCompleteAreasUnlocked: [
                        "morrowcaverns",
                        "tikal",
                        "bramstomb"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                morrowcaverns: {
                    areaString : " ",
                    name: "Morrow Caverns",
                    enemiesToDefeat: 44,
                    onCompleteAreasUnlocked: [
                        "minasmorgul",
                        "dunwall",
                        "angkorwat"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                glowwormcave: {
                    areaString : "Unusual and colorful worms swarm the walls",
                    name: "Glowworm Cave",
                    enemiesToDefeat: 32,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                tikal: {
                    areaString : " ",
                    name: "Tikal",
                    enemiesToDefeat: 37,
                    onCompleteAreasUnlocked: [
                        "minasmorgul",
                        "dunwall"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                minasmorgul: {
                    areaString : " ",
                    name: "Minas Morgul",
                    enemiesToDefeat: 36,
                    onCompleteAreasUnlocked: [
                        "glowwormcave"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                },
                dunwall: {
                    areaString : " ",
                    name: "Dunwall",
                    enemiesToDefeat: 34,
                    onCompleteAreasUnlocked: [
                        "glowwormcave"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                    
                }
            },
            onCompleteZonesUnlocked: [
                "grandcanyon",
                "crystalpeak",
                "tadrartacacus"
            ]
        },
        grandcanyon: {
            // Sanyou Cave
            zoneAvatar: "https://i.imgur.com/Z0PpQjf.png",
            zoneString : "You've reached the peak of the Grand Canyon, what are you gonna do next?",
            startingArea: "sanyoucave",
            name: "Grand Canyon",
            intendedLevelString: "25-30",
            zoneDifficulty: 2,
            enemyStatBuffs: {
                hpPlusPercentage: 1.7,
                adPlusPercentage: 2,
                mdPlusPercentage: 2,
                armorPlusPercentage: 1.4,
                spiritPlusPercentage: 1.4,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.5
            },
            enemies: {
                easy: [
                    "rabbidwolf", "rabbidwolf", "rabbidwolf", "rabbidwolf", "rabbidwolf",
                    "hungryboar", "hungryboar", "hungryboar", "hungryboar",
                    "hyena", "hyena", "hyena", "hyena", 
                    "angrydwarf"
                ],
                medium: [
                    "tacobandit", "tacobandit", "tacobandit", "tacobandit",
                    "bear", "bear", "bear", "bear",
                    "fruitscounter", "fruitscounter",
                    "dullard"
                ],
                hard: [
                    "sniper", "sniper", "sniper", "sniper", "sniper",
                    "warewolf", "warewolf", "warewolf", "warewolf", 
                    "gascollector", "gascollector"
                ],
                boss: [
                    "desperado", "desperado", "desperado", "desperado", 
                    "escapedrobot", "escapedrobot",
                    "vampire"
                ]
            },
            areas: {
                // 
                sanyoucave: {
                    areaString : " ",
                    name: "Sanyou Cave",
                    enemiesToDefeat: 28,
                    onCompleteAreasUnlocked: [
                        "zonitemple",
                        "eddariver"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                antelopecanyon: {
                    areaString : " ",
                    name: "Antelope Canyon",
                    enemiesToDefeat: 78,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                arngormountains: {
                    areaString : " ",
                    name: "Arngor Mountain",
                    enemiesToDefeat: 91,
                    onCompleteAreasUnlocked: [
                        "ayersrock"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                ayersrock: {
                    areaString : " ",
                    name: "Ayers Rock",
                    enemiesToDefeat: 105,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                // 
                eddariver: {
                    areaString : " ",
                    name: "Edda River",
                    enemiesToDefeat: 132,
                    onCompleteAreasUnlocked: [
                        "arngormountains",
                        "gizaplateau"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                gimlickvalley: {
                    areaString : " ",
                    name: "Gimlick Valley",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                gizaplateau: {
                    areaString : " ",
                    name: "Giza Plateau",
                    enemiesToDefeat: 109,
                    onCompleteAreasUnlocked: [
                        "gimlickvalley"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                martokvalley: {
                    areaString : " ",
                    name: "Martok Valley",
                    enemiesToDefeat: 71,
                    onCompleteAreasUnlocked: [
                        "whitedesert"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                palawan: {
                    areaString : " ",
                    name: "Palawan",
                    enemiesToDefeat: 102,
                    onCompleteAreasUnlocked: [
                        "whitedesert"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                reach: {
                    areaString : " ",
                    name: "Reach",
                    enemiesToDefeat: 149,
                    onCompleteAreasUnlocked: [
                        "antelopecanyon"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                whitedesert: {
                    areaString : " ",
                    name: "White Desert",
                    enemiesToDefeat: 177,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                // 
                zonitemple: {
                    areaString : " ",
                    name: "Zoni Temple",
                    enemiesToDefeat: 65,
                    onCompleteAreasUnlocked: [
                        "martokvalley",
                        "palawan",
                        "reach"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                }
            },
            onCompleteZonesUnlocked: [
                "patagonia"
            ]
        },
        crystalpeak: {
            // Krell Canyon
            zoneAvatar: "https://i.imgur.com/SfTplrL.png",
            zoneString : "Buried deep inside the underground bunker in Crystal Peak is a small boat with specific directions",
            startingArea: "krellcanyon",
            name: "Crystal Peak",
            intendedLevelString: "25-27",
            zoneDifficulty: 2,
            enemyStatBuffs: {
                hpPlusPercentage: 1.7,
                adPlusPercentage: 2,
                mdPlusPercentage: 2,
                armorPlusPercentage: 1.4,
                spiritPlusPercentage: 1.4,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.5
            },
            enemies: {
                easy: [
                    "rabbidwolf", "rabbidwolf", 
                    "extremist", "extremist", "extremist", 
                    "thug", "thug", "thug", "thug", "thug", "thug", 
                    "hyena", "hyena", "hyena"
                ],
                medium: [
                    "tacobandit", "tacobandit", "tacobandit", "tacobandit",
                    "bear", "bear", "bear", "bear", 
                    "dolt", 
                ],
                hard: [
                    "sniper","sniper","sniper",
                    "warewolf",
                    "funnypolitician"
                ],
                boss: [
                    "desperado", "desperado", 
                    "escapedrobot"
                ]
            },
            areas: {
                krellcanyon: {
                    areaString : " ",
                    name: "Krell Canyon",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "angelfalls",
                        "euclidriver",
                        "bwindipark"

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                angelfalls: {
                    areaString : " ",
                    name: "Angel Falls",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "mendenhallice",
                        "arlingtoncemetery"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                arlingtoncemetery: {
                    areaString : " ",
                    name: "Arlington Cemetery",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                bagend: {
                    areaString : " ",
                    name: "Bag End",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "cinqueterre",
                        "cufflesbreath"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                bayofkotor: {
                    areaString : " ",
                    name: "Bay of Kotor",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "capricacity",
                        "chichenitza"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                bwindipark: {
                    areaString : " ",
                    name: "Bwindi Park",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "bagend",
                        "bayofkotor",
                        "torresdelpaine",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                capricacity: {
                    areaString : " ",
                    name: "Caprica City",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                chichenitza: {
                    areaString : " ",
                    name: "Chichen Itza",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                cinqueterre: {
                    areaString : " ",
                    name: "Cinque Terre",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                cufflesbreath: {
                    areaString : " ",
                    name: "Cuffle's Breath",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                euclidriver: {
                    areaString : " ",
                    name: "Euclid River",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "himachalpradash",
                        "mendenhallice"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                himachalpradash: {
                    areaString : " ",
                    name: "Himachal Pradash",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [
                        "penroseharbor",
                        "torresdelpaine"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                mendenhallice: {
                    areaString : " ",
                    name: "Mendenhall Ice Caves",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                penroseharbor: {
                    areaString : " ",
                    name: "Penrose Harbor",
                    enemiesToDefeat: 48,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                torresdelpaine: {
                    areaString : " ",
                    name: "Torres del Paine",
                    enemiesToDefeat: 48,
                    enemies: [
                        {
                            enemyId: "racketeer",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                }
            },
            onCompleteZonesUnlocked: [
                "costademarfil"
            ]
        },
        matamoros: {
            // La Jolla Cove
            zoneAvatar: "https://i.imgur.com/cxffazN.png",
            zoneString : "Una ruta directa por el mar",
            startingArea: "lajoyacove",
            name: "Matamoros",
            intendedLevelString: "25-32",
            zoneDifficulty: 2,
            enemyStatBuffs: {
                hpPlusPercentage: 1.7,
                adPlusPercentage: 2,
                mdPlusPercentage: 2,
                armorPlusPercentage: 1.4,
                spiritPlusPercentage: 1.4,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.5
            },
            enemies: {
                easy: [
                    "hungryboar", "hungryboar", "hungryboar", "hungryboar", 
                    "angrydwarf", "angrydwarf", "angrydwarf", "angrydwarf",
                    "tacosmuggler"
                ],
                medium: [
                    "tacobandit", "tacobandit", "tacobandit",
                    "bear", "bear", "bear", "bear", "bear", 
                    "ignoramus"
                ],
                hard: [
                    "sniper",
                    "warewolf"
                ],
                boss: [
                    "viking"
                ]
            },
            areas: {
                //
                lajoyacove: {
                    areaString : " ",
                    name: "La Jolla Cove",
                    enemiesToDefeat: 41,
                    onCompleteAreasUnlocked: [
                        "caminodesantiago",
                        "arcdetriomphe"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    
                },
                //
                arcdetriomphe: {
                    areaString : " ",
                    name: "Arc de Triomphe",
                    enemiesToDefeat: 92,
                    onCompleteAreasUnlocked: [
                        "jartar"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                caminodesantiago: {
                    areaString : " ",
                    name: "Camino de Santiago",
                    enemiesToDefeat: 94,
                    enemies: [
                        {
                            enemyId: "ignoramus",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "disassembler",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "samuraiwarrior",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "karnimatatemple"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                jartar: {
                    areaString : " ",
                    name: "Jartar",
                    enemiesToDefeat: 110,
                    onCompleteAreasUnlocked: [
                        "klandragon"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                karnimatatemple: {
                    areaString : " ",
                    name: "Karni Mata Temple",
                    enemiesToDefeat: 119,
                    onCompleteAreasUnlocked: [
                        "riodelossietecolores"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                klandragon: {
                    areaString : " ",
                    name: "Klandagon",
                    enemiesToDefeat: 141,
                    onCompleteAreasUnlocked: [
                        "sapavalley"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                riodelossietecolores: {
                    areaString : " ",
                    name: "Rio de Los Siete Colores",
                    enemiesToDefeat: 122,
                    onCompleteAreasUnlocked: [
                        "sedona"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                sapavalley: {
                    areaString : " ",
                    name: "Sa Pa Valley",
                    enemiesToDefeat: 158,
                    onCompleteAreasUnlocked: [
                        "taxco"
                    ],
                    enemies: [
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "sniper",
                            enemyDifficulty: "hard"
                        },
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                sedona: {
                    areaString : " ",
                    name: "Sedona",
                    enemiesToDefeat: 199,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                //
                taxco: {
                    areaString : " ",
                    name: "Taxco",
                    enemiesToDefeat: 210,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                }
            },
            onCompleteZonesUnlocked: [
                "costademarfil"
            ]
        },
        tadrartacacus: {
            // Karnaca
            zoneAvatar: "https://i.imgur.com/NHOsGDG.png",
            zoneString : "Have you found the secret stash under the MegaCorp Armory? of course not, it is securely guarded",
            startingArea: "karnaca",
            name: "Tadrart Acacus",
            zoneDifficulty: 2,
            intendedLevelString: "25-32",
            enemyStatBuffs: {
                hpPlusPercentage: 2.2,
                adPlusPercentage: 3.2,
                mdPlusPercentage: 3.2,
                armorPlusPercentage: 1.8,
                spiritPlusPercentage: 1.8,
                frenzyAdIncreasePercentage: 1.8,
                echoIncreasePercentage: 1.8
            },
            enemies: {
                easy: [
                    "bull", "bull", "bull", "bull", 
                    "addict", "addict", "addict", 
                    "hungryboar"
                ],
                medium: [
                    "disassembler", "disassembler", "disassembler", "disassembler",
                    "ignoramus",
                    "auctionsniper",
                ],
                hard: [
                    "silverback", "silverback", "silverback",
                    "voodoowitch", "voodoowitch", "voodoowitch",
                    "capo"
                ],
                boss: [
                    "vampire", "vampire", "vampire", 
                    "desperado"
                ]
            },
            areas: {
                //
                karnaca: {
                    areaString : " ",
                    name: "Karnaca",
                    enemiesToDefeat: 78,
                    onCompleteAreasUnlocked: [
                        "nazcalines",
                        "badabesurt",
                        "borobudurtemple",
                        "canocristales",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                abrahamlake: {
                    areaString : " ",
                    name: "Abraham Lake",
                    enemiesToDefeat: 108,
                    onCompleteAreasUnlocked: [
                        "azerilcaverns"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                azerilcaverns: {
                    areaString : " ",
                    name: "Azeril Caverns",
                    enemiesToDefeat: 121,
                    onCompleteAreasUnlocked: [
                        "delphimuseum"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                badabesurt: {
                    areaString : " ",
                    name: "Badab-e Surt",
                    enemiesToDefeat: 153,
                    onCompleteAreasUnlocked: [
                        "abrahamlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                borobudurtemple: {
                    areaString : " ",
                    name: "Borobudur Temple",
                    enemiesToDefeat: 179,
                    onCompleteAreasUnlocked: [
                        "cooberpedy"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                canocristales: {
                    areaString : " ",
                    name: "Cano Cristales",
                    enemiesToDefeat: 37,
                    onCompleteAreasUnlocked: [
                        "chocolatehills"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                chocolatehills: {
                    areaString : " ",
                    name: "Chocolate Hills",
                    enemiesToDefeat: 155,
                    onCompleteAreasUnlocked: [
                        "megacorparmory"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                cooberpedy: {
                    areaString : " ",
                    name: "Coober Pedy",
                    enemiesToDefeat: 122,
                    onCompleteAreasUnlocked: [
                        "hagrowswamp"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                delphimuseum: {
                    areaString : " ",
                    name: "Delphi Museum",
                    enemiesToDefeat: 90,
                    onCompleteAreasUnlocked: [
                        "hagiasophia"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                hagiasophia: {
                    areaString : " ",
                    name: "Hagia Sophia",
                    enemiesToDefeat: 178,
                    onCompleteAreasUnlocked: [
                        "hagrowswamp"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                hagrowswamp: {
                    areaString : " ",
                    name: "Hagrow Swamp",
                    enemiesToDefeat: 136,
                    onCompleteAreasUnlocked: [
                        "megacorparmory"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                megacorparmory: {
                    areaString : "Your mind is telling you to stay, your body wants to escape",
                    name: "MegaCorp Armory",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "hagrowswamp"
                    ],
                    enemies: [
                        {
                            enemyId: "zeta",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "capo",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "gascollector",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "capo",
                            enemyDifficulty: "hard"
                        },
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                nazcalines: {
                    areaString : " ",
                    name: "Nazca Lines",
                    enemiesToDefeat: 114,
                    onCompleteAreasUnlocked: [
                        "megacorparmory"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
            },
            onCompleteZonesUnlocked: [
                "yosemite"
            ]
        },
        // - Costa de marfil - Scorpia Shipyards,  
        costademarfil: {
            zoneAvatar: "https://i.imgur.com/3Eohx8s.png",
            zoneString : "日本語のナンセンス",
            startingArea: "argentumbay",
            name: "Costa De Marfil",
            intendedLevelString: "30-34",
            zoneDifficulty: 3,
            enemyStatBuffs: {
                hpPlusPercentage: 2.5,
                adPlusPercentage: 3.7,
                mdPlusPercentage: 3.7,
                armorPlusPercentage: 2,
                spiritPlusPercentage: 2,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 2.2
            },
            enemies: {
                easy: [
                    "tacosmuggler", "tacosmuggler", "tacosmuggler", "tacosmuggler", 
                    "addict", "addict", "addict", 
                    "hungryboar"
                ],
                medium: [
                    "tarzan", "tarzan", "tarzan", "tarzan",
                    "witch",
                    "auctionsniper",
                ],
                hard: [
                    "distributor", "distributor", "distributor",
                    "walrus", "walrus", "walrus",
                    "capo"
                ],
                boss: [
                    "trex", "trex", "trex", 
                    "executioner"
                ]
            },
            areas: {
                //
                argentumbay: {
                    areaString : "Welcome to the coast of marvels",
                    name: "Argentum Bay",
                    enemiesToDefeat: 105,
                    onCompleteAreasUnlocked: [
                        "scorpiashipyards",

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                ardwenlake: {
                    areaString : " ",
                    name: "Ardwen Lake",
                    enemiesToDefeat: 114,
                    onCompleteAreasUnlocked: [
                        "galatabridge"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                beirlandisland: {
                    areaString : " ",
                    name: "Beirland Island",
                    enemiesToDefeat: 152,
                    onCompleteAreasUnlocked: [
                        "floatingislands"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                berryheadarch: {
                    areaString : " ",
                    name: "Berry Head Arch",
                    enemiesToDefeat: 95,
                    onCompleteAreasUnlocked: [
                        "beirlandisland"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                bubblehouses: {
                    areaString : " ",
                    name: "Bubble Houses",
                    enemiesToDefeat: 146,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                capecod: {
                    areaString : " ",
                    name: "Cape Cod",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "berryheadarch",
                        "ardwenlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                devilssea: {
                    areaString : " ",
                    name: "Abandon all hope those who enter here",
                    enemiesToDefeat: 204,
                    enemies: [
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "trex",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "bubblehouses"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                faroeislands: {
                    areaString : " ",
                    name: "Faroe Islands",
                    enemiesToDefeat: 149,
                    onCompleteAreasUnlocked: [
                        "capecod",
                        "floatingislands",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                floatingislands: {
                    areaString : " ",
                    name: "Floating Islands",
                    enemiesToDefeat: 73,
                    onCompleteAreasUnlocked: [
                        "devilssea"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                galatabridge: {
                    areaString : " ",
                    name: "Galata Bridge",
                    enemiesToDefeat: 120,
                    onCompleteAreasUnlocked: [
                        "devilssea"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                barrierreef: {
                    areaString : " ",
                    name: "Barrier Reef",
                    enemiesToDefeat: 135,
                    onCompleteAreasUnlocked: [
                        "puertoprincesa",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                halongbay: {
                    areaString : " ",
                    name: "Ha Long Bay",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "devilssea",
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                napalicoast: {
                    areaString : " ",
                    name: "Na Pali Coast",
                    enemiesToDefeat: 173,
                    onCompleteAreasUnlocked: [
                        "halongbay"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                puertoprincesa: {
                    areaString : " ",
                    name: "Puerto princesa",
                    enemiesToDefeat: 134,
                    onCompleteAreasUnlocked: [
                        "devilssea",

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                scorpiashipyards: {
                    areaString : " ",
                    name: "Scorpia Shipyards",
                    enemiesToDefeat: 87,
                    onCompleteAreasUnlocked: [
                        "faroeislands",
                        "barrierreef",
                        "napalicoast"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                }

            },
            onCompleteZonesUnlocked: [
                "tokyo",
            ]
        },

        //// NOT DONE TODO: FINISH THESE AND CONNECT

        patagonia: {
            zoneAvatar: "https://i.imgur.com/X7tvrJp.png",
            zoneString : "Freezing to death should be the least of your worries",
            startingArea: "bloodfalls",
            name: "Patagonia",
            zoneDifficulty: 3,
            intendedLevelString: "30-35",
            enemyStatBuffs: {
                hpPlusPercentage: 2.5,
                adPlusPercentage: 3.7,
                mdPlusPercentage: 3.7,
                armorPlusPercentage: 2,
                spiritPlusPercentage: 2,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 2.2
            },
            enemies: {
                easy: [
                    "angrydwarf", "angrydwarf", "angrydwarf", "angrydwarf", 
                    "extremist", "extremist", "extremist", 
                    "vagabond"
                ],
                medium: [
                    "polarbear", "polarbear", "polarbear", "polarbear",
                    "philistine",
                    "suicidebomber",
                ],
                hard: [
                    "wendigo", "wendigo", "wendigo",
                    "walrus", "walrus", "walrus",
                    "capo"
                ],
                boss: [
                    "escapedrobot", "escapedrobot", "escapedrobot", 
                    "bigfoot"
                ]
            },
            areas: {
                bloodfalls: {
                    areaString : " ",
                    name: "Blood Falls",
                    enemiesToDefeat: 104,
                    onCompleteAreasUnlocked: [
                        "bozkovdolomite"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                bozkovdolomite: {
                    areaString : " ",
                    name: "Bozkov Dolomite Caves",
                    enemiesToDefeat: 128,
                    onCompleteAreasUnlocked: [
                        "campsbay"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                campsbay: {
                    areaString : " ",
                    name: "Camps Bay",
                    enemiesToDefeat: 204,
                    onCompleteAreasUnlocked: [
                        "cobbspoint"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                cobbspoint: {
                    areaString : " ",
                    name: "Cobb's Point",
                    enemiesToDefeat: 95,
                    onCompleteAreasUnlocked: [
                        "dunwall"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                dunwall: {
                    areaString : " ",
                    name: "Dunwall",
                    enemiesToDefeat: 77,
                    onCompleteAreasUnlocked: [
                        "edurnaroch"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                edurnaroch: {
                    areaString : " ",
                    name: "Edur Naroch",
                    enemiesToDefeat: 58,
                    onCompleteAreasUnlocked: [
                        "giantscauseway"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                giantscauseway: {
                    areaString : " ",
                    name: "Giant's Causeway",
                    enemiesToDefeat: 159,
                    onCompleteAreasUnlocked: [
                        "grandteton"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                grandteton: {
                    areaString : " ",
                    name: "Grand Teton",
                    enemiesToDefeat: 180,
                    onCompleteAreasUnlocked: [
                        "hangingpillar"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                hangingpillar: {
                    areaString : " ",
                    name: "Hanging Pillar",
                    enemiesToDefeat: 190,
                    enemies: [
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "wendigo",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "bigfoot",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "wendigo",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "hoolefarisland"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                hoolefarisland: {
                    areaString : " ",
                    name: "Hoolefar Island",
                    enemiesToDefeat: 105,
                    onCompleteAreasUnlocked: [
                        "lanzarote"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                lanzarote: {
                    areaString : " ",
                    name: "Lanzarote",
                    enemiesToDefeat: 113,
                    onCompleteAreasUnlocked: [
                        "morainelake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                morainelake: {
                    areaString : " ",
                    name: "Moraine Lake",
                    enemiesToDefeat: 187,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
            },
            onCompleteZonesUnlocked: [
                "sahara", // -> mounteverest
            ]
        },
        yosemite: {
            zoneAvatar: "https://i.imgur.com/79r8cPJ.png",
            zoneString : "Do NOT abandon the hiking trail at any time",
            startingArea: "arashiyamaforest",
            name: "Yosemite",
            zoneDifficulty: 3,
            intendedLevelString: "32-36",
            enemyStatBuffs: {
                hpPlusPercentage: 2.5,
                adPlusPercentage: 3.7,
                mdPlusPercentage: 3.7,
                armorPlusPercentage: 2,
                spiritPlusPercentage: 2,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 2.2
            },
            enemies: {
                easy: [
                    "hungryboar", "hungryboar", "hungryboar", "hungryboar", 
                    "seedthief", "seedthief", "seedthief", 
                    "vagabond"
                ],
                medium: [
                    "tarzan", "tarzan", "tarzan", "tarzan",
                    "bear",
                    "troglodyte",
                ],
                hard: [
                    "delinquent", "delinquent", "delinquent",
                    "mountainlion", "mountainlion", "mountainlion",
                    "racketeer"
                ],
                boss: [
                    "kidnaper", "kidnaper", "kidnaper", 
                    "trex"
                ]
            },
            areas: {
                arashiyamaforest: {
                    areaString : " ",
                    name: "Arashiyama Forest",
                    enemiesToDefeat: 80,
                    onCompleteAreasUnlocked: [
                        "bhangarhfort"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                bhangarhfort: {
                    areaString : " ",
                    name: "Bhangarh Fort",
                    enemiesToDefeat: 95,
                    onCompleteAreasUnlocked: [
                        "bigben"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                bigben: {
                    areaString : " ",
                    name: "Big Ben",
                    enemiesToDefeat: 134,
                    onCompleteAreasUnlocked: [
                        "deathvalley"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                deathvalley: {
                    areaString : " ",
                    name: "Death Valley",
                    enemiesToDefeat: 121,
                    onCompleteAreasUnlocked: [
                        "giantcrystalcave"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                giantcrystalcave: {
                    areaString : " ",
                    name: "Giant Crystal Cave",
                    enemiesToDefeat: 175,
                    onCompleteAreasUnlocked: [
                        "guardianmountains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                guardianmountains: {
                    areaString : " ",
                    name: "Guardian Mountains",
                    enemiesToDefeat: 31,
                    onCompleteAreasUnlocked: [
                        "helmsdeep"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                helmsdeep: {
                    areaString : " ",
                    name: "Helm's Deep",
                    enemiesToDefeat: 188,
                    onCompleteAreasUnlocked: [
                        "huacachinaoasis"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                huacachinaoasis: {
                    areaString : " ",
                    name: "Huacachina Oasis",
                    enemiesToDefeat: 154,
                    onCompleteAreasUnlocked: [
                        "parthenon"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                parthenon: {
                    areaString : " ",
                    name: "Parthenon",
                    enemiesToDefeat: 95,
                    onCompleteAreasUnlocked: [
                        "rockislands"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                rockislands: {
                    areaString : " ",
                    name: "Rock Islands of Palau",
                    enemiesToDefeat: 108,
                    onCompleteAreasUnlocked: [
                        "screamingtunnel"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                screamingtunnel: {
                    areaString : " ",
                    name: "Screaming Tunnel",
                    enemiesToDefeat: 78,
                    onCompleteAreasUnlocked: [
                        "stoneforest"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                stoneforest: {
                    areaString : " ",
                    name: "Stone Forest of Shilin",
                    enemiesToDefeat: 144,
                    onCompleteAreasUnlocked: [
                        "tomblioutpost"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tomblioutpost: {
                    areaString : " ",
                    name: "Tombli Outpost",
                    enemiesToDefeat: 218,
                    onCompleteAreasUnlocked: [
                        "verdongorge"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                verdongorge: {
                    areaString : " ",
                    name: "Verdon Gorge",
                    enemiesToDefeat: 150,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
            },
            onCompleteZonesUnlocked: [
                "pikecreek", // -> acognagua
            ]
        },
        tokyo: {
            zoneAvatar: "https://i.imgur.com/hFTO52y.png",
            zoneString : "☢️",
            startingArea: "academycity",
            name: "Tokyo",
            zoneDifficulty: 4,
            intendedLevelString: "35-38",
            enemyStatBuffs: {
                hpPlusPercentage: 2.8,
                adPlusPercentage: 3.9,
                mdPlusPercentage: 3.9,
                armorPlusPercentage: 2.2,
                spiritPlusPercentage: 2.2,
                frenzyAdIncreasePercentage: 2.5,
                echoIncreasePercentage: 2.5
            },
            enemies: {
                easy: [
                    "tacosmuggler", "tacosmuggler", "tacosmuggler", "tacosmuggler", 
                    "ruffian", "ruffian", "ruffian", 
                    "burritohustler"
                ],
                medium: [
                    "charlatan", "charlatan", "charlatan", "charlatan",
                    "evilclown",
                    "auctionsniper",
                ],
                hard: [
                    "distributor", "distributor", "distributor",
                    "racketeer", "racketeer", "racketeer",
                    "zeta"
                ],
                boss: [
                    "beheader", "beheader", "beheader", 
                    "yakuza"
                ]
            },
            areas: {
                academycity: {
                    areaString : " ",
                    name: "Academy City",
                    enemiesToDefeat: 93,
                    onCompleteAreasUnlocked: [
                        "easterisland"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                easterisland: {
                    areaString : " ",
                    name: "Easter Island",
                    enemiesToDefeat: 73,
                    onCompleteAreasUnlocked: [
                        "ergubaridesert"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                ergubaridesert: {
                    areaString : " ",
                    name: "Erg Ubari Desert",
                    enemiesToDefeat: 172,
                    onCompleteAreasUnlocked: [
                        "juchetower"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                juchetower: {
                    areaString : " ",
                    name: "Juche Tower",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "kittyhawk"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                kittyhawk: {
                    areaString : " ",
                    name: "Kitty Hawk",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "kuangsifalls"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                kuangsifalls: {
                    areaString : " ",
                    name: "Kuang Si Falls",
                    enemiesToDefeat: 165,
                    onCompleteAreasUnlocked: [
                        "lakebaikal"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                lakebaikal: {
                    areaString : " ",
                    name: "Lake Baikal",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "laketekapo"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                laketekapo: {
                    areaString : " ",
                    name: "Lake Tekapo",
                    enemiesToDefeat: 57,
                    onCompleteAreasUnlocked: [
                        "negaverse"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                negaverse: {
                    areaString : " ",
                    name: "Negaverse",
                    enemiesToDefeat: 201,
                    onCompleteAreasUnlocked: [
                        "picdumidi"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                pearlharbour: {
                    areaString : " ",
                    name: "Pearl Harbour",
                    enemiesToDefeat: 44,
                    onCompleteAreasUnlocked: [
                        "tsukijfishmarket"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                picdumidi: {
                    areaString : " ",
                    name: "Pic du Midi",
                    enemiesToDefeat: 150,
                    onCompleteAreasUnlocked: [
                        "thefairypools"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                thefairypools: {
                    areaString : " ",
                    name: "The Fairy Pools",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "tsukijfishmarket"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tsukijfishmarket: {
                    areaString : " ",
                    name: "Tsukij fish market",
                    enemiesToDefeat: 189,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
            },
            onCompleteZonesUnlocked: [
                "johannesburg",
            ]
        },
        johannesburg: {
            zoneAvatar: "https://i.imgur.com/qWXSUti.png",
            zoneString : "☢️",
            startingArea: "agorianbattleplex",
            name: "Johannesburg",
            intendedLevelString: "38-40",
            zoneDifficulty: 5,
            enemyStatBuffs: {
                hpPlusPercentage: 3.1,
                adPlusPercentage: 4.3,
                mdPlusPercentage: 4.3,
                armorPlusPercentage: 2.4,
                spiritPlusPercentage: 2.4,
                frenzyAdIncreasePercentage: 2.8,
                echoIncreasePercentage: 2.8
            },
            enemies: {
                easy: [
                    "tacodealer", "tacodealer", "tacodealer", "tacodealer", 
                    "burritohustler", "burritohustler", "burritohustler", 
                    "ruffian"
                ],
                medium: [
                    "dolt", "dolt", "dolt", "dolt",
                    "disassembler", "disassembler",
                    "nigerianprince",
                ],
                hard: [
                    "prawn", "prawn", "prawn",
                    "funnypolitician", "funnypolitician", "funnypolitician",
                    "voodoowitch"
                ],
                boss: [
                    "kidnaper", "kidnaper", "kidnaper", 
                    "beheader"
                ]
            },
            areas: {
                agorianbattleplex: {
                    areaString : " ",
                    name: "Agorian Battleplex",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "waileabeach"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                district10: {
                    areaString : " ",
                    name: "District 10",
                    enemiesToDefeat: 154,
                    onCompleteAreasUnlocked: [

                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                newmombasa: {
                    areaString : " ",
                    name: "New Mombasa",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "district10"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                ouagadougou: {
                    areaString : " ",
                    name: "Ouagadougou",
                    enemiesToDefeat: 40,
                    onCompleteAreasUnlocked: [
                        "newmombasa"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                pripyattown: {
                    areaString : " ",
                    name: "Pripyat Town",
                    enemiesToDefeat: 180,
                    onCompleteAreasUnlocked: [
                        "ouagadougou"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                rootbridges: {
                    areaString : " ",
                    name: "Root Bridges",
                    enemiesToDefeat: 84,
                    onCompleteAreasUnlocked: [
                        "pripyattown"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                stgeorgestation: {
                    areaString : " ",
                    name: "St George station",
                    enemiesToDefeat: 151,
                    onCompleteAreasUnlocked: [
                        "rootbridges"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tanahlot: {
                    areaString : " ",
                    name: "tanahlot",
                    enemiesToDefeat: 120,
                    onCompleteAreasUnlocked: [
                        "stgeorgestation"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                themisarena: {
                    areaString : " ",
                    name: "Themis Arena",
                    enemiesToDefeat: 170,
                    onCompleteAreasUnlocked: [
                        "tanahlot"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                waileabeach: {
                    areaString : " ",
                    name: "Wailea Beach",
                    enemiesToDefeat: 59,
                    onCompleteAreasUnlocked: [
                        "themisarena"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
            },
            onCompleteZonesUnlocked: [
                "chicago", // ->london -> new york
            ]
        },
        london: {

        },
        mounteverest: {

        },
        aconcagua: {

        },
        pikecreek: {

        },
        sahara: {

        },
        newyork: {

        },
        chicago: {

        },
        elbert: {

        },
        panama: {

        },

        emeraldeve: {

        },
        gabrielshorn: {

        },
        monsargaeus: {

        },
        marecrisium: {

        },
        neoseoul: {

        },
        villissnelius: {

        }
    },
    /*
        Zones:
        - prarie
        - woods
        - underground tunnels
        - Gabriels Horn, 
        - Pike Creek, 
        - Neo Seul,
        - Chicago, 
        - New York, 
        - Sahara,
        - Emerald Eve, 
        - Panama, - Sona, Panama City, 
        - Matamoros - 
        - Grand Canyon, 
        - Crystal Peak, 
        - Tadrart Acacus
        - Costa de marfil, 
        - Patagonia, 
        - Yosemite
        - Gibraltar
        - Tokyo, 
        - Johanesburg - district 10, 
        - London - essex, bridge, 
        - mountains Everest - walrus cove, crystaline cave, igloo town, 
        - Aconcagua, 
        - Elbert
        -moon Mons Argaeus, 
        -Mare Crisium, 
        - Vallis Snellius  


area 51
bermuda triangle
blackrock mountain
moisty mire
pearl harbour
Taxco, 
Devil´s sea, 
Lake Vostok
neverland, 
peggy's cove, 
santa monica pier, 
scranton, 
negaverse
Nazca Lines, 
Stonehenge, 
Lake Khiluk, 
Torres del Paine, 
Inca Trail, 
Keukenhof Gardens, 
Hoge Velume park
Arkaham Asylum, 
Puerto princesa, 
Palawan
Signal Iduna Park, 
Aokigahara Forest, 
Chernobyl
charles bridge
central park
Lanzarote
Hogwarts
Florence 
Kitty Hawk
Caprica City, 
Tomb of Athena, 
Gates of Hera, 
Grand Library of Libran
Sydney, 
venice,
Alexandria´s library, 
Academy city, 
Reach, 
Klandagon, 
Rannoch, 
New Mombasa, 
Sur'Kesh, 
Jartar, 
Voeld, 
Parnassus, 
Klencory
Trinity park, 
St George subway station, 
Distillery district
Argentum Bay, 
Guardian Mountains, 
Scorpia Shipyards, 
Acheron River, 
Themis Arena, 
Euclid River, 
Cuffle's Breath, 
Kor Yaz Glacier, 
Ruby Range, 
Promos, 
Pilgrim Bay, 
Caprica Interplanetary Spaceport, 
Cobb's Point, 
Orpheus Park, 
Martok Valley, 
Delphi Museum, 
Pantheon Bridge, 
Telamont Building, 
Pustiu Desert, 
Spatiu Gol Plateau, 
Penrose Harbor, 
Great Tauron Plains, 
Petrus Pallace, 
Tower of Virgon, 
Royal Palace of Leonis, 
Hedon Grand Casino
Agorian Battleplex, 
Krell Canyon, 
Molonoth Fields, 
Tombli Outpost, 
Zolar Forest, 
Zoni Temple, 
Maktar Resort, 
MegaCorp Armory, 
Park Dome, 
Azeril Caverns, 
Meero Ruins, 
Gimlick Valley, 
Hagrow Swamp, 
Darkwater Cove, 
Hoolefar Island, 
Morrow Caverns
Space Needle, 
Salar de Uniya Salt Flats, 
Lake Baikal, 
Kuang Si Falls, 
Torres del Paine Park, 
Grand Prismatic Spring, 
Niagara Falls, 
Huacachina Oasis, 
Machu Pichu, 
Karakum Desert, 
Mount Rinjani, 
Lake Louise, 
Taj Mahal, 
Mount Fuji, 
Namib-Naukluft Park, 
Bagan, 
Ha Long Bay, 
Camps Bay, 
Milford Sound, 
Serengeti Park
Neuschwanstein Castle, 
Sa Pa Valley, 
Plitvice Lakes, 
Seljalandsfoss, 
Cinque Terre, 
Great Barrier Reef, 
Lake Tekapo, 
Plateau de Valensole, 
Lake Hillier, 
Antelope Canyon, 
Arashiyama Forest, 
Faroe Islands, 
Lake Borogia, 
Waitomo Glowworm Cave, 
Denali Park, 
The Fairy Pools, 
Iguazu Falls, 
Abraham Lake
Anora River, 
Ardwen Lake, 
Arngor Mountain, 
Beartooth River, 
Beirland Island, 
Borromeo Castle, 
Bregan Hold, 
The Burning Plains, 
Brom's tomb, 
Catacombs of Dras-Leona, 
Crags of Tel'naeír, 
Du Fells Nángoröth, 
Edda River, 
Eldor Lake, 
Edur Naroch, 
Forest of Stone, 
Gray Heath, 
Golden Globe, 
Green Chestnut, 
Hadarac Desert, 
Nurmengard Castle, 
Minas Morgul, 
Igualda Falls, 
Rathbur's Spar, 
Leona Lake
Karnaca
Dunwall
Tristram
Taviana
Ouagadougou
archenland
naypyidaw
Arlington Cemetery, 
Lijang Tower, 
Black Forest, 
Giza Plateau,
Petra, 
La Jolla Cove, 
Temple of Anubis, 
Cape Cod, 
Wailea Beach 
Grand Teton, 
Big Sur, 
Sedona,
Zion, 
Miyaka-jima Island, 
Island of Dolls, 
Blood Falls, 
Mendenhall Ice Caves, 
Red Beach, 
Tianzi Mountains
Skeleton Lake, 
Bhangarh Fort, 
Magnetic Hill, 
Root Bridges, 
Floating Islands, 
Sea of Stars, 
Hanging Pillar, 
Pripyat Town, 
Bubble Houses, 
Inversion House, 
Karni Mata Temple, 
Hang Son Doong, 
Screaming Tunnel, 
Coober Pedy, 
Stone Forest of Shilin, 
Mir Mine
Magic Castle, 
Cano Cristales, 
Badab-e Surt, 
Marieta Island, 
Aleppo, 
Nambia
Bag End
Helm's Deep
Grey Havens
Pass of Cirith Ungol
Rivendell
Minas Tirith
Preikestolen
Camino de Santiago
Galata Bridge
Bwindi Impenetrable National Park
Trans-Siberian Railway
Cies Islands
Pic du Midi
Ladakh
Himachal Pradash
Bryce Canyon
Mount Bromo
Mount Everest
Tomb of marxo
Searle's Fang
Saint Basil's Cathedral
Tsukij fish market
Sanyou Cave
Blue Grotto
Angkor Wat
Nishinomaru Garden
Bozkov Dolomite Caves
Dark Hedges
Whitehaven Beach
Bay of Kotor
Perito Moreno Glacier
Maasai Mara National Reserve
Verdon Gorge
Milford Sound
Panama Canal
Juche Tower
Bora Bora
Sassi
Tanah Lot
Moraine Lake
Socotra Island
Chocolate Hills
Angel Falls
Meenakshi Temple
Erg Ubari Desert
Easter Island
Table Mountain
Giant's Causeway
Dead Sea
Carerra Lake
Lofoten Islands
Borobudur Temple
Lagoa das Sete Cidades
Rio de Los Siete Colores
San Blas Islands
Ranthambore National Park
Berry Head Arch
Ayers Rock
Monument Valley
Giant Crystal Cave
Rock Islands of Palau
White Desert
Galapagos
Na Pali Coast
Napili Bay
Neuschwanstein Castle
Djemaa El Fna market
Parthenon
King Arthur Castle
Chichen Itza
Hagia Sophia
Tikal
Wat Phra Si Sanphet
Colosseum
Burj Khalifa
Wuhan Greenland Center
Big Ben
Sydney Opera House
Marina Bay Sands
Louvre
Arc de Triomphe
Great Wall of China
Bingham Canyon mine
Nile River
Death Valley
Hoover Dam


    */

    areaToZoneMap: {
        tallgrass: "prarie",
        meadows: "prarie",
        acheronriver: "prarie",
        anorariver: "prarie",
        aokigahara: "prarie",
        bagan: "prarie",
        bluegrotto: "prarie",
        carerralake: "prarie",
        charlesbridge: "prarie",
        tauronplains: "prarie",
        greenchestnut: "prarie",
        igualdafalls : "prarie",
        molonoth: "prarie",
        nishinomaru: "prarie",
        archenland: "woods",
        beartoothriver: "woods",
        blackforest: "woods",
        brycecanyon: "woods",
        darkhedges: "woods",
        darkwatercove: "woods",
        denalipark: "woods",
        forestofstone:"woods",
        incatrail:  "woods",
        lakevostok: "woods",
        meeroruins: "woods",
        angkorwat: "undergroundtunnels", 
        bigsur: "undergroundtunnels",
        bramstomb: "undergroundtunnels",
        greyheath: "undergroundtunnels",
        klencory: "undergroundtunnels",
        ladakh: "undergroundtunnels",
        meenakshitemple: "undergroundtunnels",
        morrowcaverns: "undergroundtunnels",
        glowwormcave: "undergroundtunnels",
        tikal: "undergroundtunnels",
        minasmorgul: "undergroundtunnels",
        dunwall: "undergroundtunnels",
        lajoyacove: "matamoros",
        arcdetriomphe: "matamoros",
        caminodesantiago: "matamoros",
        jartar: "matamoros",
        karnimatatemple: "matamoros",
        klandragon: "matamoros",
        riodelossietecolores: "matamoros",
        sapavalley: "matamoros",
        sedona: "matamoros",
        taxco: "matamoros",
        sanyoucave: "grandcanyon",
        antelopecanyon: "grandcanyon",
        arngormountains: "grandcanyon",
        ayersrock: "grandcanyon",
        eddariver: "grandcanyon",
        gimlickvalley: "grandcanyon",
        gizaplateau: "grandcanyon",
        martokvalley: "grandcanyon",
        palawan: "grandcanyon",
        reach: "grandcanyon",
        whitedesert: "grandcanyon",
        zonitemple:  "grandcanyon",

        krellcanyon: "crystalpeak",
        angelfalls: "crystalpeak",
        arlingtoncemetery: "crystalpeak",
        bagend: "crystalpeak",
        bayofkotor: "crystalpeak",
        bwindipark: "crystalpeak",
        capricacity: "crystalpeak",
        chichenitza: "crystalpeak",
        cinqueterre: "crystalpeak",
        cufflesbreath: "crystalpeak",
        euclidriver: "crystalpeak",
        himachalpradash: "crystalpeak",
        mendenhallice: "crystalpeak",
        penroseharbor: "crystalpeak",
        torresdelpaine: "crystalpeak",

        karnaca: "tadrartacacus",
        abrahamlake: "tadrartacacus",
        azerilcaverns: "tadrartacacus",
        badabesurt: "tadrartacacus",
        borobudurtemple: "tadrartacacus",
        canocristales: "tadrartacacus",
        chocolatehills: "tadrartacacus",
        cooberpedy: "tadrartacacus",
        delphimuseum: "tadrartacacus",
        hagiasophia: "tadrartacacus",
        hagrowswamp: "tadrartacacus",
        megacorparmory: "tadrartacacus",
        nazcalines: "tadrartacacus",

        argentumbay: "costademarfil",
        ardwenlake: "costademarfil",
        beirlandisland: "costademarfil",
        berryheadarch: "costademarfil",
        bubblehouses: "costademarfil",
        capecod: "costademarfil",
        devilssea: "costademarfil",
        faroeislands: "costademarfil",
        floatingislands: "costademarfil",
        galatabridge: "costademarfil",
        barrierreef: "costademarfil",
        halongbay: "costademarfil",
        napalicoast: "costademarfil",
        puertoprincesa: "costademarfil",
        scorpiashipyards: "costademarfil",

        bloodfalls: "patagonia",
        bozkovdolomite: "patagonia",
        campsbay: "patagonia",
        cobbspoint: "patagonia",
        edurnaroch: "patagonia",
        giantscauseway: "giantscauseway",
        grandteton: "patagonia",
        hangingpillar: "patagonia",
        hoolefarisland: "patagonia",
        lanzarote: "patagonia",
        morainelake: "patagonia",

        arashiyamaforest: "yosemite",
        bhangarhfort: "yosemite",
        bigben: "yosemite",
        deathvalley: "yosemite",
        giantcrystalcave: "yosemite",
        guardianmountains: "yosemite",
        helmsdeep: "yosemite",
        huacachinaoasis: "yosemite",
        parthenon: "yosemite",
        rockislands: "yosemite",
        screamingtunnel: "yosemite",
        stoneforest: "yosemite",
        tomblioutpost: "yosemite",
        verdongorge: "yosemite",

        academycity: "tokyo",
        easterisland: "tokyo",
        ergubaridesert: "tokyo",
        juchetower: "tokyo",
        kittyhawk: "tokyo",
        kuangsifalls: "tokyo",
        lakebaikal: "tokyo",
        laketekapo: "tokyo",
        negaverse: "tokyo",
        pearlharbour: "tokyo",
        picdumidi: "tokyo",
        thefairypools: "tokyo",
        tsukijfishmarket: "tokyo",

        agorianbattleplex: "johannesburg",
        district10: "johannesburg",
        newmombasa: "johannesburg",
        ouagadougou: "johannesburg",
        pripyattown: "johannesburg",
        rootbridges: "johannesburg",
        stgeorgestation: "johannesburg",
        tanahlot: "johannesburg",
        themisarena: "johannesburg",
        waileabeach: "johannesburg",

    },
}