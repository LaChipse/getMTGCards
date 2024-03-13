#!/usr/bin/env node

import { Command } from 'commander';
import createMTGExcels from './createMTGExcel';
import createLastMTGExcels from './createLastMTGExcel';
import deleteAfter from './deletAfter';
import mongoService from '../services/mongoService';

const program = new Command();

program
    .name("MTG")
    .description("Outil CLI pour créer des fichiers Excel à partir des données MTG.")
    .version('1.0.0');

program
    .command('create')
    .description('Création excel mtg.')
    .argument('<firstYear>', 'année de début')
    .option('-eY, --endYear <endYear>', 'ajoute une année de fin')
    .action(async (firstYear: string, options: Record<string, string>) => {
        await mongoService.connect();
        await createMTGExcels(firstYear, options);
        await mongoService.close();
        process.exit(0);
    });

program
    .command('getLast')
    .description('Création excel dernier set mtg.')
    .action(async () => {
        await mongoService.connect();
        await createLastMTGExcels();
        await mongoService.close();
        process.exit(0);
    });

program
    .command('deleteAfter')
    .description('Supprime données aprés date.')
    .argument('<date>', 'date')
    .action(async (date: string) => {
        await mongoService.connect();
        await deleteAfter(date);
        await mongoService.close();
        process.exit(0);
    });

program.parse(process.argv);