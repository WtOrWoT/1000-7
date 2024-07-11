const { combineStats, menu, addAura, makeDeco } = require('../facilitators.js');
const { base, gunCalcNames, basePolygonDamage, basePolygonHealth, dfltskl, statnames } = require('../constants.js');
const g = require('../gunvals.js');

Class.bulletColor = makeDeco(0, "#e03e41")
Class.bulletAura = {
  PARENT: "bullet",
  MOTION_TYPE: "withMaster",
  CLEAR_ON_MASTER_UPGRADE: true,
  BODY:{
	  HEALTH: base.HEALTH * 1000,
	  DAMAGE: 0
  },
  ON: [{
	  event: 'tick',
	  handler: ({body}) => {
			  body.SIZE += 5
			  if (body.SIZE >= 100) {body.kill()}


	  }
  },
],
TURRETS: [
  {
	  POSITION: [20, 0, 0, 0, 0, 1],
	  TYPE: ["bulletColor"],
  },
],
}

Class.EliteOverlord = {
   PARENT: 'genericTank',
   LABEL: 'Elite Overlord',
   TYPE: 'Elite Crasher',
   SHAPE: 3,
   DAMAGE_CLASS: 5,
   FACING_TYPE: 'autospin',
   SIZE: 40,
   MAX_CHILDREN: 36,
   DAMAGE_EFFECTS: true,
   COLOR: 5,
   BODY: {
      ACCELERATION: base.ACCEL * 9,
      SPEED: base.SPEED * 4,
      HEALTH: base.HEALTH * 10,
      DAMAGE: base.DAMAGE * 7,
      PENETRATION: base.PENETRATION * 5,
      SHIELD: base.SHIELD * 2,
      REGEN: base.REGEN * 3,
      FOV: base.FOV * 3,
      DENSITY: base.DENSITY * 2,
      PUSHABLE: 0.3,
   },
   GUNS: [ {
         POSITION: [ 20, 5, 2, -2, 0, 60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 20, 5, 2, -2, 0, -60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 20, 5, 2, -2, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, 5, 67.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, 5, -52.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, 5, -172.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, -5, 52.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, -5, -67.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, 2, 2, -5, 172.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "turretedDrone",
         }, }, {
         POSITION: [ 10, 2, -4, 2, 0, 60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 10, 2, -4, 2, 0, -60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 10, 2, -4, 2, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, -60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "minion",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "minion",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, 60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "minion",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, 120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "drone",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "drone",
         }, }, {
         POSITION: [ 10, 2, 3, 1, 0, -112.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.engineer]),
            TYPE: "drone",
         }, }, 
     ],
};
Class.randombullshitgo = {
   PARENT: 'genericTank',
   LABEL: 'RANDOM BULLSHIT GO!',
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "flare",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "swarm",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "bee",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "growBullet",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "spinmissile",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "pillbox",
         }, }, {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.fast]),
            TYPE: "hive",
         }, }, 
     ],
};
Class.vulcan = {
   PARENT: 'genericTank',
   LABEL: 'Vulcan',
   HAS_NO_RECOIL: true,
   GUNS: [ {
         POSITION: [ 50, 0.00002, 1, 0, 7, 0, 0.1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 50, 0.00002, 1, 0, -7, 0, 0.4, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 50, 0.00002, 1, 0, 4, 0, 0.2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 50, 0.00002, 1, 0, -4, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 50, 0.00002, 1, 0, 1, 0, 0.3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 50, 0.00002, 1, 0, -1, 0, 0.6, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 2, 15, 1, 40, 0, 0, 0.6, ],
         }, {
         POSITION: [ 2, 15, 1, 30, 0, 0, 0.9, ],
         }, {
         POSITION: [ 2, 15, 1, 20, 0, -0.5, 0.2, ],
         }, 
     ],
};
Class.thotdestroyer = {
   PARENT: 'genericTank',
   LABEL: 'Thot Destroyer',
   BODY: {
      ACCELERATION: base.ACCEL * 100,
      SPEED: base.SPEED * 5,
      HEALTH: base.HEALTH * 100,
      DAMAGE: base.DAMAGE * 1000,
      PENETRATION: base.PENETRATION * 1000,
      SHIELD: base.SHIELD * 12,
      REGEN: base.REGEN * 9,
      FOV: base.FOV * 2,
      DENSITY: base.DENSITY,
      PUSHABLE: 1,
      HETERO: 3,
   },
   GUNS: [ {
         POSITION: [ 50, 21, 3, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet",
         }, }, 
     ],
};
Class.bulletAura2 = {
	PARENT: "bullet",
	MOTION_TYPE: "withMaster",
	CLEAR_ON_MASTER_UPGRADE: true,
	BODY:{
		HEALTH: base.HEALTH * 1000,
		DAMAGE: 25,
		DENSITY: 0,
		SPEED: 0,
		PUSHABILITY: 0,
	},
	ON: [{
		event: 'tick',
		handler: ({body}) => {
				body.SIZE += 5
				if (body.SIZE >= 100) {body.kill()}


		}
	},
  ],
  TURRETS: [
	{
		POSITION: [20, 0, 0, 0, 0, 1],
		TYPE: ["bulletColor"],
	},
],
  }
Class.bulletAuraAnnih = {
	PARENT: "bullet",
	MOTION_TYPE: "withMaster",
	CLEAR_ON_MASTER_UPGRADE: true,
	BODY:{
		HEALTH: base.HEALTH * 100000000000,
		DAMAGE: 2500,
		DENSITY: 0,
		SPEED: 0,
		PUSHABILITY: 0,
	},
	ON: [{
		event: 'tick',
		handler: ({body}) => {
				body.SIZE += 5
				if (body.SIZE >= 1500) {body.kill()}


		}
	},
  ],
  TURRETS: [
	{
		POSITION: [20, 0, 0, 0, 0, 1],
		TYPE: ["bulletColor"],
	},
],
  }
Class.bulletAuraAnnih2 = {
	PARENT: "bullet",
	MOTION_TYPE: "withMaster",
	CLEAR_ON_MASTER_UPGRADE: true,
	BODY:{
		HEALTH: base.HEALTH * 100000000000,
		DAMAGE: 25000,
		DENSITY: 0,
		SPEED: 0,
		PUSHABILITY: 0,
	},
	ON: [{
		event: 'tick',
		handler: ({body}) => {
				body.SIZE += 5
				if (body.SIZE = 5500) {body.kill()}


		}
	},
  ],
  TURRETS: [
	{
		POSITION: [20, 0, 0, 0, 0, 1],
		TYPE: ["bulletColor"],
	},
],
  }
// Menus
Class.developer = {
    PARENT: "genericTank",
    LABEL: "Developer",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    DRAW_HEALTH: true,
    ARENA_CLOSER: false,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    GUNS: [
        {
          POSITION: [2, 14, 1, 2.5, 0, 0, 0],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 0.2, recoil: 0}]),
				  TYPE: [Class.bulletAura2,{ALPHA:0.1}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 4, 4, 4],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 5, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 6, 6, 6],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 10, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih2,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet",
                ALT_FIRE: false
}, },
], };
Class.custombosses = {
    PARENT: "genericTank",
    LABEL: "Custom Bosses",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    COLOR: 36,
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    DRAW_HEALTH: true,
    ARENA_CLOSER: false,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    GUNS: [
        {
          POSITION: [2, 14, 1, 2.5, 0, 0, 0],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 0.2, recoil: 0}]),
				  TYPE: [Class.bulletAura2,{ALPHA:0.1}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 4, 4, 4],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 5, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 6, 6, 6],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 10, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih2,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet",
                ALT_FIRE: false
}, },
], };
Class.tanktests = {
    PARENT: "genericTank",
    LABEL: "Tank Tests",
    BODY: {
        SHIELD: 1000,
        REGEN: 10,
        HEALTH: 100,
        DAMAGE: 10,
        DENSITY: 20,
        FOV: 2,
    },
    SKILL_CAP: Array(10).fill(dfltskl),
    IGNORED_BY_AI: true,
    RESET_CHILDREN: true,
    ACCEPTS_SCORE: true,
    CAN_BE_ON_LEADERBOARD: true,
    DRAW_HEALTH: true,
    ARENA_CLOSER: false,
    INVISIBLE: [0, 0],
    ALPHA: [0, 1],
    HITS_OWN_TYPE: "hardOnlyTanks",
    GUNS: [
        {
          POSITION: [2, 14, 1, 2.5, 0, 0, 0],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 0.2, recoil: 0}]),
				  TYPE: [Class.bulletAura2,{ALPHA:0.1}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 4, 4, 4],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 5, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
        POSITION: [2, 30, 1, 2.5, 6, 6, 6],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 10, recoil: 0}]),
				  TYPE: [Class.bulletAuraAnnih2,{ALPHA:0.5}],
				  ALT_FIRE: true,
				  SYNCS_SKILLS: true,
          ALPHA: 0,
				  AUTOFIRE: false,
				  IDENTIFIER: 'auraGun'
				},
			  },
			{
            POSITION: [18, 10, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                TYPE: "developerBullet",
                ALT_FIRE: false
}, },
], };
Class.bulletColor2 = makeDeco(0, "#FFFFFF")
Class.auraShrink = {
	PARENT: "bullet",
	MOTION_TYPE: "withMaster",
	CLEAR_ON_MASTER_UPGRADE: true,
	BODY:{
		HEALTH: base.HEALTH * 1000,
		DAMAGE: 0,
		DENSITY: 0,
		SPEED: 0,
		PUSHABILITY: 0,
	},
	ON: [{
		event: 'tick',
		handler: ({body}) => {
				body.SIZE -= 5
				if (body.SIZE <= 5) {body.kill()}


		}
	},
  ],
  TURRETS: [
	{
		POSITION: [20, 0, 0, 0, 0, 1],
		TYPE: ["bulletColor2"],
	},
],
  }
Class.auraShrinkBullet = {
	PARENT: "bullet",
	CLEAR_ON_MASTER_UPGRADE: true,
	BODY:{
		DENSITY: 0,
		PUSHABILITY: 0,
	},
	ON: [{
		event: 'tick',
		handler: ({body}) => {
				body.SIZE -= 5
				if (body.SIZE <= 5) {body.kill()}


		}
	},
  ],
  TURRETS: [
	{
		POSITION: [20, 0, 0, 0, 0, 1],
		TYPE: ["bulletColor2"],
	},
],
  }
Class.suckdown = {
            PARENT: ['genericTank'],
            LABEL: "portal",
            COLOR: 19,
            GUNS: [
        {
          POSITION: [2, 14, 1, 2.5, 0, 0, 0],
				PROPERTIES: {
				  SHOOT_SETTINGS: combineStats([g.basic,{speed: 0, maxSpeed: 0, reload: 0.2, recoil: 0,size: 10}]),
				  TYPE: [Class.auraShrink,{ALPHA:0.5}],
				  SYNCS_SKILLS: true,
				  AUTOFIRE: true,
				  IDENTIFIER: 'auraGun'
          },}],
            ON: [
            {
             event: "tick",
             handler: ({ body }) => {
               for (let instance of entities) {
                     let diffX = instance.x - body.x,
                         diffY = instance.y - body.y,
                         dist2 = diffX ** 2 + diffY ** 2;
                     if (dist2 <= ((body.size / 2)*250) ** 2) {
                     if ((instance.team != body.team || (instance.type == "undertowEffect" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "undertowEffect") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                        forceMulti = (20 / instance.size)
                     }      
                     else {
                        forceMulti = (20 / instance.size)
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
Class.ubertowBullet = {
            PARENT: ['bullet'],
            COLOR: 19,
            ON: [
            {
             event: "tick",
             handler: ({ body }) => {
               for (let instance of entities) {
                     let diffX = instance.x - body.x,
                         diffY = instance.y - body.y,
                         dist2 = diffX ** 2 + diffY ** 2;
                     if (dist2 <= ((body.size / 2)*250) ** 2) {
                     if ((instance.team != body.team || (instance.type == "" && instance.master.id == body.master.id)) && instance.type != "wall" && instance.isTurret != true) {
                     if (instance.type == "") {
                        forceMulti = 1
                     }
                     else if (instance.type == "food") {
                        forceMulti = (20 / instance.size)
                     }      
                     else {
                        forceMulti = (20 / instance.size)
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
         Class.ubertow = {
            PARENT: "genericTank",
            LABEL: "Ubertow",
            DANGER: 6,
            COLOR: 19,
            GUNS: [
                {
                    POSITION: [14, 12, 0.8, 0, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { size: 0.8, reload: 1.2, damage: 200000, health: 5000000,range: 20 }]),
                        TYPE: 'ubertowBullet'
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
Class.spectator = {
    PARENT: "genericTank",
    LABEL: "Spectator",
    ALPHA: 0,
    IGNORED_BY_AI: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    DRAW_HEALTH: false,
    HITS_OWN_TYPE: "never",
    ARENA_CLOSER: true,
    SKILL_CAP: [0, 0, 0, 0, 0, 0, 0, 0, 0, 255],
    BODY: {
        SPEED: 5,
        FOV: 2.5,
        DAMAGE: 0,
        HEALTH: 1e100,
        SHIELD: 1e100,
        REGEN: 1e100,
    }
}
Class.omegaPred = {
   PARENT: "genericTank",
   LABEL: 'Omega Predator',
   DANGER: 900,
    BODY: {
        SPEED: base.SPEED * 0.5,
        FOV: base.FOV * 2
    },
    CONTROLLERS: ["zoom"],
    TOOLTIP: "Hold right click to zoom.",
   GUNS: [ {
         POSITION: [ 50, 4, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.hunterSecondary , g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 46, 8, 1, 0, 0, 0, 0.15, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 42, 12, 1, 0, 0, 0, 0.3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 38, 16, 1, 0, 0, 0, 0.415, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 34, 19, 1, 0, 0, 0, 0.53, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 30, 22, 1, 0, 0, 0, 0.6415, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 26, 26, 1, 0, 0, 0, 0.743, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 22, 32, 1, 0, 0, 0, 0.893, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 18, 37, 1, 0, 0, 0, 1.043, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 14, 44, 1, 0, 0, 0, 1.193, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 10, 50, 1, 0, 0, 0, 1.343, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunterSecondary, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 6, 57, 1, 0, 0, 0, 1.493, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 6, 28, 2, -7, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 13, 2, -14.5, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 13, 1, -21.5, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 0, 1, -21.5, 0, 0, 0, ],
         }, {
         POSITION: [ 6, 0, 1, -21.5, 4, 0, 0, ],
         }, {
         POSITION: [ 6, 0, 1, -21.5, -4, 0, 0, ],
         }, 
     ],
};

Class.tank = {
   PARENT: "genericTank",
   LABEL: 'Tank',
   GUNS: [ {
         POSITION: [ 49, 8, 1, 0, 0, -90, 0, ],
         }, {
         POSITION: [ 49, 8, 1, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 47, 8, 1, -24, 22, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 47, 8, 1, -24, -22, 0, 2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 47, 8, 1, -24, 40, 0, 3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 47, 8, 1, -24, -40, 0, 4, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 47, 8, 1, -24, 31, 0, 5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 47, 8, 1, -24, -31, 0, 6, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.launcher]),
            TYPE: "minimissile"
         }, }, {
         POSITION: [ 27, 30, 1, -39, 31, 0, 0, ],
         }, {
         POSITION: [ 27, 30, 1, -39, -31, 0, 0, ],
         }, 
     ],
};
Class.ATWB = {
   PARENT: "genericTank",
   LABEL: 'A.T.W.B',
   SHAPE: 4,
   SIZE: 20,
   GUNS: [ 
     {
         POSITION: [ 18, 8, 1.5, -4, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 8, 1.5, 1, -15, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 8, 1.5, 1, 15, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 8, 1.5, 1, 30, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 13, 8, 1.5, 1, -30, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 14, 14, 1, -7, 15, 0, 0, ],
         }, {
         POSITION: [ 14, 14, 1, -7, -15, 0, 0, ],
         }, {
         POSITION: [ 14, 14, 1, -7, 30, 0, 0, ],
         }, {
         POSITION: [ 14, 14, 1, -7, -30, 0, 0, ],
         }, {
         POSITION: [ 8, 6, 1.5, -27, -28, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 6, 1.5, -27, 28, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 6, 1.5, -27, -16, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 8, 6, 1.5, -27, 16, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 4.5, 3.5, 1.5, -47, -17, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 4.5, 3.5, 1.5, -47, 17, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE:   "bullet",
         }, }, {
         POSITION: [ 4.5, 3.5, 1.5, -47, -25, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 4.5, 3.5, 1.5, -47, 25, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.machineGun,g.less_damage]),
            TYPE: "bullet",
         }, }, {
         POSITION: [ 11, 11, 1, -34, -28, 0, 0, ],
         }, {
         POSITION: [ 11, 11, 1, -34, 28, 0, 0, ],
         }, {
         POSITION: [ 11, 11, 1, -34, -16, 0, 0, ],
         }, {
         POSITION: [ 11, 11, 1, -34, 16, 0, 0, ],
         }, {
         POSITION: [ 11, 11, 1, -18, 0, 0, 0, ],
         }, {
         POSITION: [ 11, 11, 1, -30, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 9, 1, -40, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, -30, 8, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, -30, -8, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, -26, 8, 0, 0, ],
         }, {
         POSITION: [ 3, 3, 1, -26, -8, 0, 0, ],
         }, {
         POSITION: [ 3, 4, 1, -34, 7.5, 0, 0, ],
         }, {
         POSITION: [ 3, 4, 1, -34, -7.5, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -48, 0, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, 17, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, -17, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, 25, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, -25, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, 9, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -52, -9, 0, 0, ],
         }, {
         POSITION: [ 7, 9, 1, -52, 0, 0, 0, ],
         }, {
         POSITION: [ 7, 7, 1, -56, 0, 0, 0, ],
         }, {
         POSITION: [ 7, 9, 1, -52, 0, 0, 0, ],
         }, 
     ],
};
Class.uberanger = {
   PARENT: "genericTank",
   LABEL: 'Uberanger',
   BODY: {
     FOV: 2.55
   },
   GUNS: [ {
         POSITION: [ 116, 8, 1, 2, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assassin,g.railg]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 17, 19, 1, -2, 0, 0.5, 0, ],
         }, {
         POSITION: [ 9.6, 17, -1.1, 15.5, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 17, 1, 26, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 17, 1.1, 36, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 19, 1, 46, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 13, -1.5, 56, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 13, 1, 66, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 11, -1.2, 75, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 9, -1.2, 84, 0, 0, 0, ],
         }, {
         POSITION: [ 9.6, 9, 1.2, 94, 0, 0, 0, ],
         }, {
         POSITION: [ 4.6, 9, -1.2, 104, 0, 0, 0, ],
         }, 
     ],
};
Class.backgoof = {
    PARENT: "obstacleTurret",
    LABEL: 'Backshield',
    HITS_OWN_TYPE: 'hard',
    SHAPE: "https://cdn.discordapp.com/emojis/1197964726378975324.gif?size=48&quality=lossless&name=appearspin",
    COLOR: "#FF7F00"
};
Class.backboof = {
    PARENT: "genericTank",
    LABEL: 'Back',
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
        TYPE: "backgoof",
        VULNERABLE: true
    }]
};
Class.upgradeTurretT = {
    SHAPE: "https://cdn.glitch.global/685a20ef-2978-4ea9-99d3-22c08fcc025a/thumbnails%2Fgroup13.png?1715792183435",
    INDEPENDENT: true,
    CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]]
};
Class.upgradeTurretB = {
    SHAPE: "https://cdn.glitch.global/685a20ef-2978-4ea9-99d3-22c08fcc025a/thumbnails%2FGroup%2015.png?1715792828084",
    INDEPENDENT: true,
    CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]]
};
Class.arrasioTurret = {
    SHAPE: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000&format=jpeg&auto=webp",
    INDEPENDENT: true,
    CONTROLLERS: [["spin", { startAngle: Math.PI / 2, speed: 0, independent: true }]]
};
Class.bulletUpgrade = { 
    PARENT: ["bullet"],
    TURRETS: [{
        POSITION: [50, 0, 0, 0, 360, 0],
        TYPE: "upgradeTurretB"
    }]
};
Class.theupgraderanaway = {
    PARENT: "genericTank",
    LABEL: 'The Upgrade Ran Away!',
    DANGER: 7,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bulletUpgrade"
        }
    }],
    TURRETS: [{
        POSITION: [40, 0, 0, 0, 360, 0],
        TYPE: "upgradeTurretT"
    }]
};
Class.arrasioranaway = {
    PARENT: "genericTank",
    LABEL: 'The Arras Io Ran Away!',
    DANGER: 7,
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bulletUpgrade"
        }
    }],
    TURRETS: [{
        POSITION: [40, 0, 0, 0, 360, 1],
        TYPE: "arrasioTurret"
    }]
};
Class.BOMB = {
    PARENT: "bullet",
    LABEL: "Bomb",
    SHAPE: "M -0.772 0.443 C -0.516 0.443 -0.483 0.434 -0.407 0.358 C -0.326 0.277 -0.321 0.277 -0.191 0.339 C -0.09 0.389 0.036 0.405 0.381 0.405 L 0.821 0.405 L 0.823 -0.017 C 0.823 -0.248 0.813 -0.447 0.801 -0.46 C 0.789 -0.472 0.583 -0.481 0.341 -0.478 C 0.007 -0.476 -0.125 -0.461 -0.212 -0.414 C -0.318 -0.357 -0.33 -0.357 -0.4 -0.427 C -0.465 -0.492 -0.513 -0.501 -0.782 -0.5 C -1.042 -0.5 -1.093 -0.491 -1.104 -0.442 C -1.111 -0.41 -1.097 -0.359 -1.076 -0.328 C -1.021 -0.255 -1.014 0.226 -1.068 0.25 C -1.116 0.272 -1.127 0.368 -1.085 0.412 C -1.068 0.428 -0.925 0.443 -0.772 0.443 Z M -0.793 -0.04 C -0.793 -0.105 -0.77 -0.145 -0.689 -0.215 C -0.601 -0.294 -0.579 -0.301 -0.531 -0.263 C -0.454 -0.205 -0.459 -0.146 -0.545 -0.126 C -0.606 -0.111 -0.617 -0.099 -0.617 -0.04 C -0.617 0.017 -0.602 0.035 -0.544 0.057 C -0.455 0.09 -0.453 0.117 -0.529 0.192 C -0.584 0.249 -0.591 0.246 -0.689 0.148 C -0.766 0.071 -0.793 0.024 -0.793 -0.04 Z M 1.037 0.34 C 1.105 0.324 1.426 0.005 1.416 -0.04 C 1.392 -0.147 1.027 -0.458 0.981 -0.411 C 0.963 -0.394 0.963 0.317 0.98 0.336 C 0.988 0.344 1.014 0.347 1.037 0.34 Z",
    BODY: {
        RANGE: 120
    },
    GUNS: (() => {
        let e = [{
            POSITION: [14, 6, 1, 0, 0, 180, 0],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
                ALPHA: 0,
                TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                STAT_CALCULATOR: gunCalcNames.thruster
            }
        }];
        for (let T = 0; T < 30; T++) e.push({
            POSITION: [3, 5, 1, 0, 0, (360 / 30) * T, 1 / 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic,g.power,g.bigger]),
                TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
            }
        });
        return e
    })()
};
Class.bomberPlane = {
   PARENT: "genericTank",
   LABEL: 'Bomber Plane',
   SIZE: 20,
   SHAPE: "M -0.117 4.397 C -0.191 4.469 -0.339 4.563 -0.575 4.503 C -0.936 4.411 -0.943 3.874 -0.943 3.874 L -0.943 1.217 L -1.633 1.12 C -1.675 1.114 -1.675 1.053 -1.633 1.047 L -0.943 0.949 L -0.943 0.2 C -1.721 0.178 -2.504 0.149 -3.293 0.112 C -3.339 0.175 -3.415 0.292 -3.466 0.444 C -3.545 0.674 -3.72 1.377 -4.186 1.434 C -4.186 1.434 -4.4 1.479 -4.406 1.186 C -4.411 0.894 -4.406 0.41 -4.406 0.41 L -4.093 0.072 C -4.172 0.068 -4.251 0.064 -4.33 0.06 C -4.481 0.06 -4.481 -0.07 -4.33 -0.07 C -4.25 -0.075 -4.17 -0.08 -4.09 -0.084 L -4.406 -0.425 C -4.406 -0.425 -4.411 -0.909 -4.406 -1.201 C -4.4 -1.494 -4.186 -1.449 -4.186 -1.449 C -3.72 -1.392 -3.545 -0.689 -3.466 -0.459 C -3.415 -0.308 -3.34 -0.191 -3.294 -0.128 C -2.489 -0.17 -1.704 -0.202 -0.943 -0.222 L -0.943 -0.949 L -1.633 -1.046 C -1.675 -1.052 -1.675 -1.113 -1.633 -1.119 L -0.943 -1.217 L -0.943 -3.873 C -0.943 -3.873 -0.936 -4.411 -0.575 -4.503 C -0.339 -4.563 -0.191 -4.469 -0.117 -4.396 C -0.085 -4.365 -0.06 -4.327 -0.042 -4.285 C 0.103 -3.935 1.136 -1.442 1.164 -1.371 C 1.166 -1.364 1.169 -1.339 1.171 -1.302 L 1.607 -1.302 C 1.655 -1.302 1.695 -1.271 1.711 -1.229 L 1.896 -1.229 C 1.929 -1.229 1.956 -1.208 1.967 -1.178 L 2.141 -1.178 C 2.17 -1.178 2.194 -1.158 2.201 -1.131 C 2.204 -1.131 2.208 -1.131 2.211 -1.131 C 2.267 -1.131 2.312 -1.11 2.312 -1.083 C 2.312 -1.056 2.267 -1.034 2.211 -1.034 C 2.208 -1.034 2.204 -1.035 2.201 -1.035 C 2.194 -1.007 2.17 -0.987 2.141 -0.987 L 1.967 -0.987 C 1.956 -0.958 1.929 -0.937 1.896 -0.937 L 1.711 -0.937 C 1.695 -0.894 1.655 -0.864 1.607 -0.864 L 1.186 -0.864 C 1.192 -0.637 1.195 -0.389 1.197 -0.245 C 1.521 -0.243 1.839 -0.238 2.149 -0.23 C 2.171 -0.229 2.19 -0.216 2.199 -0.197 L 2.272 -0.197 C 2.295 -0.197 2.315 -0.186 2.327 -0.168 L 2.461 -0.168 C 2.481 -0.168 2.498 -0.154 2.504 -0.136 L 2.657 -0.136 C 2.679 -0.136 2.697 -0.121 2.702 -0.1 C 2.703 -0.1 2.704 -0.1 2.705 -0.1 C 2.772 -0.1 2.827 -0.057 2.827 -0.003 C 2.827 0.051 2.772 0.095 2.705 0.095 C 2.703 0.095 2.702 0.095 2.7 0.094 C 2.693 0.111 2.676 0.123 2.657 0.123 L 2.505 0.123 C 2.502 0.145 2.483 0.161 2.461 0.161 L 2.327 0.161 C 2.315 0.179 2.295 0.191 2.272 0.191 L 2.204 0.191 C 2.2 0.218 2.176 0.239 2.148 0.24 C 1.832 0.24 1.515 0.239 1.198 0.237 C 1.196 0.379 1.192 0.633 1.186 0.864 L 1.607 0.864 C 1.655 0.864 1.695 0.895 1.711 0.937 L 1.896 0.937 C 1.929 0.937 1.956 0.958 1.967 0.988 L 2.141 0.988 C 2.17 0.988 2.194 1.008 2.201 1.035 C 2.204 1.035 2.208 1.035 2.211 1.035 C 2.267 1.035 2.312 1.056 2.312 1.083 C 2.312 1.11 2.267 1.132 2.211 1.132 C 2.208 1.132 2.204 1.132 2.201 1.131 C 2.194 1.159 2.17 1.179 2.141 1.179 L 1.967 1.179 C 1.956 1.208 1.929 1.229 1.896 1.229 L 1.711 1.229 C 1.695 1.272 1.655 1.302 1.607 1.302 L 1.171 1.302 C 1.169 1.34 1.166 1.364 1.164 1.371 C 1.136 1.443 0.103 3.936 -0.042 4.286 C -0.06 4.327 -0.085 4.365 -0.117 4.397 Z",
   GUNS: [ {
         POSITION: [ 18, 5, 1.2, -8, 13, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.machineGun,{recoil: 2, reload: 0.5}]),
            ALPHA: 0,
            TYPE: "bullet"
         }, }, {
         POSITION: [ 18, 5, 1.2, -8, -13, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.machineGun,{recoil: 2, reload: 0.5}]),
            ALPHA: 0,
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 5, 1, -4, 24, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.Nspeed,g.destroyerDominator,g.bigger]),
            ALPHA: 0,
            TYPE: "BOMB" //BOOOOMBS GO HERE
         }, }, {
         POSITION: [ 5, 5, 1, -4, -24, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.Nspeed,g.destroyerDominator,g.bigger]),
            ALPHA: 0,
            TYPE: "BOMB"
         }, }, 
     ],
};
Class.Headbutter = {
   PARENT: "genericTank",
   LABEL: 'Headbutter',
   SHAPE: 3,
   SIZE: 33,
   COLOR: 16,
   BODY: {
      ACCELERATION: base.ACCEL * 3,
      SPEED: base.SPEED * 3,
      HEALTH: base.HEALTH * 5,
      DAMAGE: base.DAMAGE * 2,
      FOV: base.FOV * 1.2,
      PUSHABILITY: 0.5,
   },
   GUNS: [ {
         POSITION: [ 15, 17.5, 0, -5, 9, 0, 0, ],
         }, {
         POSITION: [ 15, 17.5, 0, -5, -9, 0, 0, ],
         }, {
         POSITION: [ -15, 17.5, 0, 10, -18, 0, 0, ],
         }, {
         POSITION: [ -15, 17.5, 0, 10, 18, 0, 0, ],
         }, {
         POSITION: [ 15, 17.5, 0, -20, 0, 0, 0, ],
         }, {
         POSITION: [ 15, 17.5, 0, -25.5, 8.6, 60, 0, ],
         }, {
         POSITION: [ 15, 17.5, 0, -25.5, -8.6, -60, 0, ],
         }, {
         POSITION: [ 4, 35.5, 1, -24.56, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thrust_lower_reload]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -16.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 16.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -13.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 13.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -10.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 10.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -7.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 7.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -4.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 4.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, -1.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 1.2, 10.3, 1.8, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 7, 1.2, 5.5, 19, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thrust_more_reload]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 7, 1.2, 5.5, -19, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thrust_more_reload]),
            TYPE: "bullet"
         }, }, 
     ],
};
Class.rpgRocketSpam = {
    PARENT: "bullet",
    LABEL: 'Rocket',
    SHAPE: 0,// no svg cuz too laggy
    GUNS: [{
        POSITION: [16.5, 10, 1.5, 0, 0, 180, 5],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic,g.machineGun]),
            TYPE: ["bullet", {
                PERSISTS_AFTER_DEATH: false
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
for (let i = 0; i < 3; i++) Class.rpgRocketSpam.GUNS = Class.rpgRocketSpam.GUNS.concat({
    POSITION: [1, 2.5, 1, 0, 0, i * 3, 100],
    PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic,g.rpg_explosion]),
        TYPE: ["bullet", {
            PERSISTS_AFTER_DEATH: true,
            LABEL: 'Explosion'
        }],
        AUTOFIRE: true,
        SHOOT_ON_DEATH: true
    }
});

Class.antiTankMissileLauncherArm = {
    PARENT: ["genericTank"],
    COLOR: "grey",
    CONTROLLERS: ["mapTargetToGoal"],
    SKILL_CAP: Array(10).fill(25),
    SKILL: Array(10).fill(25),
    GUNS: [
        {
            POSITION: [ 37, 8, 1, -15, 6, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.op,g.less_speed_Nrecoil]),
            TYPE: "rpgRocketSpam"
         }, }, {
         POSITION: [ 37, 8, 1, -15, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.op,g.less_speed_Nrecoil]),
            TYPE: "rpgRocketSpam"
         }, }, {
         POSITION: [ 9, 4, 2, -25, 6, 0, 0, ],
         }, {
         POSITION: [ 9, 4, 2, -25, -6, 0, 0, ],
         }, {
         POSITION: [ 5, 9, 1.2, 23, 6, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake,g.op]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 9, 1.2, 23, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake,g.op]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 10, 1, 14, 6, 0, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 14, -6, 0, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 12, 6, -180, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 12, -6, 180, 0, ],
         }, 
     ],
}
Class.antiTankMissileLauncher = {
    PARENT: ["dominator"],
    LABEL: "Anti-Tank Missile Launcher",
    UPGRADE_LABEL: "A.T.M.L.",
    LEVEL: 45,
    BODY: {
        RESIST: 100,
        SPEED: 1.32,
        ACCELERATION: 0.8,
        HEALTH: 1e99,
        DAMAGE: 6,
        PENETRATION: 0.25,
        FOV: 1,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.4,
    },
    SKILL_CAP: Array(10).fill(25),
    SKILL: Array(10).fill(25),
    GUNS: [
        {
            POSITION: [22, 12, 0.8, 0, 0, 90, 0],
        },
        {
            POSITION: [22, 12, 0.8, 0, 0, 270, 0],
        },
        {
            POSITION: [ 37, 8, 1, -15, 6, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.op,g.less_speed_Nrecoil]),
            TYPE: "rpgRocketSpam"
         }, }, {
         POSITION: [ 37, 8, 1, -15, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.op,g.less_speed_Nrecoil]),
            TYPE: "rpgRocketSpam"
         }, }, {
         POSITION: [ 9, 4, 2, -25, 6, 0, 0, ],
         }, {
         POSITION: [ 9, 4, 2, -25, -6, 0, 0, ],
         }, {
         POSITION: [ 5, 9, 1.2, 23, 6, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake,g.op]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 9, 1.2, 23, -6, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake,g.op]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 10, 1, 14, 6, 0, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 14, -6, 0, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 12, 6, -180, 0, ],
         }, {
         POSITION: [ 4, 10, 1, 12, -6, 180, 0, ],
         }, 
     ],
    TURRETS: [{
        POSITION: [15, 0, 27, 0, 180, 1],
        TYPE: ["antiTankMissileLauncherArm"]
    }, {
        POSITION: [15, 0, -27, 0, 180, 1],
        TYPE: ["antiTankMissileLauncherArm"]
    }, {
        POSITION: [23, 0, 0, 0, 360, 0],
        TYPE: ["dominationBody"]
    }]
}
Class.mlrs = {
   PARENT: "genericTank",
   LABEL: 'MLRS',
   GUNS: [ {
         POSITION: [ 74, 8, 1, 0, 0, -90, 0, ],
         }, {
         POSITION: [ 74, 8, 1, 0, 0, 90, 0, ],
         }, {
         POSITION: [ 19, 4, 1, -10, -16, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 16, 0, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -24, 0, 1.3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 24, 0, 1.6, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -32, 0, 2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 32, 0, 2.32, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -40, 0, 2.4, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 40, 0, 2.6, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -48, 0, 2.73, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 48, 0, 3.2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -56, 0, 3.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 56, 0, 3.8, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -64, 0, 4.2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 64, 0, 4.35, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, -72, 0, 4.53, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 19, 4, 1, -10, 72, 0, 4.76, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 37, 4, 1, -16, -6, 2, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 37, 4, 1, -16, 6, -2, 0.3, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 37, 4, -1.6, -16, 0, 0, 0.6, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.launcher, {recoil: 0, damage: 0.7}]),
            TYPE: "rocketeerMissile"
         }, }, {
         POSITION: [ 5, 18, -1.2, -21, 0, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 16, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -16, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 24, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -24, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 32, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -32, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 40, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -40, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 48, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -48, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 56, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -56, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 64, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -64, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, 72, 0, 0, ],
         }, {
         POSITION: [ 5, 4, -1.2, -14, -72, 0, 0, ],
         }, 
     ],
};
Class.superSnake = {
    PARENT: ["bullet"],
    LABEL: "Missile",
    TYPE: "swarm",
    MOTION_TYPE: "swarm",
    FACING_TYPE: "smoothWithMotion",
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    INDEPENDENT: true,
    BODY: {
        FOV: base.FOV * 2
    },
    TURRETS: [{/** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: ["genericTank", {COLOR: "red"}],
    }],
    GUNS: [{/* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.4, 8, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.1 }]),
            TYPE: ["semitransparentBullet", { PERSISTS_AFTER_DEATH: true }],
        }
    },{
        POSITION: [10, 12, 0.8, 8, 0, 180, 0.5],
        PROPERTIES: {
            AUTOFIRE: true,
            NEGATIVE_RECOIL: true,
            STAT_CALCULATOR: gunCalcNames.thruster,
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.1 }]),
            TYPE: ["semitransparentBullet", { PERSISTS_AFTER_DEATH: true }] 
        }
    },...Array(16).fill().map((_, i)=>({
        POSITION: [0, (i % 4) + 1, 0, 0, 0, 0, 9999],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, { spray: 1e6, recoil: 0, range: 0.5 }]),
            TYPE: ["bullet", { PERSISTS_AFTER_DEATH: true }],
            SHOOT_ON_DEATH: true
        },
    }))]
};
Class.supersnaketesting = {
    PARENT: "genericTank",
    LABEL: "Cosmic Snake Missile Test",
    DANGER: 4,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "superSnake",
            }
        }
    ]
}
Class.snakedesigntest = {
   PARENT: "genericTank",
   LABEL: 'Cosmic Snake Launcher',
   GUNS: [ {
         POSITION: [ 25, 17, 0.4, 3, 0, 0, 0, ],
         }, {
         POSITION: [ 20, 19, 0.85, 3, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.predator, {range: 3}]),
            TYPE: "superSnake"
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
};
Class.thornTrapExplode = {
    PARENT: [Class.trap],
    LABEL: 'Thorn',
    FACING_TYPE: 'smoothWithMotion',
    BODY: {
      RANGE: 500 //dont change this please
    },
    SHAPE: [[-1,1],[-1,-1],[1.2,0]]
};
Class.thornyMissile = {
    PARENT: "bullet",
    LABEL: "Thorny Missile",
    BODY: {
        RANGE: 85
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
        for (let T = 0; T < 12; T++) e.push({
            POSITION: [0, 8, 1, 0, 0, (360 / 12) * T, 1 / 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: ["thornTrapExplode", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
            }
        });
        return e
    })()
};
Class.thornyLauncher = {
   PARENT: "genericTank",
   LABEL: 'Thorn Launcher',
   BODY: {
        DAMAGE: 20
    },
   GUNS: [ {
         POSITION: [ 4, 13, 1.3, 19, 0, 0, 0, ],
         }, {
         POSITION: [ 20, 18, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery]),
            TYPE: "thornyMissile"
         }, }, {
         POSITION: [ 2, 18, 1, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, 2.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, -2.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, 5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, -5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, 7.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15.8, -7.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, 7.5, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, -7.5, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, 5, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, -5, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, 2.5, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, -2.5, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, -13, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 18, 1, 18, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 10, 18, 1, 1.2, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder, g.artillery, g.artillery,g.fake]),
            TYPE: "bullet"
          }, }, {
         POSITION: [ 3, 5, 0, -13, 0, -105, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, 105, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, -75, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, 75, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, -45, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, 45, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, -15, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, 15, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, -142.5, 0, ],
         }, {
         POSITION: [ 3, 5, 0, -13, 0, 142.5, 0, ],
         }, 
     ],
};
Class.smallspikebullet = {
   PARENT: "bullet",
   LABEL: 'Small Spike Bullet',
   FACING_TYPE: 'turnWithSpeed',
   BODY: {
     DAMAGE: 25
     },
   GUNS: [ {
         POSITION: [ 18, 8, 0, -20, -6, 165, 0, ],
         }, {
         POSITION: [ 18, 8, 0, -20, -6, 105, 0, ],
         }, {
         POSITION: [ 18, 8, 0, -20, -6, 45, 0, ],
         }, {
         POSITION: [ 18, 8, 0, -20, -6, -7.5, 0, ],
         }, {
         POSITION: [ 18, 8, 0, -20, -6, -67.5, 0, ],
         }, {
         POSITION: [ 18, 8, 0, -20, -6, -127.5, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, 22.5, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, -30, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, -90, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, -157.5, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, 142.5, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -14, -6, 82.5, 0, ],
         }, 
     ],
};
Class.spikyBasic = {
   PARENT: "genericTank",
   LABEL: 'Spiky Basic',
   SIZE: 25,
   BODY: {
     DAMAGE: 30,
     HEALTH: 100
     },
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,{size : 0.9, speed: 1.3}]),
            TYPE: "smallspikebullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15, 3, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 2, 0, 15, -3, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 1.8, 0, 15, 1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2, 1.8, 0, 15, -1, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.2, 0.02, -99, 12, 2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.2, 0.02, -99, 12, -2, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.2, 0.019, -99, 12, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.2, 0.01, -99, 12, 3.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.2, 0.01, -99, 12, -3.5, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 12, 8, 1, -12, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 1, 8, 1, 17, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, 7.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, -7.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -15, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 15, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -37.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 37.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 60, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 75, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 90, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -105, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 105, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, -120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, 120, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 5, 18.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, -5, -18.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 0, 165, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 7, 7, 0, -12, 0, -165, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 2, 0, -12, 0, -172.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 3, 2, 0, -12, 0, 172.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 1, 1, 0, -11, 0, -176.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 1, 1, 0, -11, 0, 176.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 1, 0, -12, 0, -180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.fake]),
            TYPE: "bullet"
         }, }, 
     ],
};
Class.heavyCruiser = {
   PARENT: "genericTank",
   LABEL: 'Heavy Cruiser',
   GUNS: [ {
         POSITION: [ 7, 7.5, 0.6, 7, 4, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -4, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 14, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -14, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -24, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 24, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 34, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -34, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -44, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 44, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 54, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -54, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, -64, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 7, 7.5, 0.6, 7, 64, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: "swarm",
        STAT_CALCULATOR: gunCalcNames.swarm,
         }, }, {
         POSITION: [ 10, 30, 1, -1, 53, 0, 0, ],
         }, {
         POSITION: [ 10, 26, 1, -1, 23, 0, 0, ],
         }, {
         POSITION: [ 10, 26, 1, -1, -23, 0, 0, ],
         }, {
         POSITION: [ 10, 30, 1, -1, -53, 0, 0, ],
         }, {
         POSITION: [ 10, 136, 1, -13, 0, 0, 0, ],
         }, {
         POSITION: [ 10, 68, 2, -25, 0, 0, 0, ],
         }, 
     ],
};
Class.bosses = menu("Bosses")

Class.miscTanks = menu("Misc")
Class.betaTanks = menu("Beta Tanks")

Class.sentries = menu("Sentries")
Class.sentries.COLOR = "pink"
Class.sentries.UPGRADE_COLOR = "pink"
Class.sentries.SHAPE = 3.5
Class.sentries.TURRETS = [
    {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "genericEntity"
    }
]

Class.elites = menu("Elites")
Class.elites.COLOR = "pink"
Class.elites.UPGRADE_COLOR = "pink"
Class.elites.SHAPE = 3.5

Class.mysticals = menu("Mysticals")
Class.mysticals.COLOR = "gold"
Class.mysticals.UPGRADE_COLOR = "gold"
Class.mysticals.SHAPE = 4

Class.nesters = menu("Nesters")
Class.nesters.COLOR = "purple"
Class.nesters.UPGRADE_COLOR = "purple"
Class.nesters.SHAPE = 5.5

Class.rogues = menu("Rogues")
Class.rogues.COLOR = "darkGrey"
Class.rogues.UPGRADE_COLOR = "darkGrey"
Class.rogues.SHAPE = 6

Class.rammers = menu("Rammers")
Class.rammers.COLOR = "teal"
Class.rammers.UPGRADE_COLOR = "teal"
Class.rammers.TURRETS = [
    {
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: "smasherBody",
    }
]

Class.terrestrials = menu("Terrestrials")
Class.terrestrials.COLOR = "orange"
Class.terrestrials.UPGRADE_COLOR = "orange"
Class.terrestrials.SHAPE = 7

Class.celestials = menu("Celestials")
Class.celestials.COLOR = "lightGreen"
Class.celestials.UPGRADE_COLOR = "lightGreen"
Class.celestials.SHAPE = 9

Class.eternals = menu("Eternals")
Class.eternals.COLOR = "teal"
Class.eternals.UPGRADE_COLOR = "teal"
Class.eternals.SHAPE = 11

Class.devBosses = menu("Developers")
Class.devBosses.COLOR = "lightGreen"
Class.devBosses.UPGRADE_COLOR = "rainbow"
Class.devBosses.SHAPE = 4

Class.tanks = menu("Tanks")
Class.unavailable = menu("Unavailable")

Class.dominators = menu("Dominators")
Class.dominators.TURRETS = [
    {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: "dominationBody",
    }
]

Class.sanctuaries = menu("Sanctuaries")
Class.sanctuaries.TURRETS = [
    {
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: "dominationBody",
    },
        {
            POSITION: [13, 0, 0, 0, 360, 1],
            TYPE: "healerSymbol",
        }
]

// Generators
function compileMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let str = matrix[y][x],
            LABEL = str[0].toUpperCase() + str.slice(1).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
            code = str + 'Generator';
        Class[code] = matrix[y][x] = {
            PARENT: "spectator",
            LABEL,
            SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
            TURRETS: [{
                POSITION: [5 + y * 2, 0, 0, 0, 0, 1],
                TYPE: str,
            }],
            GUNS: [{
                POSITION: [14, 12, 1, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                    TYPE: "bullet"
                }
            }, {
                POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                    INDEPENDENT_CHILDREN: true,
                    TYPE: str
                },
            }],
        };
    }
}

function connectMatrix(matrix, matrix2Entrance) {
    let matrixWidth = matrix[0].length,
        matrixHeight = matrix.length;
    for (let x = 0; x < matrixWidth; x++) for (let y = 0; y < matrixHeight; y++) {
        let top = (y + matrixHeight - 1) % matrixHeight,
            bottom = (y + matrixHeight + 1) % matrixHeight,
            left = (x + matrixWidth - 1) % matrixWidth,
            right = (x + matrixWidth + 1) % matrixWidth,

        center = matrix[y     ][x    ];
        top    = matrix[top   ][x    ];
        bottom = matrix[bottom][x    ];
        left   = matrix[y     ][left ];
        right  = matrix[y     ][right];

        matrix[y][x].UPGRADES_TIER_0 = [
            "developer" ,  top    , "spectator",
             left       ,  center ,  right      ,
            "basic"     ,  bottom ,  matrix2Entrance
        ];
    }
}
let generatorMatrix = [
    [ "egg"           , "gem"                , "jewel"                  , "crasher"             , "sentry"               , "shinySentry"        , "EggRelic"           ],
    [ "square"        , "shinySquare"        , "legendarySquare"        , "shadowSquare"        , "rainbowSquare"        , "transSquare"        , "SquareRelic"        ],
    [ "triangle"      , "shinyTriangle"      , "legendaryTriangle"      , "shadowTriangle"      , "rainbowTriangle"      , "transTriangle"      , "TriangleRelic"      ],
    [ "pentagon"      , "shinyPentagon"      , "legendaryPentagon"      , "shadowPentagon"      , "rainbowPentagon"      , "transPentagon"      , "PentagonRelic"      ],
    [ "betaPentagon"  , "shinyBetaPentagon"  , "legendaryBetaPentagon"  , "shadowBetaPentagon"  , "rainbowBetaPentagon"  , "transBetaPentagon"  , "BetaPentagonRelic"  ],
    [ "alphaPentagon" , "shinyAlphaPentagon" , "legendaryAlphaPentagon" , "shadowAlphaPentagon" , "rainbowAlphaPentagon" , "transAlphaPentagon" , "AlphaPentagonRelic" ],
    [ "sphere"        , "cube"               , "tetrahedron"            , "octahedron"          , "dodecahedron"         , "icosahedron"        , "tesseract"          ],
],

gemRelicMatrix = [];
for (let tier of [ "", "Egg", "Square", "Triangle", "Pentagon", "BetaPentagon", "AlphaPentagon" ]) {
    let row = [];
    for (let gem of [ "Power", "Space", "Reality", "Soul", "Time", "Mind" ]) {
        row.push(gem + (tier ? tier + 'Relic' : 'Gem'));
    }
    gemRelicMatrix.push(row);
}

compileMatrix(generatorMatrix);
compileMatrix(gemRelicMatrix);

// Tensor = N-Dimensional Array, BASICALLY
let labyTensor = [];
for (let tier = 0; tier < 6; tier++) {
    let row = [];
    for (let poly of [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ]) {
        let column = [];
        for (let shiny of [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ]) {
            let str = `laby${tier}${shiny}${poly}`,
                LABEL = str[0].toUpperCase() + str.slice(1).replace(/\d/, d => ["", "Beta", "Alpha", "Omega", "Gamma", "Delta"][d]).replace(/[A-Z]/g, m => ' ' + m) + " Generator",
                code = str + 'Generator';
            column.push(Class[code] = {
                PARENT: "spectator",
                LABEL,
                SKILL_CAP: [31, 0, 0, 0, 0, 0, 0, 0, 0, 31],
                TURRETS: [{
                    POSITION: [5 + tier * 2, 0, 0, 0, 0, 1],
                    TYPE: str,
                }],
                GUNS: [{
                    POSITION: [14, 12, 1, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.fake]),
                        TYPE: "bullet"
                    }
                }, {
                    POSITION: [12, 12, 1.4, 4, 0, 0, 0],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, { recoil: 0 }]),
                        INDEPENDENT_CHILDREN: true,
                        TYPE: str
                    },
                }],
            });
        }
        row.push(column);
    }
    labyTensor.push(row);
}

connectMatrix(generatorMatrix, 'PowerGemGenerator');
connectMatrix(gemRelicMatrix, 'laby0EggGenerator');

let tensorLength = labyTensor[0][0].length,
    tensorWidth = labyTensor[0].length,
    tensorHeight = labyTensor.length;
for (let x = 0; x < tensorWidth; x++) for (let y = 0; y < tensorHeight; y++) for (let z = 0; z < tensorLength; z++) {
    let top = (y + tensorHeight - 1) % tensorHeight,
        bottom = (y + tensorHeight + 1) % tensorHeight,
        left = (x + tensorWidth - 1) % tensorWidth,
        right = (x + tensorWidth + 1) % tensorWidth,
        front = (z + tensorLength - 1) % tensorLength,
        back = (z + tensorLength + 1) % tensorLength,

    center = labyTensor[y     ][x    ][z    ];
    top    = labyTensor[top   ][x    ][z    ];
    bottom = labyTensor[bottom][x    ][z    ];
    left   = labyTensor[y     ][left ][z    ];
    right  = labyTensor[y     ][right][z    ];
    front  = labyTensor[y     ][x    ][front];
    back   = labyTensor[y     ][x    ][back ];

    labyTensor[y][x][z].UPGRADES_TIER_0 = [
        "developer" ,  top                , "spectator",
         left       ,  center             ,  right     ,
        "basic"     ,  bottom             , "eggGenerator",
         front      , "PowerGemGenerator" ,  back
    ];
}

// Testing tanks
Class.diamondShape = {
    PARENT: ["basic"],
    LABEL: "Rotated Body",
    SHAPE: 4.5
};

Class.rotatedTrap = {
    PARENT: ["basic"],
    LABEL: "Rotated Inverted Body",
    SHAPE: -3.5
};

Class.mummyHat = {
    SHAPE: 4.5,
    COLOR: -1
};
Class.mummy = {
    PARENT: ["drone"],
    SHAPE: 4,
    NECRO: [4],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};
Class.mummifier = {
    PARENT: ["genericTank"],
    LABEL: "Mummifier",
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    SHAPE: 4,
    MAX_CHILDREN: 10,
    GUNS: [{
        POSITION: [5.5, 13, 1.1, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    },{
        POSITION: [5.5, 13, 1.1, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
            TYPE: "mummy",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro
        }
    }],
    TURRETS: [{
        POSITION: [20 * Math.SQRT1_2, 0, 0, 180, 360, 1],
        TYPE: ["mummyHat"]
    }]
};

Class.colorMan = {
    PARENT: ["genericTank"],
    LABEL: "Testing Animated Colors",
    SHAPE: 4,
    COLOR: "rainbow",
    TURRETS: [{
        POSITION: [20, -20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueRed" }
    },{
        POSITION: [20,  0 , -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBlueGrey" }
    },{
        POSITION: [20,  20, -20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyBlue" }
    },{
        POSITION: [20, -20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedRedGrey" }
    },{
        POSITION: [20,  20,  0 , 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedGreyRed" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedLesbian" }
    },{
        POSITION: [20,  0 ,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedTrans" }
    },{
        POSITION: [20,  20,  20, 0, 0, 1],
        TYPE: { SHAPE: 4, COLOR: "animatedBi" }
    }]
};
Class.pentahone = {
PARENT: "genericTank",
LABEL: "Pentahone",
SIZE: 12,
SHAPE: 5.5,
GUNS: [
{
POSITION: [18,8,1,0,0,72,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,144,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,216,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,288,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,0,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,72,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,144,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,216,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,288,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,0,0],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [19.385,8,1,24.923,0,72,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [19.385,8,1,24.923,0,144,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [19.385,8,1,24.923,0,216,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [19.385,8,1,24.923,0,288,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [19.385,8,1,24.923,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 6.3, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,-8.308,72,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,-8.308,144,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,-8.308,216,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,-8.308,288,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,-8.308,0,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,8.308,72,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,8.308,144,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,8.308,216,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,8.308,288,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [13.846,8,1,24.923,8.308,0,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 4.5, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,15.231,72,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,15.231,144,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,15.231,216,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,15.231,288,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,15.231,0,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,-15.231,72,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,-15.231,144,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,-15.231,216,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,-15.231,288,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [8.308,8,1,24.923,-15.231,0,1],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 2.7, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,72,1],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,144,1],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,216,1],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,288,1],
PROPERTIES: {
COLOR: 16
}, },
{
POSITION: [12.462,44.8,1,13.846,0,0,1],
PROPERTIES: {
COLOR: 16
}, },
], };
Class.splitbullet = {
   PARENT: "bullet",
   LABEL: '',
   GUNS: [ {
         POSITION: [ 18, 8, 1, -9, 0, -37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: ["bullet", {
                    PERSISTS_AFTER_DEATH: true
                }],
                SHOOT_ON_DEATH: true
         }, }, {
         POSITION: [ 18, 8, 1, -9, 0, 37.5, 100, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
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
Class.drawingthingytest = {
PARENT: "genericTank",
LABEL: "draw thing test",
SIZE: 12,
SHAPE: 0,
GUNS: [
{
POSITION: [18,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[2, 0, 0.001, 1, 1, 0.75, 1, 0, 1, 100, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
], };
Class.splitbutter = {
   PARENT: "genericTank",
   LABEL: 'SplitButter',
   BODY: {
     HEALTH: 120,
     DAMAGE: 20
   },
   SHAPE: 4,
   SIZE: 50,
   COLOR: 13,
   GUNS: [ {
         POSITION: [ 4, 7, 1, 4, 0, 180, 0, ],
         }, {
         POSITION: [ 3, 13, 1.2, 11, 0, 180, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.machineGun,g.thruster,g.thruster]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 2.8, 13, 1, 8, 0, -180, 0, ],
         }, {
         POSITION: [ 1, 11, 1, 6.7, 0, 180, 0, ],
         }, {
         POSITION: [ 1, 9, 1, 5.38, 0, -180, 0, ],
         }, {
         POSITION: [ 4, 2, 1, 9, 6, -0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.triAngleFront]),
            TYPE: "splitbullet"
         }, }, {
         POSITION: [ 4, 2, 1, 9, -6, 0.5, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.triAngleFront]),
            TYPE: "splitbullet"
         }, }, {
         POSITION: [ 4, 2, 1, 9, 3, -1, 1.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.triAngleFront]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 2, 1, 9, -3, 1, 1.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.triAngleFront]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 2, 1, 9, 0, 0, 2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.triAngleFront]),
            TYPE: "splitbullet"
         }, }, {
         POSITION: [ 2, 2, 1, 9, 0, 0, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 2, 2, 1, 9, 3, -1, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 2, 2, 1, 9, -3, 1, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 2, 2, 1, 9, 6, -0.5, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 2, 2, 1, 9, -6, 0.5, 0, ],
         PROPERTIES: {
            COLOR: 12
         }, }, {
         POSITION: [ 1.5, 9, 1, 6.5, 0, 0, 0, ],
         }, {
         POSITION: [ 2.5, 14, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 0, 14, 1, 9.8, 0, 0, 0, ],
         }, {
         POSITION: [ 0, 14, 1, 8.7, 0, 0, 0, ],
         }, {
         POSITION: [ 0, 13.7, 1, 12, 0, -180, 0, ],
         }, {
         POSITION: [ 4, 4, 1, 6, 2, -135, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.thruster]),
            TYPE: "bullet",
            LABEL: 'delay 1',
         }, }, {
         POSITION: [ 4, 4, 1, 6, -2, 135, 1, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.thruster]),
            TYPE: "bullet",
            LABEL: 'delay 1',
         }, }, {
         POSITION: [ 6, 4, 1, 2, 5, -120, 2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.thruster]),
            TYPE: "bullet",
            LABEL: 'delay 2',
         }, }, {
         POSITION: [ 6, 4, 1, 2, -5, 120, 2, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.thruster]),
            TYPE: "bullet",
            LABEL: 'delay 2',
         }, }, 
     ],
};
Class.rocketMissile = {
    PARENT: "autoswarm",
    RANGE: 450,
    LABEL: 'Rocket',
    SHAPE: 0,
    GUNS: [{
        POSITION: [17, 7, 1.3, 0, 0, 180, .25],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster]),
            TYPE: ["bullet", {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
Class.warplane = {
   PARENT: "genericTank",
   LABEL: 'Warplane',
   SKILL: Array(10).fill(5),
   SHAPE: "M -3.749 -1.811 C -3.597 -1.911 -3.537 -1.929 -3.473 -1.892 C -3.415 -1.857 -2.677 -1.211 -2.676 -1.193 C -2.676 -1.186 -2.7 -1.177 -2.73 -1.173 L -2.784 -1.167 L -2.683 -1.042 L -2.581 -0.918 L -2.182 -0.918 L -2.182 -1.337 C -2.182 -1.73 -2.187 -1.782 -2.246 -2.143 C -2.281 -2.355 -2.311 -2.546 -2.311 -2.566 C -2.311 -2.592 -2.236 -2.658 -2.073 -2.779 C -1.846 -2.946 -1.831 -2.954 -1.744 -2.949 C -1.653 -2.945 -1.652 -2.944 -1.439 -2.704 C -1.321 -2.572 -1.019 -2.237 -0.769 -1.96 L -0.313 -1.456 L -0.19 -1.456 C -0.092 -1.456 -0.066 -1.463 -0.066 -1.486 C -0.066 -1.521 -0.009 -1.526 0.02 -1.494 C 0.032 -1.481 0.104 -1.465 0.18 -1.456 C 0.339 -1.439 0.388 -1.41 0.31 -1.377 C 0.283 -1.366 0.222 -1.357 0.175 -1.356 C 0.128 -1.356 0.066 -1.343 0.037 -1.327 C -0.02 -1.294 -0.066 -1.288 -0.066 -1.313 C -0.066 -1.322 -0.091 -1.326 -0.122 -1.321 C -0.202 -1.308 -0.164 -1.28 -0.057 -1.273 C 0.046 -1.266 0.067 -1.23 -0.025 -1.221 C -0.09 -1.214 -0.089 -1.178 -0.024 -1.176 C -0.002 -1.176 0.047 -1.163 0.085 -1.149 C 0.148 -1.124 0.154 -1.125 0.154 -1.16 C 0.154 -1.18 0.165 -1.197 0.18 -1.197 C 0.196 -1.197 0.208 -1.19 0.208 -1.18 C 0.208 -1.149 0.3 -1.117 0.39 -1.117 C 0.439 -1.117 0.501 -1.108 0.529 -1.097 C 0.61 -1.063 0.554 -1.032 0.391 -1.022 C 0.298 -1.016 0.238 -1.002 0.224 -0.985 C 0.197 -0.949 0.154 -0.95 0.154 -0.988 C 0.154 -1.004 0.139 -1.018 0.122 -1.018 C 0.098 -1.018 0.102 -1.006 0.142 -0.96 C 0.188 -0.907 0.204 -0.902 0.387 -0.889 C 0.591 -0.853 0.921 -0.805 1.08 -0.74 C 1.149 -0.709 1.224 -0.7 1.469 -0.693 C 1.636 -0.688 1.781 -0.678 1.793 -0.67 C 1.806 -0.661 1.813 -0.59 1.813 -0.478 L 1.813 -0.3 L 2.806 -0.3 C 3.025 -0.3 3.165 -0.289 3.328 -0.258 C 3.666 -0.195 4.093 -0.048 4.068 -0.002 C 4.051 0.027 3.683 0.155 3.454 0.211 C 3.284 0.253 3.18 0.264 2.878 0.273 L 2.141 0.279 L 1.813 0.279 L 1.813 0.651 C 1.674 0.691 1.613 0.697 1.487 0.698 C 1.298 0.698 1.142 0.705 1.055 0.739 C 0.905 0.796 0.654 0.852 0.427 0.879 C 0.308 0.893 0.223 0.914 0.204 0.932 C 0.174 0.961 0.175 0.966 0.229 1.01 C 0.275 1.046 0.312 1.057 0.399 1.057 C 0.459 1.058 0.529 1.07 0.552 1.084 L 0.595 1.11 L 0.552 1.123 C 0.529 1.13 0.459 1.136 0.397 1.136 C 0.314 1.136 0.274 1.146 0.24 1.176 C 0.181 1.226 0.154 1.227 0.154 1.179 C 0.154 1.144 0.147 1.143 0.089 1.165 C 0.055 1.178 0.021 1.195 0.014 1.202 C 0.006 1.21 -0.016 1.217 -0.037 1.218 C -0.062 1.219 -0.055 1.226 -0.015 1.239 C 0.065 1.264 0.042 1.296 -0.056 1.296 C -0.154 1.296 -0.206 1.346 -0.121 1.36 C -0.083 1.366 -0.066 1.36 -0.066 1.342 C -0.066 1.307 -0.015 1.309 0.019 1.346 C 0.037 1.365 0.082 1.376 0.154 1.376 C 0.28 1.376 0.369 1.406 0.34 1.439 C 0.329 1.451 0.256 1.467 0.178 1.476 C 0.081 1.486 0.03 1.501 0.015 1.523 C -0.015 1.568 -0.066 1.564 -0.066 1.515 C -0.066 1.48 -0.078 1.475 -0.18 1.475 L -0.295 1.475 L -0.805 2.039 C -1.086 2.349 -1.389 2.685 -1.478 2.787 L -1.64 2.971 L -1.737 2.971 C -1.828 2.971 -1.848 2.961 -2.051 2.813 C -2.17 2.726 -2.278 2.641 -2.289 2.625 C -2.308 2.602 -2.297 2.515 -2.238 2.19 C -2.166 1.793 -2.164 1.776 -2.164 1.361 L -2.164 0.937 L -2.578 0.937 L -2.682 1.066 L -2.787 1.196 L -2.73 1.196 C -2.698 1.196 -2.675 1.204 -2.678 1.214 C -2.682 1.224 -2.86 1.386 -3.075 1.575 C -3.338 1.805 -3.485 1.921 -3.523 1.927 C -3.565 1.934 -3.606 1.918 -3.692 1.861 C -3.857 1.751 -3.88 1.725 -3.879 1.65 C -3.879 1.614 -3.847 1.422 -3.808 1.222 C -3.739 0.861 -3.739 0.859 -3.777 0.853 C -3.804 0.849 -3.739 0.801 -3.57 0.701 C -3.307 0.545 -3.269 0.518 -3.32 0.518 C -3.346 0.518 -3.351 0.494 -3.351 0.341 C -3.351 0.144 -3.355 0.151 -3.214 0.128 C -3.114 0.112 -3.132 0.091 -3.264 0.071 C -3.339 0.059 -3.351 0.051 -3.351 0.009 C -3.351 -0.032 -3.339 -0.04 -3.264 -0.052 C -3.132 -0.072 -3.114 -0.093 -3.214 -0.109 C -3.354 -0.132 -3.351 -0.125 -3.351 -0.32 C -3.351 -0.472 -3.346 -0.497 -3.319 -0.503 C -3.3 -0.507 -3.395 -0.575 -3.551 -0.669 C -3.708 -0.762 -3.803 -0.83 -3.784 -0.834 C -3.766 -0.838 -3.752 -0.85 -3.752 -0.861 C -3.752 -0.872 -3.781 -1.033 -3.816 -1.22 C -3.85 -1.406 -3.88 -1.596 -3.88 -1.642 C -3.88 -1.725 -3.878 -1.727 -3.749 -1.811 Z",
   GUNS: [ {
         POSITION: [ 18, 5, 1, -15, 15, 0, 0, ],
         PROPERTIES: {
            ALPHA: 0,
            SHOOT_SETTINGS: combineStats([g.basic,g.power,{damage: 5, recoil: 0.2}]),
            TYPE: "rocketMissile"
         }, }, {
         POSITION: [ 18, 5, 1, -15, -15, 0, 0, ],
         PROPERTIES: {
            ALPHA: 0,
            SHOOT_SETTINGS: combineStats([g.basic,g.power,{damage: 5, recoil: 0.2}]),
            TYPE: "rocketMissile"
         }, }, {
         POSITION: [ 18, 5, 1, -22, 23, 0, 0.5, ],
         PROPERTIES: {
            ALPHA: 0,
            SHOOT_SETTINGS: combineStats([g.basic,g.power,{damage: 5, recoil: 0.2}]),
            TYPE: "rocketMissile"
         }, }, {
         POSITION: [ 18, 5, 1, -22, -23, 0, 0.5, ],
         PROPERTIES: {
            ALPHA: 0,
            SHOOT_SETTINGS: combineStats([g.basic,g.power,{damage: 5, recoil: 0.2}]),
            TYPE: "rocketMissile"
            }, }, {
         POSITION: [ 18, 8, 2, 0, 0, 180, 0, ],
         PROPERTIES: {
            ALPHA: 0,
            SHOOT_SETTINGS: combineStats([g.basic,g.thruster,g.machineGun,{damage: 0.5, recoil: 3,reload: 0.5}]),
            TYPE: "bullet"
         }, }, 
     ],
};
Class.coltank = {
   PARENT: "genericTank",
   LABEL: 'col Tank',
   SIZE: 27,
   GUNS: [ {
         POSITION: [ 18, 8, 1, 0, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 14, 19, 0, -17, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 5, 1, -12, 10, 37.5, 0, ],
         }, {
         POSITION: [ 3, 5, 1, 9, 10, 142.5, 0, ],
         }, {
         POSITION: [ 9, 12, 0, -17, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 9, 0, -17, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 5, 0, -17, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 2, 0, -17, 0, 0, 0, ],
         }, {
         POSITION: [ 25, 8, -0.5, -7, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "casing"
         }, }, {
         POSITION: [ 23, 5, -0.5, -7, 0, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: "casing"
         }, }, 
     ],
};
Class.miscTestHelper2 = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload 3",
    MIRROR_MASTER_ANGLE: true,
    COLOR: -1,
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
};
Class.miscTestHelper = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload 2",
    //MIRROR_MASTER_ANGLE: true,
    COLOR: {
        BASE: -1,
        BRIGHTNESS_SHIFT: 15,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
                COLOR: -1,
            },
        },
    ],
    TURRETS: [
        {
          POSITION: [20, 0, 20, 30, 0, 1],
          TYPE: "miscTestHelper2",
        }
    ]
};
Class.miscTest = {
    PARENT: ["genericTank"],
    LABEL: "Turret Reload",
    COLOR: "teal",
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.noSpread]),
                TYPE: "bullet",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [20, 0, 20, 30, 0, 1],
            TYPE: "miscTestHelper",
        }
    ]
};
Class.mmaTest2 = {
    PARENT: ["genericTank"],
    MIRROR_MASTER_ANGLE: true,
    COLOR: "grey",
    GUNS: [{
            POSITION: [40, 4, 1, -20, 0, 0, 0],
        }],
}
Class.mmaTest1 = {
    PARENT: ["genericTank"],
    COLOR: -1,
    // Somehow, removing the gun below causes a crash when the tank is chosen ??????
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
        }
    ],
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        }
    ]
}
Class.mmaTest = {
    PARENT: ["genericTank"],
    LABEL: "Mirror Master Angle",
    TURRETS: [
        {
            POSITION: [10, 0, 0, 0, 360, 1],
            TYPE: "mmaTest2",
        },
        {
            POSITION: [20, 0, 20, 0, 360, 1],
            TYPE: "mmaTest1",
        },
    ]
}

Class.vulnturrettest_turret = {
    PARENT: "genericTank",
    COLOR: "grey",
    HITS_OWN_TYPE: 'hard',
    LABEL: 'Shield',
    COLOR: 'teal',
}

Class.vulnturrettest = {
    PARENT: ["genericTank"],
    LABEL: "Vulnerable Turrets",
    TOOLTIP: "[DEV NOTE] Vulnerable turrets are still being worked on and may not function as intended!",
    BODY: {
        FOV: 2,
    },
    DANGER: 6,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet'
        }
    }],
    TURRETS: (() => {
        let output = []
        for (let i = 0; i < 10; i++) {
            output.push({
                POSITION: {SIZE: 20, X: 40, ANGLE: (360/10)*i},
                TYPE: "vulnturrettest_turret",
                VULNERABLE: true
            })
        }
        return output
    })(),
};

Class.turretLayerTesting = {
    PARENT: 'genericTank',
    LABEL: 'Turret Layer Testing',
    TURRETS: [
        {
            POSITION: [20, 10, 10, 0, 0, 2],
            TYPE: ["basic", {COLOR: "lightGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 10, 5, 0, 0, 2],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, 10, -5, 0, 0, 1],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, -5, 0, 0, -2],
            TYPE: ["basic", {COLOR: "darkGrey", MIRROR_MASTER_ANGLE: true}]
        },
        {
            POSITION: [20, -10, 5, 0, 0, -1],
            TYPE: ["basic", {COLOR: "grey", MIRROR_MASTER_ANGLE: true}]
        },
    ]
}

Class.alphaGunTest = {
    PARENT: "basic",
    LABEL: "Translucent Guns",
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALPHA: 0.5
        }
    }]
}

// unfinished
Class.strokeWidthTest = {
    PARENT: "basic",
    LABEL: "Stroke Width Test",
    STROKE_WIDTH: 2,
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            STROKE_WIDTH: 0.5
        }
    }]
}

Class.onTest = {
    PARENT: 'genericTank',
    LABEL: "'ON' property",
    TOOLTIP: [
        'Refer to Class.onTest to know more ',
        'On collide is a bit buggy right now, please use other methods until its fixed'
    ],
    ON: [{
        event: "fire",
        handler: ({ body, gun }) => {
            switch (gun.identifier) {
                case 'mainGun':
                    body.sendMessage('fired main gun')
                    break;
                case 'secondaryGun':
                    body.sendMessage('fired secondary gun')
                    break;
            }
        }
    }, {
        event: "altFire",
        handler: ({ body, gun }) => {
            body.sendMessage('fired alt gun')
        }
    }, {
        event: "death",
        handler: ({ body, killers, killTools }) => {
            body.sendMessage('you died')
        }
    }, {
        event: "collide",
        handler: ({ instance, other }) => {
            instance.sendMessage('collide!')
        }
    }, {
        event: "damage",
        handler: ({ body, damageInflictor, damageTool }) => {
            body.SIZE += damageInflictor[0].SIZE / 2
            damageInflictor[0].kill()
        }
    }],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'mainGun'
        }
    }, {
        POSITION: { ANGLE: 90 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            ALT_FIRE: true
        }
    }, {
        POSITION: { ANGLE: 180, DELAY: 0.5 },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'secondaryGun'
        }
    }]
}
Class.notTurrets = {
PARENT: "genericTank",
LABEL: "Not Turrets",
GUNS: [
{
POSITION: [18,8,1,0,-33.231,0,0.5],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [18,8,1,0,0,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [18,8,1,0,33.231,0,0],
PROPERTIES: {
SHOOT_SETTINGS: combineStats([[40, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]]),
TYPE: "bullet",
COLOR: 16
}, },
{
POSITION: [19.2,19.2,1,-8.308,-33.231,0,0],
PROPERTIES: {
SHAPE: 0
}, },
{
POSITION: [19.2,19.2,1,-8.308,33.231,0,0],
PROPERTIES: {
SHAPE: 0
}, },
], };
Class.auraBasicGen = addAura();
Class.auraBasic = {
    PARENT: ["genericTank"],
    LABEL: "Aura Basic",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraBasicGen"
        }
    ],
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
    ],
};
Class.auraHealerGen = addAura(-1);
Class.auraHealer = {
    PARENT: ["genericTank"],
    LABEL: "Aura Healer",
    TURRETS: [
        {
            POSITION: [14, 0, 0, 0, 0, 1],
            TYPE: "auraHealerGen"
        }
    ],
    GUNS: [
        {
            POSITION: [8, 9, -0.5, 12.5, 0, 0, 0],
        },
        {
            POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.healer]),
                TYPE: "healerBullet",
            },
        },
    ],
};

Class.ghoster_ghostForm = {
    PARENT: ['genericTank'],
    TOOLTIP: 'You are now in ghost form, roam around and find your next target. Will turn back in 5 seconds',
    LABEL: 'Ghoster',
    BODY: {
        SPEED: 20,
        ACCELERATION: 10,
        FOV: base.FOV + 1,
    },
    GUNS: [{
        POSITION: { WIDTH: 20, LENGTH: 20 },
    }],
    ALPHA: 0.6,
}
Class.ghoster = {
    PARENT: ['genericTank'],
    LABEL: 'Ghoster',
    TOOLTIP: 'Shooting will turn you into a ghost for 5 seconds',
    BODY: {
        SPEED: base.SPEED,
        ACCELERATION: base.ACCEL,
    },
    ON: [
        {
            event: 'fire',
            handler: ({ body }) => {
                body.define(Class.ghoster_ghostForm)
                setTimeout(() => {
                    body.SPEED = 1e-99
                    body.ACCEL = 1e-99
                    body.FOV *= 2
                    body.alpha = 1
                }, 2000)
                setTimeout(() => {
                    body.SPEED = base.SPEED
                    body.define(Class.ghoster)
                }, 2500)
            }
        }
    ],
    GUNS: [{
        POSITION: {WIDTH: 20, LENGTH: 20},
        PROPERTIES: {
            TYPE: 'bullet',
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator]),
        }
    }],
    ALPHA: 1,
}

Class.switcheroo = {
    PARENT: "basic",
    LABEL: 'Switcheroo',
    UPGRADES_TIER_0: [],
    RESET_UPGRADE_MENU: true,
    ON: [
        {
            event: "fire",
            handler: ({ body, globalMasterStore: store, gun }) => {
                if (gun.identifier != 'switcherooGun') return
                store.switcheroo_i ??= 0;
                store.switcheroo_i++;
                store.switcheroo_i %= 6;
                body.define(Class.basic.UPGRADES_TIER_1[store.switcheroo_i]);
                setTimeout(() => body.define("switcheroo"), 6000);
            }
        }
    ],
    GUNS: [{
        POSITION: {},
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: 'bullet',
            IDENTIFIER: 'switcherooGun'
        }
    }]
}

Class.vanquisher = {
    PARENT: ["genericTank"],
    DANGER: 8,
    LABEL: "Vanquisher",
    STAT_NAMES: statnames.generic,
    BODY: {
        SPEED: 0.8 * base.SPEED,
    },
    //destroyer
    GUNS: [{
        POSITION: [21, 14, 1, 0, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer]),
            TYPE: "bullet"
        }

    //builder
    },{
        POSITION: [18, 12, 1, 0, 0, 0, 0],
    },{
        POSITION: [2, 12, 1.1, 18, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.setTrap]),
            TYPE: "setTrap",
            STAT_CALCULATOR: gunCalcNames.block
        }

    //launcher
    },{
        POSITION: [10, 9, 1, 9, 0, 90, 0],
    },{
        POSITION: [17, 13, 1, 0, 0, 90, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.artillery, g.artillery]), TYPE: "minimissile", STAT_CALCULATOR: gunCalcNames.sustained }

    //shotgun
    },{
        POSITION: [4, 3, 1, 11, -3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 3, 1, 11, 3, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [4, 4, 1, 13, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 12, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 4, 1, 11, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    },{
        POSITION: [1, 3, 1, 13, -1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 3, 1, 13, 1, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "bullet" }
    },{
        POSITION: [1, 2, 1, 13, 2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [1, 2, 1, 13, -2, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun]), TYPE: "casing" }
    }, {
        POSITION: [15, 14, 1, 6, 0, 270, 0],
        PROPERTIES: { SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.shotgun, g.fake]), TYPE: "casing" }
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 270, 0],
    }]
};
Class.armyOfOneBullet = {
    PARENT: ["bullet"],
    LABEL: "Unstoppable",
    TURRETS: [
        {
            /** SIZE         X             Y         ANGLE        ARC */
            POSITION: [18.5, 0, 0, 0, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
        {
            POSITION: [18.5, 0, 0, 180, 360, 0],
            TYPE: ["spikeBody", { COLOR: null }],
        },
    ],
};
Class.armyOfOne = {
    PARENT: ["genericTank"],
    LABEL: "Army Of One",
    DANGER: 9,
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    BODY: {
        SPEED: 0.5 * base.SPEED,
        FOV: 1.8 * base.FOV,
    },
    GUNS: [
        {
            POSITION: [21, 19, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }]),
                TYPE: "armyOfOneBullet",
            },
        },{
            POSITION: [21, 11, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, g.destroyer, g.destroyer, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, g.sniper, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, { reload: 0.5 }, g.fake]),
                TYPE: "bullet",
            },
        }
    ],
};

Class.godbasic = {
    PARENT: ["genericTank"],
    LABEL: "God Basic",
    SKILL_CAP: [31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
    SKILL: [ 31, 31, 31, 31, 31, 31, 31, 31, 31, 31 ],
    BODY: {
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
        HETERO: 3,
    },
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
                COLOR: "grey",
                LABEL: "",
                STAT_CALCULATOR: 0,
                WAIT_TO_CYCLE: false,
                AUTOFIRE: false,
                SYNCS_SKILLS: false,
                MAX_CHILDREN: 0,
                ALT_FIRE: false,
                NEGATIVE_RECOIL: false,
            },
        },
    ],
};
Class.maximumOverdrive = {
    PARENT: ["overdrive"],
    LABEL: "Maximum Overdrive",
    SKILL_CAP: Array(10).fill(255),
    SKILL: Array(10).fill(255),
};
Class.weirdAutoBasic = {
    PARENT: "genericTank",
    LABEL: "Weirdly defined Auto-Basic",
    GUNS: [{
        POSITION: {
            LENGTH: 20,
            WIDTH: 10
        },
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1]]),
            TYPE: "bullet"
        },
    }],
    TURRETS: [{
        POSITION: {
            ANGLE: 180,
            LAYER: 1
        },
        TYPE: ["autoTurret", {
            CONTROLLERS: ["nearestDifferentMaster"],
            INDEPENDENT: true
        }]
    }]
};

Class.tooltipTank = {
    PARENT: 'genericTank',
    LABEL: "Tooltips",
    UPGRADE_TOOLTIP: "Allan please add details"
}
Class.bulletSpawnTest = {
    PARENT: 'genericTank',
    LABEL: "Bullet Spawn Position",
    GUNS: [{
        POSITION: [20, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, {speed: 0, maxSpeed: 0, shudder: 0, spray: 0, recoil: 0}]),
            TYPE: ['bullet', {BORDERLESS: true}],
            BORDERLESS: true,
        }
    }]
}

Class.levels = menu("Levels")
Class.levels.UPGRADES_TIER_0 = []
for (let i = 0; i < 20; i++) {
    let LEVEL = i * c.TIER_MULTIPLIER;
    Class["level" + LEVEL] = {
        PARENT: ["levels"],
        LEVEL,
        LABEL: "Level " + LEVEL
    };
    Class.levels.UPGRADES_TIER_0.push("level" + LEVEL);
}

Class.teams = menu("Teams")
Class.teams.UPGRADES_TIER_0 = []
for (let i = 1; i <= 8; i++) {
    let TEAM = i;
    Class["Team" + TEAM] = {
        PARENT: ["teams"],
        TEAM: -TEAM,
        COLOR: getTeamColor(-TEAM),
        LABEL: "Team " + TEAM
    };
    Class.teams.UPGRADES_TIER_0.push("Team" + TEAM);
}
Class['Team' + TEAM_ROOM] = {
    PARENT: ["teams"],
    TEAM: TEAM_ROOM,
    COLOR: "yellow",
    LABEL: "Room Team"
};
Class['Team' + TEAM_ENEMIES] = {
    PARENT: ["teams"],
    TEAM: TEAM_ENEMIES,
    COLOR: "yellow",
    LABEL: "Enemies Team"
};
Class.teams.UPGRADES_TIER_0.push('Team' + TEAM_ROOM, 'Team' + TEAM_ENEMIES);

Class.testing = menu("Testing")
Class.features = menu("Features")
Class.overpowered = menu("Overpowered")

Class.addons = menu("Addon Entities")
Class.addons.UPGRADES_TIER_0 = []

Class.whirlwindDeco = makeDeco(6)
Class.whirlwindDeco.CONTROLLERS = [["spin", { independent: true, speed: 0.128 }]]
Class.whirlwind = {
    PARENT: "genericTank",
    LABEL: "Whirlwind",
    ANGLE: 60,
    CONTROLLERS: ["whirlwind"],
    HAS_NO_RECOIL: true,
    STAT_NAMES: statnames.whirlwind,
    TURRETS: [
        {
            POSITION: [8, 0, 0, 0, 360, 1],
            TYPE: "whirlwindDeco"
        }
    ],
    AI: {
        SPEED: 2, 
    }, 
    GUNS: (() => { 
        let output = []
        for (let i = 0; i < 6; i++) { 
            output.push({ 
                POSITION: {WIDTH: 8, LENGTH: 1, DELAY: i * 0.25},
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.satellite]), 
                    TYPE: ["satellite", {ANGLE: i * 60}], 
                    MAX_CHILDREN: 1,   
                    AUTOFIRE: true,  
                    SYNCS_SKILLS: false,
                    WAIT_TO_CYCLE: true
                }
            }) 
        }
        return output
    })()
}
Class.IoncannonTank = {
  PARENT: "genericTank",
  LABEL: "Ion Cannon",
  SHAPE: 1,
  BODY: {
    FOV: 2,
  },
  GUNS: [ {
         POSITION: [ 47, 12, 1, 34, 0, 0, 0, ],
         PROPERTIES: {
         SHOOT_SETTINGS: combineStats([g.basic, g.sniper, {speed: 20}, {damage: 500}, {reload: 10}, {recoil: 30}]),
         TYPE: "IonBullet",
         DIE_AT_RANGE: false
         }, }, {
         POSITION: [ 29, 16, 1, 4, 0, 0, 0, ],
         }, {
         POSITION: [ 32, 25, 1, -27, 0, 0, 0, ],
         PROPERTIES: {
         COLOR: 'orange'
         } }, {
         POSITION: [ 22, 19, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 22, 16, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 22, 8, 1, 8, 0, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 37, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 37, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 43, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 43, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 49, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 49, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 55, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 55, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 61, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 61, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 67, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 67, 5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 73, -5, 0, 0, ],
         }, {
         POSITION: [ 2, 6, 1, 73, 5, 0, 0, ],
         }, {
         POSITION: [ 22, 1, 1, -22, 14, 0, 0, ],
         }, {
         POSITION: [ 22, 1, 1, -22, -14, 0, 0, ],
         }, {
         POSITION: [ 5, 1, 1, -22, 14, 0, 0, ],
         }, {
         POSITION: [ 5, 1, 1, -22, -14, 0, 0, ],
         }, 
     ],
};
Class.doubleOlympusBurger = {
   PARENT: "genericTank",
   LABEL: 'Double Olympus Burger',
   GUNS: [ {
         POSITION: [ 18, 35, 1, 0, 19, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator,{health: 40, damage: 30, range: 8, reload:5}]),
            TYPE: "bullet",
             LABEL: "1st Gigantic Barrel Of Destruction"
         }, }, {
         POSITION: [ 18, 35, 1, 0, -19, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.annihilator,{health: 40, damage: 30, range: 8, reload:5}]),
            TYPE: "bullet",
             LABEL: "2nd Gigantic Barrel Of Destruction"
         }, }, {
         POSITION: [ 26, 5, 1, -3, 19, 0, 0, ],
         }, {
         POSITION: [ 26, 5, 1, -3, -19, 0, 0, ],
         }, {
         POSITION: [ 5, 18, -1.5, 21, 19, 0, 0, ],
         }, {
         POSITION: [ 5, 18, -1.5, 21, -19, 0, 0, ],
         }, {
         POSITION: [ 5, 8, -1.5, 21, 19, 0, 0, ],
         }, {
         POSITION: [ 5, 8, -1.5, 21, -19, 0, 0, ],
         }, {
         POSITION: [ 5, 3, -1.5, 21, 19, 0, 0, ],
         }, {
         POSITION: [ 5, 3, -1.5, 21, -19, 0, 0, ],
         }, {
         POSITION: [ 12, 82, 0.9, -13, 0, 0, 0, ],
         }, {
         POSITION: [ 36, 82, -0.9, -49, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 82, 0.9, -59, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 82, -0.9, -69, 0, 0, 0, ],
         }, {
         POSITION: [ 9, 19, -0.6, -69, 31.5, 0, 0, ],
         }, {
         POSITION: [ 9, 19, -0.6, -69, -31.5, 0, 0, ],
         }, {
         POSITION: [ 9, 19, 0.6, -69, 15, 0, 0, ],
         }, {
         POSITION: [ 9, 19, 0.6, -69, -15, 0, 0, ],
         }, {
         POSITION: [ 9, 19, -0.6, -69, 0, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, 7, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, -7, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, 21, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, -21, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, 34, 0, 0, ],
         }, {
         POSITION: [ 36, 7, -0.6, -49, -34, 0, 0, ],
         }, {
         POSITION: [ 9, 18.6, 0.6, -59, 31.5, 0, 0, ],
         }, {
         POSITION: [ 9, 18.6, 0.6, -59, -31.5, 0, 0, ],
         }, {
         POSITION: [ 9, 18.6, -0.6, -59, 10.5, 0, 0, ],
         }, {
         POSITION: [ 9, 18.6, -0.6, -59, -10.5, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 1, 7.5, 19, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 1, 7.5, -19, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 2, -6, 31, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 2, -6, -31, 0, 0, ],
         }, {
         POSITION: [ 5, 5, -2, -12, 21, 0, 0, ],
         }, {
         POSITION: [ 5, 5, -2, -12, -21, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 2, -6, 12, 0, 0, ],
         }, {
         POSITION: [ 5, 5, 2, -6, -12, 0, 0, ],
         }, 
     ],
};
Class.doubleMac = {
   PARENT: "genericTank",
   LABEL: 'Double Mac',
   SIZE: 14,
   GUNS: [ {
         POSITION: [ 17, 25, 1, 0, 14, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.destroyer,g.annihilator,{damage: 1 , recoil: 1.5, reload: 1.6}]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 17, 25, 1, 0, -14, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic,g.pounder,g.destroyer,g.annihilator,{damage: 1 , recoil: 1.5, reload: 1.6}]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 25, 1, 13, 14, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 25, 1, 13, -14, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 14, 1, 0, 14, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 14, 1, 0, -14, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 18, 1, 6.5, 14, 0, 0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 5, 18, 1, 6.5, -14, 0, 0.5, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pounder,g.destroyer,g.annihilator,g.fake]),
            TYPE: "bullet"
         }, }, {
         POSITION: [ 4, 33, 1.6, -5, 0, 0, 0, ],
         }, {
         POSITION: [ 4, 19, 1.6, -11, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 6, 1.6, -16, -18, 22.5, 0, ],
         }, {
         POSITION: [ 3, 6, 1.6, -16, 18, -22.5, 0, ],
         }, {
         POSITION: [ 3, 16, -1.2, -16, 0, 0, 0, ],
         }, {
         POSITION: [ 3, 16, 1.2, -21, 0, 0, 0, ],
         }, {
         POSITION: [ 3.3, 15, 0, -26, 0, 0, 0, ],
         }, 
     ],
};
Class.tanktests.UPGRADES_TIER_0 = ["rilaper", "gigawhip"];
Class.developer.UPGRADES_TIER_0 = ["tanks", "bosses", "spectator", "levels", "teams", "eggGenerator", "testing", "addons","betaTanks","miscTanks", "tanktests", "basic"];
    Class.tanks.UPGRADES_TIER_0 = ["basic", "unavailable", "spectator", "dominators", "sanctuaries", "mothership", "baseProtector", "antiTankMachineGun", "arenaCloser"];
      Class.miscTanks.UPGRADES_TIER_0 = ["ATWB","Headbutter","BMCdev", "BMCeventandBTwYT","BMCsub","sideMortars","sideRpgs","antiTankMissileLauncher","pentahone","notTurrets","splitbutter","ultrafrag","HyperFragtrapper","HyperFragtwin","HFragspray","lrcm","mlrs","cursedBasic","drawingthingytest","thornyLauncher","spikyBasic","coltank","warplane","bigCheez","theupgraderanaway", "arrasioranaway", "omegaPred","bomberPlane","heavyCruiser","doubleOlympusBurger","ultra3","periodicFire","doubleMac", "thotdestroyer","vulcan","randombullshitgo"];
        Class.unavailable.UPGRADES_TIER_0 = ["healer"];
        Class.dominators.UPGRADES_TIER_0 = ["destroyerDominator", "gunnerDominator", "trapperDominator"];
        Class.sanctuaries.UPGRADES_TIER_0 = ["sanctuaryTier1", "sanctuaryTier2", "sanctuaryTier3", "sanctuaryTier4", "sanctuaryTier5", "sanctuaryTier6"];

    Class.bosses.UPGRADES_TIER_0 = ["sentries", "elites", "mysticals", "nesters", "rogues", "rammers", "terrestrials", "celestials", "eternals", "devBosses", "custombosses"];
        Class.sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"];
        Class.elites.UPGRADES_TIER_0 = ["eliteDestroyer", "eliteGunner", "eliteSprayer", "eliteBattleship", "eliteSpawner", "eliteTrapGuard", "eliteSpinner", "eliteSkimmer", "legionaryCrasher", "guardian", "defender", "sprayerLegion","elitesniper", "EliteOverlord"];
        Class.mysticals.UPGRADES_TIER_0 = ["sorcerer", "summoner", "enchantress", "exorcistor", "shaman","minifort"];
        Class.nesters.UPGRADES_TIER_0 = ["nestKeeper", "nestWarden", "nestGuardian", "FNB"];
        Class.rogues.UPGRADES_TIER_0 = ["roguePalisade", "rogueArmada", "julius", "genghis", "napoleon"];
	    Class.rammers.UPGRADES_TIER_0 = ["bob", "nemesis"];
        Class.terrestrials.UPGRADES_TIER_0 = ["ares", "gersemi", "ezekiel", "eris", "selene"];
        Class.celestials.UPGRADES_TIER_0 = ["paladin", "freyja", "zaphkiel", "nyx", "theia", "atlas", "rhea", "julius", "genghis", "napoleon"];
        Class.eternals.UPGRADES_TIER_0 = ["odin", "kronos", "kronosgenerator", "odingenerator"];
        Class.devBosses.UPGRADES_TIER_0 = ["taureonBoss", "zenphiaBoss", "dogeiscutBoss", "trplnrBoss"];
        Class.custombosses.UPGRADES_TIER_0 = ["startBossAnnihilator", "SuperCrasherStart"];
        Class.betaTanks.UPGRADES_TIER_0 = ["supersnaketesting","snakedesigntest","empSniper","IoncannonTank","magneticCheese","ubertow","Magneticsmasher"];

    Class.testing.UPGRADES_TIER_0 = ["features", "overpowered", "whirlwind", "vanquisher", "mummifier", "tracker3", "tutest", "gasman", "soda"];
        Class.features.UPGRADES_TIER_0 = ["diamondShape", "rotatedTrap", "colorMan", "miscTest", "mmaTest", "vulnturrettest", "onTest", "alphaGunTest", "strokeWidthTest", "testLayeredBoss", "tooltipTank", "turretLayerTesting", "bulletSpawnTest", "auraBasic", "auraHealer", "weirdAutoBasic", "ghoster", "switcheroo", ["developer", "developer"],"ringTurretTest"]
        Class.overpowered.UPGRADES_TIER_0 = ["armyOfOne", "godbasic", "maximumOverdrive"]
