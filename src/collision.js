import { obstacles, coins } from './obstacle.js'
import { score } from './score.js'

/**
 * We where not allowed to use static but I saw that to late... 
 * Handles AABB (Axis-Aligned Bounding Box) collision detection.
 * Treats all objects as rectangles for fast collision checks.
 * Static methods used here because AABBCollider is a utility class
that provides pure collision detection functions. No instance state needed.
This follows Clean Code's principle of "Use Static When Appropriate" for
stateless utility functions (Chapter 10).
 */
export class AABBCollider {
  /**
   * Checks if two rectangles overlap.
   * @param {Object} a - First box {left, right, top, bottom}
   * @param {Object} b - Second box {left, right, top, bottom}
   * @returns {boolean}
   */
  static overlaps(a, b) {
    return a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
  }

  /**
   * Resolves player collision with obstacles.
   * 
   * Key concept: Calculate how far the player overlaps from each side, then push 
   * them out from the side with the SMALLEST overlap (that's the side they just hit).
   * 
   * @param {Object} player - Player with position, velocity, and getBounds()
   */
  static resolvePlayerVsObstacles(player) {
    let vy = player.velocityY
    let isJumping = player.isJumping
    const p = player.getBounds()

    for (const obstacle of obstacles) {
      const o = obstacle.getBounds()
      if (!this.overlaps(p, o)) continue

      // Calculate how far the player overlaps from each direction
      const overlapTop = p.bottom - o.top
      const overlapBottom = o.bottom - p.top
      const overlapLeft = p.right - o.left
      const overlapRight = o.right - p.left
      
      // The smallest overlap tells us which side they hit
      const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight)

      // Push player out based on collision side
      if (minOverlap === overlapTop && vy >= 0) {
        // Landed on top - stop falling and set grounded
        player.positionY = o.top - p.height
        vy = 0
        isJumping = false
      } else if (minOverlap === overlapBottom && vy < 0) {
        // Hit bottom (ceiling) - stop rising
        player.positionY = o.bottom
        vy = 0
      } else if (minOverlap === overlapLeft) {
        // Hit from left side
        player.positionX = o.left - p.width
      } else if (minOverlap === overlapRight) {
        // Hit from right side
        player.positionX = o.right
      }
    }

    player.velocityY = vy
    player.isJumping = isJumping
  }

  /**
   * Checks for coin pickups and removes collected coins.
   * Loops backwards so we can safely remove items while looping.
   * 
   * @param {Object} player - Player with getBounds()
   */
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