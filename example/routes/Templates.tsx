// Use require when you need to avoid import cycles.
const { Template } = require('./Template')

export const Templates = ['Home', 'Last'].map(
  (label, index) => () => Template({ label, index }),
)
