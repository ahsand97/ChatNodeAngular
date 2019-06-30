module.exports=(sequelize, DataTypes)=>{
    const Usuario=sequelize.define('Usuario',{
        nickname:{
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        nombre_sala_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'SalaNull',
            references: {
                model: 'Salas',
                key: 'nombre'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Usuario.hasMany(models.Evento, {
                foreignKey: 'nicknameCreador_FK',
                onDelete: 'CASCADE'
            });
            Usuario.belongsTo(models.Sala, {
                foreignKey: 'nombre_sala_FK',
                onDelete: 'CASCADE'
            });
            Usuario.hasMany(models.Notificacion_Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'CASCADE'
            });
            Usuario.hasMany(models.Comunidad_Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'CASCADE'
            });
            Usuario.hasMany(models.Usuario_MensajeP, {
                foreignKey: 'nicknameEmisor_FK',
                onDelete: 'CASCADE'
            });
            Usuario.hasMany(models.Usuario_MensajeP, {
                foreignKey: 'nicknameReceptor_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Usuario;
}