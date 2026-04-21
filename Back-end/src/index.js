const express = require("express");
const app = express();
const port = 3000;
const { sequelize } = require("./config/connection");
const { Author, Book, EntidadFederativa, alumno } = require("./models/models");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));



app.get('/', (req, res) => {
  res.send('Hello world!');   
});

//nuevo get para obtener las entidades federativas
app.get("/entidades", async (req, res) => {
  try {
    const entidades = await EntidadFederativa.findAll();

    //render de la vista entidades.ejs, pasando las entidades federativas como variable
    return res.render("entidades", { entidades });
  } catch (error) {
    console.log("Errore", error);
    return res
      .status(500)
      .json({ message: "Error al obtener las entidades federativas" });
  }
});

//GET PARA ALUMNOS
app.get("/alumnos", async (req, res) => {
  try {
    const alumnos = await alumno.findAll();
    return res.json({ alumnos });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ 
      message: 'Error al crear un nuevo alumnoooos',
      error: error.message
     });
  }
});

//post

app.post("/alumnos", async (req, res) => {
  try {
    const numero_cuenta = req.body?.numero_cuenta;
    const nombre = req.body?.nombre;
    const apellido_paterno = req.body?.apellido_paterno;
    const apellido_materno = req.body?.apellido_materno;
    const curp = req.body?.curp;
    const telefono = req.body?.telefono;
    const sexo = req.body?.sexo;
    const correo_electronico = req.body?.correo_electronico;
    const fecha_nacimiento = req.body?.fecha_nacimiento;
    const foto_perfil = req.body?.foto_perfil;
    const id_entidad = req.body?.id_entidad;

    const save = await alumno.create({
      numero_cuenta,
      nombre,
      apellido_paterno,
      apellido_materno,
      curp,
      telefono,
      sexo,
      correo_electronico,
      fecha_nacimiento,
      foto_perfil,
      id_entidad,
    });
    return res.status(201).json({ alumnos: save });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: 'Error al crear un nuevo alumnoooos',
      error: error.message});
  }
});

//post para crear una nueva entidad federativa
app.post("/entidades", async (req, res) => {
  try {
    const nombre_entidad = req.body?.nombre_entidad;
    const abreviatura = req.body?.abreviatura;

    if (!nombre_entidad || !abreviatura) {
      return res
        .status(400)
        .json({ message: "entidad federativa no encointrada" });
    }
    const save = await EntidadFederativa.create({
      nombre_entidad,
      abreviatura,
    });
    return res.status(201).json({ entidad: save });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ message: "Error al crear la entidad federativa" });
  }
});

/*
app.post('/authors', async (req, res) => {
  try {
    const name = req.body?.name;
    const age = req.body?.age;

    if (!name || !age) {
      return res.status(400).json({ message: 'Bad request, name or age not found' });
    }
    const save = await Author.create({
      name,
      age
    });
    return res.status(201).json({ author: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});  

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll()
    return res.json({ books });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const isbn = req.body?.isbn;
    const name = req.body?.name;
    const cantPages = req.body?.cantPages;
    const author = req.body?.author;

    if (!name || !cantPages || !author || !isbn) {
      return res.status(400).json({ message: 'Bad request, isbn or name or cantPages or author not found' });
    }
    const save = await Book.create({
      isbn,
      name,
      cantPages,
      authorId: author
    })
    return res.status(201).json({ book: save });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
*/

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection success");
    //alter: false por que no queremos que se alteren las tablas, solo se creen si no existen
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log("Sync models");
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection fail", error);
  });
