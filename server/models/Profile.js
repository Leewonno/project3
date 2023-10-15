const Profile = function (sequelize, DataTypes){
    const model = sequelize.define(
        'profile',
        {
            id : {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true
            },
            // userid : {
            //     type: DataTypes.STRING(100),
            //     allowNull:false,
            // },
            nick : {
                type: DataTypes.STRING(30),
                allowNull:false,
            },
            write_name:{
                type:DataTypes.STRING(30),
                allowNull:false,
                unique:true,
            },
            name:{
                type:DataTypes.STRING(30),
                allowNull:false,
            }
        },
        {
            tableName:"profile",
            freezeTableName: true,
            timestamps: false,
        }
    )

    return model;

}

module.exports = Profile;