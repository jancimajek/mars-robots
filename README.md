# Boilerplate for NodeJS app

Use this as a quick start for a new NodeJS app. 

*Note:* Use the [`README.template.md`](README.template.md) as template for the actual app


## Dev dependencies

The following `devDependencies` are pre-installed & pre-configured:

- `babel` transpiler with the CLI tools configured to use the latest `@babel/preset-env` and `node | current` target .
- `babel-node` and `nodemon` for debugging
- `jest` and `babel-jest` for testing
- `eslint` with `airbnb` base config using `babel-eslint` parser and a few convenient custom rules.
- `husky` for integration with git, configured to run `eslint` on staged files and `jest` tests with coverage on every git commit


## Dependencies

The following `dependencies` are pre-installed & pre-configured:

- `@babel/polyfill`
- `debug` for logging modular debug output to use instead of `console.log`


## Scripts

The following `yarn`/`npm` `scripts` are pre-configured:

| Script  | Description |
|---------|--------------------------|
| `build` | transpile the code for production use into `build/` folder |
| `debug` | run the app in watch mode using on-the-fly transpiling |
| `husky:pre-commit` | run pre-commit lint and test by `husky` |
| `lint` | run ESLint on all files in `src/` directory |
| `lint:staged` | run ESLint on all staged files |
| `start` | build and run the app |
| `test` | run tests |
| `test:coverage` | run tests in verbose mode with coverage |
| `test:watch` | run tests in watch mode to automatically re-run tests on change |
