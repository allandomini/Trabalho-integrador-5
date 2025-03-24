import './polyfills.server.mjs';
import{$a as Ye,Aa as Ve,Ba as he,C as xe,Ca as $e,Da as A,Dc as te,Fa as fe,Ga as ee,I as _e,Ja as _,Ka as j,La as Xe,Ma as Je,Mc as it,Na as Ge,Oa as Ke,Pa as qe,Pc as $,Qa as We,R as je,Ra as Ze,Sa as k,Sc as ne,U as Fe,Ua as V,V as D,X as v,_ as T,aa as d,ba as w,bb as Qe,c as de,cb as C,ea as z,ec as et,fc as pe,gc as tt,j as Ce,ja as H,jb as He,k as Q,la as Ue,ma as Be,na as ze,nc as nt,o as B,oc as rt,vc as ye,wa as ue,wc as st,xc as ot,yc as E,z as Le}from"./chunk-KG7HJVAB.mjs";import{a as x,b as Se,d as ke,h as le}from"./chunk-VVCT4QZE.mjs";var J=class{},G=class{},M=class e{constructor(n){this.normalizedNames=new Map,this.lazyUpdate=null,n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let r=t.indexOf(":");if(r>0){let s=t.slice(0,r),o=s.toLowerCase(),i=t.slice(r+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(i):this.headers.set(o,[i])}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.setHeaderEntries(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,t);let s=(n.op==="a"?this.headers.get(t):void 0)||[];s.push(...r),this.headers.set(t,s);break;case"d":let o=n.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let i=this.headers.get(t);if(!i)return;i=i.filter(c=>o.indexOf(c)===-1),i.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,i)}break}}setHeaderEntries(n,t){let r=(Array.isArray(t)?t:[t]).map(o=>o.toString()),s=n.toLowerCase();this.headers.set(s,r),this.maybeSetNormalizedName(n,s)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var ve=class{encodeKey(n){return at(n)}encodeValue(n){return at(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function Ut(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[i,c]=o==-1?[n.decodeKey(s),""]:[n.decodeKey(s.slice(0,o)),n.decodeValue(s.slice(o+1))],a=t.get(i)||[];a.push(c),t.set(i,a)}),t}var Bt=/%(\d[a-f0-9])/gi,zt={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function at(e){return encodeURIComponent(e).replace(Bt,(n,t)=>zt[t]??n)}function re(e){return`${e}`}var N=class e{constructor(n={}){if(this.updates=null,this.cloneFrom=null,this.encoder=n.encoder||new ve,n.fromString){if(n.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=Ut(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let r=n.fromObject[t],s=Array.isArray(r)?r.map(re):[re(r)];this.map.set(t,s)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(r=>{let s=n[r];Array.isArray(s)?s.forEach(o=>{t.push({param:r,value:o,op:"a"})}):t.push({param:r,value:s,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(re(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let r=this.map.get(n.param)||[],s=r.indexOf(re(n.value));s!==-1&&r.splice(s,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};var we=class{constructor(){this.map=new Map}set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}};function Vt(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function ct(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function lt(e){return typeof Blob<"u"&&e instanceof Blob}function dt(e){return typeof FormData<"u"&&e instanceof FormData}function $t(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var X=class e{constructor(n,t,r,s){this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=n.toUpperCase();let o;if(Vt(this.method)||s?(this.body=r!==void 0?r:null,o=s):o=r,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new M,this.context??=new we,!this.params)this.params=new N,this.urlWithParams=t;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=t;else{let c=t.indexOf("?"),a=c===-1?"?":c<t.length-1?"&":"";this.urlWithParams=t+a+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||ct(this.body)||lt(this.body)||dt(this.body)||$t(this.body)?this.body:this.body instanceof N?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||dt(this.body)?null:lt(this.body)?this.body.type||null:ct(this.body)?null:typeof this.body=="string"?"text/plain":this.body instanceof N?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?"application/json":null}clone(n={}){let t=n.method||this.method,r=n.url||this.url,s=n.responseType||this.responseType,o=n.transferCache??this.transferCache,i=n.body!==void 0?n.body:this.body,c=n.withCredentials??this.withCredentials,a=n.reportProgress??this.reportProgress,l=n.headers||this.headers,f=n.params||this.params,p=n.context??this.context;return n.setHeaders!==void 0&&(l=Object.keys(n.setHeaders).reduce((g,y)=>g.set(y,n.setHeaders[y]),l)),n.setParams&&(f=Object.keys(n.setParams).reduce((g,y)=>g.set(y,n.setParams[y]),f)),new e(t,r,i,{params:f,headers:l,context:p,reportProgress:a,responseType:s,withCredentials:c,transferCache:o})}},O=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(O||{}),K=class{constructor(n,t=q.Ok,r="OK"){this.headers=n.headers||new M,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.ok=this.status>=200&&this.status<300}},oe=class e extends K{constructor(n={}){super(n),this.type=O.ResponseHeader}clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},L=class e extends K{constructor(n={}){super(n),this.type=O.Response,this.body=n.body!==void 0?n.body:null}clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},P=class extends K{constructor(n){super(n,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},q=function(e){return e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Processing=102]="Processing",e[e.EarlyHints=103]="EarlyHints",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultiStatus=207]="MultiStatus",e[e.AlreadyReported=208]="AlreadyReported",e[e.ImUsed=226]="ImUsed",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.Unused=306]="Unused",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.PayloadTooLarge=413]="PayloadTooLarge",e[e.UriTooLong=414]="UriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RangeNotSatisfiable=416]="RangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.MisdirectedRequest=421]="MisdirectedRequest",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.Locked=423]="Locked",e[e.FailedDependency=424]="FailedDependency",e[e.TooEarly=425]="TooEarly",e[e.UpgradeRequired=426]="UpgradeRequired",e[e.PreconditionRequired=428]="PreconditionRequired",e[e.TooManyRequests=429]="TooManyRequests",e[e.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",e[e.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported",e[e.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",e[e.InsufficientStorage=507]="InsufficientStorage",e[e.LoopDetected=508]="LoopDetected",e[e.NotExtended=510]="NotExtended",e[e.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",e}(q||{});function me(e,n){return{body:n,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,transferCache:e.transferCache}}var Xt=(()=>{class e{constructor(t){this.handler=t}request(t,r,s={}){let o;if(t instanceof X)o=t;else{let a;s.headers instanceof M?a=s.headers:a=new M(s.headers);let l;s.params&&(s.params instanceof N?l=s.params:l=new N({fromObject:s.params})),o=new X(t,r,s.body!==void 0?s.body:null,{headers:a,context:s.context,params:l,reportProgress:s.reportProgress,responseType:s.responseType||"json",withCredentials:s.withCredentials,transferCache:s.transferCache})}let i=Q(o).pipe(xe(a=>this.handler.handle(a)));if(t instanceof X||s.observe==="events")return i;let c=i.pipe(Le(a=>a instanceof L));switch(s.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return c.pipe(B(a=>{if(a.body!==null&&!(a.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return a.body}));case"blob":return c.pipe(B(a=>{if(a.body!==null&&!(a.body instanceof Blob))throw new Error("Response is not a Blob.");return a.body}));case"text":return c.pipe(B(a=>{if(a.body!==null&&typeof a.body!="string")throw new Error("Response is not a string.");return a.body}));case"json":default:return c.pipe(B(a=>a.body))}case"response":return c;default:throw new Error(`Unreachable: unhandled observe type ${s.observe}}`)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:new N().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,s={}){return this.request("PATCH",t,me(s,r))}post(t,r,s={}){return this.request("POST",t,me(s,r))}put(t,r,s={}){return this.request("PUT",t,me(s,r))}static{this.\u0275fac=function(r){return new(r||e)(d(J))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Jt=/^\)\]\}',?\n/,Gt="X-Request-URL";function ut(e){if(e.url)return e.url;let n=Gt.toLocaleLowerCase();return e.headers.get(n)}var ge=(()=>{class e{constructor(){this.fetchImpl=w(Ee,{optional:!0})?.fetch??fetch.bind(globalThis),this.ngZone=w(C)}handle(t){return new de(r=>{let s=new AbortController;return this.doRequest(t,s.signal,r).then(Te,o=>r.error(new P({error:o}))),()=>s.abort()})}doRequest(t,r,s){return le(this,null,function*(){let o=this.createRequestInit(t),i;try{let y=this.fetchImpl(t.urlWithParams,x({signal:r},o));Kt(y),s.next({type:O.Sent}),i=yield y}catch(y){s.error(new P({error:y,status:y.status??0,statusText:y.statusText,url:t.urlWithParams,headers:y.headers}));return}let c=new M(i.headers),a=i.statusText,l=ut(i)??t.urlWithParams,f=i.status,p=null;if(t.reportProgress&&s.next(new oe({headers:c,status:f,statusText:a,url:l})),i.body){let y=i.headers.get("content-length"),I=[],u=i.body.getReader(),h=0,R,b,m=typeof Zone<"u"&&Zone.current;yield this.ngZone.runOutsideAngular(()=>le(this,null,function*(){for(;;){let{done:S,value:U}=yield u.read();if(S)break;if(I.push(U),h+=U.length,t.reportProgress){b=t.responseType==="text"?(b??"")+(R??=new TextDecoder).decode(U,{stream:!0}):void 0;let Ie=()=>s.next({type:O.DownloadProgress,total:y?+y:void 0,loaded:h,partialText:b});m?m.run(Ie):Ie()}}}));let F=this.concatChunks(I,h);try{let S=i.headers.get("Content-Type")??"";p=this.parseBody(t,F,S)}catch(S){s.error(new P({error:S,headers:new M(i.headers),status:i.status,statusText:i.statusText,url:ut(i)??t.urlWithParams}));return}}f===0&&(f=p?q.Ok:0),f>=200&&f<300?(s.next(new L({body:p,headers:c,status:f,statusText:a,url:l})),s.complete()):s.error(new P({error:p,headers:c,status:f,statusText:a,url:l}))})}parseBody(t,r,s){switch(t.responseType){case"json":let o=new TextDecoder().decode(r).replace(Jt,"");return o===""?null:JSON.parse(o);case"text":return new TextDecoder().decode(r);case"blob":return new Blob([r],{type:s});case"arraybuffer":return r.buffer}}createRequestInit(t){let r={},s=t.withCredentials?"include":void 0;if(t.headers.forEach((o,i)=>r[o]=i.join(",")),r.Accept??="application/json, text/plain, */*",!r["Content-Type"]){let o=t.detectContentTypeHeader();o!==null&&(r["Content-Type"]=o)}return{body:t.serializeBody(),method:t.method,headers:r,credentials:s}}concatChunks(t,r){let s=new Uint8Array(r),o=0;for(let i of t)s.set(i,o),o+=i.length;return s}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Ee=class{};function Te(){}function Kt(e){e.then(Te,Te)}function qt(e,n){return n(e)}function Wt(e,n,t){return(r,s)=>ze(t,()=>n(r,o=>e(o,s)))}var Tt=new T(""),Rt=new T(""),bt=new T("");var ht=(()=>{class e extends J{constructor(t,r){super(),this.backend=t,this.injector=r,this.chain=null,this.pendingTasks=w(He);let s=w(bt,{optional:!0});this.backend=s??t}handle(t){if(this.chain===null){let s=Array.from(new Set([...this.injector.get(Tt),...this.injector.get(Rt,[])]));this.chain=s.reduceRight((o,i)=>Wt(o,i,this.injector),qt)}let r=this.pendingTasks.add();return this.chain(t,s=>this.backend.handle(s)).pipe(_e(()=>this.pendingTasks.remove(r)))}static{this.\u0275fac=function(r){return new(r||e)(d(G),d(Be))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})();var Zt=/^\)\]\}',?\n/;function Yt(e){return"responseURL"in e&&e.responseURL?e.responseURL:/^X-Request-URL:/m.test(e.getAllResponseHeaders())?e.getResponseHeader("X-Request-URL"):null}var ft=(()=>{class e{constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new D(-2800,!1);let r=this.xhrFactory;return(r.\u0275loadImpl?Ce(r.\u0275loadImpl()):Q(null)).pipe(je(()=>new de(o=>{let i=r.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((u,h)=>i.setRequestHeader(u,h.join(","))),t.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){let u=t.detectContentTypeHeader();u!==null&&i.setRequestHeader("Content-Type",u)}if(t.responseType){let u=t.responseType.toLowerCase();i.responseType=u!=="json"?u:"text"}let c=t.serializeBody(),a=null,l=()=>{if(a!==null)return a;let u=i.statusText||"OK",h=new M(i.getAllResponseHeaders()),R=Yt(i)||t.url;return a=new oe({headers:h,status:i.status,statusText:u,url:R}),a},f=()=>{let{headers:u,status:h,statusText:R,url:b}=l(),m=null;h!==q.NoContent&&(m=typeof i.response>"u"?i.responseText:i.response),h===0&&(h=m?q.Ok:0);let F=h>=200&&h<300;if(t.responseType==="json"&&typeof m=="string"){let S=m;m=m.replace(Zt,"");try{m=m!==""?JSON.parse(m):null}catch(U){m=S,F&&(F=!1,m={error:U,text:m})}}F?(o.next(new L({body:m,headers:u,status:h,statusText:R,url:b||void 0})),o.complete()):o.error(new P({error:m,headers:u,status:h,statusText:R,url:b||void 0}))},p=u=>{let{url:h}=l(),R=new P({error:u,status:i.status||0,statusText:i.statusText||"Unknown Error",url:h||void 0});o.error(R)},g=!1,y=u=>{g||(o.next(l()),g=!0);let h={type:O.DownloadProgress,loaded:u.loaded};u.lengthComputable&&(h.total=u.total),t.responseType==="text"&&i.responseText&&(h.partialText=i.responseText),o.next(h)},I=u=>{let h={type:O.UploadProgress,loaded:u.loaded};u.lengthComputable&&(h.total=u.total),o.next(h)};return i.addEventListener("load",f),i.addEventListener("error",p),i.addEventListener("timeout",p),i.addEventListener("abort",p),t.reportProgress&&(i.addEventListener("progress",y),c!==null&&i.upload&&i.upload.addEventListener("progress",I)),i.send(c),o.next({type:O.Sent}),()=>{i.removeEventListener("error",p),i.removeEventListener("abort",p),i.removeEventListener("load",f),i.removeEventListener("timeout",p),t.reportProgress&&(i.removeEventListener("progress",y),c!==null&&i.upload&&i.upload.removeEventListener("progress",I)),i.readyState!==i.DONE&&i.abort()}})))}static{this.\u0275fac=function(r){return new(r||e)(d(ne))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Mt=new T(""),Qt="XSRF-TOKEN",Ht=new T("",{providedIn:"root",factory:()=>Qt}),en="X-XSRF-TOKEN",tn=new T("",{providedIn:"root",factory:()=>en}),ie=class{},nn=(()=>{class e{constructor(t,r,s){this.doc=t,this.platform=r,this.cookieName=s,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=te(t,this.cookieName),this.lastCookieString=t),this.lastToken}static{this.\u0275fac=function(r){return new(r||e)(d(E),d(A),d(Ht))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})();function rn(e,n){let t=e.url.toLowerCase();if(!w(Mt)||e.method==="GET"||e.method==="HEAD"||t.startsWith("http://")||t.startsWith("https://"))return n(e);let r=w(ie).getToken(),s=w(tn);return r!=null&&!e.headers.has(s)&&(e=e.clone({headers:e.headers.set(s,r)})),n(e)}var Dt=function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e}(Dt||{});function sn(e,n){return{\u0275kind:e,\u0275providers:n}}function $n(...e){let n=[Xt,ft,ht,{provide:J,useExisting:ht},{provide:G,useExisting:ft},{provide:Tt,useValue:rn,multi:!0},{provide:Mt,useValue:!0},{provide:ie,useClass:nn}];for(let t of e)n.push(...t.\u0275providers);return H(n)}function Xn(){return sn(Dt.Fetch,[ge,{provide:G,useExisting:ge},{provide:bt,useExisting:ge}])}var pt="b",yt="h",mt="s",gt="st",vt="u",wt="rt",se=new T(""),on=["GET","HEAD"];function an(e,n){let p=w(se),{isCacheActive:t}=p,r=ke(p,["isCacheActive"]),{transferCache:s,method:o}=e;if(!t||o==="POST"&&!r.includePostRequests&&!s||o!=="POST"&&!on.includes(o)||s===!1||r.filter?.(e)===!1)return n(e);let i=w(ee),c=ln(e),a=i.get(c,null),l=r.includeHeaders;if(typeof s=="object"&&s.includeHeaders&&(l=s.includeHeaders),a){let{[pt]:g,[wt]:y,[yt]:I,[mt]:u,[gt]:h,[vt]:R}=a,b=g;switch(y){case"arraybuffer":b=new TextEncoder().encode(g).buffer;break;case"blob":b=new Blob([g]);break}let m=new M(I);return Q(new L({body:b,headers:m,status:u,statusText:h,url:R}))}let f=$(w(A));return n(e).pipe(Fe(g=>{g instanceof L&&f&&i.set(c,{[pt]:g.body,[yt]:cn(g.headers,l),[mt]:g.status,[gt]:g.statusText,[vt]:g.url||"",[wt]:e.responseType})}))}function cn(e,n){if(!n)return{};let t={};for(let r of n){let s=e.getAll(r);s!==null&&(t[r]=s)}return t}function Et(e){return[...e.keys()].sort().map(n=>`${n}=${e.getAll(n)}`).join("&")}function ln(e){let{params:n,method:t,responseType:r,url:s}=e,o=Et(n),i=e.serializeBody();i instanceof URLSearchParams?i=Et(i):typeof i!="string"&&(i="");let c=[t,r,s,i,o].join("|"),a=dn(c);return a}function dn(e){let n=0;for(let t of e)n=Math.imul(31,n)+t.charCodeAt(0)<<0;return n+=2147483648,n.toString()}function At(e){return[{provide:se,useFactory:()=>(Qe("NgHttpTransferCache"),x({isCacheActive:!0},e))},{provide:Rt,useValue:an,multi:!0,deps:[ee,se]},{provide:et,multi:!0,useFactory:()=>{let n=w(pe),t=w(se);return()=>{tt(n).then(()=>{t.isCacheActive=!1})}}}]}var Me=class extends ot{constructor(){super(...arguments),this.supportsDOMEvents=!0}},De=class e extends Me{static makeCurrent(){st(new e)}onAndCancel(n,t,r){return n.addEventListener(t,r),()=>{n.removeEventListener(t,r)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.parentNode&&n.parentNode.removeChild(n)}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=hn();return t==null?null:fn(t)}resetBaseElement(){W=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return te(document.cookie,n)}},W=null;function hn(){return W=W||document.querySelector("base"),W?W.getAttribute("href"):null}function fn(e){return new URL(e,document.baseURI).pathname}var pn=(()=>{class e{build(){return new XMLHttpRequest}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Ae=new T(""),It=(()=>{class e{constructor(t,r){this._zone=r,this._eventNameToPlugin=new Map,t.forEach(s=>{s.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,r,s){return this._findPluginFor(r).addEventListener(t,r,s)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(o=>o.supports(t)),!r)throw new D(5101,!1);return this._eventNameToPlugin.set(t,r),r}static{this.\u0275fac=function(r){return new(r||e)(d(Ae),d(C))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),ae=class{constructor(n){this._doc=n}},Re="ng-app-id",St=(()=>{class e{constructor(t,r,s,o={}){this.doc=t,this.appId=r,this.nonce=s,this.platformId=o,this.styleRef=new Map,this.hostNodes=new Set,this.styleNodesInDOM=this.collectServerRenderedStyles(),this.platformIsServer=$(o),this.resetHostNodes()}addStyles(t){for(let r of t)this.changeUsageCount(r,1)===1&&this.onStyleAdded(r)}removeStyles(t){for(let r of t)this.changeUsageCount(r,-1)<=0&&this.onStyleRemoved(r)}ngOnDestroy(){let t=this.styleNodesInDOM;t&&(t.forEach(r=>r.remove()),t.clear());for(let r of this.getAllStyles())this.onStyleRemoved(r);this.resetHostNodes()}addHost(t){this.hostNodes.add(t);for(let r of this.getAllStyles())this.addStyleToHost(t,r)}removeHost(t){this.hostNodes.delete(t)}getAllStyles(){return this.styleRef.keys()}onStyleAdded(t){for(let r of this.hostNodes)this.addStyleToHost(r,t)}onStyleRemoved(t){let r=this.styleRef;r.get(t)?.elements?.forEach(s=>s.remove()),r.delete(t)}collectServerRenderedStyles(){let t=this.doc.head?.querySelectorAll(`style[${Re}="${this.appId}"]`);if(t?.length){let r=new Map;return t.forEach(s=>{s.textContent!=null&&r.set(s.textContent,s)}),r}return null}changeUsageCount(t,r){let s=this.styleRef;if(s.has(t)){let o=s.get(t);return o.usage+=r,o.usage}return s.set(t,{usage:r,elements:[]}),r}getStyleElement(t,r){let s=this.styleNodesInDOM,o=s?.get(r);if(o?.parentNode===t)return s.delete(r),o.removeAttribute(Re),o;{let i=this.doc.createElement("style");return this.nonce&&i.setAttribute("nonce",this.nonce),i.textContent=r,this.platformIsServer&&i.setAttribute(Re,this.appId),t.appendChild(i),i}}addStyleToHost(t,r){let s=this.getStyleElement(t,r),o=this.styleRef,i=o.get(r)?.elements;i?i.push(s):o.set(r,{elements:[s],usage:1})}resetHostNodes(){let t=this.hostNodes;t.clear(),t.add(this.doc.head)}static{this.\u0275fac=function(r){return new(r||e)(d(E),d(he),d(fe,8),d(A))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),be={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/MathML/"},Oe=/%COMP%/g,kt="%COMP%",yn=`_nghost-${kt}`,mn=`_ngcontent-${kt}`,gn=!0,vn=new T("",{providedIn:"root",factory:()=>gn});function wn(e){return mn.replace(Oe,e)}function En(e){return yn.replace(Oe,e)}function Ct(e,n){return n.map(t=>t.replace(Oe,e))}var Pt=(()=>{class e{constructor(t,r,s,o,i,c,a,l=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=s,this.removeStylesOnCompDestroy=o,this.doc=i,this.platformId=c,this.ngZone=a,this.nonce=l,this.rendererByCompId=new Map,this.platformIsServer=$(c),this.defaultRenderer=new Z(t,i,a,this.platformIsServer)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;this.platformIsServer&&r.encapsulation===z.ShadowDom&&(r=Se(x({},r),{encapsulation:z.Emulated}));let s=this.getOrCreateRenderer(t,r);return s instanceof ce?s.applyToHost(t):s instanceof Y&&s.applyStyles(),s}getOrCreateRenderer(t,r){let s=this.rendererByCompId,o=s.get(r.id);if(!o){let i=this.doc,c=this.ngZone,a=this.eventManager,l=this.sharedStylesHost,f=this.removeStylesOnCompDestroy,p=this.platformIsServer;switch(r.encapsulation){case z.Emulated:o=new ce(a,l,r,this.appId,f,i,c,p);break;case z.ShadowDom:return new Pe(a,l,t,r,i,c,this.nonce,p);default:o=new Y(a,l,r,f,i,c,p);break}s.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}static{this.\u0275fac=function(r){return new(r||e)(d(It),d(St),d(he),d(vn),d(E),d(A),d(C),d(fe))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Z=class{constructor(n,t,r,s){this.eventManager=n,this.doc=t,this.ngZone=r,this.platformIsServer=s,this.data=Object.create(null),this.throwOnSyntheticProps=!0,this.destroyNode=null}destroy(){}createElement(n,t){return t?this.doc.createElementNS(be[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Nt(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){n&&(Nt(n)?n.content:n).insertBefore(t,r)}removeChild(n,t){n&&n.removeChild(t)}selectRootElement(n,t){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new D(-5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,s){if(s){t=s+":"+t;let o=be[s];o?n.setAttributeNS(o,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){let s=be[r];s?n.removeAttributeNS(s,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,s){s&(V.DashCase|V.Important)?n.style.setProperty(t,r,s&V.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){r&V.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n!=null&&(n[t]=r)}setValue(n,t){n.nodeValue=t}listen(n,t,r){if(typeof n=="string"&&(n=ye().getGlobalEventTarget(this.doc,n),!n))throw new Error(`Unsupported event target ${n} for event ${t}`);return this.eventManager.addEventListener(n,t,this.decoratePreventDefault(r))}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;(this.platformIsServer?this.ngZone.runGuarded(()=>n(t)):n(t))===!1&&t.preventDefault()}}};function Nt(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var Pe=class extends Z{constructor(n,t,r,s,o,i,c,a){super(n,o,i,a),this.sharedStylesHost=t,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let l=Ct(s.id,s.styles);for(let f of l){let p=document.createElement("style");c&&p.setAttribute("nonce",c),p.textContent=f,this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(this.nodeOrShadowRoot(n),t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Y=class extends Z{constructor(n,t,r,s,o,i,c,a){super(n,o,i,c),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=s,this.styles=a?Ct(a,r.styles):r.styles}applyStyles(){this.sharedStylesHost.addStyles(this.styles)}destroy(){this.removeStylesOnCompDestroy&&this.sharedStylesHost.removeStyles(this.styles)}},ce=class extends Y{constructor(n,t,r,s,o,i,c,a){let l=s+"-"+r.id;super(n,t,r,o,i,c,a,l),this.contentAttr=wn(l),this.hostAttr=En(l)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}},Tn=(()=>{class e extends ae{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,s){return t.addEventListener(r,s,!1),()=>this.removeEventListener(t,r,s)}removeEventListener(t,r,s){return t.removeEventListener(r,s)}static{this.\u0275fac=function(r){return new(r||e)(d(E))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})(),Ot=["alt","control","meta","shift"],Rn={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},bn={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Mn=(()=>{class e extends ae{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,r,s){let o=e.parseEventName(r),i=e.eventCallback(o.fullKey,s,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ye().onAndCancel(t,o.domEventName,i))}static parseEventName(t){let r=t.toLowerCase().split("."),s=r.shift();if(r.length===0||!(s==="keydown"||s==="keyup"))return null;let o=e._normalizeKey(r.pop()),i="",c=r.indexOf("code");if(c>-1&&(r.splice(c,1),i="code."),Ot.forEach(l=>{let f=r.indexOf(l);f>-1&&(r.splice(f,1),i+=l+".")}),i+=o,r.length!=0||o.length===0)return null;let a={};return a.domEventName=s,a.fullKey=i,a}static matchEventFullKeyCode(t,r){let s=Rn[t.key]||t.key,o="";return r.indexOf("code.")>-1&&(s=t.code,o="code."),s==null||!s?!1:(s=s.toLowerCase(),s===" "?s="space":s==="."&&(s="dot"),Ot.forEach(i=>{if(i!==s){let c=bn[i];c(t)&&(o+=i+".")}}),o+=s,o===r)}static eventCallback(t,r,s){return o=>{e.matchEventFullKeyCode(o,t)&&s.runGuarded(()=>r(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static{this.\u0275fac=function(r){return new(r||e)(d(E))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac})}}return e})();function pr(e,n){return nt(x({rootComponent:e},Dn(n)))}function Dn(e){return{appProviders:[...In,...e?.providers??[]],platformProviders:On}}function An(){De.makeCurrent()}function Pn(){return new ue}function Nn(){return Ve(document),document}var On=[{provide:A,useValue:it},{provide:$e,useValue:An,multi:!0},{provide:E,useFactory:Nn,deps:[]}];var In=[{provide:Ue,useValue:"root"},{provide:ue,useFactory:Pn,deps:[]},{provide:Ae,useClass:Tn,multi:!0,deps:[E,C,A]},{provide:Ae,useClass:Mn,multi:!0,deps:[E]},Pt,St,It,{provide:Ye,useExisting:Pt},{provide:ne,useClass:pn,deps:[]},[]];var yr=(()=>{class e{constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static{this.\u0275fac=function(r){return new(r||e)(d(E))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var Sn=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=v({token:e,factory:function(r){let s=null;return r?s=new(r||e):s=d(kn),s},providedIn:"root"})}}return e})(),kn=(()=>{class e extends Sn{constructor(t){super(),this._doc=t}sanitize(t,r){if(r==null)return null;switch(t){case k.NONE:return r;case k.HTML:return j(r,"HTML")?_(r):Ze(this._doc,String(r)).toString();case k.STYLE:return j(r,"Style")?_(r):r;case k.SCRIPT:if(j(r,"Script"))return _(r);throw new D(5200,!1);case k.URL:return j(r,"URL")?_(r):We(String(r));case k.RESOURCE_URL:if(j(r,"ResourceURL"))return _(r);throw new D(5201,!1);default:throw new D(5202,!1)}}bypassSecurityTrustHtml(t){return Xe(t)}bypassSecurityTrustStyle(t){return Je(t)}bypassSecurityTrustScript(t){return Ge(t)}bypassSecurityTrustUrl(t){return Ke(t)}bypassSecurityTrustResourceUrl(t){return qe(t)}static{this.\u0275fac=function(r){return new(r||e)(d(E))}}static{this.\u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})(),Ne=function(e){return e[e.NoHttpTransferCache=0]="NoHttpTransferCache",e[e.HttpTransferCacheOptions=1]="HttpTransferCacheOptions",e}(Ne||{});function mr(...e){let n=[],t=new Set,r=t.has(Ne.HttpTransferCacheOptions);for(let{\u0275providers:s,\u0275kind:o}of e)t.add(o),s.length&&n.push(s);return H([[],rt(),t.has(Ne.NoHttpTransferCache)||r?[]:At({}),n])}export{Xt as a,Rt as b,$n as c,Xn as d,De as e,Ae as f,ae as g,Pt as h,pr as i,yr as j,Sn as k,mr as l};
