'use strict';

const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 * addColumn "categoryId" to table "financial_record"
 *
 **/

const info = {
    "revision": 3,
    "name": "init-migrations",
    "created": "2025-01-04T07:12:29.069Z",
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
                state: '{"revision":3,"tables":{"category":{"tableName":"category","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user":{"tableName":"user","schema":{"id":{"seqType":"Sequelize.STRING(50)","allowNull":false,"primaryKey":true},"authStrategy":{"seqType":"Sequelize.STRING(10)","allowNull":false},"fullname":{"seqType":"Sequelize.STRING(128)","allowNull":true},"username":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"avatar":{"seqType":"Sequelize.STRING(255)","allowNull":true},"email":{"seqType":"Sequelize.STRING(50)","allowNull":false,"unique":true},"phoneNumber":{"seqType":"Sequelize.STRING(13)"},"city":{"seqType":"Sequelize.STRING(30)","allowNull":true},"country":{"seqType":"Sequelize.STRING(30)","allowNull":true},"address":{"seqType":"Sequelize.STRING(255)","allowNull":true},"password":{"seqType":"Sequelize.STRING(255)","allowNull":true,"unique":true},"verified":{"seqType":"Sequelize.BOOLEAN"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"role":{"tableName":"role","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"user-role":{"tableName":"user-role","schema":{"userId":{"seqType":"Sequelize.STRING(50)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"roleId":{"seqType":"Sequelize.STRING(20)","unique":"user-role_roleId_userId_unique","primaryKey":true,"references":{"model":"role","key":"id"},"onUpdate":"CASCADE","onDelete":"CASCADE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"branch":{"tableName":"branch","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false,"unique":true},"town":{"seqType":"Sequelize.STRING(128)","allowNull":false},"country":{"seqType":"Sequelize.STRING(128)","allowNull":false},"address":{"seqType":"Sequelize.STRING(255)","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"asset":{"tableName":"asset","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"name":{"seqType":"Sequelize.STRING(128)","allowNull":false},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"acquireDate":{"seqType":"Sequelize.DATE"},"status":{"seqType":"Sequelize.ENUM(\'Available\', \'Assigned\', \'Decommissioned\')","allowNull":false},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"attachment":{"tableName":"attachment","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"filePath":{"seqType":"Sequelize.STRING(128)","allowNull":false},"fileType":{"seqType":"Sequelize.STRING(50)","allowNull":false},"uploadedBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"relatedTo":{"seqType":"Sequelize.STRING"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"financial_record":{"tableName":"financial_record","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"categoryId":{"seqType":"Sequelize.STRING"},"type":{"seqType":"Sequelize.STRING(128)","allowNull":false},"description":{"seqType":"Sequelize.TEXT","allowNull":false},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"recordDate":{"seqType":"Sequelize.DATE"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}},"meeting_minute":{"tableName":"meeting_minute","schema":{"id":{"seqType":"Sequelize.STRING(20)","allowNull":false,"primaryKey":true},"title":{"seqType":"Sequelize.STRING(255)","allowNull":false},"content":{"seqType":"Sequelize.TEXT","allowNull":false},"meetingDate":{"seqType":"Sequelize.DATE"},"createdBy":{"seqType":"Sequelize.STRING","allowNull":true,"references":{"model":"user","key":"id"},"onUpdate":"CASCADE","onDelete":"NO ACTION"},"createdAt":{"seqType":"Sequelize.DATE","allowNull":false},"updatedAt":{"seqType":"Sequelize.DATE","allowNull":false},"deletedAt":{"seqType":"Sequelize.DATE"}},"indexes":{}}}}'
            }],
            {}
        ]
    },




    {
        fn: "createTable",
        params: [
            "category",
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
        fn: "addColumn",
        params: [
            "financial_record",
            "categoryId",
            {
                "type": Sequelize.STRING
            }
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
        fn: "removeColumn",
        params: ["financial_record", "categoryId"]
    },
    {
        fn: "dropTable",
        params: ["category"]
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
