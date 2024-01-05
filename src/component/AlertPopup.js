import { Alert } from '@mui/material';
import useAlert from '../context/useAlert'

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: 'absolute',
          width:'100%',
          zIndex: 10,
        }}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;