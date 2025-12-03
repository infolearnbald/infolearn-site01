// utils.js - funções utilitárias pequenas
export function formatDate(ts){
  try{ return new Date(ts.seconds * 1000).toLocaleString(); }catch(e){ return new Date(ts).toLocaleString(); }
}

