"use strict";

var Salle = require('../models/salleModel.js');

var Bloc = require('../models/blocModel.js');

var Occupation = require('../models/occupationModel.js');

var QRCode = require('qrcode');

var WebSocket = require('ws'); // afficher toutes les salles


var showsalles = function showsalles(req, res) {
  var salles;
  return regeneratorRuntime.async(function showsalles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Salle.find());

        case 2:
          salles = _context.sent;

          try {
            res.render("home.hbs", {
              salles: salles
            });
          } catch (error) {
            res.status(500).send(error);
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var login = function login(req, res) {
  res.render("login.hbs");
};

var apisalles = function apisalles(req, res) {
  var salles;
  return regeneratorRuntime.async(function apisalles$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Salle.find());

        case 2:
          salles = _context2.sent;

          try {
            res.json(salles);
          } catch (error) {
            res.status(500).send(error);
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var apiblocs = function apiblocs(req, res) {
  var blocs;
  return regeneratorRuntime.async(function apiblocs$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Bloc.find());

        case 2:
          blocs = _context3.sent;

          try {
            res.json(blocs);
          } catch (error) {
            res.status(500).send(error);
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var apioccupations = function apioccupations(req, res) {
  var api, time, salle, salles, data;
  return regeneratorRuntime.async(function apioccupations$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          api = [];
          time = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(Salle.find());

        case 4:
          salles = _context4.sent;

          for (i = 0; i < salles.length; i++) {
            api.push(salles[i].name);
          }

          i = 0;

        case 7:
          if (!(i < api.length)) {
            _context4.next = 15;
            break;
          }

          _context4.next = 10;
          return regeneratorRuntime.awrap(Occupation.find({
            salle: api[i]
          }).count());

        case 10:
          salle = _context4.sent;
          time.push(salle);

        case 12:
          i++;
          _context4.next = 7;
          break;

        case 15:
          data = {
            api: api,
            time: time
          };

          try {
            res.json(data);
          } catch (error) {
            res.status(500).send(error);
          }

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var showblocs = function showblocs(req, res) {
  var blocs;
  return regeneratorRuntime.async(function showblocs$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Bloc.find());

        case 2:
          blocs = _context5.sent;

          try {
            res.render("blocs.hbs", {
              blocs: blocs
            });
          } catch (error) {
            res.status(500).send(error);
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var showoccupation = function showoccupation(req, res) {
  var occupations;
  return regeneratorRuntime.async(function showoccupation$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Occupation.find());

        case 2:
          occupations = _context6.sent;
          res.render('occupations', {
            occupations: occupations
          });

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // chercher une salle par son id


var searchsalle = function searchsalle(req, res) {
  var salles;
  return regeneratorRuntime.async(function searchsalle$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Salle.find({
            id: req.body.search
          }));

        case 3:
          salles = _context7.sent;
          res.render("home", {
            salles: salles
          });
          _context7.next = 10;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          res.status(500).send(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var addsalle = function addsalle(req, res) {
  var blocs;
  return regeneratorRuntime.async(function addsalle$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Bloc.find());

        case 2:
          blocs = _context8.sent;
          res.render('add-salle.hbs', {
            blocs: blocs
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var statistiques = function statistiques(req, res) {
  var occupations;
  return regeneratorRuntime.async(function statistiques$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Occupation.find());

        case 2:
          occupations = _context9.sent;
          res.render('statistique.hbs', {
            occupations: occupations
          });

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var addbloc = function addbloc(req, res) {
  res.render('add-bloc.hbs');
};

var addoccupation = function addoccupation(req, res) {
  var salles;
  return regeneratorRuntime.async(function addoccupation$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(Salle.find());

        case 2:
          salles = _context10.sent;
          res.render('add-occupation.hbs', {
            salles: salles
          });

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var editsalle = function editsalle(req, res) {
  var _salle;

  return regeneratorRuntime.async(function editsalle$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(Salle.find({
            id: req.params.id
          }));

        case 3:
          _salle = _context11.sent;
          res.render("edit-salle", {
            salle: _salle
          });
          _context11.next = 10;
          break;

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          res.send(_context11.t0);

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var editbloc = function editbloc(req, res) {
  var bloc;
  return regeneratorRuntime.async(function editbloc$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(Bloc.find({
            id: req.params.id
          }));

        case 2:
          bloc = _context12.sent;
          res.render("edit-bloc", {
            bloc: bloc
          });

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
}; // creer une salle


var insertsalle = function insertsalle(req, res) {
  var id, sallem, data, stringdata;
  return regeneratorRuntime.async(function insertsalle$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = 0;
          _context14.next = 4;
          return regeneratorRuntime.awrap(Salle.findOne().sort({
            "id": -1
          }).limit(1));

        case 4:
          sallem = _context14.sent;
          if (sallem != null) id = sallem.id;
          data = {
            id: id + 1,
            name: req.body.name,
            bloc: req.body.bloc
          };
          stringdata = JSON.stringify(data); // Print the QR code to terminal

          QRCode.toDataURL(stringdata, function _callee(err, code) {
            var salle, salles;
            return regeneratorRuntime.async(function _callee$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    if (!err) {
                      _context13.next = 2;
                      break;
                    }

                    return _context13.abrupt("return", console.log("error occurred"));

                  case 2:
                    salle = new Salle({
                      id: id + 1,
                      name: req.body.name,
                      bloc: req.body.bloc,
                      qrcode: code
                    });
                    _context13.next = 5;
                    return regeneratorRuntime.awrap(salle.save());

                  case 5:
                    _context13.next = 7;
                    return regeneratorRuntime.awrap(Salle.find());

                  case 7:
                    salles = _context13.sent;
                    res.render("home.hbs", {
                      salles: salles
                    });

                  case 9:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          });
          _context14.next = 14;
          break;

        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          res.send(_context14.t0);

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var insertoccupation = function insertoccupation(req, res) {
  var occupations2, count, d, date, i, occupation, result, occupations, inserted, socket, salles;
  return regeneratorRuntime.async(function insertoccupation$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(Occupation.find());

        case 2:
          occupations2 = _context15.sent;
          count = 0;
          d = new Date();
          date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

          for (i = 0; i < occupations2.length; i++) {
            if (occupations2[i].salle == req.body.salle && occupations2[i].date == date && occupations2[i].time == req.body.time) {
              count++;
            }
          }

          if (!(count == 0)) {
            _context15.next = 27;
            break;
          }

          _context15.prev = 8;
          occupation = new Occupation({
            salle: req.body.salle,
            time: req.body.time,
            date: date
          });
          _context15.next = 12;
          return regeneratorRuntime.awrap(occupation.save());

        case 12:
          result = _context15.sent;
          _context15.next = 15;
          return regeneratorRuntime.awrap(Occupation.find());

        case 15:
          occupations = _context15.sent;
          inserted = {
            id: result._id,
            salle: result.salle,
            time: result.time,
            date: result.date
          };
          socket = new WebSocket('wss://bloc-salle-app.herokuapp.com/');
          socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify(inserted));
          });
          res.render("occupations.hbs", {
            occupations: occupations,
            inserted: inserted
          });
          _context15.next = 25;
          break;

        case 22:
          _context15.prev = 22;
          _context15.t0 = _context15["catch"](8);
          res.send(_context15.t0);

        case 25:
          _context15.next = 31;
          break;

        case 27:
          _context15.next = 29;
          return regeneratorRuntime.awrap(Salle.find());

        case 29:
          salles = _context15.sent;
          res.render("add-occupation.hbs", {
            salles: salles,
            alert: "la salle est déja occupée à ce créneau merci de  choisir une autre salle ou un autre créneau !"
          });

        case 31:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[8, 22]]);
};

var insertbloc = function insertbloc(req, res) {
  var id, blocm, _bloc, blocs;

  return regeneratorRuntime.async(function insertbloc$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          id = 0;
          _context16.next = 4;
          return regeneratorRuntime.awrap(Bloc.findOne().sort({
            "id": -1
          }).limit(1));

        case 4:
          blocm = _context16.sent;
          if (blocm != null) id = blocm.id;
          _bloc = new Bloc({
            id: id + 1,
            name: req.body.name
          });
          _context16.next = 9;
          return regeneratorRuntime.awrap(_bloc.save());

        case 9:
          _context16.next = 11;
          return regeneratorRuntime.awrap(Bloc.find());

        case 11:
          blocs = _context16.sent;
          res.render("blocs.hbs", {
            blocs: blocs
          });
          _context16.next = 18;
          break;

        case 15:
          _context16.prev = 15;
          _context16.t0 = _context16["catch"](0);
          res.send(_context16.t0);

        case 18:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // modifier une salle


var updatesalle = function updatesalle(req, res) {
  var salles;
  return regeneratorRuntime.async(function updatesalle$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(Salle.updateOne({
            id: req.params.id
          }, {
            name: req.body.name,
            bloc: req.body.bloc
          }));

        case 3:
          salle = _context17.sent;
          _context17.next = 6;
          return regeneratorRuntime.awrap(Salle.find());

        case 6:
          salles = _context17.sent;
          res.render("home", {
            salles: salles
          });
          _context17.next = 13;
          break;

        case 10:
          _context17.prev = 10;
          _context17.t0 = _context17["catch"](0);
          res.status(500).send(_context17.t0);

        case 13:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

var updatebloc = function updatebloc(req, res) {
  var blocs;
  return regeneratorRuntime.async(function updatebloc$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(Bloc.updateOne({
            id: req.params.id
          }, {
            name: req.body.name
          }));

        case 3:
          bloc = _context18.sent;
          _context18.next = 6;
          return regeneratorRuntime.awrap(Bloc.find());

        case 6:
          blocs = _context18.sent;
          res.render("blocs", {
            blocs: blocs
          });
          _context18.next = 13;
          break;

        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          res.status(500).send(_context18.t0);

        case 13:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // supprimer une salle


var deletesalle = function deletesalle(req, res) {
  var salles;
  return regeneratorRuntime.async(function deletesalle$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(Salle.deleteOne({
            id: req.params.id
          }));

        case 3:
          _context19.next = 5;
          return regeneratorRuntime.awrap(Salle.find());

        case 5:
          salles = _context19.sent;
          res.render("home", {
            salles: salles
          });
          _context19.next = 12;
          break;

        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19["catch"](0);
          res.status(500).send(_context19.t0);

        case 12:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

var deleteoccupation = function deleteoccupation(req, res) {
  var occupations, socket;
  return regeneratorRuntime.async(function deleteoccupation$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(Occupation.deleteOne({
            _id: req.params.id
          }));

        case 3:
          _context20.next = 5;
          return regeneratorRuntime.awrap(Occupation.find());

        case 5:
          occupations = _context20.sent;
          socket = new WebSocket('wss://bloc-salle-app.herokuapp.com/');
          socket.addEventListener('open', function (event) {
            socket.send(" ");
          });
          res.render("occupations", {
            occupations: occupations
          });
          _context20.next = 14;
          break;

        case 11:
          _context20.prev = 11;
          _context20.t0 = _context20["catch"](0);
          res.status(500).send(_context20.t0);

        case 14:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var deletebloc = function deletebloc(req, res) {
  var blocs;
  return regeneratorRuntime.async(function deletebloc$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(Bloc.deleteOne({
            id: req.params.id
          }));

        case 3:
          _context21.next = 5;
          return regeneratorRuntime.awrap(Bloc.find());

        case 5:
          blocs = _context21.sent;
          res.render("blocs", {
            blocs: blocs
          });
          _context21.next = 12;
          break;

        case 9:
          _context21.prev = 9;
          _context21.t0 = _context21["catch"](0);
          res.status(500).send(_context21.t0);

        case 12:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  insertsalle: insertsalle,
  login: login,
  insertoccupation: insertoccupation,
  apioccupations: apioccupations,
  statistiques: statistiques,
  deleteoccupation: deleteoccupation,
  updatesalle: updatesalle,
  apisalles: apisalles,
  apiblocs: apiblocs,
  deletesalle: deletesalle,
  insertbloc: insertbloc,
  addbloc: addbloc,
  showsalles: showsalles,
  searchsalle: searchsalle,
  addsalle: addsalle,
  editsalle: editsalle,
  showblocs: showblocs,
  editbloc: editbloc,
  updatebloc: updatebloc,
  deletebloc: deletebloc,
  showoccupation: showoccupation,
  addoccupation: addoccupation
};