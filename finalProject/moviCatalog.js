import fs from "fs";
import prompt from "prompt-sync";
import Movie from "./movie.js";

const input = prompt();
let catalogArray = [];

const readJson = (link) => {
  try {
    const dataFromJson = JSON.parse(fs.readFileSync(link, "utf-8"));
    return dataFromJson;
  } catch (err) {
    console.log("Error happened while reading");
    console.log(err.message);
    return []; // Return an empty array if an error occurs
  }
};

const writeJson = (data) => {
  try {
    const myData = JSON.stringify(data, null, 2);
    fs.writeFileSync("./test.json", myData, "utf-8");
    console.log("Data written to test.json");
  } catch (err) {
    console.log(err.message);
  }
};

catalogArray = readJson("./catalog.json");

const getMovies = async () => {
    try {
        const url =
          "https://api.themoviedb.org/3/keyword/Eng.Moath/movies?include_adult=false&language=en-US&page=1";
        const response = await fetch(url, { method : "GET" });
        console.log(response, "this is the response");
        const data = await response.json();
        console.log(data, "this is the data");
        return data;
    }
    catch (err) {
        console.log("Failed to get movies from API.");
        console.log(err.message);
    }
};

const addAPIMoviesToCatalog = (data) => {
    let movies = JSON.parse(data);
    for (const movie of movies) {
        const newMovie = new Movie((catalogArray.length), movie.title, movie.Release, movie.Genre.Name , movie.Director.name, movie.rating );
        catalogArray.push(newMovie);
        writeJson(catalogArray);
    }
};

getMovies();
// addAPIMoviesToCatalog(getMovies());

const userAddMovie = () => {
  let movieId =
    catalogArray.length > 0 ? catalogArray[catalogArray.length - 1].Id + 1 : 0;
  let title = input("Enter title: ");
  let releaseYear = input("Enter year: ");
  let genre = input("Enter genre: ");
  let description = input("Enter description: ");
  let rate = input("Enter rate: ");
  const movie = new Movie(
    movieId,
    title,
    releaseYear,
    genre,
    description,
    rate
  );
  catalogArray.push(movie);
  writeJson(catalogArray);
};

const updateMovie = () => {
  let movieId = input("Enter the movie ID to update: ");
  for (let i = 0; i < catalogArray.length; i++) {
    if (catalogArray[i].Id === movieId) {
      let newTitle = input("Enter the new title: ");
      let newReleaseYear = input("Enter the new release year: ");
      let newGenre = input("Enter the new genre: ");
      let newDescription = input("Enter the new description: ");
      let newRate = input("Enter the new rate: ");
      catalogArray[i] = {
        ...catalogArray[i], // Keep existing properties
        Title: newTitle,
        Year: newReleaseYear,
        Genre: newGenre,
        Description: newDescription,
        Rate: newRate,
      };
      break;
    }
  }
  writeJson(catalogArray);
};

const printCatalog = () => {
    data = readJson("./test.json");
    data.forEach((movie) => {
    console.log(`===========================================
Movie Id: ${movie.Id}
Title: ${movie.Title}
Released in: ${movie.Year}
Directed by: ${movie.Director}
Description: ${movie.Description}
===========================================`);
  });
};

const deleteMovie = () => {
  let movieId = input("Enter the movie ID to delete: ");
  catalogArray = catalogArray.filter((movie) => movie.Id !== movieId);
  writeJson(catalogArray);
};

const searchAboutMovie = () => {
  let movieTitle = input("Enter the movie title to search about: ");
  for (let i = 0; i < catalogArray.length; i++) {
    if ((catalogArray[i].Title).includes(movieTitle)) {
      console.log(`Movie Id: ${catalogArray[i].Id}
Title: ${catalogArray[i].Title}
Released in: ${catalogArray[i].Year}
Directed by: ${catalogArray[i].Director}
Description: ${catalogArray[i].Description}`);
      break;
    }
  }
};

const filterMovies = () => {
  let filterBy = input(
    "Enter the criteria to filter by (year, genre, or director): "
  );
  let filterValue = input("Enter the filter value: ");
  let filteredData = catalogArray.filter(
    (movie) => movie[filterBy] === filterValue
  );
  console.log(filteredData);
};

const main = () => {
  catalogArray = readJson();
  while (true) {
    console.log(`===========================================
----------- MOVIES CATALOG INFO -----------
===========================================
1) ADD new movie
2) Update movie
3) Display movies catalog
4) Delete movie
5) Search about movie
6) Filter movies
0) Exit program\n`);
    let step = input("Enter number to do! ");

    switch (step) {
      case "1":
        userAddMovie();
        break;
      case "2":
        updateMovie();
        break;
      case "3":
        printCatalog();
        break;
      case "4":
        deleteMovie();
        break;
      case "5":
        searchAboutMovie();
        break;
      case "6":
        filterMovies();
        break;
      case "0":
        writeJson(catalogArray);
        return;
    }
  }
};

// main();

// import fs from "fs";
// import prompt from "prompt-sync";
// import Movie from "./movie.js";
// const input = prompt();
// let catalogArray = [];

// const readJson = () => {
//   try {
//     const dataFromJson = JSON.parse(fs.readFileSync("./catalog.json", "utf-8"));
//     return dataFromJson;
//   } catch (err) {
//     console.log("Error happened while reading");
//     console.log(err.message);
//   }
// };

// const writeJson = (data) => {
//   try {
//     const myData = JSON.stringify(data, null, 2);
//     fs.writeFileSync("./test.json", myData, "utf-8");
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// catalogArray = readJson();

// const addMovie = () => {
//   let movieId = catalogArray[catalogArray.length - 1].id + 1;
//   let title = input("Enter title: ");
//   let releaseYear = input("Enter year: ");
//   let genre = input("Enter genre: ");
//   let description = input("Enter description: ");
//   let rate = input("Enter rate: ");
//   const movie = new Movie(
//     movieId,
//     title,
//     releaseYear,
//     genre,
//     description,
//     rate
//   );
//   JSON.parse(catalogArray).push(movie);
//   writeJson(JSON.parse(catalogArray));
// };

// const updateMovie = () => {
//   let movieId = input("Enter the movie ID to update: ");
//   for (let i = 0; i < catalogArray.length; i++) {
//     if (catalogArray[i].Id === movieId) {
//       let newTitle = input("Enter the new title: ");
//       let newReleaseYear = input("Enter the new release year: ");
//       let newGenre = input("Enter the new genre: ");
//       let newDescription = input("Enter the new description: ");
//       let newRate = input("Enter the new rate: ");
//       catalogArray[i] = {
//         Id: movieId,
//         Title: newTitle,
//         Year: newReleaseYear,
//         Genre: newGenre,
//         Description: newDescription,
//         Rate: newRate,
//       };
//       break;
//     }
//   }
//   writeJson(JSON.parse(catalogArray, null, 2));
// };

// const printCatalog = () => {
//   catalogArray.forEach((key) => console.log(key));
// };

// const deleteMovie = () => {
//   let movieId = input("Enter the movie ID to delete: ");
//   for (let i = 0; i < catalogArray.length; i++) {
//     if (catalogArray[i].Id === movieId) {
//       dataFromJson.splice(i, 1);
//       break;
//     }
//   }
//   writeJson(JSON.parse(catalogArray, null, 2));
// };

// const searchAboutMovie = () => {
//   let movieTitle = input("Enter the movie title to search about: ");
//   for (let i = 0; i < catalogArray.length; i++) {
//     if (catalogArray[i].Title === movieTitle) {
//       console.log(`Movie Id: ${catalogArray[i].Id}
//                     Title: ${catalogArray[i].Title}
//                     Released in: ${catalogArray[i].Year}
//                     Directed by: ${catalogArray[i].Director}
//                     Description: ${catalogArray[i].Description}`);
//       break;
//     }
//   }
//   writeJson(JSON.parse(catalogArray, null, 2));
// };

// const filterMovies = () => {
//   let filterBy = input(
//     "Enter the criteria to filter by (year, genre, or director): "
//   );
//   let filterValue = input("Enter the filter value: ");
//   let filteredData = catalogArray.filter((movie) => {
//     return movie[filterBy] === filterValue;
//   });
//   console.log(filteredData);
//   writeJson(JSON.parse(catalogArray, null, 2));
// };

// const main = () => {
//   let dataFromJson = readJson();
//   writeJson(dataFromJson);
//   while (true) {
//     console.log(`===========================================
// ----------- MOVIES CATALOG INFO -----------
// ===========================================
// 1) ADD new movie
// 2) Update movie
// 3) Display movies catalog
// 4) Delete movie
// 5) Search about movie
// 6) Filter movies
// 0) Exit program\n`);
//     let step = input("Enter number to do! ");

//     switch (step) {
//       case "1":
//         addMovie();
//         break;
//       case "2":
//         updateMovie(dataFromJson);
//         break;
//       case "3":
//         printCatalog(dataFromJson);
//         break;
//       case "4":
//         deleteMovie(dataFromJson);
//         break;
//       case "5":
//         searchAboutMovie(dataFromJson);
//         break;
//       case "6":
//         filterMovies(dataFromJson);
//         break;
//       case "0":
//         writeJson(JSON.parse(catalogArray, null, 2));
//         return;
//     }
//   }
// };
// main();