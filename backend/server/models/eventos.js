module.exports=(sequelize, DataTypes)=>{
    const Evento=sequelize.define('Evento',{
        id_Evento:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: true
        },
        fecha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        hora:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lugar:{
            type: DataTypes.STRING,
            allowNull: false
        },
        nicknameCreador_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        nombreComunidad_FK:{
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: 'Comunidades',
                key: 'nombre'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Evento.belongsTo(models.Usuario, {
                foreignKey: 'nicknameCreador_FK',
                onDelete: 'SET NULL'
            });
            Evento.belongsTo(models.Comunidad, {
                foreignKey: 'nombreComunidad_FK',
                onDelete: 'SET NULL'
            });
            Evento.hasMany(models.Notificacion, {
                foreignKey: 'idEvento_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Evento;
}