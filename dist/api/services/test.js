"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command('sous-commande')
    .description('Exécute une sous-commande.')
    .action(() => {
    console.log('Sous-commande exécutée!');
});
program.parse(process.argv);
//# sourceMappingURL=test.js.map