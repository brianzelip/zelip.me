const classes = [
  'sm-mt3',
  'md-mt4',
  'sm-mb4',
  'narrow-container',
  'white',
  'flex',
  'flex-column',
  'h2',
  'p1',
  'm0',
  'fw-200',
  'sm-mt4',
  'md-mt5',
  'narrow-container',
  'flex',
  'flex-column',
  'align-center',
  'sm-flex-row',
  'sm-justify-center',
  'py2',
  'sm-py0',
  'circle',
  'mb1',
  'sm-mb0',
  'sm-mr2',
  'w-200px',
  'md-250px',
  'px1',
  'center',
  'sm-left-align',
  'm0',
  'h0',
  'lh-1p2',
  'white',
  'flex',
  'flex-wrap',
  'justify-around',
  'sm-justify-between',
  'mt1',
  'sm-mt2',
  'h2',
  'white',
  'sm-px0',
  'sm-m0',
  'green-underline',
  'text-decoration-none',
  'lh-1',
  'fa',
  'fa-envelope-o',
  'sm-hide',
  'none',
  'sm-blockEmail',
  'h2',
  'white',
  'sm-px0',
  'sm-m0',
  'green-underline',
  'text-decoration-none',
  'lh-1',
  'fa',
  'fa-github',
  'sm-hide',
  'none',
  'sm-blockGitHub',
  'h2',
  'white',
  'sm-px0',
  'sm-m0',
  'green-underline',
  'text-decoration-none',
  'lh-1',
  'fa',
  'fa-twitter',
  'sm-hide',
  'none',
  'sm-blockTwitter',
  'h2',
  'white',
  'sm-px0',
  'sm-m0',
  'green-underline',
  'text-decoration-none',
  'lh-1',
  'fa',
  'fa-linkedin',
  'sm-hide',
  'none',
  'sm-blockLinkedIn'
];

const uniqueClasses = classes
  .reduce((acc, className) => {
    acc.includes(className) ? null : acc.push(className);
    return acc;
  }, [])
  .sort()
  .join('\n');

console.log(uniqueClasses);

/*
CSS module thoughts: Atomic css in the component, es6 import, bundler era

- every individual class is exported from its source file, something like:

  ```js
  // padding.js

  const p0 = { padding: 0}
  const p1 = { padding: 0.5rem}
  const p2 = { padding: 1rem}
  const p3 = { padding: 2rem}
  const p4 = { padding: 4rem}
  
  export { p0, p1, p2, p3, p4 };
  ```
  
  The code example above is not scalable, and isn't a smart use of js!
  Much refactoring should happen to make this creation of a style palette
  more automated and dynamic. Something more akin to:
  
  > the export default is a function that takes in some value
  > provided by the developer during component development.

- there can be groups of classes that can be installed together, ie: flexbox
- the overall css library can be installed via npm
- the library and/or individual classes and/or groups of classes
  can be es6 imported

*/
