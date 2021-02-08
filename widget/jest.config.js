module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  testMatch: [
    '**/*.spec.js'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
