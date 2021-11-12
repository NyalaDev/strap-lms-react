import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Copyright = (props: any) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Brough to you by '}
      <Link color='inherit' href='https://nyala.dev' target='_blank'>
        nyala.dev
      </Link>{' '}
    </Typography>
  );
};

export default Copyright;
