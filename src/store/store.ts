
const requireStoreContext = import.meta.globEager('./modules/*.ts');


const files = Object.keys(requireStoreContext)
const modules = files.reduce((modules, fileName) => {
  // console.log(fileName)
  const name = fileName.replace(/(\.\/modules\/|\.ts)/g, '');
  return {
    ...modules,
    [name]: requireStoreContext[fileName].default
  }
}, {});

export default modules;