/**
 * Alien Invasion Pinball - Asset Generation Script
 * 
 * This script provides a structured approach to generating game assets using AI tools.
 * It includes prompts for both visual and audio assets, and instructions for processing
 * the generated assets.
 * 
 * Usage:
 * 1. Run this script to see the prompts for each asset
 * 2. Use the prompts with AI generation tools
 * 3. Save the generated assets to the appropriate directories
 * 4. Update the asset tracking in this script
 */

// Configuration
const config = {
  visualAssetDir: './assets/images/',
  audioAssetDir: './assets/sounds/',
  visualAssetGuide: './assets/asset-generation-guide.txt',
  audioAssetGuide: './assets/sounds/sound-design-guide.txt'
};

// Visual asset definitions with prompts from the asset generation guide
const visualAssets = [
  {
    name: 'background.png',
    description: 'Pinball table background',
    prompt: '8-bit pixel art pinball table background with space theme, synthwave colors (purple, pink, cyan), stars, and a distant Earth visible at the top. Dark background with grid lines in synthwave style.',
    size: '800x1000',
    status: 'pending'
  },
  {
    name: 'flipper_left.png',
    description: 'Left flipper sprite sheet',
    prompt: '8-bit pixel art pinball flippers, synthwave cyan color (#43dde6), simple triangular shape, on transparent background, sprite sheet showing different rotation angles.',
    size: '32x32 per frame',
    status: 'pending'
  },
  {
    name: 'flipper_right.png',
    description: 'Right flipper sprite sheet',
    prompt: '8-bit pixel art pinball flippers, synthwave cyan color (#43dde6), simple triangular shape, on transparent background, sprite sheet showing different rotation angles.',
    size: '32x32 per frame',
    status: 'pending'
  },
  {
    name: 'ball.png',
    description: 'Pinball ball',
    prompt: '8-bit pixel art pinball ball, glowing cyan color (#43dde6), small circular shape with slight shine effect, on transparent background.',
    size: '16x16',
    status: 'pending'
  },
  {
    name: 'alien_scouts.png',
    description: 'Alien scout bumpers',
    prompt: '8-bit pixel art pinball bumpers shaped like small UFOs, synthwave purple color (#7b2cbf) with pink (#e83283) highlights, on transparent background.',
    size: '32x32 per bumper',
    status: 'pending'
  },
  {
    name: 'alien_fighters.png',
    description: 'Alien fighter drop targets',
    prompt: '8-bit pixel art space invader style alien sprites in synthwave colors (pink #e83283, purple #7b2cbf), 4 different alien designs, on transparent background, sprite sheet showing each alien in 2 animation frames.',
    size: '32x32 per alien',
    status: 'pending'
  },
  {
    name: 'asteroids.png',
    description: 'Asteroid field rollover lanes',
    prompt: '8-bit pixel art pinball targets shaped like planets or asteroids, synthwave colors (mix of purple, pink, cyan), on transparent background, sprite sheet showing inactive and hit states.',
    size: '32x32 per asteroid',
    status: 'pending'
  },
  {
    name: 'mothership.png',
    description: 'Alien mothership (multiball trigger)',
    prompt: '8-bit pixel art large alien mothership in synthwave colors (primarily purple #7b2cbf with pink #e83283 and cyan #43dde6 highlights), on transparent background, sprite sheet showing inactive, activating, and activated states.',
    size: '64x64',
    status: 'pending'
  },
  {
    name: 'ramps.png',
    description: 'Defense ramps',
    prompt: '8-bit pixel art pinball ramps in synthwave style, glowing pink color (#e83283), simple angular design, on transparent background.',
    size: '64x32 per ramp',
    status: 'pending'
  },
  {
    name: 'logo.png',
    description: 'Game logo',
    prompt: '8-bit pixel art logo for "Alien Invasion Pinball" in synthwave style, text with glow effect, purple to pink gradient, grid background, retro sci-fi aesthetic.',
    size: '400x100',
    status: 'pending'
  },
  {
    name: 'score_digits.png',
    description: 'Score display digits',
    prompt: '8-bit pixel art numbers 0-9 in synthwave cyan color (#43dde6) with glow effect, on transparent background, sprite sheet layout.',
    size: '16x16 per digit',
    status: 'pending'
  },
  {
    name: 'life_icon.png',
    description: 'Earth icon for life counter',
    prompt: '8-bit pixel art Earth icon, small blue and green planet with synthwave style, on transparent background.',
    size: '16x16',
    status: 'pending'
  },
  {
    name: 'game_over.png',
    description: 'Game over screen',
    prompt: '8-bit pixel art "GAME OVER" text in synthwave style, glowing red to pink gradient, on transparent background.',
    size: '300x100',
    status: 'pending'
  },
  {
    name: 'start_button.png',
    description: 'Start button',
    prompt: '8-bit pixel art "START" button in synthwave style, purple background with pink border and cyan text, on transparent background.',
    size: '100x50',
    status: 'pending'
  }
];

// Audio asset definitions with prompts from the sound design guide
const audioAssets = [
  {
    name: 'background_music.mp3',
    description: 'Background music',
    prompt: 'Create an 8-bit synthwave loop for a retro arcade game, with pulsing bass, arpeggiated synths, and a catchy melody. Should evoke 1980s sci-fi and space themes. 30-60 seconds loop that can repeat seamlessly.',
    duration: '30-60 seconds',
    status: 'pending'
  },
  {
    name: 'game_start.mp3',
    description: 'Game start sound',
    prompt: 'Create a short 8-bit game start sound effect with ascending tones and a triumphant finish, synthwave style, 2-3 seconds long.',
    duration: '2-3 seconds',
    status: 'pending'
  },
  {
    name: 'ball_launch.mp3',
    description: 'Ball launch sound',
    prompt: 'Create an 8-bit sound effect for a pinball launcher, with a mechanical spring sound followed by a whoosh, 1 second long.',
    duration: '1 second',
    status: 'pending'
  },
  {
    name: 'flipper_sound.mp3',
    description: 'Flipper activation sound',
    prompt: 'Create an 8-bit sound effect for pinball flippers, a quick mechanical click/thud, 0.2 seconds long.',
    duration: '0.2 seconds',
    status: 'pending'
  },
  {
    name: 'ball_collision.mp3',
    description: 'Ball collision sound',
    prompt: 'Create an 8-bit sound effect for a pinball hitting a wall, a short bounce/ping sound, 0.3 seconds long.',
    duration: '0.3 seconds',
    status: 'pending'
  },
  {
    name: 'alien_scout_hit.mp3',
    description: 'Alien scout hit sound',
    prompt: 'Create an 8-bit sound effect for hitting an alien in a game, a satisfying electronic zap with a slight alien squeal, 0.5 seconds long.',
    duration: '0.5 seconds',
    status: 'pending'
  },
  {
    name: 'alien_fighter_hit.mp3',
    description: 'Alien fighter hit sound',
    prompt: 'Create an 8-bit sound effect for destroying a small alien ship, with a short explosion and electronic warble, 0.7 seconds long.',
    duration: '0.7 seconds',
    status: 'pending'
  },
  {
    name: 'asteroid_field_pass.mp3',
    description: 'Asteroid field pass sound',
    prompt: 'Create an 8-bit sound effect for passing through an asteroid field, a series of quick pings with a slight echo, 0.8 seconds long.',
    duration: '0.8 seconds',
    status: 'pending'
  },
  {
    name: 'mothership_hit.mp3',
    description: 'Mothership hit sound',
    prompt: 'Create an 8-bit sound effect for hitting a large alien mothership, a deep resonant impact followed by alien alarm sounds, 1.2 seconds long.',
    duration: '1.2 seconds',
    status: 'pending'
  },
  {
    name: 'ramp_completion.mp3',
    description: 'Ramp completion sound',
    prompt: 'Create an 8-bit sound effect for completing a pinball ramp, an ascending series of tones with a satisfying finish, 1 second long.',
    duration: '1 second',
    status: 'pending'
  },
  {
    name: 'multiball_activation.mp3',
    description: 'Multiball activation sound',
    prompt: 'Create an 8-bit sound effect for activating multiball in a pinball game, an exciting buildup with alarm sounds and a triumphant finish, 3 seconds long.',
    duration: '3 seconds',
    status: 'pending'
  },
  {
    name: 'invasion_alert.mp3',
    description: 'Invasion alert sound',
    prompt: 'Create an 8-bit alien invasion alarm sound effect, with pulsing siren tones and retro sci-fi elements, 2 seconds long.',
    duration: '2 seconds',
    status: 'pending'
  },
  {
    name: 'bonus_scoring.mp3',
    description: 'Bonus scoring sound',
    prompt: 'Create an 8-bit sound effect for earning bonus points, a series of ascending happy tones with sparkle effects, 1.5 seconds long.',
    duration: '1.5 seconds',
    status: 'pending'
  },
  {
    name: 'ball_drain.mp3',
    description: 'Ball drain sound',
    prompt: 'Create an 8-bit sound effect for losing a pinball, a descending sad tone with a final thud, 1 second long.',
    duration: '1 second',
    status: 'pending'
  },
  {
    name: 'game_over.mp3',
    description: 'Game over sound',
    prompt: 'Create an 8-bit game over sound effect with descending tones and a final low note, synthwave style, 2-3 seconds long.',
    duration: '2-3 seconds',
    status: 'pending'
  },
  {
    name: 'level_up.mp3',
    description: 'Level up sound',
    prompt: 'Create an 8-bit level up sound effect with triumphant ascending tones and a fanfare finish, 2 seconds long.',
    duration: '2 seconds',
    status: 'pending'
  },
  {
    name: 'tilt_warning.mp3',
    description: 'Tilt warning sound',
    prompt: 'Create an 8-bit pinball tilt warning sound effect, a short alarming buzz, 0.5 seconds long.',
    duration: '0.5 seconds',
    status: 'pending'
  },
  {
    name: 'combo_achieved.mp3',
    description: 'Combo achieved sound',
    prompt: 'Create an 8-bit sound effect for achieving a combo in a game, a series of quick ascending notes with a satisfying finish, 1 second long.',
    duration: '1 second',
    status: 'pending'
  }
];

/**
 * Display asset generation instructions
 */
function displayInstructions() {
  console.log('\n=== ALIEN INVASION PINBALL - ASSET GENERATION ===\n');
  console.log('This script helps you generate assets for the Alien Invasion Pinball game using AI tools.');
  console.log('\nInstructions:');
  console.log('1. Use the prompts below with AI image/sound generation tools');
  console.log('2. Save the generated assets to the appropriate directories:');
  console.log(`   - Visual assets: ${config.visualAssetDir}`);
  console.log(`   - Audio assets: ${config.audioAssetDir}`);
  console.log('3. Update the status in this script to track progress');
  console.log('\nRecommended AI Tools:');
  console.log('- Visual: DALL-E, Midjourney, Stable Diffusion');
  console.log('- Audio: Soundraw, AIVA, Mubert');
}

/**
 * Display visual asset prompts
 */
function displayVisualAssetPrompts() {
  console.log('\n=== VISUAL ASSETS ===\n');
  
  visualAssets.forEach((asset, index) => {
    console.log(`[${index + 1}/${visualAssets.length}] ${asset.name} - ${asset.status.toUpperCase()}`);
    console.log(`Description: ${asset.description}`);
    console.log(`Size: ${asset.size}`);
    console.log(`Prompt: ${asset.prompt}`);
    console.log('---');
  });
}

/**
 * Display audio asset prompts
 */
function displayAudioAssetPrompts() {
  console.log('\n=== AUDIO ASSETS ===\n');
  
  audioAssets.forEach((asset, index) => {
    console.log(`[${index + 1}/${audioAssets.length}] ${asset.name} - ${asset.status.toUpperCase()}`);
    console.log(`Description: ${asset.description}`);
    console.log(`Duration: ${asset.duration}`);
    console.log(`Prompt: ${asset.prompt}`);
    console.log('---');
  });
}

/**
 * Display asset generation summary
 */
function displaySummary() {
  const visualCompleted = visualAssets.filter(asset => asset.status === 'completed').length;
  const audioCompleted = audioAssets.filter(asset => asset.status === 'completed').length;
  
  console.log('\n=== ASSET GENERATION SUMMARY ===\n');
  console.log(`Visual Assets: ${visualCompleted}/${visualAssets.length} completed`);
  console.log(`Audio Assets: ${audioCompleted}/${audioAssets.length} completed`);
  console.log(`Total Progress: ${Math.round((visualCompleted + audioCompleted) / (visualAssets.length + audioAssets.length) * 100)}%`);
}

/**
 * Main function
 */
function main() {
  displayInstructions();
  displayVisualAssetPrompts();
  displayAudioAssetPrompts();
  displaySummary();
  
  console.log('\nRun this script again after generating assets to track progress.');
}

// Run the script
main();
