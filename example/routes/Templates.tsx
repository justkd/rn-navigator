// Use require when you need to avoid import cycles.
const { Template } = require('./Template')

export const Templates = [
  'Home',
  'The City',
  'The Forest',
  'The Mountain',
  'The Lake',
].map((label, index) => () => Template({ label, index }))
