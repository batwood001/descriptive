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
      it(`should throw an error if it is an invalid type or number (${invalidBin})`, () => {
        assert.throws(fn, Error);
      })
    })

    it('should throw an error if it is > array.length', () => {
      const fn = () => {
        return bin([1,2,3], {binCount: 4});
      }
      assert.throws(fn, Error)
    })

  });

  describe('the bins', () => {
    const tests = [
      {
        desc: 'should put everything in one when binCount === 1',
        inputs: {
          array: [1,2,3],
          binCount: 1
        },
        output: [
          {
            low: 1,
            high: 3,
            count: 3            
          }
        ]
      },
      {
        desc: 'should be inclusive at the upper bound and exclusive at the lower bound (except for the first bin)',
        inputs: {
          array: [1,2,3],
          binCount: 2 
        },
        output: [
          {
            low: 1,
            high: 2,
            count: 2
          },
          {
            low: 2,
            high: 3,
            count: 1
          }
        ]
      },
      {
        desc: 'should put every element in its own bin when bincount === array.length',
        inputs: {
          array: [1,2,3],
          binCount: 3
        },
        output: [
          {
            low: 1,
            high: 1,
            count: 1
          },
          {
            low: 2,
            high: 2,
            count: 1
          },
          {
            low: 3,
            high: 3,
            count: 1
          }
        ]
      },
      {
        desc: 'should increment the correct bin',
        inputs: {
          array: [1,1,2,3],
          binCount: 3
        },
        output: [
          {
            low: 1,
            high: 1,
            count: 2
          },
          {
            low: 2,
            high: 2,
            count: 1
          },
          {
            low: 3,
            high: 3,
            count: 1
          }
        ]
      }
    ];

    _.forEach(tests, test => {
      const inputArray = test.inputs.array;
      const inputBinCount = test.inputs.binCount;
      const args = [inputArray, {binCount: inputBinCount}]

      it(test.desc || 'should create the correct bins', () => {
        assert.deepEqual(bin(...args), test.output)
      })
    })
  })

});