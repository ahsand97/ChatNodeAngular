module.exports=(sequelize, DataTypes)=>{
    const Notificacion=sequelize.define('Notificacion',{
        id_Notificacion:{
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
        idEvento_FK:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Eventos',
                key: 'id_Evento'
            }
        }
    },
    {
        timestamps: false,
        classMethods:{
        associate: function(models) {
            Notificacion.belongsTo(models.Evento, {
                foreignKey: 'idEvento_FK',
                onDelete: 'CASCADE'
            });
            Notificacion.hasMany(models.Notificacion_Usuario, {
                foreignKey: 'idNotificacion_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Notificacion;
}