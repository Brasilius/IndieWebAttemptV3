import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.BBB54iZJ.js","_app/immutable/chunks/CA2lyuxa.js","_app/immutable/chunks/yjdmbrQf.js","_app/immutable/chunks/BMBjNqP3.js","_app/immutable/chunks/DD5gNxo9.js","_app/immutable/chunks/C5lIBRqL.js","_app/immutable/chunks/BXDTrsOH.js","_app/immutable/chunks/CyxAA2ig.js","_app/immutable/chunks/B3hmNmku.js","_app/immutable/chunks/D3rtiuz7.js","_app/immutable/chunks/CCum6qB_.js"];
export const stylesheets = ["_app/immutable/assets/2.BkymKNxf.css"];
export const fonts = [];
