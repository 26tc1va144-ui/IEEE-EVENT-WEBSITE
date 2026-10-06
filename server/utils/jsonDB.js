/**
 * In-memory database — data resets on server restart.
 * Simple and reliable — no filesystem or external DB needed.
 */
const bcrypt = require('bcryptjs');

const db = {
  participants: [],
  admins: []
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function matchQuery(doc, query) {
  return Object.keys(query).every(k => String(doc[k]) === String(query[k]));
}

function attachSave(doc) {
  if (!doc) return null;
  doc.save = async function () {
    const idx = db.participants.findIndex(p => p._id === this._id);
    if (idx !== -1) {
      const saved = { ...this };
      delete saved.save;
      db.participants[idx] = saved;
    }
  };
  return doc;
}

function cloneWithSave(doc) {
  if (!doc) return null;
  return attachSave({ ...doc });
}

// ─── Chainable Query ─────────────────────────────────────────────────────────

class Query {
  constructor(value) { this._value = value; }
  select() { return this; }
  sort(s) {
    if (Array.isArray(this._value)) {
      this._value = [...this._value].sort(
        (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
      );
    }
    return this;
  }
  limit(n) {
    if (Array.isArray(this._value)) this._value = this._value.slice(0, n);
    return this;
  }
  skip(n) {
    if (Array.isArray(this._value)) this._value = this._value.slice(n);
    return this;
  }
  then(resolve, reject) { return Promise.resolve(this._value).then(resolve, reject); }
  catch(fn) { return Promise.resolve(this._value).catch(fn); }
}

// ─── Participant ──────────────────────────────────────────────────────────────

const Participant = {
  findOne(query) {
    const doc = db.participants.find(p => matchQuery(p, query)) || null;
    return new Query(cloneWithSave(doc));
  },

  findById(id) {
    const doc = db.participants.find(p => p._id === String(id)) || null;
    return new Query(cloneWithSave(doc));
  },

  find(query = {}) {
    const results = db.participants
      .filter(p => Object.keys(query).length === 0 || matchQuery(p, query))
      .map(p => cloneWithSave({ ...p }));
    return new Query(results);
  },

  countDocuments(query = {}) {
    const count = db.participants.filter(p =>
      Object.keys(query).length === 0 || matchQuery(p, query)
    ).length;
    return new Query(count);
  },

  async create(data) {
    const newDoc = {
      ...data,
      // Ensure agreedToTerms is boolean
      agreedToTerms: data.agreedToTerms === true || data.agreedToTerms === 'true',
      _id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      registrationDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.participants.push(newDoc);
    return cloneWithSave({ ...newDoc });
  },

  async deleteOne(query) {
    const before = db.participants.length;
    db.participants = db.participants.filter(p => !matchQuery(p, query));
    return { deletedCount: before - db.participants.length };
  }
};

// ─── Admin ────────────────────────────────────────────────────────────────────

const Admin = {
  findOne(query) {
    const admin = db.admins.find(a => matchQuery(a, query)) || null;
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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newAdmin = {
      ...data,
      password: hashedPassword,
      _id: 'admin_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    db.admins.push(newAdmin);
    return { ...newAdmin };
  }
};

// ─── Seed admin on startup ────────────────────────────────────────────────────

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@ieeworkshop.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = db.admins.find(a => a.email === email);
  if (!existing) {
    await Admin.create({ email, password, name: 'Admin', role: 'admin' });
    console.log(`Admin seeded: ${email}`);
  }
}

// Seed on module load
seedAdmin().catch(console.error);

module.exports = { Participant, Admin, db };
