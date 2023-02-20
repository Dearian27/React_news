import { useRef, useState } from 'react';
import eyeIcon from '../../assets/eye.png';
import eyeCloseIcon from '../../assets/eyeClose.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

const LogIn: React.FC = () => {

  const navigate = useNavigate();

  const [viewType, setViewType] = useState('password');
  const pswdRef: any = useRef(null); //! fix

  const changeView = () => {    //!fix
    if (pswdRef.current.type === 'password') {
      pswdRef.current.classList.add(styles.black);
      setViewType('text');
    } else {
      pswdRef.current.classList.remove(styles.black);
      setViewType('password');
    }
  }

  const handleSubmit = () => {

  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log in</h1>
        <input className={styles.input} type="text" />
        <label className={styles.pswd}>
          <input className={styles.input} ref={pswdRef} type={viewType} />
          <img className={styles.pswdIcon} onClick={changeView} src={viewType === "password" ? eyeCloseIcon : eyeIcon} />
        </label>
        <div className={styles.btnContainer}>
          <button onClick={() => navigate("/")} className={styles.btnBack}>Back</button>
          <button type='submit' className={styles.btnSubmit}>Submit</button>
        </div>
      </form>
    </section>
  )
}

export default LogIn;