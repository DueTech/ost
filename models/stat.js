"use strict";

var Sequelize = require('sequelize');
var Defect = require("./defect");
var Product = require("./product");
var db = require('../db');

var STATUS = require("../static/js/const").STATUS;
var SIDE = require("../static/js/const").SIDE;

module.exports = db.define('stat', {
	product: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Product,
			key: "id"
		}
	},
	side: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	defect: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: Defect,
			key: "id"
		}
	}
}, {
	updatedAt: false,
	validate: {
		alowedSides: function () {
			if (this.side !== SIDE.LEFT && this.side !== SIDE.RIGHT) {
				throw new Error("Invalid side value");
			}
		},

		alowedStatus: function () {
			if (this.status !== STATUS.NOTOK && this.status !== STATUS.OK) {
				throw new Error("Invalid status value");
			}
		},

		defectSetWhenNeeded: function () {
			if (this.status === STATUS.NOTOK && this.defect === undefined) {
				throw new Error("If status is not on, defect is required");
			}
		}
	}
});