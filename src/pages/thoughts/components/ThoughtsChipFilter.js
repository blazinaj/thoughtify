import { Chip } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { sentenceCase } from 'change-case';
import { ThoughtExtractInsight } from './ThoughtExtracts/components/ThoughtExtractInsight';
import { useModal } from '../../../utils/hooks/useModal';

export const ThoughtsChipFilter = ({ label, onClick, show, color, type, value }) => {
  const title = `${sentenceCase(type)}: ${value}`;
  const button = (
    <Chip
      label={label}
      // onClick={() => alert('hi')}
      variant={show ? 'contained' : 'outlined'}
      color={color}
      size="small"
      sx={{
        cursor: 'pointer'
      }}
      onDelete={onClick}
      deleteIcon={show ? <Visibility /> : <VisibilityOff />}
    />
  );
  const children = <ThoughtExtractInsight type={type} value={value} />;

  const modal = useModal({
    title,
    children,
    button
  });

  return modal.modalButton;
};
