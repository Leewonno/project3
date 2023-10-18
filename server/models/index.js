'use strict';


const Sequelize = require('sequelize');
require('dotenv').config();
const config = require(__dirname + '/../config/config.js')["development"];
const db = {};


let sequelize = new Sequelize(config.database, config.username, config.password, config);


db.User = require("./User")(sequelize, Sequelize);
db.Novel = require("./Novel")(sequelize, Sequelize);
db.Profile = require("./Profile")(sequelize, Sequelize);
db.Like = require("./Like")(sequelize, Sequelize);
db.Round = require("./Round")(sequelize, Sequelize);

// User - Profile
db.User.hasOne(db.Profile, { foreignKey: { name: 'userid', allowNull: false, unique:true }, sourceKey: 'userid' });
db.Profile.belongsTo(db.User, { foreignKey: 'userid', sourceKey: 'userid' });

// Profile - Novel
db.Profile.hasOne(db.Novel, { foreignKey: { name: 'write_name', allowNull: false }, sourceKey: 'write_name' });
db.Novel.belongsTo(db.Profile, { foreignKey: 'write_name', sourceKey: 'write_name' });

// User - Like
db.User.hasMany(db.Like, { foreignKey: { name: 'userid', allowNull: false, primaryKey:true }, sourceKey: 'userid' });
db.Like.belongsTo(db.User, { foreignKey: 'userid', sourceKey: 'userid' });

// Novel - Like
db.Novel.hasMany(db.Like, { foreignKey: { name: 'novel_id', allowNull: false, primaryKey:true }, sourceKey: 'id' });
db.Like.belongsTo(db.Novel, { foreignKey: 'novel_id', sourceKey: 'id' });

// Novel - Round
db.Novel.hasOne(db.Round, { as: 'rounds', foreignKey: { name: 'novel_id', allowNull: false, primaryKey:true }, sourceKey: 'id' });
db.Round.belongsTo(db.Novel, { as: 'rounds', foreignKey: 'novel_id', sourceKey: 'id' });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
