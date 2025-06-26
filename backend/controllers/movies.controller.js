import { TOKEN_API_TMDB } from '../config/config.js'
import { User } from '../db/models/index.js';
const ResponseAPI = {
    msg: "",
    data: [],
    status: 'ok'
}
export const getMoviesNowPlaying = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const url = `https://api.themoviedb.org/3/movie/now_playing?&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN_API_TMDB}`
            }
        };

        const response = await fetch(url, options)
        const responseJSON = await response.json();

        if (!response.ok) {
            ResponseAPI.msg = "Something went wrong";
            ResponseAPI.status = "error";
            return res.status(400).json(ResponseAPI);
        }

        ResponseAPI.msg = "Movies obtained";
        ResponseAPI.data = responseJSON;
        return res.status(200).json(ResponseAPI);
    } catch (error) {
        next(error)
    }
}
export const watchedMovie = async (req, res, next) => {
    const ResponseAPI = {
        msg: "",
        data: [],
        status: "ok"
    };

    try {
        const userId = req.userId;
        const { title, poster, value, apimovieid } = req.body;

        const currentUser = await User.findById(userId).select('-password');

        if(!currentUser){
            ResponseAPI.msg = 'User not found';
            ResponseAPI.data = []
            ResponseAPI.status = 'error';
            return res.status(401).json(ResponseAPI);
        }

        const alreadyWatched = currentUser.movies.some(
            (movie) => movie.apimovieid === apimovieid
        );

        if (alreadyWatched) {
            ResponseAPI.msg = `${title} is already marked as watched`;
            ResponseAPI.data = currentUser;
            return res.status(200).json(ResponseAPI);
        }

        currentUser.movies.push({ title, poster, value, apimovieid });
        await currentUser.save();

        ResponseAPI.msg = `${title} has been added to watched`;
        ResponseAPI.data = currentUser;
        return res.status(200).json(ResponseAPI);

    } catch (error) {
        next(error);
    }
};
export const getWatchedMovies = async (req, res, next) => {
    try{
        const userId = req.userId;
        const currentUser = await User.findById(userId).select('-password');

        if(!currentUser){
            ResponseAPI.msg = 'User not found';
            ResponseAPI.data = []
            ResponseAPI.status = 'error';
            return res.status(401).json(ResponseAPI);
        }
        ResponseAPI.msg = `All the movies you've seen`;
        ResponseAPI.data = currentUser.movies;
        ResponseAPI.status = 'ok';
        return res.status(200).json(ResponseAPI)

    }catch(error){
        next(error)
    }
}
export const getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TOKEN_API_TMDB}`
            }
        };

        const response = await fetch(url, options)
        const responseJSON = await response.json();

        if (!response.ok) {
            ResponseAPI.msg = "Something went wrong";
            ResponseAPI.status = "error";
            return res.status(400).json(ResponseAPI);
        }

        ResponseAPI.msg = "Movies obtained";
        ResponseAPI.data = responseJSON;
        return res.status(200).json(ResponseAPI);

    } catch (error) {
        next(error)
    }

}