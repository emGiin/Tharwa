const AdminSchema = require('../schemas/Admin');


class Admin {
  constructor(adminSchema) {
    Object.assign(this, adminSchema);
  }
  static async login(email, password) {
    const adminSchema = await AdminSchema.login(email, password);
    return new Admin(adminSchema);
  }
}

module.exports = Admin;
