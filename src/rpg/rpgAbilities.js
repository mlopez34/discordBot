module.exports = {
    // TODO:
    // cannister shot chance to deal 1 to 7 shots
    // mindflaylike ability 90%, 120%, 150%
    // deal 160% damage, consume 50% of spirit / armor for the turn
    // lightwell ability - 5 random heals

    // concentrate, adapt, surge, pulverize, tidalwave, finalfortune, cleanse, invigorate, restore, backup, canistershot
    
    rpgAbilities: {
        concentrate: {
            abilityId: "concentrate",
            name: "Concentrate",
            description: "Cast on self - consume all crit strike chance for 10 turns, deal 40% more damage for 3 turns",
            buff: {
                selfbuff: true,
                buff: true,
                name: "Concentrate",
                abilityId: "concentrate",
                affectsGlobal: ["damageDealtPercentage"],
                multiplier: 1.4,
                turnsToExpire: 3,
                emoji: ":woman_in_lotus_position:"
            },
            status: {
                status: true,
                ignoreBandaid: true,
                selfDebuff: true,
                name: "Consumed",
                abilityId: "consumed",
                affects: ["criticalChance"],
                multiplier: 0.00000000001,
                turnsToExpire: 3,
                emoji: ""
            }
        },
        adapt: {
            // consume all crit strike chance for 10 turns, heal for 30% more for 3 turns
            abilityId: "adapt",
            name: "Adapt",
            description: "Cast on self - consume all crit strike chance for 10 turns, heal for 40% more for 3 turns",
            buff: {
                selfbuff: true,
                buff: true,
                name: "Adapt",
                abilityId: "adapt",
                affectsGlobal: ["healingDonePercentage"],
                multiplier: 1.4,
                turnsToExpire: 3,
                emoji: ":man_in_lotus_position:"
            },
            status: {
                status: true,
                ignoreBandaid: true,
                selfDebuff: true,
                name: "Consumed",
                abilityId: "consumed",
                affects: ["criticalChance"],
                multiplier: 0.0000000001,
                turnsToExpire: 3,
                emoji: ""
            }
        },
        surge: {
            // after landing a successful damaging critical strike you can use this ability
            name: "Surge",
            abilityId: "surge",
            description: "Heal the group for 20 + 35% of your current magical power. After landing a successful critical strike with any ability - surge becomes surge 2 for the next turn. Surge 2: Heal the group for 75 + 92% of your current magical damage",
            heal: 20,
            mdPercentage: 0.35,
            castAbilityAfterCriticalStrike: "surge2",
            areawide: true,
            targets: "friendly"
        },
        surge2: {
            name: "Surge 2",
            abilityId: "surge2",
            description: "Heal the group for 75 + 92% of your current magical damage",
            heal: 75,
            mdPercentage: 0.92,
            areawide: true,
            targets: "friendly"
        },
        pulverize: {
            name: "Pulverize",
            abilityId: "pulverize",
            dmg: 40,
            adPercentage: 1.1,
            description: "Deal 40 damage + 110% of your physical damage. After landing a successful critical strike with any ability - pulverize becomes pulverize 2 for the next turn. Pulverize 2: Deal 170 damage + 167% of your physical damage",
            castAbilityAfterCriticalStrike: "pulverize2", 
            type: "physical",
        },
        pulverize2: {
            name: "Pulverize 2",
            abilityId: "pulverize2",
            dmg: 170,
            adPercentage: 1.67,
            description: "Deal 170 damage + 167% of your physical damage",
            type: "physical",
        },
        tidalwave:{
            name: "Tidal Wave",
            abilityId: "tidalwave",
            dmg: 40,
            mdPercentage: 1.1,
            description: "Deal 40 damage + 110% of your magical damage. After landing a successful critical strike with any ability - tidal wave becomes tidal wave 2 for the next turn. Tidal Wave 2: Deal 150 damage + 167% of your magical damage",
            castAbilityAfterCriticalStrike: "tidalwave2",
            type: "water",
        },
        tidalwave2:{
            name: "Tidal Wave 2",
            abilityId: "tidalwave2",
            dmg: 170,
            mdPercentage: 1.67,
            description: "Deal 170 damage + 167% of your magical damage",
            type: "water",
        },
        finalfortune:{
            abilityId: "finalfortune",
            name: "Final Fortune",
            limitOffensive: true,
            areawide: true,
            description: "Limit ability - The group gains haste + 75% damage + 95 % damage reduction permanently, and last rites (2 turn duration, death is certain when last rites ends, cannot be bandaided)",
            buff: {
                buff: true,
                areawide: true,
                hasted: true,
                name: "Final Fortune",
                abilityId: "finalfortune",
                affectsGlobal: ["damageTakenPercentage"],
                multiplier: 0.05,
                emoji: ":fortune_cookie:"
            },
            status: {
                status: true,
                areawide: true,
                selfDebuff: true,
                name: "Last Rites",
                abilityId: "lastrites",
                ignoreBandaid: true,
                deathOnStatusExpire: true,
                emoji : ":coffin:",
                affectsGlobal: ["damageDealtPercentage"],
                turnsToExpire: 3,
                multiplier: 1.75
            }
        },
        cleanse:{
            abilityId: "cleanse",
            name: "Cleanse",
            limitDefensive: true,
            areawide: true,
            description: "Limit ability - Heal the group for 50 + 0% of your current magical damage and remove all basic statuses",
            heal: 50,
            mdPercentage: 0.4,
            targets: "friendly",
            special: "remove status"
        },
        invigorate: {
            name: "Invigorate",
            abilityId: "invigorate",
            limitDefensive: true,
            areawide: true,
            description: "Limit ability - Increase the group's armor by 100% and spirit by 100% for 3 turns",
            buff: {
                buff: true,
                areawide: true,
                name: "Invigorate",
                abilityId: "invigorate",
                emoji : ":stars:",
                turnsToExpire: 3,
                affects: ["armor", "spirit"],
                multiplier: 2
            }
        },
        restore: {
            name: "Restore",
            abilityId: "restore",
            description: "Upon taking any damage, heal yourself for 50 + 20% of magical damage - lasts 3 turns",
            buff: {
                buff: true,
                name: "Restore",
                abilityId: "restore",
                emoji : ":purple_heart:",
                turnsToExpire: 3,
                healWhenDamageTaken: 50,
                mdPercentage: .20
            }
        }, 
        backup: {
            name: "Backup",
            abilityId: "backup",
            description: "Upon taking any damage, heal yourself for 50 + 10% of physical damage - 10 charges",
            buff: {
                buff: true,
                name: "Backup",
                abilityId: "backup",
                emoji : ":blue_heart:",
                charges: 10,
                maxcharges: 10,
                healWhenDamageTaken: 50,
                adPercentage: .10
            }
        },
        canistershot: {
            // cannister shot - shoot between 1 and 7 bullets, 4 bullets should be the same as a regular -cast shoot 6 charges
            name: "Canister Shot",
            abilityId: "canistershot",
            description: "Deal 40 damage + 40% of your attack damage. shoots between 1 and 7 shots , 6 charges",
            dmg: 40,
            charges: 6,
            maxcharges: 6,
            adPercentage: 0.4,
            randomNumberOfCasts: 7, 
            type: "physical"
        },
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
            adPercentage: 1.47,
            description: "Deal 125 physical damage + 147% of your attack damage and 40 physical damage + 30% of your attack damage to 1 random enemy",
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
            adPercentage: 0.85,
            description: "Heal your target for 50 + 85% of your physical damage and heal your target for 50 + 85% of your physical damage",
            selfUntargettable: true,
            special: {
                name: "Assist",
                abilityId: "assist",
                heal: 50,
                selfHeal: 50,
                adPercentage: 0.85,
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
                ignoreInitialTarget: true,
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
            maxcooldown: 7,
            description: "Reduce all damage taken by 35% for 3 turns 7 turn cooldown",
            buff: {
                selfbuff: true,
                buff: true,
                name: "Shell",
                emoji : "<:shell:479293276462252042>",
                affectsGlobal: ["damageTakenPercentage"],
                turnsToExpire: 3,
                multiplier: 0.65
            }
        },

        cocoon : {
            name : "Cocoon",
            abilityId: "cocoon",
            cooldown: 0,
            maxcooldown: 1,
            description: "Reduce all damage taken and all damage done by 20% for 2 turns 1 turn cooldown",
            buff: {
                buff: true,
                name: "Cocoon",
                emoji : ":egg:",
                affectsGlobal: ["damageTakenPercentage", "damageDealtPercentage"],
                turnsToExpire: 2,
                multiplier: 0.8
            }
        },

        overload : {
            name : "Overload",
            abilityId: "overload",
            description: "reflect back 30% of all damage taken for 2 turns, 5 turn cooldown",
            cooldown: 0,
            maxcooldown: 5,
            buff: {
                buff: true,
                name: "Overload",
                selfbuff: true,
                abilityId: "overload",
                reflectPercentage: 0.30,
                areaewideReflectPercentage: 0.30,
                emoji: ":level_slider:",
                abType: "electric",
                ignoreUnique: true,
                turnsToExpire: 2
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
            maxcooldown: 4,
            cooldown: 0,
            description: "Paralyze a player or easy, medium, summoned difficulty enemy for 3 turns, 4 turn cooldown, invalid if damage is taken",
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
        bite : {
            name: "Bite",
            abilityId: "bite",
            dmg: 50,
            adPercentage: 1,
            type: "physical"
        },
        sting : {
            name: "Sting",
            abilityId: "sting",
            dmg: 100,
            adPercentage: 1,
            type: "physical"
        },
        ram : {
            name: "Ram",
            abilityId: "ram",
            dmg: 50,
            adPercentage: 1.2,
            type: "physical"
        },
        clap : {
            name: "Clap",
            abilityId: "clap",
            dmg: 50,
            adPercentage: 1.2,
            type: "physical"
        },
        skeletalSwing: {
            name: "Skeletal Swing",
            abilityId: "skeletalSwing",
            dmg: 50,
            adPercentage: 1.1,
            type: "physical",
            dot: {
                name: "Reap",
                type:"physical",
                dmg: 500,
                untargettable: true,
                adPercentage: 1,
                emoji: "<:shatter:479347500751388687>",
                ignoreUnique: true,
                turnsToExpire: 15,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        scam : {
            name: "Scam",
            abilityId: "scam",
            dmg: 50,
            mdPercentage: 1.25,
            type: "shadow"
        },
        inject : {
            name: "Inject",
            abilityId: "inject",
            dmg: 50,
            mdPercentage: 1.25,
            type: "shadow"
        },
        smuggle : {
            name: "Smuggle",
            abilityId: "smuggle",
            dmg: 50,
            mdPercentage: 1.25,
            type: "shadow"
        },
        hostage : {
            name: "Hostage",
            abilityId: "hostage",
            dmg: 50,
            mdPercentage: 1.25,
            type: "shadow"
        },
        punch : {
            name: "Punch",
            abilityId: "punch",
            dmg: 50,
            adPercentage: 1.25,
            type: "physical"
        },
        scare : {
            name: "Scare",
            abilityId: "scare",
            dmg: 50,
            mdPercentage: 1.25,
            type: "shadow"
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
        sanctuary: {
            name:"Sanctuary",
            abilityId: "sanctuary",
            areawide: true,
            cooldown: 0,
            maxcooldown: 5,
            description: "Heal the group over time for 100 + 80% of your magical damage over 5 turns 5 turn cooldown",
            hot: {
                name: "Sanctuary",
                heal: 100,
                emoji: ":ocean:",
                areawide: true,
                mdPercentage: .80,
                healingOnHotApply: false,
                turnsToExpire: 5,
                healingOnDotExpire: false,
                healingOnExpire: 0

            }
        },
        orchatasip: {
            name:"Orchata Sip",
            abilityId: "orchatasip",
            description: "Heal your target over time for 150 + 165% of your magical damage over 5 turns",
            hot: {
                name: "Orchata Sip",
                heal: 150,
                emoji: "<:orchatasip:479296604831219714>",
                mdPercentage: 1.65,
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
        recuperate: {
            name: "Recuperate",
            abilityId: "recuperate",
            description: "Heal the group for 35 + 40% of your current physical damage, 1 turn cooldown, grant the group fortified - 1 turn buff that reduces all damage taken by 10%",
            heal: 35,
            cooldown: 0,
            maxcooldown: 1,
            adPercentage: 0.4,
            areawide: true,
            targets: "friendly",
            buff: {
                buff: true,
                areawide: true,
                name: "Fortify",
                abilityId: "fortify",
                emoji : ":lock:",
                affectsGlobal: ["damageTakenPercentage"],
                turnsToExpire: 1,
                multiplier: 0.9
            }
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
        cramp: {
            name:"Cramp",
            abilityId: "cramp",
            type:"physical",
            limitOffensive: true,
            description: "Limit ability - deal 150 damage + 170% of your physical damage over 10 turns",
            dot: {
                name: "Cramp",
                type:"physical",
                dmg: 150,
                adPercentage: 1.7,
                emoji: ":triangular_flag_on_post:",
                dmgOnDotApply: false,
                turnsToExpire: 10,
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
        doom: {
            name:"Doom",
            abilityId: "doom",
            type:"shadow",
            limitOffensive: true,
            description: "Limit ability - Deal 150 damage + 170% of your magical damage over 10 turns",
            dot: {
                name: "Doom",
                type:"shadow",
                dmg: 150,
                mdPercentage: 1.7,
                emoji: ":wind_chime:",
                dmgOnDotApply: false,
                turnsToExpire: 10,
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
        // energize: {
        //     name: "Energize",
        //     abilityId: "energize",
        //     areawide: true,
        //     targets: "friendly",
        //     cooldown: 0,
        //     maxcooldown: 4,
        //     description: "Increase the group's magical damage and attack damage by 60% for 4 turns - 5 turn cooldown, applies Exhausted",
        //     buff: {
        //         buff: true,
        //         areawide: true,
        //         name: "Energize",
        //         abilityId: "energize",
        //         emoji: "<:empower:479293276298412033>",
        //         turnsToExpire: 4,
        //         affects: ["attackDmg", "magicDmg"],
        //         multiplier: 1.6
        //     },
        //     status: {
        //         name: "Exhausted",
        //         status: true,
        //         areawide: true,
        //         ignoreBandaid: true,
        //         selfDebuff: true,
        //         emoji: "<:exhausted:479294904858836992>",
        //         buffToStop: ["empower", "energize"],
        //         turnsToExpire: 10,
        //     }
        // },
        empower: {
            name: "Empower",
            abilityId: "empower",
            areawide: true,
            targets: "friendly",
            cooldown: 0,
            maxcooldown: 4,
            description: "Increase the group's magical damage and attack damage by 60% for 4 turns - 5 turn cooldown, applies Exhausted",
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
        empowerDeath: {
            name: "Empower",
            belongsToMember: true,
            onDeathEffect: true,
            processAbility: true,
            abilityId: "empowerDeath",
            areawide: true,
            targets: "friendly",
            description: "Increase the group's magical damage and attack damage by 60% for 4 turns - 5 turn cooldown, applies Exhausted",
            buff: {
                buff: true,
                areawide: true,
                name: "Empower",
                abilityId: "empower",
                emoji: "<:empower:479293276298412033>",
                turnsToExpire: 4,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.6
            }
        },
        ripfabric: {
            name: "Rip Fabric",
            abilityId: "ripfabric",
            areawide: true,
            belongsToMember: true,
            processAbility: true,
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
            additionalDescription: " is reducing the groups maximum HP by 10%",
            status: {
                name: "Rip Fabric",
                abilityId: "ripfabric",
                status: true,
                areawide: true,
                ignoreBandaid: true,
                ignoreUnique: true,
                emoji: "🔻",
                turnsToExpire: 100,
                affects: ["maxhp"],
                multiplier: .9
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
        smash: {
            name: "Smash",
            abilityId: "smash",
            dmg: 50,
            adPercentage: 1,
            description: "Deal 50 damage + 100% of your physical damage, applies injure which deals 20 damage + 90% of your physical damage over 5 turns",
            type: "physical",
            dot: {
                name: "Injure",
                dmg: 20,
                adPercentage: .9,
                type: "physical",
                emoji: "🤼",
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
        fireBreath: {
            name: "Fire Breath",
            abilityId: "fireBreath",
            dmg: 100,
            description: "Deal 100 damage + 100% of your magic damage to all enemies",
            mdPercentage: 1,
            type: "ice",
            areawide: true,
            targets: "enemy",
            dot: {
                name: "Burning",
                areawide: true,
                dmg: 50,
                mdPercentage: 1,
                type: "fire",
                emoji: "🔥",
                damageOnDotApply: false,
                turnsToExpire: 5,
                damageOnDotExpire: false,
                damageOnExpire: 0
            }
        },
        frostBreath: {
            name: "Frost Breath",
            abilityId: "frostBreath",
            dmg: 45,
            description: "Deal 45 damage + 50% of your magic damage to all enemies",
            mdPercentage: 0.5,
            type: "ice",
            areawide: true,
            targets: "enemy",
            status: {
                areawide: true,
                name: "Frozen",
                emoji: "<:freeze:479294904946655254>",
                affects: ["armor"],
                multiplier: 0.7
            }
        },
        venom: {
            name: "Venom",
            abilityId: "venom",
            dmg: 45,
            description: "Deal 45 damage + 50% of your magic damage to all enemies",
            mdPercentage: 0.5,
            type: "poison",
            areawide: true,
            targets: "enemy",
            status: {
                areawide: true,
                name: "Crushed",
                emoji: "<:radioactive:479294904946655254>",
                affects: ["armor"],
                multiplier: 0.5
            }
        },
        vandalize: {
            name: "Vandalize",
            abilityId: "vandalize",
            dmg: 45,
            description: "Deal 45 damage + 50% of your physical damage to all enemies",
            adPercentage: 0.5,
            type: "physical",
            areawide: true,
            targets: "enemy",
            status: {
                areawide: true,
                name: "Scold",
                emoji: "<:scold:479294904611110924>",
                affects: ["spirit"],
                multiplier: 0.7
            }
        },
        blizzard: {
            name: "Blizzard",
            abilityId: "blizzard",
            dmg: 45,
            description: "Deal 45 damage + 50% of your magic damage to all enemies",
            mdPercentage: 0.5,
            type: "ice",
            areawide: true,
            targets: "enemy",
            dot: {
                name: "Frostbite",
                type:"ice",
                dmg: 65,
                areawide: true,
                mdPercentage: 1,
                emoji: ":cloud_snow:",
                dmgOnDotApply: false,
                turnsToExpire: 6,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
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
        whirlwind: {
            name: "Whirlwind",
            abilityId: "whirlwind",
            dmg: 90,
            adPercentage: 0.95,
            cooldown: 0,
            maxcooldown: 1,
            description: "Deal 90 damage + 95% of your attack damage to all enemies, 1 turn cooldown",
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
        enemyshoot: {
            name: "Shoot",
            abilityId: "enemyshoot",
            description: "Deal 125 damage + 125% of your attack damage, 6 charges",
            dmg: 125,
            charges: 6,
            maxcharges: 6,
            adPercentage: 1.25,
            type: "physical"
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
        plasmabeam: {
            name: "Plasma Beam",
            abilityId: "plasmabeam",
            areawide: true,
            description: "Deal 75 damage + 87% of your attack damage to all enemies, 4 charges",
            dmg: 75,
            charges: 4,
            maxcharges: 4,
            adPercentage: .87,
            type: "physical"
        },
        cannistershot: {
            name: "Cannister Shot",
            abilityId: "cannistershot",
            description: "Deal 125 damage + 143% of your attack damage, 6 charges",
            dmg: 125,
            charges: 6,
            maxcharges: 6,
            adPercentage: 1.43,
            type: "physical"
        },
        enemyshock: {
            name: "Shock",
            abilityId: "enemyshock",
            dmg: 120,
            mdPercentage: 1.25,
            description: "Deal 120 damage + 125% of your magic damage, deal 20% damage dealt to yourself",
            type: "electric",
            special: "selfdamage",
            selfdamage: 15
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
        pulseshot: {
            name: "Pulse Shot",
            abilityId: "pulseshot",
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
                buff: true,
                name: "Haste",
                hasted: true,
                emoji: "<:haste:479293276424241163>"
            }
        },

        meditate: {
            passive: true,
            abilityId: "meditate",
            name: "Meditate",
            description: "Permanently increase your magical damage by 17% and reduce your healing by 99%",
            // buff should be 17% more magical 0% healing
            buff: {
                buff: true,
                name: "Meditate",
                abilityId: "pumped",
                affects: ["magicDmg"],
                multiplier: 1.17,
                emoji: ":peace:"
            },
            status: {
                status: true,
                ignoreBandaid: true,
                name: "Meditate",
                abilityId: "pumped",
                affectsGlobal: ["healingDonePercentage"],
                multiplier: .01,
                emoji: ""
            }
        },

        pumped: {
            passive: true,
            abilityId: "pumped",
            name: "Pumped",
            description: "Permanently increase your attack damage by 17% and reduce your healing by 99%",
            // buff should be 17% more magical 0% healing
            buff: {
                buff: true,
                name: "Pumped",
                abilityId: "pumped",
                affects: ["attackDmg"],
                multiplier: 1.17,
                emoji: "⛽"
            },
            status: {
                status: true,
                ignoreBandaid: true,
                name: "Pumped",
                abilityId: "pumped",
                affectsGlobal: ["healingDonePercentage"],
                multiplier: .01,
                emoji: ""
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
                affects: ["magicDmg"],
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
        decayDeath: {
            name:"Decay",
            type:"shadow",
            abilityId: "decayDeath",
            processAbility: true,
            belongsToMember: true,
            onDeathEffect: true,
            dot: {
                name: "Decay",
                type:"shadow",
                dmg: 65,
                ignoreUnique: true,
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
        aoeBombMobLord: {
            name:"Bomb",
            abilityId: "aoeBombMobLord",
            type:"fire",
            aboveKeystone: 6,
            processAbility: true,
            belongsToMember: true,
            areawide: true,
            everyNTurns: 15,
            afterNTurns: 10,
            currentTurn: 0,
            dot: {
                name: "Bomb",
                type:"fire",
                dmg: 1,
                mdPercentage: 1,
                areawide: true,
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
        aoeBombDictator: {
            name:"Bomb",
            abilityId: "aoeBombDictator",
            type:"fire",
            aboveKeystone: 6,
            processAbility: true,
            belongsToMember: true,
            areawide: true,
            everyNTurns: 15,
            afterNTurns: 15,
            currentTurn: 0,
            dot: {
                name: "Bomb",
                type:"fire",
                dmg: 1,
                mdPercentage: 1,
                areawide: true,
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
        unimaginablePower: {
            name: "Unimaginable Power",
            abilityId: "unimaginablePower",
            processAbility: true,
            belongsToMember: true,
            aboveKeystone: 6,
            everyNTurns: 50,
            afterNTurns: 1,
            currentTurn: 0,
            buff: {
                buff: true,
                name: "Unimaginable Power",
                selfbuff: true,
                additionalDescription: " is reflecting 20% damage back to all attackers",
                abilityId: "unimaginablePower",
                reflectPercentage: 0.2,
                areaewideReflectPercentage: 0.20,
                emoji: "🔈",
                abType: "electric",
                ignoreUnique: true,
                turnsToExpire: 50
            }
        },
        summonReoriginator75: {
            name: "Summon Reoriginator",
            abilityId: "summonReoriginator75",
            aboveKeystone: 6,
            belongsToMember: true,
            hppercentage: 0.75,
            oneTimeCast: true,
            summon: {
                enemy: "reoriginator",
                attackDmg: 150,
                magicDmg: 100,
                hpPlus: 30
            }
        },
        summonReoriginator50: {
            name: "Summon Reoriginator",
            abilityId: "summonReoriginator50",
            aboveKeystone: 6,
            belongsToMember: true,
            hppercentage: 0.5,
            oneTimeCast: true,
            summon: {
                enemy: "reoriginator",
                attackDmg: 1000,
                magicDmg: 1000,
                hpPlus: 100000
            }
        },
        summonReoriginator25: {
            name: "Summon Reoriginator",
            abilityId: "summonReoriginator25",
            aboveKeystone: 6,
            belongsToMember: true,
            hppercentage: 0.25,
            oneTimeCast: true,
            summon: {
                enemy: "reoriginator",
                attackDmg: 1000,
                magicDmg: 1000,
                hpPlus: 400000
            }
        },
        decimate: {
            belongsToMember: true,
            name: "Decimate 50%",
            abilityId: "decimate",
            dmgaura: true,
            oneTimeCast: true,
            hppercentage: .5,
            currentHealthPercentageDamage: 0.5,
            type: "physical"
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
            heal: 1000000,
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
        entombTargets: {
            belongsToMember: true,
            processAbility: true,
            onDeathEffect: true,
            effectDone: false,
            invalidIfBuff: "entombTargets",
            targetNames: [
                "Blue Energy Crystal",
                "Yellow Energy Crystal",
                "Black Energy Crystal",
                "Red Energy Crystal",
                "Green Energy Crystal",
                "Purple Energy Crystal"
            ],
            abilityId: "entombTargets",
            name: "Entomb",
            buff: {
                name: "Entomb",
                emoji: "<:entomb:479288026388889621>",
                turnsToExpire: 3,
                abilityId: "entombTargets",
                setAbleToAttack: false,
                setAbleToTakeDamage: false,
                setAbleToBeHealed: false,
                removeEndOfTurn: true,
                removeBuffs: true
            }
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
        summonTorturedRobotsDeath: {
            name: "summonTorturedRobots",
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            summon: {
                enemies: [
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot",
                    "torturedRobot"
                ]
            }
        },
        summonRuffians: {
            name: "summonRuffians",
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            summon: {
                enemies: [
                    "ruffian",
                    "ruffian",
                    "ruffian",
                    "ruffian",
                    "ruffian",
                    "ruffian"
                ]
            }
        },
        summonLeopardPack: {
            name: "summonLeopardPack",
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            summon: {
                enemies: [
                    "snowleopard",
                    "snowleopard",
                    "snowleopard",
                    "snowleopard",
                    "snowleopard"
                ]
            }
        },
        summon3polarbears: {
            name: "summon3polarbears",
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            summon: {
                enemies: [
                    "polarbear",
                    "polarbear",
                    "polarbear"
                ]
            }
        },
        summonOgres: {
            name: "summonOgres",
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            summon: {
                enemies: [
                    "ogre",
                    "ogre"
                ]
            }
        },
        summonEgg: {
            name: "summonEgg",
            abilityId: "summonEgg",
            belongsToMember: true,
            everyNTurns: 1,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                enemies: [
                    "egg"
                ]
            }
        },
        summonMaggots: {
            name: "summonMaggots",
            abilityId: "summonMaggots",
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                enemies: [
                    "maggot",
                    "maggot",
                    "maggot",
                    "maggot"
                ]
            }
        },
        summonSkyMaggots: {
            name: "summonSkyMaggots",
            abilityId: "summonSkyMaggots",
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemies: [
                    "skymaggot",
                    "skymaggot"
                ]
            }
        },
        invigorateDeath: {
            belongsToMember: true,
            processAbility: true,
            oneTimeCast: true,
            onDeathEffect: true,
            effectDone: false,
            name: "Invigorate",
            abilityId: "invigorate",
            buff: {
                buff: true,
                areawide: true,
                name: "Invigorate",
                abilityId: "invigorate",
                emoji : ":stars:",
                turnsToExpire: 5,
                affects: ["armor", "spirit"],
                multiplier: 2
            }
        },
        summonWhelps: {
            name: "summonWhelps",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 7,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemies: [
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling",
                    "whelpling"
                ]
            }
        },
        summonDrake: {
            name: "summonDrake",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 7,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemy: "amberDrake",
            }
        },
        summonDefenders: {
            name: "summonDefenders",
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 7,
            afterNTurns: 3,
            currentTurn: 0,
            summon: {
                enemies: [
                    "fireGuardian",
                    "stormGuardian",
                    "earthGuardian",
                ]
            }
        },
        summonAmberPool: {
            name: "summonAmberPool",
            belongsToMember: true,
            everyNTurns: 5,
            afterNTurns: 4,
            currentTurn: 0,
            summon: {
                enemy: "amberPool",
            }
        },
        summonRoots: {
            name: "summonRoots",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 5,
            currentTurn: 0,
            summon: {
                enemies: [
                    "roots",
                    "roots",
                    "roots",
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
                multiplier: 1.22
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
        strengthDarkness: {
            name: "Strength",
            abilityId: "strengthDarkness",
            buff: {
                buff: true,
                ignoreUnique: true,
                name: "Strength",
                abilityId: "strengthDarkness",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 100,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.2
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

        strengthRupture: {
            name: "Strength",
            abilityId: "strengthRupture",
            buff: {
                buff: true,
                name: "Strength",
                abilityId: "strengthRupture",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 50,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.5
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
            heal: 1000000,
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

        fury3 : {
            name : "Fury",
            belongsToMember: true,
            processAbility: true,
            abilityId: "fury3",
            everyNTurns: 100,
            afterNTurns: 1,
            currentTurn: 1,
            buff: {
                selfbuff: true,
                buff: true,
                name: "Fury",
                additionalDescription: " is gaining damage based on lost health",
                emoji : "<:fury:479349359281176577>",
                affects: ["attackDmg", "magicDmg"],
                turnsToExpire: 300,
                multiplierBasedOnLostHp: .03
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
            onDeathEffect: true,
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
                untargettable: true,
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
        summonImps: {
            name: "summonImps",
            belongsToMember: true,
            everyNTurns: 5,
            afterNTurns: 4,
            currentTurn: 0,
            summon: {
                enemies: [
                    "imp",
                    "imp",
                    "imp",
                    "imp",
                    "imp"
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
        absorbImps: {
            abilityId: "absorbImps",
            belongsToMember: true,
            processAbility: true,
            everyNTurns: 5,
            afterNTurns: 7,
            currentTurn: 0,
            special: "absorb imps" 
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
        echoK5: {
            dmgaura: true,
            belongsToEvent: true,
            name: "Echo",
            abilityId: "echoK5",
            areawidedmg: {
                endOfTurnAura: true,
                hitsEveryNTurn: 4,
                dmgPerTurn: 112,
                name: "Echo",
                dmg: 400,
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
        sap: {
            name:"Sap",
            abilityId: "sap",
            type:"physical",
            aboveKeystone: 6,
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 2,
            ignoreUnique: true,
            afterNTurns: 1,
            currentTurn: 0,
            dot: {
                name: "Sap",
                abilityId: "sap",
                type:"physical",
                dmg: 100,
                adPercentage: 3,
                areawide: true,
                emoji: ":red_circle:",
                dmgOnDotApply: false,
                ignoreUnique: true,
                turnsToExpire: 25,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        hexNormie: {
            name:"Hex",
            abilityId: "hexNormie",
            type:"shadow",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 1,
            ignoreFocus: true,
            afterNTurns: 1,
            currentTurn: 0,
            dot: {
                name: "Hex",
                type:"shadow",
                dmg: 100,
                untargettable: true,
                mdPercentage: 1,
                emoji: "<:hex:479301622732816403>",
                dmgOnDotApply: false,
                turnsToExpire: 3,
                dmgOnDotExpire: false,
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
        starve: {
            onDeathEffect: true,
            effectDone: false,
            processAbility: true,
            name:"Starve",
            abilityId: "starve",
            type:"shadow",
            dot: {
                dotApplyOnDeath: true,
                name: "Starve",
                abilityId: "starve",
                type:"shadow",
                dmg: 100,
                mdPercentage: .25,
                dmgIncreasePerTick: 200,
                emoji: "🏴",
                dmgOnDotApply: false,
                turnsToExpire: 99,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
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
        reanimateAll: {
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
            oneTimeCast: true,
            name: "Reanimate",
            abilityId: "reanimateAll",
            admdMultiplier: 1.5,
            // create zombies of all the enemies that are dead
            // hp and stats equal
            zombifyAll: true // summons zombies
        },
        reanimateAll25: {
            belongsToMember: true,
            effectDone: false,
            oneTimeCast: true,
            hppercentage: 0.2,
            aboveKeystone: 6,
            name: "Reanimate",
            abilityId: "reanimateAll25",
            admdMultiplier: 1.25,
            // create zombies of all the enemies that are dead
            // hp and stats equal
            zombifyAll: true // summons zombies
        },
        reanimateAll30: {
            belongsToMember: true,
            effectDone: false,
            oneTimeCast: true,
            hppercentage: 0.3,
            name: "Reanimate",
            abilityId: "reanimateAll30",
            admdMultiplier: 1.5,
            // create zombies of all the enemies that are dead
            // hp and stats equal
            zombifyAll: true // summons zombies
        },
        reanimateAllMessage: {
            aboveKeystone: 6,
            belongsToMember: true,
            effectDone: false,
            oneTimeCast: true,
            hppercentage: 0.35,
            eotMessage: "The Roman Soldier prepares to reanimate his army",
        },
        // end of turn event that adds an end of turn event to the enemy every N turns


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
        summonAthosDeath: {
            name: "Summon Athos",
            abilityId: "summonAthosDeath",
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
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
        summonPorthosDeath: {
            name: "Summon Porthos",
            abilityId: "summonPorthosDeath",
            belongsToMember: true,
            onDeathEffect: true,
            effectDone: false,
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
        summonAramisDeath: {
            name: "Summon Aramis",
            abilityId: "summonAramisDeath",
            belongsToMember: true,
            effectDone: false,
            onDeathEffect: true,
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
            hppercentage: 0.25,
            belongsToMember: true,
            dmgaura: true,
            name: "Radiation",
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
            hppercentage: 0.25,
            dmgaura: true,
            name: "Radiation",
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

        secondarrowVolley: {
            name:"Arrow Volley",
            abilityId: "secondarrowVolley",
            type:"physical",
            aboveKeystone: 6,
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 6,
            ignoreFocus: true,
            afterNTurns: 6,
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

        thirdarrowVolley: {
            name:"Arrow Volley",
            abilityId: "thirdarrowVolley",
            type:"physical",
            aboveKeystone: 6,
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 6,
            ignoreFocus: true,
            afterNTurns: 7,
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
            everyNTurns: 10,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                enemy: "apparition",
                attackDmg: 200,
                magicDmg: 200,
                hpPlus: 100
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

        summonEnabler: {
            name: "Summon Enabler",
            abilityId: "summonEnabler",
            belongsToMember: true,
            everyNTurns: 10,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                // after 4 turns increases damage on boss by 10% and dies
                enemy: "enabler",
                attackDmg: 500,
                magicDmg: 500,
                hpPlus: 100
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
                additionalDescription: " gains 20% more physical and magical damage",
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
                turnsToExpire: 28,
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
        challenge 6
        */
        addToEventKilledCheck: {
            aboveKeystone: 6,
            belongsToMember: true,
            onDeathEffect: true,
            name: "addToEventKilledCheck",
            abilityId: "addToEventKilledCheck",
            addToEventKilledList: "crystalKilledHandler"
        },
        crystalKilledHandler: {
            belongsToEvent: true,
            aboveKeystone: 6,
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 0,
            name: "crystal handler",
            abilityId: "crystalKilledHandler",
            addBuffIfCheck : "provoked",
            targetName : "A182-Type2",
            addBuffIfOverCount : 1,
            deadCheck: [
                "Blue Energy Crystal",
                "Yellow Energy Crystal",
                "Black Energy Crystal",
                "Red Energy Crystal",
                "Green Energy Crystal",
                "Purple Energy Crystal"
            ],
            enemiesKilled: []
        },
        provoked: {
            name: "Provoked",
            abilityId: "provoked",
            buff: {
                buff: true,
                name: "Provoked",
                abilityId: "provoked",
                additionalDescription: " is provoked after 2 of the same Energy Crystals were destroyed",
                emoji: "<:strength:479298214294716416>",
                turnsToExpire: 45,
                affects: ["attackDmg", "magicDmg"],
                multiplier: 1.3
            }
        },
        /*
        challenge 12
        */
        darknessHandler: {
            transferAtHpPercentage: 1,
            buffToHandleId: "darkness",
            onNewCastAddBuff: "energy",
            removeAtHpPercentagePerTransfer: 0.25,
            belongsToEvent: true,
            startTarget : "Emperor Zheng",
            transferToHighestHpOnRemove: true,
            listOfpossibleTransfer: [
                "Emperor Zheng",
                "Balrogue",
                "Mystical Fairy",
                "Reckless Barbarian",
            ],
            onTransferCastAbility: "puncture",
            onTransferResetAbilityDamage: "eradicate",
            onTransferGiveBuffToTransferTarget: "energy",
            minusTurnsToExpirePerBuffCount: "strengthDarkness",
            onTransferCasterGainsBuff: "strengthDarkness",
            clearBuffIfBuffToHandleNotExists: "energy",
            // at the end of the turn do the following:
            // check if the current darkness holder is under transferAtHpPercentage
            // if so, transfer to someone in the listOfPossibleTransfer
            // give energy to the enemy darkness was transfered to
            // give strength to target transfered from
            // transferToHighestHpOnRemove means check every target and figure out who has the highest HP %
            // cast puncture on a random player
        },
        darkness: {
            // ignore unique
            name: "Darkness",
            abilityId: "darkness",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 200,
            afterNTurns: 1,
            currentTurn: 0,
            buff: {
                name: "Darkness",
                abilityId: "darkness",
                buff: true,
                ignoreBandaid: true,
                emoji: ":star_and_crescent:",
                ignoreUnique: true,
                turnsToExpire: 200
            }
        },
        // starts at n-1 when the buff runs out then aoe begins to cast every turn
        energy:  {
            belongsToMember: true,
            abilityId: "energy",
            name: "Energy",
            buff: {
                name: "Energy",
                emoji: "📶",
                minusTurnsToExpirePerBuffCount: "strengthDarkness",
                displayExpireCount: true,
                turnsToExpire: 6,
                abilityId: "energy",
            }
        },
        eradicate: {
            belongsToMember: true,
            name: "Eradicate",
            validIfBuff: "darkness",
            invalidIfBuff: "energy",
            abilityId: "eradicate",
            resetEOTDamageForAbilityWhenBuffLost: "darkness",
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
            areawidedmg: {
                areawide: true,
                name: "eradicate",
                increaseDamagePerTurn: 700,
                dmg: 100,
                damageToResetTo: 100,
                mdPercentage: .4,
                type: "earth"
            }
        },

        puncture: {
            name: "Puncture",
            onDeathEffect: true,
            abilityId: "puncture",
            type: "earth",
            processAbility: true,
            belongsToMember: true,
            ignoreFocus: true,
            dot: {
                name: "Puncture",
                type: "earth",
                dmg: 100,
                mdPercentage: 1,
                emoji: ":o2:",
                ignoreUnique: true,
                applyDebuffOnDotDmg: "debilitate",
                onRemoveSelectNewTarget: true,
                dmgOnDotApply: false,
                turnsToExpire: 65,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },

        debilitate: {
            name: "Debilitate",
            abilityId: "debilitate",
            status: {
                status: true,
                name: "Debilitate",
                abilityId: "debilitate",
                emoji: "🌝",
                affectsGlobal: ["damageTakenPercentage"],                
                multiplier: 1.0,
                ignoreBandaid: true,
                multiplierPerDotTurn: 0.03,
                abilityTriggerOnDeath: "healAllDebilitate",
                checkDotMultiplierPerDotTurn: "puncture"
            }
        },

        healAllDebilitate: {
            belongsToMember: true,
            name: "Heal All",
            abilityId: "healAllDebilitate",
            heal: 100000,
            areawide: true,
            mdPercentage: 1,
        },

        worship: {
            name: "Worship",
            abilityId: "worship",
            processAbility: true,
            belongsToMember: true,
            targetLowestPercent: true,
            healMaxHpPercentage: 0.1,
            heal: 1,
            everyNTurns: 2,
            afterNTurns: 1,
            currentTurn: 0,
            listOfPossibleTarget: [
                "Emperor Zheng",
                "Balrogue",
                "Mystical Fairy",
                "Reckless Barbarian"
            ]
        },

        // HIGH MELEE - 6 turn dot hits high
        wound: {
            name: "Wound",
            abilityId: "wound",
            type: "physical",
            processAbility: true,
            belongsToMember: true,
            ignoreFocus: true,
            everyNTurns: 9,
            afterNTurns: 4,
            currentTurn: 0,
            dot: {
                name: "Wound",
                type:"physical",
                dmg: 1000,
                adPercentage: 1,
                emoji: "💔",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                turnsToExpire: 6,
                dmgOnDotExpire: false,
                dmgOnExpire: 0
            }
        },
        // HEALER - hits medium
        blast: {
            abilityId: "blast",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Blast",
            dmg: 50,
            mdPercentage: .2,
            type: "electric",
            everyNTurns: 6,
            afterNTurns: 3,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "blast",
                untargettable: true,
                name: "Blast",
                emoji: "<:electricorb:479296558375108610>",
                mdPercentage: .75,
                turnsToExpire: 2,
                dmgOnStatusExpire: true,
                dmgOnStatusRemove: true,
                dmgOnRemove: 150,
                dmgOnRemoveAreaWide: false,
                mdPercentageOnRemove: 1,
                dmgOnExpire: 150
            }
        },
        // 50% buff to damage - MUST have darkness
        mightyweapon : {
            name : "Mighty Weapon",
            abilityId: "mightyweapon",
            validIfBuff: "darkness",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 8,
            afterNTurns: 4,
            currentTurn: 0,
            description: "Increase all damage done by 50% for 3 turns",
            buff: {
                buff: true,
                selfbuff: true,
                abilityId: "mightyweapon",
                name: "Mighty Weapon",
                emoji : "🗡", 
                affectsGlobal: ["damageDealtPercentage"],
                turnsToExpire: 3,
                multiplier: 1.5
            }
        },
        // casts every 4 turns, MUST NOT have darkness
        lesion: {
            name:"Lesion",
            processAbility: true,
            belongsToMember: true,
            ignoreFocus: true,
            everyNTurns: 4,
            afterNTurns: 2,
            currentTurn: 0,
            abilityId: "lesion",
            invalidIfBuff: "darkness",
            type: "earth",
            dot: {
                name: "Lesion",
                abilityId: "lesion",
                type: "earth",
                dmg: 100,
                mdPercentage: 1,
                emoji: ":black_small_square:",
                dmgOnDotApply: false,
                ignoreBandaid: true,
                ignoreUnique: true,
                turnsToExpire: 70
            }
        },

        // reflect damage back to the attacker based on percentage
        reflectShield: {
            name: "Reflect Shield",
            abilityId: "reflectShield",
            invalidIfBuff: "darkness",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 3,
            afterNTurns: 3,
            currentTurn: 0,
            buff: {
                buff: true,
                name: "Reflect Shield",
                selfbuff: true,
                abilityId: "reflectShield",
                reflectPercentage: 0.15,
                areaewideReflectPercentage: 0.5,
                emoji: "🔈",
                abType: "electric",
                ignoreUnique: true,
                turnsToExpire: 3
            }
        },
        reflectBarrier: {
            name: "Reflect Barrier",
            abilityId: "reflectBarrier",
            validIfBuff: "darkness",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 3,
            afterNTurns: 3,
            currentTurn: 0,
            buff: {
                buff: true,
                name: "Reflect Barrier",
                selfbuff: true,
                abilityId: "reflectBarrier",
                reflectPercentageToAll: 0.15,
                areaewideReflectPercentageToAll: 0.5,
                emoji: "🔊",
                abType: "electric",
                ignoreUnique: true,
                turnsToExpire: 3
            }
        },
        // attempt to cast every turn, MUST HAVE darkness buff 
        summonKnights: {
            name: "Summon Knights",
            abilityId: "summonKnights",
            validIfBuff: "darkness",
            belongsToMember: true,
            everyNTurns: 2,
            afterNTurns: 5,
            currentTurn: 0,
            summon: {
                summonCountPerDot: "lesion",
                enemy: "knight",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 100
            }
        },
        // attempts to heal lowest health boss after 2 turns for 15%
        // MUST NOT have darkness
        summonWorshipper: {
            name: "Summon Worshipper",
            abilityId: "summonWorshipper",
            invalidIfBuff: "darkness",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 6,
            currentTurn: 0,
            summon: {
                enemy: "worshipper",
                attackDmg: 500,
                magicDmg: 500,
                hpPlus: 100
            }
        },
        // MUST HAVE darkness
        // deal aoe damage increasing every turn that they are alive
        summonCursedGuardian: {
            name: "Summon Cursed Guardian",
            abilityId: "summonCursedGuardian",
            validIfBuff: "darkness",
            belongsToMember: true,
            everyNTurns: 6,
            afterNTurns: 6,
            currentTurn: 0,
            summon: {
                enemy: "cursedGuardian",
                attackDmg: 100,
                magicDmg: 100,
                hpPlus: 100
            }
        },

        mysticalFairyDeath: {
            abilityId: "mysticalFairyDeath",
            onDeathEffect: true,
            belongsToMember: true,
            deathMessage: "End their misery swiftly"
        },
        emperorDeath: {
            abilityId: "emperorDeath",
            onDeathEffect: true,
            belongsToMember: true,
            deathMessage: "Avenge me.."
        },
        barbarianDeath: {
            abilityId: "barbarianDeath",
            onDeathEffect: true,
            belongsToMember: true,
            deathMessage: "Impossible..."
        },
        balrogueDeath: {
            abilityId: "balrogueDeath",
            onDeathEffect: true,
            belongsToMember: true,
            deathMessage: "Your fate is sealed"
        },

        regenerate: {
            name: "Regenerate",
            abilityId: "regenerate",
            processAbility: true,
            belongsToMember: true,
            heal: 100000,
            mdPercentage: 1,
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
            listOfPossibleTarget: [
                "Amber Dragon",
            ]
        },
        bloom: {
            name: "Bloom",
            abilityId: "bloom",
            processAbility: true,
            belongsToMember: true,
            areawide: true,
            heal: 10000,
            mdPercentage: 1,
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
        },

        lavaBlast: {
            abilityId: "lavaBlast",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            name: "Lava Blast",
            dmg: 5000,
            mdPercentage: 1,
            type: "fire",
            everyNTurns: 2,
            afterNTurns: 1,
            currentTurn: 0,
        },

        fade: {
            abilityId: "fade",
            belongsToMember: true,
            processAbility: true,
            name: "Fade",
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
            status: {
                status: true,
                ignoreUnique: true,
                name: "Fade",
                abilityId: "fade",
                affectsGlobal: ["healingTakenPercentage"],
                multiplier: 0.9,
                turnsToExpire: 30,
                emoji: ":ghost:"
            }
        },

        frighten: {
            abilityId: "frighten",
            belongsToMember: true,
            processAbility: true,
            name: "Frighten",
            everyNTurns: 1,
            afterNTurns: 1,
            currentTurn: 1,
            status: {
                status: true,
                ignoreBandaid: true,
                ignoreUnique: true,
                name: "Frighten",
                abilityId: "frighten",
                affectsGlobal: ["damageDealtPercentage"],
                multiplier: 0.97,
                turnsToExpire: 30,
                emoji: ":scream:"
            }
        },
        // whelpling explosion on death
        rupture: {
            name: "Rupture",
            abilityId: "rupture",
            onDeathEffect: true,
            processAbility: true,
            belongsToMember: true,
            castOnKiller: true,
            type: "earth",
            dot: {
                name: "Rupture",
                abilityId: "rupture",
                type: "earth",
                dmg: 3000,
                mdPercentage: 1,
                emoji: ":o2:",
                abilityTriggerOnDeath: "strengthRupture",
                targetToApplyOn: "Amber Dragon",
                ignoreUnique: true,
                dmgOnDotApply: false,
                turnsToExpire: 1
            }
        },

        erupt: {
            name: "Erupt",
            abilityId: "erupt",
            processAbility: true,
            belongsToMember: true,
            ignoreFocus: true,
            type: "physical",
            everyNTurns: 2,
            afterNTurns: 1,
            currentTurn: 0,
            dot: {
                name: "Erupt",
                type: "physical",
                dmg: 900,
                adPercentage: 1,
                emoji: ":volcano:",
                dealDamageToGroupBasedOnHealthMissing: true,
                ignoreUnique: true,
                dmgOnDotApply: false,
                turnsToExpire: 3
            }
        },

        reducedHealingWhelp: {
            onDeathEffect: true,
            processAbility: true,
            belongsToMember: true,
            listOfPossibleTarget: ["Amber Dragon"],
            name:"Reduced Healing",
            abilityId: "reducedHealingWhelp",
            status: {
                status: true,
                name: "Reduced Healing",
                ignoreUnique: true,
                abilityId: "reducedHealingWhelp",
                emoji: "",
                additionalDescription: " healing is reduced by 2%",
                affectsGlobal: ["healingDonePercentage"],
                turnsToExpire: 2000,
                multiplier: 0.98
            }
        },

        reducedHealingGuardian: {
            onDeathEffect: true,
            processAbility: true,
            belongsToMember: true,
            listOfPossibleTarget: ["Amber Dragon"],
            name:"Reduced Healing",
            abilityId: "reducedHealingGuardian",
            status: {
                status: true,
                name: "Reduced Healing",
                ignoreUnique: true,
                abilityId: "reducedHealingGuardian",
                emoji: "",
                additionalDescription: " healing is reduced by 5%",
                affectsGlobal: ["healingDonePercentage"],
                turnsToExpire: 2000,
                multiplier: 0.95
            }
        },

        reducedHealingDrake: {
            onDeathEffect: true,
            processAbility: true,
            belongsToMember: true,
            listOfPossibleTarget: ["Amber Dragon"],
            name:"Reduced Healing",
            abilityId: "reducedHealingDrake",
            status: {
                status: true,
                name: "Reduced Healing",
                ignoreUnique: true,
                abilityId: "reducedHealingDrake",
                emoji: "",
                additionalDescription: " healing is reduced by 15%",
                affectsGlobal: ["healingDonePercentage"],
                turnsToExpire: 2000,
                multiplier: 0.85
            }
        },

        rampageRoots: {
            name: "Rampage",
            abilityId: "rampageRoots",
            belongsToMember: true,
            processAbility: true,
            ignoreFocus: true,
            ignoreBandaid: true,
            everyNTurns: 40,
            afterNTurns: 1,
            currentTurn: 1,
            status: {
                focusedBy: "",
                abilityId: "rampageRoots",
                status: true,
                ignoreFocus: true,
                ignoreBandaid: true,
                name: "Rampage",
                turnsToExpire: 40,
                emoji: "<:rampage:479348722782830603>",
            }
        },
        infiltrate: {
            name: "Infiltrate",
            abilityId: "infiltrate",
            oneTimeCast: true,
            onDeathEffect: true,
            belongsToMember: true,
            processAbility: true,
            listOfPossibleTarget: ["Conduit"],
            status: {
                status: true,
                name: "Infiltrate",
                abilityId: "infiltrate",
                ignoreBandaid: true,
                deathOnStatusExpire: true,
                emoji : ":coffin:",
                turnsToExpire: 1,
            }
        },
        summonDeusEx: {
            belongsToMember: true,
            oneTimeCast: true,
            onDeathEffect: true,
            name: "Summon Deus Ex",
            abilityId: "summonDeusEx",
            summonDeadCheck: [
                "Conduit",
            ],
            summonDeadCheckCount: 3,
            summon: {
                enemy: "deusex",
                attackDmg: 200,
                magicDmg: 200,
                hpPlus: 100
            }
        },

        turretFrenzy: {
            name: "Turret Frenzy",
            abilityId: "turretFrenzy",
            processAbility: true,
            belongsToMember: true,
            oneTimeCast: true,
            everyNTurns: 40,
            afterNTurns: 1,
            currentTurn: 0,
            buff: {
                buff: true,
                areawide: true,
                name: "frenzy",
                abilityId: "frenzy",
                emoji: "<:frenzy:479298214453968896>",
                onTurnEnd: {
                    attackDmgPlus : 500,
                    magicDmgPlus : 500,
                    everyNTurns: 2,
                    startTurn: 2
                }
            }
        },

        summonSentinel: {
            name: "Summon Sentinel",
            abilityId: "summonSentinel",
            belongsToMember: true,
            onDeathEffect: true,
            summon: {
                enemy: "sentinel",
                attackDmg: 200,
                magicDmg: 200,
                hpPlus: 100
            }
        },

        wrap: {
            name:"Wrap",
            abilityId: "wrap",
            type:"physical",
            processAbility: true,
            belongsToMember: true,
            ignoreFocus: true,
            everyNTurns: 2,
            ignoreFocus: true,
            afterNTurns: 2,
            currentTurn: 0,
            status: {
                status: true,
                abilityId: "wrap",
                name: "Wrap",
                type:"physical",
                dmg: 100,
                untargettable: true,
                adPercentage: 1,
                emoji: ":yarn:",
                dmgOnDotApply: false,
                turnsToExpire: 1,
                dmgOnStatusExpire: true,
                adPercentageOnRemove: .9,
                dmgOnExpire: 600
            }
        },

        summonHeatseekers: {
            name: "Summon Heatseekers",
            abilityId: "summonHeatseekers",
            belongsToEvent: true,
            everyNTurns: 6,
            afterNTurns: 2,
            currentTurn: 0,
            summon: {
                enemies: [
                    "heatseeker",
                    "heatseeker"
                ]
            }
        },

        summonTurrets: {
            name: "Summon Turrets",
            abilityId: "summonTurrets",
            belongsToEvent: true,
            everyNTurns: 100,
            afterNTurns: 1,
            currentTurn: 0,
            summon: {
                enemies: [
                    "turret",
                    "turret",
                    "turret",
                    "turret"
                ]
            }
        },

        summonSkitters: {
            name: "Summon Skitters",
            abilityId: "summonSkitters",
            belongsToEvent: true,
            everyNTurns: 4,
            afterNTurns: 1,
            currentTurn: 0,
            summon: {
                enemies: [
                    "skitter",
                    "skitter"
                ]
            }
        },

        detonationSequence : {
            name: "Detonation Sequence",
            processAbility: true,
            belongsToMember: true,
            everyNTurns: 1,
            afterNTurns: 25,
            currentTurn: 0,
            abilityId: "detonationSequence",
            type: "magical",
            areawide: true,
            areawidedmg: {
                areawide: true,
                name: "Detonation Sequence",
                abilityId: "detonationSequence",
                dmg: 5000000,
                mdPercentage: 1,
                type: "magical"
            }
        },

        detonationSequenceBegin: {
            abilityId: "detonationSequenceBegin",
            belongsToMember: true,
            everyNTurns: 2000,
            afterNTurns: 1,
            currentTurn: 1,
            eotMessage: "Detonation sequence initialized. T minus 25 turns "
        },

        /*
        summon effects
        */
        totemOfDoomDeath: {
            belongsToMember: true,
            onDeathEffect: true,
            summon: {
                enemy: "totemOfDoom"
            }
        },
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
}

/*
each zone has ~12-20 areas
each area has 1 boss after ~7-10 RPGs in that area
in total 84 RPGS -> 200 rpgs per zone
all areas are completed by picking, first one is always the same, completion % of area is linear, they are just integers
zones are completed once all areas are completed

TODO: come up with area names for all of these
find pictures for all areas + zones
*/