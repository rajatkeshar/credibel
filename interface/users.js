var _ = require('lodash');
var apiCall = require('../utils/apiCall.js');
var constants = require('../utils/constants.js');
//const enum = ["issuer", "authorizer", "user"];

app.route.put('/user',  async function (req) {
    req.query.dappName = app.config.dappName;
    let loginInfo = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/info`, {email: req.query.loginEmail, dappName: app.config.dappName});
    if(loginInfo.customCode) return {customCode: 4005, message: "user does not exists"};

    if(loginInfo.role == "superadmin") {
      validateRole = true;
    }
    if(loginInfo.role == "issuer") {
      validateRole = (req.query.role == "user")? true: false;
    }
    if(!validateRole) {
      return { customCode: 4012, message: "not authorized to add this role" };
    }

    let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "PUT", `/api/dapps/${constants.centralProfileDappId}/user`, req.query);
    return response;
})

app.route.put('/user/:token',  async function (req) {
    let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "PUT", `/api/dapps/${constants.centralProfileDappId}/user/${req.params.token}`, req.query);
    return response;
});

app.route.post('/users/login',  async function (req) {
  req.query.dappName = app.config.dappName;
  let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/login`, req.query);
  return response;
});

app.route.post('/users/role/:roleType',  async function (req) {
  req.query.dappName = app.config.dappName;
  let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/role/${req.params.roleType}`, req.query);
  return response;
});

app.route.post('/users/auth/forgetPassword',  async function (req) {
  req.query.dappName = app.config.dappName;
  let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/auth/forgetPassword`, req.query);
  return response;
});

app.route.post('/users/auth/resetPassword',  async function (req) {
  req.query.dappName = app.config.dappName;
  let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "POST", `/api/dapps/${constants.centralProfileDappId}/users/auth/resetPassword`, req.query);
  return response;
});

app.route.put('/users/auth/confirmPassword/:token',  async function (req) {
  let response = await apiCall.call(constants.CENTRAL_PROFILE_URL, "PUT", `/api/dapps/${constants.centralProfileDappId}/users/auth/confirmPassword/${req.params.token}`, req.query);
  return response;
});
