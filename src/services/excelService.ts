import * as Scry from "scryfall-sdk";
import Excel from 'exceljs';
import {format, toDate} from 'date-fns';
import mtgService from "./mtgService";
import mongoService from "./mongoService";
import fs from 'fs';
import { ICardExport } from "../bdd/cards_exports";
import setFilteredByPeriod from "../utils/setPeriod";

const excelService = {
    saveCardsBySets: async (sets: Array<Scry.Set>, dates: Array<number>) => {
        for await (const date of dates) {
            const datasSaved: Array<ICardExport | null> = [];

            const directoryPath = `public/setsMTG/${date}`;
            fs.mkdirSync(directoryPath, { recursive: true })

            const setsByDate = setFilteredByPeriod(sets, date, date);

            for await (const set of setsByDate) {

                const result = await excelService.createExcels(set, directoryPath);
                datasSaved.push(result)
            };
            await mongoService.saveItemsExported(datasSaved)
        }
    },

    createLastSets: async (sets: Array<Scry.Set>) => {
        const datasSaved: Array<ICardExport | null> = [];

        for await (const set of sets) {

            const date = format(toDate(set.released_at), "yyyy");
            const directoryPath = `public/setsMTG/${date}`;

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true })
            }

            const result = await excelService.createExcels(set, directoryPath);
            datasSaved.push(result)
        }
        await mongoService.saveItemsExported(datasSaved)
        return datasSaved.length
    },

    createExcels: async (set: Scry.Set, path: string) => {
        const cardsBySet = await mtgService.getListeCardsBySet(set.code)
        const file = `${path}/${set.name.replace(/[&\/\\#,+() $~%.'":*?<>{}]/g,'_')}.xlsx`

        // Création d'un nouveau workbook
        let workbook = new Excel.Workbook();
        // Ajout d'une nouvelle feuille avec un nom
        const worksheet = workbook.addWorksheet(set.name.replace(/[&\/\\#,+() $~%.'":*?<>{}]/g,'_'));

        // Ajout d'un en-tête de colonne
        worksheet.columns = [
            { header: 'Id', key: 'id', width: 45 },
            { header: 'Nom', key: 'name', width: 45 },
            { header: 'Date de sortie', key: 'releasedAt', width: 20 },
            { header: 'Coût de mana', key: 'manaCost', width: 20 },
            { header: 'Coût converti de mana', key: 'cmc', width: 10 },
            { header: 'Type', key: 'typeLine', width: 50 },
            { header: 'Text', key: 'text', width: 50 },
            { header: 'Attaque', key: 'power', width: 10 },
            { header: 'Endurance', key: 'toughness', width: 10 },
            { header: 'Mots clés', key: 'keywords', width: 35 },
            { header: 'Extension', key: 'set', width: 10 },
            { header: 'Nom de l\'extension', key: 'setName', width: 40 },
            { header: 'Type de l\'extension', key: 'setType', width: 25 },
            { header: 'Rareté', key: 'rarity', width: 15 },
            { header: 'Artiste', key: 'artist', width: 20 },
        ];

        cardsBySet.forEach(cards => {
            worksheet.addRow([
                cards?.id || '', 
                cards?.name || '', 
                cards?.released_at || '',
                cards?.mana_cost?.replace('B', 'N').replace('U', 'Ble').replace('W', 'Bla').replace('G', 'V')  || '',
                cards?.cmc || '',
                cards?.type_line || '',
                cards?.oracle_text || '',
                Number(cards?.power) || '',
                Number(cards?.toughness) || '',
                cards?.keywords.join(', ') || '',
                cards?.set || '',
                cards?.set_name || '',
                cards?.set_type || '',
                cards?.rarity || '',
                cards?.artist || '',
            ]);
        });

        // Sauvegarde du fichier Excel sur le disque
        await workbook.xlsx.writeFile(file);
        console.log('Fichier Excel créé avec succès !');

        return {
            id: set.id,
            setName: set.name,
            code: set.code, 
            cardCount: set.card_count,
            releaseDate: set.released_at,
            type: set.set_type,
            updateDate: format(new Date(), 'dd/MM/yyyy - HH:mm:ss')
        }
    }
};

export default excelService;