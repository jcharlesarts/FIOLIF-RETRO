// === ROME EXTREME CHAOS EVENT TREES DATA FILE ===
// To trigger an advanced event tree from the main game, call:
//     startRandomEventTree(eventKey);
// For narrative/condition-based triggers, check for badges/loot, then:
//     if (badges.includes("Double Dealer")) startRandomEventTree("the_conspirators_strike_back");
// See triggers at the end of each event block for recommended integration points.
// --- EVENT ENGINE ANCHORS BELOW ---
// (Continue to randomEventTrees object)
//
// === ADVANCED EVENT TRIGGERS ===
// Event Key:        Recommended Trigger:
// "gladiator_riot"                - Random chaos year, unrest > 3
// "midnight_messenger"            - Special intrigue chance, or end of big senate debate
// "the_conspirators_strike_back"  - After midnight_messenger, if "Double Dealer"/"Secret Cache"
// --- Use startRandomEventTree(key) to launch ---
// Edit game.js later to handle these hooks!



// Rome Extreme Chaos Edition - Random Event Trees
// Use this as your source-of-truth for all advanced random events.
// Each event supports multi-step, RNG, loot, and badge reward logic.

window.randomEventTrees = {
// --- EVENT: etruscan_oracle ---
// To trigger: startRandomEventTree("etruscan_oracle")
// Narrative trigger: After omens, or if player seeks supernatural guidance
etruscan_oracle: {
  meta: { tags: ["intrigue","mystery"], weight: 1.2, enabled: true },
  steps: [
    // Step 1: The Oracle’s Chamber
    {
      text: "It is a fair evening as you travel through the misty woods to the Etruscan Oracle. Inside her hovel, the air is thick with incense . The priestess’s eyes roll back as she enters a trance. She utters cryptic warnings of Rome’s fate.",
      cameo: "The Oracle’s breath is cold on your cheek.",
      options: [
        {
          label: "Decode the laurel inscriptions with your cipher (requires Silken Cipher)",
          condition: { loot: "Silken Cipher" },
          fixed: {
            text: "Your cipher fits a hidden substitution. The case names a senator’s fixer. Politics +1. Loot: Anonymous Testimony.",
            effect: () => { politics += 1; },
            loot: "Anonymous Testimony",
            nextStep: null,
            continueLabel: "Seal the Case"
          }
        },
        {
          label: "Ask about Rome’s destiny.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "The Oracle’s voice trembles: 'Blood will soak the Tiber.' You shudder, but gain insight into coming strife. +1 intrigue.",
                effect: () => { /* +1 intrigue */ },
                badge: undefined,
                loot: undefined,
                nextStep: 1
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "She speaks in riddles, but you sense hope: 'A lion rises from the ashes.' +1 politics.",
                effect: () => { politics += 1; },
                badge: undefined,
                loot: undefined,
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Bribe the priestess for a personal prophecy (-50 denarii)",
          fixed: {
            text: "She takes your coin and whispers, 'Beware the Ides.' Her words hang ominous in the smoke-filled air. -50 denarii.",
            effect: () => { treasury -= 50; },
            badge: undefined,
            loot: undefined,
            nextStep: 1
          }
        }
      ]
    },
    // Step 2: The Vision
    {
      text: "In a swirl of smoke, you glimpse a vision: Rome in flames, a masked figure weeping, and a laurel wreath floating down the Tiber. What do you do?",
      options: [
        {
          label: "Slip through the service corridor using the Cistern Sketch (requires Cistern Sketch)",
          condition: { loot: "Cistern Sketch" },
          fixed: {
            text: "You trace the route beneath the peristyle and listen through a grate. You catch a schedule. Loot: Anonymous Testimony.",
            effect: () => {},
            loot: "Anonymous Testimony",
            nextStep: null,
            continueLabel: "Back to the Feast"
          }
        },
        {
          label: "Try to interpret the vision yourself.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You see omens of betrayal. A small child sits alone by the Tiber. You vow to trust no one. +1 intrigue.",
                effect: () => { /* +1 intrigue */ },
                badge: undefined,
                loot: undefined,
                nextStep: 2
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "You glimpse opportunity in the chaos. +1 politics.",
                effect: () => { politics += 1; },
                badge: undefined,
                loot: undefined,
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Beg the Oracle for more detail.",
          fixed: {
            text: "She collapses, exhausted. You gain nothing more, but your desperation is noted. +1 unrest.",
            effect: () => { unrest += 1; },
            badge: undefined,
            loot: undefined,
            nextStep: 2
          }
        }
      ]
    },
    // Step 3: Return to Rome
    {
      text: "You return to Rome, the Oracle’s words haunting your mind. How do you use this knowledge?",
      options: [
        {
          label: "Interrupt the Senate session, dramatically announcing the Oracle’s warning.",
          rng: [
            {
              min: 1, max: 80,
              result: {
                text: "You stride into the Curia, voice echoing off the marble. Senators jeer, and an old rival calls for your ‘augur’s hat’. Your words are noted only as an eccentric outburst. -1 politics.",
                effect: () => { politics -= 1; },
                badge: undefined,
                loot: undefined,
                nextStep: null
              }
            },
            {
              min: 81, max: 100,
              result: {
                text: "You stand in the center of the chamber, recounting the Oracle’s vision with such gravitas that a hush falls over the hall. A few senators approach you afterward, whispering for more details. +2 politics, 🏅Badge: Harbinger.",
                effect: () => { politics += 2; },
                badge: "Harbinger",
                loot: undefined,
                nextStep: null
              }
            }
          ]
        },
        {
          label: "Slither through the forum shadows, leveraging what you’ve gathered (requires Blackmail Letters or Secret Cache).",
          condition: { anyLoot: ["Blackmail Letters", "Secret Cache"] },
          fixed: {
            text: "You corner a rival behind a column, slipping the coded secret into his hand with a sly smile. His face pales. By nightfall, you’ve averted a plot and earned unexpected gratitude. +2 politics, 🏅Badge: Seer’s Agent.",
            effect: () => { politics += 2; },
            badge: "Seer’s Agent",
            loot: undefined,
            nextStep: null
          }
        },
        {
          label: "Ignore the prophecy, focusing on your own agenda. Dine lavishly, throw a party, or visit your mistress—anything to forget those haunted eyes.",
          fixed: {
            text: "You feast with friends, banter with colleagues, and try to lose yourself in earthly pleasures. Still, sometimes at dusk, you hear the Oracle’s words in the wind...",
            effect: () => {/* no effect */},
            badge: undefined,
            loot: undefined,
            nextStep: null
          }
        }
      ]
    }
  ]
},
  gladiator_riot: {
    meta: { tags: ["brawl"], weight: 0.0, enabled: false },
    steps: [
      {
        text: "Gladiator Riot! The streets are chaos after a brutal arena match. Do you...",
        cameo: "A guard shouts, 'They’ve broken loose in the streets!'",
        options: [
          {
            label: "Grab your sword and helmet, and join the fight yourself!",
            rng: [
              {
                min: 1, max: 40,
                result: {
                  text: "You are captured! The gladiators hold you for ransom.",
                  effect: () => { /* no effect */ },
                  badge: undefined,
                  loot: undefined,
                  nextStep: 1
                }
              },
              {
                min: 41, max: 80,
                result: {
                  text: "You lose a hand, but gain respect among the soldiers! -3 unrest. (🏅Badge: 'The One-Handed')",
                  effect: () => { unrest -= 3; },
                  badge: "The One-Handed",
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 81, max: 100,
                result: {
                  text: "The fighters cower and flee when they see the great " + (typeof senatorName !== "undefined" ? senatorName : "the senator") + " approaching. -5 unrest, +300 denarii! (🏅Badge: 'Arena Hero', 🗡️Loot: 'Champion's Sword')",
                  effect: () => { unrest -= 5; treasury += 300; },
                  badge: "Arena Hero",
                  loot: "Champion's Sword",
                  nextStep: null
                }
              }
            ]
          },
          {
            label: "Let the guard handle it (safe, but costly)",
            fixed: {
              text: "The guards restore order, but with a heavy hand. -100 denarii, +1 riot token.",
              effect: () => { treasury -= 100; riotTokens += 1; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          }
        ]
      },
      {
        text: "You are held for ransom by the gladiators. What do you do?",
        cameo: "A brawler sneers, 'Rich senators pay the best ransoms!'",
        options: [
          {
            label: "Beg senators to pay your ransom",
            fixed: {
              text: "The Senate pays your ransom, but mocks your weakness. -1000 denarii, -4 politics.",
              effect: () => { treasury -= 1000; politics -= 4; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          },
          {
            label: "Try to escape yourself!",
            rng: [
              {
                min: 1, max: 70,
                result: {
                  text: "Your escape fails! The guards rough you up. -2 politics.",
                  effect: () => { politics -= 2; },
                  badge: undefined,
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 71, max: 100,
                result: {
                  text: "You slip away under cover of darkness. The people whisper of your cunning. +1 politics, -2 unrest. (🏅Badge: 'Slippery Senator')",
                  effect: () => { politics += 1; unrest -= 2; },
                  badge: "Slippery Senator",
                  loot: undefined,
                  nextStep: null
                }
              }
            ]
          }
        ]
      }
    ]
  },
  bandit_raids: {
    meta: { tags: ["adventure"], weight: 0.0, enabled: false },
    steps: [
      {
        text: "Bandit Raids! Highway robbery is rampant, and merchants are panicked. How do you respond?",
        cameo: "A merchant complains, 'Highway robbery is rampant!'",
        options: [
          {
            label: "Send patrols (cost 100)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Your patrols are ambushed! -200 denarii, +1 unrest.",
                  effect: () => { treasury -= 200; unrest += 1; },
                  badge: undefined,
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 61, max: 90,
                result: {
                  text: "Bandits scatter into the hills. -100 denarii. (🏅Badge: 'Protector of Merchants')",
                  effect: () => { treasury -= 100; },
                  badge: "Protector of Merchants",
                  loot: undefined,
                  nextStep: null
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "You catch the bandit chief! -100 denarii, +250 denarii, 🗡️Loot: 'Bandit's Dagger'.",
                  effect: () => { treasury += 150; },
                  badge: undefined,
                  loot: "Bandit's Dagger",
                  nextStep: null
                }
              }
            ]
          },
          {
            label: "Offer reward for captured bandits (-75)",
            fixed: {
              text: "A few locals try their luck—one brings in a bandit for show. -75 denarii, +1 politics.",
              effect: () => { treasury -= 75; politics += 1; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          },
          {
            label: "Blame the merchants",
            fixed: {
              text: "Merchants seethe; unrest rises. +2 unrest.",
              effect: () => { unrest += 2; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          }
        ]
      }
    ]
  },
  bountiful_harvest: {
    meta: { tags: ["slice","economy"], weight: 0.0, enabled: false },
    steps: [
      {
        text: "Bountiful Harvest! Fields overflow; the people rejoice. How will you spread the good fortune?",
        cameo: "A farmer grins, 'Praise Ceres, for she has blessed our fields!'",
        options: [
          {
            label: "Host a public feast (-150)",
            fixed: {
              text: "The plebs feast, unrest drops. -150 denarii, -3 unrest. (🏅Badge: 'Feaster of Rome')",
              effect: () => { treasury -= 150; unrest -= 3; },
              badge: "Feaster of Rome",
              loot: undefined,
              nextStep: null
            }
          },
          {
            label: "Store surplus (cost 0)",
            fixed: {
              text: "You prudently store extra grain for hard times. +1 politics.",
              effect: () => { politics += 1; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          },
          {
            label: "Distribute to the wealthy (+1 politics)",
            fixed: {
              text: "Patricians sing your praises, but the plebs grumble. +1 politics, +1 unrest.",
              effect: () => { politics += 1; unrest += 1; },
              badge: undefined,
              loot: undefined,
              nextStep: null
            }
          }
        ]
      }
    ]
  }
,
  ember_road: {
    meta: { tags: ["adventure","intrigue","city","travel"], weight: 1.2, enabled: true },
    steps: [
      {
        text: "Dawn at the East Gate. A factor offers a contract to escort two grain carts along the Ember Road to Praeneste.",
        cameo: "Mules steam in the chill; wheels creak for luck.",
        options: [
          {
            label: "Take the contract (risk ambush)",
            fixed: { text: "You sign the slate and whistle the mules forward.", effect: () => {}, nextStep: 1 }
          },
          {
            label: "Decline politely (stay clean)",
            fixed: { text: "You pass the burden to another house and keep your day free.", effect: () => {}, nextStep: null, continueLabel: "Head Back", suppressNextRandom: true }
          }
        ]
      },
      {
        text: "Load-out check at the yard. Anything you change now may save you later.",
        options: [
          {
            label: "Hire two extra guards (-100)",
            fixed: { text: "You sign rough hands to the payroll. Treasury -100.", effect: () => { treasury -= 100; }, nextStep: 2 }
          },
          {
            label: "Inspect wheels with Engineer's Plans (requires Engineer's Plans)",
            condition: { loot: "Engineer's Plans" },
            fixed: { text: "A cotter pin is half-cut. You swap it before anyone notices. Loot: Spare Axle Pin. Unrest -1 in the district you leave calm behind you.", effect: () => { unrest = Math.max(0, unrest - 1); }, loot: "Spare Axle Pin", nextStep: 2 }
          },
          {
            label: "Cut costs—no extras",
            fixed: { text: "You keep the purse tight and roll out.", effect: () => {}, nextStep: 2 }
          }
        ]
      },
      {
        text: "Ahead, a rocky pass. Narrow-cut basalt walls squeeze the road. An eerie whistle echoes ahead.",
        options: [
          {
            label: "Set a decoy cart (requires Bandit's Dagger or Champion's Sword)",
            condition: { anyLoot: ["Bandit's Dagger","Champion's Sword"] },
            rng: [
              { min: 1, max: 60, result: { text: "The bluff works; shadows melt back. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } },
              { min: 61, max: 100, result: { text: "A lookout tests you, then waves the crew off. Badge: Road Warden.", effect: () => {}, badge: "Road Warden", nextStep: 3 } }
            ]
          },
          {
            label: "Bribe a roadside scout (-75)",
            fixed: { text: "A coin-laden wink buys a quiet passage—maybe. Treasury -75.", effect: () => { treasury -= 75; }, nextStep: 3 }
          },
          {
            label: "Hold formation and press through",
            rng: [
              { min: 1, max: 55, result: { text: "A slingstone cracks a jar; you rush the gap. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } },
              { min: 56, max: 100, result: { text: "Your column doesn't blink; the ambush doesn't spring. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } }
            ]
          }
        ]
      },
      {
        text: "The Torrent Bridge planks rattle; one cart lists.",
        options: [
          {
            label: "Field repair with Spare Axle Pin (requires Spare Axle Pin)",
            condition: { loot: "Spare Axle Pin" },
            fixed: { text: "You wedge the pin, kiss the plank, and cross. The men cheer quietly.", effect: () => {}, nextStep: 4 }
          },
          {
            label: "Call local help (requires Merchant Ledger)",
            condition: { loot: "Merchant Ledger" },
            fixed: { text: "You cite old favors; three teamsters shoulder the weight. Politics +1.", effect: () => { politics += 1; }, nextStep: 4 }
          },
          {
            label: "Force the crossing",
            rng: [
              { min: 1, max: 50, result: { text: "A wheel slips—an axle bites. Treasury -100 to patch.", effect: () => { treasury -= 100; }, nextStep: 4 } },
              { min: 51, max: 100, result: { text: "Boards hold. You breathe again.", effect: () => {}, nextStep: 4 } }
            ]
          }
        ]
      },
      {
        text: "Praeneste granary—tally sticks knock in your favor.",
        options: [
          {
            label: "Close the contract",
            rng: [
              { min: 1, max: 70, result: { text: "Clean run. Treasury +200. Loot: Praenestine Contract Seal.", effect: () => { treasury += 370; }, loot: "Praenestine Contract Seal", nextStep: null } },
              { min: 71, max: 100, result: { text: "A rumor trails you: someone paid a scout to stand down. Politics +1, Loot: Rumor of Betrayal.", effect: () => { politics += 1; }, loot: "Rumor of Betrayal", nextStep: null } }
            ]
          }
        ]
      }
    ]
  },

whispering_scriptorium: {
  meta: { tags: ["mystery","intrigue","city","archives"], weight: 1.5, enabled: true },
  steps: [
    // Step 0 — Summons & first hint of the whisper (noir tone)
    {
      text: "It's late. You stumble down a dark lane toward your domus after a rousing convivium when a voice harks your name. A messenger; the aedile requires a trusted investigator. A restricted scroll is missing. Take a swig of your flagon and head to the archivum.",
      cameo: "Seven iron locks hang open like teeth. Between the stacks, something breathes—a thin susurrus like a secret trying not to be one.",
      options: [
        { label: "Step into the stacks—eyes open, mouth shut.", fixed: { text: "Your sandals whisper over marble; the air is colder between rows.", effect: () => {}, nextStep: 1 } },
        { label: "Pause and listen before touching anything",
          fixed: { text: "You kill the noise of your own breath. The whisper runs from the north wall, near the chained scrolls. Loot: Whisper Noted.", effect: () => {}, loot: "Whisper Noted", nextStep: 1 }
        },
        { label: "Refuse. Too messy.", fixed: { text: "You send regrets and stay clean—for now.", effect: () => {}, nextStep: null, continueLabel: "Go Home", suppressNextRandom: true } }
      ]
    },

    // Step 1 — Seven Locks & the cast
    {
      text: "Seven Locks: how did they open—and who had reason? Keeper Varro glowers. Novice Lentulus chews a nail. Visiting rhetor Cassian pretends not to eavesdrop.",
      options: [
        { label: "Dust-test the latch",
          rng: [
            { min:1,max:55, result:{ text:"Smudge arcs left to right—your thief favors the left hand.", effect: () => {}, loot: "Dust Footprints (Left-Handed)", nextStep: 2 } },
            { min:56,max:100, result:{ text:"The latch is too clean. Someone tidied. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 2 } }
          ] },
        { label: "Decode shelf marks (requires Silken Cipher)", condition: { loot: "Silken Cipher" }, fixed: { text: "Numbers hum like music; a pattern blooms. Loot: Shelf Pattern Sketch.", effect: () => {}, loot: "Shelf Pattern Sketch", nextStep: 2 } },
        { label: "Question Keeper Varro",
          rng: [
            { min:1,max:50, result:{ text:"He bristles. ‘My house is in order.’ Politics -1. Loot: Varro Resentful.", effect: () => { politics -= 1; }, loot: "Varro Resentful", nextStep: 2 } },
            { min:51,max:100, result:{ text:"He exhales, lowers his voice. ‘The north stacks hiss at night.’ Politics +1. Loot: Varro Cooperative.", effect: () => { politics += 1; }, loot: "Varro Cooperative", nextStep: 2 } }
          ] },
        { label: "Watch Rhetor Cassian prowl the aisles",
          fixed: { text: "He stops at legal treatises he shouldn’t need. A myrrh note hangs in the air. Loot: Cassian Scent of Myrrh.", effect: () => {}, loot: "Cassian Scent of Myrrh", nextStep: 2 } },
        { label: "Have a word with Lentulus the novice",
          rng: [
            { min:1,max:60, result:{ text:"Ink stains the left hand; he hides it too late. Loot: Lentulus Ink-Hand.", effect: () => {}, loot: "Lentulus Ink-Hand", nextStep: 2 } },
            { min:61,max:100, result:{ text:"He stiffens. ‘I lock what I’m told.’ Loot: Lentulus Bristles.", effect: () => {}, loot: "Lentulus Bristles", nextStep: 2 } }
          ] }
      ]
    },

    // Step 2 — Track the whisper’s root (ground it in place)
    {
      text: "Follow the whisper from the north wall: the room hums faintly.",
      options: [
        { label: "Snuff the lamps and follow the sound",
          fixed: { text: "In the hush, the susurrus tightens to a vent behind chained scrolls. Loot: Whisper Direction.", effect: () => {}, loot: "Whisper Direction", nextStep: 3 } },
        { label: "Augury of sound (requires Omen Notes)", condition: { loot: "Omen Notes" }, fixed: { text: "Air sings through a shaft. You mark the loudest point. Loot: Acoustic Trace.", effect: () => {}, loot: "Acoustic Trace", nextStep: 3 } },
        { label: "Trace the air shaft (requires Cistern Sketch)", condition: { loot: "Cistern Sketch" }, fixed: { text: "A crawlspace threads behind the stacks. You sketch its bends. Loot: Air Shaft Route.", effect: () => {}, loot: "Air Shaft Route", nextStep: 3 } },
        { label: "Bribe Lentulus (-50)", fixed: { text: "He hands over the duty roster with shaking fingers. Treasury -50. Loot: Novice Duty Roster.", effect: () => { treasury -= 50; }, loot: "Novice Duty Roster", nextStep: 3 } },
        { label: "Dust the floor (-5)", fixed: { text: "Ash across the tiles blooms footprints that drift left. Treasury -5. Loot: Dust Footprints (Left-Handed).", effect: () => { treasury -= 5; }, loot: "Dust Footprints (Left-Handed)", nextStep: 3 } }
      ]
    },

    // Step 3 — The crawlspace
    {
      text: "A mouth yawns behind a shelf—stone scored smooth by years of breath.",
      options: [
        { label: "Enter yourself",
          rng: [
            { min:1,max:60, result:{ text:"You wedge through and snag an ivory pin. Loot: Ivory Index Pin.", effect: () => {}, loot: "Ivory Index Pin", nextStep: 4 } },
            { min:61,max:100, result:{ text:"A rat skitters; you jerk back, bruised pride and dust. Politics -1.", effect: () => { politics -= 1; }, nextStep: 4 } }
          ] },
        { label: "Send a page (coward’s choice)", fixed: { text: "He returns pale with a splinter and gossip. Badge: Paper General.", effect: () => {}, badge: "Paper General", nextStep: 4 } },
        { label: "Circle outside—find where the shaft exhales",
          fixed: { text: "By the service court you find a grate kissed with red wax. Loot: Seal Scrap.", effect: () => {}, loot: "Seal Scrap", nextStep: 4 } }
      ]
    },

    // Step 4 — Confrontations (character beats)
    {
      text: "Three masks, one thief. You choose who to break first.",
      options: [
        { label: "Press Lentulus in the scriptorium light",
          condition: { any: [ { loot: "Dust Footprints (Left-Handed)" }, { loot: "Lentulus Ink-Hand" }, { loot: "Novice Duty Roster" } ] },
          fixed: { text: "You place the roster and his stained fingers side by side. The boy folds like wet papyrus. Loot: Lentulus Cracks.", effect: () => {}, loot: "Lentulus Cracks", nextStep: 5, continueLabel: "Call the lictors" } },
        { label: "Corner Rhetor Cassian behind the rhetoric shelf",
          condition: { any: [ { loot: "Shelf Pattern Sketch" }, { loot: "Ivory Index Pin" }, { loot: "Seal Scrap" } ] },
          fixed: { text: "Your voice stays low; his eyes don’t. A duplicate seal lands in your palm. Loot: Cassian Cornered.", effect: () => {}, loot: "Cassian Cornered", nextStep: 5, continueLabel: "To the reading hall" } },
        { label: "Level with Keeper Varro in his office (pay for honesty, -50)",
          fixed: { text: "You slide the roster across the desk. He stones a long breath, then nods once. Treasury -50. Loot: Varro Admission.", effect: () => { treasury -= 50; }, loot: "Varro Admission", nextStep: 5, continueLabel: "Gather them all" } },
        { label: "Gather everyone in the reading hall",
          fixed: { text: "You call them to the lights, and the hush grows heavy.", effect: () => {}, nextStep: 5, continueLabel: "Name the thief" } }
      ]
    },

    // Step 5 — Name the thief (payoffs; noir summation)
    {
      text: "Ink on skin, wax on iron, air that whispers through stone—you stitch the city’s breath into a single thread. Who do you accuse?",
      options: [
        { label: "Accuse the novice",
          condition: { any: [ { loot: "Lentulus Cracks" }, { all: [ { loot: "Novice Duty Roster" }, { loot: "Dust Footprints (Left-Handed)" } ] } ] },
          fixed: { text: "Lentulus wilts under the lictors’ stare. The scroll is found behind a loose base-stone. Badge: Curator of Secrets. Loot: Archivum Key.", effect: () => {}, badge: "Curator of Secrets", loot: "Archivum Key", nextStep: null, suppressNextRandom: true, continueLabel: "Leave the Archivum" } },
        { label: "Accuse the visiting rhetor",
          condition: { any: [ { loot: "Cassian Cornered" }, { all: [ { loot: "Shelf Pattern Sketch" }, { loot: "Ivory Index Pin" } ] }, { loot: "Seal Scrap" } ] },
          fixed: { text: "Cassian’s satchel yields a duplicate seal and a sermon about civic virtue. Politics +1. Loot: Archivum Key.", effect: () => { politics += 1; }, loot: "Archivum Key", nextStep: null, suppressNextRandom: true, continueLabel: "Leave the Archivum" } },
        { label: "Accuse Keeper Varro",
          condition: { any: [ { loot: "Varro Admission" }, { all: [ { loot: "Acoustic Trace" }, { loot: "Air Shaft Route" }, { loot: "Whisper Direction" } ] } ] },
          fixed: { text: "Varro meets your gaze, then the floor. ‘The city needed a patron, not a theft.’ He steps down quietly. Politics +2.", effect: () => { politics += 2; }, nextStep: null, suppressNextRandom: true, continueLabel: "Leave the Archivum" } },
        { label: "Insufficient evidence—seal stacks and audit",
          fixed: { text: "You lock the stacks and announce an audit. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: "Leave the Archivum" } }
      ]
    }
  ]
},

aventine_baths_whodunnit: {
    meta: { tags: ["whodunnit","mystery","intrigue","city"], weight: 1.7, enabled: true },
    steps: [
      {
        text: "Steam rolls across the Aventine baths. A magistrate floats face‑down in the caldarium; a marble sign nearby insists NO RUNNING.",
        cameo: "Attendants wring their hands; a chorus of patrons pretends not to stare. Somewhere, a strigil clatters… twice.",
        options: [
          { label: "Seal the bath", fixed: { text: "Doors barred. You control the scene.", effect: () => {}, nextStep: 1 } },
          { label: "Let the attendants work (discreet)", fixed: { text: "Business continues in whispers.", effect: () => {}, nextStep: 1 } }
        ]
      },
      {
        text: "Three suspects stand dripping (and slipping): a debtor rival clutching excuses, a jilted acolyte smelling of temple mint, and a foreign courier guarding a very dignified towel.",
        options: [
          { label: "Question the debtor about money", fixed: { text: "He swears the writs were due next week.", effect: () => {}, nextStep: 2 } },
          { label: "Probe the acolyte's pride", fixed: { text: "His lip curls; he mutters of insults.", effect: () => {}, nextStep: 2 } },
          { label: "Press the courier's route", fixed: { text: "He clings to a locked coffer.", effect: () => {}, nextStep: 2 } }
,          { label: "Hand out standard‑issue towels (no fashion statements)", 
             rng: [
               { min:1,max:60, result:{ text:"In the scramble, a bright thread snags on your ring. Loot: Foreign Weave Fiber.", effect: () => {}, loot: "Foreign Weave Fiber", nextStep: 2 } },
               { min:61,max:100, result:{ text:"A sharp mint note clings to a confiscated towel. Loot: Temple Mint Oil Residue.", effect: () => {}, loot: "Temple Mint Oil Residue", nextStep: 2 } }
             ]
           },
           { label: "Confiscate all oils and soaps into a bucket (-10)", 
             fixed: { text: "A frothy mountain of evidence. The top note is temple mint. Treasury -10. Loot: Temple Mint Oil Residue.", effect: () => { treasury -= 10; }, loot: "Temple Mint Oil Residue", nextStep: 2 } }
        ]
      },
      {
        text: "Evidence hunt.",
        options: [
          { label: "Drain the caldarium (-50)", fixed: { text: "Scratches scar a tile: a signet dragged. Treasury -50. Loot: Signet Scratch.", effect: () => { treasury -= 50; }, loot: "Signet Scratch", nextStep: 3 } },
          { label: "Decode locker tag (requires Silken Cipher)", condition: { loot: "Silken Cipher" }, fixed: { text: "Numbers map to names. Loot: Locker Tallies.", effect: () => {}, loot: "Locker Tallies", nextStep: 3 } },
          { label: "Charcoal rubbing of locker tags (-20)", fixed: { text: "Soot and wax give up the numbers. Loot: Locker Tallies (Partial). Treasury -20.", effect: () => { treasury -= 20; }, loot: "Locker Tallies (Partial)", nextStep: 3 } },
          { label: "Bird-omen timing (requires Omen Notes)", condition: { loot: "Omen Notes" }, fixed: { text: "Birds cried just past dusk—the window narrows.", effect: () => {}, nextStep: 3 } },
          { label: "Ask the masseur", rng: [
            { min:1,max:60,result:{ text:"He swears the debtor left early.", effect: () => {}, loot: "Debtor Alibi", nextStep: 3 } },
            { min:61,max:100,result:{ text:"He points at the courier's coffer with a wink.", effect: () => {}, loot: "Courier Suspicion", nextStep: 3 } }
          ] }
,          { label: "Check the lost‑and‑found (-10)", 
             rng: [
               { min:1,max:40, result:{ text:"A soggy debt chit stamped with the magistrate’s seal. Loot: Debt Chit (Soggy). Treasury -10.", effect: () => { treasury -= 10; }, loot: "Debt Chit (Soggy)", nextStep: 3 } },
               { min:41,max:70, result:{ text:"An exotic towel fringe stuck to an iron peg. Loot: Foreign Weave Fiber. Treasury -10.", effect: () => { treasury -= 10; }, loot: "Foreign Weave Fiber", nextStep: 3 } },
               { min:71,max:100, result:{ text:"A tiny clay ampulla smelling of temple mint. Loot: Temple Mint Oil Residue. Treasury -10.", effect: () => { treasury -= 10; }, loot: "Temple Mint Oil Residue", nextStep: 3 } }
             ]
           },
           { label: "Follow the drip trail with a broom", 
             fixed: { text: "You map a comic zigzag of wet footprints. Loot: Slip Pattern Map.", effect: () => {}, loot: "Slip Pattern Map", nextStep: 3 } }
        ]
      },
      {
        text: "Press the alibis.",
        options: [
          { label: "Cross-check with Gaulish Spy List (requires Gaulish Spy List)", condition: { loot: "Gaulish Spy List" }, fixed: { text: "Courier served the wrong master tonight.", effect: () => {}, nextStep: 4 } },
          { label: "Pull the magistrate's writ (requires Archivum Key)", condition: { loot: "Archivum Key" }, fixed: { text: "Debt tallies scream motive. Loot: Debt Writ.", effect: () => {}, loot: "Debt Writ", nextStep: 4 } },
          { label: "Flash Blackmail Letters (requires Blackmail Letters)", condition: { loot: "Blackmail Letters" }, fixed: { text: "The acolyte's pride cracks; he shakes. Loot: Acolyte Confession.", effect: () => {}, loot: "Acolyte Confession", nextStep: 4 } },
          { label: "Reconstruct timeline with attendants",
            rng: [
              { min:1,max:33,result:{ text:"The hot-room hourglass still warm to the touch. Loot: Hourglass Sand (Warm).", effect: () => {}, loot: "Hourglass Sand (Warm)", nextStep: 4, continueLabel: "Proceed to Accusation" } },
              { min:34,max:66,result:{ text:"Incense ash clings to a towel hook by the apodyterium. Loot: Incense Ash on Towel.", effect: () => {}, loot: "Incense Ash on Towel", nextStep: 4, continueLabel: "Proceed to Accusation" } },
              { min:67,max:100,result:{ text:"A ledger page near the bath edge is warped and wet at the corner. Loot: Wet Ledger Corner.", effect: () => {}, loot: "Wet Ledger Corner", nextStep: 4, continueLabel: "Proceed to Accusation" } }
            ]
          },
          { label: "Stage a reenactment—“exactly as you were!”", 
            rng: [
              { min:1,max:60, result:{ text:"You produce a steam‑timing board with chalk marks between rooms. Loot: Steam‑Timing Board.", effect: () => {}, loot: "Steam‑Timing Board", nextStep: 4, continueLabel: "Proceed to Accusation" } },
              { min:61,max:100, result:{ text:"A pratfall montage later, you’ve learned very little—except morale is up. Politics +1.", effect: () => { politics += 1; }, nextStep: 4, continueLabel: "Proceed to Accusation" } }
            ]
          },
          { label: "Detain all; reconvene at dawn",
            fixed: { text: "You seal the doors and post guards. Whispers ripple through Rome. Politics -1, Unrest +1.", effect: () => { politics -= 1; unrest += 1; }, loot: "Whispered Scandal", nextStep: null, continueLabel: "Close the Baths", suppressNextRandom: true }
          }
        ]
      },
      {
        text: "Name the killer.",
        options: [
          { label: "Accuse the debtor",
            condition: { all: [ { any: [ { loot: "Locker Tallies" }, { loot: "Locker Tallies (Partial)" }, { loot: "Debt Writ" }, { loot: "Signet Scratch" }, { loot: "Wet Ledger Corner" }, { loot: "Debt Chit (Soggy)" }, { badge: "Curator of Secrets" } ] }, { not: { loot: "Debtor Alibi" } } ] },
            fixed: { text: "He breaks. Politics +2, Unrest -1. Badge: Eyes of Minerva. Loot: Bath Seal Token.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Eyes of Minerva", loot: "Bath Seal Token", nextStep: null, suppressNextRandom: true, continueLabel: "Close the Baths" }
          },
          { label: "Accuse the acolyte",
            condition: { any: [ { loot: "Blackmail Letters" }, { loot: "Acolyte Confession" }, { loot: "Incense Ash on Towel" }, { loot: "Temple Mint Oil Residue" } ] },
            fixed: { text: "He confesses between sobs. Politics +1.", effect: () => { politics += 1; }, nextStep: null, suppressNextRandom: true, continueLabel: "Close the Baths" }
          },
          { label: "Accuse the courier",
            condition: { any: [ { loot: "Gaulish Spy List" }, { loot: "Omen Notes" }, { loot: "Courier Suspicion" }, { loot: "Hourglass Sand (Warm)" }, { loot: "Foreign Weave Fiber" }, { loot: "Slip Pattern Map" }, { loot: "Steam‑Timing Board" } ] },
            fixed: { text: "He bolts; lictors catch him. Politics +2. Loot: Whispered Scandal.", effect: () => { politics += 2; }, loot: "Whispered Scandal", nextStep: null, suppressNextRandom: true, continueLabel: "Close the Baths" }
          },
          { label: "Insufficient evidence—dismiss the case for now",
            fixed: { text: "With proof thin and tempers high, you dismiss the assembly—this time. Politics -2, Unrest +1.", effect: () => { politics -= 2; unrest += 1; }, nextStep: null, continueLabel: "Leave the Baths", suppressNextRandom: true }
          }
        ]
      }
    ]
  },

  censors_chain: {
    meta: { tags: ["intrigue","errands","politics","city"], weight: 1.6, enabled: true },
    steps: [
      {
        text: "You have a day off from Senatorial duties and are headed to your favorite peristyle for a leisurely picnic. You've barely stepped onto the street, basket in hand and attendants in tow, when a lictor bows. 'The Censor requests your service today.'",
        cameo: "The wax on his rod is still warm.",
        options: [
          { label: "Accept the summons with a sigh. ", fixed: { text: "With a whistful look at your meal, you  signal your clerk and follow. The wine will have to wait.", effect: () => {}, nextStep: 1 } },
          { label: "Decline - You've got... urgent Senate business, and all that...", fixed: { text: "The lictor leaves with a thin smile.", effect: () => {}, nextStep: null, continueLabel: "Close the Door", suppressNextRandom: true } }
        ]
      },
      {
        text: "Task 1: Head to the Temple of Saturn. Review some collections in the aerarium and seal the tax roll.",
        options: [
          { label: "Use Sealed Laurel Case (requires Sealed Laurel Case)", condition: { loot: "Sealed Laurel Case" }, fixed: { text: "Clerks part like water. Politics +1.", effect: () => { politics += 1; }, nextStep: 2 } },
          { label: "Bribe some novice scribes (-100)", fixed: { text: "Ink flows faster when oiled. Treasury -100.", effect: () => { treasury -= 100; }, nextStep: 2 } },
          { label: "Argue the merits until the quaestor offers to do the job.", rng: [ { min:1,max:55,result:{ text:"A lecture about process gets you out quick. Politics -1.", effect: () => { politics -= 1; }, nextStep: 2 } }, { min:56,max:100,result:{ text:"Your logic sticks. Politics +1.", effect: () => { politics += 1; }, nextStep: 2 } } ] }
        ]
      },
      {
        text: "Task 2: Quiet a noisy street orator.",
        options: [
          { label: "Counter-speech (bonus if Jester Diplomat or Pater Ridiculus)", rng: [ { min:1,max:50,result:{ text:"Your words stumble. Unrest +1.", effect: () => { unrest += 1; }, nextStep: 3 } }, { min:51,max:100,result:{ text:"Laughter breaks the tension. Politics +1.", effect: () => { politics += 1; }, nextStep: 3 } } ] },
          { label: "Show him an Official Summons (requires Official Summons)", condition: { loot: "Official Summons" }, fixed: { text: "The orator bows and scurries off the crate.", effect: () => {}, nextStep: 3 } },
          { label: "Hire some urchins to cheer madly(-30)", fixed: { text: "Chanting drowns rhetoric. Treasury -30.", effect: () => { treasury -= 30; }, nextStep: 3 } }
        ]
      },
      {
        text: "Task 3: Inspect an aqueduct crew reported to have become unruly.",
        options: [
          { label: "Produce Engineer's Plans (requires Engineer's Plans)", condition: { loot: "Engineer's Plans" }, fixed: { text: "A sham repair unmasked. Unrest -1.", effect: () => { unrest = Math.max(0, unrest - 1); }, nextStep: 4 } },
          { label: "Skim some savings (risky)", rng: [ { min:1,max:60,result:{ text:"Word spreads. Politics -2.", effect: () => { politics -= 2; }, nextStep: 4 } }, { min:61,max:100,result:{ text:"The purse grows heavier. Treasury +320.", effect: () => { treasury += 100; }, nextStep: 4 } } ] },
          { label: "Offer dove sacrifice to the completion of the arches (-25)", fixed: { text: "Piety soothes tempers. Treasury -25, Politics +1.", effect: () => { treasury -= 25; politics += 1; }, nextStep: 4 } }
        ]
      },
      {
        text: "Task 4: Deliver a sealed letter.",
        options: [
          { label: "Take the service tunnels (requires Cistern Sketch)", condition: { loot: "Cistern Sketch" }, fixed: { text: "Musty in there, but shortcuts save the day.", effect: () => {}, nextStep: 5 } },
          { label: "Send via banquet (requires Silken Cipher)", condition: { loot: "Silken Cipher" }, fixed: { text: "A coded aside reveals a favor owed. Loot: Censor's Favor.", effect: () => {}, loot: "Censor's Favor", nextStep: 5 } },
          { label: "Order a clerk to hoof it (slow)", rng: [ { min:1,max:50,result:{ text:"The Censor waits. Politics -1.", effect: () => { politics -= 1; }, nextStep: 5 } }, { min:51,max:100,result:{ text:"Arrived—barely in time.", effect: () => {}, nextStep: 5 } } ] }
        ]
      },
      {
        text: "Evening audit at the Censor's table.",
        options: [
          { label: "Report your day's activities, with some embellishments", fixed: { text: "He nods, marking a short line in his ledger.", effect: () => {}, nextStep: null } }
        ],
        // Step-level wrap scoring
        condition: undefined
      }
    ]
  }
,  consular_campaign: {
    meta: { tags: ["politics","intrigue","city","election"], weight: 1.9, enabled: true },
    steps: [
      {
        text: "An empty rostra at dawn. By dusk, it will carry your name—or someone else's. Will you declare?",
        cameo: "Criers warm their voices; clients watch your eyes.",
        options: [
          {
            label: "Announce in the Forum with bread and speeches (-150)",
            fixed: { text: "Loaves break, cheers rise. Treasury -150, Politics +1. Loot: Campaign Momentum.", effect: () => { treasury -= 150; politics += 1; }, loot: "Campaign Momentum", nextStep: 1 }
          },
          {
            label: "Quiet filing through the censors (requires Censor's Favor)",
            condition: { loot: "Censor's Favor" },
            fixed: { text: "Wax seals, nods, a curt smile. Politics +1. Loot: Censor Endorsement.", effect: () => { politics += 1; }, loot: "Censor Endorsement", nextStep: 1 }
          },
          {
            label: "Populist march with guild banners (-100, Unrest -1)",
            fixed: { text: "Guild drums answer your step. Treasury -100, Unrest -1.", effect: () => { treasury -= 100; unrest = Math.max(0, unrest - 1); }, nextStep: 1 }
          }
        ]
      },
      {
        text: "Rivals emerge: Aemilia (patrician favorite), Vibius (populist tribune), Sabinus (pious reformer). Who do you engage first?",
        options: [
          {
            label: "Offer Aemilia a respectable alliance (stronger if you hold Praenestine Contract Seal or Bath Seal Token)",
            condition: { anyLoot: ["Praenestine Contract Seal","Bath Seal Token"] },
            fixed: { text: "Old favors open old doors. Loot: Alliance - Aemilia.", effect: () => {}, loot: "Alliance - Aemilia", nextStep: 2 }
          },
          {
            label: "Outflank Vibius with a dole plan (stronger if Breadbringer or Grain IOU)",
            condition: { anyLoot: ["Breadbringer","Grain IOU"] },
            fixed: { text: "You turn the bread lines into a pledge. Politics +1. Loot: Populist Outreach.", effect: () => { politics += 1; }, loot: "Populist Outreach", nextStep: 2 }
          },
          {
            label: "Match Sabinus's piety with a public vow (-50)",
            fixed: { text: "Oil on the altar, eyes on you. Treasury -50. Loot: Temple Favor.", effect: () => { treasury -= 50; }, loot: "Temple Favor", nextStep: 2 }
          }
        ]
      },
      {
        text: "Fund the machine—or starve it. Your war chest?",
        options: [
          {
            label: "Patrician banquet (-200, Politics +1)",
            fixed: { text: "Crystal clinks; pledges follow. Treasury -200, Politics +1.", effect: () => { treasury -= 200; politics += 1; }, nextStep: 3 }
          },
          {
            label: "Small-donor drive (better if Neighborly or Bread Hero)",
            condition: { anyLoot: ["Neighborly","Bread Hero"] },
            fixed: { text: "Street tables, warm smiles. Politics +2, Treasury +50.", effect: () => { politics += 2; treasury += 50; }, nextStep: 3 }
          },
          {
            label: "Accept shadow money (+300, Politics -1)",
            fixed: { text: "A sealed chest appears at midnight. Treasury +300, Politics -1. Loot: Shady Donor IOU.", effect: () => { treasury += 300; politics -= 1; }, loot: "Shady Donor IOU", nextStep: 3 }
          }
        ]
      },
      {
        text: "First debates in the basilica. What's your line of attack?",
        options: [
          {
            label: "Aboveboard: argue policy and calm tempers",
            rng: [
              { min: 1, max: 65, result: { text: "Steady, credible, a touch dull—voters nod. Politics +1.", effect: () => { politics += 1; }, nextStep: 4 } },
              { min: 66, max: 100, result: { text: "You land a clean blow; Sabinus wobbles. Politics +2. Loot: Sabinus Stumbles.", effect: () => { politics += 2; }, loot: "Sabinus Stumbles", nextStep: 4 } }
            ]
          },
          {
            label: "Cunning: leak a ledger via Archivum (requires Archivum Key or Silken Cipher)",
            condition: { anyLoot: ["Archivum Key","Silken Cipher"] },
            fixed: { text: "Figures whisper louder than words. Aemilia falters. Politics +1. Loot: Aemilia Undercut.", effect: () => { politics += 1; }, loot: "Aemilia Undercut", nextStep: 4 }
          },
          {
            label: "Stage a cheering section (-30)",
            fixed: { text: "Chants swell; Vibius scowls. Treasury -30. Loot: Ward Choir.", effect: () => { treasury -= 30; }, loot: "Ward Choir", nextStep: 4 }
          }
        ]
      },
      {
        text: "A smear pamphlet hits the streets: you, a spendthrift and a schemer. Response?",
        options: [
          {
            label: "Refute with receipts (requires Archivum Key or Silken Cipher)",
            condition: { anyLoot: ["Archivum Key","Silken Cipher"] },
            fixed: { text: "You publish the books. The crowd shrugs at the smear. Politics +1.", effect: () => { politics += 1; }, nextStep: 5 }
          },
          {
            label: "Counter-slander Vibius (requires Blackmail Letters)",
            condition: { loot: "Blackmail Letters" },
            fixed: { text: "Whispers find their mark. Vibius loses ground. Politics -1, Unrest +1. Loot: Burned Bridges.", effect: () => { politics -= 1; unrest += 1; }, loot: "Burned Bridges", nextStep: 5 }
          },
          {
            label: "Ignore it; keep knocking doors",
            rng: [
              { min: 1, max: 60, result: { text: "Mud slides off; work wins hearts. Politics +1.", effect: () => { politics += 1; }, nextStep: 5 } },
              { min: 61, max: 100, result: { text: "The rumor sticks a little. Politics -1.", effect: () => { politics -= 1; }, nextStep: 5 } }
            ]
          }
        ]
      },
      {
        text: "Eve of election. Get-out-the-vote plan?",
        options: [
          {
            label: "Hire carts to ferry elders (-120, Unrest -1)",
            fixed: { text: "Wheels turn; elders wave. Treasury -120, Unrest -1.", effect: () => { treasury -= 120; unrest = Math.max(0, unrest - 1); }, nextStep: 6 }
          },
          {
            label: "Temple procession with Sabinus's choir (requires Temple Favor)",
            condition: { loot: "Temple Favor" },
            fixed: { text: "Hymns lift the streets. Politics +1.", effect: () => { politics += 1; }, nextStep: 6 }
          },
          {
            label: "Ward bosses handle turnout (-200)",
            fixed: { text: "Knocks, nods, and narrow alleys. Treasury -200. Loot: Ward Markers.", effect: () => { treasury -= 200; }, loot: "Ward Markers", nextStep: 6 }
          }
        ]
      },
      {
        text: "Tally sticks clack. You win. Now—what kind of victory is it?",
        options: [
          {
            label: "Unity mandate (requires Alliance - Aemilia or Populist Outreach)",
            condition: { anyLoot: ["Alliance - Aemilia","Populist Outreach"] },
            fixed: { text: "You seat rivals at your table. Politics +2, Unrest -1. Badge: Consul Elect. Loot: Broad Mandate.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Consul Elect", loot: "Broad Mandate", nextStep: null }
          },
          {
            label: "Govern through favors (requires Shady Donor IOU)",
            condition: { loot: "Shady Donor IOU" },
            fixed: { text: "Ledgers of promises weigh your desk. Politics +3, Unrest +1. Badge: Consul Elect. Loot: Owed Favor Marker.", effect: () => { politics += 3; unrest += 1; }, badge: "Consul Elect", loot: "Owed Favor Marker", nextStep: null }
          },
          {
            label: "Hardline victory (requires Burned Bridges or Ward Markers)",
            condition: { anyLoot: ["Burned Bridges","Ward Markers"] },
            fixed: { text: "You rule with a tight grip. Politics +2, Unrest +2. Badge: Consul Elect.", effect: () => { politics += 2; unrest += 2; }, badge: "Consul Elect", nextStep: null }
          },
          {
            label: "Clean hands, clean start (no special conditions)",
            fixed: { text: "You bow on the rostra; the city exhales. Politics +2, Unrest -1. Badge: Consul Elect.", effect: () => { politics += 2; unrest = Math.max(0, unrest - 1); }, badge: "Consul Elect", nextStep: null }
          }
        ]
      }
    ]
  }
,
  grain_dole_crisis: {
    meta: { tags: ["adventure","economy"], weight: 1.0, enabled: true },
    steps: [
      {
        text: "Hungry citizens languish in the bread lines. Rome grows restless as grain ships are delayed by bad weather and worse trade negotiations. The dole of yesteryear now strains the treasury.",
        cameo: "A crier shouts, 'Bread for the people!'",
        options: [
          {
            label: "Cut the dole by a third (+300 denarii, +2 unrest)",
            fixed: {
              text: "You trim the dole. Riots nearly spark, but the teasuries start to replenish. Treasury +300, Unrest +2.",
              effect: () => { treasury += 300; unrest += 2; },
              nextStep: 1
            }
          },
          {
            label: "Maintain the dole to avoid angering the mob (cost 150)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "You keep the dole steady. The anxiety of the mob is alleviated, for now. Treasury -150, Politics +1, Unrest -1.",
                  effect: () => { treasury -= 150; politics += 1; unrest = Math.max(0, unrest - 1); },
                  nextStep: 1
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "You are cheered in the forum. Treasury -150, Politics +2, Unrest -2. Badge: Breadbringer.",
                  effect: () => { treasury -= 150; politics += 2; unrest = Math.max(0, unrest - 2); },
                  badge: "Breadbringer",
                  nextStep: 1
                }
              }
            ]
          },
          {
            label: "You call in some favors owed to you by senators whose reputations you spared during a recent public investigation. Together, pool from your personal stores to increase the the dole - if ever so slightly.  (cost 500)",
            fixed: {
              text: "You increase distributions. The priestesses of Vesta make offerings to your name for a week. Treasury -500, Unrest -3, Politics +2. Loot: Grain IOU.",
              effect: () => { treasury -= 500; unrest = Math.max(0, unrest - 3); politics += 1; },
              loot: "Grain IOU",
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "A week passes and breard lines still stretch across Rome. A cousin visiting from Ostia tells you merchants are whispering rumors of hoarding grain shipments and price-fixing.",
        options: [
          {
            label: "Crack down on the culprits with a small army of lictors (cost 250)",
            rng: [
              {
                min: 1, max: 55,
                result: {
                  text: "Your plan backfires as your hired goons raid the wrong storehouse. The black market merchants scatter. Unrest +1, Politics -2, Treasury -250.",
                  effect: () => { unrest += 1; politics -= 1; treasury -= 250; },
                  nextStep: null,
                  continueLabel: "Return to Rome."
                }
              },
              {
                min: 56, max: 100,
                result: {
                  text: "Your hired goons seize seeral hidden grain caches. Unrest -2, Treasury -200. Badge: A Firm Hand.",
                  effect: () => { unrest = Math.max(0, unrest - 2); treasury -= 50; },
                  badge: "A Firm Hand",
                  nextStep: null,
                  continueLabel: "Back to business..."
                }
              }
            ]
          },
          {
            label: "Quietly buy off key merchants to plot against the others (cost 400)",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Your 'consortium' of muscle flips control of two warehouses. Grain prices dip and tempers cool to a simmer. After costs, you clear a tidy margin—and a ridiculous nickname sticks when your goons accidentally corner the chickpea stalls. Treasury +620 net, Politics +1, Unrest -1. Loot: Merchant Ledger. (🏅Badge: Hummus Maximus)",
                  effect: () => { treasury -= 400; treasury += 620; politics += 1; unrest -= 1; },
                  badge: "Hummus Maximus",
                  loot: "Merchant Ledger",
                  nextStep: null,
                  continueLabel: "Count the Profits"
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "The scheme leaks. Bakers are spooked and shout sabotage while bread riots tear through the Subura. Stalls burn, grain litters the stones, and your allies vanish. Treasury -600, Politics -2, Unrest +3. (🏅Badge: Riot Scapegoat)",
                  effect: () => { treasury -= 600; politics -= 2; unrest += 3; },
                  badge: "Riot Scapegoat",
                  nextStep: null,
                  continueLabel: "Flee the Forum and Lay Low for a While"
                }
              }
            ]
          },
          {
            label: "Ignore it",
            fixed: {
              text: "You look away. This is Rome, afterall. Hunger is an important pasttime. The plebians in the forum grumble and their bellies rumble. Unrest +2, Politics -1.",
              effect: () => { unrest += 2; politics -= 1; },
              nextStep: null,
              continueLabel: "Let it Pass"
            }
          }
        ]
      }
    ]
  },

  augur_omens: {
    meta: { tags: ["mystery","intrigue"], weight: 1.1, enabled: true },
    steps: [
      {
        text: "Auspices at Dawn: Vultures wheel above the Capitoline. Business in the forum halts as people look up and watch for signs.",
        cameo: "A young augur mutters, 'Left is ill, right is fortune. Left is ill, right is fortune...'",
        options: [
          {
            label: "Head toward your favorite augur. He's busy working a crowd of slackjawed plebs. You push to the the front of the line and consult him. (-75 denarii)",
            rng: [
              {
                min: 1, max: 55,
                result: {
                  text: "The augur frowns. 'These omens are muddled. The gods are discontent.' Treasury -75, Politics -1.",
                  effect: () => { treasury -= 75; politics -= 1; },
                  nextStep: 1
                }
              },
              {
                min: 56, max: 100,
                result: {
                  text: "The augur smiles: 'Fortune favors Rome's favorite young senator' Treasury -75, Politics +1. Badge: Favored by the Birds.",
                  effect: () => { treasury -= 75; politics += 1; },
                  badge: "Favored by the Birds",
                  nextStep: 1
                }
              }
            ]
          },
          {
            label: "Bribe a street seer (-25 denarii)",
            fixed: {
              text: "He rattles a wooden bowl of of-are those cat bones?- and hisses some nonsense. You get what you pay for. Treasury -25. Loot: Fake Augury Bones.",
              effect: () => { treasury -= 25; },
              loot: "Fake Augury Bones",
              nextStep: 1
            }
          },
          {
            label: "Interpret the birds' flight yourself and make a speech to the crowd.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "You miscount the number of carrion and a bystander shouts out the mistake. The oration is unconvincing. Rumors swirl about your abilities. Unrest +2.",
                  effect: () => { unrest += 2; },
                  nextStep: 1
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "Your speech convinces. A thoughtful hush descends on the forum as citizens consider your insights. You receive an invitation to join the Augur's guild for wine afterward. Politics +1, Unrest -1.",
                  effect: () => { politics += 1; unrest -= 1; },
                  nextStep: 1
                }
              }
            ]
          }
        ]
      },
      {
        text: "The weight of the morning prognostications hang on your shoulders as you walk to the Senate. What will you do with these portents?",
        options: [
          {
            label: "Announce the favorable omens to the Senate",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "Skeptics scoff and your claims fall flat. You're laughed back to your seat. Politics -1.",
                  effect: () => { politics -= 1; },
                  nextStep: null,
                  continueLabel: "Leave the Curia"
                }
              },
              {
                min: 61, max: 100,
                result: {
                  text: "The chamber hushes and your words carry. Politics +2. Badge: Expert Auspician.",
                  effect: () => { politics += 2; },
                  badge: "Expert Auspician ",
                  nextStep: null,
                  continueLabel: "Accept the cheers and leave the Curia"
                }
              }
            ]
          },
          {
            label: "Keep the omens to yourself and bide your time",
          fixed: {
            text: "You note the vultures' patterns for later leverage. (Intrigue +1). Loot: Omen Notes.",
            effect: () => { /* +1 intrigue if tracked */ },
            loot: "Omen Notes",
            nextStep: null,
            continueLabel: "Tuck Away Notes",
            suppressNextRandom: true
          }
          },
          {
            label: "Sell the secret omen to a rival (+200 denarii, -1 politics)",
            fixed: {
              text: "A quiet exchange by the rostra nets you coin. Treasury +200, Politics -1. Badge: Feathered Capitalist.",
              effect: () => { treasury += 200; politics -= 1; },
              badge: "Feathered Capitalist",
              nextStep: null,
              continueLabel: "Pocket the Coin"
            }
          }
        ]
      }
    ]
  },

  aqueduct_collapse: {
    meta: { tags: ["adventure","city"], weight: 1.0, enabled: true },
    steps: [
      {
        text: "Aqueduct Collapse: A great arch buckles and water spills into the streets.",
        cameo: "An aedile pleads, 'We need funds now or the city thirsts!'",
        options: [
          {
            label: "Fund emergency repairs (-350 denarii)",
            fixed: {
              text: "Crews swarm the arches. Treasury -350, Unrest -2. Loot: Engineer's Plans.",
              effect: () => { treasury -= 300; unrest = Math.max(0, unrest - 2); },
              loot: "Engineer's Plans",
              nextStep: 1
            }
          },
          {
            label: "Blame the aedile for negligence",
            fixed: {
              text: "You roar about negligence. Politics +1, Unrest +1.",
              effect: () => { politics += 1; unrest += 1; },
              nextStep: 1
            }
          },
          {
            label: "Offer prayers instead (-25 denarii)",
            fixed: {
              text: "The crowd watches you sacrifice a white dove and intone about the will of the gods. Treasury -25.",
              effect: () => { treasury -= 25; },
              nextStep: 1
            }
          }
        ]
      },
      {
        text: "Water Rationing: How do you stabilize the city?",
        options: [
          {
            label: "Ration strictly. Also, it's bring your own amphora, limit one per sandal, to the fountains from now on.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "Queues surge and tempers flare. Unrest +2, Politics -1.",
                  effect: () => { unrest += 2; politics -= 1; },
                  nextStep: null,
                  continueLabel: "Hold the Line"
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "Order holds. Inexplicably, seeing as this is Rome. Unrest -1, Politics +1.",
                  effect: () => { unrest = Math.max(0, unrest - 1); politics += 1; },
                  nextStep: null,
                  continueLabel: "Open the Conduits"
                }
              }
            ]
          },
          {
            label: "Hire water carts (-230 denarii)",
            fixed: {
              text: "Your teams deliver water to the poorer districts. Treasury -230, Unrest -2.",
              effect: () => { treasury -= 150; unrest = Math.max(0, unrest - 1); },
              nextStep: null,
              continueLabel: "Dismiss the Crews"
            }
          },
          {
            label: "Throw a public ceremony to inspire hope. (-50 denarii)",
            fixed: {
              text: "Priests bless the broken arches; people are parched, but their spirits lift a little. Treasury -50, Politics +1.",
              effect: () => { treasury -= 50; politics += 1; },
              nextStep: null,
              continueLabel: "Back to Work"
            }
          }
        ]
      }
    ]
  }
  , bakers_dawn: {
    meta: { tags: ["slice","adventure"], weight: 0.9, enabled: true },
    steps: [
      {
        text: "Baker’s Dawn: You wake early for market, eager to buy the city’s freshest bread before a day at Senate. The bakery is swamped, the line is long, and the smell of warm loaves drives the crowd wild. Suddenly, a burly legionary cuts to the front, barking that he’s owed the first loaf for defending Rome. What do you do?",
        cameo: "The baker shrugs helplessly, 'First come, first served…unless you have a sword?'",
        options: [
          {
            label: "Step in and challenge the legionary’s rudeness—no one’s above the law.",
            rng: [
              {
                min: 1, max: 40,
                result: {
                  text: "He shoves you aside, the crowd snickers, and you pay for a dropped loaf. -75 denarii, -1 politics.",
                  effect: () => { treasury -= 75; politics -= 1; },
                  nextStep: 1
                }
              },
              {
                min: 41, max: 90,
                result: {
                  text: "With the crowd’s rousing support, the legionary stands down. The baker winks at you. +1 politics. 🏅Badge: Protector of the Queue.",
                  effect: () => { politics += 1; },
                  badge: "Protector of the Queue",
                  nextStep: 2
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "The legionary takes a swing at you. The crowd roars as you slam the soldier’s fist down—he laughs and buys you breakfast. +2 politics. 🗡️Loot: Champion’s Crust.",
                  effect: () => { politics += 2; },
                  loot: "Champion’s Crust",
                  nextStep: 3
                }
              }
            ]
          },
          {
            label: "Quietly let him cut, then slip a coin to the baker for an extra loaf.",
            rng: [
              {
                min: 1, max: 50,
                result: {
                  text: "The baker smuggles you a crusty end piece. Not fancy, but it’s yours. -10 denarii. 🗡️Loot: Burnt Loaf.",
                  effect: () => { treasury -= 10; },
                  loot: "Burnt Loaf",
                  nextStep: 4
                }
              },
              {
                min: 51, max: 100,
                result: {
                  text: "The baker gives you an extra honey cake, and a friendly nod. 🗡️Loot: Honey Cake, 🏅Badge: Neighborly.",
                  effect: () => {},
                  loot: "Honey Cake",
                  badge: "Neighborly",
                  nextStep: 5
                }
              }
            ]
          },
          {
            label: "Rally the crowd to start singing an old ballad about bread riots.",
            rng: [
              {
                min: 1, max: 60,
                result: {
                  text: "It works until someone bumps your purse, and a little unrest brews in the forum. +1 unrest, -20 denarii.",
                  effect: () => { unrest += 1; treasury -= 20; },
                  nextStep: 6
                }
              },
              {
                min: 61, max: 90,
                result: {
                  text: "The people cheer and order is restored, just in time for sunrise. +1 politics, -1 unrest.",
                  effect: () => { politics += 1; unrest -= 1; },
                  nextStep: 7
                }
              },
              {
                min: 91, max: 100,
                result: {
                  text: "Children chant your name as you leave with a signature bun. 🏅Badge: Breadbox Hero, 🗡️Loot: Senatorial Bun.",
                  effect: () => {},
                  badge: "Breadbox Hero",
                  loot: "Senatorial Bun",
                  nextStep: 8
                }
              }
            ]
          }
        ]
      },
      // Senate arrival branches:
      {
        text: "A senator sniffs, 'You smell like flour and chaos.' You shrink in your seat and dream of better breakfasts.",
        options: [{ label: "Continue", fixed: { text: "You resolve to eat earlier tomorrow.", effect: () => {} } }]
      },
      {
        text: "A senator whispers, 'Well done! Someone has to keep order.' The baker’s son at the Senate winks at you.",
        options: [{ label: "Continue", fixed: { text: "Your bread is warm and your spirits high.", effect: () => {} } }]
      },
      {
        text: "A senator booms, 'A champion among us!' Your ‘Champion’s Crust’ becomes the talk of the Curia.",
        options: [{ label: "Continue", fixed: { text: "You share crumbs and win favor with the plebs.", effect: () => { politics += 1; } } }]
      },
      {
        text: "You eat your burnt loaf in the Senate’s back row. A friendly baker’s son sneaks you a fresh roll.",
        options: [{ label: "Continue", fixed: { text: "Sometimes patience pays off after all.", effect: () => { unrest -= 1; } } }]
      },
      {
        text: "The senator next to you gives you a honey cake salute. Sweetness makes the debates tolerable.",
        options: [{ label: "Continue", fixed: { text: "You feel camaraderie and a sugar rush.", effect: () => {} } }]
      },
      {
        text: "You count your coins, but everyone is smiling. Even the legionary gives you a nod.",
        options: [{ label: "Continue", fixed: { text: "For one morning, Rome is at peace.", effect: () => { politics += 1; } } }]
      },
      {
        text: "Kids keep peeking in the Senate gallery, calling your name. The baker promises your bun will be famous for years.",
        options: [{ label: "Continue", fixed: { text: "A senator asks for your secret: 'Yeast—and a bit of luck.'", effect: () => { politics += 2; } } }]
      }
    ]
  }
,
// --- EVENT: diplomatic_crisis_carthage ---
// To trigger: startRandomEventTree("diplomatic_crisis_carthage")
// Narrative trigger: mid- or late-game, or after unrest spike/major loss
// --- EVENT: diplomatic_crisis_carthage ---
diplomatic_crisis_carthage: {
  meta: { tags: ["adventure","intrigue","diplomacy"], weight: 1.3, enabled: true },
  steps: [
    // Step 1: The Mission Begins
    {
      text: "Rome’s northern front trembles as Carthaginian war elephants appear on the horizon. The Senate selects you as part of an urgent delegation to negotiate—or stall for time. You arrive at the enemy camp, where the Carthaginian general, veiled in blue, greets you with a sly grin. How do you open the talks?",
      cameo: "The scent of foreign spices mixes with the putrid Roman fear.",
      options: [
        {
          label: "Open with a bold offer of Roman grain and gold for peace.",
          rng: [
            {
              min: 1, max: 40,
              result: {
                text: "The general scoffs. 'Rome’s gold? Is it as soft as your senators?' +2 unrest, -1 politics.",
                effect: () => { unrest += 2; politics -= 1; },
                nextStep: 1
              }
            },
            {
              min: 41, max: 85,
              result: {
                text: "The general ponders your pliability and counters with an 'exchange of hostages.' Will you accept, refuse, or propose a contest of riddles?",
                effect: () => {},
                nextStep: 2
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "The general is impressed and offers a banquet in your honor. 🏅Badge: Silver-Tongued.",
                effect: () => {},
                badge: "Silver-Tongued",
                nextStep: 3
              }
            }
          ]
        },
        {
          label: "Try to read the general’s intentions by observing the camp.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You notice mercenary Gauls lurking at the edge of camp—Carthage plans a surprise attack. 🗡️Loot: Gaulish Spy List.",
                effect: () => {},
                loot: "Gaulish Spy List",
                nextStep: 4
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You spot a hidden Roman prisoner among the Carthaginian tents. It's the lost general of the northern armies! You may choose to try a rescue or leverage for the negotiation.",
                effect: () => {},
                nextStep: 5
              }
            }
          ]
        },
        {
          label: "Make a sly joke about Carthaginian elephants to break the ice.",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "The general’s face darkens. 'Rome sends fools.' -2 politics, +1 unrest.",
                effect: () => { politics -= 2; unrest += 1; },
                nextStep: 6
              }
            },
            {
              min: 51, max: 100,
              result: {
                text: "He laughs heartily, calling for wine. 'You may have more sense than your consul!' +1 politics, 🏅Badge: Jester Diplomat.",
                effect: () => { politics += 1; },
                badge: "Jester Diplomat",
                nextStep: 7
              }
            }
          ]
        }
      ]
    },
    // Step 2: Hostage exchange
    {
      text: "The general has suggested an exchange of hostages. Do you:",
      options: [
        {
          label: "Accept the exchange (risk Roman lives, but buy time)",
          fixed: {
            text: "The Carthaginians take your junior envoy. Rome hesitates, but you gain a week of peace. +1 intrigue.",
            effect: () => { /* +1 intrigue */ },
            nextStep: 8
          }
        },
        {
          label: "Refuse the exchange (anger the general)",
          fixed: {
            text: "The general scowls, and the elephants trumpet ominously. +2 unrest.",
            effect: () => { unrest += 2; },
            nextStep: 9
          }
        },
        {
          label: "Propose a contest of riddles instead.",
          fixed: {
            text: "The general grins—he loves riddles! The camp gathers for a battle of wits.",
            effect: () => {},
            nextStep: 10
          }
        }
      ]
    },
    // Step 3: Banquet
    {
      text: "At the banquet, the general grows tipsy. You didn't take him for a lush. Will you:",
      options: [
        {
          label: "Toast to eternal peace—try to charm the Carthaginians further.",
          fixed: {
            text: "You dazzle the camp with Roman wit. 🏅Badge: Cunning Fox, +2 politics.",
            effect: () => { politics += 2; },
            badge: "Cunning Fox"
          }
        },
        {
          label: "Get the general drunk, then sneak away to spy.",
          fixed: {
            text: "You trip into a tent and discover a map of their planned attack route. While it's still dark you steal away to the city and prepare Rome's defenses.  🗡️Loot: Carthaginian Map.",
            effect: () => {},
            loot: "Carthaginian Map"
          }
        }
      ]
    },
    // Step 4: Gaulish spy list
    {
      text: "You have the list of Gaulish spies. Will you:",
      options: [
        {
          label: "Secretly warn Rome.",
          fixed: {
            text: "Your warning saves Roman outposts, but breaks the truce. +2 unrest.",
            effect: () => { unrest += 2; }
          }
        },
        {
          label: "Use it to blackmail the general.",
          fixed: {
            text: "The general caves to your demands. The great enemies of Rome slink away across the alps, guaranteed to return someday. But that day is not today. 🏅Badge: Negotiator.",
            effect: () => {politics += 2; unrest -= 1; },
            badge: "Negotiator"
          }
        }
      ]
    },
    // Step 5: Hidden prisoner
    {
      text: "Do you attempt a daring rescue at night, or use the knowledge as a bargaining chip?",
      options: [
        {
          label: "Daring rescue to go with your dashing looks.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You are nearly caught! You barely escape, empty-handed. +2 unrest, -200 denarii.",
                effect: () => { unrest += 2; treasury -= 200; }
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You free the Roman general. He later saves you in the Senate. 🗡️Loot: Carthaginian Signet Ring, +1 politics.",
                effect: () => { politics += 1; },
                loot: "Carthaginian Signet Ring"
              }
            }
          ]
        },
        {
          label: "Leverage for negotiation.",
          fixed: {
            text: "You gain a minor concession at the peace table. +1 politics.",
            effect: () => { politics += 1; }
          }
        }
      ]
    },
    // Step 6: Offended general
    {
      text: "The Carthaginian general has been insulted by your weak show of wartime mettle. The talks collapse.",
      options: [
        {
          label: "Return to Rome in disgrace.",
          fixed: {
            text: "You are mocked in the Senate for your failed diplomacy. -2 politics.",
            effect: () => { politics -= 2; }
          }
        }
      ]
    },
    // Step 7: Jester general
    {
      text: "At the festival, the general insists you perform more jokes. Will you:",
      options: [
        {
          label: "Play along and keep spirits high.",
          fixed: {
            text: "Your antics become schticks of legend—Carthage delays their invasion for a festival. 🏅Badge: Festival Fool.",
            effect: () => {},
            badge: "Festival Fool"
          }
        },
        {
          label: "Push your luck and insult the general again.",
          fixed: {
            text: "It appears to have worked; he general laugh! He then orders your execution. You escape by the skin of your teeth. 🏅Badge: Deadpan Survivor.",
            effect: () => {},
            badge: "Deadpan Survivor"
          }
        }
      ]
    },
    // Step 8: Hostage peace
    {
      text: "Rome gains a week to prepare. The city braces for whatever comes next.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You are quietly thanked for your sacrifice.",
            effect: () => {}
          }
        }
      ]
    },
    // Step 9: Angered general
    {
      text: "The Carthaginians march! You bring word in time to defend the city, but unrest soars in Rome.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "Your warnings are not enough. +2 unrest.",
            effect: () => { unrest += 2; }
          }
        }
      ]
    },
    // Step 10: Riddle/Joke Contest (Latin Dad Jokes!)
    {
      text: "You face the general in a battle of wits. 'Let us see if Roman wit matches Roman steel. Tell me a joke—if I laugh, Rome wins a year of peace. If not, we attack at dawn.'",
      options: [
        {
          label: '“Why did the Roman chicken cross the Via Appia?”',
          fixed: {
            text: 'The general blinks. You explain: “You see, our roads are so good, even chickens travel first class!” He laughs, shaking his head. +1 intrigue. 🏅Badge: Pater Ridiculus.',
            effect: () => { /* +1 intrigue */ },
            badge: "Pater Ridiculus"
          }
        },
        {
          label: '“Quid est melius quam aurum?” (“What is better than gold?”)',
          fixed: {
            text: 'The general rolls his eyes. You add: “It’s wordplay, you see—aurum means gold, but amicum means friend!” He snorts. +1 politics. 🏅Badge: Golden Tongue.',
            effect: () => { politics += 1; },
            badge: "Golden Tongue"
          }
        },
        {
          label: '“Did you hear about the Roman senator who brought a sword to a peace talk?”',
          fixed: {
            text: '“He left with a salad—because he was caesar’d!” The general looks confused. You over-explain: “Julius Caesar, you know—the guy with the knives? It’s a pun!” The Carthaginians groan, but the general is impressed by your shameless delivery. 🏅Badge: Knife Jester, 🗡️Loot: Table Knife.',
            effect: () => { },
            badge: "Knife Jester",
            loot: "Table Knife"
          }
        }
      ]
    }
  ]
},
street_urchins: {
  meta: { tags: ["city","adventure"], weight: 0.8, enabled: true },
  steps: [
    {
      text: "You've put on your finest robe and are walking to the senate for a debate on grain policy. Suddenly, you're surrounded by a throng of street urchins asking you for money. What do you do?",
      cameo: "A bold urchin tugs your sleeve: 'Senator, spare a coin?'",
      options: [
        {
          label: "Take out your coin purse and shower them with sesterces. 'Non nobis solum nati sumus.'",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "The urchins scatter, coins in hand, and your name is sung at dinner tables across the city. -100 denarii, +1 politics. 🏅Badge: Benevolent Senator.",
                effect: () => { treasury -= 100; politics += 1; },
                badge: "Benevolent Senator",
                nextStep: 1
              }
            },
            {
              min: 51, max: 85,
              result: {
                text: "One clever child relieves you of your purse, but you win the crowd’s admiration for your humor about it. -200 denarii, -1 unrest. 🗡️Loot: Stolen Purse.",
                effect: () => { treasury -= 200; unrest = Math.max(0, unrest-1); },
                loot: "Stolen Purse",
                nextStep: 2
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "You agree to sponsor an orphanage; the street children call you ‘Papa Senator’ for weeks. -500 denarii, +2 politics. 🏅Badge: Patron of the Poor.",
                effect: () => { treasury -= 500; politics += 2; },
                badge: "Patron of the Poor",
                nextStep: 3
              }
            }
          ]
        },
        {
          label: "Shoo the filthy things away. You're an important person with a busy schedule.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Their hurt looks trail you to the Senate. By sundown, the city’s rumor mill has churned out new stories of your cruelty. +1 unrest, -1 politics.",
                effect: () => { unrest += 1; politics -= 1; },
                nextStep: 4
              }
            },
            {
              min: 61, max: 85,
              result: {
                text: "A brave child throws a rotten fig at you. -1 politics. 🏅Badge: Fig-Target.",
                effect: () => { politics -= 1; },
                badge: "Fig-Target",
                nextStep: 5
              }
            },
            {
              min: 86, max: 100,
              result: {
                text: "You trip over an urchin and tear your fine robe. -100 denarii, -1 politics. 🗡️Loot: Torn Robe.",
                effect: () => { treasury -= 100; politics -= 1; },
                loot: "Torn Robe",
                nextStep: 6
              }
            }
          ]
        }
      ]
    },
    // Next steps based on result:
    // Step 1: Generous giving
    {
      text: "At the Senate, a grizzled senator laughs, “Throwing coins to the plebs again, eh? Careful, or they’ll want you on the ballot!” (+1 politics)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You nod graciously and take your seat.",
            effect: () => { politics += 1; }
          }
        }
      ]
    },
    // Step 2: Pickpocketed
    {
      text: "The Senate erupts in laughter as you recount your morning. But one old patrician slips you a gold coin, 'For luck.' (+100 denarii, -1 politics, 🗡️Loot: Lucky Coin)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You pocket the coin and try to regain your dignity.",
            effect: () => { treasury += 100; politics -= 1; loot = "Lucky Coin"; }
          }
        }
      ]
    },
    // Step 3: Papa Senator
    {
      text: "You are greeted as ‘Papa Senator’ and gain favor with the Pleb Faction.",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "A young senator says, 'Your popularity grows by the day.'",
            effect: () => { /* could add favor token here */ }
          }
        }
      ]
    },
    // Step 4: Shooed them away (negative gossip)
    {
      text: "A corpulent senator claps you on the back. 'Good! The city needs a firm hand.' The patricians nod—though you feel the plebs’ eyes on your back. (+2 politics, -1 unrest)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You straighten your toga and carry on.",
            effect: () => { politics += 2; unrest -= 1; }
          }
        }
      ]
    },
    // Step 5: Hit with fig (extra mockery)
    {
      text: "A child’s fig stain is still on your toga. 'Wear it with pride!' another senator jokes, pointing down at his own fig-stained threads. You share a hearty laugh and your coinpurse remains heavy.  (-1 politics, 🏅Badge: Fig-Club Initiate)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You smile thinly, plotting revenge against fruit everywhere.",
            effect: () => { politics -= 1; badge = "Fig-Club Initiate"; }
          }
        }
      ]
    },
    // Step 6: Tripped/torn robe
    {
      text: "You limp into the Senate, toga in tatters. Some laugh, some feign concern. 'Fashion-forward, I see!' (-1 politics, -1 denarii)",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "You vow to invest in sturdier sandals.",
            effect: () => { politics -= 1; treasury -= 1; }
          }
        }
      ]
    }
  ]
},
// --- EVENT: midnight_messenger ---
// To trigger this event: startRandomEventTree("midnight_messenger")
// Typical narrative trigger: after conspiracy clue, or as a rare intrigue event
midnight_messenger: {
  meta: { tags: ["intrigue","mystery"], weight: 1.4, enabled: true },
  steps: [
    // Step 0: The inciting incident
    {
      text: "You’re tuning your lute in the lamplight when a cloaked and frantic figure stumbles into your atrium. He is crazed, out of breath, and bleeding all over your new mosaic. He gasps: “Three senators—your rivals, and... a trusted friend... plan to seize the legions. The Republic is at stake!” You reach out as he collapses, staining your evening tunic with blood. A glass vial falls from his cloak and rolls across the floor.",
      cameo: "The messenger’s last words are a warning... and a plea for help!",
      options: [
        {
          label: "Rush him to a doctor, but risk questions, witnesses and rumors.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "You pay the medic well, but rumors begin to swirl. +1 unrest, -100 denarii.",
                effect: () => { unrest += 1; treasury -= 100; },
                nextStep: 1
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "His last word is a name, scratched onto a wax tablet. 🏅Badge: Snoop.",
                effect: () => {},
                badge: "Snoop",
                nextStep: 1
              }
            }
          ]
        },
        {
          label: "Quietly bury him in the garden yourself.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You dig by moonlight. Rome sleeps… but for how long? -1 unrest, +1 intrigue.",
                effect: () => { unrest -= 1; /* increase intrigue stat if tracked */ },
                nextStep: 2
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "It seems someone saw you! Now the neighbors whisper of your midnight gardening. +2 unrest, -1 politics. 🗡️Loot: Haunted Reputation.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Haunted Reputation",
                nextStep: 2
              }
            }
          ]
        },
        {
          label: "Search his belongings for clues before anything else.",
          fixed: {
            text: "You pocket the vial and the scroll. The messenger’s breath is fading fast… 🗡️Loot: Poison Vial, Coded Scroll.",
            effect: () => {},
            loot: "Poison Vial, Coded Scroll",
            nextStep: 3
          }
        }
      ]
    },
    // Step 1: Doctor or "Snoop" badge outcome
    {
      text: "With the messenger's secret revealed, you ponder your next move. What do you do with the vial and the clue?",
      options: [
        {
          label: "Take the items to your friend and confront her. There is no time to lose. But first, stash the body in the garden...",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Your friend thanks you, but you notice a chill in her voice. Soon after, rumors of a purge circulate in the Senate. -2 politics. 🏅Badge: Naïve.",
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 4
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: "With trembling hands, she confesses her involvement but begs you to help thwart the plot. Together you may turn the tide! +2 politics. 🏅Badge: Double Dealer.",
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 5
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: "She protests her innocence and reveals a cache of blackmail letters against your rivals. +1 politics. 🗡️Loot: Blackmail Letters.",
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Hand them over to the city guard.",
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence down a latrine. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 7
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto their scheme. Best to sleep with one eye open... +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 8
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: "You tuck the vial and scroll into your secret cache, biding your time. +1 intrigue. 🗡️Loot: Secret Cache.",
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 9
          }
        }
        ,        {
                 label: "Study the coded scroll tonight (try to decode)",
                 fixed: { text: "You light a brazier and work through the night, scratching ciphers in the wax.", effect: () => {}, nextStep: 10 }
               },
               {
                 label: "Visit Scriptor Marcus at dawn for help (-50)",
                 fixed: { text: "Marcus pulls a dusty index of substitutions and nods gravely.", effect: () => { treasury -= 50; }, nextStep: 11 }
               }
      ]
    },
    // Step 2: Buried in garden path
    {
      text: "You return inside, haunted by the night’s events. What will you do with the fallen messenger’s secrets?",
      options: [
        {
          label: "Take the items to your friend for advice.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Your friend thanks you, but you notice a chill in her voice. Soon after, rumors of a purge circulate in the Senate. -2 politics. 🏅Badge: Naïve.",
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 4
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: "With trembling hands, she confesses her involvement but begs you to help thwart the plot. Together you may turn the tide. +2 politics. 🏅Badge: Double Dealer.",
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 5
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: "She protests her innocence and reveals a cache of blackmail letters against your rivals. +1 politics. 🗡️Loot: Blackmail Letters.",
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Hand them over to the city guard.",
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 7
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto them. +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 8
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: "You tuck the vial and scroll into your secret cache, biding your time. +1 intrigue. 🗡️Loot: Secret Cache.",
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 9
          }
        }
        ,        {
                 label: "Study the coded scroll tonight (try to decode)",
                 fixed: { text: "By lamplight, the symbols begin to yield—perhaps.", effect: () => {}, nextStep: 10 }
               }
      ]
    },
    // Step 3: You searched belongings before deciding
    {
      text: "With the vial and coded scroll in hand, you must act quickly. What do you do?",
      options: [
        {
          label: "Take the items to your friend for advice.",
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Your friend thanks you, but you notice a chill in her voice. Soon after, rumors of a purge circulate in the Senate. -2 politics. 🏅Badge: Naïve.",
                effect: () => { politics -= 2; },
                badge: "Naïve",
                nextStep: 4
              }
            },
            {
              min: 61, max: 90,
              result: {
                text: "With trembling hands, she confesses her involvement but begs you to help thwart the plot. Together you may turn the tide. +2 politics. 🏅Badge: Double Dealer.",
                effect: () => { politics += 2; },
                badge: "Double Dealer",
                nextStep: 5
              }
            },
            {
              min: 91, max: 100,
              result: {
                text: "She protests her innocence and reveals a cache of blackmail letters against your rivals. +1 politics. 🗡️Loot: Blackmail Letters.",
                effect: () => { politics += 1; },
                loot: "Blackmail Letters",
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Hand them over to the city guard.",
          rng: [
            {
              min: 1, max: 75,
              result: {
                text: "The guards thank you, then 'misplace' the evidence in a latrine. You receive a summons to appear before the Praetor. +2 unrest, -1 politics. 🗡️Loot: Official Summons.",
                effect: () => { unrest += 2; politics -= 1; },
                loot: "Official Summons",
                nextStep: 7
              }
            },
            {
              min: 76, max: 100,
              result: {
                text: "The Praetor praises your loyalty before the Senate. Yet the plotters now know you’re onto them. You sleep better with one eye open, anyway. +1 politics, +1 unrest. 🏅Badge: Civic Hero.",
                effect: () => { politics += 1; unrest += 1; },
                badge: "Civic Hero",
                nextStep: 8
              }
            }
          ]
        },
        {
          label: "Keep them hidden for now.",
          fixed: {
            text: "You tuck the vial and scroll into your secret cache, biding your time. +1 intrigue. 🗡️Loot: Secret Cache.",
            effect: () => { /* Set intrigue stat if tracked */ },
            loot: "Secret Cache",
            nextStep: 9
          }
        }
        ,        {
                 label: "Study the coded scroll right now (try to decode)",
                 fixed: { text: "You spread sand across the table and trace the cipher.", effect: () => {}, nextStep: 10 }
               },
               {
                 label: "Seek Scriptor Marcus (-50)",
                 fixed: { text: "You find Marcus asleep on his wax tablets; he grumbles but agrees to help.", effect: () => { treasury -= 50; }, nextStep: 11 }
               }
      ]
    },
    // Step 4: Terminus — Naïve (betrayal)
    {
      text: "Soon after, your political allies grow distant. The Senate whispers of loyalty—and betrayal. You find yourself increasingly isolated. (Terminus: Intrigue arc closes, for now.)",
      options: [
        { label: "Continue", fixed: { text: "You retire early, wondering who you can truly trust.", effect: () => {} } }
      ]
    },
    // Step 5: Double Dealer (not a terminus—future event hook)
    {
      text: "You and your friend now work in secret against the conspiracy. A deadly game of alliances has begun. (Plot hook: Expect future intrigue!)",
      options: [
        { label: "Continue", fixed: { text: "Your code phrase: 'The grapes are sour this year.'", effect: () => {}, nextStep: 16, continueLabel: "Slip into the night" } }
      ]
    },
    // Step 6: Blackmail Letters — Terminus
    {
      text: "Armed with blackmail, you force the plotters to back down—at least for now. Rome is safe, but you know enemies never sleep. (Terminus: The crisis is averted.)",
      options: [
        { label: "Continue", fixed: { text: "You burn the letters, but keep copies—just in case.", effect: () => {}, badge: "Shadow Architect" } }
      ]
    },
    // Step 7: Official Summons — Terminus
    {
      text: "The bureaucracy swallows your testimony. Days pass, and the conspiracy moves forward in the shadows. You are powerless to intervene. (Terminus: The story ends—for now.)",
      options: [
        { label: "Continue", fixed: { text: "You make a note to never trust the Praetor’s men.", effect: () => {} } }
      ]
    },
    // Step 8: Civic Hero — Terminus
    {
      text: "Lauded by the city, you find yourself watched from the shadows. You are now a hero—and a target. (Terminus: You’ve made enemies at the highest levels.)",
      options: [
        { label: "Continue", fixed: { text: "You vow to keep your guard up.", effect: () => {}, badge: "Public Sentinel" } }
      ]
    },
    // Step 9: Secret Cache — Terminus (future hook)
    {
      text: "You wait and watch as Rome continues around you, knowing the conspiracy is still out there. (Terminus: Your knowledge may yet be decisive—in a future event.)",
      options: [
        { label: "Continue", fixed: { text: "You polish your lute and wait for the next knock.", effect: () => {}, loot: "Intrigue Hook" } }
      ]
    }
    ,
    // Step 10: Attempt to decode the Coded Scroll (solo)
    {
      text: "You work the cipher alone: acrostics, letter wheels, and wine stains shaped like moons.",
      options: [
        { label: "Keep at it till dawn",
          rng: [
            { min:1,max:45, result: { text: "A false trail! The text reads like a shopping list… for daggers. Loot: False Lead Pamphlet.", effect: () => {}, loot: "False Lead Pamphlet", nextStep: 12, continueLabel: "Follow the ‘shopping list’" } },
            { min:46,max:85, result: { text: "Fragments align. You tease out names and a meeting place. Loot: Cipher Fragments.", effect: () => {}, loot: "Cipher Fragments", nextStep: 12, continueLabel: "Pursue the lead" } },
            { min:86,max:100, result: { text: "Click—the key fits. You grasp the system behind the symbols. Loot: Silken Cipher.", effect: () => {}, loot: "Silken Cipher", nextStep: 12, continueLabel: "Act on the message" } }
          ] }
      ]
    },

    // Step 11: Scriptor Marcus (assisted decode)
    {
      text: "Marcus the scriptor peers at the scroll through smoke and candle soot.",
      options: [
        { label: "Let him cross-map the symbols",
          rng: [
            { min:1,max:30, result: { text: "A sleepy mistake sends you on a tangent. Politics -1.", effect: () => { politics -= 1; }, nextStep: 12 } },
            { min:31,max:80, result: { text: "Between yawns, he extracts a meeting place and a pass-phrase. Loot: Whispered Password.", effect: () => {}, loot: "Whispered Password", nextStep: 12 } },
            { min:81,max:100, result: { text: "He chuckles: ‘A classic switch-key.’ He copies the schema. Loot: Silken Cipher.", effect: () => {}, loot: "Silken Cipher", nextStep: 12 } }
          ] }
      ]
    },

    // Step 12: Tailing the lead
    {
      text: "At dusk, a cloaked courier matches the scroll’s meet-point near the Tiber.",
      options: [
        { label: "Shadow him across the rooftops",
          rng: [
            { min:1,max:55, result: { text: "Tiles skid; you bruise a knee but keep pace. Treasury -25. Loot: Safehouse Map.", effect: () => { treasury -= 25; }, loot: "Safehouse Map", nextStep: 13 } },
            { min:56,max:90, result: { text: "You flit from shadow to shadow. Loot: Safehouse Map.", effect: () => {}, loot: "Safehouse Map", nextStep: 13 } },
            { min:91,max:100, result: { text: "He spots you; a knife flashes. You escape rattled. +1 unrest.", effect: () => { unrest += 1; }, nextStep: 13 } }
          ] },
        { label: "Blend with dockworkers and listen",
          fixed: { text: "A foreman mentions ‘the ash door by the mill.’ Loot: Dockside Rumor.", effect: () => {}, loot: "Dockside Rumor", nextStep: 13 } }
      ]
    },

    // Step 13: The Safehouse
    {
      text: "A hidden door marked with ash opens onto a cramped room of ledgers and masks.",
      options: [
        { label: "Sneak in through the back with the Safehouse Map (requires Safehouse Map)", condition: { loot: "Safehouse Map" },
          rng: [
            { min:1,max:60, result: { text: "You slip past a guard dog with a scrap of bread. Loot: Names Tablet.", effect: () => {}, loot: "Names Tablet", nextStep: 14 } },
            { min:61,max:100, result: { text: "A floorboard creaks, but no one stirs. Loot: Names Tablet, Conspirator Seal.", effect: () => {}, loot: "Names Tablet, Conspirator Seal", nextStep: 14 } }
          ] },
        { label: "Bribe the watchman (-80)", fixed: { text: "Coins vanish; the watchman does too. Loot: Conspirator Seal.", effect: () => { treasury -= 80; }, loot: "Conspirator Seal", nextStep: 14 } },
        { label: "Kick the door in",
          rng: [
            { min:1,max:50, result: { text: "The room is cleared—someone was warned. Politics -1.", effect: () => { politics -= 1; }, nextStep: 14 } },
            { min:51,max:100, result: { text: "A startled scribe bolts, dropping a slate. Loot: Names Tablet.", effect: () => {}, loot: "Names Tablet", nextStep: 14 } }
          ] }
      ]
    },

    // Step 14: Aboveboard or cunning preparation
    {
      text: "Armed with hints and tokens, how will you proceed?",
      options: [
        { label: "Swear an oath at the Temple of Vesta (-25)", fixed: { text: "You vow to expose the plot without blood. Treasury -25. Loot: Vesta Token.", effect: () => { treasury -= 25; }, loot: "Vesta Token", nextStep: 15 } },
        { label: "Draft a lictor sting plan",
          fixed: { text: "You map arrests for dawn across three alleys. Loot: Lictor Sting Plan.", effect: () => {}, loot: "Lictor Sting Plan", nextStep: 15 } }
      ]
    },

    // Step 15: The Move
    {
      text: "Night deepens—oil lamps gutter; a dog barks twice in a far alley. The city holds its breath.",
      options: [
        { label: "Confront your friend with the Names Tablet",
          rng: [
            { min:1,max:60, result: { text: "She tries tears, and you show her steel. She agrees to help you turn the circle against itself. 🏅Badge: Double Dealer.", effect: () => {}, badge: "Double Dealer", nextStep: 5 } },
            { min:61,max:100, result: { text: "She denies it and vanishes into the night, leaving a warning etched in your gate. Loot: Anonymous Testimony.", effect: () => {}, loot: "Anonymous Testimony", nextStep: 7 } }
          ] },
        { label: "Hand the Names Tablet to the Praetor (requires Vesta Token or Lictor Sting Plan)", condition: { any: [ { loot: "Vesta Token" }, { loot: "Lictor Sting Plan" } ] },
          fixed: { text: "You make it official—clean, but slow. Politics +1. Loot: Official Dossier.", effect: () => { politics += 1; }, loot: "Official Dossier", nextStep: 7 } }
      ]
    },

    // Step 16: Epilogue hook
    {
      text: "As dawn breaks, Rome stirs to rumors of arrests and missing senators.",
      options: [
        { label: "Continue", fixed: { text: "The city watches; the game has only begun.", effect: () => {}, nextStep: null, suppressNextRandom: true } }
      ]
    }
  ]
},
// --- [DATA END] ---
// When integrating into game.js, connect the "continue" handler of the last step to either:
//   - resume main gameplay
//   - trigger follow-up event(s) based on result badges/loot
// For example, if (badge == "Double Dealer") trigger another random event in future years

// --- EVENT: the_conspirators_strike_back ---
// To trigger this event: startRandomEventTree("the_conspirators_strike_back")
// Suggested: Trigger if badges/loot from midnight_messenger include "Double Dealer" or "Secret Cache"
the_conspirators_strike_back: {
  meta: {
    tags: ["intrigue"],
    weight: 5,
    enabled: true,
    requires: {
      any: [
        { badge: "Double Dealer" },
        { loot: "Secret Cache" }
      ]
    }
  },
  steps: [
    // Step 0: The threat returns
    {
      text: "It’s a moonless night. You hear footsteps in the courtyard—your villa is being watched. Suddenly, there’s a scratch at your door and a sealed note is slipped beneath: 'Silence is survival. Rome has no place for busybodies.' What do you do?",
      cameo: "A chill runs down your spine as you weigh your next move.",
      options: [
        {
          label: "Gather your loyal clients and increase your security.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "Your men repel an intruder. A bloodied dagger is left behind. 🗡️Loot: Bloodied Dagger.",
                effect: () => { /* +1 intrigue */ },
                loot: "Bloodied Dagger",
                nextStep: 6
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "The guards betray you! Your study is ransacked and secrets may be lost. -200 denarii, +2 unrest.",
                effect: () => { treasury -= 200; unrest += 2; },
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Try to secretly meet your double agent friend for intel.",
          condition: { badge: "Double Dealer" },
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Thanks to your friend, you save a fellow senator and earn powerful new allies. +2 politics. 🏅Badge: Savior in the Shadows.",
                effect: () => { politics += 2; },
                badge: "Savior in the Shadows",
                nextStep: 6
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "You narrowly escape an ambush. Your friend slips you a hidden blade for protection. +1 unrest. 🗡️Loot: Hidden Blade.",
                effect: () => { unrest += 1; },
                loot: "Hidden Blade",
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Burn the evidence / Attempt to blackmail the plotters.",
          condition: { anyLoot: ["Secret Cache", "Blackmail Letters"] },
          fixed: {
            text: "You take bold action in the darkness. Only time will tell if you’ve silenced your enemies or made new ones. -1 intrigue. 🏅Badge: Shadow Player.",
            effect: () => { /* -1 intrigue */ },
            badge: "Shadow Player",
            nextStep: 6
          }
        },
        {
          label: "Ignore the threat. You're above suspicion.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "The shadows withdraw, but you sense eyes watching your every move.",
                effect: () => {},
                nextStep: 6
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "Whispers grow in the Curia—your rivals twist your silence into weakness. -2 politics.",
                effect: () => { politics -= 2; },
                nextStep: 6
              }
            }
          ]
        },
        {
          label: "Accept the shadowy figure’s help (pay for protection).",
          condition: { badge: "Naïve" },
          rng: [
            {
              min: 1, max: 60,
              result: {
                text: "Your would-be savior disappears with your coin and your secrets. -150 denarii, -1 intrigue.",
                effect: () => { treasury -= 150; /* -1 intrigue */ },
                nextStep: 6
              }
            },
            {
              min: 61, max: 100,
              result: {
                text: "The stranger slips you a coded message: a powerful clue for a future plot. +1 intrigue. 🗡️Loot: Anonymous Testimony.",
                effect: () => { /* +1 intrigue */ },
                loot: "Anonymous Testimony",
                nextStep: 6
              }
            }
          ]
        }
      ]
    },
    // Step 6: Senate wrap-up (universal)
    {
      text: "In the morning, the Senate floor buzzes with rumor. You’re still standing—but for how long?",
      options: [
        {
          label: "Continue",
          fixed: {
            text: "The day is young, and the game continues.",
            effect: () => {},
            nextStep: 7
          }
        }
      ]
    },
    // Step 7: Final branches — silly or dire
    {
      text: "Still uneasy after the night's intrigue, you seek distraction (or information). What do you do next?",
      options: [
        {
          label: "Go to the baths and gossip.",
          rng: [
            {
              min: 1, max: 50,
              result: {
                text: "You and three senators are chased naked from the baths by an angry chef. The city laughs for weeks. +1 unrest.",
                effect: () => { unrest += 1; }
              }
            },
            {
              min: 51, max: 100,
              result: {
                text: "Hidden in the mist, you catch whispers of conspiracy. 🗡️Loot: Bathhouse Intel.",
                effect: () => {},
                loot: "Bathhouse Intel"
              }
            }
          ]
        },
        {
          label: "Throw a lavish party.",
          rng: [
            {
              min: 1, max: 30,
              result: {
                text: "Your party is the talk of the town—for all the wrong reasons. -100 denarii, -1 politics.",
                effect: () => { treasury -= 100; politics -= 1; }
              }
            },
            {
              min: 31, max: 100,
              result: {
                text: "You outwit a spy among your guests, earning quiet respect. +1 intrigue. 🏅Badge: Host with the Most.",
                effect: () => { /* +1 intrigue */ },
                badge: "Host with the Most"
              }
            }
          ]
        },
        {
          label: "Attend the Senate vote.",
          rng: [
            {
              min: 1, max: 70,
              result: {
                text: "You barely avoid arrest as your rivals conspire. -2 politics, +2 unrest.",
                effect: () => { politics -= 2; unrest += 2; }
              }
            },
            {
              min: 71, max: 100,
              result: {
                text: "You survive a poisoning attempt—barely! 🏅Badge: Liver of Iron.",
                effect: () => {},
                badge: "Liver of Iron"
              }
            }
          ]
        }
        ,
        { label: "Set a trap at the Tiber ferry",
          fixed: { text: "You bait the hook with forged letters and a whisper to the right ears.", effect: () => {}, nextStep: 8 } }
      ]
    }
    ,
    // Step 8: Preparation — pick your bait
    {
      text: "Your trap needs bait. What do you dangle?",
      options: [
        { label: "Wave copies of Blackmail Letters (requires Blackmail Letters)", condition: { loot: "Blackmail Letters" }, fixed: { text: "A rumor slithers through the Curia: fresh ink for sale.", effect: () => {}, nextStep: 9 } },
        { label: "Plant Anonymous Testimony (requires Anonymous Testimony)", condition: { loot: "Anonymous Testimony" }, fixed: { text: "A whisper passes from porter to porter.", effect: () => {}, nextStep: 9 } },
        { label: "Use Whispered Password as the lure (requires Whispered Password)", condition: { loot: "Whispered Password" }, fixed: { text: "A single phrase changes hands and sets feet moving.", effect: () => {}, nextStep: 9 } },
        { label: "Craft fake augury bones as a signal (-25)", fixed: { text: "You scratch runes into chicken bones and pass them to a street seer. Treasury -25. Loot: Fake Augury Bones.", effect: () => { treasury -= 25; }, loot: "Fake Augury Bones", nextStep: 9 } },
        { label: "No special bait—trust the whisper network",
          fixed: { text: "You scatter hints with coin and nods.", effect: () => {}, nextStep: 9 } }
      ]
    },

    // Step 9: Ambush at the ferry
    {
      text: "Fog hugs the Tiber. Footsteps approach the moored skiff.",
      options: [
        { label: "Spring the trap",
          rng: [
            { min:1,max:50, result: { text: "Chaos—your quarry escapes into the fog. You take a poisoned cut. Loot: Poisoned Cut.", effect: () => {}, loot: "Poisoned Cut", nextStep: 10 } },
            { min:51,max:85, result: { text: "A scuffle, a splash, and a ledger saved from the water—ink bleeding like bruises. Loot: Conspiracy Ledger.", effect: () => {}, loot: "Conspiracy Ledger", nextStep: 10 } },
            { min:86,max:100, result: { text: "Perfect timing. You take two conspirators alive. Politics +1. Loot: Conspiracy Ledger, Captive Conspirator.", effect: () => { politics += 1; }, loot: "Conspiracy Ledger, Captive Conspirator", nextStep: 10 } }
          ] }
      ]
    },

    // Step 10: Senate showdown
    {
      text: "With fresh leverage, how do you close the vice?",
      options: [
        { label: "Publish the ledger on the rostra (aboveboard)", condition: { loot: "Conspiracy Ledger" }, fixed: { text: "Gasps roll through the Forum. Unrest -1, Politics +2. Badge: Tribune of Daylight.", effect: () => { unrest = Math.max(0, unrest - 1); politics += 2; }, badge: "Tribune of Daylight", nextStep: 11 } },
        { label: "Cut private deals using the ledger (cunning)", condition: { loot: "Conspiracy Ledger" }, fixed: { text: "Names become favors overnight. Politics +3, Unrest +1. Badge: Broker of Shadows.", effect: () => { politics += 3; unrest += 1; }, badge: "Broker of Shadows", nextStep: 11 } },
        { label: "Parade the captive through the Curia (requires Captive Conspirator)", condition: { loot: "Captive Conspirator" }, fixed: { text: "Fear does the talking. Politics +2.", effect: () => { politics += 2; }, nextStep: 11 } },
        { label: "Limp home and tend your wound (requires Poisoned Cut)", condition: { loot: "Poisoned Cut" }, fixed: { text: "The city spins as you bind the gash. Politics -1.", effect: () => { politics -= 1; }, nextStep: 11 } }
      ]
    },

    // Step 11: Epilogue
    {
      text: "Rome mutters your name—for praise or for fear.",
      options: [ { label: "Continue", fixed: { text: "The river carries secrets away; others will wash ashore.", effect: () => {}, nextStep: null, suppressNextRandom: true } } ]
    }
  ]
  }
};/* --- stripped inline engine (moved to runner) ---
// --- [HOOK] ---
// When integrating into game.js, connect the "continue" handler of the last step to either:
//   - resume main gameplay
//   - trigger follow-up event(s) based on result badges/loot
// For example, if (badge == "Double Dealer") trigger another random event in future years
if (typeof module !== "undefined") module.exports = randomEventTrees;

// --- Event Trees Engine using the Random Event modal ---
(function () {
  function awardTitleFromEvents(name) {
    try {
      window.honoraryTitles = window.honoraryTitles || [];
      if (!window.honoraryTitles.includes(name)) {
        window.honoraryTitles.push(name);
        if (typeof delayedLog === "function") {
          delayedLog(`🏅 Honorary Title Earned: <span class="honorary-title-badge">${name}</span>`, "log-positive");
        }
      }
      if (typeof updateScoreboard === "function") updateScoreboard();
    } catch (e) {
      console.warn("awardTitleFromEvents error:", e);
    }
  }

  // --- Condition helpers (global) ---
  if (typeof window.hasBadge !== "function") {
    window.hasBadge = function(name) {
      try { return Array.isArray(window.honoraryTitles) && window.honoraryTitles.includes(name); }
      catch (_) { return false; }
    };
  }
  if (typeof window.hasLoot !== "function") {
    window.hasLoot = function(name) {
      try { return Array.isArray(window.inventory) && window.inventory.includes(name); }
      catch (_) { return false; }
    };
  }

  try {
    window.randomEventTrees = (typeof randomEventTrees !== "undefined") ? randomEventTrees : window.randomEventTrees;
  } catch (e) {
    console.error("Failed to export randomEventTrees:", e);
  }

  let modalActive = false;
  let resumeCb = null;

  function startRandomEventTree(key, onResume) {
    try {
      resumeCb = (typeof onResume === 'function') ? onResume : null;
      const tree = (window.randomEventTrees || {})[key];
      if (!tree) { console.warn("startRandomEventTree: event key not found:", key); return; }

      const modal    = document.getElementById("random-event-modal");
      const descEl   = document.getElementById("random-event-desc");
      const cameoEl  = document.getElementById("random-event-cameo");
      const closeBtn = document.getElementById("random-event-close-btn");

      if (!modal || !descEl || !closeBtn) {
        const first = tree.steps && tree.steps[0];
        if (first && typeof delayedLog === "function") delayedLog(first.text, "log-event");
        if (resumeCb) { const cb = resumeCb; resumeCb = null; setTimeout(cb, 0); }
        return;
      }

      function clearOptions() {
        const prior = modal.querySelector(".event-options");
        if (prior) prior.remove();
      }

      function applyResult(result) {
        try {
          if (result && typeof result.effect === "function") result.effect();
          if (result && result.badge) awardTitleFromEvents(result.badge);
          if (result && result.loot) {
            window.inventory = window.inventory || [];
            if (!window.inventory.includes(result.loot)) window.inventory.push(result.loot);
            if (typeof delayedLog === "function") delayedLog(`🎒 Loot acquired: ${result.loot}`, "log-positive");
          }
          if (typeof updateScoreboard === "function") updateScoreboard();
        } catch (e) { console.warn("applyResult error:", e); }
      }

      function finishAndClose() {
        modal.classList.add("hidden");
        modalActive = false;
        const cb = resumeCb; resumeCb = null;
        if (cb) setTimeout(cb, 0);
      }

      function renderStep(i) {
        const step = (tree.steps || [])[i];
        if (!step) { finishAndClose(); return; }

        descEl.innerHTML = step.text || "";
        if (cameoEl) cameoEl.textContent = step.cameo || "";

        // Options (filter by condition)
        clearOptions();
        const allOptions = Array.isArray(step.options) ? step.options : [];
        const filtered = allOptions.filter(opt => {
          try {
            if (typeof opt.condition === "function") return !!opt.condition();
            if (opt.condition == null) return true;
            if (typeof opt.condition === "object") {
              if (opt.condition.badge) return window.hasBadge && window.hasBadge(opt.condition.badge);
              if (opt.condition.loot)  return window.hasLoot  && window.hasLoot(opt.condition.loot);
            }
            return !!opt.condition; // truthy treated as allowed
          } catch (_) { return false; }
        });

        const hasOptions = filtered.length > 0;
        const wrap = document.createElement("div");
        wrap.className = "event-options";

        filtered.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "problem-option-btn";
          btn.type = "button";
          btn.textContent = opt.label || "Option";
          btn.addEventListener("click", () => {
            let result = null;
            if (opt.fixed) {
              result = opt.fixed;
            } else if (opt.rng && Array.isArray(opt.rng) && opt.rng.length) {
              const roll = Math.floor(Math.random() * 100) + 1;
              for (const r of opt.rng) {
                if (roll >= (r.min ?? 1) && roll <= (r.max ?? 100)) { result = r.result || r; break; }
              }
            }

            if (result) {
              applyResult(result);
              descEl.innerHTML = result.text || "";
              clearOptions();
              closeBtn.onclick = () => {
                if (typeof result.nextStep === "number") renderStep(result.nextStep);
                else finishAndClose();
              };
            } else {
              renderStep(i + 1);
            }
          }, { once: true });
          wrap.appendChild(btn);
        });

        if (hasOptions) closeBtn.insertAdjacentElement("beforebegin", wrap);

        closeBtn.onclick = () => {
          if (!step.options || step.options.length === 0) renderStep(i + 1);
        };

        modal.classList.remove("hidden");
        modalActive = true;
        closeBtn.focus();
      }

      renderStep(0);
    } catch (e) {
      console.error("startRandomEventTree failed:", e);
      if (resumeCb) { const cb = resumeCb; resumeCb = null; setTimeout(cb, 0); }
    }
  }

  try { window.startRandomEventTree = startRandomEventTree; }
  catch (e) { console.error("Failed to export startRandomEventTree:", e); }

  window.EventTrees = {
    data: window.randomEventTrees || {}
  };
})();
// --- END OF EVENT TREES ---
*/
