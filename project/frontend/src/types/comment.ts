export type Comment = {
    id: string;
    userId: string;
    name: string;
    avatarPath: string;
    trainingId: string;
    rating: number;
    message: string;
}

export type NewComment = {
    userId: string;
    trainingId: string;
    rating: number;
    message: string;
}
