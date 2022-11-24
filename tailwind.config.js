const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        plugin(function({addUtilities}){
            const utilities = {
            ".shadow-skill":{
                "box-shadow": "0px 10px 30px rgba(0, 0, 0, 1)"
            },
            ".shadow-new":{
                "box-shadow": "0px 10px 20px rgba(0, 0, 0, 1)"
            },
            ".shadow-newest":{
                "box-shadow": "0px 5px 10px rgba(0, 0, 0, 1)"
            },
            ".shadow-whitebg-light":{
                "box-shadow": "0px 5px 10px rgba(0, 0, 0, 0.3)"
            },
            ".shadow-whitebg-medium":{
                "box-shadow": "0px 10px 20px rgba(0, 0, 0, 0.45)"
            },
            ".shadow-whitebg-large":{
                "box-shadow": "0px 10px 30px rgba(0, 0, 0, 0.45)"
            },
            }
            addUtilities(utilities);
        })
    ],
};
