import * as through2 from 'through2'
import File = require('vinyl')
import * as admin from 'ml-admin'

export interface DatabaseOptions {
  action:ACTION
  user:admin.User
  ifExists?: admin.IF_EXISTS
  allRelatedDatabases?: boolean
}

export enum ACTION {
  CREATE,
  DELETE,
  CLEAR
}

export function database(options:DatabaseOptions) {
  return through2.obj(function(file: File, enc: string, callback: (error?, chunk?) => void) {
    let databaseSpec = <admin.DatabaseSpec> JSON.parse(file.contents.toString())

    let database = new admin.Database(options.user, databaseSpec)

    switch(options.action) {
      case ACTION.CREATE:
        database.create(options.ifExists || admin.IF_EXISTS.overwrite).then(function(){
          callback()
        }, callback)
        break
      case ACTION.DELETE:
        database.delete(options.allRelatedDatabases === undefined ? true : options.allRelatedDatabases).then(function(){
          callback()
        }, callback)
        break
      case ACTION.CLEAR:
        database.clear(options.allRelatedDatabases === undefined ? true : options.allRelatedDatabases).then(function(){
          callback()
        }, callback)
        break
    }
  })
}
