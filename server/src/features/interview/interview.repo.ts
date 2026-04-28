import pool from "../../config/db.js";
import type { ROLE, CHAT } from "./interview.model.js";

export class InterviewRepo {
    // start interview
    async createInterview(user_id: number) {
        const query = `
            INSERT INTO interview (user_id, status)
            VALUES($1, $2)
            RETURNING id, user_id, started_at, status
        `;
        const values = [user_id, "active"];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // send message
    async insertMessage (interview_id: number, role: ROLE, content: string) {
        const query = `
            INSERT INTO chat (interview_id, role, content)
            VALUES($1, $2, $3)
            RETURNING id, interview_id, role, content, timestamp
        `;
        const values = [interview_id, role, content];

        const message = await pool.query(query, values);
        return message.rows[0];
    }

    // see conversation
    async fetchMessages (interview_id: number) {
        const query = `
            SELECT * FROM chat
            WHERE interview_id = $1
            ORDER BY timestamp ASC
        `;
        const values = [interview_id];

        const allMessages = await pool.query(query, values);
        return allMessages.rows;
    }

    // end interview
    async endInterview(id: number) {
        const query = `
            UPDATE interview
            SET status = $1
            WHERE id = $2
            RETURNING *
        `;
        const values = ["completed", id];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}