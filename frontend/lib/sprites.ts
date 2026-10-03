/**
 * Pixel-art sprites for the section headers. Each row of `grid` is one line of
 * pixels; each character maps to a colour in `palette`, and `.` is transparent.
 * Characters listed in `blink` get the blinking cursor animation.
 */
export type Sprite = {
  grid: string[]
  palette: Record<string, string>
  blink?: string[]
}

export const briefcase: Sprite = {
  grid: [
    '...HHHHH...',
    '...H...H...',
    '.OOOOOOOOO.',
    'OLLLLLLLLLO',
    'OBBBBBBBBBO',
    'OSSMSSSMSSO',
    'OBBBBBBBBBO',
    'OBBBBBBBBBO',
    '.OOOOOOOOO.',
  ],
  palette: {
    H: '#6b6b6b',
    O: '#3a2c1e',
    L: '#b08a5c',
    B: '#8a6a43',
    S: '#5e4630',
    M: '#d4d4d4',
  },
}

export const monitor: Sprite = {
  grid: [
    'GGGGGGGGGGG',
    'GKKKKKKKKKG',
    'GKAKKKKKKKG',
    'GKKAKKKKKKG',
    'GKAKKCCKKKG',
    'GKKKKKKKKKG',
    'GGGGGGGGGGG',
    '....GGG....',
    '...GGGGG...',
  ],
  palette: {
    G: '#4a4a4a',
    K: '#161616',
    A: 'var(--px-accent)',
    C: 'var(--px-warm)',
  },
  blink: ['C'],
}

export const books: Sprite = {
  grid: [
    '.WWWWWWWW.',
    'WWWWWWWWWW',
    'PPPPPPPPPW',
    'WWWWWWWWWW',
    '.AAAAAAAAA',
    'AAAAAAAAAA',
    'APPPPPPPPP',
    'AAAAAAAAAA',
  ],
  palette: {
    W: 'var(--px-warm)',
    P: '#d4d4d4',
    A: 'var(--px-accent)',
  },
}
