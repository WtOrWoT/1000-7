const { combineStats, makeAuto, makeHybrid, makeOver, makeDeco, makeGuard, makeBird, makeMulti } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
require('./generics.js');
const g = require('../gunvals.js');


const wTimer = (execute, duration) => {
    let timer = setInterval(() => execute(), 31.25);
    setTimeout(() => {
        clearInterval(wTimer);
    }, duration * 1000);
};
const poison = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.poisoned) {
        them.poisoned = true;
        setTimeout(() => {
            them.poisoned = false;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.poisoned && them.health.amount > 10) {
                them.health.amount -= multiplier * 0.5;
            }
        }, 2 * duration);
    }
};
const fire = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.isOnFire) {
        them.isOnFire = true;
        setTimeout(() => {
            them.isOnFire = false;
        }, duration * 1000);
        wTimer(() => {
            if (them.isOnFire && them.health.amount > 10) {
                them.health.amount -= multiplier;
            }
        }, duration);
    }
};
const acid = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.acid) {
        them.acid = true;
        setTimeout(() => {
            them.acid = false;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.acid) {
                them.shield.amount = Math.max(them.shield.amount - multiplier * 0.2, 0)
                if (them.shield.amount == 0) {
                    if (them.health.amount > 10) {
                        them.health.amount -= 1
                    }
                }
            }
        }, 2 * duration);
    }
};
const lava = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.lava) {
        them.lava = true;
        setTimeout(() => {
            them.lava = false;
        }, duration * 1000);
        wTimer(() => {
            if (them.lava) {
                them.shield.amount = Math.max(them.shield.amount - multiplier * 0.4, 0)
                if (them.shield.amount == 0) {
                    if (them.health.amount > 10) {
                        them.health.amount -= 2
                    }
                }
            }
        }, duration);
    }
};
const paralyze = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.paralyzed) {
        them.paralyzed = true;
        setTimeout(() => {
            them.paralyzed = false;
        }, duration * 1000 * 0.5);
        wTimer(() => {
            if (them.paralyzed) {
                them.velocity.x = -them.accel.x;
                them.velocity.y = -them.accel.y;
            }
    }, duration * 0.5);
    }
};
const forcedPacify = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.forcedPacify) {
        them.forcedPacify = true;
        setTimeout(() => {
            them.forcedPacify = false;
            if (them.socket) {
                if (them.socket.player) {
                    them.socket.player.command.override = them.$overrideStatus
                }
            }
            them.autoOverride = them.store.$overrideStatus
            them.$overrideStatus = null
        }, duration * 1000);
        wTimer(() => {
            if (them.forcedPacify) {
                // save the orginal override status!
                if (!them.store.$overrideStatus) {
                    let failed = false;
                    //a lotta checks to make sure socket exists.
                    if (them.socket) {
                        if (them.socket.player) {
                            them.$overrideStatus = them.socket.player.command.override
                        } else {
                            failed = true
                        }
                    } else {
                        failed = true
                    }
                    //most likely not a player.
                    if (failed) {
                        them.$overrideStatus = them.autoOverride
                    }
                }

                // Now lets change override to true!!!
                if (them.socket) {
                    if (them.socket.player) {
                        them.socket.player.override = true
                    }
                }
                //second one to be REALLY sure it does work!
                them.autoOverride = true

            }
    }, duration);
    }
};
const toggleGuns = (instance, barrelCanShoot) => {
    if (instance.guns) {
        for (let i = 0; i < instance.guns.length; i++) {
            let gun = instance.guns[i];
            if (gun.settings && gun.bulletTypes) {
                gun.canShoot = barrelCanShoot
            }
        }
    }
    if (instance.turrets) {
        for (let i = 0; i < instance.turrets.length; i++) {
            let turret = instance.turrets[i];
            if (instance.turrets.guns || instance.turrets) {
                gunsCanShoot(turret, barrelCanShoot)
            }
        }
    }
}
const disableWeapons = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.disableWeapons) {
        them.disableWeapons = true;
        setTimeout(() => {
            them.disableWeapons = false;
                toggleGuns(them, true)
        }, duration * 1000);
        wTimer(() => {
            if (them.disableWeapons) {
                toggleGuns(them, false)
            }
    }, duration);
    }
};
const wither = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.wither) {
        them.wither = true;
        setTimeout(() => {
            them.wither = false;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.wither && them.health.max > 10) {
                them.HEALTH -= multiplier * 0.002
            }
        }, 2 * duration);
    }
};
const decay = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.decay) {
        them.decay = true;
        setTimeout(() => {
            them.decay = false;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.decay && them.shield.max > 10) {
                them.SHIELD -= multiplier * 0.001;
            }
        }, 2 * duration);
    }
};
const radiation = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.radiation) {
        them.radiation = true;
        setTimeout(() => {
            them.radiation = false;
        }, 7 * duration * 1000);
        wTimer(() => {
            if (them.radiation && them.health.amount) {
                them.health.amount -= multiplier * 0.03;
            }
        }, 7 * duration);
    }
};
const vulnerable = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.vulnerable) {
        them.vulnerable = true
        them.store.$savedResist = them.RESIST;
        setTimeout(() => {
            them.vulnerable = false;
            them.RESIST = them.store.$savedResist 
            them.store.$savedResist = null
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.vulnerable) {
                them.RESIST = them.store.$savedResist / multiplier
            }
        }, 2 * duration);
    }
};
const invulnerable = (them, multiplier, duration) => {
if (!them) return
if (!them.invuln &&!them.passive &&!them.godmode &&!them.vulnerable) {
them.vulnerable = true
them.store.$savedResist = them.RESIST;
setTimeout(() => {
them.vulnerable = false;
them.RESIST = them.store.$savedResist
them.store.$savedResist = null
}, 2 * duration * 1000);
them.dealDamage = (enemy, damage) => {
if (!them.vulnerable) {
enemy.health -= damage;
}
};
}
};
const emp = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.emp) {
        them.emp = true
        setTimeout(() => {
            them.emp = false;
            them.store.$oldShieldAmount = null
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.emp) {
                them.shield.amount = 0
                them.store.$oldShieldAmount = them.store.$oldShieldAmount ? them.store.$oldShieldAmount : them.shield.amount
                them.shield.amount = Math.min(them.shield.amount, them.store.$oldShieldAmount)
                them.store.$oldShieldAmount = them.shield.amount
            }
        }, 2 * duration);
    }
};
const fatigued = (them, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.fatigued) {
        them.fatigued = true
        setTimeout(() => {
            them.fatigued = false;
            them.store.$oldHealthAmount = null
            them.store.$oldShieldAmount = null
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.fatigued) {
                them.store.$oldShieldAmount = them.store.$oldShieldAmount ? them.store.$oldShieldAmount : them.shield.amount
                them.shield.amount = Math.min(them.shield.amount, them.store.$oldShieldAmount)
                them.store.$oldShieldAmount = them.shield.amount

                them.store.$oldHealthAmount = them.store.$oldHealthAmount ? them.store.$oldHealthAmount : them.health.amount
                them.health.amount = Math.min(them.health.amount, them.store.$oldHealthAmount)
                them.store.$oldHealthAmount = them.health.amount
            }
        }, 2 * duration);
    }
};
const ice = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.ice) {
        them.ice = true
        them.store.$savedAcceleration = them.store.$savedAcceleration ?? them.ACCELERATION;
        them.store.$iceMulti = multiplier;
        setTimeout(() => {
            them.ice = false;
            them.ACCELERATION = them.store.$savedAcceleration
            them.store.$savedAcceleration = them.store.$frostbiteMulti ? them.store.$savedAcceleration : null
            them.store.$iceMulti = null;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.ice) {
                them.ACCELERATION = them.store.$savedAcceleration / (multiplier * (them.store.$frostbiteMulti ?? 1))
            }
        }, 2 * duration);
    }
};
const frostbite = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.frostbite) {
        them.frostbite = true
        them.store.$savedAcceleration = them.store.$savedAcceleration ?? them.ACCELERATION;
        them.store.$frostbiteMulti = multiplier;
        them.store.$forstbiteIntensityStore = 0;
        setTimeout(() => {
            them.frostbite = false;
            them.ACCELERATION = them.store.$savedAcceleration
            them.store.$savedAcceleration = them.store.$iceMulti ? them.store.$savedAcceleration : null
            them.store.$frostbiteMulti = null
            them.store.$forstbiteIntensityStore = 0
        }, 3 * duration * 1000);
        wTimer(() => {
            if (them.frostbite) {
                them.ACCELERATION = them.store.$savedAcceleration / (them.store.$frostbiteMulti * (them.store.$iceMulti ?? 1))
                them.health.amount =  Math.max(them.health.amount - them.store.$forstbiteIntensityStore, 2)
                
                them.store.$forstbiteIntensityStore = Math.min(Math.max((them.store.$forstbiteIntensityStore + 0.025) - Math.min(Math.round(them.velocity.length), 0.1),0), 1.5)

            }
        }, 3 * duration);
    }
};
const glue = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.glue) {
        them.glue = true
        them.store.$savedSpeed = them.SPEED;
        setTimeout(() => {
            them.glue = false;
            them.SPEED = them.store.$savedSpeed;
            them.store.$savedSpeed = null
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.glue) {
                them.SPEED = them.store.$savedSpeed / multiplier
            }
        }, 2 * duration);
    }
};
const blind = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.blind) {
        them.blind = true
        them.store.$savedFOV = them.FOV;
        them.store.$savedfov = them.fov;
        setTimeout(() => {
            them.blind = false;
            them.FOV = them.store.$savedFOV;
            them.fov = them.store.$savedfov;
            them.store.$savedFOV = null
            them.store.$savedfov = null
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.blind) {
                them.FOV = them.store.$savedFOV / multiplier
                them.fov = them.store.$savedfov / multiplier
            }
        }, 2 * duration);
    }
};
const curse = (them, multiplier) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.curse) {
        them.curse = true
        them.store.$savedDamage = them.DAMAGE;
        them.store.$savedPenetration = them.PENETRATION;
        them.store.$savedHetero = them.HETERO;
        wTimer(() => {
            if (them.curse) {
                them.DAMAGE = them.store.$savedDamage / multiplier
                them.PENETRATION = them.store.$savedPenetration / multiplier
                them.HETERO = them.store.$savedHetero * multiplier
            }
        }, 200000);
    }
};
const suffocation = (them, multiplier, duration) => {
    if (!them) return
    if (!them.invuln && !them.passive && !them.godmode && !them.suffocation) {
        them.suffocation = true;
        setTimeout(() => {
            them.suffocation = false;
        }, 2 * duration * 1000);
        wTimer(() => {
            if (them.suffocation && them.health.amount > 10) {
                them.health.amount -= them.health.max * 0.000025;
            }
        }, 2 * duration);
    }
};
Class.executorBullet = {
    PARENT: 'bullet',
    ON: [
        {
            event: "collide",
            handler: ({ instance, other }) => {
                if (other.team != instance.master.master.master.team && other.master == other && other.type != 'wall') {
                    poison(other,2,3) // brings people down to 10 health slowly
                    fire(other,2,3) // poison but does more damage per tick for a shorter amount of time
                    acid(other,2,3) // shield version of poison, if there is no shield it does massive damage to health
                    lava(other,2,3) // shield version of fire, if there is no shield it does massive damage to health
                    paralyze(other, 3) // stops movement
                   // forcedPacify(other, 3) // forces override to be on (minions/drones dont automatically attack) dont use on bosses
                    disableWeapons(other,3) // disables all guns
                    wither(other,2,3) // slowly lowers max health
                    decay(other,2,3) // slowly lowers shields max health
                    radiation(other,2,3) // slow long lasting poison that doesnt stop at ten health
                    vulnerable(other, 2,3) // people take more damage
                    curse(other,2) // permanent debuff to body stats damage, penetration and hetero
                    emp(other,3) // disables shield and shield regen
                    fatigued(other,3) // disables all regen
                    glue(other,2,3) // lowers max speed
                    ice(other,2,3) // lowers acceleration
                    blind(other,2,3) // lowers fov
                    suffocation(other,2,3) // does 0.0025% of a players max health damage per tick.
                    frostbite(other,2,3) // does increasing damage when the player doesnt move.
                }
            }
        },
     ],
}
Class.miniMothership = {
   PARENT: "genericTank",
   LABEL: 'Mini MotherShip',
   SHAPE: 10,
   COLOR: 11,
   GUNS: [ {
         POSITION: [ 11, 6, 0, 1, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, 36.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, 71.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, 109, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, 144, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, -143.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, -108, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, -71, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 11, 6, 0, 1, 0, -36, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.small]),
            TYPE: "swarm",
         }, }, 
     ],
};
Class.unnamedTank0022 = {
    PARENT: "genericTank",
    LABEL: "executor.",
    BODY: {
        FOV: base.FOV
    },
    HAS_NO_RECOIL:true,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, -5, 1/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 5, 2/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, -2.5, 3/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 2.5, 4/4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "executorBullet",
            }
        },
        {
            POSITION: [18, 8, 1.44144144144, 0, 0, 0, 0],
        },
    ]
}
// Missiles
Class.missile = {
    PARENT: "bullet",
    LABEL: "Missile",
    INDEPENDENT: true,
    BODY: { RANGE: 120 },
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 130, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        },
        {
            POSITION: [14, 6, 1, 0, 2, 230, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }
    ]
}
Class.hypermissile = {
    PARENT: "missile",
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, -2, 150, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 210, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 6, 1, 0, -2, 90, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
            },
        },
        {
            POSITION: [14, 6, 1, 0, 2, 270, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, {reload: 3}]),
                TYPE: [ "bullet", { PERSISTS_AFTER_DEATH: true } ],
            },
        },
    ],
}
Class.minimissile = {
    PARENT: "missile",
    GUNS: [
        {
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { recoil: 1.35 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
}

Class.explodingMissile = {
    PARENT: "bullet",
    LABEL: "Missile",
    BODY: {
        RANGE: 120
    },
    GUNS: (() => {
        let e = [{
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }];
        for (let T = 0; T < 9; T++) e.push({
            POSITION: [3, 5, 1, 0, 0, (360 / 9) * T, 1 / 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: ["minimissile", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
            }
        });
        return e
    })()
};
Class.rrml = {
   PARENT: "genericTank",
   LABEL: 'Rapid Rocket Missile Launcher',
   UPGRADE_LABEL: "R.R.M.L",
   SIZE: 20,
   GUNS: [ {
         POSITION: [ 45, 8, 1, 0, 0, -120, 0, ],
         }, {
         POSITION: [ 45, 8, 1, 0, 0, 120, 0, ],
         }, {
         POSITION: [ 45, 0, 1, 0, 0, -120, 0, ],
         }, {
         POSITION: [ 45, 0, 1, 0, 0, 120, 0, ],
         }, {
         POSITION: [ 45, 8, 1, -16, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 10, 11, 1, -24, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 4, 1, -24, -3.5, 0, 0, ],
         }, {
         POSITION: [ 4, 4, 1, -24, 3.5, 0, 0, ],
         }, {
         POSITION: [ 4, 4, 1, -18, 3.5, 0, 0, ],
         }, {
         POSITION: [ 4, 4, 1, -18, -3.5, 0, 0, ],
         }, {
         POSITION: [ 10, 2, 1, -24, 0, 0, 0, ],
         }, {
         POSITION: [ 42.5, 0, 1, -13.5, 2, 0, 0, ],
         }, {
         POSITION: [ 42.5, 0, 1, -13.5, -2, 0, 0, ],
         }, {
         POSITION: [ 25.5, 7, 1, -22, 15, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 25.5, 7, 1, -22, -15, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 25.5, 7, 1, -28, 26, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 25.5, 7, 1, -28, -26, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 25.5, 7.9, 1, -36, 37, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 25.5, 7.9, 1, -36, -37, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,g.rocketeer,g.power,{size: 0.8,speed: 1.5}]),
            TYPE: "explodingMissile"
         }, }, {
         POSITION: [ 6.5, 9, 1, -25, -15, 0, 0, ],
         }, {
         POSITION: [ 6.5, 9, 1, -25, 15, 0, 0, ],
         }, {
         POSITION: [ 6.5, 9, 1, -30, -26, 0, 0, ],
         }, {
         POSITION: [ 6.5, 9, 1, -30, 26, 0, 0, ],
         }, {
         POSITION: [ 8.5, 11, 1, -39, -37, 0, 0, ],
         }, {
         POSITION: [ 8.5, 11, 1, -39, 37, 0, 0, ],
         }, {
         POSITION: [ 2.5, 11, 1, -36, -37, 0, 0, ],
         }, {
         POSITION: [ 2.5, 11, 1, -36, 37, 0, 0, ],
         }, {
         POSITION: [ 2.5, 9, 1, -28, -26, 0, 0, ],
         }, {
         POSITION: [ 2.5, 9, 1, -28, 26, 0, 0, ],
         }, {
         POSITION: [ 2.5, 9, 1, -23, -15, 0, 0, ],
         }, {
         POSITION: [ 2.5, 9, 1, -23, 15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -15, 15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -15, -15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -11, 15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -11, -15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -7, 15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -7, -15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -3, 15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -3, -15, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -7, 26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -7, -26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -11, 26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -11, -26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -15, 26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -15, -26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -19, 26, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -19, -26, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -15, 37, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -15, -37, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -20, 37, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -20, -37, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -25, 37, 0, 0, ],
         }, {
         POSITION: [ 2, 2, 1, -25, -37, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -28.5, 37, 0, 0, ],
         }, {
         POSITION: [ 1, 1, 1, -28.5, -37, 0, 0, ],
         }, 
     ],
};
Class.sideMortars = {
PARENT: "genericTank",
LABEL: "Side Mortars",
SIZE: 17,
GUNS: [
{
POSITION: [33.231,11.2,1,0,0,232.5,0],
PROPERTIES: {
}, },
{
POSITION: [33.231,11.2,1,0,0,127.5,0],
PROPERTIES: {
}, },
{
POSITION: [55.385,21.44,1,-41.538,27.692,0,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[80, 3, 0.001, 1, 1, 0.75, 1, 18, 1, 3, 1, 0.00001, 1]]),
TYPE: "explodingMissile",
COLOR: 16
}, },
{
POSITION: [55.385,21.44,1,-41.538,-27.692,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[80, 3, 0.001, 1, 1, 0.75, 1, 18, 1, 3, 1, 0.00001, 1]]),
TYPE: "explodingMissile",
}, },
{
POSITION: [8.308,24,1,36,27.692,180,0],
PROPERTIES: {
}, },
{
POSITION: [8.308,24,1,36,-27.692,180,0],
PROPERTIES: {
}, },
{
POSITION: [4.154,24,1,22.154,-27.692,180,0],
PROPERTIES: {
}, },
{
POSITION: [4.154,24,1,22.154,27.692,180,0],
PROPERTIES: {
}, },
{
POSITION: [13.846,24,1,6.923,-27.692,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[80, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet", // fake barrel
}, },
{
POSITION: [13.846,24,1,6.923,27.692,0,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[80, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet", // fake barrel
}, },
], };

Class.rpgRlbullet = {
  PARENT: "bullet",
  SHAPE: "M -0.996 -0.165 L -0.996 0.171 L 0.106 0.171 L 0.352 0.107 L 1.002 0.005 L 0.375 -0.088 L 0.128 -0.165 L -0.996 -0.165 Z"
}
Class.rpgRocket = {
    PARENT: "bullet",
    LABEL: 'Rocket',
    SHAPE: "M -0.716 -0.065 L -0.684 -0.065 L -0.633 -0.161 L -0.526 -0.124 L -0.526 -0.132 L -0.459 -0.132 L -0.459 -0.108 L -0.419 -0.108 L 0.109 -0.191 L 0.26 -0.191 L 0.733 -0.065 L 0.886 -0.065 L 0.904 -0.048 L 0.99 -0.048 L 0.99 0.055 L 0.902 0.055 L 0.888 0.071 L 0.738 0.071 L 0.262 0.189 L 0.112 0.189 L -0.418 0.107 L -0.464 0.107 L -0.464 0.127 L -0.517 0.127 L -0.517 0.118 L -0.627 0.163 L -0.676 0.074 L -0.984 0.074 L -0.984 -0.065 L -0.716 -0.065 Z",
    GUNS: [{
        POSITION: [1, 2, 1, 0, 0, 180, .25],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.rpg_propeller]),
            TYPE: ["bullet", {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
for (let i = 0; i < 36; i++) Class.rpgRocket.GUNS = Class.rpgRocket.GUNS.concat({
    POSITION: [1, 1, 1, 0, 0, i * 36, 100],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.rpg_explosion]),
        TYPE: ["rpgRlbullet", {
            PERSISTS_AFTER_DEATH: true,
            LABEL: 'Explosion'
        }],
        AUTOFIRE: true,
        SHOOT_ON_DEATH: true
    }
});

Class.sideRpgs = {
   PARENT: "genericTank",
   LABEL: 'Side RPGs',
   GUNS: [ {
         POSITION: [ 25, 6, 1, 0, 0, -112.5, 0, ],
         }, {
         POSITION: [ 25, 6, 1, 0, 0, 112.5, 0, ],
         }, {
         POSITION: [ 36, 9, 1, -19, -25, 0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.rpg_launch]),
            TYPE: "rpgRocket"
         }, }, {
         POSITION: [ 36, 9, 1, -19, 25, -0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.rpg_launch]),
            TYPE: "rpgRocket"
         }, }, {
          POSITION: [ 36, 5, 1, -19, -25, 0.5, 0, ],
         }, {
         POSITION: [ 36, 5, 1, -19, 25, -0.5, 0, ],
         }, {
         POSITION: [ 7, 10, 2, 19, -25, 179.5, 0, ],
         }, {
         POSITION: [ 7, 10, 2, 19, 25, -179.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -1, -25, -0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -1, 25, 0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -11, -25, 0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -11, 25, -0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, 9, -25, 0, 0, ],
         }, {
         POSITION: [ 0, 4, 1, 9, 25, 0, 0, ],
         }, {
         POSITION: [ 0, 15, 1, -23, -25, 0, 0, ],
         }, {
         POSITION: [ 0, 15, 1, -23, 25, 0, 0, ],
         }, {
         POSITION: [ 0, 5, 1, -17, 0, -67.5, 0, ],
         }, {
         POSITION: [ 0, 5, 1, -17, 0, 67.5, 0, ],
         }, 
     ],
};
Class.spinmissile = {
    PARENT: "missile",
    FACING_TYPE: ["spin", {speed: 0.1}],
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
}
Class.hyperspinmissile = {
    PARENT: "spinmissile",
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 90, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [14, 8, 1, 0, 0, 270, 0],
            PROPERTIES: {
                AUTOFIRE: !0,
                SHOOT_SETTINGS: combineStats([g.basic, g.skimmer, { reload: 0.5 }, g.lowPower, { reload: 0.75 }, { speed: 1.3, maxSpeed: 1.3 }]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
}
Class.hive = {
    PARENT: "bullet",
    LABEL: "Hive",
    BODY: {
        RANGE: 90,
        FOV: 0.5,
    },
    FACING_TYPE: "turnWithSpeed",
    INDEPENDENT: true,
    CONTROLLERS: ["alwaysFire", "nearestDifferentMaster", "targetSelf"],
    AI: {
        NO_LEAD: true,
    },
    GUNS: [
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bee]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
Class.snake = {
    PARENT: "missile",
    LABEL: "Methionylglutaminylarginyltyrosylglutamylserylleu c ylphenylalanylalanylglutaminylleucyllysylgl utamylarginyllysyglutamylgycylalanylphenylalanylv a lylprolylphenylalanylvalylthreonylleucylgl ycylaspartylprolylglycyllisoleucylglutamylglutami n ylserylleucyllysylisoleucylaspartylthreonylleu cylisoleucylglutamylalanylglycylalanylaspartylala n ylleucylglutamylleucylglycylisoleucylprolylph enylalanylserylaspartylprolylleucylalanylaspartyl g lycylprolylthreonylisoleucylglutaminylaspara ginylalanylthreonylleucylarginylalanylphenylalany l alanylalanylglycylvalylthreonylprolylalanylgl utaminylcysteinylphenylalanylglutamylmethionylleu c ylalanylleucylisoleucylarginylglutaminyllys ylhistidylprolylthreonylisoleucylprolylisoleucylg l ycylleucylleucylmethionyltyrosylalanlylasparagi nylleucylvalylphenylalanylasparaginyllysylglycyli s oleucylaspartylglutamylphenylalanyltyrosylal anylglutaminylcysteinylglutamyllysylvalylglycylva l ylaspartylsrylvalylleucylvalylalanylaspartylv alylprolylvalylglutaminylglutamylserylalanylproly l phenylalanylarginylglutaminylalanylalanylleu cylarginylhistidylasparaginylvalylalanylprolyliso l eucylphenylalanylisoleucylcysteinylprolylprolyl aspartylalanylaspartylaspartylaspartylleucylleucy l arginylglutaminylisoleucylalanylseryltyrosylg lycylarginylglycyltyrosylthreonyltyrosylleucylleu c ylserylarginylalanylglycylvalylthreonylglycylal anylglutamylasparaginylarginylalanylalanylleucyll e ucyllysylglutamyltyrosylasparaginylalanylal anylprolylprolylleucylglutaminylglycylphenylalany l glysylisoleucylserylalanylprolylaspartylgluta minylvalyllysylalanylalanylisoleucylaspartylalany l glycylalanylalanylglycylalanylisoleucylserylgl ycylserylalanylisoleucylvalyllysylisoleucylisoleu c ylglutamylglutaminylhistidylasparaginylisoleuc ylglutamylprolylglutamyllysylmethionylleucylalany l alanylleucyllysylvalylphenylalanylvalylgluta minylprolylmethionyllysylalanylalanylthreonylargi n ylserine",
    GUNS: [
        {
            POSITION: [6, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake, g.snakeskin]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
        {
            POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
            PROPERTIES: {
                AUTOFIRE: true,
                NEGATIVE_RECOIL: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.snake]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            },
        },
    ],
}
Class.rocketeerMissile = {
    PARENT: "missile",
    GUNS: [
        {
            POSITION: [16.5, 10, 1.5, 0, 0, 180, 3],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.missileTrail, g.rocketeerMissileTrail]),
                TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
}

// Healer Projectiles
Class.surgeonPillboxTurret = {
    PARENT: "genericTank",
    LABEL: "",
    COLOR: "grey",
    BODY: {
        FOV: 3,
    },
    HAS_NO_RECOIL: true,
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [17, 11, 1, 0, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [17, 11, 1, 0, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [14, 11, 1, 0, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, g.turret]),
                TYPE: "healerBullet",
                AUTOFIRE: true,
            },
        },
    ],
}
Class.surgeonPillbox = {
    PARENT: "trap",
    LABEL: "Pillbox",
    SHAPE: -6,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget", "nearestDifferentMaster"],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
        DAMAGE: 0
    },
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "surgeonPillboxTurret",
        },
    ],
}

// Drones
Class.turretedDrone = makeAuto('drone', "Auto-Drone", {type: 'droneAutoTurret'})

// Sunchips
Class.sunchip = {
    PARENT: "drone",
    SHAPE: 4,
    NECRO: true,
    HITS_OWN_TYPE: "hard",
    BODY: {
        FOV: 0.5,
    },
    AI: {
        BLIND: true,
        FARMER: true,
    },
    DRAW_HEALTH: false,
}
Class.eggchip = {
    PARENT: "sunchip",
    NECRO: [0],
    SHAPE: 0
}
Class.autosunchip = {
    PARENT: "sunchip",
    AI: {
        BLIND: true,
        FARMER: true,
    },
    INDEPENDENT: true,
}
Class.autoeggchip = {
    PARENT: "autosunchip",
    NECRO: [0],
    SHAPE: 0,
}
Class.pentachip = {
    PARENT: "sunchip",
    SHAPE: 5
}
Class.summonerDrone = {
    PARENT: "sunchip",
    NECRO: false
}
Class.gunchip = {
    PARENT: "sunchip",
    NECRO: [-2],
    SHAPE: -2
}

// Minions
Class.minion = {
    PARENT: "genericTank",
    LABEL: "Minion",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [17, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun]),
                WAIT_TO_CYCLE: true,
                TYPE: "bullet",
            },
        },
    ],
}
Class.desmosminion = {
    PARENT: "genericTank",
    LABEL: "Minion",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: "smoothToTarget",
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [20, 10, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, 90, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, -90, 0]
        }
    ]
}
// Traps
Class.setTrap = {
    PARENT: "trap",
    LABEL: "Set Trap",
    SHAPE: -4,
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget"],
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
}
Class.explodingSetTrap = {
    PARENT: "trap",
    SHAPE: -4,
    LABEL: "Exploding Set Trap",
    MOTION_TYPE: "motor",
    CONTROLLERS: ["goToMasterTarget"],
     BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    TURRETS: [{/** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: ["pentagon", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}],
    }],
    GUNS: (() => {
        let e = [{
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                ALPHA: 0,
                SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
                TYPE: ["trap", {
                    PERSISTS_AFTER_DEATH: true
                }],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }];
        for (let T = 0; T < 5; T++) e.push({
            POSITION: [3, 5, 1, 0, 0, (360 / 5) * T, 1 / 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: ["trap", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
            }
        });
        return e
    })()
};
Class.unsetTrap = {
    PARENT: "trap",
    LABEL: "Set Trap",
    SHAPE: -4,
    MOTION_TYPE: "motor",
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
}
Class.boomerang = {
    PARENT: "trap",
    LABEL: "Boomerang",
    CONTROLLERS: ["boomerang"],
    MOTION_TYPE: "motor",
    HITS_OWN_TYPE: "never",
    SHAPE: -5,
    BODY: {
        SPEED: 1.25,
        RANGE: 120,
    },
}
Class.assemblerTrap = {
    PARENT: "setTrap",
    LABEL: "Assembler Trap",
    BODY: {
        SPEED: 0.7,
        ACCEL: 0.75
    },
    TURRETS: [
        {
            /**     SIZE X  Y  ANGLE ARC */
            POSITION: [4, 0, 0, 0, 360, 1],
            TYPE: 'assemblerDot'
        }
    ],
    HITS_OWN_TYPE: 'assembler'
}

// Auto Guns
Class.RPGturret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [ 44, 10, -1.2, -21, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret,{size: 1.5}]),
                TYPE: "rpgRocket",
            }, }, {
         POSITION: [ 8, 15, -1.2, -27, 0, 0, 0, ],
         }, {
         POSITION: [ 0, 16, 1, -23, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 12, 1, 11, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 15, 1, -14, 0, 0, 0, ],
         }, 
     ],
};
Class.ultraTurret = {
   PARENT: "autoTankGun",
   HAS_NO_RECOIL: true,
   GUNS: [ {
         POSITION: [ 6, 27, 1, 43, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 27, 1, 15, 0, 0, 0, ],
         }, {
         POSITION: [ 12, 6, 1, 18, 10, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 12, 6, 1, 18, -10, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 12, 6, 1, 46, 10, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 12, 6, 1, 46, -10, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 6, 27, 1, 43, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 27, 1, 15, 0, 0, 0.5, ],
         }, {
         POSITION: [ 68, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.power,{damage: 10, health: 5, speed: 2}]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 10, 9, -2, 4, 0, 0, 0.5, ],
         }, {
         POSITION: [ 10, 7, -2, 4, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 5, -2, 4, 0, 0, 0.5, ],
         }, {
         POSITION: [ 66, 2, -2, 2, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, 16.5, 9.5, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, 16.5, -9.5, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, 44.5, 9.5, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, 44.5, -9.5, 0, 0, ],
         }, 
     ],
};

Class.ultra3 = {
    PARENT: "genericTank",
    LABEL: "Ultra-3",
    DANGER: 6,
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
     FOV: 2      
    },
    TURRETS: [
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "ultraTurret",
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: "ultraTurret",
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: "ultraTurret",
        },
    ],
}
Class.sideRpgTur = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [ {
         POSITION: [ 25, 6, 1, 0, 0, -112.5, 0, ],
         }, {
         POSITION: [ 25, 6, 1, 0, 0, 112.5, 0, ],
         }, {
         POSITION: [ 36, 9, 1, -19, -25, 0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.rpg_launch]),
            TYPE: "rpgRocket"
         }, }, {
         POSITION: [ 36, 9, 1, -19, 25, -0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.rpg_launch]),
            TYPE: "rpgRocket"
         }, }, {
          POSITION: [ 36, 5, 1, -19, -25, 0.5, 0, ],
         }, {
         POSITION: [ 36, 5, 1, -19, 25, -0.5, 0, ],
         }, {
         POSITION: [ 7, 10, 2, 19, -25, 179.5, 0, ],
         }, {
         POSITION: [ 7, 10, 2, 19, 25, -179.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -1, -25, -0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -1, 25, 0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -11, -25, 0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, -11, 25, -0.5, 0, ],
         }, {
         POSITION: [ 0, 4, 1, 9, -25, 0, 0, ],
         }, {
         POSITION: [ 0, 4, 1, 9, 25, 0, 0, ],
         }, {
         POSITION: [ 0, 15, 1, -23, -25, 0, 0, ],
         }, {
         POSITION: [ 0, 15, 1, -23, 25, 0, 0, ],
         }, {
         POSITION: [ 0, 5, 1, -17, 0, -67.5, 0, ],
         }, {
         POSITION: [ 0, 5, 1, -17, 0, 67.5, 0, ],
         }, 
     ],
};
Class.taureonMissileTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [ {
         POSITION: [ 25, 17, 0.4, 3, 0, 0, 0, ],
         }, {
         POSITION: [ 20, 19, 0.85, 3, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator, {range: 3}]),
            TYPE: "taureonMissile"
         }, }, {
         POSITION: [ 16, 6, 1, 0, 6.5, -3, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 6, 1, 0, -6.5, 3, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 4, 0.7, 7, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 4, 0.7, 3, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 4, 0.7, -1, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 4, 0.7, -1, 6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 16, 4, 0.7, -1, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, -75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, 75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, -120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, 120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, 160, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 4, 1, 9, 0, -160, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator,g.fake]),
            TYPE: "bullet"
         }, }, 
     ],
}
Class.auraBulletTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
TYPE: "trplnrBossAuraBulletAura"
            },
        },{
            POSITION: [17, 5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            COLOR: "white",
          },
        },
    ],
}
Class.auraSwarmBulletTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
              MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.basic]),
TYPE: "trplnrBossAuraBullet",
           DESTROY_OLDEST_CHILD: true,
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },{
            POSITION: [17, 5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            COLOR: "white",
          },
        },
    ],
}
Class.healerturret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0]
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ]
}
Class.autoTankGun = {
    PARENT: "genericTank",
    LABEL: "",
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.auto4gung = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    GUNS: [
		{
            POSITION: [15, 7, -2.2, 0, 0, 0, 0],
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.5}]
            },
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.5}]
            },
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.5}]
            },
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
        },
		{
            POSITION: [3, 12, 1.0, 18, 0, 0, 0],
        },
		{
            POSITION: [1, 12, 1.0, 18, 0, 0, 0],
            COLOR: "#e7896d"
        },
    ],
};
Class.bansheegun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    INDEPENDENT: true,
    GUNS: [
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.autoTurret, { reload: 1.5 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.auto4gun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [16, 4, 1, 0, -3.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.power, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.bigauto4gun = {
    PARENT: "auto4gun",
    GUNS: [
        {
            POSITION: [14, 5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 5, 1, 0, 4.5, 0, 0.33],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 5, 1, 0, 0, 0, 0.67],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.autoTurret, g.pelleter, g.twin, g.twin, g.power, { reload: 2 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.pentaAnnihilatorTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    CONTROLLERS: [["spin", {speed: 0.04}, {INDEPENDENT: true}]],
    INDEPENDENT: true,
    BODY: {
        FOV: 0.8,
    },
    TURRETS: [
        {
            POSITION: [32, 70, 0, 0, 360, 0],
                TYPE: ["annihilatorTurret", {INDEPENDENT: true}]
        },{
            POSITION: [32, 70, 0, 72, 360, 0],
                TYPE: ["annihilatorTurret", {INDEPENDENT: true}]
        },{
            POSITION: [32, 70, 0, -72, 360, 0],
                TYPE: ["annihilatorTurret", {INDEPENDENT: true}]
        },{
            POSITION: [32, 70, 0, 144, 360, 0],
                TYPE: ["annihilatorTurret", {INDEPENDENT: true}]
        },{
            POSITION: [32, 70, 0, -144, 360, 0],
                TYPE: ["annihilatorTurret", {INDEPENDENT: true}]
        },
    ],
}
Class.annihilatorTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
  CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster", ],
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator, g.norecoil]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.gunnerTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
  CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster", ],
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ],
}
Class.megaAutoTankgun = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 2,
    },
    GUNS: [
        {
            POSITION: [22, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.autoTurret]),
                TYPE: "bullet",
            },
        },
    ],
}

// Mounted Turrets
Class.autoTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.pentasmasherturret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: [["spin", {speed: 0.04}, {INDEPENDENT: true}]],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
        TURRETS: [
        {
            POSITION: [18, 28, 0, 0, 72, 0],
                TYPE: "smasher",
                VULNERABLE: true
        },
       {
            POSITION: [18, 28, 0, 0, 144, 0],
                TYPE: "smasher",
                VULNERABLE: true
        },{
            POSITION: [18, 28, 0, 0, 216, 0],
                TYPE: "smasher",
                VULNERABLE: true
        },{
            POSITION: [18, 28, 0, 0, 288, 0],
                TYPE: "smasher",
                VULNERABLE: true
        },{
            POSITION: [18, 28, 0, 0, 360, 0],
                TYPE: "smasher",
                VULNERABLE: true
        },
    ]
}
Class.titanAnnihilatorSidewinderTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    ALPHA: 1,
    BODY: {
        FOV: 0.8,
    },
CONTROLLERS: [["spin", {speed: 0.04}, {INDEPENDENT: true}, "alwaysFire"]],
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
                TYPE: "snake",
AUTOFIRE: true,
            },
        },{
            POSITION: [22, 10, 1, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
                TYPE: "snake",
AUTOFIRE: true,
            },
        },{
            POSITION: [22, 10, 1, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
                TYPE: "snake",
                AUTOFIRE: true,
            },
        },
    ],
}
Class.droneAutoTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    COLOR: "grey",
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'],
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.overdrive]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.autoSmasherTurret = {
    PARENT: "autoTurret",
    GUNS: [
        {
            POSITION: [20, 6, 1, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
        {
            POSITION: [20, 6, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { speed: 1.2 }, g.machineGun, g.pounder, { reload: 0.75 }, { reload: 0.75 }]),
                TYPE: "bullet",
                STAT_CALCULATOR: gunCalcNames.fixedReload,
            },
        },
    ],
}
Class.architectGun = {
    PARENT: "autoTurret",
    LABEL: "",
    GUNS: [
        {
            POSITION: [20, 16, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 16, 1.1, 20, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.autoTurret]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    ],
}
Class.pillboxTurret = {
    PARENT: "autoTurret",
    LABEL: "",
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [22, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minionGun, g.turret, g.power, g.autoTurret, { density: 0.1 }]),
                TYPE: "bullet",
            },
        },
    ],
}

// Pillbox
Class.pillbox = {
    PARENT: "setTrap",
    LABEL: "Pillbox",
    CONTROLLERS: ["nearestDifferentMaster"],
    INDEPENDENT: true,
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "pillboxTurret",
        },
    ],
}
Class.unsetPillbox = {
    PARENT: "unsetTrap",
    LABEL: "Pillbox",
    CONTROLLERS: ["nearestDifferentMaster"],
    INDEPENDENT: true,
    DIE_AT_RANGE: true,
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: "pillboxTurret",
        },
    ],
}

// Swarms
Class.swarm = {
    LABEL: "Swarm Drone",
    TYPE: "swarm",
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: "swarm",
    FACING_TYPE: "smoothWithMotion",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.175,
        DAMAGE: 2.25,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.6,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
}
Class.autoswarm = {
    PARENT: "swarm",
    AI: {
        FARMER: true
    },
    INDEPENDENT: true
}
Class.bee = {
    PARENT: "swarm",
    PERSISTS_AFTER_DEATH: true,
    SHAPE: 4,
    LABEL: "Drone",
    HITS_OWN_TYPE: "hardWithBuffer"
}
Class.homingBullet = {
    PARENT: "autoswarm",
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.165,
        DAMAGE: 6,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true
}
// Decorations
Class.overdriveDeco = makeDeco(4)
Class.assemblerEffect = {
    PARENT: "bullet",
    MOTION_TYPE: 'assembler',
    LABEL: '',
    BODY: {
        DAMAGE: 0,
        RANGE: 10
    },
    ALPHA: 0.8
}
Class.assemblerDot = {
    LABEL: '',
    SHAPE: -4,
    COLOR: "darkGrey",
    INDEPENDENT: true
}

// Bodies
Class.smasherBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true }]],
    COLOR: "black",
    SHAPE: 6,
    INDEPENDENT: true
}
Class.landmineBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.08 }]],
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true
}
Class.spikeBody = {
    PARENT: "smasherBody",
    SHAPE: 3
}

// Basic & starting upgrades
Class.basic = {
    PARENT: "genericTank",
    LABEL: "Basic",
    DANGER: 4,
    /*BODY: {
        ACCELERATION: base.ACCEL * 1,
        SPEED: base.SPEED * 1,
        HEALTH: base.HEALTH * 1,
        DAMAGE: base.DAMAGE * 1,
        PENETRATION: base.PENETRATION * 1,
        SHIELD: base.SHIELD * 1,
        REGEN: base.REGEN * 1,
        FOV: base.FOV * 1,
        DENSITY: base.DENSITY * 1,
        PUSHABILITY: 1,
        HETERO: 3
    },*/
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
                /*COLOR: "grey",
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false*/
            }
        }
    ]
}
Class.gigawhip = {
    PARENT: "genericTank",
    LABEL: "Giga Whip",
    DANGER: 4,
    TURRETS: [
        {
            POSITION: [18, 28, 0, 0, 0, 0],
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "smasher",
                VULNERABLE: true
        }
    ]
}
Class.kronosgenerator = {
    PARENT: "genericTank",
    LABEL: "Kronos Generator",
    DANGER: 4,
    GUNS: [
      {
            POSITION: [20, 6, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [18, 8, 2, 0, 0, 0, 0],
              TYPE: "kronos",
              VULNERABLE: true,
        },
    ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["kronos", {
            INDEPENDENT: true
        }],
    }],
}
Class.odingenerator = {
    PARENT: "genericTank",
    LABEL: "Ragnarok Generator",
    DANGER: 4,
    GUNS: [
      {
            POSITION: [20, 6, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [18, 8, 2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
              TYPE: "odin",
            },
        },
    ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["odin", {
            INDEPENDENT: true
        }],
    }],
}
Class.gasman = {
    PARENT: "genericTank",
    LABEL: "Gasman",
    DANGER: 4,
    GUNS: [
        {
            POSITION: [18, 8, 2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.bigger, g.bigger]),
                TYPE: "gas",
            }
        }, {
            POSITION: [15, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "green",
            }
        }
    ]
}
Class.soda = {
    PARENT: "genericTank",
    LABEL: "Soda",
    DANGER: 4,
    GUNS: [
        {
            POSITION: [18, 8, 2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.bigger, g.bigger]),
                TYPE: "gas",
            }
        },{
            POSITION: [18, 8, 2, 0, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.bigger, g.bigger]),
                TYPE: "gas",
            }
        },{
            POSITION: [18, 8, 2, 0, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.bigger, g.bigger]),
                TYPE: "gas",
            }
        },{
            POSITION: [15, 6, 1, 0, 0, 0, 0],
            PROPERTIES: {
                COLOR: "green",
            }
        },{
            POSITION: [15, 6, 1, 0, 0, 120, 0],
            PROPERTIES: {
                COLOR: "green",
            }
        },{
            POSITION: [15, 6, 1, 0, 0, 240, 0],
            PROPERTIES: {
                COLOR: "green",
            }
        },
    ]
}
Class.cursedBasic = {
PARENT: "genericTank",
LABEL: "Cursed Basic",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [0,8,1,9.692,0,0,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,330,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,300,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,270,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,240,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,210,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,180,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,150,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,120,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,90,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,60,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [0,8,1,9.692,0,30,NaN],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[0, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 0, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
], };

Class.twin = {
    PARENT: "genericTank",
    LABEL: "Twin",
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.EmpBullet = {
    PARENT: 'bullet',
    ON: [
        {
            event: "collide",
            handler: ({ instance, other }) => {
                if (other.team != instance.master.master.master.team && other.master == other && other.type != 'wall') {
                    disableWeapons(other,3,2) // weapons no more
                    forcedPacify(other,3,2)
                }
            }
        },
     ],
}
Class.empSniper = {
    PARENT: "genericTank",
    LABEL: "EMP",
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "EmpBullet",
            }
        }
    ]
}
Class.sniper = {
    PARENT: "genericTank",
    LABEL: "Sniper",
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.splitbullet1 = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["bullet", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.splitbullet2 = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet1", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet1", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["bullet", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.splitbullet3 = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet2", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet2", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["bullet", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.splitbullet4 = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet3", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet3", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["bullet", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.Hypersplitbullet5 = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet4", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitbullet4", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["bullet", {
            INDEPENDENT: true,
            COLOR: "#ff0000"
        }]
    }]
};
Class.ultrafrag = {
   PARENT: "genericTank",
   LABEL: 'Ultrafrag',
   BODY: {
      FOV: base.FOV * 1.2,
   },
   MAX_CHILDREN: 2,
   GUNS: [ {
         POSITION: [ 24, 8.5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.sniper,g.halfrange]),
            TYPE: "Hypersplitbullet5"
         }, }, {
         POSITION: [ 20, 8.5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12,
         }, }, {
         POSITION: [ 18, 6.5, 1, 1, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12,
         }, }, {
         POSITION: [ 17, 4.5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12,
         }, }, {
         POSITION: [ 15, 1.5, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12,
         }, }, 
     ],
};
Class.HyperFragtwin = {
    PARENT: "genericTank",
    LABEL: "HyperFrag Twin",
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin,g.halfrange]),
                TYPE: "splitbullet2"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin,g.halfrange]),
                TYPE: "splitbullet2"
            }
        },
         { 
           POSITION: [ 16, 6, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 16, 6, 1, 0, -5.5, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
            POSITION: [ 14, 4, 1, 0, 5.5, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 14, 4, 1, 0, -5.5, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
            }
        }
    ]
}
Class.splitTrap1 = {
   PARENT: "trap",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["trap", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["trap", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["trap", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.splitTrap2 = {
   PARENT: "trap",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitTrap1", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.bigger]),
            TYPE: ["splitTrap1", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, 
     ],
  TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["trap", {
            INDEPENDENT: true,
            COLOR: 12
        }]
    }]
};
Class.HyperFragtrapper = {
    PARENT: "genericTank",
    LABEL: "HyperFrag Trapper",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0]
        },
        {
         POSITION: [ 14, 6, 1, 0, 0, 0, 0, ],
         COLOR: 12
         },{
         POSITION: [ 14, 4, 1, 0, 0, 0, 0, ],
         COLOR: 12
           },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "splitTrap2",
                STAT_CALCULATOR: gunCalcNames.trap                 
            }
        }
    ]
}
Class.HFragspray = {
    PARENT: "genericTank",
    LABEL: "HyperFrag Sprayer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "splitbullet2"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "splitbullet2"
            }
        },
        {  
           POSITION: [ 16, 7, 1.6, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 14, 5, 1.6, 0, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
            }
        }
    ]
}
Class.machineGun = {
    PARENT: "genericTank",
    LABEL: "Machine Gun",
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.flankGuard = makeMulti({
    PARENT: "genericTank",
    BODY: {
        SPEED: 1.1 * base.SPEED
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Flank Guard")
Class.director = {
    PARENT: "genericTank",
    LABEL: "Director",
    STAT_NAMES: statnames.drone,
    BODY: {
        FOV: base.FOV * 1.1
    },
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 6
            }
        }
    ]
}
Class.pounder = {
    PARENT: "genericTank",
    LABEL: "Pounder",
    GUNS: [
        {
            POSITION: [20.5, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.trapper = {
    PARENT: "genericTank",
    LABEL: "Trapper",
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}
Class.desmos = {
    PARENT: "genericTank",
    LABEL: "Desmos",
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 10, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, 90, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, -90, 0]
        }
    ]
}
        Class.undertowBullet = {
            PARENT: ['bullet'],
            ON: [
            {
             event: "tick",
             handler: ({ body }) => {
               for (let instance of entities) {
                     let diffX = instance.x - body.x,
                         diffY = instance.y - body.y,
                         dist2 = diffX ** 2 + diffY ** 2;
                     if (dist2 <= ((body.size / 12)*250) ** 1.9) {
                     if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "undertowEffect") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                        forceMulti = (6 / instance.size)
                     }      
                     else {
                        forceMulti = (2 / instance.size)
                     }           
                        instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * forceMulti;//0.05
                        instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * forceMulti;//0.05
                        if (instance.type != "undertowEffect" && instance.type != "bullet" && instance.type != "swarm" && instance.type != "drone" && instance.type != "trap") {
                                let o = new Entity({x: instance.x, y: instance.y})
                                o.define('undertowEffect')
                                o.team = body.team;
                                o.color = instance.color;
                                o.alpha = 0.3;
                                o.master = body.master;
                        }
                 }
             }
                  if (dist2 < body.size ** 3 + instance.size ** 3) {
                     if (instance.master.id == body.master.id) {
                         if (instance.type == "undertowEffect")
                         {
                            instance.kill();
                         }
                        }
                    }
                }
            }
        }
          ],
        }
         Class.undertow = {
            PARENT: "genericTank",
            LABEL: "Undertow",
            DANGER: 6,
            GUNS: [
                {
                    POSITION: [14, 12, 0.8, 0, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { size: 0.8, reload: 1.2 }]),
                        TYPE: 'undertowBullet'
                    }
                },
                {
                    POSITION: [11.25, 8, 0.15, 4.25, 4, 13.5, 0]
                },
                {
                    POSITION: [11.25, 8, 0.15, 4.25, -4, -13.5, 0]
                }
            ]
        }
Class.magneticCheeseDrone = {
            PARENT: ['drone'],
            ON: [
            {
             event: "tick",
             handler: ({ body }) => {
               for (let instance of entities) {
                     let diffX = instance.x - body.x,
                         diffY = instance.y - body.y,
                         dist2 = diffX ** 2 + diffY ** 2;
                     if (dist2 <= ((body.size / 12)*250) ** 1.9) {
                     if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "undertowEffect") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                        forceMulti = (6 / instance.size)
                     }      
                     else {
                        forceMulti = (2 / instance.size)
                     }           
                        instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * forceMulti;//0.05
                        instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * forceMulti;//0.05
                        if (instance.type != "undertowEffect" && instance.type != "bullet" && instance.type != "swarm" && instance.type != "drone" && instance.type != "trap") {
                                let o = new Entity({x: instance.x, y: instance.y})
                                o.define('undertowEffect')
                                o.team = body.team;
                                o.color = instance.color;
                                o.alpha = 0.3;
                                o.master = body.master;
                        }
                 }
             }
                  if (dist2 < body.size ** 3 + instance.size ** 3) {
                     if (instance.master.id == body.master.id) {
                         if (instance.type == "undertowEffect")
                         {
                            instance.kill();
                         }
                        }
                    }
                }
            }
        }
          ],
        }
Class.magneticCheese = {
    PARENT: "genericTank",
    LABEL: "Magnetic Cheese",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [16, 16, 1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.bigCheese]),
                TYPE: "magneticCheeseDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 1,
          }, }, {
         POSITION: [ 22, 10, 0.15, 0, -5, -22.5, 0, ],
         }, {
         POSITION: [ 22, 10, 0.15, 0, 5, 22.5, 0, ],
          }, 
     ],
};
Class.smasher = {
    PARENT: "genericSmasher",
    LABEL: "Smasher",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}
Class.magnetTurretProp = {
    COLOR: "#ff0000",
    SHAPE: "M -0.5 0 C -0.5 -0.5 0.25 -0.5 1 -0.5 L 1 -1 C 0 -1 -1 -1 -1 0 C -1 1 0 1 1 1 L 1 0.5 C 0 0.5 -0.5 0.5 -0.5 0 Z"
};
Class.magnetTurret = {
    COLOR: "#000cf2",
    SHAPE: "M -0.5 0 C -0.5 -0.5 0.25 -0.5 1 -0.5 L 1 -1 C 0 -1 -1 -1 -1 0 Z",
    TURRETS: [{
        POSITION: [20, 0, 0, 0, 0, 0],
        TYPE: ["magnetTurretProp",{MIRROR_MASTER_ANGLE: true}]
    }],
};
Class.Magneticsmasher = {
    PARENT: "genericSmasher",
    LABEL: "Magnetic Smasher",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
           },{
            POSITION: [10, 0, 0, 0, 0, 1],
            TYPE: "magnetTurret"
        }],
        ON: [
            {
             event: "tick",
             handler: ({ body }) => {
               for (let instance of entities) {
                     let diffX = instance.x - body.x,
                         diffY = instance.y - body.y,
                         dist2 = diffX ** 2 + diffY ** 2;
                     if (dist2 <= ((body.size / 12)*250) ** 1.9) {
                     if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "undertowEffect") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                        forceMulti = (6 / instance.size)
                     }      
                     else {
                        forceMulti = (2 / instance.size)
                     }           
                        instance.velocity.x += util.clamp(body.x - instance.x, -90, 90) * instance.damp * forceMulti;//0.05
                        instance.velocity.y += util.clamp(body.y - instance.y, -90, 90) * instance.damp * forceMulti;//0.05
                        if (instance.type != "undertowEffect" && instance.type != "bullet" && instance.type != "swarm" && instance.type != "drone" && instance.type != "trap") {
                                let o = new Entity({x: instance.x, y: instance.y})
                                o.define('undertowEffect')
                                o.team = body.team;
                                o.color = instance.color;
                                o.alpha = 0.3;
                                o.master = body.master;
                        }
                 }
             }
                  if (dist2 < body.size ** 3 + instance.size ** 3) {
                     if (instance.master.id == body.master.id) {
                         if (instance.type == "undertowEffect")
                         {
                            instance.kill();
                         }
                        }
                    }
                }
            }
        }
          ],
        }
Class.healer = {
    PARENT: "genericTank",
    LABEL: "Healer",
    STAT_NAMES: statnames.heal,
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0]
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet"
            }
        }
    ]
}

// Twin upgrades
Class.doubleTwin = makeMulti({
    PARENT: "genericTank",
    LABEL: "Twin",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ]
}, 2)
Class.tripleShot = {
    PARENT: "genericTank",
    LABEL: "Triple Shot",
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9
    },
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ]
}

// Double Twin upgrades
Class.tripleTwin = makeMulti({
    PARENT: "genericTank",
    LABEL: "Twin",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ]
}, 3)
Class.hewnDouble = {
    PARENT: "genericTank",
    LABEL: "Hewn Double",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 5.5, 205, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -5.5, -205, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.doubleTwin, g.hewnDouble]),
                TYPE: "bullet"
            }
        }
    ]
}

// Triple Shot upgrades
Class.pentaShot = {
    PARENT: "genericTank",
    LABEL: "Penta Shot",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED
    },
    GUNS: [
        {
            POSITION: [16, 8, 1, 0, -3, -30, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8, 1, 0, 3, 30, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, -2, -15, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 15, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.spreadshot = {
    PARENT: "genericTank",
    LABEL: "Spreadshot",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 4, 1, 0, -0.5, -75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [13, 4, 1, 0, 0.5, 75, 5 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [14.5, 4, 1, 0, -0.5, -60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [14.5, 4, 1, 0, 0.5, 60, 4 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [16, 4, 1, 0, -0.5, -45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [16, 4, 1, 0, 0.5, 45, 3 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [17.5, 4, 1, 0, -0.5, -30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [17.5, 4, 1, 0, 0.5, 30, 2 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [19, 4, 1, 0, -1, -15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [19, 4, 1, 0, 1, 15, 1 / 6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin, g.spreadshot]),
                TYPE: "bullet",
                LABEL: "Spread"
            }
        },
        {
            POSITION: [12, 8, 1, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.spreadshotMain, g.spreadshot]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.bentDouble = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, -2, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 2, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [22, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.doubleTwin]),
                TYPE: "bullet"
            }
        }
    ]
}, 2, "Bent Double")
Class.triplet = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Triplet",
    BODY: {
        FOV: 1.05 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 10, 1, 0, 5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 10, 1, 0, -5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triplet]),
                TYPE: "bullet"
            }
        }
    ]
}

// Sniper upgrades
Class.assassin = {
    PARENT: "genericTank",
    DANGER: 6,
    LABEL: "Assassin",
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: [27, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0]
        }
    ]
}
Class.hunter = {
    PARENT: "genericTank",
    LABEL: "Hunter",
    DANGER: 6,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.rifle = {
    PARENT: "genericTank",
    LABEL: "Rifle",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: [20, 12, 1, 0, 0, 0, 0]
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                TYPE: "bullet"
            }
        }
    ]
}

// Assassin upgrades
Class.ranger = {
    PARENT: "genericTank",
    LABEL: "Ranger",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.5 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [32, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0],
        },
    ],
}
Class.stalker = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Stalker",
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.35 * base.FOV
    },
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    GUNS: [
        {
            POSITION: [27, 8, -1.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.single = {
    PARENT: "genericTank",
    LABEL: "Single",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
        }
    ]
}

// Hunter upgrades
Class.predator = {
    PARENT: "genericTank",
    LABEL: "Predator",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.predator]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.15],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.predator]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 16, 1, 0, 0, 0, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.xHunter = {
    PARENT: "genericTank",
    LABEL: "X-Hunter",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25
    },
    CONTROLLERS: [["zoom", { distance: 550 }]],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [21, 12, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5, 12, -1.2, 7, 0, 0, 0]
        }
    ]
}
Class.dual = {
    PARENT: "genericTank",
    LABEL: "Dual",
    DANGER: 7,
    BODY: {
        FOV: 1.1 * base.FOV
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [18, 7, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowPower]),
                TYPE: "bullet",
                LABEL: "Small"
            }
        },
        {
            POSITION: [18, 7, 1, 0, -5.5, 0, .5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowPower]),
                TYPE: "bullet",
                LABEL: "Small"
            }
        },
        {
            POSITION: [16, 8.5, 1, 0, 5.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 8.5, 1, 0, -5.5, 0, .75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                TYPE: "bullet"
            }
        }
    ]
}

// Rifle upgrades
Class.musket = {
    PARENT: "genericTank",
    LABEL: "Musket",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: [16, 19, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [18, 7, 1, 0, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 7, 1, 0, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.crossbow = {
    PARENT: "genericTank",
    LABEL: "Crossbow",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.225
    },
    GUNS: [
        {
            POSITION: [12.5, 2.5, 1, 0, 3.5, 35, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12.5, 2.5, 1, 0, -3.5, -35, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 2.5, 1, 0, 3.5, 35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 2.5, 1, 0, -3.5, -35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { speed: 0.7, maxSpeed: 0.7 }, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 3.5, 1, 0, 4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { speed: 0.7, maxSpeed: 0.7 }, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 3.5, 1, 0, -4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { speed: 0.7, maxSpeed: 0.7 }, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.crossbow, { speed: 0.7, maxSpeed: 0.7 }, { recoil: 0.5 }]),
                TYPE: "bullet"
            }
        }
    ]
}

// Machine Gun upgrades
Class.minigun = {
    PARENT: "genericTank",
    LABEL: "Minigun",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.gunner = {
    PARENT: "genericTank",
    LABEL: "Gunner",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.sprayer = {
    PARENT: "genericTank",
    LABEL: "Sprayer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}

// Minigun upgrades
Class.streamliner = {
    PARENT: "genericTank",
    LABEL: "Streamliner",
    DANGER: 7,
    BODY: {
        FOV: 1.3,
    },
    GUNS: [
        {
            POSITION: [25, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 8, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 8, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 8, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 8, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.streamliner]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.periodicFire = {
    PARENT: ["genericTank"],
    LABEL: "Periodic Fire",
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
		{
            POSITION: [15, 7, -2.2, 0, 0, 0, 0],
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.8}],
				        ALPHA: 0,
            },
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.8}],
				ALPHA: 0,
            },
        },
		{
            POSITION: [6, 12, 1.0, 15, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.pewpewpew___pewpewpew]),
                TYPE: ["bullet",{ALPHA:0.8}],
				ALPHA: 0,
            },
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
        },
		{
            POSITION: [3, 12, 1.0, 18, 0, 0, 0],
        },
		{
            POSITION: [1, 12, 1.0, 18, 0, 0, 0],
            PROPERTIES: {
            COLOR: "#e7896d"
            }
        },
    ],
};
Class.auraShrinkBulletTurret = {
    PARENT: "genericTank",
    LABEL: "Turret",
    CONTROLLERS: ["canRepel", "onlyAcceptInArc", "mapAltToFire", "nearestDifferentMaster"],
    COLOR: "grey",
    BODY: {
        FOV: 0.8,
    },
    GUNS: [
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret]),
TYPE: "auraShrinkBullet"
            },
        },{
            POSITION: [17, 5, 1, 0, 0, 0, 0],
          PROPERTIES: {
            COLOR: "white",
          },
        },
    ],
}
Class.barricade = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Barricade",
    STAT_NAMES: statnames.trap,
    BODY: {
        FOV: 1.15,
    },
    GUNS: [
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.3, 22, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 18, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [4, 8, 1.3, 14, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.minigun, { range: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

// Gunner upgrades
Class.nailgun = {
    PARENT: "genericTank",
    LABEL: "Nailgun",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
        SPEED: base.SPEED * 0.9,
    },
    GUNS: [
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0],
        },
    ],
}
Class.machineGunner = {
    PARENT: "genericTank",
    LABEL: "Machine Gunner",
    DANGER: 7,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    GUNS: [
        {
            POSITION: [14, 3, 4, -3, 5, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, -3, -5, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 0, 2.5, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 0, -2.5, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 3, 4, 3, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.machineGunner]),
                TYPE: "bullet",
            },
        },
    ],
}

// Sprayer upgrades
Class.redistributor = {
    PARENT: "genericTank",
    LABEL: "Redistributor",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [26, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.atomizer = {
    PARENT: "genericTank",
    LABEL: "Atomizer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [5, 7.5, 1.3, 18.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.atomizer]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.focal = {
    PARENT: "genericTank",
    LABEL: "Focal",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "bullet",
            },
        },
    ],
}

// Flank Guard upgrades
Class.hexaTank = makeMulti({
    PARENT: "genericTank",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Hexa Tank")
Class.triAngle = {
    PARENT: "genericTank",
    LABEL: "Tri-Angle",
    BODY: {
        HEALTH: 0.8 * base.HEALTH,
        SHIELD: 0.8 * base.SHIELD,
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
Class.auto3 = {
    PARENT: "genericTank",
    LABEL: "Auto-3",
    DANGER: 6,
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 120, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 240, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
}

// Hexa Tank upgrades
Class.octoTank = makeMulti({
    PARENT: "genericTank",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.spam]),
                TYPE: "bullet"
            }
        }
    ]
}, 4, "Octo Tank")
Class.cyclone = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [15, 3.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 60, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [15, 3.5, 1, 0, 0, 90, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, g.cyclone]),
                TYPE: "bullet"
            }
        }
    ]
}, 3, "Cyclone")

// Tri-Angle upgrades
Class.fighter = {
    PARENT: "genericTank",
    LABEL: "Fighter",
    BODY: {
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Side",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Side",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}
Class.booster = {
    PARENT: "genericTank",
    LABEL: "Booster",
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }]),
                TYPE: "bullet",
                LABEL: "Front"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [14, 8, 1, 0, 1, -140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [16, 8, 1, 0, 0, -150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        }
    ]
}
Class.rilaper = {
    PARENT: "genericTank",
    LABEL: "Rilaper",
    BODY: {
        HEALTH: base.HEALTH * 0.4,
        SHIELD: base.SHIELD * 0.4,
        DENSITY: base.DENSITY * 0.3
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [21, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [19, 4, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
      {
            POSITION: [17, 4, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [17, 4, 1, 0, 6, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },{
            POSITION: [15, 4, 1, 0, 6, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [13, 4, 1, 0, 6, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },{
            POSITION: [17, 4, 1, 0, -6, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },{
            POSITION: [15, 4, 1, 0, -6, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [13, 4, 1, 0, -6, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, {recoil: 0.2}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [14, 8, 1, 0, -1, 140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [14, 8, 1, 0, 1, -140, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        },
        {
            POSITION: [16, 8, 1, 0, 0, -150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster
            }
        }
    ]
}
Class.surfer = {
    PARENT: "genericTank",
    LABEL: "Surfer",
    BODY: {
        DENSITY: 0.6 * base.DENSITY,
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
}

// Auto-3 upgrades
Class.auto5 = {
    PARENT: "genericTank",
    LABEL: "Auto-5",
    DANGER: 7,
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        {
            POSITION: [11, 8, 0, 0, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 72, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 144, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 216, 190, 0],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [11, 8, 0, 288, 190, 0],
            TYPE: "autoTankGun",
        },
    ],
}
Class.mega3 = {
    PARENT: "genericTank",
    LABEL: "Mega-3",
    BODY: {
        SPEED: 0.95 * base.SPEED,
    },
    DANGER: 7,
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        {
            POSITION: [14, 8, 0, 0, 190, 0],
            TYPE: "megaAutoTankgun",
        },
        {
            POSITION: [14, 8, 0, 120, 190, 0],
            TYPE: "megaAutoTankgun",
        },
        {
            POSITION: [14, 8, 0, 240, 190, 0],
            TYPE: "megaAutoTankgun",
        },
    ],
}
Class.auto4 = {
    PARENT: "genericTank",
    LABEL: "Auto-4",
    FACING_TYPE: ["spin", {speed: 0.02}],
    DANGER: 7,
    TURRETS: [
        {
            POSITION: [13, 6, 0, 45, 160, 0],
            TYPE: "auto4gun",
        },
        {
            POSITION: [13, 6, 0, 135, 160, 0],
            TYPE: "auto4gun",
        },
        {
            POSITION: [13, 6, 0, 225, 160, 0],
            TYPE: "auto4gun",
        },
        {
            POSITION: [13, 6, 0, 315, 160, 0],
            TYPE: "auto4gun",
        },
    ],
}
Class.turretBase = {
    LABEL: 'Base',
    SYNC_TURRET_SKILLS: true,
    SHAPE: "M -1.006 0.005 C -1.006 -0.552 -0.556 -1.003 0.001 -1.003 C 0.267 -1.003 0.525 -0.896 0.712 -0.706 C 0.902 -0.519 1.009 -0.261 1.009 0.005 C 1.009 0.562 0.558 1.012 0.001 1.012 C -0.556 1.012 -1.006 0.562 -1.006 0.005 Z M -0.965 0.005 C -0.965 0.538 -0.532 0.971 0.001 0.971 C 0.534 0.971 0.966 0.538 0.966 0.005 C 0.966 -0.528 0.534 -0.96 0.001 -0.96 C -0.532 -0.96 -0.965 -0.528 -0.965 0.005 Z",
    COLOR: 9,
    FACING_TYPE: ["spin", {speed: 0.05, INDEPENDENT: true}],
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [4.65, 9.85, 0, 90, 220, 1],
        TYPE: "RPGturret"
    }, {
        POSITION: [4.65, 9.85, 0, 270, 220, 1],
        TYPE: "RPGturret" // 
    }]
};
Class.ring9 = {
    LABEL: 'Base',
    SYNC_TURRET_SKILLS: true,
    SHAPE: "M -1.006 0.005 C -1.006 -0.552 -0.556 -1.003 0.001 -1.003 C 0.267 -1.003 0.525 -0.896 0.712 -0.706 C 0.902 -0.519 1.009 -0.261 1.009 0.005 C 1.009 0.562 0.558 1.012 0.001 1.012 C -0.556 1.012 -1.006 0.562 -1.006 0.005 Z M -0.965 0.005 C -0.965 0.538 -0.532 0.971 0.001 0.971 C 0.534 0.971 0.966 0.538 0.966 0.005 C 0.966 -0.528 0.534 -0.96 0.001 -0.96 C -0.532 -0.96 -0.965 -0.528 -0.965 0.005 Z",
    COLOR: 9,
    FACING_TYPE: 'spin',
    INDEPENDENT: true,
    TURRETS: [{
        POSITION: [2.325, 9.85, 0, 30, 220, 1],
        TYPE: "RPGturret"
    }, {
        POSITION: [2.325, 9.85, 0, 90, 220, 1],
        TYPE: "taureonMissileTurret"
    }, {
        POSITION: [2.325, 9.85, 0, 150, 220, 1],
        TYPE: "healerturret"
    }, {
        POSITION: [2.325, 9.85, 0, 210, 220, 1],
        TYPE: "sideRpgTur"
    }, {
        POSITION: [2.325, 9.85, 0, 270, 220, 1],
        TYPE: "auraBulletTurret"
    }, {
        POSITION: [2.325, 9.85, 0, 330, 220, 1],
        TYPE: "auraSwarmBulletTurret"
    }]
};
Class.ringTurretTest = {
    PARENT: "genericTank",
    LABEL: "Turret Test",
    DANGER: 7,
    FACING_TYPE: ["spin", {speed: 0.05}],
    TURRETS: [
        {
            POSITION: [100, 0, 0, 0, 0, 0],
            TYPE: "ring9"
        },
    ],
}
Class.tutest = {
    PARENT: "genericTank",
    LABEL: "Turret Test",
    DANGER: 7,
    FACING_TYPE: ["spin", {speed: 0.05}],
    TURRETS: [
        {
            POSITION: [100, 0, 0, 0, 0, 0],
            TYPE: "ring9"
        },
    ],
}
Class.banshee = {
    PARENT: "genericTank",
    LABEL: "Banshee",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        {
            POSITION: [10, 8, 0, 0, 80, 0],
            TYPE: "bansheegun",
        },
        {
            POSITION: [10, 8, 0, 120, 80, 0],
            TYPE: "bansheegun",
        },
        {
            POSITION: [10, 8, 0, 240, 80, 0],
            TYPE: "bansheegun",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 11, 1.2, 8, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
        {
            POSITION: [6, 11, 1.2, 8, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 2,
            },
        },
    ],
}

// Director upgrades
Class.overseer = makeMulti({
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true
            }
        }
    ]
}, 2, "Overseer", 90)
Class.cruiser = {
    PARENT: "genericTank",
    LABEL: "Cruiser",
    DANGER: 6,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
Class.underseer = makeMulti({
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            }
        }
    ]
}, 2, "Underseer", 90)
Class.spawner = {
    PARENT: "genericTank",
    LABEL: "Spawner",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 1, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 0, 0],
        },
    ],
}
Class.desmosspawner = {
    PARENT: "genericTank",
    LABEL: "Desmos Spawner",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    GUNS: [
        {
            POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [1, 12, 0.6, 15, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 4,
                SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                TYPE: "desmosminion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [11.5, 12, 1, 0, 0, 0, 0],
        },
    ],
}
Class.manager = {
    PARENT: "genericTank",
    LABEL: "Manager",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    INVISIBLE: [0.08, 0.03],
    TOOLTIP: "Stay still to turn invisible.",
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { reload: 0.5 }]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
}
Class.bigCheese = {
    PARENT: "genericTank",
    LABEL: "Big Cheese",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [16, 16, 1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.bigCheese]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 1,
            },
        },
    ],
}

Class.caseohDrone = {
    PARENT: "drone",
    LABEL: "Quarter of caseoh's daily meal",
    GUNS: (() => {
        let e = [{
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic,g.fake]),//idk how to remove it without imploding the code
                ALPHA: 0, 
                TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }];
        for (let T = 0; T < 10; T++) e.push({
            POSITION: [0, 10, 1.4, 0, 0, (360 / 10) * T, 1 / 0],
            ALPHA: 0,
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.bigCheese,{size: 0.5}]),
                TYPE: ["drone", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
            }
        });
        return e
    })()
};
Class.bigCheez = {
   PARENT: "genericTank",
   LABEL: 'Big Cheez',
   STAT_NAMES: statnames.drone,
    DANGER: 150000,
    BODY: {
        FOV: base.FOV * 1.5,
    },
   GUNS: [ {
         POSITION: [ 51, 121, 1.4, 0, 0, 0, 0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.bigCheese,{damage: 5, health: 25, reload: 10}]),
                TYPE: "caseohDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                MAX_CHILDREN: 1,
         }, }, {
         POSITION: [ 5.5, 86, 1.4, -7, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 59, 1.4, -14, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 41, 1.4, -21, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 29, 1.4, -28, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 19, 1.4, -35, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 13, 1.4, -42, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 9, 1.4, -49, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 6, 1.4, -56, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 4, 1.4, -63, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 3, 1.4, -69, 0, 0, 0, ],
         }, {
         POSITION: [ 5.5, 2, 1.4, -76, 0, 0, 0, ],
         }, {
         POSITION: [ 4.5, 1.2, 1.4, -82, 0, 0, 0, ],
         }, {
         POSITION: [ 4.5, 1.15, 0, -88, 0, 0, 0, ],
         }, 
     ],
};
// Overseer upgrades
Class.overlord = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    MAX_CHILDREN: 8,
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true
            }
        }
    ]
}, 4, "Overlord", 90)
Class.overdrive = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.9 * base.SPEED,
        FOV: 1.1 * base.FOV,
    },
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "overdriveDeco",
        },
    ],
    GUNS: [
        {
            POSITION: [6, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.overseer]),
                TYPE: "turretedDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                MAX_CHILDREN: 4
            }
        }
    ]
}, 2, "Overdrive", 90)
Class.commander = makeMulti({
    PARENT: "genericTank",
    STAT_NAMES: statnames.drone,
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            POSITION: [8, 11, 1.3, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.commander]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 2,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        }
    ]
}, 3, "Commander")

// Cruiser upgrades
Class.carrier = {
    PARENT: "genericTank",
    LABEL: "Carrier",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: "locksFacing",
    BODY: {
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [7, 8, 0.6, 7, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 8, 0.6, 7, 2, 30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 8, 0.6, 7, -2, -30, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship, g.carrier]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
Class.battleship = {
    PARENT: "genericTank",
    LABEL: "Battleship",
    DANGER: 7,
    STAT_NAMES: statnames.swarm,
    FACING_TYPE: "locksFacing",
    BODY: {
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Guided"
            }
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["autoswarm"],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Autonomous"
            }
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: ["autoswarm"],
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Autonomous"
            }
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battleship]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
                LABEL: "Guided"
            }
        }
    ]
}
Class.fortress = {
    PARENT: "genericTank",
    LABEL: "Fortress",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.2 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [
                    "swarm",
                    {
                        CONTROLLERS: ["canRepel"],
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 180, 1 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [
                    "swarm",
                    {
                        CONTROLLERS: ["canRepel"],
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, 0, 300, 2 / 3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: [
                    "swarm",
                    {
                        CONTROLLERS: ["canRepel"],
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { range: 0.5 }, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 120, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { range: 0.5 }, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 9, 1, 0, 0, 240, 0],
        },
        {
            POSITION: [4, 9, 1.5, 14, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { range: 0.5 }, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

// Underseer upgrades
Class.necromancer = {
    PARENT: "genericTank",
    LABEL: "Necromancer",
    DANGER: 7,
    STAT_NAMES: statnames.necro,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 14,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 270, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 180, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                MAX_CHILDREN: 4,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
}
Class.maleficitor = {
    PARENT: "genericTank",
    LABEL: "Maleficitor",
    DANGER: 7,
    TOOLTIP: "Press R and wait to turn your drones invisible.",
    STAT_NAMES: statnames.necro,
    BODY: {
        SPEED: base.SPEED * 0.85,
    },
    SHAPE: 4,
    MAX_CHILDREN: 20,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.maleficitor]),
                TYPE: [
                    "sunchip",
                    {
                        INVISIBLE: [0.06, 0.03],
                    },
                ],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
            },
        },
    ],
}
Class.infestor = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    MAX_CHILDREN: 20,
    GUNS: [
        {
            POSITION: [7.25, 6, 1.2, 6, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "eggchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro
            }
        },
        {
            POSITION: [7.25, 6, 1.2, 6, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "eggchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro
            }
        }
    ]
}, 2, "Infestor", 90)

// Spawner upgrades
Class.factory = {
    PARENT: "genericTank",
    LABEL: "Factory",
    DANGER: 7,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
    },
    MAX_CHILDREN: 6,
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1, 15.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory]),
                TYPE: "minion",
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [12, 14, 1, 0, 0, 0, 0],
        },
    ],
}

// Pounder upgrades
Class.destroyer = {
    PARENT: "genericTank",
    LABEL: "Destroyer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [21, 14, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.artillery = {
    PARENT: "genericTank",
    LABEL: "Artillery",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.launcher = {
    PARENT: "genericTank",
    LABEL: "Launcher",
    DANGER: 6,
    BODY: {
        FOV: base.FOV * 1.1,
    },
    GUNS: [
        {
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.shotgun = {
    PARENT: "genericTank",
    LABEL: "Shotgun",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [4, 3, 1, 11, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [4, 3, 1, 11, 3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [4, 4, 1, 13, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [1, 4, 1, 12, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [1, 4, 1, 11, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [1, 3, 1, 13, -1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [1, 3, 1, 13, 1, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [1, 2, 1, 13, 2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [1, 2, 1, 13, -2, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [15, 14, 1, 6, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]),
                TYPE: "casing",
            },
        },
        {
            POSITION: [8, 14, -1.3, 4, 0, 0, 0],
        },
    ],
}

// Destroyer upgrades
Class.annihilator = {
    PARENT: "genericTank",
    LABEL: "Annihilator",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.startBossAnnihilator = {
    PARENT: "genericTank",
    LABEL: "Titan Annihilator",
    DANGER: 7,
    ON: [
        {
            event: "fire",
            handler: ({ body, gun }) => {
                if (gun.identifier != 'onHandler') return
                setTimeout(() => {
                    body.define('bossAnnihilator')
                    body.sendMessage('Ha-ha-ha i am ready!!!')
                }, 0)
                setTimeout(() => body.sendMessage('The Titan Annihilator has been dropped at warlands!'), 0)
            }
        }
    ],
    GUNS: [
{
        POSITION: {LENGTH: 0, WIDTH: 0},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 5000}, g.Nspeed, g.fake]),
            TYPE: 'bullet',
            IDENTIFIER: 'onHandler'
        }
    },
      {
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.speedo1]),
          TYPE: "bullet",
        },
      },
    ],
  TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "pentaAnnihilatorTurret",
        },
    ],
}
Class.bossAnnihilator = {
    PARENT: "genericTank",
    LABEL: "Titan Annihilator - Annihilation Form",
    DANGER: 7,
    SIZE: 50,
    ON: [
        {
            event: "fire",
            handler: ({ body, gun }) => {
                if (gun.identifier != 'onHandler') return
                setTimeout(() => {
                    body.define('bossAnnihilatorVulnForm')
                    body.sendMessage('No-no-no i wanna sleep, please let me sleep')
                }, 45000)
                setTimeout(() => body.sendMessage('Titan Annihilator tired!'), 40000)
            }
        }
    ],
    GUNS: [
{
        POSITION: {LENGTH: 0, WIDTH: 0},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 5000}, g.Nspeed, g.fake]),
            TYPE: 'bullet',
            AUTOFIRE: true,
            IDENTIFIER: 'onHandler'
        }
    },
      {
        POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.speedo1]),
          TYPE: "bullet",
        },
      },
    ],
  TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: "pentaAnnihilatorTurret",
        },
    ],
}
Class.bossAnnihilatorVulnForm = {
    PARENT: "genericTank",
    LABEL: "Titan Annihilator - Vulnerable Form",
    DANGER: 7,
    SIZE: 50,
    BODY: {
      HEALTH: 500,
      SPEED: 0.001,
    },
    ON: [
        {
            event: "fire",
            handler: ({ body, gun }) => {
                if (gun.identifier != 'onHandler') return
                setTimeout(() => {
                    body.define('bossAnnihilator')
                    body.sendMessage('Im awake')
                }, 15000)
                setTimeout(() => body.sendMessage('Titan Annihilator will activated in 10 seconds!'), 10000)
            }
        }
    ],
    GUNS: [
{
        POSITION: {LENGTH: 0, WIDTH: 0},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {reload: 5000}, g.Nspeed, g.fake]),
            TYPE: 'bullet',
            AUTOFIRE: true,
            IDENTIFIER: 'onHandler'
        }
    }
    ],
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: ["titanAnnihilatorSidewinderTurret", {INDEPENDENT: true,}],
        },{
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ]
}
// Artillery upgrades
Class.mortar = {
    PARENT: "genericTank",
    LABEL: "Mortar",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [13, 3, 1, 0, -8, -7, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [13, 3, 1, 0, 8, 7, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, -6, -7, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 6, 7, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery, g.twin]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.ordnance = {
    PARENT: "genericTank",
    LABEL: "Ordnance",
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.25,
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
    GUNS: [
        {
            POSITION: [17, 3, 1, 0, -5.75, -6, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [17, 3, 1, 0, 5.75, 6, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [24, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [21, 11, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.beekeeper = {
    PARENT: "genericTank",
    LABEL: "Beekeeper",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [14, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [14, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.bee]),
                TYPE: ["bee", { INDEPENDENT: true }],
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [19, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery]),
                TYPE: "bullet",
                LABEL: "Heavy",
            },
        },
    ],
}
Class.fieldGun = {
    PARENT: "genericTank",
    LABEL: "Field Gun",
    BODY: {
        FOV: base.FOV * 1.1,
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [15, 3, 1, 0, -6, -7, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            POSITION: [15, 3, 1, 0, 6, 7, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.artillery]),
                TYPE: "bullet",
                LABEL: "Secondary",
            },
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}

// Launcher upgrades
Class.skimmer = {
    PARENT: "genericTank",
    LABEL: "Skimmer",
    DANGER: 7,
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer]),
                TYPE: "missile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.twister = {
    PARENT: "genericTank",
    LABEL: "Twister",
    DANGER: 7,
    BODY: {
        FOV: 1.1 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery, g.skimmer, { speed: 1.3, maxSpeed: 1.3 }, { reload: 4/3 }]),
                TYPE: "spinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}
Class.swarmer = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Swarmer",
    GUNS: [
        {
            POSITION: [15, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.hive]),
                TYPE: "hive",
            },
        },
        {
            POSITION: [15, 12, 1, 5, 0, 0, 0],
        },
    ],
}
Class.rocketeer = {
    PARENT: "genericTank",
    LABEL: "Rocketeer",
    BODY: {
        FOV: 1.15 * base.FOV,
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10, 12.5, -0.7, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher, g.rocketeer]),
                TYPE: "rocketeerMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: [17, 18, 0.65, 0, 0, 0, 0],
        },
    ],
}

// Trapper upgrades
Class.builder = {
    PARENT: "genericTank",
    LABEL: "Builder",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            }
        }
    ]
}
Class.charger = {
   PARENT: "genericTank",
   LABEL: 'Charger',
   GUNS: [ {
         POSITION: [ 18, 12, 1, 0, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 12, 1.1, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: "explodingSetTrap",
          STAT_CALCULATOR: gunCalcNames.block
         }, }, {
         POSITION: [ 2, 5, 0.1, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.fake]),
            TYPE: "setTrap",
          STAT_CALCULATOR: gunCalcNames.block
         }, }, 
     ],
};

Class.triTrapper = makeMulti({
    PARENT: "genericTank",
    DANGER: 6,
    STAT_NAMES: statnames.trap,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
}, 3, "Tri-Trapper")
Class.trapGuard = makeGuard({
    PARENT: "genericTank",
    LABEL: "Trap",
    STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard]),
                TYPE: "bullet"
            }
        }
    ]
})

// Builder upgrades
Class.construct = {
    PARENT: "genericTank",
    LABEL: "Constructor",
    STAT_NAMES: statnames.trap,
    DANGER: 7,
    BODY: {
        SPEED: 0.7 * base.SPEED,
        FOV: 1.15 * base.FOV
    },
    GUNS: [
        {
            POSITION: [18, 18, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 18, 1.2, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.constructor]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            }
        }
    ]
}
Class.engineer = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Engineer",
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.75 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 6,
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "pillbox",
                SYNCS_SKILLS: true,
                DESTROY_OLDEST_CHILD: true,
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
}
Class.boomer = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Boomer",
    STAT_NAMES: statnames.trap,
    FACING_TYPE: "locksFacing",
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.15,
    },
    GUNS: [
        {
            POSITION: [5, 10, 1, 14, 0, 0, 0],
        },
        {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        },
        {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, g.boomerang]),
                TYPE: "boomerang",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    ],
}
Class.assembler = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: 'Assembler',
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.15 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: 'assemblerTrap',
                MAX_CHILDREN: 8,
                STAT_CALCULATOR: gunCalcNames.block,
            }
        }
    ],
    TURRETS: [
        {
            /**        SIZE X   Y  ANGLE ARC */
            POSITION: [2.5, 14, 0, 0,    360, 1],
            TYPE: 'assemblerDot'
        }
    ]
}

// Tri-Trapper upgrades
Class.hexaTrapper = makeAuto(makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    STAT_NAMES: statnames.trap,
    HAS_NO_RECOIL: true,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, 0, 0, 180, 0.5],
        },
        {
            POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}, 3), "Hexa-Trapper")
Class.septaTrapper = (() => {
    let a = 360 / 7,
        d = 1 / 7;
    return {
        PARENT: "genericTank",
        LABEL: "Septa-Trapper",
        DANGER: 7,
        BODY: {
            SPEED: base.SPEED * 0.8,
        },
        STAT_NAMES: statnames.trap,
        HAS_NO_RECOIL: true,
        GUNS: [
            {
                POSITION: [15, 7, 1, 0, 0, 0, 0],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, a, 4 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, a, 4 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 2 * a, 1 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 2 * a, 1 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 3 * a, 5 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 3 * a, 5 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 4 * a, 2 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 4 * a, 2 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 5 * a, 6 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 5 * a, 6 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
            {
                POSITION: [15, 7, 1, 0, 0, 6 * a, 3 * d],
            },
            {
                POSITION: [3, 7, 1.7, 15, 0, 6 * a, 3 * d],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper]),
                    TYPE: "trap",
                    STAT_CALCULATOR: gunCalcNames.trap,
                },
            },
        ],
    };
})()
Class.architect = {
    PARENT: "genericTank",
    LABEL: "Architect",
    DANGER: 7,
    BODY: {
        SPEED: 1.1 * base.SPEED,
    },
    FACING_TYPE: ["spin", {speed: 0.02}],
    TURRETS: [
        {
            POSITION: [12, 8, 0, 0, 190, 0],
            TYPE: "architectGun",
        },
        {
            POSITION: [12, 8, 0, 120, 190, 0],
            TYPE: "architectGun",
        },
        {
            POSITION: [12, 8, 0, 240, 190, 0],
            TYPE: "architectGun",
        },
    ],
}
Class.obstacleTurret = {
    LABEL: 'Shield',
    DAMAGE_CLASS: 1,
    SHAPE: 0,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 120,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 10000,
        STEALTH: 1,
        DENSITY: 10000
    },
    VALUE: 0,
    COLOR: 34,
    HITS_OWN_TYPE: "hard"
};
Class.backShieldTurret = {
    PARENT: "obstacleTurret",
    LABEL: 'Backshield',
    HITS_OWN_TYPE: 'hard',
    SHAPE: "https://cdn.glitch.global/685a20ef-2978-4ea9-99d3-22c08fcc025a/f6bd4fb8-e126-4370-b885-2f6ce99b7b15.image.png?v=1708205592735",
    COLOR: "#FF7F00"
};
Class.backShield = {
    PARENT: "genericTank",
    LABEL: 'Back Shield',
    DANGER: 7,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
        }
    }],
    TURRETS: [{
        POSITION: [18, 18, 0, 180, 0, 1],
        TYPE: "backShieldTurret",
        VULNERABLE: true
    }]
};
// Trap Guard upgrades
Class.bushwhacker = makeGuard(Class.sniper, "Bushwhacker")
Class.gunnerTrapper = {
    PARENT: "genericTank",
    LABEL: "Gunner Trapper",
    DANGER: 7,
    STAT_NAMES: statnames.mixed,
    BODY: {
        FOV: 1.25 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { recoil: 4 }, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { recoil: 4 }, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [13, 11, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 11, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, { speed: 1.2 }, { recoil: 0.5 }]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.bomber = {
    PARENT: "genericTank",
    LABEL: "Bomber",
    BODY: {
        DENSITY: base.DENSITY * 0.6,
    },
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront]),
                TYPE: "bullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 130, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle]),
                TYPE: "bullet",
                LABEL: "Wing",
            },
        },
        {
            POSITION: [18, 8, 1, 0, 0, 230, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle]),
                TYPE: "bullet",
                LABEL: "Wing",
            },
        },
        {
            POSITION: [13, 8, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}
Class.conqueror = {
    PARENT: "genericTank",
    DANGER: 7,
    LABEL: "Conqueror",
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    REVERSE_TARGET_WITH_TANK: true,
    GUNS: [
        {
            POSITION: [21, 14, 1, 0, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 12, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [2, 12, 1.1, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
                TYPE: "setTrap",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    ],
}
Class.bulwark = {
    PARENT: "genericTank",
    LABEL: "Bulwark",
    STAT_NAMES: statnames.mixed,
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20, 8, 1, 0, 5.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.twin]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 8, 1, 0, 5.5, 185, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, 5.5, 185, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [14, 8, 1, 0, -5.5, 175, 0],
        },
        {
            POSITION: [3, 9, 1.5, 14, -5.5, 175, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
}

// Desmos upgrades
Class.volute = {
    PARENT: "genericTank",
    LABEL: "Volute",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 13, 0.8, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos, g.pounder]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            },
        },
        {
            POSITION: [5, 10, 2.125, 1, -6.375, 90, 0],
        },
        {
            POSITION: [5, 10, 2.125, 1, 6.375, -90, 0],
        },
    ],
}
Class.helix = {
    PARENT: "genericTank",
    LABEL: "Helix",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 8, 0.75, 0, -5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: false}]}]
            },
        },
        {
            POSITION: [20, 8, 0.75, 0, 5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: true}]}]
            },
        },
        {
            POSITION: [3.625, 7.5, 2.75, 5.75, -6.75, 90, 0],
        },
        {
            POSITION: [3.625, 7.5, 2.75, 5.75, 6.75, -90, 0],
        },
        {
            POSITION: [6, 8, 0.25, 10.5, 0, 0, 0],
        },
    ],
}

// Volute upgrades
Class.sidewinder = {
    PARENT: "genericTank",
    LABEL: "Sidewinder",
    DANGER: 7,
    BODY: {
        SPEED: 0.8 * base.SPEED,
        FOV: 1.3 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [10, 11, -0.5, 14, 0, 0, 0],
        },
        {
            POSITION: [21, 12, -1.1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewinder]),
                TYPE: "snake",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
}

// Helix upgrades
Class.triplex = {
    PARENT: "genericTank",
    LABEL: "Triplex",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [18, 10, 0.7, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [18, 10, 0.7, 0, 0, 45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: "desmos"}]
            },
        },
        {
            POSITION: [18, 10, 0.7, 0, 0, -45, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: true}]}]
            },
        },
        {
            POSITION: [3.75, 10, 2.125, 1, -4.25, 10, 0],
        },
        {
            POSITION: [3.75, 10, 2.125, 1, 4.25, -10, 0],
        },
        {
            POSITION: [5, 6, 0.5, 10.5, 0, 22.5, 0],
        },
        {
            POSITION: [5, 6, 0.5, 10.5, 0, -22.5, 0],
        },
    ],
}
Class.quadruplex = {
    PARENT: "genericTank",
    LABEL: "Quadruplex",
    DANGER: 7,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [20, 10, 0.8, 0, 0, 45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {amplitude: 25}]}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, 135, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, -45, 0]
        },
        {
            POSITION: [20, 10, 0.8, 0, 0, -45, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {amplitude: 25, invert: true}]}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, 45, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, -135, 0]
        },
        {
            POSITION: [20, 10, 0.8, 0, 0, 135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {period: 7, amplitude: 10}]}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, -135, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, 45, 0]
        },
        {
            POSITION: [20, 10, 0.8, 0, 0, -135, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {period: 7, amplitude: 10, invert: true}]}]
            }
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, -6.25, -45, 0]
        },
        {
            POSITION: [3.75, 10, 2.125, 1.25, 6.25, 135, 0]
        },
    ],
}

// Smasher upgrades
Class.megaSmasher = {
    PARENT: "genericSmasher",
    LABEL: "Mega-Smasher",
    BODY: {
        SPEED: 1.05 * base.SPEED,
        FOV: 1.1 * base.FOV,
        DENSITY: 4 * base.DENSITY,
    },
    TURRETS: [
        {
            POSITION: [25, 0, 0, 0, 360, 0],
            TYPE: "smasherBody",
        },
    ],
}
Class.spike = {
    PARENT: "genericSmasher",
    LABEL: "Spike",
    BODY: {
        SPEED: base.SPEED * 0.9,
        DAMAGE: base.DAMAGE * 1.1,
    },
    TURRETS: [
        {
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [18.5, 0, 0, 90, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: "spikeBody",
        },
        {
            POSITION: [18.5, 0, 0, 270, 360, 0],
            TYPE: "spikeBody",
        },
    ],
}
Class.landmine = {
    PARENT: "genericSmasher",
    LABEL: "Landmine",
    INVISIBLE: [0.06, 0.01],
    TOOLTIP: "Stay still to turn invisible.",
    BODY: {
        SPEED: 1.1 * base.SPEED
    },
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        },
        {
            POSITION: [21.5, 0, 0, 30, 360, 0],
            TYPE: "landmineBody"
        }
    ]
}

// Healer upgrades
Class.medic = {
    PARENT: "genericTank",
    LABEL: "Medic",
    BODY: {
        FOV: base.FOV * 1.2,
    },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 16.5, 0, 0, 0],
        },
        {
            POSITION: [22, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer, { reload: 1.2 }]),
                TYPE: "healerBullet",
            },
        },
    ],
    STAT_NAMES: statnames.heal,
}
Class.ambulance = {
    PARENT: "genericTank",
    LABEL: "Ambulance",
    BODY: {
        HEALTH: base.HEALTH * 0.8,
        SHIELD: base.SHIELD * 0.8,
        DENSITY: base.DENSITY * 0.6,
    },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, { recoil: 4 }, g.healer]),
                TYPE: "healerBullet",
                LABEL: "Front",
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 150, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
        {
            POSITION: [16, 8, 1, 0, 0, 210, 0.1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.thruster]),
                TYPE: "bullet",
                LABEL: gunCalcNames.thruster,
            },
        },
    ],
    STAT_NAMES: statnames.heal,
}
Class.surgeon = {
    PARENT: "genericTank",
    LABEL: "Surgeon",
    STAT_NAMES: statnames.trap,
    BODY: {
        SPEED: base.SPEED * 0.75,
        FOV: base.FOV * 1.15,
    },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [5, 11, 1, 10.5, 0, 0, 0],
        },
        {
            POSITION: [3, 14, 1, 15.5, 0, 0, 0],
        },
        {
            POSITION: [2, 14, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                MAX_CHILDREN: 2,
                SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, { speed: 0.7, maxSpeed: 0.7 }]),
                TYPE: "surgeonPillbox",
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
        {
            POSITION: [4, 14, 1, 8, 0, 0, 0],
        },
    ],
    STAT_NAMES: statnames.heal,
}
Class.paramedic = {
    PARENT: "genericTank",
    LABEL: "Paramedic",
    BODY: {
        SPEED: base.SPEED * 0.9,
    },
    TURRETS: [
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        },
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 10, 0, -17.5, 0.5],
        },
        {
            POSITION: [15.5, 10, 1, 0, 0, -17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.healer]),
                TYPE: "healerBullet",
            },
        },
        {
            POSITION: [8, 9, -0.5, 10, 0, 17.5, 0.5],
        },
        {
            POSITION: [15.5, 10, 1, 0, 0, 17.5, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.healer]),
                TYPE: "healerBullet",
            },
        },
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.tripleShot, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
    STAT_NAMES: statnames.heal,
}

// Bird tanks
Class.falcon = makeBird({
    PARENT: "genericTank",
    DANGER: 7,
    BODY: {
        SPEED: 0.85 * base.SPEED,
        FOV: 1.2 * base.FOV
    },
    GUNS: [
        {
            POSITION: [27, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.sniper, g.assassin]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [5, 8, -1.4, 8, 0, 0, 0]
        }
    ]
}, "Falcon")
Class.vulture = makeBird({
    PARENT: "genericTank",
    DANGER: 7,
    BODY: {
        FOV: base.FOV * 1.2,
    },
    GUNS: [
        {
            POSITION: [22, 7, -1.5, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.minigun]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [20, 7.5, -1.5, 0, 0, 0, 0.333],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.minigun, {size: 7/7.5}]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [18, 8, -1.5, 0, 0, 0, 0.667],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.minigun, {size: 7/8}]),
                TYPE: "bullet"
            }
        }
    ]
}, "Vulture")
Class.phoenix = makeBird({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}, "Phoenix")
Class.eagle = makeBird({
    PARENT: "genericTank",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [20.5, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.triAngle, g.triAngleFront, g.pounder]),
                TYPE: "bullet"
            }
        }
    ]
}, "Eagle")

// Hybrid tanks
Class.bentHybrid = makeHybrid('tripleShot', "Bent Hybrid")
Class.poacher = makeHybrid('hunter', "Poacher")
Class.armsman = makeHybrid('rifle', "Armsman")
Class.cropDuster = makeHybrid('minigun', "Crop Duster")
Class.hybrid = makeHybrid('destroyer', "Hybrid")

// Over tanks
Class.overgunner = makeOver({
    PARENT: "genericTank",
    LABEL: "Gunner",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },
    ],
})
Class.overtrapper = makeOver({
    PARENT: "genericTank",
    LABEL: "Trapper",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: base.FOV * 1.2
    },
    GUNS: [
        {
            POSITION: [14, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 8, 1.5, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        }
    ]
})

// Auto tanks
Class.autoDouble = makeAuto(Class.doubleTwin, "Auto-Double")
Class.autoAssassin = makeAuto(Class.assassin)
Class.autoGunner = makeAuto(Class.gunner)
Class.autoTriAngle = makeAuto(Class.triAngle)
Class.autoOverseer = makeAuto(Class.overseer)
Class.autoCruiser = makeAuto(Class.cruiser)
Class.autoSpawner = makeAuto(Class.spawner)
Class.autoBuilder = makeAuto(Class.builder)
Class.autoSmasher = makeAuto({
    PARENT: "genericSmasher",
    DANGER: 6,
    TURRETS: [
        {
            POSITION: [21.5, 0, 0, 0, 360, 0],
            TYPE: "smasherBody"
        }
    ],
    SKILL_CAP: [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl]
}, "Auto-Smasher", {
    type: "autoSmasherTurret",
    size: 11,
})
Class.ringer = makeMulti("sniper", 3, "Ringer");
	Class.winger = makeMulti("sniper", 6, "Winger");
	Class.cateran = makeMulti("assassin", 3, "Cateran");
	Class.faucile = makeMulti("hunter", 3, "Faucile");
	Class.carbine = makeMulti("rifle", 3, "Carbine");
Class.yoke = makeMulti("machineGun", 3, "Yoke");
	Class.machinist = makeMulti("machineGun", 6, "Machinist");
	Class.contender = makeMulti("minigun", 3, "Contender");
	Class.watchcat = makeMulti("sprayer", 3, "Watchcat");
Class.smacker = makeMulti("pounder", 3, "Smacker");
	Class.deathStar = makeMulti("pounder", 6, "Death Star");
	Class.whammer = makeMulti("destroyer", 3, "Whammer");
	Class.howitzer = makeMulti("artillery", 3, "Howitzer");
	Class.catalyst = makeMulti("launcher", 3, "Catalyst");
Class.hexidecimator = makeMulti("trapGuard", 3, "Hexidecimator");

// Upgrade paths
Class.basic.UPGRADES_TIER_1 = ["twin", "sniper", "machineGun", "flankGuard", "director", "pounder", "trapper", "desmos"]
    Class.basic.UPGRADES_TIER_2 = ["smasher"]
        Class.smasher.UPGRADES_TIER_3 = ["megaSmasher", "spike", "autoSmasher", "landmine"]
        Class.healer.UPGRADES_TIER_3 = ["medic", "ambulance", "surgeon", "paramedic"]

    Class.twin.UPGRADES_TIER_2 = ["doubleTwin", "tripleShot", "gunner", "hexaTank", "helix"]
        Class.twin.UPGRADES_TIER_3 = ["dual", "bulwark", "musket"]
        Class.doubleTwin.UPGRADES_TIER_3 = ["tripleTwin", "hewnDouble", "autoDouble", "bentDouble"]
        Class.tripleShot.UPGRADES_TIER_3 = ["pentaShot", "spreadshot", "bentHybrid", "bentDouble", "triplet", "triplex"]

    Class.sniper.UPGRADES_TIER_2 = ["assassin", "hunter", "minigun", "rifle"]
        Class.sniper.UPGRADES_TIER_3 = ["bushwhacker","ringer"]
        Class.assassin.UPGRADES_TIER_3 = ["ranger", "falcon", "stalker", "autoAssassin", "single","cateran"]
        Class.hunter.UPGRADES_TIER_3 = ["predator", "xHunter", "poacher", "ordnance", "dual","faucile"]
        Class.rifle.UPGRADES_TIER_3 = ["musket", "crossbow", "armsman","carbine"]
        Class.ringer.UPGRADES_TIER_3 = ["winger", "cateran", "faucile", "carbine"]

    Class.machineGun.UPGRADES_TIER_2 = ["artillery", "minigun", "gunner", "sprayer","yoke"]
        Class.minigun.UPGRADES_TIER_3 = ["streamliner", "nailgun", "cropDuster", "barricade", "vulture","contender"]
        Class.gunner.UPGRADES_TIER_3 = ["autoGunner", "nailgun", "auto4", "machineGunner", "gunnerTrapper", "cyclone", "overgunner"]
        Class.sprayer.UPGRADES_TIER_3 = ["redistributor", "phoenix", "atomizer", "focal","watchcat"]

    Class.flankGuard.UPGRADES_TIER_2 = ["hexaTank", "triAngle", "auto3", "trapGuard", "triTrapper","backShield"]
        Class.flankGuard.UPGRADES_TIER_3 = ["tripleTwin", "quadruplex"]
        Class.hexaTank.UPGRADES_TIER_3 = ["octoTank", "cyclone", "hexaTrapper","winger", "machinist", "deathStar", "hexidecimator"]
        Class.triAngle.UPGRADES_TIER_3 = ["fighter", "booster", "falcon", "bomber", "autoTriAngle", "surfer", "eagle", "phoenix", "vulture"]
        Class.booster.UPGRADES_TIER_3 = ["rilaper"]
        Class.auto3.UPGRADES_TIER_3 = ["auto5", "mega3", "auto4", "banshee"]
        Class.yoke.UPGRADES_TIER_3 = ["machinist", "howitzer", "contender", "cyclone", "watchcat"]
        Class.smacker.UPGRADES_TIER_3 = ["deathStar", "whammer", "howitzer", "catalyst"]

    Class.director.UPGRADES_TIER_2 = ["overseer", "cruiser", "underseer", "spawner"]
        Class.director.UPGRADES_TIER_3 = ["manager", "bigCheese"]
        Class.overseer.UPGRADES_TIER_3 = ["overlord", "overtrapper", "overgunner", "banshee", "autoOverseer", "overdrive", "commander"]
        Class.cruiser.UPGRADES_TIER_3 = ["carrier", "battleship", "fortress", "autoCruiser", "commander", "miniMothership"]
        Class.underseer.UPGRADES_TIER_3 = ["necromancer", "maleficitor", "infestor"]
        Class.spawner.UPGRADES_TIER_3 = ["factory", "autoSpawner", "desmosspawner"]

    Class.pounder.UPGRADES_TIER_2 = ["destroyer", "builder", "artillery", "launcher", "volute"]
        Class.pounder.UPGRADES_TIER_3 = ["shotgun", "eagle","smacker"]
        Class.destroyer.UPGRADES_TIER_3 = ["conqueror", "annihilator", "hybrid", "construct","whammer"]
        Class.artillery.UPGRADES_TIER_3 = ["mortar", "ordnance", "beekeeper", "fieldGun","howitzer"]
        Class.launcher.UPGRADES_TIER_3 = ["skimmer", "twister", "swarmer", "rocketeer", "fieldGun","catalyst"]

    Class.trapper.UPGRADES_TIER_2 = ["builder", "triTrapper", "trapGuard"]
        Class.trapper.UPGRADES_TIER_3 = ["barricade", "overtrapper"]
        Class.builder.UPGRADES_TIER_3 = ["construct", "autoBuilder", "engineer", "boomer", "assembler", "architect", "conqueror"]
        Class.triTrapper.UPGRADES_TIER_3 = ["fortress", "hexaTrapper", "septaTrapper", "architect","hexidecimator"]
        Class.trapGuard.UPGRADES_TIER_3 = ["bushwhacker", "gunnerTrapper", "bomber", "conqueror", "bulwark","hexidecimator"]

    Class.desmos.UPGRADES_TIER_2 = ["volute", "helix"]
        Class.volute.UPGRADES_TIER_3 = ["sidewinder","undertow"]
        Class.helix.UPGRADES_TIER_3 = ["triplex", "quadruplex"]
