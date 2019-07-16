from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


BaseCliente = declarative_base()

from sqlalchemy import Column, Integer, ForeignKey, Boolean, Numeric, Table, String, Text
from sqlalchemy.orm import relationship, backref

class Usuarios(BaseCliente):
    __tablename__ = 'Usuarios'
    nickname = Column(Text, primary_key=True, nullable=False)
    nombre = Column(Text, nullable=False)
    password = Column(Text, nullable=False)
    estado = Column(Boolean, nullable=False, default=False)
    ubicacion = Column(Text, nullable=False)

    nombre_sala_FK = Column(Text, ForeignKey('Salas.nombre', ondelete='SET NULL'), nullable=True, default="SalaNull")

    sala = relationship("Salas", back_populates="usuarios")
    eventos = relationship("Eventos", back_populates="usuario", passive_deletes=True)
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="usuario", passive_deletes=True)
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="usuario", passive_deletes=True)

    def __repr__(self):
        return '<Usuario {}>'.format(self.nickname)

class Salas(BaseCliente):
    __tablename__ = 'Salas'
    nombre = Column(Text, primary_key=True, nullable=False)
    descripcion = Column(Text, nullable=True)

    usuarios = relationship("Usuarios", back_populates="sala", passive_deletes=True)

    def __repr__(self):
        return '<Sala {}>'.format(self.nombre)

class Eventos(BaseCliente):
    __tablename__ = 'Eventos'
    id_Evento = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombre = Column(Text, nullable=False)
    descripcion = Column(Text, nullable=True)
    fecha = Column(Text, nullable=False)
    hora = Column(Text, nullable=False)
    lugar = Column(Text, nullable=False)

    nicknameCreador_FK = Column(Text, ForeignKey('Usuarios.nickname', ondelete='SET NULL'), nullable=True)
    nombreComunidad_FK = Column(Text, ForeignKey('Comunidades.nombre', ondelete='SET NULL'), nullable=True)

    usuario = relationship("Usuarios", back_populates="eventos")
    comunidad = relationship("Comunidades", back_populates="eventos")
    notificaciones = relationship("Notificaciones", back_populates="evento", passive_deletes=True)

    def __repr__(self):
        return '<Evento {}>'.format(self.id_Evento)

class Comunidades(BaseCliente):
    __tablename__ = 'Comunidades'
    nombre = Column(Text, primary_key=True, nullable=False)
    descripcion = Column(Text, nullable=True)

    eventos = relationship("Eventos", back_populates="comunidad", passive_deletes=True)
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="comunidad", passive_deletes=True)

    def __repr__(self):
        return '<Comunidad {}>'.format(self.nombre)

class Notificaciones(BaseCliente):
    __tablename__ = 'Notificaciones'
    id_Notificacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombre = Column(Text, nullable=False)
    descripcion = Column(Text, nullable=True)

    idEvento_FK = Column(Integer, ForeignKey('Eventos.id_Evento', ondelete='SET NULL'), nullable=True)

    evento = relationship("Eventos", back_populates="notificaciones")
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="notificacion", passive_deletes=True)

    def __repr__(self):
        return '<Notificacion {}>'.format(self.id_Notificacion)

class Notificaciones_Usuarios(BaseCliente):
    __tablename__ = 'Notificaciones_Usuarios'
    id_Notificacion_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    leida = Column(Boolean, nullable=False)

    idNotificacion_FK = Column(Integer, ForeignKey('Notificaciones.id_Notificacion', ondelete='SET NULL'), nullable=True)
    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname', ondelete='SET NULL'), nullable=True)

    usuario = relationship("Usuarios", back_populates="notificaciones_usuarios")
    notificacion = relationship("Notificaciones", back_populates="notificaciones_usuarios")
    
    def __repr__(self):
        return '<Notificacion_Usuario {}>'.format(self.id_Notificacion_Usuario)

class Comunidades_Usuarios(BaseCliente):
    __tablename__ = 'Comunidades_Usuarios'
    id_Comunidad_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname', ondelete='SET NULL'), nullable=True)
    nombreComunidad_FK = Column(Text, ForeignKey('Comunidades.nombre', ondelete='SET NULL'), nullable=True)

    comunidad = relationship("Comunidades", back_populates="comunidades_usuarios")
    usuario = relationship("Usuarios", back_populates="comunidades_usuarios")

    def __repr__(self):
        return '<Comunidad_Usuario {}>'.format(self.id_Comunidad_Usuario)

class Mensajes_Privados(BaseCliente):
    __tablename__ = 'Mensajes_Privados'
    id_Message = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    body = Column(Text, nullable=False)
    emisor = Column(Text, nullable=False)
    receptor = Column(Text, nullable=False)
    fecha_hora = Column(Text, nullable=False)

    id_ConversacionFK = Column(Integer, ForeignKey('Conversaciones.id_Conversacion', ondelete='SET NULL'), nullable=True)


    conversacion = relationship("Conversaciones", back_populates="mensajes")

    def __repr__(self):
        return '<Mensaje Privado {}>'.format(self.id_Message)

class Conversaciones(BaseCliente):
    __tablename__ = 'Conversaciones'
    id_Conversacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    usuario_1 = Column(Text, nullable=True)
    usuario_2 = Column(Text, nullable=True)

    mensajes = relationship("Mensajes_Privados", back_populates="conversacion", passive_deletes=True)
    usuarios_conversaciones = relationship("Usuarios_Conversaciones", back_populates="conversacion")

    def __repr__(self):
        return '<Conversacion {}>'.format(self.id_Conversacion)


class Usuarios_Conversaciones(BaseCliente):
    __tablename__ = 'Usuarios_Conversaciones'
    id_Usuario_Conversacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    nicknameUsuario1_FK = Column(Text, ForeignKey('Usuarios.nickname', ondelete='SET NULL'), nullable=True)
    nicknameUsuario2_FK = Column(Text, ForeignKey('Usuarios.nickname', ondelete='SET NULL'), nullable=True)
    idConversacion_FK = Column(Integer, ForeignKey('Conversaciones.id_Conversacion', ondelete='SET NULL'), nullable=True)

    conversacion  = relationship("Conversaciones", back_populates="usuarios_conversaciones")
    usuario1 = relationship("Usuarios", foreign_keys=[nicknameUsuario1_FK], backref=backref('usuario1_conversacion', passive_deletes=True))
    usuario2 = relationship("Usuarios", foreign_keys=[nicknameUsuario2_FK], backref=backref('usuario2_conversacion', passive_deletes=True))

    def __repr__(self):
        return '<Usuarios_Conversaciones {}>'.format(self.id_Usuario_Conversacion)


engineCliente = create_engine('postgresql+psycopg2://postgres:papaya@localhost/Emprendimiento')
BaseCliente.metadata.drop_all(engineCliente)
BaseCliente.metadata.create_all(engineCliente, checkfirst=True)
SessionCliente= sessionmaker(bind=engineCliente)
session1 = SessionCliente()
salaNull=Salas(nombre="SalaNull", descripcion="Sala NULL.")

sala1=Salas(nombre="Apía", descripcion="Mensajes sala Apía.")
sala2=Salas(nombre="Balboa", descripcion="Mensajes sala Balboa.")
sala3=Salas(nombre="Belén de Umbría", descripcion="Mensajes sala Belén de Umbría.")
sala4=Salas(nombre="Dosquebradas", descripcion="Mensajes sala Dosquebradas.")
sala5=Salas(nombre="Guática", descripcion="Mensajes sala Guática.")
sala6=Salas(nombre="La Celia", descripcion="Mensajes sala La Celia.")
sala7=Salas(nombre="La Virginia", descripcion="Mensajes sala La Virginia.")
sala8=Salas(nombre="Marsella", descripcion="Mensajes sala Marsella.")
sala9=Salas(nombre="Mistrató", descripcion="Mensajes sala Mistrató.")
sala10=Salas(nombre="Pereira", descripcion="Mensajes sala Pereira.")
sala11=Salas(nombre="Pueblo Rico", descripcion="Mensajes sala Pueblo Rico.")
sala12=Salas(nombre="Quinchía", descripcion="Mensajes sala Quinchía.")
sala13=Salas(nombre="Santa Rosa de Cabal", descripcion="Mensajes sala Santa Rosa de Cabal.")
sala14=Salas(nombre="Santuario", descripcion="Mensajes sala Santuario.")



comunidad1=Comunidades(nombre="La Florida", descripcion="A veinte minutos de Pereira queda el nuevo epicentro de los deportes al aire libre, la vida bohemia y la gastronomía.Es La Florida, un corregimiento que se ha convertido en el nuevo destino para las escapadas de los pereiranos y en uno de los rincones favoritos de los viajeros.")
comunidad2=Comunidades(nombre="La Pastora", descripcion="Se trata del Centro de Visitantes La Pastora, ubicado en el Parque Regional Natural Ucumarí, uno de los cinco parques naturales regionales protegidos de Risaralda que se pueden visitar. Descubre a continuación cómo llegar, conocer y disfrutar de este paraíso natural.")
comunidad3=Comunidades(nombre="Laguna del Otún", descripcion="En el Eje Cafetero puedes disfrutar de la densidad y la magnitud de esta mágica Laguna del Otún en donde podrás experimentar diferentes pisos térmicos y conocer a través del recorrido el embalse natural, viviendo una experiencia única en Colombia.")
comunidad4=Comunidades(nombre="Cerro del Nudo", descripcion="Es un sitio sin igual, pues allí nacen las quebradas que abastecen y proporcionan agua para consumo doméstico y agrícola a muchas veredas y municipios de la región del Risaralda; es un lugar para explotar, para reencontrarse con uno mismo y con la naturaleza, para conocer los escarbaderos de cusumbos y armadillos, para oír el melodioso trinar de las aves, y así poder llegar a entender y apoyar el porqué de estas iniciativas de conservación.")
comunidad5=Comunidades(nombre="Bioparque Ukumarí", descripcion="El Parque Temático de Flora y Fauna de Pereira nació, a finales de los años noventa, como un sueño de los pereiranos. Siendo conscientes de las limitaciones de espacio y ubicación que se presentaban en el antiguo Zoológico Matecaña y considerando la gran importancia que tenía este atractivo turístico para la región, diferentes líderes de la ciudad, autoridades locales y representantes del gobierno nacional plantearon la idea de desarrollar un Bioparque que permitiera mejorar la calidad de vida a los animales del ZOO y contribuir a dinamizar la oferta turística de la región.")
comunidad6=Comunidades(nombre="Consotá", descripcion="En el Parque Consotá, cada día es una oportunidad para vivir grandes experiencias y disfrutar los diferentes escenarios y atracciones.")


session1.add(comunidad1)
session1.add(comunidad2)
session1.add(comunidad3)
session1.add(comunidad4)
session1.add(comunidad5)
session1.add(comunidad6)
session1.add(salaNull)
session1.add(sala1)
session1.add(sala2)
session1.add(sala3)
session1.add(sala4)
session1.add(sala5)
session1.add(sala6)
session1.add(sala7)
session1.add(sala8)
session1.add(sala9)
session1.add(sala10)
session1.add(sala11)
session1.add(sala12)
session1.add(sala13)
session1.add(sala14)
session1.commit()

usuario1=Usuarios(nickname="reydali", nombre="Luis David", password="reydali", ubicacion="Pereira")
usuario2=Usuarios(nickname="sara", nombre="SaraJn", password="sara", ubicacion="Pereira")
usuario3=Usuarios(nickname="nectar", nombre="Francisca Thompson", password="nectar", ubicacion="Pereira")
usuario4=Usuarios(nickname="burra", nombre="Laburra", password="burra", ubicacion="Pereira")
usuario5=Usuarios(nickname="pepegranjero", nombre="LuisDa", password="pepegranjero", ubicacion="Pereira")

session1.add(usuario1)
session1.add(usuario2)
session1.add(usuario3)
session1.add(usuario4)
session1.add(usuario5)

session1.commit()

conversaion1=Conversaciones(usuario_1="reydali", usuario_2="sara")
conversaion2=Conversaciones(usuario_1="nectar", usuario_2="reydali")
conversaion3=Conversaciones(usuario_1="reydali", usuario_2="burra")

session1.add(conversaion1)
session1.add(conversaion2)
session1.add(conversaion3)
session1.commit()

usuario_conversacion1=Usuarios_Conversaciones(nicknameUsuario1_FK="reydali", nicknameUsuario2_FK="sara", idConversacion_FK=1)
usuario_conversacion2=Usuarios_Conversaciones(nicknameUsuario1_FK="nectar", nicknameUsuario2_FK="reydali", idConversacion_FK=2)
usuario_conversacion3=Usuarios_Conversaciones(nicknameUsuario1_FK="reydali", nicknameUsuario2_FK="burra", idConversacion_FK=3)

session1.add(usuario_conversacion1)
session1.add(usuario_conversacion2)
session1.add(usuario_conversacion3)
session1.commit()

mensaje1=Mensajes_Privados(body="Hola como vas", emisor="reydali", receptor="sara", fecha_hora='01/07/2019 23:39:00', id_ConversacionFK=1)
mensaje2=Mensajes_Privados(body="bien y tu?", emisor="sara", receptor="reydali", fecha_hora='01/07/2019 23:39:20', id_ConversacionFK=1)
mensaje3=Mensajes_Privados(body="bien gracias", emisor="reydali", receptor="sara", fecha_hora='01/07/2019 23:39:30', id_ConversacionFK=1)


session1.add(mensaje1)
session1.add(mensaje2)
session1.add(mensaje3)
session1.commit()

session1.close()