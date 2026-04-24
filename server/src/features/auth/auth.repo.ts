import pool from "../../config/db.js";

export class UserRepo {
    async register(email: string, password:string){
        const query = `
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING id, email, created_at
        `;
        const values = [email, password];

        const result = await pool.query(query, values);

        return result.rows[0];
    }
}