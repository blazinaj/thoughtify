import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const RadioCards = ({ options = [], onChangeCallback, input }) => {
  const [selectedItem, setSelectedItemFunc] = useState(options[0]);

  useEffect(() => {
    if (selectedItem) {
      onChangeCallback(selectedItem.id);
    }
  }, [selectedItem?.id]);

  return (
    <Grid container direction="row" justifyContent="space-evenly" alignItems="stretch" spacing={2}>
      {options.map((option) => (
        <Grid item md={4}>
          <RadioCard
            {...option}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItemFunc}
            isChecked={selectedItem.title === option.title}
            option={option}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export const useRadioCards = ({ options = [], setSelectedItem }) => {
  const [selectedItem, setSelectedItemFunc] = useState({});

  useEffect(() => {
    if (options && Array.isArray(options)) {
      setSelectedItemFunc(options[0]);
      // setSelectedItem && setSelectedItem(options[0])
    }
  }, [options]);

  const display = (
    <Grid container direction="row" justifyContent="space-evenly" alignItems="stretch" spacing={2}>
      {options.map((option) => (
        <Grid item md={4}>
          <RadioCard
            {...option}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItemFunc}
            isChecked={selectedItem.title === option.title}
            option={option}
          />
        </Grid>
      ))}
    </Grid>
  );

  return {
    display,
    selectedItem
  };
};

export const RadioCard = ({ title, subTitle, icon, disabled, selectedItem, setSelectedItem, isChecked, option }) => (
  <Card>
    <CardActionArea
      onClick={(e) => {
        e.stopPropagation();
        setSelectedItem(option);
      }}
    >
      <CardContent>
        <Radio
          style={{ float: 'right' }}
          checked={isChecked}
          onChange={() => setSelectedItem(option)}
          value={isChecked}
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
        />
        {icon}
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
