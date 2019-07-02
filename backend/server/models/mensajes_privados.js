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
        },
        emisor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        receptor:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_hora:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id_ConversacionFK:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Conversaciones',
                key: 'id_Conversacion'
            }
        }
    },
    {
        freezeTableName: true,
        tableName: 'Mensajes_Privados',
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Mensaje_Privado.belongsTo(models.Conversacion, {
                foreignKey: 'id_ConversacionFK',
                onDelete: 'SET NULL'
            });
        }
    }});
    return Mensaje_Privado;
}