const movies = require("./moviesDataPractica");

// getMovieById
const getMovieFromMoviesDataById = (id, callback) => {
  setTimeout(() => {
    const movieMatched = movies.find(movie => movie.id === id);
    if (!movieMatched) {
      callback(`No se ha encontrado ninguna película con la id ${id}`);
    }
    callback(null, movieMatched);
  });
};

const getMovieById = id => {
    getMovieFromMoviesDataById(id, (error, movie) => {
    if (error) return console.log(error);
    return console.log(movie);
  });
};

exports.getMovieFromMoviesDataById = getMovieFromMoviesDataById;
exports.getMovieById = getMovieById;
//getMovieById(1);

module.exports.getMoviesFromMoviesDataByTitle = title => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const moviesMatched = movies.filter(movie =>
        movie.title.startsWith(title)
      );

      if (!moviesMatched) {
        reject(`No se ha encontrado una película que comience por ${title}`);
      }

      resolve(moviesMatched);
    }, 2000);
  });
};

// getMovieByTitle
module.exports.getMoviesByTitle = title => {
  getMoviesFromMoviesDataByTitle(title)
    .then(movie => console.log(movie))
    .catch(error => console.log(error));
};
/*
// getMoviesByTitle("Z");
// getMovieByShowtimes

const getMoviesFromMoviesDataByShowtimes = showTime => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const moviesMatched = movies.filter(movie =>
        movie.showtimes.includes(showTime)
      );

      if (!moviesMatched) {
        reject(`No se ha encontrado una película que comience por ${title}`);
      }

      resolve(moviesMatched);
    }, 2000);
  });
};

module.exports.getMovieByShowtimes = async shotimes => {
  try {
    const moviesMatched = await getMoviesFromMoviesDataByShowtimes(shotimes);

    return console.log(moviesMatched);
  } catch (error) {
    return console.log(movie);
  }
};

getMovieByShowtimes("13:00");
*/