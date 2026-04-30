import dotenv from 'dotenv';
import pkg from 'pg';
const {Pool} = pkg;

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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