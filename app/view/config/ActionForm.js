Ext.define('Push.view.config.ActionForm', {
	extend : 'Ext.window.Window',
	id : 'action-add-window',
	bodyPadding : 10,
	title : '类型',
	frame : true,
	closable : true,
	width : 500,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		var states = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : [{
				"id" : "SET_TAG",
				"name" : "增加标签"
			}, {
				"id" : "DEL_TAG",
				"name" : "删除标签"
			}]
		});
		var cate = Ext.create('Ext.form.ComboBox', {
			fieldLabel : '标签操作',
			store : states,
			name : 'operation',
			queryMode : 'local',
			displayField : 'name',
			value : me.operation,
			allowBlank : false,
			valueField : 'id'
		});
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'action-add-form',
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					value : me.caName,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'condition',
					fieldLabel : '表达式',
					value : me.condition,
					allowBlank : true
				}, cate, {
					xtype : 'tagfield',
					id : 'contentTypeTagField',
					name : 'contentTypes',
					fieldLabel : '行为',
					store : Ext.create('Push.store.ContentTypes'),
					displayField : 'name',
					valueField : 'id',
					width : 400,
					filterPickList : true,
					queryMode : 'remote',
					value : me.caContentTypes,
				}, {
					xtype : 'tagfield',
					id : 'tagTypeTagField',
					name : 'tagTypes',
					fieldLabel : '标签',
					store : Ext.create('Push.store.ContentTypes'),
					displayField : 'name',
					valueField : 'id',
					width : 400,
					filterPickList : true,
					queryMode : 'remote',
					value : me.caTagTypes,
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('action-add-form');
			var win = Ext.getCmp('action-add-window');
			var param = {};
			var formValue = form.getValues();
			var cts = Ext.getCmp('contentTypeTagField').getValue();
			var tags = Ext.getCmp('tagTypeTagField').getValue();
			var contentTypes = [];
			var tagTypes = [];
			Ext.Array.each(cts, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				contentTypes.push(v);
			});
			Ext.Array.each(tags, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				tagTypes.push(v);
			});
			param.action = contentTypes;
			param.tags = tagTypes;
			param.name = formValue.name;
			param.id = win.caId;
			param.condition = formValue.condition;
			param.operation = formValue.operation;
			console.log(param);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/contentType/saveAction',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : param,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('action-list-grid');
							p.getStore().reload();
							win.close();
						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						console.log(response);
						Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
							win.close();
						}, this);
					}
				});
			}
		}
	}]

});
