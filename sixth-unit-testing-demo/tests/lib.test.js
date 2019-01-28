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
        // Or
        expect(result).toContain('emeksense');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

// describe('', () => {
//     it('', () => {

//     });
// });

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({
            id: 1,
            price: 10
        });

        //Or we use toMatchObject()
        expect(result).toMatchObject({
            id: 1,
            price: 10
        });

        //Or
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
    it('should throw error if username is falsy', () => {
        //what are falsy number in js? ANS: Null, undefined, NaN, '', 0, false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => {
                lib.registerUser(a)
            }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('emeksense');
        expect(result).toMatchObject({
            username: 'emeksense'
        });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        const order = {
            customerId: 1,
            totalPrice: 10
        };

        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});