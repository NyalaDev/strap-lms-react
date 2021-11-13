import { Fragment } from 'react';
import { Link } from '@reach/router';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { Classroom } from '../types/api.types';

const CardLink: React.FC<{ url?: string }> = ({ children, url }) => {
  if (url) {
    return <Link to={url}>{children}</Link>;
  }

  return <Fragment>{children}</Fragment>;
};

const ClassroomCard: React.FC<{ classroom: Classroom; link?: string }> = ({
  classroom,
  link,
}) => {
  const spotsLeft = classroom.maxStudents - classroom.students.length;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <CardLink url={link}>
          <Typography variant='h5' component='div'>
            {classroom.name}
          </Typography>
        </CardLink>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {classroom.description}
        </Typography>
        <Typography variant='body2'>
          <br />
          {`Tutorials: ${classroom.tutorials.length}`}
          <br />
          {`Remaining Spots: ${spotsLeft}`}
          <br />
          {`Total Spots: ${classroom.maxStudents}`}
        </Typography>
      </CardContent>
      <CardActions>
        {link && (
          <Button disabled={spotsLeft <= 0} size='small'>
            {spotsLeft <= 0 ? 'No availability' : 'Enroll now'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
