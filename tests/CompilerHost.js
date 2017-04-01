'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const CompilerHost = require( '../dist/compiler' ).CompilerHost;

describe( 'CompilerHost', () => {
	it( 'is a class', () => {
		expect( CompilerHost ).to.be.a( 'function' );
	} );
} );
