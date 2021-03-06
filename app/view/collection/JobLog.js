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

});
