/**
 * This example shows how to create buttons.
 *
 * Buttons can contain text and an icon, and the icon can be aligned to any side of the
 * button using the `iconAlign` config.
 */
Ext.define('Push.view.config.Manual', {
	extend : 'Ext.Container',
	xtype : 'config-manual',
	cls : 'button-view',
	layout : 'vbox',
	//<example>
	themes : {
		classic : {
			width : 420,
			iconSmall : 'resources/images/icons/add16.gif',
			iconMedium : 'resources/images/icons/add24.gif',
			iconLarge : 'resources/images/icons/add.gif'
		},
		neptune : {
			width : 475,
			glyph : 72
		},
		'neptune-touch' : {
			width : 585
		}
	},
	//</example>

	initComponent : function() {
		Ext.apply(this, {
			width : this.themeInfo.width,
			items : [{
				xtype : 'container',
				layout : {
					type : 'table',
					columns : 2,
					tdAttrs : {
						style : 'padding: 5px 10px;'
					}
				},

				items : [{
					xtype : 'component',
					html : '最强攻略'
				}, {
					xtype : 'button',
					text : '开始',
					handler : function() {
						Ext.MessageBox.prompt('提示', '执行密码:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/sendBestWalkThrough',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									psw:msg2
								},
								success : function(response) {
									var text = response.responseText;

									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);

					}
				}, {
					xtype : 'component',
					html : '用户行为标签'
				}, {
					xtype : 'button',
					text : '开始',
					handler : function() {
							Ext.MessageBox.prompt('提示', '执行密码:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/sendPushTags',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									psw:msg2
								},
								success : function(response) {
									var text = response.responseText;

									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);
					}
				}, {
					xtype : 'component',
					html : '查询标签'
				}, {
					xtype : 'button',
					text : '查询',
					handler : function() {
							Ext.MessageBox.prompt('提示', '用户token:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/queryUserTag',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									token:msg2
								},
								success : function(response) {
									var text = response.responseText;
									console.log(Ext.decode(text));
									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);
					}
				},{
					xtype : 'component',
					html : '删除标签'
				}, {
					xtype : 'button',
					text : '执行',
					handler : function() {
							Ext.MessageBox.prompt('提示', '用户token:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/deleteUserTag',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									token:msg2
								},
								success : function(response) {
									var text = response.responseText;
									console.log(Ext.decode(text));
									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);
					}
				}, {
					xtype : 'component',
					html : '老数据标签'
				}, {
					xtype : 'button',
					text : '开始',
					handler : function() {
							Ext.MessageBox.prompt('提示', '用户token:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/sendOld',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									psw:msg2
								},
								success : function(response) {
									var text = response.responseText;
									console.log(Ext.decode(text));
									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);
					}
				}, {
					xtype : 'component',
					html : '同步app'
				}, {
					xtype : 'button',
					text : '开始',
					handler : function() {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/syncApp',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
								},
								success : function(response) {
									var text = response.responseText;
									console.log(Ext.decode(text));
									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
					}
				}, {
					xtype : 'component',
					html : '查询推送LOG'
				}, {
					xtype : 'button',
					text : '查询',
					handler : function() {
						Ext.MessageBox.prompt('提示', '信鸽推送日志:', function(msg,msg2) {
							Ext.Ajax.request({
								url : Push.util.Global.ROOT_URL + '/web/manual/queryPushByID',
								method : 'POST',
								headers : {
									'Content-Type' : 'application/json; charset=utf-8'
								},
								jsonData : {
									pushId:msg2
								},
								success : function(response) {
									var text = response.responseText;
									console.log(Ext.decode(text));
									Ext.MessageBox.alert('提示', text, function() {
									}, this);
								},
								failure : function(response) {
									var text = response.responseText;
									Ext.MessageBox.alert('提示', '失败-' + text, function() {
									}, this);
								}
							});
						}, this);
					}
				}]
			}]
		});
		this.callParent();
	},

	toggleDisabled : function(checkbox, newValue, oldValue) {
		var toggleFn = newValue ? 'disable' : 'enable';

		Ext.each(this.query('button'), function(item) {
			item[toggleFn]();
		});
	}
});
