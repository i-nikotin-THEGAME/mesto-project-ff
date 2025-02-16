const autoprefixer = require('autoprefixer'); // подключили плагин
const cssnano = require('cssnano'); // подключили плагин

module.exports = {
  // подключили плагины к PostCSS
    plugins: [
    // подключили autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций { preset: default } говорит о том, что нужно использовать стандартные настройки минификации
    cssnano({ preset: 'default' })
    ]
};