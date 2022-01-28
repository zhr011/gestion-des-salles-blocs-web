const Salle = require('../models/salleModel.js');
const Bloc = require('../models/blocModel.js');
const Occupation = require('../models/occupationModel.js');
const QRCode = require('qrcode');
const WebSocket = require('ws');
// afficher toutes les salles
const showsalles = (async(req, res) => {
    const salles = await Salle.find();
    try {
        res.render("home.hbs", { salles });
    } catch (error) {
        res.status(500).send(error);
    }
});
const login = (req, res) => {
    res.render("login.hbs")
}
const apisalles = (async(req, res) => {
    const salles = await Salle.find();
    try {
        res.json(salles);
    } catch (error) {
        res.status(500).send(error);
    }
});
const apiblocs = (async(req, res) => {
    const blocs = await Bloc.find();
    try {
        res.json(blocs);
    } catch (error) {
        res.status(500).send(error);
    }
});
const apioccupations = (async(req, res) => {
    var api = [];
    var time = [];
    var salle;
    const salles = await Salle.find();
    for (i = 0; i < salles.length; i++) {
        api.push(salles[i].name)
    }
    for (i = 0; i < api.length; i++) {
        salle = await Occupation.find({ salle: api[i] }).count();
        time.push(salle);
    }
    const data = {
        api: api,
        time: time,
    }
    try {
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
const showblocs = (async(req, res) => {
    const blocs = await Bloc.find();
    try {
        res.render("blocs.hbs", { blocs });
    } catch (error) {
        res.status(500).send(error);
    }
});
const showoccupation = (async(req, res) => {
    const occupations = await Occupation.find();
    res.render('occupations', { occupations });
});

// chercher une salle par son id
const searchsalle = (async(req, res) => {
    try {
        const salles = await Salle.find({ id: req.body.search });
        res.render("home", { salles });
    } catch (error) {
        res.status(500).send(error);
    }
});
const addsalle = (async(req, res) => {
    const blocs = await Bloc.find();
    res.render('add-salle.hbs', { blocs })
});
const statistiques = (async(req, res) => {
    const occupations = await Occupation.find();
    res.render('statistique.hbs', { occupations });
});
const addbloc = ((req, res) => {
    res.render('add-bloc.hbs')
})
const addoccupation = (async(req, res) => {
    const salles = await Salle.find();
    res.render('add-occupation.hbs', { salles });
})
const editsalle = (async(req, res) => {
    try {
        const salle = await Salle.find({ id: req.params.id });
        res.render("edit-salle", { salle });
    } catch (error) {
        res.send(error);
    }
});
const editbloc = (async(req, res) => {
    const bloc = await Bloc.find({ id: req.params.id });
    res.render("edit-bloc", { bloc });
});
// creer une salle
const insertsalle = (async(req, res) => {
    try {
        let id = 0;
        const sallem = await Salle.findOne().sort({ "id": -1 }).limit(1);
        if (sallem != null)
            id = sallem.id
        const data = {
            id: id + 1,
            name: req.body.name,
            bloc: req.body.bloc
        }
        let stringdata = JSON.stringify(data)
            // Print the QR code to terminal
        QRCode.toDataURL(stringdata, async function(err, code) {
            if (err) return console.log("error occurred")
            const salle = new Salle({
                id: id + 1,
                name: req.body.name,
                bloc: req.body.bloc,
                qrcode: code
            });
            await salle.save();
            const salles = await Salle.find();
            res.render("home.hbs", { salles });
        })
    } catch (error) {
        res.send(error);
    }
});
const insertoccupation = (async(req, res) => {
    const occupations2 = await Occupation.find();
    var count = 0;
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    for (var i = 0; i < occupations2.length; i++) {
        if (occupations2[i].salle == req.body.salle && occupations2[i].date == date && occupations2[i].time == req.body.time) {
            count++;
        }
    }
    if (count == 0) {
        try {
            const occupation = new Occupation({
                salle: req.body.salle,
                time: req.body.time,
                date: date
            });
            const result = await occupation.save();
            const occupations = await Occupation.find();
            const inserted = { id: result._id, salle: result.salle, time: result.time, date: result.date };
            const socket = new WebSocket('wss://bloc-salle-app.herokuapp.com/')
            socket.addEventListener('open', function(event) {
                socket.send(JSON.stringify(inserted));
            })
            res.render("occupations.hbs", { occupations, inserted });

        } catch (error) {
            res.send(error);
        }
    } else {
        const salles = await Salle.find();
        res.render("add-occupation.hbs", { salles, alert: "la salle est déja occupée à ce créneau merci de  choisir une autre salle ou un autre créneau !" });

    }
});
const insertbloc = (async(req, res) => {
    try {
        let id = 0;
        const blocm = await Bloc.findOne().sort({ "id": -1 }).limit(1);
        if (blocm != null) id = blocm.id
        const bloc = new Bloc({
            id: id + 1,
            name: req.body.name,
        });
        await bloc.save();
        const blocs = await Bloc.find();
        res.render("blocs.hbs", { blocs });
    } catch (error) {
        res.send(error);
    }
});
// modifier une salle
const updatesalle = (async(req, res) => {
    try {
        salle = await Salle.updateOne({ id: req.params.id }, { name: req.body.name, bloc: req.body.bloc });
        const salles = await Salle.find();
        res.render("home", { salles });
    } catch (error) {
        res.status(500).send(error);
    }

});
const updatebloc = (async(req, res) => {
    try {
        bloc = await Bloc.updateOne({ id: req.params.id }, { name: req.body.name });
        const blocs = await Bloc.find();
        res.render("blocs", { blocs });
    } catch (error) {
        res.status(500).send(error);
    }
});
// supprimer une salle
const deletesalle = (async(req, res) => {
    try {
        await Salle.deleteOne({ id: req.params.id });
        const salles = await Salle.find();
        res.render("home", { salles });
    } catch (error) {
        res.status(500).send(error);
    }
});
const deleteoccupation = (async(req, res) => {
    try {
        await Occupation.deleteOne({ _id: req.params.id });
        const occupations = await Occupation.find();
        const socket = new WebSocket('wss://bloc-salle-app.herokuapp.com/')
        socket.addEventListener('open', function(event) {
            socket.send(" ");
        })
        res.render("occupations", { occupations });

    } catch (error) {
        res.status(500).send(error);
    }
});
const deletebloc = (async(req, res) => {
    try {
        await Bloc.deleteOne({ id: req.params.id });
        const blocs = await Bloc.find();
        res.render("blocs", { blocs });
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = { insertsalle, login, insertoccupation, apioccupations, statistiques, deleteoccupation, updatesalle, apisalles, apiblocs, deletesalle, insertbloc, addbloc, showsalles, searchsalle, addsalle, editsalle, showblocs, editbloc, updatebloc, deletebloc, showoccupation, addoccupation };