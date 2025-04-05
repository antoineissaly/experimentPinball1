// Alien Invasion Pinball Game
// Main game initialization and loop

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create UI overlay
    createUIOverlay();
    
    // Initialize game
    const Game = {
        // Canvas and context
        canvas: document.getElementById('game-canvas'),
        ctx: null,
        
        // Matter.js modules
        engine: null,
        render: null,
        runner: null,
        
        // Game dimensions
        width: 0,
        height: 0,
        
        // Game elements
        flippers: {
            left: null,
            right: null
        },
        ball: null,
        walls: [],
        
        // Game state
        score: 0,
        lives: 3,
        
        // UI elements
        scoreDisplay: null,
        livesDisplay: null,
        
        // Initialize the game
        init: function() {
            // Set up canvas
            this.ctx = this.canvas.getContext('2d');
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            
            // Get UI elements
            this.scoreDisplay = document.getElementById('score-display');
            this.livesDisplay = document.getElementById('lives-display');
            
            // Initialize Matter.js
            this.initPhysics();
            
            // Set up event listeners
            this.setupControls();
            
            // Start game loop
            this.gameLoop();
            
            console.log('Game initialized');
        },
        
        // Resize canvas to fit container
        resizeCanvas: function() {
            const container = document.getElementById('game-container');
            this.width = container.clientWidth;
            this.height = container.clientHeight;
            
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            
            console.log(`Canvas resized to ${this.width}x${this.height}`);
        },
        
        // Initialize Matter.js physics
        initPhysics: function() {
            // Create engine, world, and renderer
            this.engine = Matter.Engine.create();
            this.world = this.engine.world;
            
            // Configure world
            this.world.gravity.y = 0.5; // Reduced gravity for pinball
            
            // Create renderer (for debugging)
            this.render = Matter.Render.create({
                canvas: this.canvas,
                engine: this.engine,
                options: {
                    width: this.width,
                    height: this.height,
                    wireframes: false,
                    background: '#000000',
                    showAngleIndicator: false
                }
            });
            
            // Create runner
            this.runner = Matter.Runner.create();
            
            // Start the engine and runner
            Matter.Runner.run(this.runner, this.engine);
            
            // Create basic pinball table elements
            this.createPinballElements();
        },
        
        // Create basic pinball table elements
        createPinballElements: function() {
            // Create walls (boundaries)
            const wallOptions = {
                isStatic: true,
                render: {
                    fillStyle: '#e83283' // Pink color from our palette
                }
            };
            
            // Left wall
            this.walls.push(Matter.Bodies.rectangle(
                0, this.height / 2, 
                20, this.height, 
                wallOptions
            ));
            
            // Right wall
            this.walls.push(Matter.Bodies.rectangle(
                this.width, this.height / 2, 
                20, this.height, 
                wallOptions
            ));
            
            // Top wall
            this.walls.push(Matter.Bodies.rectangle(
                this.width / 2, 0, 
                this.width, 20, 
                wallOptions
            ));
            
            // Bottom wall (temporary, will be replaced with proper drain and flippers)
            this.walls.push(Matter.Bodies.rectangle(
                this.width / 2, this.height, 
                this.width, 20, 
                wallOptions
            ));
            
            // Add all walls to the world
            Matter.Composite.add(this.world, this.walls);
            
            // Create ball
            this.ball = Matter.Bodies.circle(
                this.width / 2, this.height / 4, 
                15, {
                    restitution: 0.8, // Bounciness
                    friction: 0.01,
                    density: 0.05,
                    render: {
                        fillStyle: '#43dde6' // Cyan color from our palette
                    }
                }
            );
            
            // Add ball to the world
            Matter.Composite.add(this.world, this.ball);
            
            console.log('Pinball elements created');
        },
        
        // Set up keyboard and touch controls
        setupControls: function() {
            // Keyboard controls
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    // Activate left flipper
                    console.log('Left flipper activated');
                } else if (e.key === 'ArrowRight') {
                    // Activate right flipper
                    console.log('Right flipper activated');
                } else if (e.key === ' ') {
                    // Launch ball
                    this.launchBall();
                }
            });
            
            document.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowLeft') {
                    // Deactivate left flipper
                    console.log('Left flipper deactivated');
                } else if (e.key === 'ArrowRight') {
                    // Deactivate right flipper
                    console.log('Right flipper deactivated');
                }
            });
            
            console.log('Controls set up');
        },
        
        // Launch the ball
        launchBall: function() {
            Matter.Body.setVelocity(this.ball, {
                x: 0,
                y: -10 // Launch upward
            });
            console.log('Ball launched');
        },
        
        // Update score
        updateScore: function(points) {
            this.score += points;
            this.scoreDisplay.textContent = `SCORE: ${this.score}`;
            console.log(`Score updated: ${this.score}`);
        },
        
        // Update lives
        updateLives: function(change) {
            this.lives += change;
            this.livesDisplay.textContent = `LIVES: ${this.lives}`;
            console.log(`Lives updated: ${this.lives}`);
            
            if (this.lives <= 0) {
                this.gameOver();
            }
        },
        
        // Game over
        gameOver: function() {
            console.log('Game Over!');
            // Will be implemented in Phase 2
        },
        
        // Main game loop
        gameLoop: function() {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.width, this.height);
            
            // Matter.js handles physics and rendering
            Matter.Render.world(this.render);
            
            // Check if ball is below the bottom of the screen (drain)
            if (this.ball.position.y > this.height + 50) {
                this.resetBall();
                this.updateLives(-1);
            }
            
            // Request next frame
            requestAnimationFrame(() => this.gameLoop());
        },
        
        // Reset ball position
        resetBall: function() {
            Matter.Body.setPosition(this.ball, {
                x: this.width / 2,
                y: this.height / 4
            });
            
            Matter.Body.setVelocity(this.ball, {
                x: 0,
                y: 0
            });
            
            console.log('Ball reset');
        }
    };
    
    // Start the game
    Game.init();
});

// Create UI overlay with instructions
function createUIOverlay() {
    const gameContainer = document.getElementById('game-container');
    
    // Create overlay div
    const overlay = document.createElement('div');
    overlay.id = 'game-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '10px';
    overlay.style.left = '10px';
    overlay.style.padding = '10px';
    overlay.style.backgroundColor = 'rgba(18, 4, 88, 0.7)';
    overlay.style.border = '2px solid #e83283';
    overlay.style.color = 'white';
    overlay.style.fontFamily = 'Courier New, monospace';
    overlay.style.fontSize = '14px';
    overlay.style.zIndex = '100';
    overlay.style.borderRadius = '5px';
    overlay.style.boxShadow = '0 0 10px #43dde6';
    
    // Add instructions
    overlay.innerHTML = `
        <h2 style="color: #e83283; margin-top: 0;">Alien Invasion Pinball</h2>
        <p>Controls:</p>
        <ul>
            <li>Left Arrow: Left Flipper</li>
            <li>Right Arrow: Right Flipper</li>
            <li>Space: Launch Ball</li>
        </ul>
        <p>Press Space to Start!</p>
    `;
    
    // Add to container
    gameContainer.appendChild(overlay);
    
    // Add event listener to hide overlay on first interaction
    document.addEventListener('keydown', function hideOverlay(e) {
        if (e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            overlay.style.display = 'none';
            document.removeEventListener('keydown', hideOverlay);
        }
    });
}
