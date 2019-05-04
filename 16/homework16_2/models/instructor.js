module.exports = {
    createEntity(row) {
        if (!row.id)
            return {};

        return {
            id: row.id,
            name: row.name,
            createdAt: row.created_at
        }
    },
    // READ all data from table
    async findAll(pool) {
        const [rows, fields] = await pool.query('SELECT * FROM instructors');
        return [rows.map(this.createEntity), fields];
    },
    // READ only one row from table
    async findById(pool, id) {
        const [rows, fields] = await pool.query('SELECT * FROM instructors WHERE id = ?', [id]);
        return [[this.createEntity(rows[0])], fields];
    },
    // CREATE AND UPDATE user
    async store(pool, userObject) {
        if (!userObject.id) { // INSERT MODE if there's no id in userObject
            const sql = `
                INSERT INTO instructors (
                    name, createdAt
                ) VALUES (
                    ?, ?
                )
            `;
            const [result] = await pool.query(sql, [userObject.name, userObject.createdAt]);
            userObject.id = result.insertId; // id created automatically by inserting into mySQL
        } else { // UPDATE MODE if there's id already in userObject
            const sql = `
                UPDATE instructors SET
                    name = ?,
                    createdAt = ?
                WHERE id = ?
            `;
            const result = await pool.query(sql, [userObject.name, userObject.createdAt, userObject.id]);
        }

        return userObject;
    },
    // DELETE only one row from table
    async remove(pool, id) {
        // TODO: delete user row by specify id
        const [rows] = await pool.query('DELETE FROM instructors WHERE id = ?', [id]);
    },

}