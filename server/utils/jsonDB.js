const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, '../data.json');

// Initialize DB if not exists
function ensureDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ participants: [], admins: [] }, null, 2));
  }
}

function readDB() {
  ensureDB();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Attach save() method to a participant doc
function attachSave(doc) {
  if (!doc) return doc;
  doc.save = async function () {
    const db = readDB();
    const idx = db.participants.findIndex(p => p._id === this._id);
    if (idx !== -1) {
      const saved = Object.assign({}, this);
      delete saved.save;
      db.participants[idx] = saved;
      writeDB(db);
    }
  };
  return doc;
}

// Chainable query wrapper
class Query {
  constructor(value) {
    this._value = value;
  }
  select() { return this; }
  sort() { return this; }
  limit(n) {
    if (Array.isArray(this._value)) this._value = this._value.slice(0, n);
    return this;
  }
  skip(n) {
    if (Array.isArray(this._value)) this._value = this._value.slice(n);
    return this;
  }
  then(resolve, reject) {
    return Promise.resolve(this._value).then(resolve, reject);
  }
  catch(reject) {
    return Promise.resolve(this._value).catch(reject);
  }
}

// ─── Participant Model ────────────────────────────────────────────────────────

const Participant = {
  findOne(query) {
    const db = readDB();
    const doc = db.participants.find(p =>
      Object.keys(query).every(k => p[k] === query[k])
    ) || null;
    return new Query(attachSave(doc ? { ...doc } : null));
  },

  findById(id) {
    const db = readDB();
    const doc = db.participants.find(p => p._id === id) || null;
    return new Query(attachSave(doc ? { ...doc } : null));
  },

  find(query = {}) {
    const db = readDB();
    let results = db.participants.filter(p =>
      Object.keys(query).every(k => p[k] === query[k])
    );
    // Return a chainable object that resolves to array
    const q = new Query(results.map(d => attachSave({ ...d })));
    q.sort = (sortObj) => {
      // basic sort by createdAt desc
      q._value = q._value.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
      return q;
    };
    return q;
  },

  countDocuments(query = {}) {
    const db = readDB();
    const count = db.participants.filter(p =>
      Object.keys(query).every(k => p[k] === query[k])
    ).length;
    return new Query(count);
  },

  async create(data) {
    const db = readDB();
    const newDoc = {
      ...data,
      _id: Date.now().toString() + Math.random().toString(36).slice(2),
      registrationDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.participants.push(newDoc);
    writeDB(db);
    return attachSave({ ...newDoc });
  },

  async deleteOne(query) {
    const db = readDB();
    const before = db.participants.length;
    db.participants = db.participants.filter(p =>
      !Object.keys(query).every(k => p[k] === query[k])
    );
    writeDB(db);
    return { deletedCount: before - db.participants.length };
  }
};

// ─── Admin Model ─────────────────────────────────────────────────────────────

const Admin = {
  findOne(query) {
    const db = readDB();
    const admin = db.admins.find(a =>
      Object.keys(query).every(k => a[k] === query[k])
    ) || null;
    if (admin) {
      const doc = { ...admin };
      doc.comparePassword = async function (candidate) {
        return bcrypt.compare(candidate, this.password);
      };
      return new Query(doc);
    }
    return new Query(null);
  },

  async create(data) {
    const db = readDB();
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newAdmin = {
      ...data,
      password: hashedPassword,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    db.admins.push(newAdmin);
    writeDB(db);
    return { ...newAdmin };
  }
};

module.exports = { Participant, Admin, readDB, writeDB };
