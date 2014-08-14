Ext.define('Push.view.push.PushForm', {
	extend : 'Ext.window.Window',
	xtype : 'push-from',
	alise : 'widget.push-from',
	requires : ['Ext.form.field.*', 'Push.util.Global', 'Push.store.ContentResources'],
	id : 'push-form-win',
	title : '创建推送',
	frame : true,
	width : 650,
	bodyPadding : 10,
	fieldDefaults : {
		labelWidth : 120
	},
	initComponent : function() {
		var me = this;
		var session1 = Ext.create('Ext.data.Store', {
			model : 'Push.model.user.User',
		});
		session1.load();
		Ext.Ajax.request({
			url : Push.util.Global.ROOT_URL + '/web/configapps/findByAppid',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			jsonData : {
				appId : session1.getData().getAt(0).get('appId')
			},
			success : function(response) {
				var text = response.responseText;
				var configApp = Ext.decode(text).app;
				var contentTypes = Ext.create('Ext.data.Store', {
					fields : ['index', 'name'],
					data : configApp.contentTypes
				});
				var tagStore = Ext.create('Push.store.Tags');
				var index = '';
				var num = 0;
				tagStore.load({
					params : {
						index : '10002'
					},
					scope : this
				});
				//-----------------------------------------------------------------
				var tagField = {
					xtype : 'tagfield',
					id : 'tag-tagField',
					fieldLabel : '标签',
					store : tagStore,
					displayField : 'tagName',
					valueField : 'tagId',
					queryMode : 'remote',
					listeners : {
						'beforequery' : {
							fn : function(queryPlan, eOpts) {
								console.log(queryPlan.query);
								tagStore.load({
									params : {
										index : index,
										serviceName : queryPlan.query
									},
									scope : this
								});
							}
						},
					},
				};
				me.add({
					xtype : 'form',
					id : 'push-form',
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
							fieldLabel : '推送标题'
						}, {
							xtype : 'textareafield',
							width : 550,
							height : 150,
							maxLength : 40,
							allowBlank : false,
							name : 'content',
							fieldLabel : '推送内容'
						}, {
							xtype : 'checkboxgroup',
							fieldLabel : '客户端',
							cls : 'x-check-group-alt',
							columns : [100, 100],
							vertical : true,
							items : [{
								boxLabel : 'ANDROID',
								name : 'clientType',
								inputValue : 'ANDROID'
							}, {
								boxLabel : 'IOS',
								name : 'clientType',
								inputValue : 'IOS',
								checked : true
							}]
						}, {
							xtype : 'radiogroup',
							fieldLabel : '推送方式',
							cls : 'x-check-group-alt',
							columns : [100, 100],
							vertical : true,
							items : [{
								boxLabel : '即刻发送',
								name : 'pushType',
								checked : true,
								inputValue : 'IMMEDIATE'
							}, {
								boxLabel : '定时发送',
								name : 'pushType',
								inputValue : 'TIMING',
								handler : function(box, checked) {
									var timmingField = Ext.getCmp('timmingField');
									timmingField.el.animate({
										opacity : checked ? 1 : 0.3
									});
								}
							}]
						}, {
							xtype : 'datefield',
							name : 'timmingField',
							id : 'timmingField',
							style : 'opacity:.3',
							disabled : true,
							fieldLabel : '定时时间'
						}, {
							xtype : 'fieldcontainer',
							fieldLabel : '勿扰控制',
							layout : 'hbox',
							combineErrors : false,
							defaults : {
								hideLabel : true
							},
							items : [{
								name : 'sh',
								xtype : 'numberfield',
								width : 50,
								value : '8',
								allowBlank : false
							}, {
								xtype : 'displayfield',
								value : ':'
							}, {
								name : 'sm',
								xtype : 'numberfield',
								value : '0',
								width : 50,
								allowBlank : false
							}, {
								xtype : 'displayfield',
								value : '到'
							}, {
								name : 'eh',
								xtype : 'numberfield',
								value : '22',
								width : 50,
								allowBlank : false
							}, {
								xtype : 'displayfield',
								value : ':'
							}, {
								name : 'em',
								xtype : 'numberfield',
								value : '0',
								width : 50,
								allowBlank : false
							}]
						}]
					}, {
						xtype : 'fieldset',
						style : {
							position : 'inherit'
						},
						id : 'contentType-config',
						width : 620,
						title : '推送内容',
						layout : 'anchor',
						items : [{
							xtype : 'fieldcontainer',
							layout : 'hbox',
							combineErrors : true,
							defaultType : 'textfield',
							items : [{
								xtype : 'container',
								layout : 'hbox',
								defaultType : 'combo',
								margin : '0 0 5 0',
								items : [{
									fieldLabel : '推送类型',
									id : 'contentType',
									name : 'p',
									store : contentTypes,
									queryMode : 'local',
									displayField : 'name',
									valueField : 'index',
									listeners : {
										scope : this,
										'select' : function(combo, record, index) {
											var contentResource = Ext.getCmp('contentResource');
											contentResource.el.animate({
												opacity : record[0].data.desc == 'NEWS' ? 1 : 0.3
											});
											var cc = Ext.getCmp('contentType-config');
											if (cc.items.length != 1)
												cc.remove(cc.items.last());
											if (record[0].data.code != '')
												cc.add(Ext.decode(record[0].data.code));
										}
									},
									flex : 1
								}, {
									fieldLabel : '来源类型',
									id : 'contentResource',
									name : 's',
									queryMode : 'local',
									displayField : 'name',
									valueField : 'uri',
									style : 'opacity:.3',
									store : Ext.create('Push.store.ContentResources')
									// disabled : true
								}]
							}]
						}/**, {
						 xtype : 'fieldcontainer',
						 layout : 'hbox',
						 combineErrors : true,
						 defaultType : 'textfield',
						 items : [{
						 xtype : 'container',
						 layout : 'hbox',
						 defaultType : 'textfield',
						 margin : '0 0 5 0',
						 items : [{
						 fieldLabel : '内容ID',
						 name : 'i',
						 id:'auto-code-content-id',
						 flex : 1,
						 }, {
						 fieldLabel : '内容标题',
						 id:'auto-code-content-name',
						 name : 't',
						 }]
						 }]
						 }**/]
					}, {
						xtype : 'fieldset',
						title : '用户群',
						style : {
							position : 'inherit'
						},
						width : 620,
						layout : 'anchor',
						collapsible : true,
						defaults : {
							anchor : '100%'
						},
						items : [{
							xtype : 'radiogroup',
							fieldLabel : '标签类型',
							id : 'tag-radio',
							cls : 'x-check-group-alt',
							columns : [100, 100, 100, 100, 100],
							vertical : true,
							listeners : {
								'change' : {
									fn : function(ths, newValue, oldValue, eOpts) {
										index = newValue['tag-radio'];
										var tagField = Ext.getCmp('tag-tagField');
										tagStore.load({
											params : {
												index : index
											},
											scope : this
										});
										// tagStore.on("load", function() {
											// var num = tagStore.getCount();
											// if (num > 10) {
												// // var tagField = Ext.getCmp('tag-tagField');
												// tagField.queryMode = 'local';
												// console.log(tagField);
											// }
										// });
									}
								},
							},
							items : []
						}, tagField]
					}]
				});
				// ====================config=====================
				// var cc = Ext.getCmp('contentType-config');
				// cc.add(Ext.decode(configApp.contentTypes[0].code));
				var tr = Ext.getCmp('tag-radio');
				Ext.Array.each(configApp.tagTypes, function(obj, index, countriesItSelf) {
					tr.add({
						boxLabel : obj.name,
						name : 'tag-radio',
						resourceUri : obj.resourceUri,
						inputValue : obj.index
					});
				});
				/***=========================tag config===========================**/
				// var store = Ext.create('Push.store.Tags');

			},
			failure : function(response) {
				var text = response.responseText;
				Ext.MessageBox.alert('提示', '拉取应用配置失败!' + text, function() {
				}, this);
			}
		});

		Ext.apply(me, {
			items : {}
		});
		me.callParent();
	},

	buttons : [{
		text : '发送',
		handler : function() {
			var form = Ext.getCmp('push-form');
			var win = Ext.getCmp('push-form-win');
			var formValue = form.getValues();
			var params = {};
			params.title = formValue.title;
			params.content = formValue.content;
			params.clientType = formValue.clientType;
			params.pushType = formValue.pushType;
			var interval = {};
			interval.sh = formValue.sh;
			interval.sm = formValue.sm;
			interval.eh = formValue.eh;
			interval.em = formValue.em;
			params.interval = interval;
			//key value
			var keyValue = {};
			keyValue.p = Ext.getCmp('contentType').getValue();
			keyValue.s = Ext.getCmp('contentResource').getValue();
			var cc = Ext.getCmp('contentType-config');
			var autoCode = Ext.ComponentQuery.query('textfield[id^=auto-code-content]');
			// var fieldContainers = cc.items.items;

			Ext.Array.each(autoCode, function(obj, index, countriesItSelf) {
				keyValue[obj.getName()] = obj.getValue();
			});
			params.keyValue = keyValue;
			console.log(formValue);
			if (form.isValid()) {
				// Ext.Ajax.request({
				// url : ROOT_URL + '/web/push/condition',
				// method : 'POST',
				// headers : {
				// 'Content-Type' : 'application/json; charset=utf-8'
				// },
				// jsonData : params,
				// success : function(response) {
				// var text = response.responseText;
				// Ext.MessageBox.alert('提示', '创建成功', function() {
				// // var p = Ext.getCmp('menuManager');
				// // p.removeAll();
				// // p.initComponent();
				// win.close();
				// }, this);
				//
				// },
				// failure : function(response) {
				// var text = response.responseText;
				// Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
				// win.close();
				// }, this);
				// }
				// });
			}
		}
	}]
});
