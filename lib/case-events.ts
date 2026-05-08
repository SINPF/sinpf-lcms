import { EventEmitter } from "events";

// In-process event bus — works for single Node.js server deployments.
// In a multi-instance setup this would be replaced with Redis pub/sub.
const caseEvents = new EventEmitter();
caseEvents.setMaxListeners(200);

export default caseEvents;
