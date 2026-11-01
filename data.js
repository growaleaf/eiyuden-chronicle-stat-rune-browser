// Eiyuden Chronicle: Hundred Heroes — Character Stat & Rune-Lens Browser data.
//
// Character stat/rune-lens rows are transcribed directly from eiyuden.wiki.gg (non-Fandom)
// per-character Gameplay subpages, fetched and read by this worker on 2026-11-01 — not copied
// from the orchestrator charter's own description of what those pages contain (Principle XXII:
// read the primary source yourself). Rune database rows are transcribed directly from
// gamerguides.com's four rune category pages.
//
// CORRECTIONS TO THE ORCHESTRATOR'S CHARTER (found only by fetching the primary sources myself):
//
// 1. The charter describes the rune database as living at a single page plus "/passive and
//    /skill subpages" (two categories). The real gamerguides.com rune database has FOUR category
//    pages, not two: Enhancement (59 runes), Magic (24), Passive (29), Skill (67) = 179 total.
//    All four are included below, not just passive/skill, because excluding the other two would
//    have silently thrown away 83 real runes (Magic + Enhancement) that the charter never said
//    to omit — it just didn't know they existed.
//
// 2. The charter describes rune-lens data as "slot count/colors." The real per-character
//    Gameplay page has no color field at all. Each rune-lens slot instead has: a release level
//    (the character level that unlocks it), a slot TYPE (Skill / Status / Magic / Passive /
//    All), a RARITY (Uncommon / Rare / Epic) describing the minimum-or-higher rune rarity the
//    slot accepts, and either a fixed granted rune (for "Skill" slots tied to that character's
//    kit) or a free slot the player fills themselves. This is shipped as the real structure,
//    not force-fit into a "slot count + color" shape that doesn't exist in the source.
//
// 3. Not every recruitable roster member has combat stats or a rune-lens table at all. Three
//    confirmed by direct fetch: Code L and Kassius (Unit Type "Support") and Huang (Unit Type
//    "Other") have Gameplay pages with no stat table and no rune-lens table — they unlock a
//    Headquarters facility or a battle-support skill instead of joining as a statted party
//    member. These are shown in the character list with their role disclosed, not with guessed
//    or blank-as-zero stats.
//
// 4. The wiki's /wiki/Characters index page lists roughly 150 names total, which is NOT a
//    recruitable-roster count — it mixes in non-recruitable enemies/bosses (confirmed directly:
//    "Dead countess" is Kind "Boss - Undead"; "Narungarde" has only an /Enemy subpage, no
//    Gameplay tab) and Eiyuden Chronicle: Rising-exclusive names. The Recruitment guide page's
//    own text ("Recruit all other 119 characters before her checkpoint," referring to Leene)
//    implies a real recruitable total near 120, not ~150. This page's "17 of ~120" coverage
//    disclosure uses the Recruitment-guide-derived figure, not the index page's raw name count.
//
// COVERAGE: 14 characters with full combat stats + rune-lens data, plus 3 roster members
// confirmed to have no combat data (role disclosed instead), fetched and verified directly =
// 17 of an estimated ~120 recruitable roster. This is a disclosed partial subset, not the full
// roster — see README.md and the in-page Sources section for the honest count.
//
// Stat table shape varies per character on the source wiki: a few pages (Nowa, Seign Kesling)
// show a distinct "Base" row separate from the Lv.1 row; most pages show only Lv.1/Lv.50/Lv.99
// with no separate Base row. Both are shown as sourced — "base: null" means the source page had
// no separate Base row for that character, not a missing/guessed value.

(function (root) {
  "use strict";

  var SOURCES = [
    { name: "eiyuden.wiki.gg — Characters index", url: "https://eiyuden.wiki.gg/wiki/Characters" },
    { name: "eiyuden.wiki.gg — Recruitment guide", url: "https://eiyuden.wiki.gg/wiki/Recruitment_guide" },
    { name: "eiyuden.wiki.gg — per-character Gameplay subpages (14 fetched directly)", url: "https://eiyuden.wiki.gg/wiki/Nowa/Gameplay" },
    { name: "gamerguides.com — Rune database: Passive (29)", url: "https://gamerguides.com/eiyuden-chronicle-hundred-heroes/database/runes/passive" },
    { name: "gamerguides.com — Rune database: Skill (67)", url: "https://gamerguides.com/eiyuden-chronicle-hundred-heroes/database/runes/skill" },
    { name: "gamerguides.com — Rune database: Magic (24)", url: "https://gamerguides.com/eiyuden-chronicle-hundred-heroes/database/runes/magic" },
    { name: "gamerguides.com — Rune database: Enhancement (59)", url: "https://gamerguides.com/eiyuden-chronicle-hundred-heroes/database/runes/enhancement" }
  ];
  var FETCHED = "2026-11-01";

  function stats(hp, mp, pwr, mgc, dex, spd, pd, md, luk) {
    return { HP: hp, MP: mp, PWR: pwr, MGC: mgc, DEX: dex, SPD: spd, PD: pd, MD: md, LUK: luk };
  }

  var CHARACTERS = [
    {
      name: "Nowa", unitType: "Battle", hasCombatData: true,
      base: stats(59, 81, 95, 93, 91, 94, 94, 93, 107),
      lv1: stats(31, 10, 27, 22, 25, 25, 25, 22, 24),
      lv50: stats(293, 215, 218, 145, 198, 181, 181, 145, 196),
      lv99: stats(597, 373, 452, 281, 361, 361, 361, 281, 407),
      runeLens: [
        { level: 1, type: "Skill", rarity: "Epic", details: "Grants the Rune of Swinging Slash." },
        { level: 10, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 20, type: "Skill", rarity: "Epic", details: "Grants the Rune of Chain Smash." },
        { level: 30, type: "All", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare rune." },
        { level: 40, type: "Skill", rarity: "Epic", details: "Grants the Rune of Searing Blast Wave." },
        { level: 50, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 60, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." }
      ]
    },
    {
      name: "Seign Kesling", unitType: "Battle", hasCombatData: true,
      base: stats(59, 82, 94, 94, 97, 106, 106, 106, 94),
      lv1: stats(31, 19, 25, 25, 22, 23, 23, 23, 25),
      lv50: stats(293, 272, 181, 181, 127, 163, 163, 163, 181),
      lv99: stats(597, 548, 361, 361, 360, 325, 325, 325, 361),
      runeLens: [
        { level: 1, type: "Skill", rarity: "Epic", details: "Grants the Rune of Sword Rain." },
        { level: 10, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." },
        { level: 21, type: "All", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare rune." },
        { level: 32, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 43, type: "Skill", rarity: "Epic", details: "Grants the Rune of Lightning Rush." },
        { level: 54, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." }
      ]
    },
    {
      name: "Marisa", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(28, 30, 25, 24, 25, 24, 22, 22, 25),
      lv50: stats(264, 338, 181, 196, 198, 196, 122, 145, 181),
      lv99: stats(537, 676, 361, 407, 283, 407, 202, 281, 361),
      runeLens: [
        { level: 1, type: "Skill", rarity: "Epic", details: "Grants the Rune of Magic Strike." },
        { level: 10, type: "Magic", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Magic rune." },
        { level: 21, type: "Passive", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Passive rune." },
        { level: 32, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." },
        { level: 43, type: "Skill", rarity: "Epic", details: "Grants the Rune of Pooby, help!." },
        { level: 54, type: "Status", rarity: "Epic", details: "Free slot, accepts any Status rune." }
      ]
    },
    {
      name: "Perrielle Grum", unitType: "Hybrid", hasCombatData: true,
      base: null,
      lv1: stats(24, 20, 20, 23, 20, 20, 22, 25, 20),
      lv50: stats(224, 274, 131, 163, 131, 131, 122, 198, 151),
      lv99: stats(399, 367, 253, 325, 253, 253, 202, 283, 406),
      runeLens: [
        { level: 1, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." },
        { level: 14, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 28, type: "Passive", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Passive rune." },
        { level: 42, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." }
      ]
    },
    {
      name: "Garoo", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(39, 10, 27, 20, 21, 22, 25, 25, 25),
      lv50: stats(358, 215, 218, 131, 221, 145, 181, 181, 181),
      lv99: stats(790, 373, 452, 253, 322, 281, 361, 361, 361),
      runeLens: [
        { level: 1, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 14, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 28, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 42, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." }
      ]
    },
    {
      name: "Isha", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(24, 30, 22, 27, 23, 23, 25, 24, 27),
      lv50: stats(224, 338, 145, 218, 178, 245, 181, 196, 218),
      lv99: stats(399, 676, 281, 452, 255, 358, 361, 407, 452),
      runeLens: [
        { level: 1, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." },
        { level: 10, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 21, type: "Status", rarity: "Epic", details: "Free slot, accepts any Status rune." },
        { level: 32, type: "Skill", rarity: "Epic", details: "Grants the Rune of Ice Needle." },
        { level: 43, type: "Passive", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Passive rune." },
        { level: 54, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." }
      ]
    },
    {
      name: "Mio", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(24, 20, 22, 23, 25, 27, 22, 22, 25),
      lv50: stats(224, 274, 168, 163, 249, 218, 145, 145, 181),
      lv99: stats(399, 367, 451, 325, 498, 452, 281, 281, 361),
      runeLens: [
        { level: 1, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." },
        { level: 12, type: "Skill", rarity: "Epic", details: "Grants the Rune of Iaido Strike." },
        { level: 24, type: "Passive", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Passive rune." },
        { level: 36, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." },
        { level: 48, type: "Status", rarity: "Epic", details: "Free slot, accepts any Status rune." }
      ]
    },
    {
      name: "Rudy", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(31, 10, 22, 22, 23, 27, 23, 22, 22),
      lv50: stats(293, 183, 186, 88, 178, 218, 163, 145, 122),
      lv99: stats(597, 230, 495, 130, 255, 452, 325, 281, 202),
      runeLens: [
        { level: 1, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 14, type: "All", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare rune." },
        { level: 28, type: "Passive", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Passive rune." },
        { level: 42, type: "Passive", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Passive rune." }
      ]
    },
    {
      name: "Viesskin", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(35, 10, 24, 23, 25, 21, 25, 23, 23),
      lv50: stats(322, 215, 196, 163, 181, 221, 181, 163, 163),
      lv99: stats(711, 373, 407, 325, 361, 322, 361, 325, 325),
      runeLens: [
        { level: 1, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 14, type: "Magic", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Magic rune." },
        { level: 28, type: "Skill", rarity: "Epic", details: "Grants the Rune of Draconic Fury." },
        { level: 42, type: "Status", rarity: "Epic", details: "Free slot, accepts any Status rune." }
      ]
    },
    {
      name: "Zabi", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(24, 30, 20, 24, 23, 23, 20, 23, 23),
      lv50: stats(193, 338, 79, 196, 178, 178, 110, 178, 163),
      lv99: stats(289, 676, 117, 407, 255, 255, 182, 255, 325),
      runeLens: [
        { level: 1, type: "Magic", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Magic rune." },
        { level: 14, type: "Magic", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Magic rune." },
        { level: 28, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 42, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." }
      ]
    },
    {
      name: "Dr. Corque", unitType: "Hybrid", hasCombatData: true,
      base: null,
      lv1: stats(24, 10, 23, 23, 21, 20, 20, 20, 25),
      lv50: stats(224, 125, 163, 163, 221, 131, 131, 131, 198),
      lv99: stats(399, 160, 325, 325, 322, 253, 253, 253, 283),
      runeLens: [
        { level: 1, type: "Passive", rarity: "Epic", details: "Grants the Rune of This Beigoma Is Mine!, Corque's exclusive rune." },
        { level: 14, type: "Skill", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Skill rune." },
        { level: 28, type: "Passive", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Passive rune." },
        { level: 42, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." }
      ]
    },
    {
      name: "Reyna", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(24, 10, 23, 22, 22, 23, 25, 22, 25),
      lv50: stats(304, 215, 245, 145, 168, 163, 249, 168, 181),
      lv99: stats(933, 373, 358, 281, 451, 325, 498, 451, 361),
      runeLens: [
        { level: 1, type: "All", rarity: "Uncommon", details: "Free slot, accepts any Uncommon rune." },
        { level: 14, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 28, type: "Status", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Status rune." },
        { level: 42, type: "Magic", rarity: "Uncommon", details: "Free slot, accepts any Uncommon Magic rune." }
      ]
    },
    {
      name: "Leene", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(22, 10, 22, 22, 22, 22, 22, 22, 25),
      lv50: stats(183, 191, 127, 127, 168, 168, 88, 88, 249),
      lv99: stats(544, 545, 360, 360, 451, 451, 99, 99, 329),
      runeLens: [
        { level: 1, type: "Skill", rarity: "Epic", details: "Grants the Rune of Full Force Clacker." },
        { level: 10, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 20, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 29, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 38, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 48, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 57, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." },
        { level: 60, type: "All", rarity: "Epic", details: "Free slot, accepts any rune." }
      ]
    },
    {
      name: "Markus", unitType: "Battle", hasCombatData: true,
      base: null,
      lv1: stats(24, 20, 22, 24, 25, 23, 20, 22, 20),
      lv50: stats(148, 381, 145, 196, 181, 163, 131, 145, 114),
      lv99: stats(401, 548, 281, 407, 361, 325, 253, 281, 324),
      runeLens: [
        { level: 1, type: "Skill", rarity: "Epic", details: "Grants the Rune of Summon Revenant Army." },
        { level: 10, type: "Magic", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Magic rune." },
        { level: 20, type: "Skill", rarity: "Epic", details: "Grants the Rune of Skeleton King Flick." },
        { level: 29, type: "Magic", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Magic rune." },
        { level: 38, type: "Status", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare Status rune." },
        { level: 48, type: "Magic", rarity: "Epic", details: "Free slot, accepts any Magic rune." },
        { level: 57, type: "All", rarity: "Rare", details: "Free slot, accepts any Uncommon or Rare rune." },
        { level: 66, type: "Skill", rarity: "Epic", details: "Grants the Rune of Summon Skeleton King." }
      ]
    },
    {
      name: "Code L", unitType: "Support", hasCombatData: false,
      noDataNote: "This roster member's Gameplay page has no stat table and no rune-lens table. " +
        "Manages the Rune-Lens Shop at Headquarters once recruited. Battle role is a support " +
        "skill (\"Limiter Release\": raises each ally's SP by 1), not a statted party slot."
    },
    {
      name: "Kassius", unitType: "Support", hasCombatData: false,
      noDataNote: "This roster member's Gameplay page has no stat table and no rune-lens table. " +
        "Battle role is a manually-activated support skill (\"Euchrisse Cavalry Charge\": fixed " +
        "Thrust damage to all enemies, not affected by buffs), not a statted party slot."
    },
    {
      name: "Huang", unitType: "Other", hasCombatData: false,
      noDataNote: "This roster member's Gameplay page has no stat table and no rune-lens table. " +
        "Recruiting Huang (in Hishahn) unlocks the Build Fishing Spot Development Panel at " +
        "Headquarters rather than adding a statted party member."
    }
  ];

  var STAT_KEYS = ["HP", "MP", "PWR", "MGC", "DEX", "SPD", "PD", "MD", "LUK"];

  // ───────────────────────────────── Rune database (gamerguides.com, 4 categories, 179 total)

  function rune(name, category, effect) {
    return { name: name, category: category, effect: effect };
  }

  var RUNES = [];

  [
    ["Rune of Alicanto's Blessing", "El Alicanto's exclusive rune. Increases item drop rate."],
    ["Rune of Chivalry", "Maxim's exclusive rune. Protects female party members."],
    ["Rune of Conservation", "Gieran's exclusive rune. Reduces MP consumption during magic use by 20%."],
    ["Rune of Golem Disassembly", "Pohl's exclusive rune. Increases damage to golem enemies by 50%."],
    ["Rune of Medical Studies", "Increases the effect of healing items by 50%."],
    ["Rune of Obscured Sight", "You will be less likely to be targeted by enemies."],
    ["Rune of Runeshard Studies", "Increases runeshard magic effect by 20%."],
    ["Rune of SP Charge", "Increases SP recovery to 2 per turn."],
    ["Rune of SP Conversion: Defense", "Increases physical and magic defense by 2% per remaining SP."],
    ["Rune of SP Conversion: High Magic", "Increases magic by 4% per remaining SP."],
    ["Rune of SP Conversion: Iron Defense", "Increases physical and magic defense by 4% per remaining SP."],
    ["Rune of SP Conversion: Magic", "Increases magic by 2% per remaining SP."],
    ["Rune of SP Conversion: Mighty Power", "Increases strength by 4% per remaining SP."],
    ["Rune of SP Conversion: Power", "Increases strength by 2% per remaining SP."],
    ["Rune of SP Conversion: Speed", "Increases speed by 2% per remaining SP."],
    ["Rune of SP Conversion: Swift Speed", "Increases speed by 4% per remaining SP."],
    ["Rune of Tenacity", "Yusuke's exclusive rune. Allows withstanding an incapacitating attack once with only 1 HP."],
    ["Rune of the Firefly", "You will be more likely to be targeted by enemies."],
    ["Rune of the Fortress", "Yuthus' exclusive rune. He will cover all his allies."],
    ["Rune of the Knight's Path", "Halves strength and magic in exchange for a 50% physical and magic defense boost."],
    ["Rune of the Mage's Path", "Halves physical and magic defense in exchange for a 50% magic boost."],
    ["Rune of the Mage's Pinnacle", "Awakening is activated when starting a battle if placed in the rear."],
    ["Rune of the Magical Font", "Momo's exclusive rune. Increases magic and magic defense by 6% per remaining SP."],
    ["Rune of the Necromancer's Secrets", "Milana's exclusive rune. Increases damage to revenant enemies by 50%."],
    ["Rune of the Sniper's Pinnacle", "Focus is activated when starting a battle if placed on high ground."],
    ["Rune of the Warrior's Path", "Halves physical and magic defense in exchange for a 50% strength boost."],
    ["Rune of the Warrior's Pinnacle", "Fiery Spirit is activated when starting a battle if placed in the front."],
    ["Rune of This Beigoma Is Mine!", "Corque's exclusive rune. Increases beigoma drop rate."],
    ["Rune of This Treasure Chest Is Mine!", "Faye's exclusive rune. All Treasure Chests opened in battle will be successful."]
  ].forEach(function (r) { RUNES.push(rune(r[0], "Passive", r[1])); });

  [
    ["Rune of Aimed Shot", "Deal 1 enemy moderate attribute damage. Greater if used from high ground."],
    ["Rune of Armor Break", "Deal 1 enemy attribute damage and moderately damage its armor."],
    ["Rune of Armor Pierce", "Bypass an enemy's armor and deal moderate attribute damage."],
    ["Rune of Armor Piercing", "Bypass an enemy's armor and deal attribute damage."],
    ["Rune of Blessing of Proven Verdure", "Power of trees deals attribute damage to 1 and heals your HP and status."],
    ["Rune of Blinding Fog", "Cloud of fog. High chance of inflicting blindness on all enemies."],
    ["Rune of Calm Fury", "Convert rage into magic stat. Enter a fired up state. Duration: 3 turns."],
    ["Rune of Chain Smash", "Deal a fierce attack to one enemy for minor attribute damage."],
    ["Rune of Channel Qi Attack", "Deal 1 enemy attribute damage and grants HP recovery for three turns."],
    ["Rune of Channel Qi: Last Resort", "Strength thrown into 3 strikes for heavy attribute damage to 1 enemy, then returns."],
    ["Rune of Channel Qi: Transformation", "Physical attack and speed UP for 3 turns. Minor attribute damage to 1 enemy."],
    ["Rune of Charge Smash", "Deal 1 enemy moderate attribute damage. Delays own turn."],
    ["Rune of Cheap Shot", "Deal 1 enemy attribute damage. High action speed and stun probability."],
    ["Rune of Double Slash", "Attack with 2 hit combo for attribute damage. Boosts physical attack for 3 turns."],
    ["Rune of Draconic Fury", "Boost all allies' physical and magic attack for 3 turns."],
    ["Rune of Dragon", "Write the \"dragon\" kanji to deal moderate attribute damage to all enemies."],
    ["Rune of Feint Thrust", "Deal 1 enemy attribute damage with a high stun probability."],
    ["Rune of Flame", "Write the \"flame\" kanji to deal attribute damage to one enemy."],
    ["Rune of Flying Alicanto", "Fly, dealing attribute damage to all enemies and taking damage yourself."],
    ["Rune of Friend Attack", "Charge headlong to deal one front-row enemy heavy attribute damage."],
    ["Rune of Full Force Clacker", "Clackers deal minor to heavy attribute damage to all."],
    ["Rune of Full Power & Focus Magic", "Focus magical power to a point, dealing heavy attribute damage to one enemy."],
    ["Rune of Full Spin Rocket Hammer", "A rocket hits one enemy three times, dealing moderate attribute damage."],
    ["Rune of Full Torque Spinning Punch", "Smash an enemy with all your might, dealing minor-heavy attribute damage."],
    ["Rune of Get Lost!", "A spell of attribute to teleport all enemies away, fleeing the battle."],
    ["Rune of Gold Rush", "Attack 1 enemy with a 4-hit combo for attribute damage. Can steal a treasure."],
    ["Rune of Ground Shatter", "Deal 1 enemy attribute damage. Can blind and has high stun probability."],
    ["Rune of Hail of Flails", "Flails deal minor to heavy attribute damage to one row."],
    ["Rune of Heat Breath", "Exhale attribute breath that deals moderate damage to all enemies."],
    ["Rune of Herbal Alchemy", "Administer herbs from your inventory to an ally for minor healing."],
    ["Rune of Iaido Strike", "Slice through for heavy attribute damage, and occasionally kill them instantly."],
    ["Rune of Ice Needle", "Icicles for moderate attribute damage to a row. Reduces action speed for 3 turns."],
    ["Rune of Jaw Crush", "Two strikes, body and soul. Deals moderate attribute damage to one enemy."],
    ["Rune of Killing Shot", "Fire a single deadly arrow at one enemy for moderate attribute damage."],
    ["Rune of Lightning Rush", "Strike through the enemies as a lightning bolt for moderate attribute damage to all."],
    ["Rune of Lion's Roar Flamethrower", "The Stone Lion unleashes on one enemy for moderate attribute damage."], // slop-lint: allow SLOP005 - "unleashes" is the game's own sourced effect text, not marketing copy
    ["Rune of Magic Barrage", "Convert magical power to attribute and attack one row for moderate damage."],
    ["Rune of Magic Strike", "Convert magical power to attribute and attack one enemy for moderate damage."],
    ["Rune of Magical Cutie Shot", "The love of a magical girl. Deals moderate attribute damage to one enemy."],
    ["Rune of Magical Guided Missile Burst", "Fire all your magical missiles. Moderate attribute damage to all enemies."],
    ["Rune of Magical Lyrical Shot", "The beat of a magical girl's heart. Deals attribute damage to all enemies."],
    ["Rune of Magical Sweet Explosion", "Unleash the true power of a righteous magical girl. Heavy attribute damage to all enemies."], // slop-lint: allow SLOP005 - "Unleash" is the game's own sourced effect text, not marketing copy
    ["Rune of Muscle Boost Magic", "A spell that increases physical attack and action speed for three turns."],
    ["Rune of Paralyzing Thrust", "Deal 1 enemy moderate attribute damage and possibly paralyze."],
    ["Rune of Pooby, help!", "Pooby rages through all enemies, dealing moderate attribute damage."],
    ["Rune of Power Smash", "Attempt massive attribute damage with a 50% chance of missing."],
    ["Rune of Quick Slash", "Strike with a quick slash that deals 1 enemy minor attribute damage."],
    ["Rune of Rain of Arrows", "Fire arrows into the sky, inflicting attribute damage on all enemies."],
    ["Rune of Rapid Shot", "Deal 1 enemy attribute damage."],
    ["Rune of Reckless Slash", "Deal 1 enemy heavy attribute damage. Reduce its physical defense for 3 turns."],
    ["Rune of Searing Blast Wave", "Attack all enemies with a flaming combo, dealing heavy attribute damage."],
    ["Rune of Shadow Clone Jutsu", "Split into shadow clones to attack a row of enemies for attribute damage."],
    ["Rune of Sidewinder", "Deal 1 enemy attribute damage and possibly poison it."],
    ["Rune of Skeleton King Flick", "Summon the Skeleton King's hand to flick 1 enemy for attribute damage."],
    ["Rune of Skeleton King Flick", "Skeleton King's hand flicks 1 enemy. Moderate attribute damage for 3 turns."],
    ["Rune of Slash", "All spirit and SP for attribute attack against one enemy. More SP, more damage."],
    ["Rune of Sleep Slash", "A slash dealing normal attribute damage. Possibly puts target to sleep."],
    ["Rune of Slowing Shot", "Deal 1 enemy moderate attribute damage and lower its action speed for 3 turns."],
    ["Rune of Sniper Arrow", "Fire a well-aimed arrow at one enemy for moderate attribute damage."],
    ["Rune of Summon Revenant Army", "Summon the revenant army to attack all enemies for minor attribute damage."],
    ["Rune of Summon Revenant Army", "Summon the revenant army to deal all enemies attribute damage."],
    ["Rune of Summon Skeleton King", "Summon the Skeleton King to deal heavy attribute damage to all enemies."],
    ["Rune of Swinging Slash", "Attack one enemy with an eight-hit combo for moderate attribute damage."],
    ["Rune of Sword Rain", "Release the regule's power to deal attribute damage to a column of enemies."],
    ["Rune of Take That!", "Mysterious. Whatever it is, it deals attribute damage to one enemy."],
    ["Rune of Twin Cyclone", "Whip up a tornado that deals massive attribute damage to one row of enemies."],
    ["Rune of You've Pissed Me Off!", "Mysterious. Whatever it is, deals heavy attribute damage to all enemies."]
  ].forEach(function (r) { RUNES.push(rune(r[0], "Skill", r[1])); });

  [
    ["Rune of Brilliance", "Grants ability to wield Level IV-VI light magic."],
    ["Rune of Conflagration", "Grants ability to wield Level IV-VI fire magic."],
    ["Rune of Currents", "Grants ability to wield Level III-V water magic."],
    ["Rune of Dark", "Grants ability to wield Level I-III dark magic."],
    ["Rune of Dark Enchantment", "Grants ability to wield magic swords (dark) and use resistance magic."],
    ["Rune of Earth", "Grants ability to wield Level I-III earth magic."],
    ["Rune of Earth Enchantment", "Grants ability to wield magic swords (earth) and use resistance magic."],
    ["Rune of Fire", "Grants ability to wield Level I-III fire magic."],
    ["Rune of Fire Enchantment", "Grants ability to wield magic swords (fire) and use resistance magic."],
    ["Rune of Inferno", "Grants ability to wield Level III-V fire magic."],
    ["Rune of Land", "Grants ability to wield Level IV-VI earth magic."],
    ["Rune of Light", "Grants ability to wield Level I-III light magic."],
    ["Rune of Light Enchantment", "Grants ability to wield magic swords (light) and use resistance magic."],
    ["Rune of Pure Water", "Grants ability to wield Level IV-VI water magic."],
    ["Rune of Radiance", "Grants ability to wield Level III-V light magic."],
    ["Rune of Stone", "Grants ability to wield Level III-V earth magic."],
    ["Rune of Storm", "Grants ability to wield Level III-V wind magic."],
    ["Rune of Tempest", "Grants ability to wield Level IV-VI wind magic."],
    ["Rune of the Abyss", "Grants ability to wield Level III-V dark magic."],
    ["Rune of the Void", "Grants ability to wield Level IV-VI dark magic."],
    ["Rune of Water", "Grants ability to wield Level I-III water magic."],
    ["Rune of Water Enchantment", "Grants ability to wield magic swords (water) and use resistance magic."],
    ["Rune of Wind", "Grants ability to wield Level I-III wind magic."],
    ["Rune of Wind Enchantment", "Grants ability to wield magic swords (wind) and use resistance magic."]
  ].forEach(function (r) { RUNES.push(rune(r[0], "Magic", r[1])); });

  [
    ["Rune of Arcane Magic", "Increases magic by 15%."],
    ["Rune of Confusion Immunity", "Increases confusion resistance by 100%."],
    ["Rune of Armor", "Increases armor value by 50%."],
    ["Rune of Blessed Luck", "Increases luck by 20%."],
    ["Rune of Blind Immunity", "Increases blindness resistance by 100%."],
    ["Rune of Blind Resistance", "Increases blindness resistance by 30%."],
    ["Rune of Blunt Resistance", "Increases smash resistance by 10%."],
    ["Rune of Bulwark", "Increases armor value by 100%."],
    ["Rune of Clairvoyance", "Increases critical hit rate by 40%."],
    ["Rune of Confusion Resistance", "Increases confusion resistance by 30%."],
    ["Rune of Dark Resistance", "Increases dark resistance by 10%."],
    ["Rune of Defense", "Increases physical defense by 5%."],
    ["Rune of Divine Skill", "Increases DEX by 20%."],
    ["Rune of Earth Resistance", "Increases earth resistance by 10%."],
    ["Rune of Fire Resistance", "Increases fire resistance by 10%."],
    ["Rune of Flying Resistance", "Increases projectile resistance by 10%."],
    ["Rune of Foresight", "Increases critical hit rate by 20%."],
    ["Rune of Great Luck", "Increases luck by 10%."],
    ["Rune of Hardened Defense", "Increases physical defense by 10%."],
    ["Rune of High Magic", "Increases magic by 10%."],
    ["Rune of HP", "Increases HP by 15%."],
    ["Rune of HP+", "Increases HP by 30%."],
    ["Rune of Impassable Resistance", "Increases magic defense by 15%."],
    ["Rune of Impregnable Defense", "Increases physical defense by 15%."],
    ["Rune of Interference", "Increases stun probability by 25%."],
    ["Rune of Lens-Seal Immunity", "Increases lens-seal resistance by 100%."],
    ["Rune of Lens-Seal Resistance", "Increases lens-seal resistance by 30%."],
    ["Rune of Light Resistance", "Increases light resistance by 10%."],
    ["Rune of Luck", "Increases luck by 5%."],
    ["Rune of Magic", "Increases magic by 5%."],
    ["Rune of Martial Resistance", "Increases grapple resistance by 10%."],
    ["Rune of Mighty Power", "Increases strength by 10%."],
    ["Rune of MP", "Increases MP by 15%."],
    ["Rune of MP+", "Increases MP by 30%."],
    ["Rune of Paralysis Immunity", "Increases paralysis resistance by 100%."],
    ["Rune of Paralysis Resistance", "Increases paralysis resistance by 30%."],
    ["Rune of Peerless Skill", "Increases DEX by 10%."],
    ["Rune of Petrification Immunity", "Increases petrification resistance by 100%."],
    ["Rune of Petrification Resistance", "Increases petrification resistance by 30%."],
    ["Rune of Poison Immunity", "Increases poison resistance by 100%."],
    ["Rune of Poison Resistance", "Increases poison resistance by 30%."],
    ["Rune of Power", "Increases strength by 5%."],
    ["Rune of Prevention", "Increases stun probability by 50%."],
    ["Rune of Quick Movement", "Increases field movement speed."],
    ["Rune of Resistance", "Increases magic defense by 5%."],
    ["Rune of Skill", "Increases DEX by 5%."],
    ["Rune of Slash Resistance", "Increases slash resistance by 10%."],
    ["Rune of Sleep Immunity", "Increases sleep resistance by 100%."],
    ["Rune of Sleep Resistance", "Increases sleep resistance by 30%."],
    ["Rune of SP", "Increases initial SP at the start of a battle by 1."],
    ["Rune of SP+", "Increases initial SP at the start of a battle by 2."],
    ["Rune of Speed", "Increases speed by 5%."],
    ["Rune of Supersonic Speed", "Increases speed by 20%."],
    ["Rune of Swift Speed", "Increases speed by 10%."],
    ["Rune of Thrust Resistance", "Increases thrust resistance by 10%."],
    ["Rune of Tremendous Power", "Increases strength by 15%."],
    ["Rune of Veiled Resistance", "Increases magic defense by 10%."],
    ["Rune of Water Resistance", "Increases water resistance by 10%."],
    ["Rune of Wind Resistance", "Increases wind resistance by 10%."]
  ].forEach(function (r) { RUNES.push(rune(r[0], "Enhancement", r[1])); });

  var api = {
    SOURCES: SOURCES,
    FETCHED: FETCHED,
    STAT_KEYS: STAT_KEYS,
    CHARACTERS: CHARACTERS,
    RUNES: RUNES
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.EIYUDEN_DATA = api;
  }
})(typeof window !== "undefined" ? window : this);
