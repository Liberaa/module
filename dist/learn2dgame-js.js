class GameElement {
  constructor({
    positionX = 0,
    positionY = 0,
    elementWidth = 50,
    elementHeight = 50,
    backgroundColor = 'blue'
  } = {}) {
    this.positionX = positionX
    this.positionY = positionY
    this.elementWidth = elementWidth
    this.elementHeight = elementHeight

    this.htmlElement = document.createElement('div')
    this.htmlElement.style.position = 'absolute'
    this.htmlElement.style.background = backgroundColor
    this.updatePosition()

    this.htmlElement.style.width = this.elementWidth + 'px'
    this.htmlElement.style.height = this.elementHeight + 'px'

    document.body.appendChild(this.htmlElement)
  }

  updatePosition() {
    this.htmlElement.style.left = this.positionX + 'px'
    this.htmlElement.style.top = this.positionY + 'px'
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
    this.htmlElement.remove()
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
    this.#scheme = scheme
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  playerIsUsingWASD() {
    return this.#scheme === 'wasd'
  }

  playerIsUsingPlatform() {
    return this.#scheme === 'platform'
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase()
    if (this.playerIsUsingWASD()) {
      if (key === 'a') this.#left = true
      if (key === 'd') this.#right = true
      if (key === 's') this.#down = true
      if (key === 'w') this.#up = true
      if (key === ' ') this.#jump = true
    } else if (this.playerIsUsingPlatform()) {
      if (key === 'a') this.#left = true
      if (key === 'd') this.#right = true
      if (key === ' ') this.#jump = true
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase()
    if (this.playerIsUsingWASD()) {
      if (key === 'a') this.#left = false
      if (key === 'd') this.#right = false
      if (key === 's') this.#down = false
      if (key === 'w') this.#up = false
      if (key === ' ') this.#jump = false
    } else if (this.playerIsUsingPlatform()) {
      if (key === 'a') this.#left = false
      if (key === 'd') this.#right = false
      if (key === ' ') this.#jump = false
    }
  }

  playerWantsToGoLeft()  { return this.#left }
  playerWantsToGoRight() { return this.#right }
  playerWantsToGoUp()    { return this.#up }
  playerWantsToGoDown()  { return this.#down }
  playerWantsToJump()    { return this.#jump }

  get controlScheme() { return this.#scheme }
}

const obstacles = []
const coins = []

class Obstacle {
  constructor({ positionX = 0, positionY = 0, width = 50, height = 50, color = 'blue', border = '2px solid white' } = {}) {
    this.x = positionX
    this.y = positionY
    this.width = width
    this.height = height

    this.element = document.createElement('div')
    this.element.style.position = 'absolute'
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.background = color
    this.element.style.border = border

    // add CSS class
    this.element.classList.add('obstacle')

    document.body.appendChild(this.element)
    obstacles.push(this)
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
    this.element.remove()
  }
}

class Coin {
  constructor({ positionX = 0, positionY = 0, size = 20 } = {}) {
    this.x = positionX
    this.y = positionY
    this.width = size
    this.height = size

    this.element = document.createElement('div')
    this.element.style.position = 'absolute'
    this.element.style.left = this.x + 'px'
    this.element.style.top = this.y + 'px'
    this.element.style.width = this.width + 'px'
    this.element.style.height = this.height + 'px'
    this.element.style.background = 'yellow'
    this.element.style.borderRadius = '50%'

    // add CSS class
    this.element.classList.add('coin')

    document.body.appendChild(this.element)
    coins.push(this)
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
    this.element.remove()
  }
}

let scoreInstance = null

class Score {
  #value = 0
  #element = null

  constructor() {
    if (scoreInstance) return scoreInstance

    this.#element = document.createElement('div')
    this.#element.style.position = 'fixed'
    this.#element.style.top = '10px'
    this.#element.style.left = '10px'
    this.#element.style.color = 'white'
    this.#element.style.fontSize = '18px'
    this.#element.style.fontFamily = 'arial'
    this.#element.style.background = 'gray'
    this.#element.style.padding = '5px 10px'
    this.#element.style.borderRadius = '15px'
    this.#element.style.zIndex = '9999'
    document.body.appendChild(this.#element)

    this.update()
    scoreInstance = this
  }

  add(points = 0) {
    this.#value += points
    this.update()
  }

  reset() {
    this.#value = 0
    this.update()
  }

  get value() {
    return this.#value
  }

  update() {
    this.#element.textContent = 'score: ' + this.#value
  }
}

const score = new Score()

class AABBCollider {
  static overlaps(a, b) {
    return a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
  }

  static resolvePlayerVsObstacles(player) {
    let vy = player.velocityY
    let isJumping = player.isJumping
    const p = player.getBounds()

    for (const obstacle of obstacles) {
      const o = obstacle.getBounds()
      if (!this.overlaps(p, o)) continue

      const overlapTop = p.bottom - o.top
      const overlapBottom = o.bottom - p.top
      const overlapLeft = p.right - o.left
      const overlapRight = o.right - p.left
      const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight)

      if (minOverlap === overlapTop && vy >= 0) {
        player.positionY = o.top - p.height
        vy = 0
        isJumping = false
      } else if (minOverlap === overlapBottom && vy < 0) {
        player.positionY = o.bottom
        vy = 0
      } else if (minOverlap === overlapLeft) {
        player.positionX = o.left - p.width
      } else if (minOverlap === overlapRight) {
        player.positionX = o.right
      }
    }

    player.velocityY = vy
    player.isJumping = isJumping
  }

  static handleCoinPickups(player) {
    const p = player.getBounds()
    for (let i = coins.length - 1; i >= 0; i--) {
      const coin = coins[i]
      const c = coin.getBounds()
      if (!this.overlaps(p, c)) continue

      score.add(10)
      coin.remove()
      coins.splice(i, 1)
    }
  }
}

class Player extends GameElement {
  constructor({ positionX = 100, positionY = 100, color = 'red' } = {}) {
    super({
      positionX,
      positionY,
      elementWidth: 60,
      elementHeight: 60,
      backgroundColor: color
    })
    this.velocityY = 0
    this.isJumping = false

    // add CSS class
    this.htmlElement.classList.add('player')
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
