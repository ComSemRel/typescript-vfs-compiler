'use strict';

const chai = require( 'chai' );
const ts = require( 'typescript' );
const expect = chai.expect;
const CompilerHost = require( '../dist/compiler' ).CompilerHost;

describe( 'CompilerHost', () => {
	it( 'is a class', () => {
		expect( CompilerHost ).to.be.a( 'function' );
	} );

	it( 'requires object as a first parameter', () => {
		const fixtures = [
			'test',
			1,
			null,
			undefined,
			[],
			function() {}
		];

		fixtures.forEach( ( fixture ) => {
			expect( () => {
				new CompilerHost( fixture );
			} ).to.throw( TypeError, 'First parameter must be an object.' );
		} );

		expect( () => {
			new CompilerHost( {} );
		} ).to.not.throw( TypeError, 'First parameter must be an object.' );
	} );

	it( 'has all needed methods', () => {
		const methods = [
			'fileExists',
			'getCanonicalFileName',
			'getCurrentDirectory',
			'getDefaultLibFileName',
			'getNewLine',
			'getSourceFile',
			'useCaseSensitiveFileNames',
			'writeFile'
		];

		methods.forEach( ( method ) => {
			expect( CompilerHost.prototype[ method ] ).to.be.a( 'function' );
		} );
	} );
} );

describe( 'CompilerHost.prototype.fileExists', () => {
	it( 'returns true for files that exist in vfs', () => {
		const compiler = new CompilerHost( {
			'test.ts': ''
		} );

		expect( compiler.fileExists( 'test.ts' ) ).to.equal( true );
	} );

	it( 'uses native filesystem for other files', () => {
		const compiler = new CompilerHost( {
			'test.ts': ''
		} );

		expect( compiler.fileExists( 'package.json' ) ).to.equal( true );
		expect( compiler.fileExists( 'hublabubla.hublabubla' ) ).to.equal( false );
	} );
} );

describe( 'CompilerHost.prototype.getCanonicalFileName', () => {
	it( 'echoes input as string', () => {
		const compiler = new CompilerHost( {} );
		const fixtures = [
			[ 'test', 'test' ],
			[ 1, '1' ],
			[ {}, '[object Object]' ]
		];

		fixtures.forEach( ( fixture ) => {
			expect( compiler.getCanonicalFileName( fixture[ 0 ] ) ).to.equal( fixture[ 1 ] );
		} );
	} );
} );

describe( 'CompilerHost.prototype.getCurrentDirectory', () => {
	it( 'returns \'\'', () => {
		const compiler = new CompilerHost( {} );

		expect( compiler.getCurrentDirectory() ).to.equal( '' );
	} );
} );

describe( 'CompilerHost.prototype.getDefaultLibFileName', () => {
	it( 'returns path based on passed options', () => {
		const compiler = new CompilerHost( {} );
		const fixtures = [
			{},

			{
				target: 'ES6'
			},

			{
				target: 'ES5'
			}
		];

		fixtures.forEach( ( options ) => {
			expect( compiler.getDefaultLibFileName( options ) ).to.equal( ts.getDefaultLibFilePath( options ) );
		} );
	} );
} );

describe( 'CompilerHost.prototype.getNewLine', () => {
	it( 'returns Unix LF', () => {
		const compiler = new CompilerHost( {} );

		expect( compiler.getNewLine() ).to.equal( '\n' );
	} );
} );

describe( 'CompilerHost.prototype.getSourceFile', () => {
	it( 'creates SourceFile from string', () => {
		const compiler = new CompilerHost( {
			'test.ts': 'console.log( 42 )'
		} );

		expect( compiler.getSourceFile( 'test.ts', ts.ScriptTarget.ES6 ) ).to.be.an( 'object' );
	} );

	it( 'returns proper lib', () => {
		const compiler = new CompilerHost( {} );
		const path = ts.getDefaultLibFilePath( {} );

		expect( compiler.getSourceFile( path, ts.ScriptTarget.ES6 ) ).to.be.an( 'object' );
	} );
} );

describe( 'CompilerHost.prototype.useCaseSensitiveFileNames', () => {
	it( 'returns true', () => {
		const compiler = new CompilerHost( {} );

		expect( compiler.useCaseSensitiveFileNames() ).to.equal( true );
	} );
} );

describe( 'CompilerHost.prototype.writeFile', () => {
	it( 'writes back to in-memory storage', () => {
		const compiler = new CompilerHost( {
			'test.ts': 'interface ITest {}'
		} );

		compiler.writeFile( 'test.ts', 'hublabubla' );

		expect( compiler.files[ 'test.ts' ] ).to.equal( 'hublabubla' );
	} );
} );
