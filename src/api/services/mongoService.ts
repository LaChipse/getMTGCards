import 'dotenv/config'
import mongoose  from 'mongoose';
import cardsExports, { ICardExport } from '../bdd/cards_exports';
import logs, { Log } from '../bdd/logs';

const mongoService = {
    connect: async (db: string) => {
        await mongoose.connect("mongodb://localhost/local");
    },

    close: async () => {
        await mongoose.connection.close()
    },

    getLastSetSaved: async () => {
        const result = await cardsExports.aggregate([
            {
                $sort: { releaseDate: -1 },
            },
            {
                $project: { releaseDate: 1 }
            }
        ]).limit(1).exec()

        return result as Array<ICardExport>;
    },

    deleteAfter: async (date: string) => {
        const deleted = await cardsExports.deleteMany({ releaseDate: { "$gt": date } });
        return deleted;
    },

    saveItemsExported: async (datas: Array<ICardExport>) => {
        await cardsExports.create(datas)
        .then(doc => {
            console.log(`Nouveaux sets ajoutés (${datas.length}):`, doc);
        })
        .catch(err => {
            console.error('Erreur lors de l\'ajout :', err);
        });
    },

    saveLogs: async (data: Log) => {
        await logs.create(data)
        .then(doc => {
            console.log(`Log ajouté (${data}):`, doc);
        })
        .catch(err => {
            console.error('Erreur lors de l\'ajout :', err);
        });
    }
};

export default mongoService;