const sql = require('mssql');

const config = {
    user: 'supreme',
    password: '1234',
    server: 'supremeacquinta',
    database: 'Reservations',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const connectDB = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to Microsoft SQL Server');
        return pool; // Return the connection pool
    } catch (err) {
        console.error('Database connection error:', err);
        throw err; // Rethrow the error to be caught in testConnection
    }
};

module.exports = connectDB;
