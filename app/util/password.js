const bcrypt = require("bcrypt");
const generator = require("generate-password");
const CONFIG = require("../config");

function encrypt(plainText) {
  const salt = bcrypt.genSaltSync(parseInt(CONFIG.PASSWORD_SALT_ROUND, 10));
  const hash = bcrypt.hashSync(plainText, salt);
  return hash;
}

function compare(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

function generate() {
  const password = generator.generate({
    length: 16,
    numbers: true
  });
  return encrypt(password);
}

module.exports = {
  encrypt,
  compare,
  generate
};
