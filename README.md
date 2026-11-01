# Eiyuden Chronicle: Hundred Heroes — Character Stat & Rune-Lens Browser

A static browser for comparing character base stats and rune-lens slots side by side, and
looking up any rune in the game — built so a player in the War Room deciding which 6 of 100+
recruitable characters to slot into their party doesn't have to tab-hop across a dozen separate
wiki pages first.

Open `index.html` in a browser. No build step, no server, no framework — vanilla HTML/CSS/JS.

## Coverage (disclosed, not padded)

**17 of an estimated ~120 recruitable characters**, fetched and verified directly against
eiyuden.wiki.gg Gameplay pages on 2026-11-01:

- **14 with full combat data**: Nowa, Seign Kesling, Marisa, Perrielle Grum, Garoo, Isha, Mio,
  Rudy, Viesskin, Zabi, Dr. Corque, Reyna, Leene, Markus.
- **3 confirmed to have no combat data at all**: Code L, Kassius (Unit Type "Support"), Huang
  (Unit Type "Other") — their Gameplay pages have no stat table and no rune-lens table; they
  unlock a Headquarters facility or a battle-support skill instead of a statted party slot.

The wiki's own `/wiki/Characters` index page lists roughly 150 names, but that is not a
recruitable-roster count — it mixes in non-recruitable enemies/bosses (confirmed directly:
"Dead countess" is Kind "Boss - Undead"; "Narungarde" has only an `/Enemy` subpage, no Gameplay
tab) and *Eiyuden Chronicle: Rising*-exclusive names. The Recruitment guide page's own text
("Recruit all other 119 characters before her checkpoint," re: Leene) implies a real recruitable
total near 120 — that is the denominator used above, not the index page's raw name count.

**Rune database is complete**: all 179 runes across the four categories gamerguides.com actually
has (Enhancement 59, Magic 24, Passive 29, Skill 67) are included, not just the two categories
(Passive/Skill) the orchestrator's charter named.

## Known corrections to the orchestrator's charter

See the header comment in `data.js` for the full detail. In short: the rune database has 4
categories, not 2; rune-lens data has no color field (it has release level / slot type / rarity
/ granted-or-free), not "slot count/colors"; and not every roster member has combat stats at
all — three confirmed Support/Other-role members have none.

## Disclosed gaps (also shown on-page)

1. Rune rarity and lens-slot-type are not attributes of a rune itself in the gamerguides.com
   database — they're attributes of the *slot* a rune-lens offers, which varies per character.
2. The Skill rune database lists two names twice each ("Rune of Skeleton King Flick", "Rune of
   Summon Revenant Army") with different effect text per entry — kept as-is, not merged.
3. "Base" stat row (distinct from Lv.1) only exists on the source page for 2 of the 14 statted
   characters (Nowa, Seign Kesling); shown when present, not fabricated for the other 12.

## Verification run

```
$ python3 Tools/slop_lint.py Orchard/FACTORY/output/eiyuden-chronicle-stat-rune-browser/
slop_lint: clean — 0 findings

$ node test.js
All tests passed. (≥5 known-answer assertions hand-checked against source, plus full
structural/copy-discipline coverage.)
```

Headless Chrome render (`google-chrome --headless=new --dump-dom`) confirmed: 17 of 17
characters and 179 of 179 runes render in their tables, the in-page self-test reports 7/7, and a
full visible-text banned-word scan (script/style stripped) found nothing.
