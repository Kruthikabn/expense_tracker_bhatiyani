import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/notifications')
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error('Error fetching notifications:', err));
  }, []);

  return (
    <Card sx={{ marginBottom: '1.5rem', backgroundColor: '#f9f9f9' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🔔 Notifications
        </Typography>
        <List dense>
          {notifications.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No notifications</Typography>
          ) : (
            notifications.map((note, index) => (
              <div key={note.id}>
                <ListItem disablePadding>
                  <ListItemText primary={note.msg} />
                </ListItem>
                {index !== notifications.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
