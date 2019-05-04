module.exports = {
    createEntity(row) {
        if (!row.id)
            return {};

        return {
            id: row.id,
            name: row.name,
            detail: row.detail,
            price: row.price,
            teachBy: row.teach_by, 
            createdAt: row.created_at
        }
    },
    // READ all data from table
    async findAll(pool) {
        const [rows, fields] = await pool.query('SELECT * FROM courses');
        return [rows.map(this.createEntity), fields];
    },
    // READ only one row from table
    async findById(pool, id) {
        const [rows, fields] = await pool.query('SELECT * FROM courses WHERE id = ?', [id]);
        return [[this.createEntity(rows[0])], fields];
    },
    // CREATE AND UPDATE user
    async store(pool, userObject) {
        if (!userObject.id) { // INSERT MODE if there's no id in userObject
            const sql = `
                INSERT INTO courses (
                    name, detail, price, teachBy, createdAt
                ) VALUES (
                    ?, ?, ?, ?, ?
                )
            `;
            const [result] = await pool.query(sql, [userObject.name, userObject.detail, userObject.price, userObject.teachBy, userObject.createdAt]);
            userObject.id = result.insertId; // id created automatically by inserting into mySQL
        } else { // UPDATE MODE if there's id already in userObject
            const sql = `
                UPDATE courses SET
                    name = ?,
                    detail = ?,
                    price = ?,
                    teachBy = ?,
                    createdAt = ?
                WHERE id = ?
            `;
            const result = await pool.query(sql, [userObject.name, userObject.detail, userObject.price, userObject.teachBy, userObject.createdAt, userObject.id]);
        }

        return userObject;
    },
    // DELETE only one row from table
    async remove(pool, id) {
        // TODO: delete user row by specify id
        const [rows] = await pool.query('DELETE FROM courses WHERE id = ?', [id]);
    },
    async findByPrice(pool, price) {
        // TODO: fill in to get user by specify their firstname
        const [rows, fields] = await pool.query('SELECT * FROM courses WHERE price = ?', [price]);
        return [rows.map(this.createEntity), fields];
    },


}