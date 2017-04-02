'use strict';

const chai = require( 'chai' );
const expect = chai.expect;
const handleErrors = require( '../dist/compiler' ).handleErrors;

describe( 'handleErrors', () => {
	it( 'is a function', () => {
		expect( handleErrors ).to.be.a( 'function' );
	} );
} );
