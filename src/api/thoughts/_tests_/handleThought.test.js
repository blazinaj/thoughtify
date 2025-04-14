import {handleThought} from "../handleThought";

jest.setTimeout(30000);

describe('handleThought', () => {
  it('tests the handleThought function', async () => {
    const thought = {
      input: 'Working on a new car project'
    };

    const projects = [
      {
        id: '1',
        name: 'Project 1',
        status: 'IN_PROGRESS',
      }
    ]

    const result = await handleThought({thought});

    expect(result).toEqual({
      ...thought,
      projects: [
        {
          name: 'Project 1',
          status: 'in progress',
        },
        {
          name: 'Project 2',
          status: 'completed',
        },
      ],
    });
  })
})