//Create a spell named Shadow Blade it needs to have concentration, range and target self
//Add a dae effect with duration 60 seconds make sure to uncheck transfer effect to actor on item equip
//Activate macro on use in the spell, and write 'ItemMacro' in the text slot, leave after active effects in the drop down list.
//Paste this in the item macro tab of the spell.
//Modules needed: DAE, Times Up, Item Macro, Advanced Macros, MidiQOL
//################################################################################################################################

actor = await fromUuid(args[0].actorUuid);
//Checking spell level to decide how many dice to roll
let spelllevel=args[0].spellLevel;
let numDice;
if(spelllevel<=2)
numDice = 2;
if(spelllevel>=3 && spelllevel<=4)
numDice = 3;
if(spelllevel>=5 && spelllevel<=6)
numDice = 4;
if(spelllevel>=7)
numDice = 5;
//Creating item shadow blade
const itemData = {
    name: "Summoned " + args[0].itemData.name,
    type: "weapon",
    img: args[0].itemData.img,
    data: {
        description: {
        value: "<div class=\"rd__b  rd__b--3\">\n<p>You weave together threads of shadow to create a sword of solidified gloom in your hand. This magic sword lasts until the spell ends. It counts as a simple melee weapon with which you are proficient. It deals [[/r 2d8]] psychic damage on a hit and has the finesse, light, and thrown properties (range 20/60). In addition, when you use the sword to attack a target that is in dim light or darkness, you make the attack roll with advantage.</p>\n<div class=\"rd__spc-inline-post\">&nbsp;</div>\n<p>If you drop the weapon or throw it, it dissipates at the end of the turn. Thereafter, while the spell persists, you can use a bonus action to cause the sword to reappear in your hand.</p>\n</div>\n<div class=\"rd__b  rd__b--3\">\n<div class=\"rd__b  rd__b--3\"><span class=\"rd__h rd__h--3\" data-title-index=\"14633\">At Higher Levels.</span>\n<p>When you cast this spell using a 3rd- or 4th-level spell slot, the damage increases to [[/r 3d8]]. When you cast it using a 5th- or 6th-level spell slot, the damage increases to [[/r 4d8]]. When you cast it using a spell slot of 7th level or higher, the damage increases to [[/r 5d8]].</p>\n</div>\n</div>",
        chat: "",
        unidentified: ""
      },
    quantity: 1,
    attunement: 0,
    equipped: true,
    identified: true,
    activation: {
      type: "action",
      cost: 1,
      condition: ""
    },
    target: {
      value: 1,
      type: "creature"
    },
    range: {
      value: 20,
      long: 60,
      units: "ft"
    },
    ability: "",
    actionType: "mwak",
    attackBonus: "0",
    critical: {
      threshold: null,
      damage: ""
    },
    damage: {parts: [[[`${numDice}d8`,"+ @mod"], "psychic"]]},
    formula: "",
    armor: {value: 10},
    hp: {
      value: 0,
      max: 0,
      dt: null,
      conditions: ""
    },
    weaponType: "simpleM",
    baseItem: "",
    properties: {
      ada: false,
      amm: false,
      fin: true,
      fir: false,
      foc: false,
      hvy: false,
      lgt: true,
      lod: false,
      mgc: true,
      rch: false,
      rel: false,
      ret: false,
      sil: false,
      spc: false,
      thr: true,
      two: false,
      ver: false
    },
    proficient: true
},
  };
//Creating Spell Shadow Booming Blade
  const itemData2 = {
    name: "Shadow Booming Blade" ,
    type: "spell",
    img: args[0].itemData.img,
    data: {
        description: {
          value: "<div class=\"rd__b  rd__b--3\"><p>You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes [[/r 1d8]] thunder damage, and the spell ends.</p><div class=\"rd__spc-inline-post\"></div><p>This spell's damage increases when you reach certain levels. At 5th level, the melee attack deals an extra [[/r 1d8]] thunder damage to the target on a hit, and the damage the target takes for moving increases to [[/r 2d8]]. Both damage rolls increase by 1d8 at 11th level ([[/r 2d8]] and [[/r 3d8]]) and again at 17th level ([[/r 3d8]] and [[/r 4d8]]).</p></div>",
        },
        source: "TCE",
        activation: {
          type: "action",
          cost: 1,
          condition: "[on willing movement]"
        },
        duration: {
          value: 1,
          units: "round"
        },
        target: {
          value: 1,
          width: null,
          units: "",
          type: "creature"
        },
        range: {
          value: 5,
          long: null,
          units: "ft"
        },
        ability: "dex",
        actionType: "mwak",
        attackBonus: "",
        chatFlavor: "",
        critical: {
          threshold: null,
          damage: ""
        },
        damage: {
          parts: [["(floor(((@details.level + @details.spellLevel) + 1) / 6))d8", "thunder"],[[`${numDice}d8`,"+ @mod"], "psychic"]],
        },
        formula: "(floor(((@details.level + @details.spellLevel) + 1) / 6) + 1)d8[on willing movement]",
        save: {
          ability: "",
          dc: null,
          scaling: "spell"
        },
        level: 0,
        school: "evo",
        components: {
          value: "",
          vocal: false,
          somatic: true,
          material: true,
          ritual: false,
          concentration: false
        },
        materials: {
          value: "a melee weapon worth at least 1 sp",
          consumed: false,
          cost: 0,
          supply: 0
        },
        preparation: {
          mode: "always",
          prepared: true
        },
        scaling: {
          mode: "none",
          formula: ""
        }
      },
      effects: [
        {
          _id: "4gm2loykrlymyrfl",
          changes: [],
          disabled: false,
          duration: {specialDuration: ["isMoved", "turnStartSource"], startTime: null},
          icon: "modules/plutonium/media/icon/spell/tce-booming-blade.webp",
          label: "Booming Blade",
          transfer: false,
          flags: {
            core: {
              statusId: ""
            },
            dae: {
                stackable: "none",
                durationExpression: "",
                macroRepeat: "none",
                transfer: false,
                specialDuration: ["turnStartSource", "isMoved"]
              },
            ActiveAuras: {
              isAura: false,
              aura: "None",
              radius: null,
              alignment: "",
              type: "",
              ignoreSelf: false,
              height: false,
              hidden: false,
              displayTemp: false,
              hostile: false,
              onlyOnce: false
            }
          },
          tint: null
        }
      ],
  };
//Deleting the item and spell after concentration ends, there was probably a better way to write this but im not that good at this.
const items = (await actor.createEmbeddedDocuments("Item", [itemData])).map(i=> i.uuid);
const items2 = (await actor.createEmbeddedDocuments("Item", [itemData2])).map(i=> i.uuid);
let removeUuids = getProperty(actor.data.flags, "midi-qol.concentration-data.removeUuids") ?? [];
let removeUuids2 = getProperty(actor.data.flags, "midi-qol.concentration-data.removeUuids") ?? [];
removeUuids = removeUuids.concat(items);
removeUuids2 = removeUuids.concat(items2);
if (removeUuids.length > 0) actor.setFlag("midi-qol", "concentration-data.removeUuids", removeUuids);
if (removeUuids2.length > 0) actor.setFlag("midi-qol", "concentration-data.removeUuids", removeUuids2);
