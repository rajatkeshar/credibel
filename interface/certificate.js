var _ = require('lodash');
var belriumJS = require('belrium-js');
var util = require("../utils/util");
var aesUtil = require("../utils/aesUtil");
var httpCall = require('../utils/httpCall.js');
var apiCall = require('../utils/apiCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/certificate.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

app.route.put('/certificate/final/issuance',  async function (req) {
    let validateSchema = await z_schema.validate(req.query, schema.certificate);
    let countryCode = (req.query.countryCode)? req.query.countryCode.toUpperCase(): null;
    let dappId = util.getDappID();
    let userInfo = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/info`, {email: req.query.loginEmail, dappName: app.config.dappName});
    if(userInfo.role === "superadmin" || userInfo.role === "issuer") {
      let recipientUserInfo = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/info`, {email: req.query.recipientEmail, dappName: app.config.dappName});
      if(recipientUserInfo.role == "user") {
        try {
          let checkCertsInfo = await app.model.Certificate.exists({ certsId: req.query.certsId});
          if(checkCertsInfo) return { customCode: 1014, message: "certificate already registered"};

          var options = {
            fee: String(constants.fees.finalIssuance * constants.fixedPoint),
            type: TransactionTypes.FINAL_ISSUANCE,
            args: JSON.stringify([req.query.certsId, req.query.name, req.query.recipientEmail, req.query.college, req.query.subject, req.query.issuer, req.query.authorizer])
          };

          var decryptedSecret = aesUtil.decrypt(userInfo.secret, constants.cipher.key);
          var transaction = belriumJS.dapp.createInnerTransaction(options, decryptedSecret);
          var params = { transaction: transaction };

          console.log("registerFinalIssuance data: ", params);
          var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);
          console.log("res: ", res);
          return res;
        } catch (e) {
          console.log("err: ", e);
          return {customCode: 3001, message: "something went wrong!"}
        }
      } else {
        return { customCode: 1013, message: "incorrect recipient user role: " +  recipientUserInfo.role};
      }
    } else {
      return { customCode: 4015, message: "incorrect login user role" };
    }
});
