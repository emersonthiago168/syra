const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Music = db.define('Music', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },
    album: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    file: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    }
});

module.exports = Music;
