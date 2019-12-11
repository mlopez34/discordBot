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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.4
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.4
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 1.5,
                echoIncreasePercentage: 1.4
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 1.8,
                echoIncreasePercentage: 1.4
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 1.8
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
                    areaString : "Abandon all hope those who enter here",
                    name: "Devils Sea",
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 1.8
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
                        "dunewall"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                dunewall: {
                    areaString : " ",
                    name: "Dunewall",
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
                    enemiesToDefeat: 100,
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
                            enemyId: "wendigo",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.2,
                echoIncreasePercentage: 1.8
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
                    areaString : ":no_entry_sign:",
                    name: "Tombli Outpost",
                    enemiesToDefeat: 68,
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
                    enemies: [
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "tarzan",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "trex",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "tarzan",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "mountainlion",
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.5,
                echoIncreasePercentage: 2.1
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
                    enemies: [
                        {
                            enemyId: "yakuza",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "zeta",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "suicidebomber",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "suicidebomber",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "suicidebomber",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "suicidebomber",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "suicidebomber",
                            enemyDifficulty: "medium"
                        }
                    ],
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
                        "pearlharbour"
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
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.8,
                echoIncreasePercentage: 2.4
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
                "chicago",
            ]
        },
        // after NYC via shop - flight ticket
        london: {

        },
        mounteverest: {
            zoneAvatar: "https://i.imgur.com/E30HtDi.jpg",
            zoneString : "It will be even colder...",
            startingArea: "greyhavens",
            name: "Mount Everest",
            zoneDifficulty: 5,
            intendedLevelString: "39-41",
            enemyStatBuffs: {
                hpPlusPercentage: 3.2,
                adPlusPercentage: 4.5,
                mdPlusPercentage: 4.5,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3,
                echoIncreasePercentage: 2.4
            },
            enemies: {
                easy: [
                    "graywolf", "graywolf", "graywolf", "graywolf", 
                    "snowleopard", "snowleopard", "snowleopard", 
                    "ruffian"
                ],
                medium: [
                    "polarbear", "polarbear", "polarbear",
                    "charlatan", "charlatan", "charlatan",
                    "disassembler",
                ],
                hard: [
                    "walrus", "walrus", "walrus",
                    "ogre", "ogre", "ogre",
                    "iconoclast"
                ],
                boss: [
                    "bigfoot", "bigfoot",
                    "ogremagi"
                ]
            },
            areas: {
                greyhavens: {
                    areaString : "At the base of the mountain you find three items; a crumpled piece of paper, a camera, and three hacksaws",
                    name: "Grey Havens",
                    enemiesToDefeat: 304,
                    onCompleteAreasUnlocked: [
                        "parnassus",
                        "iguazufalls",
                        "lakekhiluk"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 1
                iguazufalls: {
                    areaString : "The note reads the following: 'Day 74 - running out of canned beans, jimmy seems to be holding up well even after the bite, we only have one flare left which we'll need to start a fire tomorrow'",
                    name: "Iguazu Falls",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "minastirith"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 1
                lakekhiluk: {
                    areaString : "The hacksaw you found seems to have red and black stains on it",
                    name: "Lake Khiluk",
                    enemiesToDefeat: 107,
                    onCompleteAreasUnlocked: [
                        "naypyidaw"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                minastirith: {
                    areaString : "The camera batteries seem to be missing.",
                    name: "Minas Tirith",
                    enemiesToDefeat: 14,
                    onCompleteAreasUnlocked: [
                        "spatiugolplateau"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                naypyidaw: {
                    areaString : "The camera roll is in mint condition.",
                    name: "Naypyidaw",
                    enemiesToDefeat: 270,
                    onCompleteAreasUnlocked: [
                        "sassi"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //1 -  3 man
                parnassus: {
                    areaString : " ",
                    name: "Parnassus",
                    enemiesToDefeat: 74,
                    enemies: [
                        {
                            enemyId: "bigfoot",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "rivendell"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                rivendell: {
                    areaString : " ",
                    name: "Rivendell",
                    enemiesToDefeat: 143,
                    onCompleteAreasUnlocked: [
                        "tablemountain"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                sassi: {
                    areaString : " ",
                    name: "Sassi",
                    enemiesToDefeat: 170,
                    onCompleteAreasUnlocked: [
                        "taviana"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //5 - 4 man
                seaofstars: {
                    areaString : "Under a pile of ruble you find another backpack, this one has extra batteries on it. They fit right in to the camera, which lets you go through the camera roll. The first few pictures are nothing out of the ordinary, just two regular men posing. The 8th and 9th picture is completely black, but you can tell the flash was used to light up the place. The 10th picture has 3 men sitting in a triangle looking at each other.",
                    name: "Sea of Stars",
                    enemiesToDefeat: 86,
                    enemies: [
                        {
                            enemyId: "bigfoot",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "iconoclast",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "walruscove"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                spatiugolplateau: {
                    areaString : " ",
                    name: "Spatiu Gol Plateau",
                    enemiesToDefeat: 79,
                    onCompleteAreasUnlocked: [
                        "towerofvirgon"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                tablemountain: {
                    areaString : " ",
                    name: "Table Mountain",
                    enemiesToDefeat: 189,
                    onCompleteAreasUnlocked: [
                        "walruscove"
                    ],
                    shopItemsAvailable: [
                        
                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4
                taviana: {
                    areaString : " ",
                    name: "Taviana",
                    enemiesToDefeat: 116,
                    onCompleteAreasUnlocked: [
                        "seaofstars"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4
                towerofvirgon: {
                    areaString : " ",
                    name: "Tower of Virgon",
                    enemiesToDefeat: 120,
                    onCompleteAreasUnlocked: [
                        "walruscove"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //4 - 5 man
                walruscove: {
                    areaString : "On a snow mound at the end of the cave is another backpack. This backpack contains a book a pen, and an unopened can of soup. Most of the pages are fuzzy, but the cover clearly reads 'Japanese Alpine Club reconnaissance expedition'. You can make out the following from the last page - 'Its been 113 Days since the Avalanche, Help is not coming since they assume us dead. Jimmy seems calm but Nima and I know something is wrong, since he does not sleep. His bite is getting worse. ",
                    name: "Walrus Cove",
                    enemiesToDefeat: 65,
                    enemies: [
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "ogremagi",
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
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "zolarforest"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 8 man
                zolarforest: {
                    areaString : "You only found three backpacks, the journal only specifies of two others besides the writer. \nThe camera is decades old without self timer.",
                    name: "Zolar Forest",
                    enemiesToDefeat: 8,
                    enemies: [
                        {
                            enemyId: "disassembler",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "disassembler",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "iconoclast",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "ogremagi",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "bigfoot",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
                        }
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
            },
            onCompleteZonesUnlocked: [
                "elbert",
            ]
        },
        // S Z A Expl in matamoros 
        aconcagua: {

        },
        pikecreek: {
            zoneAvatar: "https://i.imgur.com/XPvtg86.jpg",
            zoneString : "It will be cold... very cold.",
            startingArea: "lakeborogia",
            name: "Pike Creek",
            zoneDifficulty: 4,
            intendedLevelString: "35-38",
            enemyStatBuffs: {
                hpPlusPercentage: 2.8,
                adPlusPercentage: 3.9,
                mdPlusPercentage: 3.9,
                armorPlusPercentage: 2.2,
                spiritPlusPercentage: 2.2,
                frenzyAdIncreasePercentage: 2.5,
                echoIncreasePercentage: 2.1
            },
            enemies: {
                easy: [
                    "coyote", "coyote", "coyote", "coyote", 
                    "cheetah", "cheetah", "cheetah", 
                    "hungryboar"
                ],
                medium: [
                    "auctionsniper", "auctionsniper", "auctionsniper",
                    "philistine",
                    "marketflipper",
                ],
                hard: [
                    "warewolf", "warewolf", "warewolf",
                    "zeta", "zeta", "zeta",
                    "tacopirate"
                ],
                boss: [
                    "sicario", "sicario", "sicario", 
                    "goliath"
                ]
            },
            areas: {
                lakeborogia: {
                    areaString : " ",
                    name: "Lake Borogia",
                    enemiesToDefeat: 77,
                    onCompleteAreasUnlocked: [
                        "borromeocastle",
                        "florence"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                borromeocastle: {
                    areaString : " ",
                    name: "Borromeo Castle",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "hogevelumepark",
                        "promos",
                        "surkesh"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 5 man
                colosseum: {
                    areaString : " ",
                    name: "Colosseum",
                    enemiesToDefeat: 45,
                    enemies: [
                        {
                            enemyId: "goliath",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "tacopirate",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "goliath",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "tacopirate",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "zeta",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "tristram"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                florence: {
                    areaString : " ",
                    name: "Florence",
                    enemiesToDefeat: 119,
                    onCompleteAreasUnlocked: [
                        "maktarresort"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                hogevelumepark: {
                    areaString : " ",
                    name: "Hoge Velume park",
                    enemiesToDefeat: 14,
                    onCompleteAreasUnlocked: [
                        "skeletonlake",
                        "hooverdam",
                        "napilibay"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                hooverdam: {
                    areaString : " ",
                    name: "Hoover Dam",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "pantheonbridge"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                maktarresort: {
                    areaString : " ",
                    name: "Maktar Resort",
                    enemiesToDefeat: 104,
                    onCompleteAreasUnlocked: [
                        "colosseum"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                napilibay: {
                    areaString : " ",
                    name: "Napili Bay",
                    enemiesToDefeat: 86,
                    onCompleteAreasUnlocked: [
                        "searlesfang"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                pantheonbridge: {
                    areaString : " ",
                    name: "Pantheon Bridge",
                    enemiesToDefeat: 93,
                    onCompleteAreasUnlocked: [
                        "skeletonlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                promos: {
                    areaString : " ",
                    name: "Promos",
                    enemiesToDefeat: 79,
                    onCompleteAreasUnlocked: [
                        "skeletonlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                rubyrange: {
                    areaString : " ",
                    name: "Ruby Range",
                    enemiesToDefeat: 189,
                    onCompleteAreasUnlocked: [
                        "voeld"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                searlesfang: {
                    areaString : " ",
                    name: "Searle's Fang",
                    enemiesToDefeat: 116,
                    onCompleteAreasUnlocked: [
                        "skeletonlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                //
                seljalandsfoss: {
                    areaString : " ",
                    name: "Seljalandsfoss",
                    enemiesToDefeat: 42,
                    onCompleteAreasUnlocked: [
                        "rubyrange"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4 man
                skeletonlake: {
                    areaString : "Something felt completely off about this lake..",
                    name: "Skeleton Lake",
                    enemiesToDefeat: 68,
                    enemies: [
                        {
                            enemyId: "bonewarrior",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "bonewarrior",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "bonewarrior",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "bonewarrior",
                            enemyDifficulty: "hard"
                        }
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
                //
                surkesh: {
                    areaString : " ",
                    name: "Sur'Kesh",
                    enemiesToDefeat: 120,
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
                tristram: {
                    areaString : " ",
                    name: "Tristram",
                    enemiesToDefeat: 120,
                    onCompleteAreasUnlocked: [
                        "seljalandsfoss"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 7 man
                voeld: {
                    areaString : " ",
                    name: "Voeld",
                    enemiesToDefeat: 7,
                    enemies: [
                        {
                            enemyId: "goliath",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "hungryboar",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "tacopirate",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "philistine",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "sicario",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "hungryboar",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "goliath",
                            enemyDifficulty: "boss"
                        }
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
            },
            onCompleteZonesUnlocked: [
                "mounteverest",
            ]
        },
        sahara: {
            zoneAvatar: "https://i.imgur.com/eYBcNsk.png",
            zoneString : "Find the lost expedition",
            startingArea: "hadaracdesert",
            name: "Sahara",
            zoneDifficulty: 4,
            intendedLevelString: "36-40",
            enemyStatBuffs: {
                hpPlusPercentage: 2.8,
                adPlusPercentage: 3.9,
                mdPlusPercentage: 3.9,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 2.5,
                echoIncreasePercentage: 2.1
            },
            enemies: {
                easy: [
                    "hyena", "hyena", "hyena", "hyena", 
                    "burritohustler", "burritohustler", "burritohustler", 
                    "ruffian"
                ],
                medium: [
                    "rattlesnake", "rattlesnake", "rattlesnake",
                    "scorpion", "scorpion", "scorpion",
                    "tacobandit",
                ],
                hard: [
                    "mountainlion", "mountainlion", "mountainlion",
                    "giantearthworm", "giantearthworm", "giantearthworm",
                    "sniper"
                ],
                boss: [
                    "sultan", "sultan", "sultan",
                    "scorpionking"
                ]
            },
            areas: {
                hadaracdesert: {
                    areaString : "",
                    name: "Hadarac Desert",
                    enemiesToDefeat: 75,
                    onCompleteAreasUnlocked: [
                        "aleppo"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                aleppo: {
                    areaString : " ",
                    name: "Aleppo",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "borabora"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                borabora: {
                    areaString : " ",
                    name: "Bora Bora",
                    enemiesToDefeat: 107,
                    onCompleteAreasUnlocked: [
                        "burjkhalifa"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                burjkhalifa: {
                    areaString : " ",
                    name: "Burj Khalifa",
                    enemiesToDefeat: 84,
                    onCompleteAreasUnlocked: [
                        "karakumdesert"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                karakumdesert: {
                    areaString : " ",
                    name: "Karakum Desert",
                    enemiesToDefeat: 170,
                    onCompleteAreasUnlocked: [
                        "louvre"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                louvre: {
                    areaString : " ",
                    name: "Louvre",
                    enemiesToDefeat: 274,
                    onCompleteAreasUnlocked: [
                        "mirmine"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                mirmine: {
                    areaString : " ",
                    name: "Mir Mine",
                    enemiesToDefeat: 143,
                    onCompleteAreasUnlocked: [
                        "nambia"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                nambia: {
                    areaString : " ",
                    name: "Nambia",
                    enemiesToDefeat: 170,
                    onCompleteAreasUnlocked: [
                        "pustiudesert"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 5 man
                nileriver: {
                    areaString : " ",
                    name: "Nile River",
                    enemiesToDefeat: 60,
                    enemies: [
                        {
                            enemyId: "scorpionking",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "giantearthworm",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "giantearthworm",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "mountainlion",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "scorpion",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "tianzimountains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                
                pustiudesert: {
                    areaString : " ",
                    name: "Pustiu Desert",
                    enemiesToDefeat: 79,
                    onCompleteAreasUnlocked: [
                        "tajmalah"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tajmalah: {
                    areaString : " ",
                    name: "Taj Malah",
                    enemiesToDefeat: 39,
                    enemies: [
                        {
                            enemyId: "sultan",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "mountainlion",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "mountainlion",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "nileriver"
                    ],
                    shopItemsAvailable: [
                        
                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tianzimountains: {
                    areaString : " ",
                    name: "Tianzi Mountains",
                    enemiesToDefeat: 116,
                    onCompleteAreasUnlocked: [
                        "tombofmarxo"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                tombofmarxo: {
                    areaString : " ",
                    name: "Tomb of Marxo",
                    enemiesToDefeat: 120,
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
                "mounteverest",
            ]
        },
        newyork: {
            zoneAvatar: "https://i.imgur.com/OqcosMC.jpg",
            zoneString : "The Bloods have agreed to the deal, you find their death row comrade in panama and they will provide the protection you need on your next campaign",
            startingArea: "newark",
            name: "New york",
            zoneDifficulty: 6,
            intendedLevelString: "43-44",
            enemyStatBuffs: {
                hpPlusPercentage: 3.5,
                adPlusPercentage: 4.7,
                mdPlusPercentage: 4.7,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.3,
                echoIncreasePercentage: 2.6
            },
            enemies: {
                easy: [
                    "thug", "thug", "thug", "thug", 
                    "tacosmuggler", "tacosmuggler", "tacosmuggler", "tacosmuggler",
                    "addict"
                ],
                medium: [
                    "tweener", "tweener", "tweener",
                    "vagabond", "vagabond", "vagabond",
                    "angrymobmember"
                ],
                hard: [
                    "funnypolitician", "funnypolitician", "funnypolitician",
                    "delinquent", "delinquent", "delinquent",
                    "consigliere"
                ],
                boss: [
                    "kingpin", "kingpin", "kingpin", "kingpin", "kingpin",
                    "blood"
                ]
            },
            areas: {
                newark: {
                    areaString : " ",
                    name: "Newark",
                    enemiesToDefeat: 9,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "longisland"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                longisland: {
                    areaString : " ",
                    name: "Long Island",
                    enemiesToDefeat: 89,
                    onCompleteAreasUnlocked: [
                        "hamptons"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                hamptons: {
                    areaString : " ",
                    name: "Hamptons",
                    enemiesToDefeat: 119,
                    onCompleteAreasUnlocked: [
                        "soho"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                soho: {
                    areaString : " ",
                    name: "Soho",
                    enemiesToDefeat: 145,
                    enemies: [
                    ],
                    onCompleteAreasUnlocked: [
                        "jamaica"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                jamaica: {
                    areaString : " ",
                    name: "Jamaica",
                    enemiesToDefeat: 110,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },
                        
                        // 
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "midtown"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                midtown: {
                    areaString : " ",
                    name: "Midtown",
                    enemiesToDefeat: 185,
                    enemies: [
                        
                    ],
                    onCompleteAreasUnlocked: [
                        "flatiron"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                flatiron: {
                    areaString : " ",
                    name: "Flatiron",
                    enemiesToDefeat: 75,
                    enemies: [
                        
                    ],
                    onCompleteAreasUnlocked: [
                        "flatbush"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                flatbush: {
                    areaString : " ",
                    name: "Flatbush",
                    enemiesToDefeat: 57,
                    enemies: [
                        
                    ],
                    onCompleteAreasUnlocked: [
                        "kipsbay"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                kipsbay: {
                    areaString : " ",
                    name: "Kips Bay",
                    enemiesToDefeat: 100,
                    enemies: [
                        
                    ],
                    onCompleteAreasUnlocked: [
                        "centralpark"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                centralpark: {
                    areaString : " ",
                    name: "Central Park",
                    enemiesToDefeat: 69,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },
                        //

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "queens"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                queens: {
                    areaString : " ",
                    name: "Queens",
                    enemiesToDefeat: 130,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },

                        // 

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "thebronx"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                thebronx: {
                    areaString : " ",
                    name: "The Bronx",
                    enemiesToDefeat: 150,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },

                        // 

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "brooklyn"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                brooklyn: {
                    areaString : " ",
                    name: "Brooklyn",
                    enemiesToDefeat: 170,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },

                        // 

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "harlem"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                harlem: {
                    areaString : " ",
                    name: "Harlem",
                    enemiesToDefeat: 180,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },

                        // 

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "lowermanhattan"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                lowermanhattan: {
                    areaString : " ",
                    name: "Lower Manhattan",
                    enemiesToDefeat: 190,
                    enemies: [
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        },

                        // 

                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "funnypolitician",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "angrymobmember",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "uppermanhattan"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // BOSS
                uppermanhattan: {
                    areaString : " ",
                    name: "Upper Manhattan",
                    enemiesToDefeat: 200,
                    enemies: [
                        
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
            },
            onCompleteZonesUnlocked: [
                "panama"
            ]
        },
        chicago: {
            zoneAvatar: "https://i.imgur.com/M7BIKy6.jpg",
            zoneString : "The rest of the Crips are not happy you took out one of them. The enemy of your enemy is your friend, travel to NYC and find an ally.",
            startingArea: "edgewater",
            name: "Chicago",
            zoneDifficulty: 6,
            intendedLevelString: "42-43",
            enemyStatBuffs: {
                hpPlusPercentage: 3.4,
                adPlusPercentage: 4.7,
                mdPlusPercentage: 4.7,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.2,
                echoIncreasePercentage: 2.5
            },
            enemies: {
                easy: [
                    "thug", "thug", "thug", "thug", 
                    "vagabond", "vagabond", "vagabond", 
                    "addict"
                ],
                medium: [
                    "dullard", "dullard", "dullard",
                    "dolt", "dolt", "dolt",
                    "tweener",
                ],
                hard: [
                    "delinquent", "delinquent", "delinquent",
                    "racketeer", "racketeer", "racketeer",
                    "tacolord"
                ],
                boss: [
                    "kidnaper", "kidnaper", "kidnaper", "kidnaper", "kidnaper",
                    "crip"
                ]
            },
            areas: {
                edgewater: {
                    areaString : " ",
                    name: "Edgewater",
                    enemiesToDefeat: 99,
                    onCompleteAreasUnlocked: [
                        "logan"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                logan: {
                    areaString : " ",
                    name: "Logan",
                    enemiesToDefeat: 130,
                    onCompleteAreasUnlocked: [
                        "roscoe",
                        "ravenswood"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                roscoe: {
                    areaString : " ",
                    name: "Roscoe",
                    enemiesToDefeat: 52,
                    enemies: [
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "tacolord",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "ravenswood"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                ravenswood: {
                    areaString : " ",
                    name: "Ravenswood",
                    enemiesToDefeat: 141,
                    onCompleteAreasUnlocked: [
                        "avondale"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                avondale: {
                    areaString : " ",
                    name: "Avondale",
                    enemiesToDefeat: 88,
                    onCompleteAreasUnlocked: [
                        "humboldt",
                        "goldcoast"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                humboldt: {
                    areaString : " ",
                    name: "Humboldt",
                    enemiesToDefeat: 100,
                    enemies: [
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "tacolord",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "racketeer",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "goldcoast"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                goldcoast: {
                    areaString : " ",
                    name: "Gold Coast",
                    enemiesToDefeat: 123,
                    onCompleteAreasUnlocked: [
                        "burnside",
                        "pullman"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                burnside: {
                    areaString : " ",
                    name: "Burnside",
                    enemiesToDefeat: 75,
                    enemies: [
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "tacolord",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "tacolord",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "racketeer",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "pullman"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                pullman: {
                    areaString : " ",
                    name: "Pullman",
                    enemiesToDefeat: 86,
                    onCompleteAreasUnlocked: [
                        "riverdale"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                riverdale: {
                    areaString : " ",
                    name: "Riverdale",
                    enemiesToDefeat: 79,
                    onCompleteAreasUnlocked: [
                        "pilsen"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                pilsen: {
                    areaString : " ",
                    name: "Pilsen",
                    enemiesToDefeat: 169,
                    onCompleteAreasUnlocked: [
                        "lawndale",
                        "englewood"
                    ],
                    shopItemsAvailable: [
                        
                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                lawndale: {
                    areaString : " ",
                    name: "Lawndale",
                    enemiesToDefeat: 40,
                    enemies: [
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        }
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
                englewood: {
                    areaString : " ",
                    name: "Englewood",
                    enemiesToDefeat: 80,
                    enemies: [
                        {
                            enemyId: "crip",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "kidnaper",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "dullard",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "tacolord",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "delinquent",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "racketeer",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "tweener",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "dolt",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "crip",
                            enemyDifficulty: "boss"
                        }
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
                "newyork",
            ]
        },
        elbert: {
            zoneAvatar: "https://i.imgur.com/DFZFStq.jpg",
            zoneString : "You have assembled all the required materials for the journey to Emerald Eve in the cosmos",
            startingArea: "blackrockmountain",
            name: "Elbert",
            zoneDifficulty: 6,
            intendedLevelString: "42-43",
            enemyStatBuffs: {
                hpPlusPercentage: 3.4,
                adPlusPercentage: 4.7,
                mdPlusPercentage: 4.7,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.2,
                echoIncreasePercentage: 2.5
            },
            enemies: {
                easy: [
                    "graywolf", "graywolf", "graywolf", "graywolf", 
                    "snowleopard", "snowleopard", "snowleopard", 
                    "ruffian"
                ],
                medium: [
                    "polarbear", "polarbear", "polarbear",
                    "charlatan", "charlatan", "charlatan",
                    "disassembler",
                ],
                hard: [
                    "mammoth", "mammoth", "mammoth",
                    "ogre", "ogre", "ogre",
                    "frostdragon"
                ],
                boss: [
                    "ogremagi", "ogremagi", "ogremagi", "ogremagi", "ogremagi",
                    "shiva"
                ]
            },
            areas: {
                blackrockmountain: {
                    areaString : " ",
                    name: "Blackrock Mountain",
                    enemiesToDefeat: 104,
                    onCompleteAreasUnlocked: [
                        "breganhold",
                        "ciesislands"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 1
                breganhold: {
                    areaString : " ",
                    name: "Bregan Hold",
                    enemiesToDefeat: 101,
                    onCompleteAreasUnlocked: [
                        "distillerydistrict",
                        "eldorlake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 1
                ciesislands: {
                    areaString : " ",
                    name: "Cies Islands",
                    enemiesToDefeat: 107,
                    onCompleteAreasUnlocked: [
                        "hangsondoong",
                        "goldenglobe"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                distillerydistrict: {
                    areaString : " ",
                    name: "Distillery District",
                    enemiesToDefeat: 143,
                    onCompleteAreasUnlocked: [
                        "inversionhouse"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                eldorlake: {
                    areaString : " ",
                    name: "Eldor Lake",
                    enemiesToDefeat: 100,
                    onCompleteAreasUnlocked: [
                        "lijangtower"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // end
                gatesofhera: {
                    areaString : " ",
                    name: "Gates of Hera",
                    enemiesToDefeat: 50,
                    enemies: [
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "avatarofhera",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "ogre",
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
                // 
                goldenglobe: {
                    areaString : " ",
                    name: "Golden Globe",
                    enemiesToDefeat: 123,
                    onCompleteAreasUnlocked: [
                        "magiccastle"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                hangsondoong: {
                    areaString : " ",
                    name: "Hang Son Doong",
                    enemiesToDefeat: 104,
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
                inversionhouse: {
                    areaString : " ",
                    name: "Inversion House",
                    enemiesToDefeat: 86,
                    onCompleteAreasUnlocked: [
                        "keukenhofgardens"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4
                keukenhofgardens: {
                    areaString : " ",
                    name: "Keukenhof Gardens",
                    enemiesToDefeat: 79,
                    onCompleteAreasUnlocked: [
                        "koryazglacier"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 5
                koryazglacier: {
                    areaString : " ",
                    name: "Kor Yaz Glacier",
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
                // 3
                lijangtower: {
                    areaString : " ",
                    name: "Lijang Tower",
                    enemiesToDefeat: 116,
                    onCompleteAreasUnlocked: [
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                magiccastle: {
                    areaString : " ",
                    name: "Magic Castle",
                    enemiesToDefeat: 80,
                    enemies: [
                        {
                            enemyId: "polarbear",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "mammoth",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "frostdragon",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "ogremagi",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "shiva",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "frostdragon",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "mammoth",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "snowleopard",
                            enemyDifficulty: "easy"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "monumentvalley"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                monumentvalley: {
                    areaString : " ",
                    name: "Monument Valley",
                    enemiesToDefeat: 65,
                    enemies: [
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "ogremagi",
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
                        {
                            enemyId: "walrus",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "gatesofhera"
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
                "emeraldeve",
            ]
        },
        // after NYC
        panama: {
            zoneAvatar: "https://i.imgur.com/7q1T0dP.jpg",
            zoneString : " ",
            startingArea: "cafedelmar",
            name: "Panama",
            zoneDifficulty: 7,
            intendedLevelString: "44-45",
            enemyStatBuffs: {
                hpPlusPercentage: 3.8,
                adPlusPercentage: 5,
                mdPlusPercentage: 5,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.5,
                echoIncreasePercentage: 2.8
            },
            enemies: {
                easy: [
                    "addict", "addict", "addict", "addict", 
                    "burritohustler", "burritohustler", "burritohustler", "burritohustler",
                    "thug"
                ],
                medium: [
                    "haywire", "haywire", "haywire",
                    "guard", "guard", "guard",
                    "operative"
                ],
                hard: [
                    "consigliere", "consigliere", "consigliere",
                    "delinquent", "delinquent", "delinquent",
                    "prisoner"
                ],
                boss: [
                    "militar", "militar", "militar", "militar",
                    "lechero"
                ]
            },
            areas: {
                cafedelmar: {
                    areaString : " ",
                    name: "Cafe del mar",
                    enemiesToDefeat: 878,
                    enemies: [ 

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
                cafedelmar2: {
                    areaString : " ",
                    name: "Cafe del mar 2",
                    enemiesToDefeat: 900,
                    enemies: [ 
                        
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
            },
            onCompleteZonesUnlocked: [
                "neoseoul"
            ]
        },
        emeraldeve: {
            zoneAvatar: "https://i.imgur.com/9vF8gXa.jpg",
            zoneString : "You've found the emerald prysm, upon touching it you are teleported into another dimension",
            startingArea: "redbeach",
            name: "Emerald Eve",
            zoneDifficulty: 7,
            intendedLevelString: "44-45",
            enemyStatBuffs: {
                hpPlusPercentage: 3.6,
                adPlusPercentage: 4.9,
                mdPlusPercentage: 4.9,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.4,
                echoIncreasePercentage: 2.8
            },
            enemies: {
                easy: [
                    "vermin", "vermin", "vermin", "vermin",
                    "squid", "squid", "squid",
                    "angrydwarf"
                ],
                medium: [
                    "maggot", "maggot", "maggot", "maggot",
                    "scorpion", "scorpion", "scorpion", "scorpion",
                    "egg"
                ],
                hard: [
                    "skymaggot", "skymaggot", "skymaggot",
                    "ogre", "ogre", "ogre",
                    "emeralddragon",
                ],
                boss: [
                    "elderemeralddragon",
                    "cyclops", "cyclops", "cyclops", "cyclops"
                ]
            },
            areas: {
                redbeach: {
                    areaString : "You've arrived at the emerald eve as instructed by the hermit in elbert, he somehow forgot to tell you this place is filled with unearthly insects",
                    name: "Red Beach",
                    enemiesToDefeat: 154,
                    onCompleteAreasUnlocked: [
                        "cragsoftelnaeir"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 1
                cragsoftelnaeir: {
                    areaString : "You've established an outpost at the Crags. Recover some maggot bones from Leona lake, and sky maggot blood to glue the bones together so you can reinforce the outpost's wall",
                    name: "Crags of Tel'naeir",
                    enemiesToDefeat: 141,
                    onCompleteAreasUnlocked: [
                        "marietaisland",
                        "leonalake"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                dufellsnangoroth: {
                    areaString : "You feel weak and exhausted, your eyes have turned red and have lost your appetite. The small relic one of the squids was carrying points in the direction the steep hill is located",
                    name: "Du Fells Nangoröth",
                    enemiesToDefeat: 107,
                    onCompleteAreasUnlocked: [
                        "magnetichill"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2 BOSS
                marietaisland: {
                    areaString : "You've collected the sky maggot blood but before you can store it in the flask it was absorbed by your skin",
                    name: "Marieta Island",
                    enemiesToDefeat: 45,
                    enemies: [
                        {
                            enemyId: "skymaggot",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "vermin",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "skymaggot",
                            enemyDifficulty: "hard"
                        },
                    ],
                    onCompleteAreasUnlocked: [
                        "dufellsnangoroth"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 2
                leonalake: {
                    areaString : "The bones you've collected seem unbreakable, before you can put them in your backpack they burrow themselves into the ground..",
                    name: "Leona Lake",
                    enemiesToDefeat: 150,
                    onCompleteAreasUnlocked: [
                        "grandprismaticspring",
                        "capricaspaceport"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3 BOSS
                grandprismaticspring: {
                    areaString : "It is almost as if the dragons are guarding something",
                    name: "Grand Prismatic Spring",
                    enemiesToDefeat: 50,
                    enemies: [
                        {
                            enemyId: "ogre",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "skymaggot",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "emeralddragon",
                            enemyDifficulty: "hard"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "neverland"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 3
                capricaspaceport: {
                    areaString : "The spaceport is desolate and filled with eggs, it looks as if the crew has been gone for a very long time, the mainframe reads the following: 'we've departed to the last city remaining in search of the emerald prysm, there is not enough fuel left to return back home`",
                    name: "Caprica Spaceport",
                    enemiesToDefeat: 123,
                    onCompleteAreasUnlocked: [
                        "theburningplains"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4
                magnetichill: {
                    areaString : " ",
                    name: "Magnetic Hill",
                    enemiesToDefeat: 174,
                    onCompleteAreasUnlocked: [
                        "petruspallace"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4
                neverland: {
                    areaString : " ",
                    name: "Neverland",
                    enemiesToDefeat: 86,
                    onCompleteAreasUnlocked: [
                        "petruspallace"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 4 BOSS
                theburningplains: {
                    areaString : "They've laid eggs all over this place to build an army, but an army for what?",
                    name: "The Burning Plains",
                    enemiesToDefeat: 179,
                    enemies: [
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "emeralddragon",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "mountrinjani"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // 5
                mountrinjani: {
                    areaString : " ",
                    name: "Mount Rinjani",
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
                // 5 BOSS
                petruspallace: {
                    areaString : "The creatures guarding the palace have retreated",
                    name: "Petrus Pallace",
                    enemiesToDefeat: 275,
                    enemies: [
                        {
                            enemyId: "skymaggot",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "maggot",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "squid",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "vermin",
                            enemyDifficulty: "easy"
                        },
                        {
                            enemyId: "cyclops",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "cyclops",
                            enemyDifficulty: "boss"
                        }
                    ],
                    onCompleteAreasUnlocked: [
                        "zion"
                    ],
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ]
                },
                // final BOSS
                zion: {
                    areaString : "You have freed the remaining members of the crew, the captain walks over to you and hands you the emerald prysm",
                    name: "Zion",
                    enemiesToDefeat: 235,
                    enemies: [
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "emeralddragon",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "elderemeralddragon",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "emeralddragon",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "skymaggot",
                            enemyDifficulty: "hard"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        },
                        {
                            enemyId: "cyclops",
                            enemyDifficulty: "boss"
                        },
                        {
                            enemyId: "egg",
                            enemyDifficulty: "medium"
                        }
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
                "gabrielshorn",
            ]
        },
        // after emeraldeve
        gabrielshorn: {
            zoneAvatar: "https://i.imgur.com/7q1T0dP.jpg",
            zoneString : " ",
            startingArea: "necropolis",
            name: "Gabriel's Horn",
            zoneDifficulty: 8,
            intendedLevelString: "45-46",
            enemyStatBuffs: {
                hpPlusPercentage: 4,
                adPlusPercentage: 5.2,
                mdPlusPercentage: 5.2,
                armorPlusPercentage: 1,
                spiritPlusPercentage: 1,
                frenzyAdIncreasePercentage: 3.7,
                echoIncreasePercentage: 2.9
            },
            enemies: {
                easy: [
                    "addict", "addict", "addict", "addict", 
                    "burritohustler", "burritohustler", "burritohustler", "burritohustler",
                    "thug"
                ],
                medium: [
                    "haywire", "haywire", "haywire",
                    "guard", "guard", "guard",
                    "operative"
                ],
                hard: [
                    "chimaera", "chimaera", "chimaera",
                    "hydra", "hydra", "hydra",
                ],
                boss: [
                    "gargantua", "gargantua", "gargantua", "gargantua",
                    "cerberus"
                ]
            },
            areas: {
                necropolis: {
                    areaString : " ",
                    name: "Necropolis",
                    enemiesToDefeat: 878,
                    enemies: [ 

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
                necropolis2: {
                    areaString : " ",
                    name: "Necropolis2",
                    enemiesToDefeat: 878,
                    enemies: [ 

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
                "neoseoul"
            ]

        },
        // after gabriel
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
        - London - essex
        - mountains Everest  
        - Aconcagua, 
        - Elbert
        - moon Mons Argaeus, 
        - Mare Crisium, 
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
        dunewall: "patagonia",
        edurnaroch: "patagonia",
        giantscauseway: "patagonia",
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

        borromeocastle: "pikecreek",
        colosseum: "pikecreek",
        florence: "pikecreek",
        hogevelumepark: "pikecreek",
        hooverdam: "pikecreek",
        lakeborogia: "pikecreek", //
        maktarresort: "pikecreek",
        napilibay: "pikecreek",
        pantheonbridge: "pikecreek",
        promos: "pikecreek",
        rubyrange: "pikecreek",
        searlesfang: "pikecreek",
        seljalandsfoss: "pikecreek",
        skeletonlake: "pikecreek",
        surkesh: "pikecreek",
        tristram: "pikecreek",
        voeld: "pikecreek",

        greyhavens: "mounteverest",
        iguazufalls: "mounteverest",
        lakekhiluk: "mounteverest",
        minastirith: "mounteverest",
        naypyidaw: "mounteverest",
        parnassus: "mounteverest", 
        rivendell: "mounteverest",
        sassi: "mounteverest",
        seaofstars: "mounteverest",
        spatiugolplateau: "mounteverest",
        tablemountain: "mounteverest",
        taviana: "mounteverest",
        towerofvirgon: "mounteverest",
        walruscove: "mounteverest",
        zolarforest: "mounteverest",

        hadaracdesert: "sahara",
        aleppo: "sahara",
        borabora: "sahara",
        burjkhalifa: "sahara",
        karakumdesert: "sahara",
        louvre: "sahara", 
        mirmine: "sahara",
        nambia: "sahara",
        nileriver: "sahara",
        pustiudesert: "sahara",
        tajmalah: "sahara",
        tianzimountains: "sahara",
        tombofmarxo: "sahara",

        blackrockmountain: "elbert",
        breganhold: "elbert",
        ciesislands: "elbert",
        distillerydistrict: "elbert",
        eldorlake: "elbert",
        gatesofhera: "elbert", 
        goldenglobe: "elbert",
        hangsondoong: "elbert",
        inversionhouse: "elbert",
        keukenhofgardens: "elbert",
        koryazglacier: "elbert",
        lijangtower: "elbert",
        magiccastle: "elbert",
        monumentvalley: "elbert",

        edgewater: "chicago",
        logan: "chicago",
        roscoe: "chicago",
        ravenswood: "chicago",
        avondale: "chicago",
        humboldt: "chicago", 
        goldcoast: "chicago",
        burnside: "chicago",
        pullman: "chicago",
        riverdale: "chicago",
        pilsen: "chicago",
        lawndale: "chicago",
        englewood: "chicago",

        redbeach: "emeraldeve",
        cragsoftelnaeir: "emeraldeve",
        dufellsnangoroth: "emeraldeve",
        marietaisland: "emeraldeve",
        leonalake: "emeraldeve",
        grandprismaticspring: "emeraldeve", 
        capricaspaceport: "emeraldeve",
        magnetichill: "emeraldeve",
        neverland: "emeraldeve",
        theburningplains: "emeraldeve",
        mountrinjani: "emeraldeve",
        petruspallace: "emeraldeve",
        zion: "emeraldeve",
        
        newark: "newyork",
        longisland: "newyork",
        hamptons: "newyork",
        soho: "newyork",
        jamaica: "newyork",
        midtown: "newyork",
        flatiron: "newyork",
        flatbush: "newyork",
        kipsbay: "newyork",
        centralpark: "newyork",
        queens: "newyork",
        thebronx: "newyork",
        brooklyn: "newyork", 
        harlem: "newyork",
        lowermanhattan: "newyork",
        uppermanhattan: "newyork",

        cafedelmar: "panama",
        necropolis: "gabrielshorn"
    },
}