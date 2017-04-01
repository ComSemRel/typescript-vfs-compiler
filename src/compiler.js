import { createProgram } from 'typescript';
import CompilerHost from './CompilerHost';
import handleErrors from './handleErrors';

function compiler( files, options = {} ) {
	const vfs = Object.assign( {}, files );
	const compilerHost = new CompilerHost( vfs );
	const program = createProgram( options.entry || [ 'index.ts' ], options, compilerHost );

	const result = program.emit();

	handleErrors( program, result );

	// MUTATING STATE – SO WRONG!!!
	return vfs;
}

export default compiler;
