Ext.define('Push.view.push.AutoLocalForm', {
	extend : 'Ext.window.Window',
	xtype : 'autolocal-from',
	alise : 'widget.autolocal-from',
	requires : ['Ext.form.field.*', 'Push.util.Global', 'Push.store.ContentResources', 'Push.util.Global'],
	id : 'autolocal-form-win',
	title : '创建推送',
	frame : true,
		modal : true,
	width : 650,
	bodyPadding : 10,
	fieldDefaults : {
		labelWidth : 120
	},
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			items : {
					xtype : 'form',
					id : 'autolocal-form',
					reference : 'form',
					items : [{
						xtype : 'fieldset',
						style : {
							position : 'inherit'
						},
						width : 620,
						title : '基本信息',
						defaultType : 'checkbox', // each item will be a checkbox
						layout : 'anchor',
						items : [{
							xtype : 'textfield',
							width : 550,
							maxLength : 20,
							allowBlank : false,
							name : 'title',
							value : me.ctTitle,
							fieldLabel : '推送标题'
						}, {
							xtype : 'textareafield',
							width : 550,
							height : 150,
							maxLength : 40,
							allowBlank : false,
							name : 'content',
							value : me.ctContent,
							fieldLabel : '推送内容'
						},{
							xtype : 'fieldcontainer',
							fieldLabel : '天数/次数',
							layout : 'hbox',
							combineErrors : false,
							defaults : {
								hideLabel : true
							},
							items : [{
								name : 'time',
								xtype : 'numberfield',
								minValue : 0,
								maxValue : 24,
								width : 50,
								value : me.time,
								allowBlank : false
							}]
						}]
					}]
				}
		});
		me.callParent();
	},

	buttons : [{
		text : '发送',
		handler : function() {
			var me = this;
			var form = Ext.getCmp('autolocal-form');
			var win = Ext.getCmp('autolocal-form-win');
			var formValue = form.getValues();
			formValue.id = win.ctId;
			console.log(formValue);
			console.log(form.isValid());
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/push/saveAutoLocal',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
								var p = Ext.getCmp('autolocalpush-list');
								p.getStore().reload();
							win.close();

						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建失败:' + text, function() {
							var p = Ext.getCmp('push-list-grid-' + me.up('window').pushType);
							p.getStore().reload();
							win.close();
						}, this);
					}
				});
			}
		}
	}]
});
