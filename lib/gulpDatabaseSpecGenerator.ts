import * as through2 from 'through2'
import File = require('vinyl')
import {DatabaseSpec, generateDatabaseSpec as _generateDatabaseSpec} from 'ml-admin'
import * as s from 'typescript-schema'
import * as path from 'path'

export interface Options {
  base?: string
  path: string
  modules?: string[]
}

export function generateDatabaseSpec(options: Options) {
  return through2.obj(function(file: File, enc: string, callback: () => void) {
    let schema = <s.Schema> JSON.parse(file.contents.toString())

    let modules = options.modules || Object.keys(schema)
    let base = options.base || file.base

    let self = this
    modules.forEach(function(moduleSchemaName) {
      let databaseSpec = _generateDatabaseSpec(schema, schema[moduleSchemaName])
      if (databaseSpec) {
        self.push(new File({
          base: base,
          path: path.join(base, options.path),
          contents: new Buffer(JSON.stringify(databaseSpec, null, '  '))
        }))
      }
    })

    callback()
  })
}
