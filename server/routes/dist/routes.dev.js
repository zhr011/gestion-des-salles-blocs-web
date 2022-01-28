"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/salleController.js'),
    insertsalle = _require.insertsalle,
    updatesalle = _require.updatesalle,
    apioccupations = _require.apioccupations,
    login = _require.login,
    addoccupation = _require.addoccupation,
    statistiques = _require.statistiques,
    deletesalle = _require.deletesalle,
    deleteoccupation = _require.deleteoccupation,
    insertoccupation = _require.insertoccupation,
    apisalles = _require.apisalles,
    apiblocs = _require.apiblocs,
    insertbloc = _require.insertbloc,
    showsalles = _require.showsalles,
    addbloc = _require.addbloc,
    searchsalle = _require.searchsalle,
    addsalle = _require.addsalle,
    editsalle = _require.editsalle,
    showblocs = _require.showblocs,
    editbloc = _require.editbloc,
    updatebloc = _require.updatebloc,
    deletebloc = _require.deletebloc,
    showoccupation = _require.showoccupation;

router.get('/addsalle', addsalle);
router.get('/', login);
router.get('/addbloc', addbloc);
router.get('/addoccupation', addoccupation);
router.post('/insertsalle', insertsalle);
router.post('/insertoccupation', insertoccupation);
router.post('/insertbloc', insertbloc);
router.post('/updatesalle/:id', updatesalle);
router.post('/updatebloc/:id', updatebloc);
router.get('/deletesalle/:id', deletesalle);
router.get('/deletebloc/:id', deletebloc);
router.get('/deleteoccupation/:id', deleteoccupation);
router.get('/salles', showsalles);
router.get('/api/salles', apisalles);
router.post('/find', searchsalle);
router.get('/editsalle/:id', editsalle);
router.get('/editbloc/:id', editbloc);
router.get('/blocs', showblocs);
router.get('/api/blocs', apiblocs);
router.get('/api/occupations', apioccupations);
router.get('/occupations', showoccupation);
router.get('/statistiques', statistiques);
module.exports = router;