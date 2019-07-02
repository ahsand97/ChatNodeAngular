module.exports=(sequelize, DataTypes)=>{
    const Notificacion_Usuario=sequelize.define('Notificacion_Usuario',{
        id_Notificacion_Usuario:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        leida:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idNotificacion_FK:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Notificaciones',
                key: 'id_Notificacion'
            }
        },
        nicknameUsuario_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        }
    },
    {
        freezeTableName: true,
        tableName: 'Notificaciones_Usuarios',
        timestamps: false,
        classMethods:{
        associate: function(models) {
            Notificacion_Usuario.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'SET NULL'
            });
            Notificacion_Usuario.belongsTo(models.Notificacion, {
                foreignKey: 'idNotificacion_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Notificacion_Usuario;
}