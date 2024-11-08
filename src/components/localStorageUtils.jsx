export const getMoviesFromStorage = (listName) => {
    const movies = JSON.parse(localStorage.getItem(listName));
    return movies ? movies : [];
};

export const saveMoviesToStorage = (listName, movies) => {
    localStorage.setItem(listName, JSON.stringify(movies));
};
