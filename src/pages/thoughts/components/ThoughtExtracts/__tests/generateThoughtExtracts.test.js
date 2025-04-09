import { generateThoughtExtracts } from '../functions/generateThoughtExtracts';

describe('generateThoughtExtracts', () => {
  test('should return an object with all the attributes', async () => {
    const input = [
      {
        id: '1',
        input: 'this is a test thought',
        extract: {
          emotions: ['happy', 'angry'],
          people: ['bob'],
          projects: ['project 1']
        }
      },
      {
        id: '2',
        input: 'wow, this is also a test thought',
        extract: {
          emotions: ['sad', 'happy'],
          people: ['bob', 'joe'],
          projects: ['project 1', 'project 2']
        }
      }
    ];

    const expectedOutput = {
      emotions: ['happy', 'angry', 'sad'],
      people: ['bob', 'joe'],
      projects: ['project 1', 'project 2']
    };

    const actualOutput = await generateThoughtExtracts({ thoughts: input });

    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should should remove duplicates', async () => {
    const input = [
      {
        id: '1',
        input: 'this is a test thought',
        extract: {
          emotions: ['happy', 'angry'],
          people: ['bob', 'bob'],
          projects: ['project 1']
        }
      },
      {
        id: '2',
        input: 'wow, this is also a test thought',
        extract: {
          emotions: ['sad', 'happy'],
          people: ['bob', 'joe', 'joe'],
          projects: ['project 1', 'project 2']
        }
      }
    ];

    const expectedOutput = {
      emotions: ['happy', 'angry', 'sad'],
      people: ['bob', 'joe'],
      projects: ['project 1', 'project 2']
    };

    const actualOutput = await generateThoughtExtracts({ thoughts: input });

    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should return empty object if no thoughts are provided', async () => {
    const input = [
      {
        id: '1',
        input: 'this is a test thought',
        extract: {
          emotions: ['happy', 'angry'],
          people: ['bob', 'bob'],
          projects: ['project 1']
        }
      },
      {
        id: '2',
        input: 'wow, this is also a test thought',
        extract: {
          emotions: ['sad', 'happy'],
          people: ['bob', 'joe', 'joe'],
          projects: ['project 1', 'project 2']
        }
      }
    ];

    const actualOutput = await generateThoughtExtracts({ thoughts: null });

    expect(actualOutput).toEqual({});
  });
});
