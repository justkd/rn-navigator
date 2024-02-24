// Use require when you need to avoid import cycles.
const { Template } = require('./Template')

export const Templates = [
  'one',
  'two',
  'three',
  'four',
  'five',
].map((label, index) => () => Template({ label, index }))
