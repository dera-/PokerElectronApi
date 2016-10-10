'use strict';

module.exports = function(Player) {
  Player.gererate = function(player_name, ai_name, file_key, cb) {
    Player.create({name: player_name}, function(err, player) {
      if (err) {
        cb(null, false);
      }
      player.playerAis.create(
        {user_id: player.id, name: ai_name, file_key: file_key},
        function(err, ai) {
          if (err) {
            cb(null, false);
          }
          cb(null, true);
        });
    });
  }

  Player.remoteMethod('gererate', {
    accepts: [
      {arg: 'player_name', type: 'string'},
      {arg: 'ai_name', type: 'string'},
      {arg: 'file_key', type: 'string'}
    ],
    http: {verb: 'post'},
    returns: {arg: 'success', type: 'boolean'}
  });
};
