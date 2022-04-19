import sql from 'mssql'
import config from '../../db.js'

export class PizzaService {
    constructor() {
        this.pool = sql.connect(config);
    }

    getPizza = async () => {
        console.log('This is a function on the service');
        const response = await pool.Request().query('SELECT * from [dbo].[Pizza]');
        console.log(response)

        return response;
    }

    getPizzaById = async (id) => {
        console.log('This is a function on the service');
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query('SELECT * from [dbo].[Pizza] where id = @id');
        console.log(response)

        return response;
    }

    createPizza = async (pizza) => {
        console.log('This is a function on the service');
        const response = await pool.request()
            .input('Nombre',sql.NChar, pizza?.nombre ?? '')
            .input('LibreGluten',sql.Bit, pizza?.libreGluten ?? false)
            .input('Importe',sql.NChar, pizza?.importe ?? 0)
            .input('Descripcion',sql.NChar, pizza?.description ?? '')
            .query('INSERT INTO [dbo].[Pizza](Nombre, LibreGluten, Importe, Descripcion) VALUES (@Nombre, @LibreGluten, @Importe, @Descripcion)');
        console.log(response)

        return response;
    }

    updatePizzaById = async (id, pizza) => {
        console.log('This is a function on the service');
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.NChar, pizza?.nombre ?? '')
            .input('LibreGluten',sql.Bit, pizza?.libreGluten ?? false)
            .input('Importe',sql.NChar, pizza?.importe ?? 0)
            .input('Descripcion',sql.NChar, pizza?.description ?? '')
            .query('UPDATE Pizzas SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE id = @Id');
        console.log(response)

        return response;
    }

    deletePizzaById = async (id) => {
        console.log('This is a function on the service');
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query('DELETE FROM [dbo].[Pizza] WHERE id = @id');
        console.log(response)

        return response;
    }
}