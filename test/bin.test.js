import bin from '../src/utils/bin';
import assert from 'assert';
import _ from 'lodash';

beforeEach(() => {

})

describe('bin', () => {

  describe('array', () => {
    it('should have at least one element as the first argument', () => {
      const invalidArrays = [[]];
      let err;
      try {
        bin(null)
      } catch (e) {
        err = e;
      }
      assert.equal(err.message, 'the first argument to \'bin\' must be an array')
    });
  })

  describe('binCount', () => {
    const invalidBins = [-1, 0, '0', [], 1.23, {}];

    _.forEach(invalidBins, invalidBin => {
      const fn = () => {
        return bin([], {binCount: invalidBin});
      }
      it(`should throw an error if invalid (${invalidBin})`, () => {
        assert.throws(fn, Error);
      })
    })
  });

});