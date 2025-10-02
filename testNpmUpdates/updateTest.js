// Importera från din dist
import { Game, Obstacle, Coin, SceneManager, score, Menu } from '../dist/learn2dgame-js.js'

// Menu för att testa att UI fortfarande funkar
const menu = new Menu()
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'm') {
    menu.create({
      title: 'Pause',
      buttons: [
        { text: 'Resume', onClick: () => menu.close() },
        { text: 'Reset Score', onClick: () => score.reset() }
      ]
    })
  }
})

// Scene Manager
const scenes = new SceneManager()

// Första banan – test av ALLA obstacle features
function level1() {
  new Obstacle({ id: 'static', positionX: 100, positionY: 600, width: 80, height: 50, color: 'purple' })
  new Obstacle({ id: 'move-x', positionX: 300, positionY: 500, width: 80, height: 50, color: 'blue', velocityX: 3 })
  new Obstacle({ id: 'move-y', positionX: 600, positionY: 400, width: 80, height: 50, color: 'green', velocityY: 2 })
  new Obstacle({ id: 'disappear', positionX: 900, positionY: 300, width: 100, height: 20, color: 'orange', disappearOnLand: true })
  new Obstacle({ id: 'deadly', positionX: 1200, positionY: 200, width: 100, height: 20, color: 'red', deadly: true })

  new Coin({ id: 'coin1', positionX: 500, positionY: 250 })
  new Coin({ id: 'coin2', positionX: 1300, positionY: 100 })
}

// Andra banan – enkel plattform + coin för att testa SceneManager hoppar vidare
function level2() {
  new Obstacle({ id: 'level2-plat', positionX: 200, positionY: 500, width: 200, height: 20, color: 'brown' })
  new Coin({ id: 'level2-coin', positionX: 250, positionY: 450 })
}

// Lägg till banorna
scenes.add(level1, 20)  // kräver 20 poäng (2 coins * 10p + 2 coins till nästa bana)
scenes.add(level2, 10)  // kräver 10 poäng till för att klara level2
scenes.set(0)

// Starta spelet – WASD styrning + gravity test
new Game('wasd', {
  movementSpeed: 5,
  jumpStrengthValue: 15, // hopphöjd
  gravityForce: 0.7,     // starkare gravity för test
  color: 'black'
})
