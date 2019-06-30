module.exports=(sequelize, DataTypes)=>{
    const Conversacion=sequelize.define('Conversacion',{
        id_Conversacion:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }
    },
    {
        timestamps: false,
        classMethods:{
        associate: function(models) {
            Conversacion.hasMany(models.Mensaje_Privado, {
                foreignKey: 'id_ConversacionFK',
                onDelete: 'CASCADE'
            });
            Conversacion.hasMany(models.Usuario_Conversacion, {
                foreignKey: 'idConversacion_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Conversacion;
}