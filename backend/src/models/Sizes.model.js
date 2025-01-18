const db = require("../config/database").db;

module.exports = class Categories {
  constructor(size) {
    this.size = size;
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM `Sizes`", [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  async add() {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO `Sizes` (`size`) VALUES (?)",
        [this.size.name],
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  async edit() {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE `Sizes` SET `size` = ? WHERE `id` = ?",
        [this.size.name, this.size.id],
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  async remove() {
    return new Promise((resolve, reject) => {
      db.run(
        "DELETE FROM `Sizes` WHERE `id` = ?",
        [this.size.id],
        function (err) {
          if (err) reject(err);
          resolve();
        }
      );
    });
  }

  async byProduct() {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT Sizes.size, Sizes.id FROM `Sizes` INNER JOIN Product_Sizes ON Sizes.id = Product_Sizes.size_id WHERE Product_Sizes.product_id = ?",
        [this.size.product_id],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
  }
};
