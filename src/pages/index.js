import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from './components/Layout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Store } from '@/store';

const Index = () => {
  const { state, dispatch } = useContext(Store);

  const [length, setLength] = useState(state.duration);

  // useEffect(() => {
  //   setMinute(Math.floor(state.duration / 60));
  //   setSecond(state.duration - minute * 60);
  // }, [state, dispatch, minute]);

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
      }, 1000);
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

  if (length === 0) {
    if (state.typeid === 'short-break') {
      pomodoro();
    } else if (state.typeid === 'pomodoro') {
      shortBreak();
    }
  }
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
        // className='flex-col justify-center align-top rounded p-10 m-5 shrink min-w-fit'

        className='flex flex-col rounded p-6 shadow-md'
      >
        {/* <div className='type-break flex flex-row justify-center flex-nowrap'> */}
        <div className='flex justify-center mb-10'>
          <button
            onClick={pomodoro}
            className='secondary-button text-white shrink  p-1'
          >
            Pomodoro
          </button>
          <button
            onClick={shortBreak}
            className='secondary-button text-white shrink p-1'
          >
            Short Break
          </button>
          <button
            onClick={longBreak}
            className='secondary-button text-white shrink  p-1'
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
        <div className='mt-2 mb-2 p-4 rounded-lg bg-white flex justify-between'>
          <div className='flex justify-around'>
            <CheckCircleRoundedIcon style={{ color: '#ECECEC' }} />
            <p className='text-black ml-2 font-semibold'>This is task 1</p>
          </div>
          <button className='third-button'>
            <MoreVertIcon style={{ color: 'grey' }} fontSize='small' />
          </button>
        </div>
        <div
          className='add-btn border-dashed border-2 border-gray-400 mt-2 mb-2 p-4 rounded-lg flex justify-center'
          onClick={() => console.log('click')}
        >
          <button className='font-semibold' style={{ color: '#ECD6D6' }}>
            Add Task
          </button>
        </div>
        <div className='time-overview'>
          <p>Pomos: 6/7 Finish At: 07:48 (0.4h)</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
