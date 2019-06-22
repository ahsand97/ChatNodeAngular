module.exports=(sequelize, DataTypes)=>{
    const Comunidad=sequelize.define('Comunidad',{
        nombre:{
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {classMethods:{
        associate: function(models) {
            Comunidad.hasMany(models.Evento, {
                foreignKey: 'nombreComunidad_FK',
                onDelete: 'CASCADE'
            });
            Comunidad.hasMany(models.Comunidad_Usuario, {
                foreignKey: 'nombreComunidad_FK',
                onDelete: 'CASCADE'
            });
        }, timestamps: false
    }});
    return Comunidad;
}