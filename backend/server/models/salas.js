module.exports=(sequelize, DataTypes)=>{
    const Sala=sequelize.define('Sala',{
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
            Sala.hasMany(models.Usuario, {
                foreignKey: 'nombre_sala_FK',
                onDelete: 'CASCADE'
            });
        }, timestamps: false
    }});
    return Sala;
}