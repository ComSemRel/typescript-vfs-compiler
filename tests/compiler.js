'use strict';

const chai = require( 'chai' );
const sinon = require( 'sinon' );
const expect = chai.expect;
const compiler = require( '../dist/compiler' ).default;

describe( 'compiler', function() {
	// Disable timeout – TS compilation could be slooooow.
	this.timeout( 0 );

	it( 'is a function', () => {
		expect( compiler ).to.be.a( 'function' );
	} );

	it( 'compiles TS and returns compiled files', () => {
		const result = compiler( {
			'index.ts': 'import \'./test\';',
			'test.ts': 'console.log( 42 );'
		}, {} );

		expect( result ).to.have.all.keys( [
			'index.js',
			'index.ts',
			'test.ts',
			'test.js'
		] );
	} );

	it( 'generates declaration file', () => {
		const result = compiler( {
			'index.ts': 'interface ITest {}',
		}, {
			declaration: true
		} );

		expect( result ).to.have.all.keys( [
			'index.js',
			'index.ts',
			'index.d.ts'
		] );
	} );

	it( 'emit errors', () => {
		const spy = sinon.spy( console, 'error' );

		expect( () => {
			compiler( {
				'index.ts': 'class B {'
			} );
		} ).to.throw( Error, 'Compilation was unsuccessful!' );

		expect( spy.callCount ).to.equal( 1 );

		spy.restore();
	} );
} );
