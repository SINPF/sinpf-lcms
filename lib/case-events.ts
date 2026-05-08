import { EventEmitter } from "events";

// Next.js compiles server actions and API routes into separate bundles,
// so a plain module-level instance would be evaluated twice — giving each
// bundle its own emitter that never communicates. Anchoring to `global`
// ensures a single shared instance across all bundles in the same process.
const g = global as typeof global & { _caseEvents?: EventEmitter };

if (!g._caseEvents) {
  g._caseEvents = new EventEmitter();
  g._caseEvents.setMaxListeners(200);
}

const caseEvents: EventEmitter = g._caseEvents;
export default caseEvents;
