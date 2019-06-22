module.exports=(sequelize, DataTypes)=>{
    const Mensaje_Privado=sequelize.define('Mensaje_Privado',{
        id_Message:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Mensaje_Privado.hasMany(models.Usuario_MensajeP, {
                foreignKey: 'idMensaje_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Mensaje_Privado;
}