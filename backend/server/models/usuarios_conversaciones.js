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
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        nicknameUsuario2_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        idConversacion_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Conversaciones',
                key: 'id_Conversacion'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Usuario_Conversacion.belongsTo(models.Conversacion, {
                foreignKey: 'idConversacion_FK',
                onDelete: 'CASCADE'
            });
            Usuario_Conversacion.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario1_FK',
                onDelete: 'CASCADE'
            });
            Usuario_Conversacion.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario2_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Usuario_Conversacion;
}