// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Base de datos
// =============================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/GrupoTech';
} else {
    urlDB = 'mongodb+srv://user-tech:Nicolas123@grupotech.elkrg.mongodb.net/group-tech'
}

process.env.URLDB = urlDB;