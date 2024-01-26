import { Home } from '../routes/Home'
import { One } from '../routes/One'
import { OneA } from '../routes/One.A'
import { Two } from '../routes/Two'
import { TwoA } from '../routes/Two.A'

const ports = {
  '/Home': Home,
  '/One': One,
  '/One/A': OneA,
  '/Two': Two,
  '/Two/A': TwoA,
} as const

export type Port = keyof Ports | ''
export type Logistics = Partial<Omit<ShipLog, 'ports'>>

type Cargo = Record<string, any> | null
type Ports = typeof ports
type LedgerLine = { port: Port; cargo: Cargo }
type Ledger = LedgerLine[]
type Volumes = keyof ShipLog

type Getters = { [k in Volumes]: () => ShipLog[k] }
type Setters = Omit<
  { [k in Volumes]: (next: ShipLog[k]) => void },
  'ports'
>

type ShipLog = {
  current: Port
  next: Port
  cargo: Cargo
  ledger: Ledger
  ports: Ports
}

const ShipsLog = {
  current: '',
  next: '',
  cargo: null,
  ledger: [],
  ports,
} as ShipLog

export abstract class Ship {
  protected log: ShipLog
  private embarked: boolean

  constructor() {
    this.log = { ...ShipsLog }
    this.embarked = false
  }

  protected kit = (logistics?: Logistics) => {
    if (this.embarked) return
    this.log = { ...ShipsLog, ...logistics }
  }

  protected embark = () => {
    if (this.embarked) return
    this.embarked = true
  }

  public get: Getters = {
    current: () => `${this.log.current}`,
    next: () => `${this.log.next}`,
    cargo: () => ({ ...this.log.cargo }),
    ledger: () => [...this.log.ledger],
    ports: () => ({ ...this.log.ports }),
  }

  public set: Setters = {
    current: (v: Port) => {
      if (!this.embarked) return
      this.log.current = v
    },
    next: (v: Port) => {
      if (!this.embarked) return
      this.log.next = v
    },
    cargo: (v: Cargo) => {
      if (!this.embarked) return
      this.log.cargo = v
    },
    ledger: (v: Ledger) => {
      if (!this.embarked) return
      this.log.ledger = v
    },
  }
}
