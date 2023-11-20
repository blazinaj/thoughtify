import Card from '../../utils/components/Card';
import {sentenceCase} from 'change-case';
import {Masonry} from '@mui/lab';
import {ThoughtExtractAttributeChip} from "./ThoughtExtracts/components/ThoughtExtractAttributeChip";

/**
 * Similar thoughts
 * emotions
 * People
 * Projects
 * Categories
 *
 * @param thought
 * @returns {JSX.Element}
 * @constructor
 */
export const ThoughtDetails = ({ item }) => {
  return (
    <Masonry
      columns={{
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4
      }}
      spacing={2}
      minHeight={200}
      sx={{ width: 'auto' }}
    >
      {Object.entries(item?.extract || {})
        .filter(([key, value]) => {
          return value && value.length > 0;
        })
        .map(([key, value]) => {
          return (
            <Card
              key={key}
              title={sentenceCase(key)}
            >
              <Masonry
                spacing={1}
                columns={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 2,
                  xxl: 2
                }}
              >
                {Array.isArray(value) ? (
                  value.map((chip) => {
                    return <ThoughtExtractAttributeChip value={chip} type={sentenceCase(key)} thought={item} />
                  })
                ) : (
                  <ThoughtExtractAttributeChip value={value} type={sentenceCase(key)} thought={item} />
                )}
              </Masonry>
            </Card>
          );
        })}
    </Masonry>
  );
};
