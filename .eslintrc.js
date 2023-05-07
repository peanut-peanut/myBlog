// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  // parser: "babel-eslint",
	"parser": "vue-eslint-parser",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html","vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "no-tabs": "off",
    "no-underscore-dangle": "off",
    "import/no-cycle": "off",
    "import/no-import-module-exports": "off",
    "new-cap": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-param-reassign": 0,
    "no tabs": "off",
    "no-trailing-spaces": "off",
    "no-multiple-empty-lines": "off",
    "vuejs-accessibility/form-control-has-label": "off",
    "import/no-extraneous-dependencies": "off",
    "import/newline-after-import": "off",
    "arrow-parens": "off",
    "space-before-function-paren": "off",
    "vue/return-in-computed-property": "off",
    "padded-blocks": "off",
    "no-plusplus": "off",
    "space-unary-ops": "off",
    "no-use-before-define": "off",
    quotes: "off",
    "quote-props": "off",
    "comma-dangle": "off",
    "no-multi-spaces": "off",
    semi: "off",
    "import/extensions": "off",
    "arrow-body-style": "off",
		"no-new": "off",
		'eqeqeq': "off",
		'camelcase': "off",
		"vue/no-v-for-template-key": "off",
    indent: 0
  }
};
