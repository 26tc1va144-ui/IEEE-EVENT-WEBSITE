// Stub model — speaker data served from eventConfig.js on client
const SpeakerStub = {
  find: () => ({ sort: () => ({ then: (r) => r([]) }), then: (r) => r([]) }),
};
module.exports = SpeakerStub;
