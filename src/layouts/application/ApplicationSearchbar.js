// ----------------------------------------------------------------------

import { darken, lighten, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Autocomplete, Box, InputAdornment, TextField, Typography } from '@mui/material';
import SearchNotFound from '../../demo/components/SearchNotFound';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useNavigate } from 'react-router-dom';
import { Thought } from '../../models';
import { useDatastore } from '../../utils/hooks/useDatastore';
import Fuse from 'fuse.js';
import useLocalStorage from '../../utils/hooks/useLocalStorage';

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: '100%',
    mt: '2em',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: '100%',
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12
      }
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-of-type)': {
      borderBottom: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

/**
 * Custom searchbar for the Application. This searchbar is used in the header of the application.
 * Searches through Public Lessons and Public Courses. When no search query is entered, it shows
 * recent searches, category searches, and suggested searches.
 *
 * @param sx
 * @param handleClose
 * @returns {JSX.Element}
 * @constructor
 */
export const ApplicationSearchbar = ({ sx, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [recentSearches, setRecentSearches] = useLocalStorage('thoughtify-application-searchbar-recents', []);

  const thoughtDatastore = useDatastore({
    model: Thought
  });

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([...recentSearches.map((item) => ({ item: { ...item, recentSearch: true, type: 'thought' } }))]);
    }
  }, [searchQuery]);

  const linkTo = (id) => `thoughts/${id}`;

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);

      const options = {
        includeScore: true,
        keys: ['input']
      };

      const fuse = new Fuse(thoughtDatastore.items, options);

      const result = fuse.search(value);

      if (value) {
        setSearchResults(result);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // by default, show: recent searches, category searches, and suggested searches

  const navigate = useNavigate();

  const onClickSearchResult = (item, route) => {
    // add to recent searches
    // remove other recent searches with same id

    setRecentSearches((r) => {
      const newRecentSearches = r.filter((i) => i.id !== item.id);
      newRecentSearches.unshift(item);
      return newRecentSearches;
    });

    setSearchResults([]);
    setSearchQuery('');
    handleClose && handleClose();
    navigate(route || linkTo(item.id));
  };

  return (
    <RootStyle
      sx={{
        ...(!searchQuery && {
          '& .MuiAutocomplete-noOptions': {
            display: 'none'
          }
        }),
        width: '100%',
        ...sx
      }}
    >
      <Autocomplete
        open
        size="large"
        disablePortal
        autoFocus
        popupIcon={null}
        options={searchResults.map((r) => r.item)}
        groupBy={(option) => option.recentSearch}
        disableCloseOnSelect
        onInputChange={handleChangeSearch}
        getOptionLabel={(post) => post?.name}
        noOptionsText={<SearchNotFound searchQuery={searchQuery} onClickSearchResult={onClickSearchResult} />}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            placeholder="Search Thoughtify..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: 'text.disabled'
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              )
            }}
          />
        )}
        renderOption={(props, lesson, { inputValue }) => {
          const { name } = lesson;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li {...props}>
              <Box
                style={{ height: '100%', width: '100%' }}
                onClick={() => {
                  onClickSearchResult(lesson);
                }}
              >
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="subtitle2"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Box>
            </li>
          );
        }}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{searchQuery === '' ? 'Recent Searches' : 'Search Results'}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </RootStyle>
  );
};

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8)
}));

const GroupItems = styled('ul')({
  padding: 0
});

export default ApplicationSearchbar;
