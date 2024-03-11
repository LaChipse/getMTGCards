import { format, isAfter, isBefore, toDate } from 'date-fns';
import mongoService from '../api/services/mongoService';
import mtgService from '../api/services/mtgService';
import excelService from '../api/services/excelService';

const createLastMTGExcels = async () => {
    console.log(`Début: ${format(new Date(), 'HH:mm:SS')}`)

    const lastUpdate = await mongoService.getLastSetSaved();
    const sets = await mtgService.getAllSets();

    const lastSet = sets.filter((set) => (
        isBefore(toDate(set.released_at), new Date())
        && isAfter(toDate(set.released_at), toDate(lastUpdate))
    ))

    await excelService.createLastSets(lastSet)
    
    console.log(`Fin: ${format(new Date(), 'HH:mm:SS')}`)
}

export default createLastMTGExcels;