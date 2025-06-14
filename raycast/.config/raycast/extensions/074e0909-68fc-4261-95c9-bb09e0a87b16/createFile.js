"use strict";var a=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var h=(n,t)=>{for(var i in t)a(n,i,{get:t[i],enumerable:!0})},S=(n,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of d(t))!m.call(n,r)&&r!==i&&a(n,r,{get:()=>t[r],enumerable:!(s=u(t,r))||s.enumerable});return n};var g=n=>S(a({},"__esModule",{value:!0}),n);var y={};h(y,{default:()=>w});module.exports=g(y);var e=require("@raycast/api");var l=require("node:child_process");async function p(n){if(process.platform!=="darwin")throw new Error("macOS only");let t=process.env.LC_ALL;delete process.env.LC_ALL;let{stdout:i}=(0,l.spawnSync)("osascript",["-e",n]);return process.env.LC_ALL=t,i.toString()}var w=async n=>{let t=(0,e.getPreferenceValues)().extensions?.trim().split(","),i=(0,e.getPreferenceValues)().printSaveDirectory,s=(0,e.getPreferenceValues)().closeAfterCreation,r=n.arguments.filename,f=r?.split(".").pop()||"",c=`
          if application "Finder" is not running then
  	        return "Finder not running"
          end if

          tell application "Finder"
            set pathList to (quoted form of POSIX path of (insertion location as alias))
            
            if exists (POSIX path of (insertion location as alias)) & "${r}" as POSIX file then
		          return "Already exists"
	          end if
          end tell

          set command to "touch " & pathList & "${r}"
          do shell script command

          return pathList
      `;t!==void 0&&(t.includes("*")||t.includes(f))&&(c+=`
      set command to "open " & pathList & "${r}"
      do shell script command
    `);try{let o=(await p(c)).trim();o=="Already exists"||o=="Finder not running"?await(0,e.showToast)(e.Toast.Style.Failure,"File creation error:",o):s?i===!0?await(0,e.showHUD)(`\u2705 File created -  ${o.substring(1,o.length-2)}/${r}`,{clearRootSearch:!0}):await(0,e.showHUD)("\u2705 File created",{clearRootSearch:!0}):i===!0?await(0,e.showToast)(e.Toast.Style.Success,"File created",`${o.substring(1,o.length-2)}/${r}`):await(0,e.showToast)(e.Toast.Style.Success,"File created")}catch{await(0,e.showToast)(e.Toast.Style.Failure,"Something went wrong")}};
