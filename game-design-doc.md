# Alien Invasion Pinball - Game Design Document

## Core Concept
A retro-styled pinball game with an alien invasion theme, where players defend Earth by hitting alien targets, activating special features, and achieving high scores.

## Game Mechanics

### Basic Pinball Mechanics
- **Flippers**: Two flippers at the bottom of the table controlled by left/right arrow keys
- **Plunger**: Space bar launches the ball with variable force
- **Tilt**: Shift key provides limited tilt functionality to nudge the ball
- **Drain**: Ball is lost when it falls past the flippers
- **Lives**: Player starts with 3 balls/lives

### Alien Invasion Theme Elements

#### Targets & Obstacles
1. **Alien Scouts** (Bumpers)
   - Small UFO-shaped bumpers that bounce the ball
   - Each hit awards 100 points
   - After 5 hits, they change color and award 200 points

2. **Alien Fighters** (Drop Targets)
   - Row of 5 small alien-shaped targets
   - Each hit awards 500 points
   - Clearing all 5 activates "Fighter Bonus" (2x scoring for 20 seconds)

3. **Asteroid Field** (Rollover Lanes)
   - 3 lanes at the top of the table
   - Ball rolling through awards 300 points
   - Lighting all 3 activates "Asteroid Shield" (ball saver for 30 seconds)

4. **Alien Mothership** (Special Target)
   - Large target at the top center of the table
   - Difficult to hit, requires precise aim
   - Hitting it awards 2000 points
   - After 3 hits, activates "Multiball" mode

5. **Defense Ramps** (Ramps)
   - Two ramps on either side of the table
   - Successfully shooting up a ramp awards 750 points
   - Hitting both ramps in sequence activates "Earth Defense System" (bonus multiplier)

#### Special Modes

1. **Multiball Mode**
   - Activated after hitting the Mothership 3 times
   - Releases 2 additional balls into play
   - All scoring doubled during multiball
   - Lasts until only one ball remains

2. **Invasion Alert**
   - Random event that occurs during gameplay
   - All aliens flash and award double points for 15 seconds
   - Accompanied by alarm sound effect

3. **Final Stand**
   - Activated when player reaches 50,000 points
   - All targets award triple points
   - More challenging ball physics (faster movement)
   - Lasts for one ball

## Scoring System

### Basic Scoring
- Flipper hit: 10 points
- Wall hit: 5 points
- Alien Scout (Bumper) hit: 100-200 points
- Alien Fighter (Drop Target) hit: 500 points
- Asteroid Field (Rollover) pass: 300 points
- Defense Ramp completion: 750 points
- Mothership hit: 2000 points

### Combo Scoring
- Hitting multiple targets without flipper contact: x1.5 multiplier
- Hitting same target type in sequence: Points increase by 100 each hit
- Completing a "Defense Pattern" (predefined sequence of hits): 5000 points

### Bonus Scoring
- End of ball bonus based on:
  - Number of aliens defeated
  - Number of special modes activated
  - Time ball was in play
- Skill Shot: 1000 points for hitting a specific target on initial ball launch

## Progression System
- Level 1: Basic alien scouts and fighters
- Level 2: Unlocked at 25,000 points - Adds asteroid field and more aggressive aliens
- Level 3: Unlocked at 75,000 points - Adds mothership and full invasion force

## Audio Design Notes
- Retro 8-bit sound effects
- Synthwave background music that intensifies during special modes
- Unique sounds for each type of alien/target
- Alert sounds for special events and mode activations

## Visual Feedback
- Aliens flash when hit
- Mothership shows damage states
- Earth (at top of screen) shows defense status
- Synthwave grid background pulses with the music
- Score multipliers shown with color-coded text effects
