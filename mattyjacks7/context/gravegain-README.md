# GraveGain
GraveGain 1D and 2D and 3D and 4D and more videogames.





https://docs.google.com/document/d/1Gw1c8GwMPhMuzLG4w3VpiBLMEKevbbI2G7Vwtlc2c3A/edit?usp=sharing

Above is the main design document for the GraveGain project. It contains all the information about the project, including the game design, the game mechanics, the game art, and the game sound.

**A Dark Fantasy Action RPG Built with Emoji Graphics**

GraveGain is a multi-dimensional game project spanning 1D, 2D, 3D, and 4D implementations.
The flagship version is **GraveGain 2D** - a top-down action RPG built in Godot 4.6 featuring
procedurally generated dungeons, emoji-based graphics, 2.5D lighting, deep combat mechanics,
and a rich lore system with text-to-speech narration, vertical dungeons, dialogue system, starship skills, and quality-of-life improvements.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [GraveGain 2D Features](#gravegain-2d-features)
4. [Getting Started](#getting-started)
5. [Game Mechanics](#game-mechanics)
6. [Combat System](#combat-system)
7. [Player Classes and Races](#player-classes-and-races)
8. [Enemy Types](#enemy-types)
9. [Map Generation](#map-generation)
10. [Item System](#item-system)
11. [Lore System](#lore-system)
12. [Vertical Dungeon System](#vertical-dungeon-system)
13. [Dialogue and Voice System](#dialogue-and-voice-system)
14. [Starship Skill Systems](#starship-skill-systems)
15. [Quality of Life Features](#quality-of-life-features)
16. [Advanced Enemy AI](#advanced-enemy-ai)
17. [Visual Effects](#visual-effects)
18. [HUD and UI](#hud-and-ui)
19. [Settings and Configuration](#settings-and-configuration)
20. [Sidescroller Mode](#sidescroller-mode)
21. [Game Systems](#game-systems)
22. [300 Improvements List](#300-improvements-list)
23. [World Lore](#world-lore)
24. [Design Document](#design-document)
25. [Contributing](#contributing)
26. [License](#license)

---

## Overview

GraveGain takes place in a dark fantasy world where the dead have risen through an event
known as the **NecroGenesis**. Players explore procedurally generated dungeons, fight hordes
of undead enemies, collect lore fragments, and push deeper into increasingly dangerous territory.

The game uses emoji characters as its primary visual language, creating a unique aesthetic
that is both charming and surprisingly atmospheric when combined with the 2.5D lighting
system, particle effects, and dynamic shadows.

### Key Highlights

- **Procedural Dungeons**: Every run generates a unique dungeon layout with themed rooms
- **Emoji Graphics**: All characters, items, and decorations use emoji with optional font sets
- **2.5D Lighting**: Dynamic point lights, shadows, and light occluders create depth
- **Deep Combat**: Melee, ranged, and ability-based combat with combos, criticals, and executions
- **Rich Lore**: 60+ collectible lore entries with text-to-speech narration
- **4 Playable Races**: Human, Elf, Dwarf, and Orc - each with unique abilities
- **10+ Enemy Types**: From goblins to skeleton knights to necromancers
- **Sidescroller Buildings**: Enter buildings to play platformer sections
- **Achievement System**: 25+ achievements tracking player progress
- **Daily Challenges**: Procedurally generated daily objectives
- **Prestige System**: Reset and replay with permanent bonuses

---

## Project Structure

```
GraveGain/
|-- README.md                          # This file
|-- v1/                                # Version 1 prototypes
|   |-- 1d/                            # 1D text-based prototype
|   |-- 2d/                            # Early 2D prototype
|   |-- 3d/                            # 3D prototype
|   |-- 4d/                            # 4D experimental build
|-- v2/                                # Version 2 (current)
|   |-- 2d2/                           # 2D second iteration
|   |   |-- grave-gain-2d-2/           # Main Godot 4.6 project
|   |   |   |-- project.godot          # Godot project configuration
|   |   |   |-- scenes/                # Scene files (.tscn)
|   |   |   |   |-- main_menu.tscn     # Main menu scene
|   |   |   |   |-- game.tscn          # Game scene
|   |   |   |-- scripts/               # GDScript files
|   |   |   |   |-- game.gd            # Main game controller
|   |   |   |   |-- player.gd          # Player character
|   |   |   |   |-- enemy.gd           # Enemy AI and behavior
|   |   |   |   |-- item.gd            # Item pickups
|   |   |   |   |-- hud.gd             # Heads-up display
|   |   |   |   |-- projectile.gd      # Projectile physics
|   |   |   |   |-- map_generator.gd   # Procedural dungeon generator
|   |   |   |   |-- map_renderer.gd    # Tile rendering and collisions
|   |   |   |   |-- vfx_manager.gd     # Visual effects manager
|   |   |   |   |-- main_menu.gd       # Main menu logic
|   |   |   |   |-- touch_controls.gd  # Mobile touch input
|   |   |   |   |-- autoload/          # Autoload singletons
|   |   |   |   |   |-- game_data.gd   # Game data and definitions
|   |   |   |   |   |-- emoji_manager.gd # Emoji font management
|   |   |   |   |-- systems/           # Game systems
|   |   |   |   |   |-- game_systems.gd # Core systems (XP, combos, etc.)
|   |   |   |   |-- lore/              # Lore system
|   |   |   |   |   |-- lore_database.gd
|   |   |   |   |   |-- lore_entries_1.gd
|   |   |   |   |   |-- lore_entries_2.gd
|   |   |   |   |   |-- lore_manager.gd
|   |   |   |   |   |-- lore_pickup.gd
|   |   |   |   |   |-- lore_reader_ui.gd
|   |   |   |   |   |-- lore_collection_ui.gd
|   |   |   |   |   |-- tts_manager.gd
|   |   |   |   |-- sidescroller/      # Sidescroller building interiors
|   |   |   |   |   |-- sidescroller_controller.gd
|   |   |   |   |-- minigames/         # Mini-game corners
|   |   |   |   |   |-- minigame_manager.gd
|   |   |   |-- fonts/                 # Font files
|   |   |   |   |-- emoji/             # Emoji font sets
|   |   |   |   |   |-- README.md      # Emoji font documentation
```

---

## GraveGain 2D Features

### Core Gameplay
- Top-down 2D action RPG with real-time combat
- Procedurally generated dungeon maps with 12+ rooms per run
- Multiple room types: spawn, normal, arena, treasury, cathedral, shrine, lab, prison, etc.
- Dynamic difficulty scaling based on distance from spawn
- Boss encounters near the safespace at the end of the dungeon

### Combat
- Melee attacks with swing arc, knockback, and damage falloff
- Ranged attacks with projectile physics and ammo management
- Ability system with race-specific special powers
- Dodge rolling with invincibility frames and afterimage effects
- Blocking and parrying with perfect block timing window
- Charge attacks that build power over time
- Combo system with escalating damage bonuses
- Kill streaks with score multipliers up to 5x
- Critical hits, headshots, and execution finishers
- Armor penetration mechanics
- Elemental damage types: physical, fire, ice, poison, lightning

### Enemies
- 10+ enemy types with unique behaviors and attack patterns
- AI state machine: idle, chase, attack, stagger, stun, flee, dead
- Elite enemies with enhanced stats and visual indicators
- Boss enemies with summoning abilities and enrage phases
- Pack tactics where nearby allies boost each other
- Aggro leash system to prevent infinite chasing
- Distance-based scaling for HP, damage, gold, and XP
- Telegraphed attacks with wind-up animations
- Out-of-combat healing for enemies

### Items and Loot
- Gold coins, bars, and cubes with varying values
- Health potions, mana potions, and ammo pickups
- Artifacts with rarity tiers: common, uncommon, rare, epic, legendary
- Food items that heal over time
- Damage boost, speed boost, and shield pickups
- Rage potions and XP/gold multipliers
- Loot explosion on enemy death with multiple drops
- Item rarity glow effects
- Magnetic pickup with scaling based on player level
- Spinning animation for dropped items

### Map Generation
- Procedural room placement with overlap prevention
- Corridor connections with extra random links
- Room type assignment based on size and position
- Themed room decorations (pillars, statues, candles, skulls)
- Fountain rooms with healing zones
- Altar rooms with buff shrines (strength, speed, protection, fury, life)
- Treasure rooms with enhanced loot
- Secret rooms accessible through hidden walls
- Environmental hazard zones (fire, poison gas, lightning, ice)
- Corridor ambush spawn points
- Dead-end treasure caches
- Water pools and trap placements
- Door system between rooms
- Building entries for sidescroller mode
- Ambient particle emitters per room type

### Visual Effects
- Blood splats, particles, and gore chunks
- Hit flashes and impact rings
- Attack trails and muzzle flashes
- Footstep dust particles
- Level up burst with colorful particles
- Dodge afterimage ghost effect
- Healing particle streams
- Elemental hit effects (fire, ice, poison, lightning)
- Shield break shard explosion
- Execution slash lines
- Charge glow aura
- Ambient dust, mist, sparkle, and smoke particles
- Screen flash overlay for critical moments
- Overkill explosion with expanding rings
- Screen shake with configurable intensity
- Camera punch on heavy hits

### HUD and UI
- Health bar with color transitions (green to yellow to red)
- Stamina bar with flash warning at low values
- Shield, mana, and rage resource bars
- Buff/debuff icon display with durations
- DPS meter tracking damage output
- Gold pickup popup notifications
- Death screen with detailed statistics
- Kill streak announcements
- Bloodlust stack indicator
- Charge attack progress bar
- Minimap with room outlines and legend
- Combo counter with visual feedback
- Boss HP bar
- Kill feed with weapon icons
- Score display with streak multiplier
- Vignette overlay
- Tutorial hints system
- Room name display on entry
- Damage numbers floating above enemies
- Hit markers on successful strikes
- XP bar with level indicator
- Crosshair with configurable style

### Settings
- Master, SFX, and music volume controls
- Mouse sensitivity adjustment
- Camera zoom and smoothing
- Screen shake toggle
- Damage numbers toggle
- FPS counter toggle
- Minimap toggle and zoom
- Auto-pickup range
- Colorblind mode
- Vignette toggle
- Hit markers toggle
- Tutorial hints toggle
- Crosshair style selection
- Graphics quality presets (Low, Medium, High, Ultra)
- Blood and gore toggles with intensity levels
- Particle density settings
- Shadow and dynamic lighting toggles
- Hit flash, trail, and impact effect toggles
- Ambient particle toggle
- Hit pause toggle
- Camera punch toggle
- Camera lead toggle
- Emoji set selection (8 different emoji fonts)

---

## Getting Started

### Prerequisites

- **Godot 4.6** or later (standard or .NET build)
- Git (for cloning the repository)
- Windows, macOS, or Linux

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GraveGain.git
   cd GraveGain
   ```

2. Open the project in Godot:
   - Launch Godot 4.6
   - Click "Import"
   - Navigate to `v2/2d2/grave-gain-2d-2/`
   - Select `project.godot`
   - Click "Import & Edit"

3. Run the game:
   - Press F5 or click the Play button
   - The main menu will appear
   - Select your race and class
   - Click "Start Mission" to begin

### Controls

| Action | Key | Description |
|--------|-----|-------------|
| Move | WASD | Move in four directions |
| Sprint | Shift | Move faster (uses stamina) |
| Dodge | Space | Roll to avoid damage |
| Attack | Left Click | Melee or ranged attack |
| Aim | Mouse | Aim direction |
| Block | Right Click | Block incoming attacks |
| Ability | Q | Use race-specific ability |
| Toggle Light | F | Toggle personal light |
| Interact | E | Interact with objects |
| Lore Collection | I or Tab | Open lore browser |
| Pause/Exit | Escape | Return to menu |

### Mobile Controls

The game supports touch controls on mobile devices:
- Virtual joystick for movement
- Attack button for combat
- Special ability button
- Dodge button
- Light toggle button

---

## Game Mechanics

### Movement

Players move with WASD keys at a base speed determined by their race. Sprinting with
Shift increases speed by 50% but consumes stamina. Dodge rolling with Space grants
brief invincibility frames and creates an afterimage effect. Movement speed affects
momentum damage - moving faster deals more melee damage.

### Stamina System

Stamina regenerates over time and is consumed by:
- Sprinting (continuous drain)
- Dodge rolling (fixed cost)
- Melee attacks (small cost)
- Blocking (drain on hit)

When stamina is low, the stamina bar flashes as a warning. Running out of stamina
prevents sprinting and dodging until partial recovery.

### Health and Damage

Player health is displayed as a bar that transitions from green (full) through yellow
to red (critical). Damage taken causes:
- Screen shake proportional to damage
- Directional damage indicator
- Camera punch effect
- Red vignette flash

Healing sources include:
- Health potions (instant heal)
- Food items (heal over time)
- Fountain rooms (proximity healing)
- Altar of Life (burst heal)
- Lifesteal from bloodlust stacks
- Second wind on near-death

### Resource Systems

- **Shield**: Absorbs damage before health. Regenerates after delay. Human racial bonus.
- **Mana**: Powers Elven abilities. Regenerates slowly. Boosted by BrightEyes racial.
- **Rage**: Builds on taking/dealing damage. Powers Orc abilities. Decays over time.
- **Ammo**: Consumed by ranged attacks. Found in dungeon or restored at safe spaces.

### Experience and Leveling

Kill enemies and complete objectives to earn XP. Each level provides:
- +3% stat bonus per level
- Stat scaling for damage, health, and speed
- Unlocks at milestone levels
- Maximum level: 50

XP required per level scales by 1.15x each level, starting at 100 XP for level 2.

### Gold Economy

Gold is earned from:
- Killing enemies (scaled by difficulty and distance)
- Opening chests
- Picking up gold items (coins, bars, cubes)
- Gold interest system (1% every 30 seconds)
- Gold multiplier pickups

Gold can be used for... surviving. More gold means a higher score.

---

## Combat System

### Melee Combat

Melee attacks use an arc-based collision check. The player swings in the direction
they are facing, hitting all enemies within the arc angle and range. Damage is
calculated as:

```
base_damage * crit_multiplier * combo_bonus * streak_bonus * momentum_bonus
```

Special melee mechanics:
- **Charge Attack**: Hold attack button to charge (up to 1.5s) for 3x damage
- **Sprint Lunge**: Attacking while sprinting extends range and adds knockback
- **Parry Counter**: Perfect block timing triggers a guaranteed critical counterattack
- **Multi-Cleave**: Attacks can hit multiple enemies in the arc
- **Execution**: Enemies below execution threshold are instantly killed
- **Armor Penetration**: Bypasses a percentage of enemy armor
- **Headshot Cone**: Narrow aim cone for 2x critical damage on humanoids

### Ranged Combat

Ranged attacks fire projectiles that travel in a straight line. Projectiles have:
- Speed and range limits
- Damage falloff over distance
- Piercing on critical hits
- Ammo consumption per shot

### Dodge System

Dodge rolling provides:
- 0.3s invincibility frames
- Speed burst in the dodge direction
- Afterimage visual effect
- Lucky dodge chance (5%) to auto-dodge incoming damage
- Dodge attack: attacking during a dodge triggers a special strike

### Blocking

Holding the block button reduces incoming damage. Features:
- Stamina cost on each blocked hit
- Perfect block window (0.2s from pressing block)
- Perfect blocks negate all damage and stagger the attacker
- Shield bash: pressing attack while blocking pushes enemies back

### Adrenaline Rush

When health drops below 30%, adrenaline activates:
- +25% attack speed
- +15% movement speed
- Reduced ability cooldowns
- Lasts until health recovers above threshold

### Bloodlust

Each kill adds a bloodlust stack (max 5):
- +8% attack speed per stack
- Stacks decay after 5 seconds without a kill
- At max stacks, attacks have a small lifesteal effect

---

## Player Classes and Races

### Races

Each race has unique base stats and a racial ability:

#### Human
- **Base HP**: 100
- **Racial Ability**: Shield Wall - deploys a temporary shield
- **Passive**: Shield regeneration after not taking damage
- **Strengths**: Balanced stats, good survivability
- **Weakness**: No special movement abilities

#### Elf (BrightEyes)
- **Base HP**: 80
- **Racial Ability**: Nature Burst - AoE magic damage
- **Passive**: Enhanced mana regeneration, night vision
- **Strengths**: High magic damage, ranged superiority
- **Weakness**: Lower health pool

#### Dwarf
- **Base HP**: 120
- **Racial Ability**: Stone Form - temporary damage immunity
- **Passive**: Can see in the dark, poison resistance
- **Strengths**: High defense, melee power
- **Weakness**: Slower movement speed

#### Orc
- **Base HP**: 110
- **Racial Ability**: Rage Burst - AoE damage proportional to rage
- **Passive**: Rage builds from combat, enhances attacks
- **Strengths**: Highest damage potential, aggressive playstyle
- **Weakness**: Rage decays, less effective at range

### Classes

Classes modify the player's combat style and available weapons:

- **Warrior**: Balanced melee fighter with shield proficiency
- **Ranger**: Ranged specialist with bonus ammo and accuracy
- **Mage**: Ability-focused with enhanced mana pool and spell damage
- **Rogue**: Fast attacker with critical hit bonuses and stealth

---

## Enemy Types

### Standard Enemies

| Enemy | Emoji | HP | Damage | Speed | Behavior |
|-------|-------|-----|--------|-------|----------|
| Zombie | &#x1F9DF; | Low | Low | Slow | Shambles toward player, easy to dodge |
| Skeleton | &#x1F480; | Low | Medium | Medium | Charges and swings sword |
| Goblin | &#x1F47A; | Very Low | Low | Fast | Quick and evasive, throws rocks |
| Ghost | &#x1F47B; | Medium | Medium | Medium | Phases through walls periodically |
| Demon | &#x1F47F; | High | High | Medium | Tanky bruiser with AoE attacks |
| Vampire | &#x1F9DB; | Medium | High | Fast | Lifestealing attacks |
| Spider | &#x1F577; | Low | Medium | Fast | Poisons on hit, swarm behavior |
| Necromancer | &#x1F9D9; | Medium | High | Slow | Summons minions, ranged magic |
| Knight | &#x2694; | Very High | High | Slow | Heavily armored, blocks attacks |
| Dragon | &#x1F432; | Boss | Very High | Medium | Fire breath, tail sweep, flight |

### Enemy Behaviors

**AI State Machine**:
1. **Idle**: Enemy wanders randomly within their room
2. **Chase**: Detected player, moving toward them
3. **Attack**: Within attack range, executing attack pattern
4. **Stagger**: Hit by a strong attack, temporarily stunned
5. **Stunned**: CC'd, cannot act for duration
6. **Scared**: Low health, fleeing from player
7. **Fleeing**: Running away when outmatched

**Pack Tactics**: Enemies near allies gain +10% damage per nearby friend.

**Aggro Leash**: Enemies return to their room if pulled too far (10 tiles).

**Elite Enemies**: 15% chance per room (except easy rooms) to spawn an elite with:
- 2x HP
- 1.5x damage
- Visual glow indicator
- Better loot drops

**Boss Encounters**: The safespace room contains a boss-tier encounter with:
- 15-25 enemies
- Possible boss enemy with summon abilities
- Enrage at 30% HP
- Guaranteed legendary loot

---

## Map Generation

### Overview

The dungeon generator creates an 80x80 tile grid with procedurally placed rooms
connected by corridors. Each run produces a unique layout.

### Generation Pipeline

1. **Initialize**: Fill grid with wall tiles
2. **Place Rooms**: Attempt to place 12 rooms with random size (6-14 tiles)
3. **Connect Rooms**: Link adjacent rooms with corridors, add extra random connections
4. **Assign Types**: Each room gets a type based on size and random roll
5. **Place Safespace**: Farthest room from spawn becomes the goal
6. **Secret Rooms**: 1-2 rooms get hidden secret wall entrances
7. **Calculate Difficulty**: Each room rated 0.0-1.0 based on distance from spawn
8. **Place Features**: Torches, items, food, lore, destructibles, traps, chests, doors
9. **Place Special**: Fountains, altars, decorations, hazard zones
10. **Place Ambient**: Particles, water pools, themed items
11. **Generate Routes**: Patrol paths for enemies
12. **Place Buildings**: Enterable buildings for sidescroller mode
13. **Setup Spawns**: Enemy spawn points with difficulty-based counts

### Room Types

| Type | Size | Features |
|------|------|----------|
| Spawn | First room | Player start, no enemies |
| Normal | Any | Standard enemies and loot |
| Arena | Large | High enemy count, hard difficulty |
| Treasury | Any | Enhanced loot, more chests, gold items |
| Cathedral | Large | Atmospheric, mist particles, altars |
| Shrine | Small | Healing fountains, buff altars, no traps |
| Armory | Any | Damage and shield themed items |
| Library | Any | XP multiplier items |
| Lab | Any | Rage potions, speed boosts, poison hazards |
| Graveyard | Any | Tombstones, bone decorations, health orbs |
| Prison | Small | Confined spaces, no buildings |
| Closet | Small | Tiny rooms with limited loot |

### Tile Types

| ID | Type | Description |
|----|------|-------------|
| 0 | Empty | Void space |
| 1 | Floor | Walkable ground |
| 2 | Wall | Solid wall with shadows |
| 3 | Safespace | Goal area (green glow) |
| 4 | Water | Slowing terrain |
| 5 | Spike Trap | Deals 15 damage on trigger |
| 6 | Poison Trap | 5 damage/sec for 5 seconds |
| 7 | Secret Wall | Breakable wall hiding a secret room |
| 8 | Door | Openable door between areas |
| 9 | Building Entry | Entrance to sidescroller building |

---

## Item System

### Item Types

**Currency**:
- Gold Coin - base gold value
- Gold Bar - 5x gold value
- Gold Cube - 25x gold value

**Consumables**:
- Health Potion - restores HP
- Ammo Small - restores some ammo

**Artifacts** (rarity tiers):
- Artifact Ring - common artifact
- Artifact Vase - uncommon artifact

**Buff Pickups**:
- Speed Boost - temporary movement speed increase
- Damage Boost - temporary damage increase
- Shield Orb - grants temporary shield
- Rage Potion - fills rage meter
- Health Orb - small instant heal

**Multipliers**:
- Gold Multiplier - increases gold gain for a duration
- XP Multiplier - increases XP gain for a duration

### Rarity System

Items and chests follow a rarity tier:

| Rarity | Color | Drop Weight | Bonus |
|--------|-------|-------------|-------|
| Common | Gray | 50% | 1x |
| Uncommon | Green | 30% | 2x |
| Rare | Blue | 15% | 3x |
| Epic | Purple | 4% | 5x |
| Legendary | Gold | 1% | 10x |

### Item Behaviors

- **Bobbing Animation**: Items float up and down while on the ground
- **Rarity Glow**: Higher rarity items emit colored light
- **Magnetic Pull**: Items within pickup range are pulled toward the player
- **Magnet Scaling**: Pickup range increases with player level
- **Spin Animation**: Items rotate slowly on the ground
- **Auto-Pickup**: Most items are collected automatically on proximity

---

## Lore System

### Overview

GraveGain features a deep lore system with 60+ collectible entries spread across
14 categories. Lore items are found throughout the dungeon as books, scrolls, signs,
gravestones, notes, tablets, journals, letters, and crystals.

### Lore Categories

1. **World History**: The planet, its history, and the NecroGenesis event
2. **Human Kingdoms**: Human civilization, politics, and military
3. **Elven Domains**: Elven culture, magic, and the BrightEyes
4. **Dwarven Holds**: Dwarven engineering, mining, and traditions
5. **Orc Clans**: Orc society, warfare, and regeneration
6. **Goblin Warrens**: Goblin culture, inventions, and chaos
7. **NecroGenesis**: The event that raised the dead
8. **Lucifer Hades**: The villain's origins and motivations
9. **The Gods**: Divine beings and their involvement
10. **The Undead**: Types of undead and their behaviors
11. **SafeSpaces**: Ley line nodes that resist necromancy
12. **Personal Stories**: Individual character narratives
13. **Weapons & Artifacts**: Legendary items and their history
14. **Humor**: Light-hearted entries and easter eggs

### Lore Placement

Lore items are placed in:
- **Rooms**: 65% chance per room, bonus in large rooms
- **Corridors**: 25% chance at corridor midpoints
- **Gravestones**: 30% chance in room corners
- **Rare Spawns**: 20% chance for rare/legendary lore in random rooms

### Text-to-Speech

The lore system supports text-to-speech narration through:
- **OpenAI TTS API**: High-quality voice synthesis
- **ElevenLabs API**: Alternative voice provider
- **MP3 Caching**: Generated audio is cached locally at `user://tts_cache/`
- **API Key Storage**: Keys stored securely in `user://api_keys.cfg`

Configure API keys through the Lore Collection UI (I/Tab key) settings panel.

### Collection Tracking

- Progress is saved to `user://lore_collection.save`
- Weighted spawn system favors unread entries (3:1 ratio)
- Collection UI shows progress bars per category
- "NEW LORE" notification appears for undiscovered entries

---

## Vertical Dungeon System

### Overview

The vertical dungeon system adds 2.5D multi-floor exploration with climbing mechanics, gravity-based jumping, and depth-based rendering. Players navigate multiple stacked floors using stairs, ladders, ramps, and elevators.

### Features

- **Multiple Floors**: Up to 5 floors per dungeon with independent room layouts
- **Climbing Mechanics**: 
  - Stairs: Fast, wide climbing (120 speed, 64px width)
  - Ladders: Vertical climbing (100 speed, 32px width)
  - Ramps: Diagonal climbing (150 speed, 96px width)
  - Elevators: Automatic ascent (200 speed, 80px width)
- **Gravity System**: 
  - Gravity: 800 units/sec²
  - Jump Force: 400 units
  - Max Fall Speed: 600 units/sec
- **Vertical Camera**: Isometric-style camera with depth-based alpha blending
- **Floor Visibility**: Shows current floor at 100% alpha, adjacent at 80%, 2 floors away at 50%
- **Depth Rendering**: Visual separation between floors with offset scaling

### Controls

| Action | Key | Description |
|--------|-----|-------------|
| Jump | Space | Jump to reach platforms |
| Climb Up | W/Up Arrow | Ascend climbable objects |
| Climb Down | S/Down Arrow | Descend climbable objects |
| Exit Climb | E | Leave climbing state |

---

## Dialogue and Voice System

### Overview

A comprehensive dialogue system with ElevenLabs voice synthesis, speech bubbles, and AI-powered dialogue generation. Characters speak during combat, exploration, and hub interactions.

### Features

- **ElevenLabs Integration**: Professional voice synthesis with 5 character voice profiles
- **Speech Bubbles**: Animated text bubbles with pointers above speakers
- **Voice Caching**: MP3 audio caching to reduce API calls
- **AI Dialogue Generation**: 
  - GPT-4o-mini for dynamic, contextual dialogue
  - Rules-based fallback with 100+ pre-written lines
- **Character Personalities**:
  - Player: Confident, tactical, determined
  - Goblin: Chaotic, aggressive, excited
  - Orc: Powerful, commanding, brutal
  - Skeleton: Mechanical, undead, calculated
  - Boss: Menacing, powerful, dramatic

### Dialogue Triggers

**Combat**:
- Player attacks: "Take this!", "Hyah!", "Got you!"
- Player damage: "Ugh!", "That hurt!", "Not good!"
- Player kills: "Victory!", "One down!", "Excellent!"
- Enemy alerts: "Intruder!", "Attack!", "Get 'em!"

**Exploration**:
- General: "What's this?", "Interesting...", "Stay alert."
- Item discovery: "Found [item]!", "What's this? A [item]!"
- Secrets: "A secret passage!", "What's hidden here?"
- Level up: "I'm getting stronger!", "I feel more powerful!"

**Enemy Overhearing**:
- Unalerted enemies converse within 300px range
- Conversations trigger every 5 seconds
- Player can learn enemy tactics by listening

---

## Starship Skill Systems

### Overview

Between missions on the "LuckyStarShip-420", players earn $UUSD (Universal United States Dollars) through skill-based activities. Skills include Item Repair and Botany, with expandable personal quarters.

### Currency System

- **$UUSD**: Real-money currency earned through skills
- **Gold**: In-game currency for equipment
- **Exchange Rates**: 1 Gold = 10 $UUSD, 1 $UUSD = 0.1 Gold
- **Starting Balance**: 100 $UUSD
- **Persistent Storage**: Saves to `user://currency.save`

### Item Repair Skill

**Mechanics**:
- Click and drag mini-game interactions
- Skill levels 1-∞ with XP progression
- Durability restoration: 50-75% based on skill level

**Costs by Rarity**:
| Rarity | Cost | Time | Materials |
|--------|------|------|-----------|
| Common | 5 $UUSD | 5s | Bolts, screws, wires |
| Uncommon | 15 $UUSD | 8s | Springs, gears, circuits |
| Rare | 40 $UUSD | 12s | Crystals, alloys, cores |
| Epic | 100 $UUSD | 18s | Essences, matrices, nexuses |
| Legendary | 250 $UUSD | 25s | Void shards, star dust, infinity stones |

### Botany Skill

**Plant Types** (9 varieties):

| Plant | Space | Time | Yield | Value |
|-------|-------|------|-------|-------|
| Cannabis Sativa | 15 | 120s | 3 | 50 $UUSD |
| Cannabis Indica | 12 | 100s | 4 | 45 $UUSD |
| Cannabis Hybrid | 14 | 110s | 3 | 55 $UUSD |
| Magic Mushroom | 8 | 80s | 2 | 75 $UUSD |
| Tomato | 6 | 60s | 5 | 10 $UUSD |
| Lettuce | 4 | 45s | 6 | 8 $UUSD |
| Basil | 3 | 40s | 4 | 12 $UUSD |
| Oak Tree | 30 | 300s | 10 | 200 $UUSD |
| Apple Tree | 25 | 250s | 8 | 150 $UUSD |

**Features**:
- Space is a prized resource (limited by room level)
- Real-time growth (continues between sessions)
- Harvest yields scale with skill level
- Persistent plant storage

### Personal Quarters

**Room Levels** (1-5):

| Level | Size | Cost | Space |
|-------|------|------|-------|
| 1 | 400×300 | - | 100 |
| 2 | 600×400 | 50 $UUSD | 150 |
| 3 | 800×500 | 150 $UUSD | 200 |
| 4 | 1000×600 | 400 $UUSD | 250 |
| 5 | 1200×700 | 1000 $UUSD | 300 |
| 6 | 1400×800 | 2500 $UUSD | 350 |

**Stations**:
- 🌱 Botany Station: Plant seeds and manage crops
- 🔧 Repair Station: Repair damaged items
- 🛏️ Bed: Rest and recovery

---

## Quality of Life Features

### UI Enhancements

- **Tooltip System**: Hover over UI elements for helpful descriptions
- **Floating Numbers**: Damage, healing, XP, and gold with color coding
- **Enemy Health Bars**: Display health above enemies during combat
- **Status Effect Indicators**: Visual indicators for active buffs/debuffs
- **Combo Indicators**: Display combo counter with visual feedback
- **Damage Direction Indicator**: Arrow showing direction of incoming damage

### Audio Feedback

- **UI Sound Effects**: Subtle sounds for menu interactions
- **Combat Audio**: Enhanced feedback for combat actions
- **Ambient Sound System**: Background music and environmental audio
- **Volume Controls**: Separate sliders for UI, combat, and ambient

### Accessibility

- **Colorblind Modes**: Deuteranopia, Protanopia, Tritanopia support
- **Text Scaling**: Adjust UI text size for readability
- **UI Opacity Control**: Adjust transparency of UI elements
- **Animation Speed Control**: Adjust speed of all animations
- **Reduced Motion Mode**: Minimize animations and screen effects
- **High Contrast Mode**: Increase contrast for better visibility

### Settings Persistence

All QoL settings save to `user://qol_settings.cfg` and persist between sessions.

---

## Advanced Enemy AI

### Tactical Formations

Enemies form intelligent formations to surround and outmaneuver the player:

- **Line Formation**: Enemies spread horizontally
- **Wedge Formation**: Pointed formation for focused attacks
- **Circle Formation**: Surround the player
- **Scattered Formation**: Unpredictable positioning

### Tactical Behaviors

- **Flanking Tactics**: Calculate optimal flanking positions
- **Coordinated Attacks**: Multiple enemies synchronize attack timing
- **Intelligent Retreat**: Retreat when heavily outnumbered or low health
- **Defensive Positioning**: Position behind allies for protection
- **Target Priority**: Prioritize targets by threat level and isolation

### AI Features

- **Formation Center Calculation**: Dynamic positioning based on group center
- **Ally Awareness**: Enemies consider nearby allies in decision-making
- **Tactical Positioning**: Enemies position strategically, not randomly
- **Retreat Thresholds**: Retreat when HP drops below 20% (adjusted by ally count)

---

## Visual Effects

### Blood and Gore System

The VFX manager handles all visual effects through a custom draw system:

- **Blood Splats**: Circular marks on the ground that fade over time
- **Blood Particles**: Directional spray from hits
- **Gore Chunks**: Larger pieces that bounce and decay
- **Hit Flashes**: Brief white flash at impact point
- **Attack Trails**: Arc visual following melee swings
- **Impact Rings**: Expanding ring at collision point

### Combat VFX

- **Level Up Burst**: Colorful particle explosion on level up
- **Dodge Afterimage**: Ghost silhouette left behind during dodge
- **Healing Particles**: Green upward-floating particles
- **Elemental Hit Effects**: Color-coded particles per damage type
- **Shield Break Shards**: Blue fragments when shield is depleted
- **Execution Slash**: Red diagonal line on execution kills
- **Charge Glow**: Orange aura during charge attacks
- **Overkill Explosion**: Expanding ring for massive overkill damage
- **Screen Flash**: Full-screen color overlay for dramatic moments

### Ambient Effects

- **Dust Particles**: Subtle floating motes in normal rooms
- **Mist**: Low-lying fog in graveyards and cathedrals
- **Sparkle**: Glittering particles in shrines and treasuries
- **Smoke**: Rising particles in lab rooms
- **Footstep Dust**: Small puffs when walking

### Camera Effects

- **Screen Shake**: Intensity-based rumble on impacts
- **Camera Punch**: Directional kick on heavy hits
- **Camera Lead**: Offset toward player movement direction
- **Zoom Effects**: Dynamic zoom during boss encounters

---

## HUD and UI

### Health Display

The health bar uses a smooth color transition system:
- **100-60%**: Green (#00FF00 to #AAFF00)
- **60-30%**: Yellow to Orange (#AAFF00 to #FF6600)
- **30-0%**: Orange to Red (#FF6600 to #FF0000)

The bar lerps smoothly to avoid jarring jumps.

### Resource Bars

- **Stamina**: Yellow bar below health, flashes at low values
- **Shield**: Blue bar (Human racial)
- **Mana**: Purple bar (Elf racial)
- **Rage**: Red bar (Orc racial)

### Combat Feedback

- **Damage Numbers**: Float upward from enemies, colored by type
  - White: Normal damage
  - Yellow: Critical hit
  - Red: Execution
  - Element color: Elemental damage
- **Hit Markers**: Brief crosshair flash on successful hit
- **Combo Counter**: Growing number with color escalation
- **Kill Streak Banner**: Text announcement for streaks

### Information Panels

- **Gold Display**: Current gold with popup on pickup
- **Ammo Counter**: Current/max ammo
- **Kill Count**: Total enemies killed
- **FPS Counter**: Frames per second (toggleable)
- **Minimap**: Room layout with legend
- **XP Bar**: Progress to next level
- **Score Display**: Current score with multiplier

### Death Screen

On death, a detailed statistics screen shows:
- Enemies killed
- Damage dealt and taken
- Gold earned
- Time survived
- Kill streak record
- Combo record
- Mission rating (S/A/B/C/D)
- Quick restart option

---

## Settings and Configuration

### Audio
| Setting | Default | Range |
|---------|---------|-------|
| Master Volume | 1.0 | 0.0 - 1.0 |
| SFX Volume | 1.0 | 0.0 - 1.0 |
| Music Volume | 0.7 | 0.0 - 1.0 |

### Input
| Setting | Default | Description |
|---------|---------|-------------|
| Mouse Sensitivity | 1.0 | Aim sensitivity |
| Auto-Pickup Range | 40.0 | Item magnet distance |
| Crosshair Style | 0 | Visual crosshair type |

### Camera
| Setting | Default | Description |
|---------|---------|-------------|
| Camera Zoom | 1.5 | View zoom level |
| Camera Smoothing | 12.0 | Follow smoothness |
| Screen Shake | true | Enable screen shake |
| Camera Punch | true | Enable directional kick |
| Camera Lead | true | Offset toward movement |

### Display
| Setting | Default | Description |
|---------|---------|-------------|
| Damage Numbers | true | Show floating damage |
| Show FPS | true | FPS counter |
| Show Minimap | true | Minimap overlay |
| Minimap Zoom | 1.0 | Minimap scale |
| Hit Markers | true | Hit confirmation |
| Vignette | true | Edge darkening |
| Tutorial Hints | true | Help popups |

### Graphics
| Setting | Default | Options |
|---------|---------|---------|
| Quality | High | Low/Medium/High/Ultra |
| Blood | true | Enable blood effects |
| Blood Intensity | Normal | Off/Mild/Normal/Extreme |
| Particles | true | Enable particles |
| Particle Density | High | Low/Medium/High/Ultra |
| Shadows | true | Dynamic shadows |
| Dynamic Lighting | true | Point lights |
| Hit Flash | true | Impact flashes |
| Gore | true | Gore chunks |
| Trails | true | Attack trails |
| Impacts | true | Impact rings |
| Ambient Particles | true | Room particles |
| Hit Pause | true | Freeze frame on hit |

### Emoji
| Setting | Default | Description |
|---------|---------|-------------|
| Emoji Set | system | Font set to use |

Available sets: system, twemoji, noto, openmoji, blobmoji, fluent, joypixels, samsung

For detailed information about emoji fonts, installation, and customization, see the **[Emoji Fonts README](v2/2d2/grave-gain-2d-2/fonts/emoji/README.md)**.

Settings are saved to `user://settings.cfg` and persist between sessions.

---

## Sidescroller Mode

### Overview

Certain rooms contain buildings (houses, caves, fortresses, castles) that can be
entered by pressing E. Inside, the game switches to a sidescroller perspective with
platformer mechanics.

### Building Types

| Type | Emoji | Min Area | Tile Size | Common In |
|------|-------|----------|-----------|-----------|
| House | &#x1F3E0; | 40 | 3 | Normal rooms |
| Cave | &#x1F5FB; | 60 | 4 | Graveyards, medium rooms |
| Fortress | &#x1F3F0; | 80 | 5 | Treasury, armory, cathedrals |
| Castle | &#x1F451; | 100 | 6 | Large rooms, arenas |

### Sidescroller Mechanics

- **Gravity**: Standard platformer gravity with jump physics
- **Wall Jump**: Jump off walls to reach higher platforms
- **Moving Platforms**: Platforms that travel on fixed paths
- **Breakable Walls**: Destructible barriers hiding secrets
- **Spikes**: Hazardous terrain dealing contact damage
- **Parallax**: Multi-layer scrolling background

### Building Interiors

Each building type generates a unique interior layout with:
- Platforms at varying heights
- Enemy spawns appropriate to building type
- Loot and item placement
- Exit door to return to top-down mode

---

## Game Systems

### Achievement System

25+ achievements track player progress across multiple categories:

**Combat Achievements**:
- First Blood: Kill your first enemy
- Century: Kill 100 enemies
- Massacre: Kill 1000 enemies
- On Fire: 5 kill streak
- Unstoppable: 10 kill streak
- Godlike: 25 kill streak
- Combo Master: 10 hit combo
- Combo Legend: 25 hit combo
- Sharpshooter: 100 critical hits
- Shield Wall: 10 perfect blocks
- Untouchable: Dodge 50 times

**Progression Achievements**:
- Getting Rich: Earn 1000 gold
- Moneybags: Earn 100,000 gold
- Seasoned: Reach level 10
- Veteran: Reach level 25
- Legend: Reach max level (50)

**Exploration Achievements**:
- Explorer: Explore 50 rooms
- Lore Seeker: Collect 10 lore entries
- Loremaster: Collect all lore
- Marathon: Travel 10km total

**Boss Achievements**:
- Boss Slayer: Kill a boss enemy
- Boss Hunter: Kill 10 bosses

**Misc Achievements**:
- Survivor: Complete a mission
- Foodie: Eat 25 food items

### Prestige System

After reaching max level (50), players can prestige:
- Reset to level 1
- Gain permanent bonuses per prestige level
- Up to 5 prestige levels
- Bonuses: +5% damage, +10% XP, +10% gold per prestige

### Daily Challenges

Three procedurally generated daily challenges based on the current date:
- Kill X enemies
- Earn X gold
- Deal X damage
- Achieve X kill streak

### Weapon Mastery

Track proficiency with each weapon type:
- Melee, Ranged, Ability mastery tracks
- Mastery levels: 0-6 based on kill thresholds
- +5% damage bonus per mastery level

### Speed Run Timer

Optional speedrun mode with:
- Precision timer
- Split tracking per room
- Personal best recording

### Difficulty System

Four difficulty levels affecting gameplay:

| Difficulty | Enemy HP | Enemy DMG | Enemy Speed | Loot | XP |
|------------|----------|-----------|-------------|------|-----|
| Easy | 0.6x | 0.5x | 0.8x | 1.5x | 0.75x |
| Normal | 1.0x | 1.0x | 1.0x | 1.0x | 1.0x |
| Hard | 1.5x | 1.5x | 1.15x | 0.8x | 1.5x |
| Nightmare | 2.5x | 2.0x | 1.3x | 0.6x | 2.5x |

Difficulty also scales over time (+50% per 5 minutes of mission time).

### Mission Rating

Missions are rated S through D based on:
- Kills (10 points each)
- Time bonus (faster = more points)
- Damage taken (penalty)
- Gold earned (bonus)

---

## 100 Improvements List

The game includes 100 systematically implemented improvements across all systems:

### Player Improvements (1-15)
1. Dash Attack - attack during dodge for bonus damage
2. Momentum Damage - faster movement increases melee damage
3. Adrenaline Rush - low HP boosts attack and movement speed
4. Bloodlust - kills grant temporary attack speed stacks
5. Second Wind - first time dropping below 10% HP, heal burst
6. Charge Attack - hold attack button for powerful strike
7. Sprint Lunge - attack while sprinting for extended range
8. Execution - instant kill enemies below HP threshold
9. Armor Penetration - bypass percentage of enemy defense
10. Headshot Cone - narrow aim angle for bonus critical damage
11. Multi-Cleave - melee attacks hit all enemies in arc
12. Parry Counter - perfect block triggers guaranteed crit
13. Lucky Dodge - 5% chance to auto-dodge incoming damage
14. Rage Burst - AoE damage burst at max rage (Orc)
15. Shield Bash - attack while blocking pushes enemies

### Enemy Improvements (16-30)
16. Telegraph Attacks - visual wind-up before enemy strikes
17. Elemental Damage - enemies deal typed damage (fire, ice, etc.)
18. Aggro Leash - enemies return to room if pulled too far
19. Pack Tactics - nearby allies boost each other's damage
20. Loot Scaling - enemy loot scales with room difficulty
21. Distance Scaling - enemy stats scale with distance from spawn
22. Out-of-Combat Healing - enemies heal when not in combat
23. Ambush/Stealth - some enemies are hidden until approached
24. Room Variety - different enemy compositions per room type
25. Boss Summon - boss enemies can summon minions
26. Elite Enemies - random chance for enhanced elite spawns
27. Flee Behavior - low HP enemies run away
28. Dodge Behavior - enemies can dodge player attacks
29. Attack Wind-up Visual - animation before attack connects
30. Enrage Visual - glow effect when boss enters enrage

### VFX Improvements (31-45)
31. Level Up Burst - colorful particle explosion on level up
32. Crit Slow-Mo Flash - brief time dilation on critical hits
33. Dodge Afterimage - ghost trail during dodge roll
34. Elemental Hit Colors - typed damage shows colored particles
35. Overkill Explosion - massive VFX for huge overkill damage
36. Healing Particles - green particles when healing
37. Shield Break Effect - blue shards when shield depletes
38. Execution Slash - red line effect on execution kill
39. Charge Glow - orange aura during charge buildup
40. Ambient Dust - floating particles in all rooms
41. Screen Flash - full screen color overlay for events
42. Blood System - dynamic blood splats and particles
43. Gore System - chunk physics with gravity and bounce
44. Impact Rings - expanding circles at collision points
45. Attack Trails - arc visuals following weapon swings

### HUD Improvements (46-55)
46. HP Bar Color Transition - green to red based on percentage
47. Stamina Flash Warning - bar flashes when low
48. Buff/Debuff Icons - active effect display with timers
49. DPS Meter - real-time damage output tracking
50. Gold Popup - floating number on gold pickup
51. Death Screen - detailed stats on player death
52. Streak Announcements - text banner for kill streaks
53. Bloodlust Display - stack count indicator
54. Charge Bar - progress indicator during charge attack
55. Minimap Legend - room type indicators on minimap

### Item Improvements (56-65)
56. Rarity Glow - colored light based on item rarity
57. Magnet Scaling - pickup range grows with player level
58. Spin Animation - items rotate on the ground
59. Speed Boost - temporary movement speed pickup
60. Damage Boost - temporary damage increase pickup
61. Shield Pickup - grants temporary shield HP
62. Rage Potion - fills rage meter instantly
63. Health Orbs - small heal from enemy kills
64. Gold Multiplier - increased gold gain duration
65. XP Multiplier - increased XP gain duration

### Game Integration (66-75)
66. Ambient Dust Spawning - dust near player position
67. Camera Lead - camera offset toward movement direction
68. Input Buffering - queue attacks and dodges during cooldowns
69. Quick Restart - instant restart after death
70. Distance Scaling Integration - enemy stat scaling in game loop
71. Loot Explosion - multiple drops on enemy death
72. Summon Handling - process boss summon requests
73. DPS Tracking - accumulate and display damage per second
74. Gold Popup Integration - show gold amounts in HUD
75. Death Screen Stats - comprehensive death statistics

### Map Generation (76-85)
76. Fountain Rooms - healing zones with limited uses
77. Altar Rooms - buff shrines granting temporary powers
78. Room Decorations - pillars, statues, candles, skulls, webs
79. Corridor Ambushes - surprise enemy spawns in corridors
80. Dead-End Treasures - bonus chests at corridor dead ends
81. Environmental Hazards - fire, poison, lightning, ice zones
82. Difficulty Scaling - room difficulty rating by distance
83. Themed Items - room-type-specific item placement
84. Secret Room Indicators - visual hints for hidden rooms
85. Room Sub-Types - enhanced room type variety

### System Improvements (86-100)
86. Auto-Save System - periodic save every 60 seconds
87. Death Recap - last 10 damage sources before death
88. Mission Time Bonus - score bonus for fast completion
89. Damage Resistance Scaling - defense grows with level
90. Critical Damage Scaling - crit multiplier grows with level
91. Gold Interest - earn interest on held gold
92. Prestige System - reset with permanent bonuses
93. Daily Challenges - procedural daily objectives
94. Weapon Mastery - proficiency tracking per weapon type
95. Environmental Kill Tracking - stats for trap/hazard kills
96. Speed Run Timer - precision timer with splits
97. Damage Type Resistance - elemental resistance system
98. Healing Efficiency - healing scales with level
99. Revival Tokens - limited extra lives
100. Difficulty Over Time - mission gets harder as time passes

---

## World Lore

### The NecroGenesis

On Day 7 at 3:47 AM, the event known as the NecroGenesis swept across the world.
Every dead body - from freshly buried to ancient skeletons - rose simultaneously.
The cause was traced to Lucifer Hades, a scientist who had been awake for 200 years
aboard the colony ship that brought humanity to this world.

### Lucifer Hades

Born aboard the colony ship, Lucifer Hades was a brilliant but disturbed individual
who spent 200 years in solitary consciousness while the rest of the colonists slept
in cryogenic stasis. During this time, he studied ancient texts and discovered the
secret to manipulating the boundary between life and death. Upon arrival at the new
world, he spent decades preparing the NecroGenesis ritual.

### The Races

**Humans**: The most numerous race, humans built kingdoms and cities across the land.
Their shield technology is unmatched, providing reliable defense against the undead.

**Elves (BrightEyes)**: The Elves developed a deep connection to the ley lines that
crisscross the planet. Their BrightEyes ability lets them perceive magical energy,
making them natural mage-warriors. They were the first to identify the NecroGenesis
as artificial rather than natural.

**Dwarves**: Master engineers and miners, the Dwarves built underground holds that
proved surprisingly resistant to the NecroGenesis. Their stonework creates natural
barriers against necromantic energy. A Dwarf Paladin's body cannot be raised as undead.

**Orcs**: The most physically powerful race, Orcs have a natural regeneration ability
that they must carefully control. Uncontrolled regeneration led to the practice of
consuming their dead to prevent wild regrowth. Their rage in battle is legendary.

**Goblins**: Small, chaotic, and inventive, Goblins adapted to the NecroGenesis faster
than any other race. They treat it as just another problem to solve with explosives
and cleverness. They throw rocks at everything as a reflex.

### SafeSpaces

SafeSpaces are locations where ley line energy is concentrated enough to repel
necromantic influence. The dead cannot rise within a SafeSpace, and the undead
cannot enter them. They serve as humanity's last bastions of safety.

### KillCredits

The economy collapsed after the NecroGenesis. The new currency, KillCredits, is
earned through confirmed combat kills against the undead. It replaced gold as the
standard unit of value, though old gold coins still hold some worth.

---

## Design Document

The full design document is maintained externally:

https://docs.google.com/document/d/1Gw1c8GwMPhMuzLG4w3VpiBLMEKevbbI2G7Vwtlc2c3A/edit?usp=sharing

This document contains:
- Complete game design specification
- Art direction and visual style guide
- Audio design notes
- Level design principles
- Narrative outline
- Technical architecture
- Playtesting feedback

---

## Technical Details

### Engine and Framework

- **Engine**: Godot 4.6
- **Language**: GDScript
- **Rendering**: 2D with CanvasModulate for ambient lighting
- **Physics**: Godot built-in physics with custom collision layers

### Physics Layers

| Layer | Bit | Usage |
|-------|-----|-------|
| 1 | 1 | Player character |
| 2 | 2 | Enemy characters |
| 3 | 4 | Walls and obstacles |
| 4 | 8 | Items and pickups |
| 5 | 16 | Projectiles |

### Autoload Singletons

| Name | Script | Purpose |
|------|--------|---------|
| GameData | autoload/game_data.gd | Race/class/enemy/item definitions, light textures |
| GameSystems | systems/game_systems.gd | XP, combos, achievements, settings, stats |
| LoreManager | lore/lore_manager.gd | Lore collection tracking, save/load |
| EmojiManager | autoload/emoji_manager.gd | Emoji font set management |

### Performance Considerations

- Blood splats capped at 200
- Particles capped at 300
- Gore chunks capped at 50
- Ambient particles capped at 100
- Enemy retargeting on 0.5s timer (not every frame)
- Fountain/hazard checks on 0.5s timer
- Building proximity check on 0.1s timer
- Item magnet check uses distance squared

### Save Data Locations

| File | Path | Content |
|------|------|---------|
| Settings | user://settings.cfg | All game settings |
| Stats | user://game_systems.save | Statistics, achievements, high scores |
| Lore | user://lore_collection.save | Collected lore entries |
| API Keys | user://api_keys.cfg | TTS API keys |
| TTS Cache | user://tts_cache/ | Generated audio files |

---

## Contributing

### Code Style

- Use GDScript type hints wherever possible
- Use snake_case for variables and functions
- Use PascalCase for class names and constants
- Prefer explicit types over inference for clarity
- Add section comments with `# ===== SECTION NAME =====`
- Use Dictionary metadata for runtime object data
- Prefer signals over direct references between systems

### Adding New Enemies

1. Add enemy type to `GameData.EnemyType` enum
2. Add stats to `GameData.enemy_defs` dictionary
3. Add behavior logic to `enemy.gd` state machine
4. Add visual (emoji) to enemy initialization
5. Add to spawn tables in `map_generator.gd`

### Adding New Items

1. Add item definition to `GameData.item_defs` or relevant dictionary
2. Add pickup logic to `item.gd` `pickup()` function
3. Add spawn logic to `map_generator.gd` placement functions
4. Add visual (emoji + glow) to item initialization
5. Add HUD feedback if applicable

### Adding New Lore

1. Add entry to `lore_entries_1.gd` or `lore_entries_2.gd`
2. Include: id, title, text, category, type, rarity
3. LoreManager will automatically include it in spawn rotation
4. Weighted system will favor new entries for existing players

### Adding New Achievements

1. Add to `_init_achievements()` in `game_systems.gd`
2. Include: id, title, description, icon emoji, condition string
3. Condition format: `"stat_key >= value"`
4. Achievement system auto-checks on stat updates

---

## Building and Exporting

### Desktop Export

1. Open project in Godot 4.6
2. Go to Project > Export
3. Add export preset for target platform
4. Configure export settings
5. Click "Export Project"

### Web Export

1. Install Godot Web export template
2. Add HTML5 export preset
3. Configure CORS and SharedArrayBuffer settings
4. Export to HTML5

### Mobile Export

1. Install Android SDK or Xcode
2. Add mobile export preset
3. Configure touch controls (auto-detected)
4. Build and deploy

---

## Troubleshooting

### Common Issues

**Game won't start**:
- Ensure Godot 4.6 is installed
- Check that project.godot is not corrupted
- Verify all script files are present

**No emoji rendering**:
- System emoji font should work by default
- Try installing Twemoji or Noto Color Emoji
- Check fonts/emoji/ folder for .ttf files

**Performance issues**:
- Lower graphics quality in settings
- Disable shadows and dynamic lighting
- Reduce particle density
- Disable blood/gore effects

**Crashes on map generation**:
- This can happen with very large room counts
- Default settings (12 rooms) should work fine
- Check console for specific error messages

**No TTS audio**:
- Verify API keys in Lore Collection settings
- Check internet connection
- Check user://tts_cache/ for cached files

---

## Changelog

### Current Version

- 100 gameplay improvements implemented
- Procedural dungeon generation with 12+ room types
- 4 playable races with unique abilities
- 10+ enemy types with AI state machines
- Full lore system with 60+ entries and TTS
- Achievement system with 25+ achievements
- Prestige system with 5 levels
- Daily challenge system
- Weapon mastery tracking
- Speed run timer
- Sidescroller building interiors
- 8 emoji font set options
- Comprehensive settings system
- Mobile touch control support

---

## Credits

- **Game Design**: Matt
- **Programming**: Matt + Cascade AI
- **Engine**: Godot 4.6 (https://godotengine.org)
- **Emoji Graphics**: Various emoji font providers
- **Design Document**: https://docs.google.com/document/d/1Gw1c8GwMPhMuzLG4w3VpiBLMEKevbbI2G7Vwtlc2c3A/edit?usp=sharing

---

## Related Projects

| Project | Description | Link |
|---|---|---|
| **CryptArtist Studio** | Open creative suite with 11 programs (GameStudio used for development) | [GitHub](https://github.com/mattyjacks/CryptArtistStudio) |
| **GiveGigs** | Global work collective - hire artists and playtesters | [Website](https://givegigs.com) |
| **VCA** | Video Content Automation for trailers and social media | [GitHub](https://github.com/mattyjacks/VCA) |
| **mattyjacks.com** | Developer website and portfolio | [Website](https://mattyjacks.com) |
| **WebsiteBlog** | Blog with GraveGain devlogs | [GitHub](https://github.com/mattyjacks/websiteBlog) |

---

## License

GraveGain is a personal project. All rights reserved.

Emoji fonts used in the game are subject to their respective licenses:
- Twemoji: CC BY 4.0 / Apache 2.0
- Noto Color Emoji: Apache 2.0
- OpenMoji: CC BY-SA 4.0
- Blobmoji: Apache 2.0
- Fluent Emoji: MIT
- JoyPixels: Free License
- Samsung Emoji: Proprietary

---

*GraveGain - Where the dead rise, and the brave profit.*