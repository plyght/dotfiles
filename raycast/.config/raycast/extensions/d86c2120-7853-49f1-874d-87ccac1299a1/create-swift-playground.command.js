"use strict";var B=Object.create;var g=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var G=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,Q=Object.prototype.hasOwnProperty;var b=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),Y=(r,e)=>{for(var n in e)g(r,n,{get:e[n],enumerable:!0})},k=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of G(e))!Q.call(r,i)&&i!==n&&g(r,i,{get:()=>e[i],enumerable:!(t=q(e,i))||t.enumerable});return r};var m=(r,e,n)=>(n=r!=null?B(J(r)):{},k(e||!r||!r.__esModule?g(n,"default",{value:r,enumerable:!0}):n,r)),Z=r=>k(g({},"__esModule",{value:!0}),r);var U=b((ae,x)=>{"use strict";function _(r){var e=void 0;typeof r=="string"?e=[r]:e=r.raw;for(var n="",t=0;t<e.length;t++)n+=e[t].replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`"),t<(arguments.length<=1?0:arguments.length-1)&&(n+=arguments.length<=t+1?void 0:arguments[t+1]);var i=n.split(`
`),o=null;return i.forEach(function(s){var p=s.match(/^(\s+)\S+/);if(p){var y=p[1].length;o?o=Math.min(o,y):o=y}}),o!==null&&(n=i.map(function(s){return s[0]===" "?s.slice(o):s}).join(`
`)),n=n.trim(),n.replace(/\\n/g,`
`)}typeof x<"u"&&(x.exports=_)});var V=b((pe,O)=>{"use strict";var ee=require("os"),L=ee.homedir();O.exports=r=>{if(typeof r!="string")throw new TypeError(`Expected a string, got ${typeof r}`);return L?r.replace(/^~(?=$|\/|\\)/,L):r}});var re={};Y(re,{default:()=>te});module.exports=Z(re);var a=require("@raycast/api");var h=(t=>(t.iOS="ios",t.macOS="macos",t.tvOS="tvos",t))(h||{});var A=require("child_process"),D=require("util"),S=(0,D.promisify)(A.exec);var j=m(U());var w=(t=>(t.Empty="Empty",t.SwiftUI="SwiftUI",t.UIKit="UIKit",t))(w||{});var c=m(require("fs")),v=r=>c.default.promises.access(r,c.default.constants.F_OK).then(()=>!0).catch(()=>!1),le=c.default.promises.readdir,F=c.default.promises.mkdir,E=c.default.promises.rm,ce=c.default.promises.readFile,I=c.default.promises.writeFile,me=c.default.promises.rm;var N=m(V()),P=m(require("path"));var $=require("@raycast/api");function X(){return(0,$.getPreferenceValues)()}var d=class r{static{this.scaffoldTemplateFiles=[{name:"timeline",extension:"xctimeline",contents:`
      <?xml version="1.0" encoding="UTF-8"?>
      <Timeline version="3.0">
         <TimelineItems>
         </TimelineItems>
      </Timeline>
      `},{path:"playground.xcworkspace",name:"contents",extension:"xcworkspacedata",contents:`
      <?xml version="1.0" encoding="UTF-8"?>
      <Workspace version="1.0">
        <FileRef location="group:self:">
        </FileRef>
      </Workspace>
      `}]}static get defaultSwiftPlaygroundLocation(){return X().playgroundDefaultLocation}static async createSwiftPlayground(e,n){let t=await r.makeSwiftPlaygroundPath(e.location,e.name,n);if(!n&&await v(t))return{name:e.name,path:t,alreadyExists:!0,open:()=>S(`open ${t}`).then()};await F(t);let i=[...r.scaffoldTemplateFiles,r.swiftSourceContentsTemplateFile(e.template),r.contentsTemplateFile(e.platform)];try{await Promise.all(i.map(async o=>{let s=t;o.path&&(s=P.join(s,o.path),await F(s)),s=P.join(s,[o.name,o.extension].join(".")),await I(s,(0,j.default)(o.contents))}))}catch(o){try{await E(t,{recursive:!0})}catch(s){console.error(s)}throw o}return{name:e.name,path:t,alreadyExists:!1,open:()=>S(`open ${t}`).then()}}static async makeSwiftPlaygroundPath(e,n,t){let i="",o=null,s=(0,N.default)(e);do{let p=new Date().toLocaleDateString().replaceAll("/","-").replaceAll(".","-"),y=o==null?`${n}-${p}.playground`:`${n}-${p}-${o}.playground`;i=P.join(s,y),o=o==null?1:o+1}while(await v(i)&&t);return i}static contentsTemplateFile(e){return{name:"contents",extension:"xcplayground",contents:`
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <playground version='5.0' 
                  target-platform='${e.toLocaleLowerCase()}' 
                  buildActiveScheme='true' 
                  executeOnSourceChanges='false' 
                  importAppTypes='true'>
          <timeline fileName='timeline.xctimeline'/>
      </playground>
      `}}static swiftSourceContentsTemplateFile(e){let n;switch(e){case"Empty":n=`import Foundation

`;break;case"SwiftUI":n=`
        import PlaygroundSupport
        import SwiftUI
        
        struct ContentView: View {
        
            var body: some View {
                Text("Hello World")
            }
            
        }
        
        PlaygroundPage.current.liveView = UIHostingController(rootView: ContentView())
        `;break;case"UIKit":n=`
        import Foundation
        import PlaygroundSupport
        import UIKit

        class ViewController : UIViewController {
          override func viewDidLoad() {
            super.viewDidLoad()
          }
        }

        let viewController = ViewController()
        viewController.view.frame = CGRect(x: 0, y: 0, width: 300, height: 600)
        PlaygroundPage.current.liveView = viewController
        PlaygroundPage.current.needsIndefiniteExecution = true
        `;break}return{name:"Contents",extension:"swift",contents:n}}};var u=require("@raycast/api");async function R(r,e,n,t){let i=await(0,u.showToast)({style:u.Toast.Style.Animated,title:r});try{let o=await t();return i.style=u.Toast.Style.Success,i.title=e,{isSuccess:!0,result:o,toast:i}}catch(o){return console.error(o),i.style=u.Toast.Style.Failure,i.title=n,i.message=`${o}`,{isSuccess:!1,toast:i}}}var f=m(require("node:path"),1),W=m(require("node:os"),1),K=W.default.homedir();function T(r){let e=f.default.normalize(r)+f.default.sep;return(e.startsWith(K)?e.replace(K+f.default.sep,`~${f.default.sep}`):e).slice(0,-1)}var C=require("react"),l=require("react/jsx-runtime");function M(){let r=(0,a.useNavigation)(),[e,n]=(0,C.useState)(),[t,i]=(0,C.useState)();return(0,l.jsxs)(a.Form,{actions:(0,l.jsxs)(a.ActionPanel,{children:[(0,l.jsx)(a.Action.SubmitForm,{title:"Open or create Swift Playground",onSubmit:o=>H(o,r,!1)}),(0,l.jsx)(a.Action.SubmitForm,{title:"Create Swift Playground",onSubmit:o=>H(o,r,!0)})]}),children:[(0,l.jsx)(a.Form.TextField,{id:"name",title:"Name",defaultValue:"MyPlayground",error:e,onChange:()=>{e&&e.length>0&&n(void 0)},onBlur:o=>{o.target.value?.length==0?n("Please enter a name."):e&&e.length>0&&n(void 0)}}),(0,l.jsx)(a.Form.TextField,{id:"location",title:"Location",defaultValue:d.defaultSwiftPlaygroundLocation,error:t,onChange:()=>{t&&t.length>0&&i(void 0)},onBlur:o=>{o.target.value?.length==0?i("Please enter a location."):t&&t.length>0&&i(void 0)}}),(0,l.jsx)(a.Form.Dropdown,{id:"platform",title:"Platform",defaultValue:"ios",children:Object.keys(h).map(o=>o.toLocaleLowerCase()).map(o=>(0,l.jsx)(a.Form.Dropdown.Item,{value:o,title:o.replace("os","OS")},o))}),(0,l.jsx)(a.Form.Dropdown,{id:"template",title:"Template",defaultValue:"Empty",children:Object.keys(w).map(o=>(0,l.jsx)(a.Form.Dropdown.Item,{value:o,title:o},o))}),(0,l.jsx)(a.Form.Checkbox,{id:"open",label:"Open in Xcode after creation",defaultValue:!0})]})}async function H(r,e,n){if(!r.name||!r.location)return;let t=await R("Creating Swift Playground","Swift Playground successfully created","An error occurred while trying to create the Swift Playground",async()=>await d.createSwiftPlayground(r,n));if(!t.result)return;if(t.result.alreadyExists&&!r.open){t.toast.style=a.Toast.Style.Failure,t.toast.title="Swift Playground already exists";return}let i=["Swift Playground",t.result.alreadyExists?"opened":"created","at",T(t.result.path)].join(" ");if(r.open)try{await t.result.open(),await(0,a.showHUD)(i)}catch{t.toast.style=a.Toast.Style.Failure,t.toast.title="Swift Playground could not be opened"}else t.toast.title=i;e.pop()}var z=require("react/jsx-runtime"),te=()=>(0,z.jsx)(M,{});
