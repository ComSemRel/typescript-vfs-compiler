'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const ts = require( '../dist/compiler' );

describe( 'module', () => {
	it( 'has proper exports', () => {
		expect( ts.default ).to.be.a( 'function' );
		expect( ts.CompilerHost ).to.be.a( 'function' );
	} );
} );
