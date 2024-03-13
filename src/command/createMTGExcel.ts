import mtgService from '../services/mtgService';
import generateYears from '../utils/generateYears';
import excelService from '../services/excelService';
import { format } from 'date-fns';

const createMTGExcels = async (firstYear: string, options: Record<string, string>) => {
    console.log(`Début: ${format(new Date(), 'HH:mm:SS')}`)

    const sets = await mtgService.getAllSets();
    let period: Array<number | null> = [];

    if (options.endYear) {
        period = generateYears(Number(firstYear), Number(options.endYear));
    } else {
        period = [Number(firstYear)]
    }

    await excelService.saveCardsBySets(sets, period)
    
    console.log(`Fin: ${format(new Date(), 'HH:mm:SS')}`)
}

export default createMTGExcels