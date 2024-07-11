function getModeForUltimateSpectator(id) {
    switch (id) {
        case 0:
            return 'Normal Mode.'
            break;
        case 1:
            return 'Fov Mode.'
            break;
        case 2:
            return 'Speed Mode.'
            break
        case 3:
            return 'Visibility Mode.'
            break
        case 4:
            return 'Follow Entity Mode.'
            break;
        case 5:
            return 'Copy Entity / Get Tank Information Mode.'
            break;
        case 6:
            return 'Grab / Whirlpool Entity Mode.'
            break;
        case 7:
            return 'Kill / Heal Entity Mode.'
            break;
        case 8:
            return 'Entity Debug Mode.'
            break;
        default:
            return 'Unknown Mode.'
            break;
    }
}
Class.spectatorUltimate = {
    PARENT: "genericTank",
    LABEL: "Spectator v2",
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
    },
    UPGRADE_TOOLTIP: 'To change modes enable override and left/right click. Then disable override to select the mode.\
    \nModes:\
    \nNormal Mode: Normal Spectator.\
    \nFov Mode: Left click to increase fov and decrease fov.\
    \nSpeed Mode: Left click to increase speed, right click to decrease speed.\
    \nVisibility Mode: Left click to toggle visibility.\
    \nFollow Entity Mode: Left click on an entity to follow it, you can switch switch entities while following an entity.\
    \n      Right click to stop following the current entity.\
    \nCopy Entity / Get Tank Information Mode: Left click on an entity to become it. Right click on an entity to get its tank defs.\
    \nGrab / Whirlpool Entity Mode: Left click on a entity to grab it. Left click again to let go. Right click to grab the entity closest to your mouse.\
    \n      Right click again to let go.\
    \nKill / Heal Entity Mode: Left click on a entity to kill it. Right click on a entity to heal it.\
    \nEntity Debug Mode: Left click on an entity to get body stats. Right click on an entity to get more detailed information.\
    \nInformation Format for Debug: Amount in live code | Set amount in definition. Target: Relative to tank./Actual coordinate on map.\
    \n      For Health and Shield the format is: Current Amount/Max Amount|Amount in Definition',
    ON: [
        {
        event: "tick",
        handler: ({ body }) => {
        body.store.$spectatorMode = body.store.$spectatorMode ? body.store.$spectatorMode : 0; 
        let override = body.socket.player.command.override,
            autofire = body.socket.player.command.autofire,
            fire = body.socket.player.command.lmb,
            altFire = body.socket.player.command.rmb;

        if (override && !body.store.$justEnabledOverride) {
            body.sendMessage('Current Mode: ' + getModeForUltimateSpectator(body.store.$spectatorMode))
            body.store.$justEnabledOverride = true
        }
        if (override) {
            if (fire && !body.store.$justEnabledFire) {
                body.store.$justEnabledFire = true
                body.store.$spectatorMode = body.store.$spectatorMode + 1 == 9 ? 0 : body.store.$spectatorMode + 1
                body.sendMessage('Mode: ' + getModeForUltimateSpectator(body.store.$spectatorMode))
            }
            if (altFire && !body.store.$justEnabledAltFire) {
                body.store.$justEnabledAltFire = true
                body.store.$spectatorMode = body.store.$spectatorMode - 1 == -1 ? 8 : body.store.$spectatorMode - 1
                body.sendMessage('Mode: ' + getModeForUltimateSpectator(body.store.$spectatorMode))
            }
        }
        switch (body.store.$spectatorMode) {
            case 1:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true
                    body.FOV *= 5/4
                    body.fov *= 5/4
                }
                if (altFire && !body.store.$justEnabledAltFire) {
                    body.store.$justEnabledAltFire = true
                    body.FOV *= 4/5
                    body.fov *= 4/5
                }
                break;
            case 2:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true
                    body.SPEED *= 5/4
                    body.ACCELERATION *= 5/4
                }
                if (altFire && !body.store.$justEnabledAltFire) {
                    body.store.$justEnabledAltFire = true
                    body.SPEED *= 4/5
                    body.ACCELERATION *= 4/5
                }
                break;
            case 3:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true
                    body.alpha =  !body.alpha;
                }
                break;
            case 4:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true;
                    let targetX = body.control.target.x + body.x,
                        targetY = body.control.target.y + body.y;
                    let target = {x:targetX, y:targetY};
                    for (instance of entities) {
                        if (instance.master == instance) {
                            let distance = util.getDistance(target,instance);
                            if (distance < instance.size) {
                                body.socket.player.foundEntity = instance
                                break;
                            }
                        }
                    }
                    if (body.socket.player.foundEntity) {
                        body.socket.player.following = body.socket.player.foundEntity;
                        body.socket.player.foundEntity = null;
                    }
                    if (body.socket.player.following) {
                        if (body.socket.player.followingInterval) {
                            clearInterval(body.socket.player.followingInterval)
                            body.socket.player.followingInterval = null;
                        }
                        body.socket.player.followingInterval = setInterval(() => {
                            if (body.socket.player.following) {
                                let entity = body.socket.player.following;
                                body.x = entity.x;
                                body.y = entity.y;
                                body.velocity.x = entity.velocity.x + entity.accel.x;
                                body.velocity.y = entity.velocity.y + entity.accel.y;
                            }
                        }, 31.25)
                    }
                    body.socket.player.foundEntity = null;
                }
                if (altFire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true;
                    clearInterval(body.socket.player.followingInterval);
                    body.socket.player.followingInterval = null;
                    body.socket.player.following = null;
                }
                break;
            case 5:
                if ((fire || altFire) && !body.store.$justEnabledFire && !body.store.$justEnabledAltFire) {
                    let targetX = body.control.target.x + body.x,
                        targetY = body.control.target.y + body.y;
                    let target = {x:targetX, y:targetY};
                    for (instance of entities) {
                        if (instance.master == instance) {
                            let distance = util.getDistance(target,instance);
                            if (distance < instance.size) {
                                body.store.$foundEntity = instance
                                break;
                            }
                        }
                    }
                    if (fire) {
                        body.store.$justEnabledFire = true;
                        if (body.store.$foundEntity) {
                            let entity = body.store.$foundEntity;
                            if (!Class[entity.defs]) break;
                            if (entity.defs) {
                                body.define(Class[entity.defs]);
                                body.alpha = 1;
                            }
                        }
                        break;
                    }
                    if (altFire) {
                        body.store.$justEnabledAltFire = true;
                        if (body.store.$foundEntity) {
                            let entity = body.store.$foundEntity,
                                defs;
                            if (Array.isArray(entity.defs)) {
                                defs = entity.defs.join(', ')
                            }
                            defs = defs ?? entity.defs;
                            body.sendMessage(defs)
                        }
                        break
                    };
                };
                break
            case 6:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true;
                    if (!body.socket.player.grabbingInterval) {
                        let targetX = body.control.target.x + body.x,
                            targetY = body.control.target.y + body.y;
                        let target = {x:targetX, y:targetY};
                        for (instance of entities) {
                            if (instance.master == instance) {
                                let distance = util.getDistance(target,instance);
                                if (distance < instance.size) {
                                    body.socket.player.foundEntity = body.socket.player.foundEntity ? body.socket.player.foundEntity : [];
                                    body.socket.player.foundEntity.push(instance);                                       
                                }
                            }
                        }
                        if (body.socket.player.foundEntity) {
                            body.socket.player.grabbing = body.socket.player.foundEntity;
                            body.socket.player.foundEntity = null;
                        }
                        if (body.socket.player.grabbing && !body.socket.player.grabbingInterval) {
                            body.socket.player.grabbingInterval = setInterval(() => {
                                if (body.socket.player.grabbing.length) {
                                    body.socket.player.grabbing.forEach(entity => {
                                        entity.x = body.x + body.control.target.x;
                                        entity.y = body.y + body.control.target.y;
                                    })
                                }
                            }, 31.25)
                        }
                        body.socket.player.foundEntity = null;
                    } else {
                        clearInterval(body.socket.player.grabbingInterval);
                        body.socket.player.grabbingInterval = null;
                        body.socket.player.grabbing = null;
                    }
                }
                if (altFire && !body.store.$justEnabledAltFire) {
                    body.store.$justEnabledAltFire = true;
                    if (!body.socket.player.whirlpoolInterval) {
                        let targetX = body.control.target.x + body.x,
                            targetY = body.control.target.y + body.y;
                        let target = {x:targetX, y:targetY};
                        for (instance of entities) {
                            if (instance.master == instance) {
                                let distance = util.getDistance(target,instance);
                                body.socket.player.closestDistance = body.socket.player.closestDistance ? body.socket.player.closestDistance : Infinity;
                                if (distance < instance.size) {
                                    body.socket.player.foundEntity = body.socket.player.foundEntity ? body.socket.player.foundEntity : [];
                                    body.socket.player.foundEntity.push(instance);
                                }
                                if (distance < body.socket.player.closestDistance) {
                                    body.socket.player.closetEntity = instance;
                                    body.socket.player.closestDistance = distance;
                                }
                            }
                        }
                        body.socket.player.closestDistance = null;
                        if (!body.socket.player.foundEntity) {
                            body.socket.player.foundEntity = [body.socket.player.closetEntity];
                        }
                        body.socket.player.whirlpooling = body.socket.player.foundEntity;
                        body.socket.player.foundEntity = null;
                        body.socket.player.closetEntity = null;
                        if (body.socket.player.whirlpooling && !body.socket.player.whirlpoolInterval) {
                            body.socket.player.whirlpoolInterval = setInterval(() => {
                                if (body.socket.player.whirlpooling) {
                                    body.socket.player.whirlpooling.forEach(entity => {
                                        entity.x = body.x + body.control.target.x;
                                        entity.y = body.y + body.control.target.y;
                                    })
                                }
                            }, 31.25)
                        }
                        body.socket.player.closestEntity = null;
                    } else {
                        clearInterval(body.socket.player.whirlpoolInterval);
                        body.socket.player.whirlpoolInterval = null;
                        body.socket.player.whirlpooling = null;
                    }
                }
                break;
            case 7:
                if (fire && !body.store.$justEnabledFire) {
                    body.store.$justEnabledFire = true;
                    let targetX = body.control.target.x + body.x,
                        targetY = body.control.target.y + body.y;
                    let target = {x:targetX, y:targetY};
                    for (instance of entities) {
                        if (instance.master == instance) {
                            let distance = util.getDistance(target,instance);
                            if (distance < instance.size) {
                                instance.kill()
                                break;                         
                            }
                        }
                    }
                }
                if (altFire && !body.store.$justEnabledAltFire) {
                    body.store.$justEnabledAltFire = true;
                    let targetX = body.control.target.x + body.x,
                        targetY = body.control.target.y + body.y;
                    let target = {x:targetX, y:targetY};
                    for (instance of entities) {
                        if (instance.master == instance) {
                            let distance = util.getDistance(target,instance);
                            if (distance < instance.size) {
                                instance.health.amount = instance.health.max
                                instance.shield.amount = instance.shield.max
                                break;                         
                            }
                        }
                    }
                }
                break;
            case 8:
                if ((fire || altFire) && !body.store.$justEnabledFire && !body.store.$justEnabledAltFire) {
                    let targetX = body.control.target.x + body.x,
                        targetY = body.control.target.y + body.y;
                    let target = {x:targetX, y:targetY};
                    for (instance of entities) {
                        let distance = util.getDistance(target,instance);
                        if (distance < instance.size) {
                            if (fire) {
                                body.store.$justEnabledFire = true;
                                let healthAmount = Math.round(instance.health.amount * 100)/100,
                                    healthMax = Math.round(instance.health.max * 100)/100,
                                    healthSetAmount = Math.round(instance.HEALTH * 100)/100,
                                    shieldAmount = Math.round(instance.shield.amount * 100)/100,
                                    shieldMax = Math.round(instance.shield.max * 100)/100,
                                    shieldSetAmount = Math.round(instance.SHIELD * 100)/100,
                                    regen = Math.round(instance.REGEN * 100)/100,
                                    speed = Math.round(instance.topSpeed * 100)/100,
                                    acceleration = Math.round(instance.acceleration * 100)/100,
                                    penetrationAmount = Math.round(instance.penetration * 100)/100,
                                    penetrationSet = Math.round(instance.PENETRATION * 100)/100,
                                    resist = Math.round(instance.health.resist * 100)/100,
                                    resistSet = Math.round(instance.RESIST * 100)/100,
                                    damage = Math.round(instance.damage * 100)/100,
                                    damageSet = Math.round(instance.DAMAGE * 100)/100,
                                    pushability = Math.round(instance.pushability * 100)/100,
                                    pushabilitySet = Math.round(instance.PUSHABILITY * 100)/100,
                                    density = Math.round(instance.density * 100)/100,
                                    densitySet = Math.round(instance.DENSITY * 100)/100,
                                    fov = Math.round(instance.fov * 100)/100,
                                    fovSet = Math.round(instance.FOV * 100)/100,
                                    size = Math.round(instance.size * 100)/100,
                                    sizeSet = Math.round(instance.SIZE * 100)/100,
                                    coreSize = Math.round(instance.coreSize * 100)/100;

                                body.sendMessage(`Fov: ${fov}|${fovSet}, Size: ${size}|${sizeSet}, Core Size: ${coreSize}`)
                                body.sendMessage(`Resist: ${resist}|${resistSet}, Damage: ${damage}|${damageSet}, Pushability: ${pushability}|${pushabilitySet}, Density: ${density}|${densitySet}`)
                                body.sendMessage(`Heath: ${healthAmount}/${healthMax}|${healthSetAmount}, Shield: ${shieldAmount}/${shieldMax}|${shieldSetAmount}, Regen: ${regen}, Penetration: ${penetrationAmount}|${penetrationSet}`)
                            }
                            if (altFire) {
                                body.store.$justEnabledAltFire = true;
                                let x = Math.round(instance.x * 100)/100,
                                    y = Math.round(instance.y * 100)/100,
                                    tankTargetX = Math.round(instance.control.target.x * 100)/100,
                                    tankTargetY = Math.round(instance.control.target.y * 100)/100,
                                    actualTargetOnMapX = Math.round((instance.control.target.x + instance.x) * 100)/100,
                                    actualTargetOnMapY = Math.round((instance.control.target.y + instance.y) * 100)/100,
                                    name = instance.name,
                                    label = instance.label,
                                    tankIndex = instance.index,
                                    master = instance.master,
                                    source = instance.source,
                                    id = instance.id,
                                    team = instance.team,
                                    defs;
                                    if (Array.isArray(instance.defs)) {
                                        defs = instance.defs.join(', ')
                                    }
                                    defs = defs ?? instance.defs;
                                    body.sendMessage(`Name: ${name}, Label: ${label}, Tank Index: ${tankIndex}, Tank defs: ${defs}`)
                                    body.sendMessage(`Body Coordinates (X/Y): ${x}/${y}, Target X: ${actualTargetOnMapX}|${tankTargetX}, Target Y: ${actualTargetOnMapY}|${tankTargetY}`) 
                            }
                        }
                    }
                }
                break;
        }
        if (!override && body.store.$justEnabledOverride) { body.store.$justEnabledOverride = false; };
        if (!autofire && body.store.$justEnabledAutofire) { body.store.$justEnabledAutofire = false; };
        if (!fire && body.store.$justEnabledFire) { body.store.$justEnabledFire = false; };
        if (!altFire && body.store.$justEnabledAltFire) { body.store.$justEnabledAltFire = false; };
        
        }
        },
     ]
}
Class.developer.UPGRADES_TIER_0.push("spectatorUltimate");