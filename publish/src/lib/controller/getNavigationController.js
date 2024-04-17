"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getNavigationController=void 0;const jsx_runtime_1=require("react/jsx-runtime"),react_1=require("react"),react_native_1=require("react-native"),Navigation_animations_1=require("../Navigation.animations"),Navigation_hooks_1=require("../Navigation.hooks"),Navigation_context_1=require("../Navigation.context"),Navigation_reducer_1=require("../Navigation.reducer"),BaseBackground_1=require("./BaseBackground"),Backgrounds_1=require("./Backgrounds"),AnimatedContainer_1=require("./AnimatedContainer"),styles=react_native_1.StyleSheet.create({background:{position:"absolute",flex:1,justifyContent:"center"},container:{height:"100%",width:"100%"}});function getNavigationController(opts){const NavigationContext=(0,react_1.createContext)(null);return{useNavigation(){const ctx=NavigationContext;return(0,react_1.useContext)(ctx)},NavigationController(props){const{routes:routes,initialRoute:initialRoute,backgroundColor:backgroundColor,backgroundImage:backgroundImage,backgrounds:backgrounds,topLevelController:topLevelController=!0,children:children}=props,animT=(0,react_1.useRef)(new react_native_1.Animated.Value(0)),animO=(0,react_1.useRef)(new react_native_1.Animated.Value(0)),anim=Navigation_animations_1.NavigationAnimationTypes.translateLTR,{anims:anims,baseDur:baseDur}=(0,Navigation_animations_1.useNavigationAnimations)(animT,animO,anim),{width:width,height:height}=(0,react_native_1.useWindowDimensions)(),backgroundImageStyle=(0,react_1.useMemo)((()=>({...styles.background,width:width,height:height})),[width,height]),[state,dispatch]=(0,react_1.useReducer)(Navigation_reducer_1.navigationReducer,{queue:[],history:[],isNavigating:null,background:void 0}),{ctx:ctx}=(0,Navigation_context_1.useNavigationContext)(state,dispatch,routes,String(initialRoute),baseDur,backgrounds);return(0,Navigation_hooks_1.useNavigationHooks)(state,dispatch,String(initialRoute),anims,{topLevelController:topLevelController},opts?.onNavigation),(0,jsx_runtime_1.jsxs)(NavigationContext.Provider,{value:ctx,children:[(0,jsx_runtime_1.jsx)(BaseBackground_1.BaseBackground,{backgroundImageStyle:backgroundImageStyle,backgroundImage:backgroundImage,backgroundColor:backgroundColor}),(0,jsx_runtime_1.jsx)(Backgrounds_1.Backgrounds,{backgroundImageStyle:backgroundImageStyle,backgrounds:backgrounds,state:state}),(0,jsx_runtime_1.jsx)(AnimatedContainer_1.AnimatedContainer,{routes:routes,state:state,animO:animO.current,animT:animT.current}),children]})}}}exports.getNavigationController=getNavigationController;