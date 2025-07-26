module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/server.js'
    ],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']
};