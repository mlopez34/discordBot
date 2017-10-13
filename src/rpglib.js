module.exports = {

    rpgAbilities: {
        attack : {
            name: "attack",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },
        tacoheal : {
            name: "heal",
            heal: 50,
            mdPercentage: 1.35
        },
        replenish : {
            name: "replenish",
            heal: 450,
            mdPercentage: 1.8,
            limitDefensive : true
        },
        bandaid : {
            name: "bandaid",
            heal: 20,
            mdPercentage: 0.5,
            special: "remove status"
        },
        orchatasip: {
            name:"orchata sip",
            hot: {
                name: "orchata sip",
                heal: 50,
                emoji: "🥛",
                mdPercentage: 1.5,
                healingOnHotApply: false,
                turnsToExpire: 5,
                healingOnDotExpire: false,
                healingOnExpire: 0
            }
        },
        elixir: {
            name: "elixir",
            heal: 25,
            cooldown: 0,
            maxcooldown: 1,
            mdPercentage: 0.65,
            areawide: true,
            targets: "friendly"
        },
        megaelixir: {
            name: "megaelixir",
            heal: 220,
            specialCharge: 1,
            mdPercentage: 1.5,
            areawide: true,
            targets: "friendly",
            limitDefensive: true
        },
        poke: {
            name:"poke",
            type:"physical",
            dot: {
                name: "poke",
                type:"physical",
                dmg: 45,
                adPercentage: 1,
                emoji: "📌",
                dmgOnDotApply: false,
                turnsToExpire: 4,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        curse: {
            name:"curse",
            type:"shadow",
            dot: {
                name: "curse",
                type:"shadow",
                dmg: 45,
                mdPercentage: 1,
                emoji: "🌑",
                dmgOnDotApply: false,
                turnsToExpire: 4,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        tacowall: {
            buff: {
                name: "taco wall",
                emoji : "🏛",
                affects: ["spirit"],
                multiplier: 2
            }
        },
        shield: {
            buff: {
                name: "shield",
                emoji: "🛡️",
                affects: ["armor"],
                multiplier: 2
            }
        },
        barrier: {
            buff: {
                name: "barrier",
                emoji: "🚧",
                affects: ["spirit"],
                additive: 650
            }
        },
        protect: {
            buff: {
                name: "protect",
                emoji: "🥅",
                affects: ["armor"],
                additive: 650
            }
        },
        empower: {
            buff: {
                name: "empower",
                emoji: "💪🏼",
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.4
            }
        },
        flameblast: {
            dmg: 50,
            mdPercentage: 1,
            type: "fire",
            dot: {
                name: "burning",
                dmg: 20,
                mdPercentage: 0.8,
                type: "fire",
                emoji: "🔥",
                damageOnDotApply: false,
                turnsToExpire: 5,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        foodpoisoning: {
            dmg: 60,
            mdPercentage: 1,
            type: "poison",
            dot: {
                name: "food poisoning",
                dmg: 26,
                mdPercentage: 1,
                emoji : "🤢",
                type: "poison",
                damageOnDotApply: false,
                turnsToExpire: 3,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        iceshards: {
            dmg: 45,
            mdPercentage: 0.6,
            type: "ice",
            areawide: true,
            targets: "enemy"
        },
        slash: {
            name: "slash",
            dmg: 45,
            adPercentage: 0.6,
            type: "physical",
            areawide: true,
            targets: "enemy"
        },
        shoot: {
            name: "shoot",
            dmg: 125,
            charges: 4,
            maxcharges: 4,
            adPercentage: 1.25,
            type: "physical"
        },
        headshot: {
            name: "headshot",
            limitOffensive:{
                name: "headshot",
                dmg: 200,
                adPercentage: 1.8,
                type: "physical"
            }
        },
        shock: {
            name: "shock",
            dmg: 90,
            mdPercentage: 1.2,
            type: "electric",
            special: "selfdamage",
            selfdamage: 15
        },
        storm: {
            name: "storm",
            limitOffensive: {
                name: "storm",
                dmg: 150,
                mdPercentage: 1.2,
                type: "ice",
                areawide: true,
                targets: "enemy"
            }
        },
        rockthrow: {
            dmg: 35,
            type: "earth",
            mdPercentage: 0.7,
            special: "warm up",
            buff: {
                selfbuff: true,
                stacksOfWarmUp: 1,
                emoji: "🤾",
                name: "warm up",
                maxStacks: 4,
                mdPercentageAtMaxStacks: 1.3,
                atMaxStacksDealDamage: 200
            }
        },
        drain: {
            name: "drain",
            type: "physical",
            special: {
                name: "drain",
                adPercentage: 0.85,
                dmg: 40,
                heal: 20,
                mdPercentage: 0.85,
                healPercentage: 0.35
            }
        },
        guac: {
            name: "guac",
            type: "shadow",
            special: {
                name: "guac",
                mdPerDot: 0.35,
                mdPercentage: 0.5,
                dmg: 40
            }
        },
        haste: {
            passive: true,
            name: "haste",
            buff: {
                name: "haste",
                emoji: "💨"
            }
        },

        // endOfTurnEvents
        echo: {
            dmgaura: true,
            belongsToEvent: true,
            name: "echo",
            areawidedmg: {
                endOfTurnAura: true,
                hitsEveryNTurn: 2,
                dmgPerTurn: 18,
                name: "echo",
                dmg: 67,
                type: "physical"
            }
        },

        // death effects
        explode: {
            onDeathEffect: true,
            effectDone: false,
            name: "explode",
            areawidedmg : {
                dmgondeath: true,
                areawide: true,
                dmg: 200,
                mdPercentage: .2,
                name: "explode",
                type: "fire"
            }
        },


        // execute (more dmg after 40%)
        // tackle (more damage over 80%)
        // protect (absorb damage)
        // bite (hits harder than attack)
        // absorb (absorbs damage)
        // cover (take damage for someone else - maybe reduce some dmg)
        // heal that heals depending on hp of player with 1 turn cd

        // ON D Abilities:
        // explosion for 150
        // gives +25 AD MD
        // leaves a curse on someone
        // aoe aura ends
        // heals rest of enemies for ~500
        // deals single target damage
        // 100% enrage

        revive: {
            special: "remove death"
        },
        focus: {
            name: "focus",
            belongsToMember: true,
            status: {
                focusedBy: "",
                name: "focus",
                emoji: "👁️",
                special: "focus member"
            }
        },
        freeze: {
            status: {
                name: "frozen",
                emoji: "❄️",
                affects: ["armor"],
                multiplier: 0.7
            }
        },
        scold: {
            status: {
                name: "scold",
                emoji: "☔️",
                affects: ["spirit"],
                multiplier: 0.7
            }
        },
        cripple: {
            status: {
                name: "crippled",
                emoji: "🤕",
                affects: ["attackDmg"],
                multiplier: 0.7
            }
        },
        weaken: {
            status: {
                name: "weakened",
                emoji: "😵 ",
                affects: ["magicDmg"],
                multiplier: 0.7
            }
        },
        finalfortune: {
            special: "take extra turn",
            special2: "after turn party dies",
            areaWide: true
        }
    },
    enemiesToEncounter: {
        easy : [
            {
                name: "Rabbid Wolf",
                abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "tacowall"],
                buffs: [],
                hpPerPartyMember: 170,
                adPerPartyMember: 8,
                mdPerPartyMember: 11,
                hp: 280,
                attackDmg: 55,
                magicDmg: 55,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            {
                name: "Bad Chef",
                abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "barrier"],
                buffs: [],
                hpPerPartyMember: 130,
                adPerPartyMember: 8,
                mdPerPartyMember: 8,
                hp: 290,
                effectsOnDeath: [
                    "explode"
                ],
                attackDmg: 65,
                magicDmg: 47,
                armor: 400,
                spirit: 320,
                difficulty: "easy",
                element: "normal"
            },
            {
                name: "Angry Mob Member",
                abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
                buffs: [],
                hpPerPartyMember: 130,
                adPerPartyMember: 8,
                mdPerPartyMember: 8,
                hp: 280,
                attackDmg: 50,
                magicDmg: 65,
                armor: 450,
                spirit: 370,
                difficulty: "easy",
                element: "normal"
            },
            {
                name: "Taco Dealer",
                abilities: ["attack", "attack", "drain", "drain", "freeze"],
                buffs: [],
                hpPerPartyMember: 130,
                adPerPartyMember: 8,
                mdPerPartyMember: 8,
                hp: 300,
                attackDmg: 49,
                magicDmg: 59,
                armor: 290,
                spirit: 400,
                difficulty: "easy",
                element: "normal"
            }
        ],
        medium: [
            {
                name: "Taco Bandit",
                abilities: ["attack", "attack", "iceshards", "iceshards", "orchatasip"],
                buffs: [],
                hpPerPartyMember: 220,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 350,
                attackDmg: 130,
                magicDmg: 100,
                armor: 550,
                spirit: 450,
                difficulty: "medium",
                element: "normal"
            },
            {
                name: "Taco Thief",
                abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                buffs: [],
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 220,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 480,
                attackDmg: 80,
                magicDmg: 120,
                armor: 350,
                spirit: 450,
                difficulty: "medium",
                element: "normal"
            },
            {
                name: "Slots Gambler",
                abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                buffs: [],
                hpPerPartyMember: 120,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            }
        ],
        hard: [
            {
                name: "Football Player",
                abilities: ["attack", "attack", "slash", "slash", "rockthrow", "empower"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 45,
                            magicDmgPlus : 45,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                hpPerPartyMember: 1350,
                adPerPartyMember: 18,
                mdPerPartyMember: 18,
                hp: 550,
                attackDmg: 120,
                magicDmg: 120,
                armor: 650,
                spirit: 650,
                difficulty: "hard",
                element: "normal"
            },
            {
                name: "Samurai Warrior",
                abilities: ["attack", "attack", "iceshards", "iceshards", "drain", "drain", "bandaid"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 45,
                            magicDmgPlus : 45,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                hpPerPartyMember: 1190,
                adPerPartyMember: 18,
                mdPerPartyMember: 18,
                hp: 700,
                attackDmg: 140,
                magicDmg: 93,
                armor: 750,
                spirit: 600,
                difficulty: "hard",
                element: "normal"
            },
            {
                name: "Funny Politician",
                abilities: ["attack" , "attack" , "curse", "foodpoisoning", "shoot", "shoot","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 45,
                            magicDmgPlus : 45,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1150,
                adPerPartyMember: 18,
                mdPerPartyMember: 18,
                hp: 750,
                attackDmg: 95,
                magicDmg: 140,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            }
        ],
        boss: [
            {
                name: "Vampire",
                abilities: [
                   "attack", "attack", "rockthrow", "rockthrow", "shock", "shock", "tacowall"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1658,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                hp: 800,
                attackDmg: 177,
                magicDmg: 250,
                armor: 1300,
                spirit: 900,
                difficulty: "boss",
                element: "normal"
            },
            {
                name: "Escaped Robot",
                abilities: [
                    "attack", "attack", "drain", "drain", "iceshards", "iceshards", "shield"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1753,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                hp: 900,
                attackDmg: 210,
                magicDmg: 210,
                armor: 1300,
                spirit: 1400,
                difficulty: "boss",
                element: "normal"
            },
            {
                name: "Desperado",
                abilities: [
                    "attack", "attack", "shoot", "shoot", "slash", "slash", "cripple",
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1622,
                hp: 1050,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            }
        ],
        // time travel, demonic summoning, abraham lincolns tomb, evil exes
        
        special: {
            "genghis khan": [
                {
                    name: "Ghenghis Khan",
                    abilities: [
                        "attack",
                        "attack",
                        "slash",
                        "iceshards",
                        "flameblast",
                        "empower"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "😡",
                            onTurnEnd: {
                                attackDmgPlus : 95,
                                magicDmgPlus : 95,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    endOfTurnEvents : [
                        "echo",
                        "focus"
                    ],
                    hp: 10500,
                    attackDmg: 240,
                    magicDmg: 210,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "normal"
                },
                {
                    name: "Subutai",
                    abilities: [
                        "attack",
                        "attack",
                        "shock",
                        "shock",
                        "rockthrow",
                        "cripple"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "😡",
                            onTurnEnd: {
                                attackDmgPlus : 60,
                                magicDmgPlus : 60,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    hp: 4500,
                    attackDmg: 155,
                    magicDmg: 100,
                    armor: 1500,
                    spirit: 1300,
                    difficulty: "special",
                    element: "normal"
                },
                {
                    name: "Jebe",
                    abilities: [
                        "attack",
                        "attack",
                        "rockthrow",
                        "rockthrow",
                        "drain",
                        "tacowall"
                    ],
                    buffs: [],
                    hp: 3000,
                    attackDmg: 110,
                    magicDmg: 170,
                    armor: 900,
                    spirit: 1500,
                    difficulty: "special",
                    element: "normal"
                },
                {
                    name: "Muqali",
                    abilities: [
                        "attack",
                        "attack",
                        "flameblast",
                        "flameblast",
                        "elixir",
                        "weaken"
                    ],
                    effectsOnDeath: [
                        "explode"
                    ],
                    buffs: [],
                    hp: 2350,
                    attackDmg: 130,
                    magicDmg: 110,
                    armor: 1150,
                    spirit: 1150,
                    difficulty: "special",
                    element: "normal"
                }
            ],
            "asteroid": [
                {
                    name: "Asteroid Golem",
                    abilities: [
                        "attack",
                        "attack",
                        "rockthrow",
                        "rockthrow",
                        "slash",
                        "slash",
                        "poke",
                        "shield"
                        // TODO: earthquake
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "😡",
                            onTurnEnd: {
                                attackDmgPlus : 105,
                                magicDmgPlus : 105,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    hp: 7600,
                    attackDmg: 300,
                    magicDmg: 270,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Stone Giant",
                    abilities: [
                        "attack",
                        "attack",
                        "rockthrow",
                        "rockthrow",
                        "slash",
                        "slash",
                        "poke",
                        "tacowall"
                        //TODO: meteor
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "😡",
                            onTurnEnd: {
                                attackDmgPlus : 105,
                                magicDmgPlus : 105,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    hp: 7600,
                    attackDmg: 300,
                    magicDmg: 270,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                },
            ]
        },
        challenge: {
            1 :{
                enemies: [
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 800,
                        attackDmg: 150,
                        magicDmg: 100,
                        armor: 200,
                        spirit: 120,
                        element: "normal"
                    },
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 1220,
                        attackDmg: 130,
                        magicDmg: 120,
                        armor: 200,
                        spirit: 150,
                        element: "normal"
                    },
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 1510,
                        attackDmg: 350,
                        magicDmg: 125,
                        armor: 150,
                        spirit: 250,
                        element: "normal"
                    }
                ],
                points: 5
            },
            2: {
                enemies: [
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 100,
                        attackDmg: 40,
                        magicDmg: 44,
                        armor: 24,
                        spirit: 24,
                        element: "normal"
                    },
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 100,
                        attackDmg: 40,
                        magicDmg: 44,
                        armor: 24,
                        spirit: 24,
                        element: "normal"
                    },
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 100,
                        attackDmg: 40,
                        magicDmg: 44,
                        armor: 24,
                        spirit: 24,
                        element: "normal"
                    }
                ],
                points: 8
            },
            3: {
                enemies: [
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 4120,
                        attackDmg: 125,
                        magicDmg: 125,
                        armor: 450,
                        spirit: 240,
                        element: "normal"
                    },
                    {
                        name: "Taco Monster 14",
                        abilities: [
                            "attack",
                            "foodpoisoning",
                            "shock"
                        ],
                        buffs: [],
                        hp: 5200,
                        attackDmg: 125,
                        magicDmg: 125,
                        armor: 300,
                        spirit: 580,
                        element: "normal"
                    }
                ],
                points: 14
            }
        }
    }    
}