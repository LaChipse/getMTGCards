import mongoose  from 'mongoose';
import cardsExports, { ICardExport } from '../bdd/cards_exports';

const mongoService = {
    connect: async () => {
        await mongoose.connect('mongodb://localhost/local');
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

        return result[0].releaseDate as string;
    },

    deleteAfter: async (date: string) => {
        const deleted = await cardsExports.deleteMany({ releaseDate: { "$gt": date } });
        return deleted;
    },

    saveDate: async (datas: Array<ICardExport>) => {
        await cardsExports.create(datas)
        .then(doc => {
            console.log(`Nouveau sets ajoutée (${datas.length}):`, doc);
        })
        .catch(err => {
            console.error('Erreur lors de l\'ajout :', err);
        });
    }
};

export default mongoService;