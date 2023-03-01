import { Container } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import JS from '../../assets/logos/js.svg';
import TS from '../../assets/logos/ts.svg';
import React from '../../assets/logos/react.svg';
import Redux from '../../assets/logos/redux.svg';
import MUI from '../../assets/logos/mui.svg';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './styles.scss';

type logoParams = {
  src: string;
  alt: string;
  link: string;
};

const logos: logoParams[] = [
  {
    src: JS,
    alt: "JavaScript",
    link: "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/"
  },
  {
    src: TS,
    alt: "TypeScript",
    link: "https://www.typescriptlang.org/"
  },
  {
    src: React,
    alt: "React",
    link: "https://beta.reactjs.org/"
  },
  {
    src: Redux,
    alt: "Redux",
    link: "https://redux-toolkit.js.org/"
  },
  {
    src: MUI,
    alt: "Material-UI",
    link: "https://mui.com/"
  }
]

const Home: React.FC = () => {

  const { t, i18n } = useTranslation();

  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ padding: "20px 0 50px 0", fontSize: "40px", fontWeight: 500 }}>{t("homePage")}</h1>
      <Grid container gap={5} sx={{ display: "flex" }}>
        {logos.map((logo, id) => {
          return (
            <Grid item xs={6} sm={4} md={3} lg={2} xl={2} key={id}>
              <Link to={logo.link} >
                <img style={{ height: "200px", opacity: 1, width: "200px", animation: `fadeIn ${(id + 1) / 6}s linear` }} src={logo.src} alt={logo.alt} />
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Home;