const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function loadTs(relative, stubs={}) {
 const cache=new Map();
 function load(file) {
  const absolute=path.resolve(file);
  if(cache.has(absolute))return cache.get(absolute).exports;
  const compiledModule={exports:{}};cache.set(absolute,compiledModule);
  const js=ts.transpileModule(fs.readFileSync(absolute,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  function localRequire(name){
   if(Object.hasOwn(stubs,name))return stubs[name];
   if(name==='server-only')return {};
   if(name.startsWith('@/')||name.startsWith('.')){
    const base=name.startsWith('@/')?path.resolve('src',name.slice(2)):path.resolve(path.dirname(absolute),name);
    const resolved=[base,base+'.ts',base+'.tsx',path.join(base,'index.ts'),path.join(base,'index.tsx')].find(f=>fs.existsSync(f)&&fs.statSync(f).isFile());
    if(resolved && /\.tsx?$/.test(resolved))return load(resolved);
   }
   return require(name);
  }
  new Function('require','module','exports',js)(localRequire,compiledModule,compiledModule.exports);
  return compiledModule.exports;
 }
 return load(relative);
}
module.exports={loadTs};
