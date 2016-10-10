'use strict';

module.exports = function(Playerai) {
  var fs = require('fs');
  Playerai.loadData = function (id, cb) {
    Playerai.findById(id, function(err, instance) {
      var preflop = fs.readFileSync('files/preflop/' + instance.file_key + '.csv', 'utf-8'),
        flop = fs.readFileSync('files/flop/' + instance.file_key + '.csv', 'utf-8'),
        turn = fs.readFileSync('files/turn/' + instance.file_key + '.csv', 'utf-8'),
        river = fs.readFileSync('files/river/' + instance.file_key + '.csv', 'utf-8');
      cb(null, preflop, flop, turn, river);
    });
  };
  Playerai.remoteMethod('loadData', {
    accepts: {arg: 'id', type: 'number'},
    http: {verb: 'get'},
    returns: [
      {arg: 'preflop', type: 'string'},
      {arg: 'flop', type: 'string'},
      {arg: 'turn', type: 'string'},
      {arg: 'river', type: 'string'}
    ]
  });

  Playerai.saveData = function(id, preflop, flop, turn, river, cb) {
    Playerai.findById(id, function(err, instance) {
      try {
        fs.writeFileSync('files/preflop/' + instance.file_key + '.csv', preflop);
        fs.writeFileSync('files/flop/' + instance.file_key + '.csv', flop);
        fs.writeFileSync('files/turn/' + instance.file_key + '.csv', turn);
        fs.writeFileSync('files/river/' + instance.file_key + '.csv', river);
      } catch(e) {
        cb(null, false);
      }
      cb(null, true);
    });
  }
  Playerai.remoteMethod('saveData', {
    accepts: [
      {arg: 'id', type: 'number'},
      {arg: 'preflop', type: 'string'},
      {arg: 'flop', type: 'string'},
      {arg: 'turn', type: 'string'},
      {arg: 'river', type: 'string'}
    ],
    http: {verb: 'post'},
    returns: {arg: 'success', type: 'boolean'}
  });
};
