import chalk from 'chalk';
import { getPreEmitDiagnostics, DiagnosticCategory, flattenDiagnosticMessageText } from 'typescript';

// Shamelessly copied from https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
function handleErrors( program, emitResult ) {
	const diagnostics = getPreEmitDiagnostics( program ).concat( emitResult.diagnostics );

	diagnostics.forEach( ( diagnostic ) => {
		const { line, character } = diagnostic.file.getLineAndCharacterOfPosition( diagnostic.start );
		const message = flattenDiagnosticMessageText( diagnostic.messageText, '\n' );
		let prefix = chalk.blue( '[Info]' );

		if ( diagnostic.category === DiagnosticCategory.Warning ) {
			prefix = chalk.yellow( '[Warning]' );
		} else if ( diagnostic.category === DiagnosticCategory.Error ) {
			prefix = chalk.red( '[Error]' );
		}

		console.log( `${ prefix } ${ diagnostic.file.fileName } (${ line + 1 },${ character + 1 }): ${message}` ); // eslint-disable-line no-console

		if ( diagnostic.category === DiagnosticCategory.Error ) {
			throw new Error( 'Compilation was unsuccessful!' );
		}
	} );

	if ( emitResult.emitSkipped ) {
		throw new Error( 'Compilation was unsuccessful' );
	}
}

export default handleErrors;
