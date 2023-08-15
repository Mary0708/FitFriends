import { Comment } from '../../types/comment';

type Props = {
  comment: Comment;
}

export default function CommentCard({ comment }: Props): JSX.Element {
  return (
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <img src={comment.avatarPath} width="64" height="64" alt="Изображение пользователя" />
          </picture>
        </div><span className="review__user-name">{comment.name}</span>
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span>{comment.rating}</span>
        </div>
      </div>
      <p className="review__comment">{comment.message}</p>
    </div>
  );
}
