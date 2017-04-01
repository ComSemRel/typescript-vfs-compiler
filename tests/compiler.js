'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const compiler = require( '../dist/compiler' ).default;

describe( 'compiler', () => {
	it( 'is a function', () => {
		expect( compiler ).to.be.a( 'function' );
	} );
} );
