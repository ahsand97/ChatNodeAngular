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
            allowNull: true,
            references: {
                model: 'Eventos',
                key: 'id_Evento'
            }
        }
    },
    {
        freezeTableName: true,
        tableName: 'Notificaciones',
        timestamps: false,
        classMethods:{
        associate: function(models) {
            Notificacion.belongsTo(models.Evento, {
                foreignKey: 'idEvento_FK',
                onDelete: 'SET NULL'
            });
            Notificacion.hasMany(models.Notificacion_Usuario, {
                foreignKey: 'idNotificacion_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Notificacion;
}