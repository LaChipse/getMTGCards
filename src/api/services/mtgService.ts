import * as Scry from "scryfall-sdk";

const mtgService = {
  getListeCardsBySet: async (setCode: string) => {
    const set = await Scry.Sets.byCode(setCode);
    const cardsBySet = await set.getCards();

    return cardsBySet;
  },

  getAllSets: async () => {
    const allSets = await Scry.Sets.all();
    
    return allSets;
  }
};
  
export default mtgService;