module.exports=(sequelize, DataTypes)=>{
    const Conversacion=sequelize.define('Conversacion',{
        id_Conversacion:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        usuario_1:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        usuario_2:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        tableName: 'Conversaciones',
        timestamps: false,
        classMethods:{
        associate: function(models) {
            Conversacion.hasMany(models.Mensaje_Privado, {
                foreignKey: 'id_ConversacionFK',
                onDelete: 'SET NULL'
            });
            Conversacion.hasMany(models.Usuario_Conversacion, {
                foreignKey: 'idConversacion_FK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Conversacion;
}