export class Optional<T> {
    private readonly value: T;

    private constructor(value: T) {
        this.value = value;
    }

    public static empty<T>(): Optional<T> {
        return new Optional<T>(null);
    }

    public static of<T>(value: T): Optional<T> {
        return new Optional(value);
    }

    public get(): T {
        if (!this.isPresent()) {
            throw new Error('No value present');
        }
        return this.value;
    }

    public static ofNullable<T>(value: T): Optional<T> {
        return value !== null ? Optional.of(value) : Optional.empty();
    }

    public isPresent(): boolean {
        return this.value !== null;
    }

    public ifPresent(method: (value: T) => void): void {
        if (this.isPresent()) method(this.value);
    }

    public orElse(other: T): T {
        return this.isPresent() ? this.value : other;
    }

    public orElseGet(method: () => T): T {
        return this.isPresent() ? this.value : method();
    }

    public orElseThrow<E extends Error>(error: () => E): T {
        if (this.isPresent()) {
            return this.value;
        }
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw error();
    }

    public map<R>(mapper: (value: T) => R): Optional<R> {
        if (!this.isPresent()) {
            return Optional.empty();
        }
        return Optional.ofNullable(mapper(this.value));
    }
}
