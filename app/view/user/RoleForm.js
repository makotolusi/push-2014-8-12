Ext.define('Push.view.user.RoleForm', {
	extend : 'Ext.window.Window',

	requires : ['Ext.form.Panel', 'Ext.button.Button', 'Ext.form.field.Text', 'Ext.form.field.ComboBox'],

	id:'role-add-window',
	bodyPadding : 10,
	title : '新增角色',
	closable : true,
	// modal : true,
	// cls : 'login',

	items : {
		xtype : 'form',
		reference : 'form',
		id : 'role-add-form',
		items : [{
			xtype : 'textfield',
			name : 'name',
			fieldLabel : '名称',
			allowBlank : false
		}]
	},

	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('role-add-form');
			var win = Ext.getCmp('role-add-window');
			var formValue=form.getValues();
			if (form.isValid()) {
				Ext.Ajax.request({
					url : uri + '/web/role/create',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建成功', function(){
								win.close();
						}, this);
					
					},
					failure : function(response) {
						var text = response.responseText;
						console.log(text);
						Ext.MessageBox.alert('提示', '创建失败-'+text,  function(){
								win.close();
						}, this);
					}
				});
			}
		}
	}]

});
