// DENNA DEL ÄR CHATGPT PÅGRUND AV ATT JAG VILL TESTA TILL MINA NPM ANVÄNDARE :
// SOM VILL HA VISSA FEUTURES SOM JAG INTE BRYR MIG OM. 
import { Game, Obstacle, Coin, SceneManager, score, Menu } from '../dist/learn2dgame-js.js'

// --- Scene setup ---
const scenes = new SceneManager()

function level1() {
    new Obstacle({ id: 'static', positionX: 100, positionY: 600, width: 80, height: 50, color: 'purple' })
    new Obstacle({ id: 'move-x', positionX: 300, positionY: 500, width: 80, height: 50, color: 'blue', velocityX: 3 })
    new Obstacle({ id: 'move-y', positionX: 600, positionY: 400, width: 80, height: 50, color: 'green', velocityY: 2 })
    new Obstacle({ id: 'disappear', positionX: 900, positionY: 300, width: 100, height: 20, color: 'orange', disappearOnLand: true })
    new Obstacle({ id: 'deadly', positionX: 1200, positionY: 200, width: 100, height: 20, color: 'red', deadly: true })

    new Coin({ id: 'coin1', positionX: 500, positionY: 250 })
    new Coin({ id: 'coin2', positionX: 1300, positionY: 100 })
}

function level2() {
    new Obstacle({ id: 'level2-plat', positionX: 200, positionY: 500, width: 200, height: 20, color: 'brown' })
    new Coin({ id: 'level2-coin', positionX: 250, positionY: 450 })
}

scenes.add(level1, 20)
scenes.add(level2, 10)
scenes.set(0)

// --- Create ONE game instance ---
const game = new Game('platform', {
    movementSpeed: 5,
    jumpStrengthValue: 35,
    gravityForce: 0.7,
    color: 'black'
})

// --- Menu setup ---
const menu = new Menu()
document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'm') {
        menu.create({
            title: 'Pause',
            buttons: [
                { text: 'Resume', onClick: () => menu.close() },
                { text: 'Reset Score', onClick: () => score.reset() },
                { text: 'Restart Game', onClick: () => window.location.reload() }
            ]
        })
    }
})
