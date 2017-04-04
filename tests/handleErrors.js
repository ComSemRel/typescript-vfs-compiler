'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const sinon = require( 'sinon' );
const chalk = require( 'chalk' );
console.log( chalk.red ); // eslint-disable-line no-console
const handleErrors = require( '../dist/compiler' ).handleErrors;
const compiler = require( '../dist/compiler' ).default;

describe( 'handleErrors', () => {
	it( 'is a function', () => {
		expect( handleErrors ).to.be.a( 'function' );
	} );

	it( 'displays all errors before throwing', () => {
		const consoleSpy = sinon.spy( console, 'error' );

		expect( () => {
			compiler( {
				'index.ts': `function() {
					return
					'hello world';`
			} );
		} ).to.throw( Error, 'Compilation was unsuccessful!' );

		expect( consoleSpy.callCount ).to.equal( 3 );

		consoleSpy.restore();
	} );
} );
