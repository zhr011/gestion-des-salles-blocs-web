const Bloc = require('../models/blocModel.js');
const Salle = require('../models/salleModel.js');

// afficher toutes les blocs
const showblocs = (async(req, res) => {
    const blocs = await Bloc.find();
    console.log(blocs)
    try {
        res.json(blocs);
    } catch (error) {
        res.status(500).send(error);
    }
});
// chercher un bloc par son id
const showbloc = (async(req, res) => {
    const bloc = await Bloc.findOne({ id: req.params.id });
    try {
        res.json(bloc);
    } catch (error) {
        res.status(500).send(error);
    }
});

// creer un bloc
const insertbloc = (async(req, res) => {
    const bloc = new Bloc({
        id: req.body.id,
        name: req.body.name
    });
    try {
        const a = await bloc.save();
        res.json(a);
    } catch (error) {
        res.status(500).send(error);
    }
});

// modifier un bloc
const updatebloc = (async(req, res) => {
    const bloc = await Bloc.findOne({ id: req.params.id });
    const name = bloc.name;
    await Bloc.updateOne({ id: req.params.id }, { name: req.body.name });
    await Salle.updateMany({ bloc: name }, { bloc: req.body.name });
    const blocs = await Bloc.find();
    try {
        res.json(blocs);
    } catch (error) {
        res.status(500).send(error);
    }


});

// supprimer un bloc
const deletebloc = (async(req, res) => {;
    const bloc = await Bloc.findOne({ id: req.params.id });
    const name = bloc.name;
    await Bloc.deleteOne({ id: req.params.id });
    await Salle.deleteMany({ bloc: name });;
    const blocs = await Bloc.find();
    try {
        res.json(blocs);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = { insertbloc, updatebloc, deletebloc, showblocs, showbloc }