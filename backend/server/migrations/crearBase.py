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



engineCliente = create_engine('postgresql+psycopg2://postgres:9706@localhost/Cliente')
BaseCliente.metadata.drop_all(engineCliente)
BaseCliente.metadata.create_all(engineCliente, checkfirst=True)
SessionCliente= sessionmaker(bind=engineCliente)
session1 = SessionCliente()
salaNull=Salas(nombre="SalaNull", descripcion="Sala NULL.")
sala1=Salas(nombre="Sala 1", descripcion="Sala 1 por defecto.")
sala2=Salas(nombre="Sala 2", descripcion="Sala 2 por defecto.")
sala3=Salas(nombre="Sala 3", descripcion="Sala 3 por defecto.")
sala4=Salas(nombre="Sala 4", descripcion="Sala 4 por defecto.")
sala5=Salas(nombre="Sala 5", descripcion="Sala 5 por defecto.")

session1.add(salaNull)
session1.add(sala1)
session1.add(sala2)
session1.add(sala3)
session1.add(sala4)
session1.add(sala5)
session1.commit()

usuario1=Usuarios(nickname="reydali", nombre="Luis David", password="reydali")
usuario2=Usuarios(nickname="sara", nombre="SaraJn", password="sara")
usuario3=Usuarios(nickname="nectar", nombre="Francisca Thompson", password="nectar")
usuario4=Usuarios(nickname="burra", nombre="Laburra", password="burra")

session1.add(usuario1)
session1.add(usuario2)
session1.add(usuario3)
session1.add(usuario4)
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