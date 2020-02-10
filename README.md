# Basic Gulp web project template

[![Build status][travis-image]][travis-url] [![Dependency status][dependency-image]][dependency-url]

Template is intended to begin project using CSS preprocessor SASS and task manager Gulp.

Author: [Rostyslav Miniukov](https://github.com/spiceleader/)

---

## Installation

```bash
git clone git@github.com:spiceleader/startup-gulp-template.git project-name
cd project-name
```

---

## Usage

`npm install` - install dependencies.

`npm start` - building project in dev mode and launching local server.

`npm run build` - building project.

`npm run deploy` - building project and deploying it on [GitHub Pages](https://pages.github.com).

`npm run dist` - building project and archieving it in zip.

`npm test` - launching linting test.

---

## Template Structure

```bash
.
├── build/            # project build directory (created automatically)
├── dist/             # directory in which the assembled project is archived (created automatically)
├── source/           # directory for placing project source files
│   ├── fonts/        # fonts directory
│   ├── img/          # images directory
│   │   └── content/  # content images directory for converting to webp format
│   │   └── icons/    # vector images directory for generating svg sprite
│   ├── js/           # JavaScript directory
│   ├── sass/         # styles directory
│   └── index.html    # page mark-up file
├── .babelrc          # Babel config
├── .editorconfig     # Editor config
├── .eslintrc.json    # ESLint config
├── .gitattributes    # Git attributes file
├── .gitignore        # Git ignore file
├── .npmrc            # npm config
├── .stylelintrc.json # stylelint config
├── .travis.yml       # Travis CI config
├── gulpfile.js       # Gulp tasks file
├── package.json      # npm dependencies and project settings file
├── package-lock.json # npm lock-file
└── README.md         # project documents
```

[travis-image]: https://travis-ci.org/spiceleader/startup-gulp-template.svg?branch=master
[travis-url]: https://travis-ci.org/spiceleader/startup-gulp-template
[dependency-image]: https://david-dm.org/spiceleader/startup-gulp-template/dev-status.svg?style=flat-square
[dependency-url]: https://david-dm.org/spiceleader/startup-gulp-template?type=dev
