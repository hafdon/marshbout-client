(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["work"],{"2abd":function(e,t,o){"use strict";o.r(t);var l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("b-container",{attrs:{fluid:""}},[o("b-row",[o("b-col",{attrs:{xs:"12",lg:"6"}},[o("b-card",{attrs:{"no-body":"","bg-variant":"light"}},[o("b-card-body",[o("ZForm",{attrs:{id:e.selected_id,axios:{url:"work"},blankForm:e.form,controls:e.controls},on:{cancel:e.onCancel,submit:e.onSubmit,remove:e.onRemove}})],1)],1)],1),o("b-col",[o("b-card",{attrs:{"no-body":"","bg-variant":"light"},scopedSlots:e._u([{key:"header",fn:function(){return[o("b-form-input",{model:{value:e.tableFilter,callback:function(t){e.tableFilter=t},expression:"tableFilter"}})]},proxy:!0}])},[o("b-card-body",[o("ZTable",{ref:"worklist",attrs:{axios:e.axios,fields:e.fields,filter:e.tableFilter,"sticky-header":"750px"},on:{"row-selected":e.onRowSelected}})],1)],1)],1)],1)],1)},r=[],n=o("fa6a"),i=o("dad3"),a={name:"Work",props:{id:{required:!1,default:void 0}},watch:{id:{immediate:!0,handler:function(e,t){this.selected_id=+e}}},data:function(){return{selected_id:void 0,axios:{url:"work",method:"get",data:{}},fields:[{key:"title",sortable:!0},"contributor"],tableFilter:"",form:{title:"",contents:"",description:"",contributor:"",mechanics:"",attune:null,prep:null,etools:null,tags:[]},controls:{form_textarea:[{label:"title"},{label:"description",rows:4},{label:"contents",rows:4},{label:"mechanics",rows:4}],form_tags:[{label:"tags"}],form_input:[{label:"contributor",type:"text"}],form_checkbox:[{label:"prep"},{label:"etools"},{label:"attune"}]}}},components:{ZForm:n["a"],ZTable:i["a"]},created:function(){},mounted:function(){document.title="Work"},methods:{onRowSelected:function(e){var t=e.row;this.selected_id=null===t||void 0===t?void 0:t.id},onCancel:function(){this.selected_id=void 0},onSubmit:function(){this.refreshList()},onRemove:function(){this.refreshList()},refreshList:function(){this.$refs.worklist.loadItems()}}},s=a,c=o("2877"),d=Object(c["a"])(s,l,r,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=work.3729e310.js.map