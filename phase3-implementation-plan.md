# Alien Invasion Pinball - Phase 3 Implementation Plan

This document outlines the plan for implementing Phase 3 of the Alien Invasion Pinball game, which focuses on integrating the generated assets and building the full game functionality.

## 1. Asset Integration

### Visual Assets Integration
1. **Update the renderer to use the background image**
   ```javascript
   this.render = Matter.Render.create({
       canvas: this.canvas,
       engine: this.engine,
       options: {
           width: this.width,
           height: this.height,
           wireframes: false,
           background: './assets/images/background.png',
           showAngleIndicator: false
       }
   });
   ```

2. **Replace primitive shapes with sprite-based game elements**
   ```javascript
   // Example: Ball with sprite
   this.ball = Matter.Bodies.circle(
       this.width / 2, this.height / 4, 
       15, {
           restitution: 0.8,
           friction: 0.01,
           density: 0.05,
           render: {
               sprite: {
                   texture: './assets/images/ball.png',
                   xScale: 1,
                   yScale: 1
               }
           }
       }
   );
   
   // Example: Flipper with sprite
   this.flippers.left = Matter.Bodies.trapezoid(
       this.width / 4, this.height - 50,
       80, 20, 0.3, {
           angle: 0.3,
           isStatic: true,
           chamfer: { radius: 5 },
           render: {
               sprite: {
                   texture: './assets/images/flipper_left.png',
                   xScale: 1,
                   yScale: 1
               }
           }
       }
   );
   ```

3. **Create UI elements using the generated assets**
   ```javascript
   // Example: Game logo
   const logo = document.createElement('img');
   logo.src = './assets/images/logo.png';
   logo.style.position = 'absolute';
   logo.style.top = '20px';
   logo.style.left = '50%';
   logo.style.transform = 'translateX(-50%)';
   logo.style.zIndex = '100';
   document.getElementById('game-container').appendChild(logo);
   
   // Example: Life icons
   for (let i = 0; i < this.lives; i++) {
       const lifeIcon = document.createElement('img');
       lifeIcon.src = './assets/images/life_icon.png';
       lifeIcon.style.marginLeft = '5px';
       this.livesDisplay.appendChild(lifeIcon);
   }
   ```

### Audio Assets Integration
1. **Set up the Web Audio API**
   ```javascript
   setupAudio: function() {
       // Create audio context
       this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
       
       // Load sound effects
       this.sounds = {
           flipper: new Audio('./assets/sounds/flipper_sound.mp3'),
           ballCollision: new Audio('./assets/sounds/ball_collision.mp3'),
           alienHit: new Audio('./assets/sounds/alien_scout_hit.mp3'),
           // ... other sound effects
       };
       
       // Background music
       this.backgroundMusic = new Audio('./assets/sounds/background_music.mp3');
       this.backgroundMusic.loop = true;
   }
   ```

2. **Play sound effects on game events**
   ```javascript
   // Example: Play flipper sound
   activateLeftFlipper: function() {
       // Flipper physics code...
       
       // Play sound
       this.sounds.flipper.currentTime = 0;
       this.sounds.flipper.play()
           .catch(e => console.error('Error playing flipper sound:', e));
   }
   
   // Example: Play collision sound
   Matter.Events.on(this.engine, 'collisionStart', (event) => {
       event.pairs.forEach((pair) => {
           // Check collision types and play appropriate sounds
           if (pair.bodyA === this.ball || pair.bodyB === this.ball) {
               if (pair.bodyA.isWall || pair.bodyB.isWall) {
                   this.sounds.ballCollision.currentTime = 0;
                   this.sounds.ballCollision.play()
                       .catch(e => console.error('Error playing collision sound:', e));
               }
           }
       });
   });
   ```

## 2. Game Mechanics Implementation

### Flipper Physics
1. **Create proper flipper bodies**
   ```javascript
   createFlippers: function() {
       // Left flipper
       const leftFlipperX = this.width / 4;
       const leftFlipperY = this.height - 50;
       
       this.flippers.left = Matter.Bodies.trapezoid(
           leftFlipperX, leftFlipperY,
           80, 20, 0.3, {
               angle: 0.3,
               isStatic: true,
               chamfer: { radius: 5 },
               render: {
                   sprite: {
                       texture: './assets/images/flipper_left.png',
                       xScale: 1,
                       yScale: 1
                   }
               }
           }
       );
       
       // Right flipper (similar to left but mirrored)
       // ...
       
       // Add flippers to the world
       Matter.Composite.add(this.world, [this.flippers.left, this.flippers.right]);
   }
   ```

2. **Implement flipper rotation**
   ```javascript
   activateLeftFlipper: function() {
       Matter.Body.setAngularVelocity(this.flippers.left, -0.2);
       Matter.Body.setAngle(this.flippers.left, -0.3);
       this.sounds.flipper.currentTime = 0;
       this.sounds.flipper.play()
           .catch(e => console.error('Error playing flipper sound:', e));
   }
   
   deactivateLeftFlipper: function() {
       Matter.Body.setAngularVelocity(this.flippers.left, 0.2);
       Matter.Body.setAngle(this.flippers.left, 0.3);
   }
   ```

### Alien Targets and Obstacles
1. **Create alien scout bumpers**
   ```javascript
   createAlienScouts: function() {
       const scoutOptions = {
           isStatic: true,
           restitution: 1.5,
           render: {
               sprite: {
                   texture: './assets/images/alien_scouts.png',
                   xScale: 1,
                   yScale: 1
               }
           }
       };
       
       // Create several scouts at different positions
       this.alienScouts = [];
       
       // Example positions
       const scoutPositions = [
           { x: this.width / 4, y: this.height / 3 },
           { x: this.width / 2, y: this.height / 4 },
           { x: 3 * this.width / 4, y: this.height / 3 }
       ];
       
       scoutPositions.forEach(pos => {
           const scout = Matter.Bodies.circle(
               pos.x, pos.y, 
               20, scoutOptions
           );
           
           scout.isAlienScout = true;
           scout.hits = 0;
           
           this.alienScouts.push(scout);
       });
       
       Matter.Composite.add(this.world, this.alienScouts);
   }
   ```

2. **Create alien fighter drop targets**
   ```javascript
   createAlienFighters: function() {
       // Similar to alien scouts but with different behavior
       // ...
   }
   ```

3. **Create mothership (multiball trigger)**
   ```javascript
   createMothership: function() {
       // Create mothership at the top center
       // ...
   }
   ```

### Scoring System
1. **Implement collision detection for scoring**
   ```javascript
   setupCollisionHandling: function() {
       Matter.Events.on(this.engine, 'collisionStart', (event) => {
           event.pairs.forEach((pair) => {
               const bodyA = pair.bodyA;
               const bodyB = pair.bodyB;
               
               // Check if ball hit an alien scout
               if ((bodyA === this.ball && bodyB.isAlienScout) || 
                   (bodyB === this.ball && bodyA.isAlienScout)) {
                   
                   const scout = bodyA.isAlienScout ? bodyA : bodyB;
                   
                   // Increment hit counter
                   scout.hits++;
                   
                   // Award points
                   const points = scout.hits >= 5 ? 200 : 100;
                   this.updateScore(points);
                   
                   // Play sound
                   this.sounds.alienHit.currentTime = 0;
                   this.sounds.alienHit.play()
                       .catch(e => console.error('Error playing alien hit sound:', e));
               }
               
               // Similar checks for other game elements
               // ...
           });
       });
   }
   ```

### Special Game Modes
1. **Implement multiball mode**
   ```javascript
   activateMultiball: function() {
       // Play multiball activation sound
       this.sounds.multiballActivation.play()
           .catch(e => console.error('Error playing multiball sound:', e));
       
       // Create additional balls
       for (let i = 0; i < 2; i++) {
           const extraBall = Matter.Bodies.circle(
               this.width / 2, this.height / 4, 
               15, {
                   restitution: 0.8,
                   friction: 0.01,
                   density: 0.05,
                   render: {
                       sprite: {
                           texture: './assets/images/ball.png',
                           xScale: 1,
                           yScale: 1
                       }
                   }
               }
           );
           
           // Add to world
           Matter.Composite.add(this.world, extraBall);
           
           // Apply random velocity
           Matter.Body.setVelocity(extraBall, {
               x: Math.random() * 10 - 5,
               y: -10 - Math.random() * 5
           });
           
           // Add to balls array
           this.balls.push(extraBall);
       }
       
       // Set multiball mode active
       this.multiballActive = true;
       
       // Double scoring
       this.scoreMultiplier = 2;
   }
   ```

2. **Implement invasion alert mode**
   ```javascript
   activateInvasionAlert: function() {
       // Similar to multiball but with different effects
       // ...
   }
   ```

## 3. Game Flow Implementation

### Game States
1. **Implement game state management**
   ```javascript
   // Game states
   gameState: 'start', // 'start', 'playing', 'gameOver'
   
   // Update game state
   updateGameState: function(newState) {
       this.gameState = newState;
       
       switch (newState) {
           case 'start':
               this.showStartScreen();
               break;
           case 'playing':
               this.hideStartScreen();
               this.resetGame();
               this.playBackgroundMusic();
               break;
           case 'gameOver':
               this.showGameOverScreen();
               break;
       }
   }
   ```

2. **Implement start screen**
   ```javascript
   showStartScreen: function() {
       // Create and show start screen with logo and start button
       // ...
   }
   ```

3. **Implement game over screen**
   ```javascript
   showGameOverScreen: function() {
       // Create and show game over screen with final score
       // ...
   }
   ```

### Level Progression
1. **Implement level system**
   ```javascript
   // Level tracking
   level: 1,
   
   // Check for level up
   checkLevelUp: function() {
       if (this.score >= 25000 && this.level === 1) {
           this.levelUp(2);
       } else if (this.score >= 75000 && this.level === 2) {
           this.levelUp(3);
       }
   },
   
   // Level up
   levelUp: function(newLevel) {
       this.level = newLevel;
       
       // Play level up sound
       this.sounds.levelUp.play()
           .catch(e => console.error('Error playing level up sound:', e));
       
       // Add new elements based on level
       if (newLevel === 2) {
           this.createAsteroidField();
       } else if (newLevel === 3) {
           this.createMothership();
       }
   }
   ```

## 4. Testing and Refinement

### Testing Plan
1. **Test each game element individually**
   - Verify flipper physics and controls
   - Test collision detection and scoring
   - Verify sound effects play correctly
   - Test special game modes

2. **Test game flow**
   - Verify game start, play, and game over states
   - Test level progression
   - Verify score tracking and lives system

3. **Performance testing**
   - Test with multiple balls (multiball mode)
   - Verify smooth animation and physics
   - Test on different browsers and devices

### Refinement
1. **Adjust physics parameters for optimal gameplay**
   - Flipper strength and restitution
   - Ball weight and bounciness
   - Gravity and friction

2. **Balance scoring system**
   - Adjust point values for different targets
   - Fine-tune combo scoring
   - Balance difficulty progression

3. **Polish visual and audio elements**
   - Ensure assets are properly sized and positioned
   - Adjust sound levels for balance
   - Add visual feedback for scoring and special events
