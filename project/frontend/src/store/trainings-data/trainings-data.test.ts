import {trainingsData} from './trainings-data';
import {TrainingData} from '../../types/state';
import {fetchCoachTrainings, postTraining, fetchCoachTraining, fetchUserTrainings, fetchCoachOtherTrainings, fetchCountTrainings} from '../api-actions-trainings';
import {mockTraining} from '../../mocks/mocks';

describe('Reducer: trainings', () => {
  let state: TrainingData;

  beforeEach(() => {
    state = {
      trainings: [],
      countAllTrainings: {
        totalTrainings: 0,
        maxPrice: 0},
      isLoadingCountAllTrainings: false,
      userTrainings: [],
      coachTrainings: [],
      isTrainingsDataLoading: false,
      isCoachTrainingsLoading: false,
      hasError: false,
      isTrainingLoading: false,
      training: null,
      hasErrorPost: false,
      isLoadingPostTraining: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(trainingsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
        isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
        isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
        hasError: false, isTrainingLoading: false, training: null,
        hasErrorPost: false, isLoadingPostTraining: false});
  });

  describe('fetchCoachTrainings test', () => {
    it('fetchCoachTrainings fulfilled test', () => {
      const trainings = Array.from({length: 5}, () => mockTraining());
      expect(trainingsData.reducer(state, { type: fetchCoachTrainings.fulfilled, payload: trainings}))
        .toEqual({trainings: trainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });


  describe('fetchCountTrainings test', () => {
    it('fetchCountTrainings fulfilled test', () => {
      const trainings = Array.from({length: 5}, () => mockTraining());
      const prices = trainings.map((el) => el.price ? el.price : 0);
      const maxPrice = prices.reduce((prev, current) => (prev > current) ? prev : current);
      expect(trainingsData.reducer(state, { type: fetchCountTrainings.fulfilled, payload: {totalTrainings: trainings.length, maxPrice: maxPrice}}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: trainings.length, maxPrice: maxPrice},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCountTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCountTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });

  describe('fetchUserTrainings test', () => {
    it('fetchUserTrainings fulfilled test', () => {
      const trainings = Array.from({length: 5}, () => mockTraining());
      expect(trainingsData.reducer(state, { type: fetchUserTrainings.fulfilled, payload: trainings}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: trainings, coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchUserTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchUserTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });


  describe('fetchCoachTraining test', () => {
    it('fetchCoachTraining fulfilled test', () => {
      const training = mockTraining();
      expect(trainingsData.reducer(state, { type: fetchCoachTraining.fulfilled, payload: training}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: training,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachTraining rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachTraining.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });

  describe('postTraining test', () => {
    it('postTraining fulfilled test', () => {
      const trainings = Array.from({length: 5}, () => mockTraining());
      const training = mockTraining();
      const updTrainings = [...trainings, training];
      expect(trainingsData.reducer({...state, trainings: trainings}, { type: postTraining.fulfilled, payload: training}))
        .toEqual({trainings: updTrainings,countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('postTraining rejected test', () => {
      expect(trainingsData.reducer(state, { type: postTraining.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: true, isLoadingPostTraining: false});
    });
  });


  describe('fetchCoachOtherTrainings test', () => {
    it('fetchCoachOtherTrainings fulfilled test', () => {
      const trainings = Array.from({length: 5}, () => mockTraining());
      expect(trainingsData.reducer(state, { type: fetchCoachOtherTrainings.fulfilled, payload: trainings}))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: trainings,
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: false, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
    it('fetchCoachOtherTrainings rejected test', () => {
      expect(trainingsData.reducer(state, { type: fetchCoachOtherTrainings.rejected.type }))
        .toEqual({trainings: [],countAllTrainings: {totalTrainings: 0, maxPrice: 0},
          isLoadingCountAllTrainings: false, userTrainings: [], coachTrainings: [],
          isTrainingsDataLoading: false, isCoachTrainingsLoading: false,
          hasError: true, isTrainingLoading: false, training: null,
          hasErrorPost: false, isLoadingPostTraining: false});
    });
  });
});
