- use of js-powered css in Vue SFC
- wanting to cut down on all the css, as in this example from [Next.js docs](https://nextjs.org/docs/basic-features/built-in-css-support):
  > In production, all CSS files will be automatically concatenated into a single minified .css file.
- wanting to have predetermined contstraints/css design system/ predetermined css data decisions (see the [Styled System api docs](https://styled-system.com/api/), also implemented and referenced by [Chakra-UI/Vue](https://vue.chakra-ui.com)) / constraint-based design principles
- read some approachable yet slightly scary source code today. "slightly scary" meaning, confusing at first, but figureoutable, then questionable after understanding:

  ```js
  // via https://github.com/chakra-ui/chakra-ui-vue/blob/develop/packages/chakra-ui-theme/src/theme/breakpoints.js
  const breakpoints = ['30em', '48em', '62em', '80em'];

  breakpoints.sm = breakpoints[0]; // woah, dot notation on an array?!
  breakpoints.md = breakpoints[1];
  breakpoints.lg = breakpoints[2];
  breakpoints.xl = breakpoints[3];

  export default breakpoints;
  ```

  - [asked about it on !so](https://stackoverflow.com/q/67114419/2145103), and got the answer that array is an obj, and array.length only counts array properties named with numbers

- there's [styled-system-html by John Polacek](https://github.com/johnpolacek/styled-system-html) that takes the work of ChakraUI Vue in bringing a React-like JSX syntax into Vue SFC (as opposed to JSX in Vue), but prioritizes html semantics in the naming of the highly resusable components; ie: this react-like approach creates a component for each html element you might use
- the threaded connection through all the ideas here today is, wanting to maintain css in a data first way/ data forward approach / data driven css development / constraint-based design principled way. JXNBLK's projects show the way, but they do so through a React filter. One main difference is, when wanting to wield this powerful constraint/data based approach to css in Vue, Styled Components don't matter since Vue already provides component css encapsulation via uniquely hashed class names. The tldr of all the JXNBLK work is expressed in the ChakraUI Vue [`chakra-ui-theme`](https://github.com/chakra-ui/chakra-ui-vue/blob/develop/packages/chakra-ui-theme/src/theme/index.js);
  ```js
  const theme = {
    breakpoints,
    zIndices,
    radii,
    opacity,
    borders,
    colors,
    ...typography,
    borderWidths,
    sizes,
    shadows,
    space
  };
  ```
- using Styled Coponents in Vue
  - https://www.npmjs.com/package/vue-styled-components
  - https://blog.bitsrc.io/using-styled-components-with-vuejs-17741c435b40
  - https://www.youtube.com/watch?v=OdKDNcOyRjI
