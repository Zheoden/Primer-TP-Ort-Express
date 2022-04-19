import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const pizzaTabla = process.env.DB_TABLA_PIZZA;

export class PizzaService {

    getPizza = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request().query(`SELECT * from ${pizzaTabla}`);
        console.log(response)

        return response.recordset;
    }

    getPizzaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${pizzaTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    createPizza = async (pizza) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Nombre',sql.NChar, pizza?.nombre ?? '')
            .input('LibreGluten',sql.Bit, pizza?.libreGluten ?? false)
            .input('Importe',sql.NChar, pizza?.importe ?? 0)
            .input('Descripcion',sql.NChar, pizza?.description ?? '')
            .query(`INSERT INTO ${pizzaTabla}(Nombre, LibreGluten, Importe, Descripcion) VALUES (@Nombre, @LibreGluten, @Importe, @Descripcion)`);
        console.log(response)

        return response.recordset;
    }

    updatePizzaById = async (id, pizza) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.NChar, pizza?.nombre ?? '')
            .input('LibreGluten',sql.Bit, pizza?.libreGluten ?? false)
            .input('Importe',sql.NChar, pizza?.importe ?? 0)
            .input('Descripcion',sql.NChar, pizza?.description ?? '')
            .query(`UPDATE Pizzas SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deletePizzaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${pizzaTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}