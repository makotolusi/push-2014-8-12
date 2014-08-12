Ext.define('Push.view.config.ContentTypeForm', {
	extend : 'Ext.window.Window',
	id : 'contenttype-add-window',
	bodyPadding : 10,
	title : '类型',
	closable : true,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'contenttype-add-form',
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					value : me.ctName,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'index',
					fieldLabel : '标识',
					value : me.ctIndex,
					allowBlank : false
				},{
					xtype : 'textfield',
					name : 'desc',
					fieldLabel : '英文',
					value : me.ctDesc,
					allowBlank : true
				}, {
					vtype : 'url',
					xtype : 'textfield',
					name : 'resourceUri',
					value : me.resourceUri,
					allowBlank : true,
					fieldLabel : '来源'
				}, {
					xtype : 'textarea',
					name : 'code',
					value : me.code,
					allowBlank : true,
					fieldLabel : '关联代码'
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('contenttype-add-form');
			var win = Ext.getCmp('contenttype-add-window');
			var formValue = form.getValues();
			if (win.url == '/web/contentType/update') {
				formValue.id = win.ctId;
			}
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + win.url ,
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('contenttype-list-grid');
							p.getStore().reload();
							win.close();
						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
							win.close();
						}, this);
					}
				});
			}
		}
	}]

});
