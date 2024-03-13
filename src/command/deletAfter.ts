import { format } from 'date-fns';
import mongoService from '../services/mongoService';

const deleteAfter = async (date: string) => {
    console.log(`Début: ${format(new Date(), 'HH:mm:SS')}`)

    const deleted = await mongoService.deleteAfter(date)
    console.log(`${deleted.deletedCount} éléments supprimés`)

    console.log(`Fin: ${format(new Date(), 'HH:mm:SS')}`)
}

export default deleteAfter;