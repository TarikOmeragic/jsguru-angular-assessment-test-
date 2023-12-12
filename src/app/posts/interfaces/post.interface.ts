import { IUser } from '../../shared/interfaces/user.interface';
import { IComment } from './comment.interface';

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
    user?: IUser | null;
    comments: Array<IComment>;
    loading: boolean;
}
