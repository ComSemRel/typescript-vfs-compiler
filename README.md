# @comsemrel/typescript-vfs-compiler [![Build Status](https://travis-ci.org/ComSemRel/typescript-vfs-compiler.svg?branch=master)](https://travis-ci.org/ComSemRel/typescript-vfs-compiler) [![Dependency Status](https://david-dm.org/ComSemRel/typescript-vfs-compiler.svg)](https://david-dm.org/ComSemRel/typescript-vfs-compiler) [![devDependencies Status](https://david-dm.org/ComSemRel/typescript-vfs-compiler/dev-status.svg)](https://david-dm.org/ComSemRel/typescript-vfs-compiler?type=dev)

[![Greenkeeper badge](https://badges.greenkeeper.io/ComSemRel/typescript-vfs-compiler.svg)](https://greenkeeper.io/)

TypeScript compiler based on in-memory file system.

## Installation

Install it just like any other npm package:

```bash
npm install @comsemrel/typescript-vfs-compiler [--save-dev]
```

## Usage

This package exports compiler, which can be used **only** inside JS code:

```javascript
const compiler = require( '@comsemrel/typescript-vfs-compiler' ).default;

compiler( {
	'index.ts': 'console.log( 42 )'
} );
```

The first parameter is a "virtual filesystem" (what a fancy name!):

```javascript
{
	'someFile.ts': 'file content',
	'otherFile.ts': 'another file content'
}
```

The second parameter is an object containg [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

## License

See [LICENSE](./LICENSE) file for details.
