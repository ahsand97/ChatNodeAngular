module.exports=(sequelize, DataTypes)=>{
    const Comunidad_Usuario=sequelize.define('Comunidad_Usuario',{
        id_Comunidad_Usuario:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        nicknameUsuario_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'nickname'
            }
        },
        nombreComunidad_FK:{
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Comunidades',
                key: 'nombre'
            }
        }
    },
    {
        timestamps:false,
        classMethods:{
        associate: function(models) {
            Comunidad_Usuario.belongsTo(models.Usuario, {
                foreignKey: 'nicknameUsuario_FK',
                onDelete: 'CASCADE'
            });
            Comunidad_Usuario.belongsTo(models.Comunidad, {
                foreignKey: 'nombreComunidad_FK',
                onDelete: 'CASCADE'
            });
        }
    }});
    return Comunidad_Usuario;
}