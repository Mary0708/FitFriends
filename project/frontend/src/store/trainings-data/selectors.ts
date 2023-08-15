import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Training, TotalTrainInfo} from '../../types/training';

export const getTrainings = (state: State): Training[] => state[NameSpace.Trainings].trainings;
export const getUserTrainings = (state: State): Training[] => state[NameSpace.Trainings].userTrainings;
export const getCoachTrainings = (state: State): Training[] => state[NameSpace.Trainings].coachTrainings;
export const getTraining = (state: State): Training => state[NameSpace.Trainings].training;
export const getTrainingsDataLoadingStatus = (state: State): boolean => state[NameSpace.Trainings].isTrainingsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Trainings].hasError;
export const getErrorPost = (state: State): boolean => state[NameSpace.Trainings].hasErrorPost;
export const getIsTrainingLoading = (state: State): boolean => state[NameSpace.Trainings].isTrainingLoading;
export const getIsCoachTrainingsLoading = (state: State): boolean => state[NameSpace.Trainings].isCoachTrainingsLoading;
export const getCountAllTrainings = (state: State): TotalTrainInfo => state[NameSpace.Trainings].countAllTrainings;
export const getIsLoadingCountAllTrainings = (state: State): boolean => state[NameSpace.Trainings].isLoadingCountAllTrainings;
export const getIsLoadingPostTraining = (state: State): boolean => state[NameSpace.Trainings].isLoadingPostTraining;
