'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "income_type", deps: []
 * createTable "expense_type", deps: []
 * createTable "record_type", deps: []
 * createTable "user", deps: []
 * createTable "role", deps: []
 * createTable "branch", deps: []
 * createTable "user-role", deps: [user, role]
 * createTable "asset", deps: [user]
 * createTable "attachment", deps: [user]
 * createTable "financial_record", deps: [user]
 * createTable "meeting_minute", deps: [user]
 *
 **/

const info = {
    "revision": 1,
    "name": "init-migrations",
    "created": "2025-01-12T16:04:20.855Z",
    "comment": ""
};

const migrationCommands = [

    {
        fn: "createTable",
        params: [
            "SequelizeMigrationsMeta",
            {
                "revision": {
                    "primaryKey": true,
                    "type": Sequelize.INTEGER
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING
                },
                "state": {
                    "allowNull": false,
                    "type": Sequelize.JSON
                },
            },
            {}
        ]
    },
    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision
            }],
            {}
        ]
    },
    {
        fn: "bulkInsert",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
                name: info.name,
                state: '{"revision":1,"tables":{"income_type":{"tableName":"income_type","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"expense_type":{"tableName":"expense_type","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"record_type":{"tableName":"record_type","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"authStrategy":{"seqType":"Sequelize.STRING(10)","allowNull":false},"fullname":{"seqType":"Sequelize.STRING(128)","allowNull":true},"username":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"avatar":{"seqType":"Sequelize.STRING(255)","allowNull":true},"email":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"phoneNumber":{"seqType":"Sequelize.STRING(13)"},"city":{"seqType":"Sequelize.STRING(30)","allowNull":true},"country":{"seqType":"Sequelize.STRING(30)","allowNull":true},"address":{"seqType":"Sequelize.STRING(255)","allowNull":true},"password":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":true},"verified":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"role":{"tableName":"role","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-role":{"tableName":"user-role","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"roleId":{"seqType":"Sequelize.STRING(20)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"role","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"branch":{"tableName":"branch","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"town":{"seqType":"Sequelize.STRING(128)","allowNull":false},"country":{"seqType":"Sequelize.STRING(128)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"asset":{"tableName":"asset","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"value":{"seqType":"Sequelize.DECIMAL(10,2)","allowNull":false},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"acquireDate":{"seqType":"Sequelize.DATE"},"status":{"seqType":"Sequelize.ENUM(\'Available\', \'Assigned\', \'Decommissioned\')","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"attachment":{"tableName":"attachment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"filePath":{"seqType":"Sequelize.STRING(128)","allowNull":false},"fileType":{"seqType":"Sequelize.STRING(50)","allowNull":false},"uploadedBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"relatedTo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"financial_record":{"tableName":"financial_record","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"incomeTypeId":{"seqType":"Sequelize.STRING(20)","allowNull":true},"expenseTypeId":{"seqType":"Sequelize.STRING(20)","allowNull":true},"recordTypeId":{"seqType":"Sequelize.STRING(20)","allowNull":true},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"amount":{"seqType":"Sequelize.DECIMAL(10,2)","allowNull":false},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"recordDate":{"seqType":"Sequelize.DATE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"meeting_minute":{"tableName":"meeting_minute","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"meetingDate":{"seqType":"Sequelize.DATE"},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "income_type",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "expense_type",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "record_type",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "authStrategy": {
                    "allowNull": false,
                    "type": Sequelize.STRING(10)
                },
                "fullname": {
                    "allowNull": true,
                    "type": Sequelize.STRING(128)
                },
                "username": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "avatar": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "email": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "phoneNumber": {
                    "type": Sequelize.STRING(13)
                },
                "city": {
                    "allowNull": true,
                    "type": Sequelize.STRING(30)
                },
                "country": {
                    "allowNull": true,
                    "type": Sequelize.STRING(30)
                },
                "address": {
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "password": {
                    "unique": true,
                    "allowNull": true,
                    "type": Sequelize.STRING(255)
                },
                "verified": {
                    "type": Sequelize.BOOLEAN
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "role",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "branch",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "unique": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "town": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "country": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "address": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "user-role",
            {
                "userId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-role_roleId_userId_unique",
                    "type": Sequelize.STRING(50)
                },
                "roleId": {
                    "onDelete": "CASCADE",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "role",
                        "key": "id"
                    },
                    "primaryKey": true,
                    "unique": "user-role_roleId_userId_unique",
                    "type": Sequelize.STRING(20)
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "asset",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "name": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "value": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL(10, 2)
                },
                "createdBy": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "acquireDate": {
                    "type": Sequelize.DATE
                },
                "status": {
                    "allowNull": false,
                    "type": Sequelize.ENUM('Available', 'Assigned', 'Decommissioned')
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "attachment",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "filePath": {
                    "allowNull": false,
                    "type": Sequelize.STRING(128)
                },
                "fileType": {
                    "allowNull": false,
                    "type": Sequelize.STRING(50)
                },
                "uploadedBy": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "relatedTo": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "financial_record",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "incomeTypeId": {
                    "allowNull": true,
                    "type": Sequelize.STRING(20)
                },
                "expenseTypeId": {
                    "allowNull": true,
                    "type": Sequelize.STRING(20)
                },
                "recordTypeId": {
                    "allowNull": true,
                    "type": Sequelize.STRING(20)
                },
                "description": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "amount": {
                    "allowNull": false,
                    "type": Sequelize.DECIMAL(10, 2)
                },
                "createdBy": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "recordDate": {
                    "type": Sequelize.DATE
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    },

    {
        fn: "createTable",
        params: [
            "meeting_minute",
            {
                "id": {
                    "primaryKey": true,
                    "allowNull": false,
                    "type": Sequelize.STRING(20)
                },
                "title": {
                    "allowNull": false,
                    "type": Sequelize.STRING(255)
                },
                "content": {
                    "allowNull": false,
                    "type": Sequelize.TEXT
                },
                "meetingDate": {
                    "type": Sequelize.DATE
                },
                "createdBy": {
                    "onDelete": "NO ACTION",
                    "onUpdate": "CASCADE",
                    "references": {
                        "model": "user",
                        "key": "id"
                    },
                    "allowNull": true,
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "updatedAt": {
                    "allowNull": false,
                    "type": Sequelize.DATE
                },
                "deletedAt": {
                    "type": Sequelize.DATE
                }
            },
            {}
        ]
    }
];

const rollbackCommands = [

    {
        fn: "bulkDelete",
        params: [
            "SequelizeMigrationsMeta",
            [{
                revision: info.revision,
            }],
            {}
        ]
    },



    {
        fn: "dropTable",
        params: ["user-role"]
    },
    {
        fn: "dropTable",
        params: ["asset"]
    },
    {
        fn: "dropTable",
        params: ["attachment"]
    },
    {
        fn: "dropTable",
        params: ["financial_record"]
    },
    {
        fn: "dropTable",
        params: ["meeting_minute"]
    },
    {
        fn: "dropTable",
        params: ["income_type"]
    },
    {
        fn: "dropTable",
        params: ["expense_type"]
    },
    {
        fn: "dropTable",
        params: ["record_type"]
    },
    {
        fn: "dropTable",
        params: ["user"]
    },
    {
        fn: "dropTable",
        params: ["role"]
    },
    {
        fn: "dropTable",
        params: ["branch"]
    }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }

      next();
    });
  },
  down: function(queryInterface, Sequelize) {
    let index = this.pos;

    return new Promise(function(resolve, reject) {
      function next() {
        if (index < rollbackCommands.length) {
          let command = rollbackCommands[index];
          console.log("[#"+index+"] execute: " + command.fn);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        }
        else resolve();
      }

      next();
    });
  },
  info
};
