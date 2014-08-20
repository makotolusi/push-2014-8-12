/**
 * This example shows how a grid can have its store and columns reconfigured dynamically.
 * By default, we start with no store or columns, we can define them later using the
 * reconfigure method.
 */
Ext.define('Push.view.collection.JobLog', {
	extend : 'Ext.container.Container',

	requires : ['Ext.grid.*', 'Ext.layout.container.HBox', 'Ext.layout.container.VBox', 'Push.util.Global'],
	xtype : 'joblog-grid',

	//<example>
	exampleTitle : 'Job Log',
	//</example>

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	width : 1000,

	lastNames : ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
	firstNames : ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
	cities : ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
	departments : ['Development', 'QA', 'Marketing', 'Accounting', 'Sales'],

	initComponent : function() {
		Ext.apply(this, {
			items : [{
				xtype : 'container',
				layout : 'hbox',
				defaultType : 'button',
				items : [{
					itemId : 'mapReduceLog',
					text : 'MapReduce日志',
					scope : this,
					handler : this.onShowMapReduceLogClick
				}, {
					itemId : 'tagLog',
					margin : '0 0 0 10',
					text : 'Tag结果日志',
					scope : this,
					handler : this.onShowTagLogClick
				}]
			}, {
				margin : '10 0 0 0',
				xtype : 'grid',
				title:'MapReduce',
				flex : 1,
				store : this.createMapReduceLogStore(),
				columns : [{
					flex : 1,
					text : 'MR名称',
					dataIndex : 'statisicJobName'
				}, {
					text : '更新时间',
					dataIndex : 'lastUpdateTime',
					width : 140
				}],
				viewConfig : {
					emptyText : 'Click a button to show a dataset',
					deferEmptyText : false
				}
			}]
		});
		this.callParent();
	},

	onShowMapReduceLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('MapReduce');
		grid.reconfigure(this.createMapReduceLogStore(), [{
			flex : 1,
			text : 'MR名称',
			dataIndex : 'statisicJobName'
		}, {
			text : '更新时间',
			dataIndex : 'lastUpdateTime',
			width : 140
		}]);
		this.down('#mapReduceLog').disable();
		this.down('#tagLog').enable();
		Ext.resumeLayouts(true);
	},

	onShowTagLogClick : function() {
		var grid = this.down('grid');
		Ext.suspendLayouts();
		grid.setTitle('Tag');
		grid.reconfigure(this.createTagLogStore(), [{
			text : '名称',
				width : 250,
			dataIndex : 'name'
		}, {
			text : '开始时间',
				width : 250,
			dataIndex : 'start'
		}, {
			text : '线程数',
			dataIndex : 'threadNum'
		}, {
			flex : 1,
			text : '状态',
			dataIndex : 'state'
		}, {
			flex : 1,
			text : '大小',
			dataIndex : 'size'
		}]);
		this.down('#tagLog').disable();
		this.down('#mapReduceLog').enable();
		Ext.resumeLayouts(true);
	},

	createMapReduceLogStore : function() {
		return new Ext.data.Store({
			fields : ['id', 'statisicJobName', 'lastUpdateTime'],
			autoLoad:true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				},
				url : Push.util.Global.ROOT_URL + '/web/manual/joblog/lastMapReduceTime'
			}
		});
	},

	createTagLogStore : function() {
		return new Ext.data.Store({
			fields : ['id', 'name', 'start', 'threadNum', 'state', 'size'],
			autoLoad:true,
			proxy : {
				type : 'ajax',
				actionMethods : {
					read : "POST"
				},
				reader : {
					type : 'json',
					rootProperty : 'data'
				},
				url : Push.util.Global.ROOT_URL + '/web/manual/joblog/tagLog'
			}
		});
	},

	// Fake data generation functions
	generateName : function() {
		var lasts = this.lastNames, firsts = this.firstNames, lastLen = lasts.length, firstLen = firsts.length, getRandomInt = Ext.Number.randomInt, first = firsts[getRandomInt(0, firstLen - 1)], last = lasts[getRandomInt(0, lastLen - 1)];

		return [first, last];
	},

	getUniqueName : function(used) {
		var name = this.generateName(), key = name[0] + name[1];

		if (used[key]) {
			return this.getUniqueName(used);
		}

		used[key] = true;
		return name;
	},

	getCity : function() {
		var cities = this.cities, len = cities.length;

		return cities[Ext.Number.randomInt(0, len - 1)];
	},

	getUniqueCity : function(used) {
		var city = this.getCity();
		if (used[city]) {
			return this.getUniqueCity(used);
		}

		used[city] = true;
		return city;
	},

	getEmployeeNo : function() {
		var out = '', i = 0;
		for (; i < 6; ++i) {
			out += Ext.Number.randomInt(0, 7);
		}
		return out;
	},

	getDepartment : function() {
		var departments = this.departments, len = departments.length;

		return departments[Ext.Number.randomInt(0, len - 1)];
	}
});
