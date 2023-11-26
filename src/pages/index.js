import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from './components/Layout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Store } from '@/store';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Menu } from '@headlessui/react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';

const Index = () => {
  const { state, dispatch } = useContext(Store);
  const { data: session } = useSession();

  useEffect(() => {
    const getSavedItem = async () => {
      await axios
        .get('/api/tasks')
        .then((res) =>
          dispatch({
            type: 'GET_TASK',
            payload: res.data,
          })
        )
        .catch((err) => {
          if (err.response.data.message === 'Login required!') {
            dispatch({
              type: 'REQUIRE_LOGIN',
              payload: false,
            });
          } else {
            console.error(err);
          }
        });
      // if (data === undefined) return;
      // if (!data.data) {
      //   return;
      // } else {
      //   dispatch({
      //     type: 'ADD_TASK',
      //     payload: data.data,
      //   });
      // }
    };
    getSavedItem();
  }, []);

  const [length, setLength] = useState(state.duration);
  const [input, setInput] = useState('');

  const shortBreak = () => {
    dispatch({
      type: 'TYPE_CHANGE',
      payload: {
        typeid: 'short-break',
        duration: 300,
      },
    });
    setLength(300);
  };

  const pomodoro = () => {
    dispatch({
      type: 'TYPE_CHANGE',
      payload: {
        typeid: 'pomodoro',
        duration: 1500,
      },
    });
    setLength(1500);
  };

  const longBreak = () => {
    dispatch({
      type: 'TYPE_CHANGE',
      payload: {
        typeid: 'long-break',
        duration: 600,
      },
    });
    setLength(600);
  };

  //timer
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setLength((prevSeconds) => prevSeconds - 1);
      }, 1);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, length]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const [typeBreak, setTypeBreak] = useState(1);

  if (length <= 0) {
    if (state.typeid === 'pomodoro' && typeBreak < 2) {
      shortBreak();
    } else if (state.typeid === 'short-break') {
      setTypeBreak((previous) => previous + 1);
      pomodoro();
    } else if (typeBreak >= 2) {
      setTypeBreak(1);
      longBreak();
      pomodoro();
    }
  }

  // dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const newTask = {
      task: input,
    };
    const { data } = await axios.post('/api/tasks', newTask);
    dispatch({ type: 'ADD_TASK', payload: data });
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`/api/tasks/${id}`);
    dispatch({
      type: 'ADD_TASK',
      payload: data,
    });
  };

  const [editTask, setEditTask] = useState();
  const [edit, setEdit] = useState(false);

  const openEdit = (task) => {
    setEdit(true);
    setInput(task.name);
    setEditTask(task);
    setOpen(true);
  };

  const handleEdit = async () => {
    const updateTask = {
      name: input,
      id: editTask._id,
    };
    const { data } = await axios.put('/api/tasks', updateTask);
    dispatch({
      type: 'ADD_TASK',
      payload: data,
    });
    setEdit(false);
    setInput('');
    setOpen(false);
  };

  return (
    <Layout
      title={`${Math.floor(length / 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })}: ${(length - Math.floor(length / 60) * 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      })} - Time to focus!`}
    >
      <div
        style={{ backgroundColor: '#C25D5C' }}
        className='flex flex-col rounded p-6 shadow-md'
      >
        <div className='flex justify-center mb-10'>
          <button
            onClick={pomodoro}
            className={`secondary-button p-1 text-white shrink`}
            style={{ border: state.typeid === 'pomodoro' && '1px solid' }}
          >
            Pomodoro
          </button>
          <button
            onClick={shortBreak}
            className='secondary-button text-white shrink p-1'
            style={{
              border: state.typeid === 'short-break' ? '1px solid' : 'none',
            }}
          >
            Short Break
          </button>
          <button
            onClick={longBreak}
            className='secondary-button text-white shrink  p-1'
            style={{
              border: state.typeid === 'long-break' ? '1px solid' : 'none',
            }}
          >
            Long Break
          </button>
        </div>
        <div className='flex justify-center  max-w-4xl'>
          <p className='text-white text-center text-8xl w-full h-32'>
            <span className='font-semibold'>
              {Math.floor(length / 60).toLocaleString(undefined, {
                minimumIntegerDigits: 2,
              })}
            </span>
            :
            <span className='font-semibold'>
              {(length - Math.floor(length / 60) * 60).toLocaleString(
                undefined,
                { minimumIntegerDigits: 2 }
              )}
            </span>
          </p>
        </div>
        <div className='flex justify-center'>
          {isRunning ? (
            <button
              onClick={handlePause}
              className='primary-button text-red-700 bg-white mt-10 text-3xl font-semibold pt-2 pb-2 pl-10 pr-10 rounded'
            >
              PAUSE
            </button>
          ) : (
            <button
              onClick={handleStart}
              className='primary-button text-red-700 bg-white mt-10 text-3xl font-semibold pt-2 pb-2 pl-10 pr-10 rounded'
            >
              START
            </button>
          )}
        </div>
      </div>
      <div className='flex-col justify-center align-top rounded mt-10  shadow-md'>
        <div className='border-b-2 border-white flex justify-between'>
          <p className='p-2'>Tasks</p>
          <div>
            <button className='third-button p-2'>
              <MoreVertIcon style={{ color: 'white' }} fontSize='small' />
            </button>
          </div>
        </div>

        {state.tasks.length === 0 ? (
          <Box sx={{ display: 'flex' }}>
            {session === null
              ? 'Login required!'
              : // <CircularProgress color='success' />
                'Empty task'}
          </Box>
        ) : (
          state.tasks.map((task) => (
            <div
              key={task._id}
              className='mt-2 mb-2 p-4 rounded-lg bg-white flex justify-between'
            >
              <div className='flex justify-around'>
                <CheckCircleRoundedIcon style={{ color: '#ECECEC' }} />
                <p className='text-black ml-2 font-semibold'>{task.name}</p>
              </div>
              <Menu as='div' className='relative inline-block'>
                <Menu.Button className='text-white'>
                  <MoreVertIcon style={{ color: 'grey' }} fontSize='small' />
                </Menu.Button>
                <Menu.Items className='absolute bg-emerald-500 right-0 w-28 origin-top-right shadow-lg rounded-lg bg-teal-500'>
                  <Menu.Item>
                    <button
                      onClick={() => openEdit(task)}
                      className='primary-button dropdown-link rounded-lg w-full'
                    >
                      EDIT
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className='primary-button dropdown-link rounded-lg w-full'
                    >
                      DELETE
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          ))
        )}

        <div
          className='add-btn border-dashed border-2 border-gray-400 mt-2 mb-2 p-4 rounded-lg flex justify-center'
          onClick={() => handleClickOpen()}
        >
          <button
            onClick={handleClickOpen}
            className='font-semibold'
            style={{ color: '#ECD6D6' }}
          >
            Add Task
          </button>
        </div>
        <div className='time-overview'>
          <p>Pomos: 6/7 Finish At: 07:48 (0.4h)</p>
        </div>
      </div>

      {/* dialog */}
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ADD NEW TASK</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Your Task.'
              type='text'
              fullWidth
              variant='standard'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {edit ? (
              <Button onClick={handleEdit}>Edit</Button>
            ) : (
              <Button onClick={handleSubmit}>Add</Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Index;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return;
//   }

//   await connectDB();

//   const data = await Task.find().lean();
//   console.log(data);

//   return {
//     props: {
//       tasks: JSON.parse(JSON.stringify(data)),
//     },
//   };
// };
