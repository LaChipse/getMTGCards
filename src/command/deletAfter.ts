import mongoService from '../api/services/mongoService';

const deleteAfter = async (date: string) => {
    await mongoService.connect();

    const deleted = await mongoService.deleteAfter(date)
    console.log(`${deleted.deletedCount} éléments supprimés`)

    await mongoService.close();
    process.exit(0);
}

export default deleteAfter;