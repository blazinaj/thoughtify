// ----------------------------------------------------------------------

import { darken, lighten, styled } from '@mui/material/styles';
import {useEffect, useMemo, useState} from 'react';
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
import {useDebounce} from "../../utils/hooks/useDebounce";

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

  const [loading, setLoading] = useState(false);

  const [recentSearches, setRecentSearches] = useLocalStorage('thoughtify-application-searchbar-recents', []);

  const thoughtDatastore = useDatastore({
    model: Thought
  });

  // useEffect(() => {
  //   if (searchQuery === '') {
  //     setSearchResults([...recentSearches.map((item) => ({ ...item, recentSearch: true, type: 'thought' } ))]);
  //   }
  // }, [searchQuery]);

  const linkTo = (id) => `thoughts/${id}`;

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchResults = useMemo(() => {

    if (debouncedSearchQuery === '') {
        return recentSearches.map((item) => ({ ...item, recentSearch: true, type: 'thought' }));
    }

    if (debouncedSearchQuery) {
      const fuse = new Fuse(thoughtDatastore.items, {
        keys: ['input', 'description', 'extract.people', 'extract.projects', 'extract.categories', 'extract.emotions', 'extract.reminders'],
        includeScore: true
      });

      const categories = ['people', 'projects', 'categories', 'emotions', 'reminders'];

      const orSearch = {
        $or: [
          {
            input: debouncedSearchQuery,
          },
          {
            extract: debouncedSearchQuery
          }
        ]
      }

      const results = fuse.search(orSearch);
      const thoughtResults = results.map((result) => {
        const { item, score } = result;
        return {

          ...item,
          score,
          type: 'thought',
          recentSearch: false

        };
      });
      console.log('thoughtResults', thoughtResults)
      setLoading(false)
      return thoughtResults || [];
    }

    return [];
  }, [debouncedSearchQuery, thoughtDatastore.items]);

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      setLoading(true)
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

    // setSearchResults([]);
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
        options={searchResults}
        groupBy={(option) => option.recentSearch}
        disableCloseOnSelect
        onInputChange={handleChangeSearch}
        getOptionLabel={(thought) => thought?.input || JSON.stringify(thought)}
        noOptionsText={loading ? "Loading Search Results" : <SearchNotFound searchQuery={searchQuery} onClickSearchResult={onClickSearchResult} />}
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
        renderOption={(props, thought, { inputValue }) => {

          const { input } = thought;
          const matches = match(input, inputValue);
          const parts = parse(input, matches);
          return (
            <li {...props}>
              <Box
                style={{ height: '100%', width: '100%' }}
                onClick={() => {
                  onClickSearchResult(thought);
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
