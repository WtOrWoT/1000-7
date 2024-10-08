const { combineStats, menu } = require('../facilitators.js');
const { smshskl, base } = require('../constants.js');
const g = require('../gunvals.js');

// Comment out the line below to enable this addon, uncomment it to disable this addon.
// return console.log('Mythic Creatures [MC] addon is disabled. See lines 5-6 to enable it.');

// Either use or not different team for classes, not completely working.
// Art by Felyn_de_fens
const MC_different_team = false;
const MC_existingCodes = [];
const MC_codeLength = 8;
const MC_petals = ["Power", "Space", "Reality", "Soul", "Time", "Mind"];
const MC_assets = "https://raw.githubusercontent.com/ClashTest311/MC-addon/main/assets";
const MC_animation = {
    INSIDE: "inside",
    OUT: "out",
};
const MC_names = {
    HTTYD: ["Toothless", "Stormfly", "Hookfang", "Meatlug", "Skrill"],
    TITANS: ["Godzilla", "Shimu"], //а что по тутесту? готово кольцо с двумя видами туррелей? // с двумя? пиши в дс
};
const MC_definitions = {
    bodyScale: {
        HTTYD: 4.6,
        TITANS: 14,
    },
    ticks: 100,
    HTTYD_charges: [6, 8, 4, 6, 5],
    HTTYD_welcome: [
        "Night Fury! Get down!",
    ],
};
const MC_base = {
    ACCEL: 0.0001 * base.ACCEL,
    SPEED: 1.8 * base.SPEED,
    HEALTH: 4 * base.HEALTH,
    DAMAGE: 3 * base.DAMAGE,
    RESIST: 2.4 * base.RESIST,
    PENETRATION: 0.8 * base.PENETRATION,
    SHIELD: 0.4 * base.SHIELD,
    REGEN: 2.6 * base.REGEN,
    FOV: 1.3 * base.FOV,
    DENSITY: 1.2 * base.DENSITY,
};
const MC_stats = {
    statMain: g.basic,
    statPounder: g.pounder,
    statPower: g.power,
    statPetal: g.satellite,
    statNoRecoil: { recoil: 0 },
    statNoReload: { reload: 2 },
    statNoRange: { range: 0.2 },
    statReload: { reload: 0.2 },
    statHealth: { health: 1e6 },
    statNoSpray: {
        spray: 0.2,
        shudder: 0.2,
    },
    statSpray: {
        spray: 2,
        shudder: 2,
    },
    statWeak: {
        health: 0.6,
        damage: 0.4,
    },
    speedStat: (speed) => {
        return {
            maxSpeed: speed,
            speed,
        };
    },
};
const MC_functions = {
    deepCopy: obj => {
        if (obj == null || typeof obj != "object") return obj;
        let objCopy = {},
            arrCopy = [];

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                arrCopy.push(MC_functions.deepCopy(obj[i]));
            }
            return arrCopy;
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                objCopy[key] = MC_functions.deepCopy(obj[key]);
            }
        }
        return objCopy;
    },
    gunArray: (callback, count) => {
        if (typeof callback != "function") throw new Error(`${callback} isn't type of function`);
        let output = [];

        for (let i = 0; i < count; i++) {
            let angle = 360 / count * i,
                weapon = callback(angle);

            if (!Array.isArray(weapon)) weapon = [weapon];
            output.push(...weapon);
        }

        return output;
    },
    generateCode: () => {
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            length = MC_codeLength,
            newCode;

        do {
            newCode = "";
            for (let i = 0; i < length; i++) {
                newCode += characters[Math.floor(Math.random() * characters.length)];
            }
        } while (MC_existingCodes.includes(newCode));

        MC_existingCodes.push(newCode);
        return newCode;
    },
    enableGuns: (guns, tag = false) => tag
        ? guns.filter(gun => gun._tag == tag).forEach(gun => gun._charged = true)
        : guns.forEach(gun => gun._charged = true),
    disableGuns: (guns, tag = false) => tag
        ? guns.filter(gun => gun._tag == tag).forEach(gun => gun._charged = false)
        : guns.forEach(gun => gun._charged = false),
    isGunsDisabled: (guns, tag = false) => guns.filter(gun => gun._charged && (tag ? gun._tag == tag : true)).length == 0,
    initGuns: (guns, ...tags) => {
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            if (Array.isArray(tag)) {
                let array = [];
                for (let i = 0; i < tag[1]; i++) array.push(tag[0]);
                tags.splice(tags.indexOf(tag), 1, ...array);
            }
        }
        for (let i = 0; i < guns.length; i++) {
            const gun = guns[i];
            if (tags.length) gun._tag = tags[guns.indexOf(gun)] || tags[tags.length - 1];
            gun._fire = gun.fire;
            gun._charged = true;

            gun.fire = (gx, gy, sk) => {
                if (!gun._charged) return;
                gun._fire(gx, gy, sk);
            };
        }
    },
    isCompatible: body => {
        let number = 0;
        for (let key in body) {
            if (body.hasOwnProperty(key)) number += body[key];
        }
        return number == 1;
    },
    createDeveloper: name => {
        let output = MC_functions.deepCopy(Class[name]),
            turret = {
                PARENT: "genericTank",
                GUNS: [],
            };

        for (let i = 0; i < 6; i++) { 
            turret.GUNS.push({ 
                POSITION: {
                    WIDTH: 8,
                    LENGTH: 1,
                    DELAY: i * 0.25,
                },
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        MC_stats.statPetal,
                    ]),
                    TYPE: [`MC_petal${MC_petals[i]}`, { ANGLE: i * 60 }],
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true,
                    AUTOFIRE: true,
                    MAX_CHILDREN: 1,
                },
            });
        }

        output.CONTROLLERS = ["MC_orbitEntity"];
        output.HAS_NO_RECOIL = true;
        output.AI = { SPEED: 2 };
        output.TURRETS = [{
            POSITION: {
                SIZE: 8,
                LAYER: 0,
            },
            TYPE: turret,
        }];

        return output;
    },
    createBlast: (color, timeout, deathHandler, tickHandler) => {
        if (deathHandler && typeof deathHandler != "function") throw new Error(`${deathHandler} isn't type of function`);
        if (tickHandler && typeof tickHandler != "function") throw new Error(`${tickHandler} isn't type of function`);
        const output = {
            PARENT: "bullet",
            GUNS: [
                {
                    POSITION: [1, 18, 1, 0, 0, 180, timeout],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([
                            MC_stats.statMain,
                            MC_stats.statReload,
                        ]),
                        TYPE: ["bullet", { COLOR: color }],
                        AUTOFIRE: true,
                    },
                },
            ],
            ON: [],
        };

        if (tickHandler) output.ON.push({
            event: "tick",
            handler: tickHandler,
        });
        if (deathHandler) output.ON.push({
            event: "death",
            handler: deathHandler,
        });

        return output;
    },
    createFireRange: (color, timeout) => {
        return {
            PARENT: "bullet",
            COLOR: color,
            GUNS: [
                {
                    POSITION: [1, 18, 1, 0, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([
                            MC_stats.statMain,
                            MC_stats.statPounder,
                            MC_stats.statPower,
                            MC_stats.statReload,
                            MC_stats.statSpray,
                        ]),
                        TYPE: ["bullet", {
                            COLOR: color,
                            GUNS: [
                                {
                                    POSITION: [1, 18, 1, 0, 0, 180, timeout],
                                    PROPERTIES: {
                                        SHOOT_SETTINGS: combineStats([
                                            MC_stats.statMain,
                                            MC_stats.statReload,
                                        ]),
                                        TYPE: ["bullet", { COLOR: color }],
                                        AUTOFIRE: true,
                                    },
                                },
                            ],
                        }],
                        AUTOFIRE: true,
                    },
                },
            ],
        };
    },
    createFirework: (color, alpha) => {
        return {
            PARENT: "genericEntity",
            COLOR: color,
            ALPHA: alpha,
            BODY: {
                HEALTH: 1e6,
                DAMAGE: 0,
            },
            GUNS: MC_functions.gunArray(angle => {
                return [{
                    POSITION: [1, 18, 1, 0, 0, angle, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([
                            MC_stats.statMain,
                            MC_stats.statPounder,
                            MC_stats.statPower,
                            MC_stats.statHealth,
                            MC_stats.speedStat(1.2),
                        ]),
                        TYPE: "bullet",
                        AUTOFIRE: true,
                    },
                }, {
                    POSITION: [1, 18, 1, 0, 0, angle, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([
                            MC_stats.statMain,
                            MC_stats.statPounder,
                            MC_stats.statPower,
                            MC_stats.statHealth,
                            MC_stats.speedStat(0.8),
                        ]),
                        TYPE: "bullet",
                        AUTOFIRE: true,
                    },
                }];
            }, 18),
        };
    },
    createLaser: color => {
        return {
            PARENT: "bullet",
            COLOR: color,
            SHAPE: "M -4.5 1 C -6 1 -6 1 -6 0 C -6 -1 -6 -1 -4.5 -1 H 4 C 4 -1 5 -1 5 0 C 5 1 4 1 4 1 H -4.5",
            BORDERLESS: true,
            ON: [{
                event: "tick",
                handler: ({ body }) => {
                    body.SIZE += 0.2;
                },
            }],
        };
    },
    create: (func, ...args) => {
        if (typeof func != "function") throw new Error(`${func} isn't type of function`);
        let name = MC_functions.generateCode(),
            poison = null;

        if (typeof args[0] == "object" && args[0].POISON && args[0].DAMAGE) {
            poison = args[0];
            args.shift();
        }
        Class[name] = func(...args);
        if (poison) {
            if (!Class[name].ON) throw new Error(`Poison can be applied only on laser bullet types`);
            Class[name].ON.push({
                event: "death",
                handler: ({ body }) => {
                    for (let instance of entities) {
                        let diffX = instance.x - body.x,
                            diffY = instance.y - body.y,
                            dist2 = diffX ** 2 + diffY ** 2;

                        if (
                            !instance.isArenaCloser &&
                            !instance.poisoned &&
                            !instance.invuln &&
                            instance.id != body.id &&
                            instance.team != body.team &&
                            dist2 <= (body.size / 12 * 100) ** 2
                        ) {
                            instance.poisoned = true;
                            for (let i = 0; i < poison.POISON; i++) {
                                setSyncedTimeout(() => {
                                    instance.damageReceived += poison.DAMAGE;
                                    if (i + 1 == Math.floor(poison.POISON)) instance.poisoned = false;
                                }, i + 1);
                            }
                        }
                    }
                },
            });
        }
        return name;
    },
    handler: name => {
        sockets.broadcast(`A ${name} has arrived!`);
    },
    animation: (def, color, alpha, number, type, autofire) => {
        let pos;
        if (type == MC_animation.INSIDE) pos = -8;
        if (type == MC_animation.OUT) pos = 0;
        def.GUNS.push(...MC_functions.gunArray(angle => {
            return {
                POSITION: [1, 1.3, 1, pos, 0, angle, Math.random()],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([
                        MC_stats.statMain,
                        MC_stats.statNoRange,
                        MC_stats.statNoRecoil,
                        MC_stats.statNoSpray,
                        MC_stats.statNoReload,
                        MC_stats.statHealth,
                        MC_stats.speedStat(0.5),
                    ]),
                    ALPHA: 0,
                    TYPE: ["bullet", {
                        COLOR: color,
                        ALPHA: alpha,
                    }],
                    AUTOFIRE: autofire,
                },
            };
        }, number));
    },
};

// Controllers
class MC_orbit extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.realDist = 0;
        this.invert = opts.invert ?? false;
    }

    think(input) {
        let invertFactor = this.invert ? -1 : 1,
            master = this.body.master.master,
            dist = this.invert ? master.inverseDist : master.dist,
            angle = (this.body.angle * Math.PI / 180 + master.angle) * invertFactor;

        if (this.realDist > dist) this.realDist -= Math.min(10, Math.abs(this.realDist - dist));
        else if (this.realDist < dist) this.realDist += Math.min(10, Math.abs(dist - this.realDist));
        this.body.x = master.x + Math.cos(angle) * this.realDist;
        this.body.y = master.y + Math.sin(angle) * this.realDist;
        this.body.facing = angle;
    }
}
class MC_orbitEntity extends IO {
    constructor(body, opts = {}) {
        super(body);
        this.norDistance = opts.norDistance ?? 2;
        this.body.dist = opts.initialDist || this.norDistance * this.body.size;
        this.body.inverseDist = this.norDistance * this.body.size - this.body.dist + this.norDistance * this.body.size;
        this.body.angle = 0;
    }

    think(input) {
        this.body.angle += (this.body.skill.spd * 2 + this.body.aiSettings.SPEED) * Math.PI / 180;
        this.body.dist = this.norDistance * this.body.size;
    }
}
ioTypes["MC_orbit"] = MC_orbit;
ioTypes["MC_orbitEntity"] = MC_orbitEntity;

// Class parts
Class.MC_petal = {
    TYPE: "satellite",
    CONTROLLERS: ["MC_orbit"],
    MOTION_TYPE: "motor",
    FACING_TYPE: "spin",
    COLOR: "aqua",
    CLEAR_ON_MASTER_UPGRADE: true,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    LAYER: 13,
    SHAPE: 6,
    BODY: {
        PUSHABILITY: 0.6,
        ACCELERATION: 0.75,
        HEALTH: 1e6,
        DAMAGE: 0,
        SPEED: 10,
        RANGE: 200,
    },
}

// Classes
Class[MC_names.HTTYD[0]] = {
    UPGRADE_TOOLTIP: "The unholy offspring of lightning and death itself.",
    BODY: {
        SPEED: 1,
    },
    CHARGES: 6,
    COLOR: "black",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.speedStat(6.8),
                ]),
                TYPE: MC_functions.create(
                    MC_functions.createBlast,
                    "purple",
                    4,
                    ({ body }) => {
                        let e = new Entity(body);
                        e.define(MC_functions.createFirework("purple", 0.4));
                        e.team = body.team;
                        e.SIZE = body.size;
                        setSyncedTimeout(() => e.kill(), 12);
                    },
                    ({ body }) => {
                        for (let instance of entities) {
                            let diffX = instance.x - body.x,
                                diffY = instance.y - body.y,
                                dist2 = diffX ** 2 + diffY ** 2;

                            if (
                                !instance.isDominator &&
                                !instance.isArenaCloser &&
                                !instance.invuln &&
                                instance.id != body.id &&
                                instance.team != body.team &&
                                instance.type == "tank" &&
                                dist2 <= (body.size / 12 * 100) ** 2
                            ) body.kill();
                        }
                    },
                ),
            },
        },
    ],
}
Class[MC_names.HTTYD[1]] = {
    UPGRADE_TOOLTIP: "I don't know what I would do without Stormfly.",
    BODY: {
        HEALTH: 0.6,
        DAMAGE: 0.4,
    },
    COLOR: "blue",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statNoRange,
                ]),
                TYPE: MC_functions.create(MC_functions.createFireRange, "#fff242", 4),
            },
        },
    ],
}
Class[MC_names.HTTYD[2]] = {
    UPGRADE_TOOLTIP: "Five-thousand pounds of flaming muscle coming through!",
    BODY: {
        DAMAGE: 0.6,
        HEALTH: 0.4,
    },
    COLOR: "red",
    GUNS: [
        {
            POSITION: [1, 3, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.statNoRange,
                ]),
                TYPE: MC_functions.create(MC_functions.createFireRange, "red", 4),
            },
        },
    ],
}
Class[MC_names.HTTYD[3]] = {
    UPGRADE_TOOLTIP: "Who's my little princess?",
    BODY: {
        DAMAGE: 0.5,
        HEALTH: 0.5,
    },
    COLOR: "brown",
    GUNS: [
        {
            POSITION: [1, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                ]),
                TYPE: MC_functions.create(MC_functions.createBlast, "orange", 28),
            },
        },
    ],
}
Class[MC_names.HTTYD[4]] = {
    UPGRADE_TOOLTIP: "I would never torture that dragon.",
    BODY: {
        DAMAGE: 0.4,
        HEALTH: 0.4,
        SPEED: 0.2,
    },
    COLOR: "purple",
    GUNS: [
        {
            POSITION: [1, 4, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statPounder,
                    MC_stats.statPower,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.statNoRecoil,
                    MC_stats.speedStat(5.8),
                ]),
                TYPE: MC_functions.create(MC_functions.createLaser, "blue"),
            },
        },
    ],
}
Class[MC_names.TITANS[0]] = {
    UPGRADE_TOOLTIP: "Godzilla have been awakened.",
    BODY: {
        HEALTH: 0.8,
        DAMAGE: 0.2,
    },
    SIZE: 38,
    COLOR: "#cb42f5",
    GUNS: [
        {
            POSITION: [1, 2.6, 1, 1, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statReload,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.statNoRecoil,
                    MC_stats.speedStat(6),
                ]),
                TYPE: MC_functions.create(MC_functions.createLaser, "#cb42f5"),
            },
        },
    ],
}
Class[MC_names.TITANS[1]] = {
    UPGRADE_TOOLTIP: "She isn't as strong as you might think, and no, not outside...",
    BODY: {
        HEALTH: 0.6,
        DAMAGE: 0.4,
    },
    SIZE: 38,
    COLOR: "#b0ceff",
    GUNS: [
        {
            POSITION: [1, 2.6, 1, 1, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    MC_stats.statMain,
                    MC_stats.statWeak,
                    MC_stats.statReload,
                    MC_stats.statNoRange,
                    MC_stats.statNoSpray,
                    MC_stats.statNoRecoil,
                    MC_stats.speedStat(6),
                ]),
                TYPE: MC_functions.create(MC_functions.createLaser, {
                    POISON: 40,
                    DAMAGE: 1.2,
                }, "#b0ceff"),
            },
        },
    ],
}

// Handlers
for (let key in MC_names) {
    if (MC_names.hasOwnProperty(key)) {
        for (let i = 0; i < MC_names[key].length; i++) {
            let name = MC_names[key][i],
                e = Class[name];

            if (!MC_functions.isCompatible(e.BODY)) throw new Error(`BODY in ${name} class isn't compatible`);

            e.UPGRADE_TOOLTIP += " Art by Felyn_de_fens";
            e.SHAPE = MC_assets + `/${name}.png`;
            e.PARENT = "genericTank";
            e.LABEL = name;
            e.LEVEL_CAP = 120;
            e.LEVEL = 120;
            e.SKILL_CAP = Array(10).fill(smshskl);
            e.LEVEL_SKILL_POINT_FUNCTION = level => {
                if (level <= 120) return 1;
                return 0;
            };
            if (!e.SIZE) e.SIZE = 20;
            if (MC_different_team) e.TEAM = -10;
            for (let stat in MC_base) {
                if (MC_base.hasOwnProperty(stat)) {
                    if (e.BODY.hasOwnProperty(stat)) {
                        e.BODY[stat] = e.BODY[stat] * MC_base[stat] * MC_definitions.bodyScale[key];
                    }
                    else e.BODY[stat] = MC_base[stat];
                }
            }
            e.ON = [];
        }
    }
}
for (let i = 0; i < MC_names.HTTYD.length; i++) {
    let name = MC_names.HTTYD[i],
        e = Class[name];

    e.ON.push({
        event: "fire",
        handler: ({ body }) => {
            body._charges--;
            if (!body._charges) MC_functions.disableGuns(body.guns);
        },
    }, {
        event: "tick",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body.guns)) {
                if (body._charges < body._maxCharges && !body._tickTime) {
                    body._tickTime = MC_definitions.ticks;
                    body._charges++;
                    if (body._charges >= body._maxCharges) MC_functions.enableGuns(body.guns);
                }
                if (body._tickTime) body._tickTime--;
            }
        },
    }, {
        event: "define",
        handler: ({ body }) => {
            body._maxCharges = MC_definitions.HTTYD_charges[i];
            body._tickTime = MC_definitions.ticks;
            body._charges = body._maxCharges;
            MC_functions.initGuns(body.guns);
            MC_functions.handler(name);
            if (MC_definitions.HTTYD_welcome[i]) sockets.broadcast(MC_definitions.HTTYD_welcome[i]);
        },
    });
}
for (let i = 0; i < MC_names.TITANS.length; i++) {
    let name = MC_names.TITANS[i],
        e = Class[name];

    MC_functions.animation(e, e.COLOR, 0.6, 16, MC_animation.OUT, false);
    MC_functions.animation(e, e.COLOR, 0.6, 16, MC_animation.INSIDE, true);
    e.ON.push({
        event: "fire",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body.guns, "secondary") && body._tickTime) {
                body._tickTime--;
            }
        },
    }, {
        event: "tick",
        handler: ({ body }) => {
            if (MC_functions.isGunsDisabled(body.guns, "main") && body._tickTime) {
                body._tickTime--;
            }
            if (!body._tickTime) {
                body._tickTime = MC_definitions.ticks;
                if (MC_functions.isGunsDisabled(body.guns, "main")) {
                    MC_functions.disableGuns(body.guns, "secondary");
                    MC_functions.enableGuns(body.guns, "main");
                } else {
                    MC_functions.enableGuns(body.guns, "secondary");
                    MC_functions.disableGuns(body.guns, "main");
                }
            }
        },
    }, {
        event: "define",
        handler: ({ body }) => {
            body._tickTime = MC_definitions.ticks;
            MC_functions.initGuns(body.guns, ["main", 1 + 16], "secondary");
            MC_functions.disableGuns(body.guns, "main");
            MC_functions.handler(name);
        },
    });
}

Class.MC = menu("Mythic Creatures", "black", 0);
Class.MC_developer = menu("MC Developer Edition", "black", 0);
Class.MC.UPGRADES_TIER_0 = ["MC_developer"];
Class.MC_developer.UPGRADES_TIER_0 = [];

for (let i = 0; i < MC_petals.length; i++) {
    const petal = MC_petals[i];
    Class[`MC_petal${petal}`] = MC_functions.deepCopy(Class["MC_petal"]);
    Class[`MC_petal${petal}`].COLOR = `${petal.toLowerCase()}Stone`;
}

for (let key in MC_names) {
    if (MC_names.hasOwnProperty(key)) {
        for (let i = 0; i < MC_names[key].length; i++) {
            let name = MC_names[key][i];
            Class[`${name}_developer`] = Class[MC_functions.create(MC_functions.createDeveloper, name)];
        }
        Class.MC.UPGRADES_TIER_0.push(...MC_names[key]);
        MC_names[key].forEach(object => Class.MC_developer.UPGRADES_TIER_0.push(`${object}_developer`));
    }
}
Class.addons.UPGRADES_TIER_0.push("MC");

console.log('Mythic Creatures [MC] addon has been registered.');
