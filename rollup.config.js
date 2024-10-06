import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import sass from "rollup-plugin-sass";
import autoprefixer from "autoprefixer";
import json from '@rollup/plugin-json';


import pkg from "./package.json";

let path = require("path");
export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    postcss({
      modules: false,
    }),
    url({
      include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true, // defaults to true
      sourceDir: path.join(__dirname, "src/images"),
    }),
    svgr(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"],
    }),
    resolve(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/react-is/index.js": [
          "isElement",
          "isValidElementType",
          "ForwardRef",
          "isContextConsumer",
        ],
        "node_modules/lodash/lodash.js": ["get", "isEmpty", "isEqual"],
        "node_modules/react/index.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
          "Fragment",
          "createRef",
          "useRef",
          "isValidElement",
          "useContext",
          "useState",
          "useMemo",
          "useEffect",
          "useDebugValue",
          "PureComponent",
          "cloneElement",
        ],
        "node_modules/react-dom/index.js": [
          "render",
          "createPortal",
          "findDOMNode",
        ],
        "node_modules/react-is/index.js": [
          "typeOf",
          "isElement",
          "isValidElementType",
        ],
      },
    }),

    json(),
  ],
};
  
