"use strict";(self.webpackChunkadmin_fashional_pro=self.webpackChunkadmin_fashional_pro||[]).push([[359],{359:function(e,n,s){s.r(n);var i=s(8485),t=s(6481),a=s(7569),o=s(3654),r=s(5280),l=s(6541),u=s(5173),c=s(1933),d=s(6871),m=s(184);n.default=function(){var e=(0,d.UO)().id,n=(0,r.UD)(),s=n.result,h=n.notification,p=h.message,f=h.color,v=h.openAlert,x=n.onClose,g=(0,r.gI)(o.Ju.GET_ID).resolve,y=(0,c.useMutation)({mutationFn:function(n){return e?t.d3.update(e,n):t.d3.create(n)},onSuccess:function(){return s({message:e?"C\u1eadp nh\u1eadt th\xe0nh c\xf4ng":"T\u1ea1o m\u1edbi th\xe0nh c\xf4ng",color:"success"})},onError:function(){return s({message:"C\xf3 l\u1ed7i x\u1ea3y ra!",color:"error"})}}),j=y.mutate,C=y.isLoading,b=(0,u.TA)({initialValues:{name:"",permissions:[],status:!0},onSubmit:function(e){return j(e)}}),F=(0,c.useQuery)({queryKey:[l.xG.permission,e],queryFn:function(){return t.d3.findById(e||0)},enabled:!(!e||!g),onSuccess:function(e){var n,s,i,t;b.setFieldValue("name",null===(n=e.context)||void 0===n?void 0:n.name),b.setFieldValue("status",null===(s=e.context)||void 0===s?void 0:s.status),b.setFieldValue("permissions",null===(i=e.context)||void 0===i||null===(t=i.permissions)||void 0===t?void 0:t.map((function(e){return e.permission.id})))}}),N=F.refetch,V=F.isFetching;return(0,m.jsx)(a.uR,{permissionPath:o.Ju.POST,isNavigate:!0,children:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a.rH,{open:v,onClose:x,severity:f,message:p}),(0,m.jsx)(a.V1,{title:"C\u1ea5p quy\u1ec1n"}),(0,m.jsx)("div",{className:"card py-4",children:(0,m.jsxs)("form",{onSubmit:b.handleSubmit,className:"py-4 px-8 form",children:[(0,m.jsxs)("div",{className:"d-flex justify-content-end",children:[(0,m.jsx)(i.Z,{loading:C,type:"submit",color:"success",variant:"contained",children:"L\u01b0u"}),e&&(0,m.jsx)(i.Z,{onClick:function(){return N()},loading:V,className:"mx-2",type:"button",variant:"outlined",children:"Kh\xf4i ph\u1ee5c"})]}),(0,m.jsx)("div",{className:"column my-3",children:(0,m.jsx)(a.U3,{value:b.values.status,onChange:function(e){return b.setFieldValue("status",e.target.checked)},label:"Tr\u1ea1ng th\xe1i"})}),(0,m.jsxs)("div",{className:"column my-3",children:[(0,m.jsx)("label",{className:"form-label required",children:"T\xean quy\u1ec1n"}),(0,m.jsx)("input",{name:"name",value:b.values.name,onChange:b.handleChange,type:"text",className:"form-control form-control-solid",placeholder:"T\xean quy\u1ec1n"})]}),(0,m.jsx)(a.WV,{permission_ids:b.values.permissions,onChange:function(e){return b.setFieldValue("permissions",e)}})]})})]})})}}}]);
//# sourceMappingURL=359.4a6a1f06.chunk.js.map