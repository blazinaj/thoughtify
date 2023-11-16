import {Thought} from '../../models';
import {DataStore} from '@aws-amplify/datastore';
import ThoughtInputField from './ThoughtInputField';
import {generateThoughtExtract} from "../../api/thoughts/generateThoughtExtract";

/**
 * Input Field for Thoughts.
 * Includes Speech to Text.
 *
 * Displays the AI-generated form of the thought
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtInput = () => {

  const onSubmit = async (input) => {
    console.log('saving thought', input);
    const newThought = await DataStore.save(
      new Thought({
        ...input
      })
    );

    const extract = await generateThoughtExtract(newThought);

    await DataStore.save(
      Thought.copyOf(newThought, (updated) => {
        updated.extract = extract;
      })
    );
  };

  return <ThoughtInputField onSubmit={onSubmit} />;
};
