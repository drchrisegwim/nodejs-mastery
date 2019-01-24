// The number of unit test for a given function should be greater than or equal to the number of execution path.

const lib = require('../lib');

// first unit test sample with the test()
it('Our first test', () => {

});

// More test

// to group related test we use the describe method.
describe('abolute', () => {
    // We can now replace test() with it()
    it('should return a +ve no if input is +ve', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a +ve no if input is -ve', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});


describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('emeksense');
        expect(result).toMatch(/emeksense/);
    });
});