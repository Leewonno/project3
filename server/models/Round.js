const { Sequelize } = require("sequelize");

const Round = function (sequelize, DataTypes){
    const model = sequelize.define(
        'round',
        {
            round : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
            },
            content:{
                type:DataTypes.TEXT,
                allowNull:false,
            },
            title:{
                type:DataTypes.STRING(100),
                allowNull:false,
            },
            createDate:{
                type:DataTypes.DATE,
                defaultValue: Sequelize.NOW,
                allowNull:false,
            },
            writer_comment:{
                type:DataTypes.STRING(1000),
                allowNull:false,
            },
            view:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0,
            },
            like:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0,
            }
        },
        {
            tableName:"round",
            freezeTableName: true,
            timestamps: false,
        }
    )

    return model;

}

module.exports = Round;