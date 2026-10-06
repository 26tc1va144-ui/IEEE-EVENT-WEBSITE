const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../data.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ participants: [], admins: [] }, null, 2));
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Minimal mock for Mongoose queries
class QueryMock {
  constructor(data) {
    this.data = data;
  }
  select(fields) {
    // For our simple JSON mock, we already return all fields (including password)
    return this;
  }
  then(resolve, reject) {
    return Promise.resolve(this.data).then(resolve, reject);
  }
}

// Mock Participant Model
const Participant = {
  findOne: (query) => {
    const db = readDB();
    const result = db.participants.find(p => {
      let match = true;
      for (const key in query) {
        if (p[key] !== query[key]) match = false;
      }
      return match;
    });
    return new QueryMock(result || null);
  },
  findById: (id) => {
    const db = readDB();
    const result = db.participants.find(p => p._id === id) || null;
    if (result) {
      result.save = async function() {
        const d = readDB();
        const idx = d.participants.findIndex(x => x._id === this._id);
        if (idx !== -1) {
          d.participants[idx] = Object.assign({}, this);
          writeDB(d);
        }
      };
    }
    return new QueryMock(result);
  },
  find: (query = {}) => {
    const db = readDB();
    let results = db.participants;
    if (query.paymentStatus) {
      results = results.filter(p => p.paymentStatus === query.paymentStatus);
    }
    return {
      sort: () => ({
        limit: () => new QueryMock(results),
        skip: () => ({ limit: () => new QueryMock(results) })
      })
    };
  },
  countDocuments: (query = {}) => {
    const db = readDB();
    let results = db.participants;
    if (query.paymentStatus) {
      results = results.filter(p => p.paymentStatus === query.paymentStatus);
    }
    return new QueryMock(results.length);
  },
  create: async (data) => {
    const db = readDB();
    const newDoc = { 
      ...data, 
      _id: Date.now().toString(),
      registrationDate: new Date().toISOString()
    };
    db.participants.push(newDoc);
    writeDB(db);
    return newDoc;
  }
};

// Mock Admin Model
const Admin = {
  findOne: (query) => {
    const db = readDB();
    const admin = db.admins.find(a => a.email === query.email);
    if (admin) {
      // Mock comparePassword method
      admin.comparePassword = async function(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
      };
    }
    return new QueryMock(admin || null);
  },
  create: async (data) => {
    const db = readDB();
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newAdmin = { ...data, password: hashedPassword, _id: Date.now().toString() };
    db.admins.push(newAdmin);
    writeDB(db);
    return newAdmin;
  }
};

module.exports = { Participant, Admin, readDB, writeDB };
