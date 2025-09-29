'use strict';

class GameElement {
  constructor({
    positionX = 0,
    positionY = 0,
    elementWidth = 50,
    elementHeight = 50,
    backgroundColor = 'blue'
  } = {}) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.elementWidth = elementWidth;
    this.elementHeight = elementHeight;

    this.htmlElement = document.createElement('div');
    this.htmlElement.style.position = 'absolute';
    this.htmlElement.style.background = backgroundColor;
    this.updatePosition();

    this.htmlElement.style.width = this.elementWidth + 'px';
    this.htmlElement.style.height = this.elementHeight + 'px';

    document.body.appendChild(this.htmlElement);
  }

  updatePosition() {
    this.htmlElement.style.left = this.positionX + 'px';
    this.htmlElement.style.top = this.positionY + 'px';
  }

  getBounds() {
    return {
      left: this.positionX,
      top: this.positionY,
      right: this.positionX + this.elementWidth,
      bottom: this.positionY + this.elementHeight,
      width: this.elementWidth,
      height: this.elementHeight
    }
  }

  remove() {
    this.htmlElement.remove();
  }
}

class PlayerInput {
  #scheme
  #left = false
  #right = false
  #up = false
  #down = false
  #jump = false

  constructor(scheme = 'wasd') {
    this.#scheme = scheme;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  // Encapsulation of scheme (hide string comparison)
  playerIsUsingWASD() {
    return this.#scheme === 'wasd'
  }

  playerIsUsingPlatform() {
    return this.#scheme === 'platform'
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (this.playerIsUsingWASD()) {
      if (key === 'a') this.#left = true;
      if (key === 'd') this.#right = true;
      if (key === 's') this.#down = true;
      if (key === 'w') this.#up = true;
      if (key === ' ') this.#jump = true;
    } else if (this.playerIsUsingPlatform()) {
      if (key === 'a') this.#left = true;
      if (key === 'd') this.#right = true;
      if (key === ' ') this.#jump = true;
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (this.playerIsUsingWASD()) {
      if (key === 'a') this.#left = false;
      if (key === 'd') this.#right = false;
      if (key === 's') this.#down = false;
      if (key === 'w') this.#up = false;
      if (key === ' ') this.#jump = false;
    } else if (this.playerIsUsingPlatform()) {
      if (key === 'a') this.#left = false;
      if (key === 'd') this.#right = false;
      if (key === ' ') this.#jump = false;
    }
  }

  // Query methods
  playerWantsToGoLeft()  { return this.#left }
  playerWantsToGoRight() { return this.#right }
  playerWantsToGoUp()    { return this.#up }
  playerWantsToGoDown()  { return this.#down }
  playerWantsToJump()    { return this.#jump }

  get controlScheme() { return this.#scheme }
}

const obstacles = [];
const coins = [];

class Obstacle {
  constructor({ positionX = 0, positionY = 0, width = 50, height = 50, color = 'blue', border = '2px solid white' } = {}) {
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;

    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.background = color;
    this.element.style.border = border;
    document.body.appendChild(this.element);

    obstacles.push(this);
  }

  getBounds() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      width: this.width,
      height: this.height
    }
  }

  remove() {
    this.element.remove();
  }
}

class Coin {
  constructor({ positionX = 0, positionY = 0, size = 20 } = {}) {
    this.x = positionX;
    this.y = positionY;
    this.width = size;
    this.height = size;

    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.background = 'yellow';
    this.element.style.borderRadius = '50%';
    document.body.appendChild(this.element);

    coins.push(this);
  }

  getBounds() {
    return {
      left: this.x,
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      width: this.width,
      height: this.height
    }
  }

  remove() {
    this.element.remove();
  }
}

let scoreInstance = null;

class Score {
  #value = 0
  #element = null

  constructor() {
    if (scoreInstance) return scoreInstance

    this.#element = document.createElement('div');
    this.#element.style.position = 'fixed';
    this.#element.style.top = '10px';
    this.#element.style.left = '10px';
    this.#element.style.color = 'white';
    this.#element.style.fontSize = '18px';
    this.#element.style.fontFamily = 'arial';
    this.#element.style.background = 'gray';
    this.#element.style.padding = '5px 10px';
    this.#element.style.borderRadius = '15px';
    this.#element.style.zIndex = '9999';
    document.body.appendChild(this.#element);

    this.update();
    scoreInstance = this;
  }

  add(points = 0) {
    this.#value += points;
    this.update();
  }

  reset() {
    this.#value = 0;
    this.update();
  }

  get value() {
    return this.#value
  }

  update() {
    this.#element.textContent = 'score: ' + this.#value;
  }
}

const score = new Score();

class AABBCollider {
  static overlaps(a, b) {
    return a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
  }

  static resolvePlayerVsObstacles(player) {
    let vy = player.velocityY;
    let isJumping = player.isJumping;
    const p = player.getBounds();

    for (const obstacle of obstacles) {
      const o = obstacle.getBounds();
      if (!this.overlaps(p, o)) continue

      const overlapTop = p.bottom - o.top;
      const overlapBottom = o.bottom - p.top;
      const overlapLeft = p.right - o.left;
      const overlapRight = o.right - p.left;
      const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);

      if (minOverlap === overlapTop && vy >= 0) {
        player.positionY = o.top - p.height;
        vy = 0;
        isJumping = false;
      } else if (minOverlap === overlapBottom && vy < 0) {
        player.positionY = o.bottom;
        vy = 0;
      } else if (minOverlap === overlapLeft) {
        player.positionX = o.left - p.width;
      } else if (minOverlap === overlapRight) {
        player.positionX = o.right;
      }
    }

    player.velocityY = vy;
    player.isJumping = isJumping;
  }

  static handleCoinPickups(player) {
    const p = player.getBounds();
    for (let i = coins.length - 1; i >= 0; i--) {
      const coin = coins[i];
      const c = coin.getBounds();
      if (!this.overlaps(p, c)) continue

      score.add(10);
      coin.remove();
      coins.splice(i, 1);
    }
  }
}

// Player class
class Player extends GameElement {
  constructor({ positionX = 100, positionY = 100, color = 'red' } = {}) {
    super({
      positionX,
      positionY,
      elementWidth: 60,
      elementHeight: 60,
      backgroundColor: color
    });
    this.velocityY = 0;
    this.isJumping = false;
  }

  getBounds() {
    return {
      left: this.positionX,
      top: this.positionY,
      right: this.positionX + this.elementWidth,
      bottom: this.positionY + this.elementHeight,
      width: this.elementWidth,
      height: this.elementHeight
    }
  }
}

// Game class
class Game {
  constructor(controlScheme = 'platform', options = {}) {
    this.movementSpeed = options.movementSpeed || 8;
    this.gravity = options.gravityForce || 0.5;
    this.jumpStrength = options.jumpStrengthValue || 12;

    this.player = new Player({ color: options.color || 'red' });
    this.input = new PlayerInput(controlScheme);

    this.groundY = window.innerHeight - this.player.elementHeight;

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  animate() {
    this.#animateHorizontalMovement();

    if (this.input.playerIsUsingWASD()) {
      this.#animateWASDStyle();
    } else if (this.input.playerIsUsingPlatform()) {
      this.#animatePlatformStyle();
    }

    AABBCollider.resolvePlayerVsObstacles(this.player);
    this.player.updatePosition();
    AABBCollider.handleCoinPickups(this.player);

    const sm = typeof window !== 'undefined' ? window.__sceneManager : null;
    if (sm && typeof sm.checkProgress === 'function') {
      sm.checkProgress();
    }

    requestAnimationFrame(this.animate);
  }

  // --- Private helpers ---
  #animateHorizontalMovement() {
    if (this.input.playerWantsToGoLeft() && this.player.positionX > 0) {
      this.player.positionX -= this.movementSpeed;
    }
    if (this.input.playerWantsToGoRight() && this.player.positionX < window.innerWidth - this.player.elementWidth) {
      this.player.positionX += this.movementSpeed;
    }
  }

  #animateWASDStyle() {
    if (this.input.playerWantsToGoUp() && this.player.positionY > 0) {
      this.player.positionY -= this.movementSpeed;
    }
    if (this.input.playerWantsToGoDown() && this.player.positionY < window.innerHeight - this.player.elementHeight) {
      this.player.positionY += this.movementSpeed;
    }
  }

  #animatePlatformStyle() {
    if (this.input.playerWantsToJump() && !this.player.isJumping) {
      this.player.velocityY = -this.jumpStrength;
      this.player.isJumping = true;
    }

    this.player.velocityY += this.gravity;
    this.player.positionY += this.player.velocityY;

    if (this.player.positionY >= this.groundY) {
      this.player.positionY = this.groundY;
      this.player.velocityY = 0;
      this.player.isJumping = false;
    }
  }
}

// Allow global startGame for quick demos
window.startGame = (scheme, options) => new Game(scheme, options);

class SceneManager {
  #scenes = []
  #currentIndex = 0
  #targetScore = null

  constructor() {
    const existing = typeof window !== 'undefined' ? window.__sceneManager : null;
    if (existing) return existing
    if (typeof window !== 'undefined') window.__sceneManager = this;
  }

  add(sceneFn, targetScore = null) {
    this.#scenes.push({ fn: sceneFn, targetScore });
  }

  set(index) {
    if (index < 0 || index >= this.#scenes.length) return

    for (const obs of obstacles) obs.remove();
    obstacles.length = 0;

    for (const coin of coins) coin.remove();
    coins.length = 0;

    score.reset();

    this.#currentIndex = index;
    const scene = this.#scenes[this.#currentIndex];
    this.#targetScore = scene.targetScore;
    if (typeof scene.fn === 'function') scene.fn();
  }

  checkProgress() {
    if (this.#targetScore !== null && score.value >= this.#targetScore) {
      this.next();
    }
  }

  next() {
    if (this.#currentIndex + 1 < this.#scenes.length) {
      this.set(this.#currentIndex + 1);
    } else {
      console.log('No more scenes');
    }
  }

  get index() {
    return this.#currentIndex
  }
}

class Menu {
  #element = null

  create({ title = 'Game Menu', buttons } = {}) {
    if (this.#element) this.#element.remove();

    this.#element = document.createElement('div');
    this.#element.style.position = 'fixed';
    this.#element.style.top = '0';
    this.#element.style.left = '0';
    this.#element.style.width = '100%';
    this.#element.style.height = '100%';
    this.#element.style.background = 'rgba(0,0,0,0.7)';
    this.#element.style.display = 'flex';
    this.#element.style.flexDirection = 'column';
    this.#element.style.justifyContent = 'center';
    this.#element.style.alignItems = 'center';
    this.#element.style.zIndex = '1000';

    const titleEl = document.createElement('h1');
    titleEl.textContent = title;
    titleEl.style.color = 'white';
    titleEl.style.marginBottom = '20px';
    this.#element.appendChild(titleEl);

    const defaultButtons = [
      { text: 'Restart', onClick: () => window.location.reload() },
      { text: 'Reset Score', onClick: () => score.reset() },
      { text: 'Close', onClick: () => this.close() }
    ];

    const allButtons = buttons && buttons.length ? buttons : defaultButtons;

    for (const btn of allButtons) {
      const button = document.createElement('button');
      button.textContent = btn.text;
      button.style.margin = '10px';
      button.style.padding = '10px 20px';
      button.style.fontSize = '18px';
      button.style.cursor = 'pointer';
      button.style.borderRadius = '8px';
      button.style.border = 'none';
      button.addEventListener('click', btn.onClick);
      this.#element.appendChild(button);
    }

    document.body.appendChild(this.#element);
  }

  close() {
    if (this.#element) {
      this.#element.remove();
      this.#element = null;
    }
  }
}

exports.AABBCollider = AABBCollider;
exports.Coin = Coin;
exports.Game = Game;
exports.GameElement = GameElement;
exports.Menu = Menu;
exports.Obstacle = Obstacle;
exports.PlayerInput = PlayerInput;
exports.SceneManager = SceneManager;
exports.Score = Score;
exports.coins = coins;
exports.obstacles = obstacles;
exports.score = score;
