const { Sequelize } = require("sequelize");

const Novel = function (sequelize, DataTypes){
    const model = sequelize.define(
        'novel',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true
            },
            // write_name : {
            //     type: DataTypes.STRING(30),
            //     allowNull:false,
            // },
            name : {
                type: DataTypes.STRING(30),
                allowNull:false,
            },
            summary:{
                type:DataTypes.STRING(500),
                allowNull:false,
            },
            cover_img:{
                type:DataTypes.STRING(150),
                allowNull:false,
            },
            genre:{
                type:DataTypes.STRING(20),
                allowNull:false,
            },
            round:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0,
            },
            total_view:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0,
            },
            like:{
                type:DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            createDate:{
                type:DataTypes.DATE,
                defaultValue: Sequelize.NOW,
                allowNull:false,
            },
        },
        {
            tableName:"novel",
            freezeTableName: true,
            timestamps: false,
        }
    )

    return model;

}

module.exports = Novel;