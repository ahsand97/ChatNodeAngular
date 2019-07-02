module.exports=(sequelize, DataTypes)=>{
    const Usuario_Conversacion=sequelize.define('Usuario_Conversacion',{
        id_Usuario_Conversacion:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        nicknameUsuario1_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        nicknameUsuario2_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        idConversacion_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Conversaciones',
                key: 'id_Conversacion'
            }
        }
    },
    {
        freezeTableName: true,
        tableName: 'Usuarios_Conversaciones',
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Usuario_Conversacion.belongsTo(models.Conversacion, {
                foreignKey: 'idConversacion_FK',
                onDelete: 'SET NULL'
            });
            Usuario_Conversacion.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario1_FK',
                onDelete: 'SET NULL'
            });
            Usuario_Conversacion.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario2_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Usuario_Conversacion;
}