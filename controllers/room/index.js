const { Room } = require('../../models');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  generate: async (req, res) => {
    const room = await Room.create({
      id: uuidv4(),
      playerOneId: req.body.player_one_id,
      code: Date.now(),
    });

    res.status(200).json({
      message: `successfully generated room with ID: ${room.id}`,
      room,
    });
  },
  join: async (req, res) => {
    if (req.body.id == null) res.status(404).json({ message: 'Gagal menemukan room' });

    const joinRoom = await Room.update(
      {
        playerTwoId: req.body.player_two_id,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (joinRoom == 0) res.status(404).json({ message: 'Gagal join ke dalam room' });

    res.status(201).json({
      message: 'Berhasil join ke dalam room',
    });
  },
  fight: async (req, res) => {
    const matchRoom = await Room.findOne({ where: { id: req.body.roomId } });
    const player = await whichPlayer(req.body.userId, req.body.roomId);

    const matchInfo = matchRoom.matchInfo;

    if (matchInfo.every((el) => el != '')) res.status(200).json({ message: 'match sudah berakhir' });
    else {
      if (player == 'player 1') {
        for (let index = 0; index < matchInfo.length; index += 2) {
          if (matchInfo[index] == '') {
            matchInfo[index] = req.body.hand;
            break;
          }
        }
      } else if (player == 'player 2') {
        for (let index = 1; index < matchInfo.length; index += 2) {
          console.log(index);
          if (matchInfo[index] == '') {
            matchInfo[index] = req.body.hand;
            break;
          }
        }
      }

      const match = await Room.update({ matchInfo: matchInfo }, { where: { id: req.body.roomId }, returning: true, plain: true });

      res.status(200).json(match);
    }
  },
  result: async (req, res) => {
    matchRoom = await Room.findOne({ where: { id: req.body.roomId } });
    matchInfo = matchRoom.matchInfo;
    let winner = '';
    switch (req.body.round) {
      case 1:
        winner = getWinner(matchInfo.slice(0, 2));
        break;
      case 2:
        winner = getWinner(matchInfo.slice(2, 4));
        break;
      case 3:
        winner = getWinner(matchInfo.slice(4, 6));
        break;
      default:
        break;
    }
    console.log(winner);

    if (winner != '') res.json({ message: winner });
    else res.json({ message: 'error' });
  },
  getWinner: (matchset) => {
    matchstring = matchset.join('');

    switch (matchstring) {
      case 'RR':
      case 'PP':
      case 'SS':
        return 'Draw';
      case 'RS':
      case 'SP':
      case 'PR':
        return 'P1 Win';
      case 'SR':
      case 'PS':
      case 'RP':
        return 'P2 Win';
      default:
        return 'Match Belum Selesai';
    }
  },
  whichPlayer: async (id, roomId) => {
    const matchRoom = await Room.findOne({ where: { id: roomId } });
    if (matchRoom == null || matchRoom == 0) return 'not found';
    if (id == matchRoom.playerOneId) return 'player 1';
    else if (id == matchRoom.playerTwoId) return 'player 2';
    else return 'not found';
  },
};
