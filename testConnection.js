const connectDB = require('./config'); // Adjust the path as necessary

async function testConnection() {
    try {
        await connectDB(); // Call the connectDB function to establish the connection
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    } finally {
        // Since connectDB does not return a connection object, we cannot close it here.
        // If you want to close the connection, you need to modify connectDB to return the connection.
        // await sql.close(); // Uncomment this if you modify connectDB to return the connection
    }
}

testConnection();