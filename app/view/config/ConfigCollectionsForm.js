Ext.define('Push.view.config.ConfigCollectionsForm', {
	extend : 'Ext.window.Window',
	id : 'configcollections-add-window',
	bodyPadding : 10,
	title : '收集',
	frame : true,
	closable : true,
	width : 500,
	height : 600,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
			var type = Ext.create('Ext.data.Store', {
			fields : ['en', 'name'],
			data : [{
				"en" : "DATA",
				"name" : "数据收集"
			}, {
				"en" : "STATICES",
				"name" : "数据统计"
			}]
		});
		console.log(me.ttype);
		var typeCombo = Ext.create('Ext.form.ComboBox', {
			fieldLabel : '类型',
			store : type,
			name:'type',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'en',
				value : me.ttype,
			id : 'push-collection-type'
		});
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'configcollections-add-form',
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					value : me.caName,
					allowBlank : false
				}, typeCombo,{
					xtype : 'textfield',
					name : 'chName',
					fieldLabel : '中文',
					value : me.chName,
					allowBlank : false
				},{
					xtype : 'textarea',
					name : 'code',
					fieldLabel : '代码',
					width : 400,
					height : 400,
					value : me.code,
					allowBlank : false
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('configcollections-add-form');
			var win = Ext.getCmp('configcollections-add-window');
			var formValue = form.getValues();
			if (win.url == '/web/configcollections/update') {
				formValue.id = win.caId;
			}
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/configcollections/save',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('configcollections-list-grid');
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
