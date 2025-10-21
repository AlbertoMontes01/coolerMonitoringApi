
---

### 🧩 **Capa por capa**

#### 1. `config/`
Contiene toda la configuración del entorno:
- Variables globales (.env)
- Conexión dinámica a SQL Server (`db.js`)

Esta capa **no contiene lógica de negocio**, solo inicializa dependencias y facilita que otras capas accedan a configuraciones comunes.

---

#### 2. `repositories/`
Encapsula toda la comunicación con la base de datos.

- Cada “repository” representa una entidad o módulo (ej. `authRepository.js`, `bitacoraRepository.js`, etc.)
- Aquí se ejecutan **queries SQL** mediante la conexión configurada en `config/db.js`.
- Ninguna otra capa debe acceder directamente a la base de datos.

💡 Ventaja: si en el futuro se cambia el motor de base de datos (por ejemplo, PostgreSQL o MongoDB), solo se modifican los repositorios.

---

#### 3. `services/`
Contiene la **lógica de negocio pura**:
- Validaciones
- Reglas operativas
- Cálculos de capacidad o temperatura
- Manejo de tokens o permisos

Los `services` utilizan a los `repositories` para obtener datos, procesarlos y devolver resultados listos para usar.

💡 Ventaja: si más adelante se integra otro backend (por ejemplo, Python para IA o analítica), esta capa será la que intercambie información sin romper el resto del sistema.

---

#### 4. `controllers/`
Actúan como **intermediarios entre las rutas HTTP y la lógica de negocio**.
- Reciben los `req` y `res` de Express.
- Llaman a los servicios correspondientes.
- Devuelven las respuestas finales al cliente (app o dashboard).

💡 Cada controlador debe ser **simple**: no contiene reglas ni queries, solo orquesta el flujo.

---

#### 5. `routes/`
Define los **endpoints REST** disponibles en la API.
Ejemplo:
```js
router.post('/login', authController.login);
