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
            allowNull: false,
            references: {
                model: 'Conversaciones',
                key: 'id_Conversacion'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Mensaje_Privado.belongsTo(models.Conversacion, {
                foreignKey: 'id_ConversacionFK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Mensaje_Privado;
}