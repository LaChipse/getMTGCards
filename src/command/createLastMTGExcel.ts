import { format, isAfter, isBefore, toDate } from 'date-fns';
import mongoService from '../services/mongoService';
import mtgService from '../services/mtgService';
import excelService from '../services/excelService';

const createLastMTGExcels = async () => {
    const startDate = format(new Date(), 'HH:mm:ss')
    console.log(`Début: ${startDate}`);

    const result = await mongoService.getLastSetSaved();
    const sets = await mtgService.getAllSets();

    let lastUpdate = result[0]?.releaseDate || '1972-12-31';

    const lastSet = sets.filter((set) => (
        isBefore(toDate(set.released_at), new Date())
        && isAfter(toDate(set.released_at), toDate(lastUpdate))
    ))

    const itemsAdd = await excelService.createLastSets(lastSet)
    
    const endDate = format(new Date(), 'HH:mm:ss')
    console.log(`Fin: ${endDate}`)

    await mongoService.saveLogs({
        startDate,
        endDate,
        itemsAdd,
        programName: 'MTG getLast',
    })
}

export default createLastMTGExcels;