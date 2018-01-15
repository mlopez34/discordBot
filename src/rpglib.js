module.exports = {

    rpgAbilities: {
        attack : {
            name: "Attack",
            abilityId: "attack",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },
        crush : {
            name: "Crush",
            abilityId: "crush",
            dmg: 50,
            adPercentage: 1.35,
            type: "physical"
        },
        tacoheal : {
            name: "Heal",
            abilityId: "tacoheal",
            heal: 70,
            mdPercentage: 1.37
        },
        replenish : {
            name: "Replenish",
            abilityId: "replenish",
            special: "remove death",
            heal: 450,
            mdPercentage: 1.8,
            limitDefensive : true
        },
        bandaid : {
            name: "Bandaid",
            abilityId: "bandaid",
            heal: 20,
            mdPercentage: 0.5,
            special: "remove status"
        },
        orchatasip: {
            name:"Orchata Sip",
            abilityId: "orchatasip",
            hot: {
                name: "Orchata Sip",
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
            name: "Elixir",
            abilityId: "elixir",
            heal: 35,
            cooldown: 0,
            maxcooldown: 1,
            mdPercentage: 0.65,
            areawide: true,
            targets: "friendly"
        },
        megaelixir: {
            name: "Mega Elixir",
            abilityId: "megaelixir",
            heal: 200,
            specialCharge: 1,
            mdPercentage: 1,
            areawide: true,
            targets: "friendly",
            limitDefensive: true
        },
        poke: {
            name:"Poke",
            abilityId: "poke",
            type:"physical",
            dot: {
                name: "Poke",
                type:"physical",
                dmg: 75,
                adPercentage: 1.15,
                emoji: "📌",
                dmgOnDotApply: false,
                turnsToExpire: 4,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        curse: {
            name:"Curse",
            abilityId: "curse",
            type:"shadow",
            dot: {
                name: "Curse",
                type:"shadow",
                dmg: 75,
                mdPercentage: 1.15,
                emoji: "🌑",
                dmgOnDotApply: false,
                turnsToExpire: 4,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        bomb: {
            name:"Bomb",
            abilityId: "bomb",
            type:"fire",
            dot: {
                name: "Bomb",
                type:"fire",
                dmg: 1,
                mdPercentage: 1,
                emoji: "💣",
                dmgOnDotApply: false,
                turnsToExpire: 6,
                dmgOnDotExpire: true,
                dmgOnExpire: 550,
                dmgOnDotRemove: true,
                dmgOnRemoveAreaWide: true,
                mdPercentageOnRemove: 0.25,
                dmgOnRemove: 100
            }
        },
        decay: {
            name:"Decay",
            abilityId: "decay",
            type:"shadow",
            abilityId: "decay",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 8,
            afterNTurns: 1,
            currentTurn: 0,
            dot: {
                name: "Decay",
                type:"shadow",
                dmg: 65,
                areawide: true,
                mdPercentage: 1,
                emoji: "🌑",
                dmgOnDotApply: false,
                turnsToExpire: 6,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        tacowall: {
            name: "Taco Wall",
            abilityId: "tacowall",
            buff: {
                name: "Taco Wall",
                emoji : "🏛",
                affects: ["spirit"],
                multiplier: 2
            }
        },
        shield: {
            name: "Shield",
            abilityId: "shield",
            buff: {
                name: "Shield",
                emoji: "🛡️",
                affects: ["armor"],
                multiplier: 2
            }
        },
        barrier: {
            name: "Barrier",
            abilityId: "barrier",
            buff: {
                name: "Barrier",
                emoji: "🚧",
                affects: ["spirit"],
                additive: 650
            }
        },
        protect: {
            name: "Protect",
            abilityId: "protect",
            buff: {
                name: "Protect",
                emoji: "🥅",
                affects: ["armor"],
                additive: 650
            }
        },
        empower: {
            name: "Empower",
            abilityId: "empower",
            buff: {
                name: "Empower",
                emoji: "💪🏼",
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.3
            }
        },
        flameblast: {
            name: "Flame Blast",
            abilityId: "flameblast",
            dmg: 50,
            mdPercentage: 1,
            type: "fire",
            dot: {
                name: "Burning",
                dmg: 20,
                mdPercentage: .9,
                type: "fire",
                emoji: "🔥",
                damageOnDotApply: false,
                turnsToExpire: 5,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        foodpoisoning: {
            name: "Food Poisoning",
            abilityId: "foodpoisoning",
            dmg: 50,
            mdPercentage: 1,
            type: "poison",
            dot: {
                name: "Food Poisoning",
                dmg: 20,
                mdPercentage: .8,
                emoji : "🤢",
                type: "poison",
                damageOnDotApply: false,
                turnsToExpire: 3,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        uppercut: {
            name: "Uppercut",
            abilityId: "uppercut",
            dmg: 50,
            mdPercentage: 1,
            type: "physical",
            dot: {
                name: "Uppercut",
                dmg: 20,
                adPercentage: .8,
                emoji : "🥊",
                type: "physical",
                damageOnDotApply: false,
                turnsToExpire: 3,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        iceshards: {
            name: "Ice Shards",
            abilityId: "iceshards",
            dmg: 45,
            mdPercentage: 0.6,
            type: "ice",
            areawide: true,
            targets: "enemy"
        },
        slash: {
            name: "Slash",
            abilityId: "slash",
            dmg: 45,
            adPercentage: 0.6,
            type: "physical",
            areawide: true,
            targets: "enemy"
        },
        shoot: {
            name: "Shoot",
            abilityId: "shoot",
            dmg: 125,
            charges: 4,
            maxcharges: 4,
            adPercentage: 1.2,
            type: "physical"
        },
        shock: {
            name: "Shock",
            abilityId: "shock",
            dmg: 120,
            mdPercentage: 1.2,
            type: "electric",
            special: "selfdamage",
            selfdamage: 15
        },
        headshot: {
            name: "Headshot",
            abilityId: "headshot",
            limitOffensive: true,
            dmg: 480,
            adPercentage: 2,
            type: "physical"
            
        },
        execute: {
            name: "Execute",
            abilityId: "execute",
            limitOffensive: true,
            dmg: 480,
            adPercentage: 2,
            type: "physical"
            
        },
        flare: {
            name: "Flare",
            abilityId: "flare",
            limitOffensive: true,
            dmg: 480,
            mdPercentage: 2,
            type: "fire"
            
        },
        storm: {
            name: "Storm",
            abilityId: "storm",
            limitOffensive: true,
            dmg: 120,
            mdPercentage: 1.5,
            type: "electric",
            areawide: true,
            targets: "enemy"
            
        },
        earthquake: {
            name: "Earthquake",
            abilityId: "earthquake",
            limitOffensive: true,
            dmg: 120,
            adPercentage: 1.5,
            type: "physical",
            areawide: true,
            targets: "enemy"
            
        },
        rockthrow: {
            dmg: 45,
            abilityId: "rockthrow",
            type: "physical",
            adPercentage: 0.8,
            special: "warm up",
            name: "Rock Throw",
            buff: {
                selfbuff: true,
                stacksOfWarmUp: 1,
                emoji: "🤾",
                name: "Warm Up",
                maxStacks: 4,
                adPercentageAtMaxStacks: 1.3,
                atMaxStacksDealDamage: 175
            }
        },
        drain: {
            name: "Drain",
            abilityId: "drain",
            type: "physical",
            special: {
                name: "Drain",
                adPercentage: 0.9,
                dmg: 40,
                heal: 40,
                mdPercentage: 0.85,
                healPercentage: 0.4
            }
        },
        guac: {
            name: "Guac",
            abilityId: "guac",
            type: "shadow",
            special: {
                name: "Guac",
                mdPerDot: 0.2,
                mdPercentage: 0.8,
                dmg: 85
            }
        },
        tackle: {
            name: "Tackle",
            abilityId: "tackle",
            type: "physical",
            special: {
                name: "Tackle",
                adPerDot: 0.2,
                type: "physical",
                adPercentage: 0.8,
                dmg: 85
            }
        },
        haste: {
            passive: true,
            abilityId: "haste",
            name: "Haste",
            buff: {
                name: "Haste",
                emoji: "💨"
            }
        },
        rocketStrike : {
            name: "Rocket Strike",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 3,
            afterNTurns: 2,
            currentTurn: 0,
            abilityId: "rocketStrike",
            dmg: 50,
            mdPercentage: 0.6,
            type: "magical"
        },
        rocketStrikeAreaWide : {
            name: "Rocket Strike",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 1,
            currentTurn: 0,
            abilityId: "rocketStrikeAreaWide",
            dmg: 50,
            mdPercentage: 0.6,
            type: "magical",
            areawide: true,
            areawidedmg: {
                areawide: true,
                name: "Rocket Strike",
                dmg: 50,
                mdPercentage: 0.6,
                type: "magical"
            }
        },
        laserBeam : {
            name: "Laser Beam",
            abilityId: "laserBeam",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },

        // endOfTurnEvents
        echo: {
            dmgaura: true,
            belongsToEvent: true,
            name: "Echo",
            abilityId: "echo",
            areawidedmg: {
                endOfTurnAura: true,
                hitsEveryNTurn: 4,
                dmgPerTurn: 22,
                name: "Echo",
                dmg: 85,
                type: "physical"
            }
        },
        haunt: {
            afterNTurns: 4,
            everyNTurns: 2,
            currentTurn: 0,
            belongsToMember: true,
            name: "Haunt",
            abilityId: "haunt",
            areawidedmg: {
                areawide: true,
                name: "Haunt",
                dmg: 500,
                adPercentage: 0.1,
                type: "physical"
            }
        },

        // death effects
        explode: {
            onDeathEffect: true,
            effectDone: false,
            name: "Explode",
            abilityId: "explode",
            areawidedmg : {
                dmgondeath: true,
                areawide: true,
                dmg: 188,
                mdPercentage: .2,
                name: "Explode",
                type: "fire"
            }
        },
        totemOfDoom75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "totemOfDoom"
            }
        },
        absorbEnergyCrystals: {
            abilityId: "absorbEnergyCrystals",
            belongsToMember: true,
            processAbility: true,
            everyNTurns: 10,
            afterNTurns: 4,
            currentTurn: 0,
            special: "absorb energy crystals"
        },
        blackEnergyCrystal: {
            name: "blackEnergyCrystal",
            abilityId: "blackEnergyCrystal",
            buff: {
                name: "blackEnergyCrystal",
                turnsToExpire: 7,
                emoji: "⚫"
            }
        },
        blueEnergyCrystal: {
            name: "blueEnergyCrystal",
            abilityId: "blueEnergyCrystal",
            buff: {
                name: "blueEnergyCrystal",
                turnsToExpire: 7,
                emoji: "🔵"
            }
        },
        yellowEnergyCrystal: {
            name: "yellowEnergyCrystal",
            abilityId: "yellowEnergyCrystal",
            buff: {
                name: "yellowEnergyCrystal",
                specialOnExpire: true,
                turnsToExpire: 7,
                reduceEveryNTurnsFurnace: 1,
                reduceEveryNTurnsDismantle: 1,
                reduceEveryNTurnsSummonTorturedRobot: 5,
                reduceEveryNTurnsRocketStrike: 1,
                rocketStrikeAreawide: true,
                emoji: "☀️"
            }
        },
        purpleEnergyCrystal: {
            name: "purpleEnergyCrystal",
            abilityId: "purpleEnergyCrystal",
            buff: {
                name: "purpleEnergyCrystal",
                turnsToExpire: 7,
                emoji: "🌑",
                specialOnExpire: true,
                onExpireRemoveMemberStatus: "Radioactive"
            }
        },
        greenEnergyCrystal: {
            name: "greenEnergyCrystal",
            abilityId: "greenEnergyCrystal",
            buff: {
                name: "greenEnergyCrystal",
                turnsToExpire: 7,
                emoji: "🎾"
            }
        },
        redEnergyCrystal: {
            name: "redEnergyCrystal",
            abilityId: "redEnergyCrystal",
            buff: {
                name: "redEnergyCrystal",
                turnsToExpire: 7,
                emoji: "🔴"
            }
        },
        summonEnergyCrystalsA: {
            name: "summonEnergyCrystalsA",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 10,
            afterNTurns: 1,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blackEnergyCrystal", "blueEnergyCrystal", "greenEnergyCrystal", "purpleEnergyCrystal"
                ]
            }
        },
        summonEnergyCrystalsB: {
            name: "summonEnergyCrystalsB",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 10,
            afterNTurns: 11,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blackEnergyCrystal", "blueEnergyCrystal", "greenEnergyCrystal", "redEnergyCrystal"
                ]
            }
        },
        summonEnergyCrystalsC: {
            name: "summonEnergyCrystalsC",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 10,
            afterNTurns: 21,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blackEnergyCrystal", "blueEnergyCrystal", "purpleEnergyCrystal", "yellowEnergyCrystal"
                ]
            }
        },
        summonEnergyCrystalsD: {
            name: "summonEnergyCrystalsD",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 10,
            afterNTurns: 31,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blackEnergyCrystal", "greenEnergyCrystal", "redEnergyCrystal", "yellowEnergyCrystal"
                ]
            }
        },
        summonEnergyCrystalsE: {
            name: "summonEnergyCrystalsE",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 10,
            afterNTurns: 41,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blackEnergyCrystal", "purpleEnergyCrystal", "redEnergyCrystal", "yellowEnergyCrystal"
                ]
            }
        },
        summonEnergyCrystalsF: {
            name: "summonEnergyCrystalsF",
            belongsToMember: true,
            everyNTurns: 10,
            oneTimeCast: true,
            afterNTurns: 51,
            currentTurn: 0,
            summon: {
                enemies: [
                    "blueEnergyCrystal", "greenEnergyCrystal", "purpleEnergyCrystal", "yellowEnergyCrystal"
                ]
            }
        },
        summonTorturedRobots: {
            name: "summonTorturedRobots",
            belongsToMember: true,
            validIfBuff: "blackEnergyCrystal",
            everyNTurns: 10,
            afterNTurns: 5,
            currentTurn: 0,
            summon: {
                enemies: [
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot"
                ]
            }
        },
        summonTorturedRobotsYellowCrystal: {
            name: "summonTorturedRobots",
            belongsToMember: true,
            validIfBuff: "Chaos",
            everyNTurns: 10,
            afterNTurns: 9,
            currentTurn: 0,
            summon: {
                enemies: [
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot"
                ]
            }
        },
        summonEnergyCore: {
            belongsToMember: true,
            validIfBuff: "blueEnergyCrystal",
            everyNTurns: 10,
            afterNTurns: 5,
            currentTurn: 0,
            summon: {
                enemy: "energyCore",
            }
        },
        footballPlayer75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "footballPlayer",
            }
        },
        footballPlayer50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "footballPlayer",
            }
        },
        footballPlayer25: {
            belongsToMember: true,
            hppercentage: 0.25,
            summon: {
                enemy: "footballPlayer",
            }
        },
        slotsGambler75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "slotsGambler",
            }
        },
        slotsGambler50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "slotsGambler",
            }
        },
        tacoBandit50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "tacoBandit",
            }
        },
        badChef75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "badChef",
            }
        },
        angryMobMember75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "angryMobMember",
            }
        },
        angryMobMember50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "angryMobMember",
            }
        },
        angryMobMember25: {
            belongsToMember: true,
            hppercentage: 0.25,
            summon: {
                enemy: "angryMobMember",
            }
        },
        totemOfDoom50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "totemOfDoom",
            }
        },
        totemOfDoom25: {
            belongsToMember: true,
            hppercentage: 0.25,
            summon: {
                enemy: "totemOfDoom",
            }
        },
        // aoe hit for ch 5
        tremor: {
            belongsToMember: true,
            name: "Tremor",
            abilityId: "tremor",
            everyNTurns: 5,
            afterNTurns: 2,
            currentTurn: 0,
            areawidedmg: {
                areawide: true,
                name: "Tremor",
                dmg: 50,
                mdPercentage: .9,
                type: "earth"
            }
        },
        // single targ hit for ch 5
        electricOrb: {
            abilityId: "electricOrb",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Electric Orb",
            dmg: 50,
            mdPercentage: 0.6,
            type: "electric",
            everyNTurns: 5,
            afterNTurns: 1,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "electricOrb",
                untargettable: true,
                name: "Electric Orb",
                emoji: "⚡",
                mdPercentage: 1,
                turnsToExpire: 2,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                mdPercentageOnRemove: 1,
                dmgOnExpire: 150
            }
        },
        // summon demon for ch 5
        summonDemon: {
            name: "Summon Demon",
            abilityId: "summonDemon",
            belongsToMember: true,
            everyNTurns: 5,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemy: "demon",
                attackDmg: 150,
                magicDmg: 100,
                hpPlus: 30
            }
        },
        // heal all enemies when one dies in ch 5
        healAll: {
            belongsToMember: true,
            name: "Heal All",
            abilityId: "healAll",
            heal: 20000,
            areawide: true,
            mdPercentage: 1,
        },
        // transfer ability to the other living enemies
        transferAbilities: {
            abilityId: "transferAbilities",
            belongsToMember: true,
            name: "transfer abilities",
            transfer: "endOfTurnEvents"
        },
        removeEnergize: {
            passive: true,
            belongsToMember: true,
            abilityId: "removeEnergize",
            removeEnemyBuff : "Energize",
            name: "De-Energize"
        },
        energize: {
            belongsToMember: true,
            abilityId: "energize",
            name: "Energize",
            buff: {
                name: "Energize",
                emoji: "🤖",
                turnsToExpire: 7,
                abilityId: "energize",
                affects: ["attackDmg", "magicDmg"],
                additive: 400
            }
        },
        chaos: {
            belongsToMember: true,
            abilityId: "chaos",
            name: "Chaos",
            buff: {
                name: "Chaos",
                emoji: "💊",
                turnsToExpire: 7
            }
        },

        radioactive: {
            name: "Radioactive",
            belongsToMember: true,
            processAbility: true,
            abilityId: "radioactive",
            areawide: true,
            validIfBuff: "purpleEnergyCrystal",
            everyNTurns: 10,
            afterNTurns: 5,
            currentTurn: 0,
            status: {
                status: true,
                name: "Radioactive",
                areawide: true,
                ignoreUnique: true,
                ignoreBandaid: true,
                emoji: "☢️",
                turnsToExpire: 7,
                count: 0,
                //TODO: create another ability that keeps count of # of stacks of radioactive
                abilityId: "radioactive",
                special: "after being healed 4 times you will explode for 1500 magic damage"
            }
        },


        furnace: {
            abilityId: "furnace",
            belongsToMember: true,
            processAbility: true,
            validIfBuff: "redEnergyCrystal",
            name: "Furnace",
            type: "fire",
            everyNTurns: 2,
            afterNTurns: 5,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "furnace",
                untargettable: true,
                name: "Furnace",
                emoji: "♨️",
                mdPercentage: 1,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                mdPercentageOnRemove: 1,
                dmgOnExpire: 150
            }
        },

        dismantle: {
            abilityId: "dismantle",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            validIfBuff: "greenEnergyCrystal",
            name: "Dismantle",
            type: "physical",
            everyNTurns: 2,
            afterNTurns: 5,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "dismantle",
                untargettable: true,
                name: "Dismantle",
                emoji: "✂️",
                type: "physical",
                adPercentage: 1,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                adPercentageOnRemove: 1,
                dmgOnExpire: 150
            }
        },

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
            name: "Revive",
            abilityId: "revive",
            special: "remove death",
            cooldown: 0,
            maxcooldown: 1
        },
        focus: {
            name: "Focus",
            abilityId: "focus",
            belongsToMember: true,
            status: {
                focusedBy: "",
                name: "Focus",
                emoji: "👁️",
                special: "focus member"
            }
        },
        freeze: {
            name: "Freeze",
            abilityId: "freeze",
            status: {
                name: "Frozen",
                emoji: "❄️",
                affects: ["armor"],
                multiplier: 0.7
            }
        },
        scold: {
            name: "Scold",
            abilityId: "scold",
            status: {
                name: "Scold",
                emoji: "☔️",
                affects: ["spirit"],
                multiplier: 0.7
            }
        },
        cripple: {
            name: "Cripple",
            abilityId: "cripple",
            status: {
                name: "Crippled",
                emoji: "🤕",
                affects: ["attackDmg"],
                multiplier: 0.8
            }
        },
        weaken: {
            name: "Weaken",
            abilityId: "weaken",
            status: {
                name: "Weakened",
                emoji: "😵 ",
                affects: ["magicDmg"],
                multiplier: 0.8
            }
        },
        finalfortune: {
            special: "take extra turn",
            special2: "after turn party dies",
            areaWide: true
        }
    },
    enemiesToEncounter: {
        summoned: {
            torturedRobot: {
                name: "Tortured Robot",
                abilities: ["attack"],
                buffs: [],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 2500,
                attackDmg: 130,
                magicDmg: 130,
                armor: 600,
                spirit: 600,
                difficulty: "summoned",
                element: "normal"
            },
            energyCore: {
                name: "Energy Core",
                passive: true,
                immuneToAoe: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                effectsOnDeath: [
                    "removeEnergize"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 5000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            redEnergyCrystal: {
                name: "Red Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            blueEnergyCrystal: {
                name: "Blue Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            yellowEnergyCrystal: {
                name: "Yellow Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            greenEnergyCrystal: {
                name: "Green Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            blackEnergyCrystal: {
                name: "Black Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            purpleEnergyCrystal: {
                name: "Purple Energy Crystal",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 8000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 300,
                spirit: 300,
                difficulty: "summoned",
                element: "normal"
            },
            totemOfDoom: {
                name: "Totem Of Doom",
                passive: true,
                abilities: [],
                buffs: [],
                endOfTurnEvents : [
                    "haunt"
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 3000,
                attackDmg: 0,
                magicDmg: 0,
                armor: 750,
                spirit: 750,
                difficulty: "summoned",
                element: "normal"
            },
            demon: {
                name: "Demon",
                abilities: ["attack", "attack", "attack", "shock"],
                buffs: [],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 2300,
                attackDmg: 300,
                magicDmg: 200,
                armor: 600,
                spirit: 600,
                difficulty: "summoned",
                element: "normal"
            },
            tacoBandit: {
                name: "Taco Bandit",
                abilities: ["attack", "attack", "shock", "shock", "orchatasip"],
                buffs: [],
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
                abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
                buffs: [],
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
                abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "barrier"],
                buffs: [],
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
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 145,
                            magicDmgPlus : 145,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 24,
                mdPerPartyMember: 24,
                hp: 6400,
                attackDmg: 600,
                magicDmg: 600,
                armor: 1000,
                spirit: 1000,
                difficulty: "summoned",
                element: "normal"
            }
        },
        easy : [
            {
                name: "Rabbid Wolf",
                abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "tacowall"],
                buffs: [],
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 380,
                attackDmg: 90,
                magicDmg: 90,
                armor: 300,
                spirit: 300,
                difficulty: "easy",
                element: "normal"
            },
            {
                name: "Bad Chef",
                abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "barrier"],
                buffs: [],
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
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
            {
                name: "Angry Mob Member",
                abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
                buffs: [],
                hpPerPartyMember: 170,
                adPerPartyMember: 9,
                mdPerPartyMember: 9,
                hp: 280,
                attackDmg: 80,
                magicDmg: 75,
                armor: 450,
                spirit: 370,
                difficulty: "easy",
                element: "normal"
            },
            {
                name: "Taco Dealer",
                abilities: ["attack", "attack", "drain", "drain", "freeze"],
                buffs: [],
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
        ],
        medium: [
            {
                name: "Taco Bandit",
                abilities: ["attack", "attack", "shock", "shock", "orchatasip"],
                buffs: [],
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
            {
                name: "Taco Thief",
                abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                buffs: [],
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
            {
                name: "Slots Gambler",
                abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                buffs: [],
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
                            attackDmgPlus : 60,
                            magicDmgPlus : 60,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
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
            {
                name: "Samurai Warrior",
                abilities: ["attack", "attack", "iceshards", "iceshards", "drain", "drain", "bandaid"],
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
            {
                name: "Funny Politician",
                abilities: ["attack" , "attack" , "curse", "foodpoisoning", "shoot", "shoot","freeze"],
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
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
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
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
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
            {
                name: "Desperado",
                abilities: [
                    "attack", "attack", "shoot", "shoot", "slash", "slash", "cripple"
                ],
                buffs: [
                    {
                        name: "frenzy",
                        emoji: "😡",
                        onTurnEnd: {
                            attackDmgPlus : 85,
                            magicDmgPlus : 85,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
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
                        "empower",
                        "bomb"
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
                        "focus",
                        "footballPlayer75",
                        "totemOfDoom75",
                        "totemOfDoom50",
                        "totemOfDoom50",
                        "totemOfDoom25",
                        "totemOfDoom25",
                        "totemOfDoom25",
                        "summonDemon",
                        "tremor",
                        "electricOrb"
                    ],
                    abilityOrder: [
                        0, 6, 1,0,2, 3, [1,2], 0
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
                        "explode",
                        "healAll"
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
            // 1 : 1 boss, 1 hard, 2 mediums, 1 easy
            // 2 : 1 boss, 2 hard, 2 medium
            // 3 : 1 new boss, 1 hard, 3 medium (dps check) 30k hp or smt
            // 4 : 2 new boss, 1 hard, 2 medium  (2 bosses)
            1 :{
                enemies: [
                    {
                        name: "Angry Mob Member",
                        abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
                        buffs: [],
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
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
                points: 23
            },
            2: {
                enemies: [
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
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
                        abilities: ["attack", "attack", "shock", "shock", "orchatasip"],
                        buffs: [],
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
                        abilities: ["attack" , "attack" , "curse", "foodpoisoning", "shoot", "shoot","freeze"],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 65,
                                    magicDmgPlus : 65,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
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
                            "attack", "attack", "shoot", "shoot", "slash", "slash", "cripple",
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 2,
                                    startTurn: 3
                                }
                            }
                        ],
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
                points: 49
            },
            3: {
                enemies: [
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
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
                        abilities: [
                            "attack", "crush", "shock"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 95,
                                    magicDmgPlus : 95,
                                    everyNTurns: 2,
                                    startTurn: 1
                                }
                            }
                        ],
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
                        attackDmg: 460,
                        magicDmg: 390,
                        armor: 2350,
                        spirit: 2350,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Taco Thief",
                        abilities: ["attack", "attack", "flameblast", "flameblast", "orchatasip"],
                        buffs: [],
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
                points: 93
            },
            4: {
                enemies: [
                    {
                        name: "Dictator",
                        abilities: [
                            "attack", "poke", "flameblast", "foodpoisoning", "bomb", "guac"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 75,
                                    magicDmgPlus : 75,
                                    everyNTurns: 2,
                                    startTurn: 3
                                }
                            }
                        ],
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
                        attackDmg: 365,
                        magicDmg: 345,
                        armor: 2350,
                        spirit: 2350,
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 75,
                                    magicDmgPlus : 75,
                                    everyNTurns: 2,
                                    startTurn: 2
                                }
                            }
                        ],
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
                        attackDmg: 360,
                        magicDmg: 429,
                        armor: 2350,
                        spirit: 2350,
                        difficulty: "boss",
                        element: "normal"
                    },
                    {
                        name: "Slots Gambler",
                        abilities: ["attack", "attack", "elixir", "elixir", "orchatasip"],
                        buffs: [],
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
                        abilities: ["attack", "attack", "foodpoisoning", "foodpoisoning", "barrier"],
                        buffs: [],
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
                        abilities: ["attack", "attack", "foodpoisoning", "iceshards", "iceshards", "cripple"],
                        buffs: [],
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
                points: 139
            },
            5: {
                enemies: [
                    // 3 bosses, each has a special ability
                    // when one of the bosses dies, the other 2 gain the ability at the current CD of the ability
                    // all bosses get healed, and dmg gets increased as well
                    {
                        name: "Taco Bandit",
                        abilities: ["attack", "attack", "shock", "shock", "orchatasip"],
                        buffs: [],
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
                        abilities: ["attack", "attack", "shock", "shock", "orchatasip"],
                        buffs: [],
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 1
                                }
                            }
                        ],
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
                        attackDmg: 310,
                        magicDmg: 320,
                        armor: 1650,
                        spirit: 2350,
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 2
                                }
                            }
                        ],
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
                        attackDmg: 310,
                        magicDmg: 310,
                        armor: 2050,
                        spirit: 2050,
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
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 85,
                                    magicDmgPlus : 85,
                                    everyNTurns: 3,
                                    startTurn: 3
                                }
                            }
                        ],
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
                        attackDmg: 260,
                        magicDmg: 290,
                        armor: 2350,
                        spirit: 1650,
                        difficulty: "boss",
                        element: "normal"
                    },
                ],
                points: 681
            },
            6: {
                // 4 energy crystals
                // shadowbolt, and regular attack
                // red crystal = damage to 3 enemies, green = damage to everyone
                // yellow = abilities more often, aoe abilities, black = summon 6 minions
                // purple = status on target, after 3 statuses they explode
                // blue = 1 cooldown per ability, effect ends when new crystals appear
                description: "**Energy Crystals:** \nRed - grants Furnace(magical)\nGreen- grants Dismantle(physical)\nBlack - Summons Tortured Robots\nBlue - Summons Energy Core(Immune to areawide damage)\nYellow - Rocket Strike becomes areawide, reduces Furnace, Dismantle, Rocket Strike cooldown by 1 turn, Summon Tortured Robot by 6 turns\nPurple - affects with Radioactive(direct healing grants an additional stack of Radioactive, at 5 stacks you explode for 1300 damage)\nEnergy Core - Grants Energize to the boss upon being summoned, Energize lasts 6 turns (+400 attack, magic), upon death causes cleansing which removes Energized from all units\nLaser Beam - Physical, Rocket Strike - Magical",
                timed: true,
                timedPerTurn: 25000,
                enemies: [
                    {
                        name: "A182-Type2",
                        abilities: [
                            "laserBeam", "flameblast", "storm", "iceshards"
                        ],
                        buffs: [
                            {
                                name: "frenzy",
                                emoji: "😡",
                                onTurnEnd: {
                                    attackDmgPlus : 10000,
                                    magicDmgPlus : 10000,
                                    everyNTurns: 1,
                                    startTurn: 62
                                }
                            }
                        ],
                        abilityOrder: [
                            [0,1], [0,1], [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1],[0,1],[0,1], [0,1],[0,1],[0,1],[0,1],[0,1],[0,1],[0,1],
                                          [0,1], 3, 2, 3, 3, 3, 3, 3, 3
                        ],
                        endOfTurnEvents : [
                            "focus", "summonEnergyCrystalsA",
                            // TODO: Randomize summoning of crystals
                            "summonEnergyCrystalsB", "summonEnergyCrystalsC", "summonEnergyCrystalsD",
                            "summonEnergyCrystalsE", "summonEnergyCrystalsF",
                            "absorbEnergyCrystals", 
                            "rocketStrike",
                            // TODO: give energy core +dmg to the boss
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
                        attackDmg: 1200,
                        magicDmg: 800,
                        armor: 2350,
                        spirit: 2350,
                        difficulty: "boss",
                        element: "normal"
                    }
                ],
                points: 929
            }
        }
    }    
}