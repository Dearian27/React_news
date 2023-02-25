import Usa from '../../src/assets/countries/usa.png';
import Ukraine from '../../src/assets/countries/ukraine.png';
import Germany from '../../src/assets/countries/germany.png';


interface langI {
  lang: string | undefined;
  full: string | undefined;
  imgSrc: string | undefined;
}

export const Languages: langI[] = [
  {
    lang: 'en',
    full: 'English',
    imgSrc: Usa,
  },
  {
    lang: 'ua',
    full: 'Українська',
    imgSrc: Ukraine,
  },
  {
    lang: 'de',
    full: 'Deutsch',
    imgSrc: Germany,
  },
]