Ext.define('Push.view.push.PushForm', {
	extend : 'Ext.window.Window',
	xtype : 'push-from',
	alise : 'widget.push-from',
	requires : ['Ext.form.field.*', 'Push.util.Global', 'Push.store.ContentResources', 'Push.util.Global'],
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
		Ext.Ajax.request({
			url : Push.util.Global.ROOT_URL + '/web/configapps/findByAppid',
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=utf-8'
			},
			jsonData : {
			},
			success : function(response) {
				console.log(me.contentType);
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
					name : 'tag-tagField',
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
						}
					},
				};
				var clientType = {
					xtype : 'checkboxgroup',
					fieldLabel : '客户端',
					cls : 'x-check-group-alt',
					columns : [100, 100],
					vertical : true,
					items : [{
						boxLabel : 'ANDROID',
						name : 'clientType',
						id : 'android-checkbox',
						inputValue : 'ANDROID',
						checked : true
					}, {
						boxLabel : 'IOS',
						name : 'clientType',
						id : 'ios-checkbox',
						inputValue : 'IOS'
					}]
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
						}, clientType, {
							xtype : 'radiogroup',
							fieldLabel : '推送方式',
							cls : 'x-check-group-alt',
							columns : [100, 100],
							vertical : true,
							items : [{
								boxLabel : '即刻发送',
								name : 'pushType',
								id : 'pushType-im',
								checked : me.url == '/web/push/sendAgain' ? (me.pushType == 'IMMEDIATE' ? true : false) : true,
								disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'IMMEDIATE' ? false : true) : false,
								inputValue : 'IMMEDIATE'
							}, {
								boxLabel : '定时发送',
								name : 'pushType',
								checked : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? true : false) : false,
								disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : false,
								id : 'pushType-tim',
								inputValue : 'TIMING',
								handler : function(box, checked) {
									var timmingFieldC = Ext.getCmp('timmingFieldContainer');
									timmingFieldC.el.animate({
										opacity : checked ? 1 : 0.3
									});
									var timmingDateField = Ext.getCmp('timmingDateField');
									timmingDateField.disabled = false;
									var timmingField = Ext.getCmp('timmingField');
									timmingField.disabled = false;
								}
							}]
						}, {
							xtype : 'fieldcontainer',
							fieldLabel : '定时时间',
							id : 'timmingFieldContainer',
							style : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? 'opacity:1' : 'opacity:.3') : 'opacity:.3',
							disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : false,
							layout : 'hbox',
							combineErrors : false,
							defaults : {
								hideLabel : true
							},
							items : [{
								xtype : 'displayfield',
								value : '日期'
							}, {
								xtype : 'datefield',
								name : 'timmingDateField',
								id : 'timmingDateField',
								fieldLabel : '日期',
								format : 'Y-m-d',
								disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
								minValue : new Date(),
								padding : '0 0 0 10',
								allowBlank : false,
								width : 100
							}, {
								xtype : 'displayfield',
								padding : '0 0 0 10',
								value : '时间'
							}, {
								xtype : 'timefield',
								name : 'timmingField',
								disabled : me.url == '/web/push/sendAgain' ? (me.pushType == 'TIMING' ? false : true) : true,
								id : 'timmingField',
								fieldLabel : '时间',
								// minValue : '8:00 AM',
								// maxValue : '10:00 PM',
								increment : 30,
								allowBlank : false,
								width : 100,
								padding : '0 0 0 10',
								anchor : '100%'
							}]
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
								minValue : 0,
								maxValue : 24,
								width : 50,
								value : me.interval == undefined ? '8' : me.interval.sh,
								allowBlank : false
							}, {
								xtype : 'displayfield',
								value : ':',
								padding : '0 0 0 10'
							}, {
								name : 'sm',
								xtype : 'numberfield',
								value : me.interval == undefined ? '0' : me.interval.sm,
								padding : '0 0 0 10',
								minValue : 0,
								maxValue : 60,
								width : 50,
								allowBlank : false
							}, {
								xtype : 'displayfield',
								padding : '0 0 0 10',
								value : '到'
							}, {
								name : 'eh',
								xtype : 'numberfield',
								value : me.interval == undefined ? '22' : me.interval.eh,
								padding : '0 0 0 10',
								minValue : 0,
								maxValue : 24,
								width : 50,
								allowBlank : false
							}, {
								xtype : 'displayfield',
								padding : '0 0 0 10',
								value : ':'
							}, {
								name : 'em',
								xtype : 'numberfield',
								value : me.interval == undefined ? '0' : me.interval.em,
								padding : '0 0 0 10',
								minValue : 0,
								maxValue : 60,
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
									contentTypeFieldSet : true,
									name : 'p',
									store : contentTypes,
									queryMode : 'local',
									displayField : 'name',
									valueField : 'index',
									value : me.contentType == undefined ? '' : me.contentType.index,
									listeners : {
										scope : this,
										'select' : function(combo, record, index) {
											var contentResource = Ext.getCmp('contentResource');
											var n = 1;
											if (record[0].data.desc == 'NEWS' || record[0].data.desc == 'VIDEO') {
												contentResource.disabled = false;
												n = 1;
												var store = contentResource.getStore();
												if (record[0].data.desc == 'NEWS') {
													store = Ext.create('Push.store.ContentResources');
													store.filterBy(function(record) {
														return record.get('index') == 4 || record.get('index') == 2 || record.get('index') == 5;
													});
												} else if (record[0].data.desc == 'VIDEO') {
													store = Ext.create('Push.store.ContentResources');
													store.filterBy(function(record) {
														return record.get('index') == 1 || record.get('index') == 3 || record.get('index') == 6;
													});
												}
												contentResource.store = store;
												contentResource.bindStore(contentResource.store);
											} else {
												contentResource.disabled = true;
												n = 0.3;
											}
											contentResource.el.animate({
												opacity : n
											});
											var cc = Ext.getCmp('contentType-config');
											var l = cc.items.length;
											for (var i = 0; i < l - 1; i++) {
												cc.remove(cc.items.last());
											}
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
									contentTypeFieldSet : true,
									valueField : 'uri',
									value : me.contentType == undefined ? '' : me.contentType.uri,
									style : me.keyValue == undefined ? 'opacity:.3' : (me.keyValue.p == '1' || me.keyValue.p == '3') ? 'opacity:1' : 'opacity:.3',
									// store : Ext.create('Push.store.ContentResources'),
									disabled : me.keyValue == undefined ? true : (me.keyValue.p == '1' || me.keyValue.p == '3') ? false : true
								}]
							}]
						}]
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
										console.log(index);
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
						}, {
							xtype : 'radiogroup',
							fieldLabel : '标签关系',
							id : 'tag-rel-radio',
							cls : 'x-check-group-alt',
							columns : [100, 100],
							vertical : true,
							listeners : {
								'change' : {
									fn : function(ths, newValue, oldValue, eOpts) {
									}
								},
							},
							items : [{
								boxLabel : 'AND',
								name : 'tagRelation',
								inputValue : 'AND',
								checked : true
							}, {
								boxLabel : 'OR',
								name : 'tagRelation',
								inputValue : 'OR'
							}]
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

				if (me.ctClientType != undefined) {
					Ext.getCmp('android-checkbox').setValue(false);
					me.ctClientType == 'ANDROID' ? Ext.getCmp('android-checkbox').setValue(true) : Ext.getCmp('ios-checkbox').setValue(true);
				}
				//================================update=====================================
				if (me.url == '/web/push/sendAgain') {
					if (me.pushType == 'TIMING') {
						console.log(me.nextFireTime);
						var date = me.nextFireTime.split(' ')[0];
						var time = me.nextFireTime.split(' ')[1];
						var m=parseInt(time.split(':')[0]);
						var apm=m>12?'PM':'AM';
						m=m>12?m-12:m;
						var time=m+":"+time.split(':')[1]+" "+apm;
						var timmingDateField = Ext.getCmp('timmingDateField');
						timmingDateField.setValue(date);
						var timmingField = Ext.getCmp('timmingField');
						timmingField.setValue(time);
					}
					var contentType = Ext.getCmp('contentType');
					var record = contentType.getStore().findRecord('index', me.contentType.index);
					var code = Ext.decode(record.data.code);
					var cc = Ext.getCmp('contentType-config');
					Ext.Array.each(code, function(item, index, countriesItSelf) {
						Ext.Array.each(item.items[0].items, function(item, index, countriesItSelf) {
							// console.log(me.keyValue[item.name]);
							item.value = me.keyValue[item.name];
						});
					});
					if (record.data.code != '')
						cc.add(code);
					var contentResource = Ext.getCmp('contentResource');
					var store = contentResource.getStore();
					if (me.keyValue.p == '3') {
						store = Ext.create('Push.store.ContentResources');
						store.filterBy(function(record) {
							return record.get('index') == 4 || record.get('index') == 2 || record.get('index') == 5;
						});
					} else if (me.keyValue.p == '1') {
						store = Ext.create('Push.store.ContentResources');
						store.filterBy(function(record) {
							return record.get('index') == 1 || record.get('index') == 3 || record.get('index') == 6;
						});
					}
					contentResource.store = store;
					contentResource.bindStore(contentResource.store);
					contentResource.setValue(me.keyValue.s);
					// if (me.keyValue.p == '1' || me.keyValue.p == '3') {
					//
					// }
					//====================================tag========================================
					var tf = Ext.getCmp('tag-tagField');
					var tfStore = tf.getStore();
					tfStore.add(me.tags);
					if (me.tags.length != 0) {
						var tagsss = [];
						Ext.Array.each(me.tags, function(item, index, countriesItSelf) {
							tagsss.push(item.tagId);
						});
						tf.setValue(tagsss);
					}
				}
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
			var me = this;
			var session1 = Ext.getStore('Users');
			session1.load();
			console.log(session1.getData().getAt(0).get('appId'));
			var form = Ext.getCmp('push-form');
			var win = Ext.getCmp('push-form-win');
			var formValue = form.getValues();
			var params = {};
			params.id=win.ctId;
			params.title = formValue.title;
			params.content = formValue.content;
			params.clientType = formValue.clientType;
			params.pushType = formValue.pushType;
			params.appId = session1.getData().getAt(0).get('appId');
			var interval = {};
			interval.sh = formValue.sh;
			interval.sm = formValue.sm;
			interval.eh = formValue.eh;
			interval.em = formValue.em;
			params.interval = interval;
			//key value
			var keyValue = {};
			var component = Ext.ComponentQuery.query('[contentTypeFieldSet=true]');
			Ext.Array.each(component, function(obj, index, countriesItSelf) {
				keyValue[obj.getName()] = obj.getValue() == null ? '' : obj.getValue();
			});
			console.log(keyValue);
			var cc = Ext.getCmp('contentType-config');
			var autoCode = Ext.ComponentQuery.query('textfield[id^=auto-code-content]');
			var selectedTag = Ext.getCmp('tag-tagField').getValueRecords();
			var tags = [];
			Ext.Array.each(selectedTag, function(obj, index, countriesItSelf) {
				tags.push({
					tagId : obj.data.tagId,
					tagName : obj.data.tagName
					// code:obj.data.code
				});
			});
			params.keyValue = keyValue;
			params.tags = tags;
			params.tagRelation = Ext.getCmp('tag-rel-radio').getValue().tagRelation;
			var exp = "0";
			var timmingDateField = Ext.getCmp('timmingDateField').getRawValue();
			var timmingField = Ext.getCmp('timmingField').getRawValue();
			if (timmingDateField != '' && timmingField != '') {
				var y = timmingDateField.split('-')[0];
				var m = timmingDateField.split('-')[1];
				var d = timmingDateField.split('-')[2];
				var h = timmingField.split(':')[0];
				var M = timmingField.split(':')[1].split(' ')[0];
				var apm = timmingField.split(':')[1].split(' ')[1];
				if (apm == 'PM')
					h = parseInt(h) + 12;
				exp += " " + M + " " + h + " " + d + " " + m + " ? " + y;
				params.cronExp = exp;
			}

			console.log(params);
			console.log(form.isValid());
			if (form.isValid()) {
				Ext.Ajax.request({
					url : Push.util.Global.ROOT_URL + '/web/push/condition',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : params,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							var p = Ext.getCmp('push-list-grid-' + me.up('window').pushType);
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
