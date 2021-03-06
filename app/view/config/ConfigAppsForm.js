Ext.define('Push.view.config.ConfigAppsForm', {
	extend : 'Ext.window.Window',
	id : 'configapps-add-window',
	bodyPadding : 10,
	title : '类型',
	frame : true,
	closable : true,
	width : 500,
	requires : ['Push.util.Global'],
	initComponent : function() {
		var me = this;
		var appTag = {
			xtype : 'tagfield',
			name : 'appIds',
			fieldLabel : '包含应用',
			store : Ext.create('Push.store.Apps'),
			displayField : 'name',
			valueField : 'appId',
			value : me.caAppIds,
			width : 400,
			filterPickList : true,
			queryMode : 'remote',
			publishes : 'value'
		};
		Ext.applyIf(me, {
			items : [{
				xtype : 'form',
				reference : 'form',
				id : 'configapps-add-form',
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '名称',
					value : me.caName,
					allowBlank : false
				}, appTag, {
					xtype : 'tagfield',
					id : 'contentTypeTagField',
					name : 'contentTypes',
					fieldLabel : '内容类型',
					store : Ext.create('Push.store.ContentTypes'),
					displayField : 'name',
					valueField : 'id',
					width : 300,
					filterPickList : true,
					queryMode : 'remote',
					value : me.caContentTypes,
				}, {
					xtype : 'tagfield',
					id : 'tagTypeTagField',
					name : 'tagTypes',
					fieldLabel : '标签类型',
					store : Ext.create('Push.store.ContentTypes'),
					displayField : 'name',
					valueField : 'id',
					width : 300,
					filterPickList : true,
					queryMode : 'remote',
					value : me.caTagTypes,
				},{
					xtype : 'tagfield',
					id : 'tag',
					name : 'tag',
					fieldLabel : '打标签',
					store : Ext.create('Push.store.ContentTypes'),
					displayField : 'name',
					valueField : 'id',
					width : 300,
					filterPickList : true,
					queryMode : 'remote',
					value : me.caTag,
				},{
					xtype : 'tagfield',
					id : 'collectionTag',
					name : 'collection',
					fieldLabel : '收集',
					store : Ext.create('Push.store.ConfigCollections'),
					displayField : 'chName',
					valueField : 'id',
					width : 300,
					filterPickList : true,
					queryMode : 'remote',
					value : me.collectionTag,
				}]
			}]
		});
		me.callParent(arguments);
	},
	buttons : [{
		text : '创建',
		handler : function() {
			var form = Ext.getCmp('configapps-add-form');
			var win = Ext.getCmp('configapps-add-window');
			var formValue = form.getValues();
			if (win.url == '/web/configapps/update') {
				formValue.id = win.caId;
			}
			var cts = Ext.getCmp('contentTypeTagField').getValue();
			var tags = Ext.getCmp('tagTypeTagField').getValue();
			var doTag = Ext.getCmp('tag').getValue();
			var collectionTag = Ext.getCmp('collectionTag').getValue();
			var contentTypes = [];
			var tagTypes = [];
			var doTags = [];
			var collectionTags = [];
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
			Ext.Array.each(doTag, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				doTags.push(v);
			});
			Ext.Array.each(collectionTag, function(name, index, countriesItSelf) {
				var v = {};
				v.id = name;
				collectionTags.push(v);
			});
			formValue.contentTypes = contentTypes;
			formValue.tagTypes = tagTypes;
			formValue.tag=doTags;
			formValue.collection=collectionTags;
			if (formValue.appIds == "")
				formValue.appIds = [];
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/configapps/update',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : formValue,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('configapps-list-grid');
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
