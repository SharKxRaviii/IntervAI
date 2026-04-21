import dotenv from 'dotenv';
import pkg from 'pg';
const {Pool} = pkg;

dotenv.config();

const pool = new Pool ({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASS
});


export const connectToDB = async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL connected");
        client.release();  
    } catch (error) {
        console.error("PostgreSQL connection failed", error);
        process.exit(1);
    }
}

export default pool;