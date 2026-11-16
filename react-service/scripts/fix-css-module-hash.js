/*
 * Corrige um bug do react-scripts 5 com CSS Modules.
 *
 * O CRA gera o nome de cada classe com um hash em base64 (ex.: Home_container__w+u63).
 * Quando o hash contém "+" ou "/", o nome sai escapado duas vezes no CSS final
 * (".Home_container__w\\\+u63") mas não no JS, então a regra nunca é aplicada.
 * Como o hash depende do caminho do arquivo, as classes afetadas mudam entre
 * Windows e o build Linux do Docker.
 *
 * Este script troca "+" e "/" do hash por "-" e "_" (base64url) em
 * react-dev-utils/getCSSModuleLocalIdent.js. Roda antes de `start` e `build`
 * e é idempotente.
 */
const fs = require('fs');

const MARKER = '/* widt: hash seguro para CSS Modules */';
const ORIGINAL = "fileNameOrFolder + '_' + localName + '__' + hash,";
const PATCHED =
  "fileNameOrFolder + '_' + localName + '__' + " +
  MARKER +
  " hash.replace(/\\+/g, '-').replace(/\\//g, '_'),";

const file = require.resolve('react-dev-utils/getCSSModuleLocalIdent');
const source = fs.readFileSync(file, 'utf8');

if (source.includes(MARKER)) {
  process.exit(0);
}

if (!source.includes(ORIGINAL)) {
  console.error(
    `[fix-css-module-hash] Não encontrei o trecho esperado em ${file}.\n` +
      'A versão do react-dev-utils mudou; revise este script antes de buildar.'
  );
  process.exit(1);
}

fs.writeFileSync(file, source.replace(ORIGINAL, PATCHED));
console.log('[fix-css-module-hash] getCSSModuleLocalIdent corrigido.');
