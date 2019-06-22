from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


BaseCliente = declarative_base()

from sqlalchemy import Column, Integer, ForeignKey, Boolean, Numeric, Table, String, Text
from sqlalchemy.orm import relationship, backref

class Usuarios(BaseCliente):
    __tablename__ = 'Usuarios'
    nickname = Column(Text, primary_key=True, nullable=False, unique=True)
    nombre = Column(Text, nullable=False)
    password = Column(Text, nullable=False)

    nombre_sala_FK = Column(Text, ForeignKey('Salas.nombre'), nullable=False)

    sala = relationship("Salas", back_populates="usuarios")
    eventos = relationship("Eventos", back_populates="usuario")
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="usuario")
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="usuario")
    '''
    usuarios_mensajesp_emisor = relationship("Usuarios_MensajesP", back_populates="emisor")
    usuarios_mensajesp_receptor = relationship("Usuarios_MensajesP", back_populates="receptor")'''

    def __repr__(self):
        return '<Usuario {}>'.format(self.nickname)

class Salas(BaseCliente):
    __tablename__ = 'Salas'
    nombre = Column(Text, primary_key=True, nullable=False, unique=True)
    descripcion = Column(Text, nullable=True)

    usuarios = relationship("Usuarios", back_populates="sala")

    def __repr__(self):
        return '<Sala {}>'.format(self.nombre)

class Eventos(BaseCliente):
    __tablename__ = 'Eventos'
    id_Evento = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)
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
    nombre = Column(Text, primary_key=True, nullable=False, unique=True)
    descripcion = Column(Text, nullable=True)

    eventos = relationship("Eventos", back_populates="comunidad")
    comunidades_usuarios = relationship("Comunidades_Usuarios", back_populates="comunidad")

    def __repr__(self):
        return '<Comunidad {}>'.format(self.nombre)

class Notificaciones(BaseCliente):
    __tablename__ = 'Notificaciones'
    id_Notificacion = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)
    nombre = Column(Text, nullable=False)
    descripcion = Column(Text, nullable=True)

    idEvento_FK = Column(Integer, ForeignKey('Eventos.id_Evento'), nullable=False)

    evento = relationship("Eventos", back_populates="notificaciones")
    notificaciones_usuarios = relationship("Notificaciones_Usuarios", back_populates="notificacion")

    def __repr__(self):
        return '<Notificacion {}>'.format(self.id_Notificacion)

class Notificaciones_Usuarios(BaseCliente):
    __tablename__ = 'Notificaciones_Usuarios'
    id_Notificacion_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)
    leida = Column(Boolean, nullable=False)

    idNotificacion_FK = Column(Integer, ForeignKey('Notificaciones.id_Notificacion'), nullable=False)
    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)

    usuario = relationship("Usuarios", back_populates="notificaciones_usuarios")
    notificacion = relationship("Notificaciones", back_populates="notificaciones_usuarios")
    
    def __repr__(self):
        return '<Notificacion_Usuario {}>'.format(self.id_Notificacion_Usuario)

class Comunidades_Usuarios(BaseCliente):
    __tablename__ = 'Comunidades_Usuarios'
    id_Comunidad_Usuario = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)

    nicknameUsuario_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    nombreComunidad_FK = Column(Text, ForeignKey('Comunidades.nombre'), nullable=False)

    comunidad = relationship("Comunidades", back_populates="comunidades_usuarios")
    usuario = relationship("Usuarios", back_populates="comunidades_usuarios")

    def __repr__(self):
        return '<Comunidad_Usuario {}>'.format(self.id_Comunidad_Usuario)

class Mensajes_Privados(BaseCliente):
    __tablename__ = 'Mensajes_Privados'
    id_Message = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)
    Body = Column(Text, nullable=False)

    usuarios_mensajesp = relationship("Usuarios_MensajesP", back_populates="mensaje")

    def __repr__(self):
        return '<Mensaje Privado {}>'.format(self.id_Message)

class Usuarios_MensajesP(BaseCliente):
    __tablename__ = 'Usuarios_MensajesPrivados'
    id_Usuario_MensajeP = Column(Integer, primary_key=True, nullable=False, autoincrement=True, unique=True)

    nicknameEmisor_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    nicknameReceptor_FK = Column(Text, ForeignKey('Usuarios.nickname'), nullable=False)
    idMensaje_FK = Column(Integer, ForeignKey('Mensajes_Privados.id_Message'), nullable=False)

    mensaje  = relationship("Mensajes_Privados", back_populates="usuarios_mensajesp")
    emisor = relationship("Usuarios", foreign_keys=[nicknameEmisor_FK])
    receptor = relationship("Usuarios", foreign_keys=[nicknameReceptor_FK])

    def __repr__(self):
        return '<Usuario_MensajeP {}>'.format(self.id_Usuario_MensajeP)



engineCliente = create_engine('postgresql+psycopg2://postgres:9706@localhost/Cliente')
BaseCliente.metadata.drop_all(engineCliente)
BaseCliente.metadata.create_all(engineCliente, checkfirst=True)
SessionCliente= sessionmaker(bind=engineCliente)
session1 = SessionCliente()
sala1=Salas(nombre="Sala 1", descripcion="Sala 1 por defecto.")
sala2=Salas(nombre="Sala 2", descripcion="Sala 2 por defecto.")
sala3=Salas(nombre="Sala 3", descripcion="Sala 3 por defecto.")
sala4=Salas(nombre="Sala 4", descripcion="Sala 4 por defecto.")
sala5=Salas(nombre="Sala 5", descripcion="Sala 5 por defecto.")
session1.add(sala1)
session1.add(sala2)
session1.add(sala3)
session1.add(sala4)
session1.add(sala5)
session1.commit()
session1.close()