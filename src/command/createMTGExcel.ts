import mongoService from '../api/services/mongoService';
import mtgService from '../api/services/mtgService';
import generateYears from '../utils/generateYears';
import excelService from '../api/services/excelService';

const createMTGExcels = async (firstYear: string, options: Record<string, string>) => {
    await mongoService.connect();

    const sets = await mtgService.getAllSets();
    let period: Array<number | null> = [];

    if (options.endYear) {
        period = generateYears(Number(firstYear), Number(options.endYear));
    } else {
        period = [Number(firstYear)]
    }

    await excelService.saveCardsBySets(sets, period)

    await mongoService.close();
    process.exit(0);
}

export default createMTGExcels