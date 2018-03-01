const express = require('express');
const Admin = require('../models/Admin');

const router = express.Router();

/**
 * GET status
 */
router.get('/login', async (req, res, next) => {
  try {
    // const admin = new AdminSchema({
    //   email: 'admin@tharwa.com',
    //   password: 'admin',
    //   firstName: 'fname',
    //   lastName: 'lname',
    //   phone: '0660000000',
    // });
    // const response = await admin.save();
    // const result = await response.json();
    // console.log(response);
    // const result = await response.json();
    // res.body = result;

    const response = await Admin.login('admin@tharwa.com', 'admin');

    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
