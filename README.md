# Alien Invasion Pinball

A browser-based pinball game with an 8-bit pixel art style and synthwave aesthetics, where players defend Earth from an alien invasion.

## Project Overview

This game uses a simple tech stack:
- HTML5 Canvas for rendering
- Matter.js for physics
- Vanilla JavaScript for game logic
- Web Audio API for sound (to be implemented)

## Phase 1 Progress: Planning & Design

### Game Concept
- Theme: Defend Earth from alien invasion through pinball gameplay
- Style: 8-bit pixel art with synthwave color palette (purples, pinks, cyans)
- Core mechanics: Standard pinball controls with thematic elements

### Technical Implementation
- Basic project structure created
- HTML canvas setup complete
- Matter.js physics engine integrated
- Basic game loop implemented
- Placeholder pinball elements (walls, ball) created

### Visual Style
- Synthwave color palette defined in CSS:
  - Primary Dark: #120458
  - Primary Purple: #7b2cbf
  - Primary Pink: #e83283
  - Primary Cyan: #43dde6
  - Primary Blue: #0a81d1

## Phase 2: Asset Generation

Phase 2 focuses on generating the visual and audio assets for the game using AI tools. The following resources have been prepared:

### Asset Generation Guides
- `assets/asset-generation-guide.txt` - Detailed prompts for generating visual assets
- `assets/sounds/sound-design-guide.txt` - Detailed prompts for generating audio assets

### Asset Tracking
- `assets/images/README.md` - List of required visual assets
- `assets/sounds/README.md` - List of required audio assets

### Asset Generation Script
A helper script has been created to streamline the asset generation process:
```
node generate-assets.js
```

This script displays all the required assets with their descriptions, sizes/durations, and AI prompts. It also tracks the progress of asset generation.

### Required Assets
- **Visual**: Background, flippers, ball, alien enemies, bumpers, targets, ramps, mothership, UI elements
- **Audio**: Background music, sound effects for game actions, special events sounds

## Next Steps (Phase 3)
- Implement proper pinball table layout with generated assets
- Add flipper physics and controls
- Integrate alien-themed obstacles and targets
- Implement scoring system
- Add sound effects and background music

## How to Run
Open `index.html` in a web browser to see the current progress.
# experimentPinball1
