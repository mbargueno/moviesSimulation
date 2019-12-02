const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const methods = require("./methodsPractica");

//Hay que cambiar todos los console logs para que envíe los objetos como respuesta y podamos manejar los datos

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  console.log("parsedUrl", parsedUrl);

  const query = parsedUrl.query;

  console.log("query: ", query);

  switch (request.url) {
    /*case "/":
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end("Llamada a la ruta raiz");
      break;

    case "/image":
      const image = fs.readFileSync("./matrix.jpg");
      response.statusCode = 200;
      response.setHeader("Content-Type", "image/jpg");
      response.end(image);
      break;

    case `/html?${query}`:
      const { name } = querystring.parse(query);
      console.log(name);
      response.statusCode = 200;
      response.write("<div>");
      response.write(`<h1>HOLA ${name}</h1`);
      response.write("</div>");
      response.end();
      break;

    case "/html-file":
      const html = fs.readFileSync("./html.html");
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(html);*/

    case `/getid?${query}`:
      const { id } = querystring.parse(query);
       const getUserById = id => {
        methods.getMovieFromMoviesDataById(id, (error, data) => {
          if (error) {
            response.statusCode = 404;
            response.setHeader("Content-type", "text/plain");
            response.end(error);
          }
           response.statusCode = 200;
          response.setHeader("Content-type", "text/plain");
          response.end(JSON.stringify(data));
        });
      };
      const idnumber = parseInt(id);
      getUserById(idnumber);
      break;

      case `/getmoviebytitle?${query}`:
            const { title } = querystring.parse(query);
             const getMovieBytitle = title => {
              methods.getMoviesFromMoviesDataByTitle(title, (error, data) => {
                if (error) {
                  response.statusCode = 404;
                  response.setHeader("Content-type", "text/plain");
                  response.end(error);
                }
                 response.statusCode = 200;
                response.setHeader("Content-type", "text/plain");
                response.end(JSON.stringify(data));
              });
            };
            
            getMovieBytitle(title);
            break;

    default:
      response.statusCode = 404;
      response.end("La ruta a la que se intenta acceder no existe");
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});