import { MatcherCreator, Matcher } from 'jest-mock-extended';

export const dataObjectMatcher: MatcherCreator<any> = (expectedValue) => new Matcher<any>((actualValue) => {
    const actual = JSON.stringify(actualValue);
    const expected = JSON.stringify(expectedValue);
    return actual === expected;
}, 'Data Object Matcher');
