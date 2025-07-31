import { ReduxHelper } from "../../helpers";

export const prefix = 'USER';

export const setAvatar = ReduxHelper.generateLocalAction(prefix, 'SET_AVATAR');

export const setAge = ReduxHelper.generateLocalAction(prefix, 'SET_AGE');

export const setProgress = ReduxHelper.generateLocalAction(prefix, 'SET_PROGRESS');

export const updateTimer = ReduxHelper.generateLocalAction(prefix, 'UPDATE_TIMER');

export const setEnergy = ReduxHelper.generateLocalAction(prefix, 'SET_ENERGY');

export const setMoney = ReduxHelper.generateLocalAction(prefix, 'SET_MONEY');

export const setElementary = ReduxHelper.generateLocalAction(prefix, 'SET_ELEMENTARY');

export const setHighSchool = ReduxHelper.generateLocalAction(prefix, 'SET_HIGH_SCHOOL');

export const setUniversity = ReduxHelper.generateLocalAction(prefix, 'SET_UNIVERSITY');

export const setDegree = ReduxHelper.generateLocalAction(prefix, 'SET_DEGREE');

export const setJob = ReduxHelper.generateLocalAction(prefix, 'SET_JOB')

export const updateStatus = ReduxHelper.generateLocalAction(prefix, 'UPDATE_STATUS')