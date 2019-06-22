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
        Fecha:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Hora:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Lugar:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {classMethods:{
        associate: function(models) {
            Evento.belongsTo(models.Usuario, {
                foreignKey: 'nicknameCreador_FK',
                onDelete: 'CASCADE'
            });
            Evento.belongsTo(models.Comunidad, {
                foreignKey: 'nombreComunidad_FK',
                onDelete: 'CASCADE'
            });
            Evento.hasMany(models.Notificacion, {
                foreignKey: 'idEvento_FK',
                onDelete: 'CASCADE'
            });
        }, timestamps: false
    }});
    return Evento;
}