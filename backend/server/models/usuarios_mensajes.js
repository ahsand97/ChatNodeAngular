module.exports=(sequelize, DataTypes)=>{
    const Usuario_MensajeP=sequelize.define('Usuario_MensajeP',{
        id_Usuario_MensajeP:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        nicknameEmisor_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        nicknameReceptor_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        idMensaje_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Mensajes_Privados',
                key: 'id_Message'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Usuario_MensajeP.belongsTo(models.Mensaje_Privado, {
                foreignKey: 'idMensaje_FK',
                onDelete: 'CASCADE'
            });
            Usuario_MensajeP.belongsTo(models.Usuario, {
                foreignKey: 'nicknameEmisor_FK',
                onDelete: 'CASCADE'
            });
            Usuario_MensajeP.belongsTo(models.Usuario, {
                foreignKey: 'nicknameReceptor_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Usuario_MensajeP;
}