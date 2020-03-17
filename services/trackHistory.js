const TrackHistory = require('../models/TrackHistory');

module.exports = class TrackHistoryService {
  constructor() { }

  async setTrack(id, track) {
    return new Promise(async (resolve, reject) => {
      try {
        const createdTrack = await TrackHistory.create({
          user: id,
          track
        });
        resolve({ createdTrack })
      } catch (e) {
        reject(e);
      }
    })
  }

  async getHistory(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const trackHistory = await TrackHistory.find({ user: id }).populate('track');
        resolve(trackHistory.reverse());
      } catch (e) {
        reject(e);
      }
    })
  }
};