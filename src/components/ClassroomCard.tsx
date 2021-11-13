import { Fragment, useState } from 'react';
import { Link } from '@reach/router';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { Classroom } from '../types/api.types';
import ActivityIndicator from './ActivityIndicator';
import { enrollInClassroom } from '../services/api';

const CardLink: React.FC<{ url?: string }> = ({ children, url }) => {
  if (url) {
    return <Link to={url}>{children}</Link>;
  }

  return <Fragment>{children}</Fragment>;
};

type ClassroomCardProps = {
  classroom: Classroom;
  link?: string;
  disableEnrollAction?: boolean;
  onRefresh?: () => void;
};

const ClassroomCard: React.FC<ClassroomCardProps> = ({
  classroom,
  link,
  disableEnrollAction = false,
  onRefresh,
}) => {
  const [active, setActive] = useState(false);
  const spotsLeft = classroom.maxStudents - classroom.students.length;

  const handleEnrollClick = async () => {
    try {
      setActive(true);
      await enrollInClassroom(classroom.id);
      onRefresh && onRefresh();
    } finally {
      setActive(false);
    }
  };

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
          <ActivityIndicator active={active} size={20}>
            <Button
              disabled={spotsLeft <= 0 || disableEnrollAction}
              size='small'
              onClick={handleEnrollClick}
            >
              {spotsLeft <= 0 ? 'No availability' : 'Enroll now'}
            </Button>
          </ActivityIndicator>
        )}
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
