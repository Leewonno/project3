const User = function (sequelize, DataTypes){
    const model = sequelize.define(
        'user',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true
            },
            userid : {
                type: DataTypes.STRING(100),
                allowNull:false,
                unique:true,
            },
            pw : {
                type: DataTypes.STRING(300),
                allowNull:false,
            }
        },
        {
            tableName:"user",
            freezeTableName: true,
            timestamps: false,
        }
    )

    return model;

}

module.exports = User;