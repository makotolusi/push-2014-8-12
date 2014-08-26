Ext.define('Push.view.user.ManagerForm', {
	extend : 'Ext.window.Window',

	requires : ['Ext.form.Panel', 'Ext.button.Button', 'Ext.form.field.Text', 'Ext.form.field.ComboBox'],

	id : 'manager-add-window',
	bodyPadding : 10,
	title : '新增管理员',
	closable : true,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : {
				xtype : 'form',
				reference : 'form',
				id : 'manager-add-form',
				items : [{
					xtype : 'textfield',
					name : 'username',
					fieldLabel : '名称',
					value : me.username,
					allowBlank : false
				}, {
					xtype : 'textfield',
					name : 'email',
					fieldLabel : '邮箱',
					vtype : 'email',
					value : me.email,
					allowBlank : false
				},{
					xtype : 'tagfield',
					id : 'role-tag',
					name : 'roles',
					fieldLabel : '角色',
					store : Ext.create('Push.store.Roles'),
					displayField : 'name',
					valueField : 'id',
					width : 300,
					filterPickList : true,
					queryMode : 'remote',
					value : me.roles,
				}]
			},
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('manager-add-form');
			var win = Ext.getCmp('manager-add-window');
			var formValue = form.getValues();
			if (win.crud == 'update') {
				formValue.id = win.mangerId;
			}
			
			var rt = Ext.getCmp('role-tag').getValue();
			var rts = [];
			Ext.Array.each(rt, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				rts.push(v);
			});
			formValue.roles=rts;
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/manager/create',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建成功', function() {
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
