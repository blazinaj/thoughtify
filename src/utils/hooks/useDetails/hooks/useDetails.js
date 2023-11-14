import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useDatastore } from '../../useDatastore';
import { isNullOrUndefined } from '../../../functions/isNullOrUndefined';
import Card from '../../../components/Card';
import { useForm } from '../../useForm';

/**
 * Displays the details of a single database item
 * @param {object} model - the DataStore model for this item
 * @param {object} [item] - if an item is passed in with an id, this is a details component
 * @param {string} [item.id] - if an item is passed in with an id, this is a details component
 */
export const useDetails = ({ itemId, item: inputItem, model, fields, setItem, title, subTitle, route }) => {
  const { id } = useParams();

  const ID = itemId || id;

  const { item, reset } = useDatastore({ model, itemId: itemId || id });

  const form = useForm({
    model,
    item,
    fieldConfig: fields
  });

  useEffect(() => {
    if (!isNullOrUndefined(ID)) {
      reset();
    }
  }, [ID]);

  const { display } = form;

  const subTitleComponent = <Tooltip children={<span>{ID}</span>} title={<span>{JSON.stringify(item)}</span>} />;

  const card = (
    <Card
      title={title}
      route={route}
      subTitle={subTitle || subTitleComponent}
      refreshFunction={reset}
    >
      {display}
    </Card>
  );

  return {
    display,
    card
  };
};

const getFieldName = (field) => {
  if (typeof field === 'string') {
    return field;
  }
  if (!isNullOrUndefined(field?.name)) {
    return field.name;
  }
  return field;
};
