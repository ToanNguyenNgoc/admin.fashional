"use strict";(self.webpackChunkadmin_fashional_pro=self.webpackChunkadmin_fashional_pro||[]).push([[907],{8907:function(e,n,t){t.r(n);var s=t(1413),a=t(6151),i=t(2235),d=t(1156),l=t(3654),c=t(5280),r=t(9965),o=t(2426),u=t.n(o),m=t(3199),h=t(1933),x=t(6871),j=t(184);var f=function(e){var n,t=e.item,s=e.query,a=(0,c.gI)(l.MM.PUT).resolve,o=(0,x.s0)(),m=(0,h.useQueryClient)(),f=(0,h.useMutation)({mutationFn:function(e){return i.VR.update(t.id,e)},onSuccess:function(){return m.invalidateQueries([r.xG.category,s])}}).mutate,p=(0,h.useMutation)({mutationFn:function(){return i.VR.delete(t.id)},onSuccess:function(){m.invalidateQueries([r.xG.category,s])}}),b=p.mutate,g=p.isLoading;return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-dark fw-bold mb-1 fs-6",children:t.name})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-dark fw-bold d-block mb-1 fs-6",children:t.name_slugify})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-6",children:null===(n=t.tag)||void 0===n?void 0:n.name})}),(0,j.jsx)("td",{children:(0,j.jsx)(d.U3,{disable:!a,value:t.status,onChange:function(e){return f({status:e.target.checked,tag_id:t.tag_id})}})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7",children:u()(t.updated_at).format("DD/MM/YYYY")})}),(0,j.jsx)("td",{children:(0,j.jsx)("span",{className:"text-muted fw-semobold text-muted d-block fs-7",children:u()(t.created_at).format("DD/MM/YYYY")})}),(0,j.jsxs)("td",{className:"text-end",children:[(0,j.jsx)(d.uR,{permissionPath:l.MM.PUT,children:(0,j.jsx)("button",{onClick:function(){return o(l.cp.update_id(t.id))},type:"submit",className:"btn btn-icon btn-success me-1 rounded-circle btn-sm",children:(0,j.jsx)("i",{className:"bi bi-pen fs-6"})})}),(0,j.jsx)(d.uR,{permissionPath:l.MM.DELETE,children:(0,j.jsx)("button",{onClick:function(){return b()},className:"btn btn-icon btn-danger me-1 rounded-circle btn-sm",children:g?(0,j.jsx)(d.fC,{}):(0,j.jsx)("i",{className:"bi bi-trash-fill fs-6"})})})]})]},t.id)};n.default=function(){var e,n,t,c,o=(0,x.s0)(),u=(0,x.TH)(),p=m.Z.parse(u.search),b=(0,h.useQuery)({queryKey:[r.xG.category,p],queryFn:function(){return i.VR.findAll({page:(null===p||void 0===p?void 0:p.page)||1,limit:15})}}).data;return(0,j.jsx)(d.uR,{permissionPath:l.MM.GET,isNavigate:!0,children:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(d.V1,{title:"Danh m\u1ee5c s\u1ea3n ph\u1ea9m",children:(0,j.jsx)(d.uR,{permissionPath:l.MM.POST,children:(0,j.jsx)(a.Z,{onClick:function(){return o(l.cp.create)},size:"medium",color:"primary",variant:"contained",children:"T\u1ea1o m\u1edbi danh m\u1ee5c"})})}),(0,j.jsxs)("div",{className:"card",children:[(0,j.jsx)("div",{className:"card-header border-0 pt-5",children:(0,j.jsx)("h3",{className:"card-title align-items-start flex-column",children:(0,j.jsxs)("span",{className:"text-muted mt-1 fw-semobold fs-7",children:[null===b||void 0===b||null===(e=b.context)||void 0===e?void 0:e.total," danh m\u1ee5c"]})})}),(0,j.jsx)("div",{className:"card-body py-3",children:(0,j.jsx)("div",{className:"table-responsive",children:(0,j.jsxs)("table",{className:"table align-middle gs-0 gy-4",children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{className:"fw-bold text-muted bg-light",children:[(0,j.jsx)("th",{className:"min-w-300px rounded-start",children:"T\xean danh m\u1ee5c"}),(0,j.jsx)("th",{className:"min-w-125px",children:"Slugify"}),(0,j.jsx)("th",{className:"min-w-125px",children:"Tag"}),(0,j.jsx)("th",{className:"min-w-100px",children:"Tr\u1ea1ng th\xe1i"}),(0,j.jsx)("th",{className:"min-w-100px",children:"C\u1eadp nh\u1eadt"}),(0,j.jsx)("th",{className:"min-w-100px",children:"Ng\xe0y t\u1ea1o"}),(0,j.jsx)("th",{className:"min-w-200px text-end rounded-end"})]})}),(0,j.jsx)("tbody",{children:null===b||void 0===b||null===(n=b.context.data)||void 0===n?void 0:n.map((function(e){return(0,j.jsx)(f,{item:e,query:p},e.id)}))})]})})}),(0,j.jsx)("div",{className:"d-flex justify-content-end",children:(0,j.jsx)(d.Aw,{totalPage:null!==(t=null===b||void 0===b?void 0:b.context.total_page)&&void 0!==t?t:1,onChangePage:function(e){var n=(0,s.Z)((0,s.Z)({},p),{},{page:e});o({pathname:u.pathname,search:m.Z.stringify(n)})},defaultPage:null!==(c=null===p||void 0===p?void 0:p.page)&&void 0!==c?c:1})})]})]})})}}}]);
//# sourceMappingURL=907.34df4c37.chunk.js.map