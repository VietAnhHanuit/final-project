import { createHandleReducer } from '../../helpers/reduxHelpers';
import {UserActions} from '../actions';

const initialState = {
  isRunning: true,
  progress: 0,
  age: 0,
  energy: 100,
  money: 0,
  elementary: 0,
  highSchool: 0,
  university: 0,
  degree: '',
  health: 50,
  happiness: 50,
  intelligence: 50,
  appearance: 50,
};

const setAvatar = (state, action) => {
  state.avatar = action.payload;
};

const setAge = (state, action) => {
  state.age = action.payload;
};

const setProgress = (state, action) => {
  state.progress = action.payload;
};

const setEnergy = (state, action) => {
  state.energy = action.payload;
};

const setMoney = (state, action) => {
  state.money = action.payload;
};

const setElementary = (state, action) => {
  state.elementary = action.payload;
};

const setHighSchool = (state, action) => {
  state.highSchool = action.payload;
};

const setUniversity = (state, action) => {
  state.university = action.payload;
};

const setDegree = (state, action) => {
  state.degree = action.payload;
};

const setJob = (state, action) => {
  state.job = action.payload;
};

const updateTimer = (state) => {
  if (state.progress >= 1) {
    state.progress = 0;
    state.age = state.age ? state.age + 1 : 1;
  } else {
    state.progress += 1 / 720;
  }
};

const updateStatus = (state, action) => {
  state.health = action.payload.health;
  state.happiness = action.payload.happiness;
  state.intelligence = action.payload.intelligence;
  state.appearance = action.payload.appearance;
};

const UserReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(UserActions.setAvatar.request, setAvatar)
    .addCase(UserActions.setAge.request, setAge)
    .addCase(UserActions.setProgress.request, setProgress)
    .addCase(UserActions.updateTimer.request, updateTimer)
    .addCase(UserActions.setEnergy.request, setEnergy)
    .addCase(UserActions.setMoney.request, setMoney)
    .addCase(UserActions.setElementary.request, setElementary)
    .addCase(UserActions.setHighSchool.request, setHighSchool)
    .addCase(UserActions.setUniversity.request, setUniversity)
    .addCase(UserActions.setJob.request, setJob)
    .addCase(UserActions.setDegree.request, setDegree)
    .addCase(UserActions.updateStatus.request, updateStatus);
});

export default UserReducer;
