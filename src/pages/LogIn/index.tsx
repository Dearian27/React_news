import { ChangeEvent, useRef, useState } from 'react';
import eyeIcon from '../../assets/eye.png';
import eyeCloseIcon from '../../assets/eyeClose.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setAuth } from '../../redux/slices/userSlice';

const LogIn: React.FC = () => {

  const { isAuth } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dipatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [viewType, setViewType] = useState<string>('password');
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "12345" && name === "admin") {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('password', password);

      console.log(window.localStorage.getItem('password'));
      dipatch(setAuth(true));
      navigate('/');
    }
    else {

    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log in</h1>
        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} value={name} className={styles.input} type="text" />
        <label className={styles.pswd}>
          <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} value={password} className={styles.input} ref={pswdRef} type={viewType} />
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