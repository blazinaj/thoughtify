import PropTypes from 'prop-types';
// material
import { Box, Typography, Button } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', onClickSearchResult, ...other }) {

  const navigate = useNavigate();

  return (
    <Box>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        <Button
          startIcon={
            <AutoAwesome/>
          }
          onClick={() => {
            onClickSearchResult && onClickSearchResult({id: searchQuery, name: searchQuery}, `/teach/lessons/create_lesson?name=${searchQuery}`);
          }}
        >
          Create a Lesson
        </Button>
      </Typography>
    </Box>
  );
}
