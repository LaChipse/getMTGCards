#!/usr/bin/env node

import { Command } from 'commander';
import createMTGExcels from './createMTGExcel';
import createLastMTGExcels from './createLastMTGExcel';
import deleteAfter from './deletAfter';

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
        await createMTGExcels(firstYear, options);
    });

program
    .command('getLast')
    .description('Création excel dernier set mtg.')
    .action(async () => {
        await createLastMTGExcels();
    });

program
    .command('deleteAfter')
    .description('Supprime données aprés date.')
    .argument('<date>', 'date')
    .action(async (date: string) => {
        await deleteAfter(date);
    });

program.parse(process.argv);