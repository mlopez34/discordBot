module.exports = {

    rpgAbilities: {
        attack : {
            name: "Attack",
            abilityId: "attack",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },
        stab : {
            name: "Stab",
            abilityId: "stab",
            dmg: 85,
            adPercentage: 1,
            description: "Deal 85 physical damage + 100% of your attack damage",
            type: "physical"
        },
        // new abiltiies
        impale : {
            name: "Impale",
            abilityId: "impale",
            dmg: 125,
            adPercentage: 1.1,
            description: "Deal 125 physical damage + 110% of your attack damage and 40 physical damage + 30% to 1 random enemy",
            type: "physical",
            special: {
                name: "Impale",
                abilityId: "impale",
                randomTargets: 1,
                dmg: 40,
                adPercentage: 0.3,
                type: "physical"
            },
            type: "physical"
        },
        assist: {
            name: "Assist", // binding heal
            abilityId: "assist",
            heal: 50,
            mdPercentage: 0.85,
            description: "Heal your target for 50 + 85% of your magical damage and heal your target for 50 + 85% of your magical damage",
            selfUntargettable: true,
            special: {
                name: "Assist",
                abilityId: "assist",
                heal: 50,
                selfHeal: 50,
                mdPercentage: 0.85,
            }
        },

        nourish: {
            name: "Nourish",
            abilityId: "nourish",
            heal: 50,
            mdPercentage: 0.8,
            description: "Heal your target for 50 + 80% of your magical damage and 3 additional friendly players for 50%, 30%, and 10%",
            special: {
                name: "Nourish",
                abilityId: "nourish",
                prioritizeLowestHp: true,
                heal: 50,
                additionalTargets: 3,
                mdPercentage: 0,
                mdPercentages: [0.5, 0.3, 0.1],
            }
        },

        recover: {
            name:"Recover",
            abilityId: "recover",
            selfTarget: true,
            description: "Heal yourself for 50 + 20% of your armor and spirit, lasts 3 turns",
            hot: {
                name: "Recover",
                heal: 50,
                emoji: "<:recover:479296605237805056>",
                arAndSpPercentage: 0.2,
                healingOnHotApply: false,
                turnsToExpire: 3,
                healingOnDotExpire: false,
                healingOnExpire: 0
            }
        },

        absorb: {
            name: "Absorb",
            abilityId: "absorb",
            absorb: 50,
            mdPercentage: 0.45,
        },

        shell : {
            name : "Shell",
            abilityId: "shell",
            cooldown: 0,
            maxcooldown: 8,
            description: "Reduce all damage taken by 33% for 3 turns 8 turn cooldown",
            buff: {
                selfbuff: true,
                buff: true,
                name: "Shell",
                emoji : "<:shell:479293276462252042>",
                affectsGlobal: ["damageTakenPercentage"],
                turnsToExpire: 3,
                multiplier: 0.67
            }
        },

        overload : {
            name : "Overload",
            abilityId: "overload",
            buff: {
                name: "Overloading",
                abilityId: "overloading",
                emoji : "<:overload:479301622275637248>",
                turnsToExpire: 1,
                addDamageTaken: true,
                damageOnExpireFromDamageTaken: true
            }
        },

        charge: {
            name:"Charge",
            abilityId: "charge",
            limitDefensive : true,
            areawide: true,
            targets: "friendly",
            description: "Limit ability - increase your groups max hp by 20% lasts 3 turns",
            buff: {
                buff: true,
                areawide: true,
                name: "Charge",
                abilityId: "charge",
                emoji : "<:charge:479293276461989908>",
                turnsToExpire: 3,
                affects: ["maxhp"],
                multiplier: 1.2
            }
        },

        paralyze: {
            name: "Paralyze",
            abilityId: "paralyze",
            maxcooldown: 5,
            cooldown: 0,
            description: "Paralyze a player or easy, medium, summoned difficulty enemy for 3 turns, 5 turn cooldown, invalid if damage is taken",
            difficultiesAllowed: [
                "easy",
                "medium",
                "summoned"
            ],
            status: {
                status: true,
                abilityId: "paralyze",
                name: "Paralyze",
                emoji: "<:paralyze:479294904900517888>",
                turnsToExpire: 3,
                setAbleToAttack: false,
                invalidOnDamage: true
            }
        },

        // new abilities end
        claw : {
            name: "Claw",
            abilityId: "claw",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },
        corrupt : {
            name: "Corrupt",
            abilityId: "corrupt",
            dmg: 50,
            adPercentage: 1.2,
            type: "physical"
        },
        shadowBurst : {
            name: "Shadow Burst",
            abilityId: "shadowBurst",
            dmg: 50,
            mdPercentage: 1.5,
            type: "shadow"
        },
        frostBlast : {
            name: "Frost Blast",
            abilityId: "frostBlast",
            dmg: 50,
            mdPercentage: 1.5,
            type: "ice"
        },
        crush : {
            name: "Crush",
            abilityId: "crush",
            dmg: 50,
            adPercentage: 1.35,
            type: "physical"
        },
        ferociousBite : {
            name: "Ferocious Bite",
            abilityId: "ferociousBite",
            dmg: 50,
            adPercentage: 1.15,
            type: "physical"
        },
        tacoheal : {
            name: "Heal",
            abilityId: "tacoheal",
            description: "Heal your target for 70 + 127% of your current magical damage",
            heal: 70,
            mdPercentage: 1.27
        },
        replenish : {
            name: "Replenish",
            abilityId: "replenish",
            special: "remove death",
            description: "Limit ability - Heal your target for 450 + 190% of your current magical damage - if your target is dead you will revive them",
            heal: 450,
            mdPercentage: 1.9,
            limitDefensive : true
        },
        bandaid : {
            name: "Bandaid",
            abilityId: "bandaid",
            description: "Heal your target for 20 + 60% of your current magical damage and remove all basic statuses",
            heal: 20,
            mdPercentage: 0.6,
            special: "remove status"
        },
        orchatasip: {
            name:"Orchata Sip",
            abilityId: "orchatasip",
            description: "Heal your target over time for 150 + 155% of your magical damage over 5 turns",
            hot: {
                name: "Orchata Sip",
                heal: 150,
                emoji: "<:orchatasip:479296604831219714>",
                mdPercentage: 1.55,
                healingOnHotApply: false,
                turnsToExpire: 5,
                healingOnDotExpire: false,
                healingOnExpire: 0
            }
        },
        elixir: {
            name: "Elixir",
            abilityId: "elixir",
            description: "Heal the group for 35 + 60% of your current magical damage, 1 turn cooldown",
            heal: 35,
            cooldown: 0,
            maxcooldown: 1,
            mdPercentage: 0.6,
            areawide: true,
            targets: "friendly"
        },
        megaelixir: {
            name: "Mega Elixir",
            abilityId: "megaelixir",
            description: "Limit ability - Heal the group for 200 + 100% of your current magical damage",
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
            description: "deal 75 damage + 115% of your physical damage over 4 turns",
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
            description: "Deal 75 damage + 115% of your magical damage over 4 turns",
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
        tacowall: {
            name: "Taco Wall",
            abilityId: "tacowall",
            description: "Increase your target's spirit by 100%",
            buff: {
                name: "Taco Wall",
                emoji : "<:tacowall:479293276424372255>",
                affects: ["spirit"],
                multiplier: 2
            }
        },
        shield: {
            name: "Shield",
            abilityId: "shield",
            description: "Increase your target's armor by 100%",
            buff: {
                name: "Shield",
                emoji: "<:shield:479293276751659039>",
                affects: ["armor"],
                multiplier: 2
            }
        },
        barrier: {
            name: "Barrier",
            abilityId: "barrier",
            description: "Increase your target's spirit by 650",
            buff: {
                name: "Barrier",
                emoji: "<:barrier:479293276491350047>",
                affects: ["spirit"],
                additive: 650
            }
        },
        protect: {
            name: "Protect",
            abilityId: "protect",
            description: "Increase your target's armor by 650",
            buff: {
                name: "Protect",
                emoji: "<:protect:479293276378103825>",
                affects: ["armor"],
                additive: 650
            }
        },
        empower: {
            name: "Empower",
            abilityId: "empower",
            areawide: true,
            targets: "friendly",
            cooldown: 0,
            maxcooldown: 5,
            description: "Increase the group's magical damage and attack damage by 60% for 4 turns - 10 turn cooldown, applies Exhausted",
            buff: {
                buff: true,
                areawide: true,
                name: "Empower",
                abilityId: "empower",
                emoji: "<:empower:479293276298412033>",
                turnsToExpire: 4,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.6
            },
            status: {
                name: "Exhausted",
                status: true,
                areawide: true,
                ignoreBandaid: true,
                selfDebuff: true,
                emoji: "<:exhausted:479294904858836992>",
                buffToStop: "empower",
                turnsToExpire: 10,
            }
        },
        flameblast: {
            name: "Flame Blast",
            abilityId: "flameblast",
            dmg: 50,
            mdPercentage: 1,
            description: "Deal 50 damage + 100% of your magical damage, applies burning which deals 20 damage + 90% of your magical damage over 5 turns",
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
        poison: {
            name: "Poison",
            abilityId: "poison",
            dmg: 50,
            mdPercentage: 1,
            type: "poison",
            description: "Deal 50 damage + 100% of your magical damage, applies poison which deals 20 damage + 80% of your magical damage over 3 turns",
            dot: {
                name: "Poison",
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
        foodpoisoning: {
            name: "Food Poisoning",
            abilityId: "foodpoisoning",
            dmg: 50,
            mdPercentage: 1,
            type: "poison",
            description: "Deal 50 damage + 100% of your magical damage, applies food poisoning which deals 20 damage + 80% of your magical damage over 3 turns",
            dot: {
                name: "Food Poisoning",
                dmg: 20,
                mdPercentage: .8,
                emoji : "<:foodpoisoning:479296558672773120>",
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
            adPercentage: 1,
            type: "physical",
            description: "Deal 50 damage + 100% of your attack damage, applies uppercut which deals 20 damage + 80% of your attack damage over 3 turns",
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
            description: "Deal 45 damage + 60% of your magic damage to all enemies",
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
            description: "Deal 45 damage + 60% of your attack damage to all enemies",
            type: "physical",
            areawide: true,
            targets: "enemy"
        },
        meteor: {
            name: "Meteor",
            abilityId: "meteor",
            dmg: 305,
            mdPercentage: 0.6,
            type: "shadow",
            areawide: true,
            targets: "enemy"
        },
        destructionBeam: {
            name: "Destructive Beam",
            abilityId: "destructionBeam",
            dmg: 305,
            adPercentage: 0.4,
            type: "physical",
            areawide: true,
            targets: "enemy"
        },
        quake: {
            name: "Quake",
            abilityId: "quake",
            dmg: 305,
            adPercentage: 0.6,
            type: "physical",
            areawide: true,
            targets: "enemy"
        },
        shoot: {
            name: "Shoot",
            abilityId: "shoot",
            description: "Deal 125 damage + 143% of your attack damage, 6 charges",
            dmg: 125,
            charges: 6,
            maxcharges: 6,
            adPercentage: 1.43,
            type: "physical"
        },
        shock: {
            name: "Shock",
            abilityId: "shock",
            dmg: 120,
            mdPercentage: 1.43,
            description: "Deal 120 damage + 143% of your magic damage, deal 20% damage dealt to yourself",
            type: "electric",
            special: "selfdamage",
            selfdamage: 15
        },
        disintegrate: {
            name: "Disintegrate",
            abilityId: "disintegrate",
            dmg: 120,
            mdPercentage: 1.1,
            type: "electric"
        },
        slap: {
            name: "Slap",
            abilityId: "slap",
            dmg: 120,
            adPercentage: 1,
            type: "physical"
        },
        /*
        limit abilities
        */
        headshot: {
            name: "Headshot",
            abilityId: "headshot",
            limitOffensive: true,
            description: "Limit ability - Deal 480 damage + 200% of your attack damage",
            dmg: 480,
            adPercentage: 2,
            type: "physical"
            
        },
        execute: {
            name: "Execute",
            abilityId: "execute",
            limitOffensive: true,
            description: "Limit ability - Deal 480 damage + 200% of your attack damage",
            dmg: 480,
            adPercentage: 2,
            type: "physical"
            
        },
        decapitate: {
            name: "Decapitate",
            abilityId: "decapitate",
            limitOffensive: true,
            description: "Limit ability - Deal 480 damage + 200% of your attack damage",
            dmg: 480,
            adPercentage: 2,
            type: "physical"
            
        },
        flare: {
            name: "Flare",
            abilityId: "flare",
            limitOffensive: true,
            description: "Limit ability - Deal 480 damage + 200% of your magical damage",
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
            description: "Limit ability - Deal 120 damage + 150% of your magical damage",
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
            description: "Limit ability - Deal 120 damage + 150% of your attack damage",
            type: "physical",
            areawide: true,
            targets: "enemy"
            
        },
        rockthrow: {
            dmg: 45,
            abilityId: "rockthrow",
            type: "physical",
            adPercentage: 0.8,
            description: "Deal 45 damage + 80% of your attack damage, gain a stack of warmup, at 5 stacks deal an extra rockthrow for 130% of attack damage",
            special: "warm up",
            name: "Rock Throw",
            buff: {
                selfbuff: true,
                stacksOfWarmUp: 1,
                emoji: "<:warmup:479293276579430430>",
                name: "Warm Up",
                maxStacks: 4,
                onMaxStacksGainBuff: "safeGuard",
                adPercentageAtMaxStacks: 1.3,
                atMaxStacksDealDamage: 175
            }
        },
        safeGuard : {
            name : "Safe Guard",
            abilityId: "safeGuard",
            cooldown: 0,
            maxcooldown: 8,
            description: "Reduce all damage taken by 4%",
            buff: {
                buff: true,
                name: "Safe Guard",
                emoji : "✝️",
                affectsGlobal: ["damageTakenPercentage"],
                maxAllowedStacks : 4,
                currentStacks: 1,
                multiplierPerStack: -0.04,
                multiplier: 0.96
            }
        },
        drain: {
            name: "Drain",
            abilityId: "drain",
            type: "physical",
            description: "Deal 40 damage + 100% of your attack damage, heal yourself for 50 + 55% of your magical damage",
            special: {
                name: "Drain",
                adPercentage: 1,
                dmg: 40,
                heal: 50,
                mdPercentage: 0.9,
                healPercentage: 0.55
            }
        },
        guac: {
            name: "Guac",
            abilityId: "guac",
            type: "shadow",
            description: "Deal 85 damage + 80% of your magical damage, deal an additional 20% of your magical damage per damage over time on the target",
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
            description: "Deal 85 damage + 80% of your attack damage, deal an additional 20% of your attack damage per damage over time on the target",
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
            description: "Your spells are cast before the enemy spells",
            buff: {
                name: "Haste",
                emoji: "<:haste:479293276424241163>"
            }
        },

        resistanceaura: {
            passive: true,
            abilityId: "resistanceaura",
            name: "Resistance Aura",
            description: "Aura - increase the group's armor and spirit by 10%",
            buff: {
                buff: true,
                aura: true,
                // spirit
                abilityId: "resistanceaura",
                affects: ["armor", "spirit"],
                multiplier: 1.1,
                name: "Resistance Aura",
                emoji: "<:resistance_aura:479287371242799114>"
            }
        },
        divineaura: {
            passive: true,
            abilityId: "divineaura",
            name: "Divine Aura",
            description: "Aura - increase the group's magic damage by 10%",
            buff: {
                buff: true,
                aura: true,
                abilityId: "divineaura",
                // armor
                affects: [, "magicDmg"],
                multiplier: 1.1,
                name: "Divine Aura",
                emoji: "<:divine_aura:479287370789683210>"
            }
        },
        fierceshout: {
            passive: true,
            abilityId: "fierceshout",
            name: "Fierce Shout",
            description: "Aura - increase the group's attack damage by 10%",
            buff: {
                buff: true,
                aura: true,
                affects: ["attackDmg"],
                multiplier: 1.1,
                abilityId: "fierceshout",
                name: "Fierce Shout",
                emoji: "<:fierce_shout:479287370970169364>"
            }
        },
        rallyingroar: {
            passive: true,
            abilityId: "rallyingroar",
            name: "Rallying Roar",
            description: "Aura - increase the group's max hp by 5%",
            buff: {
                // hp
                buff: true,
                aura: true,
                abilityId: "rallyingroar",
                affects: ["maxhp"],
                multiplier: 1.05,
                name: "Rallying Roar",
                emoji: "<:rallying_roar:479287371045535755>"
            }
        },

        /*
        challenge 3
        */
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
                emoji: "<:decay:479296558748270601>",
                dmgOnDotApply: false,
                turnsToExpire: 6,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        /*
        challenge 4
        */
        bomb: {
            name:"Bomb",
            abilityId: "bomb",
            type:"fire",
            dot: {
                name: "Bomb",
                type:"fire",
                dmg: 1,
                mdPercentage: 1,
                emoji: "<:bomb:479296552096235520>",
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
        /*
        challenge 5
        */

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
                emoji: "<:electricorb:479296558375108610>",
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
        summonTentacle: {
            name: "Summon Tentacle",
            abilityId: "summonTentacle",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 20,
            currentTurn: 0,
            summon: {
                enemy: "tentacle",
                attackDmg: 240,
                magicDmg: 240,
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
        /*
        challenge 6
        */
        rocketStrike : {
            name: "Rocket Strike",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 3,
            afterNTurns: 2,
            currentTurn: 0,
            abilityId: "rocketStrike",
            dmg: 50,
            mdPercentage: 0.8,
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
            mdPercentage: 0.85,
            type: "magical",
            areawide: true,
            areawidedmg: {
                areawide: true,
                name: "Rocket Strike",
                dmg: 50,
                mdPercentage: 0.85,
                type: "magical"
            }
        },
        laserBeam : {
            name: "Laser Beam",
            abilityId: "laserBeam",
            dmg: 50,
            adPercentage: 1.5,
            type: "physical"
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
                emoji: "<:black_energy_crystal:479287999075450912>"
            }
        },
        blueEnergyCrystal: {
            name: "blueEnergyCrystal",
            abilityId: "blueEnergyCrystal",
            buff: {
                name: "blueEnergyCrystal",
                turnsToExpire: 7,
                emoji: "<:blue_energy_crystal:479287999243354112>"
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
                emoji: "<:yellow_energy_crystal:479287999285166093>"
            }
        },
        purpleEnergyCrystal: {
            name: "purpleEnergyCrystal",
            abilityId: "purpleEnergyCrystal",
            buff: {
                name: "purpleEnergyCrystal",
                turnsToExpire: 7,
                emoji: "<:purple_energy_crystal:479287999297880074>",
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
                emoji: "<:green_energy_crystal:479287999125913600>"
            }
        },
        redEnergyCrystal: {
            name: "redEnergyCrystal",
            abilityId: "redEnergyCrystal",
            buff: {
                name: "redEnergyCrystal",
                turnsToExpire: 7,
                emoji: "<:red_energy_crystal:479287999138627584>"
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
        removeEnergize: {
            passive: true,
            belongsToMember: true,
            abilityId: "removeEnergize",
            removeEnemyBuff : "Energize",
            name: "De-Energize"
        },
        removeEntomb: {
            passive: true,
            belongsToMember: true,
            abilityId: "removeEntomb",
            removeEnemyBuff : "Entomb",
            name: "De-Entomb"
        },
        energize: {
            belongsToMember: true,
            abilityId: "energize",
            name: "Energize",
            buff: {
                name: "Energize",
                emoji: "<:energize:479288026485227530>",
                turnsToExpire: 7,
                abilityId: "energize",
                affects: ["attackDmg", "magicDmg"],
                additive: 350
            }
        },
        entomb75: {
            belongsToMember: true,
            processAbility: true,
            hppercentage: 0.75,
            oneTimeCast: true,
            targetSelf: true,
            abilityId: "entomb75",
            name: "Entomb",
            buff: {
                name: "Entomb",
                emoji: "<:entomb:479288026388889621>",
                turnsToExpire: 5,
                abilityId: "entomb75",
                setAbleToAttack: false,
                setAbleToTakeDamage: false,
                setAbleToBeHealed: false
                //TODO set abletoattack false, abletotakedamage false, abletoheal false endofturndisable stays false
            }
        },
        entomb50: {
            belongsToMember: true,
            processAbility: true,
            targetSelf: true,
            hppercentage: 0.5,
            oneTimeCast: true,
            targetSelf: true,
            abilityId: "entomb50",
            name: "Entomb",
            buff: {
                name: "Entomb",
                emoji: "<:entomb:479288026388889621>",
                turnsToExpire: 8,
                abilityId: "entomb50",
                setAbleToAttack: false,
                setAbleToTakeDamage: false,
                setAbleToBeHealed: false
                //TODO set abletoattack false, abletotakedamage false, abletoheal false endofturndisable stays false
            }
        },
        entomb25: {
            belongsToMember: true,
            processAbility: true,
            targetSelf: true,
            hppercentage: 0.25,
            oneTimeCast: true,
            targetSelf: true,
            abilityId: "entomb25",
            name: "Entomb",
            buff: {
                name: "Entomb",
                emoji: "<:entomb:479288026388889621>",
                turnsToExpire: 8,
                abilityId: "entomb25",
                setAbleToAttack: false,
                setAbleToTakeDamage: false,
                setAbleToBeHealed: false
                //TODO set abletoattack false, abletotakedamage false, abletoheal false endofturndisable stays false
            }
        },
        chaos: {
            belongsToMember: true,
            abilityId: "chaos",
            name: "Chaos",
            buff: {
                name: "Chaos",
                emoji: "<:chaos:479288026569244673>",
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
                emoji: "<:radioactive:479288026669776916>",
                turnsToExpire: 8,
                count: 0,
                abilityId: "radioactive",
                special: "after being healed 4 times you will explode for 1500 magic damage"
            }
        },
        furnace: {
            abilityId: "furnace",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
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
                emoji: "<:furnace:479288026527432716>",
                mdPercentage: 1,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                mdPercentageOnRemove: 1,
                dmgOnExpire: 250
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
                emoji: "<:dismantle:479288026833354752>",
                type: "physical",
                adPercentage: 1,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                adPercentageOnRemove: 1,
                dmgOnExpire: 250
            }
        },
        /*
        challenge 10
        */
       entombAll20: {
            belongsToMember: true,
            processAbility: true,
            hppercentage: 0.20,
            oneTimeCast: true,
            targetSelf: true,
            onDeathEffect: true,
            effectDone: false,
            invalidIfBuff: "entombAll20",
            abilityId: "entombAll20",
            name: "Entomb",
            buff: {
                name: "Entomb",
                areawide: true,
                emoji: "<:entomb:479288026388889621>",
                turnsToExpire: 500,
                abilityId: "entombAll20",
                setAbleToAttack: false,
                setAbleToTakeDamage: false,
                setAbleToBeHealed: false,
                removeEndOfTurn: true,
                removeBuffs: true
            }
        },

        killAllEntomb: {
            passive: true,
            belongsToMember: true,
            abilityId: "killAllEntomb",
            killIfEnemyBuff : "Entomb",
            name: "KillAll-Entomb" // on death, kill anything with entomb
        },
        shatter: {
            name:"Shatter",
            abilityId: "shatter",
            type:"earth",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 2,
            ignoreFocus: true,
            afterNTurns: 2,
            currentTurn: 0,
            dot: {
                name: "Shatter",
                type:"earth",
                dmg: 1000,
                untargettable: true,
                mdPercentage: 1,
                emoji: "<:shatter:479347500751388687>",
                onBandaidCasterGainsBuff: "strength",
                abilityTriggerOnDeath: "strength",
                ignoreUnique: true,
                dmgOnDotApply: false,
                turnsToExpire: 15,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        break: {
            // ignore unique
            name:"Break",
            abilityId: "break",
            type:"earth",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 2,
            currentTurn: 0,
            status: {
                name: "Break",
                emoji: "<:break:479347734722379777>",
                onBandaidCasterGainsBuff: "strength",
                abilityTriggerOnDeath: "strength",
                ignoreUnique: true,
                turnsToExpire: 15,
                affects: ["spirit"],
                additive: -800
            }
        },
        strength: {
            name: "Strength",
            abilityId: "strength",
            buff: {
                buff: true,
                name: "Strength",
                abilityId: "strength",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 20,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.1
            }
        },
        strengthFever: {
            name: "Strength",
            abilityId: "strengthFever",
            buff: {
                buff: true,
                name: "Strength",
                abilityId: "strengthFever",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 50,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.33
            }
        },

        // summon Lava and Sky elemental summoned upon entomb / 20% HP
        summonLavaElemental: {
            name: "Summon Lava Elemental",
            abilityId: "summonLavaElemental",
            belongsToMember: true,
            effectDone: false,
            hppercentage: 0.20,
            summon: {
                enemy: "lavaElemental",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 300
            }
        },
        summonLavaElementalDeath: {
            name: "Summon Lava Elemental",
            abilityId: "summonLavaElementalDeath",
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
            summon: {
                enemy: "lavaElemental",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 300
            }
        },
        summonSkyElemental: {
            name: "Summon Sky Elemental",
            abilityId: "summonSkyElemental",
            belongsToMember: true,
            effectDone: false,
            hppercentage: 0.20,
            summon: {
                enemy: "skyElemental",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 300
            }
        },
        summonSkyElementalDeath: {
            name: "Summon Sky Elemental",
            abilityId: "summonSkyElementalDeath",
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
            summon: {
                enemy: "skyElemental",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 300
            }
        },
        // whenever sky or lava reach 20% the anomaly is the HP of sky, lava, and golems combined
        summonAnomaly: {
            name: "Summon Anomaly",
            abilityId: "summonAnomaly",
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
            hppercentage: 0.20,
            summon: {
                enemy: "anomaly",
                // HP based on hp of 4 enemies
                drainHpFrom: ["Sky Elemental", "Lava Elementa", "Asteroid Golem", "Stone Giant"],
                hpMultiplier: 4,
                attackDmg: 240,
                magicDmg: 250,
                hpPlus: 0
            }
        },

        // deal damage to self (lava elemental) every turn
        anger: {
            name: "Anger",
            abilityId: "anger",
            mdPercentage: 1,
            dmg: 100,
            type: "fire",
            special: "selfdamage",
            selfdamage: 15000
        },

        // every 4 turns
        rampage: {
            name: "Rampage",
            abilityId: "rampage",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            ignoreBandaid: true,
            everyNTurns: 7,
            afterNTurns: 4,
            currentTurn: 0,
            status: {
                focusedBy: "",
                abilityId: "rampage",
                status: true,
                ignoreFocus: true,
                ignoreBandaid: true,
                name: "Rampage",
                turnsToExpire: 4,
                emoji: "<:rampage:479348722782830603>",
                abilityTriggerOnDeath: "healAllRampage"                
            }
        },
        healAllRampage: {
            belongsToMember: true,
            name: "Heal All",
            abilityId: "healAllRampage",
            heal: 100000,
            areawide: true,
            mdPercentage: 1,
        },
        igniteLava: {
            name : "Ignite Lava",
            belongsToMember: true,
            processAbility: true,
            abilityId: "igniteLava",
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 0,
            targetWithName: "Lava Elemental",
            dmg: 700,
            mdPercentage: 1
        },

        igniteAir: {
            name : "Ignite Air",
            belongsToMember: true,
            processAbility: true,
            abilityId: "igniteAir",
            everyNTurns: 3,
            afterNTurns: 2,
            currentTurn: 0,
            targetWithName: "Sky Elemental",
            dmg: 100,
            mdPercentage: 1
        },

        fury : {
            name : "Fury",
            belongsToMember: true,
            processAbility: true,
            abilityId: "fury",
            everyNTurns: 100,
            afterNTurns: 1,
            currentTurn: 0,
            buff: {
                selfbuff: true,
                buff: true,
                name: "Fury",
                additionalDescription: " is gaining damage based on lost health",
                emoji : "<:fury:479349359281176577>",
                affects: ["attackDmg", "magicDmg"],
                turnsToExpire: 300,
                multiplierBasedOnLostHp: .01
            }
        },

        // lava and sky elemental aoe
        hurricane: {
            belongsToMember: true,
            name: "Hurricane",
            abilityId: "hurricane",
            everyNTurns: 8,
            afterNTurns: 8,
            currentTurn: 0,
            type: "physical",
            areawidedmg: {
                areawide: true,
                name: "Hurricane",
                dmg: 1300,
                adPercentage: 1,
                type: "physical"
            }
        },

        engulf: {
            belongsToMember: true,
            name: "Engulf",
            abilityId: "engulf",
            everyNTurns: 8,
            afterNTurns: 4,
            currentTurn: 0,
            areawidedmg: {
                areawide: true,
                name: "engulf",
                dmg: 1300,
                mdPercentage: 1,
                type: "fire"
            }
        },
        // reduces physical damage by 50% - applied when damaging sky elemental
        // removes amplify
        dampen: {
            name : "Dampen",
            abilityId: "dampen",
            buff: {
                buff: true,
                name: "Dampen",
                additionalDescription: " is reducing physical damage taken by 50%",
                emoji : "<:dampen:479301622246408233>",
                affectsGlobal: ["physicalDamageTakenPercentage"],
                turnsToExpire: 10,
                multiplier: 0.5
            },
            removeBuff: "Amplify"
        },
        // reduces magical damage by 50% - applied when damaging lava elemental
        // removes dampen 
        amplify: {
            name : "Amplify",
            abilityId: "amplify",
            buff: {
                buff: true,
                name: "Amplify",
                emoji : "<:amplify:479301622233563136>",
                additionalDescription: " is reducing magical damage taken by 50%",
                affectsGlobal: ["magicDamageTakenPercentage"],
                turnsToExpire: 10,
                multiplier: 0.5
            },
            removeBuff: "Dampen"
        },

        // sky elemental summons this enemy 
        summonSmokeScreen: {
            name: "Summon Smoke Screen",
            abilityId: "summonSmokeScreen",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemy: "smokeScreen",
                attackDmg: 500,
                magicDmg: 500,
                hpPlus: 1000
            }
        },
        summonDweller: {
            name: "Summon Dweller",
            abilityId: "summonDweller",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 6,
            currentTurn: 0,
            summon: {
                enemy: "dweller",
                attackDmg: 500,
                magicDmg: 500,
                hpPlus: 1000
            }
        },

        // aoe every turn
        morphAnomalyMessage: {
            belongsToMember: true,
            hppercentage: 0.20,
            eotMessage: "The golems and elementals morph into an Anomaly",
            deathMessage: "The golems and elementals morph into an Anomaly"
        },
        consume: {
            belongsToMember: true,
            name: "Consume",
            abilityId: "consume",
            everyNTurns: 2,
            afterNTurns: 1,
            currentTurn: 1,
            areawidedmg: {
                areawide: true,
                name: "consume",
                dmg: 100,
                mdPercentage: .25,
                type: "fire"
            }
        },
        // anomaly cast on 2 or 3 players
        burst: {
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            ignoreBandaid: true,
            targetToApplyOn: "random",
            name:"Burst",
            everyNTurns: 5,
            afterNTurns: 1,
            currentTurn: 0,
            abilityId: "burst",
            type:"physical",
            dot: {
                name: "Burst",
                abilityId: "burst",
                ignoreBandaid: true,
                removeDotOnHpPercentage: .99,

                type:"physical",
                dmg: 1000,
                adPercentage: 0.2,
                dmgIncreasePerTick: 400,
                emoji: "🎇",
                dmgOnDotApply: false,
                turnsToExpire: 12,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },

        summonFiends: {
            name: "summonFiends",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 4,
            currentTurn: 0,
            summon: {
                enemies: [
                    "fiend",
                    "fiend",
                    "fiend",
                    "fiend",
                    "fiend",
                    "fiend",
                    "fiend"
                ]
            }
        },
        absorbFiends: {
            abilityId: "absorbFiends",
            belongsToMember: true,
            processAbility: true,
            everyNTurns: 6,
            afterNTurns: 7,
            currentTurn: 0,
            special: "absorb fiends" 
        },

        /*
        endOfTurnEvents
        */
        archvampireRevive: {
            belongsToEvent: true,
            name: "Ressurection",
            abilityId: "archvampireRevive",
            reviveCheck: [
                "Frenzied Vampire",
                "Blood King"
            ],
            afterNTurnsFirstDeath: 4,
            currentTurnsAfterFirstDeath: 0
        },
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
        suckBlood: {
            belongsToMember: true,
            name: "Suck Blood",
            abilityId: "suckBlood",
            dmgaura: true,
            currentHealthPercentageDamage: 0.4,
            everyNTurns: 1,
            minimumDamageToDeal: 70,
            hppercentage: 0.4,
            drainDamage : 0.5,
            areaWideDrain: true,
            type: "physical"
        },
        fever: {
            name:"Fever",
            abilityId: "fever",
            type:"shadow",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 7,
            ignoreFocus: true,
            ignoreBandaid: true,
            afterNTurns: 8,
            currentTurn: 0,
            dot: {
                name: "Fever",
                type:"shadow",
                dmg: 500,
                mdPercentage: 0.25,
                emoji: "<:fever:479298214088933386>",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                ignoreDmgOnTurn: 1,
                turnsToExpire: 5,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        feverChallenge: {
            name:"Fever",
            abilityId: "feverChallenge",
            type:"shadow",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 7,
            ignoreFocus: true,
            ignoreBandaid: true,
            afterNTurns: 8,
            currentTurn: 0,
            dot: {
                name: "Fever",
                abilityId: "feverChallenge",
                type:"shadow",
                dmg: 500,
                mdPercentage: 0.25,
                emoji: "<:fever:479298214088933386>",
                onBandaidCasterGainsBuff: "strengthFever",
                abilityTriggerOnDeath: "strengthFever",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                ignoreDmgOnTurn: 1,
                turnsToExpire: 5,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        deepHatred: {
            name:"Deep Hatred",
            abilityId: "deepHatred",
            type:"physical",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 9,
            ignoreFocus: true,
            ignoreUnique: true,
            afterNTurns: 9,
            currentTurn: 0,
            dot: {
                name: "Deep Hatred",
                type:"physical",
                dmg: 100,
                adPercentage: 30,
                emoji: "<:deep_hatred:479298214340591626>",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                ignoreUnique: true,
                ignoreDmgOnTurn: 1,
                turnsToExpire: 100,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        deepHatredChallenge: {
            name:"Deep Hatred",
            abilityId: "deepHatredChallenge",
            type:"physical",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 10,
            ignoreFocus: true,
            ignoreUnique: true,
            afterNTurns: 10,
            currentTurn: 0,
            dot: {
                name: "Deep Hatred",
                type:"physical",
                dmg: 100,
                adPercentage: 30,
                emoji: "<:deep_hatred:479298214340591626>",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                ignoreDmgOnTurn: 1,
                turnsToExpire: 100,
                dmgOnDotExpire: false,
                dmgOnDotRemove: true,
                dmgOnRemoveAreaWide: true,
                adPercentageOnRemove: 0.25,
                dmgOnRemove: 800,
                dmgOnExpire: 0
            }
        },
        hex: {
            name:"Hex",
            abilityId: "hex",
            type:"shadow",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 6,
            ignoreFocus: true,
            afterNTurns: 5,
            currentTurn: 0,
            dot: {
                name: "Hex",
                type:"shadow",
                dmg: 100,
                untargettable: true,
                mdPercentage: 1,
                ignoreDmgOnTurn: 1,
                emoji: "<:hex:479301622732816403>",
                dmgOnDotApply: false,
                turnsToExpire: 3,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
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
                dmg: 580,
                adPercentage: 0.1,
                type: "physical"
            }
        },
        radiation: {
            onDeathEffect: true,
            effectDone: false,
            processAbility: true,
            ignoreFocus: true,
            targetToApplyOn: "random",
            name:"Radiation",
            abilityId: "radiation",
            type:"shadow",
            dot: {
                dotApplyOnDeath: true,
                areaWideBuffOnRemove: "burningAdrenaline",
                name: "Radiation",
                abilityId: "radiation",
                type:"shadow",
                dmg: 400,
                mdPercentage: 0.1,
                dmgIncreasePerTick: 300,
                emoji: "<:radiation:479298213774491649>",
                dmgOnDotApply: false,
                turnsToExpire: 99,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        burningAdrenaline: {
            name: "Burning Adrenaline",
            abilityId: "burningAdrenaline",
            buff: {
                name: "Burning Adrenaline",
                abilityId: "burningAdrenaline",
                emoji: "<:burning_adrenalin:479298214143459358>",
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.0,
                multiplierPerDotTurn: 0.2,
                checkDotMultiplierPerDotTurn: "radiation"
            }
        },
        /*
        death effects
        */
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
        /*
        special artifact stuff
        */
        superNovaPrepare: {
            belongsToMember: true,
            everyNTurns: 5,
            afterNTurns: 9,
            currentTurn: 0,
            eotMessage: "Corrupted Overmind draws energy for Super Nova"
        },
        bendersLastWish: {
            belongsToMember: true,
            everyNTurns: 5,
            afterNTurns: 9,
            currentTurn: 0,
            eotMessage: "Bender's robotic being is unable to continue existing in current time.\nBender makes his last wish before fading\nAll players with the radioactive buff gain permanent radioactive.\n"
        },
        superNova: {
            belongsToMember: true,
            name: "Super Nova",
            abilityId: "superNova",
            everyNTurns: 5,
            afterNTurns: 10,
            currentTurn: 0,
            areawidedmg: {
                areawide: true,
                name: "Super Nova",
                dmg: 500,
                mdPercentage: 0.9,
                type: "earth"
            }
        },
        vacum1: {
            abilityId: "vacum1",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Vacum",
            dmg: 50,
            mdPercentage: 0.2,
            type: "shadow",
            everyNTurns: 5,
            afterNTurns: 11,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "vacum1",
                untargettable: true,
                name: "Vacum",
                ignoreUnique: true,
                emoji: "<:vacuum:479298214042796032>",
                mdPercentage: 0.8,
                turnsToExpire: 6,
                dmgOnStatusExpire: true,
                dmgOnExpire: 150
            }
        },
        vacum2: {
            abilityId: "vacum2",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Vacum",
            dmg: 50,
            mdPercentage: 0.2,
            type: "shadow",
            everyNTurns: 5,
            afterNTurns: 12,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "vacum2",
                untargettable: true,
                ignoreUnique: true,
                name: "Vacum",
                emoji: "<:vacuum:479298214042796032>",
                mdPercentage: 0.8,
                turnsToExpire: 6,
                dmgOnStatusExpire: true,
                dmgOnExpire: 150
            }
        },
        vacum3: {
            abilityId: "vacum3",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Vacum",
            dmg: 50,
            mdPercentage: 0.2,
            type: "shadow",
            everyNTurns: 5,
            afterNTurns: 13,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "vacum3",
                untargettable: true,
                ignoreUnique: true,
                name: "Vacum",
                emoji: "<:vacuum:479298214042796032>",
                mdPercentage: 0.8,
                turnsToExpire: 6,
                dmgOnStatusExpire: true,
                dmgOnExpire: 150
            }
        },
        soulBurn: {
            abilityId: "soulBurn",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Soul Burn",
            dmg: 50,
            mdPercentage: 0.4,
            type: "shadow",
            everyNTurns: 3,
            afterNTurns: 4,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "soulBurn",
                untargettable: true,
                name: "Soul Burn",
                emoji: "<:soulburn:479301622057402380>",
                mdPercentage: 0.8,
                turnsToExpire: 3,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                mdPercentageOnRemove: 0.8,
                dmgOnExpire: 150
            }
        },
        summonChupacabra: {
            name: "Summon Chupacabra",
            abilityId: "summonChupacabra",
            belongsToMember: true,
            everyNTurns: 3,
            afterNTurns: 7,
            currentTurn: 0,
            summon: {
                enemy: "chupacabra",
                attackDmg: 150,
                magicDmg: 100,
                hpPlus: 30
            }
        },
        summonEscapedRobot: {
            name: "Summon Escaped Robot",
            abilityId: "summonEscapedRobot",
            belongsToMember: true,
            everyNTurns: 20,
            afterNTurns: 20,
            currentTurn: 0,
            summon: {
                enemy: "escapedRobot",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 30
            }
        },

        /*
        challenge 11
        */
       summonAthos: {
            name: "Summon Athos",
            abilityId: "summonAthos",
            belongsToMember: true,
            effectDone: false,
            hppercentage: 0.3,
            summon: {
                enemy: "athos",
                attackDmg: 240,
                magicDmg: 250,
                hpPlus: 0
            }
        },
        summonPorthos: {
            name: "Summon Porthos",
            abilityId: "summonPorthos",
            belongsToMember: true,
            effectDone: false,
            hppercentage: 0.3,
            summon: {
                enemy: "porthos",
                attackDmg: 240,
                magicDmg: 250,
                hpPlus: 0
            }
        },
        summonAramis: {
            name: "Summon Aramis",
            abilityId: "summonAramis",
            belongsToMember: true,
            effectDone: false,
            hppercentage: 0.3,
            summon: {
                enemy: "aramis",
                attackDmg: 240,
                magicDmg: 250,
                hpPlus: 0
            }
        },

        transferDartagnanAbilities: {
            abilityId: "transferDartagnanAbilities",
            belongsToMember: true,
            name: "transfer abilities",
            abilitiesToTransfer: [
                "hammerdownProtocol",
                "pillarRevive",
                "hammerdownPrepare",
                "elementalOrder",
                "elementalOrderPrepare"
            ],
            transferTo: [
                "Athos",
                "Porthos",
                "Aramis"
            ]
        },
        transferAthosAbilities: {
            abilityId: "transferAthosAbilities",
            belongsToMember: true,
            name: "transfer abilities",
            abilitiesToTransfer: [
                "shrink"
            ],
            transferTo: [
                "Porthos",
                "Aramis"
            ]
        },
        transferPortosAbilities: {
            abilityId: "transferPortosAbilities",
            belongsToMember: true,
            name: "transfer abilities",
            abilitiesToTransfer: [
                "summonApparition",
            ],
            transferTo: [
                "Aramis"
            ]
        },

        // deal 25% of current health
        overpower: {
            belongsToMember: true,
            name: "Overpower",
            abilityId: "overpower",
            dmgaura: true,
            hppercentage: .90,
            currentHealthPercentageDamage: 0.80,
            everyNTurns: 1,
            currentTurn: 0,
            afterNTurns: 1,
            type: "physical"
        },

        // summon 4 elemental pillars at the start of the fight turn 2
        // same as summons of 4 on challenge 6
        // DONE radiate aoe at 50% - aoe is 250 dmg
        // check if all are dead every end of turn, if they are, revive them all
        // DONE 2 are physical, 2 are magical

        // on death reduce all damage taken by 50% from either physical or magical
        // multiplicative

        // DONE hammerdown protocol and elemental order - phys / magical
        // DONE deals 1700 physical or 1700 magical

        summonPillars: {
            name: "summonPillars",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 1000,
            afterNTurns: 1,
            currentTurn: 1,
            summon: {
                enemies: [
                    "planchet",
                    "grimaud",
                    "mousqueton",
                    "bazin"
                ]
            }
        },
        // revive the pillars whenever they are all dead
        pillarRevive: {
            belongsToEvent: true,
            everyNTurns: 30,
            afterNTurns: 30,
            currentTurn: 0,
            name: "Ressurection",
            abilityId: "pillarRevive",
            reviveCheck: [
                "Planchet",
                "Grimaud",
                "Mousqueton",
                "Bazin"
            ]
        },

        hammerdownProtocol: {
            belongsToMember: true,
            name: "Hammerdown Protocol",
            abilityId: "hammerdownProtocol",
            everyNTurns: 14,
            afterNTurns: 7,
            currentTurn: 0,
            areawidedmg: {
                areawide: true,
                name: "Hammerdown Protocol",
                dmg: 5500,
                adPercentage: 0.05,
                type: "physical"
            }
        },
        hammerdownPrepare: {
            abilityId: "hammerdownPrepare",
            belongsToMember: true,
            everyNTurns: 14,
            afterNTurns: 5,
            currentTurn: 0,
            eotMessage: "The enemy prepares for a hammerdown protocol"
        },

        elementalOrder: {
            belongsToMember: true,
            name: "Elemental Order",
            abilityId: "elementalOrder",
            everyNTurns: 14,
            afterNTurns: 14,
            currentTurn: 0,
            areawidedmg: {
                areawide: true,
                name: "Elemental Order",
                dmg: 5500,
                mdPercentage: 0.05,
                type: "lightning"
            }
        },

        elementalOrderPrepare: {
            abilityId: "elementalOrderPrepare",
            belongsToMember: true,
            everyNTurns: 14,
            afterNTurns: 12,
            currentTurn: 0,
            eotMessage: "The enemy prepares for a an elemental order"
        },

        elementalBarrier: {
            onDeathEffect: true,
            areawide: true,
            processAbility: true,
            targetToApplyOn: "random",
            name:"Elemental Barrier",
            abilityId: "elementalBarrier",
            buff: {
                buff: true,
                areawide: true,
                ignoreUnique: true,
                buffPartyMembers: true,
                name: "Elemental Barrier",
                abilityId: "elementalBarrier",
                emoji: "🔶",
                additionalDescription: " is reducing magical damage taken by 50%",
                affectsGlobal: ["magicDamageTakenPercentage"],
                turnsToExpire: 2,
                multiplier: 0.5
            }
        },

        physicalBarrier: {
            onDeathEffect: true,
            processAbility: true,
            areawide: true,
            targetToApplyOn: "random",
            name:"Physical Barrier",
            abilityId: "physicalBarrier",
            buff: {
                buff: true,
                name: "Physical Barrier",
                areawide: true,
                ignoreUnique: true,
                buffPartyMembers: true,
                abilityId: "physicalBarrier",
                emoji: "🔷",
                additionalDescription: " is reducing magical damage taken by 50%",
                affectsGlobal: ["physicalDamageTakenPercentage"],
                turnsToExpire: 2,
                multiplier: 0.5
            }
        },
        pillarAOEmagic: {
            hppercentage: 0.50,
            belongsToMember: true,
            dmgaura: true,
            name: "Pillar Radiation",
            abilityId: "pillarAOEmagic",
            areawidedmg: {
                endOfTurnAura: true,
                dmgPerTurn: 22,
                hitsEveryNTurn: 1,
                name: "Pillar Radiation",
                dmg: 680,
                mdPercentage: 0.1,
                type: "fire"
            }
        },

        pillarAOE: {
            belongsToMember: true,
            hppercentage: 0.50,
            dmgaura: true,
            name: "Pillar Radiation",
            abilityId: "pillarAOE",
            areawidedmg: {
                endOfTurnAura: true,
                dmgPerTurn: 22,
                name: "Pillar Radiation",
                hitsEveryNTurn: 1,
                dmg: 680,
                adPercentage: 0.1,
                type: "physical"
            }
        },

        // TODO: transfer the elemental orders and hammerdown protocol to next enemy


        // summon 4 more every so often
        shackle: {
            // ignore unique
            name:"Shackle",
            abilityId: "shackle",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 2,
            currentTurn: 0,
            status: {
                name: "Shackle",
                emoji: "<:break:479347734722379777>",
                ignoreUnique: true,
                turnsToExpire: 25,
                affects: ["armor"],
                additive: -800
            }
        },

        arrowVolley: {
            name:"Arrow Volley",
            abilityId: "arrowVolley",
            type:"physical",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 6,
            ignoreFocus: true,
            afterNTurns: 5,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "arrowVolley",
                name: "Arrow Volley",
                type:"physical",
                dmg: 100,
                untargettable: true,
                adPercentage: 1,
                emoji: "🏹",
                dmgOnDotApply: false,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                adPercentageOnRemove: .9,
                dmgOnExpire: 600
            }
        },

        shrink : {
            name : "Shrink",
            abilityId: "shrink",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 6,
            ignoreFocus: true,
            afterNTurns: 5,
            currentTurn: 0,
            description: "Reduce all damage done by 25% for 3 turns 6 turn cooldown",
            status: {
                status: true,
                ignoreBandaid: true,
                name: "Shrink",
                emoji : "👾", 
                affectsGlobal: ["damageDealtPercentage", "healingDonePercentage"],
                turnsToExpire: 3,
                multiplier: 0.75
            }
        },

        summonApparition: {
            name: "Summon Apparition",
            abilityId: "summonApparition",
            belongsToMember: true,
            everyNTurns: 8,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                enemy: "apparition",
                attackDmg: 200,
                magicDmg: 200,
                hpPlus: 1000
            }
        },

        glare: {
            name: "Glare",
            abilityId: "glare",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            ignoreUnique: true, 
            ignoreBandaid: true,
            everyNTurns: 50,
            afterNTurns: 1,
            currentTurn: 1,
            status: {
                focusedBy: "",
                abilityId: "glare",
                status: true,
                ignoreUnique: true, 
                ignoreFocus: true,
                ignoreBandaid: true,
                name: "Glare",
                turnsToExpire: 50,
                emoji: "<:rampage:479348722782830603>"              
            }
        },

        glaring: {
            name: "Glaring",
            abilityId: "glaring",
            buff: {
                name: "Glaring",
                abilityId: "glaring",
                emoji : "🐸",
                turnsToExpire: 50,
                buff: true,
                onlyTargettableBy: []
            }
        },
        
        // shield explodes for 50k upon taking direct damage
        shadowShield: {
            // ignore unique
            name:"Shadow Shield",
            abilityId: "shadowShield",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 7,
            afterNTurns: 7,
            currentTurn: 0,
            targetWithName: "Porthos",
            status: {
                status: true,
                name: "Shadow Shield",
                emoji: "❌",
                targetWithName: "Porthos",
                additionalDescription: " taking direct damage will cause a Shadow Explosion",
                ignoreUnique: true,
                onBandaidCasterGainsBuff: "headache",
                onDamageTakenCastAbility: "shadowExplosion",
                turnsToExpire: 65
            }
        },
        shadowExplosion: {
            belongsToMember: true,
            name: "Shadow Explosion",
            abilityId: "shadowExplosion",
            areawidedmg: {
                areawide: true,
                name: "Shadow Explosion",
                dmg: 2550,
                mdPercentage: .1,
                type: "shadow"
            }
        },
        headache : {
            name : "Headache",
            abilityId: "headache",
            buff: {
                buff: true,
                name: "Headache",
                emoji : "🤕",
                affectsGlobal: ["damageTakenPercentage"],
                turnsToExpire: 4,
                multiplier: 1.5
            }
        },

        // gain buff that deals damage to everyone else based on damage dealt to target
        maniac: {
            // ignore unique
            name:"Maniac",
            abilityId: "maniac",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 8,
            afterNTurns: 4,
            currentTurn: 0,
            buff: {
                name: "Maniac",
                buff: true,
                selfbuff: true,
                dealToRestOfParty: true,
                emoji: "<:break:479347734722379777>",
                ignoreUnique: true,
                turnsToExpire: 4
            }
        },
        // reflect damage back to the attacker 50%
        reflect: {
            name:"Reflect",
            abilityId: "reflect",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 7,
            afterNTurns: 7,
            currentTurn: 0,
            buff: {
                name: "Reflect",
                emoji: "<:break:479347734722379777>",
                ignoreUnique: true,
                turnsToExpire: 4
            }
        },

        summonEnabler: {
            name: "Summon Enabler",
            abilityId: "summonEnabler",
            belongsToMember: true,
            everyNTurns: 8,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                // after 4 turns increases damage on boss by 10% and dies
                enemy: "enabler",
                attackDmg: 500,
                magicDmg: 500,
                hpPlus: 1000
            }
        },

        enable: {
            name: "Enable",
            abilityId: "enable",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 3,
            targetWithName: "Aramis",
            afterNTurns: 3,
            currentTurn: 0,
            buff: {
                buff: true,
                ignoreUnique: true,
                name: "Enable",
                abilityId: "enable",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 200,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.2
            }
        },

        deathSentence: {
            abilityId: "deathSentence",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            areawide: true,
            name: "Death Sentence",
            type: "physical",
            everyNTurns: 100,
            afterNTurns: 1,
            currentTurn: 0,
            status: {
                status: true,
                areawide: true,
                abilityId: "deathSentence",
                untargettable: true,
                name: "Death Sentence",
                emoji: "⚰️",
                type: "physical",
                adPercentage: 10,
                ignoreBandaid: true,
                turnsToExpire: 25,
                dmgOnStatusExpire: true,
                dmgOnRemoveAreaWide: false,
                dmgOnExpire: 500250
            }
        },

        deathSentenceMessage: {
            abilityId: "deathSentenceMessage",
            belongsToMember: true,
            everyNTurns: 100,
            afterNTurns: 1,
            currentTurn: 0,
            eotMessage: "You have angered the emperor.. the sentence.. is.. DEATH"
        },

        spawnPorthos: {
            abilityId: "spawnPorthos",
            belongsToMember: true,
            everyNTurns: 200,
            afterNTurns: 1,
            currentTurn: 0,
            eotMessage: "Soon.. you will understand why my subjects fear the shadows"
        },
        spawnAthos: {
            abilityId: "spawnAthos",
            belongsToMember: true,
            everyNTurns: 200,
            afterNTurns: 1,
            currentTurn: 0,
            eotMessage: "I will crush you.. in body and spirit"
        },


        /*
        summon effects
        */
        totemOfDoom80: {
            belongsToMember: true,
            hppercentage: 0.80,
            summon: {
                enemy: "totemOfDoom"
            }
        },
        totemOfDoom60: {
            belongsToMember: true,
            hppercentage: 0.60,
            summon: {
                enemy: "totemOfDoom"
            }
        },
        totemOfDoom40: {
            belongsToMember: true,
            hppercentage: 0.40,
            summon: {
                enemy: "totemOfDoom",
            }
        },
        totemOfDoom20: {
            belongsToMember: true,
            hppercentage: 0.20,
            summon: {
                enemy: "totemOfDoom",
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

        vampire75: {
            belongsToMember: true,
            hppercentage: 0.75,
            summon: {
                enemy: "vampire",
            }
        },
        vampire50: {
            belongsToMember: true,
            hppercentage: 0.50,
            summon: {
                enemy: "vampire",
            }
        },
        vampire25: {
            belongsToMember: true,
            hppercentage: 0.25,
            summon: {
                enemy: "vampire",
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
            description: "Revive your target",
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
                emoji: "<:focus:479298214588317707>",
                special: "focus member"
            }
        },
        freeze: {
            name: "Freeze",
            description: "Reduce your target's armor by 30%",
            abilityId: "freeze",
            status: {
                name: "Frozen",
                emoji: "<:freeze:479294904946655254>",
                affects: ["armor"],
                multiplier: 0.7
            }
        },
        scold: {
            name: "Scold",
            abilityId: "scold",
            description: "Reduce your target's spirit by 30%",
            status: {
                name: "Scold",
                emoji: "<:scold:479294904611110924>",
                affects: ["spirit"],
                multiplier: 0.7
            }
        },
        cripple: {
            name: "Cripple",
            abilityId: "cripple",
            description: "Reduce your target's attack damage by 20%",
            status: {
                name: "Crippled",
                emoji: "<:cripple:479294904741396480>",
                affects: ["attackDmg"],
                multiplier: 0.8
            }
        },
        weaken: {
            name: "Weaken",
            abilityId: "weaken",
            description: "Reduce your target's magical damage by 20%",
            status: {
                name: "Weakened",
                emoji: "<:weaken:479294904942460951>",
                affects: ["magicDmg"],
                multiplier: 0.8
            }
        }
    },
    rpgZones: {
        prarie: {
            name: "Prarie",
            areas: {
                tallgrass: {
                    name: "Tallgrass",
                    enemies: [

                    ],
                    rpgsToComplete: 8,
                    shopItemsAvailable: [

                    ],
                    scavengeItemsAvailable: [

                    ],
                    rpgDropsAvailable: [

                    ],
                    boss: "bossId"
                },
                meadow: {
                    name: "Meadow",
                    enemies: [

                    ]
                }
            }
        },
        woods: {

        },
        undergroundtunnels: {

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
                hp: 750000,
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
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6300,
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
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 7300,
                abilityOrder: [
                    0, 0, 0, 1
                ],
                attackDmg: 1330,
                magicDmg: 860,
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
                abilities: ["attack", "attack", "attack", "shock"],
                buffs: [],
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
                abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
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
                abilities: ["attack", "attack", "poison", "poison", "barrier"],
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
                        emoji: "<:frenzy:479298214453968896>",
                        onTurnEnd: {
                            attackDmgPlus : 145,
                            magicDmgPlus : 145,
                            everyNTurns: 2,
                            startTurn: 2
                        }
                    }
                ],
                hpPerPartyMember: 0,
                adPerPartyMember: 0,
                mdPerPartyMember: 0,
                hp: 6400,
                attackDmg: 500,
                magicDmg: 500,
                armor: 1000,
                spirit: 1000,
                difficulty: "summoned",
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
                   "attack", "attack", "rockthrow", "rockthrow", "shock", "shock", "tacowall"
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
                difficulty: "summoned",
                element: "normal"
            }
        },
        easy : [
            {
                name: "Rabbid Wolf",
                abilities: ["attack", "attack", "poison", "poison", "tacowall"],
                buffs: [],
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
            {
                name: "Bad Chef",
                abilities: ["attack", "attack", "poison", "poison", "barrier"],
                buffs: [],
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
            {
                name: "Vagabond",
                abilities: ["attack", "attack", "flameblast", "flameblast", "cripple"],
                buffs: [],
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
            {
                name: "Coyote",
                abilities: ["attack", "attack", "claw", "claw", "cripple"],
                buffs: [],
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
            {
                name: "Angry Mob Member",
                abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
                buffs: [],
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
            },
            {
                name: "Burrito Hustler",
                abilities: ["attack", "attack", "slap", "slap", "weaken"],
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
            },
            {
                name: "Ruffian",
                abilities: ["attack", "attack", "tackle", "tackle", "weaken"],
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
            },
            {
                name: "Fruits Counter",
                abilities: ["attack", "attack", "uppercut", "uppercut", "weaken"],
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
                        emoji: "<:frenzy:479298214453968896>",
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
                        emoji: "<:frenzy:479298214453968896>",
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
                name: "Warewolf",
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
                abilities: ["attack" , "attack" , "curse", "poison", "shoot", "shoot","freeze"],
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
                        "shoot",
                        "shoot",
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
                        "shock",
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
                    "attack", "attack", "drain", "drain", "shock", "shock", "tacowall"
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
                        "shoot",
                        "shoot",
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
                enemies: [
                    {
                        name: "Angry Mob Member",
                        abilities: ["attack", "attack", "poison", "iceshards", "iceshards", "cripple"],
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
                                emoji: "<:frenzy:479298214453968896>",
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
                difficulty: 1
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
                        abilities: ["attack" , "attack" , "curse", "poison", "shoot", "shoot","freeze"],
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
                                emoji: "<:frenzy:479298214453968896>",
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
                points: 49,
                difficulty: 2
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
                                emoji: "<:frenzy:479298214453968896>",
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
                points: 93,
                difficulty: 3
            },
            4: {
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
                difficulty: 5,
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
                                emoji: "<:frenzy:479298214453968896>",
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
                points: 681,
                difficulty: 11
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
                timedPerTurn: 180000,
                enemies: [
                    {
                        name: "A182-Type2",
                        abilities: [
                            "laserBeam", "flameblast", "storm", "iceshards"
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
                points: 929,
                difficulty: 25
            },
            7: {
                timed: true,
                timedPerTurn: 180000,
                points: 1900,
                difficulty: 46,
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
                        abilityOrder: [
                            0, 0, 1, 2, 1, 0, 1, 0, 1
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
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 3150,
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1250,
                        spirit: 1170,
                        difficulty: "boss",
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
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1150,
                        spirit: 1270,
                        difficulty: "boss",
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
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1450,
                        spirit: 1370,
                        difficulty: "boss",
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
                        attackDmg: 560,
                        magicDmg: 475,
                        armor: 1450,
                        spirit: 1370,
                        difficulty: "boss",
                        element: "normal"
                    }
                ],
            },
            8: {
                timed: true,
                timedPerTurn: 180000,
                points: 4600,
                difficulty: 79,
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
                        hpPerPartyMember: 0,
                        adPerPartyMember: 8,
                        mdPerPartyMember: 8,
                        hp: 2350,
                        attackDmg: 360,
                        magicDmg: 375,
                        armor: 1050,
                        spirit: 1170,
                        difficulty: "boss",
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
                        difficulty: "boss",
                        element: "normal"
                    }
                ]
            },
            9: {
                timed: true,
                timedPerTurn: 180000,
                points: 22901,
                difficulty: 110,
                enemies: [
                    {
                        name: "Corrupted Overmind",
                        abilities: [
                            "corrupt",
                            "shock",
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
            10: {
                timed: true,
                timedPerTurn: 180000,
                points: 75901,
                difficulty: 141,
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
            /*
            */
            11: {
                // transitions
                // 1 - 25% max hp (every 2 turns) + arrow volley(for 3 turns after second turn) + flanking orders (every 7 turns) + damage reduction (every 2 turns after 4 turns)
                // on second enemy - arrow volley + damage reduction + flanking orders
                // 2 - arrow volley + damage reduction + apparition + iceshards + explosion shield + flanking orders
                // on third enemy - apparition + shield + iceshards + flanking orders + damage reduct
                // 3 - apparition + iceshards + explosion shield + maniac + add spawn after 4 turns + flanking order + damage reduction
                // on last enemy - maniac + enabler + flanking orders + damage reduct + apparition
                timed: true,
                timedPerTurn: 360000,
                points: 317901,
                difficulty: 186,
                enemies: [
                    {
                        // deals moderate physical
                        // crush / poke / attack
                        // EOT - deals 25% of max HP
                        // special ***flanking orders lightning, fire, water, earth(7 turns)
                        // dps race, gains frenzy of + 4k after 20 turns
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
                            // TODO: Transfer pillarRevive, hammerdownProtocol etc to athos
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
            }
        }
    }    
}

/*
each zone has ~12-20 areas
each area has 1 boss after ~7-10 RPGs in that area
in total 84 RPGS -> 200 rpgs per zone
zones can be moved around after an area is completed only
areas have unique shops
zones have unique drops
zones have unique scavenges
zones have unique enemies | bosses
RPG JSON contains data for each ZONE (area names, enemy names, )
RPG JSON contains data for each area (zone names, total zones, boss zone)
RPG table stores the zones via row
RPG table stores zone completion by zone as an array, current area via name, area completeion via integer
all areas are completed by picking, first one is always the same, completion % of area is linear, they are just integers
zones are completed once all areas are completed

TODO: come up with area names for all of these
find pictures for all areas + zones

1-12, prarie, woods, underground tunnels
13-20, Oasis, Glacier, Island,
20-27, places Grand Canyon, Crystal Peak, Tadrart Acacus
27-31, places Costa de marfil, Patagonia, Yosemite
31-34, cities Tokyo, Johanesburg, London
34-37, mountains Everest, Aconcagua, Elbert
38-40 - moon Mons Argaeus, Mare Crisium, Vallis Snellius  
*/