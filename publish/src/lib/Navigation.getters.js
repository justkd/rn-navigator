"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getTypedRouteKeys=exports.getTypedBackgrounds=exports.getTypedRoutes=void 0;const Navigation_tokens_1=require("./Navigation.tokens"),getTypedRoutes=routes=>{const $entries=[...Object.entries(routes),[Navigation_tokens_1.backToken,()=>{}]];return{navigationRoutes:Object.fromEntries($entries)}};exports.getTypedRoutes=getTypedRoutes;const getTypedBackgrounds=backgrounds=>({navigationBackgroundKeys:Object.fromEntries(Object.keys(backgrounds).map((k=>[k,k]))),navigationBackgrounds:backgrounds});exports.getTypedBackgrounds=getTypedBackgrounds;const getTypedRouteKeys=arr=>{const $entries=[...arr.map((k=>[k,k])),[Navigation_tokens_1.backToken,()=>{}]],keys=Object.fromEntries($entries);Object.fromEntries([[Navigation_tokens_1.backToken,Navigation_tokens_1.backToken]]);return{navigationRouteKeys:keys}};exports.getTypedRouteKeys=getTypedRouteKeys;