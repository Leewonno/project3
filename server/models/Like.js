const Like = function (sequelize, DataTypes){
    const model = sequelize.define(
        'like',
        {
            userid : {
                type: DataTypes.STRING(100),
                allowNull:false,
                primaryKey:true,
            },
        },
        {
            tableName:"like",
            freezeTableName: true,
            timestamps: false,
        }
    )

    return model;

}

module.exports = Like;