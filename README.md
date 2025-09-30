# 2D Game Development Module

A lightweight, vanilla JavaScript game development library for creating 2D platformer and top-down games in the browser. Built with clean code principles, object-oriented design, and encapsulation.

## Features

- **Multiple Control Schemes**: WASD (top-down) and Platform (side-scrolling with jump)
- **Scene Management**: Easy level progression with score-based triggers
- **Collision Detection**: AABB collision system for obstacles and collectibles
- **Score System**: Built-in scoring with visual HUD
- **Pause Menu**: Customizable in-game menu system
- **Clean API**: Simple, intuitive interface for rapid prototyping

## Installation

### Using npm

```bash
npm install learn2dgame-js
```

### Option 1: With Vite (Recommended)

This package works best with a build tool like Vite.

1. Create a new Vite project (if you don't have one):

```bash
npm create vite@latest my-game -- --template vanilla
cd my-game
```

2. Install the package:

```bash
npm install learn2dgame-js
```

3. Import in your JavaScript file:

```javascript
import { Game, Obstacle, Coin, SceneManager, Menu, score } from 'learn2dgame-js'
```

4. Run your development server:

```bash
npm run dev
```

### Option 2: Without a Build Tool

If you prefer not to use Vite, you can import directly from the compiled bundle.

1. Install the package:

```bash
npm install learn2dgame-js
```

2. Create an HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game</title>
</head>
<body>
    <script type="module" src="index.js"></script>
</body>
</html>
```

3. In your `index.js`, import from the dist bundle:

```javascript
import { Game, Obstacle, Coin, SceneManager, Menu, score } from './node_modules/learn2dgame-js/dist/learn2dgame-js.js'

// Your game code here...
```

4. Open the HTML file with **Live Server** (VS Code extension) or any local development server

## Quick Start

```javascript
import { Game, Obstacle, Coin, SceneManager, Menu, score } from 'learn2dgame-js'

// Create a scene manager
const scenes = new SceneManager()

// Define a scene
function levelOne() {
  new Obstacle({ positionX: 200, positionY: 500, width: 200, height: 50, color: 'brown' })
  new Coin({ positionX: 250, positionY: 450 })
}

// Add scene with score target (auto-progresses at 10 points)
scenes.add(levelOne, 10)

// Start at first scene
scenes.set(0)

// Start the game with platform controls
new Game('platform', {
  movementSpeed: 12,
  gravityForce: 0.6,
  jumpStrengthValue: 15,
  color: 'blue'
})
```

Then run your development server:

```bash
npm run dev
```

## API Reference

### Game

The main game class that handles the game loop, input, and physics.

```javascript
new Game(controlScheme, options)
```

**Parameters:**
- `controlScheme` (string): Either `'wasd'` or `'platform'`
- `options` (object):
  - `movementSpeed` (number): Player movement speed (default: 8)
  - `gravityForce` (number): Gravity strength for platform mode (default: 0.5)
  - `jumpStrengthValue` (number): Jump power for platform mode (default: 12)
  - `color` (string): Player color (default: 'red')

**Control Schemes:**
- `'wasd'`: Top-down movement (W=up, A=left, S=down, D=right, Space=special)
- `'platform'`: Side-scrolling (A=left, D=right, Space=jump)

### Obstacle

Creates a platform or obstacle in the game world.

```javascript
new Obstacle(options)
```

**Parameters:**
- `positionX` (number): X position (default: 0)
- `positionY` (number): Y position (default: 0)
- `width` (number): Width in pixels (default: 50)
- `height` (number): Height in pixels (default: 50)
- `color` (string): CSS color (default: 'blue')
- `border` (string): CSS border (default: '2px solid white')

**Methods:**
- `getBounds()`: Returns bounding box `{left, top, right, bottom, width, height}`
- `remove()`: Removes the obstacle from the game

### Coin

Creates a collectible coin that adds points when picked up.

```javascript
new Coin(options)
```

**Parameters:**
- `positionX` (number): X position (default: 0)
- `positionY` (number): Y position (default: 0)
- `size` (number): Diameter in pixels (default: 20)

**Methods:**
- `getBounds()`: Returns bounding box
- `remove()`: Removes the coin from the game

### SceneManager

Manages level progression and scene transitions.

```javascript
const scenes = new SceneManager()
```

**Methods:**
- `add(sceneFn, targetScore)`: Register a scene with optional score target
- `set(index)`: Load scene at given index (clears obstacles, coins, and resets score)
- `next()`: Progress to next scene
- `checkProgress()`: Check if score target is met (called automatically)

**Properties:**
- `index`: Current scene index (read-only)

### Score

Singleton score management system with visual HUD.

```javascript
import { score } from './index.js'
```

**Methods:**
- `add(points)`: Add points to score
- `reset()`: Reset score to 0
- `update()`: Update HUD display

**Properties:**
- `value`: Current score value (read-only)

### Menu

Creates customizable pause/game menus.

```javascript
const menu = new Menu()
```

**Methods:**
- `create(options)`: Display menu with title and buttons
  - `title` (string): Menu title
  - `buttons` (array): Array of `{text, onClick}` objects
- `close()`: Close and remove menu

**Example:**
```javascript
import { score } from 'learn2dgame-js'

const menu = new Menu()
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'm') {
    menu.create({
      title: 'Pause Menu',
      buttons: [
        { text: 'Resume', onClick: () => menu.close() },
        { text: 'Restart', onClick: () => window.location.reload() }
      ]
    })
  }
})
```

### GameElement

Base class for custom game objects (extended by Player, Obstacle, Coin).

```javascript
new GameElement(options)
```

**Parameters:**
- `positionX`, `positionY`: Position coordinates
- `elementWidth`, `elementHeight`: Dimensions
- `backgroundColor`: CSS color

**Methods:**
- `updatePosition()`: Update DOM position
- `getBounds()`: Get bounding box
- `remove()`: Remove from DOM

## Example: Complete Game

See the full example below for a complete game with 10 scenes, progressive difficulty, and win condition.

## Examples & Tutorials

### Creating Your First Scene

```javascript
import { Game, Obstacle, Coin, SceneManager, score } from 'learn2dgame-js'

const scenes = new SceneManager()

function myFirstLevel() {
  // Create a ground platform
  new Obstacle({ 
    positionX: 100, 
    positionY: 500, 
    width: 400, 
    height: 50, 
    color: 'brown' 
  })
  
  // Add some coins to collect
  new Coin({ positionX: 200, positionY: 450 })
  new Coin({ positionX: 300, positionY: 450 })
  new Coin({ positionX: 400, positionY: 450 })
}

// Add scene (auto-progresses when you collect 30 points)
scenes.add(myFirstLevel, 30)
scenes.set(0)

// Start the game
new Game('platform', {
  movementSpeed: 10,
  gravityForce: 0.6,
  jumpStrengthValue: 15,
  color: 'blue'
})
```

### Creating a Multi-Level Game

```javascript
import { Game, Obstacle, Coin, SceneManager } from 'learn2dgame-js'

const scenes = new SceneManager()

// Level 1: Easy tutorial level
function level1() {
  new Obstacle({ positionX: 200, positionY: 500, width: 300, height: 50, color: 'brown' })
  new Coin({ positionX: 250, positionY: 450 })
  new Coin({ positionX: 350, positionY: 450 })
}

// Level 2: Introduce jumping
function level2() {
  new Obstacle({ positionX: 100, positionY: 500, width: 200, height: 50, color: 'green' })
  new Obstacle({ positionX: 400, positionY: 400, width: 200, height: 50, color: 'green' })
  new Coin({ positionX: 150, positionY: 450 })
  new Coin({ positionX: 450, positionY: 350 })
}

// Level 3: More complex platforming
function level3() {
  new Obstacle({ positionX: 100, positionY: 500, width: 150, height: 50, color: 'purple' })
  new Obstacle({ positionX: 300, positionY: 400, width: 150, height: 50, color: 'purple' })
  new Obstacle({ positionX: 500, positionY: 300, width: 150, height: 50, color: 'purple' })
  new Coin({ positionX: 320, positionY: 350 })
  new Coin({ positionX: 520, positionY: 250 })
  new Coin({ positionX: 720, positionY: 250 })
}

// Win screen
function winScreen() {
  const text = document.createElement('h1')
  text.textContent = '🎉 YOU WIN! 🎉'
  text.style.position = 'absolute'
  text.style.top = '50%'
  text.style.left = '50%'
  text.style.transform = 'translate(-50%, -50%)'
  text.style.color = 'white'
  text.style.fontFamily = 'Arial, sans-serif'
  text.style.fontSize = '48px'
  document.body.appendChild(text)
}

// Register scenes with score targets
scenes.add(level1, 20)   // Need 20 points to progress
scenes.add(level2, 20)   // Need 20 points to progress
scenes.add(level3, 30)   // Need 30 points to progress
scenes.add(winScreen, null) // No target, final scene

scenes.set(0)

new Game('platform', {
  movementSpeed: 12,
  gravityForce: 0.6,
  jumpStrengthValue: 15
})
```

### Adding a Pause Menu

```javascript
import { Menu, SceneManager, score } from 'learn2dgame-js'

const menu = new Menu()
const scenes = new SceneManager()

// Open menu with 'M' key
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'm') {
    menu.create({
      title: 'Pause Menu',
      buttons: [
        { text: 'Resume', onClick: () => menu.close() },
        { text: 'Next Level', onClick: () => { menu.close(); scenes.next() } },
        { text: 'Restart Level', onClick: () => { menu.close(); scenes.set(scenes.index) } },
        { text: 'Reset Score', onClick: () => { score.reset(); menu.close() } },
        { text: 'Main Menu', onClick: () => window.location.reload() }
      ]
    })
  }
})
```

### Creating Challenging Platforming Sequences

```javascript
// Staircase pattern
function staircaseLevel() {
  for (let i = 0; i < 5; i++) {
    new Obstacle({
      positionX: 100 + (i * 150),
      positionY: 500 - (i * 80),
      width: 120,
      height: 50,
      color: 'blue'
    })
    new Coin({
      positionX: 130 + (i * 150),
      positionY: 450 - (i * 80)
    })
  }
}

// Gap jumping challenge
function gapJumpLevel() {
  // First platform
  new Obstacle({ positionX: 100, positionY: 500, width: 150, height: 50, color: 'brown' })
  
  // Gap (player must jump)
  
  // Second platform
  new Obstacle({ positionX: 350, positionY: 500, width: 150, height: 50, color: 'brown' })
  
  // Third platform (higher)
  new Obstacle({ positionX: 600, positionY: 400, width: 150, height: 50, color: 'brown' })
  
  new Coin({ positionX: 400, positionY: 450 }) // Mid-air coin
  new Coin({ positionX: 650, positionY: 350 })
}

// Vertical climb
function verticalClimbLevel() {
  for (let i = 0; i < 6; i++) {
    new Obstacle({
      positionX: i % 2 === 0 ? 100 : 400, // Alternate sides
      positionY: 550 - (i * 100),
      width: 150,
      height: 50,
      color: 'green'
    })
  }
  new Coin({ positionX: 450, positionY: 100 }) // Coin at the top
}
```

### Using WASD (Top-Down) Mode

```javascript
import { Game, Obstacle, Coin } from 'learn2dgame-js'

// Create a maze-like level
function mazeLevel() {
  // Horizontal walls
  new Obstacle({ positionX: 100, positionY: 200, width: 300, height: 20, color: 'gray' })
  new Obstacle({ positionX: 100, positionY: 400, width: 300, height: 20, color: 'gray' })
  
  // Vertical walls
  new Obstacle({ positionX: 100, positionY: 200, width: 20, height: 220, color: 'gray' })
  new Obstacle({ positionX: 380, positionY: 200, width: 20, height: 220, color: 'gray' })
  
  // Coins in the maze
  new Coin({ positionX: 200, positionY: 300 })
  new Coin({ positionX: 300, positionY: 300 })
}

// Use WASD control scheme
new Game('wasd', {
  movementSpeed: 5,
  color: 'red'
})
```

### Complete 10-Level Game Example

```javascript
import { Game, Obstacle, Coin, SceneManager, Menu, score } from 'learn2dgame-js'

const scenes = new SceneManager()

function sceneOne() {
  new Obstacle({ positionX: 200, positionY: 500, width: 200, height: 50, color: 'brown' })
  new Coin({ positionX: 250, positionY: 450 })
  new Coin({ positionX: 350, positionY: 450 })
}

function sceneTwo() {
  new Obstacle({ positionX: 400, positionY: 450, width: 180, height: 50, color: 'green' })
  new Obstacle({ positionX: 600, positionY: 350, width: 150, height: 50, color: 'blue' })
  new Coin({ positionX: 450, positionY: 400 })
  new Coin({ positionX: 650, positionY: 300 })
}

function sceneThree() {
  new Obstacle({ positionX: 100, positionY: 400, width: 250, height: 50, color: 'purple' })
  new Obstacle({ positionX: 500, positionY: 300, width: 200, height: 50, color: 'orange' })
  new Coin({ positionX: 150, positionY: 350 })
  new Coin({ positionX: 550, positionY: 250 })
}

function sceneFour() {
  new Obstacle({ positionX: 300, positionY: 500, width: 180, height: 50, color: 'teal' })
  new Obstacle({ positionX: 700, positionY: 400, width: 180, height: 50, color: 'red' })
  new Obstacle({ positionX: 500, positionY: 250, width: 100, height: 50, color: 'navy' })
  new Coin({ positionX: 320, positionY: 450 })
  new Coin({ positionX: 720, positionY: 350 })
}

function sceneFive() {
  new Obstacle({ positionX: 150, positionY: 500, width: 200, height: 50, color: 'pink' })
  new Obstacle({ positionX: 450, positionY: 350, width: 180, height: 50, color: 'gray' })
  new Obstacle({ positionX: 700, positionY: 250, width: 150, height: 50, color: 'gold' })
  new Coin({ positionX: 180, positionY: 450 })
  new Coin({ positionX: 480, positionY: 300 })
  new Coin({ positionX: 730, positionY: 200 })
}

function sceneSix() {
  new Obstacle({ positionX: 100, positionY: 550, width: 180, height: 50, color: 'cyan' })
  new Obstacle({ positionX: 350, positionY: 420, width: 160, height: 50, color: 'lime' })
  new Obstacle({ positionX: 600, positionY: 300, width: 140, height: 50, color: 'maroon' })
  new Coin({ positionX: 120, positionY: 500 })
  new Coin({ positionX: 370, positionY: 370 })
  new Coin({ positionX: 620, positionY: 250 })
}

function sceneSeven() {
  new Obstacle({ positionX: 200, positionY: 500, width: 150, height: 50, color: 'blue' })
  new Obstacle({ positionX: 400, positionY: 400, width: 150, height: 50, color: 'purple' })
  new Obstacle({ positionX: 600, positionY: 300, width: 150, height: 50, color: 'brown' })
  new Obstacle({ positionX: 800, positionY: 200, width: 150, height: 50, color: 'orange' })
  new Coin({ positionX: 220, positionY: 450 })
  new Coin({ positionX: 420, positionY: 350 })
  new Coin({ positionX: 620, positionY: 250 })
  new Coin({ positionX: 820, positionY: 150 })
}

function sceneEight() {
  new Obstacle({ positionX: 100, positionY: 500, width: 100, height: 50, color: 'red' })
  new Obstacle({ positionX: 250, positionY: 400, width: 100, height: 50, color: 'yellow' })
  new Obstacle({ positionX: 400, positionY: 300, width: 100, height: 50, color: 'blue' })
  new Obstacle({ positionX: 550, positionY: 200, width: 100, height: 50, color: 'green' })
  new Coin({ positionX: 120, positionY: 450 })
  new Coin({ positionX: 270, positionY: 350 })
  new Coin({ positionX: 420, positionY: 250 })
  new Coin({ positionX: 570, positionY: 150 })
}

function sceneNine() {
  new Obstacle({ positionX: 150, positionY: 550, width: 120, height: 50, color: 'teal' })
  new Obstacle({ positionX: 350, positionY: 450, width: 120, height: 50, color: 'navy' })
  new Obstacle({ positionX: 550, positionY: 350, width: 120, height: 50, color: 'olive' })
  new Obstacle({ positionX: 750, positionY: 250, width: 120, height: 50, color: 'brown' })
  new Coin({ positionX: 170, positionY: 500 })
  new Coin({ positionX: 370, positionY: 400 })
  new Coin({ positionX: 570, positionY: 300 })
  new Coin({ positionX: 770, positionY: 200 })
}

function sceneTen() {
  const text = document.createElement('h1')
  text.textContent = '🎉 YOU WIN! 🎉'
  text.style.position = 'absolute'
  text.style.top = '40%'
  text.style.left = '50%'
  text.style.transform = 'translate(-50%, -50%)'
  text.style.color = 'white'
  text.style.fontFamily = 'sans-serif'
  document.body.appendChild(text)
}

// Register all scenes with score targets
scenes.add(sceneOne, 20)
scenes.add(sceneTwo, 20)
scenes.add(sceneThree, 20)
scenes.add(sceneFour, 20)
scenes.add(sceneFive, 20)
scenes.add(sceneSix, 20)
scenes.add(sceneSeven, 40)
scenes.add(sceneEight, 40)
scenes.add(sceneNine, 50)
scenes.add(sceneTen, null)

scenes.set(0)

new Game('platform', {
  movementSpeed: 12,
  gravityForce: 0.6,
  jumpStrengthValue: 15,
  color: 'blue'
})

// Menu system
const menu = new Menu()
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'm') {
    menu.create({
      title: 'Pause Menu',
      buttons: [
        { text: 'Next Scene', onClick: () => { menu.close(); scenes.next() } },
        { text: 'Reset Scene', onClick: () => { menu.close(); scenes.set(scenes.index) } },
        { text: 'Reset Score', onClick: () => { score.reset(); menu.close() } },
        { text: 'Close Menu', onClick: () => menu.close() }
      ]
    })
  }
})
```

## Architecture

This module follows clean code principles:

- **Encapsulation**: Private fields (`#`) hide internal state
- **Single Responsibility**: Each class has a focused purpose
- **Query Methods**: Descriptive method names like `playerWantsToGoLeft()`
- **Separation of Concerns**: Input, physics, rendering, and game logic are separated

## Browser Compatibility

- Chrome 117+
- Firefox 118+
- Modern browsers with ES6 module support

## Known Issues

- **Double jump bug**: Rapidly pressing Space in platform mode can sometimes trigger mid-air jumps
- **Menu overlap**: Menu persists when scene changes if menu is open during transition

## Testing

Manual testing was performed across 25 test cases. See `TestReport.md` for detailed results.

**Test Summary:**
- Total tests: 25
- Passed: 23
- Failed: 2

## License

This project is open source and available for educational purposes.

## Contributing

This module was created as a learning project following Robert C. Martin's *Clean Code* principles. Feedback and contributions are welcome!

## Acknowledgments

- Professor Daniel Toll for guidance on code quality
- Robert C. Martin's *Clean Code* for design principles