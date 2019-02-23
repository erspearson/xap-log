import os = require('os')

import { xAP } from 'xap-framework'
import minimist from 'minimist'

export module xaplog {

  let logLevel = 2
  let sourceFilter = RegExp('.*')
  let classFilter = RegExp('.*')
  let dump = false
  let hbInterval = 300

  function die(s: string) : boolean {
    console.error(s)
    process.exit(1)
    return false
  }

  // parse arguments using Minimist library

  let argv = minimist(
    process.argv.slice(2),
    {
      string: ['level', 'class', 'source', 'dump', 'heartbeat'],
      unknown: (s) => {
        return die(`Unknown option '${s}'`)
      }
    }
  )

  if(argv.level) { logLevel = 0 + argv.level }
  if(argv.source) { try { sourceFilter = RegExp(argv.source,'i') } catch(e) { die(`Invalid source filter '${argv.source}'`)} }
  if(argv.class) { try { classFilter = RegExp(argv.class, 'i') } catch(e) { die(`Invalid class filter '${argv.class}'`)} }
  if(argv.dump) { dump = true }
  if(argv.heartbeat && typeof(argv.heartbeat) == 'number') { hbInterval = argv.heartbeat }

  function log(level: number, msg: string) : void {
    if(level <= logLevel) { console.log(`${new Date().toLocaleString()} ${msg}`) }
  }

  let network = new xAP.networkConnection({
    source: {
      vendor: 'xFx',
      device: 'logger',
      instance: os.hostname(),
    },
    hbInterval: hbInterval
  })

  network.on('connected', () => log(1,'connected'))
  network.on('connection-lost', () => log(1,'connection lost'))
  network.on('disconnected', () => log(1,'disconnected'))

  network.on('heartbeat', (hbi, remote) => { 
    if(sourceFilter.test(hbi.source) && classFilter.test(hbi.class)) {
      log(2,`${hbi.class} from ${hbi.source} (${hbi.uid})`)
    }
  })

  network.on('message', (m, remote) => { 
    const s = sourceFilter.exec(m.header.source)
    const c = classFilter.exec(m.header.class)
    if(sourceFilter.test(m.header.source) && classFilter.test(m.header.class)) {
      log(1,`${m.header.class} from ${m.header.source} (${m.header.uid})${m.blocks.length > 2 ? ` ${m.blocks.length} blocks`:''}`)
      if(dump) { console.log(m.originalText) }
      }
  })

  process.on('SIGINT', () => {
    log(0,'received SIGINT, stopping')
    network.disconnect().then(() => { process.exit(0) })
  })

  log(1, 'connecting...')
  network.connect()
  
}