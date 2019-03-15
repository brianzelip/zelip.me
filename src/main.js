// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  // Add external CSS files, one at a time
  head.link.push({
    rel: 'stylesheet',
    href: 'http://zelip.me/css/zelip.me.min.css'
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/fontawesome/4.6.3/css/font-awesome.min.css'
  });

  // Add atributes to <body>
  head.bodyAttrs = {
    class: 'bg-dusty-blue px3'
  };
}
