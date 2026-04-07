import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.shXLwyKL.js","_app/immutable/chunks/D6DZEMIW.js","_app/immutable/chunks/DD5gNxo9.js","_app/immutable/chunks/1pbB2qCG.js","_app/immutable/chunks/BUApaBEI.js","_app/immutable/chunks/BMBjNqP3.js","_app/immutable/chunks/CyxAA2ig.js","_app/immutable/chunks/D3rtiuz7.js","_app/immutable/chunks/B3hmNmku.js","_app/immutable/chunks/lT8U9gNz.js","_app/immutable/chunks/CCum6qB_.js"];
export const stylesheets = ["_app/immutable/assets/0.DB9JkY2a.css"];
export const fonts = [];
