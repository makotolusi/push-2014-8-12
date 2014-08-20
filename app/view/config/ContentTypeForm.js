Ext.define('Push.view.config.ContentTypeForm', {
	extend : 'Ext.window.Window',
	id : 'contenttype-add-window',
	bodyPadding : 10,
	title : '类型',
	closable : true,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		var states = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : [{
				"id" : "SERVICE",
				"name" : "业务"
			}, {
				"id" : "ACTION",
				"name" : "行为"
			}
			]
		});

		// Create the combo box, attached to the states data store
		var cate=Ext.create('Ext.form.ComboBox', {
			fieldLabel : '分类',
			store : states,
			name:'cate',
			queryMode : 'local',
			displayField : 'name',
			value : me.cate,
			valueField : 'id'
		});
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
				}, {
					xtype : 'textfield',
					name : 'desc',
					fieldLabel : '英文',
					value : me.ctDesc,
					allowBlank : true
				}, {
					xtype : 'textfield',
					name : 'tag',
					fieldLabel : '标签',
					value : me.ctTag,
					allowBlank : true
				}, cate,{
					xtype : 'tagfield',
					id : 'contentTypeTagField',
					name : 'action',
					fieldLabel : '行为',
					store : Ext.create('Push.store.Actions'),
					displayField : 'name',
					valueField : 'id',
					width : 275,
					filterPickList : true,
					queryMode : 'remote',
					value : me.action,
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
			var params = {};
			params.code = formValue.code;
			params.desc = formValue.desc;
			params.id = formValue.id;
			params.index = formValue.index;
			params.name = formValue.name;
			params.resourceUri = formValue.resourceUri;
			params.tag = formValue.tag;
			params.cate=formValue.cate;
			var sub = [];
			var cts = Ext.getCmp('contentTypeTagField').getValue();
			Ext.Array.each(cts, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				sub.push(v);
			});
			params.action = sub;
			console.log(params);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + win.url,
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : params,
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
