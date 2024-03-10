import express from 'express';
import mtgRoutes from './api/routes/mtgRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mtgRoutes);
app.use('/api/mtg', mtgRoutes);

// Route qui déclenche une erreur
app.get('/erreur', (req, res, next) => {
    const err = new Error('Erreur délibérée!');
    next(err);
});

app.use((err, req, res, next) => {
    console.error(`Erreur capturée: ${err.message}`);
    res.status(500).send('Quelque chose a mal tourné!');
});

export default app;