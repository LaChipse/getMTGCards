import mongoose  from 'mongoose';

export interface ICardExport {
    id: string;
    setName: string,
    code: string;
    cardCount: number;
    releaseDate: string;
    type: string;
    updateDate: string;
}

const cardsExportsSchema = new mongoose.Schema({
    id: String,
    setName: String,
    code: String,
    cardCount: Number,
    releaseDate: String,
    type: String,
    updateDate: String,
});

const cardsExports = mongoose.model('cards_exports', cardsExportsSchema);

export default cardsExports;