import { readFileSync, existsSync } from 'fs';
import { createSourceFile, getDefaultLibFilePath } from 'typescript';

class CompilerHost {
	constructor( files ) {
		if ( !files || typeof files !== 'object' || Array.isArray( files ) ) {
			throw new TypeError( 'First parameter must be an object.' );
		}

		this.files = files;
	}

	fileExists( fileName ) {
		if ( typeof this.files[ fileName ] !== 'undefined' ) {
			return true;
		}

		return existsSync( fileName );
	}

	getCanonicalFileName( fileName ) {
		return String( fileName );
	}

	getCurrentDirectory() {
		return '';
	}

	getDefaultLibFileName( options ) {
		return getDefaultLibFilePath( options );
	}

	getNewLine() {
		return '\n';
	}

	getSourceFile( fileName, languageVersion ) {
		const content = fileName.indexOf( 'lib.d.ts' ) !== -1 && fileName.indexOf( '/' ) !== -1 ?
			readFileSync( fileName, 'utf8' ) : this.files[ fileName ];

		return createSourceFile( fileName, content, languageVersion, '1.0', true );
	}

	useCaseSensitiveFileNames() {
		return true;
	}

	writeFile( fileName, data ) {
		this.files[ fileName ] = data;
	}
}

export default CompilerHost;
