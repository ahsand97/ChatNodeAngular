PGDMP     .                    w            Cliente    11.3    11.3 J    j           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            k           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            l           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            m           1262    18427    Cliente    DATABASE     �   CREATE DATABASE "Cliente" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';
    DROP DATABASE "Cliente";
             postgres    false            �            1259    23769    Comunidades    TABLE     V   CREATE TABLE public."Comunidades" (
    nombre text NOT NULL,
    descripcion text
);
 !   DROP TABLE public."Comunidades";
       public         postgres    false            �            1259    23840    Comunidades_Usuarios    TABLE     �   CREATE TABLE public."Comunidades_Usuarios" (
    "id_Comunidad_Usuario" integer NOT NULL,
    "nicknameUsuario_FK" text,
    "nombreComunidad_FK" text
);
 *   DROP TABLE public."Comunidades_Usuarios";
       public         postgres    false            �            1259    23838 -   Comunidades_Usuarios_id_Comunidad_Usuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Comunidades_Usuarios_id_Comunidad_Usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 F   DROP SEQUENCE public."Comunidades_Usuarios_id_Comunidad_Usuario_seq";
       public       postgres    false    206            n           0    0 -   Comunidades_Usuarios_id_Comunidad_Usuario_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Comunidades_Usuarios_id_Comunidad_Usuario_seq" OWNED BY public."Comunidades_Usuarios"."id_Comunidad_Usuario";
            public       postgres    false    205            �            1259    23779    Conversaciones    TABLE     y   CREATE TABLE public."Conversaciones" (
    "id_Conversacion" integer NOT NULL,
    usuario_1 text,
    usuario_2 text
);
 $   DROP TABLE public."Conversaciones";
       public         postgres    false            �            1259    23777 "   Conversaciones_id_Conversacion_seq    SEQUENCE     �   CREATE SEQUENCE public."Conversaciones_id_Conversacion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Conversaciones_id_Conversacion_seq";
       public       postgres    false    199            o           0    0 "   Conversaciones_id_Conversacion_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Conversaciones_id_Conversacion_seq" OWNED BY public."Conversaciones"."id_Conversacion";
            public       postgres    false    198            �            1259    23819    Eventos    TABLE     �   CREATE TABLE public."Eventos" (
    "id_Evento" integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    fecha text NOT NULL,
    hora text NOT NULL,
    lugar text NOT NULL,
    "nicknameCreador_FK" text,
    "nombreComunidad_FK" text
);
    DROP TABLE public."Eventos";
       public         postgres    false            �            1259    23817    Eventos_id_Evento_seq    SEQUENCE     �   CREATE SEQUENCE public."Eventos_id_Evento_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Eventos_id_Evento_seq";
       public       postgres    false    204            p           0    0    Eventos_id_Evento_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."Eventos_id_Evento_seq" OWNED BY public."Eventos"."id_Evento";
            public       postgres    false    203            �            1259    23803    Mensajes_Privados    TABLE     �   CREATE TABLE public."Mensajes_Privados" (
    "id_Message" integer NOT NULL,
    body text NOT NULL,
    emisor text NOT NULL,
    receptor text NOT NULL,
    fecha_hora text NOT NULL,
    "id_ConversacionFK" integer
);
 '   DROP TABLE public."Mensajes_Privados";
       public         postgres    false            �            1259    23801     Mensajes_Privados_id_Message_seq    SEQUENCE     �   CREATE SEQUENCE public."Mensajes_Privados_id_Message_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public."Mensajes_Privados_id_Message_seq";
       public       postgres    false    202            q           0    0     Mensajes_Privados_id_Message_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public."Mensajes_Privados_id_Message_seq" OWNED BY public."Mensajes_Privados"."id_Message";
            public       postgres    false    201            �            1259    23887    Notificaciones    TABLE     �   CREATE TABLE public."Notificaciones" (
    "id_Notificacion" integer NOT NULL,
    nombre text NOT NULL,
    descripcion text,
    "idEvento_FK" integer
);
 $   DROP TABLE public."Notificaciones";
       public         postgres    false            �            1259    23903    Notificaciones_Usuarios    TABLE     �   CREATE TABLE public."Notificaciones_Usuarios" (
    "id_Notificacion_Usuario" integer NOT NULL,
    leida boolean NOT NULL,
    "idNotificacion_FK" integer,
    "nicknameUsuario_FK" text
);
 -   DROP TABLE public."Notificaciones_Usuarios";
       public         postgres    false            �            1259    23901 3   Notificaciones_Usuarios_id_Notificacion_Usuario_seq    SEQUENCE     �   CREATE SEQUENCE public."Notificaciones_Usuarios_id_Notificacion_Usuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 L   DROP SEQUENCE public."Notificaciones_Usuarios_id_Notificacion_Usuario_seq";
       public       postgres    false    212            r           0    0 3   Notificaciones_Usuarios_id_Notificacion_Usuario_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Notificaciones_Usuarios_id_Notificacion_Usuario_seq" OWNED BY public."Notificaciones_Usuarios"."id_Notificacion_Usuario";
            public       postgres    false    211            �            1259    23885 "   Notificaciones_id_Notificacion_seq    SEQUENCE     �   CREATE SEQUENCE public."Notificaciones_id_Notificacion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public."Notificaciones_id_Notificacion_seq";
       public       postgres    false    210            s           0    0 "   Notificaciones_id_Notificacion_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public."Notificaciones_id_Notificacion_seq" OWNED BY public."Notificaciones"."id_Notificacion";
            public       postgres    false    209            �            1259    23761    Salas    TABLE     P   CREATE TABLE public."Salas" (
    nombre text NOT NULL,
    descripcion text
);
    DROP TABLE public."Salas";
       public         postgres    false            �            1259    23788    Usuarios    TABLE     �   CREATE TABLE public."Usuarios" (
    nickname text NOT NULL,
    nombre text NOT NULL,
    password text NOT NULL,
    estado boolean NOT NULL,
    ubicacion text NOT NULL,
    "nombre_sala_FK" text
);
    DROP TABLE public."Usuarios";
       public         postgres    false            �            1259    23861    Usuarios_Conversaciones    TABLE     �   CREATE TABLE public."Usuarios_Conversaciones" (
    "id_Usuario_Conversacion" integer NOT NULL,
    "nicknameUsuario1_FK" text,
    "nicknameUsuario2_FK" text,
    "idConversacion_FK" integer
);
 -   DROP TABLE public."Usuarios_Conversaciones";
       public         postgres    false            �            1259    23859 3   Usuarios_Conversaciones_id_Usuario_Conversacion_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuarios_Conversaciones_id_Usuario_Conversacion_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 L   DROP SEQUENCE public."Usuarios_Conversaciones_id_Usuario_Conversacion_seq";
       public       postgres    false    208            t           0    0 3   Usuarios_Conversaciones_id_Usuario_Conversacion_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Usuarios_Conversaciones_id_Usuario_Conversacion_seq" OWNED BY public."Usuarios_Conversaciones"."id_Usuario_Conversacion";
            public       postgres    false    207            �
           2604    23843 )   Comunidades_Usuarios id_Comunidad_Usuario    DEFAULT     �   ALTER TABLE ONLY public."Comunidades_Usuarios" ALTER COLUMN "id_Comunidad_Usuario" SET DEFAULT nextval('public."Comunidades_Usuarios_id_Comunidad_Usuario_seq"'::regclass);
 \   ALTER TABLE public."Comunidades_Usuarios" ALTER COLUMN "id_Comunidad_Usuario" DROP DEFAULT;
       public       postgres    false    206    205    206            �
           2604    23782    Conversaciones id_Conversacion    DEFAULT     �   ALTER TABLE ONLY public."Conversaciones" ALTER COLUMN "id_Conversacion" SET DEFAULT nextval('public."Conversaciones_id_Conversacion_seq"'::regclass);
 Q   ALTER TABLE public."Conversaciones" ALTER COLUMN "id_Conversacion" DROP DEFAULT;
       public       postgres    false    198    199    199            �
           2604    23822    Eventos id_Evento    DEFAULT     |   ALTER TABLE ONLY public."Eventos" ALTER COLUMN "id_Evento" SET DEFAULT nextval('public."Eventos_id_Evento_seq"'::regclass);
 D   ALTER TABLE public."Eventos" ALTER COLUMN "id_Evento" DROP DEFAULT;
       public       postgres    false    203    204    204            �
           2604    23806    Mensajes_Privados id_Message    DEFAULT     �   ALTER TABLE ONLY public."Mensajes_Privados" ALTER COLUMN "id_Message" SET DEFAULT nextval('public."Mensajes_Privados_id_Message_seq"'::regclass);
 O   ALTER TABLE public."Mensajes_Privados" ALTER COLUMN "id_Message" DROP DEFAULT;
       public       postgres    false    201    202    202            �
           2604    23890    Notificaciones id_Notificacion    DEFAULT     �   ALTER TABLE ONLY public."Notificaciones" ALTER COLUMN "id_Notificacion" SET DEFAULT nextval('public."Notificaciones_id_Notificacion_seq"'::regclass);
 Q   ALTER TABLE public."Notificaciones" ALTER COLUMN "id_Notificacion" DROP DEFAULT;
       public       postgres    false    210    209    210            �
           2604    23906 /   Notificaciones_Usuarios id_Notificacion_Usuario    DEFAULT     �   ALTER TABLE ONLY public."Notificaciones_Usuarios" ALTER COLUMN "id_Notificacion_Usuario" SET DEFAULT nextval('public."Notificaciones_Usuarios_id_Notificacion_Usuario_seq"'::regclass);
 b   ALTER TABLE public."Notificaciones_Usuarios" ALTER COLUMN "id_Notificacion_Usuario" DROP DEFAULT;
       public       postgres    false    212    211    212            �
           2604    23864 /   Usuarios_Conversaciones id_Usuario_Conversacion    DEFAULT     �   ALTER TABLE ONLY public."Usuarios_Conversaciones" ALTER COLUMN "id_Usuario_Conversacion" SET DEFAULT nextval('public."Usuarios_Conversaciones_id_Usuario_Conversacion_seq"'::regclass);
 b   ALTER TABLE public."Usuarios_Conversaciones" ALTER COLUMN "id_Usuario_Conversacion" DROP DEFAULT;
       public       postgres    false    208    207    208            X          0    23769    Comunidades 
   TABLE DATA               <   COPY public."Comunidades" (nombre, descripcion) FROM stdin;
    public       postgres    false    197   �d       a          0    23840    Comunidades_Usuarios 
   TABLE DATA               t   COPY public."Comunidades_Usuarios" ("id_Comunidad_Usuario", "nicknameUsuario_FK", "nombreComunidad_FK") FROM stdin;
    public       postgres    false    206   %e       Z          0    23779    Conversaciones 
   TABLE DATA               S   COPY public."Conversaciones" ("id_Conversacion", usuario_1, usuario_2) FROM stdin;
    public       postgres    false    199   Be       _          0    23819    Eventos 
   TABLE DATA               �   COPY public."Eventos" ("id_Evento", nombre, descripcion, fecha, hora, lugar, "nicknameCreador_FK", "nombreComunidad_FK") FROM stdin;
    public       postgres    false    204   �e       ]          0    23803    Mensajes_Privados 
   TABLE DATA               t   COPY public."Mensajes_Privados" ("id_Message", body, emisor, receptor, fecha_hora, "id_ConversacionFK") FROM stdin;
    public       postgres    false    202   �e       e          0    23887    Notificaciones 
   TABLE DATA               a   COPY public."Notificaciones" ("id_Notificacion", nombre, descripcion, "idEvento_FK") FROM stdin;
    public       postgres    false    210   Rf       g          0    23903    Notificaciones_Usuarios 
   TABLE DATA               �   COPY public."Notificaciones_Usuarios" ("id_Notificacion_Usuario", leida, "idNotificacion_FK", "nicknameUsuario_FK") FROM stdin;
    public       postgres    false    212   of       W          0    23761    Salas 
   TABLE DATA               6   COPY public."Salas" (nombre, descripcion) FROM stdin;
    public       postgres    false    196   �f       [          0    23788    Usuarios 
   TABLE DATA               e   COPY public."Usuarios" (nickname, nombre, password, estado, ubicacion, "nombre_sala_FK") FROM stdin;
    public       postgres    false    200   ug       c          0    23861    Usuarios_Conversaciones 
   TABLE DATA               �   COPY public."Usuarios_Conversaciones" ("id_Usuario_Conversacion", "nicknameUsuario1_FK", "nicknameUsuario2_FK", "idConversacion_FK") FROM stdin;
    public       postgres    false    208   6h       u           0    0 -   Comunidades_Usuarios_id_Comunidad_Usuario_seq    SEQUENCE SET     ^   SELECT pg_catalog.setval('public."Comunidades_Usuarios_id_Comunidad_Usuario_seq"', 1, false);
            public       postgres    false    205            v           0    0 "   Conversaciones_id_Conversacion_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public."Conversaciones_id_Conversacion_seq"', 4, true);
            public       postgres    false    198            w           0    0    Eventos_id_Evento_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Eventos_id_Evento_seq"', 1, false);
            public       postgres    false    203            x           0    0     Mensajes_Privados_id_Message_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Mensajes_Privados_id_Message_seq"', 6, true);
            public       postgres    false    201            y           0    0 3   Notificaciones_Usuarios_id_Notificacion_Usuario_seq    SEQUENCE SET     d   SELECT pg_catalog.setval('public."Notificaciones_Usuarios_id_Notificacion_Usuario_seq"', 1, false);
            public       postgres    false    211            z           0    0 "   Notificaciones_id_Notificacion_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."Notificaciones_id_Notificacion_seq"', 1, false);
            public       postgres    false    209            {           0    0 3   Usuarios_Conversaciones_id_Usuario_Conversacion_seq    SEQUENCE SET     c   SELECT pg_catalog.setval('public."Usuarios_Conversaciones_id_Usuario_Conversacion_seq"', 4, true);
            public       postgres    false    207            �
           2606    23848 .   Comunidades_Usuarios Comunidades_Usuarios_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Comunidades_Usuarios"
    ADD CONSTRAINT "Comunidades_Usuarios_pkey" PRIMARY KEY ("id_Comunidad_Usuario");
 \   ALTER TABLE ONLY public."Comunidades_Usuarios" DROP CONSTRAINT "Comunidades_Usuarios_pkey";
       public         postgres    false    206            �
           2606    23776    Comunidades Comunidades_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Comunidades"
    ADD CONSTRAINT "Comunidades_pkey" PRIMARY KEY (nombre);
 J   ALTER TABLE ONLY public."Comunidades" DROP CONSTRAINT "Comunidades_pkey";
       public         postgres    false    197            �
           2606    23787 "   Conversaciones Conversaciones_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."Conversaciones"
    ADD CONSTRAINT "Conversaciones_pkey" PRIMARY KEY ("id_Conversacion");
 P   ALTER TABLE ONLY public."Conversaciones" DROP CONSTRAINT "Conversaciones_pkey";
       public         postgres    false    199            �
           2606    23827    Eventos Eventos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public."Eventos"
    ADD CONSTRAINT "Eventos_pkey" PRIMARY KEY ("id_Evento");
 B   ALTER TABLE ONLY public."Eventos" DROP CONSTRAINT "Eventos_pkey";
       public         postgres    false    204            �
           2606    23811 (   Mensajes_Privados Mensajes_Privados_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public."Mensajes_Privados"
    ADD CONSTRAINT "Mensajes_Privados_pkey" PRIMARY KEY ("id_Message");
 V   ALTER TABLE ONLY public."Mensajes_Privados" DROP CONSTRAINT "Mensajes_Privados_pkey";
       public         postgres    false    202            �
           2606    23911 4   Notificaciones_Usuarios Notificaciones_Usuarios_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Notificaciones_Usuarios"
    ADD CONSTRAINT "Notificaciones_Usuarios_pkey" PRIMARY KEY ("id_Notificacion_Usuario");
 b   ALTER TABLE ONLY public."Notificaciones_Usuarios" DROP CONSTRAINT "Notificaciones_Usuarios_pkey";
       public         postgres    false    212            �
           2606    23895 "   Notificaciones Notificaciones_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public."Notificaciones"
    ADD CONSTRAINT "Notificaciones_pkey" PRIMARY KEY ("id_Notificacion");
 P   ALTER TABLE ONLY public."Notificaciones" DROP CONSTRAINT "Notificaciones_pkey";
       public         postgres    false    210            �
           2606    23768    Salas Salas_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Salas"
    ADD CONSTRAINT "Salas_pkey" PRIMARY KEY (nombre);
 >   ALTER TABLE ONLY public."Salas" DROP CONSTRAINT "Salas_pkey";
       public         postgres    false    196            �
           2606    23869 4   Usuarios_Conversaciones Usuarios_Conversaciones_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios_Conversaciones"
    ADD CONSTRAINT "Usuarios_Conversaciones_pkey" PRIMARY KEY ("id_Usuario_Conversacion");
 b   ALTER TABLE ONLY public."Usuarios_Conversaciones" DROP CONSTRAINT "Usuarios_Conversaciones_pkey";
       public         postgres    false    208            �
           2606    23795    Usuarios Usuarios_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY (nickname);
 D   ALTER TABLE ONLY public."Usuarios" DROP CONSTRAINT "Usuarios_pkey";
       public         postgres    false    200            �
           2606    23849 A   Comunidades_Usuarios Comunidades_Usuarios_nicknameUsuario_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Comunidades_Usuarios"
    ADD CONSTRAINT "Comunidades_Usuarios_nicknameUsuario_FK_fkey" FOREIGN KEY ("nicknameUsuario_FK") REFERENCES public."Usuarios"(nickname) ON DELETE SET NULL;
 o   ALTER TABLE ONLY public."Comunidades_Usuarios" DROP CONSTRAINT "Comunidades_Usuarios_nicknameUsuario_FK_fkey";
       public       postgres    false    200    206    2757            �
           2606    23854 A   Comunidades_Usuarios Comunidades_Usuarios_nombreComunidad_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Comunidades_Usuarios"
    ADD CONSTRAINT "Comunidades_Usuarios_nombreComunidad_FK_fkey" FOREIGN KEY ("nombreComunidad_FK") REFERENCES public."Comunidades"(nombre) ON DELETE SET NULL;
 o   ALTER TABLE ONLY public."Comunidades_Usuarios" DROP CONSTRAINT "Comunidades_Usuarios_nombreComunidad_FK_fkey";
       public       postgres    false    197    206    2753            �
           2606    23828 '   Eventos Eventos_nicknameCreador_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Eventos"
    ADD CONSTRAINT "Eventos_nicknameCreador_FK_fkey" FOREIGN KEY ("nicknameCreador_FK") REFERENCES public."Usuarios"(nickname) ON DELETE SET NULL;
 U   ALTER TABLE ONLY public."Eventos" DROP CONSTRAINT "Eventos_nicknameCreador_FK_fkey";
       public       postgres    false    204    2757    200            �
           2606    23833 '   Eventos Eventos_nombreComunidad_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Eventos"
    ADD CONSTRAINT "Eventos_nombreComunidad_FK_fkey" FOREIGN KEY ("nombreComunidad_FK") REFERENCES public."Comunidades"(nombre) ON DELETE SET NULL;
 U   ALTER TABLE ONLY public."Eventos" DROP CONSTRAINT "Eventos_nombreComunidad_FK_fkey";
       public       postgres    false    204    2753    197            �
           2606    23812 :   Mensajes_Privados Mensajes_Privados_id_ConversacionFK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Mensajes_Privados"
    ADD CONSTRAINT "Mensajes_Privados_id_ConversacionFK_fkey" FOREIGN KEY ("id_ConversacionFK") REFERENCES public."Conversaciones"("id_Conversacion") ON DELETE SET NULL;
 h   ALTER TABLE ONLY public."Mensajes_Privados" DROP CONSTRAINT "Mensajes_Privados_id_ConversacionFK_fkey";
       public       postgres    false    2755    199    202            �
           2606    23912 F   Notificaciones_Usuarios Notificaciones_Usuarios_idNotificacion_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notificaciones_Usuarios"
    ADD CONSTRAINT "Notificaciones_Usuarios_idNotificacion_FK_fkey" FOREIGN KEY ("idNotificacion_FK") REFERENCES public."Notificaciones"("id_Notificacion") ON DELETE SET NULL;
 t   ALTER TABLE ONLY public."Notificaciones_Usuarios" DROP CONSTRAINT "Notificaciones_Usuarios_idNotificacion_FK_fkey";
       public       postgres    false    212    2767    210            �
           2606    23917 G   Notificaciones_Usuarios Notificaciones_Usuarios_nicknameUsuario_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notificaciones_Usuarios"
    ADD CONSTRAINT "Notificaciones_Usuarios_nicknameUsuario_FK_fkey" FOREIGN KEY ("nicknameUsuario_FK") REFERENCES public."Usuarios"(nickname) ON DELETE SET NULL;
 u   ALTER TABLE ONLY public."Notificaciones_Usuarios" DROP CONSTRAINT "Notificaciones_Usuarios_nicknameUsuario_FK_fkey";
       public       postgres    false    212    2757    200            �
           2606    23896 .   Notificaciones Notificaciones_idEvento_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notificaciones"
    ADD CONSTRAINT "Notificaciones_idEvento_FK_fkey" FOREIGN KEY ("idEvento_FK") REFERENCES public."Eventos"("id_Evento") ON DELETE SET NULL;
 \   ALTER TABLE ONLY public."Notificaciones" DROP CONSTRAINT "Notificaciones_idEvento_FK_fkey";
       public       postgres    false    210    2761    204            �
           2606    23880 F   Usuarios_Conversaciones Usuarios_Conversaciones_idConversacion_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios_Conversaciones"
    ADD CONSTRAINT "Usuarios_Conversaciones_idConversacion_FK_fkey" FOREIGN KEY ("idConversacion_FK") REFERENCES public."Conversaciones"("id_Conversacion") ON DELETE SET NULL;
 t   ALTER TABLE ONLY public."Usuarios_Conversaciones" DROP CONSTRAINT "Usuarios_Conversaciones_idConversacion_FK_fkey";
       public       postgres    false    208    2755    199            �
           2606    23870 H   Usuarios_Conversaciones Usuarios_Conversaciones_nicknameUsuario1_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios_Conversaciones"
    ADD CONSTRAINT "Usuarios_Conversaciones_nicknameUsuario1_FK_fkey" FOREIGN KEY ("nicknameUsuario1_FK") REFERENCES public."Usuarios"(nickname) ON DELETE SET NULL;
 v   ALTER TABLE ONLY public."Usuarios_Conversaciones" DROP CONSTRAINT "Usuarios_Conversaciones_nicknameUsuario1_FK_fkey";
       public       postgres    false    208    200    2757            �
           2606    23875 H   Usuarios_Conversaciones Usuarios_Conversaciones_nicknameUsuario2_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios_Conversaciones"
    ADD CONSTRAINT "Usuarios_Conversaciones_nicknameUsuario2_FK_fkey" FOREIGN KEY ("nicknameUsuario2_FK") REFERENCES public."Usuarios"(nickname) ON DELETE SET NULL;
 v   ALTER TABLE ONLY public."Usuarios_Conversaciones" DROP CONSTRAINT "Usuarios_Conversaciones_nicknameUsuario2_FK_fkey";
       public       postgres    false    208    2757    200            �
           2606    23796 %   Usuarios Usuarios_nombre_sala_FK_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "Usuarios_nombre_sala_FK_fkey" FOREIGN KEY ("nombre_sala_FK") REFERENCES public."Salas"(nombre) ON DELETE SET NULL;
 S   ALTER TABLE ONLY public."Usuarios" DROP CONSTRAINT "Usuarios_nombre_sala_FK_fkey";
       public       postgres    false    196    2751    200            X   0   x�s��-��LILQH.�,.�L�K�,MU(�,KT��,.-����� 0��      a      x������ � �      Z   9   x�3�,J�LI���,N,J�2��KM.I,��r��J��
L8�J�Ss��b���� 4�      _      x������ � �      ]   �   x���A� ���p
N`��Ԕ�[�fD�5X"mMz{m5�����=�},]�E����O:81(�Զ"��$muk����r��ˮD+O��ٟ���^�.�S�{7r�h�VY$k a��N·X�_���j��}�r�P�;Zi���F�y�J�      e      x������ � �      g      x������ � �      W   �   x�m�An1 ��y���R�˂ZV��ŻX�+7i�̓8r���c����-��8�[RZe�Y[n�i����H�%�D�\:�Cx$�uWX$�x�n�n���錉Gx
�;siG����"��Az;�b��ܜUlP�%x��&�^SbbU�T\IC�a<٢r�g�,ю��E�oipk�M��K߿O�x�-���:$:ouN����k����oa� �3�N      [   �   x�mN;�0��S�\�CU!~#���4UH"�A�10q�^������~�����Q��PFd�w]�T{bҌpB��h�8"���8�h��	�8����<y�2ڎ؍�9[�tQ�qPD��̆WzA����si���(�.��IfX�����zd�&��A�<��想0o8DmU;���/!�}Dk      c   ?   x�3�,J�LI���,N,J�4�2��KM.I,��q��I�E@E�\&�Y�ɩ9�0�&\1z\\\ ���     