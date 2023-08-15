import { useEffect } from 'react';

type Prop ={
  onClose?: () => void;
  children: JSX.Element;
}

const PopupWindow = ({children, onClose}: Prop): JSX.Element => {
  useEffect(() => {
    const close = (evt: KeyboardEvent | React.KeyboardEvent) => {
      if(evt.key === 'Escape' && onClose){
        onClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  },[onClose]);

  return (
    <div className="popup-box">
      <div className="box">
        {children}
      </div>
    </div>
  );
};

export default PopupWindow;
