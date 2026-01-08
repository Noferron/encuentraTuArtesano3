const URL_API = "http://localhost:3000/api";

// Registro usuarios
let estado = {
    usuario: null,          // 👤 Información del usuario conectado (null = nadie conectado)
    token: null,           // 🔑 Clave secreta para comunicarse con el servidor
  
};
// 💾 Guardar sesión en memoria + localStorage
function guardarSesion(token, usuario) {
  estado.token = token;
  estado.usuario = usuario;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(usuario));

  console.log('💾 Sesión guardada para:', usuario.nombre|| 'Usuario desconocido');


  
}

// 🚪 Cerrar sesión
function cerrarSesion() {
  estado.token = null;
  estado.usuario = null;

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  console.log('👋 Sesión cerrada');
  mostrarInterfaz();


}

// ⏪ Cargar sesión si ya estaba guardada en el navegador
function cargarSesionGuardada() {
  const tokenGuardado = localStorage.getItem('token');
  const usuarioGuardado = localStorage.getItem('user');

  if (tokenGuardado && usuarioGuardado) {
    try {
      estado.token = tokenGuardado;
      estado.usuario = JSON.parse(usuarioGuardado);
      console.log('👤 Sesión restaurada:', estado.usuario.nombre);
    } catch (err) {
      console.error('❌ Sesión corrupta, limpiando...', err);
      cerrarSesion();
    }
  }
}

// 🔑 LOGIN (email + password → token + usuario)
async function iniciarSesion(email, password) {
  try {
    const respuesta = await fetch(`${URL_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const datos = await respuesta.json();
    console.log('📥 Respuesta login:', respuesta.status, datos);

    if (respuesta.ok) {
      guardarSesion(datos.token, datos.usuario);
      mostrarInterfaz();
      alert(`Bienvenido, ${datos.usuario.nombre}`);
    } else {
      alert(datos.message || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('❌ Error login:', error);
    alert('No se pudo conectar con el servidor');
  }
}

// 📝 REGISTRO (nombre + email + password → crea usuario y lo loguea)
async function registrarUsuario(nombre, email, password) {
  try {
    const respuesta = await fetch(`${URL_API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });

    const datos = await respuesta.json();
    console.log('📥 Respuesta registro:', respuesta.status, datos);

    if (respuesta.ok) {
      guardarSesion(datos.token, datos.usuario);
      mostrarInterfaz();
      alert(`Cuenta creada. Bienvenido, ${datos.usuario.nombre}`);
    } else {
      alert(datos.message || 'Error al registrarse');
    }
  } catch (error) {
    console.error('❌ Error registro:', error);
    alert('No se pudo conectar con el servidor');
  }
}
// Mostrar u ocultar secciones según si hay usuario o no
function mostrarInterfaz() {
  const authSection = document.getElementById('authSection');
  const presentacion = document.getElementById('presentacion');
  const cargarDatos = document.getElementById('cargarDatos');
  const artesanos = document.getElementById('artesanos');
  const productos = document.getElementById('productos');
  const authNav     = document.getElementById('authNav'); // si lo tienes
  const formulario = document.getElementById('formulario');
  const formularioPresentacion = document.getElementById('formularioPresentacion')
  const main = document.getElementById('main');

  const logged = !!estado.usuario;

  // Formulario login/registro
  if (authSection) {
    if (logged) {
      authSection.classList.add('hidden');
      
    } else {
      authSection.classList.remove('hidden');
     
    }
  }

  // Zona de navegación (opcional)
  if (authNav) {
    if (logged) {
      authNav.innerHTML = `
        <span class="user-name">👤 ${estado.usuario.nombre} </span>
        <button id="logoutButton" class="btn btn-outline">Cerrar sesión</button>
      `;
      document.getElementById('logoutButton')
        .addEventListener('click', cerrarSesion);
    } else {
      authNav.innerHTML = `<h1><span>Inicia sesión para crear tu escaparate</span></h1>`;
    }
  }
   // Formularios 
  if(cargarDatos && presentacion && artesanos && productos){
    if(!logged){
      formulario.classList.add('hidden');
      formularioPresentacion.classList.add('hidden');
      artesanos.classList.add("hidden");
      productos.classList.add("hidden");
      main.classList.add('hidden');
    }
    else{
      formulario.classList.remove('hidden');
      formularioPresentacion.classList.remove('hidden');
      artesanos.classList.remove("hidden");
      productos.classList.remove("hidden");
      main.classList.remove('hidden');
    }
  }

}

// Conectar los formularios con las funciones de arriba
function configurarEventosLogin() {
  const loginForm    = document.getElementById('loginFormElement');
  const registerForm = document.getElementById('registerFormElement');
  const showRegister = document.getElementById('showRegister');
  const showLogin    = document.getElementById('showLogin');

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email    = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      await iniciarSesion(email, password);
      loginForm.reset();
    });
  }

  // REGISTRO
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre   = document.getElementById('registerNombre').value;
      const email    = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      await registrarUsuario(nombre, email, password);
      registerForm.reset();
    });
  }

  // Cambiar de login → registro
  if (showRegister) {
    showRegister.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('registerForm').classList.remove('hidden');
    });
  }

  // Cambiar de registro → login
  if (showLogin) {
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('registerForm').classList.add('hidden');
      document.getElementById('loginForm').classList.remove('hidden');
    });
  }
}


// Arranque básico
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 App de login/registro lista');
  mostrarInterfaz();
  cargarSesionGuardada();   // opcional, pero bonito para recordar al usuario
  configurarEventosLogin();
  
});