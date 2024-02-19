const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var Tile = require('./TileModel');
var Player = require("../models/Player");

class ChanceTile extends Tile {
    constructor(id, picture, chanceText){
        super('Chance', id); //Should this be name so that we can give each chance card it's own name
        this.chanceText = chanceText;
        this.picture = picture;
    }

    static changeMoney = async (id, money) => {

        const player = await Player.find(id, null);

        if (!player) {
            console.log(`Error: player ${id} not found in the database`);
            return;
        }
        let newBalance = player.money + money;
        let user = await prisma.user.update({
            where: {
                id: player.id
            },
            data: {
                money: newBalance
            },
            include: {
                properties: true
            }
        })
        return user;
    }

}

module.exports = ChanceTile