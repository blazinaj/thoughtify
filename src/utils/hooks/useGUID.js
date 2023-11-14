import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const useGUID = (props) => useState(`guid${uuid()}`);
