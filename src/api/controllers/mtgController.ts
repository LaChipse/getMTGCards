import 'dotenv/config'
import excelService from '../services/excelService';
import mongoService from '../services/mongoService';
import mtgService from '../services/mtgService';
import generateYears from '../../utils/generateYears';
import { Request, Response } from 'express';
import setFilteredByPeriod from '../../utils/setPeriod';

const mtgController = {
    getExcelMTGCards: async (req: Request, res: Response) => {
        mongoService.connect(process.env.URL_API_LOCAL);

        const { firstDate, lastDate } = req.params;

        const sets = await mtgService.getAllSets();
        const setFiltered = lastDate ? setFilteredByPeriod(sets, Number(firstDate), Number(lastDate)) : setFilteredByPeriod(sets, Number(firstDate), Number(firstDate))

        let period = [];

        if (lastDate) {
            period = generateYears(Number(firstDate), Number(lastDate));
        } else {
            period = [firstDate]
        }

        excelService.saveCardsBySets(sets, period)
        res.send(setFiltered);
    },
};

export default mtgController;