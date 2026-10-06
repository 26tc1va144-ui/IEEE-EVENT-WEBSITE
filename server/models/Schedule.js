// Stub model — schedule data served from eventConfig.js on client
const ScheduleStub = {
  find: () => ({ sort: () => ({ then: (r) => r([]) }), then: (r) => r([]) }),
};
module.exports = ScheduleStub;
