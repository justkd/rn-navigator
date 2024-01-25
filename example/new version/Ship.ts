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

type Reports = { [key in keyof ShipLog]: () => ShipLog[key] }

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
  protected log: ShipLog = { ...ShipsLog }

  protected embark = (logistics?: Logistics) => {
    this.log = { ...this.log, ...logistics }
  }

  public report: Reports = {
    current: () => `${this.log.current}`,
    next: () => `${this.log.next}`,
    cargo: () => ({ ...this.log.cargo }),
    ledger: () => [...this.log.ledger],
    ports: () => ({ ...this.log.ports }),
  }
}
