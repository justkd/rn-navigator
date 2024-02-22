import { Template } from './Template'

export const Templates = [
  'one',
  'two',
  'three',
  'four',
  'five',
].map((label, index) => () => Template({ label, index }))
