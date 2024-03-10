import { isAfter, isBefore, toDate } from 'date-fns';
import mongoService from '../api/services/mongoService';
import mtgService from '../api/services/mtgService';
import excelService from '../api/services/excelService';

const createLastMTGExcels = async () => {
    await mongoService.connect();

    const lastUpdate = await mongoService.getLastSetSaved();
    const sets = await mtgService.getAllSets();

    const lastSet = sets.filter((set) => (
        isBefore(toDate(set.released_at), new Date())
        && isAfter(toDate(set.released_at), toDate(lastUpdate))
    ))

    await excelService.createLastSets(lastSet)

    await mongoService.close();
    process.exit(0);
}

export default createLastMTGExcels;