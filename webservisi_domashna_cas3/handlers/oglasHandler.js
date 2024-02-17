const Oglas = require("../pkg/oglasi/oglasiSchema");

//!Kreirame CRUD

//* Kreiranje na oglas
exports.createOglas = async (req, res) => {
  try {
    const newOglas = await Oglas.create(req.body);
    res.send(newOglas);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//*Prevzemanje(citanje) na site oglasi

exports.getAllOglasi = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const oglasi = await Oglas.find(query);
    res.send(oglasi);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//* Prevzemanje na site oglasi po type (po kolekcija)

exports.getAllOglasiByType = async (req, res) => {
  try {
    const type = req.params.type;
    const queryObj = { ...req.query, type };
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\/b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const oglasi = await Oglas.find(query);
    res.send(oglasi);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//*Update na oglas
exports.updateOglas = async (req, res) => {
  try {
    const updateOglas = await Oglas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(updateOglas);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//*Brisenje na oglas
exports.deleteOglas = async (req, res) => {
  try {
    await Oglas.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
