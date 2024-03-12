import mongoose  from 'mongoose';

export interface Log {
    startDate: string,
    endDate: string,
    itemsAdd: number,
    programName: string,
}

const logsSchema = new mongoose.Schema({
    startDate: String,
    endDate: String,
    itemsAdd: Number,
    programName: String,
});

const logs = mongoose.model('logs', logsSchema);

export default logs;