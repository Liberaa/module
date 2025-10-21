export const DEFAULT_VALUES = Object.freeze({
  POSITION_X: 0,
  POSITION_Y: 0,
  ELEMENT_WIDTH: 50,
  ELEMENT_HEIGHT: 50,
  COIN_SIZE: 20,
  PLAYER_WIDTH: 60,
  PLAYER_HEIGHT: 60,
  PLAYER_START_X: 100,
  PLAYER_START_Y: 100
})

export const PHYSICS = Object.freeze({
  DEFAULT_MOVEMENT_SPEED: 8,
  DEFAULT_GRAVITY: 0.5,
  DEFAULT_JUMP_STRENGTH: 12,
  VELOCITY_REVERSAL: -1,
  ZERO_VELOCITY: 0
})

export const UI_STYLES = Object.freeze({
  SCORE_TOP: '10px',
  SCORE_LEFT: '10px',
  SCORE_FONT_SIZE: '18px',
  SCORE_PADDING: '5px 10px',
  SCORE_BORDER_RADIUS: '15px',
  SCORE_Z_INDEX: '9999',
  
  MENU_Z_INDEX: '1000',
  MENU_BACKGROUND: 'rgba(0,0,0,0.7)',
  MENU_TITLE_MARGIN: '20px',
  
  BUTTON_MARGIN: '10px',
  BUTTON_PADDING: '10px 20px',
  BUTTON_FONT_SIZE: '18px',
  BUTTON_BORDER_RADIUS: '8px'
})

export const COLORS = Object.freeze({
  DEFAULT_BACKGROUND: 'blue',
  DEFAULT_PLAYER: 'red',
  COIN: 'yellow',
  SCORE_TEXT: 'white',
  SCORE_BACKGROUND: 'gray',
  MENU_TITLE: 'white',
  DEFAULT_OBSTACLE: 'blue',
  DEFAULT_BORDER: '2px solid white'
})

export const CONTROL_SCHEMES = Object.freeze({
  WASD: 'wasd',
  PLATFORM: 'platform'
})

export const KEYS = Object.freeze({
  LEFT: 'a',
  RIGHT: 'd',
  UP: 'w',
  DOWN: 's',
  JUMP: ' '
})

export const COIN_VALUE = 10

export const SCREEN_BOUNDARIES = Object.freeze({
  LEFT: 0,
  TOP: 0,
  getRight: () => window.innerWidth,
  getBottom: () => window.innerHeight
})