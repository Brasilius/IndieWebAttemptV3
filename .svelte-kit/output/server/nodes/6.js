

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/now/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.B3k0UwWW.js","_app/immutable/chunks/BMBjNqP3.js","_app/immutable/chunks/DD5gNxo9.js","_app/immutable/chunks/D3rtiuz7.js"];
export const stylesheets = ["_app/immutable/assets/6.C5ZSTGI1.css"];
export const fonts = [];
