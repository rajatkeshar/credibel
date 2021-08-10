var constants = require('../utils/constants.js');
module.exports = {
  registerFinalIssuance: async function(certsId, name, rEmail, college, subject, issuer, authorizer) {
    console.log("calling contract registerFinalIssuance: ", this);
    app.sdb.lock('certificate.registerFinalIssuance@' + email);
    app.sdb.create('Certificate', {
      certsId: certsId,
      name: name,
      college: college,
      subject: subject,
      issuer: issuer,
      authorizer: authorizer,
      recipientEmail: rEmail,
      senderId: this.senderId,
      timestamp: this.trs.timestamp,
      transactionId: this.trs.id
    });
  }
}