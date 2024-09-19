// vuetify.ts or vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles


const vuetify = createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1976D2',  // Example primary color
          secondary: '#424242', // Example secondary color
          orange: '#FF5722',   // Example custom color
          // Add other colors as needed
        },
      },
    },
  },
});

export default vuetify;
