module.exports = {
    clearMocks: true,
    maxWorkers: 1,
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/*.[jt]s?(x)", "**/tests/*/*.[jt]s?(x)"],
}
