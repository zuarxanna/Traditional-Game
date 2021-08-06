'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user_biodata, {
        foreignKey: 'userId',
      });
      this.hasMany(models.user_history, {
        foreignKey: 'userId',
      });
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10);
    static signup = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);

      return this.create({ username, password: encryptedPassword });
    };
    // checkPassword = bcrypt.compare(password, this.password);
    generateToken = () => {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username,
      };
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = 'secret';
      const expires = {
        expiresIn: '1h',
      };
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia, expires);
      return token;
    };
  }
  user_game.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_game',
    }
  );
  return user_game;
};
