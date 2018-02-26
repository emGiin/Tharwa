
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
Promise = require('bluebird'); // eslint-disable-line no-global-assign

mongoose.Promise = Promise;


const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      '({VALUE}) is not a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 62,
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 128,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 128,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[0-9]{10}$/,
      '({VALUE}) is not a valid mobile number.',
    ],
  },
  address: {
    type: String,
    maxLength: 255,
  },
  type: {
    type: Number,
    description: 'le type a deux valeurs:\n0 => banquier\n1 => gestionnaire\n',
    enum: [0, 1],
    default: 0,
  },

}, {
  timestamps: true,
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
adminSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});


/**
 * Methods
 */
adminSchema.method({

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },

  // toObject: ()=> {
  //   transform(doc, ret) {
  //     delete ret.password; // eslint-disable-line no-param-reassign
  //   },
  // },

});

/**
 * Statics
 */
adminSchema.statics = {
  /**
   * Get admin
   *
   * @param {ObjectId} id - The objectId of admin.
   * @returns {Promise<admin, APIError>}
   */
  async getByID(id) {
    try {
      let admin;

      if (mongoose.Types.ObjectId.isValid(id)) {
        admin = await this.findById(id).exec();
      }
      if (admin) {
        delete admin.password;
        return admin;
      }

      throw new APIError({
        message: 'admin does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get admin
   *
   * @param {String} email - The objectId of admin.
   * @returns {Promise<admin, APIError>}
   */
  async getByEmail(email) {
    try {
      const admin = await this.findOne({
        email: email.toLowerCase(),
      }).exec();

      if (admin) {
        // delete admin.password;
        return admin;
      }

      throw new APIError({
        message: 'admin does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * login an admin
   *
   * @param {String} email
   * @param {Sttring} password
   * @returns {canLogin , admin}
   */
  async login(email, password) {
    try {
      const admin = await this.getByEmail(email);
      const canLogin = await admin.passwordMatches(password);
      return { canLogin, admin };
    } catch (e) { throw e; }
  },

};

/**
 * @typedef admin
 */
module.exports = mongoose.model('Admin', adminSchema);
