module.exports = {
  "preset": "ts-jest",
  "collectCoverage": true, /*手机测试覆盖率信息*/
  "collectCoverageFrom": ["<rootDir>/src/components/**/*.{js,jsx,ts,tsx}"],// 搜集哪些文件覆盖率
  coverageDirectory: '<rootDir>/test/coverage', // 输出覆盖信息文件的目录
  "moduleNameMapper": {
    // 处理webpack resolve.alias匹配
  },
  "setupFiles": ["./setupJest.js"], // 测试前可运行的脚本，注册enzyme
  "testMatch": [ // 匹配测试进行的文件
    "<rootDir>/src/test/**/?(*.)(spec|test).ts?(x)"
  ],
  "moduleFileExtensions": [
    // 忽略后缀
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "transform": {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleDirectories": [
    // 模块指定目录
    "node_modules",
    "src"
  ],
  "transformIgnorePatterns": ["/node_modules/"] // 转化时忽略的文件
}
