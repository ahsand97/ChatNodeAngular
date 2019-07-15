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
        ubicacion:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_sala_FK:{
            type: DataTypes.STRING,
            allowNull: true,
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
                onDelete: 'SET NULL'
            });
            Usuario.belongsTo(models.Sala, {
                foreignKey: 'nombre_sala_FK',
                onDelete: 'SET NULL'
            });
            Usuario.hasMany(models.Notificacion_Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'SET NULL'
            });
            Usuario.hasMany(models.Comunidad_Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'SET NULL'
            });
            Usuario.hasMany(models.Usuario_Conversacion, {
                foreignKey: 'nicknameUsuario1_FK',
                onDelete: 'SET NULL'
            });
            Usuario.hasMany(models.Usuario_Conversacion, {
                foreignKey: 'nicknameUsuario2_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Usuario;
}