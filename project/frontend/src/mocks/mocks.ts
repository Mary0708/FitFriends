import {lorem, datatype, name, internet, image, random} from 'faker';
import { User, UserRole, Gender, UserData, Friend, StatusRequest, CreateUser } from '../types/user';
import { LevelTraining, Training, TrainingTime, TrainingType } from '../types/training';
import { Notify, NotifyMessage } from '../types/notify';
import { Order, PaymentOption } from '../types/order';
import { Comment } from '../types/comment';

export const mockUserData = (): UserData => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole))
} as UserData);

export const mockCreateUser = (): CreateUser => ({
  name: name.firstName(),
  email: internet.email(),
  role: random.arrayElement(Object.values(UserRole)),
  gender: random.arrayElement(Object.values(Gender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  description: lorem.words(10),
  location:  random.arrayElement(Object.values(Location)),
  password: internet.password()
} as CreateUser);

export const mockUser = (): User => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(Gender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  successCoach: lorem.words(10),
  isPersonal: datatype.boolean(),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  caloriesSpend: datatype.number({ min: 1000, max: 5000}),
  isReady: datatype.boolean(),
  isFriend: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as User);

export const mockComment = (): Comment => ({
  message: lorem.words(55),
  trainingId: datatype.uuid(),
  id: datatype.uuid(),
  rating: datatype.number({ min: 1, max: 5}),
  userId: datatype.uuid(),
  name: name.firstName(),
  avatarPath: image.avatar(),
} as Comment);

export const mockTraining = (): Training => ({
  id: datatype.uuid(),
  nameTraining: name.title(),
  photo: datatype.uuid(),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElement(Object.values(TrainingType)),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  price: datatype.number(),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  descriptionTraining: lorem.words(50),
  gender:random.arrayElement(Object.values(Gender)),
  video: datatype.uuid(),
  videoPath:  image.avatar(),
  rating: datatype.number({ min: 1, max: 5}),
  coachId: datatype.uuid(),
  coachName: name.title(),
  coachAvatarPath:  image.avatar(),
  isSpecialOffer: datatype.boolean(),
  createdAt: datatype.datetime()
} as Training);

export const mockFriend = (): Friend => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(Gender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: random.arrayElement(Object.values(UserRole)),
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  requestPersonal: datatype.boolean(),
  requestTogether: datatype.boolean(),
  requestStatus: random.arrayElement(Object.values(StatusRequest)),
  requestId: datatype.uuid(),
  isReady: datatype.boolean(),

} as Friend);

export const mockNotify = (): Notify => ({
  id: datatype.uuid(),
  userId: datatype.uuid(),
  initiatorId: datatype.uuid(),
  initiatorName: datatype.uuid(),
  text: random.arrayElement(Object.values(NotifyMessage)),
  dateNotify: datatype.datetime()

} as Notify);


export const mockOrder = (): Order =>{
  const price = datatype.number();
  const count = datatype.number();
  const trainingRestCount = datatype.number({min: 0, max: count});
  return ({
    id: datatype.uuid(),
    userId: datatype.uuid(),
    coachId: datatype.uuid(),
    trainingId: datatype.uuid(),
    trainingCount: count,
    totalPrice: trainingRestCount * price,
    title: name.title(),
    price: price,
    paymentOption: random.arrayElement(Object.values(PaymentOption)),
    trainingDoneCount: count - trainingRestCount,
    trainingRestCount: trainingRestCount,
    isDone: trainingRestCount === 0,
    levelTraining: random.arrayElement(Object.values(LevelTraining)),
    trainingType: random.arrayElement(Object.values(TrainingType)),
    trainingTime: random.arrayElement(Object.values(TrainingTime)),
    caloriesReset: datatype.number({ min: 1000, max: 5000}),
    description: lorem.words(50),
    gender: random.arrayElement(Object.values(Gender)),
    isSpecial: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5}),
  } as Order);
};

export const mockUserCoach = (): User => ({
  id: datatype.uuid(),
  name: name.firstName(),
  email: internet.email(),
  avatar: datatype.uuid(),
  avatarPath: image.avatar(),
  gender: random.arrayElement(Object.values(Gender)),
  dateBirth: '1990-01-01T00:00:00.000Z',
  role: 'coach',
  description: lorem.words(10),
  location: random.arrayElement(Object.values(Location)),
  levelTraining: random.arrayElement(Object.values(LevelTraining)),
  trainingType: random.arrayElements(Object.values(TrainingType), 3),
  certificate: [],
  certificatesPath: [{certificateId: datatype.uuid(), certificatePath: image.avatar()}],
  successCoach: lorem.words(10),
  isPersonal: datatype.boolean(),
  trainingTime: random.arrayElement(Object.values(TrainingTime)),
  caloriesReset: datatype.number({ min: 1000, max: 5000}),
  caloriesSpend: 0,
  isReady: false,
  isFriend: datatype.boolean(),
  isSubscribe: datatype.boolean(),

} as User);
