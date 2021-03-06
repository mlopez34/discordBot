module.exports = {
    enemiesToEncounter: {
        summoned: {
            torturedRobot: {
                name: "Tortured Robot",
                abilities: ["attack"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 17500, 25000, 35000, 45000, 60000  ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 3300,
                attackDmg: 230,
                magicDmg: 160,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            lavaElemental: {
                name: "Lava Elemental",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "anger",
                    "slash",
                    "flameblast"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 850,
                            magicDmgPlus : 850,
                            everyNTurns: 8,
                            currentTurn: 1,
                            startTurn: 5
                        }
                    },
                    {
                        name: "amp",
                        emoji: "<:amplify:479301622233563136>",
                        onDamageTakenGiveBuff: {
                            buffId: "amplify"
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [755, 990, 1240, 1430, 1750, 2000, 2400, 2800, 3200, 3600 ],
                        magicDmgPlus : [755, 990, 1240, 1430, 1750, 2000, 2400, 2800, 3200, 3600]
                    },
                    hp: [9500, 22900, 30900, 42000, 65000, 85000, 115000, 149000, 185000, 229000 ],
                    attackDmg: [700, 1100, 1500, 2400, 3500, 4500, 5500, 6500, 7500, 8500 ],
                    magicDmg: [700, 1100, 1500, 2400, 3500, 4500, 5500, 6500, 7500, 8500 ],
                    abilities: []
                },
                abilityOrder: [
                    0, 2, 1, 0, 0, 0, 0
                ],
                endOfTurnEvents : [
                    "focus",
                    "morphAnomalyMessage",
                    "summonAnomaly",
                    "entombAll20",
                    "fury",
                    "rampage",
                    "engulf",
                    "igniteAir"
                ],
                effectsOnDeath: [
                    "entombAll20",
                    "morphAnomalyMessage",
                    "summonAnomaly"
                ],
                hp: 27600,
                attackDmg: 1700,
                magicDmg: 1470,
                armor: 2150,
                spirit: 2100,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            skyElemental: {
                name: "Sky Elemental",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "attack",
                    "crush",
                    "iceshards"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 750,
                            magicDmgPlus : 750,
                            everyNTurns: 8,
                            currentTurn: 1,
                            startTurn: 5
                        }
                    },
                    {
                        name: "damp",
                        emoji: "<:dampen:479301622246408233>",
                        onDamageTakenGiveBuff: {
                            buffId: "dampen"
                        }
                    }

                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [755, 990, 1240, 1430, 1750, 2000, 2400, 2800, 3200, 3600],
                        magicDmgPlus : [755, 990, 1240, 1430, 1750, 2000, 2400, 2800, 3200, 3600]
                    },
                    hp: [22500, 36900, 60900, 99000, 159000, 195000, 235000, 299000, 395000, 529000  ],
                    attackDmg: [700, 1100, 1500, 2100, 2900, 3500, 4500, 5500, 6500, 7500 ],
                    magicDmg: [700, 1100, 1500, 2100, 2900, 3500, 4500, 5500, 6500, 7500 ],
                    abilities: []
                },
                abilityOrder: [
                    0, 0, 1, 0, 2, 2, 0, 1
                ],
                endOfTurnEvents : [
                    "focus",
                    "morphAnomalyMessage",
                    "summonAnomaly",
                    "hurricane",
                    "entombAll20",
                    "summonSmokeScreen",
                    "summonDweller"
                ],
                effectsOnDeath: [
                    "entombAll20",
                    "morphAnomalyMessage",
                    "summonAnomaly",
                ],
                hp: 74600,
                attackDmg: 1700,
                magicDmg: 1470,
                armor: 2150,
                spirit: 2100,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            anomaly: {
                name: "Anomaly",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "attack",
                    "poke",
                    "uppercut",
                    "tackle"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:overmind:479298213904646147>",
                        onTurnEnd: {
                            attackDmgPlus : 200,
                            magicDmgPlus : 750,
                            everyNTurns: 1,
                            startTurn: 1
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [250, 300, 350, 400, 500, 600, 700, 820, 950, 1100],
                        magicDmgPlus : [850, 1000, 1250, 1400, 1600, 1800, 2000, 2250, 2500, 2750 ]
                    },
                    hp: [10500, 15900, 21900, 27000, 37000, 37000, 37000, 37000, 37000, 37000 ],
                    attackDmg: [700, 1100, 1400, 1700, 2100, 2900, 3500, 4500, 5500, 6500 ],
                    magicDmg: [700, 1100, 1400, 1700, 2100, 2900, 3500, 4500, 5500, 6500 ],
                    abilities: []
                },
                abilityOrder: [
                    1, 0, 2, 0, 0, 2, 0, 3
                ],
                endOfTurnEvents : [
                    "focus",
                    "consume",
                    "burst",
                    "burst",
                    "summonFiends",
                    "absorbFiends"
                ],
                effectsOnDeath: [
                    "killAllEntomb"
                ],
                hp: 1750000,
                baseHpOn: [
                    "Asteroid Golem",
                    "Stone Giant",
                    "Lava Elemental",
                    "Sky Elemental"
                ],
                baseHpOnMultiplier: 3,
                attackDmg: 1800,
                magicDmg: 1170,
                armor: 1850,
                spirit: 1850,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            fiend: {
                name: "Fiend",
                abilities: ["attack"],
                buffs: [],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 3250,
                effectsOnDeath: [
                    "explode"
                ],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 5400, 5500, 6500],
                    abilities: []
                },
                attackDmg: 630,
                magicDmg: 660,
                armor: 1000,
                spirit: 1000,
                difficulty: "summoned",
                element: "normal"
            },
            smokeScreen: {
                name: "Smoke Screen",
                abilities: ["attack", "igniteLava"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 54300,
                abilityOrder: [
                    0, 1, 0, 1
                ],
                attackDmg: 830,
                magicDmg: 1060,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            dweller: {
                name: "Dweller",
                abilities: ["attack", "igniteLava"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1500, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 54300,
                abilityOrder: [
                    1, 0, 1, 0
                ],
                attackDmg: 830,
                magicDmg: 1060,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            planchet: {
                name: "Planchet",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                    "pillarAOEmagic"
                ],
                effectsOnDeath: [
                    "elementalBarrier"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            grimaud: {
                name: "Grimaud",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                    "pillarAOEmagic"
                ],
                effectsOnDeath: [
                    "elementalBarrier"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            mousqueton: {
                name: "Mousqueton",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                    "pillarAOE"
                ],
                effectsOnDeath: [
                    "physicalBarrier"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            bazin : {
                name: "Bazin",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                    "pillarAOE"
                ],
                effectsOnDeath: [
                    "physicalBarrier"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            athos: {
                // all physical dmg (deals high physical) attack / uppercut / crush / volley (2 plyr) - furnace for 3 turns for ~ 1500 dmg every 8 turns
                // EOT stacking debuff on tank that reduces their armor every 2 turns by 800 
                // **** reduce dmg by 50% if dealing physical / magical for 2 turns every 3 turns
                name: "Athos",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "attack",
                    "poke",
                    "uppercut",
                    "crush"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:overmind:479298213904646147>",
                        onTurnEnd: {
                            attackDmgPlus : 2200,
                            magicDmgPlus : 1970,
                            everyNTurns: 20,
                            currentTurn: 1,
                            startTurn: 21
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000 ],
                        magicDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000]
                    },
                    hp: [ 19500, 25900, 39900, 51000, 77000, 95000, 130000, 179000, 230000, 289000 ],
                    attackDmg: [750, 1600, 2700, 4400, 5800, 7400, 9050, 10750, 12900, 15800],
                    magicDmg: [700, 1500, 2500, 4100, 5500, 7100, 8650, 10250, 12500, 15000],
                    abilities: []
                },
                abilityOrder: [
                    1, 0, 2, 0, 0, 0, 2, 3
                ],
                endOfTurnEvents : [
                    "focus",
                    "summonPorthos",
                    "spawnAthos",
                    "shackle",
                    "arrowVolley",
                    "arrowVolley",
                    "shrink"
                ],
                effectsOnDeath: [
                    "transferDartagnanAbilities",
                    "transferAthosAbilities"
                ],
                hp: 60000,
                attackDmg: 5220,
                magicDmg: 4970,
                armor: 2100,
                spirit: 2100,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            porthos: {
                // all magic damage (deals high single target magical)
                // curse / shadow bolt / iceshards
                //  EOT shadow shield (debuff) must be bandaided or explodes for 50000 on raid with direct hits every 8 turns 
                // EOT summon shadow orb *****focuses a player - can only be killed by that player deals damage to that player every 6 turns 
                // (killable in ~3 high dps, 4 med dps) revives after 6 turns of being dead
                name: "Porthos",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "attack",
                    "curse",
                    "iceshards",
                    "shadowBurst"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:overmind:479298213904646147>",
                        onTurnEnd: {
                            attackDmgPlus : 1700,
                            magicDmgPlus : 2670,
                            everyNTurns: 20,
                            currentTurn: 1,
                            startTurn: 21
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000],
                        magicDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000]
                    },
                    hp: [ 21500, 29900, 45900, 60000, 95000, 111000, 145000, 197000, 250000, 319000],
                    attackDmg: [600, 1400, 2500, 4100, 5500, 7100, 8650, 10250, 12500, 15000],
                    magicDmg: [750, 1700, 2800, 4400, 5600, 7300, 9150, 10650, 12500, 15700],
                    abilities: []
                },
                abilityOrder: [
                    1, 0, 2, 0, 3, 3, 2, 0, 0
                ],
                endOfTurnEvents : [
                    "focus",
                    "summonAramis",
                    "summonApparition",
                    "spawnPorthos",
                    "shadowShield"
                ],
                // shadow shield every 6 turns
                effectsOnDeath: [
                    // clear apparitions
                    "transferDartagnanAbilities",
                    "transferAthosAbilities",
                    "transferPortosAbilities"
                ],
                hp: 62000,
                attackDmg: 4170,
                magicDmg: 5267,
                armor: 2100,
                spirit: 2100,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            aramis: {
                // all magic damage ( deals moderate magical)
                // maniac - attacks on tank do same damage to group (4 turns) every 10 turns + *** 1-4  ---- 5 free
                // EOT damage reflect, deal 50% damage back to you after dealing it to boss - 4 turns every 10 turns 6-9 ----- 10 free
                // EOT summon enemies that need to be killed or else they buff the boss with frenzy after 3 turns
                name: "Aramis",
                uniqueEnemy: true,
                xp: 150,
                abilities: [
                    "frostBlast",
                    "flameblast",
                    "poison",
                    "guac",
                    "curse"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:overmind:479298213904646147>",
                        onTurnEnd: {
                            attackDmgPlus : 1700,
                            magicDmgPlus : 2670,
                            everyNTurns: 20,
                            currentTurn: 1,
                            startTurn: 21
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000 ],
                        magicDmgPlus : [3100, 4100, 5100, 6100, 7100, 8500, 10000, 12000, 14000, 16000 ]
                    },
                    hp: [ 24500, 34900, 51900, 69000, 104000, 119000, 157000, 209000, 265000, 325000 ],
                    attackDmg: [700, 1500, 2500, 4100, 5500, 7100, 8650, 10250, 12500, 15000],
                    magicDmg: [800, 1700, 2800, 4500, 5900, 7400, 9350, 10950, 13200, 16100],
                    abilities: []
                },
                abilityOrder: [
                    4, 1, 2, 0, 0, 0, 1, 2, 3
                ],
                endOfTurnEvents : [
                    "focus",
                    "summonEnabler",
                    "deathSentenceMessage",
                    "deathSentence",
                    "maniac"
                ],
                effectsOnDeath: [
                    "entombAll20",
                    "killAllEntomb"
                ],
                hp: 64000,
                attackDmg: 4700,
                magicDmg: 5970,
                armor: 2100,
                spirit: 2100,
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                difficulty: "boss",
                element: "earth"
            },
            apparition: {
                name: "Apparition",
                abilities: [ "attack", "curse"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6100,
                abilityOrder: [
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ],
                endOfTurnEvents : [
                    "glare"
                ],
                attackDmg: 1330,
                magicDmg: 1460,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            enabler: {
                name: "Enabler",
                abilities: ["attack", "enable"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6800,
                abilityOrder: [
                    0, 0, 0, 1
                ],
                attackDmg: 1030,
                magicDmg: 860,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },

            knight: {
                name: "Knight",
                abilities: ["attack"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 5000,
                abilityOrder: [
                    0, 0, 0, 0
                ],
                attackDmg: 930,
                magicDmg: 860,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },

            worshipper: {
                name: "Worshipper",
                abilities: ["attack"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 5800,
                abilityOrder: [
                    0, 0, 0, 0
                ],
                endOfTurnEvents: [
                    "worship"
                ],
                attackDmg: 830,
                magicDmg: 860,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },

            cursedGuardian: {
                name: "Cursed Guardian",
                abilities: ["iceshards"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 195,
                            magicDmgPlus : 195,
                            everyNTurns: 1,
                            startTurn: 1
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 5200, 8000, 12000, 16400, 21000, 26000, 34000, 42000 ],
                    attackDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    magicDmg: [300, 500, 900, 1400, 2000, 2600, 3400, 4400, 5500, 6500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 12800,
                abilityOrder: [
                    0, 0, 0, 0
                ],
                attackDmg: 1160,
                magicDmg: 1160,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },

            energyCore: {
                name: "Energy Core",
                passive: true,
                immuneToAoe: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 15000, 22000, 30000, 42000, 55000  ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "removeEnergize"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 7500,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1650,
                spirit: 1650,
                difficulty: "summoned",
                element: "normal"
            },
            redEnergyCrystal: {
                name: "Red Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "entombTargets"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            blueEnergyCrystal: {
                name: "Blue Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "entombTargets"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            yellowEnergyCrystal: {
                name: "Yellow Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "entombTargets"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            greenEnergyCrystal: {
                name: "Green Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "entombTargets"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            blackEnergyCrystal: {
                name: "Black Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "entombTargets"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            purpleEnergyCrystal: {
                name: "Purple Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 13000, 20500, 27500, 35000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300, 2300, 2300, 2300, 2300, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "entombTargets"
                ],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1200,
                spirit: 1200,
                difficulty: "summoned",
                element: "normal"
            },
            totemOfDoom: {
                name: "Totem Of Doom",
                passive: true,
                abilities: [],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "haunt"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 5500,
                attackDmg: 0,
                magicDmg: 0,
                armor: 1000,
                spirit: 1000,
                difficulty: "summoned",
                element: "normal"
            },
            demon: {
                name: "Demon",
                abilities: ["attack", "attack", "attack", "enemyshock"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 2300,
                attackDmg: 260,
                magicDmg: 180,
                armor: 700,
                spirit: 700,
                difficulty: "summoned",
                element: "normal"
            },
            tentacle: {
                name: "Tentacle",
                abilities: [
                    "attack",
                    "attack",
                    "slap",
                    "guac",
                    "curse"
                ],
                endOfTurnEvents : [
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 95,
                            magicDmgPlus : 95,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [120, 200, 300, 440, 590, 720, 900, 1100, 1300, 1500],
                        magicDmgPlus : [120, 200, 300, 440, 590, 720, 900, 1100, 1300, 1500]
                    },
                    hp: [1200, 3500, 15000, 25000, 55000, 85000, 130000, 210000, 300000, 400000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                effectsOnDeath: [
                    "radiation",
                    "explode"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 21300,
                attackDmg: 260,
                magicDmg: 280,
                armor: 1300,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            chupacabra: {
                name: "Chupacabra",
                abilities: ["attack", "attack", "curse", "curse", "guac", "protect"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 2350,
                attackDmg: 290,
                magicDmg: 230,
                armor: 1400,
                spirit: 1300,
                difficulty: "summoned",
                element: "normal"
            },
            tacoBandit: {
                name: "Taco Bandit",
                abilities: ["attack", "attack", "enemyshock", "enemyshock", "orchatasip"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 230,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 550,
                attackDmg: 400,
                magicDmg: 400,
                armor: 550,
                spirit: 450,
                difficulty: "summoned",
                element: "normal"
            },
            slotsGambler: {
                name: "Slots Gambler",
                abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 400,
                magicDmg: 400,
                armor: 350,
                spirit: 550,
                difficulty: "summoned",
                element: "normal"
            },
            angryMobMember: {
                name: "Angry Mob Member",
                abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 190,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 280,
                attackDmg: 400,
                magicDmg: 400,
                armor: 450,
                spirit: 370,
                difficulty: "summoned",
                element: "normal"
            },
            badChef: {
                name: "Bad Chef",
                abilities: ["attack", "attack", "poison", "poison", "barrier"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                    attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                    abilities: []
                },
                hpPerPartyMember: 190,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 390,
                effectsOnDeath: [
                    "explode"
                ],
                attackDmg: 400,
                magicDmg: 400,
                armor: 400,
                spirit: 320,
                difficulty: "summoned",
                element: "normal"
            },
            footballPlayer: {
                name: "Football Player",
                abilities: ["attack", "attack", "slash", "slash", "rockthrow", "empower"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 145,
                            magicDmgPlus : 145,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [120, 200, 300, 540, 790, 975, 1275, 1600, 2000, 2500],
                        magicDmgPlus : [120, 200, 300, 540, 790, 975, 1275, 1600, 2000, 2500]
                    },
                    hp: [6500, 11900, 17000, 25000, 34000, 48000, 62000, 87000, 105000, 135000 ],
                    attackDmg: [800, 1300, 1700, 2500, 3500, 4400, 5500, 6500, 7500, 8500],
                    magicDmg: [800, 1300, 1700, 2500, 3500, 4400, 5500, 6500, 7500, 8500],
                    abilities: []
                },
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6400,
                attackDmg: 500,
                magicDmg: 500,
                armor: 1000,
                spirit: 1000,
                difficulty: "summoned-boss",
                element: "normal"
            },
            escapedRobot: {
                name: "Escaped Robot",
                abilities: [
                    "attack", "attack", "drain", "drain", "iceshards", "iceshards", "shield"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [120, 200, 300, 540, 790],
                        magicDmgPlus : [120, 200, 300, 540, 790]
                    },
                    hp: [11500, 15900, 24900, 31000, 47000 ],
                    attackDmg: [800, 1300, 1700, 2500, 3500],
                    magicDmg: [800, 1300, 1700, 2500, 3500],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6900,
                attackDmg: 310,
                magicDmg: 310,
                armor: 1100,
                spirit: 1000,
                difficulty: "boss",
                element: "normal"
            },
            vampire: {
                name: "Vampire",
                abilities: [
                   "attack", "attack", "rockthrow", "rockthrow", "enemyshock", "enemyshock", "tacowall"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    frenzy: {
                        attackDmgPlus : [120, 200, 300, 540, 790],
                        magicDmgPlus : [120, 200, 300, 540, 790]
                    },
                    hp: [4500, 7900, 12900, 16500, 21000, 27500, 36000, 46000, 57500, 70000, 83000  ],
                    attackDmg: [800, 1300, 1600, 2100, 2800, 3400, 4200, 5000, 6000, 7500 ],
                    magicDmg: [800, 1300, 1700, 2500, 3500, 3400, 4200, 5000, 6000, 7500],
                    abilities: []
                },
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "removeEntomb"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 7900,
                attackDmg: 437,
                magicDmg: 410,
                armor: 1300,
                spirit: 900,
                difficulty: "summoned-boss",
                element: "normal"
            }
        },
        easy : {
            rabbidwolf: {
                name: "Rabbid Wolf",
                abilities: ["attack", "attack", "poison", "poison", "tacowall"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            hungryboar: {
                name: "Hungry Boar",
                //emoji: "<:wendigo:598743668664565789>",
                abilities: ["bite", "bite", "slash", "slash", "shield"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            bull: {
                name: "Bull",
                abilities: ["ram", "ram", "assist", "assist", "empower"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            cheetah: {
                name: "Cheetah",
                abilities: ["claw", "claw", "claw", "claw", "protect"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            hyena: {
                name: "Hyena",
                //emoji: "<:wendigo:598743668664565789>",
                abilities: ["ferociousBite", "ferociousBite", "iceshards", "iceshards", "barrier"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents: [
                    
                ],
                effectsOnDeath: [
                    
                ],
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            addict: {
                name: "Addict",
                abilities: ["inject", "inject", "orchatasip", "inject", "bandaid"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            angrydwarf: {
                name: "Angry Dwarf",
                abilities: ["bite", "bite", "poke", "poke", "poke"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            extremist: {
                name: "Extremist",
                abilities: ["attack", "attack", "hostage", "hostage", "bomb"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            thug: {
                name: "Thug",
                abilities: ["attack", "attack", "punch", "punch", "bandaid"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            tacosmuggler: {
                name: "Taco Smuggler",
                abilities: ["clap", "clap", "curse", "curse", "clap"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "starve"
                ],
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            seedthief: {
                name: "Seed Thief",
                abilities: ["attack", "attack", "tacoheal", "tacoheal", "poke"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 60,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            badchef: {
                name: "Bad Chef",
                abilities: ["attack", "attack", "poison", "poison", "barrier"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 170,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 390,
                effectsOnDeath: [
                    "explode"
                ],
                attackDmg: 75,
                magicDmg: 97,
                armor: 400,
                spirit: 320,
                difficulty: "easy",
                element: "normal"
            },
            vagabond: {
                name: "Vagabond",
                abilities: ["attack", "attack", "flameblast", "flameblast", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                
                hpPerPartyMember: 170,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 390,
                effectsOnDeath: [
                    
                ],
                attackDmg: 75,
                magicDmg: 97,
                armor: 400,
                spirit: 320,
                difficulty: "easy",
                element: "normal"
            },
            coyote: {
                name: "Coyote",
                abilities: ["attack", "attack", "claw", "claw", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 170,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 390,
                effectsOnDeath: [
                  
                ],
                attackDmg: 75,
                magicDmg: 97,
                armor: 400,
                spirit: 320,
                difficulty: "easy",
                element: "normal"
            },
            angrymobmember: {
                name: "Angry Mob Member",
                abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 110,
                adPerPartyMember: 7,
                mdPerPartyMember: 7,
                hp: 280,
                attackDmg: 80,
                magicDmg: 75,
                armor: 450,
                spirit: 370,
                difficulty: "easy",
                element: "normal"
            },
            tacodealer: {
                name: "Taco Dealer",
                abilities: ["attack", "attack", "drain", "drain", "freeze"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 230,
                attackDmg: 60,
                magicDmg: 79,
                armor: 290,
                spirit: 400,
                difficulty: "easy",
                element: "normal"
            },
            burritohustler: {
                name: "Burrito Hustler",
                abilities: ["attack", "attack", "slap", "slap", "weaken"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 230,
                attackDmg: 60,
                magicDmg: 79,
                armor: 290,
                spirit: 400,
                difficulty: "easy",
                element: "normal"
            },
            ruffian: {
                name: "Ruffian",
                abilities: ["attack", "attack", "tackle", "tackle", "weaken"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 230,
                attackDmg: 60,
                magicDmg: 79,
                armor: 290,
                spirit: 400,
                difficulty: "easy",
                element: "normal"
            }
        },
        medium: {
            tacobandit: {
                name: "Taco Bandit",
                //emoji: "<:wendigo:598743668664565789>",
                abilities: ["attack", "attack", "enemyshock", "enemyshock", "orchatasip"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 230,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 550,
                attackDmg: 120,
                magicDmg: 90,
                armor: 550,
                spirit: 450,
                difficulty: "medium",
                element: "normal"
            },
            tacothief: {
                name: "Taco Thief",
                abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 250,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 580,
                attackDmg: 80,
                magicDmg: 120,
                armor: 350,
                spirit: 450,
                difficulty: "medium",
                element: "normal"
            },
            slotsgambler: {
                name: "Slots Gambler",
                abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "decayDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            fruitscounter: {
                name: "Fruits Counter",
                abilities: ["attack", "attack", "uppercut", "uppercut", "weaken"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            disassembler: {
                name: "Disassembler",
                abilities: ["clap", "clap", "scam", "scam", "weaken"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            nigerianprince: {
                name: "Nigerian Prince",
                abilities: ["scam", "scam", "scam", "elixir", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            troglodyte: {
                name: "Troglodyte",
                abilities: ["punch", "punch", "claw", "claw", "scold"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            ignoramus: {
                name: "Ignoramus",
                abilities: ["scare", "scare", "punch", "punch", "freeze"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            dullard: {
                name: "Dullard",
                abilities: ["ram", "ram", "claw", "claw", "protect"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "summonTorturedRobotsDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            dolt: {
                name: "Dolt",
                abilities: ["attack", "attack", "slash", "slash", "cripple"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "starve"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            auctionsniper: {
                name: "Auction Sniper",
                abilities: ["scam", "scam", "bandaid", "empower", "freeze"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            marketflipper: {
                name: "Market Flipper",
                abilities: ["scam", "scam", "iceshards", "iceshards", "scold"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            bear: {
                name: "Bear",
                //emoji: "<:wendigo:598752209475207178>",
                abilities: ["ferociousBite", "ferociousBite", "ferociousBite", "ferociousBite", "shield"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            polarbear: {
                name: "Polar Bear",
                abilities: ["ferociousBite", "ferociousBite", "ferociousBite", "iceshards", "shield"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            philistine: {
                name: "Philistine",
                abilities: ["clap", "clap", "clap", "smuggle", "poke"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "burst"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            suicidebomber: {
                name: "Suicidebomber",
                abilities: ["attack", "cripple", "cripple", "weaken", "bomb"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode",
                    "explode",
                    "explode",
                    "explode"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            witch: {
                name: "Witch",
                abilities: ["curse", "curse", "guac", "guac", "scold"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "totemOfDoomDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            tarzan: {
                name: "Tarzan",
                abilities: ["claw", "claw", "hostage", "hostage", "elixir"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            evilclown: {
                name: "Evil Clown",
                abilities: ["scare", "scare", "corrupt", "corrupt", "hostage"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "decayDeath"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            charlatan: {
                name: "Charlatan",
                abilities: ["attack", "attack", "claw", "claw", "weaken"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
            tweener: {
                name: "Tweener",
                abilities: ["smuggle", "smuggle", "inject", "inject", "claw"],
                buffs: [],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 190,
                adPerPartyMember: 14,
                mdPerPartyMember: 14,
                hp: 640,
                attackDmg: 90,
                magicDmg: 90,
                armor: 350,
                spirit: 550,
                difficulty: "medium",
                element: "normal"
            },
        },
        hard: {
            silverback: {
                name: "Silverback",
                abilities: ["ferociousBite", "claw", "slash", "slash", "cripple"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                effectsOnDeath: [
                    "empowerDeath"
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                hpPerPartyMember: 950,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 750,
                attackDmg: 200,
                magicDmg: 200,
                armor: 650,
                spirit: 650,
                difficulty: "hard",
                element: "normal"
            },
            footballplayer: {
                name: "Football Player",
                abilities: ["attack", "attack", "slash", "slash", "rockthrow", "empower"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 950,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 750,
                attackDmg: 200,
                magicDmg: 200,
                armor: 650,
                spirit: 650,
                difficulty: "hard",
                element: "normal"
            },
            samuraiwarrior: {
                name: "Samurai Warrior",
                abilities: ["attack", "attack", "iceshards", "iceshards", "drain", "drain", "bandaid"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 700,
                attackDmg: 170,
                magicDmg: 123,
                armor: 750,
                spirit: 600,
                difficulty: "hard",
                element: "normal"
            },
            warewolf: {
                name: "Werewolf",
                abilities: ["attack", "attack", "ferociousBite", "ferociousBite", "uppercut"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empowerDeath"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 700,
                attackDmg: 170,
                magicDmg: 123,
                armor: 750,
                spirit: 600,
                difficulty: "hard",
                element: "normal"
            },
            prawn: {
                name: "Prawn",
                abilities: ["attack", "attack", "ferociousBite", "ferociousBite", "uppercut"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                // summon prawn minions
                effectsOnDeath: [
                    "summonTorturedRobotsDeath"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 700,
                attackDmg: 170,
                magicDmg: 123,
                armor: 750,
                spirit: 600,
                difficulty: "hard",
                element: "normal"
            },
            funnypolitician: {
                name: "Funny Politician",
                abilities: ["attack" , "attack" , "curse", "poison", "enemyshoot", "enemyshoot","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            voodoowitch: {
                name: "Voodoo Witch",
                abilities: ["attack" , "attack" , "curse", "curse", "poison", "poison", "freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                // summon totems
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents: [
                    "hexNormie",
                ],
                effectsOnDeath: [
                    "totemOfDoomDeath",
                    "totemOfDoomDeath",
                    "totemOfDoomDeath"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            sniper: {
                name: "Sniper",
                abilities: ["attack"  , "punch", "enemyshoot", "enemyshoot", "enemyshoot","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "decayDeath"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            gascollector: {
                name: "Gas Collector",
                abilities: ["attack" , "attack" , "poison", "poison", "inject", "inject","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            capo: {
                name: "Capo",
                abilities: ["punch" , "punch" , "hostage", "hostage", "decapitate", "tacoheal", "weaken"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents: [
                    "hexNormie",
                ],
                effectsOnDeath: [
                    "burst"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            zeta: {
                name: "Zeta",
                abilities: ["attack"  , "punch", "decapitate", "decapitate","weaken"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "burst"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            racketeer: {
                name: "Racketeer",
                abilities: ["scare" , "scare" , "shoot", "shoot", "bomb", "bomb","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "healAll"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            tacopirate: {
                name: "Taco Pirate",
                abilities: ["claw" , "claw" , "hostage", "hostage","empower"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            walrus: {
                name: "Walrus",
                abilities: ["ferociousBite" , "ferociousBite" , "iceshards", "iceshards","freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            wendigo: {
                name: "Wendigo",
                emoji: "<:wendigo:598743668664565789>",
                abilities: ["ferociousBite" , "ferociousBite" , "iceshards", "iceshards", "freeze"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empower"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            iconoclast: {
                name: "Iconoclast",
                abilities: ["slap" , "slap" , "scam", "slash", "slash", "cripple"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                // summon normal enemies
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            mountainlion: {
                name: "Mountain Lion",
                abilities: ["ferociousBite" , "ferociousBite" , "ferociousBite", "slash", "slash", "cripple"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "decayDeath"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            delinquent: {
                name: "Delinquent",
                abilities: ["drain" , "drain" , "smuggle", "smuggle", "corrupt", "currupt"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "explode"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            distributor: {
                name: "Distributor",
                abilities: ["punch" , "punch" , "curse", "poison", "poison", "inject", "shield"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empower"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
            ogre: {
                name: "Ogre",
                abilities: ["punch" , "punch" , "curse", "poison", "poison", "inject", "shield"],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                effectsOnDeath: [
                    "empower"
                ],
                hpPerPartyMember: 1090,
                adPerPartyMember: 21,
                mdPerPartyMember: 21,
                hp: 650,
                attackDmg: 125,
                magicDmg: 170,
                armor: 600,
                spirit: 900,
                difficulty: "hard",
                element: "normal"
            },
        },
        boss: {
            vampire: {
                name: "Vampire",
                abilities: [
                   "attack", "attack", "rockthrow", "rockthrow", "enemyshock", "enemyshock", "tacowall"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1458,
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
            viking: {
                name: "Viking",
                abilities: [
                   "attack", "attack", "tackle", "tackle", "tackle", "slash", "slash", "slash","empower"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 95,
                            magicDmgPlus : 95,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1458,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                hp: 900,
                attackDmg: 250,
                magicDmg: 170,
                armor: 1200,
                spirit: 1100,
                difficulty: "boss",
                element: "normal"
            },
            escapedrobot: {
                name: "Escaped Robot",
                abilities: [
                    "attack", "attack", "drain", "drain", "iceshards", "iceshards", "shield"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1253,
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
            desperado: {
                name: "Desperado",
                abilities: [
                    "attack", "attack", "enemyshoot", "enemyshoot", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            sicario: {
                name: "Sicario",
                abilities: [
                    "attack", "punch", "decapitate", "decapitate", "slash", "tacoheal", "tacoheal"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            trex: {
                name: "T-Rex",
                abilities: [
                    "claw", "claw", "ferociousBite", "slash", "slash", "ferociousBite", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            executioner: {
                name: "Executioner",
                abilities: [
                    "attack", "attack", "execute", "execute", "tacoheal", "tacoheal", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                effectsOnDeath: [
                    "reanimateAll"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            kidnaper: {
                name: "Kidnaper",
                abilities: [
                    "attack", "attack", "execute", "execute", "slash", "slash", "weaken"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            yakuza: {
                name: "Yakuza",
                abilities: [
                    "attack", "attack", "execute", "execute", "slash", "slash", "weaken"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                effectsOnDeath: [
                    "reanimateAll"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            beheader: {
                name: "Beheader",
                abilities: [
                    "attack", "attack", "decapitate", "decapitate", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            goliath: {
                name: "Goliath",
                abilities: [
                    "ram", "ram", "clap", "clap", "iceshards", "iceshards", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            cyclops: {
                name: "Cyclops",
                abilities: [
                    "corrupt", "corrupt", "laserBeam", "laserBeam", "laserBeam", "laserBeam", "shell"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            bigfoot: {
                name: "Big Foot",
                abilities: [
                    "attack", "attack", "iceshards", "iceshards", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            cateoblepas: {
                name: "Catoblepas",
                abilities: [
                    "attack", "attack", "iceshards", "iceshards", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            gargantua: {
                name: "Big Foot",
                abilities: [
                    "attack", "attack", "iceshards", "iceshards", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
            ogremagi: {
                name: "Ogre Magi",
                abilities: [
                    "attack", "attack", "iceshards", "iceshards", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                keystoneStats: {
                    hp: [1200, 3500, 6200, 10000, 15000 ],
                    attackDmg: [300, 500, 900, 1500, 2300],
                    magicDmg: [300, 500, 900, 1500, 2300],
                    abilities: []
                },
                endOfTurnEvents : [
                    "echo",
                    "focus"
                ],
                hpPerPartyMember: 1222,
                hp: 950,
                adPerPartyMember: 29,
                mdPerPartyMember: 29,
                attackDmg: 240,
                magicDmg: 190,
                armor: 1600,
                spirit: 1600,
                difficulty: "boss",
                element: "normal"
            },
        },
        // time travel, demonic summoning, abraham lincolns tomb, evil exes
        
        special: {
            "genghis khan": [
                {
                    name: "Genghis Khan",
                    xp: 43,
                    abilities: [
                        "attack",
                        "slash",
                        "uppercut",
                        "empower"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
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
                    abilityOrder: [
                        0, 2, 1, 0, 2, 3, [1,2], 0
                    ],
                    hp: 18500,
                    attackDmg: 740,
                    magicDmg: 510,
                    armor: 2750,
                    spirit: 2500,
                    difficulty: "special",
                    element: "normal"
                },
                {
                    name: "Subutai",
                    abilities: [
                        "attack",
                        "attack",
                        "tackle",
                        "tackle",
                        "poke",
                        "cripple"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 60,
                                magicDmgPlus : 60,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    effectsOnDeath: [
                        "explode"
                    ],
                    hp: 8500,
                    attackDmg: 555,
                    magicDmg: 500,
                    armor: 2500,
                    spirit: 2300,
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
                    effectsOnDeath: [
                        "explode"
                    ],
                    buffs: [],
                    hp: 6000,
                    attackDmg: 410,
                    magicDmg: 470,
                    armor: 1800,
                    spirit: 1800,
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
                    hp: 6000,
                    attackDmg: 130,
                    magicDmg: 110,
                    armor: 1400,
                    spirit: 1400,
                    difficulty: "special",
                    element: "normal"
                }
            ],
            "asteroid": [
                {
                    name: "Asteroid Golem",
                    xp: 30,
                    abilities: [
                        "attack",
                        "rockthrow",
                        "slash",
                        "poke",
                        "shield",
                        "meteor"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 105,
                                magicDmgPlus : 105,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 3, 2, 4, 1, 0, 5, 1, 5
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "explode",
                        "echo"
                    ],
                    hp: 15600,
                    attackDmg: 480,
                    magicDmg: 470,
                    armor: 2500,
                    spirit: 10500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Stone Giant",
                    xp: 30,
                    abilities: [
                        "attack",
                        "rockthrow",
                        "slash",
                        "poke",
                        "tacowall",
                        "quake"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 105,
                                magicDmgPlus : 105,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    abilityOrder: [
                        1, 0, 2, 3, 4, 0, 0, 1, 5, 5
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "explode"
                    ],
                    hp: 15600,
                    attackDmg: 480,
                    magicDmg: 470,
                    armor: 10750,
                    spirit: 2500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Asteroid Boulder",
                    abilities: ["attack", "attack", "rockthrow", "rockthrow", "slash", "protect"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 260,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Asteroid Boulder",
                    abilities: ["attack", "attack", "rockthrow", "rockthrow", "slash", "protect"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 260,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "island": [
                {
                    name: "Robot Overlord",
                    xp: 150,
                    abilities: [
                        "laserBeam",
                        "poke",
                        "crush",
                        "destructionBeam"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 95,
                                magicDmgPlus : 95,
                                everyNTurns: 3,
                                startTurn: 4
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 0, 2, 0, 2, 0, 0, 2, 0,
                        3, 3, 3, 3, 3, 3, 3, 3, 3, 3
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "summonEscapedRobot",
                        "echo"
                    ],
                    hp: 41600,
                    attackDmg: 700,
                    magicDmg: 470,
                    armor: 2350,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Tormented Robot",
                    abilities: [
                        "attack",
                        "attack",
                        "curse",
                        "curse",
                        "bomb",
                        "bomb",
                        "tacowall"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 75,
                                magicDmgPlus : 75,
                                everyNTurns: 3,
                                startTurn: 5
                            }
                        }
                    ],
                    hp: 4600,
                    attackDmg: 500,
                    magicDmg: 470,
                    armor: 2150,
                    spirit: 1900,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Escaped Robot",
                    abilities: [
                        "attack",
                        "attack",
                        "iceshards",
                        "iceshards",
                        "drain",
                        "drain"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 85,
                                magicDmgPlus : 85,
                                everyNTurns: 3,
                                startTurn: 6
                            }
                        }
                    ],
                    endOfTurnEvents : [
                        "focus"
                    ],
                    hp: 9600,
                    attackDmg: 500,
                    magicDmg: 470,
                    armor: 2350,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "T-1000",
                    abilities: [
                        "attack",
                        "enemyshoot",
                        "enemyshoot",
                        "poke",
                        "barrier"
                    ],
                    buffs: [
                    ],
                    hp: 4600,
                    attackDmg: 400,
                    magicDmg: 370,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                }
            ],
            "corruptedOvermind": [
                {
                    name: "Corrupted Overmind",
                    xp: 1350,
                    abilities: [
                        "corrupt",
                        "enemyshock",
                        "curse",
                        "freeze"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:overmind:479298213904646147>",
                            onTurnEnd: {
                                attackDmgPlus : 400,
                                magicDmgPlus : 400,
                                everyNTurns: 10,
                                startTurn: 8
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 0, 1, 2, [0, 1, 3], 0, 1, 1
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "vacum1",
                        "vacum2",
                        "vacum3",
                        "superNovaPrepare",
                        "superNova"
                    ],
                    hp: 337673,
                    attackDmg: 700,
                    magicDmg: 370,
                    armor: 2150,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Overmind Minion",
                    abilities: [
                        "attack",
                        "attack",
                        "curse",
                        "curse",
                        "flameblast",
                        "scold"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 80,
                                magicDmgPlus : 80,
                                everyNTurns: 3,
                                startTurn: 3
                            }
                        }
                    ],
                    effectsOnDeath: [
                        "radiation",
                        "explode"
                    ],
                    hp: 21600,
                    attackDmg: 400,
                    magicDmg: 370,
                    armor: 1350,
                    spirit: 1100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Dark Matter",
                    abilities: [
                        "attack",
                        "attack",
                        "disintegrate",
                        "guac",
                        "curse",
                        "weaken"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 75,
                                magicDmgPlus : 75,
                                everyNTurns: 3,
                                startTurn: 4
                            }
                        }
                    ],
                    endOfTurnEvents : [
                        "focus"
                    ],
                    effectsOnDeath: [
                        "radiation",
                        "bendersLastWish"
                    ],
                    hp: 41600,
                    attackDmg: 400,
                    magicDmg: 370,
                    armor: 1350,
                    spirit: 1000,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Overcharged Neutrino",
                    abilities: [
                        "attack",
                        "attack",
                        "poison",
                        "poison",
                        "elixir",
                        "elixir",
                        "cripple"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 55,
                                magicDmgPlus : 55,
                                everyNTurns: 3,
                                startTurn: 5
                            }
                        }
                    ],
                    effectsOnDeath: [
                        "radiation"
                    ],
                    hp: 9600,
                    attackDmg: 350,
                    magicDmg: 270,
                    armor: 1450,
                    spirit: 1100,
                    difficulty: "special",
                    element: "earth"
                }
            ],
            "hounds": [
                {
                    name: "Pack Leader",
                    xp: 38,
                    abilities: [
                        "ferociousBite",
                        "claw",
                        "slash",
                        "protect"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 90,
                                magicDmgPlus : 90,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 2, 1, 2, 0, 2, 1, 0, [0, 1, 3], 2
                    ],
                    endOfTurnEvents : [
                        "echo"
                    ],
                    hp: 18600,
                    attackDmg: 500,
                    magicDmg: 470,
                    armor: 2350,
                    spirit: 1900,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Blood Hound",
                    abilities: ["attack", "attack", "claw", "claw", "tackle", "weaken"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 7350,
                    attackDmg: 160,
                    magicDmg: 175,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Blood Hound",
                    abilities: ["attack", "attack", "claw", "claw", "tackle", "weaken"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 7350,
                    attackDmg: 160,
                    magicDmg: 175,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Starved Hound",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 9350,
                    attackDmg: 160,
                    magicDmg: 175,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Starved Hound",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 9350,
                    attackDmg: 160,
                    magicDmg: 175,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "vampireSwarm": [
                {
                    name: "Enraged Vampire",
                    xp: 73,
                    abilities: [
                        "ferociousBite",
                        "rockthrow",
                        "iceshards",
                        "drain",
                        "shield"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 105,
                                magicDmgPlus : 105,
                                everyNTurns: 3,
                                startTurn: 3
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 0, 1, 0, 3, 2, 0, 2
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "echo"
                    ],
                    hp: 31600,
                    attackDmg: 300,
                    magicDmg: 270,
                    armor: 2750,
                    spirit: 2500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Vampire",
                    abilities: [
                    "attack", "attack", "drain", "drain", "enemyshock", "enemyshock", "tacowall"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 85,
                                magicDmgPlus : 85,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    endOfTurnEvents : [
                        "focus"
                    ],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 29,
                    mdPerPartyMember: 29,
                    hp: 12800,
                    attackDmg: 177,
                    magicDmg: 290,
                    armor: 2300,
                    spirit: 1900,
                    difficulty: "special",
                    element: "normal"
                },
                {
                    name: "Vampiric Knight",
                    abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 60,
                    magicDmg: 75,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "medium",
                    element: "normal"
                },
                {
                    name: "Vampiric Knight",
                    abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 60,
                    magicDmg: 75,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "medium",
                    element: "normal"
                },
                {
                    name: "Vampiric Knight",
                    abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 60,
                    magicDmg: 75,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "medium",
                    element: "normal"
                }
            ],
            "gateKeeper": [
                {
                    name: "The Gatekeeper",
                    xp: 290,
                    abilities: [
                        "attack",
                        "crush",
                        "poke"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 100,
                                magicDmgPlus : 100,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 0, 1, 2, 1, 0, 1, 0, 1
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "echo",
                        "deepHatred",
                        "decay",
                        "vampire75",
                        "entomb75",
                        "vampire50",
                        "vampire50",
                        "entomb50",
                        "vampire25",
                        "vampire25",
                        "vampire25",
                        "entomb25"
                    ],
                    hp: 38600,
                    attackDmg: 620,
                    magicDmg: 470,
                    armor: 2350,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Vampiric Knight",
                    abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 3150,
                    attackDmg: 360,
                    magicDmg: 475,
                    armor: 1250,
                    spirit: 1170,
                    difficulty: "medium",
                    element: "normal"
                },
                {
                    name: "Starved Hound",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 360,
                    magicDmg: 475,
                    armor: 1150,
                    spirit: 1270,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Vampiric Knight",
                    abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 3150,
                    attackDmg: 360,
                    magicDmg: 475,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "medium",
                    element: "normal"
                },
                {
                    name: "Starved Hound",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 360,
                    magicDmg: 475,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "vampireCouncil": [
                {
                    name: "Archvampire",
                    xp: 1480,
                    abilities: [
                        "ferociousBite",
                        "uppercut",
                        "poison",
                        "poke"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 305,
                                magicDmgPlus : 305,
                                everyNTurns: 8,
                                startTurn: 6
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 2, 3, 0, 0, 1, 2, 0
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "archvampireRevive",
                        "fever",
                        "suckBlood"
                    ],
                    hp: 51600,
                    attackDmg: 800,
                    magicDmg: 770,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Frenzied Vampire",
                    abilities: [
                        "attack",
                        "rockthrow",
                        "slash",
                        "poke",
                        "weaken"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 85,
                                magicDmgPlus : 85,
                                everyNTurns: 3,
                                startTurn: 4
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 2, 3, 4, 0, 1, 2, 0
                    ],
                    hp: 13600,
                    attackDmg: 470,
                    magicDmg: 300,
                    armor: 1450,
                    spirit: 1200,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Blood King",
                    abilities: [
                        "attack",
                        "rockthrow",
                        "iceshards",
                        "poke",
                        "cripple"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 85,
                                magicDmgPlus : 85,
                                everyNTurns: 3,
                                startTurn: 5
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 2, 1, 3, 4, 0, 2, 1, 0
                    ],
                    hp: 13600,
                    attackDmg: 300,
                    magicDmg: 470,
                    armor: 1250,
                    spirit: 1400,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Immortality Seeker",
                    abilities: ["attack", "attack","attack", "flameblast", "flameblast", "iceshards", "freeze"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 360,
                    magicDmg: 375,
                    armor: 1050,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Immortality Seeker",
                    abilities: ["attack", "attack","attack", "flameblast", "flameblast", "iceshards", "scold"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 360,
                    magicDmg: 375,
                    armor: 1050,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "legion": [
                {
                    name: "Servant of Andromalius",
                    xp: 100,
                    abilities: [
                        "attack",
                        "rockthrow",
                        "slash",
                        "poke"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 135,
                                magicDmgPlus : 135,
                                everyNTurns: 3,
                                startTurn: 3
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 1, 1, 3, 2, 2, 0, 2, 1
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "echo",
                        "hex",
                        "hex",
                        "hex",
                        "summonChupacabra"
                    ],
                    hp: 30600,
                    attackDmg: 600,
                    magicDmg: 670,
                    armor: 2450,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Chupacabra",
                    abilities: ["attack", "attack", "curse", "curse", "guac", "protect"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 260,
                    magicDmg: 275,
                    armor: 1150,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Tormentor",
                    abilities: ["attack", "attack", "rockthrow", "rockthrow", "slash", "protect"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 260,
                    magicDmg: 275,
                    armor: 1150,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Reanimated Headless Chicken",
                    abilities: ["attack", "attack", "curse", "curse", "poison", "protect"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 8350,
                    attackDmg: 360,
                    magicDmg: 275,
                    armor: 1150,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Three Headed Beast",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "poison", "protect"],
                    buffs: [],
                    hpPerPartyMember: 0,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 2350,
                    attackDmg: 260,
                    magicDmg: 375,
                    armor: 1150,
                    spirit: 1170,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "andromalius": [
                {
                    name: "Andromalius",
                    xp: 580,
                    abilities: [
                        "attack",
                        "flameblast",
                        "poison",
                        "poke"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 95,
                                magicDmgPlus : 95,
                                everyNTurns: 3,
                                startTurn: 4
                            }
                        }
                    ],
                    abilityOrder: [
                        0, 1, 2, 3, 0, 0, 2, 1, 0, 0, 0
                    ],
                    endOfTurnEvents : [
                        "focus",
                        "soulBurn",
                        "totemOfDoom80",
                        "totemOfDoom60",
                        "totemOfDoom60",
                        "totemOfDoom40",
                        "totemOfDoom40",
                        "totemOfDoom40",
                        "totemOfDoom20",
                        "totemOfDoom20",
                        "totemOfDoom20",
                        "totemOfDoom20",
                    ],
                    hp: 52600,
                    attackDmg: 700,
                    magicDmg: 670,
                    armor: 2350,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Three Headed Beast",
                    abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "poison", "protect"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 8350,
                    attackDmg: 360,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Demonic Presence",
                    abilities: ["attack", "attack", "poke", "poke", "poke", "protect"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 4350,
                    attackDmg: 360,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Diabloic Ghoul",
                    abilities: ["attack", "ferociousBite", "rockthrow", "drain", "slash", "barrier"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 5350,
                    attackDmg: 360,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                },
                {
                    name: "Zombie",
                    abilities: ["claw", "claw", "rockthrow", "rockthrow", "slash", "protect"],
                    buffs: [],
                    hpPerPartyMember: 130,
                    adPerPartyMember: 8,
                    mdPerPartyMember: 8,
                    hp: 3350,
                    attackDmg: 360,
                    magicDmg: 275,
                    armor: 1450,
                    spirit: 1370,
                    difficulty: "easy",
                    element: "normal"
                }
            ],
            "evilExes": [
                {
                    name: "Seventh Evil Ex",
                    xp: 135,
                    abilities: [
                        "attack",
                        "attack",
                        "tackle",
                        "tackle",
                        "slash",
                        "slash",
                        "poke",
                        "shield"
                    ],
                    //TODO: debuff that keeps on doing more damage overtime on the tank, if it gets bandaided the enemy gains frenzy, if the tank dies the group explodes
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 145,
                                magicDmgPlus : 145,
                                everyNTurns: 3,
                                startTurn: 4
                            }
                        }
                    ],
                    // 
                    endOfTurnEvents : [
                        "focus",
                        "echo"
                    ],
                    hp: 37600,
                    attackDmg: 400,
                    magicDmg: 370,
                    armor: 2150,
                    spirit: 2100,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Evil Ex Twins",
                    abilities: [
                        "attack",
                        "attack",
                        "flameblast",
                        "flameblast",
                        "enemyshoot",
                        "enemyshoot",
                        "poke",
                        "cripple"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 70,
                                magicDmgPlus : 70,
                                everyNTurns: 2,
                                startTurn: 3
                            }
                        }
                    ],
                    endOfTurnEvents : [
                        "focus"
                    ],
                    hp: 14600,
                    attackDmg: 400,
                    magicDmg: 370,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "First Evil Ex",
                    abilities: [
                        "attack",
                        "attack",
                        "rockthrow",
                        "rockthrow",
                        "curse",
                        "bandaid",
                        "weaken"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 55,
                                magicDmgPlus : 55,
                                everyNTurns: 2,
                                startTurn: 2
                            }
                        }
                    ],
                    hp: 7600,
                    attackDmg: 500,
                    magicDmg: 370,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                },
                {
                    name: "Second Evil Ex",
                    abilities: [
                        "attack",
                        "attack",
                        "poison",
                        "poison",
                        "elixir",
                        "orchatasip",
                        "poke",
                        "scold"
                    ],
                    buffs: [
                        {
                            name: "frenzy",
                            emoji: "<:frenzy:479298214453968896>",
                            onTurnEnd: {
                                attackDmgPlus : 55,
                                magicDmgPlus : 55,
                                everyNTurns: 2,
                                startTurn: 1
                            }
                        }
                    ],
                    hp: 7600,
                    attackDmg: 300,
                    magicDmg: 470,
                    armor: 1750,
                    spirit: 1500,
                    difficulty: "special",
                    element: "earth"
                }
            ]
        },
        challenge: {
            1: {
                challengeId: "escapedrobot",
                keystoneUnlockName: "Robotic Keystone",
                avatar: "https://i.imgur.com/6fzApmM.png",
                enemies: [
                    {
                        name: "Angry Mob Member",
                        abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 130,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 350,
                        attackDmg: 60,
                        magicDmg: 75,
                        armor: 450,
                        spirit: 370,
                        difficulty: "easy",
                        element: "normal"
                    },
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1500, 4500, 7200, 14000, 18000, 23500, 37000, 55000, 80000, 115000 ],
                            attackDmg: [300, 500, 800, 1400, 2100, 3400, 4500, 5500, 6500, 7500 ],
                            magicDmg: [400, 650, 1000, 1900, 2800, 3400, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "explode"
                        ],
                        hpPerPartyMember: 210,
                        adPerPartyMember: 16,
                        mdPerPartyMember: 16,
                        hp: 490,
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
                        keystoneStats: {
                            hp: [1200, 3500, 6100, 8000, 14000, 21400, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 130,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 16,
                        hp: 540,
                        attackDmg: 90,
                        magicDmg: 100,
                        armor: 350,
                        spirit: 550,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Samurai Warrior",
                        abilities: ["attack", "attack", "iceshards", "iceshards", "drain", "drain", "bandaid"],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [80, 140, 230, 380, 750, 975, 1275, 1600, 2000, 2500],
                                magicDmgPlus : [80, 140, 230, 380, 750, 975, 1275, 1600, 2000, 2500]
                            },
                            hp: [1500, 3900, 6900, 21000, 35000, 52000, 72000, 97000, 120000, 150000 ],
                            attackDmg: [300, 500, 900, 1700, 3300, 4400, 5500, 6500, 7500, 8500 ],
                            magicDmg: [300, 500, 900, 1700, 3300, 4400, 5500, 6500, 7500, 8500],
                            abilities: []
                        },
                        hpPerPartyMember: 1190,
                        adPerPartyMember: 18,
                        mdPerPartyMember: 18,
                        hp: 900,
                        attackDmg: 140,
                        magicDmg: 93,
                        armor: 750,
                        spirit: 600,
                        difficulty: "hard",
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
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [120, 180, 300, 540, 820, 1300, 1500, 1700, 1900, 2100],
                                magicDmgPlus : [120, 180, 300, 540, 820, 1300, 1500, 1700, 1900, 2100]
                            },
                            hp: [3500, 7900, 14900, 31000, 55000, 87205, 102000, 127000, 150000, 190000 ],
                            attackDmg: [800, 1200, 1900, 2700, 4300, 5500, 6500, 7500, 8500, 9500],
                            magicDmg: [800, 1200, 1900, 2700, 4300, 5500, 6500, 7500, 8500, 9500],
                            abilities: []
                        },
                        endOfTurnEvents : [
                            "echo",
                            "focus"
                        ],
                        hpPerPartyMember: 1653,
                        adPerPartyMember: 31,
                        mdPerPartyMember: 31,
                        hp: 1200,
                        attackDmg: 250,
                        magicDmg: 230,
                        armor: 1300,
                        spirit: 1400,
                        difficulty: "boss",
                        element: "normal"
                    },
                ],
                points: 23,
                xppoints: 23,
                lootcount: 5,
                keystonePoints: [300, 2100, 5030, 10030, 15030, 25000, 40000, 60000, 90000, 135000],
                difficulty: 1
            },
            2: {
                challengeId: "desperado",
                keystoneUnlockName: "Canister Keystone",
                avatar: "https://i.imgur.com/GC2VoCW.jpg",
                enemies: [
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "explode"
                        ],
                        hpPerPartyMember: 200,
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
                        name: "Taco Bandit",
                        abilities: ["attack", "attack", "enemyshock", "enemyshock", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 37000, 55000, 80000, 115000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 180,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 350,
                        attackDmg: 120,
                        magicDmg: 90,
                        armor: 550,
                        spirit: 450,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Funny Politician",
                        abilities: ["attack" , "attack" , "curse", "poison", "enemyshoot", "enemyshoot","freeze"],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [85, 120, 250, 440, 620, 975, 1275, 1600, 2000, 2500],
                                magicDmgPlus : [85, 120, 250, 440, 620, 975, 1275, 1600, 2000, 2500]
                            },
                            hp: [1200, 3500, 6200, 20000, 35000, 52000, 72000, 97000, 120000, 150000 ],
                            attackDmg: [300, 500, 900, 1500, 2500, 4400, 5500, 6500, 7500, 8500],
                            magicDmg: [300, 500, 900, 1500, 2500, 4400, 5500, 6500, 7500, 8500],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "explode"
                        ],
                        hpPerPartyMember: 830,
                        adPerPartyMember: 18,
                        mdPerPartyMember: 18,
                        hp: 850,
                        attackDmg: 95,
                        magicDmg: 140,
                        armor: 600,
                        spirit: 900,
                        difficulty: "hard",
                        element: "normal"
                    },
                    {
                        name: "Football Player",
                        abilities: ["attack", "attack", "slash", "slash", "rockthrow", "empower"],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [85, 120, 250, 440, 620, 975, 1275, 1600, 2000, 2500],
                                magicDmgPlus : [85, 120, 250, 440, 620, 975, 1275, 1600, 2000, 2500]
                            },
                            hp: [1200, 3500, 6200, 20000, 35000, 52000, 72000, 97000, 120000, 150000 ],
                            attackDmg: [300, 500, 900, 1500, 2500, 4400, 5500, 6500, 7500, 8500],
                            magicDmg: [300, 500, 900, 1500, 2500, 4400, 5500, 6500, 7500, 8500],
                            abilities: []
                        },
                        hpPerPartyMember: 850,
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
                        name: "Desperado",
                        abilities: [
                            "attack", "attack", "enemyshoot", "enemyshoot", "slash", "slash", "cripple",
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 2,
                                    startTurn: 3
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [120, 180, 300, 540, 820, 1300, 1500, 1700, 1900, 2100],
                                magicDmgPlus : [120, 180, 300, 540, 820, 1300, 1500, 1700, 1900, 2100]
                            },
                            hp: [3500, 7900, 14900, 21000, 77000 , 87205, 102000, 127000, 150000, 190000],
                            attackDmg: [800, 1200, 1900, 2700, 4300, 5500, 6500, 7500, 8500, 9500],
                            magicDmg: [800, 1200, 1900, 2700, 4300, 5500, 6500, 7500, 8500, 9500],
                            abilities: []
                        },
                        endOfTurnEvents : [
                            "echo",
                            "focus"
                        ],
                        hpPerPartyMember: 1152,
                        hp: 1250,
                        adPerPartyMember: 30,
                        mdPerPartyMember: 30,
                        attackDmg: 220,
                        magicDmg: 190,
                        armor: 1600,
                        spirit: 1600,
                        difficulty: "boss",
                        element: "normal"
                    }
                ],
                points: 49,
                xppoints: 49,
                lootcount: 5,
                keystonePoints: [700, 1300, 3030, 6030, 9030, 20000, 35000, 50000, 70000, 100000],
                difficulty: 2
            },
            3: {
                challengeId: "romansoldier",
                keystoneUnlockName: "Roman Keystone",
                avatar: "https://i.imgur.com/wopsjbo.png",
                enemies: [
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 37000, 55000, 80000, 115000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "explode"
                        ],
                        hpPerPartyMember: 220,
                        adPerPartyMember: 18,
                        mdPerPartyMember: 14,
                        hp: 1180,
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
                        keystoneStats: {
                            hp: [1100, 3400, 5200, 8000, 13000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        hpPerPartyMember: 140,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 18,
                        hp: 1310,
                        attackDmg: 90,
                        magicDmg: 90,
                        armor: 350,
                        spirit: 550,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Roman Soldier",
                        emoji: "<:romansoldier:598752209475207178>",
                        abilities: [
                            "attack", "crush", "enemyshock"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 95,
                                    magicDmgPlus : 95,
                                    everyNTurns: 2,
                                    startTurn: 1
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [150, 220, 350, 640, 990, 1400],
                                magicDmgPlus : [150, 220, 350, 640, 990, 1400]
                            },
                            hp: [9500, 19900, 34900, 51000, 137000, 230000, 250000, 289000, 341000, 381000 ],
                            attackDmg: [1000, 1500, 2000, 2900, 4500, 4500, 5000, 5500, 6000, 6500 ],
                            magicDmg: [1000, 1500, 2000, 2900, 4500, 4500, 5000, 5500, 6000, 6500 ],
                            // reanimate the dead by bringing them back as zombies
                            abilities: []
                        },
                        abilityOrder: [
                            0, 0, [1, 2], 0, 0, [1, 2], 0, 0, [1, 2]
                        ],
                        endOfTurnEvents : [
                            "echo",
                            "focus",
                            "decay"
                        ],
                        hpPerPartyMember: 0,
                        hp: 24850,
                        adPerPartyMember: 34,
                        mdPerPartyMember: 34,
                        attackDmg: 410,
                        magicDmg: 240,
                        armor: 2750,
                        spirit: 2750,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 37000, 55000, 80000, 115000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "explode"
                        ],
                        hpPerPartyMember: 230,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 1180,
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
                        keystoneStats: {
                            hp: [1100, 3400, 5200, 8000, 13000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        hpPerPartyMember: 140,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 1310,
                        attackDmg: 90,
                        magicDmg: 90,
                        armor: 350,
                        spirit: 550,
                        difficulty: "medium",
                        element: "normal"
                    }
                ],
                points: 93,
                xppoints: 93,
                lootcount: 6,
                keystonePoints: [600, 2000, 2730, 5030, 7030, 15000, 25000, 40000, 60000, 85000],
                difficulty: 3
            },
            // keystone 4: bombs go out to all players
            4: {
                challengeId: "dictator",
                keystoneUnlockName: "Dictator Keystone",
                avatar: "https://i.imgur.com/L9MC5Xk.png",
                enemies: [
                    {
                        name: "Dictator",
                        abilities: [
                            "attack", "poke", "flameblast", "poison", "bomb", "guac"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 75,
                                    magicDmgPlus : 75,
                                    everyNTurns: 2,
                                    startTurn: 3
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [120, 200, 300, 540, 790, 1095, 1400, 1800, 2200, 2500],
                                magicDmgPlus : [120, 200, 300, 540, 790, 1095, 1400, 1800, 2200, 2500]
                            },
                            hp: [11500, 15900, 24900, 41000, 67000, 105000, 125000, 155000, 205000, 300000  ],
                            attackDmg: [800, 1300, 1700, 2500, 3500, 5000, 6500, 8000, 9500, 11000],
                            magicDmg: [800, 1300, 1700, 2500, 3500, 5000, 6500, 8000, 9500, 11000],
                            abilities: []
                        },
                        abilityOrder: [
                            1, 0, 4, 2, 3, 5, 5, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "badChef75",
                            "slotsGambler50",
                            "footballPlayer25"
                        ],
                        hpPerPartyMember: 0,
                        hp: 9520,
                        adPerPartyMember: 34,
                        mdPerPartyMember: 34,
                        attackDmg: 295,
                        magicDmg: 235,
                        armor: 2650,
                        spirit: 2650,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Mob Lord",
                        abilities: [
                            "attack", "bomb", "scold", "freeze", "flameblast", "iceshards"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 75,
                                    magicDmgPlus : 75,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [120, 200, 300, 540, 790, 1095, 1400, 1800, 2200, 2500],
                                magicDmgPlus : [120, 200, 300, 540, 790, 1095, 1400, 1800, 2200, 2500]
                            },
                            hp: [11500, 15900, 24900, 51000, 97000, 125000, 179000, 225000, 300000, 450000 ],
                            attackDmg: [800, 1300, 1700, 2500, 3500, 5000, 6500, 8000, 9500, 11000],
                            magicDmg: [800, 1300, 1700, 2500, 3500, 5000, 6500, 8000, 9500, 11000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4,
                            1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4,
                            1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4,
                            1, 1, 0, [2, 3], 4, 1, 1, 0, [2, 3], 4, 1, 1, 0, 0, 5
                        ],
                        endOfTurnEvents : [
                            "echo",
                            "angryMobMember75",
                            "tacoBandit50",
                            "footballPlayer25"
                        ],
                        hpPerPartyMember: 0,
                        hp: 14230,
                        adPerPartyMember: 27,
                        mdPerPartyMember: 27,
                        attackDmg: 220,
                        magicDmg: 289,
                        armor: 2650,
                        spirit: 2650,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Slots Gambler",
                        abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 280,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 1640,
                        attackDmg: 90,
                        magicDmg: 90,
                        armor: 350,
                        spirit: 550,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Bad Chef",
                        abilities: ["attack", "attack", "poison", "poison", "barrier"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 290,
                        adPerPartyMember: 9,
                        mdPerPartyMember: 9,
                        hp: 1490,
                        effectsOnDeath: [
                            "explode"
                        ],
                        attackDmg: 75,
                        magicDmg: 97,
                        armor: 400,
                        spirit: 320,
                        difficulty: "easy",
                        element: "normal"
                    },
                    {
                        name: "Angry Mob Member",
                        abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 290,
                        adPerPartyMember: 9,
                        mdPerPartyMember: 9,
                        hp: 1480,
                        attackDmg: 80,
                        magicDmg: 75,
                        armor: 450,
                        spirit: 370,
                        difficulty: "easy",
                        element: "normal"
                    },
                ],
                points: 139,
                xppoints: 139,
                lootcount: 7,
                keystonePoints: [500, 1700, 2530, 4530, 6030, 13000, 20000, 30000, 45000, 65000],
                difficulty: 5,
            },
            // keystone 5: no new ability
            5: {
                challengeId: "cheftrio",
                keystoneUnlockName: "Chef Keystone",
                avatar: "https://i.imgur.com/cv3FUXq.png",
                enemies: [
                    {
                        name: "Taco Bandit",
                        abilities: ["attack", "attack", "enemyshock", "enemyshock", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 210,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 1050,
                        attackDmg: 120,
                        magicDmg: 90,
                        armor: 550,
                        spirit: 450,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Taco Bandit",
                        abilities: ["attack", "attack", "enemyshock", "enemyshock", "orchatasip"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 25000, 34000, 50000, 70000, 95000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 210,
                        adPerPartyMember: 14,
                        mdPerPartyMember: 14,
                        hp: 1050,
                        attackDmg: 120,
                        magicDmg: 90,
                        armor: 550,
                        spirit: 450,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Evil Chef",
                        // special ability deals single target dmg magic to a non focused target
                        abilities: [
                            "attack", "curse"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 1
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100],
                                magicDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100]
                            },
                            hp: [11500, 15900, 24900, 51000, 73000, 87205, 102000, 127000, 150000, 190000 ],
                            attackDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            magicDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            abilities: []
                        },
                        abilityOrder: [
                            1, 0, 0, 0, 0, 0, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "electricOrb"
                        ],
                        effectsOnDeath: [
                            "healAll",
                            "transferAbilities"
                        ],
                        hpPerPartyMember: 0,
                        hp: 18000,
                        adPerPartyMember: 34,
                        mdPerPartyMember: 34,
                        attackDmg: 270,
                        magicDmg: 180,
                        armor: 1950,
                        spirit: 2650,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Disobedient Host",
                        // special ability summons minions - minions last 3 turns and explode after 3 turns
                        abilities: [
                            "attack", "rockthrow"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 2
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100],
                                magicDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100]
                            },
                            hp: [11500, 15900, 24900, 51000, 73000, 87205, 102000, 127000, 150000, 190000 ],
                            attackDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            magicDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 0, 1, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonDemon"
                        ],
                        effectsOnDeath: [
                            "healAll",
                            "transferAbilities"
                        ],
                        hpPerPartyMember: 0,
                        hp: 18000,
                        adPerPartyMember: 34,
                        mdPerPartyMember: 34,
                        attackDmg: 280,
                        magicDmg: 210,
                        armor: 2350,
                        spirit: 2350,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Valet",
                        // special ability deals area effect damage
                        abilities: [
                            "attack", "crush"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 3
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100],
                                magicDmgPlus : [130, 210, 340, 530, 750, 1300, 1500, 1700, 1900, 2100]
                            },
                            hp: [11500, 15900, 24900, 51000, 73000, 87205, 102000, 127000, 150000, 190000 ],
                            attackDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            magicDmg: [1100, 1500, 1950, 2500, 3700, 5500, 6500, 7500, 8500, 9500],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 0, 1, 0, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "tremor"
                        ],
                        effectsOnDeath: [
                            "healAll",
                            "transferAbilities"
                            // also reduce the special ability by 1 turn  to the rest, and increase ad, md
                        ],
                        hpPerPartyMember: 0,
                        hp: 18000,
                        adPerPartyMember: 34,
                        mdPerPartyMember: 34,
                        attackDmg: 240,
                        magicDmg: 170,
                        armor: 2650,
                        spirit: 1950,
                        difficulty: "boss",
                        element: "normal"
                    },
                ],
                points: 281,
                xppoints: 241,
                lootcount: 9,
                keystonePoints: [400, 1500, 2330, 4230, 5530, 10000, 17500, 28000, 40000, 55000 ],
                difficulty: 8
            },
            // keystone 5: killing same crystal will give the boss 30% more damage done
            6: {
                challengeId: "a182type2",
                keystoneUnlockName: "A182-Type2 Keystone",
                avatar: "https://i.imgur.com/ImttjNb.png",
                description: "**Energy Crystals:** \nRed - grants Furnace(magical)\nGreen- grants Dismantle(physical)\nBlack - Summons Tortured Robots\nBlue - Summons Energy Core(Immune to areawide damage)\nYellow - Rocket Strike becomes areawide, reduces Furnace, Dismantle, Rocket Strike cooldown by 1 turn, Summon Tortured Robot by 6 turns\nPurple - affects with Radioactive(direct healing grants an additional stack of Radioactive, at 5 stacks you explode for 1300 damage)\nEnergy Core - Grants Energize to the boss upon being summoned, Energize lasts 6 turns (+400 attack, magic), upon death causes cleansing which removes Energized from all units\nLaser Beam - Physical, Rocket Strike - Magical",
                timed: true,
                timedPerTurn: 180000,
                enemies: [
                    {
                        name: "A182-Type2",
                        abilities: [
                            "laserBeam", "flameblast", "storm", "iceshards", "poke"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 10000,
                                    magicDmgPlus : 10000,
                                    everyNTurns: 1,
                                    startTurn: 62
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [10030, 20010, 30040, 50030, 70050, 170050, 170050, 170050, 170050, 170050],
                                magicDmgPlus : [10030, 20010, 30040, 50030, 70050, 170050, 170050, 170050, 170050, 170050]
                            },
                            hp: [21500, 35900, 54900, 75000, 117000, 150000, 225000, 300000, 400000, 500000 ],
                            attackDmg: [1300, 2100, 3900, 6200, 8530, 11300, 13000, 15500, 20500, 29000 ],
                            magicDmg: [1300, 2100, 3900, 6200, 8530, 11300, 13000, 15500, 20500, 29000 ],
                            abilities: []
                        },
                        abilityOrder: [
                            4, [0,1], [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1], 3, 2, 3, 3, 3, 3, 3, 3
                        ],
                        endOfTurnEvents : [
                            "focus", "summonEnergyCrystalsA",
                            "summonEnergyCrystalsB", "summonEnergyCrystalsC", "summonEnergyCrystalsD",
                            "summonEnergyCrystalsE", "summonEnergyCrystalsF",
                            "absorbEnergyCrystals", 
                            "rocketStrike",
                            "summonEnergyCore", 
                            "furnace", "furnace",
                            "dismantle", "dismantle",
                            "summonTorturedRobots",
                            "summonTorturedRobotsYellowCrystal", 
                            "radioactive"
                        ],
                        effectsOnDeath: [
                        ],
                        crystalCombosToRandomize: [
                            "summonEnergyCrystalsA",
                            "summonEnergyCrystalsB",
                            "summonEnergyCrystalsC",
                            "summonEnergyCrystalsD",
                            "summonEnergyCrystalsE",
                            "summonEnergyCrystalsF"
                        ],
                        hpPerPartyMember: 0,
                        hp: 67000,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 1100,
                        magicDmg: 1000,
                        armor: 2750,
                        spirit: 2750,
                        difficulty: "boss",
                        element: "normal"
                    }
                ],
                points: 529,
                xppoints: 370,
                keystonePoints: [300, 1300, 2030, 4030, 5030, 9000, 15000, 25000, 37000, 48000 ],
                lootcount: 10,
                difficulty: 15
            },
            // keystone 5: vampires attempt to heal gatekeeper each turn after entomb
            7: {
                challengeId: "gatekeeper",
                keystoneUnlockName: "Gatekeeper Keystone",
                avatar: "https://i.imgur.com/N79puTW.jpg",
                timed: true,
                timedPerTurn: 180000,
                points: 1000,
                xppoints: 480,
                keystonePoints: [300, 1300, 2030, 4030, 5030, 9000, 15000, 25000, 37000, 48000 ],
                lootcount: 10,
                difficulty: 18,
                enemies: [
                    {
                        name: "The Gatekeeper",
                        abilities: [
                            "attack",
                            "crush",
                            "poke"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 145,
                                    magicDmgPlus : 145,
                                    everyNTurns: 2,
                                    startTurn: 5
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [230, 310, 540, 630, 850, 1100, 1400, 1700, 2000, 2400],
                                magicDmgPlus : [230, 310, 540, 630, 850, 1100, 1400, 1700, 2000, 2400]
                            },
                            hp: [31500, 50900, 69900, 91000, 137000, 180000, 240000, 330000, 430000, 550000 ],
                            attackDmg: [700, 1100, 1500, 2300, 3800, 4800, 5800, 6800, 7800, 8800],
                            magicDmg: [700, 1100, 1500, 2300, 3800, 4800, 5800, 6800, 7800, 8800],
                            abilities: []
                        },
                        abilityOrder: [
                            2, 0, 0, 1, 2, 1, 0, 1, 0, 1
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "echo",
                            "deepHatredChallenge",
                            "decay",
                            "vampire75",
                            "entomb75",
                            "vampire50",
                            "vampire50",
                            "entomb50",
                            "vampire25",
                            "vampire25",
                            "vampire25",
                            "entomb25"
                        ],
                        hp: 47600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 760,
                        magicDmg: 670,
                        armor: 2350,
                        spirit: 2100,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Vampiric Knight",
                        abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 3150,
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1250,
                        spirit: 1170,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Starved Hound",
                        abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 4350,
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1150,
                        spirit: 1270,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Vampiric Knight",
                        abilities: ["attack", "attack", "drain", "drain", "uppercut", "uppercut", "freeze"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 3150,
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1450,
                        spirit: 1370,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Starved Hound",
                        abilities: ["ferociousBite", "ferociousBite", "claw", "claw", "tackle", "cripple"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 4350,
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1450,
                        spirit: 1370,
                        difficulty: "medium",
                        element: "normal"
                    }
                ],
            },
            // keystone 5: summon during < 30%
            8: {
                challengeId: "archvampire",
                keystoneUnlockName: "Archvampire Keystone",
                avatar: "https://i.imgur.com/0Tl4Zda.png",
                timed: true,
                timedPerTurn: 180000,
                points: 1800,
                xppoints: 710,
                keystonePoints: [270, 1100, 1830, 3730, 4530, 8000, 13000, 22000, 30000, 40000 ],
                difficulty: 25,
                lootcount: 10,
                enemies: [
                    {
                        name: "Archvampire",
                        abilities: [
                            "ferociousBite",
                            "uppercut",
                            "poison",
                            "poke"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 855,
                                    magicDmgPlus : 855,
                                    everyNTurns: 8,
                                    startTurn: 6
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [1055, 1210, 1540, 2530, 3750, 5000, 6500, 8000, 9500, 11000 ],
                                magicDmgPlus : [1055, 1210, 1340, 2030, 3750, 5000, 6500, 8000, 9500, 11000 ]
                            },
                            hp: [31500, 40900, 59900, 81000, 137000, 195000, 275000, 350000, 475000, 600000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500, 3200, 4000, 5000, 6000, 7000],
                            magicDmg: [900, 2000, 2800, 3500, 4500, 5500, 7500, 8500, 10500, 14000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 2, 3, 0, 0, 1, 2, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "archvampireRevive",
                            "feverChallenge",
                            "suckBlood"
                        ],
                        hp: 58600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 1550,
                        magicDmg: 1370,
                        armor: 1750,
                        spirit: 1500,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Frenzied Vampire",
                        abilities: [
                            "attack",
                            "rockthrow",
                            "slash",
                            "poke",
                            "weaken"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 185,
                                    magicDmgPlus : 185,
                                    everyNTurns: 3,
                                    startTurn: 4
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [250, 400, 650, 900, 1200, 1500, 1800, 2200, 2600, 3000],
                                magicDmgPlus : [250, 400, 650, 900, 1200, 1500, 1800, 2200, 2600, 3000]
                            },
                            hp: [10500, 15900, 21900, 27000, 37000, 55000, 80000, 110000, 140000, 180000 ],
                            attackDmg: [700, 1100, 1400, 1700, 2100, 2700, 3700, 4700, 5700, 7000 ],
                            magicDmg: [700, 1100, 1400, 1700, 2100, 2700, 3700, 4700, 5700, 7000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 2, 3, 4, 0, 1, 2, 0
                        ],
                        hp: 13600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 770,
                        magicDmg: 400,
                        armor: 1450,
                        spirit: 1200,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Blood King",
                        abilities: [
                            "attack",
                            "rockthrow",
                            "iceshards",
                            "poke",
                            "cripple"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 185,
                                    magicDmgPlus : 185,
                                    everyNTurns: 3,
                                    startTurn: 5
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [250, 400, 650, 900, 1200, 1500, 1800, 2200, 2600, 3000],
                                magicDmgPlus : [250, 400, 650, 900, 1200, 1500, 1800, 2200, 2600, 3000]
                            },
                            hp: [10500, 15900, 21900, 27000, 37000, 55000, 80000, 110000, 140000, 180000 ],
                            attackDmg: [700, 1100, 1400, 1700, 2100, 2700, 3700, 4700, 5700, 7000 ],
                            magicDmg: [700, 1100, 1400, 1700, 2100, 2700, 3700, 4700, 5700, 7000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 2, 1, 3, 4, 0, 2, 1, 0
                        ],
                        hp: 13600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 600,
                        magicDmg: 570,
                        armor: 1250,
                        spirit: 1400,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Immortality Seeker",
                        abilities: ["attack", "attack","attack", "flameblast", "flameblast", "iceshards", "freeze"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 2350,
                        attackDmg: 360,
                        magicDmg: 375,
                        armor: 1050,
                        spirit: 1170,
                        difficulty: "medium",
                        element: "normal"
                    },
                    {
                        name: "Immortality Seeker",
                        abilities: ["attack", "attack","attack", "flameblast", "flameblast", "iceshards", "scold"],
                        buffs: [],
                        keystoneStats: {
                            hp: [1200, 3500, 6200, 10000, 15000, 23500, 35000, 50000, 75000, 100000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3500, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 2350,
                        attackDmg: 360,
                        magicDmg: 375,
                        armor: 1050,
                        spirit: 1170,
                        difficulty: "medium",
                        element: "normal"
                    }
                ]
            },
            // keystone 5: summons at 75% 50% 25%
            9: {
                challengeId: "corruptedovermind",
                keystoneUnlockName: "Corrupted Keystone",
                avatar: "https://i.imgur.com/5VOMbq1.png",
                timed: true,
                timedPerTurn: 180000,
                points: 2901,
                xppoints: 1500,
                difficulty: 37,
                keystonePoints: [300, 1300, 2030, 4030, 5030, 8000, 15000, 25000, 35000, 48000 ],
                lootcount: 11,
                enemies: [
                    {
                        name: "Corrupted Overmind",
                        abilities: [
                            "corrupt",
                            "enemyshock",
                            "curse",
                            "freeze"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 640,
                                    magicDmgPlus : 640,
                                    everyNTurns: 10,
                                    startTurn: 8
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [855, 1310, 1840, 2430, 3750, 5500, 7000, 9000, 11500, 13000 ],
                                magicDmgPlus : [855, 1310, 1840, 2430, 3750, 5500, 7000, 9000, 11500, 13000]
                            },
                            hp: [331500, 500900, 1109900, 1910000, 2907000, 4200000, 5500000, 7200000, 9200000, 15500000, ],
                            attackDmg: [700, 1100, 1700, 3100, 3500, 4250, 5000, 6000, 7250, 8500 ],
                            magicDmg: [700, 1100, 2500, 3800, 4500, 5250, 6000, 7000, 8250, 9500 ],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 0, 1, 2, [0, 1, 3], 0, 1, 1
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "vacum1",
                            "vacum2",
                            "vacum3",
                            "superNovaPrepare",
                            "summonTentacle",
                            "summonTentacle",
                            "summonTentacle",
                            "superNova"
                        ],
                        hp: 1207673,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 1800,
                        magicDmg: 1010,
                        armor: 2350,
                        spirit: 2300,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Overmind Minion",
                        abilities: [
                            "attack",
                            "attack",
                            "curse",
                            "curse",
                            "flameblast",
                            "scold"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 100,
                                    magicDmgPlus : 100,
                                    everyNTurns: 3,
                                    startTurn: 3
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200 ],
                                magicDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200]
                            },
                            hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "radiation",
                            "explode"
                        ],
                        hp: 29600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 600,
                        magicDmg: 670,
                        armor: 1350,
                        spirit: 1100,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Dark Matter",
                        abilities: [
                            "attack",
                            "attack",
                            "disintegrate",
                            "guac",
                            "curse",
                            "weaken"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 195,
                                    magicDmgPlus : 195,
                                    everyNTurns: 3,
                                    startTurn: 4
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200 ],
                                magicDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200]
                            },
                            hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500 ],
                            abilities: []
                        },
                        endOfTurnEvents : [
                            "focus"
                        ],
                        effectsOnDeath: [
                            "radiation",
                            "bendersLastWish"
                        ],
                        hp: 86600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 800,
                        magicDmg: 770,
                        armor: 1350,
                        spirit: 1000,
                        difficulty: "boss",
                        element: "earth"
                    },
                    {
                        name: "Overcharged Neutrino",
                        abilities: [
                            "attack",
                            "attack",
                            "poison",
                            "poison",
                            "elixir",
                            "elixir",
                            "cripple"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 5
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200 ],
                                magicDmgPlus : [255, 410, 640, 830, 1050, 1200, 1400, 1600, 1900, 2200]
                            },
                            hp: [1200, 3500, 6200, 10000, 15000, 19400, 24000, 30000, 40000, 50000 ],
                            attackDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            magicDmg: [300, 500, 900, 1500, 2300, 3400, 4500, 5500, 6500, 7500],
                            abilities: []
                        },
                        effectsOnDeath: [
                            "radiation"
                        ],
                        hp: 9600,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        attackDmg: 650,
                        magicDmg: 670,
                        armor: 1450,
                        spirit: 1100,
                        difficulty: "boss",
                        element: "earth"
                    }
                ],
            },
            // keystone 5: 3 players get burst
            10: {
                challengeId: "anomaly",
                keystoneUnlockName: "Anomaly Keystone",
                avatar: "https://i.imgur.com/ySI8sHG.png",
                timed: true,
                timedPerTurn: 180000,
                points: 4901,
                xppoints: 2140,
                lootcount: 12,
                difficulty: 55,
                keystonePoints: [250, 1100, 1830, 3530, 4030, 7000, 13000, 22000, 30000, 42000 ],
                enemies: [
                    {
                        name: "Asteroid Golem",
                        xp: 30,
                        abilities: [
                            "attack",
                            "rockthrow",
                            "slash",
                            "poke",
                            "meteor"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 505,
                                    magicDmgPlus : 505,
                                    everyNTurns: 6,
                                    startTurn: 8
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [755, 990, 1240, 1430, 1750, 2100, 2600, 3200, 3900, 4900 ],
                                magicDmgPlus : [755, 990, 1240, 1430, 1750, 2100, 2600, 3200, 3900, 4900 ]
                            },
                            hp: [13500, 20900, 29900, 41000, 57000, 75000, 109000, 137000, 165000, 200000 ],
                            attackDmg: [700, 1100, 1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500  ],
                            magicDmg: [700, 1100, 1500, 2500, 3700, 4500, 5500, 6500, 7500, 8500 ],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 3, 2, 4, 1, 4
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonLavaElemental",
                            "summonSkyElemental",
                            "break",
                            "entombAll20"
                        ],
                        effectsOnDeath: [
                            "entombAll20",
                            "summonSkyElementalDeath",
                            "summonLavaElementalDeath",
                        ],
                        hp: 30600,
                        attackDmg: 1480,
                        magicDmg: 1470,
                        armor: 2500,
                        spirit: 10500,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "special",
                        element: "earth"
                    },
                    {
                        name: "Stone Giant",
                        xp: 30,
                        abilities: [
                            "attack",
                            "rockthrow",
                            "slash",
                            "poke",
                            "quake"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 505,
                                    magicDmgPlus : 505,
                                    everyNTurns: 6,
                                    startTurn: 9
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [755, 990, 1240, 1430, 1750, 2100, 2600, 3200, 3900, 4900 ],
                                magicDmgPlus : [755, 990, 1240, 1430, 1750, 2100, 2600, 3200, 3900, 4900 ]
                            },
                            hp: [13500, 20900, 29900, 41000, 57000, 75000, 109000, 137000, 165000, 200000 ],
                            attackDmg: [700, 1100, 1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500  ],
                            magicDmg: [700, 1100, 1500, 2500, 3700, 4500, 5500, 6500, 7500, 8500 ],
                            abilities: []
                        },
                        abilityOrder: [
                            1, 0, 2, 3, 1, 4, 4
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonLavaElemental",
                            "summonSkyElemental",
                            "shatter",
                            "entombAll20"
                        ],
                        effectsOnDeath: [
                            "entombAll20",
                            "summonSkyElementalDeath",
                            "summonLavaElementalDeath",
                        ],
                        hp: 30600,
                        attackDmg: 1480,
                        magicDmg: 1470,
                        armor: 10750,
                        spirit: 2500,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "special",
                        element: "earth"
                    }
                ]
            },
            // transition 3 subsequent arrows turns, shadowburst leaves a dot, reflect after maniac 
            11: {
                keystoneUnlockName: "Aramis Keystone",
                challengeId: "aramis",
                avatar: "https://i.imgur.com/kFVuVHN.png",
                timed: true,
                timedPerTurn: 360000,
                points: 7001,
                xppoints: 3573,
                lootcount: 13,
                difficulty: 70,
                keystonePoints: [250, 1100, 1830, 3530, 4030, 6000, 11000, 19000, 28000, 40000 ],
                enemies: [
                    {
                        name: "D'Artagnan",
                        xp: 30,
                        abilities: [
                            "attack",
                            "uppercut",
                            "crush",
                            "poke"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:frenzy:479298214453968896>",
                                onTurnEnd: {
                                    attackDmgPlus : 2100,
                                    magicDmgPlus : 2100,
                                    everyNTurns: 20,
                                    startTurn: 20
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [3100, 4100, 5100, 6100, 7100],
                                magicDmgPlus : [3100, 4100, 5100, 6100, 7100]
                            },
                            hp: [ 19500, 25900, 39900, 51000, 77000 ],
                            attackDmg: [700, 1500, 2500, 4100, 5500],
                            magicDmg: [700, 1500, 2500, 4100, 5500],
                            abilities: []
                        },
                        abilityOrder: [
                            3, 1, 2, 2, 0, 1, 0, 0, 2, 1, 0, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonAthos",
                            "overpower",
                            "summonPillars",
                            "pillarRevive",
                            "hammerdownProtocol",
                            "hammerdownPrepare",
                            "elementalOrder",
                            "elementalOrderPrepare"
                        ],
                        effectsOnDeath: [
                            "transferDartagnanAbilities",
                        ],
                        hp: 54600,
                        attackDmg: 4580,
                        magicDmg: 4570,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "special",
                        element: "normal"
                    }
                ]
            },
            // keystone 5: 
            12: {
                challengeId: "emperor",
                keystoneUnlockName: "Emperor Keystone",
                avatar: "https://i.imgur.com/21C2UbS.jpg",
                timed: true,
                description: "**The High Council:** \n**Darkness** - A member of the high council becomes tainted with darkness and gains *Energy* and their abilities become empowered. Darkness can only be removed upon taking 25% of the member's health from the point of obtaining darkness\n**Energy** - upon reaching full energy the member of the high council unleashes eradicate every turn increasing in damage every turn until darkness is removed - each subsequent darkness requires one less turn to reach full energy\n**Puncture** - Deals 200 damage per turn, each tick gives a stack of *debilitate*, cast upon losing darkness\n**Debilitate** - increases all damage taken by 3% per stack\n**Strength** - Upon losing darkness the member of the high council gains +20% damage dealt permanently\nBalrogue > **Lesion** - DOT Deals low damage for 30 turns\n**Summon Knights** (Darkness Only) - summon a knight per number of lesions on the group, cast every 3 turns until darkness is removed\nEmperor > **Mighty Weapon** - Empowers his weapon and deals 50% more damage\n>**Wound** - Deals high physical damage on a random target for 6 turns\nMystical Fairy > **Blast** - deal moderate magical damage on a random target\n**Summon Worshipper** > Summon a worshipper that will heal the lowest health member for 10% of their total health every 2 turns\n**Summon Cursed Guardians** (Darkness only) > Summons two cursed guardians that become stronger each turn\nReckless Barbarian > **Reflect Shield** - reflects 15% damage dealt back to the attacker | 50% aoe damage reflected back to the attacker\n**Reflect Barrier** (Darkness only) - reflects 15% of damage dealt back to the group | 50% aoe damage reflected back to the group",
                timedPerTurn: 360000,
                points: 12001,
                keystonePoints: [250, 1100, 1830, 3530, 4030, 5500, 10000, 17000, 25000, 35000 ],
                xppoints: 5120,
                lootcount: 14,
                difficulty: 88,
                enemies: [
                    {
                        name: "Balrogue",
                        xp: 30,
                        abilities: [
                            "attack",
                            "uppercut"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 6100,
                                    magicDmgPlus : 6100,
                                    everyNTurns: 10,
                                    startTurn: 60
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [6100, 12100, 241000, 38000, 52000],
                                magicDmgPlus : [6100, 12100, 24000, 38000, 52000]
                            },
                            hp: [ 11500, 19900, 29900, 41000, 67000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            magicDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 0, 0, 0, 1, 0, 0
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonKnights", // D
                            "lesion",
                            "eradicate"
                        ],
                        effectsOnDeath: [
                            "puncture",
                            "balrogueDeath"
                        ],
                        hp: 52600,
                        attackDmg: 2080,
                        magicDmg: 2270,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Emperor Zheng",
                        xp: 30,
                        abilities: [
                            "attack",
                            "crush"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 6100,
                                    magicDmgPlus : 6100,
                                    everyNTurns: 10,
                                    startTurn: 60
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [6100, 12100, 241000, 38000, 52000],
                                magicDmgPlus : [6100, 12100, 24000, 38000, 52000]
                            },
                            hp: [ 11500, 19900, 29900, 41000, 67000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            magicDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            abilities: []
                        },
                        abilityOrder: [
                            0, [0, 1], 1, [0, 1], 1, [0, 1], 1
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "mightyweapon", // D
                            "darknessHandler",
                            "wound",
                            "eradicate"
                            // starts with darkness on turn 2
                        ],
                        effectsOnDeath: [
                            "puncture",
                            "emperorDeath"
                        ],
                        hp: 52600,
                        attackDmg: 2080,
                        magicDmg: 2270,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Mystical Fairy",
                        xp: 30,
                        abilities: [
                            "attack",
                            "enemyshock",
                            "curse",
                            "flameblast"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 6100,
                                    magicDmgPlus : 6100,
                                    everyNTurns: 10,
                                    startTurn: 60
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [6100, 12100, 241000, 38000, 52000],
                                magicDmgPlus : [6100, 12100, 24000, 38000, 52000]
                            },
                            hp: [ 11500, 19900, 29900, 41000, 67000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            magicDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            abilities: []
                        },
                        // random magic dmg 
                        abilityOrder: [
                            2, 0, [1,3], [0,1], [2,3], [0,1], [1,3], [0,1], [2,3]
                        ],
                        endOfTurnEvents : [
                            "focus",
                            "summonWorshipper",
                            "eradicate",
                            "blast",
                            "summonCursedGuardian",  // D
                            "summonCursedGuardian" // D
                        ],
                        effectsOnDeath: [
                            "puncture",
                            "mysticalFairyDeath"
                        ],
                        hp: 52600,
                        attackDmg: 1980,
                        magicDmg: 2070,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Reckless Barbarian",
                        xp: 30,
                        abilities: [
                            "attack"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 6100,
                                    magicDmgPlus : 6100,
                                    everyNTurns: 10,
                                    startTurn: 60
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [6100, 12100, 241000, 38000, 52000],
                                magicDmgPlus : [6100, 12100, 24000, 38000, 52000]
                            },
                            hp: [ 11500, 19900, 29900, 41000, 67000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            magicDmg: [700, 1100, 1500, 2100, 2500, 2700, 3500, 4500, 5700, 7000],
                            abilities: []
                        },
                        // no focus melee hit and aoe
                        abilityOrder: [
                            0, 0, 0
                        ],
                        endOfTurnEvents : [
                            "reflectShield",
                            "eradicate",
                            "reflectBarrier" //D every 3 turns, expires after 3 turns
                        ],
                        effectsOnDeath: [
                            "puncture",
                            "barbarianDeath"
                        ],
                        hp: 52600,
                        attackDmg: 1780,
                        magicDmg: 2270,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "boss",
                        element: "normal"
                    }
                ]
            },
            // 1 main boss with low HP (50k hp) but extremely high healing, heals for 500 * ( number of stacks * 10 ) every turn
            // doesnt hit too hard, ~2-2.5k per hit on tank
            // aoe every 5 turns for 2k
            // 6 sets of groups, 3 different kind of groups
            // each set lasts 6 turns
            // first 2 turns are free so 38 turns total
            // each set killed adds a debuff on the boss that reducing healing 
            // first set :
            // 3 enemies, 1 of them does HUGE aoe every 3 turns (5k aoe) 13k HP
            // second enemy does fury, lower hp more it hits 17K HP
            // third enemy does chain lightning on random players, like nourish 10k HP
            // second set:
            // 1 big enemy (HUGE HP) 60k HP
            // end of turn will put a -75% damage dealt, and healing done debuff
            // small non hitting enemies will appear, must kill one to gain buff to stop debuff
            // buff lasts 4 turns
            // enemy puts a dot on players every 2 turns that deals damage to the group equal to their missing health (last 3 turns)
            // third set:
            // group of exploding lashers, deal low amount of damage, but will detonate for 800
            // 2 full sets of each randimized, but in same order
            // boss summons a tree that heals all enemies at end of turn for 10k HP = 9000
            // boss summons 3 roots that will deal small amounts of damage to players HP = 1500, immune to aoe
            // 
            
            13: {
                challengeId: "dragon",
                keystoneUnlockName: "Emperor Keystone",
                avatar: "https://i.imgur.com/21C2UbS.jpg",
                timed: true,
                description: "",
                timedPerTurn: 360000,
                points: 12001,
                keystonePoints: [250, 1100, 1830, 3530, 4030, 4800, 10000, 17000, 25000, 35000],
                xppoints: 5120,
                lootcount: 15,
                difficulty: 99,
                enemies: [
                    {
                        name: "Amber Dragon",
                        xp: 30,
                        abilities: [
                            "slash",
                            "uppercut"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "<:overmind:479298213904646147>",
                                onTurnEnd: {
                                    attackDmgPlus : 6100,
                                    magicDmgPlus : 6100,
                                    everyNTurns: 10,
                                    startTurn: 60
                                }
                            }
                        ],
                        keystoneStats: {
                            frenzy: {
                                attackDmgPlus : [3100, 4100, 5100, 6100, 7100],
                                magicDmgPlus : [3100, 4100, 5100, 6100, 7100]
                            },
                            hp: [ 19500, 25900, 39900, 51000, 77000 ],
                            attackDmg: [700, 1100, 1500, 2100, 2500],
                            magicDmg: [700, 1100, 1500, 2100, 2500],
                            abilities: []
                        },
                        abilityOrder: [
                            0, 1, 0, 0, 0, 1, 0, 0
                        ],
                        endOfTurnEvents : [
                        ],
                        effectsOnDeath: [
                        ],
                        hp: 1982600,
                        attackDmg: 238000,
                        magicDmg: 257000,
                        armor: 2100,
                        spirit: 2100,
                        hpPerPartyMember: 0,
                        adPerPartyMember: 0,
                        mdPerPartyMember: 0,
                        difficulty: "boss",
                        element: "normal"
                    }
                ]
            }
        }
    }  
}