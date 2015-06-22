Gulp Tasks for Marklogic node.js Admin library
==

Overview
--

Provides gulp tasks for [ml-admin](https://github.com/christyharagan/ml-admin)

Usage
--

Install:
```
npm install gulp-ml-admin
```

Basic Usage:

```typescript
var gulp = require('gulp')
var generateSchema = require('gulp-typescript-schema').generateSchema
var generateDatabaseSpec = require('gulp-ml-admin').generateDatabaseSpec

gulp.task('generate', function() {
  return gulp.src('lib/**/*.ts').pipe(generateSchema({
    path: './schema.json'
  })).pipe(generateDatabaseSpec({
    path: './databaseSpec.json'
  })).pipe(gulp.dest('dist'))
})
```
