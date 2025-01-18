const db = require("../config/database").db;
const { v4: uuidv4 } = require("uuid");

module.exports = class Users {
  constructor(user) {
    this.user = user;
  }

  async add() {
    return new Promise((resolve, reject) => {
      const id = uuidv4();

      const crypto = require("crypto");
      const hashPassword = crypto
        .createHash("sha256")
        .update(this.user.password)
        .digest("hex");

      db.run(
        "INSERT INTO `Users` (`id`, `username`, `email`, `password`) VALUES (?, ?, ?, ?)",
        [id, this.user.username, this.user.email, hashPassword],
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  async login() {
    return new Promise((resolve, reject) => {
      const crypto = require("crypto");
      const hashPassword = crypto
        .createHash("sha256")
        .update(this.user.password)
        .digest("hex");

      db.get(
        "SELECT id FROM `Users` WHERE username = ? AND password = ?",
        [this.user.username, hashPassword],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
  }
};
