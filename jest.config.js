module.exports = {
    clearMocks: true,
    maxWorkers: 1,
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/*.test.[jt]s?(x)", "**/tests/*/*.test.[jt]s?(x)"],
}
