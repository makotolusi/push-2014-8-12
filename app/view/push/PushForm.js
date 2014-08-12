Ext.define('Push.view.push.PushForm', {
	extend : 'Ext.window.Window',
	xtype : 'push-from',
	alise : 'widget.push-from',
	requires : ['Ext.form.field.*'],
	id:'push-form-win',
	title : '创建推送',
	frame : true,
	width : 650,
	bodyPadding : 10,
	fieldDefaults : {
		labelWidth : 120
	},
	otherContent : [{
		type : 'Store',
		path : 'app/store/States.js'
	}, {
		type : 'Model',
		path : 'app/model/State.js'
	}],
	items : {
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
					inputValue :  'IOS',
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
						name : 'email',
						flex : 1,
					}, {
						fieldLabel : '来源类型',
						name : 'phone',
						style : 'opacity:.3',
						disabled : true
					}]
				}]
			}, {
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
						fieldLabel : '内容ID或URL',
						name : 'email',
						flex : 1,
					}, {
						fieldLabel : '内容标题',
						name : 'phone',
					}]
				}]
			}]
		}, {
			/*====================================================================
			* RadioGroup examples
			*====================================================================*/
			// NOTE: These radio examples use the exact same options as the checkbox ones
			// above, so the comments will not be repeated.  Please see comments above for
			// additional explanation on some config options.
			xtype : 'fieldset',
			title : '用户群',
			style : {
				position : 'inherit'
			},
			width : 620,
			// in this section we use the form layout that will aggregate all of the fields
			// into a single table, rather than one table per field.
			layout : 'anchor',
			collapsible : true,
			defaults : {
				anchor : '100%'
			},
			items : [{
				xtype : 'radiogroup',
				fieldLabel : '标签类型',
				cls : 'x-check-group-alt',
				columns : [100, 100, 100, 100, 100],
				vertical : true,
				items : [{
					boxLabel : 'Item 1',
					name : 'rb-custwidth',
					inputValue : 1
				}, {
					boxLabel : 'Item 2',
					name : 'rb-custwidth',
					inputValue : 2,
					checked : true
				}, {
					boxLabel : 'Item 3',
					name : 'rb-custwidth',
					inputValue : 3
				}, {
					boxLabel : 'Item 4',
					name : 'rb-custwidth',
					inputValue : 4
				}, {
					boxLabel : 'Item 5',
					name : 'rb-custwidth',
					inputValue : 5
				}, {
					boxLabel : 'Item 5',
					name : 'rb-custwidth',
					inputValue : 5
				}, {
					boxLabel : 'Item 5',
					name : 'rb-custwidth',
					inputValue : 5
				}, {
					boxLabel : 'Item 5',
					name : 'rb-custwidth',
					inputValue : 5
				}, {
					boxLabel : 'Item 5',
					name : 'rb-custwidth',
					inputValue : 5
				}]
			}, {
				xtype : 'tagfield',
				fieldLabel : '标签',
				store : {
					type : 'states'
				},
				reference : 'states',
				displayField : 'state',
				valueField : 'abbr',
				filterPickList : true,
				queryMode : 'local',
				publishes : 'value'
			}]
		}]
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
			var interval={};
			interval.sh=formValue.sh;
			interval.sm=formValue.sm;
			interval.eh=formValue.eh;
			interval.em=formValue.em;
			params.interval=interval;
			console.log(formValue);
			if (form.isValid()) {
				Ext.Ajax.request({
					url : ROOT_URL + '/web/push/condition',
					method : 'POST',
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					jsonData : params,
					success : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建成功', function() {
							// var p = Ext.getCmp('menuManager');
							// p.removeAll();
							// p.initComponent();
							win.close();
						}, this);

					},
					failure : function(response) {
						var text = response.responseText;
						Ext.MessageBox.alert('提示', '创建失败-' + text, function() {
							win.close();
						}, this);
					}
				});
			}
		}
	}]
});
