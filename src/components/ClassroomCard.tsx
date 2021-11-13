import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { Classroom } from '../types/api.types';

const ClassroomCard: React.FC<{ classroom: Classroom }> = ({ classroom }) => {
  const spotsLeft = classroom.maxStudents - classroom.students.length;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {classroom.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {classroom.description}
        </Typography>
        <Typography variant='body2'>
          <br />
          {`Remaining Spots: ${spotsLeft}`}
          <br />
          {`Total Spots: ${classroom.maxStudents}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={spotsLeft <= 0} size='small'>
          {spotsLeft <= 0 ? 'No availability' : 'Enroll now'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
