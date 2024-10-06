import '../../../__mocks__/env-config';
import { getRequestHeadersNoToken } from '../../../../src/components/marketplace/api/index';

/**
 * This unit test tests a very simple function.  
 * The function only returns an object, which is predictable.
 * So, all we have to do is test that it returns this.
 * If this seems extremely simple, it is, because this is the most
 * basic unit test you can write.
 * It's here as an example of a Jest unit test.
 * Of course, other unit tests will be more complex.
 * The next level above this will probably involve mocking.
 * Read up on the Jest documentation at https://jestjs.io/.
 */
test('getRequestHeadersNoToken returns correct object', () => {
    const expected = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    const result = getRequestHeadersNoToken();
    expect(result).toEqual(expected);
})