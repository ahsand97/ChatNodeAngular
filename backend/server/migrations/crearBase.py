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

    nombre_sala_FK = Column(Text, ForeignKey('Salas.nombre'), nullable=False, default="SalaNull")

    sala = relationship("Salas", back_populates="usuarios")
    eventos = relationship("Eventos", back_populates="usuario")
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="usuario")
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="usuario")

    def __repr__(self):
        return '<Usuario {}>'.format(self.nickname)

class Salas(BaseCliente):
    __tablename__ = 'Salas'
    nombre = Column(Text, primary_key=True, nullable=False)
    descripcion = Column(Text, nullable=True)

    usuarios = relationship("Usuarios", back_populates="sala")

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

    nicknameCreador_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    nombreComunidad_FK = Column(Text, ForeignKey('Comunidades.nombre'), nullable=False)

    usuario = relationship("Usuarios", back_populates="eventos")
    comunidad = relationship("Comunidades", back_populates="eventos")
    notificaciones = relationship("Notificaciones", back_populates="evento")

    def __repr__(self):
        return '<Evento {}>'.format(self.id_Evento)

class Comunidades(BaseCliente):
    __tablename__ = 'Comunidades'
    nombre = Column(Text, primary_key=True, nullable=False)
    descripcion = Column(Text, nullable=True)

    eventos = relationship("Eventos", back_populates="comunidad")
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="comunidad")

    def __repr__(self):
        return '<Comunidad {}>'.format(self.nombre)

class Notificaciones(BaseCliente):
    __tablename__ = 'Notificaciones'
    id_Notificacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    nombre = Column(Text, nullable=False)
    descripcion = Column(Text, nullable=True)

    idEvento_FK = Column(Integer, ForeignKey('Eventos.id_Evento'), nullable=False)

    evento = relationship("Eventos", back_populates="notificaciones")
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="notificacion")

    def __repr__(self):
        return '<Notificacion {}>'.format(self.id_Notificacion)

class Notificaciones_Usuarios(BaseCliente):
    __tablename__ = 'Notificaciones_Usuarios'
    id_Notificacion_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    leida = Column(Boolean, nullable=False)

    idNotificacion_FK = Column(Integer, ForeignKey('Notificaciones.id_Notificacion'), nullable=False)
    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)

    usuario = relationship("Usuarios", back_populates="notificaciones_usuarios")
    notificacion = relationship("Notificaciones", back_populates="notificaciones_usuarios")
    
    def __repr__(self):
        return '<Notificacion_Usuario {}>'.format(self.id_Notificacion_Usuario)

class Comunidades_Usuarios(BaseCliente):
    __tablename__ = 'Comunidades_Usuarios'
    id_Comunidad_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    nombreComunidad_FK = Column(Text, ForeignKey('Comunidades.nombre'), nullable=False)

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
    id_ConversacionFK = Column(Integer, ForeignKey('Conversaciones.id_Conversacion'), nullable=False)


    conversacion = relationship("Conversaciones", back_populates="mensajes")

    def __repr__(self):
        return '<Mensaje Privado {}>'.format(self.id_Message)

class Conversaciones(BaseCliente):
    __tablename__ = 'Conversaciones'
    id_Conversacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    mensajes = relationship("Mensajes_Privados", back_populates="conversacion")
    usuarios_conversaciones = relationship("Usuarios_Conversaciones", back_populates="conversacion")

    def __repr__(self):
        return '<Conversacion {}>'.format(self.id_Conversacion)


class Usuarios_Conversaciones(BaseCliente):
    __tablename__ = 'Usuarios_Conversaciones'
    id_Usuario_Conversacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True)

    nicknameUsuario1_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    nicknameUsuario2_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    idConversacion_FK = Column(Integer, ForeignKey('Conversaciones.id_Conversacion'), nullable=False)

    conversacion  = relationship("Conversaciones", back_populates="usuarios_conversaciones")
    usuario1 = relationship("Usuarios", foreign_keys=[nicknameUsuario1_FK])
    usuario2 = relationship("Usuarios", foreign_keys=[nicknameUsuario2_FK])

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

usuario1=Usuarios(nickname="reydali", nombre="Luis David", password="reydali")
usuario2=Usuarios(nickname="sara", nombre="SaraJn", password="sara")
usuario3=Usuarios(nickname="nectar", nombre="Francisca Thompson", password="nectar")

session1.add(usuario1)
session1.add(usuario2)
session1.add(usuario3)

session1.add(salaNull)
session1.add(sala1)
session1.add(sala2)
session1.add(sala3)
session1.add(sala4)
session1.add(sala5)
session1.commit()
session1.close()