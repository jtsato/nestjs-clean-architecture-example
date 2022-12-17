/* eslint-disable sonarjs/no-duplicate-string */
import { Optional } from './optional';

describe('Optional', () => {
    describe('empty', () => {
        it('should return an empty Optional', () => {
            const optional = Optional.empty();
            expect(optional.isPresent()).toBe(false);
            expect(() => optional.get()).toThrow('No value present');
        });
    });

    describe('of', () => {
        it('should throw an error if the given value is null', () => {
            const optional = Optional.of(null as string);
            expect(optional.isPresent()).toBe(false);
            expect(() => optional.get()).toThrow('No value present');
        });

        it('should return an Optional with the given value', () => {
            const optional = Optional.of('foo');
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe('foo');
        });
    });

    describe('ofNullable', () => {
        it('should return an empty Optional when value is null', () => {
            const optional = Optional.ofNullable(null as string);
            expect(optional.isPresent()).toBe(false);
            expect(() => optional.get()).toThrow('No value present');
        });

        it('should return an empty Optional when value is undefined', () => {
            const optional = Optional.ofNullable(undefined);
            expect(optional.isPresent()).toBe(false);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            expect(() => optional.get()).toThrow('No value present');
        });

        it('should return an Optional with the given value', () => {
            const optional = Optional.ofNullable('foo');
            expect(optional.isPresent()).toBe(true);
            expect(optional.get()).toBe('foo');
        });
    });

    describe('ifPresent', () => {
        it('should call the given function if the value is present', () => {
            const optional = Optional.of('foo');
            const spy = jest.fn();
            optional.ifPresent(spy);
            expect(spy).toHaveBeenCalledWith('foo');
        });

        it('should not call the given function if the value is not present', () => {
            const optional = Optional.empty();
            const spy = jest.fn();
            optional.ifPresent(spy);
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('orElse', () => {
        it('should return the value if present', () => {
            const optional = Optional.of('foo');
            expect(optional.orElse('bar')).toBe('foo');
        });

        it('should return the given value if not present', () => {
            const optional = Optional.empty();
            expect(optional.orElse('bar')).toBe('bar');
        });
    });

    describe('orElseGet', () => {
        it('should return the value if present', () => {
            const optional = Optional.of('foo');
            expect(optional.orElseGet(() => 'bar')).toBe('foo');
        });

        it('should return the given value if not present', () => {
            const optional = Optional.empty();
            expect(optional.orElseGet(() => 'bar')).toBe('bar');
        });
    });

    describe('orElseThrow', () => {
        it('should return the value if present', () => {
            const optional = Optional.of('foo');
            expect(optional.orElseThrow(() => new Error('bar'))).toBe('foo');
        });

        it('should throw the given error if not present', () => {
            const optional = Optional.empty();
            expect(() => optional.orElseThrow(() => new Error('bar'))).toThrow('bar');
        });
    });

    describe('map', () => {
        it('should return an Optional with the result of the given function', () => {
            const optional = Optional.of('foo');
            const result = optional.map((value) => value.toUpperCase());
            expect(result.isPresent()).toBe(true);
            expect(result.get()).toBe('FOO');
        });

        it('should return an empty Optional if the value is not present', () => {
            const optional = Optional.of(null as string);
            const result = optional.map((value) => value.toUpperCase());
            expect(result.isPresent()).toBe(false);
            expect(() => result.get()).toThrow('No value present');
        });
    });
});
