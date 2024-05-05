const Film = require('../model/film');

exports.getAllFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
