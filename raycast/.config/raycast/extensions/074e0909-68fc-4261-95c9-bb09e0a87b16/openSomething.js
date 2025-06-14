"use strict";var s=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var m=(t,r)=>{for(var e in r)s(t,e,{get:r[e],enumerable:!0})},d=(t,r,e,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of l(r))!u.call(t,o)&&o!==e&&s(t,o,{get:()=>r[o],enumerable:!(i=p(r,o))||i.enumerable});return t};var g=t=>d(s({},"__esModule",{value:!0}),t);var y={};m(y,{default:()=>f});module.exports=g(y);var n=require("@raycast/api");var a=require("node:child_process");async function c(t){if(process.platform!=="darwin")throw new Error("macOS only");let r=process.env.LC_ALL;delete process.env.LC_ALL;let{stdout:e}=(0,a.spawnSync)("osascript",["-e",t]);return process.env.LC_ALL=r,e.toString()}var f=async t=>{let r=t.arguments.thing,e=t.arguments.application,i=`
        set command to "open " & "${r}"
        try
          do shell script command
        on error err
          return err
        end try
    `;e&&(i=`
            set command to "open -a " & "${e} " & "${r}"
            try
              do shell script command
            on error err
              return err
            end try
        `);try{let o=(await c(i)).trim();o.includes("application")?await(0,n.showToast)(n.Toast.Style.Failure,"Error opening file:","Application not found"):o.includes("file")?await(0,n.showToast)(n.Toast.Style.Failure,"Error opening file:","File not found"):await(0,n.showToast)(n.Toast.Style.Success,"Done",o)}catch{await(0,n.showToast)(n.Toast.Style.Failure,"Something went wrong")}};
