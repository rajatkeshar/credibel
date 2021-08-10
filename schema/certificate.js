'use strict';

var constants = require('../utils/constants.js');

module.exports = {
  certificate: {
    type: 'object',
      properties: {
        certsId: {
          type: "string",
          minLength: 1,
          maxLength: 256
        },
        name: {
          type: "string",
          maxLength: 256
        },
        college: {
          type: "number",
          minLength: 10,
          maxLength: 15
        },
        subject: {
          type: "string",
          maxLength: 256
        },
        recipientEmail: {
          type: "string",
          maxLength: 256
        },
        issuer: {
          type: "string",
          maxLength: 256
        },
        authorizer: {
          type: "string",
          maxLength: 256
        }
      },
      required: ['certsId', 'loginEmail', 'recipientEmail']
  }
};
