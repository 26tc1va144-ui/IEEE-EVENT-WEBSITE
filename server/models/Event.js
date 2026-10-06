// Stub model — returns empty data for event info (served from eventConfig.js on client)
const EventStub = {
  findOne: () => ({ then: (r) => r(null) }),
  find: () => ({ sort: () => ({ then: (r) => r([]) }), then: (r) => r([]) }),
};
module.exports = EventStub;
